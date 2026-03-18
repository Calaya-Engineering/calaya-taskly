"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";

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
      {children}
    </span>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <div>
    <h2 className="text-lg md:text-xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
      {title}
    </h2>
    {subtitle ? <p className="text-sm text-gray-500 mt-1">{subtitle}</p> : null}
  </div>
);

const FieldLabel = ({ children, required }) => (
  <label className="block text-sm font-extrabold text-gray-700 mb-2">
    {children} {required ? <span className="text-red-500">*</span> : null}
  </label>
);

const inputBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";
const textareaBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";

function toDateInput(value) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().split("T")[0];
}

export default function MDCreateTender() {
  const router = useRouter();
  const params = useParams() || {};
  const tenderId = params.tenderId;
  const isEditMode = !!tenderId;
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [existingDocuments, setExistingDocuments] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    issuedDate: new Date().toISOString().split("T")[0],
    closingDate: "",
    status: "OPEN",
  });

  useEffect(() => {
    if (!isEditMode || !tenderId) return;

    let cancelled = false;

    async function loadTender() {
      try {
        const res = await fetchWithAuth(`/api/tenders/${tenderId}`);
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(data?.error || "Tender not found");
        }

        if (!cancelled) {
          setFormData({
            title: String(data?.title ?? ""),
            description: String(data?.description ?? ""),
            issuedDate: toDateInput(data?.issuedDate) || new Date().toISOString().split("T")[0],
            closingDate: toDateInput(data?.closingDate),
            status: String(data?.status ?? "OPEN"),
          });
          setExistingDocuments(Array.isArray(data?.documents) ? data.documents : []);
        }
      } catch (error) {
        console.error("Failed to load tender:", error);
        if (!cancelled) {
          toast.error(error instanceof Error ? error.message : "Failed to load tender");
          router.push("/md-dashboard/tenders");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTender();

    return () => {
      cancelled = true;
    };
  }, [isEditMode, router, tenderId]);

  const heroCopy = useMemo(() => ({
    pill: isEditMode ? "Edit Tender" : "Create Tender",
    title: isEditMode ? "Edit Tender" : "Create New Tender",
    subtitle: isEditMode
      ? "Update the tender title, description, closing date, and status."
      : "Create a company-wide tender with only the core details required.",
  }), [isEditMode]);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setDocuments((prev) => [...prev, ...files]);
    event.target.value = "";
  };

  const removeDocument = (index) => {
    setDocuments((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  async function uploadTenderDocuments() {
    if (documents.length === 0) return [];

    const uploadedDocuments = [];
    for (const file of documents) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const uploadRes = await fetchWithAuth("/api/upload/cloudinary", {
        method: "POST",
        body: uploadFormData,
      });
      const uploadData = await uploadRes.json().catch(() => null);

      const uploadedUrl = uploadData?.secureUrl || uploadData?.url;

      if (!uploadRes.ok || !uploadedUrl) {
        throw new Error(uploadData?.error || `Failed to upload ${file.name}`);
      }

      const extension = file.name.includes(".") ? file.name.split(".").pop()?.toUpperCase() : "FILE";
      uploadedDocuments.push({
        title: file.name,
        fileUrl: uploadedUrl,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        fileType: extension ? `${extension} Document` : "Tender Document",
      });
    }

    return uploadedDocuments;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (saving) return;

    if (!formData.title.trim()) return toast.warning("Please enter a tender title");
    if (!formData.description.trim()) return toast.warning("Please enter a description");
    if (!formData.closingDate) return toast.warning("Please set a closing date");

    setSaving(true);
    try {
      const uploadedDocuments = await uploadTenderDocuments();
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        closingDate: formData.closingDate,
        status: formData.status,
        documents: uploadedDocuments,
      };

      const res = await fetchWithAuth(isEditMode ? `/api/tenders/${tenderId}` : "/api/tenders", {
        method: isEditMode ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || `Failed to ${isEditMode ? "update" : "create"} tender`);
      }

      toast.success(`Tender ${isEditMode ? "updated" : "created"} successfully`);
      router.push("/md-dashboard/tenders");
    } catch (error) {
      console.error("Error saving tender:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save tender");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="max-w-5xl mx-auto space-y-6">
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
                  <Pill>{heroCopy.pill}</Pill>
                  <Pill tone="success">Company-wide</Pill>
                  <Pill tone="purple">{formData.status}</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  {heroCopy.title}
                </h1>
                <p className="text-gray-600 mt-2">{heroCopy.subtitle}</p>
              </div>

              <button
                type="button"
                onClick={() => router.push("/md-dashboard/tenders")}
                className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
              >
                ← Back to Tenders
              </button>
            </div>
          </div>
        </Card>

        <form onSubmit={handleSubmit}>
          <Card className="p-6 md:p-8">
            <SectionTitle
              title="Tender Details"
              subtitle="Only the core tender information is required now."
            />

            {loading ? (
              <div className="py-16 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
                <p className="text-gray-500 font-semibold">Loading tender...</p>
              </div>
            ) : (
              <>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <FieldLabel required>Tender Title</FieldLabel>
                    <input
                      type="text"
                      required
                      className={inputBase}
                      placeholder="e.g., Supply of Workshop Equipment"
                      value={formData.title}
                      onChange={handleChange("title")}
                    />
                  </div>

                  <div>
                    <FieldLabel>Issued Date</FieldLabel>
                    <input type="date" className={`${inputBase} bg-gray-50`} value={formData.issuedDate} readOnly />
                  </div>

                  <div>
                    <FieldLabel required>Closing Date</FieldLabel>
                    <input
                      type="date"
                      required
                      className={inputBase}
                      value={formData.closingDate}
                      onChange={handleChange("closingDate")}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FieldLabel>Status</FieldLabel>
                    <select className={inputBase} value={formData.status} onChange={handleChange("status")}>
                      <option value="OPEN">Open</option>
                      <option value="CLOSED">Closed</option>
                      <option value="AWARDED">Awarded</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <FieldLabel required>Description</FieldLabel>
                    <textarea
                      rows={8}
                      required
                      className={textareaBase}
                      placeholder="Describe the scope of work, deliverables, and any context vendors should know."
                      value={formData.description}
                      onChange={handleChange("description")}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FieldLabel>Documents</FieldLabel>
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6">
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        id="md-tender-document-upload"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.zip,.jpg,.jpeg,.png"
                      />
                      <label htmlFor="md-tender-document-upload" className="block cursor-pointer text-center">
                        <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center bg-blue-50 text-sm font-black tracking-[0.2em] text-blue-700">
                          FILE
                        </div>
                        <p className="font-extrabold text-gray-900">Add tender documents</p>
                        <p className="text-sm text-gray-500 mt-1">Files will upload to Cloudinary when you save this tender.</p>
                      </label>
                    </div>
                  </div>
                </div>

                {isEditMode && existingDocuments.length > 0 ? (
                  <div className="mt-6">
                    <h3 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Existing Documents
                    </h3>
                    <div className="space-y-3">
                      {existingDocuments.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-gray-200/70 bg-gray-50">
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{doc.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{doc.size || "—"}</p>
                          </div>
                          <span className="text-xs text-gray-500 shrink-0">{doc.uploadedAt || "Saved"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {documents.length > 0 ? (
                  <div className="mt-6">
                    <h3 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Documents Ready to Upload ({documents.length})
                    </h3>
                    <div className="space-y-3">
                      {documents.map((file, index) => (
                        <div key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-gray-200/70 bg-white">
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDocument(index)}
                            className="px-4 py-2 rounded-2xl font-semibold border bg-white hover:bg-red-50 active:scale-[0.99] transition"
                            style={{ borderColor: "rgba(237,50,55,0.45)", color: "var(--accent-red)" }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-8 pt-6 border-t border-gray-200/70 flex flex-col sm:flex-row justify-between gap-3">
                  <div className="text-sm text-gray-500">
                    Department assignment, category, budget, contact details, and requirements are no longer part of tender creation. Any selected documents will be uploaded and linked to the tender automatically.
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => router.push("/md-dashboard/tenders")}
                      className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition disabled:opacity-60"
                      style={{ backgroundColor: "var(--accent-red)" }}
                    >
                      {saving ? (isEditMode ? "Saving..." : "Creating...") : (isEditMode ? "Save Changes" : "Create Tender")}
                    </button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </form>
      </div>
    </Layout>
  );
}
