import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { createNotification } from "@/lib/notifications";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { recordAudit, getRequestIp } from "@/lib/audit";

const ACKNOWLEDGEABLE_TYPES = new Set(["EVENT", "MEETING", "TRAINING"]);

/**
 * GET /api/tasks/[id]/acknowledge — list acknowledgements for an event/meeting.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const taskId = Number.parseInt(id, 10);
  if (!Number.isFinite(taskId)) {
    return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: { id: true, type: true, title: true },
    });
    if (!task) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    const acks = await prisma.eventAcknowledgement.findMany({
      where: { taskId },
      orderBy: { acknowledgedAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true, role: true, department: true } },
      },
    });

    let acknowledgedByMe = false;
    if (auth.email) {
      const me = await prisma.user.findUnique({
        where: { email: auth.email.toLowerCase() },
        select: { id: true },
      });
      if (me) acknowledgedByMe = acks.some((a) => a.userId === me.id);
    }

    return NextResponse.json({
      taskId,
      count: acks.length,
      acknowledgedByMe,
      acknowledgements: acks.map((a) => ({
        id: a.id,
        userId: a.userId,
        name: a.user?.name || a.user?.email?.split("@")[0] || "Unknown",
        email: a.user?.email,
        role: a.user?.role,
        department: a.user?.department,
        acknowledgedAt: a.acknowledgedAt,
      })),
    });
  } catch (err) {
    console.error("Error fetching acknowledgements:", err);
    return NextResponse.json({ error: "Failed to fetch acknowledgements" }, { status: 500 });
  }
}

/**
 * POST /api/tasks/[id]/acknowledge — current user acknowledges the event (idempotent).
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const taskId = Number.parseInt(id, 10);
  if (!Number.isFinite(taskId)) {
    return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: { id: true, type: true, title: true, createdById: true, createdBy: { select: { email: true, name: true } } },
    });
    if (!task) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    if (!ACKNOWLEDGEABLE_TYPES.has((task.type || "").toUpperCase())) {
      return NextResponse.json(
        { error: "Acknowledgement is only available for events, meetings, or trainings" },
        { status: 400 }
      );
    }

    const me = await prisma.user.findUnique({
      where: { email: auth.email.toLowerCase() },
      select: { id: true, name: true, email: true },
    });
    if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const ack = await prisma.eventAcknowledgement.upsert({
      where: { taskId_userId: { taskId, userId: me.id } },
      create: { taskId, userId: me.id },
      update: {},
    });

    const isNewAck = ack.acknowledgedAt.getTime() === ack.acknowledgedAt.getTime() &&
      Math.abs(Date.now() - ack.acknowledgedAt.getTime()) < 5_000;

    if (isNewAck) {
      emitRealtimeEvent({
        type: "event:acknowledged",
        entity: "task",
        action: "acknowledged",
        entityId: taskId,
      });

      void recordAudit({
        action: "EVENT_ACKNOWLEDGED",
        actor: { email: auth.email, role: auth.role },
        userId: me.id,
        targetType: "TASK",
        targetId: taskId,
        summary: `Acknowledged ${task.type?.toLowerCase() || "event"}: "${task.title}"`,
        ipAddress: getRequestIp(req),
      });

      if (task.createdById && task.createdById !== me.id) {
        createNotification({
          actorEmail: auth.email,
          actionType: "EVENT_ACKNOWLEDGED",
          targetId: taskId,
          message: `${me.name || me.email.split("@")[0]} acknowledged your ${task.type?.toLowerCase() || "event"}: ${task.title}`,
          recipients: { userIds: [task.createdById], includeActor: false },
          sendEmail: false,
          linkPath: `/open/item?type=event&id=${taskId}`,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      acknowledgedAt: ack.acknowledgedAt,
      isNew: isNewAck,
    });
  } catch (err) {
    console.error("Error acknowledging event:", err);
    return NextResponse.json({ error: "Failed to acknowledge event" }, { status: 500 });
  }
}

/**
 * DELETE /api/tasks/[id]/acknowledge — un-acknowledge (in case staff hit it by mistake).
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const taskId = Number.parseInt(id, 10);
  if (!Number.isFinite(taskId)) {
    return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
  }

  const me = await prisma.user.findUnique({
    where: { email: auth.email.toLowerCase() },
    select: { id: true },
  });
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

  await prisma.eventAcknowledgement.deleteMany({
    where: { taskId, userId: me.id },
  });

  emitRealtimeEvent({
    type: "event:acknowledgement_removed",
    entity: "task",
    action: "acknowledgement_removed",
    entityId: taskId,
  });

  return NextResponse.json({ ok: true });
}
