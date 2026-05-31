import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { createNotification } from "@/lib/notifications";
import { recordAudit, getRequestIp } from "@/lib/audit";

const RSVP_RESPONSES = new Set(["YES", "NO"]);
const EVENT_TYPES = new Set(["EVENT", "MEETING", "TRAINING"]);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const taskId = Number.parseInt(id, 10);
  if (!Number.isFinite(taskId)) {
    return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
  }

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: { id: true, type: true, title: true },
  });
  if (!task || !EVENT_TYPES.has((task.type || "").toUpperCase())) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const [responses, me] = await Promise.all([
    prisma.eventResponse.findMany({
      where: { taskId },
      orderBy: { updatedAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true, role: true, department: true } },
      },
    }),
    prisma.user.findUnique({
      where: { email: auth.email.toLowerCase() },
      select: { id: true },
    }),
  ]);

  const yes = responses.filter((response) => response.response === "YES").length;
  const no = responses.filter((response) => response.response === "NO").length;
  const mine = me ? responses.find((response) => response.userId === me.id) : null;

  return NextResponse.json({
    taskId,
    response: mine?.response || null,
    counts: { yes, no, total: responses.length },
    responses: responses.map((response) => ({
      id: response.id,
      userId: response.userId,
      response: response.response,
      respondedAt: response.respondedAt,
      updatedAt: response.updatedAt,
      name: response.user?.name || response.user?.email?.split("@")[0] || "Unknown",
      email: response.user?.email,
      role: response.user?.role,
      department: response.user?.department,
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
  const taskId = Number.parseInt(id, 10);
  if (!Number.isFinite(taskId)) {
    return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  const response = typeof body?.response === "string" ? body.response.trim().toUpperCase() : "";
  if (!RSVP_RESPONSES.has(response)) {
    return NextResponse.json({ error: "RSVP response must be YES or NO" }, { status: 400 });
  }

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: {
      id: true,
      type: true,
      title: true,
      createdById: true,
    },
  });
  if (!task || !EVENT_TYPES.has((task.type || "").toUpperCase())) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const me = await prisma.user.findUnique({
    where: { email: auth.email.toLowerCase() },
    select: { id: true, name: true, email: true },
  });
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const saved = await prisma.eventResponse.upsert({
    where: { taskId_userId: { taskId, userId: me.id } },
    create: { taskId, userId: me.id, response },
    update: { response },
  });

  emitRealtimeEvent({
    type: "event:rsvp_updated",
    entity: "task",
    action: "rsvp_updated",
    entityId: taskId,
  });

  void recordAudit({
    action: "EVENT_RSVP_UPDATED",
    actor: { email: auth.email, role: auth.role },
    userId: me.id,
    targetType: "TASK",
    targetId: taskId,
    summary: `${me.name || me.email.split("@")[0]} RSVP'd ${response} to "${task.title}"`,
    metadata: { response },
    ipAddress: getRequestIp(req),
  });

  if (task.createdById && task.createdById !== me.id) {
    createNotification({
      actorEmail: auth.email,
      actionType: "EVENT_RSVP_UPDATED",
      targetId: taskId,
      message: `${me.name || me.email.split("@")[0]} RSVP'd ${response} to "${task.title}"`,
      recipients: { userIds: [task.createdById], includeActor: false },
      sendEmail: false,
      linkPath: `/open/item?type=event&id=${taskId}`,
    });
  }

  return NextResponse.json({
    ok: true,
    response: saved.response,
    respondedAt: saved.respondedAt,
    updatedAt: saved.updatedAt,
  });
}
