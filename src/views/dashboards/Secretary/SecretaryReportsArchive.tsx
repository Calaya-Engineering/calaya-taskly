// @ts-nocheck
"use client";

// pages/dashboards/Secretary/SecretaryReportsArchive.jsx
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { SecretaryMenuItems } from "@/utils/menus";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";
import DailyReportPreviewModal from "@/components/DailyReportPreviewModal";
import { downloadDailyReport } from "@/lib/daily-report-download";
/* ---------- UI helpers ---------- */
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
    tone === "danger"
      ? "bg-red-50 text-red-700 ring-red-100"
      : tone === "success"
        ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
        : tone === "warn"
          ? "bg-amber-50 text-amber-800 ring-amber-100"
          : tone === "info"
            ? "bg-blue-50 text-blue-700 ring-blue-100"
            : tone === "purple"
              ? "bg-purple-50 text-purple-700 ring-purple-100"
              : "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white`;

const inputBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";



const getStatusTone = (status) => {
  switch (status) {
    case 'approved': return 'success';
    case 'pending': return 'warn';
    case 'uploaded': return 'info';
    default: return 'default';
  }
};

const getFormatTone = (format) => {
  switch (format) {
    case 'pdf': return 'danger';
    case 'doc':
    case 'docx': return 'info';
    case 'xls':
    case 'xlsx': return 'success';
    default: return 'default';
  }
};

const getFileIcon = (format) => {
  switch (format) {
    case 'pdf': return '📕';
    case 'doc':
    case 'docx': return '📘';
    case 'xls':
    case 'xlsx': return '📗';
    default: return '📎';
  }
};

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" }) : "Not set";

const getMonthName = (monthIndex) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex];
};

