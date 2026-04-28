"use client";

// pages/dashboards/MD/MDTaskDetail.jsx
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";
/* ---------- UI helpers ---------- */
interface AssignmentUser {
  name?: string;
  email?: string;
  role?: string;
  department?: string;
  managedDepartmentRelations?: { department: { name: string } }[];
}

interface TaskData {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  type?: string;
  department?: string;
  visibility?: string;
  assignmentType?: string;
  estimatedHours?: number;
  startDate?: string;
  dueDate?: string;
  createdAt?: string;
  assignments?: { user?: AssignmentUser }[];
  createdBy?: { role?: string; name?: string };
}

const Card = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const SectionTitle = ({ title, subtitle, action }: { title: string; subtitle?: React.ReactNode; action?: React.ReactNode }) => (
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

const taskCreatedByLabel = (task) =>
  task?.createdBy?.role || task?.createdBy?.name || "—";

const taskAssigneeLabel = (task) => {
  const a = task?.assignments;
  if (!a?.length) return "Unassigned";
  if (a.length === 1) return a[0].user?.name || a[0].user?.email || "—";
  return `${a.length} assignees`;
};

const getUserDepartment = (user?: AssignmentUser): string | undefined => {
  if (user?.department) return user.department;
  const managed = user?.managedDepartmentRelations;
  if (managed && managed.length > 0) {
    return managed.map((r) => r.department.name).join(", ");
  }
  return undefined;
};

const getTaskDepartmentDisplay = (task: TaskData): string => {
  if (task.department) return task.department;
  const depts = [
    ...new Set(
      (task.assignments || [])
        .map((a) => getUserDepartment(a.user))
        .filter(Boolean)
    ),
  ];
  return depts.length > 0 ? depts.join(", ") : "—";
};

const AssignmentDisplay = ({ task }: { task: TaskData }) => {
  const assignments = task?.assignments || [];
  const assignmentType = task?.assignmentType;

  if (task?.visibility === "PUBLIC" && !assignmentType) {
    return (
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: "var(--secondary-blue)" }}
        >
          C
        </div>
        <p className="font-extrabold text-gray-900">Company-Wide</p>
      </div>
    );
  }

  if (assignmentType === "DEPARTMENT") {
    const deptNames = [...new Set(assignments.map((a) => getUserDepartment(a.user)).filter(Boolean))];
    return (
      <div className="space-y-2">
        {deptNames.length > 0 ? (
          deptNames.map((dept) => (
            <div key={dept} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: "var(--secondary-blue)" }}
              >
                {dept!.charAt(0)}
              </div>
              <p className="font-extrabold text-gray-900">{dept}</p>
            </div>
          ))
        ) : (
          <p className="font-extrabold text-gray-900">{task.department || "Unassigned"}</p>
        )}
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: "var(--secondary-blue)" }}
        >
          U
        </div>
        <p className="font-extrabold text-gray-900">Unassigned</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {assignments.map((a, i) => {
        const dept = getUserDepartment(a.user);
        return (
          <div key={i} className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: "var(--secondary-blue)" }}
            >
              {(a.user?.name || a.user?.email || "?").charAt(0)}
            </div>
            <div>
              <p className="font-extrabold text-gray-900">{a.user?.name || a.user?.email || "—"}</p>
              {dept && (
                <p className="text-xs text-gray-500">{dept}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function MDTaskDetail() {
  const params = useParams() || {};
  const taskId = params.taskId;
  const router = useRouter();
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [statusChangingTo, setStatusChangingTo] = useState<string | null>(null);

  const fetchTask = useCallback(async () => {
    if (!taskId) return;
    try {
      const res = await fetchWithAuth(`/api/tasks/${taskId}`);
      if (res.ok) {
        const data = await res.json();
        setTaskData(data);
      } else {
        setTaskData(null);
      }
    } catch {
      setTaskData(null);
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleStatusChange = async (newStatus) => {
    if (!taskData || statusChangingTo) return;
    setStatusChangingTo(newStatus);
    try {
      const res = await fetchWithAuth(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setTaskData((p) => p ? ({ ...p, status: newStatus }) : p);
        toast.success(`Task status changed to ${newStatus}`);
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to update status");
      }
    } catch {
      toast.error("Failed to update status");
    } finally {
      setStatusChangingTo(null);
    }
  };

  const getStatusTone = (status) => {
    switch(status) {
      case 'COMPLETED': return 'success';
      case 'IN_PROGRESS': return 'info';
      case 'ON_HOLD': return 'warn';
      case 'CANCELLED': return 'danger';
      default: return 'default';
    }
  };

  const getPriorityTone = (priority) => {
    switch(priority) {
      case 'CRITICAL': return 'danger';
      case 'HIGH': return 'warn';
      case 'MEDIUM': return 'info';
      default: return 'success';
    }
  };

  const fmtDate = (iso) =>
    iso ? new Date(iso).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" }) : "Not set";

  if (loading) {
    return (
      <Layout menuItems={MDMenuItems} userRole="MD">
        <div className="space-y-6">
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">{renderNodeWithIcons("📋")}</div>
            <p className="text-gray-600">Loading task…</p>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!taskData) {
    return (
      <Layout menuItems={MDMenuItems} userRole="MD">
        <div className="space-y-6">
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">{renderNodeWithIcons("📋")}</div>
            <h2 className="text-xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
              Task not found
            </h2>
            <p className="text-gray-600 mt-2">
              No task data available. Create tasks from the tasks list or select an existing task.
            </p>
            <button
              onClick={() => router.push("/md-dashboard/tasks")}
              className="mt-6 px-6 py-3 rounded-2xl font-semibold text-white transition"
              style={{ backgroundColor: "var(--primary-blue)" }}
            >
              Back to Tasks
            </button>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
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
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div>
                <button
                  onClick={() => router.push('/md-dashboard/tasks')}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
                >
                  ← Back to Tasks
                </button>
                
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Pill tone={getStatusTone(taskData.status)}>{taskData.status.replace("_", " ")}</Pill>
                  <Pill tone={getPriorityTone(taskData.priority)}>{taskData.priority}</Pill>
                  <Pill tone="info">{taskData.type}</Pill>
                  <Pill>{taskData.department || "—"}</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  {taskData.title}
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  ID: {taskData.id} • Created by {taskCreatedByLabel(taskData)} on {fmtDate(taskData.createdAt)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/md-dashboard/edit-task/${taskId}`}>
                  <button
                    className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                  >
                    Edit
                  </button>
                </Link>
                <button
                  className="px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                  style={{ backgroundColor: "var(--accent-red)" }}
                >
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border-t border-gray-200/70">
            <div className="flex flex-wrap">
              {[
                { id: "overview", label: "Overview" },
                { id: "updates", label: "Updates & Comments" },
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

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Task Details - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <SectionTitle title="Task Details" />

                <div className="mt-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Description
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {taskData.description || "No description provided."}
                    </p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Estimated Hours", value: taskData.estimatedHours ?? "—", icon: "⏱️" },
                      { label: "Assignees", value: taskData.assignments?.length ?? 0, icon: "👥" },
                    ].map((stat, index) => (
                      <div key={index} className="rounded-2xl border border-gray-200/70 p-4 hover:bg-gray-50 transition">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">{stat.label}</p>
                          <span className="text-lg">{renderNodeWithIcons(stat.icon)}</span>
                        </div>
                        <p className="text-2xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Task Info & Actions - Right Column */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6">
                <SectionTitle title="Task Information" />

                <div className="mt-6 space-y-4">
                  <InfoRow label="Department" value={getTaskDepartmentDisplay(taskData)} />

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Created By</label>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        {taskCreatedByLabel(taskData).charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-gray-900">{taskCreatedByLabel(taskData)}</p>
                        <p className="text-xs text-gray-500">{fmtDate(taskData.createdAt)}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Assigned To</label>
                    <AssignmentDisplay task={taskData} />
                  </div>

                  <InfoRow label="Start Date" value={fmtDate(taskData.startDate)} />

                  <InfoRow
                    label="Due Date"
                    value={
                      <span
                        className={`font-extrabold ${
                          taskData.dueDate && new Date(taskData.dueDate) < new Date() && taskData.status !== "COMPLETED"
                            ? "text-red-600"
                            : ""
                        }`}
                      >
                        {fmtDate(taskData.dueDate)}
                        {taskData.dueDate &&
                          new Date(taskData.dueDate) < new Date() &&
                          taskData.status !== "COMPLETED" && (
                            <span className="ml-2 text-xs">(Overdue)</span>
                          )}
                      </span>
                    }
                  />

                  <InfoRow label="Visibility" value={taskData.visibility || "—"} />
                </div>
              </Card>

              {/* Status Update Card */}
              <Card className="p-6">
                <SectionTitle title="Update Status" />
                
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {["PENDING", "IN_PROGRESS", "ON_HOLD", "COMPLETED", "CANCELLED"].map((status) => (
                    <button
                      key={status}
                      className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition active:scale-[0.99] ${
                        taskData.status === status ? "text-white" : "border bg-white hover:bg-gray-50"
                      }`}
                      style={{
                        backgroundColor: taskData.status === status ? "var(--secondary-blue)" : undefined,
                        borderColor: taskData.status === status ? "transparent" : "rgba(0,0,0,0.08)",
                      }}
                      disabled={Boolean(statusChangingTo)}
                      onClick={() => handleStatusChange(status)}
                    >
                      {statusChangingTo === status ? "Updating..." : status.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "updates" && (
          <Card className="p-6">
            <SectionTitle title="Updates & Comments" subtitle="Commenting coming soon" />
            <div className="mt-6 p-8 text-center text-gray-500">
              <p>Add comments and updates to tasks (coming soon).</p>
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="p-6">
          <SectionTitle title="Quick Actions" subtitle="Common task operations" />
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "📋", label: "Create Sub-task", color: "var(--primary-blue)" },
              { icon: "🔄", label: "Reassign Task", color: "var(--secondary-blue)" },
              { icon: "📅", label: "Extend Deadline", color: "#10B981" },
              { icon: "📊", label: "View Analytics", color: "#8B5CF6" },
            ].map((action, index) => (
              <button
                key={index}
                className="group p-5 rounded-2xl border border-gray-200/70 hover:-translate-y-0.5 transition-all text-center"
              >
                <div
                  className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition"
                  style={{ backgroundColor: `${action.color}18` }}
                >
                  <span style={{ color: action.color }}>{renderNodeWithIcons(action.icon)}</span>
                </div>
                <p className="font-extrabold text-sm" style={{ color: action.color }}>
                  {action.label}
                </p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}

// Helper component for info rows
const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
    <p className="font-extrabold text-gray-900">{value}</p>
  </div>
);