"use client";

// pages/dashboards/MD/MDCreateDocument.jsx
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import FileUploadSection from "@/components/FileUploadSection";
import { MDMenuItems } from "@/utils/menus";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";
import { formatFileSize } from "@/lib/file-size";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";


const documentTypes = [
  "Report",
  "Procedure",
  "Policy",
  "Certificate",
  "Contract",
  "Invoice",
  "Drawing",
  "Specification",
  "Manual",
  "Checklist",
  "Form",
  "Presentation",
];

/* Demo lists (for SPECIFIC_HODS / SPECIFIC_USERS UI) - cleared as per request */


/* ---------- dashboard-style helpers ---------- */
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
    case "SPECIFIC_USERS":
      return "info";
    default:
      return "default";
  }
};

const formatScope = (scope) => scope.replace(/_/g, " ");

const fileIcon = (name = "") => {
  const n = name.toLowerCase();
  if (n.endsWith(".pdf")) return "📕";
  if (n.endsWith(".doc") || n.endsWith(".docx")) return "📘";
  if (n.endsWith(".xls") || n.endsWith(".xlsx") || n.endsWith(".csv")) return "📗";
  if (n.endsWith(".ppt") || n.endsWith(".pptx")) return "📙";
  if (n.endsWith(".png") || n.endsWith(".jpg") || n.endsWith(".jpeg") || n.endsWith(".webp")) return "🖼️";
  if (n.endsWith(".zip") || n.endsWith(".rar")) return "🗜️";
  return "📎";
};

const safeSplitTags = (text) =>
  text
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 12);

