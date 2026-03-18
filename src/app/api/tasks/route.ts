import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitTaskEvent } from "@/lib/task-events";
import { emitAnnouncementEvent } from "@/lib/announcement-events";
import { createNotification } from "@/lib/notifications";
import { getManagedDepartmentNamesByUserId } from "@/lib/hod-departments";

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
  const compact = searchParams.get("compact") === "true";
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "50", 10) || 50, 100);

  try {
    const currentUser = await prisma.user.findUnique({
      where: { email: auth.email },
      select: { id: true, role: true, department: true }
    });

    const where: any = {};
    if (status) where.status = status;
    if (type) {
      if (type.includes(",")) {
        where.type = { in: type.split(",") };
      } else {
        where.type = type;
      }
    } else {
      where.type = { not: "EVENT" };
    }

    if (currentUser?.role === "HOD") {
      const managedDepartments = await getManagedDepartmentNamesByUserId(currentUser.id);
      const scopedDepartments = managedDepartments.length > 0
        ? managedDepartments
        : currentUser.department
          ? [currentUser.department]
          : [];
      const hodOrConditions = [
        ...(scopedDepartments.length > 0 ? [{ department: { in: scopedDepartments } }] : []),
        { assignments: { some: { userId: currentUser.id } } }
      ];

      const additionalAnds: any[] = [];
      if (department) additionalAnds.push({ department });
      if (assigneeId) {
        const uid = parseInt(assigneeId, 10);
        if (!Number.isNaN(uid)) additionalAnds.push({ assignments: { some: { userId: uid } } });
      }

      if (additionalAnds.length > 0) {
        where.AND = [
          { OR: hodOrConditions },
          ...additionalAnds
        ];
      } else {
        where.OR = hodOrConditions;
      }
    } else {
      if (department) where.department = department;
      if (assigneeId) {
        const uid = parseInt(assigneeId, 10);
        if (!Number.isNaN(uid)) where.assignments = { some: { userId: uid } };
      }
    }

    const baseQuery = {
      where,
      take: limit,
      orderBy: { createdAt: "desc" as const },
    };

    const tasks = compact
      ? await prisma.task.findMany({
        ...baseQuery,
        select: {
          id: true,
          status: true,
          department: true,
          createdAt: true,
          escalated: true,
          escalatedAt: true,
        },
      })
      : await prisma.task.findMany({
        ...baseQuery,
        include: {
          createdBy: { select: { id: true, email: true, name: true, role: true } },
          assignments: {
            include: {
              user: { select: { id: true, email: true, name: true, role: true, department: true } },
            },
          },
        },
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

    // Put all meetings/events in the announcement table as well
    if (task.type === "MEETING" || task.type === "EVENT") {
      try {
        const announcement = await prisma.announcement.create({
          data: {
            title: `${task.type === "MEETING" ? "📅 Meeting" : "🗓️ Event"}: ${task.title}`,
            description: task.description || `A new ${task.type.toLowerCase()} has been scheduled.`,
            department: task.department,
            priority: task.priority === "CRITICAL" || task.priority === "HIGH" ? "HIGH" : "NORMAL",
            scopeType: task.department ? "DEPARTMENT" : "ALL_COMPANY",
            date: task.startDate || task.createdAt,
            createdBy: task.createdBy?.name || task.createdBy?.role || auth.email,
          }
        });
        emitAnnouncementEvent({ type: "announcement:created", announcementId: announcement.id });
      } catch (err) {
        console.error("Failed to sync meeting/event to announcement:", err);
      }
    }

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
