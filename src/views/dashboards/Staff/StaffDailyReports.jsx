"use client";

// pages/dashboards/Staff/StaffDailyReports.jsx
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";
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

// Staff's assigned department
const STAFF_DEPARTMENT = 'Technical';
const STAFF_NAME = 'John Doe';

// Storage keys
const STORAGE_KEYS = {
  REPORT_ENTRIES: 'staffDailyReport_entries',
  IS_MODAL_OPEN: 'staffDailyReport_modalOpen'
};



const getStatusTone = (status) => {
  switch (status) {
    case 'APPROVED': return 'success';
    case 'PENDING': return 'warn';
    case 'REJECTED': return 'danger';
    default: return 'default';
  }
};

const getDepartmentTone = (dept) => {
  switch (dept) {
    case 'All Company': return 'purple';
    case 'Technical': return 'info';
    case 'Workshop': return 'warn';
    case 'HSE': return 'success';
    case 'Logistics': return 'purple';
    default: return 'default';
  }
};

const getFileIcon = (type) => {
  switch (type?.toLowerCase()) {
    case 'pdf': return '📕';
    case 'doc':
    case 'docx': return '📘';
    case 'xls':
    case 'xlsx': return '📗';
    default: return '📎';
  }
};

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not set";

const fmtDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    hour12: true
  }) : "Not set";

