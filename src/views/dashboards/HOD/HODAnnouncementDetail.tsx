"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import EntityQuickActions from "@/components/EntityQuickActions";
import { HODMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";
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
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white`;

export default function HODAnnouncementDetail() {
  const params = useParams() || {};
  const announcementId = params.announcementId;
  const router = useRouter();
  if (!announcementId) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const [activeTab, setActiveTab] = useState("content");
  const [isAcknowledged, setIsAcknowledged] = useState(false);

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
          pendingAcknowledgements: [],
          comments: [],
          readCount: 0,
          acknowledgedCount: 0,
          requireAcknowledgement: false,
          department: data.department || "All Departments",
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

  const handleAcknowledge = () => {
    setIsAcknowledged(true);
    toast.info("Announcement acknowledged!");
  };

  const downloadDocument = (doc) => toast.info(`Downloading ${doc.name} (${doc.size})`);

  if (loading) {
    return (
      <Layout menuItems={HODMenuItems} userRole="HOD">
        <div className="flex items-center justify-center p-12">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (error || !announcement) {
    return (
      <Layout menuItems={HODMenuItems} userRole="HOD">
        <div className="flex flex-col items-center justify-center p-12 gap-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-3xl">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900">{error || "Announcement not found"}</h2>
          <button onClick={() => router.push("/hod-dashboard/announcements")} className={btnOutline}>
            Back to Announcements
          </button>
        </div>
      </Layout>
    );
  }

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

                  <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">{announcement.title}</h1>
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
                <p className="text-sm text-gray-600 mt-0.5">Expired on {formatDateTime(announcement.expiresAt)}</p>
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
                  { id: "acknowledgements", label: `Acknowledgements (${announcement.pendingAcknowledgements.length} pending)` },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`px-6 py-4 text-sm font-semibold transition ${activeTab === t.id ? "text-blue-700" : "text-gray-500 hover:text-gray-700"
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
                    {announcement.expiresAt && <Pill tone="muted">Expires: {formatDateTime(announcement.expiresAt)}</Pill>}
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
                  <span className={`font-semibold ${isExpired ? "text-red-600" : "text-gray-800"}`}>
                    {announcement.expiresAt ? formatDateTime(announcement.expiresAt) : "Never"}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200/70">
                  <p className="text-gray-500 font-semibold">Author</p>
                  <p className="font-semibold text-gray-900 mt-1">{announcement.createdBy}</p>
                </div>
              </div>
            </Card>

            <EntityQuickActions
              entityType="announcement"
              entityId={announcement.id}
              title={announcement.title}
              currentDate={announcement.createdDate}
              currentExpiresAt={announcement.expiresAt}
            />

            <Card className="p-6">
              <h3 className="text-sm font-extrabold mb-4" style={{ color: "var(--primary-blue)" }}>
                Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                    {announcement.acknowledgedCount}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Acknowledged</p>
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
