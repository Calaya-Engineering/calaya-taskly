import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitTaskEvent } from "@/lib/task-events";
import { createNotification } from "@/lib/notifications";

/**
 * GET /api/tasks - List tasks with optional filters.
 * Query: status, department, assigneeId (tasks assigned to user)
 */
export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const department = searchParams.get("department");
  const assigneeId = searchParams.get("assigneeId");
  const type = searchParams.get("type");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "50", 10) || 50, 100);

  try {
    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (department) where.department = department;
    if (type) {
      if (type.includes(",")) {
        where.type = { in: type.split(",") };
      } else {
        where.type = type;
      }
    } else {
      where.type = { not: "EVENT" };
    }
    if (assigneeId) {
      const uid = parseInt(assigneeId, 10);
      if (!Number.isNaN(uid)) where.assignments = { some: { userId: uid } };
    }

    const tasks = await prisma.task.findMany({
      where,
      take: limit,
      include: {
        createdBy: { select: { id: true, email: true, name: true, role: true } },
        assignments: {
          include: {
            user: { select: { id: true, email: true, name: true, role: true, department: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to fetch tasks", ...(process.env.NODE_ENV === "development" && { details: message }) },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tasks - Create task with assignments.
 */
export async function POST(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const creator = await prisma.user.findUnique({
    where: { email: auth.email },
    select: { id: true },
  });
  if (!creator) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const {
      title,
      description,
      department,
      priority = "MEDIUM",
      type = "TASK",
      startDate,
      dueDate,
      estimatedHours,
      visibility = "ASSIGNED_ONLY",
      assigneeIds = [],
    } = body as {
      title?: string;
      description?: string;
      department?: string;
      priority?: string;
      type?: string;
      startDate?: string;
      dueDate?: string;
      estimatedHours?: number;
      visibility?: string;
      assigneeIds?: number[];
    };

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        department: department?.trim() || null,
        priority: priority || "MEDIUM",
        type: type || "TASK",
        createdById: creator.id,
        startDate: startDate ? new Date(startDate) : null,
        dueDate: dueDate ? new Date(dueDate) : null,
        estimatedHours: estimatedHours ?? null,
        visibility: visibility || "ASSIGNED_ONLY",
        assignments:
          Array.isArray(assigneeIds) && assigneeIds.length > 0
            ? {
              create: assigneeIds.map((userId: number) => ({
                userId,
                assignedById: creator.id,
              })),
            }
            : undefined,
      },
      include: {
        createdBy: { select: { id: true, email: true, name: true, role: true } },
        assignments: {
          include: {
            user: { select: { id: true, email: true, name: true, role: true, department: true } },
          },
        },
      },
    });

    emitTaskEvent({ type: "task:created", taskId: task.id });
    for (const a of task.assignments) {
      emitTaskEvent({ type: "task:assigned", taskId: task.id, userId: a.userId });
    }

    createNotification({
      actorEmail: auth.email,
      actionType: 'CREATE_TASK',
      targetId: task.id,
      message: `${auth.name || auth.email.split('@')[0]} (${auth.role}) created a new task: ${task.title}`
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to create task", ...(process.env.NODE_ENV === "development" && { details: message }) },
      { status: 500 }
    );
  }
}
