"use client";

// views/dashboards/HOD/HODEscalations.jsx
import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
import { SearchIcon, getIconByKey } from "@/lib/icons";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";
import { isTaskPendingApproval } from "@/lib/task-approval";

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

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" }) : "Not set";

const getStatusTone = (status) => {
  if (status === "OVERDUE") return "danger";
  if (status === "ESCALATED") return "danger";
  if (status === "AT_RISK") return "warn";
  if (status === "RESOLVED") return "success";
  return "default";
};

const getPriorityTone = (priority) => {
  if (priority === "CRITICAL" || priority === "URGENT") return "danger";
  if (priority === "HIGH") return "warn";
  if (priority === "MEDIUM") return "info";
  return "default";
};

const getLevelTone = (level) => {
  if (level === "LEVEL_3") return "danger";
  if (level === "LEVEL_2") return "warn";
  if (level === "LEVEL_1") return "info";
  return "default";
};

// Map a raw API task into the escalation shape expected by the UI.
function mapTaskToEscalation(t) {
  const now = Date.now();
  const due = t.dueDate ? new Date(t.dueDate) : null;
  const overdueDays = due ? Math.ceil((now - due.getTime()) / 86400000) : 0;

  const status = t.escalated ? "ESCALATED" : overdueDays > 0 ? "OVERDUE" : "AT_RISK";
  const escalationLevel =
    t.escalated ? "LEVEL_2"
      : overdueDays >= 7 ? "LEVEL_3"
        : overdueDays > 0 ? "LEVEL_2"
          : "LEVEL_1";

  return {
    id: `TSK-${t.id}`,
    taskId: String(t.id),
    dbId: t.id,
    title: t.title || "Untitled Task",
    type: "TASK",
    department: t.department || "—",
    assignee: t.assignments?.[0]?.user?.name || t.assignments?.[0]?.user?.email || "Unassigned",
    dueDate: t.dueDate ? t.dueDate.split("T")[0] : null,
    overdueDays,
    escalationLevel,
    status,
    priority: t.priority || "MEDIUM",
    assignedTo: t.escalated ? "MD" : "HOD",
    description: t.description || "No description",
    comments: 0,
    lastReminder: null,
    nextAction: t.escalated
      ? "Escalated to MD – awaiting resolution"
      : overdueDays > 0
        ? "Requires immediate attention"
        : "Monitor progress",
    actionRequired: !t.escalated && overdueDays >= 0,
    lastUpdate: t.updatedAt || t.createdAt,
  };
}

