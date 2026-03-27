"use client";

// pages/dashboards/Staff/StaffTenderDocuments.jsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth, getAuthToken } from "@/lib/api";
import { formatFileSize } from "@/lib/file-size";
import { useSSE } from "@/hooks/useSSE";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";
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

// Staff details
const STAFF_NAME = 'John Doe';
const STAFF_DEPARTMENT = 'Technical';

// Storage keys for draft
const STORAGE_KEYS = {
  COMMENT_DRAFT: 'staffTenderComment_draft',
};

interface Comment {
  id: number;
  tenderId: string;
  documentId: number;
  user: string;
  role: string;
  comment: string;
  date: string;
}

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
  comments: Comment[];
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

const getStatusTone = (status) => {
  if (status === "OPEN") return "success";
  if (status === "CLOSED") return "warn";
  if (status === "AWARDED") return "purple";
  return "default";
};

const getDepartmentTone = (dept) => {
  const tones = {
    Technical: "info",
    Workshop: "warn",
    HSE: "success",
    IT: "purple",
    Admin: "default",
  };
  return tones[dept] || "default";
};

const getRoleTone = (role) => {
  switch (role) {
    case 'MD': return 'purple';
    case 'HOD': return 'info';
    case 'Vendor': return 'success';
    case 'Staff': return 'warn';
    case 'Procurement': return 'default';
    default: return 'default';
  }
};

const getFileTypeIcon = (type) => {
  switch (type?.toLowerCase()) {
    case 'pdf': return '📕';
    case 'xlsx':
    case 'xls': return '📊';
    case 'docx':
    case 'doc': return '📄';
    case 'zip': return '📦';
    default: return '📎';
  }
};

const fmtDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    hour12: true
  }) : "Not set";

const safeLower = (value) => String(value ?? "").toLowerCase();
const getTenderDocuments = (tender?: Tender | null) =>
  Array.isArray(tender?.documents) ? tender.documents : [];

