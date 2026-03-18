"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import EntityQuickActions from "@/components/EntityQuickActions";
import { SecretaryMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";
const AnnouncementIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
  </svg>
);

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
          : tone === "info"
            ? "bg-blue-50 text-blue-700 ring-blue-100"
            : tone === "purple"
              ? "bg-purple-50 text-purple-700 ring-purple-100"
              : "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

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

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white`;

const priorityTone = (priority) => {
  switch (priority) {
    case "URGENT": return "danger";
    case "IMPORTANT": return "warn";
    case "HIGH": return "warn";
    case "NORMAL": return "success";
    default: return "default";
  }
};

const scopeTone = (scope) => {
  switch (scope) {
    case "All Company": return "purple";
    case "All Departments": return "success";
    case "Technical Department": return "info";
    default: return "default";
  }
};

const departmentTone = (dept) => {
  const tones = {
    HSE: "success",
    HR: "purple",
    IT: "info",
    Technical: "info",
    Admin: "warn",
  };
  return tones[dept] || "default";
};

const roleTone = (role) => {
  if (role === 'Secretary') return 'info';
  if (role === 'HSE Department') return 'success';
  return 'default';
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
};

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getFileIcon = (fileName) => {
  const ext = fileName?.split('.').pop().toLowerCase();
  switch (ext) {
    case 'pdf': return '📕';
    case 'doc':
    case 'docx': return '📘';
    case 'xls':
    case 'xlsx': return '📗';
    case 'jpg':
    case 'jpeg':
    case 'png': return '🖼️';
    default: return '📎';
  }
};

export default function SecretaryAnnouncementDetail() {
  const params = useParams() || {};
  const announcementId = params.announcementId;
  const router = useRouter();

  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!announcementId) {
      setError("No announcement ID provided");
      setLoading(false);
      return;
    }

    const fetchAnnouncement = async () => {
      try {
        setLoading(true);
        const res = await fetchWithAuth(`/api/announcements/${announcementId}`);
        if (!res.ok) {
          throw new Error("Announcement not found");
        }
        const data = await res.json();

        setAnnouncement({
          id: data.id,
          title: data.title || "Untitled Announcement",
          message: data.description || "",
          createdBy: data.createdBy || "System",
          createdDate: data.createdAt || data.date || new Date().toISOString(),
          scope: data.scopeType || "All Company",
          priority: data.priority || "NORMAL",
          expiresAt: data.expiresAt || null,
          read: true,
          documents: [],
          attachments: [],
          readBy: [],
          comments: [],
          readCount: 0,
          attachmentsCount: 0,
          department: data.department || "All Departments",
          departments: data.department ? [data.department] : ["All Departments"],
        });
      } catch (err) {
        console.error(err);
        setError("Announcement not found");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [announcementId]);

  const isExpired = useMemo(() => announcement?.expiresAt ? new Date(announcement.expiresAt) < new Date() : false, [announcement?.expiresAt]);
  const markAsRead = () => toast.info('Marked as read');
  const markAsUnread = () => toast.info('Marked as unread');

  const downloadDocument = (doc) => toast.info(`Downloading ${doc.name} (${doc.size})`);
  const handleDownloadAll = () => toast.info('Downloading all attachments...');

  if (loading) {
    return (
      <Layout menuItems={SecretaryMenuItems} userRole="Secretary">
        <div className="flex items-center justify-center p-12">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (error || !announcement) {
    return (
      <Layout menuItems={SecretaryMenuItems} userRole="Secretary">
        <div className="flex flex-col items-center justify-center p-12 gap-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-3xl">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900">{error || "Announcement not found"}</h2>
          <button onClick={() => router.push("/secretary-dashboard/announcements")} className={btnOutline}>
            Back to Announcements
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout menuItems={SecretaryMenuItems} userRole="Secretary">
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
                  onClick={() => router.push("/secretary-dashboard/announcements")}
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
                    {!announcement.read ? <Pill tone="info">NEW</Pill> : <Pill tone="success">READ</Pill>}
                    {isExpired ? <Pill tone="muted">Expired</Pill> : null}
                  </div>

                  <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">{announcement.title}</h1>
                  <p className="text-gray-600 mt-1 text-sm">
                    By <span className="font-semibold">{announcement.createdBy}</span> • {formatDate(announcement.createdDate)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                {!announcement.read ? (
                  <button
                    onClick={markAsRead}
                    className={btnSolid}
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    Mark as Read
                  </button>
                ) : (
                  <button
                    onClick={markAsUnread}
                    className={btnOutline}
                    style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                  >
                    Mark as Unread
                  </button>
                )}
                <button
                  onClick={() => toast.info('Announcement shared')}
                  className={btnSolid}
                  style={{ backgroundColor: "var(--secondary-blue)" }}
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
                <p className="text-sm text-gray-600 mt-0.5">Expired on {formatDate(announcement.expiresAt)}</p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MAIN */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Pill tone={scopeTone(announcement.scope)}>{announcement.scope}</Pill>
                  {announcement.expiresAt && <Pill tone="muted">Expires: {formatDate(announcement.expiresAt)}</Pill>}
                  <Pill tone="muted">ID: {announcement.id}</Pill>
                </div>

                <div className="rounded-2xl border border-gray-200/70 bg-white p-5">
                  <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">{announcement.message}</pre>
                </div>

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
                            <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">
                              {getFileIcon(doc.name)}
                            </div>
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

                {announcement.attachments?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Additional Attachments ({announcement.attachments.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {announcement.attachments.map((att) => (
                        <div
                          key={att.id}
                          className="p-4 rounded-2xl border border-gray-200/70 bg-white transition flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">
                              {att.type === 'image' ? '🖼️' : '📄'}
                            </div>
                            <div>
                              <p className="font-extrabold text-sm text-gray-900">{att.name}</p>
                              <p className="text-xs text-gray-500 mt-1">{att.size}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => downloadDocument(att)}
                            className="text-sm font-semibold" style={{ color: "var(--primary-blue)" }}
                          >
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* SIDE */}
          <div className="space-y-6">
            {/* Announcement Info */}
            <Card className="p-6">
              <SectionTitle title="Announcement Information" />

              <div className="mt-4 space-y-3 text-sm">
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
                  <span className="font-semibold text-gray-800">{formatDate(announcement.createdDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Expires</span>
                  <span className={`font-semibold ${isExpired ? "text-red-600" : "text-gray-800"}`}>
                    {announcement.expiresAt ? formatDate(announcement.expiresAt) : "Never"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Author</span>
                  <span className="font-semibold text-gray-800">{announcement.createdBy}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Status</span>
                  <Pill tone={announcement.read ? 'success' : 'info'}>
                    {announcement.read ? 'Read' : 'Unread'}
                  </Pill>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <EntityQuickActions
              entityType="announcement"
              entityId={announcement.id}
              title={announcement.title}
              currentDate={announcement.createdDate}
              currentExpiresAt={announcement.expiresAt}
            />

            {/* Statistics */}
            <Card className="p-6">
              <SectionTitle title="Announcement Statistics" />

              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-2xl border border-gray-200/70">
                    <p className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      {announcement.documents.length}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Documents</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl border border-gray-200/70">
                    <p className="text-2xl font-extrabold" style={{ color: "#10B981" }}>
                      {announcement.attachments.length}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Attachments</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200/70">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-xl font-extrabold" style={{ color: "#F59E0B" }}>
                        {announcement.documents.length}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Documents</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-extrabold" style={{ color: "#8B5CF6" }}>
                        {announcement.attachments.length}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Attachments</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Related Announcements */}
            <Card className="p-6">
              <SectionTitle title="Related Announcements" />

              <div className="mt-4 space-y-3">
                <Link href="/secretary-dashboard/announcement/ANN-001">
                  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer">
                    <p className="font-extrabold text-sm text-gray-900">Year-End Holiday Schedule</p>
                    <p className="text-xs text-gray-500 mt-1">HR Manager • Dec 10</p>
                  </div>
                </Link>
                <Link href="/secretary-dashboard/announcement/ANN-002">
                  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer">
                    <p className="font-extrabold text-sm text-gray-900">System Maintenance Notice</p>
                    <p className="text-xs text-gray-500 mt-1">IT Department • Dec 9</p>
                  </div>
                </Link>
                <Link href="/secretary-dashboard/announcement/ANN-006">
                  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer">
                    <p className="font-extrabold text-sm text-gray-900">Training Session: New Software</p>
                    <p className="text-xs text-gray-500 mt-1">Technical Department • Dec 5</p>
                  </div>
                </Link>
              </div>
            </Card>

            {/* Secretary Note */}
            <Card className="p-6 bg-blue-50/30">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-xl">ℹ️</div>
                <div>
                  <p className="font-extrabold text-gray-900">Read-only Access</p>
                  <p className="text-sm text-gray-600 mt-1">
                    You have read-only access to announcements. For any corrections or updates, please contact the HR department.
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
