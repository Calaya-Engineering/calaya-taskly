"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

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
            : "bg-blue-50 text-blue-700 ring-blue-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

const SectionTitle = ({ title, subtitle, right }) => (
  <div className="flex items-start justify-between gap-3">
    <div>
      <h2 className="text-lg md:text-xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
        {renderNodeWithIcons(title)}
      </h2>
      {subtitle ? <p className="text-sm text-gray-500 mt-1">{subtitle}</p> : null}
    </div>
    {right}
  </div>
);

const statusTone = (status) => {
  if (status === "OPEN") return "success";
  if (status === "CLOSED") return "warn";
  if (status === "AWARDED") return "purple";
  return "default";
};

const daysTone = (days) => {
  if (days <= 3) return "danger";
  if (days <= 7) return "warn";
  return "success";
};

const Row = ({ label, value, strong = false }) => (
  <div className="flex items-start justify-between gap-4">
    <span className="text-gray-600 text-sm">{label}</span>
    <span className={`${strong ? "font-extrabold" : "font-semibold"} text-gray-900 text-right text-sm`}>{value || "—"}</span>
  </div>
);

export default function MDTenderDetail() {
  const params = useParams() || {};
  const tenderId = params.tenderId;
  const router = useRouter();
  const [tenderData, setTenderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenderId) return;

    let cancelled = false;

    async function getTender() {
      try {
        const res = await fetchWithAuth(`/api/tenders/${tenderId}`);
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(data?.error || "Tender not found");
        }
        if (!cancelled) {
          setTenderData(data);
        }
      } catch (err) {
        console.error("Failed to fetch tender:", err);
        if (!cancelled) {
          toast.error(err instanceof Error ? err.message : "Failed to fetch tender");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    getTender();

    return () => {
      cancelled = true;
    };
  }, [tenderId]);

  const daysRemaining = useMemo(() => {
    if (!tenderData?.closingDate) return 0;
    const now = new Date();
    const deadline = new Date(tenderData.closingDate);
    const diffTime = deadline.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, [tenderData]);

  const handleDownload = (doc) => {
    if (!doc?.fileUrl) {
      toast.info("No file is available for this document");
      return;
    }

    const link = document.createElement("a");
    link.href = doc.fileUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = doc.name || "tender-document";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <button
              onClick={() => router.push("/md-dashboard/tenders")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800 mb-4"
            >
              ← Back to Tenders
            </button>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>Tender Detail</Pill>
                  <Pill tone={statusTone(tenderData?.status)}>{tenderData?.status || "—"}</Pill>
                  <Pill tone="blue">Company-wide</Pill>
                  {tenderData?.status === "OPEN" ? (
                    <Pill tone={daysTone(daysRemaining)}>{daysRemaining} days remaining</Pill>
                  ) : null}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight truncate" style={{ color: "var(--primary-blue)" }}>
                  {tenderData?.title || "Tender"}
                </h1>

                <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
                  <span className="font-semibold">Ref:</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/70 border border-gray-200">{tenderData?.referenceNo || "—"}</span>
                </div>
              </div>

              {tenderData ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link href={`/md-dashboard/tender/edit/${tenderData.dbId}`}>
                    <button
                      className="px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      Edit Tender
                    </button>
                  </Link>

                  <Link href={`/md-dashboard/tender-documents/${tenderData.dbId}`}>
                    <button
                      className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                    >
                      Manage Documents
                    </button>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </Card>

        {loading ? (
          <Card className="p-12 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-semibold">Loading tender details...</p>
          </Card>
        ) : !tenderData ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500 font-semibold">Tender not found.</p>
            <button
              onClick={() => router.push("/md-dashboard/tenders")}
              className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Back to Tenders
            </button>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 p-6">
                <SectionTitle
                  title="Tender Information"
                  subtitle="Current tender overview and timing"
                />

                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{tenderData.description || "No description provided."}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
                    <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Key Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <Row label="Status" value={tenderData.status} />
                      <Row label="Issued Date" value={tenderData.issuedDate} />
                      <Row label="Closing Date" value={tenderData.closingDate} />
                      <Row label="Created By" value={tenderData.createdBy} />
                      <Row label="Created On" value={tenderData.createdAt} />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="lg:col-span-1 p-6">
                <SectionTitle title="Summary" subtitle="Quick tender snapshot" />
                <div className="mt-5 space-y-3">
                  <div className="p-4 rounded-2xl border border-gray-200/70 bg-gray-50">
                    <p className="text-xs text-gray-500 mb-1">Document Count</p>
                    <p className="text-2xl font-extrabold text-gray-900">{tenderData.documents?.length || 0}</p>
                  </div>
                  <div className="p-4 rounded-2xl border border-gray-200/70 bg-gray-50">
                    <p className="text-xs text-gray-500 mb-1">Visibility</p>
                    <p className="text-2xl font-extrabold text-gray-900">Company-wide</p>
                  </div>
                  <div className="p-4 rounded-2xl border border-gray-200/70 bg-gray-50">
                    <p className="text-xs text-gray-500 mb-1">Deadline</p>
                    <p className="text-2xl font-extrabold text-gray-900">{daysRemaining} day{daysRemaining === 1 ? "" : "s"}</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <SectionTitle
                title="Tender Documents"
                subtitle="Documents currently attached to this tender"
                right={
                  tenderData.documents?.length ? (
                    <Link href={`/md-dashboard/tender-documents/${tenderData.dbId}`} className="text-sm font-semibold hover:underline" style={{ color: "var(--primary-blue)" }}>
                      Open document manager
                    </Link>
                  ) : null
                }
              />

              {tenderData.documents?.length ? (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tenderData.documents.map((doc) => (
                    <div key={doc.id} className="p-4 rounded-2xl border border-gray-200/70 bg-white transition">
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">📄</div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-extrabold text-sm text-gray-900 truncate">{doc.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{doc.size}</p>
                          <p className="text-xs text-gray-400 mt-1">Uploaded: {doc.uploadedAt}</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={() => handleDownload(doc)}
                          className="w-full px-3 py-2 rounded-2xl text-xs font-semibold text-white active:scale-[0.99] transition"
                          style={{ backgroundColor: "var(--secondary-blue)" }}
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-gray-200/70 p-8 text-center text-gray-500">
                  No documents have been attached to this tender yet.
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
}
