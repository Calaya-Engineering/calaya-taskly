import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { hashPassword } from "@/lib/password";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { createNotification } from "@/lib/notifications";
import { getManagedDepartmentNamesByEmail, getValidatedDepartmentRecords } from "@/lib/hod-departments";

const HOD_ALLOWED_ROLES = ["Staff", "Personnel", "Corp Member"];

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
    ...(user.createdAt ? { createdAt: user.createdAt } : {}),
  };
}

async function canHodManageUser(auth: { email: string; role: string }, targetUserId: number) {
  const hodDepartments = await getManagedDepartmentNamesByEmail(auth.email);
  if (hodDepartments.length === 0) return false;

  const target = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { department: true },
  });

  return Boolean(target?.department && hodDepartments.includes(target.department));
}

/**
 * GET /api/users/[id] - Fetch single user
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const userId = parseInt(id, 10);
  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  const isAdmin = auth.role === "Admin";
  const hodCanManage = await canHodManageUser(auth, userId);
  if (!isAdmin && auth.role === "HOD" && !hodCanManage) {
    return NextResponse.json({ error: "Admin or HOD (for managed departments) access required" }, { status: 403 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        department: true,
        createdAt: true,
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

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    createNotification({
      actorEmail: auth.email,
      actionType: "VIEW_USER",
      targetId: user.id,
      message: `${auth.name || auth.email.split("@")[0]} (${auth.role}) viewed profile of user: ${user.name || user.email}`,
    });

    return NextResponse.json(serializeUser(user));
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

/**
 * PATCH /api/users/[id] - Update user (admin or HOD for users in managed departments)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const userId = parseInt(id, 10);
  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  const isAdmin = auth.role === "Admin";
  const hodCanManage = await canHodManageUser(auth, userId);

  if (!isAdmin && !hodCanManage) {
    return NextResponse.json({ error: "Admin or HOD (for managed departments) access required" }, { status: 403 });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
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

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { email, password, name, role, department, managedDepartmentIds } = body as {
      email?: string;
      password?: string;
      name?: string;
      role?: string;
      department?: string;
      managedDepartmentIds?: number[];
    };

    const data: Record<string, unknown> = {};
    if (email !== undefined) data.email = String(email).trim().toLowerCase();
    if (name !== undefined) data.name = name?.trim() || null;
    if (password !== undefined && typeof password === "string" && password.length >= 6) {
      data.password = hashPassword(password);
    }

    const nextRole = role?.trim() || existingUser.role;
    let managedDepartmentRecords =
      nextRole === "HOD"
        ? await getValidatedDepartmentRecords(Array.isArray(managedDepartmentIds) ? managedDepartmentIds : [])
        : [];

    if (nextRole === "HOD" && managedDepartmentRecords.length === 0) {
      managedDepartmentRecords = existingUser.managedDepartmentRelations.map((assignment) => assignment.department);
      if (managedDepartmentRecords.length === 0 && department?.trim()) {
        managedDepartmentRecords = await prisma.department.findMany({
          where: { name: department.trim() },
          select: { id: true, name: true },
        });
      }
    }

    if (hodCanManage && !isAdmin) {
      const hodManagedDepartments = await getManagedDepartmentNamesByEmail(auth.email);
      if (department !== undefined && !hodManagedDepartments.includes(department?.trim() || "")) {
        return NextResponse.json({ error: "HOD cannot move users to another department" }, { status: 403 });
      }
      if (role !== undefined && !HOD_ALLOWED_ROLES.includes(role?.trim() || "")) {
        return NextResponse.json(
          { error: "HOD can only assign Staff, Personnel, or Corp Member roles" },
          { status: 403 }
        );
      }
    }

    if (nextRole === "HOD") {
      if (managedDepartmentRecords.length === 0) {
        return NextResponse.json({ error: "At least one managed department is required for HOD users" }, { status: 400 });
      }
      data.role = "HOD";
      data.department = managedDepartmentRecords[0]?.name || null;
    } else {
      if (role !== undefined) data.role = nextRole;
      if (department !== undefined) data.department = department?.trim() || null;
    }

    const user = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data,
      });

      if (nextRole === "HOD") {
        await tx.departmentHod.deleteMany({
          where: { hodId: userId },
        });
        await tx.departmentHod.createMany({
          data: managedDepartmentRecords.map((managedDepartment) => ({
            departmentId: managedDepartment.id,
            hodId: userId,
          })),
          skipDuplicates: true,
        });
      } else if (existingUser.role === "HOD") {
        await tx.departmentHod.deleteMany({
          where: { hodId: userId },
        });
      }

      return tx.user.findUniqueOrThrow({
        where: { id: userId },
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
      type: "user:updated",
      entity: "user",
      action: "updated",
      entityId: user.id,
    });

    createNotification({
      actorEmail: auth.email,
      actionType: "UPDATE_USER",
      targetId: user.id,
      message: `${auth.name || auth.email.split("@")[0]} (${auth.role}) updated details for user: ${user.name || user.email}`,
      recipients: {
        userIds: [user.id],
        roles: ["MD", "HOD"],
        departments: user.department ? [user.department] : [],
        includeActor: false,
      },
      sendEmail: true,
      emailSubject: `Staff Profile Updated — ${user.name || user.email}`,
      linkPath: `/open/item?type=user&id=${user.id}`,
    });

    return NextResponse.json(serializeUser(user));
  } catch (error: unknown) {
    const prismaErr = error as { code?: string };
    if (prismaErr.code === "P2002") {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }
    if (prismaErr.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

/**
 * DELETE /api/users/[id] - Delete user (admin or HOD for users in managed departments)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const userId = parseInt(id, 10);
  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  const isAdmin = auth.role === "Admin";
  const hodCanManage = await canHodManageUser(auth, userId);

  if (!isAdmin && !hodCanManage) {
    return NextResponse.json({ error: "Admin or HOD (for managed departments) access required" }, { status: 403 });
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    emitRealtimeEvent({
      type: "user:deleted",
      entity: "user",
      action: "deleted",
      entityId: userId,
    });

    createNotification({
      actorEmail: auth.email,
      actionType: "DELETE_USER",
      targetId: userId,
      message: `${auth.name || auth.email.split("@")[0]} (${auth.role}) deleted user ID: ${userId}`,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const prismaErr = error as { code?: string };
    if (prismaErr.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
