import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { createNotification } from "@/lib/notifications";

function requireAdmin(auth: { role: string } | null) {
  if (!auth || auth.role !== "Admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }
  return null;
}

/**
 * PATCH /api/departments/[id] - Update department (admin only)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  const adminErr = requireAdmin(auth);
  if (adminErr) return adminErr;

  const { id } = await params;
  const deptId = parseInt(id, 10);
  if (Number.isNaN(deptId)) {
    return NextResponse.json({ error: "Invalid department ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { name } = body as { name?: string };
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const dept = await prisma.department.update({
      where: { id: deptId },
      data: { name: name.trim() },
    });

    emitRealtimeEvent({
      type: "department:updated",
      entity: "department",
      action: "updated",
      entityId: dept.id,
    });

    createNotification({
      actorEmail: auth?.email || "Admin",
      actionType: 'UPDATE_DEPARTMENT',
      targetId: dept.id,
      message: `${auth?.name || auth?.email?.split('@')[0] || 'Admin'} updated department: ${dept.name}`
    });

    return NextResponse.json(dept);
  } catch (error: unknown) {
    const prismaErr = error as { code?: string };
    if (prismaErr.code === "P2002") {
      return NextResponse.json({ error: "Department with this name already exists" }, { status: 409 });
    }
    if (prismaErr.code === "P2025") {
      return NextResponse.json({ error: "Department not found" }, { status: 404 });
    }
    console.error("Error updating department:", error);
    return NextResponse.json({ error: "Failed to update department" }, { status: 500 });
  }
}

/**
 * DELETE /api/departments/[id] - Delete department (admin only)
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(_req);
  const adminErr = requireAdmin(auth);
  if (adminErr) return adminErr;

  const { id } = await params;
  const deptId = parseInt(id, 10);
  if (Number.isNaN(deptId)) {
    return NextResponse.json({ error: "Invalid department ID" }, { status: 400 });
  }

  try {
    await prisma.department.delete({
      where: { id: deptId },
    });

    emitRealtimeEvent({
      type: "department:deleted",
      entity: "department",
      action: "deleted",
      entityId: deptId,
    });

    createNotification({
      actorEmail: auth?.email || "Admin",
      actionType: 'DELETE_DEPARTMENT',
      targetId: deptId,
      message: `${auth?.name || auth?.email?.split('@')[0] || 'Admin'} deleted department ID: ${deptId}`
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const prismaErr = error as { code?: string };
    if (prismaErr.code === "P2025") {
      return NextResponse.json({ error: "Department not found" }, { status: 404 });
    }
    console.error("Error deleting department:", error);
    return NextResponse.json({ error: "Failed to delete department" }, { status: 500 });
  }
}
