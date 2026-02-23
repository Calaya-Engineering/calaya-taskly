// pages/dashboards/MD/MDCreateTender.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout, {
  DashboardIcon,
  TaskIcon,
  DocumentIcon,
  ReportIcon,
  CalendarIcon,
  AnnouncementIcon,
  ApprovalIcon,
  AlertIcon,
  BellIcon,
  UserIcon,
  TenderIcon,
} from "../../../components/Layout";

const MDMenuItems = [
  { label: "Dashboard", path: "/md-dashboard", icon: <DashboardIcon /> },
  { label: "Tasks (All)", path: "/md-dashboard/tasks", icon: <TaskIcon />, badge: "24" },
  { label: "Active Jobs", path: "/md-dashboard/jobs", icon: <TaskIcon />, badge: "8" },
  { label: "Documents", path: "/md-dashboard/documents", icon: <DocumentIcon />, badge: "3" },
  { label: "Daily Reports", path: "/md-dashboard/reports", icon: <ReportIcon /> },
  { label: "Meetings/Events", path: "/md-dashboard/events", icon: <CalendarIcon />, badge: "2" },
  { label: "Tenders", path: "/md-dashboard/tenders", icon: <DocumentIcon /> },
  { label: "Tender Documents", path: "/md-dashboard/tender-documents", icon: <TenderIcon /> },
  { label: "Announcements", path: "/md-dashboard/announcements", icon: <AnnouncementIcon /> },
  { label: "Approvals", path: "/md-dashboard/approvals", icon: <ApprovalIcon />, badge: "7" },
  { label: "Escalations/Overdue", path: "/md-dashboard/escalations", icon: <AlertIcon />, badge: "3" },
  { label: "Notifications", path: "/md-dashboard/notifications", icon: <BellIcon />, badge: "12" },
  { label: "Profile", path: "/md-dashboard/profile", icon: <UserIcon /> },
];

const departments = ["Procurement", "Technical", "Workshop", "Logistics", "HSE", "Legal", "HR", "IT", "Admin"];

const categories = [
  "Equipment Supply",
  "Training Services",
  "IT Services",
  "Maintenance Services",
  "Professional Services",
  "Consultancy",
  "Construction",
  "Transport Services",
];

/* ---------- UI helpers (MATCH MDTenders + MDTenderDetail) ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-sm ${className}`}>{children}</div>
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

const SectionTitle = ({ title, subtitle, right }) => (
  <div className="flex items-start justify-between gap-3">
    <div>
      <h2 className="text-lg md:text-xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
        {title}
      </h2>
      {subtitle ? <p className="text-sm text-gray-500 mt-1">{subtitle}</p> : null}
    </div>
    {right}
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

export default function MDCreateTender() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const [formData, setFormData] = useState({
    title: "",
    referenceNo: "",
    description: "",
    department: "",
    category: "",
    issuedDate: new Date().toISOString().split("T")[0],
    closingDate: "",
    budget: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    requirements: [],
    attachments: [],
  });

  const [requirements, setRequirements] = useState([""]);
  const [attachments, setAttachments] = useState([]);

  const tabs = useMemo(
    () => [
      { id: "details", label: "Tender Details" },
      { id: "requirements", label: "Requirements" },
      { id: "documents", label: `Documents${attachments.length ? ` (${attachments.length})` : ""}` },
    ],
    [attachments.length]
  );

  const generateReferenceNo = () => {
    const prefix = "CAL";
    const deptCode = formData.department ? formData.department.substring(0, 4).toUpperCase() : "TEN";
    const year = new Date().getFullYear();
    const sequence = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `${prefix}/${deptCode}/${year}/${sequence}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return alert("Please enter tender title");
    if (!formData.department) return alert("Please select department");
    if (!formData.description.trim()) return alert("Please enter description");
    if (!formData.closingDate) return alert("Please set closing date");

    const newTender = {
      ...formData,
      id: `TEN-${Date.now().toString().slice(-3)}`,
      referenceNo: generateReferenceNo(),
      status: "OPEN",
      documents: attachments.length,
      fileSize: "0 MB",
      downloads: 0,
      issuedDate: new Date().toISOString().split("T")[0],
      requirements: requirements.filter((r) => r.trim() !== ""),
      attachments,
    };

    console.log("Creating tender:", newTender);
    alert("Tender created successfully!");
    navigate("/md-dashboard/tenders");
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

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
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
                  <Pill>📄 Create Tender</Pill>
                  <Pill tone="success">OPEN by default</Pill>
                  <Pill tone="purple">CALAYA TASKLY</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Create New Tender
                </h1>
                <p className="text-gray-600 mt-2">Publish a tender and attach documents for suppliers and contractors.</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/md-dashboard/tenders")}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                >
                  ← Back to Tenders
                </button>
              </div>
            </div>

            {/* TAB BAR */}
            <div className="mt-6 flex flex-wrap gap-6 border-b border-gray-200/70">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`pb-4 text-sm font-semibold transition ${
                    activeTab === t.id ? "text-blue-700" : "text-gray-500 hover:text-gray-700"
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
                    placeholder="e.g., Supply of Pipeline Inspection Equipment"
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
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
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
                    onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                  />
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
                      placeholder="e.g., Engr. Michael Okonkwo"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    />
                  </div>

                  <div>
                    <FieldLabel>Contact Email</FieldLabel>
                    <input
                      type="email"
                      className={inputBase}
                      placeholder="procurement@calaya.com"
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

              <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("requirements")}
                  className="px-6 py-3 rounded-2xl font-semibold text-white shadow-sm active:scale-[0.99] transition"
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
                right={
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="px-5 py-2.5 rounded-2xl font-semibold text-white shadow-sm active:scale-[0.99] transition"
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
                  className="px-6 py-3 rounded-2xl font-semibold text-white shadow-sm active:scale-[0.99] transition"
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

              <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center hover:border-blue-300 transition">
                <input type="file" multiple className="hidden" id="tender-doc-upload" onChange={handleFileUpload} />
                <label htmlFor="tender-doc-upload" className="cursor-pointer">
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

              {attachments.length > 0 ? (
                <div className="mt-6">
                  <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                    Uploaded Documents ({attachments.length})
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-2xl border border-gray-200/70 bg-white hover:shadow-sm transition flex items-start justify-between gap-3"
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
              ) : null}

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
                    onClick={() => navigate("/md-dashboard/tenders")}
                    className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-7 py-3 rounded-2xl font-semibold text-white shadow-sm active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)" }}
                  >
                    Create Tender
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