export default function StaffDailyReports() {
  const router = useRouter();
  const [dailyReports, setDailyReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(true);

  useEffect(() => {
    async function loadDepts() {
      try {
        const res = await fetchWithAuth("/api/departments");
        if (res.ok) {
          const data = await res.json();
          setDepartments(['All Company', ...data.map(d => d.name)]);
        }
      } catch (err) {
        console.error("Failed to load departments:", err);
      } finally {
        setLoadingDepts(false);
      }
    }
    loadDepts();
  }, []);

  useEffect(() => {
    async function getReports() {
      try {
        const resp = await fetchWithAuth("/api/documents?type=Report");
        if (resp.ok) {
          const data = await resp.json();
          const mapped = data.map(d => ({
            id: d.id,
            dbId: d.dbId,
            title: d.title,
            date: d.date ? d.date.split('T')[0] : '',
            department: d.department,
            submittedBy: d.uploadedBy,
            submittedAt: d.date,
            entries: [],
            fileSize: d.size || '—',
            fileType: d.fileUrl ? d.fileUrl.split('.').pop().toUpperCase() : 'PDF',
            status: 'APPROVED',
            downloads: d.downloads || 0,
            fileUrl: d.fileUrl
          }));
          setDailyReports(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch reports:", err);
      } finally {
        setLoading(false);
      }
    }
    getReports();
  }, []);

  // Report entries with dynamic rows
  const [reportEntries, setReportEntries] = useState([
    {
      id: 1,
      taskName: '',
      objective: '',
      target: '',
      nextDayTask: ''
    }
  ]);

  // Load saved form data from sessionStorage on mount
  useEffect(() => {
    const savedEntries = sessionStorage.getItem(STORAGE_KEYS.REPORT_ENTRIES);
    const savedModalState = sessionStorage.getItem(STORAGE_KEYS.IS_MODAL_OPEN);

    if (savedEntries) {
      setReportEntries(JSON.parse(savedEntries));
    }

    if (savedModalState) {
      setIsModalOpen(JSON.parse(savedModalState));
    }
  }, []);

  // Save form data to sessionStorage whenever it changes and modal is open
  useEffect(() => {
    if (isModalOpen) {
      sessionStorage.setItem(STORAGE_KEYS.REPORT_ENTRIES, JSON.stringify(reportEntries));
      sessionStorage.setItem(STORAGE_KEYS.IS_MODAL_OPEN, JSON.stringify(isModalOpen));
    }
  }, [reportEntries, isModalOpen]);

  const filteredReports = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return dailyReports.filter(report => {
      // Date filtering
      const reportDate = new Date(report.date);
      const today = new Date();
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      const monthAgo = new Date(today);
      monthAgo.setDate(monthAgo.getDate() - 30);

      if (dateFilter === 'thisWeek' && reportDate < weekAgo) return false;
      if (dateFilter === 'thisMonth' && reportDate < monthAgo) return false;
      if (dateFilter === 'lastMonth') {
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        if (reportDate < lastMonthStart || reportDate > lastMonthEnd) return false;
      }

      // Department filtering
      if (departmentFilter !== 'all') {
        if (departmentFilter === 'company' && report.department !== 'All Company') return false;
        if (departmentFilter !== 'company' && report.department !== departmentFilter) return false;
      }

      // Search filtering
      if (query) {
        const matchesTitle = report.title?.toLowerCase().includes(query);
        const matchesTask = report.entries?.some(entry =>
          entry.taskName.toLowerCase().includes(query) ||
          entry.objective.toLowerCase().includes(query)
        );
        const matchesId = report.id.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTask && !matchesId) return false;
      }

      return true;
    });
  }, [dailyReports, dateFilter, departmentFilter, searchTerm]);

  const stats = useMemo(() => {
    const total = dailyReports.length;
    const yourReports = dailyReports.filter(r => r.submittedBy === STAFF_NAME).length;
    const pending = dailyReports.filter(r => r.submittedBy === STAFF_NAME && r.status === 'PENDING').length;
    const approved = dailyReports.filter(r => r.submittedBy === STAFF_NAME && r.status === 'APPROVED').length;
    return { total, yourReports, pending, approved };
  }, [dailyReports]);

  // Add new row to report entries
  const addNewRow = () => {
    const newEntry = {
      id: Date.now(),
      taskName: '',
      objective: '',
      target: '',
      nextDayTask: ''
    };
    setReportEntries([...reportEntries, newEntry]);
  };

  // Remove row from report entries
  const removeRow = (id) => {
    if (reportEntries.length > 1) {
      setReportEntries(reportEntries.filter(entry => entry.id !== id));
    }
  };

  // Update report entry field
  const updateEntry = (id, field, value) => {
    setReportEntries(reportEntries.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  // Reset form and clear storage
  const resetForm = () => {
    const defaultEntries = [{
      id: Date.now(),
      taskName: '',
      objective: '',
      target: '',
      nextDayTask: ''
    }];

    setReportEntries(defaultEntries);
    sessionStorage.removeItem(STORAGE_KEYS.REPORT_ENTRIES);
  };

  // Handle modal close (X button) - DON'T clear data
  const handleModalClose = () => {
    setIsModalOpen(false);
    sessionStorage.setItem(STORAGE_KEYS.IS_MODAL_OPEN, JSON.stringify(false));
  };

  // Handle cancel button - Clear data
  const handleCancel = () => {
    setIsModalOpen(false);
    sessionStorage.setItem(STORAGE_KEYS.IS_MODAL_OPEN, JSON.stringify(false));
    resetForm();
  };

  // Handle submit report
  const handleSubmitReport = () => {
    // Validate at least one entry has task name
    const hasValidEntry = reportEntries.some(entry => entry.taskName.trim() !== '');
    if (!hasValidEntry) {
      toast.warning('Please add at least one task entry');
      return;
    }

    // Create new report
    const newReport = {
      id: `DR-${new Date().toISOString().split('T')[0]}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      title: `${STAFF_DEPARTMENT} Department Daily Report`,
      department: STAFF_DEPARTMENT,
      submittedBy: STAFF_NAME,
      submittedAt: new Date().toISOString(),
      entries: reportEntries.filter(entry => entry.taskName.trim() !== ''),
      fileSize: '0.5 MB',
      fileType: 'PDF',
      status: 'PENDING',
      downloads: 0
    };

    setDailyReports([newReport, ...dailyReports]);
    setIsModalOpen(false);
    sessionStorage.setItem(STORAGE_KEYS.IS_MODAL_OPEN, JSON.stringify(false));
    resetForm();
    toast.success('Daily report submitted successfully!');
  };

  // Auto-resize textarea
  const handleTextareaResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  // Initialize textarea heights on mount and when entries change
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        });
      }, 0);
    }
  }, [isModalOpen, reportEntries]);

  const handleDownload = (report) => {
    toast.info(`Downloading ${report.title} (${report.fileSize})`);
  };

  const clearFilters = () => {
    setDateFilter('all');
    setDepartmentFilter('all');
    setSearchTerm('');
  };



  if (loading) {
    return (
      <Layout menuItems={StaffMenuItems} userRole="Staff">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout menuItems={StaffMenuItems} userRole="Staff">
      <div className="space-y-6">
        {/* Hero Section */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Pill>Daily Reports</Pill>
                  <Pill tone="info">{stats.total} Total</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Daily Reports
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Access and download daily reports, or submit your own daily report
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm text-gray-500">Your Department:</span>
                  <Pill tone={getDepartmentTone(STAFF_DEPARTMENT)}>{STAFF_DEPARTMENT}</Pill>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const savedEntries = sessionStorage.getItem(STORAGE_KEYS.REPORT_ENTRIES);
                    if (savedEntries) {
                      setIsModalOpen(true);
                    } else {
                      resetForm();
                      setIsModalOpen(true);
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                  style={{ backgroundColor: "var(--accent-red)" }}
                >
                  + Submit Daily Report
                </button>
                <button
                  onClick={clearFilters}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <Card className="p-6">
          <SectionTitle
            title="Filters"
            subtitle="Filter reports by date, department, and search"
            action={
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filteredReports.length}</span> of{" "}
                <span className="font-semibold text-gray-800">{dailyReports.length}</span> reports
              </div>
            }
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date Range</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="thisWeek">This Week</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="company">Company Reports</option>
                {departments.filter(d => d !== 'All Company').map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Search by title, task, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
              </div>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setDepartmentFilter(STAFF_DEPARTMENT)}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
            >
              📋 My Department Only
            </button>
            <button
              onClick={() => setDepartmentFilter('company')}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-purple-50 text-purple-700 hover:bg-purple-100 transition"
            >
              🏢 Company Reports
            </button>
            <button
              onClick={clearFilters}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 transition"
            >
              🔄 Clear All
            </button>
          </div>
        </Card>

        {/* Reports Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200/70">
                <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3 text-left">Report Details</th>
                  <th className="px-5 py-3 text-left">Date</th>
                  <th className="px-5 py-3 text-left">Department</th>
                  <th className="px-5 py-3 text-left">Submitted By</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/70 text-[13px]">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50/70 transition">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0"
                          style={{ backgroundColor: "rgba(109, 198, 223, 0.1)" }}
                        >
                          {getFileIcon(report.fileType)}
                        </div>
                        <div>
                          <div className="font-extrabold text-gray-900">
                            {report.title}
                          </div>
                          <div className="text-[11px] text-gray-500 mt-1">
                            {report.entries?.length || 0} task(s) • {report.fileSize}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-1">ID: {report.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-semibold">{fmtDate(report.date)}</div>
                        <div className="text-[11px] text-gray-500">
                          {new Date(report.date).toLocaleDateString('en-US', { weekday: 'long' })}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <Pill tone={getDepartmentTone(report.department)}>{report.department}</Pill>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-semibold">{report.submittedBy}</div>
                        <div className="text-[11px] text-gray-500">{fmtDateTime(report.submittedAt)}</div>
                      </div>
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
                          className="px-3 py-1.5 rounded-xl text-[11px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                          style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                        >
                          Preview
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReports.length === 0 && (
            <div className="p-10 text-center">
              <div className="text-4xl mb-3">📊</div>
              <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                No reports found
              </div>
              <div className="text-sm text-gray-500 mt-1">Try adjusting your filters or submit a new report</div>
            </div>
          )}
        </Card>

        {/* Calendar View */}
        <Card className="p-6">
          <SectionTitle title="Report Calendar" subtitle="Overview of reports by date" />

          <div className="mt-6 grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date(2024, 11, i - 2);
              const dateStr = date.toISOString().split('T')[0];
              const hasReport = dailyReports.some(r => r.date === dateStr);
              const isStaffReport = dailyReports.some(r => r.date === dateStr && r.submittedBy === STAFF_NAME);

              return (
                <div
                  key={i}
                  className={`relative p-3 text-center rounded-2xl border ${isStaffReport ? 'bg-emerald-50 border-emerald-200' :
                    hasReport ? 'bg-blue-50 border-blue-200' : 'border-gray-200/70'
                    }`}
                >
                  <div className={`font-semibold text-sm ${isStaffReport ? 'text-emerald-700' :
                    hasReport ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                    {date.getDate()}
                  </div>
                  {isStaffReport ? (
                    <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-500"></div>
                  ) : hasReport ? (
                    <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-blue-500"></div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-600">Report available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-gray-600">Your report</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-xs text-gray-600">No report</span>
            </div>
          </div>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Total Reports</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(44,75,155,0.1)" }}>
                <span style={{ color: "var(--primary-blue)" }} className="text-xl">📊</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Your Reports</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#10B981" }}>
                  {stats.yourReports}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(16,185,129,0.1)" }}>
                <span style={{ color: "#10B981" }} className="text-xl">📋</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Pending Approval</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#F59E0B" }}>
                  {stats.pending}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(245,158,11,0.1)" }}>
                <span style={{ color: "#F59E0B" }} className="text-xl">⏳</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Approved</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#10B981" }}>
                  {stats.approved}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(16,185,129,0.1)" }}>
                <span style={{ color: "#10B981" }} className="text-xl">✅</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Submit Daily Report Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleModalClose}></div>

              <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden border border-gray-200 transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full">
                <div className="bg-white px-6 pt-6 pb-4 sm:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Submit Daily Report
                      </h3>
                      <p className="text-gray-600 mt-2">
                        Report your completed tasks and plan for tomorrow
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Pill tone={getDepartmentTone(STAFF_DEPARTMENT)}>{STAFF_DEPARTMENT} Department</Pill>
                        <span className="text-sm text-gray-500">• {STAFF_NAME}</span>
                      </div>
                      {sessionStorage.getItem(STORAGE_KEYS.REPORT_ENTRIES) && (
                        <div className="mt-2 inline-flex items-center px-3 py-1.5 bg-amber-50 text-amber-800 rounded-xl text-xs ring-1 ring-amber-200">
                          ⚡ Draft saved from previous session
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleModalClose}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
                    >
                      <span className="text-2xl">&times;</span>
                    </button>
                  </div>

                  {/* Report Info */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Report Date
                        </label>
                        <input
                          type="date"
                          value={new Date().toISOString().split('T')[0]}
                          readOnly
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-100 text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Department
                        </label>
                        <input
                          type="text"
                          value={STAFF_DEPARTMENT}
                          readOnly
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-100 text-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tasks Table */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Task Entries
                      </h4>
                      <button
                        type="button"
                        onClick={addNewRow}
                        className="px-4 py-2.5 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        + Add Row
                      </button>
                    </div>

                    <div className="overflow-x-auto border border-gray-200/70 rounded-2xl">
                      <table className="min-w-full">
                        <thead className="bg-gray-50 border-b border-gray-200/70">
                          <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            <th className="px-4 py-3 text-left w-16">S/N</th>
                            <th className="px-4 py-3 text-left">Name of Task</th>
                            <th className="px-4 py-3 text-left">Objective/Mission</th>
                            <th className="px-4 py-3 text-left">Target</th>
                            <th className="px-4 py-3 text-left">Next Day Task</th>
                            <th className="px-4 py-3 text-center w-20">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/70">
                          {reportEntries.map((entry, index) => (
                            <tr key={entry.id} className="hover:bg-gray-50/70">
                              <td className="px-4 py-3 text-sm text-gray-600 align-top">{index + 1}</td>
                              <td className="px-4 py-3">
                                <textarea
                                  value={entry.taskName}
                                  onChange={(e) => {
                                    updateEntry(entry.id, 'taskName', e.target.value);
                                    handleTextareaResize(e);
                                  }}
                                  onInput={handleTextareaResize}
                                  placeholder="e.g., Pipeline Inspection"
                                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm resize-none overflow-hidden"
                                  rows="1"
                                  style={{ minHeight: '38px' }}
                                />
                              </td>
                              <td className="px-4 py-3">
                                <textarea
                                  value={entry.objective}
                                  onChange={(e) => {
                                    updateEntry(entry.id, 'objective', e.target.value);
                                    handleTextareaResize(e);
                                  }}
                                  onInput={handleTextareaResize}
                                  placeholder="What needs to be achieved"
                                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm resize-none overflow-hidden"
                                  rows="1"
                                  style={{ minHeight: '38px' }}
                                />
                              </td>
                              <td className="px-4 py-3">
                                <textarea
                                  value={entry.target}
                                  onChange={(e) => {
                                    updateEntry(entry.id, 'target', e.target.value);
                                    handleTextareaResize(e);
                                  }}
                                  onInput={handleTextareaResize}
                                  placeholder="Specific target/metric"
                                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm resize-none overflow-hidden"
                                  rows="1"
                                  style={{ minHeight: '38px' }}
                                />
                              </td>
                              <td className="px-4 py-3">
                                <textarea
                                  value={entry.nextDayTask}
                                  onChange={(e) => {
                                    updateEntry(entry.id, 'nextDayTask', e.target.value);
                                    handleTextareaResize(e);
                                  }}
                                  onInput={handleTextareaResize}
                                  placeholder="Tasks for tomorrow"
                                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm resize-none overflow-hidden"
                                  rows="1"
                                  style={{ minHeight: '38px' }}
                                />
                              </td>
                              <td className="px-4 py-3 text-center align-top">
                                <button
                                  type="button"
                                  onClick={() => removeRow(entry.id)}
                                  disabled={reportEntries.length === 1}
                                  className={`text-sm font-semibold px-3 py-1.5 rounded-xl transition ${reportEntries.length === 1
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-red-600 hover:bg-red-50'
                                    }`}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      * At least one task entry is required. Text areas expand automatically as you type.
                    </p>
                  </div>

                  {/* Additional Options */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <div className="flex flex-wrap items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">Attach supporting documents</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">Request urgent review</span>
                      </label>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-200/70">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitReport}
                      className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                      style={{ backgroundColor: "var(--accent-red)" }}
                    >
                      Submit Daily Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}