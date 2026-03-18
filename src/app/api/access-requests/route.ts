import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";

function requireAdmin(auth: { role: string } | null) {
  if (!auth || auth.role !== "Admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  return null;
}

export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  const adminError = requireAdmin(auth);
  if (adminError) return adminError;

  try {
    const statusFilter = req.nextUrl.searchParams.get("status")?.trim().toUpperCase();
    const requests = await prisma.accessRequest.findMany({
      where: statusFilter && statusFilter !== "ALL" ? { status: statusFilter } : undefined,
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    });

    const emails = Array.from(new Set(requests.map((request) => request.email)));
    const users = emails.length
      ? await prisma.user.findMany({
          where: { email: { in: emails } },
          select: { email: true, id: true },
        })
      : [];
    const userByEmail = new Map(users.map((user) => [user.email.toLowerCase(), user]));

    return NextResponse.json(
      requests.map((request) => ({
        ...request,
        existingUserId: userByEmail.get(request.email.toLowerCase())?.id || null,
      })),
    );
  } catch (error) {
    console.error("Failed to load access requests:", error);
    return NextResponse.json({ error: "Failed to load access requests" }, { status: 500 });
  }
}
