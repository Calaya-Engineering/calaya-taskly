"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
import { fetchWithAuth, readApiData } from "@/lib/api";
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
}

const TASK_REPORTS_LIMIT = 100;
const REFRESH_THROTTLE_MS = 2000;

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

function TableSkeleton() {
  return (
    <div className="overflow-x-auto animate-pulse" aria-hidden>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] font-semibold text-gray-500 uppercase border-b border-gray-200">
            {["Title", "Department", "Submitted by", "Date", "Status", ""].map((h) => (
              <th key={h} className="py-3 pr-4">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {Array.from({ length: 6 }).map((_, i) => (
            <tr key={i}>
              <td className="py-3 pr-4"><div className="h-4 w-40 rounded bg-gray-200" /></td>
              <td className="py-3 pr-4"><div className="h-4 w-24 rounded bg-gray-100" /></td>
              <td className="py-3 pr-4"><div className="h-4 w-28 rounded bg-gray-100" /></td>
              <td className="py-3 pr-4"><div className="h-4 w-20 rounded bg-gray-100" /></td>
              <td className="py-3 pr-4"><div className="h-6 w-16 rounded-full bg-gray-100" /></td>
              <td className="py-3 text-right"><div className="ml-auto h-4 w-10 rounded bg-gray-100" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MDTaskReports() {
  const [reports, setReports] = useState<ReportRow[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [previewReportId, setPreviewReportId] = useState<number | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const lastRefreshAtRef = useRef(0);
  const prefetchedIdsRef = useRef<Set<number>>(new Set());

  const loadReports = useCallback(async (mode: "initial" | "refresh") => {
    if (mode === "initial") setInitialLoad(true);
    else setRefreshing(true);
    try {
      const resp = await fetchWithAuth(`/api/daily-reports?linkedTask=true&limit=${TASK_REPORTS_LIMIT}`);
      if (resp.ok) {
        const data = await readApiData<ReportRow[]>(resp);
        setReports(Array.isArray(data) ? data : []);
      } else {
        setReports([]);
      }
    } catch {
      setReports([]);
    } finally {
      if (mode === "initial") setInitialLoad(false);
      else setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadReports("initial");
  }, [loadReports]);

  useSSE("/api/realtime/events", (ev) => {
    if (
      ev.type?.startsWith("document:") ||
      ev.type?.startsWith("task:") ||
      ev.type?.startsWith("daily-report:")
    ) {
      const now = Date.now();
      if (now - lastRefreshAtRef.current < REFRESH_THROTTLE_MS) return;
      lastRefreshAtRef.current = now;
      void loadReports("refresh");
    }
  });

  const openPreview = (dbId?: number) => {
    if (!dbId) return;
    setPreviewReportId(dbId);
    setIsPreviewOpen(true);
  };

  const prefetchPreview = (dbId?: number) => {
    if (!dbId) return;
    if (prefetchedIdsRef.current.has(dbId)) return;
    prefetchedIdsRef.current.add(dbId);
    void fetchWithAuth(`/api/daily-reports/${dbId}`);
  };

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className={`space-y-6 transition-opacity duration-200 ${refreshing && !initialLoad ? "opacity-80" : "opacity-100"}`}>
        <Card className="overflow-hidden">
          <div className="p-6 md:p-8" style={{ background: "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)" }}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <Pill>Reports</Pill>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-2" style={{ color: "var(--primary-blue)" }}>
                  Task reports
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">File-based reports submitted when staff links report submissions to tasks.</p>
                {refreshing && !initialLoad ? <p className="text-xs text-gray-500 mt-2">Updating list…</p> : null}
              </div>
              <Link href="/md-dashboard/daily-reports" className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition text-center shrink-0" style={{ borderColor: "var(--secondary-blue)", color: "var(--primary-blue)" }}>
                Open daily reports
              </Link>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          {initialLoad ? (
            <TableSkeleton />
          ) : reports.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No task-linked reports yet.</p>
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
                          onMouseEnter={() => prefetchPreview(r.dbId)}
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
