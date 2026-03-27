"use client";

// pages/dashboards/Staff/StaffTenders.jsx
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";
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
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

const SectionTitle = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) => (
  <div className="flex items-start justify-between gap-3">
    <div>
      <h2 className="text-lg md:text-xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
        {renderNodeWithIcons(title)}
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

const daysLeftTone = (days) => {
  if (days <= 3) return "danger";
  if (days <= 7) return "warn";
  return "success";
};

const clamp = (s = "", max = 150) => (s.length > max ? s.slice(0, max).trim() + "…" : s);
const safeLower = (value) => String(value ?? "").toLowerCase();

const fmtDate = (iso) => {
  if (!iso) return "Not set";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "Invalid Date";
  return d.toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" });
};

import DashboardSkeleton from "@/components/DashboardSkeleton";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

export default function StaffTenders() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [tendersData, setTendersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const lastRefetchRef = useRef(0);

  const fetchTenders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth(`/api/tenders?limit=100`);
      if (res.ok) {
        const data = await res.json();
        setTendersData(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch tenders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTenders();
  }, [fetchTenders]);

  useSSE("/api/realtime/events", (ev) => {
    if (!ev?.type || ev.type === "ping") return;
    if (ev.type.startsWith("tender:")) {
      const now = Date.now();
      if (now - lastRefetchRef.current < 1500) return;
      lastRefetchRef.current = now;
      fetchTenders();
    }
  });

  const getDaysRemaining = (closingDate) => {
    if (!closingDate) return 0;
    const now = new Date();
    const deadline = new Date(closingDate);
    if (isNaN(deadline.getTime())) return 0;
    const diffTime = deadline.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const filteredTenders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tendersData.filter((tender) => {
      if (filter === "open" && tender.status !== "OPEN") return false;
      if (filter === "closed" && tender.status === "OPEN") return false;

      if (query) {
        const hit =
          safeLower(tender.title).includes(query) ||
          safeLower(tender.referenceNo).includes(query) ||
          safeLower(tender.department).includes(query) ||
          safeLower(tender.category).includes(query);
        if (!hit) return false;
      }
      return true;
    });
  }, [filter, search, tendersData]);

  const openTenders = useMemo(() => tendersData.filter(t => t.status === "OPEN"), [tendersData]);
  const closingSoonCount = useMemo(() =>
    tendersData.filter(t => {
      const days = getDaysRemaining(t.closingDate);
      return t.status === "OPEN" && days <= 7;
    }).length, [tendersData]);

  const totals = useMemo(() => {
    const totalTenders = tendersData.length;
    const totalDocs = tendersData.reduce((sum, t) => sum + (Number(t.documents) || 0), 0);
    const totalDownloads = tendersData.reduce((sum, t) => sum + (Number(t.downloads) || 0), 0);
    return { totalTenders, totalDocs, totalDownloads };
  }, [tendersData]);

  const handleDownload = (tender, e) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info(`Downloading tender documents for: ${tender.title}`);
  };

  const clearFilters = () => {
    setFilter("open");
    setSearch("");
  };

  if (loading && tendersData.length === 0) {
    return (
      <Layout menuItems={StaffMenuItems} userRole="Staff">
        <DashboardSkeleton />
      </Layout>
    );
  }

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
                  <Pill>{renderNodeWithIcons("📄 Tenders")}</Pill>
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
                <span className="absolute left-4 top-3.5 text-gray-400">{renderNodeWithIcons("🔎")}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("open")}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${filter === "open" ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
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
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${filter === "closed" ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
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
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${filter === "all" ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
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
          {loading ? (
            <div className="lg:col-span-2 py-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-semibold tracking-wide">Loading real-time tender data...</p>
            </div>
          ) : filteredTenders.map((t) => {
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
                    <span>{renderNodeWithIcons("📦 ")}{t.fileSize}</span>
                    <span className="text-gray-300">•</span>
                    <span>⬇️ {t.downloads} downloads</span>
                    <span className="text-gray-300">•</span>
                    <span>{renderNodeWithIcons("👁️ ")}{t.views} views</span>
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
            <div className="text-4xl mb-3">{renderNodeWithIcons("📄")}</div>
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
