"use client";

// pages/dashboards/HOD/HODEventDetail.jsx
import { useMemo, useState } from 'react';
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";  // Added Link here
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
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

const eventData = {
  id: 'EVT-001',
  title: 'Technical Department Quarterly Review',
  description: 'Quarterly performance review and planning session for next quarter. All team leads will present their department performance and plans.',
  eventType: 'MEETING',
  location: 'Conference Room A',
  meetingLink: 'https://meet.google.com/abc-defg-hij',
  startAt: '2024-12-20T10:00:00',
  endAt: '2024-12-20T12:00:00',
  createdBy: 'HOD - Technical',
  createdAt: '2024-12-01T10:00:00',
  scopeType: 'DEPARTMENTS',
  department: 'Technical',
  attendeesCount: 12,
  confirmedAttendees: 8,
  tentativeAttendees: 2,
  declinedAttendees: 1,
  agenda: [
    '10:00 - Welcome and Introduction',
    '10:15 - Q4 Performance Review',
    '10:45 - Team Presentations',
    '11:30 - Q1 Planning Discussion',
    '12:00 - Closing Remarks'
  ],
  attendees: [
    { id: 1, name: 'Alex Johnson', department: 'Technical', rsvp: 'ACCEPTED', attended: null },
    { id: 2, name: 'Emma Wilson', department: 'Technical', rsvp: 'ACCEPTED', attended: null },
    { id: 3, name: 'Michael Brown', department: 'Technical', rsvp: 'ACCEPTED', attended: null },
    { id: 4, name: 'Sarah Taylor', department: 'Technical', rsvp: 'TENTATIVE', attended: null },
    { id: 5, name: 'James Anderson', department: 'Workshop', rsvp: 'ACCEPTED', attended: null },
    { id: 6, name: 'Lisa Chen', department: 'Technical', rsvp: 'DECLINED', attended: null },
  ],
  documents: [
    { name: 'Q4_Review_Deck.pdf', size: '2.1 MB', uploadedBy: 'HOD - Technical' },
    { name: 'Q1_Planning_Document.docx', size: '1.8 MB', uploadedBy: 'Technical Lead' },
    { name: 'Budget_Allocation.xlsx', size: '3.2 MB', uploadedBy: 'Finance Dept' },
  ],
  notes: 'Please come prepared with your team reports. Remote participation is available via Google Meet.'
};

const initialComments = [
  {
    id: 1,
    userId: 1,
    userName: 'Alex Johnson',
    userRole: 'Technical Lead',
    userAvatar: 'AJ',
    content: 'I will be presenting the software team Q4 report.',
    createdAt: '2024-12-18T10:30:00',
    isInternal: false,
    isDeleted: false
  },
  {
    id: 2,
    userId: 2,
    userName: 'Emma Wilson',
    userRole: 'Hardware Lead',
    userAvatar: 'EW',
    content: '@AlexJohnson Great! Hardware team will present after you.',
    createdAt: '2024-12-18T11:15:00',
    isInternal: false,
    isDeleted: false
  },
  {
    id: 3,
    userId: 3,
    userName: 'Michael Brown',
    userRole: 'QA Lead',
    userAvatar: 'MB',
    content: 'Will the meeting minutes be shared afterwards?',
    createdAt: '2024-12-18T14:20:00',
    isInternal: false,
    isDeleted: false
  },
  {
    id: 4,
    userId: 1,
    userName: 'Alex Johnson',
    userRole: 'Technical Lead',
    userAvatar: 'AJ',
    content: 'Internal note: Please ensure all slides are submitted by EOD today.',
    createdAt: '2024-12-19T09:00:00',
    isInternal: true,
    isDeleted: false
  }
];

const safeDate = (v) => {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
};