export default function StaffTenderDocuments() {
  const params = useParams() || {};
  const tenderId = params.tenderId;
  const router = useRouter();
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFormData, setUploadFormData] = useState({
    files: [] as File[],
  });

  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const lastRefetchRef = useRef(0);
  const [currentUser, setCurrentUser] = useState({
    name: STAFF_NAME,
    department: STAFF_DEPARTMENT,
  });

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

  useEffect(() => {
    fetchTenders();
  }, [fetchTenders]);

  useEffect(() => {
    let cancelled = false;

    async function loadCurrentUser() {
      try {
        const res = await fetchWithAuth("/api/me");
        const data = await res.json().catch(() => null);
        if (!res.ok || cancelled) return;

        setCurrentUser({
          name: data?.name || data?.email?.split("@")[0] || STAFF_NAME,
          department: data?.department || STAFF_DEPARTMENT,
        });
      } catch (error) {
        console.error("Failed to load current user:", error);
      }
    }

    loadCurrentUser();

    return () => {
      cancelled = true;
    };
  }, []);

  useSSE("/api/realtime/events", (ev) => {
    if (!ev?.type || ev.type === "ping" || !String(ev.type).startsWith("tender:")) return;
    const now = Date.now();
    if (now - lastRefetchRef.current < 1500) return;
    lastRefetchRef.current = now;
    fetchTenders();
  });

  const tenderDocuments = useMemo(() => {
    return getTenderDocuments(selectedTender);
  }, [selectedTender]);

  const updateTenderDocuments = (newDocs: Document[]) => {
    setSelectedTender(prev => prev ? { ...prev, documents: newDocs } : null);
    setTenders(prev => prev.map(t => t.id === selectedTender?.id ? { ...t, documents: newDocs } : t));
  };

  const filteredTenders = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return tenders.filter((tender) => {
      if (query) {
        const hit =
          safeLower(tender.title).includes(query) ||
          safeLower(tender.referenceNo).includes(query) ||
          safeLower(tender.department).includes(query);
        if (!hit) return false;
      }
      return true;
    });
  }, [searchTerm, tenders]);

  const documentsForSelectedTender = useMemo(() => {
    return getTenderDocuments(selectedTender);
  }, [selectedTender]);

  const staffDocumentsForSelectedTender = useMemo(() => {
    return getTenderDocuments(selectedTender).filter((doc) => doc.department === currentUser.department && doc.category !== "Bid Submission");
  }, [currentUser.department, selectedTender]);

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
  };

  const handleDownload = (doc: Document) => {
    const token = getAuthToken();
    const url = `/api/documents/${doc.id}/download${token ? `?token=${token}` : ""}`;
    window.open(url, "_blank");
  };

  const handleDeleteDocument = (documentId) => {
    const docToDelete = tenderDocuments.find((doc) => doc.id === documentId);
    if (docToDelete && docToDelete.uploadedBy === currentUser.name) {
      if (window.confirm('Are you sure you want to delete this document?')) {
        const newDocs = tenderDocuments.filter((doc) => doc.id !== documentId);
        updateTenderDocuments(newDocs);
        toast.success('Document deleted successfully');
      }
    } else {
      toast.error('You can only delete documents you have uploaded');
    }
  };

  // Document Upload Handlers
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
    if (!uploadFormData.files.length) return toast.warning('Please select at least one file');
    if (!selectedTender) return toast.warning("Please select a tender first");

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
        });
      }

      const createRes = await fetchWithAuth(`/api/tenders/${selectedTender.id}/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documents: uploadedDocuments,
        }),
      });
      const createdDocument = await createRes.json().catch(() => null);

      if (!createRes.ok) {
        throw new Error(createdDocument?.error || "Failed to save tender document");
      }

      setUploadProgress(100);
      await fetchTenders();
      toast.success(`${uploadFormData.files.length} document(s) uploaded successfully`);
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
                  <Pill>{renderNodeWithIcons("📁 Tender Documents")}</Pill>
                  <Pill tone="warn">Staff Portal</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Tender Documents
                </h1>
                <p className="text-gray-600 mt-2">View tender documents and submit your own documents for review.</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm text-gray-500">Staff:</span>
                  <Pill tone="warn">{currentUser.name}</Pill>
                  <Pill tone={getDepartmentTone(currentUser.department)}>{currentUser.department}</Pill>
                </div>
              </div>

              <Link href="/staff-dashboard/tenders">
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
              <SectionTitle title="Available Tenders" subtitle={`${tenders.length} total`} action={null} />

              <div className="mt-5 space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search tenders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <span className="absolute left-4 top-3.5 text-gray-400">{renderNodeWithIcons("🔎")}</span>
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
                        </div>
                        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight truncate" style={{ color: "var(--primary-blue)" }}>
                          {selectedTender.title}
                        </h2>
                        <p className="text-gray-600 mt-1 truncate">{selectedTender.referenceNo}</p>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-3">
                          <span>{renderNodeWithIcons("📄 ")}{documentsForSelectedTender.length} documents</span>
                          <span>{renderNodeWithIcons("🏢 ")}{sectionGroups.length} sections</span>
                          <span>{renderNodeWithIcons("📥 ")}{staffDocumentsForSelectedTender.length} in your section</span>
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
                        <Link href={`/staff-dashboard/tender/${selectedTender.id}`}>
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

                  {/* Filter tabs */}
                  <div className="flex flex-wrap border-t border-gray-200/70">
                    <button
                      onClick={() => setActiveTab("all")}
                      className={`px-6 py-4 text-sm font-semibold transition ${activeTab === "all" ? "text-blue-700" : "text-gray-500 hover:text-gray-700"
                        }`}
                      style={{
                        borderBottom: activeTab === "all" ? "2px solid var(--primary-blue)" : "2px solid transparent",
                      }}
                    >
                      All Documents ({documentsForSelectedTender.length})
                    </button>
                    <button
                      onClick={() => setActiveTab("staff")}
                      className={`px-6 py-4 text-sm font-semibold transition ${activeTab === "staff" ? "text-blue-700" : "text-gray-500 hover:text-gray-700"
                        }`}
                      style={{
                        borderBottom: activeTab === "staff" ? "2px solid var(--primary-blue)" : "2px solid transparent",
                      }}
                    >
                      My Section ({staffDocumentsForSelectedTender.length})
                    </button>
                  </div>
                </Card>

                {/* Documents list */}
                <Card className="p-6">
                  {sectionGroups.length ? (
                    <div className="mb-6">
                      <SectionTitle title="Department Sections" subtitle="Each department works in its own section, but everyone can view all shared files." />
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {sectionGroups.map((section) => (
                          <div
                            key={section.department}
                            className={`rounded-2xl border p-4 ${section.department === currentUser.department ? "border-blue-200 bg-blue-50/60" : "border-gray-200/70 bg-white"}`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="font-extrabold text-gray-900">{section.department}</p>
                                <p className="text-sm text-gray-500 mt-1">{section.documents.length} file{section.documents.length === 1 ? "" : "s"}</p>
                              </div>
                              {section.department === currentUser.department ? <Pill tone={getDepartmentTone(section.department)}>Your Section</Pill> : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="space-y-4">
                    {(activeTab === "all"
                      ? documentsForSelectedTender
                      : staffDocumentsForSelectedTender
                    ).length > 0 ? (
                      (activeTab === "all"
                        ? documentsForSelectedTender
                        : staffDocumentsForSelectedTender
                      ).map((doc) => (
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
                                ⬇️ Download
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <EmptyState
                        icon="📄"
                        title={activeTab === "staff" ? "No documents uploaded" : "No documents available"}
                        subtitle={activeTab === "staff" ? "Upload your first document to get started" : "No documents available for this tender"}
                      />
                    )}
                  </div>
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
                <p className="text-gray-600">Choose a tender from the left panel to view documents and submit your own.</p>
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
                      Upload Documents
                    </h3>
                    <p className="text-gray-600 mt-2">Add one or more documents to {selectedTender.title}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Pill tone="warn">Staff</Pill>
                      <Pill tone={getDepartmentTone(currentUser.department)}>{currentUser.department}</Pill>
                      <Pill tone="info">Your Section</Pill>
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
                    <div className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50 text-gray-700">
                      {currentUser.department}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">
                      Files <span className="text-red-500">*</span>
                    </label>
                    <div className="rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400 transition">
                      <input
                        type="file"
                        id="staff-document-upload"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="staff-document-upload" className="cursor-pointer">
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
                              PDF, DOC, XLSX and other large files. Your upload will appear in the {currentUser.department} section.
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
