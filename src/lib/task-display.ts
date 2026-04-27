/**
 * Label for a task's department: uses Task.department when set, otherwise
 * derives from assignees' User.department (and HOD relation names).
 */

type AssignmentUser = {
  department?: string | null;
  managedDepartmentRelations?: { department?: { name?: string | null } | null }[] | null;
};

function normalizeDeptName(value?: string | null) {
  const v = typeof value === "string" ? value.trim() : "";
  return v || null;
}

/**
 * Department names that scope a task for HOD access: task.department (comma-separated),
 * plus each assignee's user.department and HOD-linked department names.
 */
export function collectTaskDepartmentKeys(task: {
  department?: string | null;
  assignments?: { user?: AssignmentUser | null }[] | null;
}): Set<string> {
  const out = new Set<string>();
  const raw = normalizeDeptName(task.department);
  if (raw) {
    for (const part of raw.split(",")) {
      const n = part.trim();
      if (n) out.add(n);
    }
  }
  for (const a of task.assignments ?? []) {
    const u = a?.user;
    if (!u) continue;
    const d = normalizeDeptName(u.department);
    if (d) out.add(d);
    for (const rel of u.managedDepartmentRelations ?? []) {
      const n = normalizeDeptName(rel?.department?.name ?? null);
      if (n) out.add(n);
    }
  }
  return out;
}

export function taskDepartmentLabel(task: {
  department?: string | null;
  assignments?: { user?: AssignmentUser | null }[] | null;
}): string {
  const raw = typeof task.department === "string" ? task.department.trim() : "";
  if (raw) return raw;

  const fromAssignees = new Set<string>();
  for (const a of task.assignments ?? []) {
    const u = a?.user;
    if (!u) continue;
    const dept = typeof u.department === "string" ? u.department.trim() : "";
    if (dept) fromAssignees.add(dept);
    for (const rel of u.managedDepartmentRelations ?? []) {
      const n = rel?.department?.name?.trim();
      if (n) fromAssignees.add(n);
    }
  }

  if (fromAssignees.size === 0) return "—";
  return [...fromAssignees].sort().join(", ");
}
