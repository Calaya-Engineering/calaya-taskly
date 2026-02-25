"use client";

// pages/dashboards/MD/MDCreateEvent.jsx
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
const departments = [
  "Technical",
  "Workshop",
  "Logistics",
  "Contract and Procurement",
  "Legal and Compliances",
  "HR",
  "HSE",
  "Business Development (BDD)",
  "Accounts",
  "NCD",
  "QHSE",
  "Admin",
];

const users = [
  { id: 1, name: "John Doe", department: "Technical" },
  { id: 2, name: "Sarah Smith", department: "HSE" },
  { id: 3, name: "Mike Johnson", department: "Technical" },
  { id: 4, name: "Robert Chen", department: "Workshop" },
  { id: 5, name: "Lisa Wang", department: "Logistics" },
  { id: 6, name: "David Kim", department: "Legal and Compliances" },
  { id: 7, name: "Maria Garcia", department: "HR" },
  { id: 8, name: "James Wilson", department: "Accounts" },
  { id: 9, name: "Alex Turner", department: "Technical" },
];


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

const typeIcon = (v) => (v === "MEETING" ? "👥" : v === "TRAINING" ? "🎓" : v === "EVENT" ? "🎉" : "📅");

export default function MDCreateEvent() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "MEETING",
    location: "",
    meetingLink: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    scopeType: "ALL_COMPANY",
    selectedDepartments: [],
    selectedUsers: [],
    sendNotifications: true,
    requireRSVP: true,
    attachments: [],
  });

  const now = useMemo(() => new Date(), []);
  const currentDate = useMemo(() => now.toISOString().split("T")[0], [now]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating event:", formData);
    toast.success("Event created successfully!");
    router.push("/md-dashboard/events");
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setFormData((prev) => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  };

  const removeAttachment = (index) => {
    setFormData((prev) => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== index) }));
  };

  const handleScopeChange = (scope) => {
    setFormData((prev) => ({
      ...prev,
      scopeType: scope,
      selectedDepartments: [],
      selectedUsers: [],
    }));
  };

  const toggleDepartment = (dept) => {
    setFormData((prev) => {
      const exists = prev.selectedDepartments.includes(dept);
      return {
        ...prev,
        selectedDepartments: exists ? prev.selectedDepartments.filter((d) => d !== dept) : [...prev.selectedDepartments, dept],
      };
    });
  };

  const toggleUser = (id) => {
    setFormData((prev) => {
      const exists = prev.selectedUsers.includes(id);
      return {
        ...prev,
        selectedUsers: exists ? prev.selectedUsers.filter((x) => x !== id) : [...prev.selectedUsers, id],
      };
    });
  };

  const scopeSummary = useMemo(() => {
    if (formData.scopeType === "ALL_COMPANY") return "All staff members will be invited.";
    if (formData.scopeType === "HODS_ONLY") return "Only Heads of Department will be invited.";
    if (formData.scopeType === "DEPARTMENTS") {
      return formData.selectedDepartments.length
        ? `${formData.selectedDepartments.length} department(s) selected.`
        : "Select one or more departments.";
    }
    if (formData.scopeType === "USERS") {
      return formData.selectedUsers.length ? `${formData.selectedUsers.length} user(s) selected.` : "Select one or more users.";
    }
    return "Select invitation scope.";
  }, [formData.scopeType, formData.selectedDepartments.length, formData.selectedUsers.length]);

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Hero header (MD dashboard gradient) */}
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
                  <Pill>Meetings / Trainings / Events</Pill>
                  <Pill tone="success">{formData.sendNotifications ? "Notifications ON" : "Notifications OFF"}</Pill>
                  {formData.requireRSVP ? <Pill tone="warn">RSVP Required</Pill> : <Pill>RSVP Optional</Pill>}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Schedule Event
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Create a new meeting, training, or company event and invite the right participants.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => router.push("/md-dashboard/events")}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border-t border-gray-200/70 px-6 py-4">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-gray-200/70">
                <span className="text-lg">{typeIcon(formData.eventType)}</span>
                <span className="font-semibold">{formData.eventType}</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-gray-200/70">
                <span>🎯</span>
                <span className="font-semibold">{formData.scopeType}</span>
              </span>
              <span className="text-gray-500">{scopeSummary}</span>
            </div>
          </div>
        </Card>

        <form id="md-create-event-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Event Type */}
          <Card className="p-6">
            <SectionTitle title="Event Type" subtitle="Choose what you are scheduling" />
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: "MEETING", label: "Meeting", icon: "👥" },
                { value: "TRAINING", label: "Training", icon: "🎓" },
                { value: "EVENT", label: "Event", icon: "🎉" },
              ].map((t) => {
                const active = formData.eventType === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    className={`p-4 rounded-2xl border text-left transition ${
                      active ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    style={{
                      borderColor: active ? "rgba(44, 75, 155, 0.45)" : "rgba(0,0,0,0.08)",
                      boxShadow: active ? "0 10px 20px rgba(17,24,39,0.06)" : undefined,
                    }}
                    onClick={() => setFormData((p) => ({ ...p, eventType: t.value }))}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-2xl">{t.icon}</div>
                      {active ? <Pill tone="success">Selected</Pill> : <Pill>Pick</Pill>}
                    </div>
                    <div className="mt-3 font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      {t.label}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {t.value === "MEETING"
                        ? "Internal or client meetings"
                        : t.value === "TRAINING"
                        ? "Workshops and trainings"
                        : "Company events & gatherings"}
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Basic Information */}
          <Card className="p-6">
            <SectionTitle title="Event Details" subtitle="Title, description, location and link" />
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Describe the agenda or details..."
                  value={formData.description}
                  onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="e.g., Conference Room, Virtual, etc."
                  value={formData.location}
                  onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                />
              </div>

              {formData.eventType === "MEETING" ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Meeting Link (Optional)</label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="https://meet.google.com/..."
                    value={formData.meetingLink}
                    onChange={(e) => setFormData((p) => ({ ...p, meetingLink: e.target.value }))}
                  />
                </div>
              ) : (
                <div className="hidden md:block" />
              )}
            </div>
          </Card>

          {/* Date & Time */}
          <Card className="p-6">
            <SectionTitle title="Date & Time" subtitle="Start and end schedule" />
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date *</label>
                <input
                  type="date"
                  required
                  min={currentDate}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.startDate}
                  onChange={(e) => setFormData((p) => ({ ...p, startDate: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time *</label>
                <input
                  type="time"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.startTime}
                  onChange={(e) => setFormData((p) => ({ ...p, startTime: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  min={formData.startDate || currentDate}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.endDate}
                  onChange={(e) => setFormData((p) => ({ ...p, endDate: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.endTime}
                  onChange={(e) => setFormData((p) => ({ ...p, endTime: e.target.value }))}
                />
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Tip: If End Date/Time is empty, the event will be treated as a single session.
            </div>
          </Card>

          {/* Scope Selection */}
          <Card className="p-6">
            <SectionTitle title="Event Scope" subtitle="Who should be invited?" />
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              {[
                { value: "ALL_COMPANY", label: "All Company", description: "All staff members" },
                { value: "DEPARTMENTS", label: "Departments", description: "Selected departments" },
                { value: "HODS_ONLY", label: "HODs Only", description: "Heads of Department" },
                { value: "USERS", label: "Specific Users", description: "Selected individuals" },
              ].map((s) => {
                const active = formData.scopeType === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    className={`p-4 rounded-2xl border text-left transition ${
                      active ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    style={{
                      borderColor: active ? "rgba(44, 75, 155, 0.45)" : "rgba(0,0,0,0.08)",
                      boxShadow: active ? "0 10px 20px rgba(17,24,39,0.06)" : undefined,
                    }}
                    onClick={() => handleScopeChange(s.value)}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        {s.label}
                      </div>
                      {active ? <Pill tone="success">Selected</Pill> : <Pill>Pick</Pill>}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{s.description}</div>
                  </button>
                );
              })}
            </div>

            {/* Department chips */}
            {formData.scopeType === "DEPARTMENTS" ? (
              <div className="mt-5">
                <div className="flex items-center justify-between gap-3">
                  <label className="block text-sm font-semibold text-gray-700">Select Departments</label>
                  <div className="text-xs text-gray-500">
                    Selected: <span className="font-semibold">{formData.selectedDepartments.length}</span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {departments.map((dept) => {
                    const active = formData.selectedDepartments.includes(dept);
                    return (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => toggleDepartment(dept)}
                        className={`px-3.5 py-2 rounded-2xl text-sm font-semibold transition ring-1 ${
                          active ? "text-white" : "text-gray-700 bg-gray-50 hover:bg-gray-100"
                        }`}
                        style={{
                          backgroundColor: active ? "var(--primary-blue)" : undefined,
                          borderColor: active ? "transparent" : "rgba(0,0,0,0.06)",
                        }}
                      >
                        {dept}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Users list */}
            {formData.scopeType === "USERS" ? (
              <div className="mt-5">
                <div className="flex items-center justify-between gap-3">
                  <label className="block text-sm font-semibold text-gray-700">Select Users</label>
                  <div className="text-xs text-gray-500">
                    Selected: <span className="font-semibold">{formData.selectedUsers.length}</span>
                  </div>
                </div>

                <div className="mt-3 max-h-60 overflow-y-auto rounded-2xl border border-gray-200/70 bg-white">
                  {users.map((u) => {
                    const active = formData.selectedUsers.includes(u.id);
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => toggleUser(u.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b last:border-b-0 border-gray-200/70 transition ${
                          active ? "bg-blue-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className="w-9 h-9 rounded-2xl flex items-center justify-center text-white font-bold text-sm "
                          style={{ backgroundColor: "var(--secondary-blue)" }}
                        >
                          {u.name
                            .split(" ")
                            .slice(0, 2)
                            .map((x) => x[0])
                            .join("")
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-gray-900">{u.name}</div>
                          <div className="text-xs text-gray-500">{u.department}</div>
                        </div>

                        {active ? <Pill tone="success">✓ Added</Pill> : <Pill>Add</Pill>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </Card>

          {/* Attachments */}
          <Card className="p-6">
            <SectionTitle title="Attachments" subtitle="Agenda, slides, or supporting documents (optional)" />
            <div className="mt-5">
              <input id="event-file-upload" type="file" multiple className="hidden" onChange={handleFileUpload} />

              <label
                htmlFor="event-file-upload"
                className="block cursor-pointer rounded-2xl border-2 border-dashed border-gray-200/70 hover:border-blue-200 hover:bg-blue-50/20 transition p-8 text-center"
              >
                <div className="text-4xl mb-2" style={{ color: "var(--secondary-blue)" }}>
                  📎
                </div>
                <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                  Drag & drop files here or click to browse
                </div>
                <div className="text-sm text-gray-500 mt-1">Agenda, presentations, or supporting documents</div>
              </label>

              {formData.attachments.length ? (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-gray-700">
                      Attached files ({formData.attachments.length})
                    </div>
                    <Pill>{Math.min(formData.attachments.length, 99)} file(s)</Pill>
                  </div>

                  {formData.attachments.map((file, idx) => (
                    <div
                      key={`${file.name}-${idx}`}
                      className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-gray-200/70 bg-gray-50/40"
                    >
                      <div className="min-w-0 flex items-center gap-3">
                        <div className="text-xl">📄</div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 truncate">{file.name}</div>
                          <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeAttachment(idx)}
                        className="px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white active:scale-[0.99] transition"
                        style={{ backgroundColor: "var(--accent-red)" }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </Card>

          {/* Additional Options */}
          <Card className="p-6">
            <SectionTitle title="Options" subtitle="Notifications and RSVP behavior" />
            <div className="mt-5 space-y-3">
              {[
                {
                  key: "sendNotifications",
                  title: "Send Notifications",
                  desc: "Send email and in-app notifications to invited participants",
                },
                {
                  key: "requireRSVP",
                  title: "Require RSVP",
                  desc: "Ask participants to confirm their attendance",
                },
              ].map((opt) => {
                const checked = formData[opt.key];
                return (
                  <div
                    key={opt.key}
                    className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-gray-200/70 bg-white"
                  >
                    <div className="min-w-0">
                      <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        {opt.title}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{opt.desc}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, [opt.key]: !p[opt.key] }))}
                      className={`relative inline-flex items-center h-7 w-12 rounded-full transition ${
                        checked ? "bg-blue-600" : "bg-gray-200"
                      }`}
                      aria-pressed={checked}
                    >
                      <span
                        className={`inline-block h-5 w-5 bg-white rounded-full transform transition ${
                          checked ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Bottom actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <button
              type="button"
              onClick={() => router.push("/md-dashboard/events")}
              className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
              style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
              style={{ backgroundColor: "var(--accent-red)" }}
            >
              Schedule Event
            </button>
          </div>
        </form>

        {/* Tips (MD style) */}
        <Card className="p-6">
          <SectionTitle title="Event Planning Tips" subtitle="Quick reminders for better scheduling" />
          <ul className="mt-5 space-y-2 text-sm text-gray-600">
            {[
              "Set reminders for participants 30 minutes before the event",
              "For virtual meetings, include the meeting link",
              "Attach relevant documents for review before the meeting",
              "Allow buffer time between meetings for preparation",
              "Send follow-up emails with meeting minutes",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5" style={{ color: "#10B981" }}>
                  ✓
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Layout>
  );
}
