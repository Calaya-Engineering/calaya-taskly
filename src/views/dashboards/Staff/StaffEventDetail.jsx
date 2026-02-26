"use client";

// pages/dashboards/Staff/StaffEventDetail.jsx
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
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
const btnSolid = `${btnBase} text-white`;

const textareaBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";

const typeTone = (type) => {
  switch (type) {
    case 'MEETING': return 'info';
    case 'TRAINING': return 'success';
    case 'EVENT': return 'purple';
    default: return 'default';
  }
};

const rsvpTone = (status) => {
  switch (status) {
    case 'ACCEPTED': return 'success';
    case 'DECLINED': return 'danger';
    case 'TENTATIVE': return 'warn';
    default: return 'default';
  }
};

const roleTone = (role) => {
  switch (role) {
    case 'HOD': return 'info';
    case 'Staff': return 'default';
    default: return 'default';
  }
};

const fmtDateTime = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const fmtTime = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const fmtShortDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getDuration = (start, end) => {
  const diff = new Date(end) - new Date(start);
  const hours = diff / (1000 * 60 * 60);
  return Math.round(hours * 10) / 10;
};

const getFileIcon = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase();
  switch (ext) {
    case 'pdf': return '📕';
    case 'doc':
    case 'docx': return '📘';
    case 'xls':
    case 'xlsx': return '📗';
    case 'ppt':
    case 'pptx': return '📙';
    default: return '📎';
  }
};

// Sample comments data
const initialComments = [
  {
    id: 1,
    userId: 1,
    userName: 'John Doe',
    userRole: 'Staff',
    userAvatar: 'JD',
    content: 'Will there be a recording of this briefing for those who cannot attend?',
    createdAt: '2024-12-14T09:30:00',
    isInternal: false,
    isDeleted: false
  },
  {
    id: 2,
    userId: 2,
    userName: 'Sarah Smith',
    userRole: 'HOD',
    userAvatar: 'SS',
    content: '@JohnDoe Yes, we will share the recording after the session.',
    createdAt: '2024-12-14T10:15:00',
    isInternal: false,
    isDeleted: false
  },
  {
    id: 3,
    userId: 3,
    userName: 'Mike Johnson',
    userRole: 'Staff',
    userAvatar: 'MJ',
    content: 'Is there any new PPE requirement being introduced?',
    createdAt: '2024-12-13T14:20:00',
    isInternal: false,
    isDeleted: false
  },
  {
    id: 4,
    userId: 1,
    userName: 'John Doe',
    userRole: 'Staff',
    userAvatar: 'JD',
    content: 'I have a conflict with another meeting. Will the minutes be shared?',
    createdAt: '2024-12-13T11:45:00',
    isInternal: false,
    isDeleted: false
  }
];

