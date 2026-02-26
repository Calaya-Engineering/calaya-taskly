"use client";

// pages/dashboards/MD/MDEditEvent.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
// Sample event data (in real app, this would come from an API)
const eventsData = [
  {
    id: "EVT-001",
    title: "Quarterly Review Meeting",
    type: "MEETING",
    description: "Quarterly performance review and planning for next quarter",
    location: "Main Conference Room",
    meetingLink: "",
    startAt: "2024-12-20T09:00:00",
    endAt: "2024-12-20T12:00:00",
    createdBy: "Managing Director",
    scope: "ALL_COMPANY",
    attendees: 24,
    color: "blue",
    agenda: ["Welcome & Opening", "Department Updates", "Q4 Planning", "Q&A / Closing"],
  },
  {
    id: "EVT-002",
    title: "Safety Training Workshop",
    type: "TRAINING",
    description: "Mandatory safety training for all field staff",
    location: "Training Hall B",
    meetingLink: "",
    startAt: "2024-12-22T14:00:00",
    endAt: "2024-12-22T17:00:00",
    createdBy: "HSE Department",
    scope: "DEPARTMENTS",
    attendees: 45,
    color: "green",
    agenda: ["Registration", "Training Session", "Practical", "Wrap-up"],
  },
];

/* ---------------- UI helpers (MD dashboard style) ---------------- */
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

const toDateInput = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
};
const toTimeInput = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toTimeString().slice(0, 5);
};

