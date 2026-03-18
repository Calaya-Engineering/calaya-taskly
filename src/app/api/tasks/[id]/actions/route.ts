import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { createNotification, notifyUsers } from "@/lib/notifications";
import { emitTaskEvent } from "@/lib/task-events";
import { emitAnnouncementEvent } from "@/lib/announcement-events";
import { getEventAudience } from "@/lib/notification-audiences";
import { countRecipientUsers } from "@/lib/notification-recipient-count";

const REPOST_ALLOWED_ROLES = new Set(["Admin", "MD", "HOD", "Secretary"]);

function parseTaskId(value: string) {
  const id = parseInt(value, 10);
  return Number.isNaN(id) ? null : id;
}

function getEntityType(taskType: string) {
  return taskType === "MEETING" ? "meeting" : "event";
}

function getActionType(taskType: string, action: "share" | "reminder") {
  if (taskType === "MEETING") {
    return action === "share" ? "MEETING_SHARED" : "MEETING_REMINDER";
  }

  return action === "share" ? "EVENT_SHARED" : "EVENT_REMINDER";
}

function getEntityLabel(taskType: string) {
  return taskType === "MEETING" ? "Meeting" : "Event";
}

function formatActorLabel(email: string) {
  return email.split("@")[0] || "System";
}

