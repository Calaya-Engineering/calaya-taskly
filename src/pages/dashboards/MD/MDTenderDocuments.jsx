// pages/dashboards/MD/MDTenderDocuments.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  { label: "Tender Documents", path: "/md-dashboard/tender-documents", icon: <TenderIcon />, badge: "12" },
  { label: "Announcements", path: "/md-dashboard/announcements", icon: <AnnouncementIcon /> },
  { label: "Approvals", path: "/md-dashboard/approvals", icon: <ApprovalIcon />, badge: "7" },
  { label: "Escalations/Overdue", path: "/md-dashboard/escalations", icon: <AlertIcon />, badge: "3" },
  { label: "Notifications", path: "/md-dashboard/notifications", icon: <BellIcon />, badge: "12" },
  { label: "Profile", path: "/md-dashboard/profile", icon: <UserIcon /> },
];

// Storage keys for draft
const STORAGE_KEYS = {
  COMMENT_DRAFT: "mdTenderComment_draft",
};

/* ---------------- UI helpers (MD dashboard style) ---------------- */
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

export default function MDTenderDocuments() {
  const { tenderId } = useParams();

  const [selectedTender, setSelectedTender] = useState(null);
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("documents");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock tenders data
  const tenders = [
    {
      id: "TEN-001",
      title: "Supply of Pipeline Inspection Equipment",
      referenceNo: "CAL/PROC/2024/001",
      department: "Technical",
      status: "OPEN",
      closingDate: "2024-12-20",
      documents: 8,
      submissions: 4,
    },
    {
      id: "TEN-002",
      title: "Annual Safety Training Services",
      referenceNo: "CAL/HSE/2024/002",
      department: "HSE",
      status: "OPEN",
      closingDate: "2024-12-22",
      documents: 6,
      submissions: 3,
    },
    {
      id: "TEN-003",
      title: "Workshop Equipment Maintenance",
      referenceNo: "CAL/WORK/2024/004",
      department: "Workshop",
      status: "OPEN",
      closingDate: "2024-12-18",
      documents: 5,
      submissions: 2,
    },
    {
      id: "TEN-004",
      title: "IT Infrastructure Upgrade",
      referenceNo: "CAL/IT/2024/003",
      department: "IT",
      status: "CLOSED",
      closingDate: "2024-12-25",
      documents: 9,
      submissions: 5,
    },
    {
      id: "TEN-005",
      title: "Office Furniture Supply",
      referenceNo: "CAL/ADMIN/2024/007",
      department: "Admin",
      status: "AWARDED",
      closingDate: "2024-12-21",
      documents: 4,
      submissions: 3,
    },
  ];

  // Mock tender documents and submissions
  const [tenderDocuments, setTenderDocuments] = useState([
    {
      id: 1,
      tenderId: "TEN-001",
      title: "Tender Document - Pipeline Equipment",
      fileName: "Tender_Document_Pipeline.pdf",
      uploadedBy: "Procurement Department",
      uploadedByRole: "Procurement",
      uploadedDate: "2024-12-01",
      fileSize: "2.4 MB",
      fileType: "PDF",
      category: "Tender Document",
      downloads: 24,
      status: "active",
      comments: [
        { id: 1, user: "MD - Managing Director", comment: "Please ensure all technical specs are included", date: "2024-12-02 10:30", role: "MD" },
        { id: 2, user: "Procurement Manager", comment: "Technical specs have been added", date: "2024-12-02 14:15", role: "HOD" },
      ],
    },
    {
      id: 2,
      tenderId: "TEN-001",
      title: "Technical Specifications",
      fileName: "Technical_Specifications_Pipeline.pdf",
      uploadedBy: "Technical Department",
      uploadedByRole: "HOD",
      uploadedDate: "2024-12-02",
      fileSize: "3.1 MB",
      fileType: "PDF",
      category: "Specification",
      downloads: 18,
      status: "active",
      comments: [{ id: 3, user: "MD - Managing Director", comment: "Approved. Ensure ISO standards are met.", date: "2024-12-03 09:45", role: "MD" }],
    },
    {
      id: 3,
      tenderId: "TEN-001",
      title: "Vendor Bid - TechEquip Ltd",
      fileName: "Bid_TechEquip_Pipeline.pdf",
      uploadedBy: "TechEquip Ltd",
      uploadedByRole: "Vendor",
      uploadedDate: "2024-12-15",
      fileSize: "5.2 MB",
      fileType: "PDF",
      category: "Bid Submission",
      downloads: 8,
      status: "active",
      comments: [],
    },
    {
      id: 4,
      tenderId: "TEN-001",
      title: "Vendor Bid - Pipeline Solutions Inc",
      fileName: "Bid_Pipeline_Solutions.pdf",
      uploadedBy: "Pipeline Solutions Inc",
      uploadedByRole: "Vendor",
      uploadedDate: "2024-12-14",
      fileSize: "4.8 MB",
      fileType: "PDF",
      category: "Bid Submission",
      downloads: 7,
      status: "active",
      comments: [],
    },
    {
      id: 5,
      tenderId: "TEN-002",
      title: "Safety Training Tender Document",
      fileName: "Safety_Training_Tender.pdf",
      uploadedBy: "HSE Department",
      uploadedByRole: "HOD",
      uploadedDate: "2024-12-02",
      fileSize: "1.8 MB",
      fileType: "PDF",
      category: "Tender Document",
      downloads: 15,
      status: "active",
      comments: [],
    },
    {
      id: 6,
      tenderId: "TEN-002",
      title: "Vendor Bid - Safety First Training",
      fileName: "Bid_Safety_First.pdf",
      uploadedBy: "Safety First Training Ltd",
      uploadedByRole: "Vendor",
      uploadedDate: "2024-12-16",
      fileSize: "3.2 MB",
      fileType: "PDF",
      category: "Bid Submission",
      downloads: 5,
      status: "active",
      comments: [],
    },
  ]);

  const [allComments, setAllComments] = useState([
    { id: 1, tenderId: "TEN-001", documentId: 1, user: "MD - Managing Director", comment: "Please ensure all technical specs are included", date: "2024-12-02 10:30", role: "MD" },
    { id: 2, tenderId: "TEN-001", documentId: 1, user: "Procurement Manager", comment: "Technical specs have been added", date: "2024-12-02 14:15", role: "HOD" },
    { id: 3, tenderId: "TEN-001", documentId: 2, user: "MD - Managing Director", comment: "Approved. Ensure ISO standards are met.", date: "2024-12-03 09:45", role: "MD" },
  ]);

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
  useEffect(() => {
    if (!tenderId) return;
    const found = tenders.find((t) => t.id === tenderId);
    if (found) setSelectedTender(found);
  }, [tenderId]);

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
    return selectedTender ? tenderDocuments.filter((doc) => doc.tenderId === selectedTender.id) : [];
  }, [selectedTender, tenderDocuments]);

  const submissionsForSelectedTender = useMemo(() => {
    return selectedTender
      ? tenderDocuments.filter((doc) => doc.tenderId === selectedTender.id && doc.category === "Bid Submission")
      : [];
  }, [selectedTender, tenderDocuments]);

  const handleSelectTender = (tender) => {
    setSelectedTender(tender);
    setActiveTab("documents");
  };

  const handleDownload = (doc) => {
    alert(`Downloading: ${doc.fileName}\nSize: ${doc.fileSize}\nCategory: ${doc.category}`);
  };

  const handleAddComment = (documentId) => {
    if (!selectedTender) return;
    if (!comment.trim()) return alert("Please enter a comment");

    const now = new Date();
    const newComment = {
      id: allComments.length + 1,
      tenderId: selectedTender.id,
      documentId,
      user: "MD - Managing Director",
      role: "MD",
      comment: comment.trim(),
      date:
        now.toISOString().split("T")[0] +
        " " +
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    setAllComments((p) => [...p, newComment]);

    setTenderDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? {
              ...doc,
              comments: [...(doc.comments || []), newComment],
            }
          : doc
      )
    );

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

              <Link to="/md-dashboard/tenders">
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
              <SectionTitle title="Tenders" subtitle="Pick a tender to review" />

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
                      className={`px-3 py-2 rounded-2xl text-xs font-semibold border transition active:scale-[0.99] ${
                        statusFilter === b.id ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
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
                {filteredTenders.map((tender) => {
                  const selected = selectedTender?.id === tender.id;
                  return (
                    <button
                      key={tender.id}
                      onClick={() => handleSelectTender(tender)}
                      className={`w-full text-left p-4 rounded-2xl border transition ${
                        selected ? "bg-blue-50 border-blue-200" : "bg-white hover:bg-gray-50 border-gray-200/70"
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
                        <span>📄 {tender.documents} docs</span>
                        <span>📥 {tender.submissions} bids</span>
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
            {selectedTender ? (
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

                      <Link to={`/md-dashboard/tender/${selectedTender.id}`}>
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
                        className={`px-6 py-4 text-sm font-semibold transition ${
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
                </Card>

                {/* Documents/Submissions list */}
                <Card className="p-6">
                  {activeTab === "documents" ? (
                    <div className="space-y-4">
                      <SectionTitle
                        title="Tender Documents"
                        subtitle="Internal tender files (excluding vendor bids)"
                        right={<Pill tone="default">MD Review</Pill>}
                      />

                      <div className="mt-5 space-y-4">
                        {documentsForSelectedTender.filter((d) => d.category !== "Bid Submission").length ? (
                          documentsForSelectedTender
                            .filter((d) => d.category !== "Bid Submission")
                            .map((doc) => (
                              <div key={doc.id} className="p-5 rounded-2xl border border-gray-200/70 hover:shadow-sm transition">
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
                                    className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white shadow-sm active:scale-[0.99] transition inline-flex items-center gap-2"
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
                                          className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white shadow-sm active:scale-[0.99] transition"
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
                            <div key={doc.id} className="p-5 rounded-2xl border border-gray-200/70 hover:shadow-sm transition">
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
                                  className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white shadow-sm active:scale-[0.99] transition inline-flex items-center gap-2"
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
                                        className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white shadow-sm active:scale-[0.99] transition"
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
