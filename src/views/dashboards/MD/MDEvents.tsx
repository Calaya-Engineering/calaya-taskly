import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
import { fetchWithAuth, getAuthToken } from "@/lib/api";
import { toast } from "@/lib/toast";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

/* ---------- MD dashboard UI helpers (same styling) ---------- */
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
          : "bg-blue-50 text-blue-700 ring-blue-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
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

const typeTone = (t) => (t === "MEETING" ? "default" : t === "TRAINING" ? "success" : t === "EVENT" ? "warn" : t === "ANNOUNCEMENT" ? "warn" : "default");
const rsvpTone = (s) => (s === "ACCEPTED" ? "success" : s === "TENTATIVE" ? "warn" : "default");

const typeEmoji = (t) => (t === "MEETING" ? "👥" : t === "TRAINING" ? "🎓" : t === "EVENT" ? "🎉" : t === "ANNOUNCEMENT" ? "📣" : "📅");

export default function MDEvents() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState("upcoming"); // upcoming | past
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDate, setSelectedDate] = useState(""); // yyyy-mm-dd or ""
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const fetchEvents = useCallback(async () => {
    try {
      const annResp = await fetchWithAuth("/api/announcements?limit=100");

      if (annResp.ok) {
        const announcements = await annResp.json();
        const mapped = (Array.isArray(announcements) ? announcements : []).map(a => ({
          id: `ann-${a.id}`,
          dbId: a.id,
          kind: "announcement",
          title: a.title,
          type: "ANNOUNCEMENT",
          description: a.description || a.message || "",
          location: "Company-Wide",
          startAt: a.date || a.createdAt,
          endAt: a.date || a.createdAt,
          createdBy: a.createdBy || "System",
          scope: a.scopeType || "ALL_COMPANY",
          attendees: a.readsCount || 0,
          rsvpStatus: "INVITED",
          priority: a.priority || "NORMAL",
          meetingLink: null,
        }));
        setEvents(mapped);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();

    const token = getAuthToken();
    if (!token) return;

    // SSE for announcement changes — re-fetch whenever a new announcement is created/updated
    const annSource = new EventSource(`/api/announcements/events?token=${token}`);
    annSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === "announcement:created" || data.type === "announcement:updated") fetchEvents();
      } catch { /* ignore */ }
    };

    return () => annSource.close();
  }, [fetchEvents]);

  const now = useMemo(() => new Date(), []);
  const nowISO = useMemo(() => toISODate(now), [now]);

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const eventDate = safeDate(event.startAt);
        if (!eventDate) return false;

        // Compare by date-string so events scheduled for today always appear as "upcoming"
        const eventISO = toISODate(eventDate);
        const matchesView = viewMode === "upcoming" ? eventISO >= nowISO : eventISO < nowISO;
        const matchesType = selectedType === "all" || event.type === selectedType;

        return matchesView && matchesType;
      })
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  }, [viewMode, selectedType, nowISO, events]);

  const listEvents = useMemo(() => {
    if (!selectedDate) return filteredEvents;
    return filteredEvents.filter((e) => {
      const d = safeDate(e.startAt);
      return d ? toISODate(d) === selectedDate : false;
    });
  }, [filteredEvents, selectedDate]);

  const overview = useMemo(() => {
    const total = events.length;
    const upcoming = events.filter((e) => { const d = safeDate(e.startAt); return d ? toISODate(d) >= nowISO : false; }).length;
    const meetings = events.filter((e) => e.type === "MEETING").length;
    const attendees = events.reduce((sum, e) => sum + (e.attendees || 0), 0);
    return { total, upcoming, meetings, attendees };
  }, [now, events]);

  const todayISO = useMemo(() => toISODate(now), [now]);
  const todaysEvents = useMemo(
    () =>
      events.filter((e) => {
        const d = safeDate(e.startAt);
        return d ? toISODate(d) === todayISO : false;
      }),
    [todayISO, events]
  );

  const handleEditClick = (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/md-dashboard/edit-event/${eventId}`);
  };

  const handleJoinClick = (e, event) => {
    e.preventDefault();
    e.stopPropagation();
    if (!event.meetingLink) return toast.info("No meeting link for this event.");
    window.open(event.meetingLink, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="space-y-6">
        {/* Hero / Header (MD dashboard style) */}
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
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>Schedule Center</Pill>
                  <Pill tone="success">{overview.upcoming} Upcoming</Pill>
                  <Pill>{overview.meetings} Meetings</Pill>
                  <Pill tone="default">{overview.attendees} Attendees</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Meetings & Events
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Schedule and manage meetings, trainings, and events across the company.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Demo timeline anchored to: <span className="font-semibold">{now.toLocaleDateString('en-US', { timeZone: 'UTC' })}</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/md-dashboard/create-event">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)", color: "white" }}
                  >
                    + Schedule Event
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Filters row (MD dashboard style) */}
          <div className="p-4 md:p-5 bg-white border-t border-gray-200/70">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
              {/* View chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "upcoming", label: "Upcoming" },
                  { key: "past", label: "Past Events" },
                ].map((v) => {
                  const active = viewMode === v.key;
                  return (
                    <button
                      key={v.key}
                      className={`px-3.5 py-2 rounded-2xl text-sm font-semibold transition ring-1 ${active ? "text-white" : "text-gray-700 bg-gray-50 hover:bg-gray-100"
                        }`}
                      style={{
                        backgroundColor: active ? "var(--primary-blue)" : undefined,
                        borderColor: active ? "transparent" : "rgba(0,0,0,0.06)",
                      }}
                      onClick={() => setViewMode(v.key)}
                    >
                      {v.label}
                    </button>
                  );
                })}

              </div>

              {/* Date filter indicator */}
              <div className="flex items-center gap-2">
                {selectedDate ? (
                  <>
                    <span className="text-sm text-gray-600">
                      Filtered date:{" "}
                      <span className="font-semibold text-gray-900">{new Date(selectedDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</span>
                    </span>
                    <button
                      className="px-3 py-2 rounded-2xl border text-sm font-semibold hover:bg-gray-50"
                      style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                      onClick={() => setSelectedDate("")}
                    >
                      Clear
                    </button>
                  </>
                ) : (
                  <span className="text-sm text-gray-500">Tip: click a day on the calendar</span>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Small stats row (same MD dashboard “stat cards” feel) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: "Total Events", value: overview.total, color: "var(--primary-blue)" },
            { label: "Upcoming", value: overview.upcoming, color: "var(--secondary-blue)" },
            { label: "Meetings", value: overview.meetings, color: "#8B5CF6" },
            { label: "Total Attendees", value: overview.attendees, color: "#10B981" },
          ].map((s) => (
            <Card key={s.label} className="p-5">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-3xl font-extrabold mt-2" style={{ color: s.color }}>
                {s.value}
              </p>
              <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "70%",
                    backgroundColor: "var(--primary-blue)",
                  }}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Calendar + Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Events TABLE (MD dashboard table styling) */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="p-5 md:p-6 border-b border-gray-200/70">
                <SectionTitle
                  title={viewMode === "upcoming" ? "Upcoming Events" : "Past Events"}
                  subtitle={selectedDate ? "Showing selected day" : "Showing all days"}
                  action={
                    <div className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-800">{listEvents.length}</span> event(s)
                    </div>
                  }
                />
              </div>

              {listEvents.length === 0 ? (
                <div className="p-10 text-center text-gray-500">
                  <div className="text-3xl mb-3">📅</div>
                  <div className="font-semibold text-gray-700">{loading ? "Loading events…" : "No upcoming events."}</div>
                  <div className="text-xs mt-2 text-gray-400">{viewMode === "upcoming" ? "No events or announcements scheduled from today onwards." : "No past events found."}</div>
                </div>
              ) : (
                <div className="hidden lg:block overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-200/70">
                      <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="px-5 py-3 text-left">Event</th>
                        <th className="px-5 py-3 text-left">Type</th>
                        <th className="px-5 py-3 text-left">Date</th>
                        <th className="px-5 py-3 text-left">Time</th>
                        <th className="px-5 py-3 text-left">Location</th>
                        <th className="px-5 py-3 text-left">Organizer</th>
                        <th className="px-5 py-3 text-left">Attendees</th>
                        <th className="px-5 py-3 text-left">RSVP</th>
                        <th className="px-5 py-3 text-right">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200/70 text-[12.5px]">
                      {listEvents.map((event) => (
                        <tr
                          key={event.id}
                          className="hover:bg-gray-50/70 transition cursor-pointer"
                          onClick={() => event.kind === "announcement" ? router.push(`/md-dashboard/announcement/${event.dbId}`) : router.push(`/md-dashboard/event/${event.dbId}`)}
                        >
                          <td className="px-5 py-3">
                            <div className="flex items-start gap-3">
                              <div
                                className="w-10 h-10 rounded-2xl flex items-center justify-center  shrink-0"
                                style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                                aria-hidden="true"
                              >
                                <span className="text-lg">{typeEmoji(event.type)}</span>
                              </div>

                              <div className="min-w-0">
                                <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                                  {event.id}
                                </div>
                                <div className="text-[12.5px] font-semibold text-gray-900 mt-0.5">
                                  {event.title}
                                </div>
                                <div className="text-[11px] text-gray-500 line-clamp-1">{event.description}</div>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-3 whitespace-nowrap">
                            <Pill tone={typeTone(event.type)}>{event.type}</Pill>
                          </td>

                          <td className="px-5 py-3 whitespace-nowrap">
                            <div className="text-[12.5px] font-semibold text-gray-900">{fmtDate(event.startAt)}</div>
                            <div className="text-[11px] text-gray-500">{event.scope?.replaceAll("_", " ")}</div>
                          </td>

                          <td className="px-5 py-3 whitespace-nowrap">
                            <div className="text-[12.5px] font-semibold text-gray-900">
                              {fmtTime(event.startAt)} — {fmtTime(event.endAt)}
                            </div>
                            <div className="text-[11px] text-gray-500">Time</div>
                          </td>

                          <td className="px-5 py-3">
                            <div className="text-[12.5px] font-semibold text-gray-900 truncate max-w-[220px]">
                              {event.location}
                            </div>
                            <div className="text-[11px] text-gray-500">
                              {event.meetingLink ? "Virtual link available" : "On-site"}
                            </div>
                          </td>

                          <td className="px-5 py-3">
                            <div className="text-[12.5px] font-semibold text-gray-900">{event.createdBy}</div>
                            <div className="text-[11px] text-gray-500">Organizer</div>
                          </td>

                          <td className="px-5 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Pill>{event.attendees}</Pill>
                              <span className="text-[11px] text-gray-500">people</span>
                            </div>
                          </td>

                          <td className="px-5 py-3 whitespace-nowrap">
                            <Pill tone={rsvpTone(event.rsvpStatus)}>{event.rsvpStatus}</Pill>
                          </td>

                          <td className="px-5 py-3 text-right whitespace-nowrap">
                            {event.meetingLink ? (
                              <button
                                onClick={(e) => handleJoinClick(e, event)}
                                className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white active:scale-[0.99] transition"
                                style={{ backgroundColor: "var(--secondary-blue)" }}
                              >
                                Join
                              </button>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  event.kind === "announcement"
                                    ? router.push(`/md-dashboard/announcement/${event.dbId}`)
                                    : router.push(`/md-dashboard/event/${event.dbId}`);
                                }}
                                className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white active:scale-[0.99] transition"
                                style={{ backgroundColor: "var(--secondary-blue)" }}
                              >
                                View
                              </button>
                            )}

                            <button
                              onClick={(e) => handleEditClick(e, event.id)}
                              className="ml-2 px-3 py-1.5 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                              style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Mobile fallback */}
              {listEvents.length > 0 ? (
                <div className="lg:hidden p-4 text-sm text-gray-600">
                  Events table is optimized for desktop. (If you want, I can create a compact mobile horizontal-scroll table.)
                </div>
              ) : null}
            </Card>
          </div>

          {/* Calendar Widget (same MD card style) */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <SectionTitle
                title={`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}
                subtitle="Click a day to filter events"
                action={
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        if (currentMonth === 0) {
                          setCurrentMonth(11);
                          setCurrentYear(v => v - 1);
                        } else {
                          setCurrentMonth(v => v - 1);
                        }
                      }}
                      className="p-1 hover:bg-gray-100 rounded-lg transition"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => {
                        if (currentMonth === 11) {
                          setCurrentMonth(0);
                          setCurrentYear(v => v + 1);
                        } else {
                          setCurrentMonth(v => v + 1);
                        }
                      }}
                      className="p-1 hover:bg-gray-100 rounded-lg transition"
                    >
                      →
                    </button>
                  </div>
                }
              />

              <div className="mt-5 grid grid-cols-7 gap-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-center font-semibold text-gray-500 text-xs">
                    {day}
                  </div>
                ))}

                {/* Empty slots for start of month */}
                {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {Array.from({ length: new Date(currentYear, currentMonth + 1, 0).getDate() }, (_, i) => i + 1).map((day) => {
                  const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                  const dayEvents = events.filter((event) => {
                    const d = safeDate(event.startAt);
                    return d ? toISODate(d) === dateStr : false;
                  });
                  const active = selectedDate === dateStr;

                  return (
                    <button
                      type="button"
                      key={day}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`h-10 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition relative ring-1 ${active ? "ring-blue-300" : "ring-black/5"
                        } ${dayEvents.length ? "bg-blue-50" : "bg-gray-50 hover:bg-gray-100"}`}
                      title={dayEvents.length ? `${dayEvents.length} event(s)` : "No events"}
                    >
                      <span className={`font-extrabold text-sm ${dayEvents.length ? "text-blue-700" : "text-gray-700"}`}>
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6">
                <h3 className="font-extrabold text-sm" style={{ color: "var(--primary-blue)" }}>
                  Events on {now.toLocaleDateString('en-US', { timeZone: 'UTC' })}
                </h3>

                <div className="mt-3 space-y-2">
                  {todaysEvents.length === 0 ? (
                    <div className="text-sm text-gray-500">No events on this date.</div>
                  ) : (
                    todaysEvents.map((event) => (
                      <div key={event.id} className="flex items-center p-3 rounded-2xl border border-gray-200/70 bg-gray-50">
                        <div
                          className="w-9 h-9 rounded-2xl flex items-center justify-center  mr-3"
                          style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                        >
                          <span>{typeEmoji(event.type)}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm truncate">{event.title}</p>
                          <p className="text-xs text-gray-500">{fmtTime(event.startAt)}</p>
                        </div>

                        {event.meetingLink ? (
                          <button
                            onClick={(e) => handleJoinClick(e, event)}
                            className="text-xs px-3 py-1.5 rounded-xl font-semibold text-white"
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            Join
                          </button>
                        ) : (
                          <button
                            onClick={() => event.kind === "announcement" ? router.push(`/md-dashboard/announcement/${event.dbId}`) : router.push(`/md-dashboard/event/${event.dbId}`)}
                            className="text-xs px-3 py-1.5 rounded-xl font-semibold text-white"
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            View
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-blue-50 ">
                    <p className="text-2xl font-extrabold text-center" style={{ color: "var(--primary-blue)" }}>
                      {overview.upcoming}
                    </p>
                    <p className="text-sm text-gray-600 text-center mt-1">Upcoming</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50 ">
                    <p className="text-2xl font-extrabold text-center" style={{ color: "#10B981" }}>
                      {overview.meetings}
                    </p>
                    <p className="text-sm text-gray-600 text-center mt-1">Meetings</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Event Statistics (MD dashboard style) */}
        <Card className="p-6">
          <SectionTitle title="Event Statistics" subtitle="Quick insights and averages" />
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Events", value: events.length, color: "var(--primary-blue)", icon: "📅" },
              { label: "This Month", value: events.filter((e) => safeDate(e.startAt)?.getMonth() === new Date().getMonth()).length, color: "var(--secondary-blue)", icon: "📆" },
              { label: "Total Attendees", value: events.reduce((sum, e) => sum + e.attendees, 0), color: "#8B5CF6", icon: "👥" },
              {
                label: "Avg Duration",
                value: (() => {
                  const mins = events.reduce((sum, e) => {
                    const s = safeDate(e.startAt)?.getTime() || 0;
                    const en = safeDate(e.endAt)?.getTime() || 0;
                    return en > s ? sum + Math.round((en - s) / 60000) : sum;
                  }, 0);
                  const avg = events.length ? Math.round(mins / events.length) : 0;
                  return avg >= 60 ? `${(avg / 60).toFixed(1)} hours` : `${avg} mins`;
                })(),
                color: "#10B981",
                icon: "⏱️",
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-3xl font-extrabold" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
