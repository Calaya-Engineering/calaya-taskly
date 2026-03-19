"use client";

// pages/dashboards/MD/MDDocuments.jsx
import { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { DocumentIcon } from "@/lib/icons";
import { MDMenuItems } from "@/utils/menus";
import { getDocIconComponent } from "@/lib/icons";
import { fetchWithAuth, getAuthToken } from "@/lib/api";
import { toast } from "@/lib/toast";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

/* ---------- UI helpers (dashboard-style) ---------- */
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

const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" });
const formatScope = (scope) => scope.replace(/_/g, " ");

const toMB = (sizeStr) => {
  const n = parseFloat(String(sizeStr).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const SCOPE_OPTIONS = ["PUBLIC", "PRIVATE", "ALL_HODS", "SPECIFIC_HODS", "SPECIFIC_DEPARTMENTS"];
const TYPE_OPTIONS = ["Report", "Procedure", "Policy", "Certificate", "Financial", "Log", "Security", "Map", "Manual", "Checklist", "Form", "Presentation"];

export default function MDDocuments() {
  const [documents, setDocuments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "All Types",
    scope: "All Scopes",
    department: "all",
    search: "",
  });

  const [view, setView] = useState("cards"); // cards | table

  const loadDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.type !== "All Types") params.set("type", filters.type);
      if (filters.scope !== "All Scopes") params.set("scope", filters.scope);
      if (filters.department !== "all") params.set("department", filters.department);
      if (filters.search.trim()) params.set("search", filters.search.trim());

      const res = await fetchWithAuth(`/api/documents?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setDocuments(Array.isArray(data) ? data : []);
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to load documents");
        setDocuments([]);
      }
    } catch {
      toast.error("Failed to load documents");
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  }, [filters.type, filters.scope, filters.department, filters.search]);

  const loadDepartments = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/departments");
      if (res.ok) {
        const data = await res.json();
        setDepartments(Array.isArray(data) ? data.map((d) => d.name) : []);
      }
    } catch {
      setDepartments([]);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  useEffect(() => {
    loadDepartments();
  }, [loadDepartments]);

  const documentTypes = useMemo(() => ["All Types", ...TYPE_OPTIONS], []);
  const scopeTypes = useMemo(() => ["All Scopes", ...SCOPE_OPTIONS], []);
  const departmentOptions = useMemo(() => ["all", ...new Set([...departments, ...documents.map((d) => d.department)])], [departments, documents]);

  const filteredDocs = documents;

  const stats = useMemo(() => {
    const total = documents.length;
    const publicCount = documents.filter((d) => d.scope === "PUBLIC").length;
    const privateCount = documents.filter((d) => d.scope === "PRIVATE").length;
    const totalDownloads = documents.reduce((sum, d) => sum + (d.downloads || 0), 0);
    const avgSize = total ? (documents.reduce((sum, d) => sum + toMB(d.size || "0"), 0) / total).toFixed(1) : "0.0";
    return { total, publicCount, privateCount, totalDownloads, avgSize };
  }, [documents]);

  const maxDownloads = useMemo(() => Math.max(1, ...documents.map((d) => d.downloads || 0)), [documents]);

  const handleDownload = (doc) => {
    if (!doc.id && !doc.dbId) {
      toast.info("No file available for download");
      return;
    }
    const id = doc.id || doc.dbId;
    const token = getAuthToken();
    const url = `/api/documents/${id}/download${token ? `?token=${token}` : ""}`;
    window.open(url, "_blank");
  };


  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
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
                  Documents
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Browse and manage all company documents with controlled access across departments.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => loadDocuments()}
                  disabled={loading}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition disabled:opacity-60"
                  style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                >
                  {loading ? "Loading…" : "Refresh"}
                </button>
                <Link href="/md-dashboard/create-document">
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
                  {departmentOptions.map((d) => (
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
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Showing <span className="font-semibold text-gray-800">{filteredDocs.length}</span> document(s)
                </div>
              </div>
            </div>
          </div>
        </Card>

        {loading ? (
          <Card className="p-10 text-center">
            <p className="text-gray-500">Loading documents...</p>
          </Card>
        ) : null}

        {/* Stat tiles (dashboard-like) */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Total Documents", value: stats.total, color: "var(--primary-blue)" },
              { label: "Public Documents", value: stats.publicCount, color: "#10B981" },
              { label: "Total Downloads", value: stats.totalDownloads.toLocaleString(), color: "var(--secondary-blue)" },
              { label: "Avg Size", value: `${stats.avgSize} MB`, color: "#8B5CF6" },
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
        )}

        {/* Docs list */}
        {!loading && view === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <Link key={doc.id} href={`/md-dashboard/document/${doc.id}`} className="group">
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
                          <p className="text-sm font-semibold text-gray-900 mt-1">{fmtDate(doc.date)}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-gray-600">Size</span>
                        <span className="font-semibold text-gray-900">{doc.size}</span>
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
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDownload(doc);
                      }}
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
        ) : !loading ? (
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
                        <div className="text-[12.5px] text-gray-900">{fmtDate(doc.date)}</div>
                      </td>

                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <div className="text-[12.5px] font-semibold text-gray-900">{doc.size}</div>
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
                        <Link href={`/md-dashboard/document/${doc.id}`}>
                          <button
                            className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white active:scale-[0.99] transition"
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            View
                          </button>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDownload(doc)}
                          disabled={!doc.fileUrl}
                          className="ml-2 px-3 py-1.5 rounded-xl text-[12px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
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
        ) : null}

        {/* Empty state */}
        {!loading && filteredDocs.length === 0 ? (
          <Card className="p-10 text-center">
            <div className="flex justify-center [&_svg]:w-12 [&_svg]:h-12" style={{ color: "var(--primary-blue)" }}><DocumentIcon /></div>
            <div className="mt-3 font-extrabold" style={{ color: "var(--primary-blue)" }}>
              No documents found
            </div>
            <div className="text-sm text-gray-500 mt-1">Try adjusting your filters or search keywords.</div>
          </Card>
        ) : null}

        {/* Documents by Department */}
        {!loading && (
          <Card className="p-6">
            <SectionTitle title="Documents by Department" subtitle="Overview of documents across departments" />
            <div className="mt-5 space-y-3">
              {departmentOptions
                .filter((d) => d !== "all")
                .map((dept) => {
                  const deptDocs = documents.filter((d) => d.department === dept);
                  const totalSize = deptDocs.reduce((sum, doc) => sum + toMB(doc.size), 0).toFixed(1);
                  const publicCount = deptDocs.filter((d) => d.scope === "PUBLIC").length;
                  const privateCount = deptDocs.filter((d) => d.scope === "PRIVATE").length;

                  return (
                    <div key={dept} className="rounded-2xl border border-gray-200/70 p-4 hover:bg-gray-50 transition">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold "
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            {dept.charAt(0)}
                          </div>
                          <div>
                            <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                              {dept}
                            </div>
                            <div className="text-sm text-gray-500">
                              {deptDocs.length} documents · {totalSize} MB total
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex gap-2">
                            <Pill tone="success">{publicCount} Public</Pill>
                            <Pill tone="danger">{privateCount} Private</Pill>
                          </div>

                          <button
                            onClick={() => setFilters((p) => ({ ...p, department: dept }))}
                            className="px-4 py-2 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                            style={{ backgroundColor: "var(--primary-blue)" }}
                          >
                            View Documents
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}
