"use client";

// pages/dashboards/MD/MDCreateTask.jsx
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import { UserIcon } from "@/lib/icons";
import { MDMenuItems } from "@/utils/menus";
import { BuildingIcon, UsersIcon, TeamIcon, TaskIcon as TaskIconLib } from "@/lib/icons";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";

// Working hours per day
const WORKING_HOURS_PER_DAY = 8;


const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
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

const StepDot = ({ active }) => (
  <span
    className={`inline-flex w-2.5 h-2.5 rounded-full ${active ? "opacity-100" : "opacity-30"}`}
    style={{ backgroundColor: "var(--primary-blue)" }}
  />
);

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not set";

const calculateDaysBetween = (start, end) => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate - startDate;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const getPriorityTone = (p) => (p === "CRITICAL" ? "danger" : p === "HIGH" ? "warn" : p === "MEDIUM" ? "info" : "success");

const fileIcon = (name = "") => {
  const n = name.toLowerCase();
  if (n.endsWith(".pdf")) return "📕";
  if (n.endsWith(".doc") || n.endsWith(".docx")) return "📘";
  if (n.endsWith(".xls") || n.endsWith(".xlsx") || n.endsWith(".csv")) return "📗";
  if (n.endsWith(".png") || n.endsWith(".jpg") || n.endsWith(".jpeg") || n.endsWith(".webp")) return "🖼️";
  if (n.endsWith(".zip") || n.endsWith(".rar")) return "🗜️";
  return "📎";
};

