// pages/dashboards/Secretary/SecretaryTenders.jsx
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

const inputBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";

const tendersData = [
  {
    id: 'TEN-001',
    title: 'Supply of Pipeline Inspection Equipment',
    referenceNo: 'CAL/PROC/2024/001',
    description: 'Supply of pipeline inspection equipment and tools for Site A project including ultrasonic testing devices, corrosion monitoring equipment, and safety gear.',
    issuedDate: '2024-12-01',
    closingDate: '2024-12-20',
    department: 'Technical',
    category: 'Equipment Supply',
    documents: 3,
    fileSize: '4.2 MB',
    downloads: 24,
    status: 'OPEN',
    uploadedBy: 'Procurement Department',
    views: 124,
    budget: '₦15,800,000',
    contactPerson: 'Engr. Michael Okonkwo',
    scope: 'Technical Department'
  },
  {
    id: 'TEN-002',
    title: 'Annual Safety Training Services',
    referenceNo: 'CAL/HSE/2024/002',
    description: 'Provision of annual safety training and certification services for all company staff including offshore and onshore personnel.',
    issuedDate: '2024-12-02',
    closingDate: '2024-12-22',
    department: 'HSE',
    category: 'Training Services',
    documents: 2,
    fileSize: '2.8 MB',
    downloads: 18,
    status: 'OPEN',
    uploadedBy: 'Procurement Department',
    views: 89,
    budget: '₦28,500,000',
    contactPerson: 'HSE Manager',
    scope: 'All Departments'
  },
  {
    id: 'TEN-003',
    title: 'Workshop Equipment Maintenance',
    referenceNo: 'CAL/WORK/2024/004',
    description: 'Annual maintenance contract for workshop machinery and equipment including lathes, milling machines, and fabrication tools.',
    issuedDate: '2024-12-04',
    closingDate: '2024-12-18',
    department: 'Workshop',
    category: 'Maintenance Services',
    documents: 3,
    fileSize: '3.1 MB',
    downloads: 15,
    status: 'OPEN',
    uploadedBy: 'Procurement Department',
    views: 156,
    budget: '₦32,300,000',
    contactPerson: 'Workshop Manager',
    scope: 'Workshop Department'
  },
  {
    id: 'TEN-004',
    title: 'IT Infrastructure Upgrade',
    referenceNo: 'CAL/IT/2024/003',
    description: 'Upgrade of company-wide IT infrastructure including network systems, servers, and cybersecurity solutions.',
    issuedDate: '2024-12-03',
    closingDate: '2024-12-25',
    department: 'IT',
    category: 'IT Services',
    documents: 4,
    fileSize: '6.5 MB',
    downloads: 32,
    status: 'OPEN',
    uploadedBy: 'Procurement Department',
    views: 203,
    budget: '₦62,000,000',
    contactPerson: 'IT Director',
    scope: 'All Departments'
  },
  {
    id: 'TEN-005',
    title: 'Office Furniture Supply',
    referenceNo: 'CAL/ADMIN/2024/007',
    description: 'Supply and installation of office furniture for the new administration block.',
    issuedDate: '2024-12-07',
    closingDate: '2024-12-21',
    department: 'Admin',
    category: 'Equipment Supply',
    documents: 2,
    fileSize: '2.1 MB',
    downloads: 12,
    status: 'OPEN',
    uploadedBy: 'Procurement Department',
    views: 112,
    budget: '₦18,500,000',
    contactPerson: 'Admin Manager',
    scope: 'Admin Department'
  },
  {
    id: 'TEN-006',
    title: 'Legal Advisory Services',
    referenceNo: 'CAL/LEG/2024/006',
    description: 'Retainer for legal advisory and compliance services covering corporate, commercial, and regulatory matters.',
    issuedDate: '2024-12-06',
    closingDate: '2024-12-10',
    department: 'Legal',
    category: 'Professional Services',
    documents: 6,
    fileSize: '7.2 MB',
    downloads: 42,
    status: 'CLOSED',
    uploadedBy: 'Procurement Department',
    views: 98,
    budget: '₦25,000,000',
    contactPerson: 'Legal Counsel',
    scope: 'Legal Department'
  },
  {
    id: 'TEN-007',
    title: 'Vehicle Fleet Maintenance',
    referenceNo: 'CAL/LOG/2024/005',
    description: 'Maintenance and servicing contract for company vehicle fleet including cars, trucks, and specialized transport vehicles.',
    issuedDate: '2024-12-05',
    closingDate: '2024-12-15',
    department: 'Logistics',
    category: 'Maintenance Services',
    documents: 5,
    fileSize: '5.3 MB',
    downloads: 28,
    status: 'AWARDED',
    uploadedBy: 'Procurement Department',
    views: 145,
    budget: '₦38,750,000',
    contactPerson: 'Logistics Manager',
    scope: 'Logistics Department'
  },
];

