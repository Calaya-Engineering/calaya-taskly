"use client";

// pages/dashboards/Staff/StaffEvents.jsx
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
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

const eventsData = [
  {
    id: 'EVT-001',
    title: 'Monthly Safety Briefing',
    description: 'Monthly safety briefing for all staff',
    type: 'MEETING',
    department: 'All Company',
    location: 'Main Conference Room',
    meetingLink: '',
    startAt: '2024-12-15T09:00:00',
    endAt: '2024-12-15T10:30:00',
    createdBy: 'HSE Department',
    rsvpStatus: 'ACCEPTED',
    attendees: 45,
    documents: 3
  },
  {
    id: 'EVT-002',
    title: 'Technical Department Review',
    description: 'Quarterly technical department review meeting',
    type: 'MEETING',
    department: 'Technical',
    location: 'Technical Dept Conference Room',
    meetingLink: 'https://meet.example.com/tech-review',
    startAt: '2024-12-16T14:00:00',
    endAt: '2024-12-16T16:00:00',
    createdBy: 'HOD - Mr. Johnson',
    rsvpStatus: 'INVITED',
    attendees: 12,
    documents: 2
  },
  {
    id: 'EVT-003',
    title: 'Workshop Equipment Training',
    description: 'Training session for new workshop equipment',
    type: 'TRAINING',
    department: 'Workshop',
    location: 'Workshop Area 3',
    meetingLink: '',
    startAt: '2024-12-17T10:00:00',
    endAt: '2024-12-17T12:00:00',
    createdBy: 'Workshop Manager',
    rsvpStatus: 'ACCEPTED',
    attendees: 8,
    documents: 1
  },
  {
    id: 'EVT-004',
    title: 'Company Year-End Party',
    description: 'Annual year-end celebration party',
    type: 'EVENT',
    department: 'All Company',
    location: 'Grand Ballroom, Hilton Hotel',
    meetingLink: '',
    startAt: '2024-12-20T18:00:00',
    endAt: '2024-12-20T22:00:00',
    createdBy: 'HR Department',
    rsvpStatus: 'TENTATIVE',
    attendees: 120,
    documents: 0
  },
  {
    id: 'EVT-005',
    title: 'Project Status Meeting',
    description: 'Weekly project status update meeting',
    type: 'MEETING',
    department: 'Technical',
    location: 'Virtual Meeting',
    meetingLink: 'https://meet.example.com/project-status',
    startAt: '2024-12-18T11:00:00',
    endAt: '2024-12-18T12:00:00',
    createdBy: 'Project Manager',
    rsvpStatus: 'ACCEPTED',
    attendees: 6,
    documents: 1
  },
  {
    id: 'EVT-006',
    title: 'Safety Equipment Demo',
    description: 'Demonstration of new safety equipment',
    type: 'TRAINING',
    department: 'HSE',
    location: 'Training Room 2',
    meetingLink: '',
    startAt: '2024-12-19T13:00:00',
    endAt: '2024-12-19T15:00:00',
    createdBy: 'HSE Department',
    rsvpStatus: 'INVITED',
    attendees: 15,
    documents: 2
  },
];

const typeTone = (type) => {
  switch (type) {
    case 'MEETING': return 'info';
    case 'TRAINING': return 'success';
    case 'EVENT': return 'purple';
    default: return 'default';
  }
};

const rsvpTone = (status) => {
  switch (status) {
    case 'ACCEPTED': return 'success';
    case 'DECLINED': return 'danger';
    case 'TENTATIVE': return 'warn';
    default: return 'default';
  }
};

const fmtDateTime = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const fmtTime = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getDuration = (start, end) => {
  const diff = new Date(end) - new Date(start);
  const hours = diff / (1000 * 60 * 60);
  return Math.round(hours * 10) / 10;
};

