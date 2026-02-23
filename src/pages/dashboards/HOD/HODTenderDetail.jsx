// pages/dashboards/HOD/HODTenderDetail.jsx
import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  TenderIcon,
} from "../../../components/Layout";

const HODMenuItems = [
  { label: "Dashboard", path: "/hod-dashboard", icon: <DashboardIcon /> },
  { label: "Department Tasks", path: "/hod-dashboard/tasks", icon: <TaskIcon />, badge: "18" },
  { label: "My Tasks", path: "/hod-dashboard/my-tasks", icon: <TaskIcon />, badge: "5" },
  { label: "Documents", path: "/hod-dashboard/documents", icon: <DocumentIcon /> },
  { label: "Daily Reports", path: "/hod-dashboard/reports", icon: <ReportIcon /> },
  { label: "Meetings/Events", path: "/hod-dashboard/events", icon: <CalendarIcon /> },
  { label: "Tenders", path: "/hod-dashboard/tenders", icon: <TenderIcon />, badge: "3" },
  { label: "Tender Documents", path: "/hod-dashboard/tender-documents", icon: <TenderIcon /> },
  { label: "Announcements", path: "/hod-dashboard/announcements", icon: <AnnouncementIcon /> },
  { label: "Approvals", path: "/hod-dashboard/approvals", icon: <ApprovalIcon />, badge: "4" },
  { label: "Escalations/Overdue", path: "/hod-dashboard/escalations", icon: <AlertIcon />, badge: "2" },
  { label: "Notifications", path: "/hod-dashboard/notifications", icon: <BellIcon />, badge: "8" },
  { label: "Profile", path: "/hod-dashboard/profile", icon: <UserIcon /> },
];

const tenderData = {
  id: "TEN-001",
  title: "Supply of Pipeline Inspection Equipment",
  referenceNo: "CAL/PROC/2024/001",
  description:
    "Supply of pipeline inspection equipment and tools for Site A project. The scope includes ultrasonic testing devices, corrosion monitoring equipment, calibration tools, and safety gear.\n\nAll equipment must meet API and ISO standards and include manufacturer warranty. Delivery required within 30 days of award.",
  issuedDate: "2024-12-01",
  closingDate: "2024-12-20",
  department: "Technical",
  category: "Equipment Supply",
  contactPerson: "Engr. Michael Okonkwo",
  contactEmail: "procurement@calaya.com",
  contactPhone: "+234 801 234 5678",
  budget: "₦15,800,000",
  status: "OPEN",
  createdBy: "HOD - Technical",
  createdAt: "2024-12-01",
  documents: [
    { id: 1, name: "Tender Document.pdf", size: "1.2 MB", pages: 24, uploadedAt: "2024-12-01" },
    { id: 2, name: "Technical Specifications.pdf", size: "2.1 MB", pages: 32, uploadedAt: "2024-12-01" },
    { id: 3, name: "Bill of Quantities.xlsx", size: "0.8 MB", pages: 8, uploadedAt: "2024-12-01" },
    { id: 4, name: "Terms and Conditions.pdf", size: "1.5 MB", pages: 18, uploadedAt: "2024-12-01" },
  ],
  requirements: [
    "Minimum 5 years experience in oil and gas equipment supply",
    "ISO 9001:2015 certification",
    "Local content compliance (Nigerian Content Act)",
    "Valid tax clearance certificate",
    "Evidence of similar projects completed",
  ],
};

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
      : tone === "info"
      ? "bg-blue-50 text-blue-700 ring-blue-100"
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

const Row = ({ label, value, strong = false }) => (
  <div className="flex items-start justify-between gap-4">
    <span className="text-gray-600 text-sm">{label}:</span>
    <span className={`${strong ? "font-extrabold" : "font-semibold"} text-gray-900 text-right text-sm`}>{value}</span>
  </div>
);

