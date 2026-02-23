// pages/dashboards/Staff/StaffDocumentDetail.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout, {
  DashboardIcon,
  TaskIcon,
  DocumentIcon,
  ReportIcon,
  CalendarIcon,
  AnnouncementIcon,
  UserIcon,
  BellIcon
} from '../../../components/Layout';

const TenderIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const StaffMenuItems = [
  { label: 'Dashboard', path: '/staff-dashboard', icon: <DashboardIcon /> },
  { label: 'My Tasks', path: '/staff-dashboard/tasks', icon: <TaskIcon />, badge: '8' },
  { label: 'Submit Reports', path: '/staff-dashboard/submit-reports', icon: <ReportIcon /> },
  { label: 'Documents', path: '/staff-dashboard/documents', icon: <DocumentIcon /> },
  { label: 'Daily Reports', path: '/staff-dashboard/daily-reports', icon: <ReportIcon /> },
  { label: 'Meetings/Events', path: '/staff-dashboard/events', icon: <CalendarIcon /> },
  { label: 'Tenders', path: '/staff-dashboard/tenders', icon: <TenderIcon />, badge: '3' },
  { label: 'Tender Documents', path: '/staff-dashboard/tender-documents', icon: <TenderIcon /> },
  { label: 'Announcements', path: '/staff-dashboard/announcements', icon: <AnnouncementIcon /> },
  { label: 'Notifications', path: '/staff-dashboard/notifications', icon: <BellIcon />, badge: '5' },
  { label: 'Profile', path: '/staff-dashboard/profile', icon: <UserIcon /> },
];

