"use client";

// views/dashboards/MD/MDEscalations.jsx
import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
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
  if (status === "ESCALATED") return "danger";
  if (status === "OVERDUE") return "danger";
  if (status === "AT_RISK") return "warn";
  if (status === "RESOLVED") return "success";
  return "default";
};

const getLevelTone = (level) => {
  if (level === "LEVEL_3") return "danger";
  if (level === "LEVEL_2") return "warn";
  if (level === "LEVEL_1") return "info";
  return "default";
};

const getPriorityTone = (priority) => {
  if (priority === "CRITICAL" || priority === "URGENT") return "danger";
  if (priority === "HIGH") return "warn";
  if (priority === "MEDIUM") return "info";
  return "default";
};

const getLevelLabel = (level) => {
  if (level === "LEVEL_3") return "Critical (MD)";
  if (level === "LEVEL_2") return "Overdue (HOD)";
  if (level === "LEVEL_1") return "At Risk";
  return level;
};

// Map a raw API task into the escalation shape expected by the UI.
function mapTaskToEscalation(t) {
  const now = Date.now();
  const due = t.dueDate ? new Date(t.dueDate) : null;
  const overdueDays = due ? Math.ceil((now - due.getTime()) / 86400000) : 0;

  const status = t.escalated
    ? "ESCALATED"
    : overdueDays > 0
      ? "OVERDUE"
      : "AT_RISK";

  const escalationLevel = t.escalated
    ? "LEVEL_3"
    : overdueDays >= 7
      ? "LEVEL_3"
      : overdueDays > 0
        ? "LEVEL_2"
        : "LEVEL_1";

  return {
    id: `TSK-${t.id}`,
    taskId: String(t.id),
    dbId: t.id,
    title: t.title || "Untitled Task",
    type: "TASK",
    department: t.department || "—",
    assignee:
      t.assignments?.[0]?.user?.name ||
      t.assignments?.[0]?.user?.email ||
      "Unassigned",
    dueDate: t.dueDate ? t.dueDate.split("T")[0] : null,
    overdueDays,
    escalationLevel,
    status,
    priority: t.priority || "MEDIUM",
    assignedTo: t.escalated ? "MD" : "HOD",
    description: t.description || "No description",
    escalationReason: t.escalationReason || null,
    escalatedAt: t.escalatedAt || null,
    comments: 0,
    lastUpdate: t.updatedAt || t.createdAt,
    nextAction: t.escalated
      ? "Escalated to MD – requires resolution"
      : overdueDays > 0
        ? "Requires immediate attention"
        : "Monitor progress",
  };
}

// Tabs
const TABS = [
  { key: "escalated", label: "🚨 Escalated", tone: "danger" },
  { key: "overdue", label: "⏰ Overdue", tone: "warn" },
  { key: "at_risk", label: "⚠️ At Risk", tone: "info" },
  { key: "all", label: "All Items", tone: "default" },
];

