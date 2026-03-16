import type { AuthUserInfo } from "@/lib/auth-config";

export type OtpRecord = {
  otp: string;
  expiresAt: number;
  user: AuthUserInfo;
};

// In-memory OTP store keyed by email. Suitable for demo/dev environments only.
const globalForOtp = globalThis as unknown as { __otpStore?: Map<string, OtpRecord> };

if (!globalForOtp.__otpStore) {
  globalForOtp.__otpStore = new Map<string, OtpRecord>();
}
const store = globalForOtp.__otpStore;

export function saveOtp(email: string, otp: string, user: AuthUserInfo, ttlMs = 5 * 60 * 1000) {
  const expiresAt = Date.now() + ttlMs;
  store.set(email.toLowerCase(), { otp, expiresAt, user });
}

export function hasOtp(email: string): boolean {
  const record = store.get(email.toLowerCase());
  if (!record) return false;
  return record.expiresAt >= Date.now();
}

export function consumeOtp(email: string, otp: string): AuthUserInfo | null {
  const key = email.toLowerCase();
  const record = store.get(key);

  if (!record) return null;

  const now = Date.now();
  if (record.expiresAt < now || record.otp !== otp) {
    store.delete(key);
    return null;
  }

  store.delete(key);
  return record.user;
}

