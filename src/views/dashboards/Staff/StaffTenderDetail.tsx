"use client";

// pages/dashboards/Staff/StaffTenderDetail.jsx
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";
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

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white`;

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
  iso ? new Date(iso).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" }) : "Not set";

const fmtDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    hour12: true
  }) : "Not set";

export default function StaffTenderDetail() {
  const params = useParams() || {};
  const tenderId = params.tenderId;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenderId) return;
    async function getTender() {
      try {
        const res = await fetchWithAuth(`/api/tenders/${tenderId}`);
        if (res.ok) {
          const data = await res.json();
          setTender(data);
        } else {
          toast.error("Tender not found");
        }
      } catch (err) {
        console.error("Failed to fetch tender:", err);
      } finally {
        setLoading(false);
      }
    }
    getTender();
  }, [tenderId]);

  const daysRemaining = useMemo(() => {
    if (!tender) return 0;
    const now = new Date();
    const deadline = new Date(tender.closingDate);
    const diffTime = deadline - now;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, [tender]);

  const docStats = useMemo(() => {
    if (!tender || !tender.documents) return { totalDocs: 0, totalPages: 0, totalSize: "0 MB" };
    const totalDocs = tender.documents.length;
    const totalPages = tender.documents.reduce((sum, d) => sum + (Number(d.pages) || 0), 0);
    const totalSize = tender.documents.reduce((sum, d) => sum + parseFloat(d.size || 0), 0).toFixed(1);
    return { totalDocs, totalPages, totalSize: `${totalSize} MB` };
  }, [tender]);

  const handleDownload = (doc) => toast.info(`Downloading ${doc.name} (${doc.size})`);
  const handleDownloadAll = () => toast.info("Downloading all tender documents as ZIP file");

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
              onClick={() => router.push("/staff-dashboard/tenders")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800 mb-4"
            >
              ← Back to Tenders
            </button>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>📄 Tender</Pill>
                  <Pill tone={statusTone(tender?.status)}>{tender?.status}</Pill>
                  <Pill tone={departmentTone(tender?.department)}>{tender?.department}</Pill>
                  {tender?.status === "OPEN" && (
                    <Pill tone={daysTone(daysRemaining)}>{daysRemaining} days remaining</Pill>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight truncate" style={{ color: "var(--primary-blue)" }}>
                  {tender?.title}
                </h1>

                <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
                  <span className="font-semibold">Ref:</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/70 border border-gray-200">{tender?.referenceNo}</span>
                  <span className="text-gray-400">•</span>
                  <span>{tender?.category}</span>
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
                  onClick={() => toast.info("Tender information shared")}
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
                    <span className="font-semibold">{fmtDate(tender?.closingDate)}</span> <span className="text-gray-400">•</span>{" "}
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
                { id: "documents", label: `Documents (${tender?.documents?.length || 0})` },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`pb-4 text-sm font-semibold transition ${activeTab === t.id ? "text-blue-700" : "text-gray-500 hover:text-gray-700"
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

        {loading ? (
          <Card className="p-12 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-semibold tracking-wide">Loading tender details...</p>
          </Card>
        ) : !tender ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500 font-semibold tracking-wide">Tender not found.</p>
            <button
              onClick={() => router.push("/staff-dashboard/tenders")}
              className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Back to Tenders
            </button>
          </Card>
        ) : (
          /* CONTENT */
          activeTab === "details" ? (
            /* ... details content ... */
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
                {(tender.requirements || []).map((req, index) => (
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
                subtitle={`${tender.documents?.length || 0} files available`}
                action={
                  <button
                    onClick={handleDownloadAll}
                    className="px-5 py-2.5 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)" }}
                  >
                    Download All (ZIP)
                  </button>
                }
              />

              <div className="mt-6 grid grid-cols-1 gap-3">
                {(tender.documents || []).map((doc) => (
                  <div key={doc.id} className="p-4 rounded-2xl border border-gray-200/70 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">📄</div>
                        <div>
                          <p className="font-extrabold text-gray-900">{doc.name || doc.title}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                            <span>Uploaded by: {doc.uploadedBy || doc.uploadedByRole}</span>
                            <span>•</span>
                            <span>{fmtDate(doc.date || doc.uploadedAt)}</span>
                            <span>•</span>
                            <span>{doc.size || doc.fileSize}</span>
                            <span>•</span>
                            <span>{doc.pages || "—"} pages</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="px-4 py-2 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )
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