import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";

function requireAdmin(auth: { role: string } | null) {
  if (!auth || auth.role !== "Admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }
  return null;
}

/**
 * PATCH /api/roles/[id] - Update role (admin only)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  const adminErr = requireAdmin(auth);
  if (adminErr) return adminErr;

  const { id } = await params;
  const roleId = parseInt(id, 10);
  if (Number.isNaN(roleId)) {
    return NextResponse.json({ error: "Invalid role ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { name } = body as { name?: string };
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const role = await prisma.role.update({
      where: { id: roleId },
      data: { name: name.trim() },
    });

    emitRealtimeEvent({
      type: "role:updated",
      entity: "role",
      action: "updated",
      entityId: role.id,
    });

    return NextResponse.json(role);
  } catch (error: unknown) {
    const prismaErr = error as { code?: string };
    if (prismaErr.code === "P2002") {
      return NextResponse.json({ error: "Role with this name already exists" }, { status: 409 });
    }
    if (prismaErr.code === "P2025") {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }
    console.error("Error updating role:", error);
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
  }
}

/**
 * DELETE /api/roles/[id] - Delete role (admin only)
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(_req);
  const adminErr = requireAdmin(auth);
  if (adminErr) return adminErr;

  const { id } = await params;
  const roleId = parseInt(id, 10);
  if (Number.isNaN(roleId)) {
    return NextResponse.json({ error: "Invalid role ID" }, { status: 400 });
  }

  try {
    await prisma.role.delete({
      where: { id: roleId },
    });

    emitRealtimeEvent({
      type: "role:deleted",
      entity: "role",
      action: "deleted",
      entityId: roleId,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const prismaErr = error as { code?: string };
    if (prismaErr.code === "P2025") {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }
    console.error("Error deleting role:", error);
    return NextResponse.json({ error: "Failed to delete role" }, { status: 500 });
  }
}
