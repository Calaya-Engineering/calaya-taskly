import { prisma } from "@/lib/prisma";
import { notifyUsers } from "@/lib/notifications";
import {
  TASK_STATUS_PENDING_HOD_APPROVAL,
  TASK_STATUS_PENDING_MD_APPROVAL,
  isTaskClosed,
  isTaskPendingApproval,
} from "@/lib/task-approval";

type TaskAssignmentUser = {
  id: number;
  email: string;
  name: string | null;
  role: string;
  department?: string | null;
};

type TaskAssignmentRecord = {
  userId: number;
  assignedAt?: Date | string | null;
  assignedById?: number;
  user?: TaskAssignmentUser | null;
};

type TaskActor = {
  id: number;
  email: string;
  name: string | null;
  role: string;
};

type TaskNotificationTask = {
  id: number;
  title: string;
  department?: string | null;
  dueDate?: Date | string | null;
  status?: string | null;
  createdById?: number;
  createdBy?: TaskActor | null;
  assignments: TaskAssignmentRecord[];
};

const TASK_ASSIGNMENT_ACTION = "ASSIGN_TASK";
const TASK_REMINDER_ACTION = "TASK_DEADLINE_REMINDER";
const TASK_DUE_SOON_ACTION = "TASK_DUE_SOON";
const TASK_OVERDUE_ACTION = "TASK_OVERDUE";
const TASK_APPROVAL_REQUESTED_ACTION = "APPROVAL_REQUESTED";
const TASK_APPROVAL_FORWARDED_ACTION = "APPROVAL_FORWARDED";
const TASK_APPROVED_ACTION = "TASK_APPROVED";
const TASK_REJECTED_ACTION = "TASK_REJECTED";

function toDate(value?: Date | string | null) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDueDate(value?: Date | string | null) {
  const date = toDate(value);
  if (!date) return "No deadline set";
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getDisplayName(user?: { name?: string | null; email?: string | null } | null) {
  if (user?.name?.trim()) return user.name.trim();
  if (user?.email) return user.email.split("@")[0];
  return "System";
}

async function getActorByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true, role: true },
  });
}

async function getMdApprovers() {
  return prisma.user.findMany({
    where: { role: "MD" },
    select: { id: true, email: true, name: true, role: true, department: true },
  });
}

async function getHodApproversForDepartments(departments: string[]) {
  const uniqueDepartments = Array.from(new Set(departments.map((department) => department.trim()).filter(Boolean)));
  if (uniqueDepartments.length === 0) {
    return [];
  }

  return prisma.user.findMany({
    where: {
      role: "HOD",
      OR: [
        { department: { in: uniqueDepartments } },
        {
          managedDepartmentRelations: {
            some: {
              department: {
                is: {
                  name: { in: uniqueDepartments },
                },
              },
            },
          },
        },
      ],
    },
    select: { id: true, email: true, name: true, role: true, department: true },
  });
}

export async function notifyTaskAssignments(params: {
  actorEmail: string;
  task: TaskNotificationTask;
  mode?: "created" | "updated";
}) {
  const actor = await getActorByEmail(params.actorEmail);
  if (!actor) {
    return;
  }

  const recipients = params.task.assignments
    .map((assignment) => assignment.user)
    .filter((user): user is TaskAssignmentUser => Boolean(user?.id && user?.email));

  const stakeholderIds = new Set(recipients.map((recipient) => recipient.id));

  if (actor.role === "MD") {
    const departments = Array.from(
      new Set(
        [
          params.task.department,
          ...recipients.map((recipient) => recipient.department || null),
        ]
          .map((department) => department?.trim() || "")
          .filter(Boolean),
      ),
    );

    const hodApprovers = await getHodApproversForDepartments(departments);
    hodApprovers.forEach((hod) => stakeholderIds.add(hod.id));
  }

  if (stakeholderIds.size === 0) {
    return;
  }

  const actorName = getDisplayName(actor);
  const dueLabel = formatDueDate(params.task.dueDate);
  const verb = params.mode === "updated" ? "updated and assigned" : "assigned";
  const message = `${actorName} ${verb} "${params.task.title}"${params.task.department ? ` for ${params.task.department}` : ""}. Due: ${dueLabel}.`;

  await notifyUsers({
    actorEmail: params.actorEmail,
    actionType: TASK_ASSIGNMENT_ACTION,
    targetId: params.task.id,
    message,
    recipientIds: Array.from(stakeholderIds),
    sendEmail: true,
    emailSubject: `New Task Assigned to You — ${params.task.title}`,
    linkPath: `/open/item?type=task&id=${params.task.id}`,
  });
}

