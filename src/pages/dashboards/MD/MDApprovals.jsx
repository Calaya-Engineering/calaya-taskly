// pages/dashboards/MD/MDApprovals.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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

/* ---------- UI helpers ---------- */
const Card = ({ className = "", children, ...props }) => (
  <div
    className={`bg-white border border-gray-200/70 rounded-2xl shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

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
      : "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

export default function MDApprovals() {
  const [approvalType, setApprovalType] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDocTab, setActiveDocTab] = useState("details"); // details, documents, review
  const [reviewedDocs, setReviewedDocs] = useState({}); // { [docName]: true }

  const approvals = [
    {
      id: "APP-001",
      title: "Safety Audit for Site A",
      type: "TASK_COMPLETION",
      submittedBy: "John Doe",
      department: "HSE",
      submittedDate: "2024-12-15",
      dueDate: "2024-12-18",
      priority: "HIGH",
      status: "PENDING",
      description: "Completed all safety checks and submitted final report for Site A audit",
      taskReference: "TASK-2024-0045",
      attachments: 2,
      daysPending: 1,
      documents: [
        { name: "Safety Audit Report.pdf", size: "2.4 MB", uploadedBy: "John Doe", date: "2024-12-15", type: "pdf" },
        { name: "Site A Inspection Photos.zip", size: "15.2 MB", uploadedBy: "John Doe", date: "2024-12-15", type: "zip" },
      ],
    },
    {
      id: "APP-002",
      title: "Quarterly Financial Report - Q4",
      type: "DOCUMENT",
      submittedBy: "James Wilson",
      department: "Accounts",
      submittedDate: "2024-12-15",
      dueDate: "2024-12-17",
      priority: "CRITICAL",
      status: "PENDING",
      description: "Q4 financial summary and projections ready for MD approval before board meeting",
      documentReference: "FIN-Q4-2024",
      attachments: 3,
      daysPending: 1,
      documents: [
        { name: "Q4 Financial Summary.xlsx", size: "1.8 MB", uploadedBy: "James Wilson", date: "2024-12-15", type: "excel" },
        { name: "Projections 2025.pdf", size: "3.2 MB", uploadedBy: "James Wilson", date: "2024-12-15", type: "pdf" },
        { name: "Board Presentation.pptx", size: "5.1 MB", uploadedBy: "James Wilson", date: "2024-12-15", type: "ppt" },
      ],
    },
    {
      id: "APP-003",
      title: "Pipeline Inspection Report",
      type: "TASK_COMPLETION",
      submittedBy: "Mike Johnson",
      department: "Technical",
      submittedDate: "2024-12-14",
      dueDate: "2024-12-16",
      priority: "HIGH",
      status: "PENDING",
      description: "All pipeline sections inspected and documented. Report requires final sign-off.",
      taskReference: "TASK-2024-0089",
      attachments: 4,
      daysPending: 2,
      documents: [
        { name: "Inspection Report.pdf", size: "4.2 MB", uploadedBy: "Mike Johnson", date: "2024-12-14", type: "pdf" },
        { name: "Defect Analysis.xlsx", size: "2.1 MB", uploadedBy: "Mike Johnson", date: "2024-12-14", type: "excel" },
        { name: "Site Photos.zip", size: "18.5 MB", uploadedBy: "Mike Johnson", date: "2024-12-14", type: "zip" },
        { name: "Recommendations.docx", size: "1.2 MB", uploadedBy: "Mike Johnson", date: "2024-12-14", type: "doc" },
      ],
    },
    {
      id: "APP-004",
      title: "Safety Protocol Updates",
      type: "DOCUMENT",
      submittedBy: "Sarah Smith",
      department: "HSE",
      submittedDate: "2024-12-14",
      dueDate: "2024-12-19",
      priority: "HIGH",
      status: "PENDING",
      description: "Updated safety procedures for workshop operations requiring executive approval",
      documentReference: "HSE-POL-2024-12",
      attachments: 2,
      daysPending: 2,
      documents: [
        { name: "Safety Protocol v2.1.pdf", size: "3.4 MB", uploadedBy: "Sarah Smith", date: "2024-12-14", type: "pdf" },
        { name: "Training Guidelines.docx", size: "2.8 MB", uploadedBy: "Sarah Smith", date: "2024-12-14", type: "doc" },
      ],
    },
    {
      id: "APP-005",
      title: "Daily Operations Report",
      type: "REPORT",
      submittedBy: "Lisa Wang",
      department: "Logistics",
      submittedDate: "2024-12-14",
      dueDate: "2024-12-15",
      priority: "MEDIUM",
      status: "PENDING",
      description: "Logistics operations summary for December 14 with resource allocation details",
      reportReference: "LOG-DEC14",
      attachments: 1,
      daysPending: 2,
      documents: [{ name: "Operations Report.pdf", size: "1.5 MB", uploadedBy: "Lisa Wang", date: "2024-12-14", type: "pdf" }],
    },
    {
      id: "APP-006",
      title: "Annual Budget Proposal 2025",
      type: "DOCUMENT",
      submittedBy: "Maria Garcia",
      department: "Finance",
      submittedDate: "2024-12-13",
      dueDate: "2024-12-20",
      priority: "CRITICAL",
      status: "PENDING",
      description: "Proposed budget for fiscal year 2025 requires MD review and approval",
      documentReference: "BUD-2025-001",
      attachments: 5,
      daysPending: 3,
      documents: [
        { name: "Budget Proposal 2025.xlsx", size: "4.2 MB", uploadedBy: "Maria Garcia", date: "2024-12-13", type: "excel" },
        { name: "Department Allocations.pdf", size: "2.3 MB", uploadedBy: "Maria Garcia", date: "2024-12-13", type: "pdf" },
        { name: "Revenue Projections.pptx", size: "6.1 MB", uploadedBy: "Maria Garcia", date: "2024-12-13", type: "ppt" },
        { name: "Cost Analysis.xlsx", size: "3.4 MB", uploadedBy: "Maria Garcia", date: "2024-12-13", type: "excel" },
        { name: "Executive Summary.pdf", size: "1.8 MB", uploadedBy: "Maria Garcia", date: "2024-12-13", type: "pdf" },
      ],
    },
    {
      id: "APP-007",
      title: "Workshop Maintenance Report",
      type: "REPORT",
      submittedBy: "Robert Chen",
      department: "Workshop",
      submittedDate: "2024-12-13",
      dueDate: "2024-12-14",
      priority: "HIGH",
      status: "APPROVED",
      description: "Monthly workshop maintenance and equipment calibration report",
      reportReference: "WSH-DEC13",
      attachments: 2,
      daysPending: 0,
      approvedDate: "2024-12-14",
      approvedBy: "Managing Director",
      approvalComment: "All maintenance tasks completed satisfactorily. Approved.",
      documents: [
        { name: "Maintenance Log.pdf", size: "2.1 MB", uploadedBy: "Robert Chen", date: "2024-12-13", type: "pdf" },
        { name: "Calibration Certificates.zip", size: "8.4 MB", uploadedBy: "Robert Chen", date: "2024-12-13", type: "zip" },
      ],
    },
    {
      id: "APP-008",
      title: "HR Policy Update - Remote Work",
      type: "DOCUMENT",
      submittedBy: "Patricia Davis",
      department: "HR",
      submittedDate: "2024-12-12",
      dueDate: "2024-12-15",
      priority: "MEDIUM",
      status: "REJECTED",
      description: "Updated remote work policy with revised eligibility criteria",
      documentReference: "HR-POL-2024-08",
      attachments: 1,
      daysPending: 0,
      rejectedDate: "2024-12-13",
      rejectedBy: "Managing Director",
      rejectionReason: "Policy needs legal review and compliance team input before approval",
      documents: [{ name: "Remote Work Policy v2.docx", size: "1.2 MB", uploadedBy: "Patricia Davis", date: "2024-12-12", type: "doc" }],
    },
    {
      id: "APP-009",
      title: "Q1 Project Resource Plan",
      type: "DOCUMENT",
      submittedBy: "Emma Wilson",
      department: "Technical",
      submittedDate: "2024-12-11",
      dueDate: "2024-12-18",
      priority: "HIGH",
      status: "PENDING",
      description: "Resource allocation and manpower planning for Q1 2025 projects",
      documentReference: "RES-Q1-2025",
      attachments: 3,
      daysPending: 5,
      documents: [
        { name: "Resource Plan.xlsx", size: "2.8 MB", uploadedBy: "Emma Wilson", date: "2024-12-11", type: "excel" },
        { name: "Project Timeline.pdf", size: "3.1 MB", uploadedBy: "Emma Wilson", date: "2024-12-11", type: "pdf" },
        { name: "Budget Allocation.xlsx", size: "1.9 MB", uploadedBy: "Emma Wilson", date: "2024-12-11", type: "excel" },
      ],
    },
  ];

  const approvalHistory = useMemo(() => approvals.filter((a) => a.status !== "PENDING"), []);
  const filteredApprovals = approvals.filter((approval) => {
    if (approvalType !== "All" && approval.type !== approvalType) return false;
    if (priorityFilter !== "All" && approval.priority !== priorityFilter) return false;
    if (statusFilter !== "All" && approval.status !== statusFilter) return false;
    return true;
  });

  const getPriorityTone = (priority) => {
    switch (priority) {
      case "CRITICAL":
        return "danger";
      case "HIGH":
        return "warn";
      case "MEDIUM":
        return "info";
      case "LOW":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusTone = (status) => {
    switch (status) {
      case "PENDING":
        return "warn";
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "danger";
      default:
        return "default";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "TASK_COMPLETION":
        return "✅";
      case "DOCUMENT":
        return "📄";
      case "REPORT":
        return "📊";
      default:
        return "📋";
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return "📕";
      case "doc":
        return "📘";
      case "excel":
        return "📗";
      case "ppt":
        return "📙";
      case "zip":
        return "🗜️";
      default:
        return "📎";
    }
  };

  const openModal = (approval) => {
    setSelectedApproval(approval);
    setComment("");
    setActiveDocTab("details");
    setReviewedDocs({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApproval(null);
    setComment("");
    setActiveDocTab("details");
    setReviewedDocs({});
  };

  // ESC to close
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (isModalOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  // Lock scroll while modal open
  useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isModalOpen]);

  const handleApprove = () => {
    if (!selectedApproval) return;
    alert(`Approval ${selectedApproval.id} approved${comment ? ` with comment: ${comment}` : ""}`);
    closeModal();
  };

  const handleReject = () => {
    if (!selectedApproval) return;
    const reason = comment.trim() || "No reason provided";
    alert(`Approval ${selectedApproval.id} rejected with reason: ${reason}`);
    closeModal();
  };

  const handleDownloadDocument = (doc) => alert(`Downloading ${doc.name}`);
  const handleViewDocument = (doc) => alert(`Opening ${doc.name} for preview`);

  const fmtDate = (iso) =>
    iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not set";

  const pendingCount = approvals.filter((a) => a.status === "PENDING").length;
  const criticalPendingCount = approvals.filter((a) => a.priority === "CRITICAL" && a.status === "PENDING").length;

  const reviewedCount = selectedApproval?.documents
    ? selectedApproval.documents.filter((d) => reviewedDocs[d.name]).length
    : 0;

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="space-y-6">
        {/* Header with Gradient */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>Executive Approvals</Pill>
                  <Pill tone="warn">{pendingCount} Pending</Pill>
                  <Pill tone="danger">{criticalPendingCount} Critical</Pill>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  MD Approvals Dashboard
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">Review and approve executive-level requests from all departments</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/md-dashboard/approvals/bulk">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "var(--secondary-blue)", color: "var(--primary-blue)" }}
                  >
                    Bulk Actions
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 md:p-5 bg-white border-t border-gray-200/70">
            {[
              { label: "Total Pending", value: pendingCount, tone: "warn" },
              { label: "Critical", value: criticalPendingCount, tone: "danger" },
              { label: "Approval Rate", value: "87%", tone: "success" },
              { label: "Avg Response", value: "3.2 hrs", tone: "info" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-gray-200/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{s.label}</p>
                  <Pill tone={s.tone}>Live</Pill>
                </div>
                <p className="text-2xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Filters & Quick Actions */}
        <Card className="p-6">
          <SectionTitle title="Filters" subtitle="Refine approvals by type, priority, and status" />
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Approval Type</label>
              <select
                value={approvalType}
                onChange={(e) => setApprovalType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Types</option>
                <option value="TASK_COMPLETION">Task Completion</option>
                <option value="DOCUMENT">Document</option>
                <option value="REPORT">Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Priorities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setApprovalType("All");
                setPriorityFilter("All");
                setStatusFilter("PENDING");
              }}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-amber-50 text-amber-800 hover:bg-amber-100 transition"
            >
              ⏳ All Pending
            </button>
            <button
              onClick={() => {
                setPriorityFilter("CRITICAL");
                setStatusFilter("PENDING");
              }}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-red-50 text-red-700 hover:bg-red-100 transition"
            >
              🚨 Critical Only
            </button>
            <button
              onClick={() => {
                setApprovalType("DOCUMENT");
                setStatusFilter("PENDING");
              }}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
            >
              📄 Document Approvals
            </button>
            <button
              onClick={() => {
                setApprovalType("All");
                setPriorityFilter("All");
                setStatusFilter("All");
              }}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 transition"
            >
              🔄 Clear All
            </button>
          </div>
        </Card>

        {/* Critical Approvals Alert */}
        {criticalPendingCount > 0 && (
          <Card className="overflow-hidden border-red-200/70" style={{ borderColor: "rgba(237, 50, 55, 0.3)" }}>
            <div className="p-4 md:p-5 bg-red-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚨</span>
                  <div>
                    <p className="font-extrabold text-red-800">Critical Approvals Require Immediate Attention!</p>
                    <p className="text-sm text-red-600">{criticalPendingCount} critical approval(s) pending your decision</p>
                  </div>
                </div>
                <button
                  onClick={() => setPriorityFilter("CRITICAL")}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-sm active:scale-[0.99] transition"
                  style={{ backgroundColor: "var(--accent-red)" }}
                >
                  View Critical
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Approvals List */}
        <div className="space-y-4">
          <SectionTitle
            title="Pending Approvals"
            subtitle="Requests awaiting your decision"
            action={<span className="text-sm text-gray-500">{filteredApprovals.filter((a) => a.status === "PENDING").length} pending</span>}
          />

          {filteredApprovals.filter((a) => a.status === "PENDING").length === 0 ? (
            <Card className="p-10 text-center">
              <div className="text-4xl">✅</div>
              <div className="mt-3 font-extrabold" style={{ color: "var(--primary-blue)" }}>
                No pending approvals
              </div>
              <div className="text-sm text-gray-500 mt-1">Great job! You're all caught up with approvals</div>
            </Card>
          ) : (
            filteredApprovals
              .filter((a) => a.status === "PENDING")
              .map((approval) => (
                <Card
                  key={approval.id}
                  className="p-6 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => openModal(approval)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openModal(approval);
                  }}
                >
                  <div className="flex flex-col xl:flex-row xl:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Pill tone={getPriorityTone(approval.priority)}>{approval.priority}</Pill>
                        <Pill tone={getStatusTone(approval.status)}>{approval.status}</Pill>
                        <Pill>{approval.department}</Pill>
                        <Pill tone="info">
                          {getTypeIcon(approval.type)} {approval.type.replace("_", " ")}
                        </Pill>
                        {approval.daysPending > 3 && <Pill tone="danger">⚠️ {approval.daysPending} days pending</Pill>}
                      </div>

                      <h3 className="text-lg font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                        {approval.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">{approval.description}</p>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-gray-200/70 p-3">
                          <div className="flex items-center text-sm">
                            <span className="text-gray-500 w-24">Submitted By:</span>
                            <span className="font-semibold">{approval.submittedBy}</span>
                          </div>
                          <div className="flex items-center text-sm mt-1">
                            <span className="text-gray-500 w-24">Reference:</span>
                            <code className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">
                              {approval.taskReference || approval.documentReference || approval.reportReference}
                            </code>
                          </div>
                        </div>

                        <div className="rounded-xl border border-gray-200/70 p-3">
                          <div className="flex items-center text-sm">
                            <span className="text-gray-500 w-24">Due Date:</span>
                            <span className={`font-semibold ${new Date(approval.dueDate) < new Date() ? "text-red-600" : ""}`}>
                              {fmtDate(approval.dueDate)}
                              {new Date(approval.dueDate) < new Date() && " (OVERDUE)"}
                            </span>
                          </div>
                          <div className="flex items-center text-sm mt-1">
                            <span className="text-gray-500 w-24">Documents:</span>
                            <span className="font-semibold">{approval.attachments} file(s)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex xl:flex-col items-center gap-2 xl:w-32">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center ring-1 ring-black/5"
                        style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                      >
                        <span className="text-2xl">📋</span>
                      </div>
                      <div className="flex xl:flex-col items-center gap-1">
                        <span className="text-xs font-semibold text-gray-700">{approval.attachments} file(s)</span>
                        <span className="text-xs text-gray-500">Click to review →</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
          )}
        </div>

        {/* Approval History Table */}
        {approvalHistory.length > 0 && (
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200/70">
              <SectionTitle title="Recent Approval History" subtitle="Your recent decisions" />
            </div>

            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200/70">
                  <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="px-5 py-3 text-left">ID</th>
                    <th className="px-5 py-3 text-left">Type</th>
                    <th className="px-5 py-3 text-left">Title</th>
                    <th className="px-5 py-3 text-left">Requester</th>
                    <th className="px-5 py-3 text-left">Department</th>
                    <th className="px-5 py-3 text-left">Decision</th>
                    <th className="px-5 py-3 text-left">Date</th>
                    <th className="px-5 py-3 text-left">Comment</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200/70 text-[13px]">
                  {approvalHistory.slice(0, 5).map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/70 transition">
                      <td className="px-5 py-3 whitespace-nowrap">
                        <span className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          {item.id}
                        </span>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span>{getTypeIcon(item.type)}</span>
                          <Pill>{item.type.replace("_", " ")}</Pill>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="font-semibold">{item.title}</div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div className="text-sm">{item.submittedBy}</div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <Pill>{item.department}</Pill>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <Pill tone={item.status === "APPROVED" ? "success" : "danger"}>{item.status}</Pill>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div className="text-sm">{item.approvedDate || item.rejectedDate}</div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="text-sm text-gray-600 max-w-xs truncate">{item.approvalComment || item.rejectionReason || "-"}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden p-4 space-y-3">
              {approvalHistory.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-2xl border border-gray-200/70 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      {item.id}
                    </span>
                    <Pill tone={item.status === "APPROVED" ? "success" : "danger"}>{item.status}</Pill>
                  </div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    By {item.submittedBy} • {item.department}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{item.approvalComment || item.rejectionReason}</p>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-gray-200/70 bg-white">
              <Link to="/md-dashboard/approvals/history" className="text-sm font-semibold" style={{ color: "var(--primary-blue)" }}>
                View Full History →
              </Link>
            </div>
          </Card>
        )}

        {/* Approval Workflow */}
        <Card className="p-6">
          <SectionTitle title="Executive Approval Workflow" subtitle="Standard approval process for executive requests" />
          <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: 1, title: "Department Submission", desc: "HOD submits request requiring MD approval", icon: "📤" },
              { step: 2, title: "Document Review", desc: "MD reviews attached documents and details", icon: "🔍" },
              { step: 3, title: "Decision with Comments", desc: "Approve, reject, or request more info", icon: "✍️" },
              { step: 4, title: "Department Notification", desc: "HOD notified of decision with comments", icon: "🔔" },
            ].map((step) => (
              <div key={step.step} className="rounded-2xl border border-gray-200/70 p-4 hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: "var(--secondary-blue)" }}>
                    {step.step}
                  </div>
                  <div>
                    <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{step.desc}</div>
                  </div>
                  <span className="text-2xl ml-auto">{step.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ---------- FIXED MODAL ---------- */}
      {isModalOpen && selectedApproval && (
        <div className="fixed inset-0 z-[9999]">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-gray-900/60" onClick={closeModal} />

          {/* Modal container */}
          <div className="relative z-10 min-h-full flex items-end sm:items-center justify-center p-4">
            <div className="w-full sm:max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <Card className="overflow-hidden">
                {/* Modal Header */}
                <div className="px-6 pt-6 pb-4 border-b border-gray-200/70">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Review Approval Request
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <code className="font-mono bg-gray-100 px-3 py-1 rounded text-sm">{selectedApproval.id}</code>
                        <Pill tone={getPriorityTone(selectedApproval.priority)}>{selectedApproval.priority}</Pill>
                        <Pill tone={getStatusTone(selectedApproval.status)}>{selectedApproval.status}</Pill>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
                      aria-label="Close"
                    >
                      <span className="text-2xl">&times;</span>
                    </button>
                  </div>

                  {/* Modal Tabs */}
                  <div className="flex gap-4 mt-4">
                    {[
                      { id: "details", label: "Request Details" },
                      { id: "documents", label: `Documents (${selectedApproval.attachments})` },
                      { id: "review", label: "Review & Decision" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveDocTab(tab.id)}
                        className={`pb-2 px-1 font-semibold transition border-b-2 ${
                          activeDocTab === tab.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                        }`}
                        style={{ borderBottomColor: activeDocTab === tab.id ? "var(--primary-blue)" : "transparent" }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  {/* Tab: Request Details */}
                  {activeDocTab === "details" && (
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <h4 className="text-lg font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                          {selectedApproval.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4">{selectedApproval.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <span className="w-24 text-sm text-gray-500">Submitted By:</span>
                              <div>
                                <p className="font-semibold">{selectedApproval.submittedBy}</p>
                                <p className="text-xs text-gray-500">{selectedApproval.department}</p>
                              </div>
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="w-24 text-gray-500">Reference:</span>
                              <code className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                                {selectedApproval.taskReference || selectedApproval.documentReference || selectedApproval.reportReference}
                              </code>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center text-sm">
                              <span className="w-24 text-gray-500">Submitted:</span>
                              <span className="font-semibold">{fmtDate(selectedApproval.submittedDate)}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="w-24 text-gray-500">Due Date:</span>
                              <span className={`font-semibold ${new Date(selectedApproval.dueDate) < new Date() ? "text-red-600" : ""}`}>
                                {fmtDate(selectedApproval.dueDate)}
                                {new Date(selectedApproval.dueDate) < new Date() && " (OVERDUE)"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Documents Summary */}
                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                          Attached Documents ({selectedApproval.attachments})
                        </h4>
                        <div className="space-y-2">
                          {selectedApproval.documents?.map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                <span className="text-xl">{getFileIcon(doc.type)}</span>
                                <div>
                                  <p className="text-sm font-semibold">{doc.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {doc.size} • Uploaded by {doc.uploadedBy}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => setActiveDocTab("documents")}
                                className="text-sm font-semibold px-3 py-1.5 rounded-xl hover:bg-gray-100 transition"
                                style={{ color: "var(--primary-blue)" }}
                              >
                                View →
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab: Documents */}
                  {activeDocTab === "documents" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        {selectedApproval.documents?.map((doc, idx) => (
                          <div key={idx} className="rounded-2xl border border-gray-200/70 p-4 hover:shadow-sm transition">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: "rgba(109, 198, 223, 0.1)" }}>
                                  {getFileIcon(doc.type)}
                                </div>
                                <div>
                                  <h5 className="font-extrabold text-gray-900">{doc.name}</h5>
                                  <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-500">{doc.size}</span>
                                    <span className="text-xs text-gray-500">•</span>
                                    <span className="text-xs text-gray-500">Uploaded by {doc.uploadedBy}</span>
                                    <span className="text-xs text-gray-500">•</span>
                                    <span className="text-xs text-gray-500">{doc.date}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleViewDocument(doc)}
                                  className="px-4 py-2 rounded-xl text-sm font-semibold border hover:bg-gray-50 transition"
                                  style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                                >
                                  Preview
                                </button>
                                <button
                                  onClick={() => handleDownloadDocument(doc)}
                                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-sm active:scale-[0.99] transition"
                                  style={{ backgroundColor: "var(--secondary-blue)" }}
                                >
                                  Download
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
                        <div className="flex items-start gap-3">
                          <span className="text-blue-600 text-lg">ℹ️</span>
                          <div>
                            <p className="text-sm font-semibold text-blue-800">Document Review Guidelines</p>
                            <p className="text-xs text-blue-600 mt-1">
                              Review all attached documents carefully before making your decision. You can preview documents directly or download them for detailed review.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab: Review & Decision */}
                  {activeDocTab === "review" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left */}
                      <div className="space-y-4">
                        <div className="rounded-2xl border border-gray-200/70 p-5">
                          <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                            Documents to Review
                          </h4>

                          <div className="space-y-2">
                            {selectedApproval.documents?.map((doc, idx) => (
                              <label key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={!!reviewedDocs[doc.name]}
                                  onChange={(e) =>
                                    setReviewedDocs((prev) => ({
                                      ...prev,
                                      [doc.name]: e.target.checked,
                                    }))
                                  }
                                  className="rounded border-gray-300"
                                />
                                <span className="text-lg">{getFileIcon(doc.type)}</span>
                                <span className="text-sm flex-1">{doc.name}</span>
                                <span className="text-xs text-gray-500">{doc.size}</span>
                              </label>
                            ))}
                          </div>

                          <p className="text-xs text-gray-500 mt-3">✓ Check off documents as you review them</p>
                        </div>

                        <div className="rounded-2xl border border-gray-200/70 p-5">
                          <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                            Review Summary
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Documents:</span>
                              <span className="font-semibold">{selectedApproval.attachments}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Reviewed:</span>
                              <span className="font-semibold text-green-600">{reviewedCount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Pending Review:</span>
                              <span className="font-semibold text-amber-600">{selectedApproval.attachments - reviewedCount}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="space-y-4">
                        <div className="rounded-2xl border border-gray-200/70 p-5">
                          <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                            Your Decision
                          </h4>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Add Comment</label>
                              <textarea
                                rows={4}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                                placeholder="Add your approval comment, feedback, or rejection reason..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              />
                              <p className="text-xs text-gray-500 mt-2">Your comment will be visible to the requester and relevant stakeholders</p>
                            </div>

                            <div className="space-y-3 pt-4">
                              <button
                                onClick={handleApprove}
                                className="w-full px-5 py-3 rounded-2xl font-semibold text-white shadow-sm active:scale-[0.99] transition"
                                style={{ backgroundColor: "#10B981" }}
                              >
                                ✓ Approve Request
                              </button>
                              <button
                                onClick={handleReject}
                                className="w-full px-5 py-3 rounded-2xl font-semibold text-white shadow-sm active:scale-[0.99] transition"
                                style={{ backgroundColor: "var(--accent-red)" }}
                              >
                                ✗ Reject Request
                              </button>
                              <button
                                onClick={() => setActiveDocTab("documents")}
                                className="w-full px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                                style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                              >
                                ← Back to Documents
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-gray-200/70 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Request ID:</span> {selectedApproval.id} •
                      <span className="font-semibold ml-2">Type:</span> {selectedApproval.type.replace("_", " ")}
                    </div>
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 rounded-xl text-sm font-semibold border bg-white hover:bg-gray-50 transition"
                      style={{ borderColor: "rgba(44, 75, 155, 0.25)", color: "var(--primary-blue)" }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
