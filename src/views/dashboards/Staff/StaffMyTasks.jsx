"use client";

// pages/dashboards/Staff/StaffMyTasks.jsx
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
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
      : "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

const tasksData = [
  { 
    id: 'TASK-2024-00123', 
    title: 'Safety Inspection Report', 
    description: 'Complete safety inspection for workshop equipment',
    department: 'Technical',
    assignedBy: 'HOD - Mr. Johnson',
    assignedDate: '2024-12-01',
    dueDate: '2024-12-10',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    progress: 60,
    estimatedHours: 8,
    actualHours: 5,
    attachments: 3,
    comments: 5
  },
  { 
    id: 'TASK-2024-00124', 
    title: 'Equipment Maintenance Log', 
    description: 'Update maintenance logs for all workshop machinery',
    department: 'Workshop',
    assignedBy: 'HOD - Mr. Johnson',
    assignedDate: '2024-12-05',
    dueDate: '2024-12-11',
    priority: 'MEDIUM',
    status: 'PENDING',
    progress: 0,
    estimatedHours: 4,
    actualHours: 0,
    attachments: 1,
    comments: 2
  },
  { 
    id: 'TASK-2024-00125', 
    title: 'Client Meeting Notes', 
    description: 'Prepare and submit meeting notes for client review',
    department: 'Technical',
    assignedBy: 'MD - Mr. Williams',
    assignedDate: '2024-12-06',
    dueDate: '2024-12-15',
    priority: 'LOW',
    status: 'IN_PROGRESS',
    progress: 30,
    estimatedHours: 6,
    actualHours: 2,
    attachments: 0,
    comments: 3
  },
  { 
    id: 'TASK-2024-00126', 
    title: 'Training Completion', 
    description: 'Complete safety training and submit certificate',
    department: 'HSE',
    assignedBy: 'HOD - Ms. Rodriguez',
    assignedDate: '2024-11-28',
    dueDate: '2024-12-08',
    priority: 'HIGH',
    status: 'OVERDUE',
    progress: 100,
    estimatedHours: 10,
    actualHours: 12,
    attachments: 2,
    comments: 4
  },
  { 
    id: 'TASK-2024-00127', 
    title: 'Inventory Check', 
    description: 'Weekly inventory check for workshop supplies',
    department: 'Workshop',
    assignedBy: 'HOD - Mr. Johnson',
    assignedDate: '2024-12-09',
    dueDate: '2024-12-12',
    priority: 'MEDIUM',
    status: 'PENDING',
    progress: 0,
    estimatedHours: 3,
    actualHours: 0,
    attachments: 0,
    comments: 0
  },
  { 
    id: 'TASK-2024-00128', 
    title: 'Monthly Report Submission', 
    description: 'Submit monthly activity report for November',
    department: 'Technical',
    assignedBy: 'HOD - Mr. Johnson',
    assignedDate: '2024-12-03',
    dueDate: '2024-12-10',
    priority: 'HIGH',
    status: 'COMPLETED',
    progress: 100,
    estimatedHours: 5,
    actualHours: 6,
    attachments: 4,
    comments: 6
  },
];

const getStatusTone = (status) => {
  switch(status) {
    case 'COMPLETED': return 'success';
    case 'IN_PROGRESS': return 'info';
    case 'PENDING': return 'warn';
    case 'OVERDUE': return 'danger';
    default: return 'default';
  }
};

const getPriorityTone = (priority) => {
  switch(priority) {
    case 'HIGH': return 'warn';
    case 'MEDIUM': return 'info';
    case 'LOW': return 'success';
    default: return 'default';
  }
};

const getStatusLabel = (status) => {
  switch(status) {
    case 'IN_PROGRESS': return 'In Progress';
    case 'PENDING': return 'Pending';
    case 'COMPLETED': return 'Completed';
    case 'OVERDUE': return 'Overdue';
    default: return status;
  }
};

const getProgressColor = (progress) => {
  if (progress < 50) return "var(--accent-red)";
  if (progress < 100) return "var(--secondary-blue)";
  return "#10B981";
};

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not set";

