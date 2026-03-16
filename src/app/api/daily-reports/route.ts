import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { createNotification } from "@/lib/notifications";
import { emitRealtimeEvent } from "@/lib/realtime-events";

// Configure Cloudinary from env (CLOUDINARY_URL)
cloudinary.config();

/**
 * GET /api/daily-reports
 * Returns Document records where type = "Report", optionally filtered by
 * department or departments (comma-separated) and date range.
 *
 * The fileUrl column stores a Cloudinary URL pointing to a JSON file that has:
 *   { entries: [...], status: string, attachmentUrl: string|null }
 * For legacy records it may hold an inline JSON array or a compact "RPT:..." string.
 * The scope column stores the report status (APPROVED | REVIEW_URGENTLY).
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
    const date = searchParams.get("date");
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
      // scope stores the report status for new records
      const status = d.scope === "REVIEW_URGENTLY" || d.scope === "APPROVED"
        ? d.scope
        : "APPROVED";

      // fileUrl is a Cloudinary URL; entries are fetched client-side when needed.
      // For the list view we just need the count from fileSize.
      return {
        id: `RPT-${String(d.id).padStart(4, "0")}`,
        dbId: d.id,
        date: d.createdAt.toISOString().split("T")[0],
        department: d.department,
        submittedBy: d.uploadedBy,
        submittedAt: d.createdAt.toISOString(),
        entries: [], // entries loaded separately via fileUrl
        entriesUrl: d.fileUrl,  // client can fetch this URL to get full entries
        fileSize: d.fileSize || "—",
        fileType: "Report",
        status,
        fileUrl: d.fileUrl,
      };
    });

    return NextResponse.json(formatted, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error: any) {
    console.error("Error fetching daily reports:", error?.message ?? error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch daily reports" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/daily-reports
 * Creates a new daily report stored as a Document record.
 * Body: { department, date, entries, urgentReview?, attachmentUrl? }
 *
 * Entries are uploaded as a JSON file to Cloudinary so that fileUrl stores
 * a short URL (≤190 chars) — safely within the VARCHAR column limit.
 * The report status is stored in the scope field.
 */
export async function POST(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

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

    const validEntries = entries
      .filter((e) => e?.taskName?.trim())
      .map((e) => ({
        taskName: String(e.taskName).trim(),
        objective: e.objective ? String(e.objective).trim() : "",
        target: e.target ? String(e.target).trim() : "",
        nextDayTask: e.nextDayTask ? String(e.nextDayTask).trim() : "",
      }));

    if (validEntries.length === 0) {
      return NextResponse.json({ error: "At least one task entry with a name is required" }, { status: 400 });
    }

    const reportDate = date || new Date().toISOString().split("T")[0];
    const submitterName: string =
      typeof auth.name === "string" && auth.name
        ? auth.name
        : auth.email.split("@")[0] || "Unknown";
    const reportStatus = urgentReview ? "REVIEW_URGENTLY" : "APPROVED";

    // ── Upload entries as a JSON file to Cloudinary ───────────────────────────
    // This stores a short Cloudinary URL in fileUrl (well within VARCHAR(191))
    // instead of a raw JSON blob that overflows the column.
    let entriesFileUrl: string | null = null;
    try {
      const jsonPayload = JSON.stringify({
        entries: validEntries,
        status: reportStatus,
        attachmentUrl: attachmentUrl || null,
      });

      const buffer = Buffer.from(jsonPayload, "utf-8");
      const deptSlug = department.trim().replace(/\s+/g, "_");

      const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            folder: "calaya-reports",
            public_id: `report_${deptSlug}_${reportDate}_${Date.now()}`,
            format: "json",
          },
          (error, result) => {
            if (error) reject(error);
            else if (result) resolve(result);
            else reject(new Error("Empty upload result from Cloudinary"));
          }
        );
        stream.end(buffer);
      });

      entriesFileUrl = uploadResult.secure_url;
    } catch (uploadErr: any) {
      // Fallback: compact inline summary that fits in VARCHAR(191)
      console.warn("Cloudinary JSON upload failed, using compact fallback:", uploadErr?.message);
      const names = validEntries.map((e) => e.taskName).join("|");
      entriesFileUrl = `RPT:${reportStatus}|${names}`.slice(0, 100);
    }

    let doc: any;
    try {
      doc = await prisma.document.create({
        data: {
          title: `Daily Report — ${department.trim()} — ${reportDate}`,
          type: "Report",
          department: department.trim(),
          uploadedBy: submitterName,
          scope: reportStatus, // scope encodes report status (APPROVED | REVIEW_URGENTLY)
          fileSize: `${validEntries.length} task${validEntries.length !== 1 ? "s" : ""}`,
          fileUrl: entriesFileUrl,
        },
      });
    } catch (dbErr: any) {
      console.error("DB error creating daily report:", dbErr?.message ?? dbErr);
      if (dbErr?.message?.includes("too long")) {
         // Second fallback attempt with minimal URL
         doc = await prisma.document.create({
          data: {
            title: `Daily Report — ${department.trim()} — ${reportDate}`,
            type: "Report",
            department: department.trim(),
            uploadedBy: submitterName,
            scope: reportStatus,
            fileSize: `${validEntries.length} task${validEntries.length !== 1 ? "s" : ""}`,
            fileUrl: "SHORT_FALLBACK",
          },
        });
      } else {
        throw dbErr;
      }
    }

    // Fire-and-forget: realtime event
    try {
      emitRealtimeEvent({ type: "document:created", entity: "document", action: "created", entityId: doc.id });
    } catch { /* non-critical */ }

    // Fire-and-forget: notification
    createNotification({
      actorEmail: auth.email,
      actionType: "UPLOAD_DOCUMENT",
      targetId: doc.id,
      message: urgentReview
        ? `🚨 URGENT: ${submitterName} (${auth.role}) submitted a daily report for ${department} on ${reportDate} — requires urgent review`
        : `${submitterName} (${auth.role}) submitted a daily report for ${department} on ${reportDate}`,
    }).catch((e) => console.error("Notification error (non-fatal):", e));

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
        status: reportStatus,
        fileUrl: doc.fileUrl,
        attachmentUrl: attachmentUrl || null,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Unexpected error in POST /api/daily-reports:", error?.message ?? error);
    return NextResponse.json(
      { error: error?.message || "Failed to create daily report" },
      { status: 500 }
    );
  }
}
