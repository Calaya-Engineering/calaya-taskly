import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { createNotification } from "@/lib/notifications";

const DEFAULT_TENDER_DEPARTMENT = "Company-wide";

/**
 * GET /api/tenders - List tenders (Authenticated)
 * Query params: status, department, search
 */
export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = req.nextUrl;
    const status = searchParams.get("status");
    const department = searchParams.get("department");
    const search = searchParams.get("search")?.trim() || "";
    const compact = searchParams.get("compact") === "true";
    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? "50", 10) || 50,
      100,
    );

    const where: any = {};
    if (status && status !== "all") where.status = status;
    if (department && department !== "all") {
      where.department = department;
    } else {
      const departments = searchParams.get("departments");
      if (departments) {
        const list = departments
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean);
        if (list.length === 1) where.department = list[0];
        else if (list.length > 1) where.department = { in: list };
      }
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { referenceNo: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (compact) {
      const compactTenders = await prisma.tender.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        select: {
          id: true,
          createdAt: true,
        },
      });
      return NextResponse.json(compactTenders);
    }

    const tenders = await prisma.tender.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        _count: {
          select: { documents: true },
        },
      },
    });

    const formatted = tenders.map((t) => ({
      id: t.referenceNo, // In frontend, ID is used as the reference No or short ID
      dbId: t.id,
      title: t.title,
      referenceNo: t.referenceNo,
      description: t.description,
      issuedDate: t.issuedDate.toISOString().split("T")[0],
      closingDate: t.closingDate.toISOString().split("T")[0],
      department: t.department || DEFAULT_TENDER_DEPARTMENT,
      category: t.category,
      documents: t._count.documents,
      downloads: 0,
      fileSize: `${t._count.documents} file${t._count.documents === 1 ? "" : "s"}`,
      status: t.status,
      createdBy: t.createdBy,
      createdAt: t.createdAt.toISOString().split("T")[0],
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    console.error("Error fetching tenders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/tenders - Create tender (MD only)
 */
export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth || !["MD", "HOD"].includes(auth.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, closingDate, referenceNo, status } = body;

    if (!title || !closingDate || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const tender = await prisma.tender.create({
      data: {
        title,
        referenceNo: referenceNo || `TEN-${Date.now()}`,
        description,
        department: DEFAULT_TENDER_DEPARTMENT,
        category: null,
        closingDate: new Date(closingDate),
        createdBy: auth.email || "Unknown",
        status: typeof status === "string" && status.trim() ? status : "OPEN",
      },
    });

    emitRealtimeEvent({
      type: "tender:created",
      entity: "tender",
      action: "created",
      entityId: tender.id,
    });

    createNotification({
      actorEmail: auth.email,
      actionType: "CREATE_TENDER",
      targetId: tender.id,
      message: `${auth.name || auth.email.split("@")[0]} (${auth.role}) created a new tender: ${tender.title}`,
    });

    return NextResponse.json(tender);
  } catch (error: any) {
    console.error("Error creating tender:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
