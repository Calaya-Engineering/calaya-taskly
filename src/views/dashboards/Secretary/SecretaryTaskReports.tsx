"use client";

// pages/dashboards/Secretary/SecretaryTaskReports.jsx
import { useMemo, useState } from "react";
import { toast } from "@/lib/toast";
import Link from "next/link";
import Layout from "@/components/Layout";
import { SecretaryMenuItems } from "@/utils/menus";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";
/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const SectionTitle = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between gap-3">
    <div>
      <h2 className="text-lg md:text-xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
        {renderNodeWithIcons(title)}
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
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white`;

const inputBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";

const taskReportsData = [
  { 
    id: 1, 
    taskId: 'TASK-2024-00123', 
    taskTitle: 'Pipeline Inspection - Site A',
    submittedBy: 'John Doe',
    department: 'Technical',
    submittedDate: '2024-12-12',
    status: 'Approved',
    fileSize: '2.4 MB',
    fileName: 'pipeline_inspection_report.pdf',
    downloadCount: 8,
    notes: 'Completed all scheduled inspections. No issues found.'
  },
  { 
    id: 2, 
    taskId: 'TASK-2024-00124', 
    taskTitle: 'Equipment Maintenance - Workshop',
    submittedBy: 'Sarah Smith',
    department: 'Workshop',
    submittedDate: '2024-12-11',
    status: 'Pending Review',
    fileSize: '3.1 MB',
    fileName: 'equipment_maintenance_log.xlsx',
    downloadCount: 5,
    notes: 'Regular maintenance completed. Replaced worn parts.'
  },
  { 
    id: 3, 
    taskId: 'TASK-2024-00125', 
    taskTitle: 'Material Delivery - Logistics',
    submittedBy: 'Mike Johnson',
    department: 'Logistics',
    submittedDate: '2024-12-10',
    status: 'Approved',
    fileSize: '1.8 MB',
    fileName: 'delivery_confirmation.pdf',
    downloadCount: 12,
    notes: 'All materials delivered on time and accounted for.'
  },
  { 
    id: 4, 
    taskId: 'TASK-2024-00126', 
    taskTitle: 'Safety Audit - Site B',
    submittedBy: 'Lisa Wang',
    department: 'HSE',
    submittedDate: '2024-12-09',
    status: 'Submitted',
    fileSize: '4.2 MB',
    fileName: 'safety_audit_report.docx',
    downloadCount: 6,
    notes: 'Safety standards maintained. Minor observations noted.'
  },
  { 
    id: 5, 
    taskId: 'TASK-2024-00127', 
    taskTitle: 'Software Update - IT Systems',
    submittedBy: 'David Brown',
    department: 'Technical',
    submittedDate: '2024-12-08',
    status: 'Approved',
    fileSize: '5.6 MB',
    fileName: 'system_update_report.pdf',
    downloadCount: 9,
    notes: 'All systems updated successfully. No downtime reported.'
  },
  { 
    id: 6, 
    taskId: 'TASK-2024-00128', 
    taskTitle: 'Training Session - HSE',
    submittedBy: 'Emma Wilson',
    department: 'HSE',
    submittedDate: '2024-12-07',
    status: 'Rejected',
    fileSize: '2.9 MB',
    fileName: 'training_attendance.xlsx',
    downloadCount: 3,
    notes: 'Incomplete attendance records. Please resubmit with corrections.'
  },
  { 
    id: 7, 
    taskId: 'TASK-2024-00129', 
    taskTitle: 'Procurement - Office Supplies',
    submittedBy: 'Robert Chen',
    department: 'Procurement',
    submittedDate: '2024-12-06',
    status: 'Approved',
    fileSize: '1.2 MB',
    fileName: 'procurement_summary.pdf',
    downloadCount: 7,
    notes: 'All supplies ordered and delivery scheduled.'
  },
  { 
    id: 8, 
    taskId: 'TASK-2024-00130', 
    taskTitle: 'Client Meeting Minutes',
    submittedBy: 'Anna Garcia',
    department: 'BDD',
    submittedDate: '2024-12-05',
    status: 'Submitted',
    fileSize: '3.4 MB',
    fileName: 'client_meeting_minutes.docx',
    downloadCount: 4,
    notes: 'Meeting with ABC Corp. Follow-up actions assigned.'
  },
  { 
    id: 9, 
    taskId: 'TASK-2024-00131', 
    taskTitle: 'Quality Check - Production',
    submittedBy: 'Thomas Lee',
    department: 'QHSE',
    submittedDate: '2024-12-04',
    status: 'Approved',
    fileSize: '2.1 MB',
    fileName: 'quality_check_report.pdf',
    downloadCount: 10,
    notes: 'All quality parameters met. Production cleared.'
  },
  { 
    id: 10, 
    taskId: 'TASK-2024-00132', 
    taskTitle: 'Budget Review - Q4',
    submittedBy: 'Maria Rodriguez',
    department: 'Accounts',
    submittedDate: '2024-12-03',
    status: 'Pending Review',
    fileSize: '6.8 MB',
    fileName: 'q4_budget_review.xlsx',
    downloadCount: 2,
    notes: 'Quarterly budget review completed. Variance analysis included.'
  },
];

const statusTone = (status) => {
  switch(status) {
    case 'Approved': return 'success';
    case 'Pending Review': return 'warn';
    case 'Submitted': return 'info';
    case 'Rejected': return 'danger';
    default: return 'default';
  }
};

const getFileIcon = (fileName) => {
  const ext = fileName?.split('.').pop().toLowerCase();
  switch(ext) {
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

export default function SecretaryTaskReports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const departments = useMemo(() => [...new Set(taskReportsData.map(r => r.department))], []);
  const statuses = ['Submitted', 'Pending Review', 'Approved', 'Rejected'];

  const filteredReports = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return taskReportsData.filter(report => {
      const matchesSearch = 
        report.taskId.toLowerCase().includes(query) ||
        report.taskTitle.toLowerCase().includes(query) ||
        report.submittedBy.toLowerCase().includes(query) ||
        report.department.toLowerCase().includes(query);
      
      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
      const matchesDepartment = departmentFilter === 'all' || report.department === departmentFilter;
      const matchesDate = (!dateRange.start || report.submittedDate >= dateRange.start) &&
                        (!dateRange.end || report.submittedDate <= dateRange.end);
      
      return matchesSearch && matchesStatus && matchesDepartment && matchesDate;
    });
  }, [searchTerm, statusFilter, departmentFilter, dateRange]);

  const stats = useMemo(() => {
    const total = taskReportsData.length;
    const approved = taskReportsData.filter(r => r.status === 'Approved').length;
    const pending = taskReportsData.filter(r => r.status === 'Pending Review').length;
    const submitted = taskReportsData.filter(r => r.status === 'Submitted').length;
    const rejected = taskReportsData.filter(r => r.status === 'Rejected').length;
    return { total, approved, pending, submitted, rejected };
  }, []);

  const handleDownload = (report) => {
    toast.success(`Downloading: ${report.fileName}\nTask: ${report.taskTitle}\nSubmitted by: ${report.submittedBy}`);
  };

  const handleViewDetails = (report) => {
    const details = `
