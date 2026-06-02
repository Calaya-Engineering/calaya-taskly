import { NextRequest, NextResponse } from "next/server";
import { verifyOtp } from "../otp-store";
import { signAuthToken } from "@/lib/jwt";
import { DEMO_CREDENTIALS, getRouteForRole, isManagementDepartment } from "@/lib/auth-config";
import { recordAudit, getRequestIp } from "@/lib/audit";
import { ensureDemoUser } from "@/lib/demo-users";
import { prisma } from "@/lib/prisma";

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
    const { email, otp } = body as { email?: string; otp?: string };

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 });
    }

    const emailKey = String(email).trim().toLowerCase();
    const otpCode = String(otp).trim();
    const verification = await verifyOtp(emailKey, otpCode);
    let user = verification.status === "success" ? verification.user : null;

    // Backdoor for demo accounts or stateless environments like serverless functions
    if (!user && otpCode === "123456") {
      const demoUser = DEMO_CREDENTIALS.find((d) => d.email.toLowerCase() === emailKey);
      if (demoUser) {
        const syncedDemoUser = await ensureDemoUser(demoUser);
        user = {
          email: syncedDemoUser.email,
          role: syncedDemoUser.role,
          route: getAllowedDashboardRoute(
            await getDashboardRouteForRole(syncedDemoUser.role),
            syncedDemoUser.department,
          ),
          department: syncedDemoUser.department,
        };
      }
    }

    if (!user) {
      if (verification.status === "expired") {
        return NextResponse.json({ error: "OTP expired. Please request a new code." }, { status: 410 });
      }

      if (verification.status === "used") {
        return NextResponse.json({ error: "OTP already used. Please request a new code." }, { status: 409 });
      }

      return NextResponse.json({ error: "Invalid OTP. Please check the code and try again." }, { status: 401 });
    }

    const route = getAllowedDashboardRoute(await getDashboardRouteForRole(user.role), user.department);
    const token = await signAuthToken({
      email: user.email,
      role: user.role,
      route,
      department: user.department,
    });

    void recordAudit({
      action: "USER_LOGIN",
      actor: { email: user.email, role: user.role },
      summary: `Login successful for ${user.email}`,
      ipAddress: getRequestIp(req),
    });

    return NextResponse.json({
      success: true,
      token,
      role: user.role,
      route,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in verify-otp route:", error);
    return NextResponse.json({ error: "Failed to verify OTP." }, { status: 500 });
  }
}
