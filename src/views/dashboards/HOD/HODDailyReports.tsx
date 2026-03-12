"use client";

// pages/dashboards/HOD/HODDailyReports.jsx
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from "next/link";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";
import { useSSE } from "@/hooks/useSSE";
/* ---------- Types ---------- */
interface ReportEntry {
  id?: number;
  taskName: string;
  objective?: string;
  target?: string;
  nextDayTask?: string;
}

interface DailyReport {
  id: string;
  dbId?: number;
  date: string;
  department: string;
  submittedBy: string;
  submittedAt: string;
  entries: ReportEntry[];
  fileSize?: string;
  fileType?: string;
  status: string;
  fileUrl?: string | null;
}

const Card = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const SectionTitle = ({ title, subtitle, action }: { title: string; subtitle?: React.ReactNode; action?: React.ReactNode }) => (
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
const textareaBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";

const FieldLabel = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label className="block text-sm font-extrabold text-gray-700 mb-2">
    {children} {required ? <span className="text-red-500">*</span> : null}
  </label>
);

// HOD managed departments
const MANAGED_DEPARTMENTS = ['Technical', 'Workshop', 'HSE'];

// Storage keys
const STORAGE_KEYS = {
  REPORT_ENTRIES: 'hodDailyReport_entries',
  SELECTED_DEPARTMENTS: 'hodDailyReport_departments',
  IS_MODAL_OPEN: 'hodDailyReport_modalOpen'
};

const getSessionItem = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(key);
};

const setSessionItem = (key: string, value: string): void => {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(key, value);
};

const removeSessionItem = (key: string): void => {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(key);
};

const REPORTS_PAGE_SIZE = 30;
const REPORTS_TABLE_VIEWPORT_HEIGHT = 540;
const REPORTS_ROW_HEIGHT = 80;
const REPORTS_OVERSCAN = 8;

const getDepartmentTone = (department) => {
  switch (department) {
    case 'Technical': return 'info';
    case 'HSE': return 'success';
    case 'Workshop': return 'warn';
    default: return 'default';
  }
};

const getStatusTone = (status) => {
  switch (status) {
    case 'APPROVED': return 'success';
    case 'PENDING': return 'warn';
    case 'REJECTED': return 'danger';
    default: return 'default';
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
};

const formatDateTime = (dateTime) => {
  if (!dateTime) return '-';
  const date = new Date(dateTime);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });
};

