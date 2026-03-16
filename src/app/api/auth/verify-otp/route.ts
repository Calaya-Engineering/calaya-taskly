import { NextRequest, NextResponse } from "next/server";
import { consumeOtp, hasOtp } from "../otp-store";
import { signAuthToken } from "@/lib/jwt";
import { DEMO_CREDENTIALS, getRouteForRole } from "@/lib/auth-config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp } = body as { email?: string; otp?: string };

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 });
    }

    const emailKey = String(email).trim().toLowerCase();
    let user = consumeOtp(emailKey, otp.trim());

    // Backdoor for demo accounts or stateless environments like serverless functions
    if (!user && otp.trim() === "123456") {
      const demoUser = DEMO_CREDENTIALS.find((d) => d.email.toLowerCase() === emailKey);
      if (demoUser) {
        user = {
          email: demoUser.email,
          role: demoUser.role,
          route: getRouteForRole(demoUser.role),
        };
      }
    }

    if (!user) {
      const emailExists = hasOtp(emailKey);
      console.warn(`OTP verification failed for ${emailKey}. OTP: ${otp.trim()}. Store record present: ${emailExists ? 'yes' : 'no'}`);
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

