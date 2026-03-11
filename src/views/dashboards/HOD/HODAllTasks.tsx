"use client";

// pages/dashboards/MD/HODAllTasks.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
import { SearchIcon, getIconByKey, FolderIcon } from "@/lib/icons";
import { NativeSelect } from "@/components/ui/native-select";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";

/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const SectionTitle = ({ title, subtitle, action = null }) => (
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
          : "bg-blue-50 text-blue-700 ring-blue-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

const statusTone = (s) =>
  s === "COMPLETED" ? "success" : s === "IN_PROGRESS" ? "default" : s === "ON_HOLD" ? "warn" : "default";

const priorityTone = (p) =>
  p === "CRITICAL" ? "danger" : p === "HIGH" ? "warn" : p === "MEDIUM" ? "default" : "success";

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });

const isOverdue = (task) =>
  task.dueDate && new Date(task.dueDate).getTime() < Date.now() && task.status !== "COMPLETED";

const taskDisplayId = (task) => (task.type === "JOB" ? `JOB-${task.id}` : `TSK-${task.id}`);
const taskAssigneeLabel = (task) => {
  const a = task.assignments;
  if (!a?.length) return "Unassigned";
  if (a.length === 1) return a[0].user?.name || a[0].user?.email || "—";
  return `${a.length} assignees`;
};
const taskCreatedByLabel = (task) =>
  task.createdBy?.role || task.createdBy?.name || "—";

interface Task {
  id: number;
  title: string;
  department: string;
  status: string;
  priority: string;
  type: string;
  dueDate?: string;
  createdAt: string;
  createdBy?: { name?: string; email?: string; role?: string };
  assignments?: { user?: { name?: string; email?: string } }[];
}