export default function HODDailyReports() {
  const [isClient, setIsClient] = useState(false);
  const [dailyReports, setDailyReports] = useState<DailyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [viewMode, setViewMode] = useState('list');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState(['Technical']);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableScrollTop, setTableScrollTop] = useState(0);
  const tableViewportRef = useRef<HTMLDivElement>(null);
  const lastRefreshAtRef = useRef(0);

  // Report entries with dynamic rows
  const [reportEntries, setReportEntries] = useState([
    {
      id: Date.now(),
      taskName: '',
      objective: '',
      target: '',
      nextDayTask: ''
    }
  ]);

  const getReports = useCallback(async () => {
    try {
      const departments = encodeURIComponent(MANAGED_DEPARTMENTS.join(','));
      const resp = await fetchWithAuth(`/api/daily-reports?departments=${departments}&limit=500`);
      if (resp.ok) {
        const data = await resp.json();
        setDailyReports(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { getReports(); }, [getReports]);

  // Real-time: re-fetch when documents or tasks change
  useSSE("/api/tasks/events", (ev) => {
    if (ev.type?.startsWith("task:") || ev.type?.startsWith("document:")) {
      const now = Date.now();
      if (now - lastRefreshAtRef.current < 1500) return;
      lastRefreshAtRef.current = now;
      getReports();
    }
  });

  // Load saved form data from sessionStorage on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load saved form data from sessionStorage on mount
  useEffect(() => {
    const savedEntries = getSessionItem(STORAGE_KEYS.REPORT_ENTRIES);
    const savedDepartments = getSessionItem(STORAGE_KEYS.SELECTED_DEPARTMENTS);
    const savedModalState = getSessionItem(STORAGE_KEYS.IS_MODAL_OPEN);

    if (savedEntries) {
      setReportEntries(JSON.parse(savedEntries));
    }

    if (savedDepartments) {
      setSelectedDepartments(JSON.parse(savedDepartments));
    }

    if (savedModalState) {
      setIsModalOpen(JSON.parse(savedModalState));
    }
  }, []);

  // Save form data to sessionStorage whenever it changes and modal is open
  useEffect(() => {
    if (isModalOpen) {
      setSessionItem(STORAGE_KEYS.REPORT_ENTRIES, JSON.stringify(reportEntries));
      setSessionItem(STORAGE_KEYS.SELECTED_DEPARTMENTS, JSON.stringify(selectedDepartments));
      setSessionItem(STORAGE_KEYS.IS_MODAL_OPEN, JSON.stringify(isModalOpen));
    }
  }, [reportEntries, selectedDepartments, isModalOpen]);

  // Filter reports based on HOD managed departments
  const filteredReports = dailyReports.filter(report => {
    if (!MANAGED_DEPARTMENTS.includes(report.department)) return false;
    if (selectedDate && report.date !== selectedDate) return false;
    if (departmentFilter !== 'All' && report.department !== departmentFilter) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / REPORTS_PAGE_SIZE));
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * REPORTS_PAGE_SIZE;
    return filteredReports.slice(start, start + REPORTS_PAGE_SIZE);
  }, [filteredReports, currentPage]);

  const virtualReportsWindow = useMemo(() => {
    const itemCount = paginatedReports.length;
    const visibleCount = Math.ceil(REPORTS_TABLE_VIEWPORT_HEIGHT / REPORTS_ROW_HEIGHT);
    const startIndex = Math.max(0, Math.floor(tableScrollTop / REPORTS_ROW_HEIGHT) - REPORTS_OVERSCAN);
    const endIndex = Math.min(itemCount, startIndex + visibleCount + REPORTS_OVERSCAN * 2);
    return {
      topSpacer: startIndex * REPORTS_ROW_HEIGHT,
      bottomSpacer: Math.max(0, (itemCount - endIndex) * REPORTS_ROW_HEIGHT),
      rows: paginatedReports.slice(startIndex, endIndex),
    };
  }, [paginatedReports, tableScrollTop]);

  useEffect(() => {
    setCurrentPage(1);
    setTableScrollTop(0);
    if (tableViewportRef.current) {
      tableViewportRef.current.scrollTop = 0;
    }
  }, [selectedDate, departmentFilter, dailyReports.length]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const stats = {
    total: filteredReports.length,
    pending: filteredReports.filter(r => r.status === 'PENDING').length,
    approved: filteredReports.filter(r => r.status === 'APPROVED').length,
    rejected: filteredReports.filter(r => r.status === 'REJECTED').length,
  };

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

  // Toggle department selection
  const toggleDepartment = (dept) => {
    setSelectedDepartments(prev => {
      if (prev.includes(dept)) {
        if (prev.length === 1) return prev;
        return prev.filter(d => d !== dept);
      } else {
        return [...prev, dept];
      }
    });
  };

  // Select all departments
  const selectAllDepartments = () => {
    setSelectedDepartments([...MANAGED_DEPARTMENTS]);
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
    setSelectedDepartments(['Technical']);

    removeSessionItem(STORAGE_KEYS.REPORT_ENTRIES);
    removeSessionItem(STORAGE_KEYS.SELECTED_DEPARTMENTS);
  };

  // Handle modal close (X button) - DON'T clear data
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSessionItem(STORAGE_KEYS.IS_MODAL_OPEN, JSON.stringify(false));
  };

  // Handle cancel button - Clear data
  const handleCancel = () => {
    setIsModalOpen(false);
    setSessionItem(STORAGE_KEYS.IS_MODAL_OPEN, JSON.stringify(false));
    resetForm();
  };

  // Handle submit report — posts to the API
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReport = async () => {
    const validEntries = reportEntries.filter(entry => entry.taskName.trim() !== '');
    if (validEntries.length === 0) {
      toast.warning('Please add at least one task entry');
      return;
    }
    if (submitting) return;
    setSubmitting(true);

    try {
      // Submit one report per selected department
      const results = await Promise.all(
        selectedDepartments.map(dept =>
          fetchWithAuth("/api/daily-reports", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              department: dept,
              date: new Date().toISOString().split('T')[0],
              entries: validEntries,
            }),
          })
        )
      );

      const allOk = results.every(r => r.ok);
      if (allOk) {
        toast.success(`Daily report${selectedDepartments.length > 1 ? 's' : ''} submitted for ${selectedDepartments.join(', ')}!`);
        setIsModalOpen(false);
        setSessionItem(STORAGE_KEYS.IS_MODAL_OPEN, JSON.stringify(false));
        resetForm();
        getReports(); // Refresh the list
      } else {
        toast.error('One or more reports failed to submit. Please try again.');
      }
    } catch (err) {
      console.error("Failed to submit report:", err);
      toast.error('Failed to submit report. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
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

  if (loading) {
    return (
      <Layout menuItems={HODMenuItems} userRole="HOD">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
      <div className="space-y-6">
        {/* Hero Header */}
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
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>📊 Daily Reports</Pill>
                  <Pill tone="info">{stats.total} Total</Pill>
                  <Pill tone="warn">{stats.pending} Pending</Pill>
                  <Pill tone="success">{stats.approved} Approved</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Daily Reports
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  View and manage daily reports from your departments.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-600">Managing:</span>
                  {MANAGED_DEPARTMENTS.map(dept => (
                    <Pill key={dept} tone={getDepartmentTone(dept)}>{dept}</Pill>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-2xl text-xl transition ${viewMode === 'list' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    style={{ color: viewMode === 'list' ? 'var(--primary-blue)' : '#6B7280' }}
                  >
                    📋
                  </button>
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`p-3 rounded-2xl text-xl transition ${viewMode === 'calendar' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    style={{ color: viewMode === 'calendar' ? 'var(--primary-blue)' : '#6B7280' }}
                  >
                    📅
                  </button>
                </div>

                <button
                  onClick={() => {
                    const savedEntries = getSessionItem(STORAGE_KEYS.REPORT_ENTRIES);
                    if (savedEntries) {
                      setIsModalOpen(true);
                    } else {
                      resetForm();
                      setIsModalOpen(true);
                    }
                  }}
                  className={btnSolid}
                  style={{ backgroundColor: "var(--accent-red)" }}
                >
                  + Create Daily Report
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Filters & Stats */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Filter */}
            <div>
              <FieldLabel>Select Date</FieldLabel>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={inputBase}
              />
            </div>

            {/* Department Filter */}
            <div>
              <FieldLabel>Department</FieldLabel>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className={inputBase}
              >
                <option value="All">All Departments</option>
                {MANAGED_DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-gray-200/70 p-4 bg-blue-50">
                <p className="text-xs text-gray-600">Total</p>
                <p className="text-2xl font-extrabold mt-1" style={{ color: 'var(--primary-blue)' }}>
                  {stats.total}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200/70 p-4 bg-amber-50">
                <p className="text-xs text-gray-600">Pending</p>
                <p className="text-2xl font-extrabold mt-1" style={{ color: '#F59E0B' }}>
                  {stats.pending}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Date Navigation */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">Quick Navigation</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDate('')}
                className={`px-4 py-2 rounded-2xl text-sm font-semibold border transition ${selectedDate === '' ? 'text-white' : 'text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                style={{
                  backgroundColor: selectedDate === '' ? 'var(--primary-blue)' : undefined,
                  borderColor: selectedDate === '' ? 'transparent' : 'rgba(0,0,0,0.08)',
                }}
              >
                All Dates
              </button>
              <button
                onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                className={`px-4 py-2 rounded-2xl text-sm font-semibold border transition ${selectedDate === new Date().toISOString().split('T')[0] ? 'text-white' : 'text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                style={{
                  backgroundColor: selectedDate === new Date().toISOString().split('T')[0] ? 'var(--secondary-blue)' : undefined,
                  borderColor: selectedDate === new Date().toISOString().split('T')[0] ? 'transparent' : 'rgba(0,0,0,0.08)',
                }}
              >
                Today
              </button>
              <button
                onClick={() => {
                  const yesterday = new Date();
                  yesterday.setDate(yesterday.getDate() - 1);
                  setSelectedDate(yesterday.toISOString().split('T')[0]);
                }}
                className="px-4 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 transition"
                style={{ borderColor: 'rgba(0,0,0,0.08)' }}
              >
                Yesterday
              </button>
            </div>
          </div>
        </Card>

        {/* Reports List/Calendar View */}
        {viewMode === 'list' ? (
          <Card className="overflow-hidden">
            <div
              ref={tableViewportRef}
              onScroll={(e) => setTableScrollTop(e.currentTarget.scrollTop)}
              className="overflow-auto"
              style={{ maxHeight: `${REPORTS_TABLE_VIEWPORT_HEIGHT}px` }}
            >
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200/70">
                  <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Department</th>
                    <th className="px-6 py-4 text-left">Submitted By</th>
                    <th className="px-6 py-4 text-left">Tasks</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">File</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/70 text-[13px]">
                  {virtualReportsWindow.topSpacer > 0 && (
                    <tr aria-hidden="true">
                      <td colSpan={7} style={{ height: `${virtualReportsWindow.topSpacer}px` }} />
                    </tr>
                  )}
                  {virtualReportsWindow.rows.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50/70 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-gray-900">{formatDate(report.date)}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{report.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Pill tone={getDepartmentTone(report.department)}>{report.department}</Pill>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-2xl flex items-center justify-center text-white font-bold "
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            {report.submittedBy.charAt(0)}
                          </div>
                          <div>
                            <div className="text-[13px] font-semibold text-gray-900">{report.submittedBy}</div>
                            <div className="text-[11px] text-gray-500">{formatDateTime(report.submittedAt)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{report.entries.length} tasks</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {report.entries.slice(0, 2).map((e, i) => (
                            <div key={i} className="truncate max-w-xs">• {e.taskName}</div>
                          ))}
                          {report.entries.length > 2 && (
                            <div className="text-gray-400">+{report.entries.length - 2} more</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Pill tone={getStatusTone(report.status)}>{report.status}</Pill>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-[13px] font-semibold text-gray-900">{report.fileSize}</div>
                        <div className="text-[11px] text-gray-500">{report.fileType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white active:scale-[0.99] transition"
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            View
                          </button>
                          <button
                            className="px-3 py-1.5 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                            style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                          >
                            Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {virtualReportsWindow.bottomSpacer > 0 && (
                    <tr aria-hidden="true">
                      <td colSpan={7} style={{ height: `${virtualReportsWindow.bottomSpacer}px` }} />
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredReports.length === 0 && (
              <div className="p-10 text-center">
                <div className="text-4xl mb-3">📊</div>
                <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                  No reports found
                </div>
                <div className="text-sm text-gray-500 mt-1">Try selecting a different date or department.</div>
              </div>
            )}

            {filteredReports.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200/70 flex flex-wrap items-center justify-between gap-3 bg-white">
                <div className="text-xs text-gray-500">
                  Page <span className="font-semibold text-gray-900">{currentPage}</span> of{" "}
                  <span className="font-semibold text-gray-900">{totalPages}</span> ({filteredReports.length} reports)
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage <= 1}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage >= totalPages}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </Card>
        ) : (
          /* Calendar View */
          <Card className="p-6">
            <SectionTitle
              title="Calendar View - December 2024"
              subtitle="Click on a date to filter reports"
            />

            <div className="mt-6">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const dateStr = `2024-12-${day.toString().padStart(2, '0')}`;
                  const dayReports = filteredReports.filter(r => r.date === dateStr);
                  const hasReport = dayReports.length > 0;
                  const isSelected = selectedDate === dateStr;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`p-3 rounded-2xl border-2 transition-all ${isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : hasReport
                          ? 'border-blue-200 hover:border-blue-300 bg-white'
                          : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                        }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className={`text-sm font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                          {day}
                        </span>
                        {hasReport && (
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        )}
                      </div>

                      {hasReport && (
                        <div className="mt-2 space-y-1">
                          {dayReports.slice(0, 2).map((report, idx) => (
                            <div
                              key={idx}
                              className="text-[10px] p-1 rounded truncate text-left"
                              style={{
                                backgroundColor: report.department === 'Technical' ? '#DBEAFE' :
                                  report.department === 'HSE' ? '#D1FAE5' :
                                    report.department === 'Workshop' ? '#FEF3C7' : '#F3E8FF',
                                color: report.department === 'Technical' ? '#1E40AF' :
                                  report.department === 'HSE' ? '#065F46' :
                                    report.department === 'Workshop' ? '#92400E' : '#6B21A8',
                              }}
                            >
                              {report.department} ({report.entries.length})
                            </div>
                          ))}
                          {dayReports.length > 2 && (
                            <div className="text-[10px] text-gray-500 text-left">
                              +{dayReports.length - 2} more
                            </div>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        {/* Department Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MANAGED_DEPARTMENTS.map(dept => {
            const deptReports = filteredReports.filter(r => r.department === dept);
            const pendingCount = deptReports.filter(r => r.status === 'PENDING').length;
            const approvedCount = deptReports.filter(r => r.status === 'APPROVED').length;

            return (
              <Card key={dept} className="p-6 transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-extrabold" style={{ color: "var(--primary-blue)" }}>
                    {dept} Department
                  </h3>
                  <Pill tone={getDepartmentTone(dept)}>{deptReports.length} reports</Pill>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-semibold text-gray-900">
                      {deptReports.filter(r => r.date.startsWith('2024-12')).length}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Pending Approval</span>
                    <Pill tone="warn">{pendingCount}</Pill>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Approved</span>
                    <Pill tone="success">{approvedCount}</Pill>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200/70">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>Completion Rate</span>
                      <span>{deptReports.length ? Math.round((approvedCount / deptReports.length) * 100) : 0}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: deptReports.length ? `${(approvedCount / deptReports.length) * 100}%` : '0%',
                          backgroundColor: "var(--primary-blue)",
                        }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setDepartmentFilter(dept)}
                    className="w-full mt-3 px-4 py-2.5 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 transition active:scale-[0.99]"
                    style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                  >
                    View All {dept} Reports
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Create Daily Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleModalClose}></div>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      Create Daily Report
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Add tasks completed today and plan for next day. You can submit for multiple departments at once.
                    </p>
                    {isClient && getSessionItem(STORAGE_KEYS.REPORT_ENTRIES) && (
                      <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs bg-amber-50 text-amber-800 ring-1 ring-amber-100">
                        ⚡ Draft saved from previous session
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleModalClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none text-2xl"
                  >
                    &times;
                  </button>
                </div>

                {/* Department Selection */}
                <Card className="p-6 mb-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <FieldLabel required>Select Departments</FieldLabel>
                    <button
                      type="button"
                      onClick={selectAllDepartments}
                      className={btnOutline}
                      style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                    >
                      Select All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {MANAGED_DEPARTMENTS.map(dept => (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => toggleDepartment(dept)}
                        className={`px-4 py-2 rounded-2xl text-sm font-semibold border transition ${selectedDepartments.includes(dept)
                          ? 'text-white'
                          : 'text-gray-700 bg-white hover:bg-gray-50'
                          }`}
                        style={{
                          backgroundColor: selectedDepartments.includes(dept) ? 'var(--primary-blue)' : undefined,
                          borderColor: selectedDepartments.includes(dept) ? 'transparent' : 'rgba(0,0,0,0.08)',
                        }}
                      >
                        {dept}
                        {selectedDepartments.includes(dept) && <span className="ml-2">✓</span>}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Selected: {selectedDepartments.length} department(s) • {selectedDepartments.join(', ')}
                  </p>
                </Card>

                {/* Report Date */}
                <Card className="p-6 mb-6 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <FieldLabel>Report Date</FieldLabel>
                      <input
                        type="date"
                        value={new Date().toISOString().split('T')[0]}
                        readOnly
                        className={`${inputBase} bg-gray-100`}
                      />
                    </div>
                    <div>
                      <FieldLabel>Submitted By</FieldLabel>
                      <input
                        type="text"
                        value="HOD"
                        readOnly
                        className={`${inputBase} bg-gray-100`}
                      />
                    </div>
                  </div>
                </Card>

                {/* Tasks Table */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      Task Entries
                    </h4>
                    <button
                      type="button"
                      onClick={addNewRow}
                      className={btnSolid}
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      + Add Row
                    </button>
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded-2xl">
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
                                rows={1}
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
                                rows={1}
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
                                rows={1}
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
                                rows={1}
                              />
                            </td>
                            <td className="px-4 py-3 text-center align-top">
                              <button
                                type="button"
                                onClick={() => removeRow(entry.id)}
                                disabled={reportEntries.length === 1}
                                className={`text-sm font-semibold ${reportEntries.length === 1
                                  ? 'text-gray-300 cursor-not-allowed'
                                  : 'text-red-600 hover:text-red-800'
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
                  <p className="text-xs text-gray-500 mt-2">
                    * At least one task entry is required. Text areas expand automatically as you type.
                  </p>
                </div>

                {/* Additional Options */}
                <Card className="p-6 mb-6 bg-gray-50">
                  <div className="flex flex-wrap items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                      <span className="text-sm text-gray-700">Attach supporting documents</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                      <span className="text-sm text-gray-700">Request urgent review</span>
                    </label>
                  </div>
                </Card>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200/70">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className={btnOutline}
                    style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitReport}
                    disabled={submitting}
                    className={btnSolid}
                    style={{ backgroundColor: "var(--accent-red)", opacity: submitting ? 0.7 : 1 }}
                  >
                    {submitting
                      ? "Submitting..."
                      : `Submit Report${selectedDepartments.length > 1 ? `s (${selectedDepartments.length})` : ''}`
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
