// pages/dashboards/MD/MDTaskDetail.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  TenderIcon 
} from '../../../components/Layout';

const MDMenuItems = [
  { label: 'Dashboard', path: '/md-dashboard', icon: <DashboardIcon /> },
  { label: 'Tasks (All)', path: '/md-dashboard/tasks', icon: <TaskIcon />, badge: '24' },
  { label: 'Active Jobs', path: '/md-dashboard/jobs', icon: <TaskIcon />, badge: '8' },
  { label: 'Documents', path: '/md-dashboard/documents', icon: <DocumentIcon />, badge: '3' },
  { label: 'Daily Reports', path: '/md-dashboard/reports', icon: <ReportIcon /> },
  { label: 'Meetings/Events', path: '/md-dashboard/events', icon: <CalendarIcon />, badge: '2' },
  { label: 'Tenders', path: '/md-dashboard/tenders', icon: <DocumentIcon /> },
  { label: 'Tender Documents', path: '/md-dashboard/tender-documents', icon: <TenderIcon /> },
  { label: 'Announcements', path: '/md-dashboard/announcements', icon: <AnnouncementIcon /> },
  { label: 'Approvals', path: '/md-dashboard/approvals', icon: <ApprovalIcon />, badge: '7' },
  { label: 'Escalations/Overdue', path: '/md-dashboard/escalations', icon: <AlertIcon />, badge: '3' },
  { label: 'Notifications', path: '/md-dashboard/notifications', icon: <BellIcon />, badge: '12' },
  { label: 'Profile', path: '/md-dashboard/profile', icon: <UserIcon /> },
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
      : "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

const taskData = {
  id: 'TASK-2024-00123',
  title: 'Safety Audit for Site A',
  description: 'Complete comprehensive safety audit for Site A pipeline operations. Review all safety protocols, equipment compliance, and staff training records.',
  taskType: 'TASK',
  department: 'HSE',
  project: 'Site A - Pipeline Project',
  createdBy: 'Sarah Smith',
  createdAt: '2024-12-01T09:00:00',
  assignedTo: 'John Doe',
  assignedBy: 'Managing Director',
  assignedAt: '2024-12-01T10:30:00',
  priority: 'HIGH',
  status: 'IN_PROGRESS',
  startDate: '2024-12-05',
  dueDate: '2024-12-20',
  completedAt: null,
  estimatedHours: 40,
  actualHours: 28,
  completionNote: '',
  visibility: 'DEPARTMENT',
  documents: 3,
  comments: 5,
  updates: 12,
  progress: 70,
  dependencies: ['TASK-2024-00120', 'TASK-2024-00121'],
  watchers: ['Sarah Smith', 'Mike Johnson', 'HSE HOD'],
  history: [
    { date: '2024-12-01T09:00:00', action: 'Task created by Sarah Smith', user: 'Sarah Smith' },
    { date: '2024-12-01T10:30:00', action: 'Assigned to John Doe by Managing Director', user: 'Managing Director' },
    { date: '2024-12-05T14:20:00', action: 'Status changed from PENDING to IN_PROGRESS', user: 'John Doe' },
    { date: '2024-12-08T11:15:00', action: 'Uploaded Safety Checklist document', user: 'John Doe' },
    { date: '2024-12-12T16:45:00', action: 'Progress updated to 70%', user: 'John Doe' },
  ],
  commentsList: [
    { user: 'John Doe', comment: 'Initial safety checklist completed. Found 3 minor issues that need attention.', time: '2024-12-08T11:30:00' },
    { user: 'Sarah Smith', comment: 'Please prioritize the identified issues. We need to resolve them before the next audit cycle.', time: '2024-12-08T14:15:00' },
    { user: 'HSE HOD', comment: 'Make sure to document all findings with photographs. This is important for compliance records.', time: '2024-12-09T09:45:00' },
  ],
  documentsList: [
    { name: 'Safety Audit Checklist.pdf', size: '2.4 MB', uploadedBy: 'John Doe', date: '2024-12-08' },
    { name: 'Site A Layout Diagram.jpg', size: '4.1 MB', uploadedBy: 'John Doe', date: '2024-12-09' },
    { name: 'Previous Audit Report.pdf', size: '3.2 MB', uploadedBy: 'Sarah Smith', date: '2024-12-01' },
  ]
};

export default function MDTaskDetail() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  const [taskStatus, setTaskStatus] = useState(taskData.status);

  const handleStatusChange = (newStatus) => {
    setTaskStatus(newStatus);
    alert(`Task status changed to ${newStatus}`);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      alert('Comment added!');
      setNewComment('');
    }
  };

  const getStatusTone = (status) => {
    switch(status) {
      case 'COMPLETED': return 'success';
      case 'IN_PROGRESS': return 'info';
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
      default: return 'success';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const fmtDate = (iso) =>
    iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not set";

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="space-y-6">
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
                  onClick={() => navigate('/md-dashboard/tasks')}
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
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                >
                  Edit
                </button>
                <button
                  className="px-5 py-3 rounded-2xl font-semibold text-white shadow-sm active:scale-[0.99] transition"
                  style={{ backgroundColor: "var(--accent-red)" }}
                >
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border-t border-gray-200/70">
            <div className="flex flex-wrap">
              {[
                { id: "overview", label: "Overview" },
                { id: "updates", label: `Updates & Comments (${taskData.comments})` },
                { id: "documents", label: `Documents (${taskData.documents})` },
                { id: "history", label: "History" },
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
            {/* Task Details - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <SectionTitle title="Task Details" />

                <div className="mt-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                      Description
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{taskData.description}</p>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Progress
                      </h3>
                      <Pill tone={taskData.progress >= 80 ? "success" : taskData.progress >= 50 ? "info" : "warn"}>
                        {taskData.progress}%
                      </Pill>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${taskData.progress}%`,
                          background: taskData.progress >= 80 
                            ? "linear-gradient(90deg, #10B981 0%, #34D399 100%)"
                            : taskData.progress >= 50
                            ? "linear-gradient(90deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)"
                            : "linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)"
                        }}
                      />
                    </div>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Estimated Hours", value: taskData.estimatedHours, icon: "⏱️" },
                      { label: "Actual Hours", value: taskData.actualHours, icon: "⌛" },
                      { label: "Documents", value: taskData.documents, icon: "📄" },
                      { label: "Comments", value: taskData.comments, icon: "💬" },
                    ].map((stat, index) => (
                      <div key={index} className="rounded-2xl border border-gray-200/70 p-4 hover:bg-gray-50 transition">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">{stat.label}</p>
                          <span className="text-lg">{stat.icon}</span>
                        </div>
                        <p className="text-2xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Dependencies */}
                  {taskData.dependencies && taskData.dependencies.length > 0 && (
                    <div>
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
                    <div>
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
                </div>
              </Card>
            </div>

            {/* Task Info & Actions - Right Column */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6">
                <SectionTitle title="Task Information" />

                <div className="mt-6 space-y-4">
                  <InfoRow label="Department" value={taskData.department} />
                  <InfoRow label="Project" value={taskData.project} />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Created By</label>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        {taskData.createdBy.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-gray-900">{taskData.createdBy}</p>
                        <p className="text-xs text-gray-500">{fmtDate(taskData.createdAt)}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Assigned To</label>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        {taskData.assignedTo.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-gray-900">{taskData.assignedTo}</p>
                        <p className="text-xs text-gray-500">by {taskData.assignedBy}</p>
                      </div>
                    </div>
                  </div>

                  <InfoRow 
                    label="Start Date" 
                    value={fmtDate(taskData.startDate)} 
                  />
                  
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
                </div>
              </Card>

              {/* Status Update Card */}
              <Card className="p-6">
                <SectionTitle title="Update Status" />
                
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {['PENDING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED'].map(status => (
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

        {activeTab === 'updates' && (
          <Card className="p-6">
            <SectionTitle title="Updates & Comments" subtitle={`${taskData.comments} total comments`} />

            {/* Add Comment */}
            <div className="mt-6 mb-8">
              <form onSubmit={handleAddComment}>
                <textarea
                  rows="4"
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Add a comment or update..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex justify-end mt-3">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl font-semibold text-white shadow-sm active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--accent-red)" }}
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {taskData.commentsList.map((comment, index) => (
                <div key={index} className="border-b border-gray-200/70 pb-6 last:border-0">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shrink-0"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      {comment.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-gray-900">{comment.user}</h4>
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

        {activeTab === 'documents' && (
          <Card className="p-6">
            <SectionTitle title="Task Documents" subtitle={`${taskData.documents} files attached`} />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {taskData.documentsList.map((doc, index) => (
                <div key={index} className="rounded-2xl border border-gray-200/70 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                      style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                    >
                      📄
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-gray-900 truncate">{doc.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{doc.size}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">Uploaded by</p>
                      <p className="text-sm font-semibold">{doc.uploadedBy}</p>
                      <p className="text-xs text-gray-500">{doc.date}</p>
                    </div>
                    <button 
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-sm active:scale-[0.99] transition"
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
                  Upload New Document
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Drag & drop or click to browse
                </p>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'history' && (
          <Card className="p-6">
            <SectionTitle title="Task History" subtitle="Complete audit trail" />

            <div className="mt-6 space-y-4">
              {taskData.history.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>
                    {index < taskData.history.length - 1 && (
                      <div className="absolute top-5 left-1.5 w-0.5 h-12 bg-gray-200"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.action}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-600">By {item.user}</span>
                      <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
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
              { icon: "📋", label: "Create Sub-task", color: "var(--primary-blue)" },
              { icon: "🔄", label: "Reassign Task", color: "var(--secondary-blue)" },
              { icon: "📅", label: "Extend Deadline", color: "#10B981" },
              { icon: "📊", label: "View Analytics", color: "#8B5CF6" },
            ].map((action, index) => (
              <button
                key={index}
                className="group p-5 rounded-2xl border border-gray-200/70 hover:shadow-md hover:-translate-y-0.5 transition-all text-center"
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

// Helper component for info rows
const InfoRow = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
    <p className="font-extrabold text-gray-900">{value}</p>
  </div>
);