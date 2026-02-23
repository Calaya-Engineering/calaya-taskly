import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout, {
  DashboardIcon,
  TaskIcon,
  DocumentIcon,
  ReportIcon,
  CalendarIcon,
  AnnouncementIcon,
  ApprovalIcon,
  AlertIcon,
  BellIcon,
  UserIcon,
  TenderIcon,
} from "../../../components/Layout";

const MDMenuItems = [
  { label: "Dashboard", path: "/md-dashboard", icon: <DashboardIcon /> },
  { label: "Tasks (All)", path: "/md-dashboard/tasks", icon: <TaskIcon />, badge: "24" },
  { label: "Active Jobs", path: "/md-dashboard/jobs", icon: <TaskIcon />, badge: "8" },
  { label: "Documents", path: "/md-dashboard/documents", icon: <DocumentIcon />, badge: "3" },
  { label: "Daily Reports", path: "/md-dashboard/reports", icon: <ReportIcon /> },
  { label: "Meetings/Events", path: "/md-dashboard/events", icon: <CalendarIcon />, badge: "2" },
  { label: "Tenders", path: "/md-dashboard/tenders", icon: <DocumentIcon /> },
  { label: "Tender Documents", path: "/md-dashboard/tender-documents", icon: <TenderIcon /> },
  { label: "Announcements", path: "/md-dashboard/announcements", icon: <AnnouncementIcon /> },
  { label: "Approvals", path: "/md-dashboard/approvals", icon: <ApprovalIcon />, badge: "7" },
  { label: "Escalations/Overdue", path: "/md-dashboard/escalations", icon: <AlertIcon />, badge: "3" },
  { label: "Notifications", path: "/md-dashboard/notifications", icon: <BellIcon />, badge: "12" },
  { label: "Profile", path: "/md-dashboard/profile", icon: <UserIcon /> },
];

/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-sm ${className}`}>{children}</div>
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
      : tone === "muted"
      ? "bg-gray-50 text-gray-700 ring-gray-100"
      : "bg-blue-50 text-blue-700 ring-blue-100";

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white shadow-sm`;

const textareaBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";

