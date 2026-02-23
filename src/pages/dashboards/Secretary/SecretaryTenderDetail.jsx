// pages/dashboards/Secretary/SecretaryTenderDetail.jsx
import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  };
  return tones[dept] || "default";
};

const daysTone = (days) => {
  if (days <= 3) return "danger";
  if (days <= 7) return "warn";
  return "success";
};

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not set";

const getFileIcon = (fileName) => {
  const ext = fileName?.split('.').pop().toLowerCase();
  switch(ext) {
    case 'pdf': return '📕';
    case 'doc':
    case 'docx': return '📘';
    case 'xls':
    case 'xlsx': return '📗';
    default: return '📄';
  }
};

export default function SecretaryTenderDetail() {
  const { tenderId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');

  // Mock tender data
  const tender = {
    id: tenderId || 'TEN-001',
    title: 'Supply of Pipeline Inspection Equipment',
    referenceNo: 'CAL/PROC/2024/001',
    description: 'Supply of pipeline inspection equipment and tools for Site A project. The scope includes ultrasonic testing devices, corrosion monitoring equipment, calibration tools, and safety gear.\n\nAll equipment must meet API and ISO standards and include manufacturer warranty. Delivery required within 30 days of award.',
    issuedDate: '2024-12-01',
    closingDate: '2024-12-20',
    department: 'Technical',
    category: 'Equipment Supply',
    budget: '₦15,800,000',
    status: 'OPEN',
    uploadedBy: 'Procurement Department',
    contactPerson: 'Engr. Michael Okonkwo',
    contactEmail: 'procurement@calaya.com',
    contactPhone: '+234 801 234 5678',
    scope: 'Technical Department',
    views: 124,
    downloads: 89,
    documents: [
      { id: 1, name: 'Tender Document.pdf', uploadedBy: 'Procurement Dept', date: '2024-12-01', size: '1.2 MB', pages: 24 },
      { id: 2, name: 'Technical Specifications.pdf', uploadedBy: 'Technical Dept', date: '2024-12-01', size: '2.1 MB', pages: 32 },
      { id: 3, name: 'Bill of Quantities.xlsx', uploadedBy: 'Procurement Dept', date: '2024-12-01', size: '0.8 MB', pages: 8 },
      { id: 4, name: 'Terms and Conditions.pdf', uploadedBy: 'Legal Dept', date: '2024-12-01', size: '1.5 MB', pages: 18 },
    ],
    requirements: [
      'Minimum 5 years experience in oil and gas equipment supply',
      'ISO 9001:2015 certification',
      'Local content compliance (Nigerian Content Act)',
      'Valid tax clearance certificate',
      'Evidence of similar projects completed',
    ]
  };

  const daysRemaining = useMemo(() => {
    const now = new Date();
    const deadline = new Date(tender.closingDate);
    const diffTime = deadline - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [tender.closingDate]);

  const docStats = useMemo(() => {
    const totalDocs = tender.documents.length;
    const totalPages = tender.documents.reduce((sum, d) => sum + (Number(d.pages) || 0), 0);
    const totalSize = tender.documents.reduce((sum, d) => sum + parseFloat(d.size), 0).toFixed(1);
    return { totalDocs, totalPages, totalSize: `${totalSize} MB` };
  }, [tender.documents]);

  const handleDownload = (doc) => alert(`Downloading ${doc.name} (${doc.size})`);
  const handleDownloadAll = () => alert('Downloading all tender documents as ZIP file');
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Tender link copied to clipboard');
  };

  const isUrgent = daysRemaining <= 3;

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
            <button
              onClick={() => navigate("/secretary-dashboard/tenders")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800 mb-4"
            >
              ← Back to Tenders
            </button>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>📄 Tender</Pill>
                  <Pill tone={statusTone(tender.status)}>{tender.status}</Pill>
                  <Pill tone={departmentTone(tender.department)}>{tender.department}</Pill>
                  {tender.status === 'OPEN' && (
                    <Pill tone={daysTone(daysRemaining)}>{daysRemaining} days remaining</Pill>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight truncate" style={{ color: "var(--primary-blue)" }}>
                  {tender.title}
                </h1>

                <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
                  <span className="font-semibold">Ref:</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/70 border border-gray-200">{tender.referenceNo}</span>
                  <span className="text-gray-400">•</span>
                  <span>{tender.category}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleDownloadAll}
                  className={btnOutline}
                  style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                >
                  Download All
                </button>
                <Link to="/secretary-dashboard">
                  <button className={btnSolid} style={{ backgroundColor: "var(--secondary-blue)" }}>
                    Dashboard
                  </button>
                </Link>
              </div>
            </div>

            {/* Closing Date Countdown */}
            {tender.status === 'OPEN' && (
              <div className="mt-6 p-4 rounded-2xl border border-gray-200/70 bg-white/70">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="text-sm text-gray-700">
                    <span className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      Closing Date:
                    </span>{" "}
                    <span className="font-semibold">{fmtDate(tender.closingDate)}</span> <span className="text-gray-400">•</span>{" "}
                    <span className="text-gray-600">23:59:59</span>
                  </div>
                  <Pill tone={daysTone(daysRemaining)}>{daysRemaining} days remaining</Pill>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="mt-6 flex flex-wrap gap-6 border-b border-gray-200/70">
              {[
                { id: "details", label: "Details" },
                { id: "requirements", label: "Requirements" },
                { id: "documents", label: `Documents (${tender.documents.length})` },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`pb-4 text-sm font-semibold transition ${
                    activeTab === t.id ? "text-blue-700" : "text-gray-500 hover:text-gray-700"
                  }`}
                  style={{
                    borderBottom: activeTab === t.id ? "2px solid var(--primary-blue)" : "2px solid transparent",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* CONTENT */}
        {activeTab === "details" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
              <SectionTitle title="Tender Information" subtitle="Overview, key dates, and contact info" />
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-extrabold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{tender.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
                    <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Key Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <Row label="Reference" value={tender.referenceNo} />
                      <Row label="Category" value={tender.category} />
                      <Row label="Department" value={tender.department} />
                      <Row label="Budget" value={tender.budget} />
                      <Row label="Scope" value={tender.scope} />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
                    <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Timeline
                    </h4>
                    <div className="space-y-2 text-sm">
                      <Row label="Issued Date" value={fmtDate(tender.issuedDate)} />
                      <Row label="Closing Date" value={fmtDate(tender.closingDate)} />
                      <Row label="Uploaded By" value={tender.uploadedBy} />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                    Contact Information
                  </h4>
                  <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Contact Person</p>
                        <p className="font-extrabold text-gray-900 mt-1">{tender.contactPerson}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Email</p>
                        <p className="font-extrabold text-gray-900 mt-1">{tender.contactEmail}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Phone</p>
                        <p className="font-extrabold text-gray-900 mt-1">{tender.contactPhone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Department</p>
                        <p className="font-extrabold text-gray-900 mt-1">Procurement Department</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="lg:col-span-1 p-6">
              <SectionTitle title="Document Summary" subtitle="Overview of documents" />

              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-gray-200/70 text-center">
                    <p className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      {docStats.totalDocs}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Documents</p>
                  </div>
                  <div className="p-4 rounded-2xl border border-gray-200/70 text-center">
                    <p className="text-2xl font-extrabold text-emerald-600">{docStats.totalPages}</p>
                    <p className="text-xs text-gray-500 mt-1">Pages</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200/70">
                  <Row label="Total Size" value={docStats.totalSize} strong />
                  <Row label="Downloads" value={tender.downloads} strong />
                  <Row label="Views" value={tender.views} strong />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200/70">
                <h3 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={handleDownloadAll}
                    className="w-full px-4 py-3 rounded-2xl border bg-white hover:bg-gray-50 active:scale-[0.99] transition flex items-center justify-between"
                    style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                  >
                    <span className="font-semibold text-sm">Download All</span>
                    <span>📦</span>
                  </button>
                  <a
                    href={`mailto:${tender.contactEmail}`}
                    className="w-full px-4 py-3 rounded-2xl border bg-white hover:bg-gray-50 active:scale-[0.99] transition flex items-center justify-between"
                    style={{ borderColor: "rgba(109,198,223,0.55)", color: "var(--secondary-blue)" }}
                  >
                    <span className="font-semibold text-sm">Contact Procurement</span>
                    <span>📧</span>
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="w-full px-4 py-3 rounded-2xl border bg-white hover:bg-gray-50 active:scale-[0.99] transition flex items-center justify-between"
                    style={{ borderColor: "rgba(245,158,11,0.35)", color: "#F59E0B" }}
                  >
                    <span className="font-semibold text-sm">Copy Tender Link</span>
                    <span>🔗</span>
                  </button>
                </div>
              </div>
            </Card>
          </div>
        ) : activeTab === "requirements" ? (
          <Card className="p-6">
            <SectionTitle title="Vendor Requirements" subtitle="Qualification checklist" />
            <div className="mt-6 space-y-3">
              {tender.requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 border border-transparent">
                  <span className="mt-0.5 text-emerald-600">✓</span>
                  <span className="text-sm text-gray-700">{req}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl border border-gray-200/70 bg-amber-50/60">
              <div className="flex items-start gap-3">
                <span className="text-amber-600 text-lg">ℹ️</span>
                <div>
                  <h3 className="text-sm font-extrabold mb-2" style={{ color: "var(--primary-blue)" }}>
                    For Secretary Reference
                  </h3>
                  <p className="text-sm text-amber-700">
                    These are the requirements for vendors bidding on this tender. Ensure all tender documents are properly archived.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-6">
            <SectionTitle
              title="Tender Documents"
              subtitle={`${tender.documents.length} files available`}
              action={
                <button
                  onClick={handleDownloadAll}
                  className="px-5 py-2.5 rounded-2xl font-semibold text-white shadow-sm active:scale-[0.99] transition"
                  style={{ backgroundColor: "var(--accent-red)" }}
                >
                  Download All (ZIP)
                </button>
              }
            />

            <div className="mt-6 grid grid-cols-1 gap-3">
              {tender.documents.map((doc) => (
                <div key={doc.id} className="p-4 rounded-2xl border border-gray-200/70 hover:shadow-sm transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">
                        {getFileIcon(doc.name)}
                      </div>
                      <div>
                        <p className="font-extrabold text-gray-900">{doc.name}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>Uploaded by: {doc.uploadedBy}</span>
                          <span>•</span>
                          <span>{doc.date}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.pages} pages</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(doc)}
                      className="px-4 py-2 rounded-2xl text-sm font-semibold text-white shadow-sm active:scale-[0.99] transition"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Secretary Responsibilities */}
        <Card className="p-6 bg-blue-50/30">
          <SectionTitle title="Secretary Responsibilities" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Maintain tender document repository",
              "Track document downloads and views",
              "Monitor upcoming deadlines",
              "Archive closed and awarded tenders",
              "Assist with tender documentation",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <span style={{ color: "var(--primary-blue)" }}>•</span>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}


const Row = ({ label, value, strong = false }) => (
  <div className="flex items-start justify-between gap-4">
    <span className="text-gray-600 text-sm font-semibold">{label}:</span>
    <span className={`${strong ? "font-extrabold" : "font-semibold"} text-gray-900 text-right text-sm`}>{value}</span>
  </div>
);