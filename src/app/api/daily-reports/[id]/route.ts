import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/jwt";
import { resolveDailyReportPayload } from "@/lib/daily-reports";
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
    const report = await prisma.document.findFirst({
      where: {
        id: reportId,
        type: "Report",
      },
      select: {
        id: true,
        title: true,
        department: true,
        uploadedBy: true,
        scope: true,
        fileSize: true,
        fileUrl: true,
        downloads: true,
        createdAt: true,
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

    const payload = await resolveDailyReportPayload(report.fileUrl);
    const status =
      report.scope === "REVIEW_URGENTLY" || report.scope === "APPROVED" || report.scope === "PENDING"
        ? report.scope
        : "APPROVED";

    return NextResponse.json({
      id: `RPT-${String(report.id).padStart(4, "0")}`,
      dbId: report.id,
      title: report.title,
      date: report.createdAt.toISOString().split("T")[0],
      department: report.department,
      submittedBy: report.uploadedBy,
      submittedAt: report.createdAt.toISOString(),
      status,
      fileSize: report.fileSize || "—",
      fileUrl: report.fileUrl,
      entriesUrl: report.fileUrl,
      downloads: report.downloads,
      entries: payload.entries,
      attachmentUrl: payload.attachmentUrl,
      attachmentName: payload.attachmentName,
      previewAvailability: payload.previewAvailability,
      previewNote: payload.previewNote,
    });
  } catch (error) {
    console.error("Error fetching daily report detail:", error);
    return NextResponse.json({ error: "Failed to fetch report detail" }, { status: 500 });
  }
}
