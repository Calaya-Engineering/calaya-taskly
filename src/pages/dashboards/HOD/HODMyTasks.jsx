// pages/dashboards/HOD/HODMyTasks.jsx
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout, { 
  DashboardIcon, TaskIcon, DocumentIcon, ReportIcon, 
  CalendarIcon, AnnouncementIcon, UserIcon, 
  BellIcon, ApprovalIcon, AlertIcon, TenderIcon 
} from '../../../components/Layout';

const HODMenuItems = [
  { label: 'Dashboard', path: '/hod-dashboard', icon: <DashboardIcon /> },
  { label: 'Department Tasks', path: '/hod-dashboard/tasks', icon: <TaskIcon />, badge: '18' },
  { label: 'My Tasks', path: '/hod-dashboard/my-tasks', icon: <TaskIcon />, badge: '5' },
  { label: 'Documents', path: '/hod-dashboard/documents', icon: <DocumentIcon /> },
  { label: 'Daily Reports', path: '/hod-dashboard/reports', icon: <ReportIcon /> },
  { label: 'Meetings/Events', path: '/hod-dashboard/events', icon: <CalendarIcon /> },
  { label: 'Tenders', path: '/hod-dashboard/tenders', icon: <TenderIcon />, badge: '3' },
  { label: 'Tender Documents', path: '/hod-dashboard/tender-documents', icon: <TenderIcon /> },
  { label: 'Announcements', path: '/hod-dashboard/announcements', icon: <AnnouncementIcon /> },
  { label: 'Approvals', path: '/hod-dashboard/approvals', icon: <ApprovalIcon />, badge: '4' },
  { label: 'Escalations/Overdue', path: '/hod-dashboard/escalations', icon: <AlertIcon />, badge: '2' },
  { label: 'Notifications', path: '/hod-dashboard/notifications', icon: <BellIcon />, badge: '8' },
  { label: 'Profile', path: '/hod-dashboard/profile', icon: <UserIcon /> },
];

/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-sm ${className}`}>{children}</div>
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
      : "bg-gray-50 text-gray-700 ring-gray-100";

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white shadow-sm`;

const statusTone = (s) => {
  if (s === "COMPLETED") return "success";
  if (s === "IN_PROGRESS") return "info";
  if (s === "PENDING") return "warn";
  return "default";
};

const priorityTone = (p) => {
  if (p === "CRITICAL") return "danger";
  if (p === "HIGH") return "warn";
  if (p === "MEDIUM") return "info";
  if (p === "LOW") return "success";
  return "default";
};

const progressTone = (v) => (v >= 80 ? "success" : v >= 50 ? "info" : "warn");

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

