import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import {
  buildDailyReportSummary,
  normalizeDailyReportStatus,
  normalizeStoredDailyReportEntries,
  resolveDailyReportPayload,
} from "@/lib/daily-reports";
import { getManagedDepartmentNamesByEmail } from "@/lib/hod-departments";

function parseDailyReportId(value: string) {
  const normalized = value.trim();
  if (/^\d+$/.test(normalized)) return Number(normalized);
  const reportMatch = normalized.match(/^RPT-(\d+)$/i);
  return reportMatch ? Number(reportMatch[1]) : Number.NaN;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const reportId = parseDailyReportId(id);
  if (!Number.isInteger(reportId) || reportId <= 0) {
    return NextResponse.json({ error: "Invalid report ID" }, { status: 400 });
  }

  try {
    const report = await prisma.dailyReport.findFirst({
      where: {
        id: reportId,
      },
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
        createdAt: true,
        entries: {
          select: {
            orderIndex: true,
            taskName: true,
            objective: true,
            target: true,
            nextDayTask: true,
          },
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    if (auth.role === "HOD") {
      const managedDepartments = await getManagedDepartmentNamesByEmail(auth.email);
      if (!managedDepartments.includes(report.department)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const storedEntries = normalizeStoredDailyReportEntries(report.entries);
    const payload = storedEntries.length > 0
      ? {
          entries: storedEntries,
          attachmentUrl: report.attachmentUrl ?? null,
          attachmentName: report.attachmentName ?? null,
          previewAvailability: "full" as const,
          previewNote: null,
        }
      : await resolveDailyReportPayload(report.payloadSource);
    const status = normalizeDailyReportStatus(report.status);
    const attachmentUrl = report.attachmentUrl ?? payload.attachmentUrl;
    const attachmentName = report.attachmentName ?? payload.attachmentName;

    return NextResponse.json({
      id: `RPT-${String(report.id).padStart(4, "0")}`,
      dbId: report.id,
      title: report.title,
      date: report.reportDate.toISOString().split("T")[0],
      department: report.department,
      submittedBy: report.submittedBy,
      submittedAt: report.submittedAt.toISOString(),
      status,
      fileSize: buildDailyReportSummary(storedEntries.length, report.summary),
      fileUrl: attachmentUrl || report.payloadSource || null,
      entriesUrl: report.payloadSource,
      downloads: report.downloads,
      entries: payload.entries,
      attachmentUrl,
      attachmentName,
      previewAvailability: payload.previewAvailability,
      previewNote: payload.previewNote,
    });
  } catch (error) {
    console.error("Error fetching daily report detail:", error);
    return NextResponse.json({ error: "Failed to fetch report detail" }, { status: 500 });
  }
}