export default function SecretaryReportsArchive() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDownloadDate, setSelectedDownloadDate] = useState('');
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [userFilter, setUserFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [previewReportId, setPreviewReportId] = useState<number | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  useEffect(() => {
    async function getReports() {
      try {
        const resp = await fetchWithAuth("/api/daily-reports?limit=500");
        if (resp.ok) {
          const data = await resp.json();
          const mapped = data.map(d => ({
            id: d.id,
            dbId: d.dbId,
            title: d.title,
            date: d.date ? d.date.split('T')[0] : '',
            fullDate: d.date,
            type: 'Daily',
            downloads: d.downloads || 0,
            size: d.fileSize || '—',
            uploadedBy: d.submittedBy,
            department: d.department,
            role: 'Staff', // Default or fetch if needed
            status: (d.status || 'APPROVED').toLowerCase(),
            fileFormat: d.fileUrl ? d.fileUrl.split('.').pop().toLowerCase() : 'json',
            fileUrl: d.fileUrl
          }));
          setReports(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch reports:", err);
      } finally {
        setLoading(false);
      }
    }
    getReports();
  }, []);

  // Get unique departments for filter
  const departments = useMemo(() => ['all', ...new Set(reports.map(r => r.department))], [reports]);

  // Get unique users for filter
  const users = useMemo(() => ['all', ...new Set(reports.map(r => r.uploadedBy))], [reports]);

  // Filter reports to show only daily reports from all users
  const dailyReports = useMemo(() => reports.filter(report => report.type === 'Daily'), [reports]);

  const filteredReports = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return dailyReports.filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(query) ||
        report.date.includes(searchTerm) ||
        report.uploadedBy.toLowerCase().includes(query) ||
        report.department.toLowerCase().includes(query);
      const matchesDate = !dateFilter || report.date === dateFilter;
      const matchesType = typeFilter === 'all' || report.type === typeFilter;
      const matchesMonthYear = new Date(report.date).getMonth() === selectedMonth &&
        new Date(report.date).getFullYear() === selectedYear;
      const matchesUser = userFilter === 'all' || report.uploadedBy === userFilter;
      const matchesDepartment = departmentFilter === 'all' || report.department === departmentFilter;

      return matchesSearch && matchesDate && matchesType && matchesMonthYear && matchesUser && matchesDepartment;
    });
  }, [dailyReports, searchTerm, dateFilter, typeFilter, selectedMonth, selectedYear, userFilter, departmentFilter]);

  // Group reports by date for calendar view and batch download
  const reportsByDate = useMemo(() => {
    return dailyReports.reduce((acc, report) => {
      if (!acc[report.date]) {
        acc[report.date] = [];
      }
      acc[report.date].push(report);
      return acc;
    }, {});
  }, [dailyReports]);

  const stats = useMemo(() => {
    const totalDownloads = dailyReports.reduce((sum, report) => sum + report.downloads, 0);
    const activeReporters = [...new Set(dailyReports.map(r => r.uploadedBy))].length;
    const departmentsCount = [...new Set(dailyReports.map(r => r.department))].length;
    const daysWithReports = Object.keys(reportsByDate).length;
    return { totalDownloads, activeReporters, departmentsCount, daysWithReports };
  }, [dailyReports, reportsByDate]);

  const years = [2025, 2024, 2023, 2022];
  const months = Array.from({ length: 12 }, (_, i) => ({ index: i, name: getMonthName(i) }));

  const handleDownload = async (report) => {
    try {
      await downloadDailyReport(report);
    } catch (error) {
      console.error("Failed to download report:", error);
      toast.error(error instanceof Error ? error.message : "Failed to download report");
    }
  };

  const handlePreview = (report) => {
    if (!report.dbId) {
      toast.info("This report does not have a previewable record.");
      return;
    }
    setPreviewReportId(report.dbId);
    setIsPreviewModalOpen(true);
  };

  // Handle batch download for selected date
  const handleBatchDownload = () => {
    if (!selectedDownloadDate) {
      toast.warning('Please select a date first');
      return;
    }

    const reportsToDownload = reportsByDate[selectedDownloadDate] || [];

    if (reportsToDownload.length === 0) {
      toast.warning(`No reports found for ${selectedDownloadDate}`);
      return;
    }

    // Filter reports by selected format
    const filteredByFormat = downloadFormat === 'all'
      ? reportsToDownload
      : reportsToDownload.filter(r => r.fileFormat === downloadFormat);

    if (filteredByFormat.length === 0) {
      toast.warning(`No ${downloadFormat.toUpperCase()} reports found for ${selectedDownloadDate}`);
      return;
    }

    // Simulate batch download
    toast.warning(`📥 Batch Download Summary:
    
Date: ${selectedDownloadDate}
Format: ${downloadFormat === 'all' ? 'All Formats' : downloadFormat.toUpperCase()}
Reports: ${filteredByFormat.length} of ${reportsToDownload.length} total reports
Users: ${filteredByFormat.map(r => r.uploadedBy).join(', ')}
Departments: ${[...new Set(filteredByFormat.map(r => r.department))].join(', ')}
Total Size: ~${filteredByFormat.reduce((sum, r) => sum + parseFloat(r.size), 0).toFixed(1)} MB

All reports will be downloaded as a ZIP file.`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateFilter('');
    setTypeFilter('all');
    setUserFilter('all');
    setDepartmentFilter('all');
  };

  if (loading) {
    return (
      <Layout menuItems={SecretaryMenuItems} userRole="Secretary">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout menuItems={SecretaryMenuItems} userRole="Secretary">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HERO */}
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
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>📊 Daily Reports Archive</Pill>
                  <Pill tone="info">{dailyReports.length} Reports</Pill>
                  <Pill tone="success">{users.length > 1 ? users.length - 1 : 0} Staff</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Daily Reports Archive
                </h1>
                <p className="text-gray-600 mt-2">View and manage all daily reports submitted by all staff members.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setIsDownloadModalOpen(true)}
                  className={btnSolid}
                  style={{ backgroundColor: "var(--primary-blue)" }}
                >
                  <span className="flex items-center gap-2">
                    <span>⬇️</span> Batch Download
                  </span>
                </button>
                <Link href="/secretary-dashboard/upload-report">
                  <button className={btnSolid} style={{ backgroundColor: "var(--accent-red)" }}>
                    Upload New Report
                  </button>
                </Link>
                <button
                  onClick={clearFilters}
                  className={btnOutline}
                  style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                >
                  Clear Filters
                </button>
                <Link href="/secretary-dashboard">
                  <button className={btnOutline} style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}>
                    Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* ADVANCED FILTERS */}
        <Card className="p-6">
          <SectionTitle
            title="Filter Daily Reports"
            subtitle="Search and filter by multiple criteria"
            action={
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filteredReports.length}</span> of{" "}
                <span className="font-semibold text-gray-800">{dailyReports.length}</span> reports
              </div>
            }
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, user, department..."
                  className={inputBase}
                />
                <span className="absolute left-4 top-3.5 text-gray-400">🔎</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Specific Date</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className={inputBase}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">User</label>
              <select
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All Users</option>
                {users.filter(u => u !== 'all').map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  {months.map(month => (
                    <option key={month.index} value={month.index}>{month.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Reports Found</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {filteredReports.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(44,75,155,0.1)" }}>
                <span style={{ color: "var(--primary-blue)" }} className="text-xl">📄</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Total Downloads</p>
                <p className="text-3xl font-extrabold mt-2 text-emerald-600">{stats.totalDownloads}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(16,185,129,0.1)" }}>
                <span style={{ color: "#10B981" }} className="text-xl">⬇️</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Active Reporters</p>
                <p className="text-3xl font-extrabold mt-2 text-amber-600">{stats.activeReporters}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(245,158,11,0.1)" }}>
                <span style={{ color: "#F59E0B" }} className="text-xl">👥</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Departments</p>
                <p className="text-3xl font-extrabold mt-2 text-purple-600">{stats.departmentsCount}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(139,92,246,0.1)" }}>
                <span style={{ color: "#8B5CF6" }} className="text-xl">🏢</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Days with Reports</p>
                <p className="text-3xl font-extrabold mt-2 text-blue-600">{stats.daysWithReports}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(59,130,246,0.1)" }}>
                <span style={{ color: "#3B82F6" }} className="text-xl">📅</span>
              </div>
            </div>
          </Card>
        </div>

        {/* REPORTS TABLE */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-gray-200/70">
            <SectionTitle title="All Daily Reports from Staff" subtitle={`${filteredReports.length} reports`} />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200/70">
                <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3 text-left">Report Details</th>
                  <th className="px-5 py-3 text-left">User</th>
                  <th className="px-5 py-3 text-left">Department</th>
                  <th className="px-5 py-3 text-left">Date</th>
                  <th className="px-5 py-3 text-left">Format</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/70 text-[13px]">
                {filteredReports.length > 0 ? (
                  filteredReports.map(report => (
                    <tr key={report.id} className="hover:bg-gray-50/70 transition">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
                            style={{ backgroundColor: "rgba(109, 198, 223, 0.1)" }}
                          >
                            {getFileIcon(report.fileFormat)}
                          </div>
                          <div>
                            <p className="font-extrabold text-gray-900">{report.title}</p>
                            <p className="text-[11px] text-gray-500 mt-1">ID: {report.id} • Size: {report.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div>
                          <p className="font-semibold">{report.uploadedBy}</p>
                          <p className="text-[11px] text-gray-500 mt-1">{report.role}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <Pill tone="info">{report.department}</Pill>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div>
                          <p className="font-semibold">{fmtDate(report.date)}</p>
                          <p className="text-[11px] text-gray-500 mt-1">
                            {new Date(report.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <Pill tone={getFormatTone(report.fileFormat)}>{report.fileFormat.toUpperCase()}</Pill>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <Pill tone={getStatusTone(report.status)}>{report.status}</Pill>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDownload(report)}
                            className="px-3 py-1.5 rounded-xl text-[11px] font-semibold text-white active:scale-[0.99] transition"
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            Download
                          </button>
                          <button
                            onClick={() => handlePreview(report)}
                            className="px-3 py-1.5 rounded-xl text-[11px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                            style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                          >
                            Preview
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                      No daily reports found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* CALENDAR VIEW */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <SectionTitle
              title={`Daily Reports Calendar - ${getMonthName(selectedMonth)} ${selectedYear}`}
              subtitle="Click on a date to select for batch download"
            />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs text-gray-600">Has Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-600">Selected</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center font-semibold py-2 text-xs text-gray-500">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }).map((_, index) => {
              const day = index + 1;
              const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const reportsForDay = reportsByDate[dateStr] || [];
              const reportCount = reportsForDay.length;
              const isSelected = selectedDownloadDate === dateStr;

              return (
                <div
                  key={index}
                  className={`p-3 rounded-2xl text-center text-sm cursor-pointer transition-all ${isSelected
                    ? 'bg-blue-500 text-white font-semibold'
                    : reportCount > 0
                      ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                      : 'hover:bg-gray-100 text-gray-600 border border-gray-200/70'
                    }`}
                  onClick={() => setSelectedDownloadDate(dateStr)}
                >
                  <div className="font-semibold">{day}</div>
                  {reportCount > 0 && !isSelected && (
                    <div className="text-xs mt-1 font-medium">{reportCount}</div>
                  )}
                  {isSelected && (
                    <div className="text-xs mt-1 font-medium">{reportCount} report(s)</div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedDownloadDate && (
            <div className="mt-6 p-5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-xl">📅</div>
                <div>
                  <p className="font-extrabold text-blue-900">Selected Date: {selectedDownloadDate}</p>
                  <p className="text-sm text-blue-700 mt-1">
                    {reportsByDate[selectedDownloadDate]?.length || 0} reports available from{' '}
                    {reportsByDate[selectedDownloadDate]?.map(r => r.uploadedBy).join(', ') || 'No reports'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleBatchDownload}
                className={btnSolid}
                style={{ backgroundColor: "var(--accent-red)" }}
              >
                Download All for this Date
              </button>
            </div>
          )}
        </Card>
      </div>

      {/* BATCH DOWNLOAD MODAL */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsDownloadModalOpen(false)}></div>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden border border-gray-200 transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      Batch Download Reports
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Select a date and format to download all daily reports
                    </p>
                  </div>
                  <button
                    onClick={() => setIsDownloadModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">
                      Select Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={selectedDownloadDate}
                      onChange={(e) => setSelectedDownloadDate(e.target.value)}
                      className={inputBase}
                      required
                    />
                    {selectedDownloadDate && reportsByDate[selectedDownloadDate] && (
                      <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                        <span>✓</span> {reportsByDate[selectedDownloadDate].length} reports available
                      </p>
                    )}
                  </div>

                  {/* Format Selection */}
                  <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">
                      Download Format
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'all', label: 'All Formats', icon: '📦', color: 'var(--primary-blue)' },
                        { id: 'pdf', label: 'PDF Only', icon: '📄', color: '#EF4444' },
                        { id: 'docx', label: 'Word Only', icon: '📝', color: '#3B82F6' },
                        { id: 'xlsx', label: 'Excel Only', icon: '📊', color: '#10B981' },
                      ].map((format) => (
                        <button
                          key={format.id}
                          type="button"
                          onClick={() => setDownloadFormat(format.id)}
                          className={`p-4 rounded-2xl border-2 transition-all ${downloadFormat === format.id
                            ? 'bg-white'
                            : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                          style={{
                            borderColor: downloadFormat === format.id ? format.color : '#e5e7eb',
                          }}
                        >
                          <div className="text-2xl mb-2">{format.icon}</div>
                          <div className="font-extrabold text-sm" style={{ color: format.color }}>
                            {format.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  {selectedDownloadDate && reportsByDate[selectedDownloadDate] && (
                    <div className="bg-gray-50 rounded-2xl p-5">
                      <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                        Download Summary
                      </h4>
                      <div className="space-y-2 text-sm">
                        <Row label="Date" value={selectedDownloadDate} />
                        <Row label="Total Reports" value={reportsByDate[selectedDownloadDate].length} />
                        <Row label="Selected Format" value={downloadFormat === 'all' ? 'All Formats' : downloadFormat.toUpperCase()} />
                        <Row
                          label="Reports to Download"
                          value={downloadFormat === 'all'
                            ? reportsByDate[selectedDownloadDate].length
                            : reportsByDate[selectedDownloadDate].filter(r => r.fileFormat === downloadFormat).length}
                        />
                        <Row
                          label="Total Size"
                          value={`~${reportsByDate[selectedDownloadDate]
                            .filter(r => downloadFormat === 'all' || r.fileFormat === downloadFormat)
                            .reduce((sum, r) => sum + parseFloat(r.size), 0).toFixed(1)} MB`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-200/70">
                    <button
                      type="button"
                      onClick={() => setIsDownloadModalOpen(false)}
                      className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleBatchDownload();
                        setIsDownloadModalOpen(false);
                      }}
                      disabled={!selectedDownloadDate}
                      className={`px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition ${!selectedDownloadDate ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      style={{ backgroundColor: "var(--accent-red)" }}
                    >
                      Download Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <DailyReportPreviewModal
        open={isPreviewModalOpen}
        reportId={previewReportId}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setPreviewReportId(null);
        }}
      />
    </Layout>
  );
}

// Helper component for info rows
const Row = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4">
    <span className="text-gray-500 text-sm font-semibold">{label}:</span>
    <span className="font-semibold text-gray-900 text-right text-sm">{value}</span>
  </div>
);
