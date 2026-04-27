"use client";

// pages/dashboards/MDDashboard.jsx
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { MDMenuItems } from "@/utils/menus";
import { PlusIcon, FileUploadIconComponent, MegaphoneIcon, CalendarIcon, ChartIcon } from "@/lib/icons";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";

const fetcher = (url: string) => fetchWithAuth(url).then(res => res.json());

import DashboardSkeleton from "@/components/DashboardSkeleton";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
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

const Pill = ({ children, tone = "default" }) => {
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

const priorityTone = (p) => (p === "URGENT" ? "danger" : p === "IMPORTANT" ? "warn" : "default");

const formatTurnaround = (hours: number | null) => {
  if (hours == null || Number.isNaN(hours)) return "N/A";
  if (hours >= 48) return `${(hours / 24).toFixed(1)}d`;
  return `${hours.toFixed(1)}h`;
};

export default function MDDashboard() {
  const [tasksData, setTasksData] = useState<any[]>([]);
  const [rawAnnouncements, setRawAnnouncements] = useState<any[]>([]);
  const [tendersData, setTendersData] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const lastRefetchRef = useRef(0);

  const fetchData = useCallback(async (soft = false) => {
    if (!soft) setLoading(true);
    try {
      const [tRes, aRes, tenRes, nRes] = await Promise.all([
        fetchWithAuth("/api/tasks?limit=1000"),
        fetchWithAuth("/api/announcements?limit=5"),
        fetchWithAuth("/api/tenders?limit=5"),
        fetchWithAuth("/api/notifications?limit=5")
      ]);

      if (tRes.ok) setTasksData(await tRes.json());
      if (aRes.ok) setRawAnnouncements(await aRes.json());
      if (tenRes.ok) setTendersData(await tenRes.json());
      if (nRes.ok) setNotifications(await nRes.json());
    } catch (err) {
      console.error("Failed to fetch MD dashboard data:", err);
    } finally {
      if (!soft) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  useSSE("/api/realtime/events", (ev) => {
    if (!ev?.type || ev.type === "ping") return;
    const now = Date.now();
    if (now - lastRefetchRef.current < 1500) return;
    lastRefetchRef.current = now;
    fetchData(true);
  });

  const summary = useMemo(() => {
    const totalItems = tasksData.length;
    const taskCount = tasksData.filter((t) => t.type === "TASK").length;
    const activeJobs = tasksData.filter((t) => t.type === "JOB" && t.status !== "COMPLETED" && t.status !== "CANCELLED").length;
    const overdueTasks = tasksData.filter((t) => {
      if (!t.dueDate || t.status === "COMPLETED") return false;
      const d = new Date(t.dueDate);
      return !isNaN(d.getTime()) && d.getTime() < Date.now();
    }).length;
    const completedTasks = tasksData.filter((t) => t.status === "COMPLETED").length;
    const completionRate = totalItems ? Math.round((completedTasks / totalItems) * 100) : 0;
    const upcomingEvents = tasksData.filter((t) => {
      if (!t.startDate) return false;
      const d = new Date(t.startDate);
      return !isNaN(d.getTime()) && d.getTime() >= Date.now();
    }).length;

    return { totalItems, taskCount, activeJobs, overdueTasks, completionRate, upcomingEvents };
  }, [tasksData]);

  const stats = [
    { title: "Tasks", value: summary.taskCount.toString(), change: "Live", color: "var(--primary-blue)", link: "/md-dashboard/tasks", bar: "100%" },
    { title: "Active Jobs", value: summary.activeJobs.toString(), change: "Live", color: "var(--secondary-blue)", link: "/md-dashboard/jobs", bar: summary.totalItems ? `${Math.round((summary.activeJobs / summary.totalItems) * 100)}%` : "0%" },
    { title: "Overdue Tasks", value: summary.overdueTasks.toString(), change: "Live", color: "var(--accent-red)", link: "/md-dashboard/escalations", bar: summary.totalItems ? `${Math.round((summary.overdueTasks / summary.totalItems) * 100)}%` : "0%" },
    { title: "Upcoming Events", value: summary.upcomingEvents.toString(), change: "Live", color: "#10B981", link: "/md-dashboard/events", bar: summary.totalItems ? `${Math.round((summary.upcomingEvents / summary.totalItems) * 100)}%` : "0%" },
  ];

  const actions = [
    { title: "Create Task", desc: "Assign work & deadlines", icon: <PlusIcon />, link: "/md-dashboard/create-task" },
    { title: "Upload Document", desc: "Add files to workspace", icon: <FileUploadIconComponent />, link: "/md-dashboard/create-document" },
    { title: "Schedule Meeting", desc: "Create events quickly", icon: <CalendarIcon />, link: "/md-dashboard/create-event" },
    { title: "Post Announcement", desc: "Update the company", icon: <MegaphoneIcon />, link: "/md-dashboard/create-announcement" },
  ];

  const deptPerf = useMemo(() => {
    const depts = Array.from(new Set(tasksData.map(t => t.department).filter(Boolean)));
    return depts.map(dept => {
      const deptTasks = tasksData.filter(t => t.department === dept);
      const completed = deptTasks.filter(t => t.status === "COMPLETED").length;
      return {
        dept: dept as string,
        link: `/md-dashboard/tasks?department=${dept}`,
        pct: deptTasks.length ? Math.round((completed / deptTasks.length) * 100) : 0
      };
    }).sort((a, b) => b.pct - a.pct).slice(0, 5);
  }, [tasksData]);

  const activity = useMemo(() => {
    return notifications.map(n => {
      const d = new Date(n.createdAt);
      const timeStr = isNaN(d.getTime()) ? "--:--" : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return {
        user: n.actor?.name || n.actorRole || "System",
        action: n.message,
        time: timeStr,
        link: "/md-dashboard/notifications"
      };
    });
  }, [notifications]);

  const tenders = useMemo(() => {
    return tendersData.map(t => {
      const d = t.closingDate ? new Date(t.closingDate) : null;
      const deadlineStr = d && !isNaN(d.getTime()) ? d.toLocaleDateString() : "No deadline";
      return {
        id: t.id,
        title: t.title,
        deadline: deadlineStr,
        department: t.department || "General",
        status: t.status
      };
    });
  }, [tendersData]);

  const announcements = useMemo(() => {
    return (Array.isArray(rawAnnouncements) ? rawAnnouncements : []).map(a => {
      const d = new Date(a.date || a.createdAt);
      const timeStr = isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString();
      return {
        id: a.id,
        title: a.title,
        author: a.createdBy || "System",
        time: timeStr,
        priority: a.priority || "NORMAL"
      };
    });
  }, [rawAnnouncements]);

  const staffCompletionRows = useMemo(() => {
    const rows = new Map<number, {
      staffId: number;
      staffName: string;
      department: string;
      assigned: number;
      completed: number;
      onTime: number;
      turnaroundHours: number;
    }>();

    tasksData.forEach((task) => {
      (task.assignments || []).forEach((assignment) => {
        const user = assignment.user;
        if (!user || user.role !== "Staff") return;

        const existing = rows.get(user.id) || {
          staffId: user.id,
          staffName: user.name || user.email || `Staff ${user.id}`,
          department: user.department || task.department || "Unassigned",
          assigned: 0,
          completed: 0,
          onTime: 0,
          turnaroundHours: 0,
        };

        existing.assigned += 1;

        if (task.status === "COMPLETED") {
          existing.completed += 1;

          const assignedAt = assignment.assignedAt ? new Date(assignment.assignedAt) : null;
          const completedAt = task.updatedAt ? new Date(task.updatedAt) : null;
          if (assignedAt && completedAt && !Number.isNaN(assignedAt.getTime()) && !Number.isNaN(completedAt.getTime())) {
            existing.turnaroundHours += Math.max(0, completedAt.getTime() - assignedAt.getTime()) / 3_600_000;
          }

          if (!task.dueDate) {
            existing.onTime += 1;
          } else {
            const dueDate = new Date(task.dueDate);
            const completedOnTime = completedAt && !Number.isNaN(dueDate.getTime()) && completedAt.getTime() <= dueDate.getTime();
            if (completedOnTime) {
              existing.onTime += 1;
            }
          }
        }

        rows.set(user.id, existing);
      });
    });

    return Array.from(rows.values())
      .map((row) => ({
        ...row,
        completionRate: row.assigned ? Math.round((row.completed / row.assigned) * 100) : 0,
        onTimeRate: row.completed ? Math.round((row.onTime / row.completed) * 100) : 0,
        avgTurnaroundHours: row.completed ? row.turnaroundHours / row.completed : null,
      }))
      .sort((a, b) => {
        if (b.completionRate !== a.completionRate) return b.completionRate - a.completionRate;
        return (a.avgTurnaroundHours ?? Number.POSITIVE_INFINITY) - (b.avgTurnaroundHours ?? Number.POSITIVE_INFINITY);
      });
  }, [tasksData]);

  const staffCompletionSummary = useMemo(() => {
    const totalStaff = staffCompletionRows.length;
    const avgCompletionRate = totalStaff
      ? Math.round(staffCompletionRows.reduce((sum, row) => sum + row.completionRate, 0) / totalStaff)
      : 0;
    const avgTurnaroundHours = totalStaff
      ? staffCompletionRows.reduce((sum, row) => sum + (row.avgTurnaroundHours || 0), 0) / totalStaff
      : null;
    const departmentCount = new Set(staffCompletionRows.map((row) => row.department)).size;

    return { totalStaff, avgCompletionRate, avgTurnaroundHours, departmentCount };
  }, [staffCompletionRows]);

  if (loading && tasksData.length === 0) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
        {/* Hero */}
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
                <div className="flex items-center gap-2 mb-2">
                  <Pill>Executive Overview</Pill>
                  <Pill tone="success">System Healthy</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Welcome, Managing Director
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Overview of all company operations, escalations, and performance at a glance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/md-dashboard/create-task">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)", color: "white" }}
                  >
                    Create Task
                  </button>
                </Link>
                <Link href="/md-dashboard/create-document">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                  >
                    Upload Document
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <Link key={stat.title} href={stat.link} className="group">
              <Card className="p-5 shadow-none hover:-translate-y-0.5 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-extrabold tracking-tight mt-1">{stat.value}</p>
                    <p className="text-sm mt-3" style={{ color: stat.color }}>
                      {stat.change} <span className="text-gray-500">from last month</span>
                    </p>
                  </div>

                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center "
                    style={{ backgroundColor: `${stat.color}18` }}
                    aria-hidden="true"
                  >
                    <span style={{ color: stat.color }}>
                      <ChartIcon size={24} />
                    </span>
                  </div>
                </div>

                <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: stat.bar,
                      background: stat.color,
                    }}
                  />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <SectionTitle title="Quick Actions" subtitle="Fast shortcuts for common executive operations" />
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {actions.map((a) => (
              <Link key={a.title} href={a.link} className="group">
                <div className="p-5 rounded-2xl border border-gray-200/80 bg-white hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center "
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

        {/* Two Columns */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Department Performance */}
          <Card className="p-6">
            <SectionTitle
              title="Department Performance"
              subtitle="Completion progress across departments"
              action={
                <Link href="/md-dashboard/tasks">
                  <button
                    className="text-sm font-semibold px-3 py-2 rounded-xl text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    View All
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-3">
              {deptPerf.length > 0 ? (
                deptPerf.map((d) => (
                  <Link key={d.dept} href={d.link} className="block">
                    <div className="rounded-2xl border border-gray-200/70 p-4 hover:bg-gray-50 transition">
                      <div className="flex items-center justify-between gap-4">
                        <div className="font-semibold">{d.dept}</div>
                        <Pill tone={d.pct >= 90 ? "success" : "default"}>{d.pct}%</Pill>
                      </div>

                      <div className="mt-3 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${d.pct}%`,
                            backgroundColor: "var(--primary-blue)",
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-2xl border border-gray-200/70 p-8 text-center text-gray-500">
                  No department data yet. Create tasks to see performance.
                </div>
              )}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <SectionTitle
              title="Recent Activity"
              subtitle="Live updates from teams and systems"
              action={
                <Link href="/md-dashboard/notifications">
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
              {activity.length > 0 ? (
                activity.map((a, index) => (
                  <Link key={index} href={a.link} className="block">
                    <div className="flex items-start gap-3 p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0 "
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        {a.user.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-800">
                          <span className="font-semibold">{a.user}</span>{" "}
                          <span className="text-gray-700">{a.action}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{a.time}</p>
                      </div>
                      <span className="text-xs text-gray-400 mt-1">→</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-2xl border border-gray-200/70 p-8 text-center text-gray-500">
                  No recent activity yet.
                </div>
              )}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <SectionTitle
            title="Staff Completion Rate"
            subtitle="Every department, calculated from assignment time to final completion time"
            action={
              <div className="flex flex-wrap gap-2">
                <Pill>{staffCompletionSummary.totalStaff} Staff</Pill>
                <Pill tone="success">{staffCompletionSummary.avgCompletionRate}% Avg Completion</Pill>
                <Pill tone="warn">{formatTurnaround(staffCompletionSummary.avgTurnaroundHours)} Avg Turnaround</Pill>
                <Pill tone="default">{staffCompletionSummary.departmentCount} Departments</Pill>
              </div>
            }
          />

          <div className="mt-5 overflow-x-auto">
            {staffCompletionRows.length > 0 ? (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-200/70">
                    <th className="px-4 py-3 font-semibold">Staff</th>
                    <th className="px-4 py-3 font-semibold">Department</th>
                    <th className="px-4 py-3 font-semibold">Assigned</th>
                    <th className="px-4 py-3 font-semibold">Completed</th>
                    <th className="px-4 py-3 font-semibold">Completion Rate</th>
                    <th className="px-4 py-3 font-semibold">On Time</th>
                    <th className="px-4 py-3 font-semibold">Avg Turnaround</th>
                  </tr>
                </thead>
                <tbody>
                  {staffCompletionRows.map((row) => (
                    <tr key={row.staffId} className="border-b border-gray-100">
                      <td className="px-4 py-3 font-semibold text-gray-900">{row.staffName}</td>
                      <td className="px-4 py-3 text-gray-600">{row.department}</td>
                      <td className="px-4 py-3">{row.assigned}</td>
                      <td className="px-4 py-3">{row.completed}</td>
                      <td className="px-4 py-3">
                        <Pill tone={row.completionRate >= 80 ? "success" : row.completionRate >= 50 ? "warn" : "danger"}>
                          {row.completionRate}%
                        </Pill>
                      </td>
                      <td className="px-4 py-3">{row.onTimeRate}%</td>
                      <td className="px-4 py-3">{formatTurnaround(row.avgTurnaroundHours)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="rounded-2xl border border-gray-200/70 p-8 text-center text-gray-500">
                No staff completion data yet. Assigned staff tasks will appear here automatically.
              </div>
            )}
          </div>
        </Card>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Tenders */}
          <Card className="p-6">
            <SectionTitle
              title="Tenders Closing Soon"
              subtitle="Time-sensitive procurement opportunities"
              action={
                <Link href="/md-dashboard/tenders">
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
              {tenders.map((t) => (
                <Link key={t.id} href={`/md-dashboard/tender/${t.id}`} className="block">
                  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{t.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{t.department}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-extrabold" style={{ color: "var(--accent-red)" }}>
                          {t.deadline}
                        </p>
                        <Pill>{t.status}</Pill>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Announcements */}
          <Card className="p-6">
            <SectionTitle
              title="Recent Announcements"
              subtitle="Company-wide communications"
              action={
                <Link href="/md-dashboard/announcements">
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
              {announcements.length > 0 ? (
                announcements.map((a) => (
                  <Link key={a.id} href={`/md-dashboard/announcement/${a.id}`} className="block">
                    <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                      <div className="flex items-start justify-between gap-4">
                        <p className="font-semibold">{a.title}</p>
                        <Pill tone={priorityTone(a.priority)}>{a.priority}</Pill>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        By {a.author} • {a.time}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">No announcements yet.</div>
              )}
            </div>
          </Card>
        </div>
      </div>
  );
}
