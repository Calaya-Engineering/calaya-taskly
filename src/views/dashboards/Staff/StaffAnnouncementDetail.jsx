"use client";

// pages/dashboards/Staff/StaffAnnouncementDetail.jsx
import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
/* ---------- UI helpers ---------- */
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

export default function StaffAnnouncementDetail() {
  const params = useParams() || {};
  const announcementId = params.announcementId;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("content");
  const [newComment, setNewComment] = useState("");
  const [isInternal, setIsInternal] = useState(false);

  // Demo data
  const announcement = useMemo(
    () => ({
      id: announcementId || "ANN-001",
      title: "Safety Protocol Update - December 2024",
      message: `Dear All,

Please review the updated safety protocols that will take effect from January 1, 2025. All staff must complete the mandatory safety training by December 31, 2024.

Key Changes:
1. New workshop equipment safety guidelines
2. Updated emergency evacuation procedures
3. Revised personal protective equipment requirements
4. Enhanced incident reporting system

Training Requirements:
• All technical staff must attend workshop safety training
• Office staff must complete fire safety training
• Department heads are responsible for ensuring compliance

Action Required:
1. Review the attached safety protocol document
2. Complete required training by December 31
3. Submit training completion certificates to HR
4. Report any safety concerns immediately

Failure to complete training by the deadline may result in restricted site access.`,
      createdBy: "HSE Department",
      createdDate: "2024-12-10T09:30:00",
      scope: "All Company",
      priority: "IMPORTANT",
      expiresAt: "2024-12-31",
      read: true,
      documents: [
        { id: 1, name: "Safety Protocol v2.1.pdf", uploadedBy: "HSE Department", date: "2024-12-10", size: "2.4 MB" },
        { id: 2, name: "Training Schedule.xlsx", uploadedBy: "HR Department", date: "2024-12-09", size: "0.8 MB" },
      ],
      attachments: [],
      readBy: [
        { name: "John Doe", department: "Technical", readAt: "2024-12-10T10:15:00" },
        { name: "Sarah Smith", department: "Workshop", readAt: "2024-12-10T11:30:00" },
        { name: "Mike Johnson", department: "HSE", readAt: "2024-12-10T09:45:00" },
        { name: "Lisa Wang", department: "Technical", readAt: "2024-12-10T14:20:00" },
        { name: "Robert Brown", department: "Logistics", readAt: "2024-12-10T16:45:00" },
      ],
      comments: [
        { id: 1, user: "John Doe", comment: "When is the workshop safety training scheduled?", timestamp: "2024-12-10T10:30:00", isInternal: false },
        { id: 2, user: "HSE Officer", comment: "Workshop training is scheduled for Dec 15 & 16", timestamp: "2024-12-10T11:15:00", isInternal: false },
        { id: 3, user: "HR Department", comment: "Training completion certificates should be submitted through the portal", timestamp: "2024-12-10T12:45:00", isInternal: false },
        { id: 4, user: "HSE Manager", comment: "Internal Note: Need to follow up with Technical Dept", timestamp: "2024-12-10T13:30:00", isInternal: true },
      ],
      reads: 142,
      departments: ["All Departments"],
    }),
    [announcementId]
  );

  const isExpired = useMemo(() => new Date(announcement.expiresAt) < new Date(), [announcement.expiresAt]);

  const priorityTone = (p) => (p === "URGENT" ? "danger" : p === "IMPORTANT" || p === "HIGH" ? "warn" : p === "NORMAL" ? "success" : "muted");
  const scopeTone = (s) => (s === "All Company" ? "purple" : s === "Technical Department" ? "info" : s === "Workshop Department" ? "warn" : "muted");

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return toast.warning("Please enter a comment");
    toast.success("Comment submitted!");
    setNewComment("");
    setIsInternal(false);
  };

  const downloadDocument = (doc) => toast.info(`Downloading ${doc.name} (${doc.size})`);
  const markAsUnread = () => toast.info("Marked as unread");

  return (
    <Layout menuItems={StaffMenuItems} userRole="Staff">
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
                  onClick={() => router.push("/staff-dashboard/announcements")}
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
                <button
                  onClick={markAsUnread}
                  className={btnOutline}
                  style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                >
                  Mark as Unread
                </button>
                <button
                  className={btnSolid}
                  style={{ backgroundColor: "var(--secondary-blue)" }}
                  onClick={() => toast.info("Announcement shared")}
                >
                  Share
                </button>
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
                </div>
              )}

              {/* Comments */}
              {activeTab === "comments" && (
                <div className="p-6">
                  <div className="space-y-4">
                    {announcement.comments.map((c) => (
                      <div key={c.id} className={`p-4 rounded-2xl border ${c.isInternal ? 'bg-amber-50/50 border-amber-200' : 'bg-gray-50 border-gray-200/70'}`}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center font-extrabold" style={{ color: "var(--primary-blue)" }}>
                              {c.user?.[0]}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-extrabold text-gray-900">{c.user}</p>
                                {c.isInternal && <Pill tone="warn">Internal</Pill>}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{formatDateTime(c.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mt-3">{c.comment}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200/70">
                    <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Add Your Comment
                    </h4>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={4}
                      className={textareaBase}
                      placeholder="Add your comment or question..."
                    />
                    <div className="mt-3 flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isInternal}
                          onChange={(e) => setIsInternal(e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-600">Mark as internal comment</span>
                      </label>
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
                      <p className="text-2xl font-extrabold text-purple-700">{announcement.comments.length}</p>
                      <p className="text-sm text-gray-600 mt-1">Comments</p>
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
                  onClick={() => toast.success("Saved for later")}
                  type="button"
                >
                  <span>Save for Later</span>
                  <span>💾</span>
                </button>
                <button
                  className={`${btnOutline} w-full flex items-center justify-between`}
                  style={{ borderColor: "rgba(245,158,11,1)", color: "rgba(245,158,11,1)" }}
                  onClick={() => toast.info("Reminder set")}
                  type="button"
                >
                  <span>Set Reminder</span>
                  <span>⏰</span>
                </button>
                <button
                  className={`${btnOutline} w-full flex items-center justify-between`}
                  style={{ borderColor: "rgba(16,185,129,1)", color: "rgba(16,185,129,1)" }}
                  onClick={() => toast.info("Asking for clarification...")}
                  type="button"
                >
                  <span>Ask for Clarification</span>
                  <span>💬</span>
                </button>
              </div>
            </Card>

            {/* Related Announcements */}
            <Card className="p-6">
              <h3 className="text-sm font-extrabold mb-4" style={{ color: "var(--primary-blue)" }}>
                Related Announcements
              </h3>
              <div className="space-y-3">
                <Link href="/staff-dashboard/announcement/ANN-002">
                  <div className="p-3 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer">
                    <p className="font-extrabold text-sm text-gray-900">Year-End Holiday Schedule</p>
                    <p className="text-xs text-gray-500 mt-1">By HR Department • Dec 8</p>
                  </div>
                </Link>
                <Link href="/staff-dashboard/announcement/ANN-003">
                  <div className="p-3 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer">
                    <p className="font-extrabold text-sm text-gray-900">Team Building Event</p>
                    <p className="text-xs text-gray-500 mt-1">By Admin Department • Dec 5</p>
                  </div>
                </Link>
                <Link href="/staff-dashboard/announcement/ANN-004">
                  <div className="p-3 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer">
                    <p className="font-extrabold text-sm text-gray-900">New Tender Announcement</p>
                    <p className="text-xs text-gray-500 mt-1">By Procurement • Dec 4</p>
                  </div>
                </Link>
              </div>
            </Card>

            {/* Important Notice */}
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center text-xl">⚠️</div>
                <div>
                  <p className="font-extrabold text-gray-900">Important Notice</p>
                  <p className="text-sm text-gray-600 mt-1">
                    All staff must acknowledge reading important announcements by the deadline.
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