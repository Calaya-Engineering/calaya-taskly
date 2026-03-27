"use client";

// pages/dashboards/HOD/HODDocuments.jsx
import { useMemo, useState, useEffect, useCallback } from 'react';
import Link from "next/link";
import Layout from "@/components/Layout";
import { TaskIcon, DocumentIcon, LockIcon, DownloadIcon, ClockIcon, getDocIconComponent } from "@/lib/icons";
import { HODMenuItems } from "@/utils/menus";
import { fetchWithAuth, getAuthToken } from "@/lib/api";
import { formatFileSize, parseFileSize } from "@/lib/file-size";
import { toast } from "@/lib/toast";
import { useSSE } from "@/hooks/useSSE";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const SectionTitle = ({ title, subtitle, action }) => (
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

const scopeTone = (scope) => {
  switch (scope) {
    case "PUBLIC":
      return "success";
    case "PRIVATE":
      return "danger";
    case "ALL_HODS":
      return "info";
    case "SPECIFIC_HODS":
      return "purple";
    case "SPECIFIC_DEPARTMENTS":
      return "warn";
    default:
      return "default";
  }
};

const getDocIcon = (type) => getDocIconComponent(type);

const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
const formatScope = (scope) => scope.replace(/_/g, " ");

export default function HODDocuments() {
  const [filters, setFilters] = useState({
    type: "All Types",
    scope: "All Scopes",
    department: "all",
    search: "",
  });

  const [view, setView] = useState("cards");
  const [documentsData, setDocumentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocs = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/documents");
      if (res.ok) {
        const data = await res.json();
        // Normalise API shape → component shape
        const mapped = data.map((d) => ({
          id: d.id,
          title: d.title,
          type: d.type || "Document",
          department: d.department || "—",
          scope: d.scope || "PUBLIC",
          uploadedBy: d.uploadedBy || "—",
          uploadedDate: d.date || d.createdAt,
          fileSize: d.size || "—",
          fileType: d.fileUrl ? d.fileUrl.split(".").pop().toUpperCase() : "FILE",
          downloads: d.downloads || 0,
          description: d.description || "",
          fileUrl: d.fileUrl,
        }));
        setDocumentsData(mapped);
      }
    } catch (e) {
      console.error("Failed to fetch documents:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDocs(); }, [fetchDocs]);

  // Re-fetch on any document-related SSE event
  useSSE("/api/realtime/events", (ev) => {
    if (ev.type?.startsWith("document:")) fetchDocs();
  });

  const documentTypes = useMemo(() => ["All Types", ...new Set(documentsData.map((d) => d.type))], [documentsData]);
  const scopeTypes = useMemo(() => ["All Scopes", ...new Set(documentsData.map((d) => d.scope))], [documentsData]);
  const departments = useMemo(() => ["all", ...new Set(documentsData.map((d) => d.department))], [documentsData]);

  const filteredDocs = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return documentsData.filter((doc) => {
      const matchesType = filters.type === "All Types" || doc.type === filters.type;
      const matchesScope = filters.scope === "All Scopes" || doc.scope === filters.scope;
      const matchesDept = filters.department === "all" || doc.department === filters.department;
      const matchesQ =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        String(doc.id).toLowerCase().includes(q) ||
        (doc.uploadedBy || "").toLowerCase().includes(q) ||
        (doc.department || "").toLowerCase().includes(q) ||
        (doc.type || "").toLowerCase().includes(q);
      return matchesType && matchesScope && matchesDept && matchesQ;
    });
  }, [filters, documentsData]);

  const stats = useMemo(() => {
    const total = documentsData.length;
    const publicCount = documentsData.filter((d) => d.scope === "PUBLIC").length;
    const privateCount = documentsData.filter((d) => d.scope === "PRIVATE").length;
    const totalDownloads = documentsData.reduce((sum, d) => sum + (d.downloads || 0), 0);
    const avgSize = total
      ? formatFileSize(documentsData.reduce((sum, d) => sum + parseFileSize(d.fileSize), 0) / total)
      : "0 KB";
    return { total, publicCount, privateCount, totalDownloads, avgSize };
  }, [documentsData]);

  const handleDownload = (doc, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!doc.id) {
      toast.info("No file available for download");
      return;
    }
    const token = getAuthToken();
    const url = `/api/documents/${doc.id}/download${token ? `?token=${token}` : ""}`;
    window.open(url, "_blank");
  };

  const maxDownloads = useMemo(() => Math.max(1, ...documentsData.map((d) => d.downloads || 0)), [documentsData]);

  if (loading) return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
      </div>
    </Layout>
  );

  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
      <div className="space-y-6">
        {/* Hero */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>Document Library</Pill>
                  <Pill tone="success">{stats.publicCount} Public</Pill>
                  <Pill tone="danger">{stats.privateCount} Private</Pill>
                  <Pill tone="info">{stats.total} Total</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Document Library
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Browse and manage documents in your department(s) with controlled access.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/hod-dashboard/create-document">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)", color: "white" }}
                  >
                    + Upload Document
                  </button>
                </Link>

                <div className="flex w-full sm:w-auto gap-2">
                  <button
                    className={`flex-1 sm:flex-none px-4 py-3 rounded-2xl font-semibold border transition ${view === "cards" ? "bg-white" : "bg-gray-50"
                      }`}
                    style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                    onClick={() => setView("cards")}
                  >
                    Cards
                  </button>
                  <button
                    className={`flex-1 sm:flex-none px-4 py-3 rounded-2xl font-semibold border transition ${view === "table" ? "bg-white" : "bg-gray-50"
                      }`}
                    style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                    onClick={() => setView("table")}
                  >
                    Table
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters row */}
          <div className="p-4 md:p-5 bg-white border-t border-gray-200/70">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <select
                  className="px-3.5 py-2 rounded-2xl text-sm font-semibold border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={filters.type}
                  onChange={(e) => setFilters((p) => ({ ...p, type: e.target.value }))}
                  style={{ color: "var(--primary-blue)" }}
                >
                  {documentTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                <select
                  className="px-3.5 py-2 rounded-2xl text-sm font-semibold border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={filters.scope}
                  onChange={(e) => setFilters((p) => ({ ...p, scope: e.target.value }))}
                  style={{ color: "var(--primary-blue)" }}
                >
                  {scopeTypes.map((s) => (
                    <option key={s} value={s}>
                      {s === "All Scopes" ? s : formatScope(s)}
                    </option>
                  ))}
                </select>

                <select
                  className="px-3.5 py-2 rounded-2xl text-sm font-semibold border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={filters.department}
                  onChange={(e) => setFilters((p) => ({ ...p, department: e.target.value }))}
                  style={{ color: "var(--primary-blue)" }}
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d === "all" ? "All Departments" : d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full xl:w-[420px]">
                <div className="relative">
                  <input
                    value={filters.search}
                    onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                    placeholder="Search by ID, title, uploader, department..."
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{renderNodeWithIcons("🔎")}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Showing <span className="font-semibold text-gray-800">{filteredDocs.length}</span> document(s)
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stat tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: "Total Documents", value: stats.total, color: "var(--primary-blue)" },
            { label: "Public Documents", value: stats.publicCount, color: "#10B981" },
            { label: "Total Downloads", value: stats.totalDownloads.toLocaleString(), color: "var(--secondary-blue)" },
            { label: "Avg Size", value: stats.avgSize, color: "#8B5CF6" },
          ].map((s) => (
            <Card key={s.label} className="p-5">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-3xl font-extrabold mt-2" style={{ color: s.color }}>
                {s.value}
              </p>
              <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width:
                      s.label === "Public Documents"
                        ? `${Math.min(100, Math.round((stats.publicCount / Math.max(1, stats.total)) * 100))}%`
                        : s.label === "Total Downloads"
                          ? "72%"
                          : s.label === "Avg Size"
                            ? "55%"
                            : "80%",
                    backgroundColor: "var(--primary-blue)",
                  }}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Docs list */}
        {view === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <Link key={doc.id} href={`/hod-dashboard/document/${doc.id}`} className="group">
                <Card className="p-6 hover:-translate-y-0.5 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          {doc.id}
                        </span>
                        <Pill tone="info">{doc.type}</Pill>
                        <Pill tone={scopeTone(doc.scope)}>{formatScope(doc.scope)}</Pill>
                      </div>

                      <h3 className="mt-2 text-lg font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                        {doc.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 truncate">{doc.department} Department</p>
                    </div>

                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center  shrink-0"
                      style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                    >
                      <span className="inline-flex [&_svg]:w-5 [&_svg]:h-5" style={{ color: "var(--primary-blue)" }}>{getDocIcon(doc.type)}</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3">
                    <div className="rounded-2xl border border-gray-200/70 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500">Uploaded By</p>
                          <p className="mt-1 max-w-[12rem] break-words text-sm font-semibold text-gray-900 line-clamp-2">
                            {doc.uploadedBy}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">{fmtDate(doc.uploadedDate)}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-gray-600">Size</span>
                        <span className="font-semibold text-gray-900">{doc.fileSize}</span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-gray-600">Downloads</span>
                        <Pill tone="info">{doc.downloads}</Pill>
                      </div>

                      <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(100, Math.round((doc.downloads / maxDownloads) * 100))}%`,
                            backgroundColor: "var(--primary-blue)",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    <button
                      onClick={(e) => handleDownload(doc, e)}
                      className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm text-white active:scale-[0.99] transition"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      Download
                    </button>
                    <button
                      className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                    >
                      View Details
                    </button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200/70">
                  <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="px-4 py-2.5 text-left">Document</th>
                    <th className="px-4 py-2.5 text-left">Type</th>
                    <th className="px-4 py-2.5 text-left">Dept</th>
                    <th className="px-4 py-2.5 text-left">Scope</th>
                    <th className="px-4 py-2.5 text-left">Uploaded By</th>
                    <th className="px-4 py-2.5 text-left">Date</th>
                    <th className="px-4 py-2.5 text-left">Size</th>
                    <th className="px-4 py-2.5 text-left">Downloads</th>
                    <th className="px-4 py-2.5 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200/70 text-[12.5px]">
                  {filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50/70 transition">
                      <td className="px-4 py-2.5">
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-2xl flex items-center justify-center  shrink-0"
                            style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                          >
                            <span className="inline-flex [&_svg]:w-5 [&_svg]:h-5" style={{ color: "var(--primary-blue)" }}>{getDocIcon(doc.type)}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                              {doc.id}
                            </div>
                            <div className="text-[12.5px] font-semibold text-gray-900 truncate max-w-[520px]">
                              {doc.title}
                            </div>
                            <div className="text-[11px] text-gray-500">{doc.department}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <Pill tone="info">{doc.type}</Pill>
                      </td>

                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <Pill>{doc.department}</Pill>
                      </td>

                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <Pill tone={scopeTone(doc.scope)}>{formatScope(doc.scope)}</Pill>
                      </td>

                      <td className="px-4 py-2.5">
                        <div className="max-w-[180px] truncate text-[12.5px] font-semibold text-gray-900">{doc.uploadedBy}</div>
                      </td>

                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <div className="text-[12.5px] text-gray-900">{fmtDate(doc.uploadedDate)}</div>
                      </td>

                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <div className="text-[12.5px] font-semibold text-gray-900">{doc.fileSize}</div>
                      </td>

                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Pill tone="info">{doc.downloads}</Pill>
                          <div className="w-20 h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min(100, Math.round((doc.downloads / maxDownloads) * 100))}%`,
                                backgroundColor: "var(--primary-blue)",
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-2.5 text-right whitespace-nowrap">
                        <Link href={`/hod-dashboard/document/${doc.id}`}>
                          <button
                            className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white active:scale-[0.99] transition"
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            View
                          </button>
                        </Link>
                        <button
                          onClick={(e) => handleDownload(doc, e)}
                          className="ml-2 px-3 py-1.5 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                          style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Empty state */}
        {filteredDocs.length === 0 && (
          <Card className="p-10 text-center">
            <div className="flex justify-center [&_svg]:w-12 [&_svg]:h-12" style={{ color: "var(--primary-blue)" }}><DocumentIcon /></div>
            <div className="mt-3 font-extrabold" style={{ color: "var(--primary-blue)" }}>
              No documents found
            </div>
            <div className="text-sm text-gray-500 mt-1">Try adjusting your filters or upload a new document.</div>
            <Link href="/hod-dashboard/create-document" className="inline-block mt-4">
              <button
                className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
              >
                Upload Your First Document
              </button>
            </Link>
          </Card>
        )}

        {/* Quick Access */}
        <Card className="p-6">
          <SectionTitle title="Quick Access" subtitle="Common document views" />
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <TaskIcon />, label: "Recent Reports", color: "var(--primary-blue)" },
              { icon: <LockIcon />, label: "Private Documents", color: "var(--secondary-blue)" },
              { icon: <DownloadIcon />, label: "Most Downloaded", color: "#10B981" },
              { icon: <ClockIcon />, label: "Recently Updated", color: "#8B5CF6" },
            ].map((item, i) => (
              <button
                key={i}
                className="group p-5 rounded-2xl border border-gray-200/70 hover:-translate-y-0.5 transition-all text-center"
              >
                <div
                  className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center [&_svg]:w-6 [&_svg]:h-6 mb-3 group-hover:scale-110 transition"
                  style={{ backgroundColor: `${item.color}18`, color: item.color }}
                >
                  {renderNodeWithIcons(item.icon)}
                </div>
                <p className="font-extrabold text-sm" style={{ color: item.color }}>
                  {item.label}
                </p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
