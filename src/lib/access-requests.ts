import crypto from "crypto";

export const HOD_DASHBOARD_ROUTE = "/hod-dashboard";
export const NON_REQUESTABLE_DASHBOARD_ROUTES = [
  "/admin-dashboard",
  "/md-dashboard",
  HOD_DASHBOARD_ROUTE,
] as const;

export function isRequestableRole(role: { dashboardRoute: string }) {
  return !NON_REQUESTABLE_DASHBOARD_ROUTES.includes(
    role.dashboardRoute as (typeof NON_REQUESTABLE_DASHBOARD_ROUTES)[number],
  );
}

export function normalizeRequestedRole(role: string) {
  const normalized = String(role || "").trim();
  if (normalized === "Secretary/Admin Officer") {
    return "Secretary";
  }

  return normalized;
}

export function generateTemporaryPassword(length = 12) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = crypto.randomBytes(length);
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
}
