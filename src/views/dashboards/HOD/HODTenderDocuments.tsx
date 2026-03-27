"use client";

// pages/dashboards/HOD/HODTenderDocuments.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth, getAuthToken } from "@/lib/api";
import { formatFileSize } from "@/lib/file-size";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";
const MANAGED_DEPARTMENTS = ["Technical", "Workshop", "HSE"];

interface Document {
  id: number;
  tenderId: string;
  title: string;
  fileName: string;
  uploadedBy: string;
  uploadedByRole: string;
  uploadedDate: string;
  fileSize: string;
  fileType: string;
  category: string;
  downloads: number;
  status: string;
  department: string;
  comments: Array<Record<string, unknown>>;
  type?: string;
  fileUrl?: string | null;
}

interface Tender {
  id: string;
  dbId: number;
  title: string;
  referenceNo: string;
  description: string;
  issuedDate: string;
  closingDate: string;
  department: string;
  category: string;
  documents: Document[];
  documentsCount?: number;
  submissions: number;
  status: string;
  createdBy: string;
  createdAt: string;
}

interface Department {
  id: number;
  name: string;
}

/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
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

const EmptyState = ({ icon, title, subtitle }) => (
  <div className="text-center py-10">
    <div className="text-5xl mb-3 text-gray-300">{icon}</div>
    <p className="font-extrabold text-gray-900">{title}</p>
    <p className="text-gray-500 mt-1">{subtitle}</p>
  </div>
);

const getTenderDocuments = (tender?: Tender | null) =>
  Array.isArray(tender?.documents) ? tender.documents : [];

