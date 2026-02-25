import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitTaskEvent } from "@/lib/task-events";

const taskInclude = {
  createdBy: { select: { id: true, email: true, name: true, role: true } },
  assignments: {
    include: {
      user: { select: { id: true, email: true, name: true, role: true, department: true } },
    },
  },
};

/**
 * GET /api/tasks/[id] - Fetch a single task by ID.
 */
export async function GET(
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

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: taskInclude,
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
  }
}

/**
 * PATCH /api/tasks/[id] - Update a task.
 * Body: { title?, description?, department?, priority?, status?, type?, startDate?, dueDate?, estimatedHours?, visibility?, assigneeIds? }
 */
export async function PATCH(
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
    const existing = await prisma.task.findUnique({
      where: { id: taskId },
      select: { id: true, createdById: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const body = await req.json();
    const {
      title,
      description,
      department,
      priority,
      status,
      type,
      startDate,
      dueDate,
      estimatedHours,
      visibility,
      assigneeIds,
    } = body as {
      title?: string;
      description?: string;
      department?: string;
      priority?: string;
      status?: string;
      type?: string;
      startDate?: string;
      dueDate?: string;
      estimatedHours?: number;
      visibility?: string;
      assigneeIds?: number[];
    };

    const data: Record<string, unknown> = {};
    if (title != null && typeof title === "string" && title.trim()) data.title = title.trim();
    if (description !== undefined) data.description = description?.trim() || null;
    if (department !== undefined) data.department = department?.trim() || null;
    if (priority) data.priority = priority;
    if (status) data.status = status;
    if (type) data.type = type;
    if (startDate !== undefined) data.startDate = startDate ? new Date(startDate) : null;
    if (dueDate !== undefined) data.dueDate = dueDate ? new Date(dueDate) : null;
    if (estimatedHours !== undefined) data.estimatedHours = estimatedHours ?? null;
    if (visibility) data.visibility = visibility;

    const updateData: Record<string, unknown> = { ...data };

    if (Array.isArray(assigneeIds)) {
      await prisma.taskAssignment.deleteMany({ where: { taskId } });
      if (assigneeIds.length > 0) {
        await prisma.taskAssignment.createMany({
          data: assigneeIds.map((userId: number) => ({
            taskId,
            userId,
            assignedById: assigner.id,
          })),
          skipDuplicates: true,
        });
        for (const uid of assigneeIds) {
          emitTaskEvent({ type: "task:assigned", taskId, userId: uid });
        }
      }
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: updateData,
      include: taskInclude,
    });

    emitTaskEvent({ type: "task:updated", taskId });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
