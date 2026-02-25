import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";

function requireAdmin(auth: { role: string } | null) {
  if (!auth || auth.role !== "Admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }
  return null;
}

/**
 * GET /api/roles - List all roles from the Role table.
 * Fetches from prisma.role (Role table in database).
 */
export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const roles = await prisma.role.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    });
    return NextResponse.json(roles, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error fetching roles:", err?.message ?? err);
    const msg =
      process.env.NODE_ENV === "development" && err?.message
        ? err.message
        : "Failed to fetch roles";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * POST /api/roles - Create role (admin only)
 */
export async function POST(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  const adminErr = requireAdmin(auth);
  if (adminErr) return adminErr;

  try {
    const body = await req.json();
    const { name } = body as { name?: string };
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const role = await prisma.role.create({
      data: { name: name.trim() },
    });
    return NextResponse.json(role);
  } catch (error: unknown) {
    const prismaErr = error as { code?: string };
    if (prismaErr.code === "P2002") {
      return NextResponse.json({ error: "Role with this name already exists" }, { status: 409 });
    }
    console.error("Error creating role:", error);
    return NextResponse.json({ error: "Failed to create role" }, { status: 500 });
  }
}
