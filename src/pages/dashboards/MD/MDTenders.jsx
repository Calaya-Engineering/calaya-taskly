// pages/dashboards/MD/MDTenders.jsx
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const MDMenuItems = [
  { label: "Dashboard", path: "/md-dashboard", icon: <DashboardIcon /> },
  { label: "Tasks (All)", path: "/md-dashboard/tasks", icon: <TaskIcon />, badge: "24" },
  { label: "Active Jobs", path: "/md-dashboard/jobs", icon: <TaskIcon />, badge: "8" },
  { label: "Documents", path: "/md-dashboard/documents", icon: <DocumentIcon />, badge: "3" },
  { label: "Daily Reports", path: "/md-dashboard/reports", icon: <ReportIcon /> },
  { label: "Meetings/Events", path: "/md-dashboard/events", icon: <CalendarIcon />, badge: "2" },
  { label: "Tenders", path: "/md-dashboard/tenders", icon: <DocumentIcon /> },
  { label: "Tender Documents", path: "/md-dashboard/tender-documents", icon: <TenderIcon /> },
  { label: "Announcements", path: "/md-dashboard/announcements", icon: <AnnouncementIcon /> },
  { label: "Approvals", path: "/md-dashboard/approvals", icon: <ApprovalIcon />, badge: "7" },
  { label: "Escalations/Overdue", path: "/md-dashboard/escalations", icon: <AlertIcon />, badge: "3" },
  { label: "Notifications", path: "/md-dashboard/notifications", icon: <BellIcon />, badge: "12" },
  { label: "Profile", path: "/md-dashboard/profile", icon: <UserIcon /> },
];

const tendersData = [
  {
    id: "TEN-001",
    title: "Supply of Pipeline Inspection Equipment",
    referenceNo: "CAL/PROC/2024/001",
    description:
      "Supply of pipeline inspection equipment and tools for Site A project including ultrasonic testing devices, corrosion monitoring equipment, and safety gear.",
    issuedDate: "2024-12-01",
    closingDate: "2024-12-20",
    department: "Procurement",
    category: "Equipment Supply",
    documents: 3,
    fileSize: "4.2 MB",
    downloads: 24,
    status: "OPEN",
  },
  {
    id: "TEN-002",
    title: "Annual Safety Training Services",
    referenceNo: "CAL/HSE/2024/002",
    description:
      "Provision of annual safety training and certification services for all company staff including offshore and onshore personnel.",
    issuedDate: "2024-12-02",
    closingDate: "2024-12-22",
    department: "HSE",
    category: "Training Services",
    documents: 2,
    fileSize: "2.8 MB",
    downloads: 18,
    status: "OPEN",
  },
  {
    id: "TEN-003",
    title: "IT Infrastructure Upgrade",
    referenceNo: "CAL/TECH/2024/003",
    description:
      "Upgrade of company-wide IT infrastructure including network systems, servers, and cybersecurity solutions.",
    issuedDate: "2024-12-03",
    closingDate: "2024-12-25",
    department: "Technical",
    category: "IT Services",
    documents: 4,
    fileSize: "6.5 MB",
    downloads: 32,
    status: "OPEN",
  },
  {
    id: "TEN-004",
    title: "Workshop Equipment Maintenance",
    referenceNo: "CAL/WORK/2024/004",
    description:
      "Annual maintenance contract for workshop machinery and equipment including lathes, milling machines, and fabrication tools.",
    issuedDate: "2024-12-04",
    closingDate: "2024-12-18",
    department: "Workshop",
    category: "Maintenance Services",
    documents: 3,
    fileSize: "3.1 MB",
    downloads: 15,
    status: "OPEN",
  },
  {
    id: "TEN-005",
    title: "Vehicle Fleet Maintenance",
    referenceNo: "CAL/LOG/2024/005",
    description:
      "Maintenance and servicing contract for company vehicle fleet including cars, trucks, and specialized transport vehicles.",
    issuedDate: "2024-12-05",
    closingDate: "2024-12-15",
    department: "Logistics",
    category: "Maintenance Services",
    documents: 5,
    fileSize: "5.3 MB",
    downloads: 28,
    status: "CLOSED",
  },
  {
    id: "TEN-006",
    title: "Legal Advisory Services",
    referenceNo: "CAL/LEG/2024/006",
    description:
      "Retainer for legal advisory and compliance services covering corporate, commercial, and regulatory matters.",
    issuedDate: "2024-12-06",
    closingDate: "2024-12-10",
    department: "Legal",
    category: "Professional Services",
    documents: 6,
    fileSize: "7.2 MB",
    downloads: 42,
    status: "AWARDED",
  },
];

