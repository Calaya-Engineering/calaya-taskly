"use client";

// pages/dashboards/HOD/HODCreateTask.jsx
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";
/* ---------- UI helpers ---------- */
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

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white`;

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not set";

const calculateDaysBetween = (start, end) => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate - startDate;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const getPriorityTone = (p) => {
  if (p === "CRITICAL") return "danger";
  if (p === "HIGH") return "warn";
  if (p === "MEDIUM") return "info";
  if (p === "LOW") return "success";
  return "default";
};

const fileIcon = (name = "") => {
  const n = name.toLowerCase();
  if (n.endsWith(".pdf")) return "📕";
  if (n.endsWith(".doc") || n.endsWith(".docx")) return "📘";
  if (n.endsWith(".xls") || n.endsWith(".xlsx") || n.endsWith(".csv")) return "📗";
  if (n.endsWith(".png") || n.endsWith(".jpg") || n.endsWith(".jpeg") || n.endsWith(".webp")) return "🖼️";
  if (n.endsWith(".zip") || n.endsWith(".rar")) return "🗜️";
  return "📎";
};

// Working hours per day
const WORKING_HOURS_PER_DAY = 8;

export default function HODCreateTask() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  const [departments, setDepartments] = useState([]);
  const [staffUsers, setStaffUsers] = useState([]);
  const [assignmentLoading, setAssignmentLoading] = useState(true);

  useEffect(() => {
    async function loadDepartmentsAndStaff() {
      try {
        const [deptRes, staffRes] = await Promise.all([
          fetchWithAuth("/api/departments"),
          fetchWithAuth("/api/users?role=Staff"),
        ]);
        if (deptRes.ok) {
          const data = await deptRes.json();
          setDepartments(data.map((d) => d.name));
        }
        if (staffRes.ok) {
          const data = await staffRes.json();
          setStaffUsers(data.map((u) => ({
            id: u.id,
            name: u.name || u.email,
            role: u.role,
            department: u.department || "",
          })));
        }
      } catch (e) {
        console.error("Failed to load departments/staff:", e);
      } finally {
        setAssignmentLoading(false);
      }
    }
    loadDepartmentsAndStaff();
  }, []);

  const departmentMembers = useMemo(() => {
    const m = {};
    staffUsers.forEach((u) => {
      if (!u.department) return;
      if (!m[u.department]) m[u.department] = [];
      m[u.department].push({ ...u });
    });
    return m;
  }, [staffUsers]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    selectedDepartments: [],
    selectedAssignees: [],
    priority: 'MEDIUM',
    startDate: '',
    dueDate: '',
    estimatedHours: '',
    visibility: 'DEPARTMENT',
    attachments: [],
  });

  const taskType = 'TASK';
  const taskId = useMemo(() => {
    const year = new Date().getFullYear();
    const rnd = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `TSK-${year}-${rnd}`;
  }, []);

  // Auto-calc estimated hours from dates
  useEffect(() => {
    if (formData.startDate && formData.dueDate) {
      const start = new Date(formData.startDate);
      const due = new Date(formData.dueDate);
      
      if (start <= due) {
        const diffDays = calculateDaysBetween(formData.startDate, formData.dueDate);
        const calculatedHours = diffDays * WORKING_HOURS_PER_DAY;
        
        setFormData(prev => ({ ...prev, estimatedHours: String(calculatedHours) }));
        return;
      }
    }
    setFormData(prev => ({ ...prev, estimatedHours: '' }));
  }, [formData.startDate, formData.dueDate]);

  const assignedCount = useMemo(() => 
    formData.selectedAssignees.length, [formData.selectedAssignees.length]);

  const getAllMembers = () => {
    return Object.entries(departmentMembers).flatMap(([dept, members]) =>
      members.map((member) => ({ ...member, department: dept }))
    );
  };

  const getSelectedMembersByDepartment = (department) => {
    return formData.selectedAssignees.filter(a => a.department === department);
  };

  const handleDepartmentToggle = (department) => {
    setFormData(prev => {
      const isSelected = prev.selectedDepartments.includes(department);
      const newDepartments = isSelected
        ? prev.selectedDepartments.filter(d => d !== department)
        : [...prev.selectedDepartments, department];
      
      const members = getAllMembers();
      const newAssignees = prev.selectedAssignees.filter((assignee) => {
        const member = members.find((m) => m.id === assignee.id);
        return member && newDepartments.includes(member.department);
      });

      return { ...prev, selectedDepartments: newDepartments, selectedAssignees: newAssignees };
    });
  };

  const handleAssigneeToggle = (member) => {
    setFormData(prev => {
      const isSelected = prev.selectedAssignees.some(a => a.id === member.id);
      const newAssignees = isSelected
        ? prev.selectedAssignees.filter(a => a.id !== member.id)
        : [...prev.selectedAssignees, member];
      return { ...prev, selectedAssignees: newAssignees };
    });
  };

  const selectAllInDepartment = (department) => {
    const members = departmentMembers[department] || [];
    setFormData(prev => {
      const currentDepartmentAssignees = prev.selectedAssignees.filter(a => a.department === department);
      
      if (currentDepartmentAssignees.length === members.length) {
        return { ...prev, selectedAssignees: prev.selectedAssignees.filter(a => a.department !== department) };
      }
      
      const membersToAdd = members.filter(member => !prev.selectedAssignees.some(a => a.id === member.id));
      return { ...prev, selectedAssignees: [...prev.selectedAssignees, ...membersToAdd] };
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.selectedDepartments.length === 0) {
      toast.warning('Please select at least one department');
      return;
    }
    
    if (formData.selectedAssignees.length === 0) {
      toast.warning('Please select at least one team member');
      return;
    }

    console.log('Creating task:', { 
      ...formData, 
      type: taskType,
      taskId,
      assigneeCount: formData.selectedAssignees.length,
      departments: formData.selectedDepartments
    });
    
    toast.success(`Task created successfully and assigned to ${formData.selectedAssignees.length} team member(s)!`);
    router.push('/hod-dashboard/tasks');
  };

  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
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
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>{taskType === "JOB" ? "Job / Project" : "Regular Task"}</Pill>
                  <Pill tone={getPriorityTone(formData.priority)}>{formData.priority}</Pill>
                  <Pill tone="info">{assignedCount} assignee(s)</Pill>
                  {formData.dueDate ? <Pill tone="warn">Due {fmtDate(formData.dueDate)}</Pill> : <Pill>Due date not set</Pill>}
                  <Pill tone="purple">HOD: {formData.selectedDepartments.length ? formData.selectedDepartments.join(' • ') : 'Select departments'}</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Assign New Task
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Create and assign tasks to team members across your departments.
                </p>

                <div className="mt-4 flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <StepDot active={activeTab === "details"} />
                    <span className={activeTab === "details" ? "font-semibold text-gray-900" : ""}>Details</span>
                  </div>
                  <span className="opacity-40">•</span>
                  <div className="flex items-center gap-2">
                    <StepDot active={activeTab === "assignment"} />
                    <span className={activeTab === "assignment" ? "font-semibold text-gray-900" : ""}>Assignment</span>
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

              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-4 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                  style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                  onClick={() => router.push("/hod-dashboard/tasks")}
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
                { id: "assignment", label: `Assignment (${formData.selectedDepartments.length} dept, ${assignedCount} members)` },
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
                          Task Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                          placeholder="e.g., Complete pipeline inspection for Site A"
                          value={formData.title}
                          onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <textarea
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                          placeholder="Provide detailed information about the task, requirements, and expected outcomes..."
                          value={formData.description}
                          onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                          <input
                            type="date"
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                            value={formData.startDate}
                            onChange={(e) => setFormData(p => ({ ...p, startDate: e.target.value }))}
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
                            onChange={(e) => setFormData(p => ({ ...p, dueDate: e.target.value }))}
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
                            onChange={(e) => setFormData(p => ({ ...p, visibility: e.target.value }))}
                          >
                            <option value="DEPARTMENT">Department Only</option>
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
                                  onClick={() => setFormData(x => ({ ...x, priority: p }))}
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
                            <span className="font-semibold">{taskId}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Type</span>
                            <span className="font-semibold">{taskType}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Assignees</span>
                            <span className="font-semibold">{assignedCount}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Depts</span>
                            <span className="font-semibold">{formData.selectedDepartments.length}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveTab("assignment")}
                        className="w-full px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        Continue to Assignment →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ASSIGNMENT */}
              {activeTab === "assignment" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 space-y-6">
                      {/* Department Selection */}
                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                            Select Departments
                          </p>
                          <Pill tone="info">{formData.selectedDepartments.length} selected</Pill>
                        </div>

                        <p className="text-xs text-gray-500 mt-1 mb-4">Choose which departments this task should be assigned to</p>

                        {assignmentLoading ? (
                          <p className="text-sm text-gray-500 py-4">Loading departments…</p>
                        ) : (
                        <div className="flex flex-wrap gap-2">
                          {departments.map((dept) => {
                            const active = formData.selectedDepartments.includes(dept);
                            return (
                              <button
                                key={dept}
                                type="button"
                                onClick={() => handleDepartmentToggle(dept)}
                                className={`px-4 py-2 rounded-2xl text-sm font-semibold border transition ${
                                  active ? "text-white" : "text-gray-700 bg-white hover:bg-gray-50"
                                }`}
                                style={{
                                  backgroundColor: active ? "var(--primary-blue)" : undefined,
                                  borderColor: active ? "transparent" : "rgba(0,0,0,0.08)",
                                }}
                              >
                                {dept} {active ? "✓" : ""}
                              </button>
                            );
                          })}
                        </div>
                        )}

                        {formData.selectedDepartments.length === 0 && (
                          <p className="text-sm text-amber-600 mt-3 flex items-center gap-2">
                            <span>⚠️</span> Please select at least one department
                          </p>
                        )}
                      </div>

                      {/* Team Members Selection */}
                      {formData.selectedDepartments.map((dept) => (
                        <div key={dept} className="rounded-2xl border border-gray-200/70 p-5">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                                {dept} Department
                              </p>
                              <Pill tone="info">{departmentMembers[dept]?.length || 0} members</Pill>
                            </div>

                            <button
                              type="button"
                              onClick={() => selectAllInDepartment(dept)}
                              className="px-4 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 transition"
                              style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                            >
                              {getSelectedMembersByDepartment(dept).length === departmentMembers[dept]?.length
                                ? "Deselect All"
                                : "Select All"}
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                            {departmentMembers[dept]?.map((member) => {
                              const active = formData.selectedAssignees.some(a => a.id === member.id);
                              return (
                                <button
                                  key={member.id}
                                  type="button"
                                  onClick={() => handleAssigneeToggle({ ...member, department: dept })}
                                  className={`text-left flex items-center gap-3 p-3 rounded-2xl border transition ${
                                    active ? "bg-blue-50" : "bg-white hover:bg-gray-50"
                                  }`}
                                  style={{ borderColor: active ? "rgba(44, 75, 155, 0.25)" : "rgba(0,0,0,0.08)" }}
                                >
                                  <div
                                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0 "
                                    style={{ backgroundColor: "var(--secondary-blue)" }}
                                  >
                                    {member.name.charAt(0)}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm font-semibold text-gray-900 truncate">{member.name}</div>
                                    <div className="text-xs text-gray-500 truncate">{member.role}</div>
                                  </div>
                                  {active ? <span className="text-blue-600 font-bold">✓</span> : null}
                                </button>
                              );
                            })}
                          </div>
                          
                          <div className="mt-3 text-sm text-gray-600">
                            Selected: {getSelectedMembersByDepartment(dept).length} / {departmentMembers[dept]?.length || 0} members
                          </div>
                        </div>
                      ))}
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
                              {formData.selectedDepartments.length}
                            </div>
                          </div>
                          <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
                            <div className="text-xs text-gray-500">Assignees</div>
                            <div className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                              {assignedCount}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <Pill tone="info">Multi-Assignee</Pill>
                          {formData.selectedDepartments.length ? <Pill>{formData.selectedDepartments.join(', ')}</Pill> : null}
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
                          onClick={() => setActiveTab("assignment")}
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
                          <Pill tone="info">Task</Pill>
                          <Pill>Multi-Assignee</Pill>
                          <Pill>{formData.visibility.replace('_', ' ')}</Pill>
                          <Pill tone="info">{taskId}</Pill>
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
                          Assignees ({assignedCount} team members)
                        </p>

                        <div className="mt-4 space-y-4">
                          {formData.selectedDepartments.map((dept) => {
                            const deptAssignees = formData.selectedAssignees.filter(a => a.department === dept);
                            if (deptAssignees.length === 0) return null;
                            
                            return (
                              <div key={dept}>
                                <div className="text-xs text-gray-500 mb-2">{dept} ({deptAssignees.length})</div>
                                <div className="flex flex-wrap gap-2">
                                  {deptAssignees.map((assignee) => (
                                    <span key={assignee.id} className="px-3 py-1 rounded-2xl text-xs font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-100 flex items-center">
                                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] mr-1">
                                        {assignee.name.charAt(0)}
                                      </span>
                                      {assignee.name} - {assignee.role}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {formData.attachments.length > 0 && (
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
                      )}
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
                          className="flex-1 px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                          style={{ backgroundColor: "var(--accent-red)" }}
                        >
                          Assign Task to {assignedCount} Member(s)
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

            {/* Footer nav */}
            <div className="px-6 md:px-8 py-4 border-t border-gray-200/70 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-sm text-gray-600">
                <span className="font-semibold" style={{ color: "var(--primary-blue)" }}>
                  ID:
                </span>{" "}
                {taskId} •{" "}
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
                      setActiveTab(activeTab === "assignment" ? "details" : activeTab === "attachments" ? "assignment" : "attachments")
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
                    onClick={() => setActiveTab(activeTab === "details" ? "assignment" : activeTab === "assignment" ? "attachments" : "preview")}
                    className="px-5 py-2.5 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    Next →
                  </button>
                ) : null}
              </div>
            </div>
          </form>
        </Card>

        {/* Tips */}
        <Card className="p-6 bg-blue-50 border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shrink-0">
              💡
            </div>
            <div>
              <h3 className="font-extrabold mb-2" style={{ color: "var(--primary-blue)" }}>
                Multi-Department Task Assignment Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Select one or multiple departments you manage</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Assign tasks to multiple team members at once</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Use "Select All" to quickly assign to entire department</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Tasks are created individually for each assignee</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}