export default function MDAnnouncementDetail() {
  const { announcementId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("content");
  const [newComment, setNewComment] = useState("");

  // Demo data
  const announcement = useMemo(
    () => ({
      id: announcementId || "ANN-001",
      title: "Year-End Holiday Schedule",
      message: `Dear Team,

Please find attached the holiday schedule for the year-end period. All departments should plan their work accordingly to ensure smooth operations during this period.

Important Dates:
- December 24: Half day (Close at 12 PM)
- December 25: Christmas Day (Company Holiday)
- December 26: Boxing Day (Company Holiday)
- December 27-29: Normal working days
- December 30: Year-End Office Cleaning
- December 31: Half day (Close at 2 PM)
- January 1: New Year's Day (Company Holiday)
- January 2: Normal operations resume

Please note:
1. Essential staff in Operations and Security should coordinate with their HODs for duty rosters.
2. All departments must complete their year-end reports by December 20.
3. Office access during holidays requires prior approval from HOD and Security.

For any queries, please contact the HR Department.

Best regards,
HR Department`,
      createdBy: "HR Department",
      createdDate: "2024-12-15 09:00",
      scope: "All Company",
      priority: "IMPORTANT",
      expiresAt: "2024-12-31",
      read: true,
      documents: [
        { id: 1, name: "Holiday Schedule 2024.pdf", uploadedBy: "HR Department", date: "2024-12-15", size: "1.8 MB" },
        { id: 2, name: "Duty Roster Form.xlsx", uploadedBy: "HR Department", date: "2024-12-15", size: "0.9 MB" },
      ],
      attachments: [],
      readBy: [
        { name: "John Doe", department: "Technical", readAt: "2024-12-15 09:15" },
        { name: "Sarah Smith", department: "HSE", readAt: "2024-12-15 09:30" },
        { name: "Mike Johnson", department: "Technical", readAt: "2024-12-15 10:45" },
        { name: "Managing Director", department: "Executive", readAt: "2024-12-15 09:05" },
      ],
      comments: [
        { id: 1, user: "John Doe", comment: "Noted. Will plan team schedules accordingly.", timestamp: "2024-12-15 09:20" },
        { id: 2, user: "Workshop HOD", comment: "Workshop will operate with skeleton staff on Dec 27-29. Roster attached.", timestamp: "2024-12-15 11:30" },
        { id: 3, user: "HR Department", comment: "Please submit duty rosters by Dec 18 for approval.", timestamp: "2024-12-15 14:15" },
      ],
      reads: 142,
      departments: ["All Departments"],
    }),
    [announcementId]
  );

  const isExpired = useMemo(() => new Date(announcement.expiresAt) < new Date(), [announcement.expiresAt]);

  const priorityTone = (p) => (p === "URGENT" ? "danger" : p === "IMPORTANT" || p === "HIGH" ? "warn" : p === "NORMAL" ? "success" : "muted");
  const scopeTone = (s) => (s === "All Company" ? "purple" : s === "HODs Only" ? "default" : s === "Workshop Department" ? "warn" : "muted");

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return alert("Please enter a comment");
    alert("Comment submitted!");
    setNewComment("");
  };

  const downloadDocument = (doc) => alert(`Downloading ${doc.name} (${doc.size})`);

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HERO */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => navigate("/md-dashboard/announcements")}
                  className="w-11 h-11 rounded-2xl border bg-white hover:bg-gray-50 active:scale-[0.99] transition flex items-center justify-center"
                  style={{ borderColor: "rgba(44,75,155,0.25)", color: "var(--primary-blue)" }}
                  title="Back"
                >
                  ←
                </button>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Pill tone={priorityTone(announcement.priority)}>{announcement.priority}</Pill>
                    <Pill tone={scopeTone(announcement.scope)}>{announcement.scope}</Pill>
                    {!announcement.read ? <Pill>NEW</Pill> : <Pill tone="success">READ</Pill>}
                    {isExpired ? <Pill tone="muted">Expired</Pill> : null}
                  </div>

                  <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 truncate">{announcement.title}</h1>
                  <p className="text-gray-600 mt-1 text-sm">
                    By <span className="font-semibold">{announcement.createdBy}</span> • {formatDateTime(announcement.createdDate)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Link to={`/md-dashboard/edit-announcement/${announcement.id}`}>
                  <button className={btnOutline} style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}>
                    Edit
                  </button>
                </Link>
                <button className={btnSolid} style={{ backgroundColor: "var(--accent-red)" }} onClick={() => alert("Delete announcement")}>
                  Delete
                </button>
                {announcement.read ? (
                  <button
                    className={btnOutline}
                    style={{ borderColor: "rgba(109,198,223,0.55)", color: "var(--secondary-blue)" }}
                    onClick={() => alert("Marked as unread")}
                  >
                    Mark as Unread
                  </button>
                ) : (
                  <button className={btnSolid} style={{ backgroundColor: "var(--secondary-blue)" }} onClick={() => alert("Marked as read")}>
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Expired Banner */}
        {isExpired && (
          <Card className="p-5 border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center">⏳</div>
              <div>
                <p className="font-extrabold text-gray-800">This announcement has expired</p>
                <p className="text-sm text-gray-600 mt-0.5">Expired on {announcement.expiresAt}</p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MAIN */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-200/70">
                {[
                  { id: "content", label: "Content" },
                  { id: "comments", label: `Comments (${announcement.comments.length})` },
                  { id: "readby", label: `Read By (${announcement.readBy.length})` },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`px-6 py-4 text-sm font-semibold transition ${
                      activeTab === t.id ? "text-blue-700" : "text-gray-500 hover:text-gray-700"
                    }`}
                    style={{
                      borderBottom: activeTab === t.id ? "2px solid var(--primary-blue)" : "2px solid transparent",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              {activeTab === "content" && (
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Pill tone={scopeTone(announcement.scope)}>{announcement.scope}</Pill>
                    <Pill tone="muted">Expires: {announcement.expiresAt}</Pill>
                    <Pill tone="muted">ID: {announcement.id}</Pill>
                  </div>

                  <div className="rounded-2xl border border-gray-200/70 bg-white p-5">
                    <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">{announcement.message}</pre>
                  </div>

                  {/* Documents */}
                  {announcement.documents?.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                        Attached Documents ({announcement.documents.length})
                      </h4>

                      <div className="grid grid-cols-1 gap-3">
                        {announcement.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="p-4 rounded-2xl border border-gray-200/70 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:shadow-sm transition"
                          >
                            <div className="flex items-start gap-3 min-w-0">
                              <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">📄</div>
                              <div className="min-w-0">
                                <p className="font-extrabold text-gray-900 truncate">{doc.name}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Uploaded by {doc.uploadedBy} • {doc.date} • {doc.size}
                                </p>
                              </div>
                            </div>
                            <button className={btnSolid} style={{ backgroundColor: "var(--secondary-blue)" }} onClick={() => downloadDocument(doc)}>
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Comments */}
              {activeTab === "comments" && (
                <div className="p-6">
                  <div className="space-y-4">
                    {announcement.comments.map((c) => (
                      <div key={c.id} className="p-4 rounded-2xl border border-gray-200/70 bg-gray-50">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center font-extrabold" style={{ color: "var(--primary-blue)" }}>
                              {c.user?.[0]}
                            </div>
                            <div>
                              <p className="font-extrabold text-gray-900">{c.user}</p>
                              <p className="text-xs text-gray-500">{formatDateTime(c.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mt-3">{c.comment}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200/70">
                    <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Add a Comment
                    </h4>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={4}
                      className={textareaBase}
                      placeholder="Type your comment or question..."
                    />
                    <div className="mt-3 flex justify-end">
                      <button className={btnSolid} style={{ backgroundColor: "var(--secondary-blue)" }} onClick={handleSubmitComment} type="button">
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Read By */}
              {activeTab === "readby" && (
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-3">
                    {announcement.readBy.map((r, idx) => (
                      <div key={idx} className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center font-extrabold" style={{ color: "var(--primary-blue)" }}>
                            {r.name?.[0]}
                          </div>
                          <div>
                            <p className="font-extrabold text-gray-900">{r.name}</p>
                            <p className="text-xs text-gray-500">{r.department}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-800">{formatDateTime(r.readAt)}</p>
                          <p className="text-xs text-gray-500">Read</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-5 bg-blue-50 border-blue-100 text-center">
                      <p className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        {announcement.reads}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Total Views</p>
                    </Card>
                    <Card className="p-5 bg-emerald-50 border-emerald-100 text-center">
                      <p className="text-2xl font-extrabold text-emerald-700">{[...new Set(announcement.readBy.map((x) => x.department))].length}</p>
                      <p className="text-sm text-gray-600 mt-1">Departments</p>
                    </Card>
                    <Card className="p-5 bg-purple-50 border-purple-100 text-center">
                      <p className="text-2xl font-extrabold text-purple-700">{Math.round((announcement.readBy.length / 150) * 100)}%</p>
                      <p className="text-sm text-gray-600 mt-1">Read Rate</p>
                    </Card>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* SIDE */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-sm font-extrabold mb-4" style={{ color: "var(--primary-blue)" }}>
                Announcement Information
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Priority</span>
                  <Pill tone={priorityTone(announcement.priority)}>{announcement.priority}</Pill>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Scope</span>
                  <Pill tone={scopeTone(announcement.scope)}>{announcement.scope}</Pill>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Published</span>
                  <span className="font-semibold text-gray-800">{formatDateTime(announcement.createdDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Expires</span>
                  <span className={`font-semibold ${isExpired ? "text-red-600" : "text-gray-800"}`}>{announcement.expiresAt}</span>
                </div>
                <div className="pt-3 border-t border-gray-200/70">
                  <p className="text-gray-500 font-semibold">Departments</p>
                  <p className="font-semibold text-gray-900 mt-1">{announcement.departments.join(", ")}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-extrabold mb-4" style={{ color: "var(--primary-blue)" }}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  className={`${btnOutline} w-full flex items-center justify-between`}
                  style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                  onClick={() => alert("Emailing announcement...")}
                  type="button"
                >
                  <span>Email Announcement</span>
                  <span>📧</span>
                </button>
                <button
                  className={`${btnOutline} w-full flex items-center justify-between`}
                  style={{ borderColor: "rgba(109,198,223,0.55)", color: "var(--secondary-blue)" }}
                  onClick={() => alert("Link copied to clipboard")}
                  type="button"
                >
                  <span>Share Link</span>
                  <span>🔗</span>
                </button>
                <button
                  className={`${btnOutline} w-full flex items-center justify-between`}
                  style={{ borderColor: "rgba(245,158,11,1)", color: "rgba(245,158,11,1)" }}
                  onClick={() => alert("Viewing analytics...")}
                  type="button"
                >
                  <span>View Analytics</span>
                  <span>📊</span>
                </button>
                <button
                  className={`${btnOutline} w-full flex items-center justify-between`}
                  style={{ borderColor: "rgba(16,185,129,1)", color: "rgba(16,185,129,1)" }}
                  onClick={() => alert("Re-posting announcement...")}
                  type="button"
                >
                  <span>Re-post</span>
                  <span>🔄</span>
                </button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">ℹ️</div>
                <div>
                  <p className="font-extrabold text-gray-900">Executive Access</p>
                  <p className="text-sm text-gray-600 mt-1">
                    You have full access to create, edit, and delete announcements. Changes will be visible to all employees.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
