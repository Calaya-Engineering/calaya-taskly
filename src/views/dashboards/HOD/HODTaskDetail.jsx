"use client";

// pages/dashboards/HOD/HODTaskDetail.jsx
import { useState } from 'react';
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
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

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white`;

const InfoRow = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
    <p className="font-extrabold text-gray-900">{value}</p>
  </div>
);

const taskData = {
  id: 'TASK-2024-00123',
  title: 'Pipeline Inspection - North Field',
  department: 'Technical',
  assignee: 'Alex Johnson',
  assignedBy: 'HOD - Technical',
  priority: 'HIGH',
  status: 'IN_PROGRESS',
  taskType: 'JOB',
  dueDate: '2024-12-20',
  startDate: '2024-12-01',
  progress: 75,
  estimatedHours: 40,
  actualHours: 30,
  visibility: 'DEPARTMENT',
  description: `Complete comprehensive inspection of pipeline infrastructure at North Field site. Includes:
• Visual inspection of pipeline joints and welds
• Pressure testing of critical sections
• Documentation of any corrosion or damage
• Safety compliance verification
• Submission of detailed inspection report with photos`,
  createdAt: '2024-12-01 09:30 AM',
  createdBy: 'HOD - Technical',
  documents: 3,
  comments: 3,
  watchers: ['Sarah Smith', 'Mike Johnson'],
  dependencies: ['TASK-2024-00120', 'TASK-2024-00121'],
};

const comments = [
  {
    id: 1,
    user: 'HOD - Technical',
    time: '2024-12-01T10:00:00',
    comment: 'Task assigned. Please prioritize as this is critical for Q4 maintenance schedule.',
    isInternal: false,
  },
  {
    id: 2,
    user: 'Alex Johnson',
    time: '2024-12-05T14:30:00',
    comment: 'Site visit completed. Initial inspection shows minor corrosion in section 3B. Will conduct pressure testing tomorrow.',
    isInternal: false,
  },
  {
    id: 3,
    user: 'HOD - Technical',
    time: '2024-12-08T11:15:00',
    comment: 'Please ensure all safety protocols are followed during pressure testing. Upload compliance documentation.',
    isInternal: true,
  },
];

const attachments = [
  { id: 1, name: 'inspection_checklist.pdf', size: '2.4 MB', uploadedBy: 'Alex Johnson', date: '2024-12-05' },
  { id: 2, name: 'safety_protocols.docx', size: '1.8 MB', uploadedBy: 'HOD - Technical', date: '2024-12-01' },
  { id: 3, name: 'site_photos.zip', size: '15.2 MB', uploadedBy: 'Alex Johnson', date: '2024-12-06' },
];

const activityLog = [
  { action: 'Task Created', user: 'HOD - Technical', time: '2024-12-01T09:30:00' },
  { action: 'Assigned to Alex Johnson', user: 'HOD - Technical', time: '2024-12-01T10:00:00' },
  { action: 'Status changed to In Progress', user: 'Alex Johnson', time: '2024-12-05T14:30:00' },
  { action: 'Progress updated to 75%', user: 'Alex Johnson', time: '2024-12-10T11:45:00' },
];

export default function HODTaskDetail() {
  const params = useParams() || {};
  const taskId = params.taskId;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  const [taskStatus, setTaskStatus] = useState(taskData.status);
  const [progressValue, setProgressValue] = useState(taskData.progress);
  const [progressNote, setProgressNote] = useState('');

  const handleStatusChange = (newStatus) => {
    setTaskStatus(newStatus);
    toast.success(`Task status changed to ${newStatus}`);
  };

  const handleProgressUpdate = () => {
    toast.success(`Progress updated to ${progressValue}%`);
    setProgressNote('');
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      toast.success('Comment added!');
      setNewComment('');
    }
  };

  const getStatusTone = (status) => {
    switch(status) {
      case 'COMPLETED': return 'success';
      case 'IN_PROGRESS': return 'info';
      case 'PENDING': return 'warn';
      case 'ON_HOLD': return 'warn';
      case 'CANCELLED': return 'danger';
      default: return 'default';
    }
  };

  const getPriorityTone = (priority) => {
    switch(priority) {
      case 'CRITICAL': return 'danger';
      case 'HIGH': return 'warn';
      case 'MEDIUM': return 'info';
      case 'LOW': return 'success';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const fmtDate = (iso) =>
    iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not set";

  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Hero Header */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div>
                <button
                  onClick={() => router.push('/hod-dashboard/tasks')}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
                >
                  ← Back to Tasks
                </button>
                
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Pill tone={getStatusTone(taskStatus)}>{taskStatus.replace('_', ' ')}</Pill>
                  <Pill tone={getPriorityTone(taskData.priority)}>{taskData.priority}</Pill>
                  <Pill tone="info">{taskData.taskType}</Pill>
                  <Pill>{taskData.department}</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  {taskData.title}
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  ID: {taskData.id} • Created by {taskData.createdBy} on {fmtDate(taskData.createdAt)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleStatusChange('COMPLETED')}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-green-50 active:scale-[0.99] transition"
                  style={{ borderColor: "#10B981", color: "#10B981" }}
                >
                  ✓ Mark Complete
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border-t border-gray-200/70">
            <div className="flex flex-wrap">
              {[
                { id: "overview", label: "Overview" },
                { id: "comments", label: `Comments & Updates (${comments.length})` },
                { id: "attachments", label: `Attachments (${attachments.length})` },
                { id: "activity", label: "Activity Log" },
              ].map((t) => {
                const active = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id)}
                    className={`px-6 py-4 text-sm font-semibold transition border-b-2 ${
                      active ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                    }`}
                    style={{ borderBottomColor: active ? "var(--primary-blue)" : "transparent" }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Task Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <SectionTitle title="Task Description" />

                <div className="mt-6">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{taskData.description}</p>
                </div>

                {/* Progress Section */}
                <div className="mt-8">
                  <SectionTitle title="Progress Tracking" />

                  <div className="mt-6 space-y-6">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Overall Progress</span>
                        <Pill tone={progressValue >= 80 ? "success" : progressValue >= 50 ? "info" : "warn"}>
                          {progressValue}%
                        </Pill>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${progressValue}%`,
                            backgroundColor: progressValue >= 80 
                              ? "#10B981"
                              : progressValue >= 50
                              ? "var(--primary-blue)"
                              : "#F59E0B"
                          }}
                        />
                      </div>
                    </div>

                    {/* Time Tracking */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-gray-200/70 p-4">
                        <p className="text-sm text-gray-500">Estimated Hours</p>
                        <p className="text-2xl font-extrabold mt-1" style={{ color: "var(--primary-blue)" }}>
                          {taskData.estimatedHours}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-gray-200/70 p-4 bg-blue-50/30">
                        <p className="text-sm text-gray-500">Actual Hours</p>
                        <p className="text-2xl font-extrabold mt-1" style={{ color: "var(--secondary-blue)" }}>
                          {taskData.actualHours}
                        </p>
                      </div>
                    </div>

                    {/* Progress Update Form */}
                    <div className="border-t border-gray-200/70 pt-6">
                      <h3 className="font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                        Update Progress
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Progress Percentage
                          </label>
                          <div className="flex items-center gap-4">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={progressValue}
                              onChange={(e) => setProgressValue(parseInt(e.target.value))}
                              className="flex-1"
                            />
                            <span className="text-lg font-extrabold" style={{ color: "var(--primary-blue)" }}>
                              {progressValue}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Update Notes
                          </label>
                          <textarea
                            value={progressNote}
                            onChange={(e) => setProgressNote(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                            rows="3"
                            placeholder="Add progress update notes..."
                          />
                        </div>
                        <button
                          onClick={handleProgressUpdate}
                          className={btnSolid}
                          style={{ backgroundColor: "var(--secondary-blue)" }}
                        >
                          Update Progress
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dependencies */}
                {taskData.dependencies && taskData.dependencies.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Dependencies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {taskData.dependencies.map((dep) => (
                        <Pill key={dep} tone="info">{dep}</Pill>
                      ))}
                    </div>
                  </div>
                )}

                {/* Watchers */}
                {taskData.watchers && taskData.watchers.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Watchers
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {taskData.watchers.map((watcher) => (
                        <div key={watcher} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200/70">
                          <div
                            className="w-6 h-6 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            {watcher.charAt(0)}
                          </div>
                          <span className="text-sm font-medium">{watcher}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Right Column - Task Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6">
                <SectionTitle title="Task Information" />

                <div className="mt-6 space-y-4">
                  <InfoRow label="Department" value={taskData.department} />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Assignee</label>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        {taskData.assignee.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-gray-900">{taskData.assignee}</p>
                        <p className="text-xs text-gray-500">Assigned by {taskData.assignedBy}</p>
                      </div>
                    </div>
                  </div>

                  <InfoRow label="Start Date" value={fmtDate(taskData.startDate)} />
                  
                  <InfoRow 
                    label="Due Date" 
                    value={
                      <span className={`font-extrabold ${
                        new Date(taskData.dueDate) < new Date() && taskStatus !== 'COMPLETED'
                          ? 'text-red-600'
                          : ''
                      }`}>
                        {fmtDate(taskData.dueDate)}
                        {new Date(taskData.dueDate) < new Date() && taskStatus !== 'COMPLETED' && 
                          <span className="ml-2 text-xs">(Overdue)</span>
                        }
                      </span>
                    } 
                  />

                  <InfoRow label="Visibility" value={taskData.visibility} />
                  <InfoRow label="Created" value={formatDate(taskData.createdAt)} />
                </div>
              </Card>

              {/* Status Update Card */}
              <Card className="p-6">
                <SectionTitle title="Update Status" />
                
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {['PENDING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED'].map(status => (
                    <button
                      key={status}
                      className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition active:scale-[0.99] ${
                        taskStatus === status
                          ? 'text-white'
                          : 'border bg-white hover:bg-gray-50'
                      }`}
                      style={{
                        backgroundColor: taskStatus === status ? "var(--secondary-blue)" : undefined,
                        borderColor: taskStatus === status ? "transparent" : "rgba(0,0,0,0.08)"
                      }}
                      onClick={() => handleStatusChange(status)}
                    >
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <Card className="p-6">
            <SectionTitle title="Comments & Updates" subtitle={`${comments.length} total comments`} />

            {/* Add Comment */}
            <div className="mt-6 mb-8">
              <textarea
                rows="4"
                className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Add a comment or update..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-between items-center mt-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                  <span className="text-sm text-gray-600">Mark as internal note</span>
                </label>
                <button
                  onClick={handleAddComment}
                  className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                  style={{ backgroundColor: "var(--accent-red)" }}
                >
                  Post Comment
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200/70 pb-6 last:border-0">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shrink-0"
                      style={{ backgroundColor: comment.isInternal ? "#F59E0B" : "var(--secondary-blue)" }}
                    >
                      {comment.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-gray-900">{comment.user}</h4>
                          {comment.isInternal && (
                            <Pill tone="warn">Internal Note</Pill>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{formatDate(comment.time)}</span>
                      </div>
                      <p className="mt-2 text-gray-700 leading-relaxed">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Attachments Tab */}
        {activeTab === 'attachments' && (
          <Card className="p-6">
            <SectionTitle title="Task Attachments" subtitle={`${attachments.length} files attached`} />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {attachments.map((file) => (
                <div key={file.id} className="rounded-2xl border border-gray-200/70 p-5 hover:-translate-y-0.5 transition-all">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                      style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                    >
                      📄
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-gray-900 truncate">{file.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{file.size}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">Uploaded by</p>
                      <p className="text-sm font-semibold">{file.uploadedBy}</p>
                      <p className="text-xs text-gray-500">{file.date}</p>
                    </div>
                    <button 
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-white active:scale-[0.99] transition"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}

              {/* Upload New Document Card */}
              <div className="rounded-2xl border-2 border-dashed border-gray-200 p-5 text-center hover:border-blue-200 cursor-pointer group">
                <div
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-3 group-hover:scale-110 transition"
                  style={{ backgroundColor: "rgba(109, 198, 223, 0.1)" }}
                >
                  📤
                </div>
                <p className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                  Upload New File
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  PDF, DOCX, XLSX up to 50MB
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Activity Log Tab */}
        {activeTab === 'activity' && (
          <Card className="p-6">
            <SectionTitle title="Activity Log" subtitle="Complete audit trail" />

            <div className="mt-6 space-y-4">
              {activityLog.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>
                    {index < activityLog.length - 1 && (
                      <div className="absolute top-5 left-1.5 w-0.5 h-12 bg-gray-200"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{activity.action}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-600">By {activity.user}</span>
                      <span className="text-xs text-gray-500">{formatDate(activity.time)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="p-6">
          <SectionTitle title="Quick Actions" subtitle="Common task operations" />
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🔄", label: "Reassign Task", color: "var(--secondary-blue)" },
              { icon: "📅", label: "Extend Deadline", color: "#10B981" },
              { icon: "📋", label: "Create Sub-task", color: "var(--primary-blue)" },
              { icon: "📊", label: "View Analytics", color: "#8B5CF6" },
            ].map((action, index) => (
              <button
                key={index}
                className="group p-5 rounded-2xl border border-gray-200/70 hover:-translate-y-0.5 transition-all text-center"
              >
                <div
                  className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition"
                  style={{ backgroundColor: `${action.color}18` }}
                >
                  <span style={{ color: action.color }}>{action.icon}</span>
                </div>
                <p className="font-extrabold text-sm" style={{ color: action.color }}>
                  {action.label}
                </p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}