/* ---------- UI helpers to match your MD dashboards ---------- */
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
      : "bg-blue-50 text-blue-700 ring-blue-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

const SectionTitle = ({ title, subtitle, right }) => (
  <div className="flex items-start justify-between gap-3">
    <div>
      <h2 className="text-lg md:text-xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
        {title}
      </h2>
      {subtitle ? <p className="text-sm text-gray-500 mt-1">{subtitle}</p> : null}
    </div>
    {right}
  </div>
);

const statusTone = (status) => {
  if (status === "OPEN") return "success";
  if (status === "CLOSED") return "warn";
  if (status === "AWARDED") return "default";
  return "default";
};

const daysLeftTone = (days) => {
  if (days <= 3) return "danger";
  if (days <= 7) return "warn";
  return "success";
};

const clamp = (s = "", max = 150) => (s.length > max ? s.slice(0, max).trim() + "…" : s);

export default function MDTenders() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("all");
  const [department, setDepartment] = useState("all");
  const [q, setQ] = useState("");

  const departments = useMemo(() => ["all", ...Array.from(new Set(tendersData.map((t) => t.department)))], []);
  const openTenders = useMemo(() => tendersData.filter((t) => t.status === "OPEN"), []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return tendersData.filter((t) => {
      if (status !== "all" && t.status !== status) return false;
      if (department !== "all" && t.department !== department) return false;
      if (term) {
        const hit =
          t.title.toLowerCase().includes(term) ||
          t.referenceNo.toLowerCase().includes(term) ||
          t.category.toLowerCase().includes(term) ||
          t.department.toLowerCase().includes(term);
        if (!hit) return false;
      }
      return true;
    });
  }, [status, department, q]);

  const getDaysRemaining = (closingDate) => {
    const now = new Date();
    const deadline = new Date(closingDate);
    const diffTime = deadline - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const totals = useMemo(() => {
    const totalTenders = tendersData.length;
    const totalDocs = tendersData.reduce((sum, t) => sum + (Number(t.documents) || 0), 0);
    const totalDownloads = tendersData.reduce((sum, t) => sum + (Number(t.downloads) || 0), 0);
    const awarded = tendersData.filter((t) => t.status === "AWARDED").length;
    return { totalTenders, totalDocs, totalDownloads, awarded };
  }, []);

  const handleDownload = (tender) => {
    alert(`Downloading tender documents for: ${tender.title}`);
  };

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
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
                  <Pill>📄 Tenders</Pill>
                  <Pill tone="success">{openTenders.length} Open</Pill>
                  <Pill tone="default">{totals.awarded} Awarded</Pill>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Company Tenders
                </h1>
                <p className="text-gray-600 mt-2">Create, review, and track all tender opportunities and documents.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Link to="/md-dashboard/tenders/create">
                  <button
                    className="px-5 py-3 rounded-2xl font-semibold text-white shadow-sm active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)" }}
                  >
                    + Create New Tender
                  </button>
                </Link>

                <Link to="/md-dashboard/tender-documents">
                  <button
                    className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                  >
                    Review Submissions
                  </button>
                </Link>
              </div>
            </div>

            {/* Search + filters */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-1">
                <div className="relative">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search title, reference, category, department..."
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <span className="absolute left-4 top-3.5 text-gray-400">🔎</span>
                </div>
              </div>

              <div>
                <select
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="OPEN">Open</option>
                  <option value="CLOSED">Closed</option>
                  <option value="AWARDED">Awarded</option>
                </select>
              </div>

              <div>
                <select
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d === "all" ? "All Departments" : d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <p className="text-xs text-gray-500 font-semibold">Total Tenders</p>
            <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
              {totals.totalTenders}
            </p>
            <p className="text-sm text-gray-500 mt-1">All tenders created</p>
          </Card>

          <Card className="p-6">
            <p className="text-xs text-gray-500 font-semibold">Open Tenders</p>
            <p className="text-3xl font-extrabold mt-2 text-emerald-600">{openTenders.length}</p>
            <p className="text-sm text-gray-500 mt-1">Currently accepting bids</p>
          </Card>

          <Card className="p-6">
            <p className="text-xs text-gray-500 font-semibold">Total Documents</p>
            <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--secondary-blue)" }}>
              {totals.totalDocs}
            </p>
            <p className="text-sm text-gray-500 mt-1">Across all tenders</p>
          </Card>

          <Card className="p-6">
            <p className="text-xs text-gray-500 font-semibold">Total Downloads</p>
            <p className="text-3xl font-extrabold mt-2 text-purple-600">{totals.totalDownloads}</p>
            <p className="text-sm text-gray-500 mt-1">Document downloads</p>
          </Card>
        </div>

        {/* LIST */}
        <Card className="p-6">
          <SectionTitle
            title="Tender List"
            subtitle={`${filtered.length} result(s)`}
            right={
              <button
                onClick={() => {
                  setStatus("all");
                  setDepartment("all");
                  setQ("");
                }}
                className="px-4 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                style={{ borderColor: "rgba(44,75,155,0.25)", color: "var(--primary-blue)" }}
              >
                Reset
              </button>
            }
          />

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((t) => {
              const days = getDaysRemaining(t.closingDate);

              return (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl border border-gray-200/70 hover:shadow-sm transition bg-white cursor-pointer"
                  onClick={() => navigate(`/md-dashboard/tender/${t.id}`)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Pill tone={statusTone(t.status)}>{t.status}</Pill>
                        {t.status === "OPEN" ? <Pill tone={daysLeftTone(days)}>{days} days left</Pill> : null}
                      </div>

                      <h3 className="text-base font-extrabold text-gray-900 truncate" style={{ color: "var(--primary-blue)" }}>
                        {t.title}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">{t.referenceNo}</p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDownload(t);
                      }}
                      className="px-4 py-2 rounded-2xl text-sm font-semibold text-white shadow-sm active:scale-[0.99] transition shrink-0"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      Download
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mt-3">{clamp(t.description, 160)}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
                      <p className="text-xs text-gray-500 font-semibold">Category</p>
                      <p className="font-bold text-gray-900 mt-1">{t.category}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
                      <p className="text-xs text-gray-500 font-semibold">Department</p>
                      <p className="font-bold text-gray-900 mt-1">{t.department}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
                      <p className="text-xs text-gray-500 font-semibold">Issued</p>
                      <p className="font-bold text-gray-900 mt-1">{t.issuedDate}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
                      <p className="text-xs text-gray-500 font-semibold">Closing</p>
                      <p className="font-bold text-gray-900 mt-1">{t.closingDate}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-gray-200/70">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                      <span>📄 {t.documents} docs</span>
                      <span className="text-gray-300">•</span>
                      <span>📦 {t.fileSize}</span>
                      <span className="text-gray-300">•</span>
                      <span>⬇️ {t.downloads} downloads</span>
                    </div>

                    <Link
                      to={`/md-dashboard/tender/${t.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm font-semibold hover:underline"
                      style={{ color: "var(--primary-blue)" }}
                    >
                      Open Tender →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-5xl mb-3 text-gray-300">📄</div>
              <p className="font-extrabold text-gray-900">No tenders found</p>
              <p className="text-gray-500 mt-1">Try changing filters or search keyword.</p>
            </div>
          ) : null}
        </Card>
      </div>
    </Layout>
  );
}
