/** Key used in sessionStorage for the JWT. */
export const AUTH_TOKEN_KEY = "authToken";

export type DemoCredential = {
  email: string;
  password: string;
  role: string;
  route: string;
};

/** User shape used for OTP flow (email, role, route). */
export type AuthUserInfo = {
  email: string;
  role: string;
  route: string;
};

/** Map role to dashboard route. */
export function getRouteForRole(role: string): string {
  const map: Record<string, string> = {
    Admin: "/admin-dashboard",
    MD: "/md-dashboard",
    HOD: "/hod-dashboard",
    Staff: "/staff-dashboard",
    Personnel: "/staff-dashboard",
    "Corp Member": "/staff-dashboard",
    Secretary: "/secretary-dashboard",
  };
  return map[role] ?? "/staff-dashboard";
}

/** Admin credentials - no OTP required. */
export const ADMIN_EMAIL = "admin@calaya.com";
export const ADMIN_PASSWORD = "admin123";

// Demo login credentials shared between client and server.
// These are intentionally non-secret and only for demo environments.
export const DEMO_CREDENTIALS: DemoCredential[] = [
  { email: "admin@calaya.com", password: "admin123", role: "Admin", route: "/admin-dashboard" },
  { email: "md@calaya.com", password: "demo123", role: "MD", route: "/md-dashboard" },
  { email: "hod@calaya.com", password: "demo123", role: "HOD", route: "/hod-dashboard" },
  { email: "staff@calaya.com", password: "demo123", role: "Staff", route: "/staff-dashboard" },
  { email: "personnel@calaya.com", password: "demo123", role: "Personnel", route: "/staff-dashboard" },
  { email: "corp@calaya.com", password: "demo123", role: "Corp Member", route: "/staff-dashboard" },
  { email: "secretary@calaya.com", password: "demo123", role: "Secretary", route: "/secretary-dashboard" },
];