export default function MDCreateTask() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // allow /create-task?type=JOB
  const initialType = (searchParams?.get("type") || "TASK").toUpperCase() === "JOB" ? "JOB" : "TASK";

  const [taskType, setTaskType] = useState(initialType);
  const [activeTab, setActiveTab] = useState("details"); // details | assignees | attachments | preview
  const [assignmentType, setAssignmentType] = useState("DEPARTMENT"); // DEPARTMENT | HODS | STAFF | MIXED
  const [hodUsers, setHodUsers] = useState([]);
  const [staffUsers, setStaffUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    async function loadUsersAndDepartments() {
      try {
        const [hodRes, staffRes, deptRes] = await Promise.all([
          fetchWithAuth("/api/users?role=HOD"),
          fetchWithAuth("/api/users?role=Staff"),
          fetchWithAuth("/api/departments"),
        ]);
        if (hodRes.ok) {
          const data = await hodRes.json();
          setHodUsers(data.map((u) => ({ id: u.id, name: u.name || u.email, department: u.department || "", role: u.role, email: u.email })));
        }
        if (staffRes.ok) {
          const data = await staffRes.json();
          setStaffUsers(data.map((u) => ({ id: u.id, name: u.name || u.email, department: u.department || "", role: u.role, email: u.email })));
        }
        if (deptRes.ok) {
          const data = await deptRes.json();
          setDepartments(data.map((d) => d.name));
        }
      } catch (e) {
        console.error("Failed to load users/departments:", e);
      } finally {
        setUsersLoading(false);
      }
    }
    loadUsersAndDepartments();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    departments: [],
    hods: [],
    staff: [],
    priority: "MEDIUM",
    startDate: "",
    dueDate: "",
    visibility: "ASSIGNED_ONLY",
    estimatedHours: "",
    attachments: [],
  });

  // Generate task id (demo) - client-only to avoid hydration mismatch from Math.random()
  const [taskId, setTaskId] = useState("");
  useEffect(() => {
    const prefix = taskType === "JOB" ? "JOB" : "TSK";
    const year = new Date().getFullYear();
    const rnd = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    setTaskId(`${prefix}-${year}-${rnd}`);
  }, [taskType]);

  // Auto-calc estimated hours from dates
  useEffect(() => {
    if (formData.startDate && formData.dueDate) {
      const start = new Date(formData.startDate);
      const due = new Date(formData.dueDate);

      if (start <= due) {
        const diffDays = calculateDaysBetween(formData.startDate, formData.dueDate);
        const calculatedHours = diffDays * WORKING_HOURS_PER_DAY;

        setFormData((prev) => ({ ...prev, estimatedHours: String(calculatedHours) }));
        return;
      }
    }
    setFormData((prev) => ({ ...prev, estimatedHours: "" }));
  }, [formData.startDate, formData.dueDate]);

  const filteredHods = useMemo(() => {
    if (assignmentType !== "MIXED") return hodUsers;
    if (formData.departments.length === 0) return hodUsers;
    return hodUsers.filter((h) => formData.departments.includes(h.department));
  }, [assignmentType, formData.departments]);

  const filteredStaff = useMemo(() => {
    if (assignmentType !== "MIXED") return staffUsers;
    if (formData.departments.length === 0) return staffUsers;
    return staffUsers.filter((s) => formData.departments.includes(s.department));
  }, [assignmentType, formData.departments]);

  const assignedCount = useMemo(
    () => formData.departments.length + formData.hods.length + formData.staff.length,
    [formData.departments.length, formData.hods.length, formData.staff.length]
  );

  const selectAllHODs = () => {
    setFormData((p) => ({ ...p, hods: p.hods.length === filteredHods.length ? [] : filteredHods }));
  };

  const selectAllStaff = () => {
    setFormData((p) => ({ ...p, staff: p.staff.length === filteredStaff.length ? [] : filteredStaff }));
  };

  const toggleDepartment = (dept) => {
    setFormData((p) => ({
      ...p,
      departments: p.departments.includes(dept) ? p.departments.filter((d) => d !== dept) : [...p.departments, dept],
    }));
  };

  const toggleHOD = (hod) => {
    setFormData((p) => ({
      ...p,
      hods: p.hods.some((h) => h.id === hod.id) ? p.hods.filter((h) => h.id !== hod.id) : [...p.hods, hod],
    }));
  };

  const toggleStaff = (staff) => {
    setFormData((p) => ({
      ...p,
      staff: p.staff.some((s) => s.id === staff.id) ? p.staff.filter((s) => s.id !== staff.id) : [...p.staff, staff],
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setFormData((p) => ({ ...p, attachments: [...p.attachments, ...files] }));
  };

  const removeAttachment = (index) => {
    setFormData((p) => ({ ...p, attachments: p.attachments.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (assignmentType === "DEPARTMENT" && formData.departments.length === 0) {
      toast.warning("Please select at least one department");
      return;
    }
    if (assignmentType === "HODS" && formData.hods.length === 0) {
      toast.warning("Please select at least one HOD");
      return;
    }
    if (assignmentType === "STAFF" && formData.staff.length === 0) {
      toast.warning("Please select at least one staff member");
      return;
    }
    if (assignmentType === "MIXED" && formData.hods.length === 0 && formData.staff.length === 0 && formData.departments.length === 0) {
      toast.warning("Please select at least one assignee (department / HOD / staff)");
      return;
    }

    let assigneeIds = [];
    if (assignmentType === "HODS") {
      assigneeIds = formData.hods.map((h) => h.id);
    } else if (assignmentType === "STAFF") {
      assigneeIds = formData.staff.map((s) => s.id);
    } else if (assignmentType === "DEPARTMENT" || assignmentType === "MIXED") {
      const deptIds = new Set();
      if (formData.departments.length > 0) {
        const params = formData.departments.map((d) => `department=${encodeURIComponent(d)}`).join("&");
        const res = await fetchWithAuth(`/api/users?${params}`);
        if (res.ok) {
          const users = await res.json();
          users.forEach((u) => deptIds.add(u.id));
        }
      }
      formData.hods.forEach((h) => deptIds.add(h.id));
      formData.staff.forEach((s) => deptIds.add(s.id));
      assigneeIds = [...deptIds];
    }

    setSubmitLoading(true);
    try {
      const res = await fetchWithAuth("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || undefined,
          department: formData.departments[0] || formData.department || null,
          priority: formData.priority,
          type: taskType,
          startDate: formData.startDate || null,
          dueDate: formData.dueDate || null,
          estimatedHours: formData.estimatedHours ? parseInt(formData.estimatedHours, 10) : null,
          visibility: formData.visibility,
          assigneeIds,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create task");
      }
      toast.success("Task created successfully!");
      router.push("/md-dashboard/tasks");
    } catch (err) {
      toast.error(err.message || "Failed to create task");
    } finally {
      setSubmitLoading(false);
    }
  };

  const resetAssigneesForAssignmentType = (next) => {
    setAssignmentType(next);
    setFormData((p) => ({
      ...p,
      departments: next === "DEPARTMENT" || next === "MIXED" ? p.departments : [],
      hods: next === "HODS" || next === "MIXED" ? p.hods : [],
      staff: next === "STAFF" || next === "MIXED" ? p.staff : [],
    }));
  };

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="max-w-7xl mx-auto space-y-6">
   
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>{taskType === "JOB" ? "Job / Project" : "Regular Task"}</Pill>
                  <Pill tone={getPriorityTone(formData.priority)}>{formData.priority}</Pill>
                  <Pill tone="info">{assignedCount} assignee(s)</Pill>
                  {formData.dueDate ? <Pill tone="warn">Due {fmtDate(formData.dueDate)}</Pill> : <Pill>Due date not set</Pill>}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Create {taskType === "JOB" ? "New Job" : "New Task"}
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Assign tasks to departments, HODs, or individual staff members — with priority, timeline and attachments.
                </p>

                <div className="mt-4 flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <StepDot active={activeTab === "details"} />
                    <span className={activeTab === "details" ? "font-semibold text-gray-900" : ""}>Details</span>
                  </div>
                  <span className="opacity-40">•</span>
                  <div className="flex items-center gap-2">
                    <StepDot active={activeTab === "assignees"} />
                    <span className={activeTab === "assignees" ? "font-semibold text-gray-900" : ""}>Assignees</span>
                  </div>
                  <span className="opacity-40">•</span>
                  <div className="flex items-center gap-2">
                    <StepDot active={activeTab === "attachments"} />
                    <span className={activeTab === "attachments" ? "font-semibold text-gray-900" : ""}>Attachments</span>
                  </div>
                  <span className="opacity-40">•</span>
                  <div className="flex items-center gap-2">
                    <StepDot active={activeTab === "preview"} />
                    <span className={activeTab === "preview" ? "font-semibold text-gray-900" : ""}>Preview</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`px-4 py-3 rounded-2xl font-semibold border transition ${
                      taskType === "TASK" ? "bg-white" : "bg-gray-50"
                    }`}
                    style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                    onClick={() => setTaskType("TASK")}
                  >
                    <span className="inline-flex items-center gap-2"><TaskIconLib /> Task</span>
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-3 rounded-2xl font-semibold border transition ${
                      taskType === "JOB" ? "bg-white" : "bg-gray-50"
                    }`}
                    style={{ borderColor: "rgba(237, 50, 55, 0.35)", color: "var(--accent-red)" }}
                    onClick={() => setTaskType("JOB")}
                  >
                    <span className="inline-flex items-center gap-2"><BuildingIcon /> Job</span>
                  </button>
                </div>

                <button
                  type="button"
                  className="px-4 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                  style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                  onClick={() => router.push("/md-dashboard/tasks")}
                >
                  Cancel
                </button>
              </div>
            </div>

            <input type="hidden" value={taskId} />
          </div>

          {/* Tabs */}
          <div className="bg-white border-t border-gray-200/70">
            <div className="flex flex-wrap">
              {[
                { id: "details", label: "Task Details" },
                { id: "assignees", label: `Assignees (${assignedCount})` },
                { id: "attachments", label: `Attachments${formData.attachments.length ? ` (${formData.attachments.length})` : ""}` },
                { id: "preview", label: "Preview" },
              ].map((t) => {
                const active = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id)}
                    className={`px-6 py-4 text-sm font-semibold transition border-b-2 ${
                      active ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                    }`}
                    style={{ borderBottomColor: active ? "var(--primary-blue)" : "transparent" }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Form body */}
        <Card className="overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-6 md:p-8">
              {/* DETAILS */}
              {activeTab === "details" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {taskType === "JOB" ? "Job Title" : "Task Title"} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                          placeholder={taskType === "JOB" ? "e.g., Pipeline inspection project for Site A" : "e.g., Complete pipeline inspection for Site A"}
                          value={formData.title}
                          onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <textarea
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                          placeholder="Provide detailed information about the task, requirements, and expected outcomes..."
                          value={formData.description}
                          onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                          <input
                            type="date"
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                            value={formData.startDate}
                            onChange={(e) => setFormData((p) => ({ ...p, startDate: e.target.value }))}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Due Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            required
                            min={formData.startDate || undefined}
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                            value={formData.dueDate}
                            onChange={(e) => setFormData((p) => ({ ...p, dueDate: e.target.value }))}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Hours</label>
                          <div className="relative">
                            <input
                              readOnly
                              className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50 focus:outline-none"
                              placeholder="Auto-calculated"
                              value={formData.estimatedHours}
                            />
                            {formData.startDate && formData.dueDate ? (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                                {calculateDaysBetween(formData.startDate, formData.dueDate)} days
                              </div>
                            ) : null}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">⏱️ Auto-calculated at {WORKING_HOURS_PER_DAY} working hours/day</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          Settings
                        </p>

                        <div className="mt-4">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Visibility</label>
                          <select
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                            value={formData.visibility}
                            onChange={(e) => setFormData((p) => ({ ...p, visibility: e.target.value }))}
                          >
                            <option value="ASSIGNED_ONLY">Assigned Users Only</option>
                            <option value="DEPARTMENT">Department View</option>
                            <option value="PUBLIC">Public (All Departments)</option>
                          </select>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-semibold text-gray-700 mb-3">Priority</label>
                          <div className="grid grid-cols-2 gap-2">
                            {["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((p) => {
                              const active = formData.priority === p;
                              return (
                                <button
                                  key={p}
                                  type="button"
                                  onClick={() => setFormData((x) => ({ ...x, priority: p }))}
                                  className={`px-3 py-2.5 rounded-2xl border text-sm font-semibold transition ${
                                    active ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                                  }`}
                                  style={{
                                    borderColor: active ? "rgba(44, 75, 155, 0.35)" : "rgba(0,0,0,0.08)",
                                    color: active ? "var(--primary-blue)" : "#374151",
                                  }}
                                >
                                  <span className="mr-2">{p === "CRITICAL" ? "🟥" : p === "HIGH" ? "🟧" : p === "MEDIUM" ? "🟨" : "🟩"}</span>
                                  {p}
                                </button>
                              );
                            })}
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <Pill tone={getPriorityTone(formData.priority)}>{formData.priority}</Pill>
                            {formData.dueDate ? <Pill tone="warn">Due {fmtDate(formData.dueDate)}</Pill> : <Pill>Set due date</Pill>}
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          Quick Summary
                        </p>
                        <div className="mt-3 space-y-2 text-sm text-gray-700">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Task ID</span>
                            <span className="font-semibold">{taskId || "—"}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Type</span>
                            <span className="font-semibold">{taskType}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Assignees</span>
                            <span className="font-semibold">{assignedCount}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveTab("assignees")}
                        className="w-full px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        Continue to Assignees →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ASSIGNEES */}
              {activeTab === "assignees" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 space-y-6">
                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          Assignment Type
                        </p>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                          {[
                            { id: "DEPARTMENT", label: "Departments", icon: <BuildingIcon />, desc: "Assign to entire departments" },
                            { id: "HODS", label: "HODs Only", icon: <UserIcon />, desc: "Assign to department heads" },
                            { id: "STAFF", label: "Staff Only", icon: <UsersIcon />, desc: "Assign to individual staff" },
                            { id: "MIXED", label: "Mixed", icon: <TeamIcon />, desc: "Combine departments, HODs & staff" },
                          ].map((t) => {
                            const active = assignmentType === t.id;
                            return (
                              <button
                                key={t.id}
                                type="button"
                                onClick={() => resetAssigneesForAssignmentType(t.id)}
                                className={`text-left p-4 rounded-2xl border transition hover:-translate-y-[1px] ${
                                  active ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                                }`}
                                style={{ borderColor: active ? "rgba(44, 75, 155, 0.35)" : "rgba(0,0,0,0.08)" }}
                              >
                                <div className="flex [&_svg]:w-8 [&_svg]:h-8" style={{ color: "var(--primary-blue)" }}>{t.icon}</div>
                                <div className="mt-2 font-semibold" style={{ color: "var(--primary-blue)" }}>
                                  {t.label}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{t.desc}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {(assignmentType === "DEPARTMENT" || assignmentType === "MIXED") && (
                        <div className="rounded-2xl border border-gray-200/70 p-5">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                              Select Departments
                            </p>
                            <Pill tone="info">{formData.departments.length} selected</Pill>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {departments.map((d) => {
                              const active = formData.departments.includes(d);
                              return (
                                <button
                                  key={d}
                                  type="button"
                                  onClick={() => toggleDepartment(d)}
                                  className={`px-3.5 py-2 rounded-2xl text-sm font-semibold border transition ${
                                    active ? "text-white" : "text-gray-700 bg-white hover:bg-gray-50"
                                  }`}
                                  style={{
                                    backgroundColor: active ? "var(--primary-blue)" : undefined,
                                    borderColor: active ? "transparent" : "rgba(0,0,0,0.08)",
                                  }}
                                >
                                  {d} {active ? "✓" : ""}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {(assignmentType === "HODS" || assignmentType === "MIXED") && (
                        <div className="rounded-2xl border border-gray-200/70 p-5">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                                Select HODs
                              </p>
                              <Pill tone="info">{formData.hods.length} selected</Pill>
                            </div>

                            <button
                              type="button"
                              onClick={selectAllHODs}
                              className="px-4 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 transition"
                              style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                            >
                              {formData.hods.length === filteredHods.length ? "Deselect All" : "Select All"}
                            </button>
                          </div>

                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                            {filteredHods.map((hod) => {
                              const active = formData.hods.some((h) => h.id === hod.id);
                              return (
                                <button
                                  key={hod.id}
                                  type="button"
                                  onClick={() => toggleHOD(hod)}
                                  className={`text-left flex items-center gap-3 p-3 rounded-2xl border transition ${
                                    active ? "bg-blue-50" : "bg-white hover:bg-gray-50"
                                  }`}
                                  style={{ borderColor: active ? "rgba(44, 75, 155, 0.25)" : "rgba(0,0,0,0.08)" }}
                                >
                                  <div
                                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0 "
                                    style={{ backgroundColor: "var(--primary-blue)" }}
                                  >
                                    {hod.name.charAt(0)}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm font-semibold text-gray-900 truncate">{hod.name}</div>
                                    <div className="text-xs text-gray-500 truncate">{hod.department}</div>
                                  </div>
                                  {active ? <span className="text-blue-600 font-bold">✓</span> : null}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {(assignmentType === "STAFF" || assignmentType === "MIXED") && (
                        <div className="rounded-2xl border border-gray-200/70 p-5">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                                Select Staff
                              </p>
                              <Pill tone="info">{formData.staff.length} selected</Pill>
                            </div>

                            <button
                              type="button"
                              onClick={selectAllStaff}
                              className="px-4 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 transition"
                              style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                            >
                              {formData.staff.length === filteredStaff.length ? "Deselect All" : "Select All"}
                            </button>
                          </div>

                          <div className="mt-4 max-h-[420px] overflow-y-auto pr-2 space-y-2">
                            {filteredStaff.map((s) => {
                              const active = formData.staff.some((x) => x.id === s.id);
                              return (
                                <button
                                  key={s.id}
                                  type="button"
                                  onClick={() => toggleStaff(s)}
                                  className={`w-full text-left flex items-center gap-3 p-3 rounded-2xl border transition ${
                                    active ? "bg-emerald-50" : "bg-white hover:bg-gray-50"
                                  }`}
                                  style={{ borderColor: active ? "rgba(16,185,129,0.25)" : "rgba(0,0,0,0.08)" }}
                                >
                                  <div
                                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0 "
                                    style={{ backgroundColor: "var(--secondary-blue)" }}
                                  >
                                    {s.name.charAt(0)}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm font-semibold text-gray-900 truncate">{s.name}</div>
                                    <div className="text-xs text-gray-500 truncate">{s.department}</div>
                                  </div>
                                  {active ? <span className="text-emerald-700 font-bold">✓</span> : null}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Summary side */}
                    <div className="space-y-5">
                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          Assignment Summary
                        </p>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
                            <div className="text-xs text-gray-500">Departments</div>
                            <div className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                              {formData.departments.length}
                            </div>
                          </div>
                          <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
                            <div className="text-xs text-gray-500">HODs</div>
                            <div className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                              {formData.hods.length}
                            </div>
                          </div>
                          <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
                            <div className="text-xs text-gray-500">Staff</div>
                            <div className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                              {formData.staff.length}
                            </div>
                          </div>
                          <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
                            <div className="text-xs text-gray-500">Total</div>
                            <div className="text-2xl font-extrabold" style={{ color: "var(--accent-red)" }}>
                              {assignedCount}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <Pill tone="info">{assignmentType}</Pill>
                          {formData.departments.length ? <Pill>{formData.departments.length} dept(s)</Pill> : null}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveTab("details")}
                          className="flex-1 px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                          style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                        >
                          ← Back
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveTab("attachments")}
                          className="flex-1 px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                          style={{ backgroundColor: "var(--secondary-blue)" }}
                        >
                          Continue →
                        </button>
                      </div>

                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          Tips
                        </p>
                        <ul className="mt-3 text-sm text-gray-600 space-y-2">
                          <li className="flex gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            Use <span className="font-semibold">Mixed</span> to combine departments, HODs and staff.
                          </li>
                          <li className="flex gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            Select departments first to auto-filter HODs/staff in Mixed.
                          </li>
                          <li className="flex gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            Ensure due date is realistic for the priority level.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ATTACHMENTS */}
              {activeTab === "attachments" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          Upload Attachments
                        </p>

                        <div className="mt-4 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-200 transition">
                          <input type="file" multiple className="hidden" id="file-upload" onChange={handleFileUpload} />
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <div
                              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                              style={{ backgroundColor: "rgba(109, 198, 223, 0.14)" }}
                            >
                              <span className="text-3xl">📎</span>
                            </div>
                            <p className="text-gray-700 font-semibold mb-2">Click to upload or drag and drop</p>
                            <p className="text-sm text-gray-500">PDF, DOCX, XLSX, JPG, PNG up to 100MB each</p>
                          </label>
                        </div>

                        {formData.attachments.length > 0 ? (
                          <div className="mt-6">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                                Uploaded Files
                              </p>
                              <Pill tone="info">{formData.attachments.length} file(s)</Pill>
                            </div>

                            <div className="mt-3 space-y-2">
                              {formData.attachments.map((file, idx) => (
                                <div
                                  key={`${file.name}-${idx}`}
                                  className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-gray-200/70 bg-white"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div
                                      className="w-10 h-10 rounded-2xl flex items-center justify-center  shrink-0"
                                      style={{ backgroundColor: "rgba(44, 75, 155, 0.08)" }}
                                    >
                                      <span className="text-lg">{fileIcon(file.name)}</span>
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-sm font-semibold text-gray-900 truncate max-w-[520px]">
                                        {file.name}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                      </div>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => removeAttachment(idx)}
                                    className="px-3 py-1.5 rounded-xl text-xs font-semibold border bg-white hover:bg-red-50 transition"
                                    style={{ borderColor: "rgba(239,68,68,0.25)", color: "#DC2626" }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          Attachment Notes
                        </p>
                        <ul className="mt-3 text-sm text-gray-600 space-y-2">
                          <li className="flex gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            Add procedures, photos, or reports to reduce back-and-forth.
                          </li>
                          <li className="flex gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            Keep filenames clear: <span className="font-semibold">SiteA_Inspection_Photos.zip</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            Confirm sensitive files match the visibility setting.
                          </li>
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveTab("assignees")}
                          className="flex-1 px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                          style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                        >
                          ← Back
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveTab("preview")}
                          className="flex-1 px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                          style={{ backgroundColor: "var(--secondary-blue)" }}
                        >
                          Review →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PREVIEW */}
              {activeTab === "preview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 space-y-6">
                      <div className="rounded-2xl border border-gray-200/70 p-6 bg-gray-50">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Pill tone={getPriorityTone(formData.priority)}>{formData.priority || "Not set"}</Pill>
                          <Pill tone="info">{taskType === "JOB" ? "Job" : "Task"}</Pill>
                          <Pill>{assignmentType}</Pill>
                          <Pill tone="info">{taskId || "—"}</Pill>
                        </div>

                        <h3 className="text-xl font-extrabold text-gray-900">
                          {formData.title || "Untitled Task"}
                        </h3>

                        <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                          {formData.description || "No description provided."}
                        </p>

                        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="p-3 bg-white rounded-2xl border border-gray-200/70">
                            <div className="text-xs text-gray-500">Start Date</div>
                            <div className="text-sm font-semibold text-gray-900 mt-1">{fmtDate(formData.startDate)}</div>
                          </div>
                          <div className="p-3 bg-white rounded-2xl border border-gray-200/70">
                            <div className="text-xs text-gray-500">Due Date</div>
                            <div className="text-sm font-semibold text-gray-900 mt-1">{fmtDate(formData.dueDate)}</div>
                          </div>
                          <div className="p-3 bg-white rounded-2xl border border-gray-200/70">
                            <div className="text-xs text-gray-500">Duration</div>
                            <div className="text-sm font-semibold text-gray-900 mt-1">
                              {formData.startDate && formData.dueDate ? `${calculateDaysBetween(formData.startDate, formData.dueDate)} days` : "Not set"}
                            </div>
                          </div>
                          <div className="p-3 bg-white rounded-2xl border border-gray-200/70">
                            <div className="text-xs text-gray-500">Est. Hours</div>
                            <div className="text-sm font-semibold text-gray-900 mt-1">{formData.estimatedHours || "-"}</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          Assignees
                        </p>

                        <div className="mt-4 space-y-4">
                          {formData.departments.length > 0 ? (
                            <div>
                              <div className="text-xs text-gray-500 mb-2">Departments ({formData.departments.length})</div>
                              <div className="flex flex-wrap gap-2">
                                {formData.departments.map((d) => (
                                  <span key={d} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl text-xs font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-100 [&_svg]:w-3.5 [&_svg]:h-3.5">
                                    <BuildingIcon /> {d}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : null}

                          {formData.hods.length > 0 ? (
                            <div>
                              <div className="text-xs text-gray-500 mb-2">HODs ({formData.hods.length})</div>
                              <div className="flex flex-wrap gap-2">
                                {formData.hods.map((h) => (
                                  <span key={h.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl text-xs font-semibold bg-purple-50 text-purple-700 ring-1 ring-purple-100 [&_svg]:w-3.5 [&_svg]:h-3.5">
                                    <UserIcon /> {h.name} ({h.department})
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : null}

                          {formData.staff.length > 0 ? (
                            <div>
                              <div className="text-xs text-gray-500 mb-2">Staff ({formData.staff.length})</div>
                              <div className="flex flex-wrap gap-2">
                                {formData.staff.map((s) => (
                                  <span key={s.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl text-xs font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 [&_svg]:w-3.5 [&_svg]:h-3.5">
                                    <UserIcon /> {s.name} ({s.department})
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : null}

                          {assignedCount === 0 ? <div className="text-sm text-gray-500">No assignees selected yet.</div> : null}
                        </div>
                      </div>

                      {formData.attachments.length ? (
                        <div className="rounded-2xl border border-gray-200/70 p-5">
                          <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                            Attachments ({formData.attachments.length})
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {formData.attachments.map((f, idx) => (
                              <span key={`${f.name}-${idx}`} className="px-3 py-1 rounded-2xl text-xs font-semibold bg-gray-50 text-gray-700 ring-1 ring-gray-100">
                                {fileIcon(f.name)} {f.name.length > 28 ? `${f.name.slice(0, 28)}…` : f.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="space-y-5">
                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          Final Checks
                        </p>
                        <ul className="mt-3 text-sm text-gray-600 space-y-2">
                          <li className="flex gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            Ensure <span className="font-semibold">Due Date</span> is set.
                          </li>
                          <li className="flex gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            Confirm <span className="font-semibold">Assignees</span> are correct.
                          </li>
                          <li className="flex gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            Priority should match urgency and impact.
                          </li>
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveTab("attachments")}
                          className="flex-1 px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                          style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                        >
                          ← Back
                        </button>

                        <button
                          type="submit"
                          disabled={submitLoading}
                          className="flex-1 px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition disabled:opacity-70 disabled:cursor-not-allowed"
                          style={{ backgroundColor: "var(--accent-red)" }}
                        >
                          {submitLoading ? "Creating…" : `Create ${taskType === "JOB" ? "Job" : "Task"}`}
                        </button>
                      </div>

                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          What happens next?
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                          After creation, assignees will see this item in their task list, with your attachments and deadlines.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer nav (show on all tabs) */}
            <div className="px-6 md:px-8 py-4 border-t border-gray-200/70 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-sm text-gray-600">
                <span className="font-semibold" style={{ color: "var(--primary-blue)" }}>
                  ID:
                </span>{" "}
                {taskId || "—"} •{" "}
                <span className="font-semibold" style={{ color: "var(--primary-blue)" }}>
                  Visibility:
                </span>{" "}
                {formData.visibility.replace(/_/g, " ")}
              </div>

              <div className="flex gap-2">
                {activeTab !== "details" ? (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab(activeTab === "assignees" ? "details" : activeTab === "attachments" ? "assignees" : "attachments")
                    }
                    className="px-5 py-2.5 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                    style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                  >
                    ← Previous
                  </button>
                ) : null}

                {activeTab !== "preview" ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab(activeTab === "details" ? "assignees" : activeTab === "assignees" ? "attachments" : "preview")}
                    className="px-5 py-2.5 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    Next →
                  </button>
                ) : null}

                {activeTab === "preview" ? (
                  <Link href="/md-dashboard/tasks" className="hidden">
                    {/* just to satisfy lint in case you want a link */}
                  </Link>
                ) : null}
              </div>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