function formatDateTime(value?: Date | null) {
  if (!value) return "Not set";
  return value.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function syncMirrorAnnouncement(task: {
  id: number;
  title: string;
  description: string | null;
  department: string | null;
  priority: string;
  type: string;
  startDate: Date | null;
  createdAt: Date;
  createdBy: { name: string | null; role: string; email: string };
}) {
  const announcementTitle = `${task.type === "MEETING" ? "📅 Meeting" : "🗓️ Event"}: ${task.title}`;
  const announcementDate = task.startDate || task.createdAt;

  const existingAnnouncement = await prisma.announcement.findFirst({
    where: {
      title: announcementTitle,
    },
  });

  if (!existingAnnouncement) {
    const announcement = await prisma.announcement.create({
      data: {
        title: announcementTitle,
        description: task.description || `A ${task.type.toLowerCase()} has been re-posted.`,
        department: task.department,
        priority: task.priority === "CRITICAL" || task.priority === "HIGH" ? "HIGH" : "NORMAL",
        scopeType: task.department ? "DEPARTMENT" : "ALL_COMPANY",
        date: announcementDate,
        createdBy: task.createdBy.name || task.createdBy.role || task.createdBy.email,
      },
    });

    emitAnnouncementEvent({ type: "announcement:created", announcementId: announcement.id });
    return;
  }

  const updatedAnnouncement = await prisma.announcement.update({
    where: { id: existingAnnouncement.id },
    data: {
      description: task.description || `A ${task.type.toLowerCase()} has been re-posted.`,
      department: task.department,
      priority: task.priority === "CRITICAL" || task.priority === "HIGH" ? "HIGH" : "NORMAL",
      scopeType: task.department ? "DEPARTMENT" : "ALL_COMPANY",
      date: announcementDate,
    },
  });

  emitAnnouncementEvent({ type: "announcement:updated", announcementId: updatedAnnouncement.id });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: rawId } = await params;
  const taskId = parseTaskId(rawId);
  if (!taskId) {
    return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
  }

  const action = new URL(req.url).searchParams.get("action");
  if (action !== "analytics") {
    return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  }

  try {
    const [actor, task] = await Promise.all([
      prisma.user.findUnique({
        where: { email: auth.email },
        select: { id: true },
      }),
      prisma.task.findUnique({
        where: { id: taskId },
        include: {
          assignments: {
            select: {
              userId: true,
            },
          },
        },
      }),
    ]);

    if (!actor) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!task || !["EVENT", "MEETING"].includes(task.type)) {
      return NextResponse.json({ error: "Meeting or event not found" }, { status: 404 });
    }

    const audienceQuery =
      task.assignments.length > 0
        ? { userIds: task.assignments.map((assignment) => assignment.userId) }
        : getEventAudience({
            visibility: task.visibility,
            departments: task.department ? task.department.split(",") : [],
          });
    const targetCount = await countRecipientUsers(actor.id, audienceQuery);

    return NextResponse.json({
      title: task.title,
      entityLabel: getEntityLabel(task.type),
      stats: [
        { label: "Recipients", value: String(targetCount), tone: "blue" },
        { label: "Assigned Users", value: String(task.assignments.length), tone: "green" },
        { label: "Visibility", value: task.visibility || "ASSIGNED_ONLY", tone: "amber" },
        { label: "Starts", value: formatDateTime(task.startDate), tone: "slate" },
        { label: "Ends", value: formatDateTime(task.dueDate), tone: "purple" },
      ],
    });
  } catch (error) {
    console.error("Failed to load event analytics:", error);
    return NextResponse.json({ error: "Failed to load event analytics" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: rawId } = await params;
  const taskId = parseTaskId(rawId);
  if (!taskId) {
    return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        createdBy: {
          select: { name: true, role: true, email: true },
        },
        assignments: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!task || !["EVENT", "MEETING"].includes(task.type)) {
      return NextResponse.json({ error: "Meeting or event not found" }, { status: 404 });
    }

    const body = (await req.json().catch(() => ({}))) as {
      action?: string;
      userIds?: number[];
      startDate?: string;
      dueDate?: string;
    };

    const entityType = getEntityType(task.type);
    const entityLabel = getEntityLabel(task.type);
    const linkPath = `/open/item?type=${entityType}&id=${task.id}`;
    const directRecipientIds = task.assignments.map((assignment) => assignment.userId);
    const recipients =
      directRecipientIds.length > 0
        ? { userIds: directRecipientIds }
        : getEventAudience({
            visibility: task.visibility,
            departments: task.department ? task.department.split(",") : [],
          });
    const actorLabel = formatActorLabel(auth.email);

    if (body.action === "email") {
      await createNotification({
        actorEmail: auth.email,
        actionType: getActionType(task.type, "reminder"),
        targetId: task.id,
        message: `${actorLabel} (${auth.role}) sent a reminder for ${entityLabel.toLowerCase()}: ${task.title}`,
        recipients,
        sendEmail: true,
        emailSubject: `${entityLabel} Reminder — ${task.title}`,
        linkPath,
      });

      return NextResponse.json({ message: `${entityLabel} reminder email queued successfully.` });
    }

    if (body.action === "share") {
      const userIds = Array.isArray(body.userIds)
        ? body.userIds.filter((value) => Number.isInteger(value) && value > 0)
        : [];
      if (userIds.length === 0) {
        return NextResponse.json({ error: "Select at least one person to share with." }, { status: 400 });
      }

      await notifyUsers({
        actorEmail: auth.email,
        actionType: getActionType(task.type, "share"),
        targetId: task.id,
        message: `${actorLabel} (${auth.role}) shared a ${entityLabel.toLowerCase()} with you: ${task.title}`,
        recipientIds: userIds,
        sendEmail: true,
        emailSubject: `${entityLabel} Shared — ${task.title}`,
        linkPath,
      });

      return NextResponse.json({ message: `${entityLabel} shared successfully.` });
    }

    if (body.action === "repost") {
      if (!REPOST_ALLOWED_ROLES.has(auth.role)) {
        return NextResponse.json({ error: `You do not have permission to repost this ${entityLabel.toLowerCase()}.` }, { status: 403 });
      }

      const nextStartDate = body.startDate ? new Date(body.startDate) : null;
      const nextDueDate = body.dueDate ? new Date(body.dueDate) : null;
      if (!nextStartDate || Number.isNaN(nextStartDate.getTime())) {
        return NextResponse.json({ error: "A valid start date is required." }, { status: 400 });
      }
      if (!nextDueDate || Number.isNaN(nextDueDate.getTime())) {
        return NextResponse.json({ error: "A valid end date is required." }, { status: 400 });
      }
      if (nextDueDate <= nextStartDate) {
        return NextResponse.json({ error: "End date must be after the start date." }, { status: 400 });
      }

      const shouldResetStatus =
        (task.dueDate && task.dueDate.getTime() < Date.now()) ||
        (task.startDate && task.startDate.getTime() < Date.now());

      const updatedTask = await prisma.task.update({
        where: { id: task.id },
        data: {
          startDate: nextStartDate,
          dueDate: nextDueDate,
          ...(shouldResetStatus ? { status: "OPEN" } : {}),
        },
        include: {
          createdBy: {
            select: { name: true, role: true, email: true },
          },
          assignments: {
            select: { userId: true },
          },
        },
      });

      emitTaskEvent({ type: "task:updated", taskId: updatedTask.id });
      await syncMirrorAnnouncement(updatedTask);

      await createNotification({
        actorEmail: auth.email,
        actionType: getActionType(updatedTask.type, "reminder"),
        targetId: updatedTask.id,
        message: `${actorLabel} (${auth.role}) re-posted the ${entityLabel.toLowerCase()}: ${updatedTask.title}`,
        recipients:
          updatedTask.assignments.length > 0
            ? { userIds: updatedTask.assignments.map((assignment) => assignment.userId) }
            : getEventAudience({
                visibility: updatedTask.visibility,
                departments: updatedTask.department ? updatedTask.department.split(",") : [],
              }),
        sendEmail: true,
        emailSubject: `${entityLabel} Re-posted — ${updatedTask.title}`,
        linkPath,
      });

      return NextResponse.json({
        message: `${entityLabel} re-posted successfully.`,
        task: updatedTask,
      });
    }

    return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  } catch (error) {
    console.error("Failed to handle event action:", error);
    return NextResponse.json({ error: "Failed to process event action" }, { status: 500 });
  }
}
