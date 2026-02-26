"use client";

// pages/dashboards/HOD/HODEscalations.jsx
import { useState, useMemo } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
import { SearchIcon, getIconByKey } from "@/lib/icons";
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

const escalationsData = [
  {
    id: "ESC-001",
    taskId: "TASK-2024-00127",
    title: "Pipeline Safety Inspection Overdue",
    type: "TASK_OVERDUE",
    department: "Technical",
    assignee: "Alex Johnson",
    dueDate: "2024-12-10",
    overdueDays: 5,
    escalationLevel: "LEVEL_2",
    status: "OVERDUE",
    priority: "CRITICAL",
    assignedTo: "HOD - Technical",
    description: "Safety inspection report not submitted by deadline",
    comments: 3,
    lastReminder: "2024-12-12",
    nextAction: "Escalate to MD if not completed by tomorrow",
    actionRequired: true,
    lastUpdate: "2024-12-14T16:30:00",
  },
  {
    id: "ESC-002",
    taskId: "TASK-2024-00128",
    title: "Workshop Equipment Calibration",
    type: "TASK_OVERDUE",
    department: "Workshop",
    assignee: "David Chen",
    dueDate: "2024-12-08",
    overdueDays: 7,
    escalationLevel: "LEVEL_3",
    status: "OVERDUE",
    priority: "HIGH",
    assignedTo: "MD",
    description: "Equipment calibration overdue, affecting workshop operations",
    comments: 5,
    lastReminder: "2024-12-10",
    nextAction: "Reassign task to backup technician",
    actionRequired: true,
    lastUpdate: "2024-12-14T14:15:00",
  },
  {
    id: "ESC-003",
    taskId: "TASK-2024-00129",
    title: "Safety Training Completion",
    type: "TASK_OVERDUE",
    department: "Technical",
    assignee: "Emma Wilson",
    dueDate: "2024-12-05",
    overdueDays: 10,
    escalationLevel: "LEVEL_3",
    status: "ESCALATED",
    priority: "HIGH",
    assignedTo: "MD",
    description: "Mandatory safety training not completed by team",
    comments: 2,
    lastReminder: "2024-12-09",
    nextAction: "Escalated to MD for disciplinary action",
    actionRequired: false,
    lastUpdate: "2024-12-13T11:45:00",
  },
  {
    id: "ESC-004",
    taskId: "TASK-2024-00130",
    title: "Monthly Maintenance Report",
    type: "REPORT_OVERDUE",
    department: "Technical",
    assignee: "Michael Brown",
    dueDate: "2024-12-01",
    overdueDays: 14,
    escalationLevel: "LEVEL_3",
    status: "RESOLVED",
    priority: "MEDIUM",
    assignedTo: "HOD - Technical",
    description: "Monthly maintenance report submission overdue",
    comments: 4,
    lastReminder: "2024-12-05",
    nextAction: "Task reassigned to deputy",
    actionRequired: false,
    lastUpdate: "2024-12-12T09:20:00",
  },
  {
    id: "ESC-005",
    taskId: "TASK-2024-00131",
    title: "Budget Approval Pending",
    type: "APPROVAL_OVERDUE",
    department: "Workshop",
    assignee: "HOD - Technical",
    dueDate: "2024-12-13",
    overdueDays: 2,
    escalationLevel: "LEVEL_1",
    status: "OVERDUE",
    priority: "HIGH",
    assignedTo: "HOD - Technical",
    description: "Budget approval pending for workshop equipment purchase",
    comments: 1,
    lastReminder: "2024-12-14",
    nextAction: "Send final reminder",
    actionRequired: true,
    lastUpdate: "2024-12-15T08:30:00",
  },
  {
    id: "ESC-006",
    taskId: "TASK-2024-00132",
    title: "Project Documentation",
    type: "DOCUMENT_OVERDUE",
    department: "Technical",
    assignee: "Sarah Taylor",
    dueDate: "2024-12-11",
    overdueDays: 4,
    escalationLevel: "LEVEL_2",
    status: "OVERDUE",
    priority: "MEDIUM",
    assignedTo: "HOD - Technical",
    description: "Project documentation not updated as required",
    comments: 2,
    lastReminder: "2024-12-13",
    nextAction: "Set meeting to review progress",
    actionRequired: true,
    lastUpdate: "2024-12-14T10:15:00",
  },
  {
    id: "ESC-007",
    taskId: "TASK-2024-00133",
    title: "Quarterly Safety Audit",
    type: "TASK_OVERDUE",
    department: "HSE",
    assignee: "John Miller",
    dueDate: "2024-12-18",
    overdueDays: -4,
    escalationLevel: "LEVEL_1",
    status: "AT_RISK",
    priority: "CRITICAL",
    assignedTo: "HOD - HSE",
    description: "Safety audit approaching deadline",
    comments: 2,
    lastReminder: "2024-12-14",
    nextAction: "Send reminder to team",
    actionRequired: true,
    lastUpdate: "2024-12-14T13:45:00",
  },
];

