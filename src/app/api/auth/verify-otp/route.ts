import { NextRequest, NextResponse } from "next/server";
import { consumeOtp } from "../otp-store";
import { signAuthToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp } = body as { email?: string; otp?: string };

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 });
    }

    const emailKey = String(email).trim().toLowerCase();
    const user = consumeOtp(emailKey, otp.trim());

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 401 });
    }

    const token = await signAuthToken({ email: user.email, role: user.role });

    return NextResponse.json({
      success: true,
      token,
      role: user.role,
      route: user.route,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in verify-otp route:", error);
    return NextResponse.json({ error: "Failed to verify OTP." }, { status: 500 });
  }
}

