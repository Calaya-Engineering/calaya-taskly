import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { getAuthedUserOrNull, getMembership } from "@/lib/chat";

const MAX_MESSAGE_LENGTH = 4000;
const DEFAULT_PAGE_SIZE = 50;

function parseChannelId(value: string): number | null {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : null;
}

/**
 * GET /api/chat/channels/[id]/messages — paginated message history.
 * Query:
 *   - before  (ISO timestamp; returns messages strictly older than this)
 *   - limit   (default 50, max 200)
 *
 * Returns newest-first in the JSON, but the UI should reverse for display.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const channelId = parseChannelId(id);
  if (channelId === null) {
    return NextResponse.json({ error: "Invalid channel id" }, { status: 400 });
  }

  const me = await getAuthedUserOrNull(auth.email);
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const membership = await getMembership(channelId, me.id);
  if (!membership) {
    return NextResponse.json({ error: "Not a member of this channel" }, { status: 403 });
  }

  const { searchParams } = req.nextUrl;
  const before = searchParams.get("before");
  const limitRaw = Number.parseInt(searchParams.get("limit") || "", 10);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 200) : DEFAULT_PAGE_SIZE;

  const where: any = { channelId };
  if (before) {
    const beforeDate = new Date(before);
    if (!isNaN(beforeDate.getTime())) where.createdAt = { lt: beforeDate };
  }

  const messages = await prisma.chatMessage.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      sender: { select: { id: true, name: true, email: true, role: true } },
    },
  });

  return NextResponse.json({
    channelId,
    messages: messages.map((m) => ({
      id: m.id,
      content: m.content,
      createdAt: m.createdAt,
      editedAt: m.editedAt,
      sender: {
        id: m.sender.id,
        name: m.sender.name || m.sender.email.split("@")[0],
        role: m.sender.role,
      },
      mine: m.senderId === me.id,
    })),
    hasMore: messages.length === limit,
  });
}

/**
 * POST /api/chat/channels/[id]/messages — send a message.
 * Body: { content: string }
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const channelId = parseChannelId(id);
  if (channelId === null) {
    return NextResponse.json({ error: "Invalid channel id" }, { status: 400 });
  }

  const me = await getAuthedUserOrNull(auth.email);
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const membership = await getMembership(channelId, me.id);
  if (!membership) {
    return NextResponse.json({ error: "Not a member of this channel" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const content = typeof body?.content === "string" ? body.content.trim() : "";
  if (!content) return NextResponse.json({ error: "Message content is required" }, { status: 400 });
  if (content.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: `Message is too long (max ${MAX_MESSAGE_LENGTH} chars)` }, { status: 400 });
  }

  const [message] = await prisma.$transaction([
    prisma.chatMessage.create({
      data: { channelId, senderId: me.id, content },
      include: { sender: { select: { id: true, name: true, email: true, role: true } } },
    }),
    // Bump channel updatedAt so the channel list re-sorts.
    prisma.chatChannel.update({ where: { id: channelId }, data: { updatedAt: new Date() } }),
    // Mark sender's own lastReadAt — they've obviously "read" their own message.
    prisma.chatChannelMember.update({
      where: { channelId_userId: { channelId, userId: me.id } },
      data: { lastReadAt: new Date() },
    }),
  ]);

  emitRealtimeEvent({
    type: "chat:message",
    entity: "chat",
    action: "message",
    entityId: channelId,
    payload: { messageId: message.id, senderId: me.id },
  });

  return NextResponse.json({
    id: message.id,
    channelId,
    content: message.content,
    createdAt: message.createdAt,
    sender: {
      id: message.sender.id,
      name: message.sender.name || message.sender.email.split("@")[0],
      role: message.sender.role,
    },
    mine: true,
  });
}