export default function MDCreateDocument() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("info"); // info | access | files | preview

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    documentType: "",
    department: "",
    scope: "PRIVATE",
    selectedDepartments: [],
    selectedHODs: [],
    selectedUsers: [],
    isEncrypted: false,
    encryptionPassword: "",
    expiryDate: "",
    versionLabel: "",
    tagsText: "",
  });

  const [files, setFiles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [hodUsers, setHodUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [deptRes, userRes] = await Promise.all([
          fetchWithAuth("/api/departments"),
          fetchWithAuth("/api/users"),
        ]);
        if (deptRes.ok) {
          const data = await deptRes.json();
          setDepartments(data.map((d) => d.name));
        }
        if (userRes.ok) {
          const data = await userRes.json();
          setUsers(data);
          setHodUsers(data.filter((u) => u.role === "HOD" || u.role === "MD"));
        }
      } catch (err) {
        console.error("Failed to load departments/users:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const [saving, setSaving] = useState(false);

  // Derived tags
  const tags = useMemo(() => safeSplitTags(formData.tagsText), [formData.tagsText]);

  // Demo document id
  const [docId, setDocId] = useState("");
  useEffect(() => {
    const year = new Date().getFullYear();
    const rnd = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    setDocId(`DOC-${year}-${rnd}`);
  }, []);

  const totalSizeBytes = useMemo(() => files.reduce((sum, f) => sum + f.size, 0), [files]);

  const clearScopedSelections = (scope) => {
    setFormData((p) => ({
      ...p,
      scope,
      selectedDepartments: scope === "SPECIFIC_DEPARTMENTS" ? p.selectedDepartments : [],
      selectedHODs: scope === "SPECIFIC_HODS" ? p.selectedHODs : [],
      selectedUsers: scope === "SPECIFIC_USERS" ? p.selectedUsers : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.warning("Please enter a document title.");
      setActiveTab("info");
      return;
    }

    if (!formData.documentType) {
      toast.warning("Please select a document type.");
      setActiveTab("info");
      return;
    }

    if (!formData.department) {
      toast.warning("Please select a department.");
      setActiveTab("info");
      return;
    }

    if (formData.scope === "SPECIFIC_DEPARTMENTS" && formData.selectedDepartments.length === 0) {
      toast.warning("Please select at least one department for this scope.");
      setActiveTab("access");
      return;
    }

    if (formData.scope === "SPECIFIC_HODS" && formData.selectedHODs.length === 0) {
      toast.warning("Please select at least one HOD for this scope.");
      setActiveTab("access");
      return;
    }

    if (formData.scope === "SPECIFIC_USERS" && formData.selectedUsers.length === 0) {
      toast.warning("Please select at least one user for this scope.");
      setActiveTab("access");
      return;
    }

    setSaving(true);
    try {
      let fileUrl = null;
      if (files.length > 0) {
        toast.info("Uploading file to cloud...");
        const formDataUpload = new FormData();
        formDataUpload.append("file", files[0]);
        const uploadRes = await fetchWithAuth("/api/upload/cloudinary", {
          method: "POST",
          body: formDataUpload,
        });
        if (!uploadRes.ok) {
          const err = await uploadRes.json().catch(() => ({}));
          throw new Error(err.error || "Failed to upload file");
        }
        const { url } = await uploadRes.json();
        fileUrl = url;
      }

      const fileSizeText = files.length ? formatFileSize(files.reduce((sum, file) => sum + file.size, 0)) : null;
      const res = await fetchWithAuth("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title.trim(),
          type: formData.documentType,
          department: formData.department,
          scope: formData.scope,
          fileSize: fileSizeText,
          fileUrl,
          uploadedBy: null,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create document");
      }

      toast.success("Document created successfully!");
      router.push("/md-dashboard/documents");
    } catch (err) {
      toast.error(err.message || "Failed to create document");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files || []);
    if (!newFiles.length) return;
    setFiles((p) => [...p, ...newFiles]);
  };

  const removeFile = (index) => setFiles((p) => p.filter((_, i) => i !== index));

  const toggleDept = (dept) => {
    setFormData((p) => ({
      ...p,
      selectedDepartments: p.selectedDepartments.includes(dept)
        ? p.selectedDepartments.filter((d) => d !== dept)
        : [...p.selectedDepartments, dept],
    }));
  };

  const toggleHod = (hod) => {
    setFormData((p) => ({
      ...p,
      selectedHODs: p.selectedHODs.some((h) => h.id === hod.id)
        ? p.selectedHODs.filter((h) => h.id !== hod.id)
        : [...p.selectedHODs, hod],
    }));
  };

  const toggleUser = (u) => {
    setFormData((p) => ({
      ...p,
      selectedUsers: p.selectedUsers.some((x) => x.id === u.id) ? p.selectedUsers.filter((x) => x.id !== u.id) : [...p.selectedUsers, u],
    }));
  };

  const selectAllDepts = () => {
    setFormData((p) => ({
      ...p,
      selectedDepartments: p.selectedDepartments.length === departments.length ? [] : departments,
    }));
  };

  const filteredUsers = useMemo(() => {
    // If a department is selected on the doc metadata, filter users by it (optional convenience)
    if (!formData.department) return users;
    return users.filter((u) => u.department === formData.department);
  }, [formData.department]);

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Hero */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>Upload Document</Pill>
                  <Pill tone="info">{docId}</Pill>
                  <Pill tone={scopeTone(formData.scope)}>{formatScope(formData.scope)}</Pill>
                  {files.length ? <Pill tone="info">{files.length} file(s)</Pill> : <Pill>No files yet</Pill>}
                  {formData.isEncrypted ? <Pill tone="danger">Encrypted</Pill> : <Pill>Not encrypted</Pill>}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Create Document
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Upload and share documents with controlled access permissions across departments.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  className="px-4 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                  style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                  onClick={() => router.push("/md-dashboard/documents")}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                  style={{ backgroundColor: files.length ? "var(--accent-red)" : "#D1D5DB", color: "white" }}
                  onClick={() => setActiveTab("preview")}
                  disabled={!files.length}
                  title={!files.length ? "Upload at least one file to preview" : "Preview"}
                >
                  Preview
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border-t border-gray-200/70">
            <div className="flex flex-wrap">
              {[
                { id: "info", label: "Document Info" },
                { id: "access", label: "Access Control" },
                { id: "files", label: `Files${files.length ? ` (${files.length})` : ""}` },
                { id: "preview", label: "Preview" },
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

        {/* Main form */}
        <Card className="overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-6 md:p-8">
              {/* TAB: INFO */}
              {activeTab === "info" && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Document Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter document title"
                        value={formData.title}
                        onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                      <textarea
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Describe the document content..."
                        value={formData.description}
                        onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Document Type</label>
                        <select
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                          value={formData.documentType}
                          onChange={(e) => setFormData((p) => ({ ...p, documentType: e.target.value }))}
                        >
                          <option value="">Select Type</option>
                          {documentTypes.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Department (Optional)</label>
                        <select
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                          value={formData.department}
                          onChange={(e) => setFormData((p) => ({ ...p, department: e.target.value }))}
                        >
                          <option value="">Select Department</option>
                          {departments.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-2">Tip: Selecting a department can help filter users later.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Version Label</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                          placeholder="e.g., v1.0, Final, Draft"
                          value={formData.versionLabel}
                          onChange={(e) => setFormData((p) => ({ ...p, versionLabel: e.target.value }))}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date (Optional)</label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData((p) => ({ ...p, expiryDate: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200/70 p-5 bg-gray-50">
                      <label className="block text-sm font-extrabold mb-2" style={{ color: "var(--primary-blue)" }}>
                        Tags (Optional)
                      </label>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                          placeholder="Add tags separated by commas (e.g., pipeline, q4, audit)"
                          value={formData.tagsText}
                          onChange={(e) => setFormData((p) => ({ ...p, tagsText: e.target.value }))}
                        />
                        <button
                          type="button"
                          className="px-4 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                          style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                          onClick={() => setFormData((p) => ({ ...p, tagsText: safeSplitTags(p.tagsText).join(", ") }))}
                        >
                          Clean Tags
                        </button>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {tags.length ? tags.map((t) => <Pill key={t} tone="info">{t}</Pill>) : <span className="text-sm text-gray-500">No tags added.</span>}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Tags help with organizing and searching documents.</p>
                    </div>
                  </div>

                  {/* Right rail */}
                  <div className="space-y-5">
                    <div className="rounded-2xl border border-gray-200/70 p-5">
                      <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Quick Summary
                      </p>

                      <div className="mt-4 space-y-2 text-sm text-gray-700">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Document ID</span>
                          <span className="font-semibold">{docId}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Scope</span>
                          <span className="font-semibold">{formatScope(formData.scope)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Files</span>
                          <span className="font-semibold">{files.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Total size</span>
                          <span className="font-semibold">{files.length ? formatFileSize(totalSizeBytes) : "-"}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Pill tone={scopeTone(formData.scope)}>{formatScope(formData.scope)}</Pill>
                        {formData.isEncrypted ? <Pill tone="danger">Encrypted</Pill> : <Pill>Not encrypted</Pill>}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab("access")}
                      className="w-full px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      Continue to Access Control →
                    </button>

                    <div className="rounded-2xl border border-gray-200/70 p-5">
                      <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Upload Guidelines
                      </p>
                      <ul className="mt-3 text-sm text-gray-600 space-y-2">
                        <li className="flex gap-2">
                          <span className="text-emerald-600 font-bold">{renderNodeWithIcons("✓")}</span> Large files supported per upload
                        </li>
                        <li className="flex gap-2">
                          <span className="text-emerald-600 font-bold">{renderNodeWithIcons("✓")}</span> Use descriptive titles for searchability
                        </li>
                        <li className="flex gap-2">
                          <span className="text-emerald-600 font-bold">{renderNodeWithIcons("✓")}</span> Choose scope carefully for confidentiality
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: ACCESS */}
              {activeTab === "access" && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 space-y-6">
                    <div className="rounded-2xl border border-gray-200/70 p-5">
                      <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Access Scope <span className="text-red-500">*</span>
                      </p>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          { value: "PUBLIC", label: "Public", desc: "Everyone can access", icon: "🌍" },
                          { value: "ALL_HODS", label: "All HODs", desc: "All heads of department", icon: "👔" },
                          { value: "SPECIFIC_HODS", label: "Specific HODs", desc: "Only selected HODs", icon: "🎯" },
                          { value: "SPECIFIC_DEPARTMENTS", label: "Specific Depts", desc: "Only selected departments", icon: "🏢" },
                          { value: "SPECIFIC_USERS", label: "Specific Users", desc: "Only selected users", icon: "👤" },
                          { value: "PRIVATE", label: "Private", desc: "Only you", icon: "🔒" },
                        ].map((s) => {
                          const active = formData.scope === s.value;
                          return (
                            <button
                              key={s.value}
                              type="button"
                              onClick={() => clearScopedSelections(s.value)}
                              className={`text-left p-4 rounded-2xl border transition hover:-translate-y-[1px] ${active ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                                }`}
                              style={{ borderColor: active ? "rgba(44, 75, 155, 0.35)" : "rgba(0,0,0,0.08)" }}
                            >
                              <div className="text-2xl">{renderNodeWithIcons(s.icon)}</div>
                              <div className="mt-2 font-semibold" style={{ color: "var(--primary-blue)" }}>
                                {s.label}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">{s.desc}</div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Pill tone={scopeTone(formData.scope)}>{formatScope(formData.scope)}</Pill>
                        {formData.scope === "PRIVATE" ? <Pill tone="danger">Owner only</Pill> : null}
                      </div>

                      {formData.scope === "PRIVATE" ? (
                        <div className="mt-4 p-4 rounded-2xl border border-amber-200 bg-amber-50 text-amber-800 text-sm">
                          This document will only be visible to you. You can share it later with specific users.
                        </div>
                      ) : null}
                    </div>

                    {/* Specific Department selection */}
                    {formData.scope === "SPECIFIC_DEPARTMENTS" && (
                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                            Select Departments
                          </p>
                          <div className="flex items-center gap-2">
                            <Pill tone="info">{formData.selectedDepartments.length} selected</Pill>
                            <button
                              type="button"
                              onClick={selectAllDepts}
                              className="px-4 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 transition"
                              style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                            >
                              {formData.selectedDepartments.length === departments.length ? "Deselect All" : "Select All"}
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {departments.map((d) => {
                            const active = formData.selectedDepartments.includes(d);
                            return (
                              <button
                                key={d}
                                type="button"
                                onClick={() => toggleDept(d)}
                                className={`px-3.5 py-2 rounded-2xl text-sm font-semibold border transition ${active ? "text-white" : "text-gray-700 bg-white hover:bg-gray-50"
                                  }`}
                                style={{
                                  backgroundColor: active ? "var(--primary-blue)" : undefined,
                                  borderColor: active ? "transparent" : "rgba(0,0,0,0.08)",
                                }}
                              >
                                {d} {renderNodeWithIcons(active ? "✓" : "")}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Specific HOD selection */}
                    {formData.scope === "SPECIFIC_HODS" && (
                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          Select HODs
                        </p>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                          {hodUsers.map((h) => {
                            const active = formData.selectedHODs.some((x) => x.id === h.id);
                            return (
                              <button
                                key={h.id}
                                type="button"
                                onClick={() => toggleHod(h)}
                                className={`text-left flex items-center gap-3 p-3 rounded-2xl border transition ${active ? "bg-purple-50" : "bg-white hover:bg-gray-50"
                                  }`}
                                style={{ borderColor: active ? "rgba(139,92,246,0.25)" : "rgba(0,0,0,0.08)" }}
                              >
                                <div
                                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0 "
                                  style={{ backgroundColor: "#8B5CF6" }}
                                >
                                  {h.name.charAt(0)}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-semibold text-gray-900 truncate">{h.name}</div>
                                  <div className="text-xs text-gray-500 truncate">{h.department}</div>
                                </div>
                                {active ? <span className="text-purple-700 font-bold">{renderNodeWithIcons("✓")}</span> : null}
                              </button>
                            );
                          })}
                        </div>

                        {formData.selectedHODs.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {formData.selectedHODs.map((h) => (
                              <Pill key={h.id} tone="purple">
                                {h.name}
                              </Pill>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-3 text-sm text-gray-500">No HOD selected yet.</div>
                        )}
                      </div>
                    )}

                    {/* Specific Users selection */}
                    {formData.scope === "SPECIFIC_USERS" && (
                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          Select Users
                        </p>

                        <div className="mt-3 text-xs text-gray-500">
                          {formData.department ? (
                            <>
                              Showing users in <span className="font-semibold">{formData.department}</span> (based on selected document department).
                            </>
                          ) : (
                            <>Tip: choose a document department to quickly filter users.</>
                          )}
                        </div>

                        <div className="mt-4 max-h-[420px] overflow-y-auto pr-2 space-y-2">
                          {filteredUsers.map((u) => {
                            const active = formData.selectedUsers.some((x) => x.id === u.id);
                            return (
                              <button
                                key={u.id}
                                type="button"
                                onClick={() => toggleUser(u)}
                                className={`w-full text-left flex items-center gap-3 p-3 rounded-2xl border transition ${active ? "bg-blue-50" : "bg-white hover:bg-gray-50"
                                  }`}
                                style={{ borderColor: active ? "rgba(44, 75, 155, 0.25)" : "rgba(0,0,0,0.08)" }}
                              >
                                <div
                                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0 "
                                  style={{ backgroundColor: "var(--secondary-blue)" }}
                                >
                                  {u.name.charAt(0)}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-semibold text-gray-900 truncate">{u.name}</div>
                                  <div className="text-xs text-gray-500 truncate">
                                    {u.department} • {u.email}
                                  </div>
                                </div>
                                {active ? <span className="text-blue-700 font-bold">{renderNodeWithIcons("✓")}</span> : null}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Encryption */}
                    <div className="rounded-2xl border border-gray-200/70 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                            Encrypt Document
                          </p>
                          <p className="text-sm text-gray-600 mt-1">Add password protection for sensitive documents.</p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setFormData((p) => ({
                              ...p,
                              isEncrypted: !p.isEncrypted,
                              encryptionPassword: !p.isEncrypted ? p.encryptionPassword : "",
                            }))
                          }
                          className={`px-4 py-2 rounded-2xl text-sm font-semibold border transition ${formData.isEncrypted ? "bg-red-50" : "bg-white hover:bg-gray-50"
                            }`}
                          style={{
                            borderColor: formData.isEncrypted ? "rgba(239,68,68,0.25)" : "rgba(0,0,0,0.08)",
                            color: formData.isEncrypted ? "#DC2626" : "var(--primary-blue)",
                          }}
                        >
                          {formData.isEncrypted ? "Enabled" : "Disabled"}
                        </button>
                      </div>

                      {formData.isEncrypted ? (
                        <div className="mt-4">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Encryption Password</label>
                          <PasswordInput
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                            placeholder="Enter encryption password"
                            value={formData.encryptionPassword}
                            onChange={(e) => setFormData((p) => ({ ...p, encryptionPassword: e.target.value }))}
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            Store passwords securely. Users without the password won&apos;t open the file.
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Right rail */}
                  <div className="space-y-5">
                    <div className="rounded-2xl border border-gray-200/70 p-5">
                      <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Scope Summary
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <Pill tone={scopeTone(formData.scope)}>{formatScope(formData.scope)}</Pill>
                        {formData.isEncrypted ? <Pill tone="danger">Encrypted</Pill> : <Pill>Not encrypted</Pill>}
                      </div>

                      <div className="mt-4 space-y-2 text-sm text-gray-700">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Departments</span>
                          <span className="font-semibold">{formData.selectedDepartments.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">HODs</span>
                          <span className="font-semibold">{formData.selectedHODs.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Users</span>
                          <span className="font-semibold">{formData.selectedUsers.length}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab("info")}
                        className="flex-1 px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                        style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("files")}
                        className="flex-1 px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        Continue →
                      </button>
                    </div>

                    <div className="rounded-2xl border border-gray-200/70 p-5">
                      <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Notes
                      </p>
                      <ul className="mt-3 text-sm text-gray-600 space-y-2">
                        <li className="flex gap-2">
                          <span className="text-emerald-600 font-bold">{renderNodeWithIcons("✓")}</span> Use Private for sensitive drafts.
                        </li>
                        <li className="flex gap-2">
                          <span className="text-emerald-600 font-bold">{renderNodeWithIcons("✓")}</span> Specific Users is best for exceptions.
                        </li>
                        <li className="flex gap-2">
                          <span className="text-emerald-600 font-bold">{renderNodeWithIcons("✓")}</span> Add encryption only when necessary.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: FILES */}
              {activeTab === "files" && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 space-y-6">
                    <FileUploadSection
                      inputId="file-upload"
                      files={files}
                      onFileChange={handleFileUpload}
                      onRemoveFile={removeFile}
                      required
                    />
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-2xl border border-gray-200/70 p-5">
                      <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Checks
                      </p>
                      <ul className="mt-3 text-sm text-gray-600 space-y-2">
                        <li className="flex gap-2">
                          <span className="text-emerald-600 font-bold">{renderNodeWithIcons("✓")}</span> Use clear filenames (e.g., SiteA_Inspection_Photos.zip)
                        </li>
                        <li className="flex gap-2">
                          <span className="text-emerald-600 font-bold">{renderNodeWithIcons("✓")}</span> Confirm scope matches confidentiality
                        </li>
                        <li className="flex gap-2">
                          <span className="text-emerald-600 font-bold">{renderNodeWithIcons("✓")}</span> Add version labels for updates
                        </li>
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab("access")}
                        className="flex-1 px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                        style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("preview")}
                        className="flex-1 px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                        style={{ backgroundColor: files.length ? "var(--secondary-blue)" : "#D1D5DB" }}
                        disabled={!files.length}
                      >
                        Preview →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: PREVIEW */}
              {activeTab === "preview" && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 space-y-6">
                    <div className="rounded-2xl border border-gray-200/70 p-6 bg-gray-50">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Pill tone="info">{docId}</Pill>
                        {formData.documentType ? <Pill>{formData.documentType}</Pill> : <Pill>Type not set</Pill>}
                        {formData.department ? <Pill tone="info">{formData.department}</Pill> : <Pill>Department not set</Pill>}
                        <Pill tone={scopeTone(formData.scope)}>{formatScope(formData.scope)}</Pill>
                        {formData.isEncrypted ? <Pill tone="danger">Encrypted</Pill> : null}
                      </div>

                      <h3 className="text-xl font-extrabold text-gray-900">{formData.title || "Untitled Document"}</h3>
                      <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                        {formData.description || "No description provided."}
                      </p>

                      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-white rounded-2xl border border-gray-200/70">
                          <div className="text-xs text-gray-500">Version</div>
                          <div className="text-sm font-semibold text-gray-900 mt-1">{formData.versionLabel || "-"}</div>
                        </div>
                        <div className="p-3 bg-white rounded-2xl border border-gray-200/70">
                          <div className="text-xs text-gray-500">Expiry</div>
                          <div className="text-sm font-semibold text-gray-900 mt-1">{formData.expiryDate || "-"}</div>
                        </div>
                        <div className="p-3 bg-white rounded-2xl border border-gray-200/70">
                          <div className="text-xs text-gray-500">Files</div>
                          <div className="text-sm font-semibold text-gray-900 mt-1">
                            {files.length ? `${files.length} file(s) • ${formatFileSize(totalSizeBytes)}` : "-"}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="text-xs text-gray-500 mb-2">Tags</div>
                        <div className="flex flex-wrap gap-2">
                          {tags.length ? tags.map((t) => <Pill key={t} tone="info">{t}</Pill>) : <span className="text-sm text-gray-500">No tags</span>}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200/70 p-5">
                      <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        File List
                      </p>
                      {files.length ? (
                        <div className="mt-3 space-y-2">
                          {files.map((f, idx) => (
                            <div key={`${f.name}-${idx}`} className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-gray-200/70 bg-white">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-2xl flex items-center justify-center  shrink-0" style={{ backgroundColor: "rgba(44, 75, 155, 0.08)" }}>
                                  <span className="text-lg">{renderNodeWithIcons(fileIcon(f.name))}</span>
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-gray-900 truncate max-w-[520px]">{f.name}</div>
                                  <div className="text-xs text-gray-500">{formatFileSize(f.size)}</div>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(idx)}
                                className="px-3 py-1.5 rounded-xl text-xs font-semibold border bg-white hover:bg-red-50 transition"
                                style={{ borderColor: "rgba(239,68,68,0.25)", color: "#DC2626" }}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="mt-3 text-sm text-gray-500">No files uploaded.</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-2xl border border-gray-200/70 p-5">
                      <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Access Summary
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <Pill tone={scopeTone(formData.scope)}>{formatScope(formData.scope)}</Pill>
                        {formData.isEncrypted ? <Pill tone="danger">Encrypted</Pill> : <Pill>Not encrypted</Pill>}
                      </div>

                      <div className="mt-4 text-sm text-gray-700 space-y-2">
                        {formData.scope === "SPECIFIC_DEPARTMENTS" ? (
                          <>
                            <div className="text-xs text-gray-500">Departments</div>
                            <div className="flex flex-wrap gap-2">
                              {formData.selectedDepartments.length
                                ? formData.selectedDepartments.map((d) => <Pill key={d} tone="warn">{d}</Pill>)
                                : "—"}
                            </div>
                          </>
                        ) : null}

                        {formData.scope === "SPECIFIC_HODS" ? (
                          <>
                            <div className="text-xs text-gray-500">HODs</div>
                            <div className="flex flex-wrap gap-2">
                              {formData.selectedHODs.length
                                ? formData.selectedHODs.map((h) => <Pill key={h.id} tone="purple">{h.name}</Pill>)
                                : "—"}
                            </div>
                          </>
                        ) : null}

                        {formData.scope === "SPECIFIC_USERS" ? (
                          <>
                            <div className="text-xs text-gray-500">Users</div>
                            <div className="flex flex-wrap gap-2">
                              {formData.selectedUsers.length
                                ? formData.selectedUsers.slice(0, 6).map((u) => <Pill key={u.id} tone="info">{u.name}</Pill>)
                                : "—"}
                              {formData.selectedUsers.length > 6 ? <Pill>+{formData.selectedUsers.length - 6} more</Pill> : null}
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab("files")}
                        className="flex-1 px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                        style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                      >
                        ← Back
                      </button>

                      <button
                        type="submit"
                        className="flex-1 px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition disabled:opacity-60"
                        style={{ backgroundColor: "var(--accent-red)" }}
                        disabled={saving}
                      >
                        Upload Document
                      </button>
                    </div>

                    {!files.length ? (
                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                        Upload at least one file to enable submission.
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            {/* Footer nav */}
            <div className="px-6 md:px-8 py-4 border-t border-gray-200/70 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-sm text-gray-600">
                <span className="font-semibold" style={{ color: "var(--primary-blue)" }}>
                  Document:
                </span>{" "}
                {docId} •{" "}
                <span className="font-semibold" style={{ color: "var(--primary-blue)" }}>
                  Scope:
                </span>{" "}
                {formatScope(formData.scope)}
              </div>

              <div className="flex gap-2">
                {activeTab !== "info" ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab(activeTab === "access" ? "info" : activeTab === "files" ? "access" : "files")}
                    className="px-5 py-2.5 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                    style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                  >
                    ← Previous
                  </button>
                ) : null}

                {activeTab !== "preview" ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab(activeTab === "info" ? "access" : activeTab === "access" ? "files" : "preview")}
                    className="px-5 py-2.5 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    Next →
                  </button>
                ) : null}

                {activeTab === "preview" ? (
                  <Link
                    href="/md-dashboard/documents"
                    className="hidden"
                  >
                    {/* placeholder */}
                  </Link>
                ) : null}
              </div>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
