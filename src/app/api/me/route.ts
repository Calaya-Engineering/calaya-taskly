import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { getManagedDepartmentNamesByEmail } from "@/lib/hod-departments";
import { DEMO_CREDENTIALS } from "@/lib/auth-config";
import { ensureDemoUser } from "@/lib/demo-users";

/**
 * GET /api/me - Current authenticated user profile (id, email, name, role, department)
 */
export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let user = await prisma.user.findUnique({
      where: { email: auth.email },
      select: { id: true, email: true, name: true, role: true, department: true },
    });

    if (!user) {
      const demoUser = DEMO_CREDENTIALS.find((demo) => demo.email.toLowerCase() === auth.email.toLowerCase());
      if (demoUser) {
        const syncedDemoUser = await ensureDemoUser(demoUser);
        user = {
          id: syncedDemoUser.id,
          email: syncedDemoUser.email,
          name: syncedDemoUser.name,
          role: syncedDemoUser.role,
          department: syncedDemoUser.department,
        };
      }
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const managedDepartments = user.role === "HOD" ? await getManagedDepartmentNamesByEmail(auth.email) : [];
    const primaryDepartment = managedDepartments[0] || user.department || null;

    return NextResponse.json({
      ...user,
      department: primaryDepartment,
      primaryDepartment,
      managedDepartments,
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