const fmtTime = (v) => {
  const d = safeDate(v);
  if (!d) return "--:--";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const fmtFullDate = (v) => {
  const d = safeDate(v);
  if (!d) return "—";
  return d.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
};

const fmtShortDT = (v) => {
  const d = safeDate(v);
  if (!d) return "—";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
};

const rsvpTone = (s) => (s === "ACCEPTED" ? "success" : s === "TENTATIVE" ? "warn" : s === "DECLINED" ? "danger" : "default");

const eventIcon = (t) => (t === "MEETING" ? "👥" : t === "TRAINING" ? "🎓" : t === "EVENT" ? "🎉" : "📅");

export default function HODEventDetail() {
  const params = useParams() || {};
  const eventId = params.eventId;
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('overview');
  const [rsvpStatus, setRsvpStatus] = useState('ACCEPTED');
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isInternalComment, setIsInternalComment] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const currentUser = {
    id: 1,
    name: 'Alex Johnson',
    role: 'Technical Lead',
    avatar: 'AJ'
  };

  const isUpcoming = useMemo(() => {
    const start = safeDate(eventData.startAt);
    if (!start) return false;
    return start.getTime() > Date.now();
  }, []);

  const liveCommentsCount = useMemo(() => comments.filter((c) => !c.isDeleted).length, [comments]);

  const handleRsvpChange = (status) => {
    setRsvpStatus(status);
    toast.info(`RSVP status changed to ${status}`);
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
    setComments((prev) => prev.map((c) => (c.id === editingComment ? { ...c, content: editContent } : c)));
    setEditingComment(null);
    setEditContent('');
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent('');
  };

  const handleDeleteComment = (commentId) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, content: "[This comment has been deleted]", isDeleted: true } : c))
    );
    setShowDeleteConfirm(null);
  };

  const handleJoin = () => {
    if (!eventData.meetingLink) return toast.info("No meeting link for this event.");
    window.open(eventData.meetingLink, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
      <div className="space-y-6">
        {/* HERO */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <button
              onClick={() => router.push("/hod-dashboard/events")}
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
            >
              ← Back to Events
            </button>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>{eventData.id}</Pill>
                  <Pill tone="info">{eventData.eventType}</Pill>
                  {isUpcoming ? <Pill tone="success">Upcoming</Pill> : <Pill tone="warn">Past</Pill>}
                  {eventData.meetingLink ? <Pill tone="default">Virtual link available</Pill> : null}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  {eventData.title}
                </h1>

                <p className="text-gray-600 mt-2 max-w-3xl">
                  {eventData.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-700">
                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/70 border border-gray-200/70">
                    <span className="text-lg">{eventIcon(eventData.eventType)}</span>
                    <span className="font-semibold">{fmtFullDate(eventData.startAt)}</span>
                  </span>

                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/70 border border-gray-200/70">
                    <span>🕐</span>
                    <span className="font-semibold">
                      {fmtTime(eventData.startAt)} – {fmtTime(eventData.endAt)}
                    </span>
                  </span>

                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/70 border border-gray-200/70">
                    <span>📍</span>
                    <span className="font-semibold">{eventData.location}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {eventData.meetingLink ? (
                  <button
                    onClick={handleJoin}
                    className={btnSolid}
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    Join Meeting
                  </button>
                ) : null}

                <Link href={`/hod-dashboard/edit-event/${eventData.id}`}>
                  <button
                    className={btnOutline}
                    style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                  >
                    Edit Event
                  </button>
                </Link>

                {isUpcoming ? (
                  <button
                    className={btnSolid}
                    style={{ backgroundColor: "var(--accent-red)" }}
                    onClick={() => toast.info("Cancel event (demo)")}
                  >
                    Cancel Event
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border-t border-gray-200/70 px-4 md:px-6">
            <div className="flex flex-wrap gap-2 py-3">
              {[
                { key: "overview", label: "Overview" },
                { key: "attendees", label: `Attendees (${eventData.attendeesCount})` },
                { key: "documents", label: `Documents (${eventData.documents.length})` },
                { key: "comments", label: `Comments (${liveCommentsCount})` },
              ].map((t) => {
                const active = activeTab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className={`px-3.5 py-2 rounded-2xl text-sm font-semibold transition ring-1 ${active ? "text-white" : "text-gray-700 bg-gray-50 hover:bg-gray-100"
                      }`}
                    style={{
                      backgroundColor: active ? "var(--primary-blue)" : undefined,
                      borderColor: active ? "transparent" : "rgba(0,0,0,0.06)",
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Overview Tab */}
        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              {/* Agenda */}
              <Card className="p-6">
                <SectionTitle title="Agenda" subtitle="Session plan for the meeting" />

                <div className="mt-5 space-y-3">
                  {eventData.agenda.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl border border-gray-200/70 bg-gray-50/50">
                      <div
                        className="w-9 h-9 rounded-2xl flex items-center justify-center font-extrabold "
                        style={{ backgroundColor: "rgba(109, 198, 223, 0.20)", color: "var(--primary-blue)" }}
                      >
                        {idx + 1}
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{item}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Notes */}
              {eventData.notes ? (
                <Card className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <SectionTitle title="Notes" subtitle="Important instructions for attendees" />
                    <Pill tone="warn">Important</Pill>
                  </div>

                  <div className="mt-4 p-4 rounded-2xl border border-amber-200 bg-amber-50 text-amber-900 text-sm leading-relaxed">
                    {eventData.notes}
                  </div>
                </Card>
              ) : null}
            </div>

            {/* Side */}
            <div className="lg:col-span-1 space-y-6">
              {/* RSVP */}
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold" style={{ color: "var(--primary-blue)" }}>
                    Your RSVP
                  </h3>
                  <Pill tone={rsvpTone(rsvpStatus)}>{rsvpStatus}</Pill>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2">
                  {["ACCEPTED", "TENTATIVE", "DECLINED"].map((s) => {
                    const active = rsvpStatus === s;
                    return (
                      <button
                        key={s}
                        onClick={() => handleRsvpChange(s)}
                        className={`px-4 py-2.5 rounded-2xl text-sm font-semibold border transition ${active ? "text-white" : "bg-white hover:bg-gray-50"
                          }`}
                        style={{
                          backgroundColor: active ? "var(--primary-blue)" : undefined,
                          borderColor: active ? "transparent" : "rgba(44, 75, 155, 0.25)",
                          color: active ? "white" : "var(--primary-blue)",
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* Attendance summary */}
              <Card className="p-6">
                <h3 className="text-lg font-extrabold" style={{ color: "var(--primary-blue)" }}>
                  Attendance Summary
                </h3>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Confirmed</span>
                    <span className="font-extrabold text-gray-900">{eventData.confirmedAttendees}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tentative</span>
                    <span className="font-extrabold text-gray-900">{eventData.tentativeAttendees}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Declined</span>
                    <span className="font-extrabold text-gray-900">{eventData.declinedAttendees}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200/70 flex items-center justify-between">
                    <span className="text-gray-600">Total Invited</span>
                    <span className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      {eventData.attendeesCount}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Meta */}
              <Card className="p-6">
                <h3 className="text-lg font-extrabold" style={{ color: "var(--primary-blue)" }}>
                  Event Info
                </h3>
                <div className="mt-4 space-y-3 text-sm text-gray-700">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-600">Created By</span>
                    <span className="font-semibold text-gray-900">{eventData.createdBy}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-600">Created At</span>
                    <span className="font-semibold text-gray-900">{fmtShortDT(eventData.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-600">Scope</span>
                    <span className="font-semibold text-gray-900">{eventData.scopeType}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-600">Department</span>
                    <Pill tone="info">{eventData.department}</Pill>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : null}

        {/* Attendees Tab */}
        {activeTab === 'attendees' ? (
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200/70 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold" style={{ color: "var(--primary-blue)" }}>
                  Attendees
                </h2>
                <p className="text-sm text-gray-500 mt-1">Invite list and RSVP status</p>
              </div>

              <button
                className={btnOutline}
                style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                onClick={() => toast.info("Invite attendees (demo)")}
              >
                + Invite
              </button>
            </div>

            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200/70">
                  <tr className="text-[10px] font-semibold text-gray-500 uppercase tracking-normal">
                    <th className="px-3 py-2 text-left whitespace-nowrap">Name</th>
                    <th className="px-3 py-2 text-left whitespace-nowrap">Department</th>
                    <th className="px-3 py-2 text-left whitespace-nowrap">RSVP</th>
                    <th className="px-3 py-2 text-left whitespace-nowrap">Attendance</th>
                    <th className="px-3 py-2 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200/70 text-[11.5px]">
                  {eventData.attendees.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50/70 transition">
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-2xl flex items-center justify-center text-white font-bold text-[11px] "
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            {a.name
                              .split(" ")
                              .slice(0, 2)
                              .map((x) => x[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                          <div className="leading-tight">
                            <div className="font-semibold text-gray-900">{a.name}</div>
                            <div className="text-[10px] text-gray-500">ID: {a.id}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-2 whitespace-nowrap">
                        <Pill tone="info">{a.department}</Pill>
                      </td>

                      <td className="px-3 py-2 whitespace-nowrap">
                        <Pill tone={rsvpTone(a.rsvp)}>{a.rsvp}</Pill>
                      </td>

                      <td className="px-3 py-2 whitespace-nowrap">
                        {a.attended === null ? (
                          <span className="text-gray-500 text-[11.5px]">—</span>
                        ) : a.attended ? (
                          <span className="text-emerald-700 font-semibold text-[11.5px]">✓ Present</span>
                        ) : (
                          <span className="text-red-700 font-semibold text-[11.5px]">✗ Absent</span>
                        )}
                      </td>

                      <td className="px-3 py-2 text-right whitespace-nowrap">
                        <button
                          className="px-2.5 py-1 rounded-xl text-[11px] font-semibold border bg-white hover:bg-gray-50 transition"
                          style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                          onClick={() => toast.info(`Reminder sent to ${a.name} (demo)`)}
                        >
                          Send Reminder
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden p-4 text-sm text-gray-600">
              Attendees table is optimized for desktop view.
            </div>
          </Card>
        ) : null}

        {/* Documents Tab */}
        {activeTab === 'documents' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {eventData.documents.map((doc, idx) => (
              <Card key={idx} className="p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center "
                    style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                  >
                    <span className="text-2xl">📄</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-extrabold truncate" style={{ color: "var(--primary-blue)" }}>
                      {doc.name}
                    </div>
                    <div className="text-sm text-gray-600">{doc.size}</div>
                    <div className="text-[11px] text-gray-500 mt-1">Uploaded by {doc.uploadedBy}</div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                    onClick={() => toast.info(`Download ${doc.name} (demo)`)}
                  >
                    Download
                  </button>
                  <button
                    className="flex-1 px-4 py-2.5 rounded-2xl font-semibold text-sm border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                    onClick={() => toast.info(`Preview ${doc.name} (demo)`)}
                  >
                    Preview
                  </button>
                </div>
              </Card>
            ))}

            <Card className="p-5 border-dashed">
              <button
                className="w-full h-full rounded-2xl border-2 border-dashed border-gray-200/70 hover:border-blue-200 hover:bg-blue-50/20 transition p-6 text-center"
                onClick={() => toast.warning("Upload document (demo)")}
              >
                <div className="text-4xl mb-2" style={{ color: "var(--secondary-blue)" }}>
                  📤
                </div>
                <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                  Upload Document
                </div>
                <div className="text-sm text-gray-600 mt-1">Agenda, slides, minutes, supporting files</div>
              </button>
            </Card>
          </div>
        ) : null}

        {/* Comments Tab */}
        {activeTab === 'comments' ? (
          <Card className="p-6">
            <div className="flex items-start justify-between gap-3">
              <SectionTitle title="Discussion & Comments" subtitle="Ask questions and leave notes for participants" />
              <Pill>{liveCommentsCount} comments</Pill>
            </div>

            {/* Add comment */}
            <div className="mt-6">
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold "
                  style={{ backgroundColor: "var(--secondary-blue)" }}
                >
                  {currentUser.avatar}
                </div>

                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment or question about this event..."
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    rows={3}
                  />

                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={isInternalComment}
                        onChange={(e) => setIsInternalComment(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span>Internal note (HOD+)</span>
                    </label>

                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="px-5 py-2.5 rounded-2xl font-semibold text-white active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: "var(--primary-blue)" }}
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments list */}
            <div className="mt-8 space-y-4">
              {comments
                .filter((c) => !c.isDeleted)
                .map((c) => (
                  <div key={c.id} className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold "
                      style={{ backgroundColor: c.isInternal ? "#F59E0B" : "var(--secondary-blue)" }}
                    >
                      {c.userAvatar}
                    </div>

                    <div className="flex-1">
                      <div className="rounded-2xl border border-gray-200/70 bg-gray-50/40 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-extrabold text-gray-900">{c.userName}</span>
                              <span className="text-sm text-gray-500">{c.userRole}</span>
                              {c.isInternal ? <Pill tone="warn">Internal</Pill> : null}
                            </div>
                          </div>
                          <div className="text-[11px] text-gray-500 whitespace-nowrap">{fmtShortDT(c.createdAt)}</div>
                        </div>

                        {editingComment === c.id ? (
                          <div className="mt-3">
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
                              rows={3}
                            />
                            <div className="mt-2 flex gap-2">
                              <button
                                onClick={handleSaveEdit}
                                className="px-4 py-2 rounded-2xl font-semibold text-white"
                                style={{ backgroundColor: "var(--primary-blue)" }}
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-4 py-2 rounded-2xl font-semibold border bg-white hover:bg-gray-50"
                                style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="mt-3 text-sm text-gray-800 whitespace-pre-line">{c.content}</p>
                        )}

                        {/* Actions */}
                        {c.userId === currentUser.id && editingComment !== c.id ? (
                          <div className="mt-3 flex gap-4 text-sm">
                            <button onClick={() => handleEditComment(c)} className="font-semibold text-blue-700 hover:text-blue-900">
                              Edit
                            </button>
                            <button onClick={() => setShowDeleteConfirm(c.id)} className="font-semibold text-red-700 hover:text-red-900">
                              Delete
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}

              {liveCommentsCount === 0 ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-2" style={{ color: "var(--secondary-blue)" }}>
                    💬
                  </div>
                  <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                    No comments yet
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Be the first to start the discussion.</div>
                </div>
              ) : null}
            </div>
          </Card>
        ) : null}

        {/* Quick Actions */}
        <Card className="p-6">
          <SectionTitle title="Event Actions" subtitle="Common actions you may want to perform" />

          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "📧", label: "Send Reminders" },
              { icon: "📝", label: "Take Minutes" },
              { icon: "🔄", label: "Reschedule" },
              { icon: "📊", label: "Export Attendance" },
            ].map((a) => (
              <button
                key={a.label}
                className="p-4 rounded-2xl border border-gray-200/70 bg-white hover:bg-gray-50 transition text-center"
                onClick={() => toast.info(`${a.label} (demo)`)}
              >
                <div className="text-2xl mb-2">{a.icon}</div>
                <div className="font-semibold" style={{ color: "var(--primary-blue)" }}>
                  {a.label}
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm ? (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-md border border-gray-200/70">
            <div className="p-6">
              <h3 className="text-lg font-extrabold" style={{ color: "var(--accent-red)" }}>
                Delete Comment
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Are you sure you want to delete this comment? This action cannot be undone.
              </p>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                  style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteComment(showDeleteConfirm)}
                  className="px-4 py-2 rounded-2xl font-semibold text-white transition active:scale-[0.99]"
                  style={{ backgroundColor: "var(--accent-red)" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Layout>
  );
}