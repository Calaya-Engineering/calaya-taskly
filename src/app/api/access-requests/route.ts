import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";

function isMissingAccessRequestTable(error: unknown) {
  if (!error || typeof error !== "object") return false;

  const code = "code" in error ? String(error.code || "") : "";
  const message = "message" in error ? String(error.message || "") : "";

  return code === "P2021" || /accessrequest/i.test(message);
}

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
    const parsedLimit = Number.parseInt(req.nextUrl.searchParams.get("limit") || "100", 10);
    const parsedOffset = Number.parseInt(req.nextUrl.searchParams.get("offset") || "0", 10);
    const limit = Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 300) : 100;
    const offset = Number.isFinite(parsedOffset) ? Math.max(parsedOffset, 0) : 0;
    const requests = await prisma.accessRequest.findMany({
      where: statusFilter && statusFilter !== "ALL" ? { status: statusFilter } : undefined,
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
      take: limit,
      skip: offset,
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
    if (isMissingAccessRequestTable(error)) {
      console.warn("AccessRequest table is not available yet. Returning an empty list for admin access requests.");
      return NextResponse.json([]);
    }

    console.error("Failed to load access requests:", error);
    return NextResponse.json({ error: "Failed to load access requests" }, { status: 500 });
  }
}