export default function StaffMyTasks() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return tasksData.filter((task) => {
      const matchesFilter = filter === 'all' || 
        (filter === 'in_progress' && task.status === 'IN_PROGRESS') ||
        (filter === 'pending' && task.status === 'PENDING') ||
        (filter === 'completed' && task.status === 'COMPLETED') ||
        (filter === 'overdue' && task.status === 'OVERDUE');
      
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.id.toLowerCase().includes(query) ||
        task.department.toLowerCase().includes(query);
      
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchTerm]);

  const stats = useMemo(() => {
    const total = tasksData.length;
    const completed = tasksData.filter(t => t.status === 'COMPLETED').length;
    const inProgress = tasksData.filter(t => t.status === 'IN_PROGRESS').length;
    const overdue = tasksData.filter(t => t.status === 'OVERDUE').length;
    const totalHours = tasksData.reduce((sum, t) => sum + t.actualHours, 0);
    const completionRate = total ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, inProgress, overdue, totalHours, completionRate };
  }, []);

  const clearFilters = () => {
    setFilter('all');
    setSearchTerm('');
  };

  const updateTaskStatus = (taskId, newStatus) => {
    toast.success(`Task ${taskId} status updated to ${newStatus}`);
  };

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
                  <Pill>My Tasks</Pill>
                  <Pill tone={stats.overdue > 0 ? "danger" : "success"}>{stats.overdue} Overdue</Pill>
                  <Pill tone="info">{stats.inProgress} In Progress</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  My Tasks
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  View and manage all tasks assigned to you
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={clearFilters}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                >
                  Clear Filters
                </button>
                <Link href="/staff-dashboard">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    Back to Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 md:p-5 bg-white border-t border-gray-200/70">
            {[
              { label: "Total Tasks", value: stats.total, tone: "default", icon: "📋", color: "var(--primary-blue)" },
              { label: "Completed", value: stats.completed, tone: "success", icon: "✅", color: "#10B981" },
              { label: "In Progress", value: stats.inProgress, tone: "info", icon: "⚡", color: "#3B82F6" },
              { label: "Hours Logged", value: `${stats.totalHours}h`, tone: "default", icon: "⏱️", color: "#F59E0B" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-gray-200/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{s.label}</p>
                  <Pill tone={s.tone}>Live</Pill>
                </div>
                <p className="text-2xl font-extrabold mt-2" style={{ color: s.color }}>
                  {s.value}
                </p>
                <div className="mt-3 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${s.label === "Hours Logged" ? Math.min(100, (stats.totalHours / 50) * 100) : (s.value / stats.total) * 100}%`,
                      backgroundColor: s.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Overdue Alert */}
        {stats.overdue > 0 && filter !== 'overdue' && (
          <Card className="border-red-200 bg-red-50/30 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚨</span>
                <div>
                  <h3 className="font-extrabold text-red-800">Overdue Tasks!</h3>
                  <p className="text-red-600 text-sm">{stats.overdue} task(s) require your immediate attention</p>
                </div>
              </div>
              <button
                onClick={() => setFilter('overdue')}
                className="px-4 py-2 rounded-xl font-semibold text-sm bg-red-500 text-white hover:bg-red-600 transition"
              >
                View Overdue
              </button>
            </div>
          </Card>
        )}

        {/* Filters */}
        <Card className="p-6">
          <SectionTitle
            title="Filters"
            subtitle="Filter tasks by status and search"
            action={
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filteredTasks.length}</span> of{" "}
                <span className="font-semibold text-gray-800">{tasksData.length}</span> tasks
              </div>
            }
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    filter === 'all' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  style={{
                    borderColor: filter === 'all' ? "rgba(44,75,155,0.35)" : "#e5e7eb",
                    color: filter === 'all' ? "var(--primary-blue)" : "#374151",
                  }}
                >
                  All ({stats.total})
                </button>
                <button
                  onClick={() => setFilter('in_progress')}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    filter === 'in_progress' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  style={{
                    borderColor: filter === 'in_progress' ? "rgba(59,130,246,0.35)" : "#e5e7eb",
                    color: filter === 'in_progress' ? "#3B82F6" : "#374151",
                  }}
                >
                  In Progress ({stats.inProgress})
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    filter === 'pending' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  style={{
                    borderColor: filter === 'pending' ? "rgba(245,158,11,0.35)" : "#e5e7eb",
                    color: filter === 'pending' ? "#F59E0B" : "#374151",
                  }}
                >
                  Pending ({tasksData.filter(t => t.status === 'PENDING').length})
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    filter === 'completed' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  style={{
                    borderColor: filter === 'completed' ? "rgba(16,185,129,0.35)" : "#e5e7eb",
                    color: filter === 'completed' ? "#10B981" : "#374151",
                  }}
                >
                  Completed ({stats.completed})
                </button>
                <button
                  onClick={() => setFilter('overdue')}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    filter === 'overdue' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  style={{
                    borderColor: filter === 'overdue' ? "rgba(239,68,68,0.35)" : "#e5e7eb",
                    color: filter === 'overdue' ? "#EF4444" : "#374151",
                  }}
                >
                  Overdue ({stats.overdue})
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Search by title, ID, department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Tasks List */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200/70">
                <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3 text-left">Task Details</th>
                  <th className="px-5 py-3 text-left">Department</th>
                  <th className="px-5 py-3 text-left">Priority</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Due Date</th>
                  <th className="px-5 py-3 text-left">Progress</th>
                  <th className="px-5 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/70 text-[13px]">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50/70 transition">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0"
                          style={{ backgroundColor: "var(--secondary-blue)" }}
                        >
                          📋
                        </div>
                        <div>
                          <Link href={`/staff-dashboard/task/${task.id}`}>
                            <div className="font-extrabold text-gray-900 hover:underline cursor-pointer">
                              {task.title}
                            </div>
                          </Link>
                          <div className="text-[11px] text-gray-500 mt-1">{task.id}</div>
                          <div className="text-[11px] text-gray-500 mt-1">
                            By: {task.assignedBy} • {fmtDate(task.assignedDate)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <Pill>{task.department}</Pill>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <Pill tone={getPriorityTone(task.priority)}>{task.priority}</Pill>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <Pill tone={getStatusTone(task.status)}>{getStatusLabel(task.status)}</Pill>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-semibold">{fmtDate(task.dueDate)}</div>
                        <div className={`text-[11px] ${task.status === 'OVERDUE' ? 'text-red-600' : 'text-gray-500'}`}>
                          {task.status === 'OVERDUE' ? 'Overdue' : 'Due date'}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${task.progress}%`,
                              backgroundColor: getProgressColor(task.progress),
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold">{task.progress}%</span>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1">
                        {task.actualHours}/{task.estimatedHours} hrs
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Link href={`/staff-dashboard/task/${task.id}`}>
                            <button
                              className="px-3 py-1.5 rounded-xl text-[11px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                              style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                            >
                              View
                            </button>
                          </Link>
                          {task.status !== 'COMPLETED' ? (
                            <button
                              onClick={() => updateTaskStatus(task.id, 'COMPLETED')}
                              className="px-3 py-1.5 rounded-xl text-[11px] font-semibold text-white active:scale-[0.99] transition"
                              style={{ backgroundColor: "#10B981" }}
                            >
                              Complete
                            </button>
                          ) : (
                            <button
                              onClick={() => updateTaskStatus(task.id, 'IN_PROGRESS')}
                              className="px-3 py-1.5 rounded-xl text-[11px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                              style={{ borderColor: "rgba(239,68,68,0.35)", color: "#EF4444" }}
                            >
                              Reopen
                            </button>
                          )}
                        </div>
                        <div className="flex gap-2 text-[11px] text-gray-500">
                          <span>📎 {task.attachments}</span>
                          <span>💬 {task.comments}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTasks.length === 0 && (
            <div className="p-10 text-center">
              <div className="text-4xl mb-3">📋</div>
              <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                No tasks found
              </div>
              <div className="text-sm text-gray-500 mt-1">Try adjusting your filters or search criteria</div>
            </div>
          )}
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Completion Rate</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#10B981" }}>
                  {stats.completionRate}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-xl">✅</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Total Hours</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--secondary-blue)" }}>
                  {stats.totalHours}h
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xl">⏱️</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Avg. per Task</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#F59E0B" }}>
                  {stats.totalHours ? (stats.totalHours / stats.total).toFixed(1) : 0}h
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center">
                <span className="text-amber-600 text-xl">📊</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Attachments</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {tasksData.reduce((sum, t) => sum + t.attachments, 0)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xl">📎</span>
              </div>
            </div>
          </Card>
        </div>

 
      </div>
    </Layout>
  );
}