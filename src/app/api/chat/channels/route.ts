import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import {
  ensureDepartmentChannel,
  ensureDirectChannel,
  getAuthedUserOrNull,
} from "@/lib/chat";

/**
 * GET /api/chat/channels — list the current user's channels.
 *
 * Ensures the user's department channel exists (lazy creation), then returns
 * every channel the user is a member of, with the latest message preview,
 * unread count, and (for DMs) the counterpart's name + role.
 */
export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const me = await getAuthedUserOrNull(auth.email);
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Lazy bootstrap.
  await ensureDepartmentChannel(me);

  const memberships = await prisma.chatChannelMember.findMany({
    where: { userId: me.id },
    include: {
      channel: {
        select: {
          id: true,
          type: true,
          name: true,
          departmentName: true,
          updatedAt: true,
          members: {
            select: {
              userId: true,
              user: {
                select: { id: true, name: true, email: true, role: true, department: true },
              },
            },
          },
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
            select: {
              id: true,
              content: true,
              createdAt: true,
              sender: { select: { id: true, name: true, email: true } },
            },
          },
        },
      },
    },
  });

  const channelIds = memberships.map((m) => m.channelId);
  const unreadByChannel = new Map<number, number>();
  if (channelIds.length > 0) {
    // Count messages newer than lastReadAt, per channel.
    for (const m of memberships) {
      const unread = await prisma.chatMessage.count({
        where: {
          channelId: m.channelId,
          NOT: { senderId: me.id },
          ...(m.lastReadAt ? { createdAt: { gt: m.lastReadAt } } : {}),
        },
      });
      unreadByChannel.set(m.channelId, unread);
    }
  }

  const channels = memberships.map((m) => {
    const c = m.channel;
    const lastMessage = c.messages[0];
    const others = c.members.filter((member) => member.userId !== me.id);
    const counterpart = c.type === "DIRECT" ? others[0]?.user : null;

    const displayName =
      c.type === "DEPARTMENT"
        ? c.name || `${c.departmentName || "Team"} Department`
        : counterpart?.name || counterpart?.email?.split("@")[0] || "Direct Message";

    return {
      id: c.id,
      type: c.type as "DEPARTMENT" | "DIRECT",
      name: displayName,
      departmentName: c.departmentName,
      counterpart: counterpart
        ? {
            id: counterpart.id,
            name: counterpart.name || counterpart.email.split("@")[0],
            role: counterpart.role,
            department: counterpart.department,
          }
        : null,
      memberCount: c.members.length,
      lastMessage: lastMessage
        ? {
            id: lastMessage.id,
            content: lastMessage.content,
            createdAt: lastMessage.createdAt,
            sender: {
              id: lastMessage.sender.id,
              name: lastMessage.sender.name || lastMessage.sender.email.split("@")[0],
            },
          }
        : null,
      unread: unreadByChannel.get(c.id) ?? 0,
      updatedAt: lastMessage ? lastMessage.createdAt : c.updatedAt,
    };
  });

  // Sort newest activity first.
  channels.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return NextResponse.json({ channels });
}

/**
 * POST /api/chat/channels — start a direct message.
 *
 * Body: { userId: number }
 * Returns the channel record.
 */
export async function POST(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const me = await getAuthedUserOrNull(auth.email);
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const otherUserId = Number.parseInt(String(body?.userId ?? ""), 10);
  if (!Number.isFinite(otherUserId)) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }
  if (otherUserId === me.id) {
    return NextResponse.json({ error: "Cannot start a chat with yourself" }, { status: 400 });
  }

  try {
    const channelId = await ensureDirectChannel(me, otherUserId);
    return NextResponse.json({ channelId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create channel";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
