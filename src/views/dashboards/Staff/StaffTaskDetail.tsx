"use client";

// pages/dashboards/Staff/StaffTaskDetail.jsx
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const SectionTitle = ({ title, subtitle, action }: { title: string; subtitle?: React.ReactNode; action?: React.ReactNode }) => (
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

const Pill = ({ children, tone = "default" }: { children: React.ReactNode; tone?: string }) => {
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

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" }) : "Not set";

const fmtDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    hour12: true 
  }) : "Not set";

const getPriorityTone = (priority) => {
  switch(priority) {
    case 'High': return 'warn';
    case 'Medium': return 'info';
    case 'Low': return 'success';
    default: return 'default';
  }
};

const getStatusTone = (status) => {
  switch(status) {
    case 'Completed': return 'success';
    case 'In Progress': return 'info';
    case 'Pending': return 'warn';
    case 'Overdue': return 'danger';
    default: return 'default';
  }
};

/* ---------- Status Changing Modal ---------- */
const StatusChangingModal = ({ status }: { status: string }) => {
  const label = status.replace(/_/g, " ");
  const labelFormatted = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "40px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          minWidth: "280px",
        }}
      >
        {/* Spinner */}
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            border: "4px solid rgba(44, 75, 155, 0.15)",
            borderTopColor: "var(--primary-blue)",
            animation: "staff-task-spin 0.75s linear infinite",
          }}
        />
        <style>{`@keyframes staff-task-spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ fontWeight: 700, fontSize: "16px", color: "var(--primary-blue)", margin: 0, textAlign: "center" }}>
          Changing task to{" "}
          <span style={{ color: "var(--secondary-blue)" }}>{labelFormatted}</span>
        </p>
        <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>Please wait…</p>
      </div>
    </div>
  );
};

export default function StaffTaskDetail() {
  const params = useParams() || {};
  const taskId = params.taskId;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  const [newProgress, setNewProgress] = useState(60);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isInternal, setIsInternal] = useState(false);
  const [statusChangingTo, setStatusChangingTo] = useState<string | null>(null);

  // Mock task data - in real app, this would come from API
  const task = {
    id: taskId || 'TASK-2024-00123',
    title: 'Safety Inspection Report',
    description: 'Complete safety inspection for all workshop equipment including power tools, machinery, and safety systems. Document findings and create comprehensive report with recommendations.',
    department: 'Technical',
    subDepartment: 'Workshop Team',
    assignedTo: 'John Doe',
    assignedBy: 'HOD - Mr. Johnson',
    assignedDate: '2024-12-01',
    startDate: '2024-12-03',
    dueDate: '2024-12-10',
    priority: 'High',
    status: 'In Progress',
    progress: 60,
    estimatedHours: 8,
    actualHours: 5,
    taskType: 'TASK',
    visibility: 'Department',
    createdBy: 'HOD - Mr. Johnson',
    createdAt: '2024-12-01 14:30',
    updatedAt: '2024-12-09 10:15',
    completionNote: '',
  };

  const comments = [
    {
      id: 1,
      user: 'HOD - Mr. Johnson',
      role: 'HOD',
      comment: 'Please ensure all safety protocols are followed during inspection',
      timestamp: '2024-12-01 14:45',
      isInternal: false
    },
    {
      id: 2,
      user: 'John Doe',
      role: 'Staff',
      comment: 'Started inspection today. Found some issues with equipment calibration.',
      timestamp: '2024-12-03 11:20',
      isInternal: false
    },
    {
      id: 3,
      user: 'HSE Officer',
      role: 'HOD',
      comment: 'Internal Note: Need to coordinate with maintenance team',
      timestamp: '2024-12-04 09:15',
      isInternal: true
    }
  ];

  const documents = [
    { id: 1, name: 'Safety Checklist.pdf', uploadedBy: 'John Doe', date: '2024-12-03', size: '2.4 MB', type: 'pdf' },
    { id: 2, name: 'Equipment Photos.zip', uploadedBy: 'John Doe', date: '2024-12-04', size: '15.2 MB', type: 'zip' },
    { id: 3, name: 'Previous Inspection Report.docx', uploadedBy: 'HOD - Mr. Johnson', date: '2024-12-01', size: '1.8 MB', type: 'doc' },
  ];

  const activity = [
    { action: 'Task Created', user: 'HOD - Mr. Johnson', role: 'HOD', time: '2024-12-01 14:30' },
    { action: 'Task Assigned to John Doe', user: 'HOD - Mr. Johnson', role: 'HOD', time: '2024-12-01 14:30' },
    { action: 'Status changed to In Progress', user: 'John Doe', role: 'Staff', time: '2024-12-03 11:20' },
    { action: 'Progress updated to 60%', user: 'John Doe', role: 'Staff', time: '2024-12-09 10:15' },
  ];

  const handleUpdateStatus = (newStatus) => {
    setStatusChangingTo(newStatus);
    setIsUpdating(true);
    setTimeout(() => {
      toast.success(`Task status updated to ${newStatus}`);
      setIsUpdating(false);
      setStatusChangingTo(null);
    }, 1000);
  };

  const handleUpdateProgress = () => {
    if (newProgress < 0 || newProgress > 100) {
      toast.warning('Progress must be between 0 and 100');
      return;
    }
    
    setIsUpdating(true);
    setTimeout(() => {
      toast.success(`Progress updated to ${newProgress}%`);
      setIsUpdating(false);
    }, 1000);
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      toast.warning('Please enter a comment');
      return;
    }
    
    toast.success('Comment submitted successfully!');
    setNewComment('');
    setIsInternal(false);
  };

  const handleDownload = (doc) => {
    toast.info(`Downloading ${doc.name}`);
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return '📕';
      case 'doc':
      case 'docx': return '📘';
      case 'xls':
      case 'xlsx': return '📗';
      case 'zip': return '🗜️';
      default: return '📎';
    }
  };

  const getRoleTone = (role) => {
    switch(role) {
      case 'HOD': return 'info';
      case 'Staff': return 'default';
      default: return 'default';
    }
  };

  return (
    <Layout menuItems={StaffMenuItems} userRole="Staff">
      {statusChangingTo && <StatusChangingModal status={statusChangingTo} />}
      <div className="space-y-6">
        {/* Hero Section */}
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
                <div className="flex items-center gap-2 mb-2">
                  <Pill>Task Details</Pill>
                  <Pill tone={getPriorityTone(task.priority)}>{task.priority}</Pill>
                  <Pill tone={getStatusTone(task.status)}>{task.status}</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  {task.title}
                </h1>
                <p className="text-gray-600 mt-1 text-sm">
                  ID: {task.id} • {task.taskType} • {task.department}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.push('/staff-dashboard/tasks')}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition inline-flex items-center gap-2"
                  style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                >
                  ← Back to Tasks
                </button>
                <button
                  onClick={() => handleUpdateStatus('Completed')}
                  disabled={isUpdating}
                  className="px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "var(--secondary-blue)" }}
                >
                  {isUpdating ? 'Updating...' : 'Mark Complete'}
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Task Details (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <Card className="overflow-hidden">
              <div className="flex border-b border-gray-200/70">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'comments', label: `Comments (${comments.length})` },
                  { id: 'documents', label: `Documents (${documents.length})` },
                  { id: 'activity', label: 'Activity' },
                ].map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-4 text-sm font-semibold transition border-b-2 ${
                        active ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                      }`}
                      style={{ borderBottomColor: active ? "var(--primary-blue)" : "transparent" }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <SectionTitle title="Description" />
                      <p className="text-gray-700 whitespace-pre-line mt-3">{task.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <h3 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                          Task Information
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Department:</span>
                            <span className="font-semibold">{task.department}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Assigned By:</span>
                            <span className="font-semibold">{task.assignedBy}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Start Date:</span>
                            <span className="font-semibold">{fmtDate(task.startDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Due Date:</span>
                            <span className={`font-semibold ${task.status === 'Overdue' ? 'text-red-600' : ''}`}>
                              {fmtDate(task.dueDate)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-gray-200/70 p-5">
                        <h3 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                          Status & Progress
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Status:</span>
                            <Pill tone={getStatusTone(task.status)}>{task.status}</Pill>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Progress:</span>
                            <span className="font-semibold">{task.progress}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Time Spent:</span>
                            <span className="font-semibold">{task.actualHours}h / {task.estimatedHours}h</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Visibility:</span>
                            <span className="font-semibold">{task.visibility}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Update Section */}
                    <div className="pt-4 border-t border-gray-200/70">
                      <SectionTitle title="Update Progress" />
                      <div className="mt-4 space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-semibold text-gray-700">Current Progress</span>
                            <span className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                              {newProgress}%
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={newProgress}
                              onChange={(e) => setNewProgress(parseInt(e.target.value))}
                              className="flex-1"
                            />
                            <div className="w-16 bg-gray-100 rounded-full h-2 overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${newProgress}%`,
                                  backgroundColor: newProgress < 50 ? "var(--accent-red)" : 
                                                newProgress < 100 ? "var(--secondary-blue)" : "#10B981",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={handleUpdateProgress}
                            disabled={isUpdating}
                            className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition disabled:opacity-50"
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            {isUpdating ? 'Updating...' : 'Update Progress'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Comments Tab */}
              {activeTab === 'comments' && (
                <div className="p-6">
                  <SectionTitle title="Comments" subtitle="Discussion about this task" />
                  
                  <div className="mt-6 space-y-4">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-4 rounded-2xl border ${
                          comment.isInternal ? 'bg-amber-50/50 border-amber-200' : 'bg-gray-50 border-gray-200/70'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0"
                            style={{ backgroundColor: comment.role === 'HOD' ? "var(--primary-blue)" : "var(--secondary-blue)" }}
                          >
                            {comment.user.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-extrabold text-sm text-gray-900">{comment.user}</span>
                              <Pill tone={getRoleTone(comment.role)}>{comment.role}</Pill>
                              {comment.isInternal && <Pill tone="warn">Internal</Pill>}
                              <span className="text-xs text-gray-500">{fmtDateTime(comment.timestamp)}</span>
                            </div>
                            <p className="text-sm text-gray-700 mt-2">{comment.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="mt-6 pt-6 border-t border-gray-200/70">
                    <SectionTitle title="Add Comment" />
                    <div className="mt-4 space-y-4">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add your comment here..."
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                      <div className="flex items-center justify-between">
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
                          className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                          style={{ backgroundColor: "var(--secondary-blue)" }}
                        >
                          Submit Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="p-6">
                  <SectionTitle title="Task Documents" subtitle={`${documents.length} files`} />
                  
                  <div className="mt-6 space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
                              style={{ backgroundColor: "rgba(109, 198, 223, 0.1)" }}
                            >
                              {getFileIcon(doc.type)}
                            </div>
                            <div>
                              <p className="font-extrabold text-sm text-gray-900">{doc.name}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Uploaded by {doc.uploadedBy} on {doc.date} • {doc.size}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownload(doc)}
                            className="px-4 py-2 rounded-2xl text-xs font-semibold text-white active:scale-[0.99] transition"
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div className="p-6">
                  <SectionTitle title="Activity Timeline" />
                  
                  <div className="mt-6 space-y-4">
                    {activity.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}
                        >
                          <span className="text-sm">📋</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-gray-900">{item.action}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <span className="font-medium">{item.user}</span>
                            <Pill tone={item.role === 'HOD' ? 'info' : 'default'}>{item.role}</Pill>
                            <span>•</span>
                            <span>{fmtDateTime(item.time)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Quick Actions & Status (1 column) */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card className="p-6">
              <SectionTitle title="Task Status" />
              
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Current Status:</span>
                  <Pill tone={getStatusTone(task.status)}>{task.status}</Pill>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Priority:</span>
                  <Pill tone={getPriorityTone(task.priority)}>{task.priority}</Pill>
                </div>
                
                <div className="pt-4 border-t border-gray-200/70">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Update Status:</p>
                  <div className="space-y-2">
                    {['In Progress', 'Completed'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleUpdateStatus(status)}
                        disabled={isUpdating || status === task.status}
                        className={`w-full px-4 py-2.5 rounded-2xl text-sm font-semibold transition active:scale-[0.99] ${
                          status === task.status
                            ? 'bg-blue-50 text-blue-700 cursor-default border border-blue-200'
                            : 'border bg-white hover:bg-gray-50'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                        style={status !== task.status ? { borderColor: "var(--primary-blue)", color: "var(--primary-blue)" } : {}}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <SectionTitle title="Quick Actions" />
              
              <div className="mt-4 space-y-3">
                <Link href="/staff-dashboard/submit-reports">
                  <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                        >
                          <span className="text-sm text-green-600">📄</span>
                        </div>
                        <span className="font-semibold text-sm text-gray-700">Submit Report</span>
                      </div>
                      <span className="text-gray-400">→</span>
                    </div>
                  </button>
                </Link>

                <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "rgba(245, 158, 11, 0.1)" }}
                      >
                        <span className="text-sm text-amber-600">📅</span>
                      </div>
                      <span className="font-semibold text-sm text-gray-700">Request Extension</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </div>
                </button>

                <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                      >
                        <span className="text-sm text-purple-600">💬</span>
                      </div>
                      <span className="font-semibold text-sm text-gray-700">Ask for Help</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </div>
                </button>

                <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                      >
                        <span className="text-sm text-red-600">⚠️</span>
                      </div>
                      <span className="font-semibold text-sm text-gray-700">Report Issue</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </div>
                </button>
              </div>
            </Card>

            {/* Task Metrics */}
            <Card className="p-6">
              <SectionTitle title="Task Metrics" />
              
              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      {task.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${task.progress}%`,
                        backgroundColor: task.progress < 50 ? "var(--accent-red)" : 
                                      task.progress < 100 ? "var(--secondary-blue)" : "#10B981",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Time Spent</span>
                    <span className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      {task.actualHours}h / {task.estimatedHours}h
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${(task.actualHours / task.estimatedHours) * 100}%`,
                        backgroundColor: task.actualHours > task.estimatedHours ? "var(--accent-red)" : "var(--secondary-blue)",
                      }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200/70">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        {comments.length}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Comments</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        {documents.length}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Documents</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-xs text-gray-400">
                  Last updated: {fmtDateTime(task.updatedAt)}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}