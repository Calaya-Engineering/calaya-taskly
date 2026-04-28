import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { createNotification } from "@/lib/notifications";
import { emitRealtimeEvent } from "@/lib/realtime-events";
import { getManagedDepartmentNamesByEmail } from "@/lib/hod-departments";
import { buildDailyReportSummary, normalizeDailyReportStatus } from "@/lib/daily-reports";

function toUtcDayBounds(date: string) {
  const start = new Date(`${date}T00:00:00.000Z`);
  const end = new Date(`${date}T23:59:59.999Z`);
  return { start, end };
}

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
    const offsetParam = searchParams.get("offset");
    const parsedLimit = limitParam ? parseInt(limitParam, 10) : Number.NaN;
    const parsedOffset = offsetParam ? parseInt(offsetParam, 10) : Number.NaN;
    const limit = Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 500) : 200;
    const offset = Number.isFinite(parsedOffset) ? Math.max(parsedOffset, 0) : 0;
    const linkedTaskOnly = searchParams.get("linkedTask") === "true";
    const reportType = String(searchParams.get("reportType") || "").toLowerCase();

    let managedDepartmentNames =
      auth.role === "HOD" ? await getManagedDepartmentNamesByEmail(auth.email) : [];

    if (auth.role === "HOD" && managedDepartmentNames.length === 0) {
      const hodUser = await prisma.user.findUnique({
        where: { email: auth.email.trim().toLowerCase() },
        select: { department: true },
      });
      const fallback = hodUser?.department?.trim();
      if (fallback) {
        managedDepartmentNames = [fallback];
      }
    }

    const where: any = {};

    if (auth.role === "HOD") {
      if (managedDepartmentNames.length === 0) {
        return NextResponse.json([]);
      }
      where.department = { in: managedDepartmentNames };
    }

    if (department && department.toLowerCase() !== "all") {
      if (auth.role === "HOD" && !managedDepartmentNames.includes(department)) {
        return NextResponse.json([]);
      }
      where.department = department;
    } else if (departments) {
      const requestedDepartments = departments
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
      const filteredDepartments = auth.role === "HOD"
        ? requestedDepartments.filter((value) => managedDepartmentNames.includes(value))
        : requestedDepartments;

      if (filteredDepartments.length === 0 && auth.role === "HOD") {
        return NextResponse.json([]);
      }

      if (filteredDepartments.length === 1) {
        where.department = filteredDepartments[0];
      } else if (filteredDepartments.length > 1) {
        where.department = { in: filteredDepartments };
      }
    }

    if (date) {
      const { start, end } = toUtcDayBounds(date);
      where.reportDate = { gte: start, lte: end };
    }

    if (linkedTaskOnly) {
      where.entries = {
        some: {
          target: { contains: "Task ID:" },
        },
      };
    } else if (reportType === "general") {
      where.entries = {
        none: {
          target: { contains: "Task ID:" },
        },
      };
      where.submittedByRole = "STAFF";
    } else if (reportType === "daily") {
      where.entries = {
        none: {
          target: { contains: "Task ID:" },
        },
      };
      where.submittedByRole = { not: "STAFF" };
    } else if (reportType === "task") {
      where.entries = {
        some: {
          target: { contains: "Task ID:" },
        },
      };
    }

    const reports = await prisma.dailyReport.findMany({
      where,
      orderBy: [{ reportDate: "desc" }, { submittedAt: "desc" }, { id: "desc" }],
      skip: offset,
      take: limit,
      select: {
        id: true,
        title: true,
        department: true,
        submittedBy: true,
        status: true,
        summary: true,
        payloadSource: true,
        attachmentUrl: true,
        attachmentName: true,
        downloads: true,
        reportDate: true,
        submittedAt: true,
        entries: {
          select: { id: true },
        },
      },
    });

    const formatted = reports.map((report) => ({
      id: `RPT-${String(report.id).padStart(4, "0")}`,
      dbId: report.id,
      title: report.title,
      date: report.reportDate.toISOString().split("T")[0],
      department: report.department,
      submittedBy: report.submittedBy,
      submittedAt: report.submittedAt.toISOString(),
      entries: [],
      entriesUrl: report.payloadSource,
      fileSize: buildDailyReportSummary(report.entries.length, report.summary),
      fileType: "Report",
      status: normalizeDailyReportStatus(report.status),
      downloads: report.downloads,
      fileUrl: report.attachmentUrl || report.payloadSource || null,
      attachmentUrl: report.attachmentUrl,
      attachmentName: report.attachmentName,
    }));

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

    const { department, date, entries, urgentReview, title, attachmentUrl, attachmentName } = body as {
      department?: string;
      date?: string;
      urgentReview?: boolean;
      title?: string;
      attachmentUrl?: string | null;
      attachmentName?: string | null;
      entries?: { taskName: string; objective?: string; target?: string; nextDayTask?: string }[];
    };

    if (!department || typeof department !== "string" || !department.trim()) {
      return NextResponse.json({ error: "Department is required" }, { status: 400 });
    }

    if (!Array.isArray(entries) || entries.length === 0) {
      return NextResponse.json({ error: "At least one task entry is required" }, { status: 400 });
    }

    const validEntries = entries
      .filter((entry) => entry?.taskName?.trim())
      .map((entry) => ({
        taskName: String(entry.taskName).trim(),
        objective: entry.objective ? String(entry.objective).trim() : "",
        target: entry.target ? String(entry.target).trim() : "",
        nextDayTask: entry.nextDayTask ? String(entry.nextDayTask).trim() : "",
      }));

    if (validEntries.length === 0) {
      return NextResponse.json({ error: "At least one task entry with a name is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: auth.email.trim().toLowerCase() },
      select: { id: true, name: true },
    });

    const reportDateString =
      typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
        ? date
        : new Date().toISOString().split("T")[0];
    const reportDate = new Date(`${reportDateString}T00:00:00.000Z`);
    const submitterName =
      typeof user?.name === "string" && user.name.trim()
        ? user.name.trim()
        : auth.email.split("@")[0] || "Unknown";
    const normalizedRole = String(auth.role || "").toUpperCase();
    const reportStatus =
      normalizedRole === "STAFF"
        ? "PENDING"
        : urgentReview
          ? "REVIEW_URGENTLY"
          : "APPROVED";
    const reportTitle =
      typeof title === "string" && title.trim()
        ? title.trim()
        : `Daily Report — ${department.trim()} — ${reportDateString}`;
    const summary = buildDailyReportSummary(validEntries.length);

    const report = await prisma.dailyReport.create({
      data: {
        title: reportTitle,
        department: department.trim(),
        submittedBy: submitterName,
        submittedByRole: normalizedRole || null,
        submittedByUserId: user?.id ?? null,
        reportDate,
        submittedAt: new Date(),
        status: reportStatus,
        summary,
        attachmentUrl: attachmentUrl ? String(attachmentUrl).trim() : null,
        attachmentName: attachmentName ? String(attachmentName).trim() : null,
        entries: {
          create: validEntries.map((entry, index) => ({
            orderIndex: index,
            taskName: entry.taskName,
            objective: entry.objective,
            target: entry.target,
            nextDayTask: entry.nextDayTask,
          })),
        },
      },
      include: {
        entries: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    try {
      emitRealtimeEvent({ type: "document:created", entity: "document", action: "created", entityId: report.id });
      emitRealtimeEvent({ type: "daily-report:created", entity: "daily-report", action: "created", entityId: report.id });
    } catch {
      // Non-critical realtime failure.
    }

    createNotification({
      actorEmail: auth.email,
      actionType: "REPORT_SUBMITTED",
      targetId: report.id,
      message: urgentReview
        ? `🚨 URGENT: ${submitterName} (${auth.role}) submitted a daily report for ${department} on ${reportDateString} — requires urgent review`
        : `${submitterName} (${auth.role}) submitted a daily report for ${department} on ${reportDateString}`,
      recipients: {
        roles: ["HOD", "MD"],
        departments: [department.trim()],
        includeActor: false,
      },
      sendEmail: true,
      emailSubject: `Daily Report Submitted — ${submitterName} | ${department.trim()} | ${reportDateString}`,
      linkPath: `/open/item?type=report&id=${report.id}`,
    }).catch((error) => console.error("Notification error (non-fatal):", error));

    return NextResponse.json(
      {
        id: `RPT-${String(report.id).padStart(4, "0")}`,
        dbId: report.id,
        title: report.title,
        date: report.reportDate.toISOString().split("T")[0],
        department: report.department,
        submittedBy: report.submittedBy,
        submittedAt: report.submittedAt.toISOString(),
        entries: report.entries.map((entry) => ({
          taskName: entry.taskName,
          objective: entry.objective ?? "",
          target: entry.target ?? "",
          nextDayTask: entry.nextDayTask ?? "",
        })),
        fileSize: summary,
        status: normalizeDailyReportStatus(report.status),
        fileUrl: report.attachmentUrl || null,
        entriesUrl: report.payloadSource,
        attachmentUrl: report.attachmentUrl,
        attachmentName: report.attachmentName,
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
