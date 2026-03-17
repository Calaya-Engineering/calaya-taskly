import type { AuthUserInfo } from "@/lib/auth-config";

const OTP_SUCCESS_RETRY_WINDOW_MS = 30_000;
const OTP_SUCCESS_RETRY_ALLOWANCE = 1;
const MAX_INVALID_ATTEMPTS = 5;

export type OtpRecord = {
  otp: string;
  expiresAt: number;
  user: AuthUserInfo;
  invalidAttempts: number;
  verifiedAt: number | null;
  retryAllowanceRemaining: number;
};

export type OtpVerificationResult =
  | { status: "success"; user: AuthUserInfo }
  | { status: "expired" | "invalid" | "used" };

// In-memory OTP store keyed by email. Suitable for demo/dev environments only.
const globalForOtp = globalThis as unknown as { __otpStore?: Map<string, OtpRecord> };

if (!globalForOtp.__otpStore) {
  globalForOtp.__otpStore = new Map<string, OtpRecord>();
}

const store = globalForOtp.__otpStore;

export function saveOtp(email: string, otp: string, user: AuthUserInfo, ttlMs = 5 * 60 * 1000) {
  const expiresAt = Date.now() + ttlMs;
  store.set(email.toLowerCase(), {
    otp,
    expiresAt,
    user,
    invalidAttempts: 0,
    verifiedAt: null,
    retryAllowanceRemaining: OTP_SUCCESS_RETRY_ALLOWANCE,
  });
}

export function hasOtp(email: string): boolean {
  const record = store.get(email.toLowerCase());
  if (!record) return false;
  return record.expiresAt >= Date.now();
}

export function verifyOtp(email: string, otp: string): OtpVerificationResult {
  const key = email.toLowerCase();
  const record = store.get(key);

  if (!record) {
    return { status: "invalid" };
  }

  const now = Date.now();

  if (record.expiresAt < now) {
    store.delete(key);
    return { status: "expired" };
  }

  if (record.otp !== otp) {
    record.invalidAttempts += 1;
    if (record.invalidAttempts >= MAX_INVALID_ATTEMPTS) {
      store.delete(key);
    } else {
      store.set(key, record);
    }
    return { status: "invalid" };
  }

  if (record.verifiedAt) {
    const withinRetryWindow = now - record.verifiedAt <= OTP_SUCCESS_RETRY_WINDOW_MS;
    if (withinRetryWindow && record.retryAllowanceRemaining > 0) {
      record.retryAllowanceRemaining -= 1;
      store.set(key, record);
      return { status: "success", user: record.user };
    }

    store.delete(key);
    return { status: "used" };
  }

  record.verifiedAt = now;
  store.set(key, record);
  return { status: "success", user: record.user };
}

