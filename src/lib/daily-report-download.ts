"use client";

import { fetchWithAuth } from "@/lib/api";
import { resolveDailyReportPayload } from "@/lib/daily-reports";
import { createSimplePdfBlob, type PdfTextBlock } from "@/lib/simple-pdf";

type DailyReportDownloadRef = {
  id?: string | null;
  dbId?: number | null;
  title?: string | null;
  fileUrl?: string | null;
  entriesUrl?: string | null;
  date?: string | null;
  department?: string | null;
  submittedBy?: string | null;
  submittedAt?: string | null;
  status?: string | null;
  fileSize?: string | null;
  entries?: Array<{
    taskName?: string | null;
    objective?: string | null;
    target?: string | null;
    nextDayTask?: string | null;
  }> | null;
};

type DailyReportDetail = {
  id?: string | null;
  dbId?: number | null;
  title?: string | null;
  date?: string | null;
  department?: string | null;
  submittedBy?: string | null;
  submittedAt?: string | null;
  status?: string | null;
  fileSize?: string | null;
  fileUrl?: string | null;
  entriesUrl?: string | null;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
  previewAvailability?: "full" | "limited" | "unavailable" | null;
  previewNote?: string | null;
  entries?: Array<{
    taskName?: string | null;
    objective?: string | null;
    target?: string | null;
    nextDayTask?: string | null;
  }> | null;
};

function sanitizeFilenamePart(value: string) {
  return value.replace(/[<>:"/\\|?*\u0000-\u001F]/g, "_").trim();
}

function withExtension(filename: string, fallbackExtension: string) {
  return /\.[a-z0-9]{2,8}$/i.test(filename) ? filename : `${filename}${fallbackExtension}`;
}

function derivePdfFilename(report: DailyReportDownloadRef | DailyReportDetail) {
  const baseName = sanitizeFilenamePart(String(report.title || report.id || "daily-report")) || "daily-report";
  return withExtension(baseName, ".pdf");
}

function triggerBrowserDownload(url: string, filename?: string) {
  const link = document.createElement("a");
  link.href = url;
  if (filename) {
    link.download = filename;
  }
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

async function downloadBlob(blob: Blob, filename: string) {
  const objectUrl = URL.createObjectURL(blob);
  try {
    triggerBrowserDownload(objectUrl, filename);
  } finally {
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  }
}

function formatDate(value?: string | null) {
  if (!value) return "Not available";
  try {
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return value;
  }
}

function formatDateTime(value?: string | null) {
  if (!value) return "Not available";
  try {
    return new Date(value).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  } catch {
    return value;
  }
}

function formatFieldLabel(label: string, value?: string | null) {
  return `${label}: ${String(value || "").trim() || "Not available"}`;
}

function normalizeEntries(detail: DailyReportDetail) {
  return Array.isArray(detail.entries)
    ? detail.entries.filter((entry) => String(entry?.taskName || "").trim())
    : [];
}

async function hydrateDailyReportDetail(report: DailyReportDownloadRef): Promise<DailyReportDetail> {
  const baseDetail = await fetchDailyReportDetail(report);
  const currentEntries = normalizeEntries(baseDetail);
  if (currentEntries.length > 0) {
    return baseDetail;
  }

  const payloadSource = String(baseDetail.entriesUrl || baseDetail.fileUrl || report.entriesUrl || report.fileUrl || "").trim();
  if (!payloadSource) {
    return baseDetail;
  }

  const payload = await resolveDailyReportPayload(payloadSource);
  return {
    ...baseDetail,
    entries: payload.entries,
    attachmentUrl: baseDetail.attachmentUrl ?? payload.attachmentUrl,
    attachmentName: baseDetail.attachmentName ?? payload.attachmentName,
    previewAvailability: baseDetail.previewAvailability ?? payload.previewAvailability,
    previewNote: baseDetail.previewNote ?? payload.previewNote,
  };
}

function buildDailyReportPdf(detail: DailyReportDetail) {
  const entries = normalizeEntries(detail);
  const blocks: PdfTextBlock[] = [
    { text: String(detail.title || "Daily Report Preview"), font: "bold", size: 18, gapAfter: 6 },
    { text: formatFieldLabel("Report ID", detail.id), size: 11 },
    { text: formatFieldLabel("Department", detail.department), size: 11 },
    { text: formatFieldLabel("Status", detail.status), size: 11 },
    { text: formatFieldLabel("Report Date", formatDate(detail.date)), size: 11 },
    { text: formatFieldLabel("Submitted By", detail.submittedBy), size: 11 },
    { text: formatFieldLabel("Submitted At", formatDateTime(detail.submittedAt)), size: 11 },
    { text: formatFieldLabel("Summary", detail.fileSize), size: 11, gapAfter: 8 },
  ];

  if (detail.previewNote) {
    blocks.push({
      text: `Note: ${detail.previewNote}`,
      size: 11,
      gapAfter: 8,
    });
  }

  if (detail.attachmentName || detail.attachmentUrl) {
    blocks.push({
      text: `Attachment: ${detail.attachmentName || "Attached file available in the system."}`,
      size: 11,
      gapAfter: 8,
    });
  }

  blocks.push({ text: "Task Entries", font: "bold", size: 14, gapBefore: 4, gapAfter: 4 });

  if (entries.length === 0) {
    blocks.push({
      text: "No structured task entries are available for this report.",
      size: 11,
    });
  } else {
    entries.forEach((entry, index) => {
      const taskName = String(entry.taskName || "").trim() || "Untitled Task";
      blocks.push({
        text: `${index + 1}. ${taskName}`,
        font: "bold",
        size: 12,
        gapBefore: index === 0 ? 0 : 4,
      });
      blocks.push({ text: `Objective: ${String(entry.objective || "").trim() || "—"}`, size: 11, indent: 12 });
      blocks.push({ text: `Target: ${String(entry.target || "").trim() || "—"}`, size: 11, indent: 12 });
      blocks.push({
        text: `Next Day Task: ${String(entry.nextDayTask || "").trim() || "—"}`,
        size: 11,
        indent: 12,
      });
    });
  }

  return createSimplePdfBlob(blocks);
}

async function fetchDailyReportDetail(report: DailyReportDownloadRef): Promise<DailyReportDetail> {
  if (!report.dbId) {
    const payloadSource = String(report.entriesUrl || report.fileUrl || "").trim();
    const payload = payloadSource ? await resolveDailyReportPayload(payloadSource) : null;

    return {
      id: report.id ?? null,
      dbId: report.dbId ?? null,
      title: report.title ?? null,
      date: report.date ?? null,
      department: report.department ?? null,
      submittedBy: report.submittedBy ?? null,
      submittedAt: report.submittedAt ?? null,
      status: report.status ?? null,
      fileSize: report.fileSize ?? null,
      fileUrl: report.fileUrl ?? null,
      entriesUrl: report.entriesUrl ?? report.fileUrl ?? null,
      attachmentUrl: payload?.attachmentUrl ?? null,
      attachmentName: payload?.attachmentName ?? null,
      previewAvailability: payload?.previewAvailability ?? null,
      previewNote: payload?.previewNote ?? null,
      entries: payload?.entries ?? report.entries ?? [],
    };
  }

  const response = await fetchWithAuth(`/api/daily-reports/${report.dbId}`);
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.error || "Failed to load report details");
  }

  return data ?? {};
}

export async function downloadDailyReport(report: DailyReportDownloadRef) {
  const detail = await hydrateDailyReportDetail(report);
  const pdfBlob = buildDailyReportPdf(detail);
  await downloadBlob(pdfBlob, derivePdfFilename(detail));
}