const statusTone = (status) => {
  if (status === "OPEN") return "success";
  if (status === "CLOSED") return "warn";
  if (status === "AWARDED") return "purple";
  return "default";
};

const departmentTone = (dept) => {
  const tones = {
    Technical: "info",
    Workshop: "warn",
    HSE: "success",
    IT: "purple",
    Admin: "default",
    Legal: "purple",
    Logistics: "warn",
    Procurement: "info"
  };
  return tones[dept] || "default";
};

const daysLeftTone = (days) => {
  if (days <= 3) return "danger";
  if (days <= 7) return "warn";
  return "success";
};

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not set";

const getDaysRemaining = (closingDate) => {
  const now = new Date();
  const deadline = new Date(closingDate);
  const diffTime = deadline - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const formatCurrency = (value) => {
  return value.replace('₦', '₦ ');
};

export default function SecretaryTenders() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('open');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const departments = useMemo(() => [...new Set(tendersData.map(t => t.department))], []);
  
  const openCount = useMemo(() => tendersData.filter(t => t.status === 'OPEN').length, []);
  const closedCount = useMemo(() => tendersData.filter(t => t.status === 'CLOSED').length, []);
  const awardedCount = useMemo(() => tendersData.filter(t => t.status === 'AWARDED').length, []);

  const filteredTenders = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return tendersData.filter(tender => {
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'open' && tender.status === 'OPEN') ||
        (statusFilter === 'closed' && tender.status === 'CLOSED') ||
        (statusFilter === 'awarded' && tender.status === 'AWARDED');
      
      const matchesDepartment = departmentFilter === 'all' || tender.department === departmentFilter;
      
      const matchesSearch = !query ||
        tender.title.toLowerCase().includes(query) ||
        tender.referenceNo.toLowerCase().includes(query) ||
        tender.department.toLowerCase().includes(query) ||
        tender.category.toLowerCase().includes(query);
      
      return matchesStatus && matchesDepartment && matchesSearch;
    });
  }, [statusFilter, departmentFilter, searchTerm]);

  const stats = useMemo(() => {
    const totalBudget = tendersData
      .filter(t => t.status === 'OPEN')
      .reduce((sum, t) => sum + parseInt(t.budget.replace(/[^0-9]/g, '')), 0);
    
    const totalAllBudget = tendersData
      .reduce((sum, t) => sum + parseInt(t.budget.replace(/[^0-9]/g, '')), 0);
    
    const totalDocs = tendersData.reduce((sum, t) => sum + t.documents, 0);
    const totalDownloads = tendersData.reduce((sum, t) => sum + t.downloads, 0);
    
    return { totalBudget, totalAllBudget, totalDocs, totalDownloads };
  }, []);

  const handleDownload = (tender, e) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`Downloading tender documents for: ${tender.title}`);
  };

  const clearFilters = () => {
    setStatusFilter('open');
    setDepartmentFilter('all');
    setSearchTerm('');
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
                  <Pill>📄 Company Tenders</Pill>
                  <Pill tone="success">{openCount} Open</Pill>
                  <Pill tone="warn">{closedCount} Closed</Pill>
                  <Pill tone="purple">{awardedCount} Awarded</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Company Tenders
                </h1>
                <p className="text-gray-600 mt-2">View and monitor all company tender documents and procurement opportunities.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={clearFilters}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                >
                  Clear Filters
                </button>
                <Link to="/secretary-dashboard">
                  <button className={btnOutline} style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}>
                    Dashboard
                  </button>
                </Link>
              </div>
            </div>

            {/* FILTERS */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by title, reference, department..."
                    className={inputBase}
                  />
                  <span className="absolute left-4 top-3.5 text-gray-400">🔎</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="open">Open Tenders ({openCount})</option>
                  <option value="closed">Closed Tenders ({closedCount})</option>
                  <option value="awarded">Awarded Tenders ({awardedCount})</option>
                  <option value="all">All Tenders ({tendersData.length})</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Open Budget</p>
                <p className="text-lg font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  ₦ {(stats.totalBudget / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(44,75,155,0.1)" }}>
                <span style={{ color: "var(--primary-blue)" }} className="text-xl">💰</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Total Documents</p>
                <p className="text-2xl font-extrabold mt-2" style={{ color: "#10B981" }}>
                  {stats.totalDocs}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(16,185,129,0.1)" }}>
                <span style={{ color: "#10B981" }} className="text-xl">📄</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Total Downloads</p>
                <p className="text-2xl font-extrabold mt-2" style={{ color: "#8B5CF6" }}>
                  {stats.totalDownloads}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(139,92,246,0.1)" }}>
                <span style={{ color: "#8B5CF6" }} className="text-xl">⬇️</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Active Tenders</p>
                <p className="text-2xl font-extrabold mt-2" style={{ color: "#F59E0B" }}>
                  {openCount}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(245,158,11,0.1)" }}>
                <span style={{ color: "#F59E0B" }} className="text-xl">⚡</span>
              </div>
            </div>
          </Card>
        </div>

        {/* TENDERS LIST */}
        <div className="space-y-4">
          {filteredTenders.map((tender) => {
            const daysLeft = getDaysRemaining(tender.closingDate);
            const isUrgent = daysLeft <= 5 && tender.status === 'OPEN';
            
            return (
              <Card
                key={tender.id}
                className="p-6 hover:shadow-md transition cursor-pointer"
                onClick={() => navigate(`/secretary-dashboard/tender/${tender.id}`)}
                role="button"
                tabIndex={0}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Pill tone={statusTone(tender.status)}>{tender.status}</Pill>
                      <Pill tone={departmentTone(tender.department)}>{tender.department}</Pill>
                      {tender.status === 'OPEN' && (
                        <Pill tone={daysLeftTone(daysLeft)}>
                          {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
                        </Pill>
                      )}
                    </div>

                    <h3 className="text-lg font-extrabold text-gray-900 mb-1">{tender.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{tender.referenceNo}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center text-gray-600">
                          <span className="w-5 mr-2 text-gray-400">💰</span>
                          <span>{formatCurrency(tender.budget)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="w-5 mr-2 text-gray-400">📅</span>
                          <span>Closing: {fmtDate(tender.closingDate)}</span>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center text-gray-600">
                          <span className="w-5 mr-2 text-gray-400">👤</span>
                          <span className="truncate">{tender.contactPerson}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="w-5 mr-2 text-gray-400">🎯</span>
                          <span>{tender.scope}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{tender.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span>📥 {tender.downloads} downloads</span>
                      <span>📄 {tender.documents} documents</span>
                      <span>📦 {tender.fileSize}</span>
                      <span>👁️ {tender.views} views</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-48 shrink-0">
                    <Link
                      to={`/secretary-dashboard/tender/${tender.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full"
                    >
                      <button className={`w-full ${btnOutline}`} style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}>
                        View Details
                      </button>
                    </Link>
                    {tender.status === 'OPEN' && (
                      <button
                        onClick={(e) => handleDownload(tender, e)}
                        className={`w-full ${btnSolid} flex items-center justify-center gap-2`}
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        <span>⬇️</span> Download Documents
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}

          {filteredTenders.length === 0 && (
            <Card className="p-12 text-center">
              <div
                className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}
              >
                <span className="text-2xl" style={{ color: "var(--secondary-blue)" }}>📋</span>
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">No Tenders Found</h3>
              <p className="text-gray-600">No tenders match your current filters. Try adjusting your search criteria.</p>
            </Card>
          )}
        </div>

        {/* UPCOMING DEADLINES */}
        <Card className="p-6">
          <SectionTitle title="⏰ Upcoming Tender Deadlines" subtitle="Tenders closing soon" />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tendersData
              .filter(t => t.status === 'OPEN')
              .sort((a, b) => new Date(a.closingDate) - new Date(b.closingDate))
              .slice(0, 4)
              .map(tender => {
                const daysLeft = getDaysRemaining(tender.closingDate);
                
                return (
                  <div
                    key={tender.id}
                    className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => navigate(`/secretary-dashboard/tender/${tender.id}`)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-extrabold text-sm text-gray-900 line-clamp-1">{tender.title}</h3>
                      <Pill tone={daysLeftTone(daysLeft)}>{daysLeft}d</Pill>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{tender.referenceNo}</p>
                    <div className="flex items-center justify-between text-xs">
                      <Pill tone={departmentTone(tender.department)}>{tender.department}</Pill>
                      <span className="text-gray-500">📥 {tender.downloads}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>

        {/* TENDER STATISTICS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Department Distribution */}
          <Card className="p-6">
            <SectionTitle title="📊 Tenders by Department" />

            <div className="mt-5 space-y-3">
              {departments.map(dept => {
                const deptTenders = tendersData.filter(t => t.department === dept);
                const percentage = (deptTenders.length / tendersData.length) * 100;
                
                return (
                  <div key={dept} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">{dept}</span>
                      <span>{deptTenders.length} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${percentage}%`, backgroundColor: "var(--primary-blue)" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Status Distribution */}
          <Card className="p-6">
            <SectionTitle title="📊 Tender Status Distribution" />

            <div className="mt-5 space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Open</span>
                  <span>{openCount} ({((openCount/tendersData.length)*100).toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(openCount/tendersData.length)*100}%` }} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Closed</span>
                  <span>{closedCount} ({((closedCount/tendersData.length)*100).toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full bg-gray-500" style={{ width: `${(closedCount/tendersData.length)*100}%` }} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Awarded</span>
                  <span>{awardedCount} ({((awardedCount/tendersData.length)*100).toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full bg-purple-500" style={{ width: `${(awardedCount/tendersData.length)*100}%` }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Budget Summary */}
          <Card className="p-6">
            <SectionTitle title="💰 Budget Summary" />

            <div className="mt-5 space-y-4">
              <div className="flex justify-between items-center p-3 rounded-2xl bg-gray-50">
                <span className="text-sm font-semibold text-gray-700">Open Tenders</span>
                <span className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                  ₦ {(stats.totalBudget / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-2xl bg-gray-50">
                <span className="text-sm font-semibold text-gray-700">Total All</span>
                <span className="font-extrabold" style={{ color: "#10B981" }}>
                  ₦ {(stats.totalAllBudget / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-2xl bg-gray-50">
                <span className="text-sm font-semibold text-gray-700">Documents</span>
                <span className="font-extrabold" style={{ color: "#8B5CF6" }}>
                  {stats.totalDocs}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-2xl bg-gray-50">
                <span className="text-sm font-semibold text-gray-700">Downloads</span>
                <span className="font-extrabold" style={{ color: "#F59E0B" }}>
                  {stats.totalDownloads}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* SECRETARY RESPONSIBILITIES */}
        <Card className="p-6 bg-blue-50/30">
          <SectionTitle title="📝 Secretary Tender Management Responsibilities" />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "📋", title: "Tender Repository", desc: "Maintain tender document archive", color: "#3B82F6" },
              { icon: "📊", title: "Download Tracking", desc: "Monitor document access statistics", color: "#10B981" },
              { icon: "⏰", title: "Deadline Monitoring", desc: "Track closing dates and alerts", color: "#8B5CF6" },
              { icon: "📑", title: "Document Management", desc: "Organize tender documentation", color: "#F59E0B" },
            ].map((item, index) => (
              <div key={index} className="p-4 rounded-2xl border border-gray-200/70 bg-white hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}18` }}
                  >
                    <span style={{ color: item.color }}>{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-extrabold text-sm text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}