export default function HODEscalations() {
  const [escalationsData, setEscalationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("cards"); // cards | table

  const fetchEscalations = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/tasks?limit=200");
      if (res.ok) {
        const tasks = await res.json();
        const now = Date.now();
        // Include escalated tasks and tasks due within 3 days (at-risk / overdue)
        const relevant = (Array.isArray(tasks) ? tasks : []).filter((t) => {
          if (t.status === "COMPLETED" || t.status === "CANCELLED" || isTaskPendingApproval(t.status)) return false;
          if (t.escalated) return true;
          const due = t.dueDate ? new Date(t.dueDate) : null;
          if (!due) return false;
          const diffDays = Math.ceil((due.getTime() - now) / 86400000);
          return diffDays <= 3;
        });
        setEscalationsData(relevant.map(mapTaskToEscalation));
      }
    } catch (e) {
      console.error("Failed to fetch escalations:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEscalations(); }, [fetchEscalations]);

  // Real-time updates
  useSSE("/api/tasks/events", (ev) => {
    if (ev.type?.startsWith("task:")) fetchEscalations();
  });

  const departments = useMemo(
    () => [...new Set(escalationsData.map((e) => e.department))],
    [escalationsData]
  );

  const filteredEscalations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return escalationsData.filter((escalation) => {
      const matchesStatus = selectedStatus === "all" || escalation.status === selectedStatus;
      const matchesLevel = selectedLevel === "all" || escalation.escalationLevel === selectedLevel;
      const matchesDept = selectedDepartment === "all" || escalation.department === selectedDepartment;
      const matchesSearch =
        !query ||
        escalation.id.toLowerCase().includes(query) ||
        escalation.title.toLowerCase().includes(query) ||
        escalation.department.toLowerCase().includes(query) ||
        escalation.assignee.toLowerCase().includes(query);
      return matchesStatus && matchesLevel && matchesDept && matchesSearch;
    });
  }, [escalationsData, selectedStatus, selectedLevel, selectedDepartment, searchQuery]);

  const overview = useMemo(() => {
    const total = escalationsData.length;
    const overdue = escalationsData.filter((e) => e.status === "OVERDUE").length;
    const atRisk = escalationsData.filter((e) => e.status === "AT_RISK").length;
    const escalated = escalationsData.filter((e) => e.status === "ESCALATED").length;
    const actionRequired = escalationsData.filter((e) => e.actionRequired).length;
    const avgOverdue =
      total > 0
        ? Math.round(
          escalationsData.reduce((sum, e) => sum + Math.max(0, e.overdueDays), 0) / total
        )
        : 0;
    return { total, overdue, atRisk, escalated, actionRequired, avgOverdue };
  }, [escalationsData]);

  const handleReassign = (id) => {
    toast.info(`Reassign action for escalation ${id} — connect to your API.`);
  };

  const clearFilters = () => {
    setSelectedStatus("all");
    setSelectedLevel("all");
    setSelectedDepartment("all");
    setSearchQuery("");
  };

  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
      <div className="space-y-6">
        {/* Hero Header */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(237,50,55,0.08) 0%, rgba(44,75,155,0.10) 50%, rgba(109,198,223,0.12) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>Escalations Center</Pill>
                  <Pill tone="danger">{overview.overdue} Overdue</Pill>
                  <Pill tone="warn">{overview.atRisk} At Risk</Pill>
                  {overview.escalated > 0 && (
                    <Pill tone="danger">{overview.escalated} Escalated</Pill>
                  )}
                  <Pill tone="info">{overview.actionRequired} Need Action</Pill>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Escalations & Overdue Tasks
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Monitor and manage overdue tasks, at-risk items, and escalations across your departments.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={clearFilters}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(109,198,223,0.7)", color: "var(--primary-blue)" }}
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => fetchEscalations()}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                  style={{ backgroundColor: "var(--primary-blue)" }}
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 md:p-5 bg-white border-t border-gray-200/70">
            {[
              { label: "Total Items", value: overview.total, tone: "default" },
              { label: "Overdue", value: overview.overdue, tone: overview.overdue > 0 ? "danger" : "success" },
              { label: "At Risk", value: overview.atRisk, tone: overview.atRisk > 0 ? "warn" : "success" },
              { label: "Avg Overdue Days", value: `${overview.avgOverdue}d`, tone: "info" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-gray-200/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{s.label}</p>
                  <Pill tone={s.tone}>Live</Pill>
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
            subtitle="Filter escalations by status, level, and department"
            action={
              <div className="flex items-center gap-2">
                {/* View toggle */}
                {["cards", "table"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-3.5 py-2 rounded-2xl text-sm font-semibold ring-1 transition ${view === v ? "text-white ring-transparent" : "bg-gray-50 text-gray-700 ring-black/5 hover:bg-gray-100"
                      }`}
                    style={view === v ? { backgroundColor: "var(--primary-blue)" } : {}}
                  >
                    {v === "cards" ? "Cards" : "Table"}
                  </button>
                ))}
              </div>
            }
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="ESCALATED">Escalated</option>
                <option value="OVERDUE">Overdue</option>
                <option value="AT_RISK">At Risk</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Escalation Level</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="LEVEL_1">Level 1 – At Risk</option>
                <option value="LEVEL_2">Level 2 – Overdue</option>
                <option value="LEVEL_3">Level 3 – Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Escalation Workflow Info */}
        <Card className="p-6">
          <SectionTitle title="Escalation Workflow" subtitle="How tasks are escalated to higher management" />
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { level: "Level 1", label: "At Risk (≤3 days)", color: "var(--secondary-blue)", desc: "Task approaching deadline. HOD monitors." },
              { level: "Level 2", label: "Overdue (1–6 days)", color: "#F59E0B", desc: "Task missed deadline. HOD action required." },
              { level: "Level 3", label: "Critical (7+ days)", color: "var(--accent-red)", desc: "Escalated to MD. Executive intervention needed." },
            ].map((w) => (
              <div key={w.level} className="p-4 rounded-2xl border border-gray-200/70 flex gap-4 items-start">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0"
                  style={{ backgroundColor: w.color }}
                >
                  {w.level.split(" ")[1]}
                </div>
                <div>
                  <div className="font-extrabold text-sm" style={{ color: "var(--primary-blue)" }}>{w.level} – {w.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Loading State */}
        {loading ? (
          <Card className="p-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
              <p className="text-gray-500 font-semibold">Loading real-time escalation data...</p>
            </div>
          </Card>
        ) : (
          <>
            {/* Cards View */}
            {view === "cards" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {filteredEscalations.length === 0 ? (
                  <div className="lg:col-span-2 p-12 text-center">
                    <div className="text-4xl mb-3">✅</div>
                    <div className="font-extrabold text-gray-900">No escalations found</div>
                    <p className="text-gray-500 text-sm mt-1">All tasks are on track for the selected filters.</p>
                  </div>
                ) : (
                  filteredEscalations.map((escalation) => (
                    <div
                      key={escalation.id}
                      className="p-5 rounded-2xl border bg-white transition hover:shadow-sm"
                      style={{
                        borderColor:
                          escalation.status === "OVERDUE" || escalation.status === "ESCALATED"
                            ? "rgba(237,50,55,0.25)"
                            : escalation.status === "AT_RISK"
                              ? "rgba(245,158,11,0.3)"
                              : "rgba(0,0,0,0.07)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-gray-500">{escalation.id}</span>
                          <Pill tone={getStatusTone(escalation.status)}>{escalation.status.replace("_", " ")}</Pill>
                          <Pill tone={getLevelTone(escalation.escalationLevel)}>{escalation.escalationLevel.replace("_", " ")}</Pill>
                          {escalation.actionRequired && <Pill tone="warn">⚡ Action Required</Pill>}
                        </div>
                        <Pill tone={getPriorityTone(escalation.priority)}>{escalation.priority}</Pill>
                      </div>

                      <h3 className="font-extrabold mt-3" style={{ color: "var(--primary-blue)" }}>
                        {escalation.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{escalation.description}</p>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                        <div className="p-2 rounded-xl bg-gray-50">
                          <span className="text-gray-500">Department</span>
                          <div className="font-bold text-gray-900 mt-0.5">{escalation.department}</div>
                        </div>
                        <div className="p-2 rounded-xl bg-gray-50">
                          <span className="text-gray-500">Assignee</span>
                          <div className="font-bold text-gray-900 mt-0.5">{escalation.assignee}</div>
                        </div>
                        <div className="p-2 rounded-xl bg-gray-50">
                          <span className="text-gray-500">Due Date</span>
                          <div className="font-bold text-gray-900 mt-0.5">{fmtDate(escalation.dueDate)}</div>
                        </div>
                        <div className={`p-2 rounded-xl ${escalation.overdueDays > 0 ? "bg-red-50" : "bg-amber-50"}`}>
                          <span className="text-gray-500">{escalation.overdueDays > 0 ? "Days Overdue" : "Days Until Due"}</span>
                          <div className={`font-bold mt-0.5 ${escalation.overdueDays > 0 ? "text-red-700" : "text-amber-700"}`}>
                            {Math.abs(escalation.overdueDays)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 rounded-2xl bg-blue-50/60 border border-blue-100">
                        <p className="text-xs text-gray-500 font-semibold">Next Action</p>
                        <p className="text-sm font-semibold text-gray-800 mt-0.5">{escalation.nextAction}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2">
                        <span className="text-xs text-gray-500">
                          Updated {fmtDate(escalation.lastUpdate)}
                        </span>
                        <div className="flex gap-2">
                          <Link href={`/hod-dashboard/task/${escalation.taskId}`}>
                            <button
                              className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white active:scale-[0.99] transition"
                              style={{ backgroundColor: "var(--secondary-blue)" }}
                            >
                              View Task
                            </button>
                          </Link>
                          {escalation.actionRequired && (
                            <button
                              onClick={() => handleReassign(escalation.id)}
                              className="px-3 py-1.5 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                              style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                            >
                              Reassign
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Table View */}
            {view === "table" && (
              <Card className="overflow-hidden">
                <div className="p-5 border-b border-gray-200/70">
                  <SectionTitle
                    title="Escalations Table"
                    subtitle={`${filteredEscalations.length} result(s)`}
                  />
                </div>

                <div className="hidden lg:block overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-200/70">
                      <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="px-5 py-3 text-left">Task</th>
                        <th className="px-5 py-3 text-left">Status</th>
                        <th className="px-5 py-3 text-left">Level</th>
                        <th className="px-5 py-3 text-left">Department</th>
                        <th className="px-5 py-3 text-left">Assignee</th>
                        <th className="px-5 py-3 text-left">Due Date</th>
                        <th className="px-5 py-3 text-left">Overdue</th>
                        <th className="px-5 py-3 text-left">Priority</th>
                        <th className="px-5 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/70 text-[12.5px]">
                      {filteredEscalations.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="px-5 py-10 text-center text-gray-500">No escalations found</td>
                        </tr>
                      ) : (
                        filteredEscalations.map((escalation) => (
                          <tr key={escalation.id} className="hover:bg-gray-50/70 transition">
                            <td className="px-5 py-3">
                              <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>{escalation.id}</div>
                              <div className="text-[12.5px] text-gray-700 mt-0.5 max-w-[200px] truncate">{escalation.title}</div>
                            </td>
                            <td className="px-5 py-3 whitespace-nowrap">
                              <Pill tone={getStatusTone(escalation.status)}>{escalation.status.replace("_", " ")}</Pill>
                            </td>
                            <td className="px-5 py-3 whitespace-nowrap">
                              <Pill tone={getLevelTone(escalation.escalationLevel)}>{escalation.escalationLevel.replace("_", " ")}</Pill>
                            </td>
                            <td className="px-5 py-3 whitespace-nowrap">{escalation.department}</td>
                            <td className="px-5 py-3 whitespace-nowrap">{escalation.assignee}</td>
                            <td className="px-5 py-3 whitespace-nowrap">{fmtDate(escalation.dueDate)}</td>
                            <td className="px-5 py-3 whitespace-nowrap">
                              {escalation.overdueDays > 0 ? (
                                <span className="text-red-600 font-bold">{escalation.overdueDays}d</span>
                              ) : (
                                <span className="text-amber-600 font-bold">{Math.abs(escalation.overdueDays)}d left</span>
                              )}
                            </td>
                            <td className="px-5 py-3 whitespace-nowrap">
                              <Pill tone={getPriorityTone(escalation.priority)}>{escalation.priority}</Pill>
                            </td>
                            <td className="px-5 py-3 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <Link href={`/hod-dashboard/task/${escalation.taskId}`}>
                                  <button
                                    className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white active:scale-[0.99] transition"
                                    style={{ backgroundColor: "var(--secondary-blue)" }}
                                  >
                                    View
                                  </button>
                                </Link>
                                {escalation.actionRequired && (
                                  <button
                                    onClick={() => handleReassign(escalation.id)}
                                    className="px-3 py-1.5 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                                    style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                                  >
                                    Reassign
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="lg:hidden p-4 text-sm text-gray-600">
                  Switch to <span className="font-semibold">Cards</span> view for mobile-friendly layout.
                </div>
              </Card>
            )}
          </>
        )}

        {/* Department-wise Breakdown */}
        {departments.length > 0 && (
          <Card className="p-6">
            <SectionTitle title="Escalations by Department" subtitle="Overview across departments" />
            <div className="mt-5 space-y-3">
              {departments.map((dept) => {
                const deptItems = escalationsData.filter((e) => e.department === dept);
                const overdueCount = deptItems.filter((e) => e.status === "OVERDUE").length;
                const level3Count = deptItems.filter((e) => e.escalationLevel === "LEVEL_3").length;
                const actionRequired = deptItems.filter((e) => e.actionRequired).length;

                return (
                  <div key={dept} className="rounded-2xl border border-gray-200/70 p-4 hover:bg-gray-50 transition">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: "var(--secondary-blue)" }}
                        >
                          {dept.charAt(0)}
                        </div>
                        <div>
                          <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>{dept}</div>
                          <div className="text-sm text-gray-500">{deptItems.length} total items</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm">
                            <span className="text-red-600 font-bold">{overdueCount}</span>{" "}
                            <span className="text-gray-500">overdue</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-red-600 font-bold">{level3Count}</span>{" "}
                            <span className="text-gray-500">critical</span>
                          </div>
                          {actionRequired > 0 && (
                            <div className="text-sm mt-1">
                              <span className="text-amber-600 font-bold">{actionRequired}</span>{" "}
                              <span className="text-gray-500">need action</span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => setSelectedDepartment(dept)}
                          className="px-4 py-2 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                          style={{ backgroundColor: "var(--primary-blue)" }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Prevention Tips */}
        <Card className="p-6 bg-blue-50/30">
          <SectionTitle title="Tips to Reduce Escalations" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Set realistic deadlines for tasks and approvals",
              "Monitor task progress regularly",
              "Send reminders before deadlines approach",
              "Reassign tasks when team members are overloaded",
              "Address resource constraints promptly",
              "Maintain clear communication with team members",
              "Review and update escalation thresholds periodically",
              "Document lessons learned from past escalations",
            ].map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <span style={{ color: "var(--primary-blue)" }}>•</span>
                <span className="text-sm text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
