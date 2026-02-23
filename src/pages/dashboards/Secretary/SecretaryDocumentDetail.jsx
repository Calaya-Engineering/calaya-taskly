// pages/dashboards/Secretary/SecretaryDocumentDetail.jsx
import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout, {
  DashboardIcon,
  DocumentIcon,
  ReportIcon,
  CalendarIcon,
  BellIcon,
  UserIcon,
  AnnouncementIcon
} from '../../../components/Layout';

const TenderIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const SecretaryMenuItems = [
  { label: 'Dashboard', path: '/secretary-dashboard', icon: <DashboardIcon /> },
  { label: 'Upload Daily Report', path: '/secretary-dashboard/upload-report', icon: <ReportIcon /> },
  { label: 'Daily Reports Archive', path: '/secretary-dashboard/reports-archive', icon: <ReportIcon />, badge: '24' },
  { label: 'Task Reports Archive', path: '/secretary-dashboard/task-reports', icon: <DocumentIcon />, badge: '45' },
  { label: 'Documents', path: '/secretary-dashboard/documents', icon: <DocumentIcon /> },
  { label: 'Meetings/Events', path: '/secretary-dashboard/events', icon: <CalendarIcon />, badge: '3' },
  { label: 'Tenders', path: '/secretary-dashboard/tenders', icon: <TenderIcon />, badge: '5' },
  { label: 'Announcements', path: '/secretary-dashboard/announcements', icon: <AnnouncementIcon />, badge: '3' },
  { label: 'Notifications', path: '/secretary-dashboard/notifications', icon: <BellIcon />, badge: '12' },
  { label: 'Profile', path: '/secretary-dashboard/profile', icon: <UserIcon /> },
];

/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-sm ${className}`}>{children}</div>
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
      : tone === "purple"
      ? "bg-purple-50 text-purple-700 ring-purple-100"
      : "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white shadow-sm`;

const textareaBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";

const accessTone = (access) => {
  switch(access) {
    case 'Public': return 'success';
    case 'All HODs': return 'info';
    case 'Specific Departments': return 'purple';
    case 'Specific HODs': return 'warn';
    case 'Private': return 'danger';
    default: return 'default';
  }
};

const roleTone = (role) => {
  if (role.includes('HOD')) return 'info';
  if (role.includes('Secretary')) return 'default';
  if (role.includes('MD')) return 'purple';
  return 'default';
};

const getFileIcon = (fileType) => {
  switch(fileType?.toLowerCase()) {
    case 'pdf': return '📕';
    case 'xlsx':
    case 'xls': return '📊';
    case 'docx':
    case 'doc': return '📄';
    case 'zip': return '📦';
    case 'pptx':
    case 'ppt': return '📽️';
    default: return '📎';
  }
};

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not set";

const fmtDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString(undefined, { 
    hour: '2-digit', 
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    hour12: true 
  }) : "Not set";

