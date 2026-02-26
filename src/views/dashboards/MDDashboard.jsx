"use client";

// pages/dashboards/MDDashboard.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { MDMenuItems } from "@/utils/menus";
import { PlusIcon, FileUploadIconComponent, MegaphoneIcon, CalendarIcon, ChartIcon } from "@/lib/icons";
import { fetchWithAuth } from "@/lib/api";


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
          : "bg-blue-50 text-blue-700 ring-blue-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

const priorityTone = (p) => (p === "URGENT" ? "danger" : p === "IMPORTANT" ? "warn" : "default");

export default function MDDashboard() {
  const [tasksData, setTasksData] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/tasks?limit=1000");
      if (res.ok) {
        const data = await res.json();
        setTasksData(data);
      }
    } catch (e) {
      console.error("Failed to fetch tasks:", e);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    let cancelled = false;
    async function connectSSE() {
      try {
        const res = await fetchWithAuth("/api/tasks/events");
        if (!res.ok || cancelled) return;
        const reader = res.body?.getReader();
        if (!reader) return;
        const decoder = new TextDecoder();
        let buffer = "";

        while (!cancelled) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop() || "";
          for (const part of parts) {
            const m = part.match(/^data: (.+)$/m);
            if (m) {
              try {
                const ev = JSON.parse(m[1]);
                if (ev.type?.startsWith("task:")) fetchTasks();
              } catch { }
            }
          }
        }
        reader.releaseLock();
      } catch (err) {
        console.error("SSE connection error:", err);
      }
    }
    connectSSE();
    return () => {
      cancelled = true;
    };
  }, [fetchTasks]);

  const summary = useMemo(() => {
    const totalTasks = tasksData.length;
    const activeJobs = tasksData.filter((t) => t.type === "JOB" && t.status !== "COMPLETED").length;
    const overdueTasks = tasksData.filter((t) => t.dueDate && new Date(t.dueDate).getTime() < Date.now() && t.status !== "COMPLETED").length;
    const completedTasks = tasksData.filter((t) => t.status === "COMPLETED").length;
    const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return { totalTasks, activeJobs, overdueTasks, completionRate };
  }, [tasksData]);

  const stats = [
    { title: "Total Tasks", value: summary.totalTasks.toString(), change: "Live", color: "var(--primary-blue)", link: "/md-dashboard/tasks", bar: "100%" },
    { title: "Active Jobs", value: summary.activeJobs.toString(), change: "Live", color: "var(--secondary-blue)", link: "/md-dashboard/jobs", bar: summary.totalTasks ? `${Math.round((summary.activeJobs / summary.totalTasks) * 100)}%` : "0%" },
    { title: "Overdue Tasks", value: summary.overdueTasks.toString(), change: "Live", color: "var(--accent-red)", link: "/md-dashboard/escalations", bar: summary.totalTasks ? `${Math.round((summary.overdueTasks / summary.totalTasks) * 100)}%` : "0%" },
    { title: "Completion Rate", value: `${summary.completionRate}%`, change: "Live", color: "#10B981", link: "/md-dashboard/tasks", bar: `${summary.completionRate}%` },
  ];

  const actions = [
    { title: "Create Task", desc: "Assign work & deadlines", icon: <PlusIcon />, link: "/md-dashboard/create-task" },
    { title: "Upload Document", desc: "Add files to workspace", icon: <FileUploadIconComponent />, link: "/md-dashboard/create-document" },
    { title: "Schedule Meeting", desc: "Create events quickly", icon: <CalendarIcon />, link: "/md-dashboard/create-event" },
    { title: "Post Announcement", desc: "Update the company", icon: <MegaphoneIcon />, link: "/md-dashboard/create-announcement" },
  ];

  const deptPerf = [];

  const activity = [];

  const tenders = [
    { id: "TEN-001", title: "Pipeline Equipment Supply", deadline: "2024-12-20", department: "Procurement", status: "OPEN" },
    { id: "TEN-002", title: "Safety Training Services", deadline: "2024-12-22", department: "HSE", status: "OPEN" },
    { id: "TEN-003", title: "IT Infrastructure Upgrade", deadline: "2024-12-25", department: "Technical", status: "OPEN" },
  ];

  const announcements = [
    { id: "ANN-001", title: "Year-End Holiday Schedule", author: "HR Department", time: "2 hours ago", priority: "IMPORTANT" },
    { id: "ANN-002", title: "Safety Protocol Updates", author: "HSE Department", time: "1 day ago", priority: "URGENT" },
    { id: "ANN-003", title: "Monthly Performance Review", author: "Managing Director", time: "2 days ago", priority: "NORMAL" },
  ];

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
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
              {announcements.map((a) => (
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
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
