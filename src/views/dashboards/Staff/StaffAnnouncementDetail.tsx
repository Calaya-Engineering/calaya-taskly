"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";
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
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white`;

export default function StaffAnnouncementDetail() {
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
          reads: 0,
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
  const priorityTone = (p) => (p === "URGENT" ? "danger" : p === "IMPORTANT" || p === "HIGH" ? "warn" : p === "NORMAL" ? "success" : "muted");
  const scopeTone = (s) => (s === "All Company" ? "purple" : s === "Technical Department" ? "info" : s === "Workshop Department" ? "warn" : "muted");

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const markAsUnread = () => toast.info("Marked as unread");

  if (loading) {
    return (
      <Layout menuItems={StaffMenuItems} userRole="Staff">
        <div className="flex items-center justify-center p-12">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (error || !announcement) {
    return (
      <Layout menuItems={StaffMenuItems} userRole="Staff">
        <div className="flex flex-col items-center justify-center p-12 gap-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-3xl">{renderNodeWithIcons("⚠️")}</div>
          <h2 className="text-xl font-bold text-gray-900">{error || "Announcement not found"}</h2>
          <button onClick={() => router.push("/staff-dashboard/announcements")} className={btnOutline}>
            Back to Announcements
          </button>
        </div>
      </Layout>
    );
  }

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

                  <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">{announcement.title}</h1>
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
                <p className="text-sm text-gray-600 mt-0.5">Expired on {formatDateTime(announcement.expiresAt)}</p>
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
                  {announcement.expiresAt && <Pill tone="muted">Expires: {formatDateTime(announcement.expiresAt)}</Pill>}
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
                            <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">{renderNodeWithIcons("📄")}</div>
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
                  <span>{renderNodeWithIcons("🖨️")}</span>
                </button>
                <button
                  className={`${btnOutline} w-full flex items-center justify-between`}
                  style={{ borderColor: "rgba(109,198,223,0.55)", color: "var(--secondary-blue)" }}
                  onClick={() => toast.success("Saved for later")}
                  type="button"
                >
                  <span>Save for Later</span>
                  <span>{renderNodeWithIcons("💾")}</span>
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
                  <span>{renderNodeWithIcons("💬")}</span>
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
                <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center text-xl">{renderNodeWithIcons("⚠️")}</div>
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
