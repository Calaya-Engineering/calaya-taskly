import { NextRequest, NextResponse } from "next/server";
import { DEMO_CREDENTIALS, getRouteForRole, ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { signAuthToken } from "@/lib/jwt";
import { ensureDemoUser } from "@/lib/demo-users";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const emailLower = email.toLowerCase().trim();

    // Email OTP verification is temporarily disabled for direct sign-in.
    if (emailLower === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const dbAdmin = await prisma.user.findUnique({
        where: { email: emailLower },
      });
      if (dbAdmin && verifyPassword(password, dbAdmin.password)) {
        const token = await signAuthToken({ email: dbAdmin.email, role: dbAdmin.role });
        return NextResponse.json({
          success: true,
          skipOtp: true,
          token,
          route: getRouteForRole(dbAdmin.role),
        });
      }
    }


    // 1. Check User database first
    const dbUser = await prisma.user.findUnique({
      where: { email: emailLower },
    });

    if (dbUser) {
      if (!verifyPassword(password, dbUser.password)) {
        return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
      }

      // OTP email verification is temporarily bypassed.
      const token = await signAuthToken({ email: dbUser.email, role: dbUser.role });

      return NextResponse.json({
        success: true,
        skipOtp: true,
        token,
        role: dbUser.role,
        route: getRouteForRole(dbUser.role),
      });
    }

    // 2. Fall back to demo credentials
    const demoUser = DEMO_CREDENTIALS.find(
      (demo) => demo.email.toLowerCase() === emailLower && demo.password === password
    );

    if (!demoUser) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // OTP email verification is temporarily bypassed for demo users too.
    const syncedDemoUser = await ensureDemoUser(demoUser);
    const token = await signAuthToken({ email: syncedDemoUser.email, role: syncedDemoUser.role });

    return NextResponse.json({
      success: true,
      skipOtp: true,
      token,
      role: syncedDemoUser.role,
      route: getRouteForRole(syncedDemoUser.role),
    });
  } catch (error: any) {
    console.error("Error in send-otp route:", error);
    return NextResponse.json({ error: error?.message || "Failed to send OTP." }, { status: 500 });
  }
}
