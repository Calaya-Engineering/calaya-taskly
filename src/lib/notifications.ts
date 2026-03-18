import { prisma } from "@/lib/prisma";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { getResendClient } from "@/lib/resend";

type RecipientQuery = {
  userIds?: number[];
  roles?: string[];
  departments?: string[];
  includeActor?: boolean;
};

type CreateNotificationParams = {
  actorEmail: string;
  actionType: string;
  targetId?: number;
  message: string;
  recipients?: RecipientQuery;
  sendEmail?: boolean;
  emailSubject?: string;
  linkPath?: string;
};

const NOTIFICATION_SENDER = "Calaya Taskly <noreply@calayaengineering.com>";

const globalForNotifications = globalThis as typeof globalThis & {
  __notificationQueueRunning?: boolean;
};

function getDisplayName(user?: { name?: string | null; email?: string | null } | null) {
  if (user?.name?.trim()) return user.name.trim();
  if (user?.email) return user.email.split("@")[0];
  return "System";
}

function normalizePath(linkPath?: string | null) {
  if (!linkPath?.trim()) return null;
  const trimmed = linkPath.trim();
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function buildAppUrl(linkPath?: string | null) {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://calayaengineering.com").replace(/\/+$/, "");
  const path = normalizePath(linkPath);
  return path ? `${base}${path}` : base;
}

function formatActionLabel(actionType: string) {
  return actionType
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatStatusLabel(actionType: string) {
  const statusMap: Record<string, string> = {
    ANNOUNCEMENT_REMINDER: "Reminder",
    ANNOUNCEMENT_SHARED: "Shared",
    ACCESS_REQUEST_APPROVED: "Approved",
    ACCESS_REQUEST_DENIED: "Denied",
    APPROVAL_FORWARDED: "Forwarded to MD",
    APPROVAL_REQUESTED: "Approval Requested",
    ASSIGN_TASK: "Assigned",
    CREATE_ANNOUNCEMENT: "Created",
    CREATE_DEPARTMENT: "Created",
    CREATE_EVENT: "Created",
    CREATE_MEETING: "Created",
    CREATE_ROLE: "Created",
    CREATE_TENDER: "Created",
    CREATE_USER: "Created",
    DEESCALATE_TASK: "De-escalated",
    DELETE_ANNOUNCEMENT: "Deleted",
    DELETE_DEPARTMENT: "Deleted",
    DELETE_ROLE: "Deleted",
    DELETE_TENDER: "Deleted",
    DELETE_USER: "Deleted",
    DOWNLOAD_DOCUMENT: "Downloaded",
    ESCALATE_TASK: "Escalated",
    EVENT_REMINDER: "Reminder",
    EVENT_SHARED: "Shared",
    MEETING_REMINDER: "Reminder",
    MEETING_SHARED: "Shared",
    READ_ANNOUNCEMENT: "Read",
    REPORT_SUBMITTED: "Submitted",
    TASK_APPROVED: "Approved",
    TASK_DEADLINE_REMINDER: "Reminder",
    TASK_DUE_SOON: "Deadline Approaching",
    TASK_OVERDUE: "Overdue",
    TASK_REJECTED: "Returned for Update",
    UNASSIGN_TASK: "Assignment Removed",
    UPDATE_ANNOUNCEMENT: "Updated",
    UPDATE_DEPARTMENT: "Updated",
    UPDATE_DOCUMENT: "Updated",
    UPDATE_EVENT: "Updated",
    UPDATE_MEETING: "Updated",
    UPDATE_ROLE: "Updated",
    UPDATE_TASK: "Updated",
    UPDATE_TENDER: "Updated",
    UPDATE_USER: "Updated",
    UPLOAD_DOCUMENT: "Uploaded",
    VIEW_ANNOUNCEMENT: "Viewed",
    VIEW_DOCUMENT: "Viewed",
    VIEW_ROLES: "Viewed",
    VIEW_TENDER: "Viewed",
    VIEW_USER: "Viewed",
    VIEW_USERS: "Viewed",
  };

  return statusMap[actionType] || formatActionLabel(actionType);
}

function getEntityType(linkPath?: string | null) {
  const normalizedPath = normalizePath(linkPath);
  if (!normalizedPath) return "notification";

  try {
    const url = new URL(normalizedPath, "https://calayaengineering.com");
    const openItemType = url.searchParams.get("type")?.trim().toLowerCase();
    if (openItemType) return openItemType;

    if (url.pathname.includes("/task/")) return "task";
    if (url.pathname.includes("/document/")) return "document";
    if (url.pathname.includes("/announcement/")) return "announcement";
    if (url.pathname.includes("/report")) return "report";
    if (url.pathname.includes("/tender")) return "tender";
    if (url.pathname.includes("/user")) return "user";
  } catch {
    return "notification";
  }

  return "notification";
}

function formatEntityLabel(entityType: string) {
  const entityLabels: Record<string, string> = {
    access: "Access Request",
    announcement: "Announcement",
    document: "Document",
    event: "Event",
    meeting: "Meeting",
    notification: "Notification",
    report: "Report",
    task: "Task",
    tender: "Tender",
    user: "User",
  };

  return entityLabels[entityType] || formatActionLabel(entityType);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatLongDate(value: Date) {
  return value.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTimeWithSeconds(value: Date) {
  return value.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function formatEmailDueDate(value?: Date | null) {
  if (!value) return "No deadline set";
  return value.toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function extractTaskTitleFromSubject(subject: string | null | undefined) {
  if (!subject) return "Untitled Task";
  const parts = subject.split("—");
  const lastPart = parts[parts.length - 1]?.trim();
  return lastPart || subject.trim() || "Untitled Task";
}

function extractItemTitle(subject: string | null | undefined, fallbackLabel: string) {
  if (!subject?.trim()) return fallbackLabel;
  const parts = subject.split("—");
  const lastPart = parts[parts.length - 1]?.trim();
  return lastPart || subject.trim() || fallbackLabel;
}

function getEmailHeading(actionType: string, entityLabel: string, isTargetRecipient = false) {
  const headingMap: Record<string, string> = {
    ANNOUNCEMENT_REMINDER: "An announcement reminder is<br>waiting for you",
    ANNOUNCEMENT_SHARED: "An announcement has been<br>shared with you",
    ACCESS_REQUEST_APPROVED: "Your access request has been<br>approved",
    ACCESS_REQUEST_DENIED: "Your access request was<br>not approved",
    APPROVAL_FORWARDED: "A task has been<br>forwarded to MD",
    APPROVAL_REQUESTED: "A task is awaiting<br>approval",
    ASSIGN_TASK: "You&#39;ve been assigned<br>a new task",
    CREATE_EVENT: "A new event has been<br>scheduled",
    CREATE_MEETING: "A new meeting has been<br>scheduled",
    DEESCALATE_TASK: "A task has been<br>de-escalated",
    ESCALATE_TASK: "A task has been<br>escalated",
    EVENT_REMINDER: "An event reminder is<br>waiting for you",
    EVENT_SHARED: "An event has been<br>shared with you",
    MEETING_REMINDER: "A meeting reminder is<br>waiting for you",
    MEETING_SHARED: "A meeting has been<br>shared with you",
    REPORT_SUBMITTED: "A new report has been<br>submitted",
    TASK_APPROVED: "A task has been<br>approved",
    TASK_DEADLINE_REMINDER: "A task reminder is<br>waiting for you",
    TASK_DUE_SOON: "A task deadline is<br>approaching",
    TASK_OVERDUE: "A task is now<br>overdue",
    TASK_REJECTED: "A task was returned<br>for update",
    UNASSIGN_TASK: "A task assignment has<br>been removed",
    UPDATE_EVENT: "An event has been<br>updated",
    UPDATE_MEETING: "A meeting has been<br>updated",
    UPDATE_TASK: "A task has been<br>updated",
    CREATE_USER: isTargetRecipient ? "Your account has been<br>created" : "A new account has been<br>created",
  };

  return headingMap[actionType] || `You have a new<br>${escapeHtml(entityLabel.toLowerCase())} notification`;
}

function getEmailIntro(params: {
  actionType: string;
  recipientName: string;
  actorName: string;
  actorRole: string;
  entityLabel: string;
  statusLabel: string;
  isTargetRecipient?: boolean;
}) {
  const recipientName = escapeHtml(params.recipientName);
  const actorName = escapeHtml(params.actorName);
  const actorRole = escapeHtml(params.actorRole);
  const entityLabel = escapeHtml(params.entityLabel.toLowerCase());
  const statusLabel = escapeHtml(params.statusLabel.toLowerCase());

  if (params.actionType === "ASSIGN_TASK") {
    return `Hi <strong>${recipientName}</strong>,<br><br>
      This is to notify you that a new task has been assigned to you by <strong>${actorName} (${actorRole})</strong>. Please log in to the system to review the full details and take the necessary action.`;
  }

  if (params.actionType === "CREATE_USER") {
    if (params.isTargetRecipient) {
      return `Hi <strong>${recipientName}</strong>,<br><br>
      Your Calaya Taskly account has been created by <strong>${actorName} (${actorRole})</strong>. Please review your account details below and sign in to the system to get started.`;
    }

    return `Hi <strong>${recipientName}</strong>,<br><br>
      This is to notify you that <strong>${actorName} (${actorRole})</strong> created a new Calaya Taskly account. The account details are included below for reference.`;
  }

  return `Hi <strong>${recipientName}</strong>,<br><br>
      This is to notify you of a ${entityLabel} update from <strong>${actorName} (${actorRole})</strong>. Current status: <strong>${statusLabel}</strong>. Please log in to the system to review the latest update and take any necessary action.`;
}

function getCtaLabel(entityLabel: string) {
  if (entityLabel === "Notification") return "View Notification in System";
  return `View ${entityLabel} in System`;
}

function buildPlainTextEmail(params: {
  recipientName: string;
  intro: string;
  actionLabel: string;
  actorName: string;
  actorRole: string;
  actionDateTime: string;
  statusLabel: string;
  viewUrl: string;
  extraDetails?: Array<{ label: string; value: string }>;
}) {
  return [
    `Hi ${params.recipientName},`,
    "",
    params.intro,
    "",
    "DETAILS:",
    `- Action      : ${params.actionLabel}`,
    `- By          : ${params.actorName} (${params.actorRole})`,
    `- Date & Time : ${params.actionDateTime}`,
    ...((params.extraDetails || []).map((detail) => `- ${detail.label.padEnd(11, " ")}: ${detail.value}`)),
    `- Status      : ${params.statusLabel}`,
    "",
    `View in System: ${params.viewUrl}`,
    "",
    "This is an automated notification from Calaya Taskly.",
    "Do not reply to this email.",
  ].join("\n");
}

function renderNotificationEmailHtml(params: {
  recipientName: string;
  actorName: string;
  actorRole: string;
  actionLabel: string;
  cardLabel: string;
  headerTag: string;
  heading: string;
  introHtml: string;
  itemTitle: string;
  dueLabel?: string | null;
  statusLabel: string;
  extraDetails?: Array<{ label: string; value: string }>;
  actionDate: string;
  actionTime: string;
  viewUrl: string;
}) {
  const recipientName = escapeHtml(params.recipientName);
  const actorName = escapeHtml(params.actorName);
  const actorRole = escapeHtml(params.actorRole);
  const actionLabel = escapeHtml(params.actionLabel);
  const cardLabel = escapeHtml(params.cardLabel);
  const headerTag = escapeHtml(params.headerTag);
  const itemTitle = escapeHtml(params.itemTitle);
  const dueLabel = params.dueLabel ? escapeHtml(params.dueLabel) : null;
  const statusLabel = escapeHtml(params.statusLabel);
  const actionDate = escapeHtml(params.actionDate);
  const actionTime = escapeHtml(params.actionTime);
  const viewUrl = escapeHtml(params.viewUrl);
  const ctaLabel = escapeHtml(getCtaLabel(params.cardLabel.replace(" Name", "")));
  const extraDetails = (params.extraDetails || [])
    .filter((detail) => detail.label?.trim() && detail.value?.trim())
    .map((detail) => ({
      label: escapeHtml(detail.label),
      value: escapeHtml(detail.value),
    }));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Calaya Taskly - Notification</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Sora:wght@600;700&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #f0f2f7;
    font-family: 'DM Sans', sans-serif;
    color: #1a1d2e;
    padding: 40px 16px;
    -webkit-font-smoothing: antialiased;
  }
  .wrapper {
    max-width: 780px;
    margin: 0 auto;
  }
  .header {
    background: #1a2f8a;
    border-radius: 16px 16px 0 0;
    padding: 36px 40px 32px;
    position: relative;
    overflow: hidden;
  }
  .logo-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
    position: relative;
    z-index: 1;
  }
  .logo-icon {
    width: 40px;
    height: 40px;
    background: rgba(255,255,255,0.18);
    border: 1.5px solid rgba(255,255,255,0.35);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo-icon svg {
    width: 22px;
    height: 22px;
    fill: #fff;
  }
  .logo-text {
    font-family: 'Sora', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.4px;
  }
  .logo-text span {
    color: rgba(255,255,255,0.65);
    font-weight: 600;
    font-size: 15px;
  }
  .header-tag {
    display: inline-block;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 20px;
    padding: 4px 14px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 12px;
    position: relative;
    z-index: 1;
  }
  .header h1 {
    font-family: 'Sora', sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: #fff;
    line-height: 1.25;
    position: relative;
    z-index: 1;
  }
  .header p {
    margin-top: 8px;
    font-size: 14px;
    color: rgba(255,255,255,0.75);
    position: relative;
    z-index: 1;
  }
  .body {
    background: #ffffff;
    padding: 40px 40px 36px;
    border-left: 1px solid #e5e8f0;
    border-right: 1px solid #e5e8f0;
  }
  .greeting {
    font-size: 15px;
    color: #4a4f6a;
    line-height: 1.6;
    margin-bottom: 28px;
  }
  .greeting strong { color: #1a1d2e; }
  .task-card {
    background: linear-gradient(145deg, #fafbff, #f4f6fc);
    border: 1.5px solid #dde2f0;
    border-radius: 14px;
    padding: 24px 26px;
    margin-bottom: 28px;
    position: relative;
    overflow: hidden;
  }
  .task-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #1a2f8a;
    border-radius: 4px 0 0 4px;
  }
  .task-title-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #8b92b2;
    margin-bottom: 6px;
  }
  .task-title {
    font-family: 'Sora', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #1a1d2e;
    margin-bottom: 16px;
  }
  .due-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #eef2ff;
    border: 1px solid #c3cef7;
    border-radius: 8px;
    padding: 6px 14px;
    font-size: 13px;
    font-weight: 600;
    color: #1a2f8a;
  }
  .section-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #8b92b2;
    margin-bottom: 14px;
  }
  .details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 32px;
  }
  .detail-item {
    background: #f7f8fc;
    border: 1px solid #e8ebf5;
    border-radius: 10px;
    padding: 14px 16px;
  }
  .detail-item.full { grid-column: span 2; }
  .detail-label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #a0a7c4;
    margin-bottom: 4px;
  }
  .detail-value {
    font-size: 14px;
    font-weight: 600;
    color: #1a1d2e;
  }
  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #eef6ff;
    border: 1px solid #c3ddf7;
    border-radius: 6px;
    padding: 3px 10px;
    font-size: 12px;
    font-weight: 600;
    color: #1a2f8a;
  }
  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #1a2f8a;
  }
  .cta-row {
    text-align: center;
    margin-bottom: 36px;
  }
  .cta-btn {
    display: inline-block;
    background: #1a2f8a;
    color: #fff;
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    text-decoration: none;
    padding: 14px 36px;
    border-radius: 10px;
    box-shadow: 0 6px 24px rgba(26, 47, 138, 0.30);
  }
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, #e2e6f0, transparent);
    margin: 0 0 32px;
  }
  .footer {
    background: #f7f8fc;
    border: 1px solid #e5e8f0;
    border-top: none;
    border-radius: 0 0 16px 16px;
    padding: 24px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }
  .footer-brand {
    font-family: 'Sora', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #1a1d2e;
  }
  .footer-brand span { color: #1a2f8a; }
  .footer-note {
    font-size: 11px;
    color: #a0a7c4;
    text-align: right;
    line-height: 1.5;
  }
  @media (max-width: 520px) {
    .body { padding: 28px 24px; }
    .header { padding: 28px 24px; }
    .details-grid { grid-template-columns: 1fr; }
    .detail-item.full { grid-column: span 1; }
    .footer {
      padding: 20px 24px;
      flex-direction: column;
      text-align: center;
    }
    .footer-note { text-align: center; }
  }
</style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <div class="logo-row">
      <div class="logo-icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
        </svg>
      </div>
      <div>
        <div class="logo-text">Calaya <span>Taskly</span></div>
      </div>
    </div>
    <div class="header-tag">${headerTag}</div>
    <h1>${params.heading}</h1>
    <p>Action required - please review the latest update in the system.</p>
  </div>

  <div class="body">
    <p class="greeting">
      ${params.introHtml}
    </p>

    <div class="task-card">
      <div class="task-title-label">${cardLabel}</div>
      <div class="task-title">${itemTitle}</div>
      ${dueLabel ? `<div class="due-badge">Due: ${dueLabel}</div>` : ""}
    </div>

    <div class="section-title">Activity Details</div>
    <div class="details-grid">
      <div class="detail-item">
        <div class="detail-label">Action</div>
        <div class="detail-value">${actionLabel}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Triggered By</div>
        <div class="detail-value">${actorName} (${actorRole})</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Date</div>
        <div class="detail-value">${actionDate}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Time</div>
        <div class="detail-value">${actionTime}</div>
      </div>
      ${extraDetails
        .map(
          (detail) => `<div class="detail-item">
        <div class="detail-label">${detail.label}</div>
        <div class="detail-value">${detail.value}</div>
      </div>`,
        )
        .join("")}
      <div class="detail-item full">
        <div class="detail-label">Status</div>
        <div class="detail-value">
          <span class="status-pill"><span class="status-dot"></span>${statusLabel}</span>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="cta-row">
      <a href="${viewUrl}" class="cta-btn">${ctaLabel} &rarr;</a>
    </div>
  </div>

  <div class="footer">
    <div class="footer-brand">Calaya <span>Engineering</span></div>
    <div class="footer-note">
      This is an automated notification from Calaya Taskly.<br>
      Please do not reply to this email.
    </div>
  </div>
</div>
</body>
</html>`;
}

async function getAccountCreatedEmailDetails(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      role: true,
      department: true,
      managedDepartmentRelations: {
        select: {
          department: {
            select: {
              name: true,
              hodAssignments: {
                select: {
                  hod: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          department: {
            name: "asc",
          },
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  const managedDepartments = user.managedDepartmentRelations.map((relation) => relation.department.name).filter(Boolean);
  const primaryDepartment = user.department?.trim() || managedDepartments[0] || "Not assigned";
  const hodNames = new Set<string>();

  for (const relation of user.managedDepartmentRelations) {
    for (const assignment of relation.department.hodAssignments) {
      const label = assignment.hod.name?.trim() || assignment.hod.email?.split("@")[0] || "";
      if (label) hodNames.add(label);
    }
  }

  if (primaryDepartment && hodNames.size === 0) {
    const departmentRecord = await prisma.department.findFirst({
      where: { name: primaryDepartment },
      select: {
        hodAssignments: {
          select: {
            hod: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    for (const assignment of departmentRecord?.hodAssignments || []) {
      const label = assignment.hod.name?.trim() || assignment.hod.email?.split("@")[0] || "";
      if (label) hodNames.add(label);
    }
  }

  return {
    itemTitle: user.name?.trim() || user.email,
    email: user.email,
    extraDetails: [
      { label: "Role", value: user.role || "Not assigned" },
      { label: "Email", value: user.email || "Not available" },
      { label: "Department", value: primaryDepartment },
      {
        label: user.role === "HOD" ? "Managed Departments" : "HOD",
        value: user.role === "HOD"
          ? (managedDepartments.length ? managedDepartments.join(", ") : primaryDepartment)
          : (Array.from(hodNames).join(", ") || "Not assigned"),
      },
    ],
  };
}

async function buildNotificationEmailContent(notification: {
  actionType: string;
  targetId?: number | null;
  message: string;
  linkPath: string | null;
  emailSubject: string | null;
  createdAt: Date;
  actorRole: string;
  actor: { name: string | null; email: string };
  recipient: { name: string | null; email: string };
}) {
  const recipientName = getDisplayName(notification.recipient);
  const actorName = getDisplayName(notification.actor);
  const actionLabel = formatActionLabel(notification.actionType);
  const statusLabel = formatStatusLabel(notification.actionType);
  const viewUrl = buildAppUrl(notification.linkPath);
  const subject = notification.emailSubject || `${actionLabel} — ${notification.createdAt.toLocaleDateString("en-GB")}`;
  const entityType = getEntityType(notification.linkPath);
  const entityLabel = formatEntityLabel(entityType);
  const task = ["task", "event", "meeting"].includes(entityType) && notification.targetId
    ? await prisma.task.findUnique({
        where: { id: notification.targetId },
        select: { title: true, dueDate: true, type: true },
      })
    : null;
  const resolvedEntityLabel =
    task?.type === "EVENT"
      ? "Event"
      : task?.type === "MEETING"
        ? "Meeting"
        : entityLabel;
  const accountCreatedDetails =
    notification.actionType === "CREATE_USER" && notification.targetId
      ? await getAccountCreatedEmailDetails(notification.targetId)
      : null;
  const isTargetRecipient =
    Boolean(accountCreatedDetails?.email) &&
    accountCreatedDetails?.email?.trim().toLowerCase() === notification.recipient.email.trim().toLowerCase();
  const itemTitle = ["task", "event", "meeting"].includes(entityType)
    ? task?.title || extractTaskTitleFromSubject(notification.emailSubject)
    : accountCreatedDetails?.itemTitle || extractItemTitle(notification.emailSubject, `${resolvedEntityLabel} Update`);

  const lines = [
    `Hi ${recipientName},`,
    "",
    notification.message,
    "",
    "DETAILS:",
    `- Action      : ${actionLabel}`,
    `- By          : ${actorName} (${notification.actorRole})`,
    `- Date & Time : ${notification.createdAt.toLocaleString("en-GB")}`,
    ...(accountCreatedDetails?.extraDetails || []).map((detail) => `- ${detail.label.padEnd(11, " ")}: ${detail.value}`),
    `- Status      : ${statusLabel}`,
    "",
    `View in System: ${viewUrl}`,
    "",
    "This is an automated notification from Calaya Taskly.",
    "Do not reply to this email.",
  ];

  return {
    subject,
    text: lines.join("\n"),
    html: renderNotificationEmailHtml({
      recipientName,
      actorName,
      actorRole: notification.actorRole,
      actionLabel,
      cardLabel: `${resolvedEntityLabel} Name`,
      headerTag: `${resolvedEntityLabel} Notification`,
      heading: getEmailHeading(notification.actionType, resolvedEntityLabel, isTargetRecipient),
      introHtml: getEmailIntro({
        actionType: notification.actionType,
        recipientName,
        actorName,
        actorRole: notification.actorRole,
        entityLabel: resolvedEntityLabel,
        statusLabel,
        isTargetRecipient,
      }),
      itemTitle,
      dueLabel: ["task", "event", "meeting"].includes(entityType) ? formatEmailDueDate(task?.dueDate || null) : null,
      statusLabel,
      extraDetails: accountCreatedDetails?.extraDetails,
      actionDate: formatLongDate(notification.createdAt),
      actionTime: formatTimeWithSeconds(notification.createdAt),
      viewUrl,
    }),
  };
}

async function resolveRecipientUsers(actorId: number, query?: RecipientQuery) {
  if (!query) {
    const users = await prisma.user.findMany({
      where: {
        role: {
          in: ["MD", "Admin"],
        },
      },
      select: { id: true, email: true, name: true, role: true, department: true },
    });
    return Array.from(
      new Map(
        [...users, { id: actorId, email: "", name: null, role: "", department: null }].map((user) => [user.id, user]),
      ).values(),
    ).filter((user) => user.email || user.id === actorId);
  }

  const recipientMap = new Map<number, { id: number; email: string; name: string | null; role: string; department: string | null }>();

  if (Array.isArray(query.userIds) && query.userIds.length > 0) {
    const directUsers = await prisma.user.findMany({
      where: { id: { in: query.userIds } },
      select: { id: true, email: true, name: true, role: true, department: true },
    });
    directUsers.forEach((user) => recipientMap.set(user.id, user));
  }

  if ((query.roles?.length || query.departments?.length)) {
    const departments = Array.from(new Set((query.departments || []).map((department) => department.trim()).filter(Boolean)));
    const roles = Array.from(new Set((query.roles || []).map((role) => role.trim()).filter(Boolean)));

    const roleDepartmentUsers = await prisma.user.findMany({
      where: {
        ...(roles.length > 0 ? { role: { in: roles } } : {}),
        ...(departments.length > 0
          ? {
              OR: [
                { department: { in: departments } },
                {
                  managedDepartmentRelations: {
                    some: {
                      department: {
                        is: {
                          name: { in: departments },
                        },
                      },
                    },
                  },
                },
              ],
            }
          : {}),
      },
      select: { id: true, email: true, name: true, role: true, department: true },
    });

    roleDepartmentUsers.forEach((user) => recipientMap.set(user.id, user));
  }

  if (query.includeActor) {
    const actor = await prisma.user.findUnique({
      where: { id: actorId },
      select: { id: true, email: true, name: true, role: true, department: true },
    });
    if (actor) {
      recipientMap.set(actor.id, actor);
    }
  }

  return Array.from(recipientMap.values());
}

async function sendNotificationEmail(notification: {
  id: number;
  actionType: string;
  targetId?: number | null;
  message: string;
  linkPath: string | null;
  emailSubject: string | null;
  createdAt: Date;
  actorRole: string;
  actor: { name: string | null; email: string };
  recipient: { name: string | null; email: string };
}) {
  const resend = getResendClient();
  if (!resend) {
    await prisma.notification.update({
      where: { id: notification.id },
      data: {
        emailStatus: "SKIPPED",
        emailLastError: "RESEND_API_KEY is not set",
      },
    });
    return;
  }

  const recipientName = getDisplayName(notification.recipient);
  const actorName = getDisplayName(notification.actor);
  const emailContent = await buildNotificationEmailContent(notification);

  try {
    await resend.emails.send({
      from: NOTIFICATION_SENDER,
      to: [notification.recipient.email],
      subject: emailContent.subject,
      text: emailContent.text,
      ...(emailContent.html ? { html: emailContent.html } : {}),
    });

    await prisma.notification.update({
      where: { id: notification.id },
      data: {
        emailStatus: "SENT",
        emailAttempts: { increment: 1 },
        emailLastError: null,
        emailSentAt: new Date(),
      },
    });
  } catch (error) {
    const previous = await prisma.notification.findUnique({
      where: { id: notification.id },
      select: { emailAttempts: true },
    });
    const nextAttempts = (previous?.emailAttempts || 0) + 1;

    await prisma.notification.update({
      where: { id: notification.id },
      data: {
        emailStatus: nextAttempts >= 3 ? "FAILED" : "QUEUED",
        emailAttempts: nextAttempts,
        emailLastError: error instanceof Error ? error.message : String(error),
      },
    });
  }
}

export async function processQueuedNotificationEmails() {
  if (globalForNotifications.__notificationQueueRunning) {
    return;
  }

  globalForNotifications.__notificationQueueRunning = true;

  try {
    const queuedNotifications = await prisma.notification.findMany({
      where: {
        emailStatus: { in: ["QUEUED", "FAILED"] },
        emailAttempts: { lt: 3 },
      },
      include: {
        actor: { select: { name: true, email: true } },
        recipient: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "asc" },
      take: 25,
    });

    for (const notification of queuedNotifications) {
      await sendNotificationEmail(notification);
    }
  } finally {
    globalForNotifications.__notificationQueueRunning = false;
  }
}

export async function createNotification(params: CreateNotificationParams) {
  try {
    const actor = await prisma.user.findUnique({
      where: { email: params.actorEmail },
      select: { id: true, role: true, name: true, email: true },
    });

    if (!actor) {
      console.warn(`Could not create notification, actor not found for email: ${params.actorEmail}`);
      return;
    }

    const recipients = await resolveRecipientUsers(actor.id, params.recipients);
    if (recipients.length === 0) {
      return;
    }

    const notificationData = recipients.map((recipient) => ({
      recipientId: recipient.id,
      actorId: actor.id,
      actorRole: actor.role,
      actionType: params.actionType,
      targetId: params.targetId,
      message: params.message,
      linkPath: normalizePath(params.linkPath),
      emailSubject: params.sendEmail ? params.emailSubject || null : null,
      emailStatus: params.sendEmail ? "QUEUED" : "SKIPPED",
    }));

    await prisma.notification.createMany({
      data: notificationData,
    });

    emitRealtimeEvent({
      type: "notification:created",
      entity: "notification",
      action: "created",
      payload: { recipients: notificationData.length, actionType: params.actionType },
    });

    if (params.sendEmail) {
      void processQueuedNotificationEmails().catch((error) => {
        console.error("Failed to process notification email queue:", error);
      });
    }
  } catch (error) {
    console.error("Failed to create notifications:", error);
  }
}

export async function notifyUsers(params: {
  actorEmail: string;
  actionType: string;
  targetId?: number;
  message: string;
  recipientIds: number[];
  sendEmail?: boolean;
  emailSubject?: string;
  linkPath?: string;
}) {
  return createNotification({
    actorEmail: params.actorEmail,
    actionType: params.actionType,
    targetId: params.targetId,
    message: params.message,
    recipients: {
      userIds: params.recipientIds,
      includeActor: false,
    },
    sendEmail: params.sendEmail,
    emailSubject: params.emailSubject,
    linkPath: params.linkPath,
  });
}

export async function sendAccessRequestDecisionEmail(params: {
  recipientEmail: string;
  recipientName: string;
  actorName: string;
  actorRole: string;
  requestedRole: string;
  department: string;
  hodName?: string | null;
  reviewNote?: string | null;
  status: "APPROVED" | "DENIED";
  temporaryPassword?: string | null;
}) {
  const resend = getResendClient();
  if (!resend) {
    return;
  }

  const now = new Date();
  const isApproved = params.status === "APPROVED";
  const actionType = isApproved ? "ACCESS_REQUEST_APPROVED" : "ACCESS_REQUEST_DENIED";
  const statusLabel = formatStatusLabel(actionType);
  const viewUrl = buildAppUrl(isApproved ? "/login" : "/request-access");
  const extraDetails = [
    { label: "Role", value: params.requestedRole },
    { label: "Department", value: params.department },
    { label: "HOD", value: params.hodName?.trim() || "Not assigned" },
    ...(params.temporaryPassword ? [{ label: "Temporary Password", value: params.temporaryPassword }] : []),
    ...(params.reviewNote?.trim() ? [{ label: "Review Note", value: params.reviewNote.trim() }] : []),
  ];
  const introText = isApproved
    ? `Your request for Calaya Taskly access has been approved by ${params.actorName} (${params.actorRole}). Your account is now ready, and your login details are included below.`
    : `Your request for Calaya Taskly access was reviewed by ${params.actorName} (${params.actorRole}) and was not approved at this time.`;
  const introHtml = isApproved
    ? `Hi <strong>${escapeHtml(params.recipientName)}</strong>,<br><br>
      Your request for Calaya Taskly access has been approved by <strong>${escapeHtml(params.actorName)} (${escapeHtml(params.actorRole)})</strong>. Your account is now ready, and your login details are included below.`
    : `Hi <strong>${escapeHtml(params.recipientName)}</strong>,<br><br>
      Your request for Calaya Taskly access was reviewed by <strong>${escapeHtml(params.actorName)} (${escapeHtml(params.actorRole)})</strong> and was not approved at this time.`;

  await resend.emails.send({
    from: NOTIFICATION_SENDER,
    to: [params.recipientEmail],
    subject: isApproved
      ? `Access Request Approved — ${params.department}`
      : `Access Request Denied — ${params.department}`,
    text: buildPlainTextEmail({
      recipientName: params.recipientName,
      intro: introText,
      actionLabel: "Access Request Review",
      actorName: params.actorName,
      actorRole: params.actorRole,
      actionDateTime: now.toLocaleString("en-GB"),
      statusLabel,
      viewUrl,
      extraDetails,
    }),
    html: renderNotificationEmailHtml({
      recipientName: params.recipientName,
      actorName: params.actorName,
      actorRole: params.actorRole,
      actionLabel: "Access Request Review",
      cardLabel: "Access Request Name",
      headerTag: "Access Request Notification",
      heading: getEmailHeading(actionType, "Access Request", true),
      introHtml,
      itemTitle: params.recipientName,
      statusLabel,
      extraDetails,
      actionDate: formatLongDate(now),
      actionTime: formatTimeWithSeconds(now),
      viewUrl,
    }),
  });
}
