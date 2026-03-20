"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

/* ---------- Shared UI helpers (dashboard style) ---------- */
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

const inputBase =
  "w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white`;

export default function MDAnnouncements() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [announcementsData, setAnnouncementsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnnouncements = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetchWithAuth("/api/announcements");
      if (res.ok) {
        const data = await res.json();
        setAnnouncementsData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  // Real-time: re-fetch when announcements change
  useSSE("/api/announcements/events", (ev) => {
    if (ev.type?.startsWith("announcement:")) fetchAnnouncements();
  });


  const activeAnnouncements = useMemo(() => {
    const now = new Date();
    return announcementsData.filter((a) => !a.expiresAt || new Date(a.expiresAt) >= now);
  }, [announcementsData]);

  const unreadCount = useMemo(() => activeAnnouncements.filter((a) => !a.read).length, [activeAnnouncements]);
  const urgentUnreadCount = useMemo(
    () => activeAnnouncements.filter((a) => a.priority === "URGENT" && !a.read).length,
    [activeAnnouncements]
  );
  const urgentCount = useMemo(() => activeAnnouncements.filter((a) => a.priority === "URGENT").length, [activeAnnouncements]);

  const filteredAnnouncements = useMemo(() => {
    return announcementsData.filter((ann) => {
      if (filter === "unread" && ann.read) return false;
      if (filter === "urgent" && ann.priority !== "URGENT") return false;
      if (filter === "important" && ann.priority !== "IMPORTANT" && ann.priority !== "HIGH") return false;
      if (filter === "hods" && ann.scope !== "HODs Only" && ann.scope !== "HODS_ONLY") return false;

      if (search) {
        const q = search.toLowerCase();
        const titleMatch = (ann.title || "").toLowerCase().includes(q);
        const messageMatch = (ann.message || "").toLowerCase().includes(q);
        if (!titleMatch && !messageMatch) return false;
      }
      return true;
    });
  }, [filter, search, announcementsData]);

  const priorityTone = (priority) => {
    switch (priority) {
      case "URGENT":
        return "danger";
      case "IMPORTANT":
        return "warn";
      case "HIGH":
        return "warn";
      case "NORMAL":
        return "success";
      default:
        return "muted";
    }
  };

  const scopeTone = (scope) => {
    switch (scope) {
      case "All Company":
        return "purple";
      case "HODs Only":
        return "default";
      case "Workshop Department":
        return "warn";
      default:
        return "muted";
    }
  };

  const departmentTone = (dept0) => {
    switch (dept0) {
      case "All":
        return "success";
      case "All HODs":
        return "purple";
      case "Workshop":
        return "warn";
      default:
        return "muted";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const isExpired = (expiresAt) => new Date(expiresAt) < new Date();

  const markAsRead = async (id) => {
    try {
      const res = await fetchWithAuth(`/api/announcements/${id}/read`, { method: "PATCH" });
      if (res.ok) {
        toast.info(`Marked announcement ${id} as read`);
        setAnnouncementsData(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
      } else {
        toast.error("Failed to mark as read");
      }
    } catch (e) {
      toast.error("Failed to mark as read");
    }
  };

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
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>{renderNodeWithIcons("📢 Announcements")}</Pill>
                  <Pill tone="success">Unread: {unreadCount}</Pill>
                  <Pill tone={urgentUnreadCount ? "danger" : "muted"}>Urgent Unread: {urgentUnreadCount}</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Announcements
                </h1>
                <p className="text-gray-600 mt-2">Company-wide updates and important communications.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Link href="/md-dashboard/create-announcement">
                  <button className={btnSolid} style={{ backgroundColor: "var(--accent-red)" }}>
                    + Create Announcement
                  </button>
                </Link>
                <Link href="/md-dashboard">
                  <button className={btnOutline} style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}>
                    Back to Dashboard
                  </button>
                </Link>
              </div>
            </div>

            {/* FILTER BAR */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "All" },
                  { id: "unread", label: `Unread (${unreadCount})` },
                  { id: "urgent", label: "Urgent" },
                  { id: "important", label: "Important/High" },
                  { id: "hods", label: "HODs Only" },
                ].map((f) => {
                  const active = filter === f.id;
                  const bg =
                    f.id === "urgent"
                      ? active
                        ? "rgba(239,68,68,1)"
                        : "transparent"
                      : f.id === "important"
                        ? active
                          ? "rgba(245,158,11,1)"
                          : "transparent"
                        : f.id === "unread"
                          ? active
                            ? "var(--secondary-blue)"
                            : "transparent"
                          : f.id === "hods"
                            ? active
                              ? "rgba(139,92,246,1)"
                              : "transparent"
                            : active
                              ? "var(--primary-blue)"
                              : "transparent";

                  const border =
                    f.id === "urgent"
                      ? "rgba(239,68,68,1)"
                      : f.id === "important"
                        ? "rgba(245,158,11,1)"
                        : f.id === "unread"
                          ? "var(--secondary-blue)"
                          : f.id === "hods"
                            ? "rgba(139,92,246,1)"
                            : "var(--primary-blue)";

                  const color = active ? "white" : border;

                  return (
                    <button
                      key={f.id}
                      onClick={() => setFilter(f.id)}
                      className="px-4 py-2 rounded-2xl text-sm font-semibold border active:scale-[0.99] transition"
                      style={{
                        backgroundColor: bg,
                        borderColor: active ? "transparent" : border,
                        color,
                      }}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>

              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search announcements..."
                  className={inputBase}
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-3.5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </Card>

        {/* URGENT BANNER */}
        {urgentUnreadCount > 0 && (
          <Card className="p-5 border-red-200 bg-red-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/70 flex items-center justify-center text-2xl">{renderNodeWithIcons("🚨")}</div>
                <div>
                  <p className="font-extrabold text-red-800">Urgent announcements need your attention</p>
                  <p className="text-sm text-red-700 mt-0.5">{urgentUnreadCount} urgent announcement(s) unread</p>
                </div>
              </div>
              <button
                className={btnSolid}
                style={{ backgroundColor: "rgba(239,68,68,1)" }}
                onClick={() => setFilter("urgent")}
              >
                View Urgent
              </button>
            </div>
          </Card>
        )}

        {/* LIST */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12 py-20 bg-white rounded-2xl border border-gray-200/70 shadow-sm">
            <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-semibold">Loading announcements...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4">
              {filteredAnnouncements.map((a) => {
                const expired = isExpired(a.expiresAt);
                return (
                  <Card key={a.id} className={`overflow-hidden ${!a.read ? "ring-2 ring-blue-200" : ""} ${expired ? "opacity-80" : ""}`}>
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {!a.read ? <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> : null}
                            <Pill tone={priorityTone(a.priority)}>{a.priority}</Pill>
                            <Pill tone={scopeTone(a.scope)}>{a.scope}</Pill>
                            <Pill tone={departmentTone(a.departments?.[0])}>{a.departments.join(", ")}</Pill>
                            {expired ? <Pill tone="muted">Expired</Pill> : null}
                          </div>

                          <h3 className="text-lg font-extrabold text-gray-900 truncate">{a.title}</h3>
                          <p className="text-sm text-gray-600 mt-2">
                            {(a.message || "").length > 200 ? (a.message || "").substring(0, 200) + "..." : (a.message || "")}
                          </p>

                          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <span className="inline-flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-blue-50 flex items-center justify-center">{renderNodeWithIcons("👤")}</span>
                              {a.createdBy}
                            </span>
                            <span className="inline-flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-blue-50 flex items-center justify-center">{renderNodeWithIcons("🗓️")}</span>
                              {formatDate(a.createdDate)}
                            </span>
                            <span className="inline-flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-blue-50 flex items-center justify-center">{renderNodeWithIcons("👁️")}</span>
                              {a.readsCount || 0} views
                            </span>
                            {a.expiresAt && (
                              <span className="inline-flex items-center gap-2">
                                <span className="w-8 h-8 rounded-2xl bg-blue-50 flex items-center justify-center">{renderNodeWithIcons("⏳")}</span>
                                Expires: {a.expiresAt ? formatDate(a.expiresAt) : "N/A"}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                          {!a.read && (
                            <button
                              onClick={() => markAsRead(a.id)}
                              className={btnOutline}
                              style={{ borderColor: "rgba(109,198,223,0.55)", color: "var(--secondary-blue)" }}
                            >
                              Mark as Read
                            </button>
                          )}
                          <Link href={`/md-dashboard/announcement/${a.id}`}>
                            <button className={btnSolid} style={{ backgroundColor: "var(--primary-blue)" }}>
                              View Details
                            </button>
                          </Link>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-gray-200/70 flex flex-wrap items-center justify-between gap-3 text-sm">
                        <div className="flex flex-wrap items-center gap-3 text-gray-600">
                          <span>{renderNodeWithIcons("📄 ")}{a.documents} attachment{a.documents !== 1 ? "s" : ""}</span>
                          <span>{renderNodeWithIcons("💬 ")}{a.comments} comment{a.comments !== 1 ? "s" : ""}</span>
                        </div>

                        <div className="text-xs text-gray-500 inline-flex items-center gap-2">
                          <span className="font-semibold" style={{ color: "var(--primary-blue)" }}>
                            {renderNodeWithIcons(a.read ? "✅ Read" : "📌 New")}
                          </span>
                          <span>•</span>
                          <span>ID: {a.id}</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-3" style={{ backgroundColor: "rgba(109, 198, 223, 0.08)" }}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold" style={{ color: "var(--primary-blue)" }}>
                          {a.scope}
                        </span>
                        <span className="text-xs text-gray-600">{a.createdBy}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {filteredAnnouncements.length === 0 && (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}>
                  <span className="text-2xl" style={{ color: "var(--secondary-blue)" }}>{renderNodeWithIcons("\n                    🧐\n                  ")}</span>
                </div>
                <h3 className="text-lg font-extrabold text-gray-900 mb-2">No announcements found</h3>
                <p className="text-gray-600">Try adjusting your filters or search term.</p>
              </Card>
            )}
          </>
        )}

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total", value: announcementsData.length, icon: "📢", tone: "default" },
            { label: "Unread", value: unreadCount, icon: "📌", tone: "success" },
            { label: "Urgent", value: urgentCount, icon: "🚨", tone: "danger" },
            {
              label: "Avg. Reads",
              value: announcementsData.length > 0 ? Math.round(announcementsData.reduce((s, a) => s + (a.readsCount || 0), 0) / announcementsData.length) : 0,
              icon: "👁️",
              tone: "purple",
            },
          ].map((s) => (
            <Card key={s.label} className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold">{s.label}</p>
                  <p className="text-2xl font-extrabold mt-2">{s.value}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(44, 75, 155, 0.08)" }}>
                  <span className="text-xl">{renderNodeWithIcons(s.icon)}</span>
                </div>
              </div>
              <div className="mt-3">
                <Pill tone={s.tone}>{s.label} stat</Pill>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
