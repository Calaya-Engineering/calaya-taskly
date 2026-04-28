import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitTaskEvent } from "@/lib/task-events";
import { emitAnnouncementEvent } from "@/lib/announcement-events";
import { getTaskSubmissionStatusForRole } from "@/lib/task-approval";
import { createNotification } from "@/lib/notifications";
import { getEventAudience } from "@/lib/notification-audiences";
import {
  assertHodAssigneeAccess,
  assertHodDepartmentAccess,
  canUserModifyTask,
  canUserViewTask,
  getRestrictedTaskUpdateKeys,
  getTaskAccessUserByEmail,
  isHodRole,
  isStaffLikeRole,
} from "@/lib/task-access";
import {
  notifyTaskApprovalTransition,
  notifyTaskAssignments,
  notifyTaskUpdated,
} from "@/lib/task-notifications";

const taskInclude = {
  createdBy: { select: { id: true, email: true, name: true, role: true } },
  assignments: {
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          department: true,
          managedDepartmentRelations: {
            include: { department: { select: { name: true } } },
          },
        },
      },
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
    const currentUser = await getTaskAccessUserByEmail(auth.email);
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: taskInclude,
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (!canUserViewTask(currentUser, task)) {
      return NextResponse.json({ error: "You do not have permission to view this task" }, { status: 403 });
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
    const existing = await prisma.task.findUnique({
      where: { id: taskId },
      include: taskInclude,
    });

    if (!existing) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (!canUserModifyTask(currentUser, existing)) {
      return NextResponse.json({ error: "You do not have permission to update this task" }, { status: 403 });
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
      assignmentType,
      comment,
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
      assignmentType?: string;
      comment?: string;
    };

    if (isStaffLikeRole(currentUser.role)) {
      const restrictedKeys = getRestrictedTaskUpdateKeys(body as Record<string, unknown>, ["status", "comment"]);
      if (restrictedKeys.length > 0) {
        return NextResponse.json(
          { error: "Staff can only update task status" },
          { status: 403 }
        );
      }
    }

    if (isHodRole(currentUser.role)) {
      try {
        if (department !== undefined) {
          assertHodDepartmentAccess(currentUser, department);
        }
        if (Array.isArray(assigneeIds)) {
          await assertHodAssigneeAccess(currentUser, assigneeIds);
        }
      } catch (error) {
        return NextResponse.json(
          { error: error instanceof Error ? error.message : "Invalid task assignment scope" },
          { status: 403 }
        );
      }
    }

    const data: Record<string, unknown> = {};
    if (title != null && typeof title === "string" && title.trim()) data.title = title.trim();
    if (description !== undefined) data.description = description?.trim() || null;
    if (department !== undefined) data.department = department?.trim() || null;
    if (priority) data.priority = priority;
    if (status) {
      if (status === "COMPLETED") {
        data.status = getTaskSubmissionStatusForRole(auth.role);
      } else {
        data.status = status;
      }
    }
    if (type) data.type = type;
    if (startDate !== undefined) data.startDate = startDate ? new Date(startDate) : null;
    if (dueDate !== undefined) data.dueDate = dueDate ? new Date(dueDate) : null;
    if (estimatedHours !== undefined) data.estimatedHours = estimatedHours ?? null;
    if (visibility) data.visibility = visibility;
    if (assignmentType !== undefined) data.assignmentType = assignmentType || null;

    const updateData: Record<string, unknown> = { ...data };

    const previousStatus = existing.status;
    const previousAssigneeIds = existing.assignments.map((assignment) => assignment.userId).sort((a, b) => a - b);
    let assignmentsChanged = false;
    const contentChangedKeys = new Set(Object.keys(data).filter((key) => key !== "status"));

    if (Array.isArray(assigneeIds)) {
      const nextAssigneeIds = [...assigneeIds].sort((a, b) => a - b);
      assignmentsChanged =
        previousAssigneeIds.length !== nextAssigneeIds.length ||
        previousAssigneeIds.some((userId, index) => userId !== nextAssigneeIds[index]);
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

    if (assignmentsChanged && task.assignments.length > 0) {
      await notifyTaskAssignments({
        actorEmail: auth.email,
        task,
        mode: "updated",
      });
    }

    if (contentChangedKeys.size > 0 || Boolean(comment?.trim())) {
      await notifyTaskUpdated({
        actorEmail: auth.email,
        task,
        comment,
      });
    }

    await notifyTaskApprovalTransition({
      actorEmail: auth.email,
      task,
      previousStatus,
      nextStatus: task.status,
    });

    // Put all meetings/events in the announcement table as well
    if (task.type === "MEETING" || task.type === "EVENT") {
      try {
        const eventType = task.type.toUpperCase() === "MEETING" ? "meeting" : "event";
        const announcementDate = task.startDate || task.createdAt;
        const announcementTitle = `${task.type === "MEETING" ? "📅 Meeting" : "🗓️ Event"}: ${task.title}`;

        const existing = await prisma.announcement.findFirst({
          where: {
            title: announcementTitle,
            date: announcementDate,
          }
        });

        if (!existing) {
          const announcement = await prisma.announcement.create({
            data: {
              title: announcementTitle,
              description: task.description || `A new ${task.type.toLowerCase()} has been scheduled.`,
              department: task.department,
              priority: task.priority === "CRITICAL" || task.priority === "HIGH" ? "HIGH" : "NORMAL",
              scopeType: task.department ? "DEPARTMENT" : "ALL_COMPANY",
              date: announcementDate,
              createdBy: task.createdBy?.name || task.createdBy?.role || auth.email,
            }
          });
          emitAnnouncementEvent({ type: "announcement:created", announcementId: announcement.id });
        } else {
          const announcement = await prisma.announcement.update({
            where: { id: existing.id },
            data: {
              title: announcementTitle,
              description: task.description || `A new ${task.type.toLowerCase()} has been scheduled.`,
              department: task.department,
              priority: task.priority === "CRITICAL" || task.priority === "HIGH" ? "HIGH" : "NORMAL",
              scopeType: task.department ? "DEPARTMENT" : "ALL_COMPANY",
              date: announcementDate,
            }
          });
          emitAnnouncementEvent({ type: "announcement:updated", announcementId: announcement.id });
        }

        await createNotification({
          actorEmail: auth.email,
          actionType: task.type === "MEETING" ? "UPDATE_MEETING" : "UPDATE_EVENT",
          targetId: task.id,
          message: `${auth.name || auth.email.split("@")[0]} (${auth.role}) updated the ${eventType}: ${task.title}`,
          recipients: getEventAudience({
            visibility: task.visibility,
            departments: task.department ? task.department.split(",") : [],
          }),
          sendEmail: true,
          emailSubject: `${task.type === "MEETING" ? "Meeting" : "Event"} Updated — ${task.title}`,
          linkPath: `/open/item?type=${eventType}&id=${task.id}`,
        });
      } catch (err) {
        console.error("Failed to sync meeting/event update to announcement:", err);
      }
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
