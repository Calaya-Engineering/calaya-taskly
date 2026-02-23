// pages/dashboards/HOD/HODAnnouncements.jsx
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout, { 
  DashboardIcon, TaskIcon, DocumentIcon, ReportIcon, 
  CalendarIcon, AnnouncementIcon, UserIcon, 
  BellIcon, ApprovalIcon, AlertIcon, TenderIcon 
} from '../../../components/Layout';

const HODMenuItems = [
  { label: 'Dashboard', path: '/hod-dashboard', icon: <DashboardIcon /> },
  { label: 'Department Tasks', path: '/hod-dashboard/tasks', icon: <TaskIcon />, badge: '18' },
  { label: 'My Tasks', path: '/hod-dashboard/my-tasks', icon: <TaskIcon />, badge: '5' },
  { label: 'Documents', path: '/hod-dashboard/documents', icon: <DocumentIcon /> },
  { label: 'Daily Reports', path: '/hod-dashboard/reports', icon: <ReportIcon /> },
  { label: 'Meetings/Events', path: '/hod-dashboard/events', icon: <CalendarIcon /> },
  { label: 'Tenders', path: '/hod-dashboard/tenders', icon: <TenderIcon />, badge: '3' },
  { label: 'Tender Documents', path: '/hod-dashboard/tender-documents', icon: <TenderIcon /> },
  { label: 'Announcements', path: '/hod-dashboard/announcements', icon: <AnnouncementIcon /> },
  { label: 'Approvals', path: '/hod-dashboard/approvals', icon: <ApprovalIcon />, badge: '4' },
  { label: 'Escalations/Overdue', path: '/hod-dashboard/escalations', icon: <AlertIcon />, badge: '2' },
  { label: 'Notifications', path: '/hod-dashboard/notifications', icon: <BellIcon />, badge: '8' },
  { label: 'Profile', path: '/hod-dashboard/profile', icon: <UserIcon /> },
];

const announcementsData = [
  {
    id: 'ANN-001',
    title: 'Year-End Holiday Schedule',
    message: 'Please note the revised holiday schedule for the year-end break. All offices will be closed from Dec 24 to Jan 2.',
    createdBy: 'HR Department',
    createdDate: '2024-12-15 09:30',
    scope: 'All Company',
    priority: 'IMPORTANT',
    expiresAt: '2025-01-10',
    read: true,
    documents: 2,
    comments: 8,
    department: 'HR',
    readCount: 145
  },
  {
    id: 'ANN-002',
    title: 'Safety Protocol Updates',
    message: 'Important updates to safety protocols for offshore operations. All technical staff must complete training by Dec 31.',
    createdBy: 'HSE Manager',
    createdDate: '2024-12-14 14:15',
    scope: 'Technical Department',
    priority: 'URGENT',
    expiresAt: '2025-01-31',
    read: false,
    documents: 1,
    comments: 12,
    department: 'HSE',
    readCount: 89
  },
  {
    id: 'ANN-003',
    title: 'Monthly Performance Review',
    message: 'Monthly performance review meeting scheduled for Dec 20. All team leads must submit reports by Dec 18.',
    createdBy: 'HOD - Technical',
    createdDate: '2024-12-13 11:00',
    scope: 'Technical Department',
    priority: 'NORMAL',
    expiresAt: '2024-12-31',
    read: true,
    documents: 0,
    comments: 5,
    department: 'Technical',
    readCount: 24
  },
  {
    id: 'ANN-004',
    title: 'Workshop Maintenance Shutdown',
    message: 'Workshop will be closed for maintenance from Dec 20-22. Plan your equipment needs accordingly.',
    createdBy: 'Workshop Supervisor',
    createdDate: '2024-12-12 16:45',
    scope: 'Workshop Department',
    priority: 'IMPORTANT',
    expiresAt: '2024-12-25',
    read: false,
    documents: 1,
    comments: 3,
    department: 'Workshop',
    readCount: 18
  },
  {
    id: 'ANN-005',
    title: 'IT System Upgrade',
    message: 'Scheduled system maintenance on Dec 18, 10 PM to 2 AM. All systems will be unavailable during this period.',
    createdBy: 'IT Department',
    createdDate: '2024-12-10 10:00',
    scope: 'All Company',
    priority: 'IMPORTANT',
    expiresAt: '2024-12-31',
    read: true,
    documents: 3,
    comments: 15,
    department: 'IT',
    readCount: 120
  },
  {
    id: 'ANN-006',
    title: 'Budget Planning for Q1 2025',
    message: 'All HODs must submit their department budgets for Q1 2025 by Dec 15. Template available in documents.',
    createdBy: 'Finance Director',
    createdDate: '2024-12-09 15:30',
    scope: 'HODs Only',
    priority: 'NORMAL',
    expiresAt: '2024-12-20',
    read: false,
    documents: 1,
    comments: 6,
    department: 'Finance',
    readCount: 8
  },
];

