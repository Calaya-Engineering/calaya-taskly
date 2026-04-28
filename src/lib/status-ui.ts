export function getStatusTone(status: string) {
  const normalized = String(status || "").toUpperCase();
  if (["APPROVED", "COMPLETED", "DONE"].includes(normalized)) return "success";
  if (["PENDING", "UNDER_REVIEW", "PENDING_HOD_APPROVAL", "PENDING_MD_APPROVAL"].includes(normalized)) return "warn";
  if (["REJECTED", "ON_HOLD", "FAILED"].includes(normalized)) return "danger";
  return "info";
}

export function getStatusLabel(status: string) {
  const normalized = String(status || "").toUpperCase();
  switch (normalized) {
    case "PENDING_HOD_APPROVAL":
      return "Pending HOD Approval";
    case "PENDING_MD_APPROVAL":
      return "Pending MD Approval";
    case "UNDER_REVIEW":
      return "Under Review";
    case "ON_HOLD":
      return "On Hold";
    default:
      return normalized || "Unknown";
  }
}
