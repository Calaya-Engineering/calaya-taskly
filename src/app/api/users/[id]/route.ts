import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { hashPassword } from "@/lib/password";
import { emitRealtimeEvent } from "@/lib/realtime-events";

function requireAdmin(auth: { role: string } | null) {
  if (!auth || auth.role !== "Admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }
  return null;
}

const HOD_ALLOWED_ROLES = ["Staff", "Personnel", "Corp Member"];

async function getHodDepartment(auth: { email: string; role: string }) {
  if (auth.role !== "HOD") return null;
  const user = await prisma.user.findUnique({
    where: { email: auth.email },
    select: { department: true },
  });
  return user?.department || null;
}

async function canHodManageUser(auth: { email: string; role: string }, targetUserId: number) {
  const hodDept = await getHodDepartment(auth);
  if (!hodDept) return false;
  const target = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { department: true, role: true },
  });
  if (!target || target.department !== hodDept) return false;
  return true;
}

/**
 * GET /api/users/[id] - Fetch single user (admin only for full details)
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(_req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const userId = parseInt(id, 10);
  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, department: true, createdAt: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

/**
 * PATCH /api/users/[id] - Update user (admin or HOD for users in their department)
 * HOD can only update users in their department; role changes limited to Staff/Personnel/Corp Member.
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
    return NextResponse.json({ error: "Admin or HOD (for own department) access required" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { email, password, name, role, department } = body as {
      email?: string;
      password?: string;
      name?: string;
      role?: string;
      department?: string;
    };

    const data: Record<string, unknown> = {};
    if (email !== undefined) data.email = String(email).trim().toLowerCase();
    if (name !== undefined) data.name = name?.trim() || null;
    if (role !== undefined) data.role = role?.trim() || null;
    if (department !== undefined) data.department = department?.trim() || null;
    if (password !== undefined && typeof password === "string" && password.length >= 6) {
      data.password = hashPassword(password);
    }

    if (hodCanManage && !isAdmin) {
      const hodDept = await getHodDepartment(auth);
      if (department !== undefined && department?.trim() !== hodDept) {
        return NextResponse.json({ error: "HOD cannot move users to another department" }, { status: 403 });
      }
      if (role !== undefined && !HOD_ALLOWED_ROLES.includes(role?.trim() || "")) {
        return NextResponse.json(
          { error: "HOD can only assign Staff, Personnel, or Corp Member roles" },
          { status: 403 }
        );
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: { id: true, email: true, name: true, role: true, department: true },
    });

    emitRealtimeEvent({
      type: "user:updated",
      entity: "user",
      action: "updated",
      entityId: user.id,
    });

    return NextResponse.json(user);
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
 * DELETE /api/users/[id] - Delete user (admin or HOD for users in their department)
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(_req);
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
    return NextResponse.json({ error: "Admin or HOD (for own department) access required" }, { status: 403 });
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
