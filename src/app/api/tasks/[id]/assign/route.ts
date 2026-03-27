import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitTaskEvent } from "@/lib/task-events";
import { notifyTaskAssignments, notifyTaskUnassigned } from "@/lib/task-notifications";
import {
  assertHodAssigneeAccess,
  canUserModifyTask,
  getTaskAccessUserByEmail,
  isStaffLikeRole,
} from "@/lib/task-access";

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

  const currentUser = await getTaskAccessUserByEmail(auth.email);
  if (!currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
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
      include: {
        createdBy: { select: { id: true, email: true, name: true, role: true } },
        assignments: {
          include: {
            user: { select: { id: true, email: true, name: true, role: true, department: true } },
          },
        },
      },
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (!canUserModifyTask(currentUser, task) || isStaffLikeRole(currentUser.role)) {
      return NextResponse.json({ error: "You do not have permission to reassign this task" }, { status: 403 });
    }

    try {
      await assertHodAssigneeAccess(currentUser, userIds);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Invalid task assignment scope" },
        { status: 403 }
      );
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

    const updatedTask = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        createdBy: { select: { id: true, email: true, name: true, role: true } },
        assignments: {
          include: {
            user: { select: { id: true, email: true, name: true, role: true, department: true } },
          },
        },
      },
    });
    if (updatedTask) {
      await notifyTaskAssignments({
        actorEmail: auth.email,
        task: updatedTask,
        mode: "updated",
      });
    }

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

  const currentUser = await getTaskAccessUserByEmail(auth.email);
  if (!currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
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
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        assignments: {
          select: {
            userId: true,
          },
        },
      },
    });
    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (!canUserModifyTask(currentUser, existingTask) || isStaffLikeRole(currentUser.role)) {
      return NextResponse.json({ error: "You do not have permission to reassign this task" }, { status: 403 });
    }

    try {
      await assertHodAssigneeAccess(currentUser, [userId]);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Invalid task assignment scope" },
        { status: 403 }
      );
    }

    const deleted = await prisma.taskAssignment.deleteMany({
      where: { taskId, userId },
    });

    if (deleted.count > 0) {
      emitTaskEvent({ type: "task:unassigned", taskId, userId });
      await notifyTaskUnassigned({
        actorEmail: auth.email,
        task: existingTask,
        recipientIds: [userId],
      });
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