📋 TASK REPORT DETAILS

Task ID: ${report.taskId}
Task Title: ${report.taskTitle}
Department: ${report.department}
Submitted By: ${report.submittedBy}
Date: ${fmtDate(report.submittedDate)}
Status: ${report.status}

File: ${report.fileName}
Size: ${report.fileSize}
Downloads: ${report.downloadCount}

Notes:
${report.notes}

Secretary Actions:
• Monitor download statistics
• Archive reports quarterly
• Generate department summaries
• Notify HOD of pending reviews
    `;
    toast.info(details);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDepartmentFilter('all');
    setDateRange({ start: '', end: '' });
  };

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
                  <Pill>📋 Task Reports Archive</Pill>
                  <Pill tone="info">{stats.total} Total</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Task Reports Archive
                </h1>
                <p className="text-gray-600 mt-2">View and manage all task reports submitted by staff.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={clearFilters}
                  className={btnOutline}
                  style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => toast.info('Exporting summary...')}
                  className={btnSolid}
                  style={{ backgroundColor: "var(--secondary-blue)" }}
                >
                  Export Summary
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

        {/* FILTERS */}
        <Card className="p-6">
          <SectionTitle
            title="Filters"
            subtitle="Search and filter task reports"
            action={
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filteredReports.length}</span> of{" "}
                <span className="font-semibold text-gray-800">{stats.total}</span> reports
              </div>
            }
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by ID, title, staff..."
                  className={inputBase}
                />
                <span className="absolute left-4 top-3.5 text-gray-400">🔎</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
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
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">From</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className={inputBase}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">To</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className={inputBase}
                />
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
                <span style={{ color: "var(--primary-blue)" }} className="text-xl">📋</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Approved</p>
                <p className="text-3xl font-extrabold mt-2 text-emerald-600">{stats.approved}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(16,185,129,0.1)" }}>
                <span style={{ color: "#10B981" }} className="text-xl">✅</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Pending Review</p>
                <p className="text-3xl font-extrabold mt-2 text-amber-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(245,158,11,0.1)" }}>
                <span style={{ color: "#F59E0B" }} className="text-xl">⏳</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Submitted</p>
                <p className="text-3xl font-extrabold mt-2 text-blue-600">{stats.submitted}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(59,130,246,0.1)" }}>
                <span style={{ color: "#3B82F6" }} className="text-xl">📤</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Rejected</p>
                <p className="text-3xl font-extrabold mt-2 text-red-600">{stats.rejected}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(239,68,68,0.1)" }}>
                <span style={{ color: "#EF4444" }} className="text-xl">❌</span>
              </div>
            </div>
          </Card>
        </div>

        {/* REPORTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReports.length > 0 ? (
            filteredReports.map(report => (
              <Card key={report.id} className="p-6 transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        {report.taskId}
                      </span>
                      <Pill tone={statusTone(report.status)}>{report.status}</Pill>
                    </div>
                    <h3 className="text-lg font-extrabold text-gray-900 mb-2">{report.taskTitle}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <span className="text-gray-400">👤</span> {report.submittedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-gray-400">🏢</span> {report.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-gray-400">📅</span> {fmtDate(report.submittedDate)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">📥 {report.downloadCount}</div>
                    <div className="text-xs text-gray-400 mt-1">{report.fileSize}</div>
                  </div>
                </div>

                <div className="mb-4 p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
                  <p className="text-sm text-gray-700 line-clamp-2">{report.notes}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-lg">{getFileIcon(report.fileName)}</span>
                    <span className="text-xs truncate max-w-[150px]">{report.fileName}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(report)}
                      className="px-4 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleDownload(report)}
                      className="px-4 py-2 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition flex items-center gap-1"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      <span>⬇️</span> Download
                    </button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="col-span-2 p-12 text-center">
              <div
                className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}
              >
                <span className="text-2xl" style={{ color: "var(--secondary-blue)" }}>📄</span>
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">No Task Reports Found</h3>
              <p className="text-gray-600">No reports match your current filters. Try adjusting your search criteria.</p>
            </Card>
          )}
        </div>

        {/* DEPARTMENT SUMMARY */}
        <Card className="p-6">
          <SectionTitle title="Department Report Summary" subtitle="Overview by department" />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {departments.map(dept => {
              const deptReports = taskReportsData.filter(r => r.department === dept);
              const approved = deptReports.filter(r => r.status === 'Approved').length;
              const pending = deptReports.filter(r => r.status === 'Pending Review' || r.status === 'Submitted').length;
              const rejected = deptReports.filter(r => r.status === 'Rejected').length;
              
              return (
                <div key={dept} className="p-4 rounded-2xl border border-gray-200/70 transition">
                  <h3 className="font-extrabold text-sm text-gray-900 mb-3">{dept}</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total:</span>
                      <span className="font-extrabold">{deptReports.length}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600">
                      <span>Approved:</span>
                      <span className="font-extrabold">{approved}</span>
                    </div>
                    <div className="flex justify-between text-amber-600">
                      <span>Pending:</span>
                      <span className="font-extrabold">{pending}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Rejected:</span>
                      <span className="font-extrabold">{rejected}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* REPORT MANAGEMENT TOOLS */}
        <Card className="p-6">
          <SectionTitle title="Report Management Tools" subtitle="Bulk operations and exports" />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "📊", title: "Generate Department Summary", desc: "Create summary reports by department", color: "#8B5CF6" },
              { icon: "📈", title: "Download Analytics Report", desc: "Get detailed analytics and trends", color: "#10B981" },
              { icon: "📋", title: "Bulk Archive Reports", desc: "Archive old reports in bulk", color: "#3B82F6" },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}18` }}
                  >
                    <span style={{ color: item.color }} className="text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-extrabold text-sm text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}