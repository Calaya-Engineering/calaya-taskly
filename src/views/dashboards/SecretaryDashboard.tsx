"use client";

// pages/dashboards/SecretaryDashboard.jsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";
import {
  ChartIcon,
  CalendarIcon,
  DocumentIcon,
  TenderIcon,
  ClockIcon,
  DownloadIcon,
  MegaphoneIcon,
  FileUploadIconComponent,
  CheckCircleIcon,
} from '@/lib/icons';

/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const SectionTitle = ({ title, subtitle, action }) => (
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
      : tone === "purple"
      ? "bg-purple-50 text-purple-700 ring-purple-100"
      : "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white`;

const fmtRelative = (iso?: string | null) => {
  if (!iso) return "Just now";
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  if (!Number.isFinite(diff) || diff < 0) return "Just now";
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const fmtShortDate = (iso?: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const isThisMonth = (iso?: string | null) => {
  if (!iso) return false;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return false;
  const now = new Date();
  return d.getUTCMonth() === now.getUTCMonth() && d.getUTCFullYear() === now.getUTCFullYear();
};

export default function SecretaryDashboard() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reports, setReports] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [tenders, setTenders] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  const refreshLockRef = useRef(0);

  const fetchDashboard = useCallback(async (soft = false) => {
    if (!soft) setLoading(true);
    setError("");
    try {
      const [reportsRes, announcementsRes, tendersRes, tasksRes, notificationsRes] = await Promise.allSettled([
        fetchWithAuth("/api/daily-reports?limit=50").then((r) => (r.ok ? r.json() : null)),
        fetchWithAuth("/api/announcements?limit=10").then((r) => (r.ok ? r.json() : [])),
        fetchWithAuth("/api/tenders?limit=50").then((r) => (r.ok ? r.json() : [])),
        fetchWithAuth("/api/tasks?limit=30").then((r) => (r.ok ? r.json() : [])),
        fetchWithAuth("/api/notifications?limit=20").then((r) => (r.ok ? r.json() : [])),
      ]);

      const reportsData =
        reportsRes.status === "fulfilled" && reportsRes.value && Array.isArray(reportsRes.value.data)
          ? reportsRes.value.data
          : [];
      setReports(reportsData);
      setAnnouncements(announcementsRes.status === "fulfilled" && Array.isArray(announcementsRes.value) ? announcementsRes.value : []);
      setTenders(tendersRes.status === "fulfilled" && Array.isArray(tendersRes.value) ? tendersRes.value : []);
      setTasks(tasksRes.status === "fulfilled" && Array.isArray(tasksRes.value) ? tasksRes.value : []);
      setNotifications(notificationsRes.status === "fulfilled" && Array.isArray(notificationsRes.value) ? notificationsRes.value : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      if (!soft) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard(false);
  }, [fetchDashboard]);

  useSSE("/api/realtime/events", (ev) => {
    if (!ev?.type || ev.type === "ping") return;
    if (
      !ev.type.startsWith("document:") &&
      !ev.type.startsWith("tender:") &&
      !ev.type.startsWith("task:") &&
      !ev.type.startsWith("announcement:") &&
      !ev.type.startsWith("notification:") &&
      !ev.type.startsWith("daily-report:")
    ) {
      return;
    }
    const now = Date.now();
    if (now - refreshLockRef.current < 1500) return;
    refreshLockRef.current = now;
    fetchDashboard(true);
  });

  const stats = useMemo(() => {
    const reportsThisMonth = reports.filter((r) => isThisMonth(r.reportDate || r.submittedAt || r.createdAt)).length;
    const pendingUploads = reports.filter((r) => String(r.status || "").toUpperCase() === "PENDING").length;
    const totalDownloads = reports.reduce((sum, r) => sum + (Number(r.downloads) || 0), 0);
    const newAnnouncementsCount = announcements.filter((a) => isThisMonth(a.createdAt || a.date)).length;

    return [
      {
        title: 'Reports This Month',
        value: String(reportsThisMonth),
        change: `${reports.length} total`,
        tone: 'info' as const,
        icon: <ChartIcon />,
        link: '/secretary-dashboard/reports-archive',
        color: 'var(--primary-blue)',
      },
      {
        title: 'Pending Uploads',
        value: String(pendingUploads),
        change: pendingUploads === 0 ? 'All caught up' : 'Need review',
        tone: pendingUploads === 0 ? 'success' as const : 'warn' as const,
        icon: <ClockIcon />,
        link: '/secretary-dashboard/upload-report',
        color: '#F59E0B',
      },
      {
        title: 'Total Downloads',
        value: String(totalDownloads),
        change: 'Across all reports',
        tone: 'success' as const,
        icon: <DownloadIcon />,
        link: '/secretary-dashboard/reports-archive',
        color: '#10B981',
      },
      {
        title: 'New Announcements',
        value: String(newAnnouncementsCount),
        change: `${announcements.length} total`,
        tone: 'purple' as const,
        icon: <MegaphoneIcon />,
        link: '/secretary-dashboard/announcements',
        color: '#8B5CF6',
      },
    ];
  }, [reports, announcements]);

  const recentReports = useMemo(
    () =>
      reports
        .slice(0, 4)
        .map((r) => ({
          id: r.id,
          date: r.reportDate || r.submittedAt || r.createdAt,
          title: r.title || `Daily Report — ${r.department || "Unassigned"}`,
          downloads: Number(r.downloads) || 0,
          type: 'Daily',
          status: String(r.status || 'UPLOADED').toLowerCase() === 'pending' ? 'pending' : 'uploaded',
        })),
    [reports],
  );

  const recentAnnouncements = useMemo(
    () =>
      announcements.slice(0, 4).map((a) => ({
        id: a.id,
        title: a.title || "Announcement",
        department: a.department || "All Company",
        priority: String(a.priority || 'NORMAL').toLowerCase(),
        time: fmtRelative(a.createdAt || a.date),
        read: Boolean(a.read),
      })),
    [announcements],
  );

  const recentTaskReports = useMemo(
    () =>
      tasks
        .filter((t) => String(t.type || 'TASK').toUpperCase() === 'TASK')
        .slice(0, 4)
        .map((t) => {
          const assignee = Array.isArray(t.assignments) && t.assignments.length > 0 ? t.assignments[0]?.user : null;
          const statusRaw = String(t.status || 'PENDING').replace(/_/g, ' ');
          return {
            id: t.id,
            task: t.title || `TASK-${t.id}`,
            user: assignee?.name || assignee?.email?.split('@')[0] || t.createdBy?.name || 'Unassigned',
            department: t.department || assignee?.department || 'Unassigned',
            date: fmtRelative(t.updatedAt || t.createdAt),
            status: statusRaw === 'COMPLETED' ? 'Approved' : statusRaw === 'PENDING' ? 'Pending Review' : 'Submitted',
          };
        }),
    [tasks],
  );

  const recentActivity = useMemo(() => {
    return notifications.slice(0, 4).map((n) => {
      const actorName =
        n.actor?.name ||
        n.actorName ||
        (typeof n.message === 'string' ? (n.message.split(' (')[0] || 'System') : 'System');
      const cleanMessage =
        typeof n.message === 'string' && n.message.includes(') ')
          ? n.message.split(') ').slice(1).join(') ')
          : n.message || 'updated the system';
      return {
        id: n.id,
        user: actorName,
        action: cleanMessage,
        time: fmtRelative(n.createdAt),
        link: n.linkPath || '/secretary-dashboard/notifications',
      };
    });
  }, [notifications]);

  const systemStats = useMemo(() => {
    const totalTendersThisYear = tenders.filter((t) => {
      const d = new Date(t.createdAt || t.issuedDate || 0);
      return !isNaN(d.getTime()) && d.getUTCFullYear() === new Date().getUTCFullYear();
    }).length;
    const totalReportDownloads = reports.reduce((sum, r) => sum + (Number(r.downloads) || 0), 0);
    const totalTaskReports = tasks.length;
    return { totalTendersThisYear, totalReportDownloads, totalTaskReports };
  }, [tenders, reports, tasks]);

  const getReportStatusTone = (status) => {
    return status === 'uploaded' ? 'success' : 'warn';
  };

  const getReportTypeTone = (type) => {
    return type === 'Daily' ? 'info' : 'purple';
  };

  const getPriorityTone = (priority) => {
    switch(priority) {
      case 'urgent': return 'danger';
      case 'important': return 'warn';
      default: return 'info';
    }
  };

  const getTaskStatusTone = (status) => {
    switch(status) {
      case 'Approved': return 'success';
      case 'Submitted': return 'info';
      default: return 'warn';
    }
  };

  const getTaskStatusIcon = (status) => {
    switch(status) {
      case 'Approved': return <CheckCircleIcon />;
      case 'Submitted': return <FileUploadIconComponent />;
      default: return <ClockIcon />;
    }
  };

  if (loading && reports.length === 0 && tenders.length === 0 && tasks.length === 0) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
            <button
              type="button"
              onClick={() => fetchDashboard(false)}
              className="ml-3 font-semibold underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}
        {/* HERO */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Pill><span className="inline-flex items-center gap-1.5"><CalendarIcon /> {today}</span></Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Welcome, Secretary
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Manage daily reports, documents, and tender tracking for the company
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Link href="/secretary-dashboard/upload-report">
                  <button className={btnSolid} style={{ backgroundColor: "var(--accent-red)" }}>
                    Upload Daily Report
                  </button>
                </Link>
                <Link href="/secretary-dashboard/task-reports">
                  <button className={btnOutline} style={{ borderColor: "var(--secondary-blue)", color: "var(--primary-blue)" }}>
                    View Task Reports
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Link key={index} href={stat.link} className="block">
              <Card className="p-6 shadow-none transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">{stat.title}</p>
                    <p className="text-3xl font-extrabold mt-2" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center [&_svg]:w-6 [&_svg]:h-6"
                    style={{ backgroundColor: `${stat.color}18`, color: stat.color }}
                  >
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-4">
                  <Pill tone={stat.tone}>{stat.change} from last month</Pill>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <Card className="p-6">
          <SectionTitle title="Quick Actions" subtitle="Common tasks and shortcuts" />

          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/secretary-dashboard/upload-report">
              <button className="w-full p-5 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-center">
                <div className="flex justify-center mb-2 [&_svg]:w-8 [&_svg]:h-8" style={{ color: "var(--primary-blue)" }}><FileUploadIconComponent /></div>
                <p className="font-extrabold text-sm" style={{ color: "var(--primary-blue)" }}>Upload Report</p>
              </button>
            </Link>
            <Link href="/secretary-dashboard/reports-archive">
              <button className="w-full p-5 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-center">
                <div className="flex justify-center mb-2 [&_svg]:w-8 [&_svg]:h-8" style={{ color: "var(--primary-blue)" }}><DocumentIcon /></div>
                <p className="font-extrabold text-sm" style={{ color: "var(--primary-blue)" }}>View Archive</p>
              </button>
            </Link>
            <Link href="/secretary-dashboard/announcements">
              <button className="w-full p-5 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-center">
                <div className="flex justify-center mb-2 [&_svg]:w-8 [&_svg]:h-8" style={{ color: "var(--primary-blue)" }}><MegaphoneIcon /></div>
                <p className="font-extrabold text-sm" style={{ color: "var(--primary-blue)" }}>Announcements</p>
              </button>
            </Link>
            <Link href="/secretary-dashboard/tenders">
              <button className="w-full p-5 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-center">
                <div className="flex justify-center mb-2 [&_svg]:w-8 [&_svg]:h-8" style={{ color: "var(--primary-blue)" }}><TenderIcon /></div>
                <p className="font-extrabold text-sm" style={{ color: "var(--primary-blue)" }}>Tenders</p>
              </button>
            </Link>
          </div>
        </Card>

        {/* TWO COLUMN LAYOUT - Recent Reports & Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Daily Reports */}
          <Card className="p-6">
            <SectionTitle
              title="Recent Daily Reports"
              subtitle="Latest uploaded reports"
              action={
                <Link href="/secretary-dashboard/reports-archive">
                  <button className={btnSolid} style={{ backgroundColor: "var(--secondary-blue)" }}>
                    View All
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-3">
              {recentReports.map((report, index) => (
                <Link
                  key={index}
                  href={`/secretary-dashboard/reports-archive?report=${report.date}`}
                  className="block p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white [&_svg]:w-4 [&_svg]:h-4"
                        style={{ backgroundColor: report.status === 'uploaded' ? '#10B981' : '#F59E0B' }}
                      >
                        {report.status === 'uploaded' ? <CheckCircleIcon /> : <ClockIcon />}
                      </div>
                      <div>
                        <p className="font-extrabold text-sm text-gray-900">{report.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {report.downloads} downloads
                        </p>
                      </div>
                    </div>
                    <Pill tone={getReportTypeTone(report.type)}>{report.type}</Pill>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Recent Announcements */}
          <Card className="p-6">
            <SectionTitle
              title="Recent Announcements"
              subtitle="Latest company updates"
              action={
                <Link href="/secretary-dashboard/announcements">
                  <button className={btnSolid} style={{ backgroundColor: "var(--secondary-blue)" }}>
                    View All
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-3">
              {recentAnnouncements.map((announcement, index) => (
                <Link
                  key={index}
                  href={`/secretary-dashboard/announcement/${announcement.title.replace(/\s+/g, '-')}`}
                  className="block p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white [&_svg]:w-4 [&_svg]:h-4"
                        style={{ backgroundColor: announcement.read ? '#6B7280' : 'var(--primary-blue)' }}
                      >
                        {announcement.read ? <CheckCircleIcon /> : <MegaphoneIcon />}
                      </div>
                      <div>
                        <p className="font-extrabold text-sm text-gray-900">{announcement.title}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <Pill tone={getPriorityTone(announcement.priority)}>{announcement.priority}</Pill>
                          <span className="text-xs text-gray-500">{announcement.department}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{announcement.time}</p>
                      <Pill tone={announcement.read ? 'default' : 'info'} className="mt-1">
                        {announcement.read ? 'READ' : 'NEW'}
                      </Pill>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* BOTTOM SECTION - Task Reports & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Task Reports */}
          <Card className="p-6">
            <SectionTitle
              title="Recent Task Reports"
              subtitle="Latest task submissions"
              action={
                <Link href="/secretary-dashboard/task-reports">
                  <button className={btnSolid} style={{ backgroundColor: "var(--secondary-blue)" }}>
                    View All
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-3">
              {recentTaskReports.map((report, index) => (
                <Link
                  key={index}
                  href={`/secretary-dashboard/task-reports?report=${report.task}`}
                  className="block p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white [&_svg]:w-4 [&_svg]:h-4"
                        style={{
                          backgroundColor: report.status === 'Approved' ? '#10B981' :
                                          report.status === 'Submitted' ? 'var(--primary-blue)' : '#F59E0B'
                        }}
                      >
                        {getTaskStatusIcon(report.status)}
                      </div>
                      <div>
                        <p className="font-extrabold text-sm text-gray-900">{report.task}</p>
                        <p className="text-xs text-gray-500 mt-1">{report.user} • {report.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-gray-700">{report.date}</p>
                      <Pill tone={getTaskStatusTone(report.status)} className="mt-1">
                        {report.status}
                      </Pill>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <SectionTitle
              title="Recent Activity"
              subtitle="Latest system activities"
              action={
                <Link href="/secretary-dashboard/notifications">
                  <button className={btnSolid} style={{ backgroundColor: "var(--secondary-blue)" }}>
                    See All
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-3">
              {recentActivity.map((activity, index) => (
                <Link
                  key={index}
                  href={activity.link}
                  className="block p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-extrabold"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-extrabold text-gray-900">{activity.user}</span>
                        <span className="text-gray-600"> {activity.action}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* SYSTEM STATISTICS */}
        <Card className="p-6">
          <SectionTitle title="System Statistics" subtitle="Overview of key metrics" />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-gray-200/70 text-center transition">
              <p className="text-3xl font-extrabold" style={{ color: '#8B5CF6' }}>{systemStats.totalTendersThisYear}</p>
              <p className="text-sm text-gray-500 mt-2">Total Tenders This Year</p>
            </div>
            <div className="p-6 rounded-2xl border border-gray-200/70 text-center transition">
              <p className="text-3xl font-extrabold text-emerald-600">{systemStats.totalReportDownloads}</p>
              <p className="text-sm text-gray-500 mt-2">Report Downloads</p>
            </div>
            <div className="p-6 rounded-2xl border border-gray-200/70 text-center transition">
              <p className="text-3xl font-extrabold text-amber-600">{systemStats.totalTaskReports}</p>
              <p className="text-sm text-gray-500 mt-2">Task Reports Submitted</p>
            </div>
          </div>
        </Card>
      </div>
  );
}
