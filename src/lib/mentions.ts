import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notifications";

const MENTION_TOKEN_RE = /@\[([^|\]]+)\|(\d+)\]/g;

export type MentionSourceType =
  | "DOCUMENT"
  | "TASK_COMPLETION"
  | "TENDER_CREATED"
  | "TENDER_COMMENT"
  | "DAILY_REPORT"
  | "ANNOUNCEMENT";

export type ParsedMention = {
  userId: number;
  name: string;
};

export function parseMentions(text: string | null | undefined): ParsedMention[] {
  if (!text) return [];
  const found: Map<number, string> = new Map();
  for (const match of text.matchAll(MENTION_TOKEN_RE)) {
    const name = (match[1] || "").trim();
    const id = Number.parseInt(match[2] || "", 10);
    if (Number.isFinite(id) && id > 0 && !found.has(id)) {
      found.set(id, name);
    }
  }
  return Array.from(found.entries()).map(([userId, name]) => ({ userId, name }));
}

/**
 * Replace @[Name|123] tokens with plain @Name for display in emails / notification bodies.
 */
export function stripMentionTokens(text: string | null | undefined): string {
  if (!text) return "";
  return text.replace(MENTION_TOKEN_RE, (_m, name) => `@${(name || "").trim()}`);
}

type ProcessMentionsInput = {
  text: string | null | undefined;
  sourceType: MentionSourceType;
  sourceId: number;
  actor: { email: string; role: string; name?: string | null };
  notificationActionType?: string;
  notificationMessage?: string;
  linkPath?: string;
  emailSubject?: string;
  context?: string;
};

/**
 * Persists Mention rows for each @-mention in `text` and fires a notification to each mentioned user.
 * Returns the list of mentioned user IDs (after de-duplication and validation).
 */
export async function processMentions(input: ProcessMentionsInput): Promise<number[]> {
  const parsed = parseMentions(input.text);
  if (parsed.length === 0) return [];

  const ids = parsed.map((m) => m.userId);
  const validUsers = await prisma.user.findMany({
    where: { id: { in: ids } },
    select: { id: true },
  });
  const validIds = validUsers.map((u) => u.id);
  if (validIds.length === 0) return [];

  let actorUserId: number | null = null;
  if (input.actor.email) {
    const actorUser = await prisma.user.findUnique({
      where: { email: input.actor.email.toLowerCase() },
      select: { id: true },
    });
    actorUserId = actorUser?.id ?? null;
  }

  await prisma.mention.createMany({
    data: validIds.map((mentionedUserId) => ({
      mentionedUserId,
      actorUserId,
      sourceType: input.sourceType,
      sourceId: input.sourceId,
      context: input.context ?? null,
    })),
  });

  const actorName = input.actor.name?.trim() || input.actor.email.split("@")[0];
  const defaultMessage = `${actorName} (${input.actor.role}) mentioned you${
    input.context ? `: "${input.context}"` : ""
  }`;

  // Filter out self-mentions to avoid notifying the actor.
  const recipients = actorUserId
    ? validIds.filter((id) => id !== actorUserId)
    : validIds;

  if (recipients.length > 0) {
    createNotification({
      actorEmail: input.actor.email,
      actionType: input.notificationActionType || "MENTION",
      targetId: input.sourceId,
      message: input.notificationMessage || defaultMessage,
      recipients: { userIds: recipients, includeActor: false },
      sendEmail: true,
      emailSubject: input.emailSubject || `You were mentioned by ${actorName}`,
      linkPath: input.linkPath,
    });
  }

  return validIds;
}
