"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";
import { useSSE } from "@/hooks/useSSE";
import DashboardSkeleton from "@/components/DashboardSkeleton";

/* ---------- UI helpers ---------- */
const Card = ({ className = "", children, onClick }: { className?: string; children: React.ReactNode; onClick?: () => void }) => (
  <div onClick={onClick} className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const SectionTitle = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) => (
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
          : tone === "info"
            ? "bg-blue-50 text-blue-700 ring-blue-100"
            : tone === "purple"
              ? "bg-purple-50 text-purple-700 ring-purple-100"
              : tone === "orange"
                ? "bg-orange-50 text-orange-700 ring-orange-100"
                : "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

/* ---------- helpers ---------- */
const safeDate = (v) => {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
};

const toISODate = (d) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const fmtDate = (iso) => {
  const d = safeDate(iso);
  return d ? d.toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" }) : "--";
};

const fmtTime = (iso) => {
  const d = safeDate(iso);
  return d ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--";
};

const fmtDateTime = (iso) => {
  const d = safeDate(iso);
  return d
    ? d.toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : "--";
};

const getDuration = (start: string | Date, end: string | Date) => {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  const hours = diff / (1000 * 60 * 60);
  return Math.round(hours * 10) / 10 || 0;
};

const typeTone = (t) =>
  t === "MEETING" ? "info" : t === "TRAINING" ? "success" : t === "EVENT" ? "purple" : t === "ANNOUNCEMENT" ? "orange" : "default";

const typeEmoji = (t) =>
  t === "MEETING" ? "👥" : t === "TRAINING" ? "🎓" : t === "EVENT" ? "🎉" : t === "ANNOUNCEMENT" ? "📣" : "📅";

const priorityTone = (p) =>
  p === "URGENT" || p === "HIGH" ? "danger" : p === "NORMAL" ? "info" : "default";

interface EventItem {
  id: string;
  dbId: number;
  kind: string;
  title: string;
  description: string;
  type: string;
  location: string;
  meetingLink: string;
  startAt: string;
  endAt: string;
  createdBy: string;
  department: string;
  attendees: number;
  rsvpStatus: string;
  priority: string;
  createdByRole?: string;
  expiresAt?: string;
}


export default function StaffEvents() {
  const router = useRouter();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("upcoming"); // upcoming | today | past | all
  const [typeFilter, setTypeFilter] = useState("all"); // all | MEETING | TRAINING | EVENT | ANNOUNCEMENT

  const now = useMemo(() => new Date(), []);
  const todayISO = useMemo(() => toISODate(now), [now]);

  /* ---------- Data fetching ---------- */
  const fetchAllData = useCallback(async () => {
    try {
      const announcementsResp = await fetchWithAuth("/api/announcements?limit=100");

      if (announcementsResp.ok) {
        const announcements = await announcementsResp.json();
        const mapped = (Array.isArray(announcements) ? announcements : []).map((a) => ({
          id: `ann-${a.id}`,
          dbId: a.id,
          kind: "announcement",
          title: a.title,
          description: a.description || a.message || "",
          type: "ANNOUNCEMENT",
          location: "Company-Wide",
          meetingLink: "",
          startAt: a.date || a.createdAt,
          endAt: a.date || a.createdAt,
          createdBy: a.createdBy || "System",
          department: a.department || "All Company",
          attendees: a.readsCount || 0,
          rsvpStatus: "INVITED",
          priority: a.priority || "NORMAL",
          createdByRole: a.createdByRole || (a.createdBy === "MD" ? "MD" : "STAFF"),
          expiresAt: a.expiresAt,
        }));
        setEvents(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
      toast.error("Failed to load announcements.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useSSE("/api/realtime/events", (ev) => {
    if (!ev?.type || ev.type === "ping") return;
    if (ev.type.startsWith("announcement:")) {
      fetchAllData();
    }
  });

  if (loading && events.length === 0) {
    return (
      <Layout menuItems={StaffMenuItems} userRole="Staff">
        <DashboardSkeleton />
      </Layout>
    );
  }

  /* ---------- Derived data ---------- */
  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const eventDate = safeDate(event.startAt);
        if (!eventDate) return false;

        const eventISO = toISODate(eventDate);
        const isToday = eventISO === todayISO;
        // ISO string comparison — today counts as upcoming
        const isUpcoming = eventISO >= todayISO;
        const isPast = eventISO < todayISO;

        const matchesView =
          view === "all" ? true :
            view === "today" ? isToday :
              view === "upcoming" ? isUpcoming :
                view === "past" ? isPast : true;

        const matchesType = typeFilter === "all" || event.type === typeFilter;

        return matchesView && matchesType;
      })
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  }, [events, view, typeFilter, todayISO]);

  const todaysEvents = useMemo(() =>
    events.filter((e) => {
      const d = safeDate(e.startAt);
      return d ? toISODate(d) === todayISO : false;
    }),
    [events, todayISO]
  );

  const upcomingEvents = useMemo(() =>
    events.filter((e) => {
      const d = safeDate(e.startAt);
      return d ? toISODate(d) >= todayISO : false;
    }),
    [events, todayISO]
  );

  const weekEvents = useMemo(() => {
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return events
      .filter((e) => {
        const d = safeDate(e.startAt);
        return d ? toISODate(d) >= todayISO && d <= weekFromNow : false;
      })
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  }, [events, now, todayISO]);

  const isExpired = (e) => e.expiresAt && new Date(e.expiresAt) < now;
  const activeEvents = events.filter(e => !isExpired(e));

  const stats = useMemo(() => ({
    upcoming: activeEvents.filter((e) => {
      const d = safeDate(e.startAt);
      return d ? toISODate(d) >= todayISO : false;
    }).length,
    today: activeEvents.filter((e) => {
      const d = safeDate(e.startAt);
      return d ? toISODate(d) === todayISO : false;
    }).length,
    total: activeEvents.length,
    meetings: activeEvents.filter((e) => e.type === "MEETING").length,
    announcements: activeEvents.filter((e) => e.type === "ANNOUNCEMENT").length,
  }), [activeEvents, todayISO]);

  const handleJoin = (event) => {
    if (event.meetingLink) {
      window.open(event.meetingLink, "_blank", "noopener,noreferrer");
    } else {
      toast.info(`No virtual link available for this announcement.`);
    }
  };

  const clearFilters = () => {
    setView("upcoming");
    setTypeFilter("all");
  };

  /* ---------- Render ---------- */
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
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>📣 Announcements</Pill>
                  <Pill tone="info">{stats.upcoming} Upcoming</Pill>
                  {stats.today > 0 && <Pill tone="warn">🔴 {stats.today} Today</Pill>}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Announcements Calendar
                </h1>
                <p className="text-gray-600 mt-2">
                  View company announcements in real time, organised by scheduled date.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={clearFilters}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                >
                  Clear Filters
                </button>
                <Link href="/staff-dashboard">
                  <button
                    className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                  >
                    Back to Dashboard
                  </button>
                </Link>
              </div>
            </div>

            {/* FILTER BAR */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "upcoming", label: "Upcoming" },
                  { key: "today", label: "Today" },
                  { key: "past", label: "Past" },
                  { key: "all", label: "All" },
                ].map((v) => (
                  <button
                    key={v.key}
                    onClick={() => setView(v.key)}
                    className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${view === v.key ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}`}
                    style={{
                      borderColor: view === v.key ? "var(--primary-blue)" : "#e5e7eb",
                      color: view === v.key ? "var(--primary-blue)" : "#374151",
                    }}
                  >
                    {v.key === "today" && stats.today > 0 ? `${v.label} (${stats.today})` : v.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* LOADING STATE */}
        {loading && (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              <p className="text-gray-500 font-medium">Loading events &amp; announcements…</p>
            </div>
          </Card>
        )}

        {/* EVENTS GRID */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const isAnn = event.kind === "announcement";
              const isToday = toISODate(safeDate(event.startAt) || now) === todayISO;
              return (
                <Card
                  key={event.id}
                  className="overflow-hidden transition cursor-pointer hover:shadow-md"
                  onClick={() =>
                    isAnn
                      ? router.push(`/staff-dashboard/announcement/${event.dbId}`)
                      : router.push(`/staff-dashboard/event/${event.dbId}`)
                  }
                >
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Pill tone={typeTone(event.type)}>
                        {typeEmoji(event.type)} {event.type}
                      </Pill>
                      {isAnn && (
                        <Pill tone={priorityTone(event.priority)}>{event.priority}</Pill>
                      )}
                      {isToday && (
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Today</span>
                      )}
                    </div>

                    <h3 className="text-lg font-extrabold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center text-gray-700">
                        <span className="w-5 h-5 mr-2 text-gray-400">📅</span>
                        <span>{fmtDateTime(event.startAt)}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="w-5 h-5 mr-2 text-gray-400">📍</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="w-5 h-5 mr-2 text-gray-400">👤</span>
                        <span>{event.department} • {event.createdBy}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200/70 mb-4">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>👥 {event.attendees} {isAnn ? "reads" : "attending"}</span>
                        {!isAnn && event.endAt !== event.startAt && (
                          <span>⏱ {getDuration(event.startAt, event.endAt)}h</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {event.meetingLink && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleJoin(event); }}
                          className="flex-1 px-4 py-2.5 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                          style={{ backgroundColor: "var(--secondary-blue)" }}
                        >
                          Join Meeting
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          isAnn
                            ? router.push(`/staff-dashboard/announcement/${event.dbId}`)
                            : router.push(`/staff-dashboard/event/${event.dbId}`);
                        }}
                        className="flex-1 px-4 py-2.5 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                        style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                      >
                        Details
                      </button>
                    </div>
                  </div>

                  <div className="px-6 py-3" style={{ backgroundColor: isAnn ? "rgba(251, 146, 60, 0.08)" : "rgba(109, 198, 223, 0.08)" }}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold" style={{ color: isAnn ? "#EA580C" : "var(--primary-blue)" }}>
                        {isAnn ? "📣 Announcement" : `Ends: ${fmtTime(event.endAt)}`}
                      </span>
                      <span className="text-gray-500">{fmtDate(event.startAt)}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredEvents.length === 0 && (
          <Card className="p-12 text-center">
            <div
              className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}
            >
              <span className="text-2xl" style={{ color: "var(--secondary-blue)" }}>📅</span>
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">No upcoming events</h3>
            <p className="text-gray-600">No events or announcements match these filters.</p>
          </Card>
        )}

        {/* TODAY / THIS WEEK PREVIEW */}
        {!loading && (
          <Card className="p-6">
            <SectionTitle
              title={todaysEvents.length > 0 ? "Today's Events & Announcements" : "Upcoming This Week"}
              subtitle={
                todaysEvents.length > 0
                  ? `${todaysEvents.length} item(s) scheduled for today`
                  : "Events & announcements in the next 7 days"
              }
              action={null}
            />

            <div className="mt-5 space-y-3">
              {(todaysEvents.length > 0 ? todaysEvents : weekEvents).map((event) => {
                const isAnn = event.kind === "announcement";
                return (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer"
                    onClick={() =>
                      isAnn
                        ? router.push(`/staff-dashboard/announcement/${event.dbId}`)
                        : router.push(`/staff-dashboard/event/${event.dbId}`)
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${event.type === "MEETING"
                          ? "bg-blue-500"
                          : event.type === "TRAINING"
                            ? "bg-green-500"
                            : event.type === "ANNOUNCEMENT"
                              ? "bg-orange-500"
                              : "bg-purple-500"
                          }`}
                      />
                      <div>
                        <p className="font-extrabold text-sm text-gray-900">
                          {typeEmoji(event.type)} {event.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {fmtDateTime(event.startAt)} • {event.department}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Pill tone={typeTone(event.type)}>{event.type}</Pill>
                      <span className="text-gray-400">→</span>
                    </div>
                  </div>
                );
              })}

              {(todaysEvents.length === 0 && weekEvents.length === 0) && (
                <p className="text-sm text-gray-500">No upcoming events this week.</p>
              )}
            </div>
          </Card>
        )}

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Upcoming Events", value: stats.upcoming, color: "var(--primary-blue)", bg: "rgba(44,75,155,0.1)", icon: "📅" },
            { label: "Today", value: stats.today, color: "#F59E0B", bg: "rgba(245,158,11,0.1)", icon: "🔴" },
            { label: "Meetings", value: stats.meetings, color: "#3B82F6", bg: "rgba(59,130,246,0.1)", icon: "🤝" },
            { label: "Announcements", value: stats.announcements, color: "#EA580C", bg: "rgba(234,88,12,0.1)", icon: "📣" },
          ].map((s) => (
            <Card key={s.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-semibold">{s.label}</p>
                  <p className="text-3xl font-extrabold mt-2" style={{ color: s.color }}>
                    {s.value}
                  </p>
                </div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: s.bg }}
                >
                  <span className="text-xl">{s.icon}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}