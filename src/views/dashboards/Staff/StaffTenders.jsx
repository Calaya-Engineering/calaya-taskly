"use client";

// pages/dashboards/Staff/StaffTenders.jsx
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
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
    views: 124
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
    views: 89
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
    views: 156
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
    views: 203
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
    views: 112
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
    views: 98
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
    views: 145
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
  };
  return tones[dept] || "default";
};

const daysLeftTone = (days) => {
  if (days <= 3) return "danger";
  if (days <= 7) return "warn";
  return "success";
};

const clamp = (s = "", max = 150) => (s.length > max ? s.slice(0, max).trim() + "…" : s);

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not set";

export default function StaffTenders() {
  const router = useRouter();
  const [filter, setFilter] = useState("open");
  const [search, setSearch] = useState("");

  const getDaysRemaining = (closingDate) => {
    const now = new Date();
    const deadline = new Date(closingDate);
    const diffTime = deadline - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredTenders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tendersData.filter((tender) => {
      if (filter === "open" && tender.status !== "OPEN") return false;
      if (filter === "closed" && tender.status === "OPEN") return false;
      
      if (query) {
        const hit =
          tender.title.toLowerCase().includes(query) ||
          tender.referenceNo.toLowerCase().includes(query) ||
          tender.department.toLowerCase().includes(query) ||
          tender.category.toLowerCase().includes(query);
        if (!hit) return false;
      }
      return true;
    });
  }, [filter, search]);

  const openTenders = useMemo(() => tendersData.filter(t => t.status === "OPEN"), []);
  const closingSoonCount = useMemo(() => 
    tendersData.filter(t => {
      const days = getDaysRemaining(t.closingDate);
      return t.status === "OPEN" && days <= 7;
    }).length, []);

  const totals = useMemo(() => {
    const totalTenders = tendersData.length;
    const totalDocs = tendersData.reduce((sum, t) => sum + (Number(t.documents) || 0), 0);
    const totalDownloads = tendersData.reduce((sum, t) => sum + (Number(t.downloads) || 0), 0);
    return { totalTenders, totalDocs, totalDownloads };
  }, []);

  const handleDownload = (tender, e) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info(`Downloading tender documents for: ${tender.title}`);
  };

  const clearFilters = () => {
    setFilter("open");
    setSearch("");
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
                  <Pill>📄 Tenders</Pill>
                  <Pill tone="success">{openTenders.length} Open</Pill>
                  <Pill tone="warn">{closingSoonCount} Closing Soon</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Company Tenders
                </h1>
                <p className="text-gray-600 mt-2">View all company tender documents and procurement opportunities.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={clearFilters}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                >
                  Clear Filters
                </button>
                <Link href="/staff-dashboard">
                  <button
                    className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                  >
                    Back to Dashboard
                  </button>
                </Link>
              </div>
            </div>

            {/* Search + filters */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, reference, department..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                <span className="absolute left-4 top-3.5 text-gray-400">🔎</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("open")}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    filter === "open" ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  style={{
                    borderColor: filter === "open" ? "var(--primary-blue)" : "#e5e7eb",
                    color: filter === "open" ? "var(--primary-blue)" : "#374151",
                  }}
                >
                  Open ({openTenders.length})
                </button>
                <button
                  onClick={() => setFilter("closed")}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    filter === "closed" ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  style={{
                    borderColor: filter === "closed" ? "var(--accent-red)" : "#e5e7eb",
                    color: filter === "closed" ? "var(--accent-red)" : "#374151",
                  }}
                >
                  Closed/Awarded ({tendersData.filter(t => t.status !== "OPEN").length})
                </button>
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
                    filter === "all" ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  style={{
                    borderColor: filter === "all" ? "var(--secondary-blue)" : "#e5e7eb",
                    color: filter === "all" ? "var(--secondary-blue)" : "#374151",
                  }}
                >
                  All ({tendersData.length})
                </button>
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
            <p className="text-xs text-gray-500 font-semibold">Closing Soon</p>
            <p className="text-3xl font-extrabold mt-2 text-red-600">{closingSoonCount}</p>
            <p className="text-sm text-gray-500 mt-1">Within 7 days</p>
          </Card>

          <Card className="p-6">
            <p className="text-xs text-gray-500 font-semibold">Total Documents</p>
            <p className="text-3xl font-extrabold mt-2 text-purple-600">{totals.totalDocs}</p>
            <p className="text-sm text-gray-500 mt-1">Across all tenders</p>
          </Card>
        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredTenders.map((t) => {
            const days = getDaysRemaining(t.closingDate);
            const isUrgent = days <= 7 && t.status === "OPEN";

            return (
              <div
                key={t.id}
                className="p-5 rounded-2xl border border-gray-200/70 transition bg-white cursor-pointer"
                onClick={() => router.push(`/staff-dashboard/tender/${t.id}`)}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Pill tone={statusTone(t.status)}>{t.status}</Pill>
                      <Pill tone={departmentTone(t.department)}>{t.department}</Pill>
                      <Pill tone="default">{t.referenceNo}</Pill>
                      {t.status === "OPEN" && isUrgent && (
                        <Pill tone="danger">⏰ {days} days left</Pill>
                      )}
                    </div>

                    <h3 className="text-base font-extrabold text-gray-900 truncate" style={{ color: "var(--primary-blue)" }}>
                      {t.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-3">{clamp(t.description, 140)}</p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
                    <p className="text-xs text-gray-500 font-semibold">Category</p>
                    <p className="font-bold text-gray-900 mt-1">{t.category}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
                    <p className="text-xs text-gray-500 font-semibold">Issued</p>
                    <p className="font-bold text-gray-900 mt-1">{fmtDate(t.issuedDate)}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
                    <p className="text-xs text-gray-500 font-semibold">Closing</p>
                    <p className="font-bold text-gray-900 mt-1">{fmtDate(t.closingDate)}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
                    <p className="text-xs text-gray-500 font-semibold">Documents</p>
                    <p className="font-bold text-gray-900 mt-1">{t.documents} files</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-gray-200/70">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                    <span>📦 {t.fileSize}</span>
                    <span className="text-gray-300">•</span>
                    <span>⬇️ {t.downloads} downloads</span>
                    <span className="text-gray-300">•</span>
                    <span>👁️ {t.views} views</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleDownload(t, e)}
                      className="px-4 py-2 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      Download Docs
                    </button>
                    <Link
                      href={`/staff-dashboard/tender/${t.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200/70 flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: "var(--primary-blue)" }}>
                    Uploaded by: {t.uploadedBy}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTenders.length === 0 && (
          <Card className="p-10 text-center">
            <div className="text-4xl mb-3">📄</div>
            <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
              No tenders found
            </div>
            <div className="text-sm text-gray-500 mt-1">Try adjusting your filters or search term.</div>
          </Card>
        )}

        {/* Tender Information for Staff */}
        <Card className="p-6 bg-blue-50/30">
          <SectionTitle title="ℹ️ Tender Information for Staff" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "All staff can view company tenders for transparency",
              "Download tender documents for reference",
              "Contact Procurement Department for tender inquiries",
              "Tender deadlines are strictly enforced",
              "Refer interested vendors to procurement@calaya.com",
            ].map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <span style={{ color: "var(--primary-blue)" }}>•</span>
                <span className="text-sm text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}