export default function MDEditEvent() {
  const params = useParams() || {};
  const eventId = params.eventId;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    type: "MEETING",
    description: "",
    location: "",
    meetingLink: "",
    startDate: "",
    startTime: "09:00",
    endDate: "",
    endTime: "17:00",
    scope: "ALL_COMPANY",
    selectedDepartments: [],
    selectedUsers: [],
    agenda: [""],
    color: "blue",
  });

  const departments = useMemo(
    () => [
      { id: "TECH", name: "Technical" },
      { id: "HSE", name: "HSE" },
      { id: "HR", name: "Human Resources" },
      { id: "FIN", name: "Finance" },
      { id: "OPS", name: "Operations" },
      { id: "LEGAL", name: "Legal" },
    ],
    []
  );

  const users = useMemo(
    () => [
      { id: 1, name: "John Doe", department: "Technical" },
      { id: 2, name: "Sarah Smith", department: "HSE" },
      { id: 3, name: "Mike Johnson", department: "Technical" },
      { id: 4, name: "Lisa Wang", department: "Logistics" },
    ],
    []
  );

  // load event
  useEffect(() => {
    const event = eventsData.find((e) => e.id === eventId);
    if (!event) return;

    setFormData((prev) => ({
      ...prev,
      title: event.title,
      type: event.type,
      description: event.description,
      location: event.location,
      meetingLink: event.meetingLink || "",
      startDate: toDateInput(event.startAt),
      startTime: toTimeInput(event.startAt) || "09:00",
      endDate: toDateInput(event.endAt),
      endTime: toTimeInput(event.endAt) || "17:00",
      scope: event.scope,
      color: event.color || "blue",
      agenda: event.agenda?.length ? event.agenda : [""],
    }));
  }, [eventId]);

  const nowISO = useMemo(() => new Date().toISOString().split("T")[0], []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleScopeChange = (e) => {
    const scope = e.target.value;
    setFormData((p) => ({ ...p, scope, selectedDepartments: [], selectedUsers: [] }));
  };

  const handleDepartmentToggle = (deptId) => {
    setFormData((p) => ({
      ...p,
      selectedDepartments: p.selectedDepartments.includes(deptId)
        ? p.selectedDepartments.filter((id) => id !== deptId)
        : [...p.selectedDepartments, deptId],
    }));
  };

  const handleUserToggle = (userId) => {
    setFormData((p) => ({
      ...p,
      selectedUsers: p.selectedUsers.includes(userId) ? p.selectedUsers.filter((id) => id !== userId) : [...p.selectedUsers, userId],
    }));
  };

  const handleAgendaChange = (index, value) => {
    setFormData((p) => {
      const next = [...p.agenda];
      next[index] = value;
      return { ...p, agenda: next };
    });
  };

  const addAgendaItem = () => setFormData((p) => ({ ...p, agenda: [...p.agenda, ""] }));

  const removeAgendaItem = (index) => {
    setFormData((p) => {
      if (p.agenda.length <= 1) return p;
      return { ...p, agenda: p.agenda.filter((_, i) => i !== index) };
    });
  };

  const getColorOptions = () => [
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
  ];

  const scopeSummary = useMemo(() => {
    if (formData.scope === "ALL_COMPANY") return "All staff can see this event.";
    if (formData.scope === "HODS_ONLY") return "Only HODs can see this event.";
    if (formData.scope === "DEPARTMENTS")
      return formData.selectedDepartments.length ? `${formData.selectedDepartments.length} department(s) selected.` : "Select departments.";
    if (formData.scope === "USERS")
      return formData.selectedUsers.length ? `${formData.selectedUsers.length} user(s) selected.` : "Select users.";
    return "";
  }, [formData.scope, formData.selectedDepartments.length, formData.selectedUsers.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const startAt = `${formData.startDate}T${formData.startTime}:00`;
      const endAt = `${formData.endDate}T${formData.endTime}:00`;

      if (new Date(endAt) <= new Date(startAt)) {
        toast.warning("End time must be after start time");
        setLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 900));

      toast.success("Event updated successfully!");
      router.push(`/md-dashboard/event/${eventId}`);
    } catch (error) {
      toast.error("Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      toast.success("Event deleted successfully!");
      router.push("/md-dashboard/events");
    } catch (error) {
      toast.error("Failed to delete event");
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Hero header */}
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
                <button
                  type="button"
                  onClick={() => router.push(`/md-dashboard/event/${eventId}`)}
                  className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 mb-3"
                >
                  ← Back to Event Details
                </button>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>{typeIcon(formData.type)} {formData.type}</Pill>
                  <Pill tone="warn">{formData.scope}</Pill>
                  <Pill tone="success">{formData.color.toUpperCase()}</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Edit Event
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">Update event details, schedule, visibility, and agenda.</p>
                <p className="text-xs text-gray-500 mt-1">{scopeSummary}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-red-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(237, 50, 55, 0.6)", color: "var(--accent-red)" }}
                >
                  Delete Event
                </button>

                <button
                  type="submit"
                  form="md-edit-event-form"
                  disabled={loading}
                  className="px-5 py-3 rounded-2xl font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] transition"
                  style={{ backgroundColor: "var(--primary-blue)" }}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </Card>

        <form id="md-edit-event-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <SectionTitle title="Basic Information" subtitle="Title, type, color and description" />
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter event title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Event Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="MEETING">Meeting</option>
                    <option value="TRAINING">Training</option>
                    <option value="EVENT">Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Color Tag</label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  >
                    {getColorOptions().map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter event description"
                />
              </div>
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
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  min={nowISO}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time *</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  min={formData.startDate || nowISO}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">End Time *</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Ensure the end time is after the start time (validation runs on save).
            </div>
          </Card>

          {/* Location */}
          <Card className="p-6">
            <SectionTitle title="Location" subtitle="Physical location and optional meeting link" />
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Physical Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter physical location or 'Virtual'"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Meeting Link (Optional)</label>
                <input
                  type="url"
                  name="meetingLink"
                  value={formData.meetingLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="https://meet.google.com/..."
                />
              </div>
            </div>
          </Card>

          {/* Agenda */}
          <Card className="p-6">
            <SectionTitle
              title="Agenda"
              subtitle="List items in the order they will happen"
              right={
                <button
                  type="button"
                  onClick={addAgendaItem}
                  className="px-4 py-2 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                  style={{ backgroundColor: "var(--secondary-blue)" }}
                >
                  + Add Item
                </button>
              }
            />

            <div className="mt-5 space-y-3">
              {formData.agenda.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-2xl flex items-center justify-center text-white font-extrabold text-sm "
                    style={{ backgroundColor: "var(--primary-blue)" }}
                    title={`Agenda item ${index + 1}`}
                  >
                    {index + 1}
                  </div>

                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleAgendaChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder={`Agenda item ${index + 1}`}
                  />

                  {formData.agenda.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeAgendaItem(index)}
                      className="px-3 py-2 rounded-2xl font-semibold border bg-white hover:bg-red-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(237, 50, 55, 0.45)", color: "var(--accent-red)" }}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </Card>

          {/* Visibility & Attendees */}
          <Card className="p-6">
            <SectionTitle title="Visibility & Attendees" subtitle="Who can see this event?" />
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Who can see this event? *</label>
                <select
                  name="scope"
                  value={formData.scope}
                  onChange={handleScopeChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="ALL_COMPANY">All Company</option>
                  <option value="DEPARTMENTS">Specific Departments</option>
                  <option value="HODS_ONLY">HODs Only</option>
                  <option value="USERS">Specific Users</option>
                </select>
                <div className="text-xs text-gray-500 mt-2">{scopeSummary}</div>
              </div>

              {formData.scope === "DEPARTMENTS" ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Departments *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {departments.map((dept) => {
                      const checked = formData.selectedDepartments.includes(dept.id);
                      return (
                        <button
                          key={dept.id}
                          type="button"
                          onClick={() => handleDepartmentToggle(dept.id)}
                          className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border transition ${checked ? "bg-blue-50" : "bg-white hover:bg-gray-50"
                            }`}
                          style={{ borderColor: checked ? "rgba(44, 75, 155, 0.35)" : "rgba(0,0,0,0.08)" }}
                        >
                          <span className="font-semibold text-gray-900">{dept.name}</span>
                          {checked ? <Pill tone="success">✓ Added</Pill> : <Pill>Add</Pill>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {formData.scope === "USERS" ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Users *</label>
                  <div className="max-h-64 overflow-y-auto rounded-2xl border border-gray-200/70 bg-white">
                    {users.map((user) => {
                      const checked = formData.selectedUsers.includes(user.id);
                      return (
                        <button
                          key={user.id}
                          type="button"
                          onClick={() => handleUserToggle(user.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b last:border-b-0 border-gray-200/70 transition ${checked ? "bg-blue-50" : "hover:bg-gray-50"
                            }`}
                        >
                          <div
                            className="w-9 h-9 rounded-2xl flex items-center justify-center text-white font-bold text-sm "
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            {user.name
                              .split(" ")
                              .slice(0, 2)
                              .map((x) => x[0])
                              .join("")
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.department}</div>
                          </div>

                          {checked ? <Pill tone="success">✓ Added</Pill> : <Pill>Add</Pill>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </Card>

          {/* Bottom actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <button
              type="button"
              onClick={() => router.push(`/md-dashboard/event/${eventId}`)}
              className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
              style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-2xl font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] transition"
              style={{ backgroundColor: "var(--primary-blue)" }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm ? (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200/70 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-extrabold" style={{ color: "var(--accent-red)" }}>
                    Delete Event
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Are you sure you want to delete this event? This action cannot be undone.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 rounded-2xl border bg-white hover:bg-gray-50"
                  style={{ borderColor: "rgba(0,0,0,0.10)" }}
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-5 py-3 rounded-2xl font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] transition"
                  style={{ backgroundColor: "var(--accent-red)" }}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Layout>
  );
}
