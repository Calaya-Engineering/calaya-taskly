"use client";

// pages/dashboards/MD/MDDailyReports.jsx
import { useMemo, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
const reportsData = [
  { 
    id: "REP-001", 
    date: "2024-12-15", 
    department: "All", 
    title: "Company Daily Report", 
    uploadedBy: "Secretary", 
    size: "4.2 MB", 
    downloads: 45,
    summary: "Daily summary of all company operations, including production metrics, safety incidents, and key achievements.",
    content: "This is a comprehensive daily report covering all departments. It includes production numbers from Technical department, safety statistics from HSE, logistics updates, workshop productivity, and financial summaries. The report indicates overall positive performance with 98% of targets met."
  },
  { 
    id: "REP-002", 
    date: "2024-12-14", 
    department: "Technical", 
    title: "Technical Department Report", 
    uploadedBy: "Technical HOD", 
    size: "2.8 MB", 
    downloads: 32,
    summary: "Technical department daily operations, project progress, and equipment status.",
    content: "The Technical department completed pipeline inspection at Site A with 85% progress. Equipment maintenance schedules are on track. Three minor issues were identified and are being addressed. Team productivity at 92%."
  },
  { 
    id: "REP-003", 
    date: "2024-12-13", 
    department: "HSE", 
    title: "Safety Compliance Report", 
    uploadedBy: "HSE HOD", 
    size: "3.1 MB", 
    downloads: 28,
    summary: "Daily safety metrics, incidents, and compliance status.",
    content: "Zero lost time incidents reported. Safety audits conducted at Site B and Workshop. All compliance requirements met. One near-miss reported and investigated. Safety training completed for 15 staff members."
  },
  { 
    id: "REP-004", 
    date: "2024-12-12", 
    department: "Workshop", 
    title: "Workshop Production Report", 
    uploadedBy: "Workshop HOD", 
    size: "1.9 MB", 
    downloads: 21,
    summary: "Workshop production output, maintenance activities, and resource utilization.",
    content: "Workshop produced 45 units with 98% quality rate. Preventive maintenance completed on 3 major equipment. Resource utilization at 87%. One equipment breakdown reported and repaired."
  },
  { 
    id: "REP-005", 
    date: "2024-12-11", 
    department: "Logistics", 
    title: "Logistics Operations Report", 
    uploadedBy: "Logistics HOD", 
    size: "2.5 MB", 
    downloads: 24,
    summary: "Logistics operations, fleet status, and delivery performance.",
    content: "All deliveries completed on time. Fleet availability at 92%. Fuel consumption within budget. One vehicle under maintenance. Route optimization implemented saving 15% in fuel costs."
  },
  { 
    id: "REP-006", 
    date: "2024-12-10", 
    department: "Accounts", 
    title: "Financial Daily Summary", 
    uploadedBy: "Accounts HOD", 
    size: "5.7 MB", 
    downloads: 18,
    summary: "Daily financial transactions, budget utilization, and forecasts.",
    content: "Daily transactions processed: 156 invoices, 89 payments. Budget utilization at 78% YTD. Cash flow positive. Projections for next quarter show 12% growth."
  },
  { 
    id: "REP-007", 
    date: "2024-12-09", 
    department: "All", 
    title: "Company Daily Report", 
    uploadedBy: "Secretary", 
    size: "4.0 MB", 
    downloads: 42,
    summary: "Consolidated company performance report.",
    content: "All departments reporting normal operations. Overall company performance index at 8.7/10. Highlights: Technical department completed major milestone, HSE reported zero incidents, Accounts processed month-end closing."
  },
  { 
    id: "REP-008", 
    date: "2024-12-08", 
    department: "HR", 
    title: "HR Daily Activities", 
    uploadedBy: "HR HOD", 
    size: "2.1 MB", 
    downloads: 15,
    summary: "HR daily operations, attendance, and recruitment updates.",
    content: "Attendance rate: 94%. Three new candidates interviewed for Technical positions. One resignation processed. Training sessions conducted for 25 employees. Payroll processing completed."
  },
];

/* ---------------- UI helpers ---------------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const SectionTitle = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between gap-3">
    <div>
      <h2 className="text-lg md:text-xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
        {title}
      </h2>
      {subtitle ? <p className="text-sm text-gray-500 mt-1">{subtitle}</p> : null}
    </div>
    {action}
  </div>
);

const Pill = ({ children, tone = "default" }) => {
  const styles =
    tone === "purple"
      ? "bg-purple-50 text-purple-700 ring-purple-100"
      : tone === "info"
      ? "bg-blue-50 text-blue-700 ring-blue-100"
      : tone === "success"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : tone === "warn"
      ? "bg-amber-50 text-amber-800 ring-amber-100"
      : tone === "danger"
      ? "bg-red-50 text-red-700 ring-red-100"
      : "bg-gray-50 text-gray-700 ring-gray-100";

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

const deptTone = (dept) => (dept === "All" ? "purple" : "info");

const fileEmoji = (title) => {
  const t = (title || "").toLowerCase();
  if (t.includes("financial") || t.includes("accounts")) return "💰";
  if (t.includes("safety") || t.includes("hse") || t.includes("compliance")) return "🦺";
  if (t.includes("logistics")) return "🚚";
  if (t.includes("workshop") || t.includes("production")) return "🏭";
  if (t.includes("technical")) return "🛠️";
  if (t.includes("hr")) return "👥";
  return "📄";
};

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
};

const fmtDateTime = (iso) => {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

const fmtWeekday = (iso) => {
  try {
    return new Date(iso).toLocaleDateString("en-US", { weekday: "short" });
  } catch {
    return "";
  }
};

const toISO = (d) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export default function MDDailyReports() {
  const latestDate = useMemo(() => {
    const sorted = [...reportsData].sort((a, b) => (a.date < b.date ? 1 : -1));
    return sorted?.[0]?.date || "";
  }, []);

  const yesterdayOfLatest = useMemo(() => {
    if (!latestDate) return "";
    const d = new Date(latestDate);
    d.setDate(d.getDate() - 1);
    return toISO(d);
  }, [latestDate]);

  const weekStartOfLatest = useMemo(() => {
    if (!latestDate) return "";
    const d = new Date(latestDate);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    return toISO(d);
  }, [latestDate]);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("table");
  
  // Modal states
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  
  // Download options
  const [downloadOptions, setDownloadOptions] = useState({
    dateFrom: "",
    dateTo: "",
    source: "all", // all, hods, individual, secretary
    format: "pdf" // pdf, excel, csv, word
  });

  const departments = useMemo(
    () => ["All", ...new Set(reportsData.map((r) => r.department).filter((d) => d !== "All"))],
    []
  );

  const filteredReports = useMemo(() => {
    return reportsData
      .filter((r) => {
        const matchesDate = !selectedDate || r.date === selectedDate;
        const matchesDept = selectedDepartment === "all" || r.department === selectedDepartment;
        const matchesSearch =
          !search ||
          r.title.toLowerCase().includes(search.toLowerCase()) ||
          r.id.toLowerCase().includes(search.toLowerCase()) ||
          r.uploadedBy.toLowerCase().includes(search.toLowerCase());
        return matchesDate && matchesDept && matchesSearch;
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [selectedDate, selectedDepartment, search]);

  const totals = useMemo(() => {
    const totalReports = filteredReports.length;
    const totalDownloads = filteredReports.reduce((s, r) => s + r.downloads, 0);
    const uniqueDepts = new Set(filteredReports.map((r) => r.department)).size;
    return { totalReports, totalDownloads, uniqueDepts };
  }, [filteredReports]);

  const topDownloaded = useMemo(() => {
    return [...reportsData].sort((a, b) => b.downloads - a.downloads).slice(0, 3);
  }, []);

  const deptCounts = useMemo(() => {
    const map = new Map();
    reportsData.forEach((r) => map.set(r.department, (map.get(r.department) || 0) + 1));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  // Calendar (December 2024)
  const calYear = 2024;
  const calMonthIndex = 11;
  const daysInMonth = new Date(calYear, calMonthIndex + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonthIndex, 1).getDay();
  const calendarCells = useMemo(() => {
    const blanks = Array.from({ length: firstDay }, (_, i) => ({ key: `b-${i}`, day: null }));
    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const iso = `${calYear}-12-${String(day).padStart(2, "0")}`;
      const hasReport = reportsData.some((r) => r.date === iso);
      return { key: iso, day, iso, hasReport };
    });
    return [...blanks, ...days];
  }, [daysInMonth, firstDay]);

  const quickBtnStyle = (active) => ({
    backgroundColor: active ? "var(--primary-blue)" : "#F3F4F6",
    color: active ? "white" : "var(--primary-blue)",
  });

  const handleOpenPreview = (report) => {
    setSelectedReport(report);
    setIsPreviewModalOpen(true);
  };

  const handleOpenDownloadModal = () => {
    setDownloadOptions({
      dateFrom: "",
      dateTo: "",
      source: "all",
      format: "pdf"
    });
    setIsDownloadModalOpen(true);
  };

  const handleDownload = () => {
    // In real app, this would trigger the actual download
    toast.info(`Downloading reports:
      Date Range: ${downloadOptions.dateFrom || 'All'} to ${downloadOptions.dateTo || 'All'}
      Source: ${downloadOptions.source}
      Format: ${downloadOptions.format.toUpperCase()}`);
    setIsDownloadModalOpen(false);
  };

  const handleDownloadReport = (report) => {
    toast.info(`Downloading ${report.title} (${report.id}) in PDF format`);
  };

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="space-y-6">
        {/* Header */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.16) 55%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
                  Daily Reports Archive
                </h1>
                <p className="text-gray-700 mt-2">Access daily reports from all departments (filter, search, download).</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill tone="info">{totals.totalReports} reports</Pill>
                  <Pill tone="success">{totals.totalDownloads} downloads</Pill>
                  <Pill tone="warn">{totals.uniqueDepts} departments</Pill>
                  {selectedDate ? <Pill>{fmtDate(selectedDate)}</Pill> : <Pill>All dates</Pill>}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={handleOpenDownloadModal}
                  className="px-5 py-3 rounded-2xl font-semibold text-white transition active:scale-[0.99]"
                  style={{ backgroundColor: "var(--accent-red)" }}
                >
                  📥 Download Reports
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedDate("");
                    setSelectedDepartment("all");
                    setSearch("");
                  }}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                  style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Select Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:ring-2 focus:ring-blue-500"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept === "All" ? "All" : dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Search by title, ID or uploader..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Quick filters + view mode */}
            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-semibold rounded-xl transition"
                  style={quickBtnStyle(selectedDate === "")}
                  onClick={() => setSelectedDate("")}
                >
                  All Dates
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-semibold rounded-xl transition"
                  style={quickBtnStyle(selectedDate === latestDate)}
                  onClick={() => setSelectedDate(latestDate)}
                  disabled={!latestDate}
                >
                  Latest
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-semibold rounded-xl transition"
                  style={quickBtnStyle(selectedDate === yesterdayOfLatest)}
                  onClick={() => setSelectedDate(yesterdayOfLatest)}
                  disabled={!yesterdayOfLatest}
                >
                  Previous Day
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-semibold rounded-xl transition"
                  style={quickBtnStyle(selectedDate === weekStartOfLatest)}
                  onClick={() => setSelectedDate(weekStartOfLatest)}
                  disabled={!weekStartOfLatest}
                  title="Filters to the start of that week date in the demo dataset"
                >
                  Week Start
                </button>
              </div>

              <div className="flex gap-2">
                {[
                  { id: "table", label: "Table" },
                  { id: "cards", label: "Cards" },
                  { id: "calendar", label: "Calendar" },
                ].map((v) => {
                  const active = viewMode === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setViewMode(v.id)}
                      className={`px-4 py-2 text-sm font-semibold rounded-xl border transition ${
                        active ? "bg-white" : "bg-gray-50 hover:bg-white"
                      }`}
                      style={{
                        borderColor: active ? "rgba(44, 75, 155, 0.35)" : "rgba(0,0,0,0.08)",
                        color: active ? "var(--primary-blue)" : "#6B7280",
                      }}
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        {/* TABLE VIEW */}
        {viewMode === "table" && (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Date", "Report Title", "Department", "Uploaded By", "File Size", "Downloads", "Actions"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReports.length === 0 ? (
                    <tr>
                      <td className="px-6 py-10 text-center text-gray-500" colSpan={7}>
                        No reports match your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                            {fmtWeekday(report.date)}
                          </div>
                          <div className="text-sm text-gray-700">{fmtDate(report.date)}</div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <div
                              className="w-10 h-10 rounded-2xl flex items-center justify-center "
                              style={{ backgroundColor: "rgba(44,75,155,0.10)" }}
                            >
                              <span className="text-lg">{fileEmoji(report.title)}</span>
                            </div>
                            <div className="min-w-0">
                              <button
                                onClick={() => handleOpenPreview(report)}
                                className="text-sm font-semibold text-gray-900 hover:underline text-left"
                              >
                                {report.title}
                              </button>
                              <div className="text-xs text-gray-500">ID: {report.id}</div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <Pill tone={deptTone(report.department)}>{report.department}</Pill>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className="w-8 h-8 rounded-2xl flex items-center justify-center text-white text-sm mr-2 "
                              style={{ backgroundColor: "var(--secondary-blue)" }}
                            >
                              {report.uploadedBy.charAt(0)}
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{report.uploadedBy}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{report.size}</td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">{report.downloads}</span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                          <button
                            type="button"
                            onClick={() => handleDownloadReport(report)}
                            className="px-4 py-2 rounded-2xl text-white mr-2 transition active:scale-[0.99]"
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            Download
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenPreview(report)}
                            className="px-4 py-2 rounded-2xl border bg-white hover:bg-gray-50 transition"
                            style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                          >
                            Preview
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* CARDS VIEW */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredReports.length === 0 ? (
              <Card className="p-10 text-center text-gray-500 md:col-span-2 xl:col-span-3">
                No reports match your filters.
              </Card>
            ) : (
              filteredReports.map((r) => (
                <Card key={r.id} className="p-6 transition">
                  <div className="flex items-start justify-between gap-3">
                    <button
                      onClick={() => handleOpenPreview(r)}
                      className="flex items-start gap-3 min-w-0 text-left flex-1"
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center  shrink-0"
                        style={{ backgroundColor: "rgba(44,75,155,0.10)" }}
                      >
                        <span className="text-xl">{fileEmoji(r.title)}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm text-gray-500">{fmtDate(r.date)}</div>
                        <div className="font-extrabold text-gray-900 truncate hover:underline">{r.title}</div>
                        <div className="text-xs text-gray-500 mt-1">ID: {r.id}</div>
                      </div>
                    </button>
                    <Pill tone={deptTone(r.department)}>{r.department}</Pill>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 rounded-2xl border border-gray-200/70">
                      <div className="text-xs text-gray-500">Uploaded By</div>
                      <div className="font-semibold text-gray-900">{r.uploadedBy}</div>
                    </div>
                    <div className="p-3 rounded-2xl border border-gray-200/70">
                      <div className="text-xs text-gray-500">Size</div>
                      <div className="font-semibold text-gray-900">{r.size}</div>
                    </div>
                    <div className="p-3 rounded-2xl border border-gray-200/70">
                      <div className="text-xs text-gray-500">Downloads</div>
                      <div className="font-semibold text-gray-900">{r.downloads}</div>
                    </div>
                    <div className="p-3 rounded-2xl border border-gray-200/70">
                      <div className="text-xs text-gray-500">Day</div>
                      <div className="font-semibold text-gray-900">{fmtWeekday(r.date)}</div>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleDownloadReport(r)}
                      className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-white transition active:scale-[0.99]"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      Download
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenPreview(r)}
                      className="flex-1 px-4 py-2.5 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                      style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                    >
                      Preview
                    </button>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {/* CALENDAR VIEW */}
        {viewMode === "calendar" && (
          <Card className="p-6">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                Calendar View (Dec {calYear})
              </h2>
              <Pill tone="info">Click a day to filter</Pill>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs font-bold text-gray-500 py-2">
                  {day}
                </div>
              ))}

              {calendarCells.map((c) => {
                if (!c.day) {
                  return <div key={c.key} className="h-14 rounded-2xl bg-transparent" />;
                }

                const active = selectedDate === c.iso;
                return (
                  <button
                    key={c.key}
                    type="button"
                    className={`h-14 rounded-2xl flex flex-col items-center justify-center border transition ${
                      c.hasReport ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-100"
                    } ${active ? "ring-2" : ""}`}
                    style={{ ringColor: active ? "var(--primary-blue)" : "transparent" }}
                    onClick={() => setSelectedDate(c.iso)}
                    title={c.hasReport ? "Has report" : "No report"}
                  >
                    <span className={`font-semibold ${c.hasReport ? "text-blue-700" : "text-gray-700"}`}>{c.day}</span>
                    {c.hasReport ? <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-600" /> : null}
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <div className="mt-6 p-4 rounded-2xl border border-gray-200/70 bg-gray-50">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-gray-900">Filtered by date: {fmtDate(selectedDate)}</div>
                  <button
                    type="button"
                    onClick={() => setSelectedDate("")}
                    className="px-4 py-2 rounded-2xl border bg-white hover:bg-gray-50 transition font-semibold"
                    style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                  >
                    Clear Date
                  </button>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Insights row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Most downloaded */}
          <Card className="p-6">
            <h3 className="font-extrabold mb-4" style={{ color: "var(--primary-blue)" }}>
              Most Downloaded
            </h3>
            <div className="space-y-3">
              {topDownloaded.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition">
                  <button
                    onClick={() => handleOpenPreview(r)}
                    className="min-w-0 text-left flex-1"
                  >
                    <div className="font-semibold text-gray-900 truncate hover:underline">{r.title}</div>
                    <div className="text-xs text-gray-500">{fmtDate(r.date)}</div>
                  </button>
                  <Pill tone="info">{r.downloads} dl</Pill>
                </div>
              ))}
            </div>
          </Card>

          {/* Department activity */}
          <Card className="p-6">
            <h3 className="font-extrabold mb-4" style={{ color: "var(--primary-blue)" }}>
              Department Activity
            </h3>
            <div className="space-y-2">
              {deptCounts.map(([dept, count]) => (
                <div key={dept} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition">
                  <div className="font-semibold text-gray-900">{dept}</div>
                  <Pill tone={deptTone(dept)}>{count} reports</Pill>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick actions */}
          <Card className="p-6">
            <h3 className="font-extrabold mb-4" style={{ color: "var(--primary-blue)" }}>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleOpenDownloadModal}
                className="w-full p-4 rounded-2xl border bg-white hover:bg-gray-50 transition text-left font-semibold"
                style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
              >
                📥 Download Reports
              </button>
              <button
                type="button"
                onClick={() => toast.info("Generating monthly summary (demo)")}
                className="w-full p-4 rounded-2xl border bg-white hover:bg-gray-50 transition text-left font-semibold"
                style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
              >
                📊 Generate Monthly Summary
              </button>
              <button
                type="button"
                onClick={() => toast.info("Email digest flow (demo)")}
                className="w-full p-4 rounded-2xl border bg-white hover:bg-gray-50 transition text-left font-semibold"
                style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
              >
                📨 Email Report Digest
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Download Modal */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={() => setIsDownloadModalOpen(false)}
            ></div>

            <div className="inline-block align-bottom bg-transparent text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <Card className="overflow-hidden">
                {/* Modal Header */}
                <div className="px-6 pt-6 pb-4 border-b border-gray-200/70">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-extrabold" style={{ color: 'var(--primary-blue)' }}>
                        Download Reports
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Select date range, source, and format for downloading reports
                      </p>
                    </div>
                    <button
                      onClick={() => setIsDownloadModalOpen(false)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
                    >
                      <span className="text-2xl">&times;</span>
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  <div className="space-y-6">
                    {/* Date Range Selection */}
                    <div>
                      <label className="block text-sm font-extrabold mb-3" style={{ color: 'var(--primary-blue)' }}>
                        Date Range
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                          <input
                            type="date"
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                            value={downloadOptions.dateFrom}
                            onChange={(e) => setDownloadOptions({...downloadOptions, dateFrom: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                          <input
                            type="date"
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                            value={downloadOptions.dateTo}
                            onChange={(e) => setDownloadOptions({...downloadOptions, dateTo: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setDownloadOptions({
                            ...downloadOptions,
                            dateFrom: latestDate,
                            dateTo: latestDate
                          })}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold border bg-white hover:bg-gray-50 transition"
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const today = new Date();
                            const weekAgo = new Date();
                            weekAgo.setDate(today.getDate() - 7);
                            setDownloadOptions({
                              ...downloadOptions,
                              dateFrom: toISO(weekAgo),
                              dateTo: toISO(today)
                            });
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold border bg-white hover:bg-gray-50 transition"
                        >
                          Last 7 Days
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const today = new Date();
                            const monthAgo = new Date();
                            monthAgo.setMonth(today.getMonth() - 1);
                            setDownloadOptions({
                              ...downloadOptions,
                              dateFrom: toISO(monthAgo),
                              dateTo: toISO(today)
                            });
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold border bg-white hover:bg-gray-50 transition"
                        >
                          Last 30 Days
                        </button>
                      </div>
                    </div>

                    {/* Source Selection */}
                    <div>
                      <label className="block text-sm font-extrabold mb-3" style={{ color: 'var(--primary-blue)' }}>
                        Report Source
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'all', label: 'All Reports', icon: '📊', desc: 'All departments and sources' },
                          { id: 'hods', label: 'HOD Reports', icon: '👔', desc: 'Only from department heads' },
                          { id: 'individual', label: 'Individual', icon: '👤', desc: 'Individual staff reports' },
                          { id: 'secretary', label: 'Secretary', icon: '📋', desc: 'Secretary consolidated reports' },
                        ].map((source) => (
                          <button
                            key={source.id}
                            type="button"
                            onClick={() => setDownloadOptions({...downloadOptions, source: source.id})}
                            className={`p-4 rounded-2xl border text-left transition ${
                              downloadOptions.source === source.id
                                ? 'bg-blue-50 border-blue-200'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{source.icon}</span>
                              <span className="font-extrabold text-sm">{source.label}</span>
                            </div>
                            <p className="text-xs text-gray-500">{source.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Format Selection */}
                    <div>
                      <label className="block text-sm font-extrabold mb-3" style={{ color: 'var(--primary-blue)' }}>
                        Download Format
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { id: 'pdf', label: 'PDF', icon: '📕', desc: 'Document format' },
                          { id: 'excel', label: 'Excel', icon: '📗', desc: 'Spreadsheet' },
                          { id: 'csv', label: 'CSV', icon: '📊', desc: 'Raw data' },
                          { id: 'word', label: 'Word', icon: '📘', desc: 'Editable doc' },
                        ].map((format) => (
                          <button
                            key={format.id}
                            type="button"
                            onClick={() => setDownloadOptions({...downloadOptions, format: format.id})}
                            className={`p-4 rounded-2xl border text-center transition ${
                              downloadOptions.format === format.id
                                ? 'bg-blue-50 border-blue-200'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <span className="text-2xl block mb-2">{format.icon}</span>
                            <span className="font-extrabold text-sm block">{format.label}</span>
                            <span className="text-xs text-gray-500">{format.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-gray-200/70 bg-gray-50 flex justify-end gap-3">
                  <button
                    onClick={() => setIsDownloadModalOpen(false)}
                    className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                    style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)" }}
                  >
                    Download Reports
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Report Preview Modal */}
      {isPreviewModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={() => setIsPreviewModalOpen(false)}
            ></div>

            <div className="inline-block align-bottom bg-transparent text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <Card className="overflow-hidden">
                {/* Modal Header */}
                <div className="px-6 pt-6 pb-4 border-b border-gray-200/70">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Pill tone={deptTone(selectedReport.department)}>{selectedReport.department}</Pill>
                        <Pill tone="info">ID: {selectedReport.id}</Pill>
                      </div>
                      <h3 className="text-2xl font-extrabold" style={{ color: 'var(--primary-blue)' }}>
                        {selectedReport.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Uploaded by {selectedReport.uploadedBy} on {fmtDate(selectedReport.date)}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsPreviewModalOpen(false)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
                    >
                      <span className="text-2xl">&times;</span>
                    </button>
                  </div>
                </div>

                {/* Modal Body - Report Preview */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                  <div className="space-y-6">
                    {/* Report Summary */}
                    <div className="rounded-2xl border border-gray-200/70 p-5 bg-blue-50/30">
                      <h4 className="font-extrabold mb-3" style={{ color: 'var(--primary-blue)' }}>
                        Summary
                      </h4>
                      <p className="text-gray-700">{selectedReport.summary}</p>
                    </div>

                    {/* Report Content */}
                    <div className="rounded-2xl border border-gray-200/70 p-5">
                      <h4 className="font-extrabold mb-3" style={{ color: 'var(--primary-blue)' }}>
                        Report Content
                      </h4>
                      <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                        {selectedReport.content}
                      </p>
                    </div>

                    {/* Report Metadata */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl border border-gray-200/70">
                        <p className="text-xs text-gray-500 mb-1">File Size</p>
                        <p className="font-extrabold text-gray-900">{selectedReport.size}</p>
                      </div>
                      <div className="p-4 rounded-2xl border border-gray-200/70">
                        <p className="text-xs text-gray-500 mb-1">Downloads</p>
                        <p className="font-extrabold text-gray-900">{selectedReport.downloads}</p>
                      </div>
                      <div className="p-4 rounded-2xl border border-gray-200/70">
                        <p className="text-xs text-gray-500 mb-1">Uploaded By</p>
                        <p className="font-extrabold text-gray-900">{selectedReport.uploadedBy}</p>
                      </div>
                      <div className="p-4 rounded-2xl border border-gray-200/70">
                        <p className="text-xs text-gray-500 mb-1">Date</p>
                        <p className="font-extrabold text-gray-900">{fmtDate(selectedReport.date)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-gray-200/70 bg-gray-50 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Report ID:</span> {selectedReport.id}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        handleDownloadReport(selectedReport);
                        setIsPreviewModalOpen(false);
                      }}
                      className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      Download Report
                    </button>
                    <button
                      onClick={() => setIsPreviewModalOpen(false)}
                      className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
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
      )}
    </Layout>
  );
}