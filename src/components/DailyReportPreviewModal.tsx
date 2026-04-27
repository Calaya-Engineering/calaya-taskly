"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";
import { downloadDailyReport } from "@/lib/daily-report-download";
import { toast } from "@/lib/toast";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

type DailyReportPreviewData = {
  id: string;
  dbId: number;
  title: string;
  date: string;
  department: string;
  submittedBy: string;
  submittedAt: string;
  status: string;
  fileSize: string;
  fileUrl: string | null;
  entriesUrl: string | null;
  attachmentUrl: string | null;
  attachmentName: string | null;
  previewAvailability: "full" | "limited" | "unavailable";
  previewNote: string | null;
  entries: Array<{
    taskName: string;
    objective: string;
    target: string;
    nextDayTask: string;
  }>;
};

type Props = {
  open: boolean;
  reportId: number | null;
  onClose: () => void;
};

const Card = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const Pill = ({ children, tone = "default" }: { children: React.ReactNode; tone?: string }) => {
  const styles =
    tone === "danger"
      ? "bg-red-50 text-red-700 ring-red-100"
      : tone === "success"
        ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
        : tone === "warn"
          ? "bg-amber-50 text-amber-800 ring-amber-100"
          : tone === "info"
            ? "bg-blue-50 text-blue-700 ring-blue-100"
            : "bg-gray-50 text-gray-700 ring-gray-100";

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

const getStatusTone = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "success";
    case "PENDING":
      return "warn";
    case "REVIEW_URGENTLY":
      return "danger";
    default:
      return "info";
  }
};

const fmtDate = (iso: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "Not set";

const fmtDateTime = (iso: string) =>
  iso
    ? new Date(iso).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
        day: "numeric",
        hour12: true,
      })
    : "Not set";

export default function DailyReportPreviewModal({ open, reportId, onClose }: Props) {
  const [report, setReport] = useState<DailyReportPreviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !reportId) {
      setReport(null);
      setError(null);
      return;
    }

    let cancelled = false;

    async function loadReport() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchWithAuth(`/api/daily-reports/${reportId}`);
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.error || "Failed to load report preview");
        }

        if (!cancelled) {
          setReport(data);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load report preview");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadReport();

    return () => {
      cancelled = true;
    };
  }, [open, reportId]);

  const handleDownloadAttachment = async () => {
    if (!report) {
      toast.info("No report is available to download");
      return;
    }

    try {
      await downloadDailyReport(report, { format: "attachment" });
    } catch (error) {
      console.error("Failed to download report attachment:", error);
      toast.error(error instanceof Error ? error.message : "Failed to download file");
    }
  };

  const handleDownloadPdf = async () => {
    if (!report) {
      toast.info("No report is available to download");
      return;
    }

    try {
      await downloadDailyReport(report, { format: "pdf" });
    } catch (error) {
      console.error("Failed to download report PDF:", error);
      toast.error(error instanceof Error ? error.message : "Failed to download PDF");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-modal="true" role="dialog">
      <div className="flex items-end justify-center min-h-screen px-4 py-10 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-transparent text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <Card className="overflow-hidden">
            <div className="px-6 pt-6 pb-4 border-b border-gray-200/70">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {report ? (
                      <>
                        <Pill tone="info">{report.department}</Pill>
                        <Pill tone={getStatusTone(report.status)}>{report.status}</Pill>
                        <Pill>ID: {report.id}</Pill>
                      </>
                    ) : null}
                  </div>
                  <h3 className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                    {report?.title || "Daily Report Preview"}
                  </h3>
                  {report ? (
                    <p className="text-sm text-gray-500 mt-1">
                      Submitted by {report.submittedBy} on {fmtDate(report.date)}
                    </p>
                  ) : null}
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
              {loading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-24 rounded-2xl bg-gray-100" />
                  <div className="h-24 rounded-2xl bg-gray-100" />
                  <div className="h-24 rounded-2xl bg-gray-100" />
                </div>
              ) : error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 font-semibold">
                  {error}
                </div>
              ) : report ? (
                <>
                  {report.previewNote ? (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                      {report.previewNote}
                    </div>
                  ) : null}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl border border-gray-200/70">
                      <p className="text-xs text-gray-500 mb-1">Submitted At</p>
                      <p className="font-extrabold text-gray-900">{fmtDateTime(report.submittedAt)}</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-gray-200/70">
                      <p className="text-xs text-gray-500 mb-1">File Size</p>
                      <p className="font-extrabold text-gray-900">{report.fileSize}</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-gray-200/70">
                      <p className="text-xs text-gray-500 mb-1">Preview</p>
                      <p className="font-extrabold text-gray-900 capitalize">{report.previewAvailability}</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-gray-200/70">
                      <p className="text-xs text-gray-500 mb-1">Attachment</p>
                      <p className="font-extrabold text-gray-900">{report.attachmentName || "None"}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200/70 p-5">
                    <h4 className="font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Task Entries
                    </h4>
                    {report.entries.length === 0 ? (
                      <p className="text-gray-600">No structured task entries are available for this report.</p>
                    ) : (
                      <div className="space-y-4">
                        {report.entries.map((entry, index) => (
                          <div key={`${entry.taskName}-${index}`} className="rounded-2xl border border-gray-200/70 p-4 bg-gray-50/70">
                            <div className="font-extrabold text-gray-900">
                              {index + 1}. {entry.taskName}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-sm">
                              <div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Objective</div>
                                <div className="text-gray-800 mt-1">{entry.objective || "—"}</div>
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Target</div>
                                <div className="text-gray-800 mt-1">{entry.target || "—"}</div>
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Next Day Task</div>
                                <div className="text-gray-800 mt-1">{entry.nextDayTask || "—"}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </div>

            <div className="px-6 py-4 border-t border-gray-200/70 bg-gray-50 flex flex-wrap justify-between items-center gap-3">
              <div className="text-sm text-gray-600 max-w-xl">
                {report?.attachmentUrl
                  ? "Download the original upload, or a PDF summary of this report (metadata and task entries)."
                  : "Download a PDF summary of this report (metadata and task entries)."}
              </div>
              <div className="flex flex-wrap gap-3 justify-end">
                {report?.attachmentUrl ? (
                  <button
                    type="button"
                    onClick={handleDownloadAttachment}
                    className="px-5 py-3 rounded-2xl font-semibold text-white transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    Download file
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                  style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                  style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                >
                  Close
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
