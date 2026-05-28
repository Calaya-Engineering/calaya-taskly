import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { hashPassword } from "@/lib/password";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { getManagedDepartmentNamesByEmail, getValidatedDepartmentRecords } from "@/lib/hod-departments";
import { createNotification } from "@/lib/notifications";

const HOD_ALLOWED_ROLES = ["Staff", "Personnel", "Corp Member"];

async function getDepartmentHodNames(department: string | null) {
  if (!department?.trim()) return [];

  const record = await prisma.department.findFirst({
    where: { name: department.trim() },
    select: {
      hodAssignments: {
        select: {
          hod: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return Array.from(
    new Set(
      (record?.hodAssignments || [])
        .map((assignment) => assignment.hod.name?.trim() || assignment.hod.email?.split("@")[0] || "")
        .filter(Boolean),
    ),
  );
}

function serializeUser(user: any) {
  const managedDepartmentRecords = Array.isArray(user.managedDepartmentRelations)
    ? user.managedDepartmentRelations.map((assignment: any) => assignment.department).filter(Boolean)
    : [];
  const managedDepartments = managedDepartmentRecords.map((department: { name: string }) => department.name);
  const primaryDepartment = user.department || managedDepartments[0] || null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    department: primaryDepartment,
    primaryDepartment,
    managedDepartments,
    managedDepartmentIds: managedDepartmentRecords.map((department: { id: number }) => department.id),
  };
}

/**
 * GET /api/users - List users.
 * Query: role, department (repeatable)
 */
export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const search = searchParams.get("search")?.trim() || "";
    const requestedDepartments = searchParams.getAll("department").map((value) => value.trim()).filter(Boolean);
    const parsedLimit = Number.parseInt(searchParams.get("limit") || "100", 10);
    const parsedOffset = Number.parseInt(searchParams.get("offset") || "0", 10);
    const limit = Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 300) : 100;
    const offset = Number.isFinite(parsedOffset) ? Math.max(parsedOffset, 0) : 0;
    const isHod = auth.role === "HOD";
    const hodManagedDepartments = isHod ? await getManagedDepartmentNamesByEmail(auth.email) : [];

    if (isHod && hodManagedDepartments.length === 0) {
      return NextResponse.json([]);
    }

    const where: {
      role?: string;
      department?: string | { in: string[] } | null;
      OR?: any[];
    } = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }

    if (requestedDepartments.length > 0) {
      const allowedDepartments = isHod
        ? requestedDepartments.filter((department) => hodManagedDepartments.includes(department))
        : requestedDepartments;

      if (allowedDepartments.length === 0 && isHod) {
        return NextResponse.json([]);
      }

      if (allowedDepartments.length === 1) {
        where.department = allowedDepartments[0];
      } else if (allowedDepartments.length > 1) {
        where.department = { in: allowedDepartments };
      }
    } else if (isHod) {
      where.department = { in: hodManagedDepartments };
    }

    try {
      const users = await prisma.user.findMany({
        where,
        take: limit,
        skip: offset,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          department: true,
          managedDepartmentRelations: {
            select: {
              department: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            orderBy: {
              department: {
                name: "asc",
              },
            },
          },
        },
        orderBy: [{ role: "asc" }, { email: "asc" }],
      });

      return NextResponse.json(users.map(serializeUser));
    } catch (relationError) {
      // Backward-compatible fallback for databases missing HOD relation tables/columns.
      console.warn("Users query fell back to basic projection:", relationError);
      const users = await prisma.user.findMany({
        where,
        take: limit,
        skip: offset,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          department: true,
        },
        orderBy: [{ role: "asc" }, { email: "asc" }],
      });

      return NextResponse.json(
        users.map((user) => ({
          ...user,
          primaryDepartment: user.department || null,
          managedDepartments: [],
          managedDepartmentIds: [],
        }))
      );
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to fetch users", ...(process.env.NODE_ENV === "development" && { details: message }) },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users - Create user (admin or HOD for their department)
 * HOD can only create Staff/Personnel/Corp Member in their managed departments.
 */
export async function POST(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = auth.role === "Admin";
  const hodManagedDepartments = auth.role === "HOD" ? await getManagedDepartmentNamesByEmail(auth.email) : [];

  if (!isAdmin && hodManagedDepartments.length === 0) {
    return NextResponse.json({ error: "Admin or HOD access required" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { email, password, name, role, department, managedDepartmentIds } = body as {
      email?: string;
      password?: string;
      name?: string;
      role?: string;
      department?: string;
      managedDepartmentIds?: number[];
    };

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }
    if (!role || typeof role !== "string" || !role.trim()) {
      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }

    const normalizedRole = role.trim();
    const dept = department?.trim() || null;
    let managedDepartmentRecords =
      normalizedRole === "HOD"
        ? await getValidatedDepartmentRecords(Array.isArray(managedDepartmentIds) ? managedDepartmentIds : [])
        : [];

    if (normalizedRole === "HOD" && managedDepartmentRecords.length === 0 && dept) {
      managedDepartmentRecords = await prisma.department.findMany({
        where: { name: dept },
        select: { id: true, name: true },
      });
    }

    if (!isAdmin) {
      if (!dept || !hodManagedDepartments.includes(dept)) {
        return NextResponse.json({ error: "HOD can only create users in their managed departments" }, { status: 403 });
      }
      if (!HOD_ALLOWED_ROLES.includes(normalizedRole)) {
        return NextResponse.json(
          { error: "HOD can only create Staff, Personnel, or Corp Member roles" },
          { status: 403 }
        );
      }
    }

    if (isAdmin && normalizedRole === "HOD" && managedDepartmentRecords.length === 0) {
      return NextResponse.json({ error: "At least one managed department is required for HOD users" }, { status: 400 });
    }

    const emailLower = email.trim().toLowerCase();
    const passwordHash = hashPassword(password);
    const primaryDepartment = normalizedRole === "HOD" ? managedDepartmentRecords[0]?.name || null : dept;

    const user = await prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          email: emailLower,
          password: passwordHash,
          name: name?.trim() || null,
          role: normalizedRole,
          department: primaryDepartment,
        },
      });

      if (normalizedRole === "HOD" && managedDepartmentRecords.length > 0) {
        await tx.departmentHod.createMany({
          data: managedDepartmentRecords.map((managedDepartment) => ({
            departmentId: managedDepartment.id,
            hodId: createdUser.id,
          })),
          skipDuplicates: true,
        });
      }

      return tx.user.findUniqueOrThrow({
        where: { id: createdUser.id },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          department: true,
          managedDepartmentRelations: {
            select: {
              department: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            orderBy: {
              department: {
                name: "asc",
              },
            },
          },
        },
      });
    });

    emitRealtimeEvent({
      type: "user:created",
      entity: "user",
      action: "created",
      entityId: user.id,
    });

    const serializedUser = serializeUser(user);
    const hodNames = await getDepartmentHodNames(serializedUser.primaryDepartment);
    const accountDetails = [
      `Role: ${serializedUser.role}`,
      `Department: ${serializedUser.primaryDepartment || "Not assigned"}`,
      `HOD: ${hodNames.join(", ") || "Not assigned"}`,
    ].join(" ");

    createNotification({
      actorEmail: auth.email,
      actionType: "CREATE_USER",
      targetId: user.id,
      message: `Your Calaya Taskly account has been created. You can now sign in with your email address and the password provided by the administrator. ${accountDetails}`,
      recipients: {
        userIds: [user.id],
        includeActor: false,
      },
      sendEmail: true,
      emailSubject: `Welcome to Calaya Taskly — ${user.name || user.email}`,
      linkPath: `/open/item?type=user&id=${user.id}`,
    });

    createNotification({
      actorEmail: auth.email,
      actionType: "CREATE_USER",
      targetId: user.id,
      message: `${auth.name || auth.email.split("@")[0]} (${auth.role}) created a new user: ${user.name || user.email}. ${accountDetails}`,
      recipients: {
        roles: ["MD", "HOD"],
        departments: user.department ? [user.department] : [],
        includeActor: false,
      },
      sendEmail: true,
      emailSubject: `New Staff Account Created — ${user.name || user.email}`,
      linkPath: `/open/item?type=user&id=${user.id}`,
    });

    return NextResponse.json(serializedUser);
  } catch (error: unknown) {
    const prismaErr = error as { code?: string };
    if (prismaErr.code === "P2002") {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
