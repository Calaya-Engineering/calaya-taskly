"use client";

// pages/dashboards/MD/MDTenderDocuments.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { fetchWithAuth, getAuthToken } from "@/lib/api";
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

interface Department {
  id: number;
  name: string;
}

/* ---------------- UI helpers (MD dashboard style) ---------------- */
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
            : "bg-blue-50 text-blue-700 ring-blue-100";
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

export default function MDTenderDocuments() {
  const params = useParams() || {};
  const tenderId = params.tenderId;
  const router = useRouter();

  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
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

  const fetchDepartments = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/departments");
      if (res.ok) {
        const data = await res.json();
        // setDepartmentsList(data); // This line was removed based on the diff
      }
    } catch (err) {
      console.error("Failed to fetch departments:", err);
    }
  }, []);

  useEffect(() => {
    fetchTenders();
    // fetchDepartments(); // This line was removed based on the diff

    const token = getAuthToken();
    if (!token) return;

    const source = new EventSource(`/api/realtime/events?token=${token}`);
    source.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type?.startsWith("tender:")) fetchTenders();
        // if (data.type?.startsWith("department:")) fetchDepartments(); // This line was removed based on the diff
      } catch { /* ignored */ }
    };
    return () => source.close();
  }, [fetchTenders]); // fetchDepartments removed from dependency array

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
    const saved = sessionStorage.getItem(STORAGE_KEYS.COMMENT_DRAFT);
    if (saved) setComment(saved);
  }, []);

  // Save comment draft to sessionStorage
  useEffect(() => {
    if (comment) sessionStorage.setItem(STORAGE_KEYS.COMMENT_DRAFT, comment);
    else sessionStorage.removeItem(STORAGE_KEYS.COMMENT_DRAFT);
  }, [comment]);

  // If route contains tenderId, auto-select it (nice UX)

  const filteredTenders = useMemo(() => {
    return tenders.filter((tender) => {
      if (statusFilter !== "all" && tender.status !== statusFilter) return false;
      if (searchTerm) {
        const s = searchTerm.toLowerCase();
        if (!tender.title.toLowerCase().includes(s) && !tender.referenceNo.toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [searchTerm, statusFilter]);

  const documentsForSelectedTender = useMemo(() => {
    return selectedTender?.documents || [];
  }, [selectedTender]);

  const submissionsForSelectedTender = useMemo(() => {
    return (selectedTender?.documents || []).filter((doc) => doc.category === "Bid Submission" || (doc.type === "SUBMISSION"));
  }, [selectedTender]);

  const handleSelectTender = (tender: Tender) => {
    setSelectedTender(tender);
    setActiveTab("documents");
  };

  const handleDownload = (doc: Document) => {
    toast.info(`Downloading: ${doc.fileName}\nSize: ${doc.fileSize}\nCategory: ${doc.category}`);
    const token = getAuthToken();
    const url = `/api/documents/${doc.id}/download${token ? `?token=${token}` : ""}`;
    window.open(url, "_blank");
  };

  const handleAddComment = (documentId: number) => {
    if (!selectedTender) return;
    if (!comment.trim()) return toast.warning("Please enter a comment");

    const newComment: Comment = {
      id: allComments.length + 1,
      tenderId: String(selectedTender?.id || ""),
      documentId,
      user: "MD - Managing Director",
      role: "MD",
      comment: comment.trim(),
      date:
        new Date().toISOString().split('T')[0] + ' ' +
        new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setAllComments((p) => [...p, newComment]);

    const newDocs = tenderDocuments.map((doc) =>
      doc.id === documentId
        ? {
          ...doc,
          comments: [...(doc.comments || []), newComment],
        }
        : doc
    );
    updateTenderDocuments(newDocs);

    setComment("");
    sessionStorage.removeItem(STORAGE_KEYS.COMMENT_DRAFT);
  };

  const getStatusTone = (status) => {
    if (status === "OPEN") return "success";
    if (status === "AWARDED") return "default";
    if (status === "CLOSED") return "warn";
    return "default";
  };

  const getRoleTone = (role) => {
    if (role === "MD") return "purple";
    if (role === "HOD") return "default";
    if (role === "Vendor") return "success";
    return "warn";
  };

  const getFileTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "pdf":
        return "📕";
      case "xlsx":
      case "xls":
        return "📊";
      case "docx":
      case "doc":
        return "📄";
      case "zip":
        return "📦";
      default:
        return "📎";
    }
  };

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HERO HEADER */}
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
                  <Pill>📁 Tender Workspace</Pill>
                  <Pill tone="default">Documents & Submissions</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Tender Documents & Submissions
                </h1>
                <p className="text-gray-600 mt-2">Review tender documents, vendor submissions, and leave MD feedback.</p>
              </div>

              <Link href="/md-dashboard/tenders">
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

              {/* Search + filters */}
              <div className="mt-5 space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by title or reference..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <span className="absolute left-4 top-3.5 text-gray-400">🔎</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All", tone: "default" },
                    { id: "OPEN", label: "Open", tone: "success" },
                    { id: "CLOSED", label: "Closed", tone: "warn" },
                    { id: "AWARDED", label: "Awarded", tone: "default" },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setStatusFilter(b.id)}
                      className={`px-3 py-2 rounded-2xl text-xs font-semibold border transition active:scale-[0.99] ${statusFilter === b.id ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      style={{
                        borderColor: statusFilter === b.id ? "rgba(44,75,155,0.35)" : "rgba(229,231,235,1)",
                        color: statusFilter === b.id ? "var(--primary-blue)" : "#374151",
                      }}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className="hidden sm:inline">{b.label}</span>
                        <span className="sm:hidden">{b.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* List */}
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
                      className={`w-full text-left p-4 rounded-2xl border transition ${selected ? "bg-blue-50 border-blue-400/20" : "bg-white hover:bg-gray-50 border-gray-200/70"
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
                        <span className="px-2 py-1 rounded-full bg-gray-100">{tender.department}</span>
                        <span>📄 {tender.documents?.length || 0} docs</span>
                        <span>📥 {tender.submissions || 0} bids</span>
                      </div>

                      <div className="mt-2 text-xs text-gray-500">⏰ Closing: {tender.closingDate}</div>
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
                        </div>
                        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight truncate" style={{ color: "var(--primary-blue)" }}>
                          {selectedTender.title}
                        </h2>
                        <p className="text-gray-600 mt-1 truncate">{selectedTender.referenceNo}</p>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-3">
                          <span className="px-3 py-1 rounded-full bg-gray-100">{selectedTender.department}</span>
                          <span>📄 {documentsForSelectedTender.length} documents</span>
                          <span>📥 {submissionsForSelectedTender.length} submissions</span>
                        </div>
                      </div>

                      <Link href={`/md-dashboard/tender/${selectedTender.id}`}>
                        <button
                          className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                          style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                        >
                          View Tender Details
                        </button>
                      </Link>
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
                      <SectionTitle
                        title="Tender Documents"
                        subtitle="Internal tender files (excluding vendor bids)"
                        action={<Pill tone="default">MD Review</Pill>}
                      />

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
                                        <span className="px-2 py-1 rounded-full bg-gray-100">{doc.category}</span>
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
                                  <button
                                    onClick={() => handleDownload(doc)}
                                    className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition inline-flex items-center gap-2"
                                    style={{ backgroundColor: "var(--secondary-blue)" }}
                                  >
                                    ⬇️ Download
                                  </button>
                                </div>

                                {/* Comments */}
                                <div className="mt-5 pt-4 border-t border-gray-200/70">
                                  <div className="flex items-center justify-between mb-3">
                                    <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                                      Comments
                                    </p>
                                    <span className="text-xs text-gray-500">Latest 2</span>
                                  </div>

                                  <div className="space-y-3">
                                    {(doc.comments || []).slice(0, 2).map((c) => (
                                      <div key={c.id} className="flex items-start gap-3">
                                        <div
                                          className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-xs font-extrabold"
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
                                          <p className="text-sm text-gray-700 mt-1">{c.comment}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Add comment */}
                                  <div className="mt-4 flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-xs font-extrabold bg-purple-600">
                                      MD
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
                          <EmptyState icon="📄" title="No documents" subtitle="No internal documents available for this tender." />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <SectionTitle title="Bid Submissions" subtitle="Vendor bids submitted for this tender" />

                      <div className="mt-5 space-y-4">
                        {submissionsForSelectedTender.length ? (
                          submissionsForSelectedTender.map((doc) => (
                            <div key={doc.id} className="p-5 rounded-2xl border border-gray-200/70 transition">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3 min-w-0">
                                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: "rgba(34,197,94,0.12)" }}>
                                    🏢
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-extrabold text-gray-900 truncate">{doc.title}</p>
                                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                                      <Pill tone="success">Vendor</Pill>
                                      <span className="truncate">{doc.uploadedBy}</span>
                                      <span className="text-gray-300">•</span>
                                      <span>{doc.uploadedDate}</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-600">
                                      <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700">Bid Submission</span>
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

                              <div className="mt-4 flex justify-end">
                                <button
                                  onClick={() => handleDownload(doc)}
                                  className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition inline-flex items-center gap-2"
                                  style={{ backgroundColor: "var(--secondary-blue)" }}
                                >
                                  ⬇️ Download Bid
                                </button>
                              </div>

                              {/* Comments */}
                              <div className="mt-5 pt-4 border-t border-gray-200/70">
                                <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                                  Evaluation Comments ({doc.comments?.length || 0})
                                </p>

                                {doc.comments?.length ? (
                                  <div className="mt-3 space-y-3">
                                    {doc.comments.map((c) => (
                                      <div key={c.id} className="flex items-start gap-3">
                                        <div
                                          className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-xs font-extrabold"
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
                                          <p className="text-sm text-gray-700 mt-1">{c.comment}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500 mt-2">No evaluation comments yet.</p>
                                )}

                                <div className="mt-4 flex items-start gap-3">
                                  <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-xs font-extrabold bg-purple-600">
                                    MD
                                  </div>
                                  <div className="flex-1">
                                    <textarea
                                      value={comment}
                                      onChange={(e) => setComment(e.target.value)}
                                      placeholder="Add evaluation comment or feedback on this bid..."
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
                          <EmptyState icon="📥" title="No submissions yet" subtitle="No vendor bid submissions received for this tender." />
                        )}
                      </div>
                    </div>
                  )}
                </Card>

                {/* Activity */}
                <Card className="p-6">
                  <SectionTitle title="Recent Activity" subtitle="Latest comments on this tender" />

                  <div className="mt-5 space-y-3">
                    {allComments
                      .filter((c) => c.tenderId === selectedTender.id)
                      .slice(0, 3)
                      .map((c) => (
                        <div key={c.id} className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                          <div className="flex items-start gap-3">
                            <div
                              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-xs font-extrabold"
                              style={{ backgroundColor: c.role === "MD" ? "#7c3aed" : "var(--primary-blue)" }}
                            >
                              {c.user?.charAt(0) || "U"}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-extrabold text-sm text-gray-900">{c.user}</span>
                                <Pill tone={getRoleTone(c.role)}>{c.role}</Pill>
                                <span className="text-xs text-gray-500">{c.date}</span>
                              </div>
                              <p className="text-sm text-gray-700 mt-1">{c.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-12 text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}>
                  <span className="text-4xl">📋</span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">Select a Tender</h3>
                <p className="text-gray-600">Choose a tender from the left panel to view documents and submissions.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function EmptyState({ icon, title, subtitle }) {
  return (
    <div className="text-center py-10">
      <div className="text-5xl mb-3 text-gray-300">{icon}</div>
      <p className="font-extrabold text-gray-900">{title}</p>
      <p className="text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