export default function HODAllTasks() {
  const [tasksData, setTasksData] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    department: "all",
    status: "all",
    priority: "all",
    type: "all",
    search: "",
  });

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/tasks?limit=100");
      if (res.ok) {
        const data = await res.json();
        setTasksData(data);
      }
    } catch (e) {
      console.error("Failed to fetch tasks:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // SSE real-time updates — use shared hook
  useSSE("/api/tasks/events", (ev) => {
    if (ev.type?.startsWith("task:")) fetchTasks();
  });

  const departments = useMemo(
    () => [...new Set(tasksData.map((t) => t.department).filter(Boolean))],
    [tasksData]
  );
  const statuses = ["PENDING", "IN_PROGRESS", "ON_HOLD", "COMPLETED"];
  const priorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

  const filteredTasks = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return tasksData.filter((task) => {
      const matches =
        (filters.department === "all" || task.department === filters.department) &&
        (filters.status === "all" || task.status === filters.status) &&
        (filters.priority === "all" || task.priority === filters.priority) &&
        (filters.type === "all" || task.type === filters.type) &&
        (!q ||
          task.title?.toLowerCase().includes(q) ||
          String(task.id).includes(q) ||
          taskDisplayId(task).toLowerCase().includes(q));
      return matches;
    });
  }, [tasksData, filters]);

  const summary = useMemo(() => {
    const total = tasksData.length;
    const inProgress = tasksData.filter((t) => t.status === "IN_PROGRESS").length;
    const overdue = tasksData.filter((t) => isOverdue(t)).length;
    const completed = tasksData.filter((t) => t.status === "COMPLETED").length;
    const rate = total ? Math.round((completed / total) * 100) : 0;
    return { total, inProgress, overdue, rate };
  }, [tasksData]);

  const clearFilters = () =>
    setFilters({ department: "all", status: "all", priority: "all", type: "all", search: "" });

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
                  <Pill>Department Tasks</Pill>
                  <Pill tone="success">{summary.rate}% Completion</Pill>
                  {summary.overdue > 0 ? <Pill tone="danger">{summary.overdue} Overdue</Pill> : <Pill tone="default">No Critical Escalations</Pill>}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Department Tasks
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Manage and track all tasks across your departments with priority, status and due dates.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/hod-dashboard/create-task">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)", color: "white" }}
                  >
                    + Create Task
                  </button>
                </Link>
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

          {/* Summary mini stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 md:p-5 bg-white border-t border-gray-200/70">
            {[
              { label: "Total Items", value: summary.total, tone: "default" },
              { label: "In Progress", value: summary.inProgress, tone: "default" },
              { label: "Overdue", value: summary.overdue, tone: summary.overdue ? "danger" : "success" },
              { label: "Completion Rate", value: `${summary.rate}%`, tone: "success" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-gray-200/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{s.label}</p>
                  <Pill tone={s.tone}>{s.label === "Overdue" && summary.overdue ? "Action Needed" : "Live"}</Pill>
                </div>
                <p className="text-2xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Filters */}
        <Card className="p-6">
          <SectionTitle
            title="Filters"
            subtitle="Refine results by department, status, priority, type, and search"
            action={
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filteredTasks.length}</span> of{" "}
                <span className="font-semibold text-gray-800">{tasksData.length}</span>
              </div>
            }
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
              <NativeSelect
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={filters.department}
                onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </NativeSelect>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <NativeSelect
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">All Status</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </NativeSelect>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
              <NativeSelect
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              >
                <option value="all">All Priority</option>
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </NativeSelect>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
              <NativeSelect
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="all">All Types</option>
                <option value="TASK">Task</option>
                <option value="JOB">Job</option>
              </NativeSelect>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Search by ID or title..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>
        </Card>

        {/* TABLE (Desktop) + CARDS (Mobile) */}
        <Card className="overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading tasks…</div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b border-gray-200/70">
                    <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="px-5 py-3 text-left">Task</th>
                      <th className="px-5 py-3 text-left">Department</th>
                      <th className="px-5 py-3 text-left">Assignee</th>
                      <th className="px-5 py-3 text-left">Priority</th>
                      <th className="px-5 py-3 text-left">Status</th>
                      <th className="px-5 py-3 text-left">Due</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200/70 text-[13px]">
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50/70 transition">
                        <td className="px-5 py-3">
                          {/* inside content */}
                          <div className="flex items-start gap-3">
                            <div
                              className="w-9 h-9 rounded-2xl flex items-center justify-center "
                              style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                            >
                              {getIconByKey(task.type === "JOB" ? "job" : "check", "w-5 h-5")}
                            </div>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[13px] font-extrabold" style={{ color: "var(--primary-blue)" }}>
                                  {taskDisplayId(task)}
                                </span>
                                <Pill>{task.type}</Pill>
                                {isOverdue(task) ? <Pill tone="danger">Overdue</Pill> : null}
                              </div>

                              <p className="text-[13px] font-semibold text-gray-900 mt-1 truncate max-w-[520px]">
                                {task.title}
                              </p>
                              <p className="text-[11px] text-gray-500 mt-0.5">Created by: {taskCreatedByLabel(task)}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-3">
                          <Pill>{task.department || "—"}</Pill>
                        </td>

                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-2xl flex items-center justify-center text-white font-bold "
                              style={{ backgroundColor: "var(--secondary-blue)" }}
                            >
                              <span className="text-[12px]">{taskAssigneeLabel(task).charAt(0)}</span>
                            </div>
                            <div>
                              <div className="text-[13px] font-semibold text-gray-900">{taskAssigneeLabel(task)}</div>
                              <div className="text-[11px] text-gray-500">Assignee</div>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-3">
                          <Pill tone={priorityTone(task.priority)}>{task.priority}</Pill>
                        </td>

                        <td className="px-5 py-3">
                          <Pill tone={statusTone(task.status)}>{task.status.replace("_", " ")}</Pill>
                        </td>

                        <td className="px-5 py-3">
                          <div className="text-[13px] font-semibold text-gray-900">{task.dueDate ? fmtDate(task.dueDate) : "—"}</div>
                          <div className="text-[11px] text-gray-500">Due date</div>
                        </td>

                        <td className="px-5 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/hod-dashboard/task/${task.id}`}>
                              <button
                                className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white active:scale-[0.99] transition"
                                style={{ backgroundColor: "var(--secondary-blue)" }}
                              >
                                View
                              </button>
                            </Link>
                            <Link href={`/hod-dashboard/edit-task/${task.id}`}>
                              <button
                                className="px-3 py-1.5 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                                style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                              >
                                Edit
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>


              {/* Mobile cards */}
              <div className="lg:hidden p-4 space-y-3">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="rounded-2xl border border-gray-200/70 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                            {taskDisplayId(task)}
                          </span>
                          <Pill>{task.type}</Pill>
                          {isOverdue(task) ? <Pill tone="danger">Overdue</Pill> : null}
                        </div>
                        <p className="mt-2 font-semibold text-gray-900">{task.title}</p>
                        <p className="text-xs text-gray-500 mt-1">Created by: {taskCreatedByLabel(task)}</p>
                      </div>
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center  shrink-0"
                        style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                      >
                        {getIconByKey(task.type === "JOB" ? "job" : "check", "w-5 h-5")}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill>{task.department || "—"}</Pill>
                      <Pill tone={priorityTone(task.priority)}>{task.priority}</Pill>
                      <Pill tone={statusTone(task.status)}>{task.status.replace("_", " ")}</Pill>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm text-gray-700">
                        <span className="text-xs text-gray-500">Due:</span>{" "}
                        <span className="font-semibold">{task.dueDate ? fmtDate(task.dueDate) : "—"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/hod-dashboard/task/${task.id}`}>
                          <button
                            className="px-3.5 py-2 rounded-xl text-sm font-semibold text-white active:scale-[0.99] transition"
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            View
                          </button>
                        </Link>
                        <Link href={`/hod-dashboard/edit-task/${task.id}`}>
                          <button
                            className="px-3.5 py-2 rounded-xl text-sm font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                            style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                          >
                            Edit
                          </button>
                        </Link>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <div
                        className="w-9 h-9 rounded-2xl flex items-center justify-center text-white font-bold "
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        {taskAssigneeLabel(task).charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate">{taskAssigneeLabel(task)}</div>
                        <div className="text-xs text-gray-500">Assignee</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty state */}
              {filteredTasks.length === 0 ? (
                <div className="p-10 text-center border-t border-gray-200/70">
                  <FolderIcon className="w-16 h-16 mx-auto text-gray-400" />
                  <div className="mt-3 font-extrabold" style={{ color: "var(--primary-blue)" }}>
                    No tasks match your filters
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Try clearing filters or searching by task ID.</div>
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                    style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : null}

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200/70 bg-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-gray-900">1</span> to{" "}
                    <span className="font-semibold text-gray-900">{filteredTasks.length}</span> of{" "}
                    <span className="font-semibold text-gray-900">{tasksData.length}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="px-3 py-2 rounded-xl border border-gray-200 text-sm hover:bg-gray-50">Previous</button>
                    <button
                      className="px-3 py-2 rounded-xl text-sm text-white"
                      style={{ backgroundColor: "var(--primary-blue)" }}
                    >
                      1
                    </button>
                    <button className="px-3 py-2 rounded-xl border border-gray-200 text-sm hover:bg-gray-50">2</button>
                    <button className="px-3 py-2 rounded-xl border border-gray-200 text-sm hover:bg-gray-50">Next</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </Layout>
  );
}
