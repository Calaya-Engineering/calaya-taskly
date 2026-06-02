import type { AuthUserInfo } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";

const OTP_SUCCESS_RETRY_WINDOW_MS = 30_000;
const OTP_SUCCESS_RETRY_ALLOWANCE = 1;
const MAX_INVALID_ATTEMPTS = 5;

export type OtpVerificationResult =
  | { status: "success"; user: AuthUserInfo }
  | { status: "expired" | "invalid" | "used" };

export async function saveOtp(email: string, otp: string, user: AuthUserInfo, ttlMs = 5 * 60 * 1000) {
  const key = email.toLowerCase();
  const expiresAt = new Date(Date.now() + ttlMs);

  // Remove any existing OTP for this email before saving a new one
  await prisma.otpToken.deleteMany({ where: { email: key } });

  await prisma.otpToken.create({
    data: {
      email: key,
      otp,
      expiresAt,
      userRole: user.role,
      userRoute: user.route,
      invalidAttempts: 0,
      retryAllowanceRemaining: OTP_SUCCESS_RETRY_ALLOWANCE,
    },
  });
}

export async function hasOtp(email: string): Promise<boolean> {
  const record = await prisma.otpToken.findFirst({
    where: { email: email.toLowerCase(), expiresAt: { gte: new Date() } },
  });
  return !!record;
}

export async function verifyOtp(email: string, otp: string): Promise<OtpVerificationResult> {
  const key = email.toLowerCase();
  const record = await prisma.otpToken.findFirst({ where: { email: key } });

  if (!record) {
    return { status: "invalid" };
  }

  const now = new Date();

  if (record.expiresAt < now) {
    await prisma.otpToken.delete({ where: { id: record.id } });
    return { status: "expired" };
  }

  if (record.otp !== otp) {
    const newAttempts = record.invalidAttempts + 1;
    if (newAttempts >= MAX_INVALID_ATTEMPTS) {
      await prisma.otpToken.delete({ where: { id: record.id } });
    } else {
      await prisma.otpToken.update({
        where: { id: record.id },
        data: { invalidAttempts: newAttempts },
      });
    }
    return { status: "invalid" };
  }

  if (record.verifiedAt) {
    const withinRetryWindow = now.getTime() - record.verifiedAt.getTime() <= OTP_SUCCESS_RETRY_WINDOW_MS;
    if (withinRetryWindow && record.retryAllowanceRemaining > 0) {
      await prisma.otpToken.update({
        where: { id: record.id },
        data: { retryAllowanceRemaining: record.retryAllowanceRemaining - 1 },
      });
      const user = await prisma.user.findUnique({
        where: { email: record.email },
        select: { department: true },
      });
      return {
        status: "success",
        user: {
          email: record.email,
          role: record.userRole,
          route: record.userRoute,
          department: user?.department ?? null,
        },
      };
    }

    await prisma.otpToken.delete({ where: { id: record.id } });
    return { status: "used" };
  }

  await prisma.otpToken.update({
    where: { id: record.id },
    data: { verifiedAt: now },
  });
  const user = await prisma.user.findUnique({
    where: { email: record.email },
    select: { department: true },
  });
  return {
    status: "success",
    user: {
      email: record.email,
      role: record.userRole,
      route: record.userRoute,
      department: user?.department ?? null,
    },
  };
}
