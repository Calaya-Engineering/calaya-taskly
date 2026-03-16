"use client";

// pages/dashboards/Staff/StaffTenderDocuments.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth, getAuthToken } from "@/lib/api";
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

export default function StaffTenderDocuments() {
  const params = useParams() || {};
  const tenderId = params.tenderId;
  const router = useRouter();
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFormData, setUploadFormData] = useState({
    title: '',
    category: 'Staff Document',
    file: null as File | null,
    description: '',
    fileType: '',
    fileSize: ''
  });

  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTenders = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/tenders");
      if (res.ok) {
        const data = await res.json();
        setTenders(data);
        if (tenderId) {
          const found = data.find((t: Tender) => t.id === tenderId);
          if (found) setSelectedTender(found);
        }
      }
    } catch (err) {
      console.error("Failed to fetch tenders:", err);
    } finally {
      setLoading(false);
    }
  }, [tenderId]);

  useEffect(() => {
    fetchTenders();

    const token = getAuthToken();
    if (!token) return;

    const source = new EventSource(`/api/realtime/events?token=${token}`);
    source.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type?.startsWith("tender:")) fetchTenders();
      } catch { /* ignored */ }
    };
    return () => source.close();
  }, [fetchTenders]);

  const tenderDocuments = useMemo(() => {
    return selectedTender?.documents || [];
  }, [selectedTender]);

  const updateTenderDocuments = (newDocs: Document[]) => {
    setSelectedTender(prev => prev ? { ...prev, documents: newDocs } : null);
    setTenders(prev => prev.map(t => t.id === selectedTender?.id ? { ...t, documents: newDocs } : t));
  };

  const [allComments, setAllComments] = useState<Comment[]>([]);

  // Load saved comment draft from sessionStorage
  useEffect(() => {
    const savedComment = sessionStorage.getItem(STORAGE_KEYS.COMMENT_DRAFT);
    if (savedComment) setComment(savedComment);
  }, []);

  // Save comment draft to sessionStorage
  useEffect(() => {
    if (comment) sessionStorage.setItem(STORAGE_KEYS.COMMENT_DRAFT, comment);
    else sessionStorage.removeItem(STORAGE_KEYS.COMMENT_DRAFT);
  }, [comment]);


  const filteredTenders = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return tenders.filter((tender) => {
      if (query) {
        const hit =
          tender.title.toLowerCase().includes(query) ||
          tender.referenceNo.toLowerCase().includes(query) ||
          tender.department.toLowerCase().includes(query);
        if (!hit) return false;
      }
      return true;
    });
  }, [searchTerm]);

  const documentsForSelectedTender = useMemo(() => {
    return selectedTender?.documents || [];
  }, [selectedTender]);

  const staffDocumentsForSelectedTender = useMemo(() => {
    return (selectedTender?.documents || []).filter((doc) => doc.uploadedByRole === "Staff");
  }, [selectedTender]);

  const handleSelectTender = (tender: Tender) => {
    setSelectedTender(tender);
  };

  const handleDownload = (doc: Document) => {
    toast.info(`Downloading: ${doc.fileName}\nSize: ${doc.fileSize}\nCategory: ${doc.category}`);
  };

  const handleDeleteDocument = (documentId) => {
    const docToDelete = tenderDocuments.find((doc) => doc.id === documentId);
    if (docToDelete && docToDelete.uploadedBy === STAFF_NAME) {
      if (window.confirm('Are you sure you want to delete this document?')) {
        const newDocs = tenderDocuments.filter((doc) => doc.id !== documentId);
        updateTenderDocuments(newDocs);
        toast.success('Document deleted successfully');
      }
    } else {
      toast.error('You can only delete documents you have uploaded');
    }
  };

  const handleAddComment = (documentId) => {
    if (!comment.trim()) return toast.warning('Please enter a comment');

    const newComment = {
      id: allComments.length + 1,
      tenderId: String(selectedTender?.id || ""),
      documentId,
      user: STAFF_NAME,
      role: 'Staff',
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0] + ' ' +
        new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setAllComments([...allComments, newComment]);
    const newDocs = tenderDocuments.map((doc) =>
      doc.id === documentId
        ? { ...doc, comments: [...(doc.comments || []), newComment] }
        : doc
    );
    updateTenderDocuments(newDocs);
    setComment('');
  };

  // Document Upload Handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size exceeds 50MB limit');
      return;
    }
    setUploadFormData({
      ...uploadFormData,
      file,
      fileType: file.name.split('.').pop().toUpperCase(),
      fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
    });
  };

  const handleUploadInputChange = (e) => {
    const { name, value } = e.target;
    setUploadFormData({ ...uploadFormData, [name]: value });
  };

  const resetUploadForm = () => {
    setUploadFormData({
      title: '',
      category: 'Staff Document',
      file: null,
      description: '',
      fileType: '',
      fileSize: ''
    });
  };

  const handleUploadDocument = (e) => {
    e.preventDefault();
    if (!uploadFormData.title.trim()) return toast.warning('Please enter document title');
    if (!uploadFormData.file) return toast.warning('Please select a file');

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          const newDocument: Document = {
            id: tenderDocuments.length + 1,
            tenderId: String(selectedTender?.id || ""),
            title: uploadFormData.title,
            fileName: uploadFormData.file?.name || "unknown",
            uploadedBy: STAFF_NAME,
            uploadedByRole: 'Staff',
            uploadedDate: new Date().toISOString().split('T')[0],
            fileSize: uploadFormData.fileSize,
            fileType: uploadFormData.fileType || "PDF",
            category: uploadFormData.category,
            downloads: 0,
            status: 'active',
            department: selectedTender?.department || "",
            comments: [],
          };
          const newDocs = [...tenderDocuments, newDocument];
          updateTenderDocuments(newDocs);
          setIsUploading(false);
          toast.success('Document uploaded successfully!');
          setIsUploadModalOpen(false);
          resetUploadForm();
          return 0;
        }
        return prev + 10;
      });
    }, 200);
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
                  <Pill>📁 Tender Documents</Pill>
                  <Pill tone="warn">Staff Portal</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Tender Documents
                </h1>
                <p className="text-gray-600 mt-2">View tender documents and submit your own documents for review.</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm text-gray-500">Staff:</span>
                  <Pill tone="warn">{STAFF_NAME}</Pill>
                  <Pill tone={getDepartmentTone(STAFF_DEPARTMENT)}>{STAFF_DEPARTMENT}</Pill>
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
                  <span className="absolute left-4 top-3.5 text-gray-400">🔎</span>
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
                        <span>📄 {tender.documents?.length || 0} docs</span>
                        <span>📥 {tender.submissions || 0} bids</span>
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
                          <Pill>📌 Selected</Pill>
                          <Pill tone={getStatusTone(selectedTender.status)}>{selectedTender.status}</Pill>
                          <Pill tone={getDepartmentTone(selectedTender.department)}>{selectedTender.department}</Pill>
                        </div>
                        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight truncate" style={{ color: "var(--primary-blue)" }}>
                          {selectedTender.title}
                        </h2>
                        <p className="text-gray-600 mt-1 truncate">{selectedTender.referenceNo}</p>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-3">
                          <span>📄 {documentsForSelectedTender.length} documents</span>
                          <span>📥 {staffDocumentsForSelectedTender.length} your docs</span>
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
                      My Documents ({staffDocumentsForSelectedTender.length})
                    </button>
                  </div>
                </Card>

                {/* Documents list */}
                <Card className="p-6">
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
                                {getFileTypeIcon(doc.fileType)}
                              </div>
                              <div className="min-w-0">
                                <p className="font-extrabold text-gray-900 truncate">{doc.title}</p>
                                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                                  <Pill tone={getRoleTone(doc.uploadedByRole)}>{doc.uploadedByRole}</Pill>
                                  <span className="truncate">{doc.uploadedBy}</span>
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
                              <div className="text-xs text-gray-500 mt-1">📥 {doc.downloads}</div>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div className="text-xs text-gray-500">Comments: {doc.comments?.length || 0}</div>
                            <div className="flex gap-2">
                              {doc.uploadedByRole === 'Staff' && doc.uploadedBy === STAFF_NAME && (
                                <button
                                  onClick={() => handleDeleteDocument(doc.id)}
                                  className="px-4 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-red-50 active:scale-[0.99] transition"
                                  style={{ borderColor: "rgba(237,50,55,0.45)", color: "var(--accent-red)" }}
                                >
                                  Delete
                                </button>
                              )}
                              <button
                                onClick={() => handleDownload(doc)}
                                className="px-5 py-2 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition inline-flex items-center gap-2"
                                style={{ backgroundColor: "var(--secondary-blue)" }}
                              >
                                ⬇️ Download
                              </button>
                            </div>
                          </div>

                          {/* Comments */}
                          <div className="mt-5 pt-4 border-t border-gray-200/70">
                            <p className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                              Comments
                            </p>

                            <div className="space-y-3">
                              {(doc.comments || []).slice(0, 2).map((c) => (
                                <div key={c.id} className="flex items-start gap-3">
                                  <div
                                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-extrabold"
                                    style={{ backgroundColor: c.role === "MD" ? "#7c3aed" : "var(--primary-blue)" }}
                                  >
                                    {c.user?.charAt(0) || "U"}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="text-xs font-extrabold text-gray-900">{c.user}</span>
                                      <Pill tone={getRoleTone(c.role)}>{c.role}</Pill>
                                      <span className="text-xs text-gray-500">{c.date}</span>
                                    </div>
                                    <p className="text-xs text-gray-700 mt-1">{c.comment}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Add comment */}
                            <div className="mt-4 flex items-start gap-3">
                              <div
                                className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-extrabold"
                                style={{ backgroundColor: "var(--warn)" }}
                              >
                                {STAFF_NAME.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <textarea
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  placeholder="Add your comment or feedback..."
                                  rows={2}
                                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                />
                                <div className="flex justify-end mt-2">
                                  <button
                                    type="button"
                                    onClick={() => handleAddComment(doc.id)}
                                    className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                                    style={{ backgroundColor: "var(--primary-blue)" }}
                                  >
                                    Post Comment
                                  </button>
                                </div>
                              </div>
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
                  <span className="text-4xl">📋</span>
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
                      Upload Document
                    </h3>
                    <p className="text-gray-600 mt-2">Add a document to {selectedTender.title}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Pill tone="warn">Staff</Pill>
                      <Pill tone={getDepartmentTone(selectedTender.department)}>{selectedTender.department}</Pill>
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
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">
                      Document Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={uploadFormData.title}
                      onChange={handleUploadInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="e.g., Technical Question"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={uploadFormData.category}
                      onChange={handleUploadInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Staff Document">Staff Document</option>
                      <option value="Technical Question">Technical Question</option>
                      <option value="Clarification Request">Clarification Request</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">Description (Optional)</label>
                    <textarea
                      name="description"
                      value={uploadFormData.description}
                      onChange={handleUploadInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Brief description of the document..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">
                      File <span className="text-red-500">*</span>
                    </label>
                    <div className="rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400 transition">
                      <input
                        type="file"
                        id="staff-document-upload"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="staff-document-upload" className="cursor-pointer">
                        <div
                          className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}
                        >
                          <span className="text-3xl">📎</span>
                        </div>
                        {uploadFormData.file ? (
                          <div>
                            <p className="font-extrabold text-gray-900">{uploadFormData.file.name}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {uploadFormData.fileSize} • {uploadFormData.fileType}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-800 font-extrabold mb-2">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-gray-500">
                              PDF, DOC, XLSX up to 50MB
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading document...</span>
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
                      {isUploading ? "Uploading..." : "Upload Document"}
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