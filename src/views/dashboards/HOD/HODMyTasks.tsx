"use client";

// pages/dashboards/HOD/HODMyTasks.jsx
import { useMemo, useState, useEffect, useCallback } from 'react';
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";
import Link from "next/link";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
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
  new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });

export default function HODMyTasks() {
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    sortBy: "dueDate",
  });

  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [escalateModal, setEscalateModal] = useState(null); // { task }
  const [escalateReason, setEscalateReason] = useState("");
  const [escalating, setEscalating] = useState(false);

  // Cache the current user's ID – only fetch /api/me once.
  const userIdRef = useMemo(() => ({ current: null }), []);

  const fetchTasks = useCallback(async () => {
    try {
      let uid = userIdRef.current;
      if (!uid) {
        const meRes = await fetchWithAuth("/api/me");
        if (!meRes.ok) return;
        const me = await meRes.json();
        uid = me.id;
        userIdRef.current = uid;
      }

      const res = await fetchWithAuth(`/api/tasks?assigneeId=${uid}&limit=100`);
      if (res.ok) {
        const data = await res.json();
        setTasksData(data);
      }
    } catch (e) {
      console.error("Failed to fetch tasks:", e);
    } finally {
      setLoading(false);
    }
  }, [userIdRef]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleEscalate = (task) => {
    setEscalateModal({ task });
    setEscalateReason("");
  };

  const submitEscalation = async () => {
    if (!escalateModal) return;
    setEscalating(true);
    try {
      const res = await fetchWithAuth(`/api/tasks/${escalateModal.task.id}/escalate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: escalateReason || "Escalated by HOD" }),
      });
      if (res.ok) {
        toast.success(`Task "${escalateModal.task.title}" escalated to MD successfully`);
        fetchTasks();
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to escalate task");
      }
    } catch {
      toast.error("Failed to escalate task");
    } finally {
      setEscalating(false);
      setEscalateModal(null);
    }
  };
  // SSE real-time updates
  useSSE("/api/tasks/events", (ev) => {
    if (ev.type?.startsWith("task:")) fetchTasks();
  });

  const summary = useMemo(() => {
    const total = tasksData.length;
    const inProgress = tasksData.filter(t => t.status === 'IN_PROGRESS').length;
    const pending = tasksData.filter(t => t.status === 'PENDING').length;
    const completed = tasksData.filter(t => t.status === 'COMPLETED').length;
    const dueSoon = tasksData.filter(t => {
      const dueDate = new Date(t.dueDate);
      const today = new Date();
      const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
      return diffDays <= 3 && diffDays >= 0 && t.status !== 'COMPLETED';
    }).length;
    return { total, inProgress, pending, completed, dueSoon };
  }, [tasksData]);

  const filteredTasks = useMemo(() => {
    let filtered = tasksData.filter(task => {
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
  }, [tasksData, filters]);

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
                  <Pill>{renderNodeWithIcons("👤 My Tasks")}</Pill>
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
                  <span className="text-xl opacity-50">{renderNodeWithIcons(s.icon)}</span>
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
                <span className="font-semibold text-gray-800">{tasksData.length}</span>
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
          {loading ? (
            <Card className="p-12 text-center text-gray-500">
              <div className="w-8 h-8 mx-auto mb-4 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--primary-blue)', borderTopColor: 'transparent' }} />
              Loading tasks...
            </Card>
          ) : (
            <>
              {filteredTasks.map((task) => (
                <Card key={task.type === "JOB" ? `JOB-${task.id}` : `TSK-${task.id}`} className="overflow-hidden transition">
                  <div className="p-6">
                    <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                      {/* Left side - Task Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded" style={{ color: "var(--primary-blue)" }}>
                            {task.type === "JOB" ? `JOB-${task.id}` : `TSK-${task.id}`}
                          </code>
                          <Pill tone={priorityTone(task.priority)}>{task.priority}</Pill>
                          <Pill tone={statusTone(task.status)}>{task.status.replace('_', ' ')}</Pill>
                          <Pill tone={task.department === 'All' ? 'info' : 'default'}>{task.department}</Pill>
                          {task.escalated && <Pill tone="danger">{renderNodeWithIcons("🔺 Escalated to MD")}</Pill>}
                        </div>

                        <h3 className="text-lg font-extrabold text-gray-900 mb-2">{task.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{task.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Assigned By:</span>
                            <span className="font-semibold">{(task.createdBy?.name || task.createdBy?.role || "MD")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Assigned To:</span>
                            <span className="font-semibold text-blue-600">
                              {task.assignments?.length ? task.assignments.map(a => a.user?.name || a.user?.email).join(', ') : "—"}
                            </span>
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
                            <Pill tone={progressTone(((task.progress || 0) || 0))}>{((task.progress || 0) || 0)}%</Pill>
                          </div>
                          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${((task.progress || 0) || 0)}%`,
                                backgroundColor: ((task.progress || 0) || 0) >= 80
                                  ? "#10B981"
                                  : ((task.progress || 0) || 0) >= 50
                                    ? "var(--primary-blue)"
                                    : "#F59E0B",
                              }}
                            />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 flex-wrap">
                          <Link href={`/hod-dashboard/${task.type === "JOB" ? "job" : "task"}/${task.id}`} className="flex-1 min-w-[120px]">
                            <button
                              className="w-full px-4 py-2.5 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                              style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                            >
                              View Details
                            </button>
                          </Link>
                          {task.status !== 'COMPLETED' && !task.escalated && (
                            <button
                              onClick={() => handleEscalate(task)}
                              className="flex-1 min-w-[100px] px-4 py-2.5 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                              style={{ backgroundColor: "var(--accent-red)" }}
                            >
                              ⬆ Escalate
                            </button>
                          )}
                          {task.escalated && (
                            <span className="flex-1 min-w-[100px] px-4 py-2.5 rounded-2xl text-sm font-semibold text-center bg-red-50 text-red-700 ring-1 ring-red-100">{renderNodeWithIcons("\n                              🔺 Escalated\n                            ")}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-200/70">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Task ID: {task.type === "JOB" ? `JOB-${task.id}` : `TSK-${task.id}`}</span>
                      <span>Department: {task.department}</span>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Empty state */}
              {filteredTasks.length === 0 && (
                <Card className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}>
                    <span className="text-3xl">{renderNodeWithIcons("📋")}</span>
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
            </>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completion Rate</p>
                <p className="text-2xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {Math.round((summary.total === 0 ? 0 : summary.completed / summary.total) * 100)}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-green-50">
                <span className="text-xl">{renderNodeWithIcons("📊")}</span>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Progress</p>
                <p className="text-2xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {Math.round((tasksData.length === 0 ? 0 : tasksData.reduce((acc, t) => acc + (t.progress || 0), 0) / tasksData.length))}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-50">
                <span className="text-xl">{renderNodeWithIcons("📈")}</span>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">High Priority</p>
                <p className="text-2xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {tasksData.filter(t => t.priority === 'HIGH' || t.priority === 'CRITICAL').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-50">
                <span className="text-xl">{renderNodeWithIcons("⚠️")}</span>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Overdue</p>
                <p className="text-2xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {tasksData.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'COMPLETED').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-amber-50">
                <span className="text-xl">⏰</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Escalation Reason Modal */}
      {escalateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEscalateModal(null)} />
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-50">
                <span className="text-2xl">{renderNodeWithIcons("🔺")}</span>
              </div>
              <div>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--primary-blue)" }}>
                  Escalate to MD
                </h2>
                <p className="text-sm text-gray-500">This task will be flagged for MD attention</p>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-gray-50 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Task</p>
              <p className="font-semibold text-gray-900 text-sm">{escalateModal.task.title}</p>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Escalation Reason <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-100 text-sm resize-none"
                rows={3}
                placeholder="Describe why this task needs MD attention..."
                value={escalateReason}
                onChange={(e) => setEscalateReason(e.target.value)}
              />
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setEscalateModal(null)}
                className="flex-1 px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                style={{ borderColor: "rgba(44,75,155,0.3)", color: "var(--primary-blue)" }}
              >
                Cancel
              </button>
              <button
                onClick={submitEscalation}
                disabled={escalating}
                className="flex-1 px-5 py-3 rounded-2xl font-semibold text-white transition active:scale-[0.99] disabled:opacity-60"
                style={{ backgroundColor: "var(--accent-red)" }}
              >
                {escalating ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Escalating...
                  </span>
                ) : "Escalate to MD"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}