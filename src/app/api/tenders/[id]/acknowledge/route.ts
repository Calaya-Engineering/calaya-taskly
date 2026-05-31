import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { recordAudit, getRequestIp } from "@/lib/audit";

function parseTenderId(value: string): number | null {
  const num = Number.parseInt(value, 10);
  return Number.isFinite(num) ? num : null;
}

async function resolveTender(idParam: string) {
  const numericId = parseTenderId(idParam);
  if (numericId !== null) {
    const byId = await prisma.tender.findUnique({ where: { id: numericId } });
    if (byId) return byId;
  }
  return prisma.tender.findUnique({ where: { referenceNo: idParam } });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const tender = await resolveTender(id);
  if (!tender) return NextResponse.json({ error: "Tender not found" }, { status: 404 });

  const [acknowledgements, me] = await Promise.all([
    prisma.tenderAcknowledgement.findMany({
      where: { tenderId: tender.id },
      orderBy: { acknowledgedAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true, role: true, department: true } },
      },
    }),
    prisma.user.findUnique({
      where: { email: auth.email.toLowerCase() },
      select: { id: true },
    }),
  ]);

  return NextResponse.json({
    tenderId: tender.id,
    referenceNo: tender.referenceNo,
    count: acknowledgements.length,
    acknowledgedByMe: me ? acknowledgements.some((ack) => ack.userId === me.id) : false,
    acknowledgements: acknowledgements.map((ack) => ({
      id: ack.id,
      userId: ack.userId,
      name: ack.user?.name || ack.user?.email?.split("@")[0] || "Unknown",
      email: ack.user?.email,
      role: ack.user?.role,
      department: ack.user?.department,
      acknowledgedAt: ack.acknowledgedAt,
    })),
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const tender = await resolveTender(id);
  if (!tender) return NextResponse.json({ error: "Tender not found" }, { status: 404 });

  const me = await prisma.user.findUnique({
    where: { email: auth.email.toLowerCase() },
    select: { id: true, name: true, email: true },
  });
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const existing = await prisma.tenderAcknowledgement.findUnique({
    where: { tenderId_userId: { tenderId: tender.id, userId: me.id } },
  });

  const ack = await prisma.tenderAcknowledgement.upsert({
    where: { tenderId_userId: { tenderId: tender.id, userId: me.id } },
    create: { tenderId: tender.id, userId: me.id },
    update: {},
  });

  if (!existing) {
    emitRealtimeEvent({
      type: "tender:acknowledged",
      entity: "tender",
      action: "acknowledged",
      entityId: tender.id,
    });

    void recordAudit({
      action: "TENDER_ACKNOWLEDGED",
      actor: { email: auth.email, role: auth.role },
      userId: me.id,
      targetType: "TENDER",
      targetId: tender.id,
      summary: `Acknowledged tender "${tender.title}"`,
      ipAddress: getRequestIp(req),
    });
  }

  return NextResponse.json({
    ok: true,
    isNew: !existing,
    acknowledgedAt: ack.acknowledgedAt,
  });
}
