/**
 * Label for a task's department: uses Task.department when set, otherwise
 * derives from assignees' User.department (and HOD relation names).
 */

type AssignmentUser = {
  department?: string | null;
  managedDepartmentRelations?: { department?: { name?: string | null } | null }[] | null;
};

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