export default function HODTenderDocuments() {
  const params = useParams() || {};
  const tenderId = params.tenderId;
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [activeTab, setActiveTab] = useState("documents");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFormData, setUploadFormData] = useState({
    files: [] as File[],
  });

  const [tenders, setTenders] = useState<Tender[]>([]);
  const [departmentsList, setDepartmentsList] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "HOD",
    department: MANAGED_DEPARTMENTS[0] || "",
    managedDepartments: MANAGED_DEPARTMENTS,
  });
  const [selectedUploadDepartment, setSelectedUploadDepartment] = useState(MANAGED_DEPARTMENTS[0] || "");

  const fetchTenders = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/tenders?includeDocuments=true");
      if (res.ok) {
        const data = await res.json();
        const normalizedData = Array.isArray(data)
          ? data.map((tender) => {
              const documents = Array.isArray(tender?.documents) ? tender.documents : [];
              const documentsCount =
                typeof tender?.documentsCount === "number"
                  ? tender.documentsCount
                  : documents.length;

              return {
                ...tender,
                documents,
                documentsCount,
                submissions:
                  typeof tender?.submissions === "number"
                    ? tender.submissions
                    : documents.filter((doc) => doc?.category === "Bid Submission" || doc?.type === "SUBMISSION").length,
              };
            })
          : [];

        setTenders(normalizedData);
        setSelectedTender((currentSelectedTender) => {
          if (tenderId) {
            return normalizedData.find((t: Tender) => t.id === tenderId) || currentSelectedTender;
          }

          if (currentSelectedTender) {
            return normalizedData.find((t: Tender) => t.id === currentSelectedTender.id) || normalizedData[0] || null;
          }

          return normalizedData[0] || null;
        });
      }
    } catch (err) {
      console.error("Failed to fetch tenders:", err);
    } finally {
      setLoading(false);
    }
  }, [tenderId]);

  const fetchDepartments = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/departments");
      if (res.ok) {
        const data = await res.json();
        setDepartmentsList(data);
      }
    } catch (err) {
      console.error("Failed to fetch departments:", err);
    }
  }, []);

  useEffect(() => {
    fetchTenders();
    fetchDepartments();

    const token = getAuthToken();
    if (!token) return;

    const source = new EventSource(`/api/realtime/events?token=${token}`);
    source.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type?.startsWith("tender:")) fetchTenders();
        if (data.type?.startsWith("department:")) fetchDepartments();
      } catch (err) {
        console.error("SSE parse error:", err);
      }
    };

    return () => source.close();
  }, [fetchTenders, fetchDepartments]);

  useEffect(() => {
    let cancelled = false;

    async function loadCurrentUser() {
      try {
        const res = await fetchWithAuth("/api/me");
        const data = await res.json().catch(() => null);
        if (!res.ok || cancelled) return;

        const managedDepartments =
          Array.isArray(data?.managedDepartments) && data.managedDepartments.length
            ? data.managedDepartments
            : MANAGED_DEPARTMENTS;
        const department = data?.department || managedDepartments[0] || "";

        setCurrentUser({
          name: data?.name || data?.email?.split("@")[0] || "HOD",
          department,
          managedDepartments,
        });
        setSelectedUploadDepartment((currentDepartment) => currentDepartment || department || managedDepartments[0] || "");
      } catch (error) {
        console.error("Failed to load current user:", error);
      }
    }

    loadCurrentUser();

    return () => {
      cancelled = true;
    };
  }, []);

  const tenderDocuments = useMemo(() => {
    return getTenderDocuments(selectedTender);
  }, [selectedTender]);

  const updateTenderDocuments = (newDocs: Document[]) => {
    setSelectedTender(prev => prev ? { ...prev, documents: newDocs } : null);
    setTenders(prev => prev.map(t => t.id === selectedTender?.id ? { ...t, documents: newDocs } : t));
  };

  const departments = useMemo(() => ["all", ...Array.from(new Set([...departmentsList.map(d => d.name), ...tenders.map((t) => t.department)]))], [departmentsList, tenders]);

  const filteredTenders = useMemo(() => {
    return tenders.filter((tender) => {
      if (statusFilter !== "all" && tender.status !== statusFilter) return false;
      if (departmentFilter !== "all" && tender.department !== departmentFilter) return false;
      if (searchTerm) {
        const s = searchTerm.toLowerCase();
        if (!tender.title.toLowerCase().includes(s) && !tender.referenceNo.toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [searchTerm, statusFilter, departmentFilter]);

  const documentsForSelectedTender = useMemo(() => {
    return getTenderDocuments(selectedTender);
  }, [selectedTender]);

  const submissionsForSelectedTender = useMemo(() => {
    return getTenderDocuments(selectedTender).filter((doc) => doc.category === "Bid Submission" || doc.type === "SUBMISSION");
  }, [selectedTender]);

  const sectionGroups = useMemo(() => {
    const groups = new Map<string, Document[]>();
    for (const document of documentsForSelectedTender.filter((doc) => doc.category !== "Bid Submission")) {
      const department = document.department || "Unassigned";
      const existing = groups.get(department) || [];
      existing.push(document);
      groups.set(department, existing);
    }

    return Array.from(groups.entries()).map(([department, documents]) => ({
      department,
      documents,
    }));
  }, [documentsForSelectedTender]);

  const handleSelectTender = (tender: Tender) => {
    setSelectedTender(tender);
    setActiveTab("documents");
  };

  const handleDownload = (doc: Document) => {
    const token = getAuthToken();
    const url = `/api/documents/${doc.id}/download${token ? `?token=${token}` : ""}`;
    window.open(url, "_blank");
  };

  const handleDeleteDocument = (documentId) => {
    const docToDelete = tenderDocuments.find((doc) => doc.id === documentId);
    if (docToDelete && docToDelete.uploadedByRole === "HOD" && MANAGED_DEPARTMENTS.includes(docToDelete.department)) {
      if (window.confirm("Are you sure you want to delete this document?")) {
        const newDocs = tenderDocuments.filter((doc) => doc.id !== documentId);
        updateTenderDocuments(newDocs);
        toast.success("Document deleted successfully");
      }
    } else {
      toast.error("You can only delete documents you have uploaded");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadFormData({
      ...uploadFormData,
      files,
    });
  };

  const resetUploadForm = () => {
    setUploadFormData({
      files: [],
    });
  };

  const handleUploadDocument = async (e) => {
    e.preventDefault();
    if (!uploadFormData.files.length) return toast.warning("Please select at least one file");
    if (!selectedTender) return toast.warning("Please select a tender first");
    if (!selectedUploadDepartment) return toast.warning("Please choose a department section");

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const uploadedDocuments = [];

      for (const [index, file] of uploadFormData.files.entries()) {
        setUploadProgress(Math.round((index / uploadFormData.files.length) * 70));

        const uploadPayload = new FormData();
        uploadPayload.append("file", file);

        const uploadRes = await fetchWithAuth("/api/upload/cloudinary", {
          method: "POST",
          body: uploadPayload,
        });
        const uploadData = await uploadRes.json().catch(() => null);

        if (!uploadRes.ok || !(uploadData?.secureUrl || uploadData?.url)) {
          throw new Error(uploadData?.error || `Failed to upload ${file.name}`);
        }

        uploadedDocuments.push({
          title: file.name,
          type: "Tender Document",
          fileUrl: uploadData.secureUrl || uploadData.url,
          fileSize: formatFileSize(file.size),
          department: selectedUploadDepartment,
        });
      }

      const createRes = await fetchWithAuth(`/api/tenders/${selectedTender.id}/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          department: selectedUploadDepartment,
          documents: uploadedDocuments,
        }),
      });
      const createdDocument = await createRes.json().catch(() => null);

      if (!createRes.ok) {
        throw new Error(createdDocument?.error || "Failed to save tender document");
      }

      setUploadProgress(100);
      await fetchTenders();
      toast.success(`${uploadFormData.files.length} document(s) uploaded to the ${selectedUploadDepartment} section`);
      setIsUploadModalOpen(false);
      resetUploadForm();
    } catch (error) {
      console.error("Failed to upload tender document:", error);
      toast.error(error instanceof Error ? error.message : "Failed to upload document");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const getStatusTone = (status) => {
    if (status === "OPEN") return "success";
    if (status === "AWARDED") return "purple";
    if (status === "CLOSED") return "warn";
    return "default";
  };

  const getRoleTone = (role) => {
    if (role === "MD") return "purple";
    if (role === "HOD") return "info";
    if (role === "Vendor") return "success";
    return "warn";
  };

  const getDepartmentTone = (dept) => {
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

  const getFileTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "pdf": return "📕";
      case "xlsx":
      case "xls": return "📊";
      case "docx":
      case "doc": return "📄";
      case "zip": return "📦";
      default: return "📎";
    }
  };

  const canDeleteDocument = (doc) => {
    return doc.uploadedByRole === "HOD" && MANAGED_DEPARTMENTS.includes(doc.department);
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
                  <Pill>{renderNodeWithIcons("📁 Tender Workspace")}</Pill>
                  <Pill tone="info">Documents & Submissions</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Tender Documents & Submissions
                </h1>
                <p className="text-gray-600 mt-2">Review tender documents and vendor submissions across your managed sections.</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Your Departments:</span>
                  {currentUser.managedDepartments.map((dept) => (
                    <Pill key={dept} tone={getDepartmentTone(dept)}>{dept}</Pill>
                  ))}
                </div>
              </div>

              <Link href="/hod-dashboard/tenders">
                <button
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                >
                  ← Back to Tenders
                </button>
              </Link>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: TENDER LIST */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <SectionTitle title="All Tenders" subtitle={`${tenders.length} total`} action={null} />

              <div className="mt-5 space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by title or reference..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <span className="absolute left-4 top-3.5 text-gray-400">{renderNodeWithIcons("🔎")}</span>
                </div>

                <div>
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d === "all" ? "All Departments" : d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All", tone: "default" },
                    { id: "OPEN", label: "Open", tone: "success" },
                    { id: "CLOSED", label: "Closed", tone: "warn" },
                    { id: "AWARDED", label: "Awarded", tone: "purple" },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setStatusFilter(b.id)}
                      className={`px-3 py-2 rounded-2xl text-xs font-semibold border transition active:scale-[0.99] ${statusFilter === b.id ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      style={{
                        borderColor: statusFilter === b.id ? "rgba(44,75,155,0.35)" : "#e5e7eb",
                        color: statusFilter === b.id ? "var(--primary-blue)" : "#374151",
                      }}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {loading ? (
                  <div className="py-10 flex flex-col items-center justify-center">
                    <div className="w-8 h-8 border-3 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-2"></div>
                    <p className="text-xs text-gray-500 font-semibold">Fetching tenders...</p>
                  </div>
                ) : filteredTenders.map((tender) => {
                  const selected = selectedTender?.id === tender.id;
                  const isMyDept = currentUser.managedDepartments.includes(tender.department);

                  return (
                    <button
                      key={tender.id}
                      onClick={() => handleSelectTender(tender)}
                      className={`w-full text-left p-4 rounded-2xl border transition ${selected ? "bg-blue-50 border-blue-200" : "bg-white hover:bg-gray-50 border-gray-200/70"
                        }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-extrabold text-sm text-gray-900 truncate">{tender.title}</p>
                          <p className="text-xs text-gray-500 mt-1 truncate">{tender.referenceNo}</p>
                        </div>
                        <Pill tone={getStatusTone(tender.status)}>{tender.status}</Pill>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                        <Pill tone={getDepartmentTone(tender.department)}>{tender.department}</Pill>
                        {isMyDept && <Pill tone="info">{renderNodeWithIcons("📌 Your Dept")}</Pill>}
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                        <span>{renderNodeWithIcons("📄 ")}{Array.isArray(tender.documents) ? tender.documents.length : tender.documentsCount || 0} docs</span>
                        <span>{renderNodeWithIcons("📥 ")}{tender.submissions || 0} bids</span>
                        <span>⏰ {tender.closingDate}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <Card className="p-10 flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-semibold tracking-wide">Loading workspace...</p>
              </Card>
            ) : selectedTender ? (
              <>
                {/* Tender header */}
                <Card className="overflow-hidden">
                  <div className="p-6 md:p-7">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Pill>{renderNodeWithIcons("📌 Selected")}</Pill>
                          <Pill tone={getStatusTone(selectedTender.status)}>{selectedTender.status}</Pill>
                          <Pill tone={getDepartmentTone(selectedTender.department)}>{selectedTender.department}</Pill>
                          {currentUser.managedDepartments.includes(selectedTender.department) && (
                            <Pill tone="info">{renderNodeWithIcons("📌 Your Department")}</Pill>
                          )}
                        </div>
                        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight truncate" style={{ color: "var(--primary-blue)" }}>
                          {selectedTender.title}
                        </h2>
                        <p className="text-gray-600 mt-1 truncate">{selectedTender.referenceNo}</p>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-3">
                          <span>{renderNodeWithIcons("📄 ")}{documentsForSelectedTender.length} documents</span>
                          <span>{renderNodeWithIcons("🏢 ")}{sectionGroups.length} sections</span>
                          <span>{renderNodeWithIcons("📥 ")}{submissionsForSelectedTender.length} submissions</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsUploadModalOpen(true)}
                          className="px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                          style={{ backgroundColor: "var(--accent-red)" }}
                        >
                          + Upload Document
                        </button>
                        <Link href={`/hod-dashboard/tender/${selectedTender.id}`}>
                          <button
                            className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                            style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                          >
                            View Tender
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex flex-wrap border-t border-gray-200/70">
                    {[
                      { id: "documents", label: `All Documents (${documentsForSelectedTender.length})` },
                      { id: "submissions", label: `Bid Submissions (${submissionsForSelectedTender.length})` },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`px-6 py-4 text-sm font-semibold transition ${activeTab === t.id ? "text-blue-700" : "text-gray-500 hover:text-gray-700"
                          }`}
                        style={{
                          borderBottom: activeTab === t.id ? "2px solid var(--primary-blue)" : "2px solid transparent",
                        }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Documents/Submissions list */}
                <Card className="p-6">
                  {activeTab === "documents" ? (
                    <div className="space-y-4">
                      <SectionTitle title="Tender Documents" subtitle="Internal tender files (excluding vendor bids)" action={null} />

                      {sectionGroups.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {sectionGroups.map((section) => (
                            <div
                              key={section.department}
                              className={`rounded-2xl border p-4 ${currentUser.managedDepartments.includes(section.department) ? "border-blue-200 bg-blue-50/60" : "border-gray-200/70 bg-white"}`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="font-extrabold text-gray-900">{section.department}</p>
                                  <p className="text-sm text-gray-500 mt-1">{section.documents.length} file{section.documents.length === 1 ? "" : "s"}</p>
                                </div>
                                {currentUser.managedDepartments.includes(section.department) ? <Pill tone="info">Your Section</Pill> : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      <div className="mt-5 space-y-4">
                        {documentsForSelectedTender.filter((d) => d.category !== "Bid Submission").length ? (
                          documentsForSelectedTender
                            .filter((d) => d.category !== "Bid Submission")
                            .map((doc) => (
                              <div key={doc.id} className="p-5 rounded-2xl border border-gray-200/70 transition">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-3 min-w-0">
                                    <div
                                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl"
                                      style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}
                                    >
                                      {renderNodeWithIcons(getFileTypeIcon(doc.fileType))}
                                    </div>
                                    <div className="min-w-0">
                                      <p className="font-extrabold text-gray-900 truncate">{doc.title}</p>
                                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                                        <Pill tone={getRoleTone(doc.uploadedByRole)}>{doc.uploadedByRole}</Pill>
                                        <span className="inline-block max-w-[180px] truncate align-bottom">{doc.uploadedBy}</span>
                                        <span className="text-gray-300">•</span>
                                        <span>{doc.uploadedDate}</span>
                                      </div>
                                      <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-600">
                                        <Pill tone={getDepartmentTone(doc.department)}>{doc.department}</Pill>
                                        <span className="text-gray-400">•</span>
                                        <span className="truncate">{doc.fileName}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-right shrink-0">
                                    <div className="text-xs text-gray-500">{doc.fileSize}</div>
                                    <div className="text-xs text-gray-500 mt-1">{renderNodeWithIcons("📥 ")}{doc.downloads}</div>
                                  </div>
                                </div>

                                <div className="mt-4 flex items-center justify-end gap-3">
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleDownload(doc)}
                                      className="px-5 py-2 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition inline-flex items-center gap-2"
                                      style={{ backgroundColor: "var(--secondary-blue)" }}
                                    >
                                      {renderNodeWithIcons("⬇️")} Download
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                        ) : (
                          <EmptyState icon="📄" title="No documents" subtitle="No internal documents available for this tender." />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <SectionTitle title="Bid Submissions" subtitle="Vendor bids submitted for this tender" action={null} />

                      <div className="mt-5 space-y-4">
                        {submissionsForSelectedTender.length ? (
                          submissionsForSelectedTender.map((doc) => (
                            <div key={doc.id} className="p-5 rounded-2xl border border-gray-200/70 transition">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3 min-w-0">
                                  <div
                                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl"
                                    style={{ backgroundColor: "rgba(34,197,94,0.12)" }}
                                  >{renderNodeWithIcons("\n                                    🏢\n                                  ")}</div>
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-gray-900 truncate">{doc.title}</p>
                                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                                      <Pill tone="success">Vendor</Pill>
                                      <span className="inline-block max-w-[180px] truncate align-bottom">{doc.uploadedBy}</span>
                                      <span className="text-gray-300">•</span>
                                      <span>{doc.uploadedDate}</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-600">
                                      <Pill tone={getDepartmentTone(doc.department)}>{doc.department}</Pill>
                                      <span className="text-gray-400">•</span>
                                      <span className="truncate">{doc.fileName}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="text-right shrink-0">
                                  <div className="text-xs text-gray-500">{doc.fileSize}</div>
                                  <div className="text-xs text-gray-500 mt-1">{renderNodeWithIcons("📥 ")}{doc.downloads}</div>
                                </div>
                              </div>

                              <div className="mt-4 flex justify-end">
                                <button
                                  onClick={() => handleDownload(doc)}
                                  className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition inline-flex items-center gap-2"
                                  style={{ backgroundColor: "var(--secondary-blue)" }}
                                >
                                  {renderNodeWithIcons("⬇️")} Download Bid
                                </button>
                              </div>

                            </div>
                          ))
                        ) : (
                          <EmptyState icon="📥" title="No submissions yet" subtitle="No vendor bid submissions received for this tender." />
                        )}
                      </div>
                    </div>
                  )}
                </Card>

              </>
            ) : (
              <Card className="p-12 text-center">
                <div
                  className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}
                >
                  <span className="text-4xl">{renderNodeWithIcons("📋")}</span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">Select a Tender</h3>
                <p className="text-gray-600">Choose a tender from the left panel to view documents and submissions.</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Upload Document Modal */}
      {isUploadModalOpen && selectedTender && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsUploadModalOpen(false)}></div>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden border border-gray-200 transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      Upload Tender Documents
                    </h3>
                    <p className="text-gray-600 mt-2">Add one or more documents to {selectedTender.title}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Pill tone={getDepartmentTone(selectedUploadDepartment || currentUser.department)}>{selectedUploadDepartment || currentUser.department}</Pill>
                      <Pill tone="info">Department Section</Pill>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsUploadModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>

                <form onSubmit={handleUploadDocument} className="space-y-6">
                  <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">Section</label>
                    <select
                      value={selectedUploadDepartment}
                      onChange={(e) => setSelectedUploadDepartment(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                      {currentUser.managedDepartments.map((department) => (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">
                      Files <span className="text-red-500">*</span>
                    </label>
                    <div className="rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400 transition">
                      <input
                        type="file"
                        id="hod-document-upload"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="hod-document-upload" className="cursor-pointer">
                        <div
                          className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}
                        >
                          <span className="text-3xl">{renderNodeWithIcons("📎")}</span>
                        </div>
                        {uploadFormData.files.length ? (
                          <div>
                            <p className="font-extrabold text-gray-900">{uploadFormData.files.length} file(s) selected</p>
                            <div className="mt-2 space-y-1 text-sm text-gray-500">
                              {uploadFormData.files.slice(0, 4).map((file) => (
                                <p key={`${file.name}-${file.size}`}>{file.name}</p>
                              ))}
                              {uploadFormData.files.length > 4 ? <p>and {uploadFormData.files.length - 4} more...</p> : null}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-800 font-extrabold mb-2">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-gray-500">
                              PDF, DOC, XLSX and other large files
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading documents...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%`, backgroundColor: "var(--primary-blue)" }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-200/70">
                    <button
                      type="button"
                      onClick={() => setIsUploadModalOpen(false)}
                      className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUploading}
                      className={`px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition ${isUploading ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                      style={{ backgroundColor: "var(--accent-red)" }}
                    >
                      {isUploading ? "Uploading..." : "Upload Documents"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