export default function HODTenderDetail() {
  const { tenderId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const daysRemaining = useMemo(() => {
    const now = new Date();
    const deadline = new Date(tenderData.closingDate);
    const diffTime = deadline - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, []);

  const docStats = useMemo(() => {
    const totalDocs = tenderData.documents.length;
    const totalPages = tenderData.documents.reduce((sum, d) => sum + (Number(d.pages) || 0), 0);
    const totalSize = tenderData.documents.reduce((sum, d) => sum + parseFloat(d.size), 0).toFixed(1);
    return { totalDocs, totalPages, totalSize: `${totalSize} MB` };
  }, []);

  const isMyDept = ["Technical", "Workshop", "HSE"].includes(tenderData.department);

  const handleDownload = (doc) => alert(`Downloading ${doc.name} (${doc.size})`);
  const handleDownloadAll = () => alert("Downloading all tender documents as ZIP file");

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
            <button
              onClick={() => navigate("/hod-dashboard/tenders")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800 mb-4"
            >
              ← Back to Tenders
            </button>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>📄 Tender</Pill>
                  <Pill tone={statusTone(tenderData.status)}>{tenderData.status}</Pill>
                  <Pill tone={departmentTone(tenderData.department)}>{tenderData.department}</Pill>
                  {isMyDept && <Pill tone="info">📌 Your Department</Pill>}
                  {tenderData.status === "OPEN" ? (
                    <Pill tone={daysTone(daysRemaining)}>{daysRemaining} days remaining</Pill>
                  ) : null}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight truncate" style={{ color: "var(--primary-blue)" }}>
                  {tenderData.title}
                </h1>

                <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
                  <span className="font-semibold">Ref:</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/70 border border-gray-200">{tenderData.referenceNo}</span>
                  <span className="text-gray-400">•</span>
                  <span>{tenderData.category}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Created by: {tenderData.createdBy} • {tenderData.createdAt}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Link to={`/hod-dashboard/tender/edit/${tenderData.id}`}>
                  <button
                    className="px-5 py-3 rounded-2xl font-semibold text-white shadow-sm active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    ✏️ Edit Tender
                  </button>
                </Link>

                <Link to={`/hod-dashboard/tender-documents/${tenderData.id}`}>
                  <button
                    className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                  >
                    Manage Documents
                  </button>
                </Link>
              </div>
            </div>

            {tenderData.status === "OPEN" ? (
              <div className="mt-6 p-4 rounded-2xl border border-gray-200/70 bg-white/70">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="text-sm text-gray-700">
                    <span className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      Closing Date:
                    </span>{" "}
                    <span className="font-semibold">{tenderData.closingDate}</span> <span className="text-gray-400">•</span>{" "}
                    <span className="text-gray-600">23:59:59</span>
                  </div>
                  <Pill tone={daysTone(daysRemaining)}>{daysRemaining} days remaining</Pill>
                </div>
              </div>
            ) : null}

            {/* Tabs */}
            <div className="mt-6 flex flex-wrap gap-6 border-b border-gray-200/70">
              {[
                { id: "details", label: "Tender Details" },
                { id: "documents", label: `Documents (${tenderData.documents.length})` },
                { id: "requirements", label: "Requirements" },
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
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{tenderData.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
                    <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Key Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <Row label="Category" value={tenderData.category} />
                      <Row label="Department" value={tenderData.department} />
                      <Row label="Issued Date" value={tenderData.issuedDate} />
                      <Row label="Closing Date" value={tenderData.closingDate} />
                      <Row label="Budget" value={tenderData.budget} />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
                    <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Contact Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <Row label="Contact Person" value={tenderData.contactPerson} />
                      <Row label="Email" value={tenderData.contactEmail} />
                      <Row label="Phone" value={tenderData.contactPhone} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="lg:col-span-1 p-6">
              <SectionTitle title="Quick Actions" subtitle="Downloads and management" />
              <div className="mt-5 space-y-3">
                <button
                  onClick={handleDownloadAll}
                  className="w-full px-4 py-3 rounded-2xl font-semibold text-white shadow-sm active:scale-[0.99] transition inline-flex items-center justify-center gap-2"
                  style={{ backgroundColor: "var(--secondary-blue)" }}
                >
                  <span>📥</span> Download All Documents
                </button>

                <Link to={`/hod-dashboard/tender/edit/${tenderData.id}`}>
                  <button
                    className="w-full px-4 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition inline-flex items-center justify-center gap-2"
                    style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                  >
                    <span>✏️</span> Edit Tender
                  </button>
                </Link>

                <button
                  className="w-full px-4 py-3 rounded-2xl font-semibold border bg-white hover:bg-red-50 active:scale-[0.99] transition inline-flex items-center justify-center gap-2"
                  style={{ borderColor: "rgba(237,50,55,0.45)", color: "var(--accent-red)" }}
                >
                  <span>📧</span> Share Tender
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200/70">
                <h3 className="text-sm font-extrabold mb-4" style={{ color: "var(--primary-blue)" }}>
                  Document Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <Row label="Total Documents" value={`${docStats.totalDocs}`} strong />
                  <Row label="Total Size" value={docStats.totalSize} strong />
                  <Row label="Total Pages" value={`${docStats.totalPages} pages`} strong />
                </div>
              </div>
            </Card>
          </div>
        ) : activeTab === "documents" ? (
          <Card className="p-6">
            <SectionTitle
              title="Tender Documents"
              subtitle="Download or preview tender files"
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

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tenderData.documents.map((doc) => (
                <div key={doc.id} className="p-4 rounded-2xl border border-gray-200/70 bg-white hover:shadow-sm transition">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">📄</div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-extrabold text-sm text-gray-900 truncate">{doc.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {doc.size} <span className="text-gray-300">•</span> {doc.pages} pages
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Uploaded: {doc.uploadedAt}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleDownload(doc)}
                      className="flex-1 px-3 py-2 rounded-2xl text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      Download
                    </button>
                    <button
                      className="flex-1 px-3 py-2 rounded-2xl text-xs font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card className="p-6">
            <SectionTitle title="Tender Requirements" subtitle="Qualification checklist for bidders" />
            <div className="mt-6 space-y-3">
              {tenderData.requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 border border-transparent">
                  <span className="mt-0.5">✅</span>
                  <span className="text-sm text-gray-700">{req}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl border border-gray-200/70 bg-blue-50/60">
              <h3 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                Submission Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span> All documents must be submitted before the closing date
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span> Submissions should be sent via email to procurement@calaya.com
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span> Include tender reference number in the subject line
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span> Late submissions will not be accepted
                </li>
              </ul>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}