"use client";

// pages/dashboards/HOD/HODTenders.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { DocumentIcon } from "@/lib/icons";
import { HODMenuItems } from "@/utils/menus";
import { DownloadIcon, DeleteIcon, EditIcon } from "@/lib/icons";
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

const daysLeftTone = (days) => {
  if (days <= 3) return "danger";
  if (days <= 7) return "warn";
  return "success";
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
    Procurement: "info",
    HR: "success",
  };
  return tones[dept] || "default";
};

const clamp = (s = "", max = 150) => (s.length > max ? s.slice(0, max).trim() + "…" : s);



export default function HODTenders() {
  const router = useRouter();
  const [status, setStatus] = useState("all");
  const [department, setDepartment] = useState("all");
  const [q, setQ] = useState("");
  const [tendersData, setTendersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTenders = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/tenders");
      if (res.ok) {
        const data = await res.json();
        setTendersData(data);
      }
    } catch (err) {
      console.error("Failed to fetch tenders:", err);
      toast.error("Failed to load tenders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { getTenders(); }, [getTenders]);

  // Real-time: re-fetch on task/tender events
  useSSE("/api/tasks/events", (ev) => {
    if (ev.type?.startsWith("task:")) getTenders();
  });

  const departments = useMemo(() => ["all", ...Array.from(new Set(tendersData.map((t) => t.department)))], [tendersData]);
  const openTenders = useMemo(() => tendersData.filter((t) => t.status === "OPEN"), [tendersData]);
  const myDeptTenders = useMemo(() =>
    tendersData.filter((t) => ["Technical", "Workshop", "HSE"].includes(t.department)),
    [tendersData]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return tendersData.filter((t) => {
      if (status !== "all" && t.status !== status) return false;
      if (department !== "all" && t.department !== department) return false;
      if (term) {
        const hit =
          t.title.toLowerCase().includes(term) ||
          (t.referenceNo || "").toLowerCase().includes(term) ||
          (t.category || "").toLowerCase().includes(term) ||
          t.department.toLowerCase().includes(term);
        if (!hit) return false;
      }
      return true;
    });
  }, [status, department, q, tendersData]);

  const getDaysRemaining = (closingDate) => {
    const now = new Date();
    const deadline = new Date(closingDate);
    const diffTime = deadline - now;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const totals = useMemo(() => {
    const totalTenders = tendersData.length;
    const totalDocs = tendersData.reduce((sum, t) => sum + (Number(t.documents) || 0), 0);
    const totalDownloads = tendersData.reduce((sum, t) => sum + (Number(t.downloads) || 0), 0);
    const awarded = tendersData.filter((t) => t.status === "AWARDED").length;
    return { totalTenders, totalDocs, totalDownloads, awarded };
  }, [tendersData]);

  const handleDelete = async (tender, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete tender ${tender.referenceNo}?`)) {
      try {
        const res = await fetchWithAuth(`/api/tenders/${tender.dbId}`, { method: "DELETE" });
        if (res.ok) {
          toast.success("Tender deleted successfully");
          setTendersData(tendersData.filter((t) => t.dbId !== tender.dbId));
        } else {
          toast.error("Failed to delete tender");
        }
      } catch (err) {
        toast.error("Error deleting tender");
      }
    }
  };

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
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill><span className="inline-flex items-center gap-1.5"><DocumentIcon /> Tenders</span></Pill>
                  <Pill tone="success">{openTenders.length} Open</Pill>
                  <Pill tone="info">{myDeptTenders.length} In Your Depts</Pill>
                  <Pill tone="purple">{totals.awarded} Awarded</Pill>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Department Tenders
                </h1>
                <p className="text-gray-600 mt-2">View, create and manage tenders across all departments.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Link href="/hod-dashboard/tenders/create">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)" }}
                  >
                    + Create New Tender
                  </button>
                </Link>

                <Link href="/hod-dashboard/tender-documents">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
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
                    placeholder="Search title, reference, category..."
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
            <p className="text-xs text-gray-500 font-semibold">Your Dept Tenders</p>
            <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--secondary-blue)" }}>
              {myDeptTenders.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Technical, Workshop, HSE</p>
          </Card>

          <Card className="p-6">
            <p className="text-xs text-gray-500 font-semibold">Total Documents</p>
            <p className="text-3xl font-extrabold mt-2 text-purple-600">{totals.totalDocs}</p>
            <p className="text-sm text-gray-500 mt-1">Across all tenders</p>
          </Card>
        </div>

        {/* LIST */}
        <Card className="p-6">
          <SectionTitle
            title="Tender List"
            subtitle={`${filtered.length} result(s)`}
            action={
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
            {loading ? (
              <div className="lg:col-span-2 py-20 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-semibold tracking-wide">Loading real-time tender data...</p>
              </div>
            ) : filtered.map((t) => {
              const days = getDaysRemaining(t.closingDate);
              const isMyDept = ["Technical", "Workshop", "HSE"].includes(t.department);

              return (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl border border-gray-200/70 transition bg-white cursor-pointer relative"
                  onClick={() => router.push(`/hod-dashboard/tender/${t.id}`)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Pill tone={statusTone(t.status)}>{t.status}</Pill>
                        {t.status === "OPEN" ? <Pill tone={daysLeftTone(days)}>{days} days left</Pill> : null}
                        <Pill tone={departmentTone(t.department)}>{t.department}</Pill>
                        {isMyDept && <Pill tone="info">📌 Your Dept</Pill>}
                      </div>

                      <h3 className="text-base font-extrabold text-gray-900 truncate" style={{ color: "var(--primary-blue)" }}>
                        {t.title}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">{t.referenceNo}</p>
                      <p className="text-xs text-gray-400 mt-1">Created by: {t.createdBy}</p>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      <Link href={`/hod-dashboard/tender/edit/${t.id}`} onClick={(e) => e.stopPropagation()}>
                        <button
                          className="p-2 rounded-xl hover:bg-gray-100 transition [&_svg]:w-5 [&_svg]:h-5"
                          style={{ color: "var(--primary-blue)" }}
                        >
                          <EditIcon />
                        </button>
                      </Link>
                      <button
                        onClick={(e) => handleDelete(t, e)}
                        className="p-2 rounded-xl hover:bg-red-50 transition [&_svg]:w-5 [&_svg]:h-5"
                        style={{ color: "var(--accent-red)" }}
                      >
                        <DeleteIcon />
                      </button>
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
                      <p className="font-bold text-gray-900 mt-1">{t.issuedDate}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
                      <p className="text-xs text-gray-500 font-semibold">Closing</p>
                      <p className="font-bold text-gray-900 mt-1">{t.closingDate}</p>
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
                      <span className="inline-flex items-center gap-1 [&_svg]:w-4 [&_svg]:h-4"><DownloadIcon /> {t.downloads} downloads</span>
                    </div>

                    <Link
                      href={`/hod-dashboard/tender/${t.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm font-semibold hover:underline"
                      style={{ color: "var(--primary-blue)" }}
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <div className="flex justify-center mb-3 [&_svg]:w-14 [&_svg]:h-14 text-gray-300"><DocumentIcon /></div>
              <p className="font-extrabold text-gray-900">No tenders found</p>
              <p className="text-gray-500 mt-1">Try changing filters or create a new tender.</p>
            </div>
          ) : null}
        </Card>
      </div>
    </Layout>
  );
}