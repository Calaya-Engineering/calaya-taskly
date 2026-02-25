"use client";

// pages/dashboards/HOD/HODAnnouncementDetail.jsx
import { useMemo, useState } from 'react';
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
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
const btnSolid = `${btnBase} text-white`;

const textareaBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";

export default function HODAnnouncementDetail() {
  const params = useParams() || {};
  const announcementId = params.announcementId;
  const router = useRouter();
  if (!announcementId) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const [activeTab, setActiveTab] = useState("content");
  const [newComment, setNewComment] = useState("");
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  // Demo data
  const announcement = useMemo(
    () => ({
      id: announcementId || "ANN-002",
      title: "Safety Protocol Updates",
      message: `IMPORTANT SAFETY PROTOCOL UPDATES

Effective immediately, all technical staff must adhere to the following updated safety protocols for offshore operations:

1. PERSONAL PROTECTIVE EQUIPMENT (PPE):
   - Hard hats must be worn at all times in operational areas
   - Safety goggles required for all equipment handling
   - High-visibility vests mandatory in all outdoor areas
   - Steel-toe boots required in workshop and field operations

2. EQUIPMENT SAFETY:
   - All equipment must undergo daily safety checks
   - Faulty equipment must be tagged and removed from service immediately
   - Safety guards must be in place during equipment operation

3. EMERGENCY PROCEDURES:
   - New emergency assembly points have been designated
   - Updated evacuation routes posted in all buildings
   - Emergency contact numbers updated

4. TRAINING REQUIREMENTS:
   - All technical staff must complete the updated safety training by December 31, 2024
   - Training available online via the company portal
   - Certification required for continued site access

Failure to comply with these protocols will result in disciplinary action and potential site access revocation.`,
      createdBy: "HSE Manager",
      createdDate: "2024-12-14 14:15",
      scope: "Technical Department",
      priority: "URGENT",
      expiresAt: "2025-01-31",
      read: true,
      department: "HSE",
      documents: [
        { id: 1, name: "Updated_Safety_Protocols.pdf", uploadedBy: "HSE Manager", date: "2024-12-14", size: "2.1 MB" },
        { id: 2, name: "Training_Schedule.xlsx", uploadedBy: "HSE Manager", date: "2024-12-14", size: "1.5 MB" },
      ],
      attachments: [
        { id: 1, name: "PPE_Requirements.pdf", type: "document", uploadedBy: "HSE Dept", date: "2024-12-14", size: "0.8 MB" },
      ],
      readBy: [
        { name: "Alex Johnson", department: "Technical", readAt: "2024-12-14 15:30" },
        { name: "Maria Garcia", department: "HSE", readAt: "2024-12-14 16:15" },
        { name: "David Chen", department: "Workshop", readAt: "2024-12-15 09:45" },
        { name: "Emma Wilson", department: "Technical", readAt: "2024-12-15 11:20" },
        { name: "Michael Brown", department: "Technical", readAt: "2024-12-15 14:10" },
      ],
      pendingAcknowledgements: [
        { name: "Sarah Taylor", department: "Technical" },
        { name: "Robert Lee", department: "Workshop" },
        { name: "Lisa Wang", department: "Technical" },
      ],
      comments: [
        { id: 1, user: "Alex Johnson", comment: "Where can we access the online training?", timestamp: "2024-12-14 15:45" },
        { id: 2, user: "HSE Manager", comment: "Training is available on the company portal under 'Safety Training' section", timestamp: "2024-12-14 16:00" },
        { id: 3, user: "David Chen", comment: "Are there any changes to the permit-to-work system?", timestamp: "2024-12-15 10:30" },
      ],
      readCount: 89,
      acknowledgedCount: 45,
      requireAcknowledgement: true
    }),
    [announcementId]
  );

  const isExpired = useMemo(() => new Date(announcement.expiresAt) < new Date(), [announcement.expiresAt]);

  const priorityTone = (p) => {
    if (p === "URGENT") return "danger";
    if (p === "IMPORTANT") return "warn";
    if (p === "HIGH") return "warn";
    if (p === "NORMAL") return "success";
    return "muted";
  };

  const scopeTone = (s) => {
    if (s === "All Company") return "purple";
    if (s === "Technical Department") return "default";
    if (s === "Workshop Department") return "warn";
    if (s === "HODs Only") return "default";
    return "muted";
  };

  const departmentTone = (d) => {
    if (d === "Technical") return "default";
    if (d === "HSE") return "success";
    if (d === "Workshop") return "warn";
    return "muted";
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return toast.warning("Please enter a comment");
    toast.success("Comment submitted!");
    setNewComment("");
  };

  const handleAcknowledge = () => {
    setIsAcknowledged(true);
    toast.info("Announcement acknowledged!");
  };

  const downloadDocument = (doc) => toast.info(`Downloading ${doc.name} (${doc.size})`);

  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
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
                  onClick={() => router.push("/hod-dashboard/announcements")}
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
                    <Pill tone={departmentTone(announcement.department)}>{announcement.department}</Pill>
                    {!announcement.read ? <Pill>NEW</Pill> : null}
                    {isExpired ? <Pill tone="muted">Expired</Pill> : null}
                  </div>

                  <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 truncate">{announcement.title}</h1>
                  <p className="text-gray-600 mt-1 text-sm">
                    By <span className="font-semibold">{announcement.createdBy}</span> • {formatDateTime(announcement.createdDate)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => toast.info("Announcement shared")}
                  className={btnOutline}
                  style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                >
                  Share
                </button>
                {announcement.read ? (
                  <button
                    className={btnOutline}
                    style={{ borderColor: "rgba(109,198,223,0.55)", color: "var(--secondary-blue)" }}
                    onClick={() => toast.info("Marked as unread")}
                  >
                    Mark as Unread
                  </button>
                ) : (
                  <button className={btnSolid} style={{ backgroundColor: "var(--secondary-blue)" }} onClick={() => toast.info("Marked as read")}>
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Acknowledgement Banner */}
        {announcement.requireAcknowledgement && !isAcknowledged && !isExpired && (
          <Card className="p-5 border-amber-200 bg-amber-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/70 flex items-center justify-center text-2xl">⚠️</div>
                <div>
                  <p className="font-extrabold text-amber-800">Acknowledgement Required</p>
                  <p className="text-sm text-amber-700 mt-0.5">Please acknowledge that you have read and understood this announcement</p>
                </div>
              </div>
              <button
                onClick={handleAcknowledge}
                className={btnSolid}
                style={{ backgroundColor: "#F59E0B" }}
              >
                I Acknowledge
              </button>
            </div>
          </Card>
        )}

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
                  { id: "acknowledgements", label: `Acknowledgements (${announcement.pendingAcknowledgements.length} pending)` },
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

              {/* Content Tab */}
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
                            className="p-4 rounded-2xl border border-gray-200/70 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-3 transition"
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

                  {/* Attachments */}
                  {announcement.attachments?.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                        Additional Attachments ({announcement.attachments.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {announcement.attachments.map((att) => (
                          <div
                            key={att.id}
                            className="p-4 rounded-2xl border border-gray-200/70 bg-white flex items-center justify-between transition"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center text-xl">📎</div>
                              <div className="min-w-0">
                                <p className="font-semibold text-sm text-gray-900 truncate">{att.name}</p>
                                <p className="text-xs text-gray-500">{att.size}</p>
                              </div>
                            </div>
                            <button className="text-sm text-blue-600 hover:text-blue-800 font-semibold" onClick={() => downloadDocument(att)}>
                              View
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Comments Tab */}
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

              {/* Read By Tab */}
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
                        {announcement.readCount}
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

              {/* Acknowledgements Tab */}
              {activeTab === "acknowledgements" && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-5 bg-green-50 border-green-100 text-center">
                      <p className="text-2xl font-extrabold text-green-700">{announcement.acknowledgedCount}</p>
                      <p className="text-sm text-gray-600 mt-1">Acknowledged</p>
                    </Card>
                    <Card className="p-5 bg-amber-50 border-amber-100 text-center">
                      <p className="text-2xl font-extrabold text-amber-700">{announcement.pendingAcknowledgements.length}</p>
                      <p className="text-sm text-gray-600 mt-1">Pending</p>
                    </Card>
                    <Card className="p-5 bg-blue-50 border-blue-100 text-center">
                      <p className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        {Math.round((announcement.acknowledgedCount / (announcement.acknowledgedCount + announcement.pendingAcknowledgements.length)) * 100)}%
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Acknowledgment Rate</p>
                    </Card>
                  </div>

                  <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                    Pending Acknowledgements
                  </h4>
                  <div className="space-y-3">
                    {announcement.pendingAcknowledgements.map((user, index) => (
                      <div key={index} className="p-4 rounded-2xl border border-amber-200 bg-amber-50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center font-extrabold text-amber-800">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-extrabold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-600">{user.department}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toast.info(`Reminder sent to ${user.name}`)}
                          className="px-4 py-2 rounded-2xl text-sm font-semibold border border-amber-500 text-amber-600 hover:bg-amber-100 active:scale-[0.99] transition"
                        >
                          Send Reminder
                        </button>
                      </div>
                    ))}
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
                  <span className="text-gray-500 font-semibold">Department</span>
                  <Pill tone={departmentTone(announcement.department)}>{announcement.department}</Pill>
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
                  <p className="text-gray-500 font-semibold">Author</p>
                  <p className="font-semibold text-gray-900 mt-1">{announcement.createdBy}</p>
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
                  onClick={() => toast.info("Printing announcement...")}
                  type="button"
                >
                  <span>Print Announcement</span>
                  <span>🖨️</span>
                </button>
                <button
                  className={`${btnOutline} w-full flex items-center justify-between`}
                  style={{ borderColor: "rgba(109,198,223,0.55)", color: "var(--secondary-blue)" }}
                  onClick={() => toast.info("Sending reminders...")}
                  type="button"
                >
                  <span>Send Reminders</span>
                  <span>📧</span>
                </button>
                <button
                  className={`${btnOutline} w-full flex items-center justify-between`}
                  style={{ borderColor: "#EF4444", color: "#EF4444" }}
                  onClick={() => toast.info("Deleting announcement...")}
                  type="button"
                >
                  <span>Delete Announcement</span>
                  <span>🗑️</span>
                </button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-extrabold mb-4" style={{ color: "var(--primary-blue)" }}>
                Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                    {announcement.comments.length}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Comments</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-extrabold" style={{ color: "#8B5CF6" }}>
                    {announcement.documents.length + announcement.attachments.length}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Attachments</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">ℹ️</div>
                <div>
                  <p className="font-extrabold text-gray-900">HOD Action Required</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Ensure all team members acknowledge urgent announcements within 24 hours.
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