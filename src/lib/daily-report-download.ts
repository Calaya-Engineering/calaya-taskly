"use client";

import { fetchWithAuth } from "@/lib/api";

type DailyReportDownloadRef = {
  id?: string | null;
  dbId?: number | null;
  title?: string | null;
  fileUrl?: string | null;
  entriesUrl?: string | null;
};

type DailyReportDetail = {
  id?: string | null;
  title?: string | null;
  fileUrl?: string | null;
  entriesUrl?: string | null;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
};

function sanitizeFilenamePart(value: string) {
  return value.replace(/[<>:"/\\|?*\u0000-\u001F]/g, "_").trim();
}

function withExtension(filename: string, fallbackExtension: string) {
  return /\.[a-z0-9]{2,8}$/i.test(filename) ? filename : `${filename}${fallbackExtension}`;
}

function deriveJsonFilename(report: DailyReportDownloadRef | DailyReportDetail) {
  const baseName = sanitizeFilenamePart(String(report.title || report.id || "daily-report")) || "daily-report";
  return withExtension(baseName, ".json");
}

function deriveAttachmentFilename(detail: DailyReportDetail) {
  const baseName = sanitizeFilenamePart(String(detail.attachmentName || detail.title || detail.id || "daily-report-attachment")) || "daily-report-attachment";
  return baseName;
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

async function downloadRemoteFile(url: string, filename: string) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch report file");
  }

  const blob = await response.blob();
  await downloadBlob(blob, filename);
}

async function fetchDailyReportDetail(report: DailyReportDownloadRef): Promise<DailyReportDetail> {
  if (!report.dbId) {
    return {
      id: report.id ?? null,
      title: report.title ?? null,
      fileUrl: report.fileUrl ?? null,
      entriesUrl: report.entriesUrl ?? report.fileUrl ?? null,
      attachmentUrl: null,
      attachmentName: null,
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
  const detail = await fetchDailyReportDetail(report);
  const attachmentUrl = String(detail.attachmentUrl || "").trim();

  if (attachmentUrl) {
    await downloadRemoteFile(attachmentUrl, deriveAttachmentFilename(detail));
    return;
  }

  const reportPayloadUrl = String(detail.entriesUrl || detail.fileUrl || report.entriesUrl || report.fileUrl || "").trim();
  if (!reportPayloadUrl) {
    throw new Error("No report file available to download");
  }

  if (/^https?:\/\//i.test(reportPayloadUrl)) {
    await downloadRemoteFile(reportPayloadUrl, deriveJsonFilename(detail));
    return;
  }

  const jsonBlob = new Blob([reportPayloadUrl], { type: "application/json;charset=utf-8" });
  await downloadBlob(jsonBlob, deriveJsonFilename(detail));
}
