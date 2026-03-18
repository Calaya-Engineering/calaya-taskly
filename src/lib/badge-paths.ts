const TRACKED_SECTIONS = [
  "/hod-dashboard/tasks",
  "/hod-dashboard/my-tasks",
  "/hod-dashboard/tenders",
  "/hod-dashboard/announcements",
  "/hod-dashboard/approvals",
  "/hod-dashboard/escalations",
  "/hod-dashboard/notifications",
  "/md-dashboard/tasks",
  "/md-dashboard/tenders",
  "/md-dashboard/announcements",
  "/md-dashboard/approvals",
  "/md-dashboard/escalations",
  "/md-dashboard/notifications",
  "/staff-dashboard/tasks",
  "/staff-dashboard/tenders",
  "/staff-dashboard/announcements",
  "/staff-dashboard/notifications",
  "/secretary-dashboard/tenders",
  "/secretary-dashboard/announcements",
  "/secretary-dashboard/notifications",
] as const;

export const TRACKED_BADGE_PATHS = new Set<string>(TRACKED_SECTIONS);

export function getDashboardPrefixForRole(role: string | null | undefined) {
  const normalizedRole = String(role || "").trim().toUpperCase();

  switch (normalizedRole) {
    case "ADMIN":
      return "/admin-dashboard";
    case "HOD":
      return "/hod-dashboard";
    case "MD":
      return "/md-dashboard";
    case "STAFF":
      return "/staff-dashboard";
    case "SECRETARY":
      return "/secretary-dashboard";
    default:
      return "";
  }
}

export function resolveBadgeSectionPath(pathname: string | null | undefined) {
  if (!pathname) return null;
  if (TRACKED_BADGE_PATHS.has(pathname)) return pathname;

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length < 2) return null;

  const candidate = `/${segments[0]}/${segments[1]}`;
  return TRACKED_BADGE_PATHS.has(candidate) ? candidate : null;
}
