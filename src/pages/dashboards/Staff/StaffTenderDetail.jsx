// pages/dashboards/Staff/StaffTenderDetail.jsx
import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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

const fmtDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString(undefined, { 
    hour: '2-digit', 
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    hour12: true 
  }) : "Not set";

export default function StaffTenderDetail() {
  const { tenderId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

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
    contactPerson: 'Engr. Michael Okonkwo',
    contactEmail: 'procurement@calaya.com',
    contactPhone: '+234 801 234 5678',
    budget: '₦15,800,000',
    status: 'OPEN',
    uploadedBy: 'Procurement Department',
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
  const handleDownloadAll = () => alert("Downloading all tender documents as ZIP file");

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
            <button
              onClick={() => navigate("/staff-dashboard/tenders")}
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
                  {tender.status === "OPEN" && (
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
                  className={btnSolid}
                  style={{ backgroundColor: "var(--secondary-blue)" }}
                >
                  Download All
                </button>
                <button
                  onClick={() => alert("Tender information shared")}
                  className={btnOutline}
                  style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                >
                  Share Tender
                </button>
              </div>
            </div>

            {/* Closing Date Countdown */}
            {tender.status === "OPEN" && (
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
                { id: "details", label: "Tender Details" },
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
                      <Row label="Issued Date" value={fmtDate(tender.issuedDate)} />
                      <Row label="Closing Date" value={fmtDate(tender.closingDate)} />
                      <Row label="Budget" value={tender.budget} />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
                    <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Contact Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <Row label="Contact Person" value={tender.contactPerson} />
                      <Row label="Email" value={tender.contactEmail} />
                      <Row label="Phone" value={tender.contactPhone} />
                      <Row label="Uploaded By" value={tender.uploadedBy} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="lg:col-span-1 p-6">
              <SectionTitle title="Document Stats" subtitle="Overview of documents" />

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
                    <p className="text-xs text-gray-500 mt-1">Total Pages</p>
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
                  For Staff Members
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-start gap-2">
                    <span className="text-blue-500">•</span> View tender documents for reference
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-blue-500">•</span> Refer vendors to procurement@calaya.com
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-blue-500">•</span> Do not submit bids directly
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ) : activeTab === "requirements" ? (
          <Card className="p-6">
            <SectionTitle title="Tender Requirements" subtitle="Vendor qualification checklist" />
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
                    For Staff Reference
                  </h3>
                  <p className="text-sm text-amber-700">
                    These are the requirements for vendors bidding on this tender. Staff members can refer interested vendors to the procurement department.
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
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">📄</div>
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
      </div>
    </Layout>
  );
}

// Helper component for info rows
const Row = ({ label, value, strong = false }) => (
  <div className="flex items-start justify-between gap-4">
    <span className="text-gray-600 text-sm">{label}:</span>
    <span className={`${strong ? "font-extrabold" : "font-semibold"} text-gray-900 text-right text-sm`}>{value}</span>
  </div>
);