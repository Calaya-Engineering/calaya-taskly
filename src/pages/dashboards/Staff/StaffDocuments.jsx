// pages/dashboards/Staff/StaffDocuments.jsx
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout, {
  DashboardIcon,
  TaskIcon,
  DocumentIcon,
  ReportIcon,
  CalendarIcon,
  AnnouncementIcon,
  UserIcon,
  BellIcon
} from '../../../components/Layout';

const TenderIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const StaffMenuItems = [
  { label: 'Dashboard', path: '/staff-dashboard', icon: <DashboardIcon /> },
  { label: 'My Tasks', path: '/staff-dashboard/tasks', icon: <TaskIcon />, badge: '8' },
  { label: 'Submit Reports', path: '/staff-dashboard/submit-reports', icon: <ReportIcon /> },
  { label: 'Documents', path: '/staff-dashboard/documents', icon: <DocumentIcon /> },
  { label: 'Daily Reports', path: '/staff-dashboard/daily-reports', icon: <ReportIcon /> },
  { label: 'Meetings/Events', path: '/staff-dashboard/events', icon: <CalendarIcon /> },
  { label: 'Tenders', path: '/staff-dashboard/tenders', icon: <TenderIcon />, badge: '3' },
  { label: 'Tender Documents', path: '/staff-dashboard/tender-documents', icon: <TenderIcon /> },
  { label: 'Announcements', path: '/staff-dashboard/announcements', icon: <AnnouncementIcon /> },
  { label: 'Notifications', path: '/staff-dashboard/notifications', icon: <BellIcon />, badge: '5' },
  { label: 'Profile', path: '/staff-dashboard/profile', icon: <UserIcon /> },
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
const btnSolid = `${btnBase} text-white shadow-sm`;

const documentsData = [
  {
    id: 'DOC-001',
    title: 'Safety Protocol v2.1',
    description: 'Updated safety protocols for all departments',
    type: 'Protocol',
    department: 'HSE',
    uploadedBy: 'HOD - Ms. Rodriguez',
    uploadedDate: '2024-12-05',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    access: 'Public',
    downloads: 45,
    tasks: ['TASK-2024-00123']
  },
  {
    id: 'DOC-002',
    title: 'Equipment Checklist',
    description: 'Daily equipment checklist for workshop',
    type: 'Checklist',
    department: 'Workshop',
    uploadedBy: 'HOD - Mr. Johnson',
    uploadedDate: '2024-12-04',
    fileType: 'Excel',
    fileSize: '1.2 MB',
    access: 'Department',
    downloads: 28,
    tasks: ['TASK-2024-00124']
  },
  {
    id: 'DOC-003',
    title: 'Training Manual 2024',
    description: 'Complete training manual for new hires',
    type: 'Manual',
    department: 'HR',
    uploadedBy: 'HR Department',
    uploadedDate: '2024-12-01',
    fileType: 'PDF',
    fileSize: '5.8 MB',
    access: 'Public',
    downloads: 67,
    tasks: ['TASK-2024-00126']
  },
  {
    id: 'DOC-004',
    title: 'Workshop Schedule Q4',
    description: 'Quarterly schedule for workshop activities',
    type: 'Schedule',
    department: 'Workshop',
    uploadedBy: 'HOD - Mr. Johnson',
    uploadedDate: '2024-11-28',
    fileType: 'PDF',
    fileSize: '1.5 MB',
    access: 'Department',
    downloads: 22,
    tasks: []
  },
  {
    id: 'DOC-005',
    title: 'Client Meeting Template',
    description: 'Standard template for client meeting notes',
    type: 'Template',
    department: 'Technical',
    uploadedBy: 'MD - Mr. Williams',
    uploadedDate: '2024-11-25',
    fileType: 'Word',
    fileSize: '0.8 MB',
    access: 'Public',
    downloads: 38,
    tasks: ['TASK-2024-00125']
  },
  {
    id: 'DOC-006',
    title: 'Inventory Management Guide',
    description: 'Guide for inventory management procedures',
    type: 'Guide',
    department: 'Logistics',
    uploadedBy: 'HOD - Mr. Brown',
    uploadedDate: '2024-11-20',
    fileType: 'PDF',
    fileSize: '3.2 MB',
    access: 'All Departments',
    downloads: 31,
    tasks: []
  },
];

const accessTone = (access) => {
  switch(access) {
    case 'Public': return 'success';
    case 'Department': return 'info';
    case 'All Departments': return 'purple';
    default: return 'default';
  }
};

const departmentTone = (dept) => {
  const tones = {
    HSE: 'success',
    Workshop: 'warn',
    HR: 'purple',
    Technical: 'info',
    Logistics: 'default',
  };
  return tones[dept] || 'default';
};

const getFileIcon = (fileType) => {
  switch(fileType.toLowerCase()) {
    case 'pdf': return '📕';
    case 'word': return '📝';
    case 'excel': return '📊';
    case 'powerpoint': return '📽️';
    case 'image': return '🖼️';
    default: return '📄';
  }
};

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not set";

export default function StaffDocuments() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredDocuments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return documentsData.filter((doc) => {
      if (filter === 'all') return true;
      if (filter === 'public') return doc.access === 'Public';
      if (filter === 'department') return doc.access === 'Department';
      if (filter === 'technical') return doc.department === 'Technical';
      if (filter === 'workshop') return doc.department === 'Workshop';
      return true;
    }).filter(doc => {
      if (!query) return true;
      return doc.title.toLowerCase().includes(query) ||
             doc.description.toLowerCase().includes(query) ||
             doc.type.toLowerCase().includes(query) ||
             doc.department.toLowerCase().includes(query);
    });
  }, [filter, search]);

  const stats = useMemo(() => {
    const total = documentsData.length;
    const publicCount = documentsData.filter(d => d.access === 'Public').length;
    const departmentCount = documentsData.filter(d => d.access === 'Department' || d.access === 'All Departments').length;
    const totalDownloads = documentsData.reduce((sum, d) => sum + d.downloads, 0);
    return { total, publicCount, departmentCount, totalDownloads };
  }, []);

  const handleDownload = (doc, e) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`Downloading ${doc.title}.${doc.fileType.toLowerCase()} (${doc.fileSize})`);
  };

  const clearFilters = () => {
    setFilter('all');
    setSearch('');
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
                  <Pill>📄 Documents</Pill>
                  <Pill tone="info">{stats.total} Total</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Documents
                </h1>
                <p className="text-gray-600 mt-2">Access and download documents relevant to your work.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={clearFilters}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                >
                  Clear Filters
                </button>
                <Link to="/staff-dashboard">
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
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    filter === 'all' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  style={{
                    borderColor: filter === 'all' ? "var(--primary-blue)" : "#e5e7eb",
                    color: filter === 'all' ? "var(--primary-blue)" : "#374151",
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('public')}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    filter === 'public' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  style={{
                    borderColor: filter === 'public' ? "var(--secondary-blue)" : "#e5e7eb",
                    color: filter === 'public' ? "var(--secondary-blue)" : "#374151",
                  }}
                >
                  Public
                </button>
                <button
                  onClick={() => setFilter('department')}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    filter === 'department' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  style={{
                    borderColor: filter === 'department' ? "#F59E0B" : "#e5e7eb",
                    color: filter === 'department' ? "#F59E0B" : "#374151",
                  }}
                >
                  Department
                </button>
                <button
                  onClick={() => setFilter('technical')}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    filter === 'technical' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  style={{
                    borderColor: filter === 'technical' ? "#3B82F6" : "#e5e7eb",
                    color: filter === 'technical' ? "#3B82F6" : "#374151",
                  }}
                >
                  Technical
                </button>
                <button
                  onClick={() => setFilter('workshop')}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    filter === 'workshop' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  style={{
                    borderColor: filter === 'workshop' ? "#F59E0B" : "#e5e7eb",
                    color: filter === 'workshop' ? "#F59E0B" : "#374151",
                  }}
                >
                  Workshop
                </button>
              </div>

              <div className="relative flex-1">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, type, department..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                <span className="absolute left-4 top-3.5 text-gray-400">🔎</span>
              </div>
            </div>
          </div>
        </Card>

        {/* DOCUMENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-2xl border border-gray-200/70 hover:shadow-md transition bg-white cursor-pointer"
              onClick={() => navigate(`/staff-dashboard/document/${doc.id}`)}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getFileIcon(doc.fileType)}</span>
                  <Pill tone={accessTone(doc.access)}>{doc.access}</Pill>
                  <Pill tone={departmentTone(doc.department)}>{doc.department}</Pill>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <div>{doc.fileType}</div>
                  <div>{doc.fileSize}</div>
                </div>
              </div>

              <h3 className="text-lg font-extrabold text-gray-900 mb-2">{doc.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doc.description}</p>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">👤</span>
                  <span className="truncate">{doc.uploadedBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📅</span>
                  <span>{fmtDate(doc.uploadedDate)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200/70">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>⬇️ {doc.downloads}</span>
                  {doc.tasks.length > 0 && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span>📋 {doc.tasks.length} task{doc.tasks.length > 1 ? 's' : ''}</span>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleDownload(doc, e)}
                    className="px-4 py-2 rounded-2xl text-sm font-semibold text-white shadow-sm active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    Download
                  </button>
                  <Link
                    to={`/staff-dashboard/document/${doc.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                  >
                    View
                  </Link>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200/70 flex items-center justify-between text-xs">
                <span className="font-semibold" style={{ color: "var(--primary-blue)" }}>
                  ID: {doc.id}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card className="p-12 text-center">
            <div
              className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}
            >
              <span className="text-2xl" style={{ color: "var(--secondary-blue)" }}>📄</span>
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">Try adjusting your filters or search term.</p>
          </Card>
        )}

        {/* Document Categories */}
        <Card className="p-6">
          <SectionTitle title="Document Categories" subtitle="Browse by category" />

          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { category: 'Protocols', count: 12, icon: '📋', color: "var(--primary-blue)" },
              { category: 'Checklists', count: 8, icon: '✅', color: "var(--secondary-blue)" },
              { category: 'Manuals', count: 6, icon: '📖', color: "#F59E0B" },
              { category: 'Reports', count: 24, icon: '📄', color: "#10B981" },
            ].map((cat) => (
              <div
                key={cat.category}
                className="p-5 rounded-2xl border text-center hover:shadow-md transition cursor-pointer"
                style={{ borderColor: cat.color }}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <p className="font-extrabold" style={{ color: cat.color }}>{cat.category}</p>
                <p className="text-sm text-gray-500 mt-1">{cat.count} documents</p>
              </div>
            ))}
          </div>
        </Card>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Total Documents</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(44,75,155,0.1)" }}>
                <span style={{ color: "var(--primary-blue)" }} className="text-xl">📚</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Public Access</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--secondary-blue)" }}>
                  {stats.publicCount}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(109,198,223,0.1)" }}>
                <span style={{ color: "var(--secondary-blue)" }} className="text-xl">🌐</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Department Only</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#F59E0B" }}>
                  {stats.departmentCount}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(245,158,11,0.1)" }}>
                <span style={{ color: "#F59E0B" }} className="text-xl">🏢</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Total Downloads</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#10B981" }}>
                  {stats.totalDownloads}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(16,185,129,0.1)" }}>
                <span style={{ color: "#10B981" }} className="text-xl">⬇️</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}