export default function HODEscalations() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("cards"); // cards or table

  const departments = useMemo(() => [...new Set(escalationsData.map((e) => e.department))], []);

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
  }, [selectedStatus, selectedLevel, selectedDepartment, searchQuery]);

  const overview = useMemo(() => {
    const total = escalationsData.length;
    const overdue = escalationsData.filter((e) => e.status === "OVERDUE").length;
    const atRisk = escalationsData.filter((e) => e.status === "AT_RISK").length;
    const escalated = escalationsData.filter((e) => e.escalationLevel === "LEVEL_3").length;
    const actionRequired = escalationsData.filter((e) => e.actionRequired).length;
    const avgOverdue = Math.round(
      escalationsData.filter((e) => e.overdueDays > 0).reduce((sum, e) => sum + e.overdueDays, 0) / overdue || 0
    );
    return { total, overdue, atRisk, escalated, actionRequired, avgOverdue };
  }, []);

  const getStatusTone = (status) => {
    switch (status) {
      case "OVERDUE":
        return "danger";
      case "AT_RISK":
        return "warn";
      case "ESCALATED":
        return "danger";
      case "RESOLVED":
        return "success";
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
        return "Critical (MD)";
      case "LEVEL_2":
        return "Escalated to MD";
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

  const getTypeIconKey = (type) => {
    switch (type) {
      case "TASK_OVERDUE":
        return "task";
      case "REPORT_OVERDUE":
        return "chart";
      case "APPROVAL_OVERDUE":
        return "check";
      case "DOCUMENT_OVERDUE":
        return "document";
      default:
        return "warning";
    }
  };

  const handleReassign = (id) => {
    toast.info(`Reassigning escalation ${id}`);
  };

  const handleExtend = (id) => {
    const newDate = prompt('Enter new deadline (YYYY-MM-DD):');
    if (newDate) {
      toast.info(`Deadline extended to ${newDate} for escalation ${id}`);
    }
  };

  const handleResolve = (id) => {
    toast.success(`Marking escalation ${id} as resolved`);
  };

  const handleEscalate = (id) => {
    toast.info(`Escalating ${id} to MD`);
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
                  {overview.actionRequired > 0 && <Pill tone="danger">{overview.actionRequired} Need Action</Pill>}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Escalations & Overdue Tasks
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Monitor and resolve escalated tasks and overdue assignments in your department
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex w-full sm:w-auto gap-2">
                  <button
                    className={`flex-1 sm:flex-none px-4 py-3 rounded-2xl font-semibold border transition ${view === "cards" ? "bg-white" : "bg-gray-50"
                      }`}
                    style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                    onClick={() => setView("cards")}
                  >
                    Cards
                  </button>
                  <button
                    className={`flex-1 sm:flex-none px-4 py-3 rounded-2xl font-semibold border transition ${view === "table" ? "bg-white" : "bg-gray-50"
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
              { label: "Need Action", value: overview.actionRequired, tone: overview.actionRequired ? "danger" : "success" },
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

        {/* Alert Banner - Only show if action required */}
        {overview.actionRequired > 0 && (
          <Card className="border-red-200 bg-red-50/30 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getIconByKey("alert", "w-6 h-6")}
                <div>
                  <h3 className="font-extrabold text-red-800">Immediate Action Required!</h3>
                  <p className="text-red-600 text-sm">{overview.actionRequired} item(s) require your immediate attention</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStatus("OVERDUE")}
                className="px-4 py-2 rounded-xl font-semibold text-sm bg-red-500 text-white hover:bg-red-600 transition"
              >
                View Items
              </button>
            </div>
          </Card>
        )}

        {/* Filters */}
        <Card className="p-6">
          <SectionTitle
            title="Filters"
            subtitle="Filter escalations by status, level, department, and search"
            action={
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filteredEscalations.length}</span> of{" "}
                <span className="font-semibold text-gray-800">{escalationsData.length}</span>
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
                <option value="OVERDUE">Overdue</option>
                <option value="AT_RISK">At Risk</option>
                <option value="ESCALATED">Escalated</option>
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
                <option value="LEVEL_3">Level 3 (Critical - MD)</option>
                <option value="LEVEL_2">Level 2 (Escalated to MD)</option>
                <option value="LEVEL_1">Level 1 (Warning)</option>
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
                {departments.map((dept) => (
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
                  placeholder="Search by ID, title, assignee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
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
              {getIconByKey("clock", "w-4 h-4 inline-block mr-1 align-middle")} Overdue Only
            </button>
            <button
              onClick={() => {
                setSelectedStatus("AT_RISK");
                setSelectedLevel("all");
              }}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-amber-50 text-amber-800 hover:bg-amber-100 transition"
            >
              {getIconByKey("warning", "w-4 h-4 inline-block mr-1 align-middle")} At Risk Only
            </button>
            <button
              onClick={() => {
                setSelectedStatus("all");
                setSelectedLevel("LEVEL_3");
              }}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-red-50 text-red-700 hover:bg-red-100 transition"
            >
              {getIconByKey("briefcase", "w-4 h-4 inline-block mr-1 align-middle")} Critical (MD)
            </button>
            <button
              onClick={() => {
                setSelectedStatus("all");
                setSelectedLevel("all");
                setSelectedDepartment("Technical");
              }}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
            >
              {getIconByKey("settings", "w-4 h-4 inline-block mr-1 align-middle")} Technical Dept
            </button>
            <button
              onClick={clearFilters}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 transition"
            >
              {getIconByKey("refresh", "w-4 h-4 inline-block mr-1 align-middle")} Clear All
            </button>
          </div>
        </Card>

        {/* Escalation Workflow Steps */}
        <Card className="p-6">
          <SectionTitle title="Escalation Workflow" subtitle="Current status of escalation levels" />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { level: "Level 1", label: "Staff → HOD", count: escalationsData.filter(e => e.escalationLevel === "LEVEL_1").length, color: "var(--primary-blue)", bg: "bg-blue-50", border: "border-blue-200" },
              { level: "Level 2", label: "HOD → MD", count: escalationsData.filter(e => e.escalationLevel === "LEVEL_2").length, color: "#F97316", bg: "bg-orange-50", border: "border-orange-200" },
              { level: "Level 3", label: "Critical", count: escalationsData.filter(e => e.escalationLevel === "LEVEL_3").length, color: "#EF4444", bg: "bg-red-50", border: "border-red-200" },
            ].map((level, index) => (
              <div key={index} className={`p-5 rounded-2xl border ${level.border} ${level.bg} text-center`}>
                <div className="text-3xl font-extrabold mb-2" style={{ color: level.color }}>{index + 1}</div>
                <h3 className="font-extrabold" style={{ color: level.color }}>{level.level}</h3>
                <p className="text-sm text-gray-600 mt-1">{level.label}</p>
                <div className="mt-3 text-2xl font-extrabold" style={{ color: level.color }}>
                  {level.count}
                </div>
                <p className="text-xs text-gray-500 mt-1">items at this level</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Escalations List */}
        {view === "cards" ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredEscalations.map((escalation) => (
              <Card key={escalation.id} className={`p-6 hover:-translate-y-0.5 transition-all ${escalation.actionRequired ? "border-l-4" : ""}`}
                style={escalation.actionRequired ? { borderLeftColor: "var(--accent-red)" } : {}}>
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
                    <p className="text-sm text-gray-600 mt-1">{escalation.description}</p>
                    <p className="text-xs text-gray-500 mt-2">Task: {escalation.taskId}</p>
                  </div>

                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center  shrink-0"
                    style={{ backgroundColor: escalation.actionRequired ? "rgba(237, 50, 55, 0.1)" : "rgba(109, 198, 223, 0.1)" }}
                  >
                    {getIconByKey(getTypeIconKey(escalation.type), "w-6 h-6")}
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
                      className={`text-sm font-semibold mt-1 ${escalation.overdueDays > 0 ? "text-red-600" : escalation.overdueDays < 0 ? "text-amber-600" : ""
                        }`}
                    >
                      {fmtDate(escalation.dueDate)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {escalation.overdueDays > 0
                        ? `${escalation.overdueDays} days overdue`
                        : escalation.overdueDays < 0
                          ? `${Math.abs(escalation.overdueDays)} days left`
                          : "Due today"}
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
                    <p className="text-xs text-gray-600">Next Action:</p>
                    <p className="text-sm font-semibold" style={{ color: escalation.actionRequired ? "var(--accent-red)" : "var(--primary-blue)" }}>
                      {escalation.nextAction}
                    </p>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-xl p-2">
                    <p className="text-xs text-gray-600">Comments</p>
                    <p className="text-sm font-semibold">{escalation.comments}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <Link href={`/hod-dashboard/task/${escalation.taskId}`} className="flex-1">
                    <button
                      className="w-full px-4 py-2.5 rounded-2xl font-semibold text-sm text-white active:scale-[0.99] transition"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      View Task
                    </button>
                  </Link>

                  {escalation.actionRequired ? (
                    <>
                      <button
                        onClick={() => handleReassign(escalation.id)}
                        className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                        style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                      >
                        Reassign
                      </button>
                    </>
                  ) : (
                    <button
                      className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm border bg-gray-50 text-gray-500 cursor-not-allowed"
                      disabled
                    >
                      Action Taken
                    </button>
                  )}
                </div>

                {escalation.actionRequired && (
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleExtend(escalation.id)}
                      className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(16, 185, 129, 0.35)", color: "#10B981" }}
                    >
                      Extend Deadline
                    </button>
                    {escalation.escalationLevel !== "LEVEL_3" && (
                      <button
                        onClick={() => handleEscalate(escalation.id)}
                        className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm border bg-white hover:bg-red-50 active:scale-[0.99] transition"
                        style={{ borderColor: "rgba(237, 50, 55, 0.35)", color: "var(--accent-red)" }}
                      >
                        Escalate to MD
                      </button>
                    )}
                    <button
                      onClick={() => handleResolve(escalation.id)}
                      className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm text-white active:scale-[0.99] transition"
                      style={{ backgroundColor: "#10B981" }}
                    >
                      Mark Resolved
                    </button>
                  </div>
                )}
              </Card>
            ))}

            {filteredEscalations.length === 0 && (
              <Card className="p-10 text-center xl:col-span-2">
                <div className="flex justify-center">{getIconByKey("check", "w-16 h-16 text-green-600")}</div>
                <div className="mt-3 font-extrabold" style={{ color: "var(--primary-blue)" }}>
                  No escalations found
                </div>
                <div className="text-sm text-gray-500 mt-1">Great job! All items are under control</div>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-5 py-2.5 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition inline-flex items-center gap-2"
                  style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                >
                  {getIconByKey("refresh", "w-4 h-4")} Clear Filters
                </button>
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
                    <tr key={escalation.id} className={`hover:bg-gray-50/70 transition ${escalation.actionRequired ? "bg-red-50/20" : ""}`}>
                      <td className="px-5 py-3">
                        <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          {escalation.id}
                        </div>
                        <div className="text-[13px] font-semibold text-gray-900 mt-1">{escalation.title}</div>
                        <div className="text-[11px] text-gray-500 mt-1">{escalation.description.substring(0, 40)}...</div>
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
                          className={`text-[13px] font-semibold ${escalation.overdueDays > 0 ? "text-red-600" : ""
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
              const actionRequired = deptEscalations.filter((e) => e.actionRequired).length;

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
                            <span className="text-red-600 font-bold">{actionRequired}</span>{" "}
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

        {/* Prevention Tips */}
        <Card className="p-6 bg-blue-50/30">
          <SectionTitle title={<> {getIconByKey("lightbulb", "w-5 h-5 inline-block align-middle mr-1")} Tips to Reduce Escalations</>} />

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