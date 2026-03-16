"use client";

// pages/dashboards/Staff/StaffDocuments.jsx
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth, getAuthToken } from "@/lib/api";
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
      {children}
    </span>
  );
};

const SectionTitle = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) => (
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


const accessTone = (access) => {
  switch (access) {
    case 'Public': return 'success';
    case 'Department': return 'info';
    case 'All Departments': return 'purple';
    default: return 'default';
  }
};

const departmentTone = (dept) => {
  const tones = {
    HSE: 'success',
    Workshop: 'warn',
    HR: 'purple',
    Technical: 'info',
    Logistics: 'default',
  };
  return tones[dept] || 'default';
};

const getFileIcon = (fileType) => {
  switch (fileType.toLowerCase()) {
    case 'pdf': return '📕';
    case 'word': return '📝';
    case 'excel': return '📊';
    case 'powerpoint': return '📽️';
    case 'image': return '🖼️';
    default: return '📄';
  }
};

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" }) : "Not set";

export default function StaffDocuments() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const [documentsData, setDocumentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const lastRefetchRef = useRef(0);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const meRes = await fetchWithAuth("/api/me");
      const me = meRes.ok ? await meRes.json() : null;
      
      const deptFilter = me?.department ? encodeURIComponent(`${me.department},All Company,Staff`) : "All Company,Staff";
      const res = await fetchWithAuth(`/api/documents?departments=${deptFilter}&limit=100`);
      if (res.ok) {
        const data = await res.json();
        setDocumentsData(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  useSSE("/api/realtime/events", (ev) => {
    if (!ev?.type || ev.type === "ping") return;
    if (ev.type.startsWith("document:")) {
      const now = Date.now();
      if (now - lastRefetchRef.current < 1500) return;
      lastRefetchRef.current = now;
      fetchDocuments();
    }
  });

  const filteredDocuments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return documentsData.filter((doc) => {
      if (filter === 'all') return true;
      if (filter === 'public') return doc.access === 'PUBLIC';
      if (filter === 'department') return doc.access === 'DEPARTMENT';
      if (filter === 'technical') return doc.department === 'Technical';
      if (filter === 'workshop') return doc.department === 'Workshop';
      return true;
    }).filter(doc => {
      if (!query) return true;
      return (doc.title || "").toLowerCase().includes(query) ||
        (doc.description || "").toLowerCase().includes(query) ||
        (doc.type || "").toLowerCase().includes(query) ||
        (doc.department || "").toLowerCase().includes(query);
    });
  }, [filter, search, documentsData]);

  const stats = useMemo(() => {
    const total = documentsData.length;
    const publicCount = documentsData.filter(d => d.access === 'PUBLIC').length;
    const departmentCount = documentsData.filter(d => d.access === 'DEPARTMENT' || d.access === 'ALL_DEPARTMENTS').length;
    const totalDownloads = documentsData.reduce((sum, d) => sum + (d.downloads || 0), 0);
    return { total, publicCount, departmentCount, totalDownloads };
  }, [documentsData]);

  const handleDownload = (doc, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!doc.id) {
      toast.info("No file available for download");
      return;
    }
    const token = getAuthToken();
    const url = `/api/documents/${doc.id}/download${token ? `?token=${token}` : ""}`;
    window.open(url, "_blank");
  };

  const clearFilters = () => {
    setFilter('all');
    setSearch('');
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
                  <Pill>📄 Documents</Pill>
                  <Pill tone="info">{stats.total} Total</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Documents
                </h1>
                <p className="text-gray-600 mt-2">Access and download documents relevant to your work.</p>
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

            {/* FILTER BAR */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${filter === 'all' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  style={{
                    borderColor: filter === 'all' ? "var(--primary-blue)" : "#e5e7eb",
                    color: filter === 'all' ? "var(--primary-blue)" : "#374151",
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('public')}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${filter === 'public' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  style={{
                    borderColor: filter === 'public' ? "var(--secondary-blue)" : "#e5e7eb",
                    color: filter === 'public' ? "var(--secondary-blue)" : "#374151",
                  }}
                >
                  Public
                </button>
                <button
                  onClick={() => setFilter('department')}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${filter === 'department' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  style={{
                    borderColor: filter === 'department' ? "#F59E0B" : "#e5e7eb",
                    color: filter === 'department' ? "#F59E0B" : "#374151",
                  }}
                >
                  Department
                </button>
                <button
                  onClick={() => setFilter('technical')}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${filter === 'technical' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  style={{
                    borderColor: filter === 'technical' ? "#3B82F6" : "#e5e7eb",
                    color: filter === 'technical' ? "#3B82F6" : "#374151",
                  }}
                >
                  Technical
                </button>
                <button
                  onClick={() => setFilter('workshop')}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${filter === 'workshop' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  style={{
                    borderColor: filter === 'workshop' ? "#F59E0B" : "#e5e7eb",
                    color: filter === 'workshop' ? "#F59E0B" : "#374151",
                  }}
                >
                  Workshop
                </button>
              </div>

              <div className="relative flex-1">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, type, department..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                <span className="absolute left-4 top-3.5 text-gray-400">🔎</span>
              </div>
            </div>
          </div>
        </Card>

        {/* DOCUMENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-2xl border border-gray-200/70 transition bg-white cursor-pointer"
              onClick={() => router.push(`/staff-dashboard/document/${doc.id}`)}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getFileIcon(doc.fileType)}</span>
                  <Pill tone={accessTone(doc.access)}>{doc.access}</Pill>
                  <Pill tone={departmentTone(doc.department)}>{doc.department}</Pill>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <div>{doc.fileType}</div>
                  <div>{doc.fileSize}</div>
                </div>
              </div>

              <h3 className="text-lg font-extrabold text-gray-900 mb-2">{doc.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doc.description}</p>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">👤</span>
                  <span className="truncate">{doc.uploadedBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📅</span>
                  <span>{fmtDate(doc.uploadedDate)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200/70">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>⬇️ {doc.downloads}</span>
                  {doc.tasks.length > 0 && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span>📋 {doc.tasks.length} task{doc.tasks.length > 1 ? 's' : ''}</span>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleDownload(doc, e)}
                    className="px-4 py-2 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    Download
                  </button>
                  <Link
                    href={`/staff-dashboard/document/${doc.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                  >
                    View
                  </Link>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200/70 flex items-center justify-between text-xs">
                <span className="font-semibold" style={{ color: "var(--primary-blue)" }}>
                  ID: {doc.id}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card className="p-12 text-center">
            <div
              className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}
            >
              <span className="text-2xl" style={{ color: "var(--secondary-blue)" }}>📄</span>
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">Try adjusting your filters or search term.</p>
          </Card>
        )}

        {/* Document Categories */}
        <Card className="p-6">
          <SectionTitle title="Document Categories" subtitle="Browse by category" />

          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { category: 'Protocols', count: 12, icon: '📋', color: "var(--primary-blue)" },
              { category: 'Checklists', count: 8, icon: '✅', color: "var(--secondary-blue)" },
              { category: 'Manuals', count: 6, icon: '📖', color: "#F59E0B" },
              { category: 'Reports', count: 24, icon: '📄', color: "#10B981" },
            ].map((cat) => (
              <div
                key={cat.category}
                className="p-5 rounded-2xl border text-center transition cursor-pointer"
                style={{ borderColor: cat.color }}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <p className="font-extrabold" style={{ color: cat.color }}>{cat.category}</p>
                <p className="text-sm text-gray-500 mt-1">{cat.count} documents</p>
              </div>
            ))}
          </div>
        </Card>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Total Documents</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(44,75,155,0.1)" }}>
                <span style={{ color: "var(--primary-blue)" }} className="text-xl">📚</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Public Access</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--secondary-blue)" }}>
                  {stats.publicCount}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(109,198,223,0.1)" }}>
                <span style={{ color: "var(--secondary-blue)" }} className="text-xl">🌐</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Department Only</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#F59E0B" }}>
                  {stats.departmentCount}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(245,158,11,0.1)" }}>
                <span style={{ color: "#F59E0B" }} className="text-xl">🏢</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Total Downloads</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#10B981" }}>
                  {stats.totalDownloads}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(16,185,129,0.1)" }}>
                <span style={{ color: "#10B981" }} className="text-xl">⬇️</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}