export async function notifyTaskApprovalTransition(params: {
  actorEmail: string;
  task: TaskNotificationTask;
  previousStatus?: string | null;
  nextStatus?: string | null;
}) {
  if (!params.nextStatus || params.previousStatus === params.nextStatus) {
    return;
  }

  const actor = await getActorByEmail(params.actorEmail);
  if (!actor) {
    return;
  }

  const actorName = getDisplayName(actor);
  const dueLabel = formatDueDate(params.task.dueDate);
  const assignees = params.task.assignments
    .map((assignment) => assignment.user)
    .filter((user): user is TaskAssignmentUser => Boolean(user?.id && user?.email));

  if (params.nextStatus === TASK_STATUS_PENDING_HOD_APPROVAL) {
    const departments = Array.from(
      new Set(
        [
          params.task.department,
          ...assignees.map((user) => user.department || null),
        ]
          .map((department) => department?.trim() || "")
          .filter(Boolean),
      ),
    );
    const hodApprovers = await getHodApproversForDepartments(departments);
    const mdApprovers = await getMdApprovers();
    const approvalRecipients = hodApprovers.length > 0 ? [...hodApprovers] : [...mdApprovers];
    if (params.task.createdBy?.role === "MD") {
      mdApprovers.forEach((md) => {
        if (!approvalRecipients.some((recipient) => recipient.id === md.id)) {
          approvalRecipients.push(md);
        }
      });
    }
    const message = `${actorName} submitted "${params.task.title}" for approval${params.task.department ? ` in ${params.task.department}` : ""}. Due: ${dueLabel}.`;

    await notifyUsers({
      actorEmail: params.actorEmail,
      actionType: TASK_APPROVAL_REQUESTED_ACTION,
      targetId: params.task.id,
      message,
      recipientIds: approvalRecipients.map((user) => user.id),
      sendEmail: true,
      emailSubject: `Daily Task Approval Needed — ${params.task.title}`,
      linkPath: `/open/item?type=task&id=${params.task.id}`,
    });
    return;
  }

  if (params.nextStatus === TASK_STATUS_PENDING_MD_APPROVAL) {
    const mdApprovers = await getMdApprovers();
    const message = `${actorName} forwarded "${params.task.title}" to MD for final approval. Due: ${dueLabel}.`;

    await notifyUsers({
      actorEmail: params.actorEmail,
      actionType: TASK_APPROVAL_FORWARDED_ACTION,
      targetId: params.task.id,
      message,
      recipientIds: mdApprovers.map((user) => user.id),
      sendEmail: true,
      emailSubject: `Forwarded to MD — ${params.task.title}`,
      linkPath: `/open/item?type=task&id=${params.task.id}`,
    });
    return;
  }

  const stakeholders = new Map<number, TaskAssignmentUser | TaskActor>();
  assignees.forEach((user) => stakeholders.set(user.id, user));
  if (params.task.createdBy?.id) {
    stakeholders.set(params.task.createdBy.id, params.task.createdBy);
  }

  if (params.nextStatus === "COMPLETED") {
    const message = `${actorName} approved "${params.task.title}". The task is now complete.`;
    await notifyUsers({
      actorEmail: params.actorEmail,
      actionType: TASK_APPROVED_ACTION,
      targetId: params.task.id,
      message,
      recipientIds: Array.from(stakeholders.keys()),
      sendEmail: true,
      emailSubject: `Task Approved — ${params.task.title}`,
      linkPath: `/open/item?type=task&id=${params.task.id}`,
    });
    return;
  }

  if (params.nextStatus === "ON_HOLD") {
    const message = `${actorName} returned "${params.task.title}" for rework. Please review the task and update it in Calaya Taskly.`;
    await notifyUsers({
      actorEmail: params.actorEmail,
      actionType: TASK_REJECTED_ACTION,
      targetId: params.task.id,
      message,
      recipientIds: Array.from(stakeholders.keys()),
      sendEmail: true,
      emailSubject: `Task Returned for Update — ${params.task.title}`,
      linkPath: `/open/item?type=task&id=${params.task.id}`,
    });
  }
}

