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
 * GET /api/departments - List all departments
 */
export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const departments = await prisma.department.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    });

    return NextResponse.json(departments, {
      headers: {
        "Cache-Control": "private, max-age=300, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json({ error: "Failed to fetch departments" }, { status: 500 });
  }
}

/**
 * POST /api/departments - Create department (admin only)
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

    const dept = await prisma.department.create({
      data: { name: name.trim() },
    });
    return NextResponse.json(dept);
  } catch (error: unknown) {
    const prismaErr = error as { code?: string };
    if (prismaErr.code === "P2002") {
      return NextResponse.json({ error: "Department with this name already exists" }, { status: 409 });
    }
    console.error("Error creating department:", error);
    return NextResponse.json({ error: "Failed to create department" }, { status: 500 });
  }
}
