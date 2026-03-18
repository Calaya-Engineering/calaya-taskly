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
const TASK_ASSIGNMENT_ACTION = "ASSIGN_TASK";

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

function renderTaskAssignedEmailHtml(params: {
  recipientName: string;
  actorName: string;
  actorRole: string;
  taskTitle: string;
  dueLabel: string;
  actionDate: string;
  actionTime: string;
  viewUrl: string;
}) {
  const recipientName = escapeHtml(params.recipientName);
  const actorName = escapeHtml(params.actorName);
  const actorRole = escapeHtml(params.actorRole);
  const taskTitle = escapeHtml(params.taskTitle);
  const dueLabel = escapeHtml(params.dueLabel);
  const actionDate = escapeHtml(params.actionDate);
  const actionTime = escapeHtml(params.actionTime);
  const viewUrl = escapeHtml(params.viewUrl);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Calaya Taskly - Task Assigned</title>
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
    <div class="header-tag">Task Notification</div>
    <h1>You&#39;ve been assigned<br>a new task</h1>
    <p>Action required - please review and complete before the due date.</p>
  </div>

  <div class="body">
    <p class="greeting">
      Hi <strong>${recipientName}</strong>,<br><br>
      This is to notify you that a new task has been assigned to you by <strong>${actorName} (${actorRole})</strong>. Please log in to the system to review the full details and take the necessary action.
    </p>

    <div class="task-card">
      <div class="task-title-label">Task Name</div>
      <div class="task-title">${taskTitle}</div>
      <div class="due-badge">Due: ${dueLabel}</div>
    </div>

    <div class="section-title">Activity Details</div>
    <div class="details-grid">
      <div class="detail-item">
        <div class="detail-label">Action</div>
        <div class="detail-value">Assign Task</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Assigned By</div>
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
      <div class="detail-item full">
        <div class="detail-label">Status</div>
        <div class="detail-value">
          <span class="status-pill"><span class="status-dot"></span>Task Assigned</span>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="cta-row">
      <a href="${viewUrl}" class="cta-btn">View Task in System &rarr;</a>
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
  const viewUrl = buildAppUrl(notification.linkPath);
  const subject = notification.emailSubject || `${actionLabel} — ${notification.createdAt.toLocaleDateString("en-GB")}`;

  const lines = [
    `Hi ${recipientName},`,
    "",
    notification.message,
    "",
    "DETAILS:",
    `- Action      : ${actionLabel}`,
    `- By          : ${actorName} (${notification.actorRole})`,
    `- Date & Time : ${notification.createdAt.toLocaleString("en-GB")}`,
    `- Status      : ${notification.actionType}`,
    "",
    `View in System: ${viewUrl}`,
    "",
    "This is an automated notification from Calaya Taskly.",
    "Do not reply to this email.",
  ];

  if (notification.actionType === TASK_ASSIGNMENT_ACTION) {
    const task = notification.targetId
      ? await prisma.task.findUnique({
          where: { id: notification.targetId },
          select: { title: true, dueDate: true },
        })
      : null;

    return {
      subject,
      text: lines.join("\n"),
      html: renderTaskAssignedEmailHtml({
        recipientName,
        actorName,
        actorRole: notification.actorRole,
        taskTitle: task?.title || extractTaskTitleFromSubject(notification.emailSubject),
        dueLabel: formatEmailDueDate(task?.dueDate || null),
        actionDate: formatLongDate(notification.createdAt),
        actionTime: formatTimeWithSeconds(notification.createdAt),
        viewUrl,
      }),
    };
  }

  return {
    subject,
    text: lines.join("\n"),
    html: undefined,
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
