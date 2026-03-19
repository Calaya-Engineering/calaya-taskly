"use client";

// pages/dashboards/Secretary/SecretaryAnnouncements.jsx
import { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { SecretaryMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

const AnnouncementIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
  </svg>
);

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

const inputBase =
  "w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";


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
    HR: "purple",
    IT: "info",
    HSE: "success",
    Technical: "info",
    Admin: "warn",
  };
  return tones[dept] || "default";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
};

const isExpired = (expiresAt) => new Date(expiresAt) < new Date();

export default function SecretaryAnnouncements() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [announcementsData, setAnnouncementsData] = useState([]);
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

  const unreadCount = useMemo(() => announcementsData.filter((a) => !a.read).length, [announcementsData]);
  const urgentCount = useMemo(() => announcementsData.filter((a) => a.priority === "URGENT").length, [announcementsData]);
  const importantCount = useMemo(() => announcementsData.filter((a) => a.priority === "IMPORTANT").length, [announcementsData]);

  const filteredAnnouncements = useMemo(() => {
    const query = search.trim().toLowerCase();
    return announcementsData.filter((ann) => {
      if (filter === "unread" && ann.read) return false;
      if (filter === "urgent" && ann.priority !== "URGENT") return false;
      if (filter === "important" && ann.priority !== "IMPORTANT") return false;

      if (query) {
        const hit =
          ann.title.toLowerCase().includes(query) ||
          (ann.message || "").toLowerCase().includes(query) ||
          (ann.department && ann.department.toLowerCase().includes(query)) ||
          (ann.createdBy || "").toLowerCase().includes(query);
        if (!hit) return false;
      }
      return true;
    });
  }, [filter, search, announcementsData]);

  const stats = useMemo(() => {
    const total = announcementsData.length;
    const unread = unreadCount;
    const important = importantCount + urgentCount;
    const thisWeek = announcementsData.filter(a => {
      const annDate = new Date(a.createdDate);
      const now = new Date();
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      return annDate >= weekAgo;
    }).length;
    return { total, unread, important, thisWeek };
  }, [unreadCount, importantCount, urgentCount, announcementsData]);

  const markAsRead = async (id) => {
    try {
      const res = await fetchWithAuth(`/api/announcements/${id}/read`, { method: "PATCH" });
      if (res.ok) {
        toast.info(`Marked announcement ${id} as read`);
        setAnnouncementsData((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
      } else {
        toast.error("Failed to mark as read");
      }
    } catch (e) {
      toast.error("Failed to mark as read");
    }
  };
  const markAllAsRead = () => toast.info('All announcements marked as read');

  const clearFilters = () => {
    setFilter('all');
    setSearch('');
  };

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
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>📢 Announcements</Pill>
                  <Pill tone="success">Unread: {unreadCount}</Pill>
                  <Pill tone="warn">Important: {importantCount}</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Announcements
                </h1>
                <p className="text-gray-600 mt-2">View company announcements and updates (Read-only access).</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={markAllAsRead}
                  className={btnSolid}
                  style={{ backgroundColor: "var(--secondary-blue)" }}
                >
                  Mark All as Read
                </button>
                <button
                  onClick={clearFilters}
                  className={btnOutline}
                  style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                >
                  Clear Filters
                </button>
                <Link href="/secretary-dashboard">
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
                  { id: "important", label: "Important" },
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
                <span className="absolute left-4 top-3.5 text-gray-400">🔎</span>
              </div>
            </div>
          </div>
        </Card>

        {/* URGENT BANNER */}
        {urgentCount > 0 && filter !== "urgent" && (
          <Card className="p-5 border-red-200 bg-red-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/70 flex items-center justify-center text-2xl">🚨</div>
                <div>
                  <p className="font-extrabold text-red-800">Urgent Announcements Require Your Attention</p>
                  <p className="text-sm text-red-700 mt-0.5">{urgentCount} urgent announcement(s) unread</p>
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
                            {!a.read && <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                            <Pill tone={priorityTone(a.priority)}>{a.priority}</Pill>
                            <Pill tone={scopeTone(a.scope)}>{a.scope}</Pill>
                            <Pill tone={departmentTone(a.department)}>{a.department}</Pill>
                            {expired ? <Pill tone="muted">Expired</Pill> : null}
                          </div>

                          <h3 className="text-lg font-extrabold text-gray-900 truncate">{a.title}</h3>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{a.message}</p>

                          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <span className="inline-flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-blue-50 flex items-center justify-center">👤</span>
                              {a.createdBy}
                            </span>
                            <span className="inline-flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-blue-50 flex items-center justify-center">🗓️</span>
                              {formatDate(a.createdDate)}
                            </span>
                            <span className="inline-flex items-center gap-2">
                              <span className="w-8 h-8 rounded-2xl bg-blue-50 flex items-center justify-center">⏳</span>
                              Expires: {a.expiresAt}
                            </span>
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
                          <Link href={`/secretary-dashboard/announcement/${a.id}`}>
                            <button className={btnSolid} style={{ backgroundColor: "var(--primary-blue)" }}>
                              View Details
                            </button>
                          </Link>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-gray-200/70 flex flex-wrap items-center justify-between gap-3 text-sm">
                        <div className="flex flex-wrap items-center gap-3 text-gray-600">
                          <span>📄 {a.documents} attachment{a.documents !== 1 ? "s" : ""}</span>
                          <span>💬 {a.comments} comment{a.comments !== 1 ? "s" : ""}</span>
                        </div>

                        <div className="text-xs text-gray-500 inline-flex items-center gap-2">
                          <span className="font-semibold" style={{ color: "var(--primary-blue)" }}>
                            {a.read ? "✅ Read" : "📌 New"}
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
                <div
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}
                >
                  <span className="text-2xl" style={{ color: "var(--secondary-blue)" }}>📢</span>
                </div>
                <h3 className="text-lg font-extrabold text-gray-900 mb-2">No announcements found</h3>
                <p className="text-gray-600">Try adjusting your filters or search term.</p>
              </Card>
            )}
          </>
        )}

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Total Announcements</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(44,75,155,0.1)" }}>
                <span style={{ color: "var(--primary-blue)" }} className="text-xl">📢</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Unread</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--secondary-blue)" }}>
                  {stats.unread}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(109,198,223,0.1)" }}>
                <span style={{ color: "var(--secondary-blue)" }} className="text-xl">📌</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Urgent/Important</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#EF4444" }}>
                  {stats.important}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(239,68,68,0.1)" }}>
                <span style={{ color: "#EF4444" }} className="text-xl">⚠️</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">This Week</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#10B981" }}>
                  {stats.thisWeek}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(16,185,129,0.1)" }}>
                <span style={{ color: "#10B981" }} className="text-xl">📅</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}