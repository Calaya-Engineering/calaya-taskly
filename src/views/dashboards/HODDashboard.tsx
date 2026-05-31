"use client";

// views/dashboards/HODDashboard.jsx
import Link from "next/link";
import Layout from "../../components/Layout";
import { HODMenuItems } from "@/utils/menus";
import {
  PlusIcon,
  FileUploadIconComponent,
  MegaphoneIcon,
  CalendarIcon,
  TaskIcon as TaskIconLib,
  AlertIcon as AlertIconLib,
  UserIcon as UserIconLib,
  ClockIcon as ClockIconLib,
  DocumentIcon as DocumentIconLib,
} from "@/lib/icons";
import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import { TASK_STATUS_PENDING_HOD_APPROVAL } from "@/lib/task-approval";
import { collectTaskDepartmentKeys, taskDepartmentLabel } from "@/lib/task-display";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

/* ─── Types ─────────────────────────────────────────────────────── */
interface TaskItem {
  id: string;
  title: string;
  status: string;
  type?: string;
  department?: string;
  priority?: string;
  dueDate?: string;
  escalated?: boolean;
  assignments?: {
    userId?: string;
    user?: {
      department?: string | null;
      managedDepartmentRelations?: { department?: { name?: string } }[];
    };
  }[];
}

interface TenderItem {
  id: string;
  title: string;
  status: string;
  department?: string;
  closingDate?: string;
}

interface NotificationItem {
  id: string;
  message: string;
  read?: boolean;
  createdAt?: string;
  actor?: { name?: string };
}

interface MeData {
  id?: string;
  name?: string;
  department?: string;
  primaryDepartment?: string;
  managedDepartments?: string[];
}

function taskMatchesActiveDepartments(task: TaskItem, activeDepartments: string[]) {
  if (activeDepartments.length === 0) return true;
  const keys = collectTaskDepartmentKeys(task);
  if (keys.size === 0) return false;
  return activeDepartments.some((d) => keys.has(d));
}

/* ─── UI helpers ─────────────────────────────────────────────────── */
const Card = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle, action }: { title: string; subtitle?: React.ReactNode; action?: React.ReactNode }) => (
  <div className="flex items-start justify-between gap-3">
    <div>
      <h2
        className="text-lg md:text-xl font-extrabold tracking-tight"
        style={{ color: "var(--primary-blue)" }}
      >
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
          : tone === "purple"
            ? "bg-purple-50 text-purple-700 ring-purple-100"
            : "bg-blue-50 text-blue-700 ring-blue-100";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}
    >
      {children}
    </span>
  );
};

const priorityTone = (p) =>
  p === "URGENT" || p === "CRITICAL"
    ? "danger"
    : p === "IMPORTANT" || p === "HIGH"
      ? "warn"
      : "default";

const fmtDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "Invalid Date";
  return d.toLocaleDateString('en-US', {
    month: "short",
    day: "numeric",
  });
};

const fmtRelative = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const SkeletonBar = () => (
  <div className="animate-pulse h-8 bg-gray-100 rounded-xl w-16" />
);

