import crypto from "crypto";

export const ACCESS_REQUEST_ROLE_OPTIONS = [
  "Staff",
  "Personnel",
  "Corp Member",
  "Secretary/Admin Officer",
] as const;

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
