"use client";

// pages/dashboards/HOD/HODTenderDetail.jsx
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
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
  const params = useParams() || {};
  const tenderId = params.tenderId;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [tenderData, setTenderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenderId) return;
    async function getTender() {
      try {
        const res = await fetchWithAuth(`/api/tenders/${tenderId}`);
        if (res.ok) {
          const data = await res.json();
          setTenderData(data);
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
    if (!tenderData) return 0;
    const now = new Date();
    const deadline = new Date(tenderData.closingDate);
    const diffTime = deadline - now;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, [tenderData]);

  const docStats = useMemo(() => {
    if (!tenderData || !tenderData.documents) return { totalDocs: 0, totalPages: 0, totalSize: "0 MB" };
    const totalDocs = tenderData.documents.length;
    const totalPages = tenderData.documents.reduce((sum, d) => sum + (Number(d.pages) || 0), 0);
    const totalSize = tenderData.documents.reduce((sum, d) => sum + parseFloat(d.size || 0), 0).toFixed(1);
    return { totalDocs, totalPages, totalSize: `${totalSize} MB` };
  }, [tenderData]);

  const isMyDept = tenderData ? ["Technical", "Workshop", "HSE"].includes(tenderData.department) : false;

  const handleDownload = (doc) => toast.info(`Downloading ${doc.name} (${doc.size})`);
  const handleDownloadAll = () => toast.info("Downloading all tender documents as ZIP file");

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
              onClick={() => router.push("/hod-dashboard/tenders")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800 mb-4"
            >
              ← Back to Tenders
            </button>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>📄 Tender</Pill>
                  <Pill tone={statusTone(tenderData?.status)}>{tenderData?.status}</Pill>
                  <Pill tone={departmentTone(tenderData?.department)}>{tenderData?.department}</Pill>
                  {isMyDept && <Pill tone="info">📌 Your Department</Pill>}
                  {tenderData?.status === "OPEN" ? (
                    <Pill tone={daysTone(daysRemaining)}>{daysRemaining} days remaining</Pill>
                  ) : null}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight truncate" style={{ color: "var(--primary-blue)" }}>
                  {tenderData?.title}
                </h1>

                <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
                  <span className="font-semibold">Ref:</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/70 border border-gray-200">{tenderData?.referenceNo}</span>
                  <span className="text-gray-400">•</span>
                  <span>{tenderData?.category}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Created by: {tenderData?.createdBy} • {tenderData?.createdAt}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Link href={`/hod-dashboard/tender/edit/${tenderData?.id}`}>
                  <button
                    className="px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    ✏️ Edit Tender
                  </button>
                </Link>

                <Link href={`/hod-dashboard/tender-documents/${tenderData?.id}`}>
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
                    <span className="font-semibold">{tenderData?.closingDate}</span> <span className="text-gray-400">•</span>{" "}
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
                { id: "documents", label: `Documents (${tenderData?.documents?.length || 0})` },
                { id: "requirements", label: "Requirements" },
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
            <p className="text-gray-500 font-semibold">Loading tender details...</p>
          </Card>
        ) : !tenderData ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500 font-semibold">Tender not found.</p>
            <button
              onClick={() => router.push("/hod-dashboard/tenders")}
              className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Back to Tenders
            </button>
          </Card>
        ) : (
          /* CONTENT (original tabs content) */
          activeTab === "details" ? (
            /* ... (keep original details content, but I'll need to wrap it correctly) */
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
                    className="w-full px-4 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition inline-flex items-center justify-center gap-2"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    <span>📥</span> Download All Documents
                  </button>

                  <Link href={`/hod-dashboard/tender/edit/${tenderData.id}`}>
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
                    className="px-5 py-2.5 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)" }}
                  >
                    Download All (ZIP)
                  </button>
                }
              />

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tenderData.documents.map((doc) => (
                  <div key={doc.id} className="p-4 rounded-2xl border border-gray-200/70 bg-white transition">
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
                        className="flex-1 px-3 py-2 rounded-2xl text-xs font-semibold text-white active:scale-[0.99] transition"
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
          )
        )}
      </div>
    </Layout>
  );
}