/* ─── Main Component ─────────────────────────────────────────────── */
export default function HODDashboard() {
  const [me, setMe] = useState<MeData | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [tenders, setTenders] = useState<TenderItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  /* ── Fetch all dashboard data ── */
  const fetchAll = useCallback(async () => {
    try {
      const [meRes, tasksRes, tendersRes, notifsRes] = await Promise.allSettled([
        fetchWithAuth("/api/me").then((r) => (r.ok ? r.json() : null)),
        fetchWithAuth("/api/tasks?limit=200").then((r) => (r.ok ? r.json() : [])),
        fetchWithAuth("/api/tenders?limit=200").then((r) => (r.ok ? r.json() : [])),
        fetchWithAuth("/api/notifications?limit=10").then((r) => (r.ok ? r.json() : [])),
      ]);

      const meData = meRes.status === "fulfilled" ? meRes.value : null;
      const tasksData = tasksRes.status === "fulfilled" ? (Array.isArray(tasksRes.value) ? tasksRes.value : []) : [];
      const tendersData = tendersRes.status === "fulfilled" ? (Array.isArray(tendersRes.value) ? tendersRes.value : []) : [];
      const notifsData = notifsRes.status === "fulfilled" ? (Array.isArray(notifsRes.value) ? notifsRes.value : []) : [];

      setMe(meData);
      setTasks(tasksData);
      setTenders(tendersData);
      setNotifications(notifsData);
      setLastUpdated(new Date());
    } catch (e) {
      console.error("HOD dashboard fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  /* ── Auto-refresh every 30 seconds as SSE fallback ── */
  useEffect(() => {
    const interval = setInterval(() => fetchAll(), 30_000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  /* ── SSE: refresh on any task, tender, or announcement event ── */
  useSSE("/api/tasks/events", (ev) => {
    if (ev.type && (ev.type.startsWith("task:") || ev.type.startsWith("tender:") || ev.type.startsWith("announcement:"))) {
      fetchAll();
    }
  });

  /* ── Derived analytics ── */
  const now = Date.now();

  const managedDepartments = Array.isArray(me?.managedDepartments) && me.managedDepartments.length > 0
    ? me.managedDepartments
    : me?.department ? [me.department] : [];
  const activeDepartments = selectedDepartment === "all"
    ? managedDepartments
    : managedDepartments.filter((departmentName) => departmentName === selectedDepartment);
  const myDept = me?.primaryDepartment || me?.department || null;
  const myId = me?.id || null;

  useEffect(() => {
    if (managedDepartments.length <= 1) {
      setSelectedDepartment(managedDepartments[0] || "all");
      return;
    }
    setSelectedDepartment((current) => (current === "all" || managedDepartments.includes(current) ? current : "all"));
  }, [managedDepartments]);

  // All non-completed, non-event tasks in HOD's department (or assigned to HOD)
  const deptTasks = useMemo(
    () =>
      tasks.filter(
        (t) =>
          t.status !== "COMPLETED" &&
          t.type !== "EVENT" &&
          (taskMatchesActiveDepartments(t, activeDepartments) ||
            t.assignments?.some((a) => String(a.userId) === String(myId)))
      ),
    [tasks, activeDepartments, myId]
  );

  const inProgressTasks = useMemo(
    () => deptTasks.filter((t) => t.status === "IN_PROGRESS"),
    [deptTasks]
  );

  const overdueTasks = useMemo(
    () =>
      deptTasks.filter((t) => {
        if (!t.dueDate) return false;
        return new Date(t.dueDate).getTime() < now;
      }),
    [deptTasks, now]
  );

  const myTasks = useMemo(
    () =>
      tasks.filter(
        (t) =>
          t.status !== "COMPLETED" &&
          t.type !== "EVENT" &&
          t.assignments?.some((a) => a.userId === myId)
      ),
    [tasks, myId]
  );

  const pendingApprovals = useMemo(
    () =>
      tasks.filter(
        (t) =>
          t.status === TASK_STATUS_PENDING_HOD_APPROVAL && taskMatchesActiveDepartments(t, activeDepartments)
      ),
    [tasks, activeDepartments]
  );

  const activeTenders = useMemo(
    () =>
      tenders.filter(
        (t) =>
          (t.status === "OPEN" || t.status === "ACTIVE") &&
          (activeDepartments.length === 0 || activeDepartments.includes(t.department || ""))
      ),
    [tenders, activeDepartments]
  );

  const escalatedCount = useMemo(
    () => deptTasks.filter((t) => t.escalated).length,
    [deptTasks]
  );

  // Completion rate for the department
  const completedDeptTasks = useMemo(
    () =>
      tasks.filter(
        (t) =>
          t.status === "COMPLETED" &&
          t.type !== "EVENT" &&
          (taskMatchesActiveDepartments(t, activeDepartments) ||
            t.assignments?.some((a) => String(a.userId) === String(myId)))
      ),
    [tasks, activeDepartments, myId]
  );

  const totalDeptAll = deptTasks.length + completedDeptTasks.length;
  const completionRate =
    totalDeptAll > 0 ? Math.round((completedDeptTasks.length / totalDeptAll) * 100) : 0;

  /* ── Stats array (computed from real data) ── */
  const stats = useMemo(
    () => [
      {
        title: "Department Tasks",
        value: deptTasks.length,
        sub: `${completionRate}% completion rate`,
        color: "var(--primary-blue)",
        link: "/hod-dashboard/tasks",
        bar: `${Math.min(deptTasks.length, 100)}%`,
        icon: <TaskIconLib size={24} />,
      },
      {
        title: "In Progress",
        value: inProgressTasks.length,
        sub: `of ${deptTasks.length} open tasks`,
        color: "var(--secondary-blue)",
        link: "/hod-dashboard/tasks",
        bar: deptTasks.length > 0 ? `${Math.round((inProgressTasks.length / deptTasks.length) * 100)}%` : "0%",
        icon: <AlertIconLib size={24} />,
      },
      {
        title: "Overdue Tasks",
        value: overdueTasks.length,
        sub: overdueTasks.length > 0 ? "Needs immediate attention" : "All tasks on schedule",
        color: "var(--accent-red)",
        link: "/hod-dashboard/escalations",
        bar: deptTasks.length > 0 ? `${Math.round((overdueTasks.length / deptTasks.length) * 100)}%` : "0%",
        icon: <AlertIconLib size={24} />,
      },
      {
        title: "My Pending Tasks",
        value: myTasks.length,
        sub: "Assigned directly to you",
        color: "#8B5CF6",
        link: "/hod-dashboard/my-tasks",
        bar: `${Math.min(myTasks.length * 10, 100)}%`,
        icon: <UserIconLib size={24} />,
      },
      {
        title: "Pending Approvals",
        value: pendingApprovals.length,
        sub: "Awaiting your decision",
        color: "#F59E0B",
        link: "/hod-dashboard/approvals",
        bar: `${Math.min(pendingApprovals.length * 10, 100)}%`,
        icon: <ClockIconLib size={24} />,
      },
      {
        title: "Active Tenders",
        value: activeTenders.length,
        sub: "Open procurement items",
        color: "#10B981",
        link: "/hod-dashboard/tenders",
        bar: `${Math.min(activeTenders.length * 15, 100)}%`,
        icon: <DocumentIconLib size={24} />,
      },
    ],
    [deptTasks, inProgressTasks, overdueTasks, myTasks, pendingApprovals, activeTenders, completionRate]
  );

  /* ── Quick actions ── */
  const actions = useMemo(() => [
    { title: "Assign Task", desc: "Assign work to team members", icon: <PlusIcon />, link: "/hod-dashboard/create-task" },
    { title: "Upload Document", desc: "Add files to workspace", icon: <FileUploadIconComponent />, link: "/hod-dashboard/create-document" },
    { title: "Schedule Meeting", desc: "Create events quickly", icon: <CalendarIcon />, link: "/hod-dashboard/create-event" },
    { title: "Post Announcement", desc: "Update your department", icon: <MegaphoneIcon />, link: "/hod-dashboard/create-announcement" },
  ], []);

  /* ── Department breakdown ── */
  const deptBreakdown = useMemo(() => {
    return activeDepartments.map((departmentName) => {
      const deptOnly = tasks.filter(
        (t) => t.department === departmentName && t.type !== "EVENT"
      );
      const completed = deptOnly.filter((t) => t.status === "COMPLETED").length;
      const total = deptOnly.length;
      const overdue = deptOnly.filter(
        (t) => t.status !== "COMPLETED" && t.dueDate && new Date(t.dueDate).getTime() < now
      ).length;
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { name: departmentName, tasks: total, progress, overdue };
    });
  }, [tasks, activeDepartments, now]);

  if (loading && tasks.length === 0) {
    return <DashboardSkeleton />;
  }

  /* ─────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-6">
        {/* HERO */}
        <section className="ct-card p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="ct-pill" style={{ background: "var(--tile-blue-bg)", color: "var(--tile-blue-fg)" }}>
                  Department Overview
                </span>
                {loading ? (
                  <span className="ct-pill">Loading…</span>
                ) : escalatedCount > 0 ? (
                  <span className="ct-pill" style={{ background: "var(--accent-red-100)", color: "var(--accent-red)" }}>
                    {renderNodeWithIcons("⚠ ")}{escalatedCount} Escalated
                  </span>
                ) : (
                  <span className="ct-pill" style={{ background: "var(--tile-green-bg)", color: "var(--tile-green-fg)" }}>
                    All Clear
                  </span>
                )}
                {selectedDepartment === "all" && managedDepartments.length > 1 ? (
                  <span className="ct-pill" style={{ background: "var(--tile-purple-bg)", color: "var(--tile-purple-fg)" }}>
                    All Assigned Departments
                  </span>
                ) : myDept ? (
                  <span className="ct-pill" style={{ background: "var(--tile-purple-bg)", color: "var(--tile-purple-fg)" }}>
                    {selectedDepartment === "all" ? myDept : selectedDepartment}
                  </span>
                ) : null}
              </div>

              <h1
                className="text-[28px] md:text-[34px] font-bold tracking-tight leading-[1.1]"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
              >
                Welcome Back{me?.name ? `, ${me.name}` : ""} <span aria-hidden="true">👋</span>
              </h1>
              <p
                className="mt-2 text-[15px]"
                style={{ color: "var(--text-secondary)", maxWidth: "62ch" }}
              >
                Manage your assigned department tasks, monitor performance, and oversee operations at a glance.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {managedDepartments.length > 1 ? (
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="ct-input"
                  style={{ minWidth: 220 }}
                >
                  <option value="all">All Assigned Departments</option>
                  {managedDepartments.map((departmentName) => (
                    <option key={departmentName} value={departmentName}>
                      {departmentName}
                    </option>
                  ))}
                </select>
              ) : null}
              <button onClick={() => fetchAll()} className="ct-btn ct-btn-primary">
                ↻ Refresh
              </button>
              <Link href="/hod-dashboard/tasks">
                <button className="ct-btn ct-btn-secondary">View All Tasks</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Live Stats</span>
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full bg-emerald-500"
                  style={{ animation: "hod-pulse 2s ease-in-out infinite" }}
                />
                <style>{`@keyframes hod-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(0.85)} }`}</style>
                <span className="text-xs text-emerald-600 font-semibold">Real-time</span>
              </span>
            </div>
            {lastUpdated && (
              <span className="text-xs text-gray-400">
                Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {stats.map((stat, idx) => {
            const palette = [
              { bg: "var(--tile-blue-bg)",   fg: "var(--tile-blue-fg)" },
              { bg: "var(--tile-orange-bg)", fg: "var(--tile-orange-fg)" },
              { bg: "var(--tile-purple-bg)", fg: "var(--tile-purple-fg)" },
              { bg: "var(--tile-green-bg)",  fg: "var(--tile-green-fg)" },
              { bg: "var(--tile-pink-bg)",   fg: "var(--tile-pink-fg)" },
              { bg: "var(--tile-cyan-bg)",   fg: "var(--tile-cyan-fg)" },
            ];
            const tone = palette[idx % palette.length];
            return (
              <Link key={stat.title} href={stat.link} className="block">
                <div className="ct-card ct-card-hover p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="ct-stat-icon"
                      style={{ backgroundColor: tone.bg, color: tone.fg }}
                      aria-hidden="true"
                    >
                      {renderNodeWithIcons(stat.icon)}
                    </span>
                  </div>
                  <div className="mt-3">
                    {loading ? (
                      <SkeletonBar />
                    ) : (
                      <div
                        className="text-[30px] font-bold leading-none tracking-tight"
                        style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
                      >
                        {stat.value}
                      </div>
                    )}
                    <div
                      className="text-[12px] mt-1.5 font-medium"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {stat.title}
                    </div>
                  </div>
                  <div
                    className="mt-4 h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--surface-page)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: loading ? "0%" : stat.bar, backgroundColor: tone.fg }}
                    />
                  </div>
                  <div
                    className="mt-3 text-[12px] font-medium"
                    style={{ color: tone.fg }}
                  >
                    {stat.sub}
                  </div>
                </div>
              </Link>
            );
          })}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <SectionTitle title="Quick Actions" subtitle="Fast shortcuts for common department operations" />
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {actions.map((a) => (
              <Link key={a.title} href={a.link} className="group">
                <div className="p-5 rounded-2xl border border-gray-200/80 bg-white hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(109,198,223,0.18)", color: "var(--primary-blue)" }}
                    >
                      {renderNodeWithIcons(a.icon)}
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-700 transition">Open →</span>
                  </div>
                  <div className="mt-4">
                    <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      {a.title}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{a.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Two Columns */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Department Performance */}
          <Card className="p-6">
            <SectionTitle
              title="Department Overview"
              subtitle="Progress and task distribution"
              action={
                <Link href="/hod-dashboard/tasks">
                  <button
                    className="text-sm font-semibold px-3 py-2 rounded-xl text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    View All Tasks
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-3">
              {loading ? (
                <div className="animate-pulse space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-20 bg-gray-100 rounded-2xl" />
                  ))}
                </div>
              ) : deptBreakdown.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">No department data found.</p>
              ) : (
                deptBreakdown.map((dept) => (
                  <Link key={dept.name} href={`/hod-dashboard/tasks`} className="block">
                    <div className="rounded-2xl border border-gray-200/70 p-4 hover:bg-gray-50 transition">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0"
                            style={{ backgroundColor: "var(--primary-blue)" }}
                          >
                            {dept.name.charAt(0)}
                          </div>
                          <div className="font-semibold">{dept.name} Department</div>
                        </div>
                        <Pill
                          tone={
                            dept.progress >= 70 ? "success" : dept.progress >= 40 ? "warn" : "danger"
                          }
                        >
                          {dept.progress}%
                        </Pill>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                        <span>{dept.tasks} total tasks</span>
                        <span className={dept.overdue > 0 ? "text-red-600 font-semibold" : "text-gray-400"}>
                          {dept.overdue} overdue
                        </span>
                      </div>

                      <div className="mt-3 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${dept.progress}%`,
                            backgroundColor: "var(--primary-blue)",
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                ))
              )}

              {/* Summary micro-stats */}
              {!loading && (
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[
                    { label: "Total", value: deptTasks.length, color: "var(--primary-blue)" },
                    { label: "In Progress", value: inProgressTasks.length, color: "var(--secondary-blue)" },
                    { label: "Overdue", value: overdueTasks.length, color: "var(--accent-red)" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-gray-200/70 p-3 text-center">
                      <p className="text-[11px] text-gray-500">{s.label}</p>
                      <p className="text-xl font-extrabold mt-1" style={{ color: s.color }}>
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Recent Activity (from notifications) */}
          <Card className="p-6">
            <SectionTitle
              title="Recent Activity"
              subtitle="Live updates from your team"
              action={
                <Link href="/hod-dashboard/notifications">
                  <button
                    className="text-sm font-semibold px-3 py-2 rounded-xl text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    See All
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-2">
              {loading ? (
                <div className="animate-pulse space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-2xl" />
                  ))}
                </div>
              ) : notifications.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="text-3xl mb-2">{renderNodeWithIcons("🔔")}</div>
                  <p className="text-sm text-gray-500">No recent notifications</p>
                </div>
              ) : (
                notifications.slice(0, 5).map((n) => (
                  <Link key={n.id} href="/hod-dashboard/notifications" className="block">
                    <div
                      className={`flex items-start gap-3 p-4 rounded-2xl border hover:bg-gray-50 transition ${!n.read ? "border-blue-100 bg-blue-50/40" : "border-gray-200/70"
                        }`}
                    >
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0 text-sm"
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        {n.actor?.name?.charAt(0) || "?"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-800 line-clamp-2">{n.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{fmtRelative(n.createdAt)}</p>
                      </div>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                      )}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Pending Approvals */}
          <Card className="p-6">
            <SectionTitle
              title="Pending Approvals"
              subtitle="Tasks awaiting your action"
              action={
                <Link href="/hod-dashboard/approvals">
                  <button
                    className="text-sm font-semibold px-3 py-2 rounded-xl text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    View All
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-2">
              {loading ? (
                <div className="animate-pulse space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-2xl" />
                  ))}
                </div>
              ) : pendingApprovals.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="text-3xl mb-2">{renderNodeWithIcons("✅")}</div>
                  <p className="text-sm text-gray-500">No pending approvals</p>
                </div>
              ) : (
                pendingApprovals.slice(0, 4).map((task) => (
                  <Link key={task.id} href="/hod-dashboard/approvals" className="block">
                    <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{task.title}</p>
                          <p className="text-sm text-gray-500 mt-1">{taskDepartmentLabel(task)}</p>
                        </div>
                        <div className="text-right shrink-0">
                          {task.dueDate && (
                            <p
                              className="text-sm font-extrabold"
                              style={{
                                color:
                                  task.priority === "URGENT" || task.priority === "CRITICAL"
                                    ? "var(--accent-red)"
                                    : task.priority === "HIGH"
                                      ? "#F59E0B"
                                      : "var(--primary-blue)",
                              }}
                            >
                              {fmtDate(task.dueDate)}
                            </p>
                          )}
                          <Pill tone={priorityTone(task.priority)}>{task.priority}</Pill>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
              {!loading && pendingApprovals.length > 4 && (
                <Link href="/hod-dashboard/approvals">
                  <p className="text-center text-sm text-blue-600 font-semibold pt-1 hover:underline">
                    +{pendingApprovals.length - 4} more pending approvals
                  </p>
                </Link>
              )}
            </div>
          </Card>

          {/* Recent Tenders */}
          <Card className="p-6">
            <SectionTitle
              title="Active Tenders"
              subtitle="Open procurement opportunities"
              action={
                <Link href="/hod-dashboard/tenders">
                  <button
                    className="text-sm font-semibold px-3 py-2 rounded-xl text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    View All
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-2">
              {loading ? (
                <div className="animate-pulse space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-2xl" />
                  ))}
                </div>
              ) : activeTenders.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="text-3xl mb-2">{renderNodeWithIcons("📄")}</div>
                  <p className="text-sm text-gray-500">No active tenders at the moment</p>
                </div>
              ) : (
                activeTenders.slice(0, 4).map((tender) => (
                  <Link
                    key={tender.id}
                    href={`/hod-dashboard/tenders`}
                    className="block"
                  >
                    <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{tender.title}</p>
                          <p className="text-sm text-gray-500 mt-1">{tender.department || "—"}</p>
                        </div>
                        <div className="text-right shrink-0">
                          {tender.closingDate && (
                            <p className="text-sm text-gray-500">{fmtDate(tender.closingDate)}</p>
                          )}
                          <Pill tone={tender.status === "OPEN" ? "success" : "default"}>
                            {tender.status}
                          </Pill>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
              {!loading && activeTenders.length > 4 && (
                <Link href="/hod-dashboard/tenders">
                  <p className="text-center text-sm text-blue-600 font-semibold pt-1 hover:underline">
                    +{activeTenders.length - 4} more tenders
                  </p>
                </Link>
              )}
            </div>
          </Card>
        </div>
      </div>
  );
}
