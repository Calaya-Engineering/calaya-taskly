// pages/dashboards/HOD/HODDocuments.jsx
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

const scopeTone = (scope) => {
  switch (scope) {
    case "PUBLIC":
      return "success";
    case "PRIVATE":
      return "danger";
    case "ALL_HODS":
      return "info";
    case "SPECIFIC_HODS":
      return "purple";
    case "SPECIFIC_DEPARTMENTS":
      return "warn";
    default:
      return "default";
  }
};

const getDocIcon = (type) => {
  const icons = {
    'Report': '📊',
    'Checklist': '📋',
    'Manual': '📖',
    'Financial': '💰',
    'Procedure': '📝',
    'Certificate': '📜',
    'Drawing': '🎨',
    'default': '📄',
  };
  return icons[type] || icons.default;
};

const fmtDate = (iso) => new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
const formatScope = (scope) => scope.replace(/_/g, " ");

const toMB = (sizeStr) => {
  const n = parseFloat(String(sizeStr).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

export default function HODDocuments() {
  const [filters, setFilters] = useState({
    type: "All Types",
    scope: "All Scopes",
    department: "all",
    search: "",
  });

  const [view, setView] = useState("cards");

  const documentsData = [
    {
      id: 'DOC-001',
      title: 'Pipeline Safety Inspection Report',
      type: 'Report',
      department: 'Technical',
      scope: 'PUBLIC',
      uploadedBy: 'Alex Johnson',
      uploadedDate: '2024-12-10',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      downloads: 24,
      description: 'Quarterly safety inspection report for pipeline infrastructure',
    },
    {
      id: 'DOC-002',
      title: 'HSE Compliance Checklist',
      type: 'Checklist',
      department: 'HSE',
      scope: 'ALL_HODS',
      uploadedBy: 'Maria Garcia',
      uploadedDate: '2024-12-08',
      fileSize: '1.8 MB',
      fileType: 'DOCX',
      downloads: 18,
      description: 'Complete HSE compliance checklist for offshore operations',
    },
    {
      id: 'DOC-003',
      title: 'Workshop Equipment Manual',
      type: 'Manual',
      department: 'Workshop',
      scope: 'SPECIFIC_DEPARTMENTS',
      uploadedBy: 'David Chen',
      uploadedDate: '2024-12-05',
      fileSize: '5.2 MB',
      fileType: 'PDF',
      downloads: 32,
      description: 'Operation and maintenance manual for workshop equipment',
    },
    {
      id: 'DOC-004',
      title: 'Project Budget Approval',
      type: 'Financial',
      department: 'Technical',
      scope: 'SPECIFIC_HODS',
      uploadedBy: 'HOD - Technical',
      uploadedDate: '2024-12-03',
      fileSize: '3.1 MB',
      fileType: 'XLSX',
      downloads: 12,
      description: 'Approved budget for Q1 pipeline maintenance project',
    },
    {
      id: 'DOC-005',
      title: 'Emergency Response Plan',
      type: 'Procedure',
      department: 'HSE',
      scope: 'PUBLIC',
      uploadedBy: 'Emma Wilson',
      uploadedDate: '2024-12-01',
      fileSize: '4.5 MB',
      fileType: 'PDF',
      downloads: 45,
      description: 'Updated emergency response plan for offshore facilities',
    },
  ];

  const documentTypes = useMemo(() => ["All Types", ...new Set(documentsData.map((d) => d.type))], []);
  const scopeTypes = useMemo(() => ["All Scopes", ...new Set(documentsData.map((d) => d.scope))], []);
  const departments = useMemo(() => ["all", ...new Set(documentsData.map((d) => d.department))], []);

  const filteredDocs = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return documentsData.filter((doc) => {
      const matchesType = filters.type === "All Types" || doc.type === filters.type;
      const matchesScope = filters.scope === "All Scopes" || doc.scope === filters.scope;
      const matchesDept = filters.department === "all" || doc.department === filters.department;
      const matchesQ =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.id.toLowerCase().includes(q) ||
        doc.uploadedBy.toLowerCase().includes(q) ||
        doc.department.toLowerCase().includes(q) ||
        doc.type.toLowerCase().includes(q);
      return matchesType && matchesScope && matchesDept && matchesQ;
    });
  }, [filters]);

  const stats = useMemo(() => {
    const total = documentsData.length;
    const publicCount = documentsData.filter((d) => d.scope === "PUBLIC").length;
    const privateCount = documentsData.filter((d) => d.scope === "PRIVATE").length;
    const totalDownloads = documentsData.reduce((sum, d) => sum + d.downloads, 0);
    const avgSize = total ? (documentsData.reduce((sum, d) => sum + toMB(d.fileSize), 0) / total).toFixed(1) : "0.0";
    return { total, publicCount, privateCount, totalDownloads, avgSize };
  }, []);

  const maxDownloads = useMemo(() => Math.max(1, ...documentsData.map((d) => d.downloads)), []);

  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
      <div className="space-y-6">
        {/* Hero */}
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
                  <Pill>Document Library</Pill>
                  <Pill tone="success">{stats.publicCount} Public</Pill>
                  <Pill tone="danger">{stats.privateCount} Private</Pill>
                  <Pill tone="info">{stats.total} Total</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Document Library
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Browse and manage documents in your department(s) with controlled access.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/hod-dashboard/create-document">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold shadow-sm active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)", color: "white" }}
                  >
                    + Upload Document
                  </button>
                </Link>

                <div className="flex w-full sm:w-auto gap-2">
                  <button
                    className={`flex-1 sm:flex-none px-4 py-3 rounded-2xl font-semibold border transition ${
                      view === "cards" ? "bg-white" : "bg-gray-50"
                    }`}
                    style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                    onClick={() => setView("cards")}
                  >
                    Cards
                  </button>
                  <button
                    className={`flex-1 sm:flex-none px-4 py-3 rounded-2xl font-semibold border transition ${
                      view === "table" ? "bg-white" : "bg-gray-50"
                    }`}
                    style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                    onClick={() => setView("table")}
                  >
                    Table
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters row */}
          <div className="p-4 md:p-5 bg-white border-t border-gray-200/70">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <select
                  className="px-3.5 py-2 rounded-2xl text-sm font-semibold border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={filters.type}
                  onChange={(e) => setFilters((p) => ({ ...p, type: e.target.value }))}
                  style={{ color: "var(--primary-blue)" }}
                >
                  {documentTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                <select
                  className="px-3.5 py-2 rounded-2xl text-sm font-semibold border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={filters.scope}
                  onChange={(e) => setFilters((p) => ({ ...p, scope: e.target.value }))}
                  style={{ color: "var(--primary-blue)" }}
                >
                  {scopeTypes.map((s) => (
                    <option key={s} value={s}>
                      {s === "All Scopes" ? s : formatScope(s)}
                    </option>
                  ))}
                </select>

                <select
                  className="px-3.5 py-2 rounded-2xl text-sm font-semibold border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={filters.department}
                  onChange={(e) => setFilters((p) => ({ ...p, department: e.target.value }))}
                  style={{ color: "var(--primary-blue)" }}
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d === "all" ? "All Departments" : d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full xl:w-[420px]">
                <div className="relative">
                  <input
                    value={filters.search}
                    onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                    placeholder="Search by ID, title, uploader, department..."
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Showing <span className="font-semibold text-gray-800">{filteredDocs.length}</span> document(s)
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stat tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: "Total Documents", value: stats.total, color: "var(--primary-blue)" },
            { label: "Public Documents", value: stats.publicCount, color: "#10B981" },
            { label: "Total Downloads", value: stats.totalDownloads.toLocaleString(), color: "var(--secondary-blue)" },
            { label: "Avg Size", value: `${stats.avgSize} MB`, color: "#8B5CF6" },
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
                    width:
                      s.label === "Public Documents"
                        ? `${Math.min(100, Math.round((stats.publicCount / Math.max(1, stats.total)) * 100))}%`
                        : s.label === "Total Downloads"
                        ? "72%"
                        : s.label === "Avg Size"
                        ? "55%"
                        : "80%",
                    background: "linear-gradient(90deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)",
                  }}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Docs list */}
        {view === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <Link key={doc.id} to={`/hod-dashboard/document/${doc.id}`} className="group">
                <Card className="p-6 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          {doc.id}
                        </span>
                        <Pill tone="info">{doc.type}</Pill>
                        <Pill tone={scopeTone(doc.scope)}>{formatScope(doc.scope)}</Pill>
                      </div>

                      <h3 className="mt-2 text-lg font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                        {doc.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 truncate">{doc.department} Department</p>
                    </div>

                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center ring-1 ring-black/5 shrink-0"
                      style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                    >
                      <span className="text-xl">{getDocIcon(doc.type)}</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3">
                    <div className="rounded-2xl border border-gray-200/70 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500">Uploaded By</p>
                          <p className="text-sm font-semibold text-gray-900 mt-1 truncate">{doc.uploadedBy}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">{fmtDate(doc.uploadedDate)}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-gray-600">Size</span>
                        <span className="font-semibold text-gray-900">{doc.fileSize}</span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-gray-600">Downloads</span>
                        <Pill tone="info">{doc.downloads}</Pill>
                      </div>

                      <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(100, Math.round((doc.downloads / maxDownloads) * 100))}%`,
                            background: "linear-gradient(90deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    <button
                      className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm text-white shadow-sm active:scale-[0.99] transition"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      Download
                    </button>
                    <button
                      className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                    >
                      View Details
                    </button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200/70">
                  <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="px-4 py-2.5 text-left">Document</th>
                    <th className="px-4 py-2.5 text-left">Type</th>
                    <th className="px-4 py-2.5 text-left">Dept</th>
                    <th className="px-4 py-2.5 text-left">Scope</th>
                    <th className="px-4 py-2.5 text-left">Uploaded By</th>
                    <th className="px-4 py-2.5 text-left">Date</th>
                    <th className="px-4 py-2.5 text-left">Size</th>
                    <th className="px-4 py-2.5 text-left">Downloads</th>
                    <th className="px-4 py-2.5 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200/70 text-[12.5px]">
                  {filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50/70 transition">
                      <td className="px-4 py-2.5">
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-2xl flex items-center justify-center ring-1 ring-black/5 shrink-0"
                            style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                          >
                            <span className="text-lg">{getDocIcon(doc.type)}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                              {doc.id}
                            </div>
                            <div className="text-[12.5px] font-semibold text-gray-900 truncate max-w-[520px]">
                              {doc.title}
                            </div>
                            <div className="text-[11px] text-gray-500">{doc.department}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <Pill tone="info">{doc.type}</Pill>
                      </td>

                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <Pill>{doc.department}</Pill>
                      </td>

                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <Pill tone={scopeTone(doc.scope)}>{formatScope(doc.scope)}</Pill>
                      </td>

                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <div className="text-[12.5px] font-semibold text-gray-900">{doc.uploadedBy}</div>
                      </td>

                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <div className="text-[12.5px] text-gray-900">{fmtDate(doc.uploadedDate)}</div>
                      </td>

                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <div className="text-[12.5px] font-semibold text-gray-900">{doc.fileSize}</div>
                      </td>

                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Pill tone="info">{doc.downloads}</Pill>
                          <div className="w-20 h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min(100, Math.round((doc.downloads / maxDownloads) * 100))}%`,
                                background: "linear-gradient(90deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)",
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-2.5 text-right whitespace-nowrap">
                        <Link to={`/hod-dashboard/document/${doc.id}`}>
                          <button
                            className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white shadow-sm active:scale-[0.99] transition"
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            View
                          </button>
                        </Link>
                        <button
                          className="ml-2 px-3 py-1.5 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                          style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Empty state */}
        {filteredDocs.length === 0 && (
          <Card className="p-10 text-center">
            <div className="text-4xl">📄</div>
            <div className="mt-3 font-extrabold" style={{ color: "var(--primary-blue)" }}>
              No documents found
            </div>
            <div className="text-sm text-gray-500 mt-1">Try adjusting your filters or upload a new document.</div>
            <Link to="/hod-dashboard/create-document" className="inline-block mt-4">
              <button
                className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
              >
                Upload Your First Document
              </button>
            </Link>
          </Card>
        )}

        {/* Quick Access */}
        <Card className="p-6">
          <SectionTitle title="Quick Access" subtitle="Common document views" />
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "📋", label: "Recent Reports", color: "var(--primary-blue)" },
              { icon: "🔒", label: "Private Documents", color: "var(--secondary-blue)" },
              { icon: "⬇️", label: "Most Downloaded", color: "#10B981" },
              { icon: "⏰", label: "Recently Updated", color: "#8B5CF6" },
            ].map((item, i) => (
              <button
                key={i}
                className="group p-5 rounded-2xl border border-gray-200/70 hover:shadow-md hover:-translate-y-0.5 transition-all text-center"
              >
                <div
                  className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition"
                  style={{ backgroundColor: `${item.color}18` }}
                >
                  <span style={{ color: item.color }}>{item.icon}</span>
                </div>
                <p className="font-extrabold text-sm" style={{ color: item.color }}>
                  {item.label}
                </p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}