export default function StaffEvents() {
  const router = useRouter();
  const [view, setView] = useState('upcoming');
  const [typeFilter, setTypeFilter] = useState('all');

  const now = new Date();

  const filteredEvents = useMemo(() => {
    return eventsData.filter(event => {
      const eventDate = new Date(event.startAt);

      if (view === 'upcoming' && eventDate < now) return false;
      if (view === 'past' && eventDate >= now) return false;

      if (typeFilter !== 'all' && event.type !== typeFilter) return false;

      return true;
    });
  }, [view, typeFilter]);

  const stats = useMemo(() => {
    const upcoming = eventsData.filter(e => new Date(e.startAt) >= now).length;
    const meetings = eventsData.filter(e => e.type === 'MEETING').length;
    const training = eventsData.filter(e => e.type === 'TRAINING').length;
    const accepted = eventsData.filter(e => e.rsvpStatus === 'ACCEPTED').length;
    return { upcoming, meetings, training, accepted };
  }, []);

  const handleRSVP = (eventId, status) => {
    toast.success(`RSVP status updated to ${status} for event ${eventId}`);
  };

  const joinMeeting = (event) => {
    if (event.meetingLink) {
      window.open(event.meetingLink, '_blank');
    } else {
      toast.info(`Meeting is at ${event.location}. No virtual link available.`);
    }
  };

  const clearFilters = () => {
    setView('upcoming');
    setTypeFilter('all');
  };

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
                  <Pill>📅 Meetings & Events</Pill>
                  <Pill tone="info">{stats.upcoming} Upcoming</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Meetings & Events
                </h1>
                <p className="text-gray-600 mt-2">View and manage your scheduled meetings, training sessions, and events.</p>
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
              <div className="flex gap-2">
                <button
                  onClick={() => setView('upcoming')}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${view === 'upcoming' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  style={{
                    borderColor: view === 'upcoming' ? "var(--primary-blue)" : "#e5e7eb",
                    color: view === 'upcoming' ? "var(--primary-blue)" : "#374151",
                  }}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setView('past')}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${view === 'past' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  style={{
                    borderColor: view === 'past' ? "var(--secondary-blue)" : "#e5e7eb",
                    color: view === 'past' ? "var(--secondary-blue)" : "#374151",
                  }}
                >
                  Past Events
                </button>
                <button
                  onClick={() => setView('all')}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${view === 'all' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  style={{
                    borderColor: view === 'all' ? "#F59E0B" : "#e5e7eb",
                    color: view === 'all' ? "#F59E0B" : "#374151",
                  }}
                >
                  All Events
                </button>
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All Types</option>
                <option value="MEETING">Meetings</option>
                <option value="TRAINING">Training</option>
                <option value="EVENT">Events</option>
              </select>
            </div>
          </div>
        </Card>

        {/* EVENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden transition">
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Pill tone={typeTone(event.type)}>{event.type}</Pill>
                  <Pill tone={rsvpTone(event.rsvpStatus)}>{event.rsvpStatus}</Pill>
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
                    <span>👥 {event.attendees} attending</span>
                    <span>📄 {event.documents} docs</span>
                  </div>
                  <span className="text-xs text-gray-500">{getDuration(event.startAt, event.endAt)}h</span>
                </div>

                <div className="flex gap-2">
                  {event.meetingLink && (
                    <button
                      onClick={() => joinMeeting(event)}
                      className="flex-1 px-4 py-2.5 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      Join Meeting
                    </button>
                  )}
                  <Link href={`/staff-dashboard/event/${event.id}`} className="flex-1">
                    <button
                      className="w-full px-4 py-2.5 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                    >
                      Details
                    </button>
                  </Link>
                </div>

                {/* RSVP Actions */}
                <div className="mt-4 pt-4 border-t border-gray-200/70">
                  <p className="text-xs font-semibold text-gray-500 mb-2">Update RSVP:</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRSVP(event.id, 'ACCEPTED')}
                      className={`flex-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition ${event.rsvpStatus === 'ACCEPTED'
                          ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
                          : 'border bg-white hover:bg-gray-50'
                        }`}
                      style={event.rsvpStatus !== 'ACCEPTED' ? { borderColor: "rgba(16,185,129,0.35)", color: "#10B981" } : {}}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRSVP(event.id, 'TENTATIVE')}
                      className={`flex-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition ${event.rsvpStatus === 'TENTATIVE'
                          ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
                          : 'border bg-white hover:bg-gray-50'
                        }`}
                      style={event.rsvpStatus !== 'TENTATIVE' ? { borderColor: "rgba(245,158,11,0.35)", color: "#F59E0B" } : {}}
                    >
                      Tentative
                    </button>
                    <button
                      onClick={() => handleRSVP(event.id, 'DECLINED')}
                      className={`flex-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition ${event.rsvpStatus === 'DECLINED'
                          ? 'bg-red-100 text-red-700 ring-1 ring-red-200'
                          : 'border bg-white hover:bg-gray-50'
                        }`}
                      style={event.rsvpStatus !== 'DECLINED' ? { borderColor: "rgba(239,68,68,0.35)", color: "#EF4444" } : {}}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3" style={{ backgroundColor: "rgba(109, 198, 223, 0.08)" }}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold" style={{ color: "var(--primary-blue)" }}>
                    Ends: {fmtTime(event.endAt)}
                  </span>
                  <span className="text-gray-500">Duration: {getDuration(event.startAt, event.endAt)}h</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card className="p-12 text-center">
            <div
              className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}
            >
              <span className="text-2xl" style={{ color: "var(--secondary-blue)" }}>📅</span>
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your filters.</p>
          </Card>
        )}

        {/* Calendar Preview */}
        <Card className="p-6">
          <SectionTitle title="Upcoming This Week" subtitle="Events in the next 7 days" />

          <div className="mt-5 space-y-3">
            {eventsData
              .filter(event => {
                const eventDate = new Date(event.startAt);
                const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                return eventDate >= now && eventDate <= weekFromNow;
              })
              .map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => router.push(`/staff-dashboard/event/${event.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${event.type === 'MEETING' ? 'bg-blue-500' :
                          event.type === 'TRAINING' ? 'bg-green-500' : 'bg-purple-500'
                        }`}
                    />
                    <div>
                      <p className="font-extrabold text-sm text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {fmtDateTime(event.startAt)} • {event.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pill tone={rsvpTone(event.rsvpStatus)}>{event.rsvpStatus}</Pill>
                    <span className="text-gray-400">→</span>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Upcoming Events</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {stats.upcoming}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(44,75,155,0.1)" }}>
                <span style={{ color: "var(--primary-blue)" }} className="text-xl">📅</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Meetings</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#3B82F6" }}>
                  {stats.meetings}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(59,130,246,0.1)" }}>
                <span style={{ color: "#3B82F6" }} className="text-xl">🤝</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Training</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#10B981" }}>
                  {stats.training}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(16,185,129,0.1)" }}>
                <span style={{ color: "#10B981" }} className="text-xl">🎓</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Accepted</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#22C55E" }}>
                  {stats.accepted}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(34,197,94,0.1)" }}>
                <span style={{ color: "#22C55E" }} className="text-xl">✅</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}