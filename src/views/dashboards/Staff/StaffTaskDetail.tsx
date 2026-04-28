"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";
import { getTaskStatusLabel } from "@/lib/task-approval";

interface AssignmentUser {
  name?: string | null;
  email?: string | null;
  role?: string | null;
  department?: string | null;
  managedDepartmentRelations?: { department: { name: string } }[];
}

interface TaskData {
  id: number;
  title: string;
  description?: string | null;
  status: string;
  priority: string;
  type?: string | null;
  department?: string | null;
  visibility?: string | null;
  assignmentType?: string | null;
  estimatedHours?: number | null;
  startDate?: string | null;
  dueDate?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  assignments?: { user?: AssignmentUser | null }[];
  createdBy?: { role?: string | null; name?: string | null } | null;
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

const taskCreatedByLabel = (task?: TaskData | null) =>
  task?.createdBy?.name || task?.createdBy?.role || "—";

const taskAssigneeLabel = (task?: TaskData | null) => {
  const assignments = task?.assignments || [];
  if (assignments.length === 0) return "Unassigned";
  if (assignments.length === 1) return assignments[0]?.user?.name || assignments[0]?.user?.email || "—";
  return `${assignments.length} assignees`;
};

const fmtDate = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Not set";

const fmtDateTime = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
        day: "numeric",
        hour12: true,
      })
    : "Not set";

const getPriorityTone = (priority?: string | null) => {
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

const getStatusTone = (status?: string | null) => {
  switch (status) {
    case "COMPLETED":
      return "success";
    case "IN_PROGRESS":
      return "info";
    case "PENDING":
    case "PENDING_HOD_APPROVAL":
      return "warn";
    case "PENDING_MD_APPROVAL":
      return "info";
    case "ON_HOLD":
      return "warn";
    case "CANCELLED":
    case "OVERDUE":
      return "danger";
    default:
      return "default";
  }
};

const getUserDepartment = (user?: AssignmentUser | null): string | undefined => {
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

export default function StaffTaskDetail() {
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

  const handleStatusChange = async (newStatus: string) => {
    if (!taskData || statusChangingTo) return;
    setStatusChangingTo(newStatus);
    try {
      const res = await fetchWithAuth(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || "Failed to update status");
        return;
      }
      setTaskData(data);
      toast.success(`Task status updated to ${getTaskStatusLabel(data.status || newStatus)}`);
    } catch {
      toast.error("Failed to update status");
    } finally {
      setStatusChangingTo(null);
    }
  };

  if (loading) {
    return (
      <Layout menuItems={StaffMenuItems} userRole="Staff">
        <div className="space-y-6">
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">{renderNodeWithIcons("📋")}</div>
            <p className="text-gray-600">Loading task...</p>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!taskData) {
    return (
      <Layout menuItems={StaffMenuItems} userRole="Staff">
        <div className="space-y-6">
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">{renderNodeWithIcons("📋")}</div>
            <h2 className="text-xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
              Task not found
            </h2>
            <p className="text-gray-600 mt-2">
              No task data is available for this task right now.
            </p>
            <button
              onClick={() => router.push("/staff-dashboard/tasks")}
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
    <Layout menuItems={StaffMenuItems} userRole="Staff">
      <div className="space-y-6">
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
                  onClick={() => router.push("/staff-dashboard/tasks")}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
                >
                  ← Back to Tasks
                </button>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Pill tone={getStatusTone(taskData.status)}>{getTaskStatusLabel(taskData.status)}</Pill>
                  <Pill tone={getPriorityTone(taskData.priority)}>{taskData.priority}</Pill>
                  <Pill tone="info">{taskData.type || "TASK"}</Pill>
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
                <button
                  onClick={() => handleStatusChange("COMPLETED")}
                  disabled={Boolean(statusChangingTo)}
                  className="px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                  style={{ backgroundColor: "var(--secondary-blue)" }}
                >
                  {statusChangingTo === "COMPLETED" ? "Marking complete..." : "Mark Complete"}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border-t border-gray-200/70">
            <div className="flex flex-wrap">
              {[
                { id: "overview", label: "Overview" },
                { id: "updates", label: "Updates" },
              ].map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-semibold transition border-b-2 ${
                      active ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                    }`}
                    style={{ borderBottomColor: active ? "var(--primary-blue)" : "transparent" }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <SectionTitle title="Task Details" />

                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Description
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {taskData.description || "No description provided."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Estimated Hours", value: taskData.estimatedHours ?? "—", icon: "⏱️" },
                      { label: "Assignees", value: taskData.assignments?.length ?? 0, icon: "👥" },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-gray-200/70 p-4 hover:bg-gray-50 transition">
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
                      </span>
                    }
                  />
                  <InfoRow label="Visibility" value={taskData.visibility || "—"} />
                  <InfoRow label="Last Updated" value={fmtDateTime(taskData.updatedAt)} />
                </div>
              </Card>

              <Card className="p-6">
                <SectionTitle title="Update Status" />

                <div className="mt-6 grid grid-cols-1 gap-2">
                  {["PENDING", "IN_PROGRESS", "COMPLETED"].map((status) => (
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
                      {statusChangingTo === status ? "Updating..." : getTaskStatusLabel(status)}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "updates" && (
          <Card className="p-6">
            <SectionTitle title="Updates" subtitle="Live task data from the system" />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-200/70 p-5">
                <p className="text-sm text-gray-500">Current Status</p>
                <p className="mt-2 text-xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                  {getTaskStatusLabel(taskData.status)}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200/70 p-5">
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="mt-2 text-xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                  {fmtDateTime(taskData.updatedAt)}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
    <p className="font-extrabold text-gray-900">{value}</p>
  </div>
);
