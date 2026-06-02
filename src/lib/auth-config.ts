/** Key used in sessionStorage for the JWT. */
export const AUTH_TOKEN_KEY = "authToken";

export type DemoCredential = {
  email: string;
  password: string;
  role: string;
  route: string;
  department?: string | null;
};

/** User shape used for OTP flow (email, role, route). */
export type AuthUserInfo = {
  email: string;
  role: string;
  route: string;
  department?: string | null;
};

function normalizeRoleKey(role: string): string {
  return String(role || "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

const FALLBACK_ROLE_ROUTES: Record<string, string> = {
  admin: "/admin-dashboard",
  superadmin: "/admin-dashboard",
  "super admin": "/admin-dashboard",
  md: "/md-dashboard",
  "managing director": "/md-dashboard",
  hod: "/hod-dashboard",
  "head of department": "/hod-dashboard",
  staff: "/staff-dashboard",
  personnel: "/staff-dashboard",
  "corp member": "/staff-dashboard",
  secretary: "/secretary-dashboard",
  "secretary admin officer": "/secretary-dashboard",
  "secretary/admin officer": "/secretary-dashboard",
};

/** Fallback map for role names when a DB dashboardRoute is unavailable. */
export function getRouteForRole(role: string): string {
  return FALLBACK_ROLE_ROUTES[normalizeRoleKey(role)] ?? "/staff-dashboard";
}

export function canAccessDashboardRole(userRole: string, dashboardRole: string): boolean {
  return getRouteForRole(userRole) === getRouteForRole(dashboardRole);
}

export function isManagingDirectorRole(role: string): boolean {
  return getRouteForRole(role) === "/md-dashboard";
}

/**
 * Departments treated as "management" for the purpose of routing a
 * Managing Director user to /md-dashboard. Matching is case-insensitive
 * and tolerant of "-"/"_" and extra whitespace.
 *
 * Add new aliases here as departments evolve — the verify-otp / send-otp
 * routes and Layout all share this list, so a single addition propagates.
 */
const MANAGEMENT_DEPARTMENT_ALIASES = new Set([
  "management",
  "management department",
  "managing",
  "managing department",
  "executive",
  "executive office",
  "executive department",
  "office of the md",
  "office of the managing director",
]);

export function isManagementDepartment(department?: string | null): boolean {
  const normalized = String(department || "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

  if (!normalized) return false;
  if (MANAGEMENT_DEPARTMENT_ALIASES.has(normalized)) return true;

  // Catch-all: anything starting with "manag" (Management, Managing,
  // Managements, etc.) — keeps the door open for future department renames
  // without another deploy.
  return normalized.startsWith("manag");
}

export function isHodRole(role: string): boolean {
  return getRouteForRole(role) === "/hod-dashboard";
}

export function isStaffDashboardRole(role: string): boolean {
  return getRouteForRole(role) === "/staff-dashboard";
}

/** Admin credentials - no OTP required. */
export const ADMIN_EMAIL = "admin@calaya.com";
export const ADMIN_PASSWORD = "admin123";

// Demo login credentials shared between client and server.
// These are intentionally non-secret and only for demo environments.
export const DEMO_CREDENTIALS: DemoCredential[] = [
  { email: "admin@calaya.com", password: "admin123", role: "Admin", route: "/admin-dashboard" },
  {
    email: "izuchukwuonuoha6@gmail.com",
    password: "admin123",
    role: "Managing Director",
    route: "/md-dashboard",
    department: "Management",
  },
  { email: "izuchukwuonuoha6+HOD@gmail.com", password: "admin123", role: "HOD", route: "/hod-dashboard" },
  { email: "staff@calaya.com", password: "demo123", role: "Staff", route: "/staff-dashboard" },
];