export async function notifyTaskUpdated(params: {
  actorEmail: string;
  task: TaskNotificationTask;
  comment?: string | null;
}) {
  const actor = await getActorByEmail(params.actorEmail);
  if (!actor) {
    return;
  }

  const recipientIds = Array.from(
    new Set(
      params.task.assignments
        .map((assignment) => assignment.user)
        .filter((user): user is TaskAssignmentUser => Boolean(user?.id && user.email))
        .map((user) => user.id),
    ),
  );

  if (recipientIds.length === 0) {
    return;
  }

  const actorName = getDisplayName(actor);
  const commentSuffix = params.comment?.trim() ? ` Note: ${params.comment.trim()}` : "";

  await notifyUsers({
    actorEmail: params.actorEmail,
    actionType: "UPDATE_TASK",
    targetId: params.task.id,
    message: `${actorName} updated "${params.task.title}".${commentSuffix}`,
    recipientIds,
    sendEmail: true,
    emailSubject: `Task Updated — ${params.task.title}`,
    linkPath: `/open/item?type=task&id=${params.task.id}`,
  });
}

export async function notifyTaskUnassigned(params: {
  actorEmail: string;
  task: Pick<TaskNotificationTask, "id" | "title">;
  recipientIds: number[];
}) {
  const actor = await getActorByEmail(params.actorEmail);
  if (!actor || params.recipientIds.length === 0) {
    return;
  }

  const actorName = getDisplayName(actor);

  await notifyUsers({
    actorEmail: params.actorEmail,
    actionType: "UNASSIGN_TASK",
    targetId: params.task.id,
    message: `${actorName} removed you from "${params.task.title}".`,
    recipientIds: Array.from(new Set(params.recipientIds)),
    sendEmail: true,
    emailSubject: `Task Assignment Removed — ${params.task.title}`,
    linkPath: `/open/item?type=task&id=${params.task.id}`,
  });
}

