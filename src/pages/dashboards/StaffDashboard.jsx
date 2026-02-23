// pages/dashboards/StaffDashboard.jsx
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
} from "../../components/Layout";

// Tender Icon component
const TenderIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const StaffMenuItems = [
  { label: "Dashboard", path: "/staff-dashboard", icon: <DashboardIcon /> },
  { label: "My Tasks", path: "/staff-dashboard/tasks", icon: <TaskIcon />, badge: "8" },
  { label: "Submit Reports", path: "/staff-dashboard/submit-reports", icon: <ReportIcon /> },
  { label: "Documents", path: "/staff-dashboard/documents", icon: <DocumentIcon /> },
  { label: "Daily Reports", path: "/staff-dashboard/daily-reports", icon: <ReportIcon /> },
  { label: "Meetings/Events", path: "/staff-dashboard/events", icon: <CalendarIcon /> },
  { label: "Tenders", path: "/staff-dashboard/tenders", icon: <TenderIcon />, badge: "3" },
  { label: "Tender Documents", path: "/staff-dashboard/tender-documents", icon: <DocumentIcon />, badge: "5" },
  { label: "Announcements", path: "/staff-dashboard/announcements", icon: <AnnouncementIcon /> },
  { label: "Notifications", path: "/staff-dashboard/notifications", icon: <BellIcon />, badge: "5" },
  { label: "Profile", path: "/staff-dashboard/profile", icon: <UserIcon /> },
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

const priorityTone = (p) => {
  if (p === "URGENT" || p === "High") return "danger";
  if (p === "IMPORTANT" || p === "Medium") return "warn";
  return "default";
};

export default function StaffDashboard() {
  const stats = [
    { title: "Assigned Tasks", value: "8", change: "+2 new", color: "var(--primary-blue)", link: "/staff-dashboard/tasks", bar: "45%" },
    { title: "In Progress", value: "3", change: "Active", color: "var(--secondary-blue)", link: "/staff-dashboard/tasks?status=in_progress", bar: "38%" },
    { title: "Due Soon", value: "2", change: "Next 3 days", color: "#F59E0B", link: "/staff-dashboard/tasks?due=soon", bar: "25%" },
    { title: "Completed", value: "12", change: "This month", color: "#10B981", link: "/staff-dashboard/tasks?status=completed", bar: "75%" },
  ];

  const actions = [
    { title: "Update Task", desc: "Track your progress", icon: "📝", link: "/staff-dashboard/tasks" },
    { title: "Submit Report", desc: "Share daily updates", icon: "📄", link: "/staff-dashboard/submit-reports" },
    { title: "View Documents", desc: "Access resources", icon: "📎", link: "/staff-dashboard/documents" },
    { title: "Check Events", desc: "View schedule", icon: "📅", link: "/staff-dashboard/events" },
  ];

  const activeTasks = [
    { id: "TASK-2024-00123", title: "Safety Inspection Report", due: "Today", priority: "High", status: "In Progress" },
    { id: "TASK-2024-00124", title: "Equipment Maintenance Log", due: "Tomorrow", priority: "Medium", status: "Pending" },
    { id: "TASK-2024-00125", title: "Client Meeting Notes", due: "Dec 15", priority: "Low", status: "In Progress" },
    { id: "TASK-2024-00126", title: "Training Completion", due: "Overdue", priority: "High", status: "Pending" },
  ];

  const recentDocs = [
    { title: "Safety Protocol v2.1.pdf", type: "Protocol", uploaded: "2 hours ago", access: "Public", link: "/staff-dashboard/document/DOC-001" },
    { title: "Equipment Checklist.xlsx", type: "Checklist", uploaded: "1 day ago", access: "Department", link: "/staff-dashboard/document/DOC-002" },
    { title: "Training Manual.pdf", type: "Manual", uploaded: "2 days ago", access: "Public", link: "/staff-dashboard/document/DOC-003" },
    { title: "Workshop Schedule.pdf", type: "Schedule", uploaded: "3 days ago", access: "Department", link: "/staff-dashboard/document/DOC-004" },
  ];

  const tenders = [
    { title: "Safety Equipment Procurement", deadline: "2024-12-20", department: "All Departments", status: "OPEN", link: "/staff-dashboard/tender/TEN-001" },
    { title: "General Workshop Supplies", deadline: "2024-12-28", department: "All Departments", status: "OPEN", link: "/staff-dashboard/tender/TEN-002" },
    { title: "IT Equipment Upgrade", deadline: "2024-12-31", department: "All Departments", status: "OPEN", link: "/staff-dashboard/tender/TEN-003" },
  ];

  const announcements = [
    { title: "Safety Protocol Update", author: "HSE Department", time: "2 hours ago", priority: "IMPORTANT", link: "/staff-dashboard/announcement/ANN-001" },
    { title: "Holiday Schedule", author: "HR Department", time: "1 day ago", priority: "NORMAL", link: "/staff-dashboard/announcement/ANN-002" },
    { title: "Team Building Event", author: "Admin Department", time: "2 days ago", priority: "NORMAL", link: "/staff-dashboard/announcement/ANN-003" },
  ];

  return (
    <Layout menuItems={StaffMenuItems} userRole="Staff">
      <div className="space-y-6">
        {/* Hero Section */}
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
                  <Pill>Technical Department</Pill>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Welcome, John Doe
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Overview of your assigned tasks, deadlines, and team updates at a glance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/staff-dashboard/submit-reports">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold shadow-sm active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)", color: "white" }}
                  >
                    Submit Report
                  </button>
                </Link>
                <Link to="/staff-dashboard/tasks">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                  >
                    View My Tasks
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <Link key={stat.title} to={stat.link} className="group">
              <Card className="p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-extrabold tracking-tight mt-1">{stat.value}</p>
                    <p className="text-sm mt-3" style={{ color: stat.color }}>
                      {stat.change}
                    </p>
                  </div>

                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center ring-1 ring-black/5"
                    style={{ backgroundColor: `${stat.color}18` }}
                    aria-hidden="true"
                  >
                    <span className="text-lg" style={{ color: stat.color }}>
                      {stat.title === "Assigned Tasks" ? "📋" : 
                       stat.title === "In Progress" ? "⚡" : 
                       stat.title === "Due Soon" ? "⏰" : "✅"}
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
          <SectionTitle title="Quick Actions" subtitle="Fast shortcuts for common tasks" />
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* My Active Tasks */}
          <Card className="p-6">
            <SectionTitle
              title="My Active Tasks"
              subtitle="Track your current assignments and deadlines"
              action={
                <Link to="/staff-dashboard/tasks">
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
              {activeTasks.map((task) => (
                <Link key={task.id} to={`/staff-dashboard/task/${task.id}`} className="block">
                  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            task.priority === "High" ? "bg-red-500" :
                            task.priority === "Medium" ? "bg-yellow-500" : "bg-green-500"
                          }`} />
                          <p className="font-semibold truncate">{task.title}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">ID: {task.id} • Due: {task.due}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <Pill tone={
                          task.status === "In Progress" ? "default" :
                          task.status === "Pending" ? "warn" : "danger"
                        }>
                          {task.status}
                        </Pill>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Recent Documents */}
          <Card className="p-6">
            <SectionTitle
              title="Recent Documents"
              subtitle="Recently uploaded and updated files"
              action={
                <Link to="/staff-dashboard/documents">
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
              {recentDocs.map((doc, index) => (
                <Link key={index} to={doc.link} className="block">
                  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ring-1 ring-black/5"
                          style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                        >
                          <span className="text-lg">📄</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{doc.title}</p>
                          <p className="text-sm text-gray-500 mt-1">{doc.type} • {doc.uploaded}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <Pill tone={doc.access === "Public" ? "success" : "default"}>
                          {doc.access}
                        </Pill>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Active Tenders */}
          <Card className="p-6">
            <SectionTitle
              title="Active Tenders"
              subtitle="Open procurement opportunities"
              action={
                <Link to="/staff-dashboard/tenders">
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
              {tenders.map((tender, index) => (
                <Link key={index} to={tender.link} className="block">
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
              ))}
            </div>
          </Card>

          {/* Recent Announcements */}
          <Card className="p-6">
            <SectionTitle
              title="Recent Announcements"
              subtitle="Company-wide communications"
              action={
                <Link to="/staff-dashboard/announcements">
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
              {announcements.map((announcement, index) => (
                <Link key={index} to={announcement.link} className="block">
                  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-semibold">{announcement.title}</p>
                      <Pill tone={priorityTone(announcement.priority)}>
                        {announcement.priority}
                      </Pill>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      By {announcement.author} • {announcement.time}
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