export default function SecretaryDocumentDetail() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [newComment, setNewComment] = useState('');
  const [isInternalComment, setIsInternalComment] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Mock document data
  const document = {
    id: docId || 'DOC-001',
    title: 'Company Policies Handbook',
    description: 'Updated company policies and procedures handbook including HR policies, code of conduct, workplace guidelines, and employee benefits information.',
    type: 'Handbook',
    category: 'HR',
    department: 'HR',
    uploadedBy: 'HR Department',
    uploadedDate: '2024-12-01T10:00:00',
    fileType: 'PDF',
    fileSize: '4.8 MB',
    access: 'Public',
    downloads: 156,
    version: '3.2',
    expiresAt: '2025-12-01',
    storagePath: '/documents/hr/policies_handbook_v3.2.pdf',
    linkedTasks: ['TASK-2024-00123', 'TASK-2024-00124'],
    tags: ['policies', 'handbook', 'hr', 'employee', 'guidelines'],
    status: 'active',
    reviewDate: '2025-06-01',
    securityLevel: 'Standard'
  };

  const versions = [
    { version: '3.2', date: '2024-12-01', uploadedBy: 'HR Department', changes: 'Updated benefits section and added new policies' },
    { version: '3.1', date: '2024-06-15', uploadedBy: 'HR Department', changes: 'Minor revisions to code of conduct' },
    { version: '3.0', date: '2023-12-01', uploadedBy: 'HR Department', changes: 'Major update with new compliance requirements' },
    { version: '2.5', date: '2023-06-01', uploadedBy: 'HR Department', changes: 'Added remote work guidelines' },
  ];

  const downloadHistory = [
    { user: 'John Doe', date: '2024-12-09', department: 'Technical', role: 'Staff' },
    { user: 'Sarah Smith', date: '2024-12-08', department: 'Workshop', role: 'HOD' },
    { user: 'Mike Johnson', date: '2024-12-07', department: 'HSE', role: 'Staff' },
    { user: 'Lisa Wang', date: '2024-12-06', department: 'Technical', role: 'Staff' },
    { user: 'Robert Chen', date: '2024-12-05', department: 'Logistics', role: 'HOD' },
    { user: 'Maria Garcia', date: '2024-12-04', department: 'HR', role: 'Staff' },
  ];

  const comments = [
    { 
      id: 1, 
      user: 'HOD - Mr. Johnson', 
      role: 'HOD',
      comment: 'Important document for all staff to review. Please ensure your team members have read the updated policies.', 
      timestamp: '2024-12-06T10:30:00', 
      isInternal: false 
    },
    { 
      id: 2, 
      user: 'John Doe', 
      role: 'Staff',
      comment: 'Found the new benefits section very helpful. Is there a summary version available?', 
      timestamp: '2024-12-07T14:45:00', 
      isInternal: false 
    },
    { 
      id: 3, 
      user: 'HR Officer - Ms. Chen', 
      role: 'HR',
      comment: 'Internal: Need to update section 4.2 with new leave policy effective next month. Please prepare revised version.', 
      timestamp: '2024-12-08T09:15:00', 
      isInternal: true 
    },
    { 
      id: 4, 
      user: 'MD - Mr. Williams', 
      role: 'MD',
      comment: 'Please ensure all department heads acknowledge receipt of this update.', 
      timestamp: '2024-12-08T11:20:00', 
      isInternal: false 
    },
  ];

  const isExpiringSoon = useMemo(() => {
    const expiryDate = new Date(document.expiresAt);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expiryDate <= thirtyDaysFromNow;
  }, [document.expiresAt]);

  const handleDownload = () => {
    alert(`Downloading ${document.title}.${document.fileType.toLowerCase()} (${document.fileSize})`);
  };

  const handlePreview = () => {
    alert(`Previewing ${document.title}`);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return alert('Please enter a comment');
    alert(`Comment submitted${isInternalComment ? ' (Internal)' : ''}`);
    setNewComment('');
    setIsInternalComment(false);
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.comment);
  };

  const handleSaveEdit = () => {
    if (!editContent.trim()) return;
    alert('Comment updated');
    setEditingComment(null);
    setEditContent('');
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent('');
  };

  const handleDeleteComment = (commentId) => {
    alert('Comment deleted');
    setShowDeleteConfirm(null);
  };

  return (
    <Layout menuItems={SecretaryMenuItems} userRole="Secretary">
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
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => navigate("/secretary-dashboard/documents")}
                  className="w-11 h-11 rounded-2xl border bg-white hover:bg-gray-50 active:scale-[0.99] transition flex items-center justify-center"
                  style={{ borderColor: "rgba(44,75,155,0.25)", color: "var(--primary-blue)" }}
                  title="Back"
                >
                  ←
                </button>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-2xl">{getFileIcon(document.fileType)}</span>
                    <Pill tone={accessTone(document.access)}>{document.access}</Pill>
                    <Pill tone="info">{document.type}</Pill>
                    <Pill tone="default">v{document.version}</Pill>
                  </div>

                  <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 truncate">{document.title}</h1>
                  <p className="text-gray-600 mt-1 text-sm">
                    ID: {document.id} • {document.category} • {document.fileType}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handlePreview}
                  className={btnOutline}
                  style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                >
                  Preview
                </button>
                <button
                  onClick={handleDownload}
                  className={btnSolid}
                  style={{ backgroundColor: "var(--secondary-blue)" }}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Expiry Alert */}
        {isExpiringSoon && (
          <Card className="border-amber-200 bg-amber-50/30 overflow-hidden">
            <div className="p-4 flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-extrabold text-amber-800">Document Expiring Soon</h3>
                <p className="text-amber-600 text-sm">
                  This document expires on {fmtDate(document.expiresAt)}. Please review and renew if necessary.
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MAIN */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-200/70">
                {[
                  { id: "details", label: "Details" },
                  { id: "versions", label: `Versions (${versions.length})` },
                  { id: "comments", label: `Comments (${comments.length})` },
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

              {/* Details Tab */}
              {activeTab === "details" && (
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <SectionTitle title="Description" />
                      <p className="text-gray-700 whitespace-pre-line mt-3">{document.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
                        <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                          Document Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <Row label="Type" value={document.type} />
                          <Row label="Category" value={document.category} />
                          <Row label="Department" value={document.department} />
                          <Row label="Version" value={document.version} />
                          <Row label="File Type" value={document.fileType} />
                          <Row label="Status" value={<Pill tone="success">{document.status}</Pill>} />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
                        <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                          Upload Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <Row label="Uploaded By" value={document.uploadedBy} />
                          <Row label="Upload Date" value={fmtDate(document.uploadedDate)} />
                          <Row label="File Size" value={document.fileSize} />
                          <Row label="Expires" value={fmtDate(document.expiresAt)} />
                          <Row label="Review Date" value={fmtDate(document.reviewDate)} />
                          <Row label="Security" value={document.securityLevel} />
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {document.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-xl text-sm ring-1 ring-gray-200">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Linked Tasks */}
                    {document.linkedTasks.length > 0 && (
                      <div>
                        <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                          Linked Tasks
                        </h4>
                        <div className="space-y-2">
                          {document.linkedTasks.map((taskId, index) => (
                            <Link key={index} to={`/secretary-dashboard/task/${taskId}`}>
                              <div className="p-3 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-400">📋</span>
                                    <span className="font-extrabold text-gray-900">{taskId}</span>
                                  </div>
                                  <span className="text-sm" style={{ color: "var(--primary-blue)" }}>View →</span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Versions Tab */}
              {activeTab === "versions" && (
                <div className="p-6">
                  <SectionTitle title="Version History" subtitle={`${versions.length} versions`} />
                  
                  <div className="mt-6 space-y-4">
                    {versions.map((version, index) => (
                      <div
                        key={index}
                        className={`p-5 rounded-2xl border ${
                          version.version === document.version
                            ? 'border-blue-200 bg-blue-50'
                            : 'border-gray-200/70 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-gray-900">Version {version.version}</span>
                            {version.version === document.version && (
                              <Pill tone="info">Current</Pill>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{fmtDate(version.date)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Uploaded by: {version.uploadedBy}</p>
                        <p className="text-sm text-gray-700 mb-4">Changes: {version.changes}</p>
                        {version.version !== document.version && (
                          <button
                            onClick={() => alert(`Downloading version ${version.version}`)}
                            className="px-4 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                            style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                          >
                            Download This Version
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Tab */}
              {activeTab === "comments" && (
                <div className="p-6">
                  <SectionTitle title="Comments" subtitle={`${comments.length} comments`} />

                  {/* Add Comment */}
                  <div className="mt-6 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shrink-0" style={{ backgroundColor: "var(--secondary-blue)" }}>
                        SC
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add your comment about this document..."
                          className={textareaBase}
                          rows="3"
                        />
                        <div className="mt-3 flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isInternalComment}
                              onChange={(e) => setIsInternalComment(e.target.checked)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-600">Mark as internal comment</span>
                          </label>
                          <button
                            onClick={handleAddComment}
                            disabled={!newComment.trim()}
                            className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white shadow-sm active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ backgroundColor: "var(--primary-blue)" }}
                          >
                            Submit Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.map((c) => (
                      <div key={c.id} className={`p-4 rounded-2xl border ${
                        c.isInternal ? 'bg-amber-50/50 border-amber-200' : 'bg-gray-50 border-gray-200/70'
                      }`}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-extrabold" style={{ backgroundColor: c.isInternal ? "#F59E0B" : "var(--primary-blue)" }}>
                              {c.user?.[0]}
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-extrabold text-xs text-gray-900">{c.user}</span>
                                <Pill tone={roleTone(c.role)}>{c.role}</Pill>
                                {c.isInternal && <Pill tone="warn">Internal</Pill>}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{fmtDateTime(c.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mt-3 ml-11">{c.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* SIDE */}
          <div className="space-y-6">
            {/* Secretary Actions */}
            <Card className="p-6">
              <SectionTitle title="Secretary Actions" />
              
              <div className="mt-4 space-y-2">
                <button
                  onClick={handleDownload}
                  className="w-full px-4 py-3 rounded-2xl border bg-white hover:bg-gray-50 active:scale-[0.99] transition flex items-center justify-between"
                  style={{ borderColor: "rgba(109,198,223,0.55)", color: "var(--secondary-blue)" }}
                >
                  <span className="font-semibold text-sm">Download Document</span>
                  <span>⬇️</span>
                </button>
                <button
                  onClick={handlePreview}
                  className="w-full px-4 py-3 rounded-2xl border bg-white hover:bg-gray-50 active:scale-[0.99] transition flex items-center justify-between"
                  style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                >
                  <span className="font-semibold text-sm">Preview in Browser</span>
                  <span>👁️</span>
                </button>
              </div>
            </Card>

            {/* Document Stats */}
            <Card className="p-6">
              <SectionTitle title="Document Statistics" />
              
              <div className="mt-4 space-y-4">
                <div className="text-center p-5 rounded-2xl border border-gray-200/70">
                  <p className="text-3xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                    {document.downloads}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Total Downloads</p>
                </div>
                
                <div className="pt-4 border-t border-gray-200/70">
                  <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                    Recent Downloads
                  </h4>
                  <div className="space-y-2">
                    {downloadHistory.slice(0, 4).map((download, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">{download.user}</span>
                          <span className="text-xs text-gray-400 ml-2">({download.department})</span>
                        </div>
                        <span className="text-xs text-gray-500">{download.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Document Properties */}
            <Card className="p-6">
              <SectionTitle title="Properties" />
              
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Access Level:</span>
                  <Pill tone={accessTone(document.access)}>{document.access}</Pill>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">File Format:</span>
                  <span className="font-semibold text-gray-900">{document.fileType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Size:</span>
                  <span className="font-semibold text-gray-900">{document.fileSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Created:</span>
                  <span className="font-semibold text-gray-900">{fmtDate(document.uploadedDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Expires:</span>
                  <span className={`font-semibold ${isExpiringSoon ? 'text-red-600' : 'text-gray-900'}`}>
                    {fmtDate(document.expiresAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Review Due:</span>
                  <span className="font-semibold text-gray-900">{fmtDate(document.reviewDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Version:</span>
                  <span className="font-semibold text-gray-900">{document.version}</span>
                </div>
              </div>
            </Card>

            {/* Related Documents */}
            <Card className="p-6">
              <SectionTitle title="Related Documents" />
              
              <div className="mt-4 space-y-3">
                <Link to="/secretary-dashboard/document/DOC-002">
                  <div className="p-3 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📊</span>
                      <div>
                        <p className="font-extrabold text-sm text-gray-900">Safety Procedures Manual</p>
                        <p className="text-xs text-gray-500">HSE • PDF • 6.2 MB</p>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/secretary-dashboard/document/DOC-003">
                  <div className="p-3 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📄</span>
                      <div>
                        <p className="font-extrabold text-sm text-gray-900">Training Materials - New Employees</p>
                        <p className="text-xs text-gray-500">HR • ZIP • 15.2 MB</p>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/secretary-dashboard/document/DOC-005">
                  <div className="p-3 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📕</span>
                      <div>
                        <p className="font-extrabold text-sm text-gray-900">Quality Control Procedures</p>
                        <p className="text-xs text-gray-500">QHSE • PDF • 5.4 MB</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowDeleteConfirm(null)}></div>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-xl shrink-0">⚠️</div>
                  <div>
                    <h3 className="text-xl font-extrabold" style={{ color: "var(--accent-red)" }}>
                      Delete Comment
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Are you sure you want to delete this comment? This action cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200/70">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteComment(showDeleteConfirm)}
                    className="px-6 py-3 rounded-2xl font-semibold text-white shadow-sm active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

// Helper component for info rows
const Row = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4">
    <span className="text-gray-500 text-sm font-semibold">{label}:</span>
    <span className="font-semibold text-gray-900 text-right text-sm">{typeof value === 'string' ? value : value}</span>
  </div>
);