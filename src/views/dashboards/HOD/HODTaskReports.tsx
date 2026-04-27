"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";
import DailyReportPreviewModal from "@/components/DailyReportPreviewModal";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

interface ReportRow {
  id: string;
  dbId?: number;
  title: string;
  date: string;
  department: string;
  submittedBy: string;
  submittedAt: string;
  status: string;
  fileUrl?: string | null;
  attachmentName?: string | null;
}

const Card = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const Pill = ({ children, tone = "default" }: { children: React.ReactNode; tone?: string }) => {
  const styles =
    tone === "success"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : tone === "warn"
        ? "bg-amber-50 text-amber-800 ring-amber-100"
        : "bg-blue-50 text-blue-700 ring-blue-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

export default function HODTaskReports() {
  const [managedDepartments, setManagedDepartments] = useState<string[]>([]);
  const [reports, setReports] = useState<ReportRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewReportId, setPreviewReportId] = useState<number | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const lastRefreshAtRef = { current: 0 };

  useEffect(() => {
    async function loadMe() {
      try {
        const res = await fetchWithAuth("/api/me");
        if (!res.ok) return;
        const me = await res.json();
        const departments =
          Array.isArray(me?.managedDepartments) && me.managedDepartments.length > 0
            ? me.managedDepartments
            : String(me?.department ?? "").trim()
              ? [String(me.department).trim()]
              : [];
        setManagedDepartments(departments);
      } catch (e) {
        console.error(e);
      }
    }
    loadMe();
  }, []);

  const loadReports = useCallback(async () => {
    if (managedDepartments.length === 0) {
      setReports([]);
      setLoading(false);
      return;
    }
    try {
      const q = encodeURIComponent(managedDepartments.join(","));
      const resp = await fetchWithAuth(`/api/daily-reports?departments=${q}&linkedTask=true&limit=500`);
      if (resp.ok) {
        const data = await resp.json();
        setReports(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [managedDepartments]);

  useEffect(() => {
    void loadReports();
  }, [loadReports]);

  useSSE("/api/realtime/events", (ev) => {
    if (ev.type?.startsWith("document:") || ev.type?.startsWith("task:")) {
      const now = Date.now();
      if (now - lastRefreshAtRef.current < 1500) return;
      lastRefreshAtRef.current = now;
      void loadReports();
    }
  });

  const openPreview = (dbId?: number) => {
    if (!dbId) return;
    setPreviewReportId(dbId);
    setIsPreviewOpen(true);
  };

  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <Pill>Reports</Pill>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-2" style={{ color: "var(--primary-blue)" }}>
                  Task reports
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  File-based reports your staff submitted from <strong>Submit Reports</strong> when linked to a task.
                </p>
              </div>
              <Link
                href="/hod-dashboard/reports"
                className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition text-center"
                style={{ borderColor: "var(--secondary-blue)", color: "var(--primary-blue)" }}
              >
                Open daily reports
              </Link>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-10 w-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
            </div>
          ) : managedDepartments.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No department scope found for your account.</p>
          ) : reports.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No task-linked reports yet. Staff submit these from{" "}
              <span className="font-semibold text-gray-700">Documents &amp; Reports → Submit Reports</span> (task type).
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] font-semibold text-gray-500 uppercase border-b border-gray-200">
                    <th className="py-3 pr-4">Title</th>
                    <th className="py-3 pr-4">Department</th>
                    <th className="py-3 pr-4">Submitted by</th>
                    <th className="py-3 pr-4">Date</th>
                    <th className="py-3 pr-4">Status</th>
                    <th className="py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {reports.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/80">
                      <td className="py-3 pr-4 font-semibold text-gray-900 max-w-[240px] truncate">{r.title}</td>
                      <td className="py-3 pr-4 text-gray-700">{r.department}</td>
                      <td className="py-3 pr-4 text-gray-700">{r.submittedBy}</td>
                      <td className="py-3 pr-4 text-gray-600">{r.date}</td>
                      <td className="py-3 pr-4">
                        <Pill tone={r.status === "APPROVED" ? "success" : "warn"}>{r.status}</Pill>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => openPreview(r.dbId)}
                          className="text-sm font-semibold hover:underline"
                          style={{ color: "var(--primary-blue)" }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      <DailyReportPreviewModal
        open={isPreviewOpen}
        reportId={previewReportId}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewReportId(null);
        }}
      />
    </Layout>
  );
}
