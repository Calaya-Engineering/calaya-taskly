// pages/dashboards/HOD/HODEvents.jsx
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout, { 
  DashboardIcon, 
  TaskIcon, 
  DocumentIcon, 
  ReportIcon, 
  CalendarIcon, 
  AnnouncementIcon, 
  ApprovalIcon, 
  AlertIcon, 
  BellIcon, 
  UserIcon,
  TenderIcon 
} from '../../../components/Layout';

const HODMenuItems = [
  { label: 'Dashboard', path: '/hod-dashboard', icon: <DashboardIcon /> },
  { label: 'Department Tasks', path: '/hod-dashboard/tasks', icon: <TaskIcon />, badge: '18' },
  { label: 'My Tasks', path: '/hod-dashboard/my-tasks', icon: <TaskIcon />, badge: '5' },
  { label: 'Documents', path: '/hod-dashboard/documents', icon: <DocumentIcon />, badge: '3' },
  { label: 'Daily Reports', path: '/hod-dashboard/reports', icon: <ReportIcon /> },
  { label: 'Meetings/Events', path: '/hod-dashboard/events', icon: <CalendarIcon />, badge: '2' },
  { label: 'Tenders', path: '/hod-dashboard/tenders', icon: <TenderIcon />, badge: '3' },
  { label: 'Tender Documents', path: '/hod-dashboard/tender-documents', icon: <TenderIcon /> },
  { label: 'Announcements', path: '/hod-dashboard/announcements', icon: <AnnouncementIcon /> },
  { label: 'Approvals', path: '/hod-dashboard/approvals', icon: <ApprovalIcon />, badge: '4' },
  { label: 'Escalations/Overdue', path: '/hod-dashboard/escalations', icon: <AlertIcon />, badge: '2' },
  { label: 'Notifications', path: '/hod-dashboard/notifications', icon: <BellIcon />, badge: '8' },
  { label: 'Profile', path: '/hod-dashboard/profile', icon: <UserIcon /> },
];

