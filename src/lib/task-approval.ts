export const TASK_STATUS_PENDING_HOD_APPROVAL = "PENDING_HOD_APPROVAL";
export const TASK_STATUS_PENDING_MD_APPROVAL = "PENDING_MD_APPROVAL";

export const TASK_APPROVAL_PENDING_STATUSES = [
  TASK_STATUS_PENDING_HOD_APPROVAL,
  TASK_STATUS_PENDING_MD_APPROVAL,
] as const;

export function isTaskPendingHodApproval(status?: string | null) {
  return status === TASK_STATUS_PENDING_HOD_APPROVAL;
}

export function isTaskPendingMdApproval(status?: string | null) {
  return status === TASK_STATUS_PENDING_MD_APPROVAL;
}

export function isTaskPendingApproval(status?: string | null) {
  return isTaskPendingHodApproval(status) || isTaskPendingMdApproval(status);
}

export function isTaskCompleted(status?: string | null) {
  return status === "COMPLETED";
}

export function isTaskClosed(status?: string | null) {
  return status === "COMPLETED" || status === "CANCELLED";
}

export function getTaskSubmissionStatusForRole(role?: string | null) {
  switch ((role || "").toUpperCase()) {
    case "MD":
      return "COMPLETED";
    case "HOD":
      return TASK_STATUS_PENDING_MD_APPROVAL;
    default:
      return TASK_STATUS_PENDING_HOD_APPROVAL;
  }
}

export function getApprovalQueueStatusForRole(role?: string | null) {
  switch ((role || "").toUpperCase()) {
    case "HOD":
      return TASK_STATUS_PENDING_HOD_APPROVAL;
    case "MD":
      return TASK_STATUS_PENDING_MD_APPROVAL;
    default:
      return null;
  }
}

export function getTaskStatusLabel(status?: string | null) {
  switch (status) {
    case TASK_STATUS_PENDING_HOD_APPROVAL:
      return "Pending HOD Approval";
    case TASK_STATUS_PENDING_MD_APPROVAL:
      return "Pending MD Approval";
    case "IN_PROGRESS":
      return "In Progress";
    case "ON_HOLD":
      return "On Hold";
    default:
      return String(status || "PENDING")
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}

export function getTaskApprovalNextStep(status?: string | null) {
  switch (status) {
    case TASK_STATUS_PENDING_HOD_APPROVAL:
      return "Awaiting HOD review";
    case TASK_STATUS_PENDING_MD_APPROVAL:
      return "Awaiting MD review";
    case "COMPLETED":
      return "Approved and completed";
    case "ON_HOLD":
      return "Returned for rework";
    default:
      return "In progress";
  }
}
