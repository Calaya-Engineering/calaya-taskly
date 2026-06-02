import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { getAuthedUserOrNull } from "@/lib/chat";

/**
 * GET /api/chat/users/search?q=... — find people to start a chat with.
 *
 * Matches against name, email, role, and department.
 * Excludes the current user.
 */
export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const me = await getAuthedUserOrNull(auth.email);
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q")?.trim() || "";
  const limit = Math.min(
    Math.max(Number.parseInt(searchParams.get("limit") || "20", 10) || 20, 1),
    50,
  );

  const where: any = { NOT: { id: me.id } };
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { email: { contains: q } },
      { role: { contains: q } },
      { department: { contains: q } },
    ];
  }

  const users = await prisma.user.findMany({
    where,
    take: limit,
    orderBy: [{ name: "asc" }, { email: "asc" }],
    select: { id: true, name: true, email: true, role: true, department: true },
  });

  return NextResponse.json({
    users: users.map((u) => ({
      id: u.id,
      name: u.name || u.email.split("@")[0],
      email: u.email,
      role: u.role,
      department: u.department,
    })),
  });
}