export async function ensureMidpointRemindersForTasks(tasks: TaskNotificationTask[]) {
  const now = Date.now();
  const pendingReminders = tasks.flatMap((task) => {
    if (isTaskClosed(task.status) || isTaskPendingApproval(task.status)) {
      return [];
    }

    const dueDate = toDate(task.dueDate);
    if (!dueDate) {
      return [];
    }

    return task.assignments
      .map((assignment) => {
        const assignedAt = toDate(assignment.assignedAt);
        const user = assignment.user;
        if (!assignedAt || !user?.id || !user.email) {
          return null;
        }

        const totalWindow = dueDate.getTime() - assignedAt.getTime();
        if (totalWindow <= 0) {
          return null;
        }

        const midpoint = assignedAt.getTime() + totalWindow / 2;
        if (now < midpoint || now >= dueDate.getTime()) {
          return null;
        }

        return {
          task,
          user,
          actorEmail: task.createdBy?.email || user.email,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
  });

  if (pendingReminders.length === 0) {
    return;
  }

  const taskIds = Array.from(new Set(pendingReminders.map((item) => item.task.id)));
  const recipientIds = Array.from(new Set(pendingReminders.map((item) => item.user.id)));
  const existing = await prisma.notification.findMany({
    where: {
      actionType: TASK_REMINDER_ACTION,
      targetId: { in: taskIds },
      recipientId: { in: recipientIds },
    },
    select: { targetId: true, recipientId: true },
  });

  const seen = new Set(existing.map((item) => `${item.targetId}:${item.recipientId}`));

  for (const reminder of pendingReminders) {
    const key = `${reminder.task.id}:${reminder.user.id}`;
    if (seen.has(key)) {
      continue;
    }

    const message = `Reminder: "${reminder.task.title}" is halfway to its deadline${reminder.task.dueDate ? ` and is due ${formatDueDate(reminder.task.dueDate)}` : ""}.`;

    await notifyUsers({
      actorEmail: reminder.actorEmail,
      actionType: TASK_REMINDER_ACTION,
      targetId: reminder.task.id,
      message,
      recipientIds: [reminder.user.id],
      sendEmail: true,
      emailSubject: `Task Deadline Reminder — ${reminder.task.title}`,
      linkPath: `/open/item?type=task&id=${reminder.task.id}`,
    });

    seen.add(key);
  }

  for (const task of tasks) {
    if (isTaskClosed(task.status) || isTaskPendingApproval(task.status)) {
      continue;
    }

    const dueDate = toDate(task.dueDate);
    if (!dueDate) {
      continue;
    }

    const assignees = task.assignments
      .map((assignment) => assignment.user)
      .filter((user): user is TaskAssignmentUser => Boolean(user?.id && user.email));
    if (assignees.length === 0) {
      continue;
    }

    const actorEmail = task.createdBy?.email || assignees[0]?.email;
    if (!actorEmail) {
      continue;
    }

    const departments = Array.from(
      new Set(
        [
          task.department,
          ...assignees.map((user) => user.department || null),
        ]
          .map((department) => department?.trim() || "")
          .filter(Boolean),
      ),
    );
    const hodApprovers = await getHodApproversForDepartments(departments);
    const mdApprovers = await getMdApprovers();
    const hoursUntilDue = (dueDate.getTime() - now) / 3_600_000;

    if (hoursUntilDue > 0 && hoursUntilDue <= 24) {
      const soonRecipients = Array.from(
        new Set([...assignees.map((user) => user.id), ...hodApprovers.map((user) => user.id)]),
      );
      const existingDueSoon = await prisma.notification.findMany({
        where: {
          actionType: TASK_DUE_SOON_ACTION,
          targetId: task.id,
          recipientId: { in: soonRecipients },
        },
        select: { recipientId: true },
      });
      const seenDueSoon = new Set(existingDueSoon.map((item) => item.recipientId));

      for (const recipientId of soonRecipients) {
        if (seenDueSoon.has(recipientId)) continue;
        await notifyUsers({
          actorEmail,
          actionType: TASK_DUE_SOON_ACTION,
          targetId: task.id,
          message: `Task "${task.title}" is due within 24 hours${task.department ? ` for ${task.department}` : ""}. Deadline: ${formatDueDate(task.dueDate)}.`,
          recipientIds: [recipientId],
          sendEmail: true,
          emailSubject: `Task Deadline Approaching — ${task.title}`,
          linkPath: `/open/item?type=task&id=${task.id}`,
        });
      }
    }

    if (hoursUntilDue <= 0) {
      const overdueRecipients = Array.from(
        new Set([
          ...assignees.map((user) => user.id),
          ...hodApprovers.map((user) => user.id),
          ...mdApprovers.map((user) => user.id),
        ]),
      );
      const existingOverdue = await prisma.notification.findMany({
        where: {
          actionType: TASK_OVERDUE_ACTION,
          targetId: task.id,
          recipientId: { in: overdueRecipients },
        },
        select: { recipientId: true },
      });
      const seenOverdue = new Set(existingOverdue.map((item) => item.recipientId));

      for (const recipientId of overdueRecipients) {
        if (seenOverdue.has(recipientId)) continue;
        await notifyUsers({
          actorEmail,
          actionType: TASK_OVERDUE_ACTION,
          targetId: task.id,
          message: `Task "${task.title}" is overdue${task.department ? ` for ${task.department}` : ""}. Deadline was ${formatDueDate(task.dueDate)}.`,
          recipientIds: [recipientId],
          sendEmail: true,
          emailSubject: `Task Overdue — ${task.title}`,
          linkPath: `/open/item?type=task&id=${task.id}`,
        });
      }
    }
  }
}