export default function MDEscalations() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("escalated");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("cards");
  const [deescalating, setDeescalating] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/tasks?limit=200");
      if (res.ok) {
        const tasks = await res.json();
        const now = Date.now();
        // Include all tasks that are escalated, overdue, or at-risk (within 3 days)
        const relevant = (Array.isArray(tasks) ? tasks : []).filter((t) => {
          if (t.status === "COMPLETED" || t.status === "CANCELLED" || isTaskPendingApproval(t.status)) return false;
          if (t.escalated) return true;
          const due = t.dueDate ? new Date(t.dueDate) : null;
          if (!due) return false;
          const diffDays = Math.ceil((due.getTime() - now) / 86400000);
          return diffDays <= 3;
        });
        setAllData(relevant.map(mapTaskToEscalation));
      }
    } catch (e) {
      console.error("Failed to fetch escalations:", e);
      toast.error("Failed to load escalation data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Real-time updates
  useSSE("/api/tasks/events", (ev) => {
    if (ev.type?.startsWith("task:")) fetchData();
  });

  const departments = useMemo(
    () => [...new Set(allData.map((e) => e.department))],
    [allData]
  );

  // Tab-filtered data
  const tabFilteredData = useMemo(() => {
    if (activeTab === "escalated") return allData.filter((e) => e.status === "ESCALATED");
    if (activeTab === "overdue") return allData.filter((e) => e.status === "OVERDUE");
    if (activeTab === "at_risk") return allData.filter((e) => e.status === "AT_RISK");
    return allData;
  }, [allData, activeTab]);

  // Apply secondary filters
  const filteredEscalations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return tabFilteredData.filter((escalation) => {
      const matchesLevel = selectedLevel === "all" || escalation.escalationLevel === selectedLevel;
      const matchesDept = selectedDepartment === "all" || escalation.department === selectedDepartment;
      const matchesSearch =
        !query ||
        escalation.id.toLowerCase().includes(query) ||
        escalation.title.toLowerCase().includes(query) ||
        escalation.department.toLowerCase().includes(query) ||
        escalation.assignee.toLowerCase().includes(query);
      return matchesLevel && matchesDept && matchesSearch;
    });
  }, [tabFilteredData, selectedLevel, selectedDepartment, searchQuery]);

  const overview = useMemo(() => {
    const total = allData.length;
    const escalated = allData.filter((e) => e.status === "ESCALATED").length;
    const overdue = allData.filter((e) => e.status === "OVERDUE").length;
    const atRisk = allData.filter((e) => e.status === "AT_RISK").length;
    const avgOverdue =
      total > 0
        ? Math.round(allData.reduce((sum, e) => sum + Math.max(0, e.overdueDays), 0) / total)
        : 0;
    return { total, escalated, overdue, atRisk, avgOverdue };
  }, [allData]);

  const clearFilters = () => {
    setSelectedLevel("all");
    setSelectedDepartment("all");
    setSearchQuery("");
  };

  const handleDeescalate = async (escalation) => {
    if (!window.confirm(`De-escalate task "${escalation.title}"?`)) return;
    setDeescalating(escalation.dbId);
    try {
      const res = await fetchWithAuth(`/api/tasks/${escalation.dbId}/escalate`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success(`Task "${escalation.title}" has been de-escalated.`);
        fetchData();
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to de-escalate task");
      }
    } catch (e) {
      toast.error("Network error. Please try again.");
    } finally {
      setDeescalating(null);
    }
  };

  const handleReassign = (id) => {
    toast.info(`Reassigning task ${id} — connect to your reassign API.`);
  };

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="space-y-6">
        {/* Hero Section */}
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
                  <Pill>MD Escalations Center</Pill>
                  {overview.escalated > 0 && (
                    <Pill tone="danger">🚨 {overview.escalated} Escalated</Pill>
                  )}
                  {overview.overdue > 0 && (
                    <Pill tone="warn">{overview.overdue} Overdue</Pill>
                  )}
                  {overview.atRisk > 0 && (
                    <Pill tone="info">{overview.atRisk} At Risk</Pill>
                  )}
                </div>
                <h1
                  className="text-2xl md:text-3xl font-extrabold tracking-tight"
                  style={{ color: "var(--primary-blue)" }}
                >
                  Escalations & Overdue Tasks
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Monitor and resolve tasks escalated by HODs, overdue assignments, and at-risk items
                  across all departments.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex w-full sm:w-auto gap-2">
                  {["cards", "table"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`flex-1 sm:flex-none px-4 py-3 rounded-2xl font-semibold border transition ${view === v ? "bg-white" : "bg-gray-50"
                        }`}
                      style={{ borderColor: "rgba(109,198,223,0.7)", color: "var(--primary-blue)" }}
                    >
                      {v === "cards" ? "Cards" : "Table"}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => fetchData()}
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
              { label: "Escalated to MD", value: overview.escalated, tone: overview.escalated > 0 ? "danger" : "success" },
              { label: "Overdue", value: overview.overdue, tone: overview.overdue > 0 ? "warn" : "success" },
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

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const count =
              tab.key === "escalated"
                ? overview.escalated
                : tab.key === "overdue"
                  ? overview.overdue
                  : tab.key === "at_risk"
                    ? overview.atRisk
                    : overview.total;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 rounded-2xl font-semibold text-sm ring-1 transition ${isActive
                    ? "text-white ring-transparent"
                    : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50"
                  }`}
                style={isActive ? { backgroundColor: "var(--primary-blue)" } : {}}
              >
                {tab.label}
                <span
                  className={`ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <Card className="p-6">
          <SectionTitle
            title="Filters"
            subtitle="Narrow down by escalation level, department, or search"
            action={
              <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-800">{filteredEscalations.length}</span> of{" "}
                <span className="font-semibold text-gray-800">{tabFilteredData.length}</span>
              </div>
            }
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Escalation Level</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="LEVEL_3">Level 3 – Critical (MD)</option>
                <option value="LEVEL_2">Level 2 – Overdue (HOD)</option>
                <option value="LEVEL_1">Level 1 – At Risk</option>
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
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Search by ID, title, department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => { setActiveTab("escalated"); clearFilters(); }}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-red-50 text-red-700 hover:bg-red-100 transition"
            >
              🚨 Escalated Only
            </button>
            <button
              onClick={() => { setActiveTab("overdue"); clearFilters(); }}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-amber-50 text-amber-800 hover:bg-amber-100 transition"
            >
              ⏰ Overdue Only
            </button>
            <button
              onClick={() => { setActiveTab("at_risk"); clearFilters(); }}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
            >
              ⚠️ At Risk Only
            </button>
            <button
              onClick={() => { setActiveTab("all"); clearFilters(); }}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 transition"
            >
              🔄 Clear All
            </button>
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
            {/* Escalated Tab — De-escalate notice banner */}
            {activeTab === "escalated" && filteredEscalations.length > 0 && (
              <div
                className="flex items-start gap-3 p-4 rounded-2xl border text-sm font-medium"
                style={{
                  backgroundColor: "rgba(237,50,55,0.06)",
                  borderColor: "rgba(237,50,55,0.2)",
                  color: "#991b1b",
                }}
              >
                <span className="text-lg">🚨</span>
                <div>
                  <span className="font-bold">
                    {filteredEscalations.length} task{filteredEscalations.length !== 1 ? "s" : ""} escalated to you.
                  </span>{" "}
                  These were escalated by HODs and require your direct attention or resolution. You can de-escalate tasks
                  once addressed.
                </div>
              </div>
            )}

            {/* Cards View */}
            {view === "cards" && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredEscalations.length === 0 ? (
                  <Card className="p-10 text-center xl:col-span-2">
                    <div className="text-4xl">
                      {activeTab === "escalated" ? "✅" : "📋"}
                    </div>
                    <div
                      className="mt-3 font-extrabold"
                      style={{ color: "var(--primary-blue)" }}
                    >
                      {activeTab === "escalated"
                        ? "No escalated tasks"
                        : "No items found"}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {activeTab === "escalated"
                        ? "No tasks have been escalated to you. Well done!"
                        : "Try adjusting your filters or search criteria."}
                    </div>
                  </Card>
                ) : (
                  filteredEscalations.map((escalation) => (
                    <Card
                      key={escalation.id}
                      className="p-6 hover:-translate-y-0.5 transition-all"
                      style={{
                        borderColor:
                          escalation.status === "ESCALATED"
                            ? "rgba(237,50,55,0.3)"
                            : escalation.status === "OVERDUE"
                              ? "rgba(245,158,11,0.3)"
                              : "rgba(0,0,0,0.07)",
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="text-sm font-extrabold"
                              style={{ color: "var(--primary-blue)" }}
                            >
                              {escalation.id}
                            </span>
                            <Pill tone={getStatusTone(escalation.status)}>
                              {escalation.status.replace("_", " ")}
                            </Pill>
                            <Pill tone={getLevelTone(escalation.escalationLevel)}>
                              {getLevelLabel(escalation.escalationLevel)}
                            </Pill>
                          </div>
                          <h3
                            className="mt-3 text-lg font-extrabold tracking-tight"
                            style={{ color: "var(--primary-blue)" }}
                          >
                            {escalation.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {escalation.description}
                          </p>
                        </div>
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor:
                              escalation.status === "ESCALATED"
                                ? "rgba(237,50,55,0.1)"
                                : "rgba(245,158,11,0.1)",
                          }}
                        >
                          <span className="text-xl">
                            {escalation.status === "ESCALATED" ? "🚨" : "⚠️"}
                          </span>
                        </div>
                      </div>

                      {/* Escalation reason (only for escalated tasks) */}
                      {escalation.status === "ESCALATED" && escalation.escalationReason && (
                        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100">
                          <p className="text-xs font-semibold text-red-700">Escalation Reason:</p>
                          <p className="text-sm text-red-800 mt-0.5">{escalation.escalationReason}</p>
                          {escalation.escalatedAt && (
                            <p className="text-xs text-red-500 mt-1">
                              Escalated on {fmtDate(escalation.escalatedAt)}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Meta grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-gray-200/70 p-3">
                          <p className="text-xs text-gray-500">Department</p>
                          <p className="text-sm font-semibold mt-1">{escalation.department}</p>
                        </div>
                        <div className="rounded-xl border border-gray-200/70 p-3">
                          <p className="text-xs text-gray-500">Assignee</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div
                              className="w-6 h-6 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                              style={{ backgroundColor: "var(--secondary-blue)" }}
                            >
                              {escalation.assignee.charAt(0)}
                            </div>
                            <p className="text-sm font-semibold truncate">{escalation.assignee}</p>
                          </div>
                        </div>
                        <div className="rounded-xl border border-gray-200/70 p-3">
                          <p className="text-xs text-gray-500">Due Date</p>
                          <p
                            className={`text-sm font-semibold mt-1 ${escalation.overdueDays > 0 ? "text-red-600" : "text-amber-600"
                              }`}
                          >
                            {fmtDate(escalation.dueDate)}
                          </p>
                        </div>
                        <div
                          className={`rounded-xl p-3 ${escalation.overdueDays > 0 ? "bg-red-50" : "bg-amber-50"
                            }`}
                        >
                          <p className="text-xs text-gray-500">
                            {escalation.overdueDays > 0 ? "Days Overdue" : "Days Until Due"}
                          </p>
                          <p
                            className={`text-sm font-bold mt-1 ${escalation.overdueDays > 0 ? "text-red-700" : "text-amber-700"
                              }`}
                          >
                            {Math.abs(escalation.overdueDays)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-xl p-2">
                          <p className="text-xs text-gray-600">Priority</p>
                          <Pill tone={getPriorityTone(escalation.priority)}>
                            {escalation.priority}
                          </Pill>
                        </div>
                        <div className="flex-1 bg-gray-100 rounded-xl p-2">
                          <p className="text-xs text-gray-600">Next Action</p>
                          <p className="text-sm font-semibold text-gray-800 line-clamp-1">{escalation.nextAction}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex items-center gap-2">
                        <Link href={`/md-dashboard/task/${escalation.taskId}`} className="flex-1">
                          <button
                            className="w-full px-4 py-2.5 rounded-2xl font-semibold text-sm text-white active:scale-[0.99] transition"
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            View Task
                          </button>
                        </Link>
                        <button
                          onClick={() => handleReassign(escalation.id)}
                          className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                          style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                        >
                          Reassign
                        </button>
                      </div>

                      {/* De-escalate for MD */}
                      {escalation.status === "ESCALATED" && (
                        <div className="mt-2">
                          <button
                            onClick={() => handleDeescalate(escalation)}
                            disabled={deescalating === escalation.dbId}
                            className="w-full px-4 py-2.5 rounded-2xl font-semibold text-sm text-white active:scale-[0.99] transition disabled:opacity-60"
                            style={{ backgroundColor: "#10B981" }}
                          >
                            {deescalating === escalation.dbId ? "De-escalating..." : "✅ Mark Resolved / De-escalate"}
                          </button>
                        </div>
                      )}
                    </Card>
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
                    <tbody className="divide-y divide-gray-200/70 text-[13px]">
                      {filteredEscalations.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="px-5 py-10 text-center text-gray-500">
                            {activeTab === "escalated"
                              ? "No escalated tasks — all clear! ✅"
                              : "No items found for the selected filters."}
                          </td>
                        </tr>
                      ) : (
                        filteredEscalations.map((escalation) => (
                          <tr key={escalation.id} className="hover:bg-gray-50/70 transition">
                            <td className="px-5 py-3">
                              <div
                                className="font-extrabold"
                                style={{ color: "var(--primary-blue)" }}
                              >
                                {escalation.id}
                              </div>
                              <div className="text-[13px] font-semibold text-gray-900 mt-0.5 max-w-[200px] truncate">
                                {escalation.title}
                              </div>
                              {escalation.escalationReason && (
                                <div className="text-[11px] text-red-500 mt-0.5 max-w-[200px] truncate">
                                  Reason: {escalation.escalationReason}
                                </div>
                              )}
                            </td>
                            <td className="px-5 py-3 whitespace-nowrap">
                              <Pill tone={getStatusTone(escalation.status)}>
                                {escalation.status.replace("_", " ")}
                              </Pill>
                            </td>
                            <td className="px-5 py-3 whitespace-nowrap">
                              <Pill tone={getLevelTone(escalation.escalationLevel)}>
                                {getLevelLabel(escalation.escalationLevel)}
                              </Pill>
                            </td>
                            <td className="px-5 py-3 whitespace-nowrap">{escalation.department}</td>
                            <td className="px-5 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-7 h-7 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                                  style={{ backgroundColor: "var(--secondary-blue)" }}
                                >
                                  {escalation.assignee.charAt(0)}
                                </div>
                                <div>
                                  <div className="text-[13px] font-semibold">{escalation.assignee}</div>
                                  <div className="text-[11px] text-gray-500">→ {escalation.assignedTo}</div>
                                </div>
                              </div>
                            </td>
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
                                <Link href={`/md-dashboard/task/${escalation.taskId}`}>
                                  <button
                                    className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white active:scale-[0.99] transition"
                                    style={{ backgroundColor: "var(--secondary-blue)" }}
                                  >
                                    View
                                  </button>
                                </Link>
                                {escalation.status === "ESCALATED" && (
                                  <button
                                    onClick={() => handleDeescalate(escalation)}
                                    disabled={deescalating === escalation.dbId}
                                    className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white active:scale-[0.99] transition disabled:opacity-60"
                                    style={{ backgroundColor: "#10B981" }}
                                  >
                                    {deescalating === escalation.dbId ? "..." : "De-escalate"}
                                  </button>
                                )}
                                <button
                                  onClick={() => handleReassign(escalation.id)}
                                  className="px-3 py-1.5 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                                  style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                                >
                                  Reassign
                                </button>
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

            {/* Dept Breakdown */}
            {departments.length > 0 && (
              <Card className="p-6">
                <SectionTitle title="Escalations by Department" subtitle="Overview across departments" />
                <div className="mt-5 space-y-3">
                  {departments.map((dept) => {
                    const deptItems = allData.filter((e) => e.department === dept);
                    const escalatedCount = deptItems.filter((e) => e.status === "ESCALATED").length;
                    const overdueCount = deptItems.filter((e) => e.status === "OVERDUE").length;

                    return (
                      <div
                        key={dept}
                        className="rounded-2xl border border-gray-200/70 p-4 hover:bg-gray-50 transition"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold"
                              style={{ backgroundColor: "var(--secondary-blue)" }}
                            >
                              {dept.charAt(0)}
                            </div>
                            <div>
                              <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                                {dept}
                              </div>
                              <div className="text-sm text-gray-500">{deptItems.length} total items</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              {escalatedCount > 0 && (
                                <div className="text-sm">
                                  <span className="text-red-600 font-bold">{escalatedCount}</span>{" "}
                                  <span className="text-gray-500">escalated to MD</span>
                                </div>
                              )}
                              {overdueCount > 0 && (
                                <div className="text-sm">
                                  <span className="text-amber-600 font-bold">{overdueCount}</span>{" "}
                                  <span className="text-gray-500">overdue</span>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => setSelectedDepartment(dept)}
                              className="px-4 py-2 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                              style={{ backgroundColor: "var(--primary-blue)" }}
                            >
                              Filter
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
