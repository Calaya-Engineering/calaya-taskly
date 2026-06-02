import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  HOD_DASHBOARD_ROUTE,
  isRequestableRole,
  normalizeRequestedRole,
} from "@/lib/access-requests";

function isMissingAccessRequestTable(error: unknown) {
  if (!error || typeof error !== "object") return false;

  const code = "code" in error ? String(error.code || "") : "";
  const message = "message" in error ? String(error.message || "") : "";

  return code === "P2021" || /accessrequest/i.test(message);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      department,
      role,
      jobTitle,
      hodId,
      reason,
    } = body as {
      fullName?: string;
      email?: string;
      phone?: string;
      department?: string;
      role?: string;
      jobTitle?: string;
      hodId?: number | string;
      reason?: string;
    };

    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedDepartment = String(department || "").trim();
    const requestedRoleName = String(role || "").trim();
    const normalizedRole = normalizeRequestedRole(requestedRoleName);
    const parsedHodId = Number(hodId);

    if (!String(fullName || "").trim()) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }
    if (!normalizedEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!String(phone || "").trim()) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }
    if (!normalizedDepartment) {
      return NextResponse.json({ error: "Department is required" }, { status: 400 });
    }
    if (!Number.isFinite(parsedHodId) || parsedHodId <= 0) {
      return NextResponse.json({ error: "Please select an HOD" }, { status: 400 });
    }
    if (!String(reason || "").trim()) {
      return NextResponse.json({ error: "Reason is required" }, { status: 400 });
    }

    const roleNameCandidates = Array.from(new Set([requestedRoleName, normalizedRole].filter(Boolean)));

    if (roleNameCandidates.length === 0) {
      return NextResponse.json({ error: "A valid role is required" }, { status: 400 });
    }

    const [requestedRoleRecord, hodRoles, existingUser, existingPendingRequest, hod] = await Promise.all([
      prisma.role.findFirst({
        where: { name: { in: roleNameCandidates } },
        select: { id: true, name: true, dashboardRoute: true },
      }),
      prisma.role.findMany({
        where: { dashboardRoute: HOD_DASHBOARD_ROUTE },
        select: { name: true },
      }),
      prisma.user.findUnique({ where: { email: normalizedEmail }, select: { id: true } }),
      prisma.accessRequest.findFirst({
        where: {
          email: normalizedEmail,
          status: "PENDING",
        },
        select: { id: true },
      }),
      prisma.user.findUnique({
        where: { id: parsedHodId },
        select: {
          id: true,
          role: true,
          name: true,
          email: true,
          department: true,
          managedDepartmentRelations: {
            select: {
              department: {
                select: { name: true },
              },
            },
          },
        },
      }),
    ]);

    if (!requestedRoleRecord || !isRequestableRole(requestedRoleRecord)) {
      return NextResponse.json({ error: "A valid role is required" }, { status: 400 });
    }

    if (existingUser) {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 });
    }

    if (existingPendingRequest) {
      return NextResponse.json({ error: "A pending request already exists for this email" }, { status: 409 });
    }

    const hodRoleNames = new Set(hodRoles.map((role) => role.name));
    if (!hod || !hodRoleNames.has(hod.role)) {
      return NextResponse.json({ error: "Selected HOD was not found" }, { status: 400 });
    }

    const hodDepartments = Array.from(
      new Set([hod.department, ...hod.managedDepartmentRelations.map((relation) => relation.department.name)].filter(Boolean)),
    );

    if (!hodDepartments.includes(normalizedDepartment)) {
      return NextResponse.json(
        { error: "Selected HOD does not manage the chosen department" },
        { status: 400 },
      );
    }

    const accessRequest = await prisma.accessRequest.create({
      data: {
        fullName: String(fullName).trim(),
        email: normalizedEmail,
        phone: String(phone).trim(),
        department: normalizedDepartment,
        requestedRole: requestedRoleRecord.name,
        jobTitle: String(jobTitle || "").trim() || null,
        hodId: hod.id,
        hodName: hod.name?.trim() || hod.email.split("@")[0],
        hodEmail: hod.email,
        reason: String(reason).trim(),
      },
    });

    return NextResponse.json({ id: accessRequest.id, status: accessRequest.status }, { status: 201 });
  } catch (error) {
    if (isMissingAccessRequestTable(error)) {
      console.warn("AccessRequest table is not available yet. Rejecting request-access submission until migrations are applied.");
      return NextResponse.json(
        { error: "Access request storage is not ready yet. Apply the latest database migration and try again." },
        { status: 503 },
      );
    }

    console.error("Failed to submit access request:", error);
    return NextResponse.json({ error: "Failed to submit access request" }, { status: 500 });
  }
}
