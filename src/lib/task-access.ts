import { getManagedDepartmentNamesByUserId } from "@/lib/hod-departments";
import { prisma } from "@/lib/prisma";

const FULL_TASK_ACCESS_ROLES = new Set(["ADMIN", "MD", "SECRETARY"]);
const STAFF_LIKE_ROLES = new Set(["STAFF", "PERSONNEL", "CORP MEMBER"]);
const HOD_ROLE = "HOD";
const HOD_FORWARDABLE_ROLES = new Set([HOD_ROLE, ...STAFF_LIKE_ROLES]);

export type TaskAccessUser = {
  id: number;
  role: string;
  department: string | null;
  managedDepartments: string[];
};

export type TaskAccessTask = {
  id: number;
  department: string | null;
  createdById: number;
  assignments?: Array<{ userId: number }>;
};

function normalizeRole(role?: string | null) {
  return String(role || "").trim().toUpperCase();
}

function normalizeDepartment(department?: string | null) {
  const value = department?.trim();
  return value ? value : null;
}

function getTaskDepartmentSet(task: TaskAccessTask) {
  const taskDepartment = normalizeDepartment(task.department);
  return new Set(taskDepartment ? [taskDepartment] : []);
}

function getAssignmentUserIdSet(task: TaskAccessTask) {
  return new Set((task.assignments || []).map((assignment) => assignment.userId));
}

export function hasFullTaskAccess(role?: string | null) {
  return FULL_TASK_ACCESS_ROLES.has(normalizeRole(role));
}

export function isHodRole(role?: string | null) {
  return normalizeRole(role) === HOD_ROLE;
}

export function isStaffLikeRole(role?: string | null) {
  return STAFF_LIKE_ROLES.has(normalizeRole(role));
}

export async function getTaskAccessUserByEmail(email: string): Promise<TaskAccessUser | null> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) return null;

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true, role: true, department: true },
  });

  if (!user) return null;

  let managedDepartments = isHodRole(user.role)
    ? await getManagedDepartmentNamesByUserId(user.id)
    : [];
  if (isHodRole(user.role) && managedDepartments.length === 0) {
    const fallbackDepartment = normalizeDepartment(user.department);
    managedDepartments = fallbackDepartment ? [fallbackDepartment] : [];
  }

  return {
    id: user.id,
    role: user.role,
    department: normalizeDepartment(user.department),
    managedDepartments,
  };
}

export function canUserViewTask(user: TaskAccessUser, task: TaskAccessTask) {
  if (hasFullTaskAccess(user.role)) {
    return true;
  }

  const assignmentUserIds = getAssignmentUserIdSet(task);
  if (assignmentUserIds.has(user.id)) {
    return true;
  }

  if (isHodRole(user.role)) {
    const taskDepartments = getTaskDepartmentSet(task);
    return user.managedDepartments.some((department) => taskDepartments.has(department));
  }

  return false;
}

export function canUserModifyTask(user: TaskAccessUser, task: TaskAccessTask) {
  if (hasFullTaskAccess(user.role)) {
    return true;
  }

  if (isHodRole(user.role)) {
    return canUserViewTask(user, task);
  }

  return getAssignmentUserIdSet(task).has(user.id);
}

export function assertHodDepartmentAccess(user: TaskAccessUser, department?: string | null) {
  const normalizedDepartment = normalizeDepartment(department);
  if (!isHodRole(user.role) || !normalizedDepartment) return;

  if (!user.managedDepartments.includes(normalizedDepartment)) {
    throw new Error("HOD can only manage tasks in their assigned department(s)");
  }
}

export async function assertHodAssigneeAccess(user: TaskAccessUser, assigneeIds: number[]) {
  if (!isHodRole(user.role)) return;

  const normalizedIds = Array.from(
    new Set(
      assigneeIds
        .map((value) => Number(value))
        .filter((value) => Number.isInteger(value) && value > 0)
    )
  );

  if (normalizedIds.length === 0) {
    return;
  }

  const assignees = await prisma.user.findMany({
    where: { id: { in: normalizedIds } },
    select: { id: true, role: true, department: true },
  });

  if (assignees.length !== normalizedIds.length) {
    throw new Error("One or more selected assignees could not be found");
  }

  const invalidAssignee = assignees.find((assignee) => {
    const assigneeDepartment = normalizeDepartment(assignee.department);
    if (!assigneeDepartment || !user.managedDepartments.includes(assigneeDepartment)) {
      return true;
    }

    return !HOD_FORWARDABLE_ROLES.has(normalizeRole(assignee.role));
  });

  if (invalidAssignee) {
    throw new Error("HOD can only forward tasks to staff or HODs in their department(s)");
  }
}

export function getRestrictedTaskUpdateKeys(payload: Record<string, unknown>, allowedKeys: string[]) {
  const allowed = new Set(allowedKeys);
  return Object.keys(payload).filter((key) => !allowed.has(key));
}
