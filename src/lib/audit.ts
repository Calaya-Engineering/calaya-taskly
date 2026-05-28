import { prisma } from "@/lib/prisma";

export type AuditAction =
  | "USER_LOGIN"
  | "USER_LOGOUT"
  | "USER_CREATED"
  | "USER_UPDATED"
  | "USER_DELETED"
  | "DOCUMENT_UPLOADED"
  | "DOCUMENT_UPDATED"
  | "DOCUMENT_DELETED"
  | "DOCUMENT_DOWNLOADED"
  | "DOCUMENT_PRIVACY_CHANGED"
  | "TENDER_CREATED"
  | "TENDER_UPDATED"
  | "TENDER_DELETED"
  | "TENDER_COMMENT_POSTED"
  | "EVENT_CREATED"
  | "EVENT_UPDATED"
  | "EVENT_DELETED"
  | "EVENT_ACKNOWLEDGED"
  | "TASK_CREATED"
  | "TASK_UPDATED"
  | "TASK_DELETED"
  | "TASK_ASSIGNED"
  | "TASK_COMPLETED"
  | "TASK_ESCALATED"
  | "ANNOUNCEMENT_CREATED"
  | "ANNOUNCEMENT_DELETED"
  | "DAILY_REPORT_SUBMITTED"
  | "ACCESS_REQUEST_REVIEWED";

type RecordAuditInput = {
  action: AuditAction | string;
  actor?: { email?: string | null; role?: string | null } | null;
  userId?: number | null;
  targetType?: string | null;
  targetId?: number | null;
  summary?: string | null;
  metadata?: Record<string, unknown> | null;
  ipAddress?: string | null;
};

export async function recordAudit(input: RecordAuditInput) {
  try {
    let resolvedUserId = input.userId ?? null;
    if (!resolvedUserId && input.actor?.email) {
      const user = await prisma.user.findUnique({
        where: { email: input.actor.email.toLowerCase() },
        select: { id: true },
      });
      resolvedUserId = user?.id ?? null;
    }

    await prisma.auditLog.create({
      data: {
        userId: resolvedUserId,
        userEmail: input.actor?.email?.trim().toLowerCase() ?? null,
        userRole: input.actor?.role ?? null,
        action: input.action,
        targetType: input.targetType ?? null,
        targetId: input.targetId ?? null,
        summary: input.summary ?? null,
        metadata: input.metadata ? JSON.stringify(input.metadata) : null,
        ipAddress: input.ipAddress ?? null,
      },
    });
  } catch (err) {
    console.error("[audit] failed to record entry:", err);
  }
}

export function getRequestIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || null;
  return req.headers.get("x-real-ip") || null;
}
