import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { createNotification } from "@/lib/notifications";
import { emitRealtimeEvent } from "@/lib/realtime-events";

/**
 * GET /api/daily-reports
 * Returns Document records where type = "Report", optionally filtered by
 * department or departments (comma-separated) and date range.
 */
export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = req.nextUrl;
    const department = searchParams.get("department");
    const departments = searchParams.get("departments");
    const date = searchParams.get("date"); // ISO date string YYYY-MM-DD
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Math.min(parseInt(limitParam, 10) || 200, 500) : 200;

    const where: any = { type: "Report" };

    // MD sees ALL departments; HOD/Staff filtered by dept param
    if (department && department !== "All") {
      where.department = department;
    } else if (departments) {
      const list = departments
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean);
      if (list.length === 1) where.department = list[0];
      else if (list.length > 1) where.department = { in: list };
    }

    // If a specific date is provided, filter by records created on that date.
    if (date) {
      const start = new Date(`${date}T00:00:00.000Z`);
      const end = new Date(`${date}T23:59:59.999Z`);
      where.createdAt = { gte: start, lte: end };
    }

    const documents = await prisma.document.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        type: true,
        department: true,
        uploadedBy: true,
        scope: true,
        fileSize: true,
        fileUrl: true,
        createdAt: true,
      },
    });

    const formatted = documents.map((d) => {
      // fileUrl stores: JSON payload { entries, status, attachmentUrl }
      let entries: unknown[] = [];
      let status = "APPROVED";
      let attachmentUrl: string | null = null;

      if (d.fileUrl) {
        try {
          const parsed = JSON.parse(d.fileUrl);
          if (Array.isArray(parsed)) {
            // Legacy: plain array of entries
            entries = parsed;
          } else if (parsed && typeof parsed === "object") {
            // New format: { entries, status, attachmentUrl }
            entries = Array.isArray(parsed.entries) ? parsed.entries : [];
            status = parsed.status || "APPROVED";
            attachmentUrl = parsed.attachmentUrl || null;
          }
        } catch {
          // not JSON — real file URL
        }
      }

      return {
        id: `RPT-${String(d.id).padStart(4, "0")}`,
        dbId: d.id,
        date: d.createdAt.toISOString().split("T")[0],
        department: d.department,
        submittedBy: d.uploadedBy,
        submittedAt: d.createdAt.toISOString(),
        entries,
        fileSize: d.fileSize || "—",
        fileType: "Report",
        status,
        fileUrl: attachmentUrl,
      };
    });

    return NextResponse.json(formatted, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error: any) {
    console.error("Error fetching daily reports:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch daily reports" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/daily-reports
 * Creates a new daily report stored as a Document record.
 * Body: { department: string, date: string (YYYY-MM-DD), entries: object[] }
 */
export async function POST(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { department, date, entries, urgentReview, attachmentUrl } = body as {
      department?: string;
      date?: string;
      urgentReview?: boolean;
      attachmentUrl?: string | null;
      entries?: { taskName: string; objective?: string; target?: string; nextDayTask?: string }[];
    };

    if (!department || typeof department !== "string" || !department.trim()) {
      return NextResponse.json({ error: "Department is required" }, { status: 400 });
    }

    if (!Array.isArray(entries) || entries.length === 0) {
      return NextResponse.json({ error: "At least one task entry is required" }, { status: 400 });
    }

    const validEntries = entries.filter((e) => e.taskName?.trim());
    if (validEntries.length === 0) {
      return NextResponse.json({ error: "At least one task entry with a name is required" }, { status: 400 });
    }

    const reportDate = date || new Date().toISOString().split("T")[0];
    const submitterName: string = (auth.name || auth.email.split("@")[0] || "Unknown") as string;
    const status = urgentReview ? "REVIEW_URGENTLY" : "APPROVED";

    // Store entries + status + attachmentUrl as structured JSON in fileUrl.
    const payload = JSON.stringify({ entries: validEntries, status, attachmentUrl: attachmentUrl || null });

    const doc = await prisma.document.create({
      data: {
        title: `Daily Report — ${department} — ${reportDate}`,
        type: "Report",
        department: department.trim(),
        uploadedBy: submitterName,
        scope: "DEPARTMENT",
        fileSize: `${validEntries.length} task${validEntries.length !== 1 ? "s" : ""}`,
        fileUrl: payload,
      },
    });

    // Fire realtime event so dashboards update instantly
    emitRealtimeEvent({
      type: "document:created",
      entity: "document",
      action: "created",
      entityId: doc.id,
    });

    // Notification message highlights urgent reports
    createNotification({
      actorEmail: auth.email,
      actionType: "UPLOAD_DOCUMENT",
      targetId: doc.id,
      message: urgentReview
        ? `🚨 URGENT: ${submitterName} (${auth.role}) submitted a daily report for ${department} on ${reportDate} — requires urgent review`
        : `${submitterName} (${auth.role}) submitted a daily report for ${department} on ${reportDate}`,
    });

    return NextResponse.json(
      {
        id: `RPT-${String(doc.id).padStart(4, "0")}`,
        dbId: doc.id,
        date: reportDate,
        department: doc.department,
        submittedBy: doc.uploadedBy,
        submittedAt: doc.createdAt.toISOString(),
        entries: validEntries,
        fileSize: doc.fileSize,
        status,
        fileUrl: attachmentUrl || null,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating daily report:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create daily report" },
      { status: 500 }
    );
  }
}
