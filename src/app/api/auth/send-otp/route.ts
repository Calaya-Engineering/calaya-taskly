import { NextRequest, NextResponse } from "next/server";
import {
  DEMO_CREDENTIALS,
  getRouteForRole,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  isManagementDepartment,
} from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { signAuthToken } from "@/lib/jwt";
import { ensureDemoUser } from "@/lib/demo-users";

async function getDashboardRouteForRole(role: string) {
  const roleRecord = await prisma.role.findFirst({
    where: { name: role },
    select: { dashboardRoute: true },
  });

  return roleRecord?.dashboardRoute || getRouteForRole(role);
}

function getAllowedDashboardRoute(route: string, department?: string | null) {
  if (route === "/md-dashboard" && !isManagementDepartment(department)) {
    return "/staff-dashboard";
  }

  return route;
}

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
        const route = getAllowedDashboardRoute(await getDashboardRouteForRole(dbAdmin.role), dbAdmin.department);
        const token = await signAuthToken({
          email: dbAdmin.email,
          role: dbAdmin.role,
          route,
          department: dbAdmin.department,
        });
        return NextResponse.json({
          success: true,
          skipOtp: true,
          token,
          route,
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
      const route = getAllowedDashboardRoute(await getDashboardRouteForRole(dbUser.role), dbUser.department);
      const token = await signAuthToken({
        email: dbUser.email,
        role: dbUser.role,
        route,
        department: dbUser.department,
      });

      return NextResponse.json({
        success: true,
        skipOtp: true,
        token,
        role: dbUser.role,
        route,
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
    const route = getAllowedDashboardRoute(
      await getDashboardRouteForRole(syncedDemoUser.role),
      syncedDemoUser.department,
    );
    const token = await signAuthToken({
      email: syncedDemoUser.email,
      role: syncedDemoUser.role,
      route,
      department: syncedDemoUser.department,
    });

    return NextResponse.json({
      success: true,
      skipOtp: true,
      token,
      role: syncedDemoUser.role,
      route,
    });
  } catch (error: any) {
    console.error("Error in send-otp route:", error);
    return NextResponse.json({ error: error?.message || "Failed to send OTP." }, { status: 500 });
  }
}
