import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { ensureMidpointRemindersForTasks } from "@/lib/task-notifications";

/**
 * GET /api/tasks/my-tasks - Tasks assigned to the authenticated user.
 * Query: status, type, q, limit, compact
 */
export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: auth.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const q = searchParams.get("q");
    const compact = searchParams.get("compact") === "true";
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "100", 10) || 100, 300);

    const where: any = {
      assignments: { some: { userId: user.id } },
    };

    if (status) {
      where.status = status;
    }

    if (q) {
      where.OR = [
        { title: { contains: q } },
        { description: { contains: q } },
      ];
    }

    if (type) {
      if (type.includes(",")) {
        where.type = { in: type.split(",").map((t) => t.trim()).filter(Boolean) };
      } else {
        where.type = type;
      }
    } else {
      where.type = { not: "EVENT" };
    }

    const baseQuery = {
      where,
      take: limit,
      orderBy: { createdAt: "desc" as const },
    };

    const tasks = compact
      ? await prisma.task.findMany({
          ...baseQuery,
          select: {
            id: true,
            title: true,
            status: true,
            priority: true,
            type: true,
            dueDate: true,
            createdAt: true,
            updatedAt: true,
          },
        })
      : await prisma.task.findMany({
          ...baseQuery,
          include: {
            createdBy: { select: { id: true, email: true, name: true, role: true } },
            assignments: {
              include: {
                user: { select: { id: true, email: true, name: true, role: true, department: true } },
                assignedBy: { select: { id: true, email: true, name: true, role: true } },
              },
            },
          },
        });

    if (!compact && Array.isArray(tasks) && tasks.length > 0) {
      await ensureMidpointRemindersForTasks(tasks);
    }

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching assigned tasks:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to fetch my tasks", ...(process.env.NODE_ENV === "development" && { details: message }) },
      { status: 500 }
    );
  }
}
