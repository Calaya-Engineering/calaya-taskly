import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { recordAudit, getRequestIp } from "@/lib/audit";
import { processMentions, stripMentionTokens } from "@/lib/mentions";

function parseTenderId(value: string): number | null {
  const num = Number.parseInt(value, 10);
  if (Number.isFinite(num)) return num;
  return null;
}

async function resolveTender(idParam: string) {
  const numericId = parseTenderId(idParam);
  if (numericId !== null) {
    const byId = await prisma.tender.findUnique({ where: { id: numericId } });
    if (byId) return byId;
  }
  return prisma.tender.findUnique({ where: { referenceNo: idParam } });
}

/**
 * GET /api/tenders/[id]/comments — list comments (visible to all authenticated users).
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const tender = await resolveTender(id);
  if (!tender) return NextResponse.json({ error: "Tender not found" }, { status: 404 });

  const comments = await prisma.tenderComment.findMany({
    where: { tenderId: tender.id },
    orderBy: { createdAt: "asc" },
    include: {
      user: { select: { id: true, name: true, email: true, role: true, department: true } },
    },
  });

  return NextResponse.json({
    tenderId: tender.id,
    referenceNo: tender.referenceNo,
    count: comments.length,
    comments: comments.map((c) => ({
      id: c.id,
      userId: c.userId,
      name: c.user?.name || c.user?.email?.split("@")[0] || "Unknown",
      email: c.user?.email,
      role: c.user?.role,
      department: c.user?.department,
      content: c.content,
      contentDisplay: stripMentionTokens(c.content),
      createdAt: c.createdAt,
    })),
  });
}

/**
 * POST /api/tenders/[id]/comments — add a comment (any authenticated user).
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const tender = await resolveTender(id);
  if (!tender) return NextResponse.json({ error: "Tender not found" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const content = typeof body?.content === "string" ? body.content.trim() : "";
  if (!content) {
    return NextResponse.json({ error: "Comment content is required" }, { status: 400 });
  }
  if (content.length > 5000) {
    return NextResponse.json({ error: "Comment is too long (max 5000 characters)" }, { status: 400 });
  }

  const me = await prisma.user.findUnique({
    where: { email: auth.email.toLowerCase() },
    select: { id: true, name: true, email: true },
  });
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const comment = await prisma.tenderComment.create({
    data: {
      tenderId: tender.id,
      userId: me.id,
      content,
    },
  });

  emitRealtimeEvent({
    type: "tender:commented",
    entity: "tender",
    action: "commented",
    entityId: tender.id,
  });

  void recordAudit({
    action: "TENDER_COMMENT_POSTED",
    actor: { email: auth.email, role: auth.role },
    userId: me.id,
    targetType: "TENDER",
    targetId: tender.id,
    summary: `Commented on tender "${tender.title}": ${stripMentionTokens(content).slice(0, 140)}`,
    ipAddress: getRequestIp(req),
  });

  void processMentions({
    text: content,
    sourceType: "TENDER_COMMENT",
    sourceId: comment.id,
    actor: { email: auth.email, role: auth.role, name: me.name },
    notificationActionType: "MENTION_TENDER_COMMENT",
    notificationMessage: `${me.name || me.email.split("@")[0]} mentioned you in tender "${tender.title}"`,
    emailSubject: `Mentioned in tender — ${tender.title}`,
    linkPath: `/open/item?type=tender&id=${tender.id}`,
    context: stripMentionTokens(content).slice(0, 200),
  });

  return NextResponse.json({
    id: comment.id,
    tenderId: tender.id,
    userId: me.id,
    name: me.name || me.email.split("@")[0],
    content: comment.content,
    contentDisplay: stripMentionTokens(comment.content),
    createdAt: comment.createdAt,
  });
}