export default function HODMyTasks() {
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    sortBy: "dueDate",
  });

  const myTasks = [
    {
      id: 'TASK-2024-00129',
      title: 'Review Monthly Department Report',
      department: 'Technical',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      dueDate: '2024-12-18',
      progress: 60,
      assignedBy: 'MD',
      description: 'Review and approve monthly performance report for Technical department',
    },
    {
      id: 'TASK-2024-00130',
      title: 'Approve Safety Equipment Purchase',
      department: 'HSE',
      priority: 'CRITICAL',
      status: 'PENDING',
      dueDate: '2024-12-20',
      progress: 0,
      assignedBy: 'HSE Manager',
      description: 'Review and approve purchase order for new safety equipment',
    },
    {
      id: 'TASK-2024-00131',
      title: 'Workshop Budget Review',
      department: 'Workshop',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      dueDate: '2024-12-25',
      progress: 40,
      assignedBy: 'Finance',
      description: 'Review workshop budget and submit recommendations',
    },
    {
      id: 'TASK-2024-00132',
      title: 'Team Performance Evaluation',
      department: 'Technical',
      priority: 'HIGH',
      status: 'PENDING',
      dueDate: '2024-12-22',
      progress: 0,
      assignedBy: 'HR',
      description: 'Complete quarterly performance evaluations for team members',
    },
    {
      id: 'TASK-2024-00133',
      title: 'Training Program Approval',
      department: 'All',
      priority: 'MEDIUM',
      status: 'COMPLETED',
      dueDate: '2024-12-15',
      progress: 100,
      assignedBy: 'Training Manager',
      description: 'Review and approve new safety training program',
    },
  ];

  const summary = useMemo(() => {
    const total = myTasks.length;
    const inProgress = myTasks.filter(t => t.status === 'IN_PROGRESS').length;
    const pending = myTasks.filter(t => t.status === 'PENDING').length;
    const completed = myTasks.filter(t => t.status === 'COMPLETED').length;
    const dueSoon = myTasks.filter(t => {
      const dueDate = new Date(t.dueDate);
      const today = new Date();
      const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
      return diffDays <= 3 && diffDays >= 0 && t.status !== 'COMPLETED';
    }).length;
    return { total, inProgress, pending, completed, dueSoon };
  }, []);

  const filteredTasks = useMemo(() => {
    let filtered = myTasks.filter(task => {
      if (filters.status !== 'all' && task.status !== filters.status) return false;
      if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      if (filters.sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (filters.sortBy === 'priority') {
        const priorityOrder = { CRITICAL: 1, HIGH: 2, MEDIUM: 3, LOW: 4 };
        return (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99);
      }
      return 0;
    });

    return filtered;
  }, [filters]);

  const clearFilters = () => {
    setFilters({ status: 'all', priority: 'all', sortBy: 'dueDate' });
  };

  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
      <div className="max-w-7xl mx-auto space-y-6">
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
                  <Pill>👤 My Tasks</Pill>
                  <Pill tone="success">{summary.completed} Completed</Pill>
                  {summary.dueSoon > 0 ? (
                    <Pill tone="danger">{summary.dueSoon} Due Soon</Pill>
                  ) : (
                    <Pill tone="info">No Due Soon</Pill>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  My Tasks
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Tasks assigned to you personally across departments.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={clearFilters}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                >
                  Clear Filters
                </button>
                <button
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                >
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Summary mini stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 md:p-5 bg-white border-t border-gray-200/70">
            {[
              { label: "Total Tasks", value: summary.total, icon: "📋", tone: "default" },
              { label: "In Progress", value: summary.inProgress, icon: "⚡", tone: "info" },
              { label: "Pending", value: summary.pending, icon: "⏳", tone: "warn" },
              { label: "Due Soon", value: summary.dueSoon, icon: "⏰", tone: summary.dueSoon ? "danger" : "success" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-gray-200/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{s.label}</p>
                  <Pill tone={s.tone}>{s.value}</Pill>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                    {s.value}
                  </p>
                  <span className="text-xl opacity-50">{s.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Filters */}
        <Card className="p-6">
          <SectionTitle
            title="Filters"
            subtitle="Filter by status, priority, and sorting"
            action={
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filteredTasks.length}</span> of{" "}
                <span className="font-semibold text-gray-800">{myTasks.length}</span>
              </div>
            }
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              >
                <option value="all">All Priorities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sort By</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              >
                <option value="dueDate">Due Date (Earliest)</option>
                <option value="priority">Priority (Highest)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                  {/* Left side - Task Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded" style={{ color: "var(--primary-blue)" }}>
                        {task.id}
                      </code>
                      <Pill tone={priorityTone(task.priority)}>{task.priority}</Pill>
                      <Pill tone={statusTone(task.status)}>{task.status.replace('_', ' ')}</Pill>
                      <Pill tone={task.department === 'All' ? 'info' : 'default'}>{task.department}</Pill>
                    </div>

                    <h3 className="text-lg font-extrabold text-gray-900 mb-2">{task.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{task.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Assigned By:</span>
                        <span className="font-semibold">{task.assignedBy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Due:</span>
                        <span className={`font-semibold ${new Date(task.dueDate) < new Date() && task.status !== 'COMPLETED' ? 'text-red-600' : ''}`}>
                          {fmtDate(task.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Progress & Actions */}
                  <div className="xl:w-64 space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <Pill tone={progressTone(task.progress)}>{task.progress}%</Pill>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${task.progress}%`,
                            background: task.progress >= 80
                              ? "linear-gradient(90deg, #10B981 0%, #34D399 100%)"
                              : task.progress >= 50
                              ? "linear-gradient(90deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)"
                              : "linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link to={`/hod-dashboard/task/${task.id}`} className="flex-1">
                        <button
                          className="w-full px-4 py-2.5 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                          style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                        >
                          View Details
                        </button>
                      </Link>
                      {task.status !== 'COMPLETED' && (
                        <button
                          className="flex-1 px-4 py-2.5 rounded-2xl text-sm font-semibold text-white shadow-sm active:scale-[0.99] transition"
                          style={{ backgroundColor: "var(--secondary-blue)" }}
                        >
                          Update
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-200/70">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Task ID: {task.id}</span>
                  <span>Department: {task.department}</span>
                </div>
              </div>
            </Card>
          ))}

          {/* Empty state */}
          {filteredTasks.length === 0 && (
            <Card className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}>
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600">You don't have any tasks matching your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
              >
                Clear Filters
              </button>
            </Card>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completion Rate</p>
                <p className="text-2xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {Math.round((summary.completed / summary.total) * 100)}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-green-50">
                <span className="text-xl">📊</span>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Progress</p>
                <p className="text-2xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {Math.round(myTasks.reduce((acc, t) => acc + t.progress, 0) / myTasks.length)}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-50">
                <span className="text-xl">📈</span>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">High Priority</p>
                <p className="text-2xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {myTasks.filter(t => t.priority === 'HIGH' || t.priority === 'CRITICAL').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-50">
                <span className="text-xl">⚠️</span>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Overdue</p>
                <p className="text-2xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {myTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'COMPLETED').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-amber-50">
                <span className="text-xl">⏰</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}