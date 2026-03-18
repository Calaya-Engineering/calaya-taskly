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

  try {
    await resend.emails.send({
      from: NOTIFICATION_SENDER,
      to: [notification.recipient.email],
      subject,
      text: lines.join("\n"),
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