/* ---------- UI helpers ---------- */
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

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white shadow-sm`;

const textareaBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";

const accessTone = (access) => {
  switch(access) {
    case 'Public': return 'success';
    case 'Department': return 'info';
    case 'All Departments': return 'purple';
    default: return 'default';
  }
};

const getFileIcon = (fileType) => {
  switch(fileType.toLowerCase()) {
    case 'pdf': return '📕';
    case 'word': return '📝';
    case 'excel': return '📊';
    case 'powerpoint': return '📽️';
    default: return '📄';
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

export default function StaffDocumentDetail() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [newComment, setNewComment] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  // Mock document data
  const document = {
    id: docId || 'DOC-001',
    title: 'Safety Protocol v2.1',
    description: 'Updated safety protocols for all departments, including new regulations for workshop equipment and emergency procedures. This version includes the latest industry standards and compliance requirements.',
    type: 'Protocol',
    department: 'HSE',
    uploadedBy: 'HOD - Ms. Rodriguez',
    uploadedDate: '2024-12-05',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    access: 'Public',
    downloads: 45,
    version: '2.1',
    expiresAt: '2025-12-05',
    storagePath: '/documents/safety/protocol_v2.1.pdf',
    linkedTasks: ['TASK-2024-00123'],
    tags: ['safety', 'protocol', 'compliance', 'workshop']
  };

  const versions = [
    { version: '2.1', date: '2024-12-05', uploadedBy: 'Ms. Rodriguez', changes: 'Updated workshop safety standards' },
    { version: '2.0', date: '2024-06-15', uploadedBy: 'Mr. Smith', changes: 'Added new compliance requirements' },
    { version: '1.5', date: '2023-12-01', uploadedBy: 'Ms. Rodriguez', changes: 'Minor revisions and corrections' },
  ];

  const downloadHistory = [
    { user: 'John Doe', date: '2024-12-09', department: 'Technical' },
    { user: 'Sarah Smith', date: '2024-12-08', department: 'Workshop' },
    { user: 'Mike Johnson', date: '2024-12-07', department: 'HSE' },
    { user: 'Lisa Wang', date: '2024-12-06', department: 'Technical' },
  ];

  const comments = [
    { id: 1, user: 'HOD - Mr. Johnson', comment: 'Important document for all staff to review', timestamp: '2024-12-06T10:30:00', isInternal: false },
    { id: 2, user: 'John Doe', comment: 'Found this very helpful for the workshop inspection', timestamp: '2024-12-07T14:45:00', isInternal: false },
    { id: 3, user: 'HSE Officer', comment: 'Internal: Need to update section 3.2 with new regulations', timestamp: '2024-12-08T09:15:00', isInternal: true },
  ];

  const handleDownload = () => {
    alert(`Downloading ${document.title}.${document.fileType.toLowerCase()} (${document.fileSize})`);
  };

  const handlePreview = () => {
    alert(`Previewing ${document.title}`);
  };

  const handleShare = () => {
    const shareText = `Check out this document: ${document.title}\nAccess: ${document.access}\nDepartment: ${document.department}`;
    alert(shareText);
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return alert('Please enter a comment');
    alert('Comment submitted!');
    setNewComment('');
    setIsInternal(false);
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
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => navigate("/staff-dashboard/documents")}
                  className="w-11 h-11 rounded-2xl border bg-white hover:bg-gray-50 active:scale-[0.99] transition flex items-center justify-center"
                  style={{ borderColor: "rgba(44,75,155,0.25)", color: "var(--primary-blue)" }}
                  title="Back"
                >
                  ←
                </button>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Pill tone={accessTone(document.access)}>{document.access}</Pill>
                    <Pill tone="info">{document.type}</Pill>
                    <Pill tone="default">{document.department}</Pill>
                  </div>

                  <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 truncate">{document.title}</h1>
                  <p className="text-gray-600 mt-1 text-sm">
                    ID: {document.id} • Version {document.version}
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
                          <Row label="Department" value={document.department} />
                          <Row label="Version" value={document.version} />
                          <Row label="File Type" value={document.fileType} />
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
                            <Link key={index} to={`/staff-dashboard/task/${taskId}`}>
                              <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer">
                                <div className="flex items-center justify-between">
                                  <span className="font-extrabold text-gray-900">{taskId}</span>
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
                          <span className="text-xs text-gray-500">{version.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Uploaded by: {version.uploadedBy}</p>
                        <p className="text-sm text-gray-700 mb-4">Changes: {version.changes}</p>
                        {version.version !== document.version && (
                          <button
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
                        JD
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
                              checked={isInternal}
                              onChange={(e) => setIsInternal(e.target.checked)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-600">Mark as internal comment</span>
                          </label>
                          <button
                            onClick={handleSubmitComment}
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
                    {comments.map((comment) => (
                      <div key={comment.id} className={`p-5 rounded-2xl border ${
                        comment.isInternal ? 'bg-amber-50/50 border-amber-200' : 'bg-gray-50 border-gray-200/70'
                      }`}>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-extrabold" style={{ backgroundColor: comment.isInternal ? "#F59E0B" : "var(--primary-blue)" }}>
                              {comment.user.charAt(0)}
                            </div>
                            <span className="font-extrabold text-sm text-gray-900">{comment.user}</span>
                            {comment.isInternal && <Pill tone="warn">Internal</Pill>}
                          </div>
                          <span className="text-xs text-gray-500">{fmtDateTime(comment.timestamp)}</span>
                        </div>
                        <p className="text-sm text-gray-700 ml-10">{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* SIDE */}
          <div className="space-y-6">
            {/* Document Actions */}
            <Card className="p-6">
              <SectionTitle title="Document Actions" />
              
              <div className="mt-4 space-y-2">
                <button
                  onClick={handleDownload}
                  className="w-full px-4 py-3 rounded-2xl border bg-white hover:bg-gray-50 active:scale-[0.99] transition flex items-center justify-between"
                  style={{ borderColor: "rgba(109,198,223,0.55)", color: "var(--secondary-blue)" }}
                >
                  <span className="font-semibold">Download Document</span>
                  <span>⬇️</span>
                </button>
                <button
                  onClick={handlePreview}
                  className="w-full px-4 py-3 rounded-2xl border bg-white hover:bg-gray-50 active:scale-[0.99] transition flex items-center justify-between"
                  style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                >
                  <span className="font-semibold">Preview in Browser</span>
                  <span>👁️</span>
                </button>
                <button
                  onClick={handleShare}
                  className="w-full px-4 py-3 rounded-2xl border bg-white hover:bg-gray-50 active:scale-[0.99] transition flex items-center justify-between"
                  style={{ borderColor: "rgba(16,185,129,0.35)", color: "#10B981" }}
                >
                  <span className="font-semibold">Share Document</span>
                  <span>📤</span>
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
                    {downloadHistory.slice(0, 3).map((download, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{download.user}</span>
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
                  <span className="font-semibold text-gray-900">{fmtDate(document.expiresAt)}</span>
                </div>
              </div>
            </Card>

            {/* Related Documents */}
            <Card className="p-6">
              <SectionTitle title="Related Documents" />
              
              <div className="mt-4 space-y-3">
                <Link to="/staff-dashboard/document/DOC-002">
                  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer">
                    <p className="font-extrabold text-sm text-gray-900">Equipment Checklist</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Pill tone="warn">Workshop</Pill>
                      <span className="text-xs text-gray-500">Excel • 1.2 MB</span>
                    </div>
                  </div>
                </Link>
                <Link to="/staff-dashboard/document/DOC-003">
                  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer">
                    <p className="font-extrabold text-sm text-gray-900">Training Manual 2024</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Pill tone="purple">HR</Pill>
                      <span className="text-xs text-gray-500">PDF • 5.8 MB</span>
                    </div>
                  </div>
                </Link>
                <Link to="/staff-dashboard/document/DOC-004">
                  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer">
                    <p className="font-extrabold text-sm text-gray-900">Workshop Schedule Q4</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Pill tone="warn">Workshop</Pill>
                      <span className="text-xs text-gray-500">PDF • 1.5 MB</span>
                    </div>
                  </div>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Helper component for info rows
const Row = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4">
    <span className="text-gray-500 text-sm font-semibold">{label}:</span>
    <span className="font-semibold text-gray-900 text-right text-sm">{value}</span>
  </div>
);