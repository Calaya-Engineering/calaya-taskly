"use client";

// pages/dashboards/MD/MDEditTask.jsx
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { UserIcon } from "@/lib/icons";
import { MDMenuItems } from "@/utils/menus";
import { BuildingIcon, UsersIcon, TeamIcon } from "@/lib/icons";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

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
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

const getPriorityTone = (p) => (p === "CRITICAL" ? "danger" : p === "HIGH" ? "warn" : p === "MEDIUM" ? "info" : "success");

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" }) : "Not set";

export default function MDEditTask() {
  const params = useParams() || {};
  const taskId = params.taskId;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [task, setTask] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [hodUsers, setHodUsers] = useState([]);
  const [staffUsers, setStaffUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    priority: "MEDIUM",
    status: "PENDING",
    type: "TASK",
    startDate: "",
    dueDate: "",
    estimatedHours: "",
    visibility: "ASSIGNED_ONLY",
    departments: [],
    hods: [],
    staff: [],
  });

  const fetchTask = useCallback(async () => {
    if (!taskId) return;
    try {
      const res = await fetchWithAuth(`/api/tasks/${taskId}`);
      if (res.ok) {
        const data = await res.json();
        setTask(data);
        const hodIds = data.assignments?.filter((a) => a.user?.role === "HOD").map((a) => a.userId) ?? [];
        const staffIds = data.assignments?.filter((a) => a.user?.role === "Staff").map((a) => a.userId) ?? [];
        const deptSet = new Set(data.assignments?.map((a) => a.user?.department).filter(Boolean) ?? []);
        setFormData({
          title: data.title ?? "",
          description: data.description ?? "",
          department: data.department ?? "",
          priority: data.priority ?? "MEDIUM",
          status: data.status ?? "PENDING",
          type: data.type ?? "TASK",
          startDate: data.startDate ? data.startDate.slice(0, 10) : "",
          dueDate: data.dueDate ? data.dueDate.slice(0, 10) : "",
          estimatedHours: data.estimatedHours ? String(data.estimatedHours) : "",
          visibility: data.visibility ?? "ASSIGNED_ONLY",
          departments: [...deptSet],
          hods: hodIds,
          staff: staffIds,
        });
      } else {
        setTask(null);
      }
    } catch {
      setTask(null);
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  useEffect(() => {
    async function loadOptions() {
      try {
        const [deptRes, hodRes, staffRes] = await Promise.all([
          fetchWithAuth("/api/departments"),
          fetchWithAuth("/api/users?role=HOD"),
          fetchWithAuth("/api/users?role=Staff"),
        ]);
        if (deptRes.ok) setDepartments((await deptRes.json()).map((d) => d.name));
        if (hodRes.ok) setHodUsers(await hodRes.json());
        if (staffRes.ok) setStaffUsers(await staffRes.json());
      } catch (e) {
        console.error("Failed to load options:", e);
      }
    }
    loadOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task) return;
    if (!formData.title?.trim()) {
      toast.warning("Title is required");
      return;
    }

    const deptIds = new Set(formData.hods);
    formData.staff.forEach((id) => deptIds.add(id));

    if (formData.departments.length > 0) {
      const params = formData.departments.map((d) => `department=${encodeURIComponent(d)}`).join("&");
      const res = await fetchWithAuth(`/api/users?${params}`);
      if (res.ok) {
        const users = await res.json();
        users.forEach((u) => deptIds.add(u.id));
      }
    }

    const finalAssigneeIds = [...deptIds];

    setSaving(true);
    try {
      const res = await fetchWithAuth(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description?.trim() || null,
          department: formData.department || formData.departments[0] || null,
          priority: formData.priority,
          status: formData.status,
          type: formData.type,
          startDate: formData.startDate || null,
          dueDate: formData.dueDate || null,
          estimatedHours: formData.estimatedHours ? parseInt(formData.estimatedHours, 10) : null,
          visibility: formData.visibility,
          assigneeIds: finalAssigneeIds,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to update task");
      }
      toast.success("Task updated successfully!");
      router.push(`/md-dashboard/task/${taskId}`);
    } catch (err) {
      toast.error(err.message || "Failed to update task");
    } finally {
      setSaving(false);
    }
  };

  const toggleUser = (userId, list) => {
    setFormData((p) => ({
      ...p,
      [list]: p[list].includes(userId) ? p[list].filter((id) => id !== userId) : [...p[list], userId],
    }));
  };

  const toggleDepartment = (dept) => {
    setFormData((p) => ({
      ...p,
      departments: p.departments.includes(dept) ? p.departments.filter((d) => d !== dept) : [...p.departments, dept],
    }));
  };

  if (loading) {
    return (
      <Layout menuItems={MDMenuItems} userRole="MD">
        <Card className="p-12 text-center">
          <p className="text-gray-600">Loading task…</p>
        </Card>
      </Layout>
    );
  }

  if (!task) {
    return (
      <Layout menuItems={MDMenuItems} userRole="MD">
        <Card className="p-12 text-center">
          <h2 className="text-xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
            Task not found
          </h2>
          <Link href="/md-dashboard/tasks" className="mt-4 inline-block px-6 py-3 rounded-2xl font-semibold text-white" style={{ backgroundColor: "var(--primary-blue)" }}>
            Back to Tasks
          </Link>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="overflow-hidden">
          <div className="p-6 md:p-8" style={{ background: "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)" }}>
            <Link href={`/md-dashboard/task/${taskId}`} className="text-sm text-gray-600 hover:text-gray-800 mb-4 inline-block">
              ← Back to Task
            </Link>
            <h1 className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
              Edit Task
            </h1>
            <p className="text-gray-600 mt-1">Update task details and assignees.</p>
          </div>
        </Card>

        <form onSubmit={handleSubmit}>
          <Card className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={formData.title}
                onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={formData.description}
                onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.department}
                  onChange={(e) => setFormData((p) => ({ ...p, department: e.target.value }))}
                >
                  <option value="">— Select —</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.status}
                  onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value }))}
                >
                  {["PENDING", "IN_PROGRESS", "ON_HOLD", "COMPLETED", "CANCELLED"].map((s) => (
                    <option key={s} value={s}>{s.replace("_", " ")}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.priority}
                  onChange={(e) => setFormData((p) => ({ ...p, priority: e.target.value }))}
                >
                  {["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.type}
                  onChange={(e) => setFormData((p) => ({ ...p, type: e.target.value }))}
                >
                  <option value="TASK">Task</option>
                  <option value="JOB">Job</option>
                </select>
              </div>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.dueDate}
                  onChange={(e) => setFormData((p) => ({ ...p, dueDate: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Assignees (Departments or Users)</label>
              <p className="text-xs text-gray-500 mb-3">Select departments to assign all users in that department, or select individual HODs/Staff.</p>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Departments</p>
                  <div className="flex flex-wrap gap-2">
                    {departments.map((d) => {
                      const active = formData.departments.includes(d);
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => toggleDepartment(d)}
                          className={`px-3 py-2 rounded-xl text-sm font-semibold border transition ${active ? "text-white" : "bg-white hover:bg-gray-50"}`}
                          style={{ backgroundColor: active ? "var(--primary-blue)" : undefined, borderColor: active ? "transparent" : "rgba(0,0,0,0.08)" }}
                        >
                          {d} {renderNodeWithIcons(active ? "✓" : "")}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">HODs</p>
                  <div className="flex flex-wrap gap-2">
                    {hodUsers.map((u) => {
                      const active = formData.hods.includes(u.id);
                      return (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => toggleUser(u.id, "hods")}
                          className={`px-3 py-2 rounded-xl text-sm font-semibold border transition ${active ? "bg-blue-50" : "bg-white hover:bg-gray-50"}`}
                          style={{ borderColor: active ? "rgba(44, 75, 155, 0.35)" : "rgba(0,0,0,0.08)" }}
                        >
                          {u.name || u.email} {renderNodeWithIcons(active ? "✓" : "")}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Staff</p>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {staffUsers.map((u) => {
                      const active = formData.staff.includes(u.id);
                      return (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => toggleUser(u.id, "staff")}
                          className={`px-3 py-2 rounded-xl text-sm font-semibold border transition ${active ? "bg-emerald-50" : "bg-white hover:bg-gray-50"}`}
                          style={{ borderColor: active ? "rgba(16,185,129,0.25)" : "rgba(0,0,0,0.08)" }}
                        >
                          {u.name || u.email} {renderNodeWithIcons(active ? "✓" : "")}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition disabled:opacity-70"
                style={{ backgroundColor: "var(--primary-blue)" }}
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
              <Link
                href={`/md-dashboard/task/${taskId}`}
                className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
              >
                Cancel
              </Link>
            </div>
          </Card>
        </form>
      </div>
    </Layout>
  );
}