/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-sm ${className}`}>{children}</div>
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

const inputBase =
  "w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white shadow-sm`;

export default function HODAnnouncements() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const unreadCount = useMemo(() => announcementsData.filter((a) => !a.read).length, []);
  const urgentCount = useMemo(() => announcementsData.filter((a) => a.priority === 'URGENT' && !a.read).length, []);

  const filteredAnnouncements = useMemo(() => {
    return announcementsData.filter((ann) => {
      if (filter === 'unread' && ann.read) return false;
      if (filter === 'urgent' && ann.priority !== 'URGENT') return false;
      if (filter === 'important' && ann.priority !== 'IMPORTANT' && ann.priority !== 'URGENT') return false;
      if (filter === 'technical' && ann.department !== 'Technical') return false;
      if (filter === 'workshop' && ann.department !== 'Workshop') return false;
      if (filter === 'hods' && ann.scope !== 'HODs Only') return false;

      if (search) {
        const q = search.toLowerCase();
        if (!ann.title.toLowerCase().includes(q) && !ann.message.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [filter, search]);

  const priorityTone = (priority) => {
    switch (priority) {
      case 'URGENT': return 'danger';
      case 'IMPORTANT': return 'warn';
      case 'HIGH': return 'warn';
      case 'NORMAL': return 'success';
      default: return 'muted';
    }
  };

  const scopeTone = (scope) => {
    switch (scope) {
      case 'All Company': return 'purple';
      case 'Technical Department': return 'default';
      case 'Workshop Department': return 'warn';
      case 'HODs Only': return 'default';
      default: return 'muted';
    }
  };

  const departmentTone = (department) => {
    switch (department) {
      case 'Technical': return 'default';
      case 'Workshop': return 'warn';
      case 'HSE': return 'success';
      case 'HR': return 'purple';
      case 'IT': return 'default';
      case 'Finance': return 'success';
      default: return 'muted';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const isExpired = (expiresAt) => new Date(expiresAt) < new Date();

  const markAsRead = (id) => alert(`Marked announcement ${id} as read`);

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
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>📢 Announcements</Pill>
                  <Pill tone="success">Unread: {unreadCount}</Pill>
                  <Pill tone={urgentCount ? "danger" : "muted"}>Urgent: {urgentCount}</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Announcements
                </h1>
                <p className="text-gray-600 mt-2">Stay updated with company and department announcements.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Link to="/hod-dashboard/create-announcement">
                  <button className={btnSolid} style={{ backgroundColor: "var(--accent-red)" }}>
                    + Create Announcement
                  </button>
                </Link>
                <Link to="/hod-dashboard">
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
                  { id: 'all', label: 'All' },
                  { id: 'unread', label: `Unread (${unreadCount})` },
                  { id: 'urgent', label: 'Urgent' },
                  { id: 'important', label: 'Important' },
                  { id: 'technical', label: 'Technical' },
                  { id: 'workshop', label: 'Workshop' },
                  { id: 'hods', label: 'HODs Only' },
                ].map((f) => {
                  const active = filter === f.id;
                  let bgColor = 'transparent';
                  let borderColor = 'var(--primary-blue)';
                  let textColor = 'var(--primary-blue)';

                  if (f.id === 'urgent') {
                    borderColor = '#EF4444';
                    textColor = active ? 'white' : '#EF4444';
                    bgColor = active ? '#EF4444' : 'transparent';
                  } else if (f.id === 'important') {
                    borderColor = '#F59E0B';
                    textColor = active ? 'white' : '#F59E0B';
                    bgColor = active ? '#F59E0B' : 'transparent';
                  } else if (f.id === 'unread') {
                    borderColor = 'var(--secondary-blue)';
                    textColor = active ? 'white' : 'var(--secondary-blue)';
                    bgColor = active ? 'var(--secondary-blue)' : 'transparent';
                  } else if (f.id === 'hods') {
                    borderColor = '#8B5CF6';
                    textColor = active ? 'white' : '#8B5CF6';
                    bgColor = active ? '#8B5CF6' : 'transparent';
                  } else if (f.id === 'technical') {
                    borderColor = 'var(--primary-blue)';
                    textColor = active ? 'white' : 'var(--primary-blue)';
                    bgColor = active ? 'var(--primary-blue)' : 'transparent';
                  } else if (f.id === 'workshop') {
                    borderColor = '#F59E0B';
                    textColor = active ? 'white' : '#F59E0B';
                    bgColor = active ? '#F59E0B' : 'transparent';
                  } else {
                    textColor = active ? 'white' : 'var(--primary-blue)';
                    bgColor = active ? 'var(--primary-blue)' : 'transparent';
                  }

                  return (
                    <button
                      key={f.id}
                      onClick={() => setFilter(f.id)}
                      className="px-4 py-2 rounded-2xl text-sm font-semibold border active:scale-[0.99] transition"
                      style={{
                        backgroundColor: bgColor,
                        borderColor: active ? 'transparent' : borderColor,
                        color: textColor,
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
        {urgentCount > 0 && (
          <Card className="p-5 border-red-200 bg-red-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/70 flex items-center justify-center text-2xl">🚨</div>
                <div>
                  <p className="font-extrabold text-red-800">Urgent announcements need your attention</p>
                  <p className="text-sm text-red-700 mt-0.5">{urgentCount} urgent announcement(s) unread</p>
                </div>
              </div>
              <button
                className={btnSolid}
                style={{ backgroundColor: "#EF4444" }}
                onClick={() => setFilter('urgent')}
              >
                View Urgent
              </button>
            </div>
          </Card>
        )}

        {/* LIST */}
        <div className="grid grid-cols-1 gap-4">
          {filteredAnnouncements.map((a) => {
            const expired = isExpired(a.expiresAt);
            return (
              <Card key={a.id} className={`overflow-hidden ${!a.read ? 'ring-2 ring-blue-200' : ''} ${expired ? 'opacity-80' : ''}`}>
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {!a.read && <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                        <Pill tone={priorityTone(a.priority)}>{a.priority}</Pill>
                        <Pill tone={scopeTone(a.scope)}>{a.scope}</Pill>
                        <Pill tone={departmentTone(a.department)}>{a.department}</Pill>
                        {expired && <Pill tone="muted">Expired</Pill>}
                      </div>

                      <h3 className="text-lg font-extrabold text-gray-900 mb-2">{a.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {a.message.length > 200 ? a.message.substring(0, 200) + '...' : a.message}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span className="inline-flex items-center gap-2">
                          <span className="w-8 h-8 rounded-2xl bg-blue-50 flex items-center justify-center">👤</span>
                          {a.createdBy}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <span className="w-8 h-8 rounded-2xl bg-blue-50 flex items-center justify-center">🗓️</span>
                          {formatDate(a.createdDate)}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <span className="w-8 h-8 rounded-2xl bg-blue-50 flex items-center justify-center">👁️</span>
                          {a.readCount} views
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
                      <Link to={`/hod-dashboard/announcement/${a.id}`}>
                        <button className={btnSolid} style={{ backgroundColor: "var(--primary-blue)" }}>
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-200/70 flex flex-wrap items-center justify-between gap-3 text-sm">
                    <div className="flex flex-wrap items-center gap-3 text-gray-600">
                      <span>📄 {a.documents} attachment{a.documents !== 1 ? 's' : ''}</span>
                      <span>💬 {a.comments} comment{a.comments !== 1 ? 's' : ''}</span>
                    </div>

                    <div className="text-xs text-gray-500 inline-flex items-center gap-2">
                      <span className="font-semibold" style={{ color: "var(--primary-blue)" }}>
                        {a.read ? '✅ Read' : '📌 New'}
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
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}>
              <span className="text-3xl" style={{ color: "var(--secondary-blue)" }}>
                🧐
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">No announcements found</h3>
            <p className="text-gray-600">Try adjusting your filters or search term.</p>
          </Card>
        )}

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: announcementsData.length, icon: '📢', tone: 'default' },
            { label: 'Unread', value: unreadCount, icon: '📌', tone: 'success' },
            { label: 'Urgent', value: announcementsData.filter((a) => a.priority === 'URGENT').length, icon: '🚨', tone: 'danger' },
            {
              label: 'Avg. Reads',
              value: Math.round(announcementsData.reduce((s, a) => s + a.readCount, 0) / announcementsData.length),
              icon: '👁️',
              tone: 'purple',
            },
          ].map((s, i) => (
            <Card key={i} className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold">{s.label}</p>
                  <p className="text-2xl font-extrabold mt-2">{s.value}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(44, 75, 155, 0.08)" }}>
                  <span className="text-xl">{s.icon}</span>
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