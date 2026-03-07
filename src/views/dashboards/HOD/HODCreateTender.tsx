"use client";

// pages/dashboards/HOD/HODCreateTender.jsx
import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";


const CATEGORIES = [
  "Equipment Supply",
  "Training Services",
  "Maintenance Services",
  "Consultancy",
  "Professional Services",
  "IT Services",
  "Construction",
  "Transport Services",
  "Cleaning Services",
  "Catering Services"
];


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

const FieldLabel = ({ children, required }) => (
  <label className="block text-sm font-extrabold text-gray-700 mb-2">
    {children} {required ? <span className="text-red-500">*</span> : null}
  </label>
);

const inputBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";
const selectBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";
const textareaBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";

export default function HODCreateTender() {
  const router = useRouter();
  const params = useParams() || {};
  const tenderId = params.tenderId;
  const isEditMode = !!tenderId;
  const [activeTab, setActiveTab] = useState("details");

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    category: "",
    description: "",
    closingDate: "",
    budget: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    status: "OPEN",
  });

  const [departments, setDepartments] = useState([]);

  const [requirements, setRequirements] = useState([""]);
  const [attachments, setAttachments] = useState([]);
  const [existingDocuments, setExistingDocuments] = useState([]);

  const tabs = useMemo(
    () => [
      { id: "details", label: "Tender Details" },
      { id: "requirements", label: `Requirements${requirements.filter(r => r.trim()).length ? ` (${requirements.filter(r => r.trim()).length})` : ""}` },
      { id: "documents", label: `Documents${attachments.length ? ` (${attachments.length})` : ""}` },
    ],
    [requirements, attachments.length]
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDepartments() {
      try {
        const res = await fetchWithAuth("/api/departments");
        if (res.ok) {
          const data = await res.json();
          setDepartments(data.map(d => d.name));
          if (!isEditMode) {
            setFormData(prev => ({ ...prev, department: data[0]?.name || "" }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch departments:", err);
      } finally {
        if (!isEditMode) setLoading(false);
      }
    }
    getDepartments();
  }, [isEditMode]);

  useEffect(() => {
    if (isEditMode && tenderId) {
      async function getTender() {
        try {
          const res = await fetchWithAuth(`/api/tenders/${tenderId}`);
          if (res.ok) {
            const data = await res.json();
            setFormData({
              title: data.title || "",
              department: data.department || "",
              category: data.category || "",
              description: data.description || "",
              closingDate: data.closingDate || "",
              budget: data.budget || "",
              contactPerson: data.contactPerson || "",
              contactEmail: data.contactEmail || "",
              contactPhone: data.contactPhone || "",
              status: data.status || "OPEN",
            });
            if (data.requirements) setRequirements(data.requirements);
            if (data.documents) setExistingDocuments(data.documents.map(d => ({
              id: d.dbId,
              name: d.name,
              size: d.size
            })));
          } else {
            toast.error("Tender not found");
            router.push("/hod-dashboard/tenders");
          }
        } catch (err) {
          console.error("Failed to fetch tender:", err);
          toast.error("Failed to load tender data");
        } finally {
          setLoading(false);
        }
      }
      getTender();
    }
  }, [isEditMode, tenderId, router]);

  const generateReferenceNo = () => {
    const prefix = "CAL";
    const deptCode = formData.department ? formData.department.substring(0, 4).toUpperCase() : "DEPT";
    const year = new Date().getFullYear();
    const sequence = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `${prefix}/${deptCode}/${year}/${sequence}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return toast.warning("Please enter tender title");
    if (!formData.department) return toast.warning("Please select department");
    if (!formData.description.trim()) return toast.warning("Please enter description");
    if (!formData.closingDate) return toast.warning("Please set closing date");

    setLoading(true);
    try {
      const payload = {
        ...formData,
        referenceNo: isEditMode ? undefined : generateReferenceNo(),
      };

      const url = isEditMode ? `/api/tenders/${tenderId}` : "/api/tenders";
      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(`Tender ${isEditMode ? "updated" : "created"} successfully!`);
        router.push("/hod-dashboard/tenders");
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to save tender");
      }
    } catch (err) {
      console.error("Error saving tender:", err);
      toast.error("An error occurred while saving the tender");
    } finally {
      setLoading(false);
    }
  };

  const handleRequirementChange = (index, value) => {
    const next = [...requirements];
    next[index] = value;
    setRequirements(next);
  };

  const addRequirement = () => setRequirements((prev) => [...prev, ""]);

  const removeRequirement = (index) => {
    if (requirements.length <= 1) return;
    setRequirements((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index) => setAttachments((prev) => prev.filter((_, i) => i !== index));
  const removeExistingDocument = (index) => setExistingDocuments((prev) => prev.filter((_, i) => i !== index));

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
                  <Pill>📄 {isEditMode ? "Edit Tender" : "Create Tender"}</Pill>
                  <Pill tone="success">OPEN by default</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  {isEditMode ? "Edit Tender" : "Create New Tender"}
                </h1>
                <p className="text-gray-600 mt-2">
                  {isEditMode
                    ? "Update tender information, requirements and documents"
                    : "Publish a tender and attach documents for suppliers and contractors."}
                </p>
              </div>

              <button
                onClick={() => router.push("/hod-dashboard/tenders")}
                className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
              >
                ← Back to Tenders
              </button>
            </div>

            {/* TAB BAR */}
            <div className="mt-6 flex flex-wrap gap-6 border-b border-gray-200/70">
              {tabs.map((t) => (
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

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* DETAILS */}
          {activeTab === "details" && (
            <Card className="p-6 md:p-8">
              <SectionTitle title="Tender Details" subtitle="Basic info, dates, budget and contact details" />

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <FieldLabel required>Tender Title</FieldLabel>
                  <input
                    type="text"
                    required
                    className={inputBase}
                    placeholder="e.g., Supply of Workshop Equipment"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <FieldLabel required>Department</FieldLabel>
                  <select
                    required
                    className={selectBase}
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel>Category</FieldLabel>
                  <select
                    className={selectBase}
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel>Issued Date</FieldLabel>
                  <input
                    type="date"
                    className={`${inputBase} bg-gray-50`}
                    value={isEditMode ? "2024-12-01" : new Date().toISOString().split("T")[0]}
                    readOnly
                  />
                </div>

                <div>
                  <FieldLabel required>Closing Date</FieldLabel>
                  <input
                    type="date"
                    required
                    className={inputBase}
                    value={formData.closingDate}
                    onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                  />
                </div>

                <div>
                  <FieldLabel>Status</FieldLabel>
                  <select
                    className={selectBase}
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="OPEN">Open</option>
                    <option value="CLOSED">Closed</option>
                    <option value="AWARDED">Awarded</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <FieldLabel required>Description</FieldLabel>
                  <textarea
                    rows={6}
                    required
                    className={textareaBase}
                    placeholder="Describe scope of work, deliverables, and other relevant information..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>

              {/* Budget & Contact block */}
              <div className="mt-6 p-5 rounded-2xl border border-gray-200/70 bg-gray-50">
                <h3 className="text-sm font-extrabold mb-4" style={{ color: "var(--primary-blue)" }}>
                  Budget & Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <FieldLabel>Budget Range</FieldLabel>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-500 font-semibold">₦</span>
                      <input
                        type="text"
                        className={`${inputBase} pl-9`}
                        placeholder="15,800,000"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Contact Person</FieldLabel>
                    <input
                      type="text"
                      className={inputBase}
                      placeholder="e.g., HOD - Technical"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    />
                  </div>

                  <div>
                    <FieldLabel>Contact Email</FieldLabel>
                    <input
                      type="email"
                      className={inputBase}
                      placeholder="hod.technical@calaya.com"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    />
                  </div>

                  <div>
                    <FieldLabel>Contact Phone</FieldLabel>
                    <input
                      type="tel"
                      className={inputBase}
                      placeholder="+234 801 234 5678"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab("requirements")}
                  className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                  style={{ backgroundColor: "var(--secondary-blue)" }}
                >
                  Continue to Requirements →
                </button>
              </div>
            </Card>
          )}

          {/* REQUIREMENTS */}
          {activeTab === "requirements" && (
            <Card className="p-6 md:p-8">
              <SectionTitle
                title="Tender Requirements"
                subtitle="Add mandatory requirements bidders must meet"
                action={
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="px-5 py-2.5 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    + Add Requirement
                  </button>
                }
              />

              <div className="mt-6 space-y-3">
                {requirements.map((req, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      className={inputBase}
                      placeholder={`Requirement ${index + 1}`}
                      value={req}
                      onChange={(e) => handleRequirementChange(index, e.target.value)}
                    />
                    {requirements.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="px-4 py-3 rounded-2xl font-semibold border bg-white hover:bg-red-50 active:scale-[0.99] transition"
                        style={{ borderColor: "rgba(237,50,55,0.45)", color: "var(--accent-red)" }}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                ))}
                <p className="text-xs text-gray-500 mt-2">Add all mandatory requirements for bidders to qualify.</p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200/70 flex flex-col sm:flex-row justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("details")}
                  className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(109,198,223,0.55)", color: "var(--secondary-blue)" }}
                >
                  ← Back to Details
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("documents")}
                  className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                  style={{ backgroundColor: "var(--secondary-blue)" }}
                >
                  Continue to Documents →
                </button>
              </div>
            </Card>
          )}

          {/* DOCUMENTS */}
          {activeTab === "documents" && (
            <Card className="p-6 md:p-8">
              <SectionTitle title="Upload Tender Documents" subtitle="Attach PDFs, Word/Excel files, images, etc." />

              {/* Existing Documents (Edit Mode) */}
              {isEditMode && existingDocuments.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                    Current Documents
                  </h4>
                  <div className="space-y-3">
                    {existingDocuments.map((doc, index) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-200/70 bg-blue-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-xl">📄</div>
                          <div>
                            <p className="font-semibold text-sm">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.size}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExistingDocument(index)}
                          className="px-3 py-1.5 rounded-xl text-sm font-semibold border bg-white hover:bg-red-50 transition"
                          style={{ borderColor: "rgba(237,50,55,0.45)", color: "var(--accent-red)" }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload New Documents */}
              <div className="rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400 transition">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="hod-tender-upload"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip"
                />
                <label htmlFor="hod-tender-upload" className="cursor-pointer">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}
                  >
                    <span className="text-3xl">📎</span>
                  </div>
                  <p className="text-gray-800 font-extrabold mb-1">Click to upload</p>
                  <p className="text-sm text-gray-500">PDF, DOC, XLSX, JPG, PNG up to 100MB each</p>
                </label>
              </div>

              {/* Newly Uploaded Files */}
              {attachments.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                    New Documents ({attachments.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-2xl border border-gray-200/70 bg-white transition flex items-start justify-between gap-3"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">📄</div>
                          <div className="min-w-0">
                            <p className="font-extrabold text-sm text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="px-4 py-2 rounded-2xl font-semibold border bg-white hover:bg-red-50 active:scale-[0.99] transition"
                          style={{ borderColor: "rgba(237,50,55,0.45)", color: "var(--accent-red)" }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-200/70 flex flex-col sm:flex-row justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("requirements")}
                  className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(109,198,223,0.55)", color: "var(--secondary-blue)" }}
                >
                  ← Back to Requirements
                </button>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => router.push("/hod-dashboard/tenders")}
                    className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-7 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)" }}
                  >
                    {isEditMode ? "Update Tender" : "Create Tender"}
                  </button>
                </div>
              </div>
            </Card>
          )}
        </form>
      </div>
    </Layout>
  );
}