"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { StaffMenuItems } from "@/utils/menus";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";
import {
  EditIcon,
  DocumentIcon as DocIconLib,
  FileIcon as FileAttachIcon,
  CalendarIcon as CalIconLib,
  TaskIcon as TaskIconLib,
  ClockIcon,
  CheckCircleIcon,
  ActivityIcon,
} from "@/lib/icons";

import DashboardSkeleton from "@/components/DashboardSkeleton";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

const Card = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none overflow-hidden ${className}`}>{children}</div>
);

const SectionTitle = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) => (
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

const Pill = ({ children, tone = "default" }: { children: React.ReactNode; tone?: string }) => {
  const styles =
    tone === "danger"
      ? "bg-red-50 text-red-700 ring-red-100"
      : tone === "success"
        ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
        : tone === "warn"
          ? "bg-amber-50 text-amber-800 ring-amber-100"
          : "bg-blue-50 text-blue-700 ring-blue-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

const fmtDate = (iso) => {
  if (!iso) return "Not set";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "Invalid Date";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
};

const fmtRelative = (iso) => {
  if (!iso) return "Just now";
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diff = now - then;

  if (!Number.isFinite(diff) || diff < 0) return "Just now";
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return fmtDate(iso);
};

const toStatusLabel = (status) => String(status || "PENDING").replace(/_/g, " ");

const toPriorityTone = (priority) => {
  const p = String(priority || "").toUpperCase();
  if (p === "URGENT" || p === "HIGH") return "danger";
  if (p === "IMPORTANT" || p === "MEDIUM") return "warn";
  if (p === "LOW") return "success";
  return "default";
};

const dueLabel = (iso) => {
  if (!iso) return "No due date";
  const end = new Date(iso).getTime();
  const today = new Date();
  const startOfToday = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const dObj = new Date(iso);
  if (isNaN(dObj.getTime())) return "No due date";
  const dueDay = Date.UTC(dObj.getUTCFullYear(), dObj.getUTCMonth(), dObj.getUTCDate());
  const diffDays = Math.round((dueDay - startOfToday) / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays < 0) return "Overdue";
  if (diffDays <= 7) return `${diffDays} days`;

  if (!Number.isFinite(end)) return "No due date";
  return fmtDate(iso);
};

export default function StaffDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [me, setMe] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [tenders, setTenders] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  const refreshLockRef = useRef(0);

  const fetchDashboardData = useCallback(async (soft = false) => {
    if (!soft) setLoading(true);
    setError("");

    try {
      const meRes = await fetchWithAuth("/api/me");
      const meData = meRes.ok ? await meRes.json() : null;

      if (!meRes.ok || !meData) {
        const err = meData?.error || "Failed to fetch your session";
        throw new Error(err);
      }

      setMe(meData);

      const deptFilter = meData.department
        ? encodeURIComponent(`${meData.department},All Company,Staff`)
        : "All Company,Staff";

      const docQuery = `/api/documents?departments=${deptFilter}&limit=10`;
      const announcementQuery = `/api/announcements?departments=${deptFilter}&limit=10`;
      const tenderQuery = `/api/tenders?status=OPEN&departments=${deptFilter}&limit=10`;

      const [tasksRes, docsRes, tendersRes, announcementsRes, notificationsRes] = await Promise.allSettled([
        fetchWithAuth("/api/tasks/my-tasks?limit=100").then((r) => (r.ok ? r.json() : [])),
        fetchWithAuth(docQuery).then((r) => (r.ok ? r.json() : [])),
        fetchWithAuth(tenderQuery).then((r) => (r.ok ? r.json() : [])),
        fetchWithAuth(announcementQuery).then((r) => (r.ok ? r.json() : [])),
        fetchWithAuth("/api/notifications?limit=30").then((r) => (r.ok ? r.json() : [])),
      ]);

      setTasks(tasksRes.status === "fulfilled" && Array.isArray(tasksRes.value) ? tasksRes.value : []);
      setDocuments(docsRes.status === "fulfilled" && Array.isArray(docsRes.value) ? docsRes.value : []);
      setTenders(tendersRes.status === "fulfilled" && Array.isArray(tendersRes.value) ? tendersRes.value : []);
      setAnnouncements(
        announcementsRes.status === "fulfilled" && Array.isArray(announcementsRes.value)
          ? announcementsRes.value
          : []
      );
      setNotifications(
        notificationsRes.status === "fulfilled" && Array.isArray(notificationsRes.value)
          ? notificationsRes.value
          : []
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      if (!soft) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData(false);
  }, [fetchDashboardData]);

  useSSE("/api/realtime/events", (ev) => {
    if (!ev?.type || ev.type === "ping") return;
    if (
      !ev.type.startsWith("task:") &&
      !ev.type.startsWith("document:") &&
      !ev.type.startsWith("announcement:") &&
      !ev.type.startsWith("notification:") &&
      !ev.type.startsWith("tender:")
    ) {
      return;
    }

    const now = Date.now();
    if (now - refreshLockRef.current < 1500) return;
    refreshLockRef.current = now;
    fetchDashboardData(true);
  });

  const displayName = useMemo(() => {
    if (me?.name) return me.name;
    if (me?.email) return me.email.split("@")[0];
    return "Staff";
  }, [me]);

  const myDepartment = me?.department || "Unassigned";

  const taskStats = useMemo(() => {
    const assigned = tasks.length;
    const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
    const dueSoon = tasks.filter((t) => {
      if (!t.dueDate || t.status === "COMPLETED") return false;
      const due = new Date(t.dueDate).getTime();
      const now = Date.now();
      return due >= now && due <= now + 3 * 86400000;
    }).length;

    const now = new Date();
    const completedThisMonth = tasks.filter((t) => {
      if (t.status !== "COMPLETED") return false;
      const d = new Date(t.updatedAt || t.dueDate || t.createdAt || 0);
      return d.getUTCMonth() === now.getUTCMonth() && d.getUTCFullYear() === now.getUTCFullYear();
    }).length;

    return {
      assigned,
      inProgress,
      dueSoon,
      completedThisMonth,
    };
  }, [tasks]);

  const totalForBars = Math.max(taskStats.assigned, 1);

  const stats = useMemo(
    () => [
      {
        title: "Assigned Tasks",
        value: String(taskStats.assigned),
        change: `${Math.max(taskStats.assigned - taskStats.inProgress, 0)} pending`,
        color: "var(--primary-blue)",
        link: "/staff-dashboard/tasks",
        bar: `${Math.round((taskStats.assigned / totalForBars) * 100)}%`,
      },
      {
        title: "In Progress",
        value: String(taskStats.inProgress),
        change: "Active",
        color: "var(--secondary-blue)",
        link: "/staff-dashboard/tasks?status=in_progress",
        bar: `${Math.round((taskStats.inProgress / totalForBars) * 100)}%`,
      },
      {
        title: "Due Soon",
        value: String(taskStats.dueSoon),
        change: "Next 3 days",
        color: "#F59E0B",
        link: "/staff-dashboard/tasks?due=soon",
        bar: `${Math.round((taskStats.dueSoon / totalForBars) * 100)}%`,
      },
      {
        title: "Completed",
        value: String(taskStats.completedThisMonth),
        change: "This month",
        color: "#10B981",
        link: "/staff-dashboard/tasks?status=completed",
        bar: `${Math.round((taskStats.completedThisMonth / totalForBars) * 100)}%`,
      },
    ],
    [taskStats, totalForBars]
  );

  const actions = [
    { title: "Update Task", desc: "Track your progress", icon: <EditIcon />, link: "/staff-dashboard/tasks" },
    { title: "Submit Report", desc: "Share daily updates", icon: <DocIconLib />, link: "/staff-dashboard/submit-reports" },
    { title: "View Documents", desc: "Access resources", icon: <FileAttachIcon />, link: "/staff-dashboard/documents" },
    { title: "Check Events", desc: "View schedule", icon: <CalIconLib />, link: "/staff-dashboard/events" },
  ];

  const activeTasks = useMemo(() => {
    return tasks
      .filter((t) => t.status !== "COMPLETED")
      .sort((a, b) => {
        const aDue = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
        const bDue = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
        return aDue - bDue;
      })
      .slice(0, 4)
      .map((t) => ({
        id: String(t.id),
        title: t.title,
        due: dueLabel(t.dueDate),
        priority: String(t.priority || "MEDIUM").toUpperCase(),
        status: toStatusLabel(t.status),
      }));
  }, [tasks]);

  const recentDocs = useMemo(
    () =>
      documents.slice(0, 4).map((d) => ({
        id: d.id,
        title: d.title,
        type: d.type || "Document",
        uploaded: fmtRelative(d.date),
        access: d.scope === "PUBLIC" ? "Public" : "Department",
        link: `/staff-dashboard/document/${d.id}`,
      })),
    [documents]
  );

  const openTenders = useMemo(
    () =>
      tenders
        .filter((t) => t.status === "OPEN" || t.status === "ACTIVE")
        .slice(0, 3)
        .map((t) => ({
          id: t.dbId || t.id,
          title: t.title,
          deadline: fmtDate(t.closingDate),
          department: t.department || "All Departments",
          status: t.status,
          link: `/staff-dashboard/tender/${t.dbId || t.id}`,
        })),
    [tenders]
  );

  const topAnnouncements = useMemo(
    () =>
      announcements.slice(0, 3).map((a) => ({
        id: a.id,
        title: a.title,
        author: a.createdBy || "Management",
        time: fmtRelative(a.createdAt || a.createdDate || a.date),
        priority: a.priority || "NORMAL",
        link: `/staff-dashboard/announcement/${a.id}`,
      })),
    [announcements]
  );

  const unreadNotifications = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  if (loading && tasks.length === 0) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
        {/* HERO — HiveQ-style welcome back */}
        <section className="ct-card p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="ct-pill" style={{ background: "var(--tile-blue-bg)", color: "var(--tile-blue-fg)" }}>
                  {myDepartment} Department
                </span>
                <span
                  className="ct-pill"
                  style={{
                    background: unreadNotifications > 0 ? "var(--tile-orange-bg)" : "var(--tile-green-bg)",
                    color: unreadNotifications > 0 ? "var(--tile-orange-fg)" : "var(--tile-green-fg)",
                  }}
                >
                  {unreadNotifications} Unread
                </span>
              </div>
              <h1
                className="text-[28px] md:text-[34px] font-bold tracking-tight leading-[1.1]"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
              >
                Welcome Back, {displayName} <span aria-hidden="true">👋</span>
              </h1>
              <p
                className="mt-2 text-[15px]"
                style={{ color: "var(--text-secondary)", maxWidth: "62ch" }}
              >
                Overview of your assigned tasks, deadlines, and team updates at a glance.
              </p>
              {error && (
                <p
                  className="mt-2 text-[13px]"
                  style={{ color: "var(--accent-red)" }}
                >
                  {error}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Link href="/staff-dashboard/submit-reports">
                <button
                  className="ct-btn w-full sm:w-auto"
                  style={{ backgroundColor: "var(--accent-red)", color: "#fff" }}
                >
                  Submit Report
                </button>
              </Link>
              <Link href="/staff-dashboard/tasks">
                <button className="ct-btn ct-btn-secondary w-full sm:w-auto">
                  View My Tasks
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* STATS — pastel-icon tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {stats.map((stat) => {
            const tone =
              stat.title === "Assigned Tasks"
                ? { bg: "var(--tile-blue-bg)", fg: "var(--tile-blue-fg)" }
                : stat.title === "In Progress"
                  ? { bg: "var(--tile-orange-bg)", fg: "var(--tile-orange-fg)" }
                  : stat.title === "Due Soon"
                    ? { bg: "var(--tile-pink-bg)", fg: "var(--tile-pink-fg)" }
                    : { bg: "var(--tile-green-bg)", fg: "var(--tile-green-fg)" };
            const icon =
              stat.title === "Assigned Tasks" ? <TaskIconLib /> :
              stat.title === "In Progress"   ? <ActivityIcon /> :
              stat.title === "Due Soon"      ? <ClockIcon /> :
              <CheckCircleIcon />;
            return (
              <Link key={stat.title} href={stat.link} className="block">
                <div className="ct-card ct-card-hover p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="ct-stat-icon [&_svg]:w-5 [&_svg]:h-5"
                      style={{ backgroundColor: tone.bg, color: tone.fg }}
                    >
                      {icon}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div
                      className="text-[30px] font-bold leading-none tracking-tight"
                      style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
                    >
                      {stat.value}
                    </div>
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
                      className="h-full rounded-full transition-all"
                      style={{ width: stat.bar, backgroundColor: tone.fg }}
                    />
                  </div>
                  <div
                    className="mt-3 text-[12px] font-medium"
                    style={{ color: tone.fg }}
                  >
                    {stat.change}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <Card className="p-6">
          <SectionTitle title="Quick Actions" subtitle="Fast shortcuts for common tasks" />
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {actions.map((a) => (
              <Link key={a.title} href={a.link} className="group">
                <div className="p-5 rounded-2xl border border-gray-200/80 bg-white hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center [&_svg]:w-5 [&_svg]:h-5"
                      style={{ backgroundColor: "rgba(109, 198, 223, 0.18)", color: "var(--primary-blue)" }}
                    >
                      {a.icon}
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

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="p-6">
            <SectionTitle
              title="My Active Tasks"
              subtitle="Track your current assignments and deadlines"
              action={
                <Link href="/staff-dashboard/tasks">
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
              {activeTasks.length === 0 ? (
                <div className="p-4 rounded-2xl border border-gray-200/70 text-sm text-gray-500">No active tasks assigned yet.</div>
              ) : (
                activeTasks.map((task) => (
                  <Link key={task.id} href={`/staff-dashboard/${task.type === "JOB" ? "job" : "task"}/${task.id}`} className="block">
                    <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${task.priority === "URGENT" || task.priority === "HIGH" ? "bg-red-500" : task.priority === "MEDIUM" ? "bg-yellow-500" : "bg-green-500"}`} />
                            <p className="font-semibold truncate">{task.title}</p>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">ID: {task.id} • Due: {task.due}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <Pill tone={toPriorityTone(task.priority)}>{task.status}</Pill>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle
              title="Recent Documents"
              subtitle="Recently uploaded and updated files"
              action={
                <Link href="/staff-dashboard/documents">
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
              {recentDocs.length === 0 ? (
                <div className="p-4 rounded-2xl border border-gray-200/70 text-sm text-gray-500">No recent documents found.</div>
              ) : (
                recentDocs.map((doc) => (
                  <Link key={doc.id} href={doc.link} className="block">
                    <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <div
                            className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 [&_svg]:w-5 [&_svg]:h-5"
                            style={{ backgroundColor: "rgba(109, 198, 223, 0.18)", color: "var(--primary-blue)" }}
                          >
                            <DocIconLib />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold truncate">{doc.title}</p>
                            <p className="text-sm text-gray-500 mt-1">{doc.type} • {doc.uploaded}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <Pill tone={doc.access === "Public" ? "success" : "default"}>{doc.access}</Pill>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="p-6">
            <SectionTitle
              title="Active Tenders"
              subtitle="Open procurement opportunities"
              action={
                <Link href="/staff-dashboard/tenders">
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
              {openTenders.length === 0 ? (
                <div className="p-4 rounded-2xl border border-gray-200/70 text-sm text-gray-500">No open tenders available.</div>
              ) : (
                openTenders.map((tender) => (
                  <Link key={tender.id} href={tender.link} className="block">
                    <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{tender.title}</p>
                          <p className="text-sm text-gray-500 mt-1">{tender.department}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-extrabold" style={{ color: "var(--accent-red)" }}>
                            {tender.deadline}
                          </p>
                          <Pill>{tender.status}</Pill>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle
              title="Recent Announcements"
              subtitle="Company-wide communications"
              action={
                <Link href="/staff-dashboard/announcements">
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
              {topAnnouncements.length === 0 ? (
                <div className="p-4 rounded-2xl border border-gray-200/70 text-sm text-gray-500">No announcements yet.</div>
              ) : (
                topAnnouncements.map((announcement) => (
                  <Link key={announcement.id} href={announcement.link} className="block">
                    <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                      <div className="flex items-start justify-between gap-4">
                        <p className="font-semibold">{announcement.title}</p>
                        <Pill tone={toPriorityTone(announcement.priority)}>{announcement.priority}</Pill>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        By {announcement.author} • {announcement.time}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
  );
}
