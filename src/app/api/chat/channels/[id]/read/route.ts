import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { getAuthedUserOrNull, getMembership } from "@/lib/chat";

/**
 * POST /api/chat/channels/[id]/read — bump the current user's lastReadAt.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const channelId = Number.parseInt(id, 10);
  if (!Number.isFinite(channelId)) {
    return NextResponse.json({ error: "Invalid channel id" }, { status: 400 });
  }

  const me = await getAuthedUserOrNull(auth.email);
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const membership = await getMembership(channelId, me.id);
  if (!membership) {
    return NextResponse.json({ error: "Not a member of this channel" }, { status: 403 });
  }

  const now = new Date();
  await prisma.chatChannelMember.update({
    where: { channelId_userId: { channelId, userId: me.id } },
    data: { lastReadAt: now },
  });

  return NextResponse.json({ ok: true, lastReadAt: now });
}
