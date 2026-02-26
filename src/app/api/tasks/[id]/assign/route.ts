import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitTaskEvent } from "@/lib/task-events";
import { createNotification } from "@/lib/notifications";

/**
 * POST /api/tasks/[id]/assign - Assign user(s) to a task.
 * Body: { userId?: number, userIds?: number[] }
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const assigner = await prisma.user.findUnique({
    where: { email: auth.email },
    select: { id: true },
  });
  if (!assigner) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { id } = await params;
  const taskId = parseInt(id, 10);
  if (Number.isNaN(taskId)) {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const userId = body.userId as number | undefined;
    const userIds = (body.userIds as number[] | undefined) ?? (userId != null ? [userId] : []);

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json({ error: "At least one userId or userIds required" }, { status: 400 });
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: { id: true },
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const created = await prisma.taskAssignment.createMany({
      data: userIds.map((uid) => ({
        taskId,
        userId: uid,
        assignedById: assigner.id,
      })),
      skipDuplicates: true,
    });

    for (const uid of userIds) {
      emitTaskEvent({ type: "task:assigned", taskId, userId: uid });
    }

    createNotification({
      actorEmail: auth.email,
      actionType: 'ASSIGN_TASK',
      targetId: taskId,
      message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) assigned a task.`
    });

    return NextResponse.json({
      success: true,
      assigned: created.count,
    });
  } catch (error) {
    console.error("Error assigning task:", error);
    return NextResponse.json({ error: "Failed to assign task" }, { status: 500 });
  }
}

/**
 * DELETE /api/tasks/[id]/assign?userId=123 - Unassign user from task.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const taskId = parseInt(id, 10);
  if (Number.isNaN(taskId)) {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const userIdParam = searchParams.get("userId");
  const userId = userIdParam ? parseInt(userIdParam, 10) : NaN;
  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: "userId query param required" }, { status: 400 });
  }

  try {
    const deleted = await prisma.taskAssignment.deleteMany({
      where: { taskId, userId },
    });

    if (deleted.count > 0) {
      emitTaskEvent({ type: "task:unassigned", taskId, userId });
    }

    return NextResponse.json({
      success: true,
      unassigned: deleted.count,
    });
  } catch (error) {
    console.error("Error unassigning task:", error);
    return NextResponse.json({ error: "Failed to unassign task" }, { status: 500 });
  }
}
