"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { getAuthToken } from "@/lib/api";
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

const scopeTone = (scope) => {
  switch (scope) {
    case "PUBLIC":
      return "success";
    case "ALL_HODS":
      return "info";
    case "SPECIFIC_HODS":
      return "purple";
    case "SPECIFIC_DEPARTMENTS":
      return "warn";
    default:
      return "danger";
  }
};

const accessTone = (accessType) => {
  if (accessType === "Owner") return "purple";
  if (accessType === "Full Access") return "success";
  return "info";
};

const fileEmoji = (fileType) => {
  const t = (fileType || "").toLowerCase();
  if (t.includes("pdf")) return "📕";
  if (t.includes("doc")) return "📘";
  if (t.includes("xls") || t.includes("csv")) return "📗";
  if (t.includes("ppt")) return "📙";
  if (t.includes("png") || t.includes("jpg") || t.includes("jpeg")) return "🖼️";
  return "📄";
};

const fmtDateTime = (iso) => {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleString('en-US', { timeZone: 'UTC' });
  } catch {
    return iso;
  }
};
const fmtDate = (iso) => {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleDateString('en-US', { timeZone: 'UTC' });
  } catch {
    return iso;
  }
};

export default function MDDocumentDetail() {
  const params = useParams() || {};
  const docId = params.docId;
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("details"); // details | versions | access | history
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!docId) return;

    const fetchDocData = async () => {
      setLoading(true);
      try {
        const resp = await fetchWithAuth(`/api/documents/${docId}`);
        if (!resp.ok) {
          throw new Error("Failed to fetch document details");
        }
        const data = await resp.json();
        // Map API data to component structure
        setDoc({
          ...data,
          // Add dummy fields that the UI expects but API doesn't return yet
          description: data.description || "No description provided for this document.",
          uploadedAt: data.date,
          fileSize: data.size || "Unknown",
          fileType: data.title.split('.').pop()?.toUpperCase() || "PDF",
          versionLabel: "v1.0",
          isEncrypted: false,
          expiryDate: null,
          tags: [],
          versions: [
            { version: "v1.0", date: data.date, uploadedBy: data.uploadedBy, changes: "Initial upload" },
          ],
          downloadHistory: [],
          accessList: [
            { user: data.uploadedBy, accessType: "Owner", department: data.department },
          ],
        });
      } catch (error) {
        console.error("Error fetching document:", error);
        toast.error("Could not load document details");
      } finally {
        setLoading(false);
      }
    };

    fetchDocData();
  }, [docId]);

  const downloadsToday = useMemo(() => {
    if (!doc?.downloadHistory) return 0;
    const today = new Date().toDateString();
    return doc.downloadHistory.filter((d) => new Date(d.downloadedAt).toDateString() === today).length;
  }, [doc?.downloadHistory]);

  const uniqueDepartments = useMemo(() => {
    if (!doc?.downloadHistory) return 0;
    return [...new Set(doc.downloadHistory.map((d) => d.department))].length;
  }, [doc?.downloadHistory]);

  const handleDownload = () => {
    if (!doc.id && !doc.dbId) {
      toast.info("No file available for download");
      return;
    }
    const id = doc.id || doc.dbId;
    const token = getAuthToken();
    const url = `/api/documents/${id}/download${token ? `?token=${token}` : ""}`;
    window.open(url, "_blank");
  };
  const handleShare = () => toast.info("Share modal would open here");
  const handleEmail = () => toast.info("Email compose modal would open here");
  const handleUploadNewVersion = () => toast.warning("Upload new version flow would open here");
  const handleAnalytics = () => toast.info("Analytics dashboard would open here");

  if (loading) {
    return (
      <Layout menuItems={MDMenuItems} userRole="MD">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-semibold">Loading document details...</p>
        </div>
      </Layout>
    );
  }

  if (!doc) {
    return (
      <Layout menuItems={MDMenuItems} userRole="MD">
        <Card className="p-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 bg-red-50">
            <span className="text-2xl text-red-600">⚠️</span>
          </div>
          <h3 className="text-lg font-extrabold text-gray-900 mb-2">Document not found</h3>
          <p className="text-gray-600 mb-6">The document you are looking for might have been removed or renamed.</p>
          <button
            onClick={() => router.push("/md-dashboard/documents")}
            className="px-6 py-3 rounded-2xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Back to Documents
          </button>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="space-y-6">
        {/* Header */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div className="min-w-0">
                <button
                  onClick={() => router.push("/md-dashboard/documents")}
                  className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                >
                  ← Back to Documents
                </button>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill tone="info">{doc.id}</Pill>
                  <Pill tone={scopeTone(doc.scope)}>{doc.scope.replace(/_/g, " ")}</Pill>
                  <Pill>{doc.type}</Pill>
                  {doc.isEncrypted ? <Pill tone="danger">Encrypted</Pill> : <Pill>Not encrypted</Pill>}
                  {doc.expiryDate ? <Pill tone="warn">Expires {fmtDate(doc.expiryDate)}</Pill> : <Pill>No expiry</Pill>}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 truncate">
                  {doc.title}
                </h1>
                <p className="text-gray-700 mt-2 max-w-3xl">{doc.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {doc.tags?.map((t) => (
                    <Pill key={t} tone="info">
                      #{t}
                    </Pill>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={handleDownload}
                  className="px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                  style={{ backgroundColor: "var(--secondary-blue)" }}
                >
                  📥 Download
                </button>

                <button
                  onClick={handleShare}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                  style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                >
                  🔗 Share
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border-t border-gray-200/70">
            <div className="flex flex-wrap">
              {[
                { id: "details", label: "Details" },
                { id: "versions", label: `Versions (${doc.versions.length})` },
                { id: "access", label: "Access Control" },
                { id: "history", label: "Download History" },
              ].map((t) => {
                const active = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id)}
                    className={`px-6 py-4 text-sm font-semibold transition border-b-2 ${active ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                      }`}
                    style={{ borderBottomColor: active ? "var(--primary-blue)" : "transparent" }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* DETAILS */}
        {activeTab === "details" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: preview + info */}
            <Card className="lg:col-span-2">
              <div className="p-6">
                <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--primary-blue)" }}>
                  Document Overview
                </h2>

                {/* Preview */}
                <div className="border border-gray-200 rounded-2xl p-6 md:p-8 bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center "
                        style={{ backgroundColor: "rgba(44, 75, 155, 0.10)" }}
                      >
                        <span className="text-3xl">{fileEmoji(doc.fileType)}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {doc.title}.{doc.fileType?.toLowerCase()}
                        </p>
                        <p className="text-sm text-gray-600">
                          {doc.fileType} • {doc.fileSize} • Version: {doc.versionLabel}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleDownload}
                        className="px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                        style={{ backgroundColor: "var(--accent-red)" }}
                      >
                        Download Now
                      </button>

                      <button
                        onClick={() => setActiveTab("versions")}
                        className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                        style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                      >
                        View Versions
                      </button>
                    </div>
                  </div>
                </div>

                {/* Key stats */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Total Downloads", value: doc.downloads, tone: "info" },
                    { label: "Last Downloaded", value: fmtDateTime(doc.lastDownloaded), tone: "success" },
                    { label: "Uploaded", value: fmtDateTime(doc.uploadedAt), tone: "warn" },
                  ].map((x) => (
                    <div key={x.label} className="p-4 rounded-2xl border border-gray-200/70">
                      <div className="text-xs text-gray-500">{x.label}</div>
                      <div className="mt-1 text-sm font-semibold text-gray-900">{x.value}</div>
                    </div>
                  ))}
                </div>

                {/* Footer actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleUploadNewVersion}
                    className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                    style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                  >
                    📤 Upload New Version
                  </button>
                  <button
                    onClick={handleEmail}
                    className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                    style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                  >
                    📧 Email Document
                  </button>
                  <button
                    onClick={handleAnalytics}
                    className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                    style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                  >
                    📊 View Analytics
                  </button>
                </div>
              </div>
            </Card>

            {/* Right: metadata */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--primary-blue)" }}>
                  Metadata
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-500">Type</span>
                    <span className="font-semibold text-gray-900">{doc.type}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-500">Department</span>
                    <span className="font-semibold text-gray-900">{doc.department}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-500">File</span>
                    <span className="font-semibold text-gray-900">
                      {doc.fileType} • {doc.fileSize}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-500">Scope</span>
                    <Pill tone={scopeTone(doc.scope)}>{doc.scope.replace(/_/g, " ")}</Pill>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-500">Encryption</span>
                    <span className="font-semibold text-gray-900">{doc.isEncrypted ? "Enabled" : "Disabled"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-500">Expiry</span>
                    <span className="font-semibold text-gray-900">{doc.expiryDate ? fmtDate(doc.expiryDate) : "No expiry"}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200/70">
                  <div className="text-xs text-gray-500 mb-3">Uploaded By</div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold "
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      {doc.uploadedBy.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900">{doc.uploadedBy}</div>
                      <div className="text-xs text-gray-500">{fmtDateTime(doc.uploadedAt)}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200/70">
                  <div className="text-xs text-gray-500 mb-2">Quick Links</div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/md-dashboard/documents"
                      className="text-sm font-semibold hover:underline"
                      style={{ color: "var(--primary-blue)" }}
                    >
                      View All Documents
                    </Link>
                    <button
                      type="button"
                      onClick={() => setActiveTab("access")}
                      className="text-left text-sm font-semibold hover:underline"
                      style={{ color: "var(--primary-blue)" }}
                    >
                      Manage Access Control
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("history")}
                      className="text-left text-sm font-semibold hover:underline"
                      style={{ color: "var(--primary-blue)" }}
                    >
                      View Download History
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* VERSIONS */}
        {activeTab === "versions" && (
          <Card>
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                <h2 className="text-xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                  Document Versions
                </h2>
                <button
                  onClick={handleUploadNewVersion}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                  style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                >
                  📤 Upload New Version
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Version", "Date", "Uploaded By", "Changes", "Actions"].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {doc.versions.map((v, idx) => {
                      const isCurrent = doc.versionLabel?.includes(v.version);
                      return (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">{v.version}</span>
                              {isCurrent ? <Pill tone="success">Current</Pill> : null}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{fmtDate(v.date)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{v.uploadedBy}</td>
                          <td className="px-6 py-4 text-gray-700">{v.changes}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                            <button
                              type="button"
                              className="px-3 py-1.5 rounded-xl text-white mr-2"
                              style={{ backgroundColor: "var(--secondary-blue)" }}
                              onClick={() => toast.info(`Viewing ${v.version} (demo)`)}
                            >
                              View
                            </button>
                            <button
                              type="button"
                              className="px-3 py-1.5 rounded-xl border bg-white hover:bg-gray-50"
                              style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                              onClick={handleDownload}
                            >
                              Download
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center bg-gray-50">
                <div className="text-4xl mb-2">📤</div>
                <p className="font-semibold text-lg mb-2">Upload New Version</p>
                <p className="text-gray-600 mb-4">Upload an updated version of this document</p>
                <button
                  type="button"
                  onClick={handleUploadNewVersion}
                  className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                  style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                >
                  Choose File
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* ACCESS CONTROL */}
        {activeTab === "access" && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--primary-blue)" }}>
                Access Control
              </h2>

              <div className="space-y-6">
                <div className="p-5 rounded-2xl border border-gray-200/70 bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <div className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Current Access Scope
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {doc.scope === "PUBLIC" && "All users can view and download this document."}
                        {doc.scope === "ALL_HODS" && "All Heads of Department can access this document."}
                        {doc.scope === "SPECIFIC_HODS" && "Only selected HODs can access this document."}
                        {doc.scope === "SPECIFIC_DEPARTMENTS" && "Only selected departments can access this document."}
                        {doc.scope === "PRIVATE" && "Only you can access this document."}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Pill tone={scopeTone(doc.scope)}>{doc.scope.replace(/_/g, " ")}</Pill>
                      {doc.isEncrypted ? <Pill tone="danger">Encrypted</Pill> : null}
                    </div>
                  </div>
                </div>

                {/* Access list */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {["User", "Department", "Access Type", "Actions"].map((h) => (
                          <th
                            key={h}
                            className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {doc.accessList.map((a, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-9 h-9 rounded-2xl flex items-center justify-center text-white font-bold "
                                style={{ backgroundColor: "var(--secondary-blue)" }}
                              >
                                {a.user.charAt(0)}
                              </div>
                              <div className="font-semibold text-gray-900">{a.user}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Pill tone="info">{a.department}</Pill>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Pill tone={accessTone(a.accessType)}>{a.accessType}</Pill>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                            {a.accessType !== "Owner" ? (
                              <button
                                type="button"
                                className="px-3 py-1.5 rounded-xl border bg-white hover:bg-red-50 transition"
                                style={{ borderColor: "rgba(239,68,68,0.25)", color: "#DC2626" }}
                                onClick={() => toast.info(`Remove access for ${a.user} (demo)`)}
                              >
                                Remove
                              </button>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Modify access (demo UI) */}
                <div className="p-5 rounded-2xl border border-gray-200/70">
                  <div className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                    Modify Access (Demo)
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Change Access Scope
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white">
                        <option value="PUBLIC">Public - All users</option>
                        <option value="ALL_HODS">All HODs</option>
                        <option value="SPECIFIC_HODS">Specific HODs</option>
                        <option value="SPECIFIC_DEPARTMENTS">Specific Departments</option>
                        <option value="PRIVATE">Private - Only me</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-2">
                        Hook this to your API to update the scope + regenerate access list.
                      </p>
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        className="w-full px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                        style={{ backgroundColor: "var(--accent-red)" }}
                        onClick={() => toast.success("Access updated (demo)")}
                      >
                        Update Access
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* DOWNLOAD HISTORY */}
        {activeTab === "history" && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--primary-blue)" }}>
                Download History
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["User", "Department", "Downloaded At", "Time"].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {doc.downloadHistory.map((d, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-2xl flex items-center justify-center text-white font-bold "
                              style={{ backgroundColor: "var(--secondary-blue)" }}
                            >
                              {d.user.charAt(0)}
                            </div>
                            <div className="font-semibold text-gray-900">{d.user}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Pill tone="info">{d.department}</Pill>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{fmtDate(d.downloadedAt)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(d.downloadedAt).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 rounded-2xl border border-gray-200/70 bg-blue-50">
                  <p className="text-3xl font-extrabold text-center" style={{ color: "var(--primary-blue)" }}>
                    {doc.downloads}
                  </p>
                  <p className="text-sm text-gray-600 text-center mt-2">Total Downloads</p>
                </div>
                <div className="p-6 rounded-2xl border border-gray-200/70 bg-emerald-50">
                  <p className="text-3xl font-extrabold text-center" style={{ color: "#10B981" }}>
                    {downloadsToday}
                  </p>
                  <p className="text-sm text-gray-600 text-center mt-2">Downloads Today</p>
                </div>
                <div className="p-6 rounded-2xl border border-gray-200/70 bg-purple-50">
                  <p className="text-3xl font-extrabold text-center" style={{ color: "#8B5CF6" }}>
                    {uniqueDepartments}
                  </p>
                  <p className="text-sm text-gray-600 text-center mt-2">Departments Downloaded</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-extrabold mb-5" style={{ color: "var(--primary-blue)" }}>
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "📤", label: "Upload New Version", onClick: handleUploadNewVersion },
                { icon: "🔗", label: "Share Document", onClick: handleShare },
                { icon: "📧", label: "Email Document", onClick: handleEmail },
                { icon: "📊", label: "View Analytics", onClick: handleAnalytics },
              ].map((a) => (
                <button
                  key={a.label}
                  type="button"
                  onClick={a.onClick}
                  className="p-4 rounded-2xl border border-gray-200/70 bg-white hover:bg-gray-50 transition text-left"
                >
                  <div className="text-2xl mb-2">{a.icon}</div>
                  <div className="font-semibold text-gray-900">{a.label}</div>
                  <div className="text-xs text-gray-500 mt-1">Demo action</div>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