/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-sm ${className}`}>{children}</div>
);

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

const eventsData = [
  {
    id: 'EVT-001',
    title: 'Technical Department Quarterly Review',
    type: 'MEETING',
    description: 'Quarterly performance review and planning for next quarter',
    location: 'Conference Room A',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    startAt: '2024-12-20T10:00:00',
    endAt: '2024-12-20T12:00:00',
    createdBy: 'HOD - Technical',
    scope: 'DEPARTMENTS',
    department: 'Technical',
    attendees: 12,
    rsvpStatus: 'ACCEPTED',
    color: 'blue'
  },
  {
    id: 'EVT-002',
    title: 'Safety Training Workshop',
    type: 'TRAINING',
    description: 'Mandatory safety training for all field staff',
    location: 'Training Hall B',
    meetingLink: '',
    startAt: '2024-12-22T09:00:00',
    endAt: '2024-12-22T17:00:00',
    createdBy: 'HSE Manager',
    scope: 'DEPARTMENTS',
    department: 'HSE',
    attendees: 25,
    rsvpStatus: 'ACCEPTED',
    color: 'green'
  },
  {
    id: 'EVT-003',
    title: 'Project Kick-off: Pipeline Maintenance',
    type: 'MEETING',
    description: 'Kick-off meeting for Q1 pipeline maintenance project',
    location: 'Project Room 3',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join',
    startAt: '2024-12-18T14:00:00',
    endAt: '2024-12-18T16:00:00',
    createdBy: 'Project Manager',
    scope: 'DEPARTMENTS',
    department: 'Technical',
    attendees: 8,
    rsvpStatus: 'TENTATIVE',
    color: 'purple'
  },
  {
    id: 'EVT-004',
    title: 'Company Annual Dinner',
    type: 'EVENT',
    description: 'Annual company dinner and awards ceremony',
    location: 'Grand Ballroom',
    meetingLink: '',
    startAt: '2024-12-25T19:00:00',
    endAt: '2024-12-25T22:00:00',
    createdBy: 'HR Department',
    scope: 'ALL_COMPANY',
    department: 'All',
    attendees: 150,
    rsvpStatus: 'ACCEPTED',
    color: 'red'
  },
  {
    id: 'EVT-005',
    title: 'Workshop Equipment Demo',
    type: 'TRAINING',
    description: 'Demo of new workshop equipment and safety procedures',
    location: 'Workshop Area',
    meetingLink: '',
    startAt: '2024-12-16T11:00:00',
    endAt: '2024-12-16T13:00:00',
    createdBy: 'Workshop Supervisor',
    scope: 'DEPARTMENTS',
    department: 'Workshop',
    attendees: 15,
    rsvpStatus: 'DECLINED',
    color: 'green'
  },
  {
    id: 'EVT-006',
    title: 'Cross-Department Sync',
    type: 'MEETING',
    description: 'Monthly cross-department synchronization meeting',
    location: 'Virtual Meeting',
    meetingLink: 'https://zoom.us/j/123456789',
    startAt: '2024-12-17T15:00:00',
    endAt: '2024-12-17T16:30:00',
    createdBy: 'MD',
    scope: 'ALL_COMPANY',
    department: 'All',
    attendees: 20,
    rsvpStatus: 'INVITED',
    color: 'blue'
  },
];

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
  return d ? d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "--";
};

const fmtTime = (iso) => {
  const d = safeDate(iso);
  return d ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--";
};

const typeTone = (t) => (t === "MEETING" ? "info" : t === "TRAINING" ? "success" : t === "EVENT" ? "warn" : "default");
const rsvpTone = (s) => (s === "ACCEPTED" ? "success" : s === "TENTATIVE" ? "warn" : s === "DECLINED" ? "danger" : "default");

const typeEmoji = (t) => (t === "MEETING" ? "👥" : t === "TRAINING" ? "🎓" : t === "EVENT" ? "🎉" : "📅");

export default function HODEvents() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('upcoming'); // upcoming | past
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const now = useMemo(() => {
    const sorted = [...eventsData]
      .map((e) => safeDate(e.startAt))
      .filter(Boolean)
      .sort((a, b) => b.getTime() - a.getTime());
    return sorted[0] || new Date();
  }, []);

  const departments = useMemo(() => ['all', ...new Set(eventsData.map(e => e.department))], []);

  const filteredEvents = useMemo(() => {
    return eventsData
      .filter((event) => {
        const eventDate = safeDate(event.startAt);
        if (!eventDate) return false;

        const matchesView = viewMode === 'upcoming' ? eventDate >= now : eventDate < now;
        const matchesType = selectedType === 'all' || event.type === selectedType;
        const matchesDept = departmentFilter === 'all' || event.department === departmentFilter;

        return matchesView && matchesType && matchesDept;
      })
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  }, [viewMode, selectedType, departmentFilter, now]);

  const listEvents = useMemo(() => {
    if (!selectedDate) return filteredEvents;
    return filteredEvents.filter((e) => {
      const d = safeDate(e.startAt);
      return d ? toISODate(d) === selectedDate : false;
    });
  }, [filteredEvents, selectedDate]);

  const overview = useMemo(() => {
    const total = eventsData.length;
    const upcoming = eventsData.filter((e) => (safeDate(e.startAt)?.getTime() || 0) >= now.getTime()).length;
    const meetings = eventsData.filter((e) => e.type === 'MEETING').length;
    const attendees = eventsData.reduce((sum, e) => sum + (e.attendees || 0), 0);
    return { total, upcoming, meetings, attendees };
  }, [now]);

  const todayISO = useMemo(() => toISODate(now), [now]);
  const todaysEvents = useMemo(
    () =>
      eventsData.filter((e) => {
        const d = safeDate(e.startAt);
        return d ? toISODate(d) === todayISO : false;
      }),
    [todayISO]
  );

  const handleEditClick = (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/hod-dashboard/edit-event/${eventId}`);
  };

  const handleJoinClick = (e, event) => {
    e.preventDefault();
    e.stopPropagation();
    if (!event.meetingLink) return alert('No meeting link for this event.');
    window.open(event.meetingLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
      <div className="space-y-6">
        {/* Hero Header */}
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
                  Schedule and manage department meetings, trainings, and events.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/hod-dashboard/create-event">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold shadow-sm active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)", color: "white" }}
                  >
                    + Schedule Event
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Filters row */}
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
                      className={`px-3.5 py-2 rounded-2xl text-sm font-semibold transition ring-1 ${
                        active ? "text-white" : "text-gray-700 bg-gray-50 hover:bg-gray-100"
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

                <span className="mx-1 w-px bg-gray-200/70 self-stretch hidden sm:block" />

                {/* Type chips */}
                {[
                  { key: "all", label: "All Types" },
                  { key: "MEETING", label: "Meetings" },
                  { key: "TRAINING", label: "Trainings" },
                  { key: "EVENT", label: "Events" },
                ].map((t) => {
                  const active = selectedType === t.key;
                  return (
                    <button
                      key={t.key}
                      className={`px-3.5 py-2 rounded-2xl text-sm font-semibold transition ring-1 ${
                        active ? "text-white" : "text-gray-700 bg-gray-50 hover:bg-gray-100"
                      }`}
                      style={{
                        backgroundColor: active ? "var(--primary-blue)" : undefined,
                        borderColor: active ? "transparent" : "rgba(0,0,0,0.06)",
                      }}
                      onClick={() => setSelectedType(t.key)}
                    >
                      {t.label}
                    </button>
                  );
                })}

                {/* Department filter */}
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="px-3.5 py-2 rounded-2xl text-sm font-semibold border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  style={{ color: "var(--primary-blue)" }}
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d === 'all' ? 'All Departments' : d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date filter indicator */}
              <div className="flex items-center gap-2">
                {selectedDate ? (
                  <>
                    <span className="text-sm text-gray-600">
                      Filtered date: <span className="font-semibold text-gray-900">{new Date(selectedDate).toLocaleDateString()}</span>
                    </span>
                    <button
                      className="px-3 py-2 rounded-2xl border text-sm font-semibold hover:bg-gray-50"
                      style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                      onClick={() => setSelectedDate('')}
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

        {/* Stats row */}
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
                    background: "linear-gradient(90deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)",
                  }}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Calendar + Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Events Table */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="p-5 md:p-6 border-b border-gray-200/70">
                <SectionTitle
                  title={viewMode === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
                  subtitle={selectedDate ? 'Showing selected day' : 'Showing all days'}
                  action={
                    <div className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-800">{listEvents.length}</span> event(s)
                    </div>
                  }
                />
              </div>

              {listEvents.length === 0 ? (
                <div className="p-10 text-center text-gray-500">
                  No events found for these filters.
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
                          onClick={() => navigate(`/hod-dashboard/event/${event.id}`)}
                        >
                          <td className="px-5 py-3">
                            <div className="flex items-start gap-3">
                              <div
                                className="w-10 h-10 rounded-2xl flex items-center justify-center ring-1 ring-black/5 shrink-0"
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
                              {event.meetingLink ? 'Virtual link available' : 'On-site'}
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
                                className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white shadow-sm active:scale-[0.99] transition"
                                style={{ backgroundColor: "var(--secondary-blue)" }}
                              >
                                Join
                              </button>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  navigate(`/hod-dashboard/event/${event.id}`);
                                }}
                                className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white shadow-sm active:scale-[0.99] transition"
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

              {listEvents.length > 0 ? (
                <div className="lg:hidden p-4 text-sm text-gray-600">
                  Events table is optimized for desktop view.
                </div>
              ) : null}
            </Card>
          </div>

          {/* Calendar Widget */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <SectionTitle title="December 2024" subtitle="Click a day to filter events" />

              <div className="mt-5 grid grid-cols-7 gap-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <div key={day} className="text-center font-semibold text-gray-500 text-xs">
                    {day}
                  </div>
                ))}

                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const dateStr = `2024-12-${day.toString().padStart(2, "0")}`;
                  const dayEvents = eventsData.filter((event) => {
                    const d = safeDate(event.startAt);
                    return d ? toISODate(d) === dateStr : false;
                  });
                  const active = selectedDate === dateStr;

                  return (
                    <button
                      type="button"
                      key={day}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`h-10 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition relative ring-1 ${
                        active ? "ring-blue-300" : "ring-black/5"
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
                  Events on {now.toLocaleDateString()}
                </h3>

                <div className="mt-3 space-y-2">
                  {todaysEvents.length === 0 ? (
                    <div className="text-sm text-gray-500">No events on this date.</div>
                  ) : (
                    todaysEvents.map((event) => (
                      <div key={event.id} className="flex items-center p-3 rounded-2xl border border-gray-200/70 bg-gray-50">
                        <div
                          className="w-9 h-9 rounded-2xl flex items-center justify-center ring-1 ring-black/5 mr-3"
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
                            onClick={() => navigate(`/hod-dashboard/event/${event.id}`)}
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
                  <div className="p-4 rounded-2xl bg-blue-50 ring-1 ring-black/5">
                    <p className="text-2xl font-extrabold text-center" style={{ color: "var(--primary-blue)" }}>
                      {overview.upcoming}
                    </p>
                    <p className="text-sm text-gray-600 text-center mt-1">Upcoming</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50 ring-1 ring-black/5">
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

        {/* Event Statistics */}
        <Card className="p-6">
          <SectionTitle title="Event Statistics" subtitle="Quick insights and averages" />
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Events", value: eventsData.length, color: "var(--primary-blue)", icon: "📅" },
              { label: "This Month", value: eventsData.filter((e) => safeDate(e.startAt)?.getMonth() === 11).length, color: "var(--secondary-blue)", icon: "📆" },
              { label: "Total Attendees", value: eventsData.reduce((sum, e) => sum + e.attendees, 0), color: "#8B5CF6", icon: "👥" },
              {
                label: "Avg Duration",
                value: (() => {
                  const mins = eventsData.reduce((sum, e) => {
                    const s = safeDate(e.startAt)?.getTime() || 0;
                    const en = safeDate(e.endAt)?.getTime() || 0;
                    return en > s ? sum + Math.round((en - s) / 60000) : sum;
                  }, 0);
                  const avg = eventsData.length ? Math.round(mins / eventsData.length) : 0;
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