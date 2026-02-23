// pages/dashboards/MDDashboard.jsx
import { Link } from "react-router-dom";
import Layout, {
  DashboardIcon,
  TaskIcon,
  DocumentIcon,
  ReportIcon,
  CalendarIcon,
  AnnouncementIcon,
  UserIcon,
  BellIcon,
  ApprovalIcon,
  AlertIcon,
} from "../../components/Layout";

const MDMenuItems = [
  { label: "Dashboard", path: "/md-dashboard", icon: <DashboardIcon /> },
  { label: "Tasks (All)", path: "/md-dashboard/tasks", icon: <TaskIcon />, badge: "24" },
  { label: "Active Jobs", path: "/md-dashboard/jobs", icon: <TaskIcon />, badge: "8" },
  { label: "Documents", path: "/md-dashboard/documents", icon: <DocumentIcon />, badge: "3" },
  { label: "Daily Reports", path: "/md-dashboard/reports", icon: <ReportIcon /> },
  { label: "Meetings/Events", path: "/md-dashboard/events", icon: <CalendarIcon />, badge: "2" },
  { label: "Tenders", path: "/md-dashboard/tenders", icon: <DocumentIcon /> },
  { label: "Tender Documents", path: "/md-dashboard/tender-documents", icon: <DocumentIcon />, badge: "5" },
  { label: "Announcements", path: "/md-dashboard/announcements", icon: <AnnouncementIcon /> },
  { label: "Approvals", path: "/md-dashboard/approvals", icon: <ApprovalIcon />, badge: "7" },
  { label: "Escalations/Overdue", path: "/md-dashboard/escalations", icon: <AlertIcon />, badge: "3" },
  { label: "Notifications", path: "/md-dashboard/notifications", icon: <BellIcon />, badge: "12" },
  { label: "Profile", path: "/md-dashboard/profile", icon: <UserIcon /> },
];


const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-sm ${className}`}>{children}</div>
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
  const stats = [
    { title: "Total Tasks", value: "156", change: "+12%", color: "var(--primary-blue)", link: "/md-dashboard/tasks", bar: "70%" },
    { title: "Active Jobs", value: "24", change: "+3%", color: "var(--secondary-blue)", link: "/md-dashboard/jobs", bar: "55%" },
    { title: "Overdue Tasks", value: "8", change: "-2%", color: "var(--accent-red)", link: "/md-dashboard/escalations", bar: "35%" },
    { title: "Completion Rate", value: "87%", change: "+5%", color: "#10B981", link: "/md-dashboard/tasks", bar: "87%" },
  ];

  const actions = [
    { title: "Create Task", desc: "Assign work & deadlines", icon: "➕", link: "/md-dashboard/create-task" },
    { title: "Upload Document", desc: "Add files to workspace", icon: "📤", link: "/md-dashboard/create-document" },
    { title: "Schedule Meeting", desc: "Create events quickly", icon: "📅", link: "/md-dashboard/create-event" },
    { title: "Post Announcement", desc: "Update the company", icon: "📢", link: "/md-dashboard/create-announcement" },
  ];

  const deptPerf = ["Technical", "Workshop", "Logistics", "HSE"].map((dept, index) => ({
    dept,
    pct: 70 + index * 10,
    link: `/md-dashboard/tasks?dept=${dept}`,
  }));

  const activity = [
    { user: "John Doe", action: "completed task TASK-2024-00123", time: "10 min ago", link: "/md-dashboard/task/TASK-2024-00123" },
    { user: "Sarah Smith", action: "uploaded new document", time: "30 min ago", link: "/md-dashboard/document/DOC-002" },
    { user: "Mike Johnson", action: "created new tender", time: "1 hour ago", link: "/md-dashboard/tender/TEN-001" },
    { user: "Lisa Wang", action: "scheduled meeting", time: "2 hours ago", link: "/md-dashboard/event/EVT-001" },
  ];

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
                <Link to="/md-dashboard/create-task">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold shadow-sm active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)", color: "white" }}
                  >
                    Create Task
                  </button>
                </Link>
                <Link to="/md-dashboard/create-document">
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
            <Link key={stat.title} to={stat.link} className="group">
              <Card className="p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-extrabold tracking-tight mt-1">{stat.value}</p>
                    <p className="text-sm mt-3" style={{ color: stat.color }}>
                      {stat.change} <span className="text-gray-500">from last month</span>
                    </p>
                  </div>

                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center ring-1 ring-black/5"
                    style={{ backgroundColor: `${stat.color}18` }}
                    aria-hidden="true"
                  >
                    <span className="text-lg" style={{ color: stat.color }}>
                      📊
                    </span>
                  </div>
                </div>

                <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: stat.bar,
                      background: "linear-gradient(90deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)",
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
              <Link key={a.title} to={a.link} className="group">
                <div className="p-5 rounded-2xl border border-gray-200/80 bg-white hover:bg-gray-50 hover:shadow-sm transition">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center ring-1 ring-black/5"
                      style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                    >
                      <span className="text-xl">{a.icon}</span>
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
                <Link to="/md-dashboard/tasks">
                  <button
                    className="text-sm font-semibold px-3 py-2 rounded-xl text-white shadow-sm active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    View All
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-3">
              {deptPerf.map((d) => (
                <Link key={d.dept} to={d.link} className="block">
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
                          background: "linear-gradient(90deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)",
                        }}
                      />
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
              subtitle="Live updates from teams and systems"
              action={
                <Link to="/md-dashboard/notifications">
                  <button
                    className="text-sm font-semibold px-3 py-2 rounded-xl text-white shadow-sm active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    See All
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-2">
              {activity.map((a, index) => (
                <Link key={index} to={a.link} className="block">
                  <div className="flex items-start gap-3 p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0 ring-1 ring-black/5"
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
              ))}
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
                <Link to="/md-dashboard/tenders">
                  <button
                    className="text-sm font-semibold px-3 py-2 rounded-xl text-white shadow-sm active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    View All
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-2">
              {tenders.map((t) => (
                <Link key={t.id} to={`/md-dashboard/tender/${t.id}`} className="block">
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
                <Link to="/md-dashboard/announcements">
                  <button
                    className="text-sm font-semibold px-3 py-2 rounded-xl text-white shadow-sm active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    View All
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-2">
              {announcements.map((a) => (
                <Link key={a.id} to={`/md-dashboard/announcement/${a.id}`} className="block">
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