export default function StaffEventDetail() {
  const params = useParams() || {};
  const eventId = params.eventId;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  const [rsvpStatus, setRsvpStatus] = useState('ACCEPTED');
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isInternalComment, setIsInternalComment] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Mock current user
  const currentUser = {
    id: 1,
    name: 'John Doe',
    role: 'Staff',
    avatar: 'JD'
  };

  // Mock event data
  const event = {
    id: eventId || 'EVT-001',
    title: 'Monthly Safety Briefing',
    description: 'Monthly safety briefing for all staff covering new safety protocols, incident reports from previous month, and upcoming safety training schedules. All department representatives must attend.',
    type: 'MEETING',
    department: 'All Company',
    location: 'Main Conference Room',
    meetingLink: '',
    startAt: '2024-12-15T09:00:00',
    endAt: '2024-12-15T10:30:00',
    createdBy: 'HSE Department',
    createdAt: '2024-12-01T14:30:00',
    scope: 'ALL_COMPANY',
    attendees: [
      { name: 'John Doe', department: 'Technical', rsvp: 'ACCEPTED', attended: false },
      { name: 'Sarah Smith', department: 'Workshop', rsvp: 'ACCEPTED', attended: false },
      { name: 'Mike Johnson', department: 'HSE', rsvp: 'ACCEPTED', attended: false },
      { name: 'Lisa Wang', department: 'Technical', rsvp: 'TENTATIVE', attended: false },
      { name: 'Robert Brown', department: 'Logistics', rsvp: 'INVITED', attended: false },
    ],
    documents: [
      { id: 1, name: 'Safety Presentation.pdf', uploadedBy: 'HSE Department', date: '2024-12-10', size: '4.2 MB' },
      { id: 2, name: 'Incident Report Summary.docx', uploadedBy: 'HSE Officer', date: '2024-12-09', size: '1.8 MB' },
    ],
    agenda: [
      'Opening remarks and safety statistics',
      'New safety protocol updates',
      'Incident report review',
      'Upcoming training schedule',
      'Q&A session',
      'Closing remarks'
    ]
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      userAvatar: currentUser.avatar,
      content: newComment,
      createdAt: new Date().toISOString(),
      isInternal: isInternalComment,
      isDeleted: false
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setIsInternalComment(false);
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  const handleSaveEdit = () => {
    if (!editContent.trim()) return;

    setComments(comments.map(comment =>
      comment.id === editingComment
        ? { ...comment, content: editContent }
        : comment
    ));
    setEditingComment(null);
    setEditContent('');
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent('');
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, content: '[This comment has been deleted]', isDeleted: true }
        : comment
    ));
    setShowDeleteConfirm(null);
  };

  const handleRSVP = (status) => {
    setRsvpStatus(status);
    toast.success(`RSVP status updated to ${status}`);
  };

  const joinMeeting = () => {
    if (event.meetingLink) {
      window.open(event.meetingLink, '_blank');
    } else {
      toast.info(`Meeting is at ${event.location}. No virtual link available.`);
    }
  };

  const handleDownload = (doc) => {
    toast.info(`Downloading ${doc.name}`);
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
                  onClick={() => router.push("/staff-dashboard/events")}
                  className="w-11 h-11 rounded-2xl border bg-white hover:bg-gray-50 active:scale-[0.99] transition flex items-center justify-center"
                  style={{ borderColor: "rgba(44,75,155,0.25)", color: "var(--primary-blue)" }}
                  title="Back"
                >
                  ←
                </button>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Pill tone={typeTone(event.type)}>{event.type}</Pill>
                    <Pill tone={rsvpTone(rsvpStatus)}>{rsvpStatus}</Pill>
                  </div>

                  <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 truncate">{event.title}</h1>
                  <p className="text-gray-600 mt-1 text-sm">
                    {fmtDateTime(event.startAt)} • {getDuration(event.startAt, event.endAt)} hours
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={joinMeeting}
                  className={btnOutline}
                  style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                >
                  Join Meeting
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
              <div className="flex flex-wrap border-b border-gray-200/70">
                {[
                  { id: "details", label: "Details" },
                  { id: "agenda", label: "Agenda" },
                  { id: "attendees", label: `Attendees (${event.attendees.length})` },
                  { id: "documents", label: `Documents (${event.documents.length})` },
                  { id: "comments", label: `Comments (${comments.filter(c => !c.isDeleted).length})` },
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

              {/* Details Tab */}
              {activeTab === "details" && (
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <SectionTitle title="Description" />
                      <p className="text-gray-700 whitespace-pre-line mt-3">{event.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
                        <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                          Event Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-3">
                            <span className="text-gray-400">📅</span>
                            <div>
                              <p className="font-semibold">Date & Time</p>
                              <p className="text-gray-600">{fmtDateTime(event.startAt)} - {fmtTime(event.endAt)}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-gray-400">📍</span>
                            <div>
                              <p className="font-semibold">Location</p>
                              <p className="text-gray-600">{event.location}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-gray-400">🏢</span>
                            <div>
                              <p className="font-semibold">Department</p>
                              <p className="text-gray-600">{event.department}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-gray-400">👤</span>
                            <div>
                              <p className="font-semibold">Organizer</p>
                              <p className="text-gray-600">{event.createdBy}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70">
                        <h4 className="text-sm font-extrabold mb-3" style={{ color: "var(--primary-blue)" }}>
                          Event Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-3">
                            <span className="text-gray-400">⏱️</span>
                            <div>
                              <p className="font-semibold">Duration</p>
                              <p className="text-gray-600">{getDuration(event.startAt, event.endAt)} hours</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-gray-400">👥</span>
                            <div>
                              <p className="font-semibold">Attendees</p>
                              <p className="text-gray-600">
                                {event.attendees.filter(a => a.rsvp === 'ACCEPTED').length} accepted • {event.attendees.length} invited
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-gray-400">📄</span>
                            <div>
                              <p className="font-semibold">Documents</p>
                              <p className="text-gray-600">{event.documents.length} attached files</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-gray-400">📅</span>
                            <div>
                              <p className="font-semibold">Created</p>
                              <p className="text-gray-600">{fmtShortDateTime(event.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Meeting Link */}
                    {event.meetingLink && (
                      <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-xl">🎥</div>
                            <div>
                              <p className="font-extrabold text-blue-900">Virtual Meeting Link</p>
                              <p className="text-sm text-blue-700 break-all">{event.meetingLink}</p>
                            </div>
                          </div>
                          <button
                            onClick={joinMeeting}
                            className="px-4 py-2.5 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                            style={{ backgroundColor: "var(--primary-blue)" }}
                          >
                            Join
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Agenda Tab */}
              {activeTab === "agenda" && (
                <div className="p-6">
                  <SectionTitle title="Meeting Agenda" />

                  <div className="mt-6 space-y-4">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 border border-transparent">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-blue-50 text-blue-700 font-extrabold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item}</p>
                          <p className="text-xs text-gray-500 mt-1">⏱️ 10-15 minutes</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-5 rounded-2xl bg-gray-50 border border-gray-200/70">
                    <div className="flex items-start gap-3">
                      <span className="text-gray-500 text-lg">ℹ️</span>
                      <div>
                        <p className="font-extrabold text-gray-900">Meeting Notes</p>
                        <p className="text-sm text-gray-600 mt-1">Please arrive 5 minutes early and bring any relevant documents.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Attendees Tab */}
              {activeTab === "attendees" && (
                <div className="p-6">
                  <SectionTitle title="Attendees" subtitle={`${event.attendees.length} invited`} />

                  <div className="mt-6 space-y-3">
                    {event.attendees.map((attendee, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-sm" style={{ backgroundColor: "var(--secondary-blue)" }}>
                            {attendee.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-extrabold text-gray-900">{attendee.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{attendee.department}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Pill tone={rsvpTone(attendee.rsvp)}>{attendee.rsvp}</Pill>
                          {attendee.attended && (
                            <Pill tone="success">Attended</Pill>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === "documents" && (
                <div className="p-6">
                  <SectionTitle title="Event Documents" subtitle={`${event.documents.length} files`} />

                  <div className="mt-6 space-y-3">
                    {event.documents.map((doc) => (
                      <div key={doc.id} className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl" style={{ backgroundColor: "rgba(109, 198, 223, 0.1)" }}>
                              {getFileIcon(doc.name)}
                            </div>
                            <div>
                              <p className="font-extrabold text-sm text-gray-900">{doc.name}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Uploaded by {doc.uploadedBy} • {doc.date} • {doc.size}
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

                  <div className="mt-6 p-5 rounded-2xl bg-gray-50 border border-gray-200/70">
                    <p className="text-sm text-gray-600">
                      📝 Meeting minutes will be uploaded after the event concludes.
                    </p>
                  </div>
                </div>
              )}

              {/* Comments Tab */}
              {activeTab === "comments" && (
                <div className="p-6">
                  <SectionTitle
                    title="💬 Discussion & Comments"
                    subtitle={`${comments.filter(c => !c.isDeleted).length} comments`}
                  />

                  {/* Add Comment */}
                  <div className="mt-6 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shrink-0" style={{ backgroundColor: "var(--secondary-blue)" }}>
                        {currentUser.avatar}
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Ask a question or share your thoughts about this event..."
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
                            className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ backgroundColor: "var(--primary-blue)" }}
                          >
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.filter(c => !c.isDeleted).map((comment) => (
                      <div key={comment.id} className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shrink-0" style={{ backgroundColor: "var(--secondary-blue)" }}>
                          {comment.userAvatar}
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/70">
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-gray-900">{comment.userName}</span>
                                <Pill tone={roleTone(comment.userRole)}>{comment.userRole}</Pill>
                                {comment.isInternal && <Pill tone="warn">Internal</Pill>}
                              </div>
                              <span className="text-xs text-gray-500">{fmtShortDateTime(comment.createdAt)}</span>
                            </div>

                            {editingComment === comment.id ? (
                              <div className="mt-2">
                                <textarea
                                  value={editContent}
                                  onChange={(e) => setEditContent(e.target.value)}
                                  className={textareaBase}
                                  rows="3"
                                />
                                <div className="mt-2 flex gap-2">
                                  <button
                                    onClick={handleSaveEdit}
                                    className="px-4 py-2 rounded-2xl text-xs font-semibold text-white active:scale-[0.99] transition"
                                    style={{ backgroundColor: "var(--primary-blue)" }}
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="px-4 py-2 rounded-2xl text-xs font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-700 whitespace-pre-line">{comment.content}</p>
                            )}

                            {/* Comment Actions */}
                            {comment.userId === currentUser.id && !editingComment && (
                              <div className="mt-3 flex gap-4 text-xs">
                                <button
                                  onClick={() => handleEditComment(comment)}
                                  className="font-semibold" style={{ color: "var(--primary-blue)" }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => setShowDeleteConfirm(comment.id)}
                                  className="font-semibold" style={{ color: "var(--accent-red)" }}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {comments.filter(c => !c.isDeleted).length === 0 && (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-3">💬</div>
                        <p className="text-gray-600">No comments yet. Be the first to ask a question!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* SIDE */}
          <div className="space-y-6">
            {/* RSVP Status */}
            <Card className="p-6">
              <SectionTitle title="Your RSVP Status" />

              <div className="mt-4 space-y-4">
                <div className={`p-5 rounded-2xl border text-center ${rsvpStatus === 'ACCEPTED' ? 'border-emerald-200 bg-emerald-50' :
                    rsvpStatus === 'TENTATIVE' ? 'border-amber-200 bg-amber-50' :
                      rsvpStatus === 'DECLINED' ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
                  }`}>
                  <p className="text-sm text-gray-600">Current Status</p>
                  <p className={`text-xl font-extrabold mt-1 ${rsvpStatus === 'ACCEPTED' ? 'text-emerald-700' :
                      rsvpStatus === 'TENTATIVE' ? 'text-amber-700' :
                        rsvpStatus === 'DECLINED' ? 'text-red-700' : 'text-gray-700'
                    }`}>
                    {rsvpStatus}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200/70">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Update Your Response:</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleRSVP('ACCEPTED')}
                      className={`w-full px-4 py-3 rounded-2xl text-sm font-semibold transition active:scale-[0.99] ${rsvpStatus === 'ACCEPTED'
                          ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                          : 'border bg-white hover:bg-gray-50'
                        }`}
                      style={rsvpStatus !== 'ACCEPTED' ? { borderColor: "rgba(16,185,129,0.35)", color: "#10B981" } : {}}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRSVP('TENTATIVE')}
                      className={`w-full px-4 py-3 rounded-2xl text-sm font-semibold transition active:scale-[0.99] ${rsvpStatus === 'TENTATIVE'
                          ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                          : 'border bg-white hover:bg-gray-50'
                        }`}
                      style={rsvpStatus !== 'TENTATIVE' ? { borderColor: "rgba(245,158,11,0.35)", color: "#F59E0B" } : {}}
                    >
                      Tentative
                    </button>
                    <button
                      onClick={() => handleRSVP('DECLINED')}
                      className={`w-full px-4 py-3 rounded-2xl text-sm font-semibold transition active:scale-[0.99] ${rsvpStatus === 'DECLINED'
                          ? 'bg-red-50 text-red-700 ring-1 ring-red-200'
                          : 'border bg-white hover:bg-gray-50'
                        }`}
                      style={rsvpStatus !== 'DECLINED' ? { borderColor: "rgba(239,68,68,0.35)", color: "#EF4444" } : {}}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Event Quick Info */}
            <Card className="p-6">
              <SectionTitle title="Event Quick Info" />

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 text-gray-400">⏰</span>
                  <span className="text-gray-700">{fmtTime(event.startAt)} - {fmtTime(event.endAt)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 text-gray-400">📅</span>
                  <span className="text-gray-700">
                    {new Date(event.startAt).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 text-gray-400">📍</span>
                  <span className="text-gray-700">{event.location}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200/70">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      {event.attendees.filter(a => a.rsvp === 'ACCEPTED').length}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Accepted</p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold" style={{ color: "#F59E0B" }}>
                      {event.attendees.filter(a => a.rsvp === 'TENTATIVE').length}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Tentative</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Reminder Settings */}
            <Card className="p-6">
              <SectionTitle title="Reminder Settings" />

              <div className="mt-4 space-y-3">
                {[
                  { label: '15 minutes before', enabled: true },
                  { label: '1 hour before', enabled: true },
                  { label: '1 day before', enabled: false },
                  { label: 'Email notification', enabled: true },
                ].map((reminder, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{reminder.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={reminder.enabled} />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>

            {/* Related Events */}
            <Card className="p-6">
              <SectionTitle title="Related Events" />

              <div className="mt-4 space-y-3">
                <div
                  className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => router.push('/staff-dashboard/event/EVT-002')}
                >
                  <p className="font-extrabold text-sm text-gray-900">Technical Department Review</p>
                  <p className="text-xs text-gray-500 mt-1">Dec 16 • 2:00 PM • Technical Dept</p>
                </div>
                <div
                  className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => router.push('/staff-dashboard/event/EVT-003')}
                >
                  <p className="font-extrabold text-sm text-gray-900">Workshop Equipment Training</p>
                  <p className="text-xs text-gray-500 mt-1">Dec 17 • 10:00 AM • Workshop</p>
                </div>
                <div
                  className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => router.push('/staff-dashboard/event/EVT-005')}
                >
                  <p className="font-extrabold text-sm text-gray-900">Project Status Meeting</p>
                  <p className="text-xs text-gray-500 mt-1">Dec 18 • 11:00 AM • Virtual</p>
                </div>
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

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden border border-gray-200 transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
                    className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
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

