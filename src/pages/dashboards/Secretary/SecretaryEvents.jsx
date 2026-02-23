// pages/dashboards/Secretary/SecretaryEvents.jsx
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout, {
  DashboardIcon,
  DocumentIcon,
  ReportIcon,
  CalendarIcon,
  BellIcon,
  UserIcon,
  AnnouncementIcon
} from '../../../components/Layout';

const TenderIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const SecretaryMenuItems = [
  { label: 'Dashboard', path: '/secretary-dashboard', icon: <DashboardIcon /> },
  { label: 'Upload Daily Report', path: '/secretary-dashboard/upload-report', icon: <ReportIcon /> },
  { label: 'Daily Reports Archive', path: '/secretary-dashboard/reports-archive', icon: <ReportIcon />, badge: '24' },
  { label: 'Task Reports Archive', path: '/secretary-dashboard/task-reports', icon: <DocumentIcon />, badge: '45' },
  { label: 'Documents', path: '/secretary-dashboard/documents', icon: <DocumentIcon /> },
  { label: 'Meetings/Events', path: '/secretary-dashboard/events', icon: <CalendarIcon />, badge: '3' },
  { label: 'Tenders', path: '/secretary-dashboard/tenders', icon: <TenderIcon />, badge: '5' },
  { label: 'Announcements', path: '/secretary-dashboard/announcements', icon: <AnnouncementIcon />, badge: '3' },
  { label: 'Notifications', path: '/secretary-dashboard/notifications', icon: <BellIcon />, badge: '12' },
  { label: 'Profile', path: '/secretary-dashboard/profile', icon: <UserIcon /> },
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

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white shadow-sm`;

const eventsData = [
  { 
    id: 1, 
    title: 'Monthly Department Heads Meeting', 
    type: 'MEETING',
    startAt: '2024-12-15T10:00:00',
    endAt: '2024-12-15T12:00:00',
    location: 'Conference Room A',
    createdBy: 'Managing Director',
    department: 'Management',
    attendees: 12,
    rsvpStatus: 'ACCEPTED',
    description: 'Monthly review meeting with all department heads to discuss performance and upcoming projects.',
    documents: 3
  },
  { 
    id: 2, 
    title: 'Safety Training Session', 
    type: 'TRAINING',
    startAt: '2024-12-18T09:00:00',
    endAt: '2024-12-18T16:00:00',
    location: 'Training Hall',
    createdBy: 'HSE Department',
    department: 'HSE',
    attendees: 45,
    rsvpStatus: 'INVITED',
    description: 'Mandatory safety training for all field staff and technical personnel.',
    documents: 4
  },
  { 
    id: 3, 
    title: 'Annual Christmas Party', 
    type: 'EVENT',
    startAt: '2024-12-20T18:00:00',
    endAt: '2024-12-20T23:00:00',
    location: 'Grand Hotel Ballroom',
    createdBy: 'HR Department',
    department: 'HR',
    attendees: 120,
    rsvpStatus: 'ACCEPTED',
    description: 'Company-wide Christmas celebration and year-end party.',
    documents: 0
  },
  { 
    id: 4, 
    title: 'Technical Department Workshop', 
    type: 'MEETING',
    startAt: '2024-12-05T14:00:00',
    endAt: '2024-12-05T16:30:00',
    location: 'Technical Dept Office',
    createdBy: 'Technical HOD',
    department: 'Technical',
    attendees: 18,
    rsvpStatus: 'ACCEPTED',
    description: 'Workshop on new equipment operation and maintenance procedures.',
    documents: 2
  },
  { 
    id: 5, 
    title: 'Client Presentation - ABC Corp', 
    type: 'MEETING',
    startAt: '2024-11-28T11:00:00',
    endAt: '2024-11-28T13:00:00',
    location: 'Client Office (Virtual)',
    createdBy: 'BDD Department',
    department: 'BDD',
    attendees: 8,
    rsvpStatus: 'TENTATIVE',
    description: 'Quarterly review and project presentation for ABC Corporation.',
    documents: 3
  },
  { 
    id: 6, 
    title: 'First Aid Training', 
    type: 'TRAINING',
    startAt: '2024-11-25T09:00:00',
    endAt: '2024-11-25T17:00:00',
    location: 'HSE Training Center',
    createdBy: 'HSE Department',
    department: 'HSE',
    attendees: 32,
    rsvpStatus: 'DECLINED',
    description: 'Certified first aid training for workshop and field staff.',
    documents: 5
  },
  { 
    id: 7, 
    title: 'Q4 Financial Review', 
    type: 'MEETING',
    startAt: '2024-12-22T15:00:00',
    endAt: '2024-12-22T17:00:00',
    location: 'Board Room',
    createdBy: 'Accounts Department',
    department: 'Accounts',
    attendees: 6,
    rsvpStatus: 'ACCEPTED',
    description: 'Quarterly financial review and budget planning for next year.',
    documents: 2
  },
  { 
    id: 8, 
    title: 'New Employee Orientation', 
    type: 'TRAINING',
    startAt: '2024-12-25T10:00:00',
    endAt: '2024-12-25T15:00:00',
    location: 'HR Training Room',
    createdBy: 'HR Department',
    department: 'HR',
    attendees: 15,
    rsvpStatus: 'INVITED',
    description: 'Orientation program for new employees joining this month.',
    documents: 1
  },
];

const typeTone = (type) => {
  switch(type) {
    case 'MEETING': return 'info';
    case 'TRAINING': return 'success';
    case 'EVENT': return 'purple';
    default: return 'default';
  }
};

const rsvpTone = (status) => {
  switch(status) {
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

export default function SecretaryEvents() {
  const navigate = useNavigate();
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

  const clearFilters = () => {
    setView('upcoming');
    setTypeFilter('all');
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
                  <Pill>📅 Meetings & Events</Pill>
                  <Pill tone="info">{stats.upcoming} Upcoming</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Meetings & Events
                </h1>
                <p className="text-gray-600 mt-2">View and manage company meetings, events, and training sessions.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={clearFilters}
                  className={btnOutline}
                  style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                >
                  Clear Filters
                </button>
                <Link to="/secretary-dashboard">
                  <button className={btnOutline} style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}>
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
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    view === 'upcoming' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
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
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    view === 'past' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
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
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    view === 'all' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
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
            <Card key={event.id} className="overflow-hidden hover:shadow-md transition cursor-pointer"
                  onClick={() => navigate(`/secretary-dashboard/event/${event.id}`)}>
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
                  <Link to={`/secretary-dashboard/event/${event.id}`} className="flex-1">
                    <button
                      className="w-full px-4 py-2.5 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                    >
                      View Details
                    </button>
                  </Link>
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
                  onClick={() => navigate(`/secretary-dashboard/event/${event.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        event.type === 'MEETING' ? 'bg-blue-500' :
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