import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { isManagingDirectorRole } from "@/lib/auth-config";

/**
 * GET /api/audit-logs — list audit log entries.
 *
 * Query params:
 *   - action      (filter by action code)
 *   - userEmail   (filter by actor email, contains)
 *   - targetType  (e.g. DOCUMENT, TENDER, TASK)
 *   - from        (ISO date string)
 *   - to          (ISO date string)
 *   - limit, offset
 *
 * Only MD or Admin may view.
 */
export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (auth.role !== "Admin" && !isManagingDirectorRole(auth.role)) {
    return NextResponse.json({ error: "MD or Admin access required" }, { status: 403 });
  }

  const { searchParams } = req.nextUrl;
  const action = searchParams.get("action")?.trim() || undefined;
  const userEmail = searchParams.get("userEmail")?.trim() || undefined;
  const targetType = searchParams.get("targetType")?.trim() || undefined;
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const parsedLimit = Number.parseInt(searchParams.get("limit") || "100", 10);
  const parsedOffset = Number.parseInt(searchParams.get("offset") || "0", 10);
  const limit = Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 500) : 100;
  const offset = Number.isFinite(parsedOffset) ? Math.max(parsedOffset, 0) : 0;

  const where: any = {};
  if (action) where.action = action;
  if (targetType) where.targetType = targetType;
  if (userEmail) where.userEmail = { contains: userEmail.toLowerCase() };
  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt.gte = new Date(from);
    if (to) where.createdAt.lte = new Date(to);
  }

  const [total, entries] = await Promise.all([
    prisma.auditLog.count({ where }),
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    }),
  ]);

  return NextResponse.json({
    total,
    limit,
    offset,
    entries: entries.map((e) => ({
      id: e.id,
      action: e.action,
      summary: e.summary,
      targetType: e.targetType,
      targetId: e.targetId,
      ipAddress: e.ipAddress,
      createdAt: e.createdAt,
      metadata: e.metadata ? safeParseJson(e.metadata) : null,
      user: {
        id: e.user?.id ?? e.userId ?? null,
        name: e.user?.name ?? null,
        email: e.user?.email ?? e.userEmail ?? null,
        role: e.user?.role ?? e.userRole ?? null,
      },
    })),
  });
}

function safeParseJson(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
