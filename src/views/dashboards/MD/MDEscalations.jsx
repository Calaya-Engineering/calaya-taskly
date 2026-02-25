"use client";

// pages/dashboards/MD/MDEscalations.jsx
import { useState, useMemo } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
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
      : "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not set";

const escalationsData = [];

export default function MDEscalations() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("cards"); // cards or table

  const filteredEscalations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return escalationsData.filter((escalation) => {
      const matchesStatus = selectedStatus === "all" || escalation.status === selectedStatus;
      const matchesLevel = selectedLevel === "all" || escalation.escalationLevel === selectedLevel;
      const matchesSearch =
        !query ||
        escalation.id.toLowerCase().includes(query) ||
        escalation.title.toLowerCase().includes(query) ||
        escalation.department.toLowerCase().includes(query) ||
        escalation.assignee.toLowerCase().includes(query);
      return matchesStatus && matchesLevel && matchesSearch;
    });
  }, [selectedStatus, selectedLevel, searchQuery]);

  const overview = useMemo(() => {
    const total = escalationsData.length;
    const overdue = escalationsData.filter((e) => e.status === "OVERDUE").length;
    const atRisk = escalationsData.filter((e) => e.status === "AT_RISK").length;
    const level3 = escalationsData.filter((e) => e.escalationLevel === "LEVEL_3").length;
    const overdueItems = escalationsData.filter((e) => e.overdueDays > 0);
    const avgOverdue = overdueItems.length ? Math.round(overdueItems.reduce((sum, e) => sum + e.overdueDays, 0) / overdueItems.length) : 0;
    return { total, overdue, atRisk, level3, avgOverdue };
  }, []);

  const getStatusTone = (status) => {
    switch (status) {
      case "OVERDUE":
        return "danger";
      case "AT_RISK":
        return "warn";
      default:
        return "default";
    }
  };

  const getLevelTone = (level) => {
    switch (level) {
      case "LEVEL_3":
        return "danger";
      case "LEVEL_2":
        return "warn";
      case "LEVEL_1":
        return "info";
      default:
        return "default";
    }
  };

  const getLevelLabel = (level) => {
    switch (level) {
      case "LEVEL_3":
        return "Escalated to MD";
      case "LEVEL_2":
        return "Escalated to HOD";
      case "LEVEL_1":
        return "Warning Stage";
      default:
        return level;
    }
  };

  const getPriorityTone = (priority) => {
    switch (priority) {
      case "CRITICAL":
        return "danger";
      case "HIGH":
        return "warn";
      case "MEDIUM":
        return "info";
      default:
        return "success";
    }
  };

  const departments = useMemo(() => [...new Set(escalationsData.map((e) => e.department))], []);

  const handleReassign = (id) => {
    toast.info(`Reassigning escalation ${id}`);
  };

  const handleExtend = (id) => {
    toast.info(`Extending deadline for ${id}`);
  };

  const handleResolve = (id) => {
    toast.success(`Resolving escalation ${id}`);
  };

  const clearFilters = () => {
    setSelectedStatus("all");
    setSelectedLevel("all");
    setSearchQuery("");
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
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>Escalations & Overdue</Pill>
                  <Pill tone={overview.overdue > 0 ? "danger" : "success"}>{overview.overdue} Overdue</Pill>
                  {overview.atRisk > 0 && <Pill tone="warn">{overview.atRisk} At Risk</Pill>}
                  {overview.level3 > 0 && <Pill tone="danger">{overview.level3} Escalated to MD</Pill>}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Escalations & Overdue Tasks
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Monitor and resolve escalated tasks and overdue assignments across all departments
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex w-full sm:w-auto gap-2">
                  <button
                    className={`flex-1 sm:flex-none px-4 py-3 rounded-2xl font-semibold border transition ${
                      view === "cards" ? "bg-white" : "bg-gray-50"
                    }`}
                    style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                    onClick={() => setView("cards")}
                  >
                    Cards
                  </button>
                  <button
                    className={`flex-1 sm:flex-none px-4 py-3 rounded-2xl font-semibold border transition ${
                      view === "table" ? "bg-white" : "bg-gray-50"
                    }`}
                    style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                    onClick={() => setView("table")}
                  >
                    Table
                  </button>
                </div>
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

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 md:p-5 bg-white border-t border-gray-200/70">
            {[
              { label: "Total Escalations", value: overview.total, tone: "default" },
              { label: "Overdue", value: overview.overdue, tone: overview.overdue ? "danger" : "success" },
              { label: "At Risk", value: overview.atRisk, tone: overview.atRisk ? "warn" : "success" },
              { label: "Avg Overdue Days", value: overview.avgOverdue || 0, tone: "info" },
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
            subtitle="Filter escalations by status, level, and search"
            action={
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filteredEscalations.length}</span> of{" "}
                <span className="font-semibold text-gray-800">{escalationsData.length}</span>
              </div>
            }
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="OVERDUE">Overdue</option>
                <option value="AT_RISK">At Risk</option>
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
                <option value="LEVEL_3">Level 3 (MD)</option>
                <option value="LEVEL_2">Level 2 (HOD)</option>
                <option value="LEVEL_1">Level 1 (Warning)</option>
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

          {/* Quick Filter Chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedStatus("OVERDUE");
                setSelectedLevel("all");
              }}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-red-50 text-red-700 hover:bg-red-100 transition"
            >
              ⏰ Overdue Only
            </button>
            <button
              onClick={() => {
                setSelectedStatus("AT_RISK");
                setSelectedLevel("all");
              }}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-amber-50 text-amber-800 hover:bg-amber-100 transition"
            >
              ⚠️ At Risk Only
            </button>
            <button
              onClick={() => {
                setSelectedStatus("all");
                setSelectedLevel("LEVEL_3");
              }}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-red-50 text-red-700 hover:bg-red-100 transition"
            >
              👔 Escalated to MD
            </button>
            <button
              onClick={clearFilters}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 transition"
            >
              🔄 Clear All
            </button>
          </div>
        </Card>

        {/* Escalations List */}
        {view === "cards" ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredEscalations.map((escalation) => (
              <Card key={escalation.id} className="p-6 hover:-translate-y-0.5 transition-all">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        {escalation.id}
                      </span>
                      <Pill tone={getStatusTone(escalation.status)}>{escalation.status}</Pill>
                      <Pill tone={getLevelTone(escalation.escalationLevel)}>
                        {getLevelLabel(escalation.escalationLevel)}
                      </Pill>
                    </div>

                    <h3 className="mt-3 text-lg font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                      {escalation.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Task: {escalation.taskId}</p>
                  </div>

                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center  shrink-0"
                    style={{ backgroundColor: "rgba(237, 50, 55, 0.1)" }}
                  >
                    <span className="text-xl">⚠️</span>
                  </div>
                </div>

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
                      <p className="text-sm font-semibold">{escalation.assignee}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Due Date</p>
                    <p
                      className={`text-sm font-semibold mt-1 ${
                        escalation.overdueDays > 0 ? "text-red-600" : escalation.overdueDays < 0 ? "text-amber-600" : ""
                      }`}
                    >
                      {fmtDate(escalation.dueDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Priority</p>
                    <Pill tone={getPriorityTone(escalation.priority)} className="mt-1">
                      {escalation.priority}
                    </Pill>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-xl p-2">
                    <p className="text-xs text-gray-600">Assigned to:</p>
                    <p className="text-sm font-semibold">{escalation.assignedTo}</p>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-xl p-2">
                    <p className="text-xs text-gray-600">Comments</p>
                    <p className="text-sm font-semibold">{escalation.comments}</p>
                  </div>
                </div>

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
                    style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                  >
                    Reassign
                  </button>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleExtend(escalation.id)}
                    className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(16, 185, 129, 0.35)", color: "#10B981" }}
                  >
                    Extend Deadline
                  </button>
                  <button
                    onClick={() => handleResolve(escalation.id)}
                    className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "#10B981" }}
                  >
                    Mark Resolved
                  </button>
                </div>
              </Card>
            ))}

            {filteredEscalations.length === 0 && (
              <Card className="p-10 text-center xl:col-span-2">
                <div className="text-4xl">✅</div>
                <div className="mt-3 font-extrabold" style={{ color: "var(--primary-blue)" }}>
                  No escalations found
                </div>
                <div className="text-sm text-gray-500 mt-1">Try adjusting your filters or search criteria</div>
              </Card>
            )}
          </div>
        ) : (
          <Card className="overflow-hidden">
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200/70">
                  <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="px-5 py-3 text-left">Escalation</th>
                    <th className="px-5 py-3 text-left">Department</th>
                    <th className="px-5 py-3 text-left">Assignee</th>
                    <th className="px-5 py-3 text-left">Status/Level</th>
                    <th className="px-5 py-3 text-left">Due Date</th>
                    <th className="px-5 py-3 text-left">Priority</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200/70 text-[13px]">
                  {filteredEscalations.map((escalation) => (
                    <tr key={escalation.id} className="hover:bg-gray-50/70 transition">
                      <td className="px-5 py-3">
                        <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          {escalation.id}
                        </div>
                        <div className="text-[13px] font-semibold text-gray-900 mt-1">{escalation.title}</div>
                        <div className="text-[11px] text-gray-500">Task: {escalation.taskId}</div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <Pill>{escalation.department}</Pill>
                      </td>
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
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div className="space-y-1">
                          <Pill tone={getStatusTone(escalation.status)}>{escalation.status}</Pill>
                          <Pill tone={getLevelTone(escalation.escalationLevel)}>
                            {getLevelLabel(escalation.escalationLevel)}
                          </Pill>
                        </div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div
                          className={`text-[13px] font-semibold ${
                            escalation.overdueDays > 0 ? "text-red-600" : ""
                          }`}
                        >
                          {fmtDate(escalation.dueDate)}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {escalation.overdueDays > 0
                            ? `${escalation.overdueDays} days overdue`
                            : escalation.overdueDays < 0
                            ? `${Math.abs(escalation.overdueDays)} days left`
                            : "Due today"}
                        </div>
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
                          <button
                            onClick={() => handleReassign(escalation.id)}
                            className="px-3 py-1.5 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                            style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                          >
                            Reassign
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile fallback for table view */}
            <div className="lg:hidden p-4 text-sm text-gray-600">
              Switch to <span className="font-semibold">Cards</span> view for mobile-friendly layout.
            </div>
          </Card>
        )}

        {/* Department-wise Escalations */}
        <Card className="p-6">
          <SectionTitle title="Escalations by Department" subtitle="Overview of escalations across departments" />

          <div className="mt-5 space-y-3">
            {departments.map((dept) => {
              const deptEscalations = escalationsData.filter((e) => e.department === dept);
              const overdueCount = deptEscalations.filter((e) => e.status === "OVERDUE").length;
              const level3Count = deptEscalations.filter((e) => e.escalationLevel === "LEVEL_3").length;

              return (
                <div key={dept} className="rounded-2xl border border-gray-200/70 p-4 hover:bg-gray-50 transition">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold "
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        {dept.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          {dept}
                        </div>
                        <div className="text-sm text-gray-500">{deptEscalations.length} total escalations</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm">
                          <span className="text-red-600 font-bold">{overdueCount}</span>{" "}
                          <span className="text-gray-500">overdue</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-red-600 font-bold">{level3Count}</span>{" "}
                          <span className="text-gray-500">escalated to MD</span>
                        </div>
                      </div>

                      <button
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
      </div>
    </Layout>
  );
}