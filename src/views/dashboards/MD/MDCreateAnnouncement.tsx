"use client";

// pages/dashboards/MD/MDCreateAnnouncement.jsx
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";


/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const Pill = ({ children, tone = "default" }) => {
  const styles =
    tone === "danger"
      ? "bg-red-50 text-red-700 ring-red-100"
      : tone === "warn"
        ? "bg-amber-50 text-amber-800 ring-amber-100"
        : tone === "success"
          ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
          : tone === "purple"
            ? "bg-purple-50 text-purple-700 ring-purple-100"
            : "bg-blue-50 text-blue-700 ring-blue-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

const FieldLabel = ({ children, required }) => (
  <label className="block text-sm font-extrabold text-gray-700 mb-2">
    {children} {required ? <span className="text-red-500">*</span> : null}
  </label>
);

const inputBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";
const textareaBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";

const btnBase = "px-6 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white`;

export default function MDCreateAnnouncement() {
  const router = useRouter();

  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [deptRes, userRes] = await Promise.all([
          fetchWithAuth("/api/departments"),
          fetchWithAuth("/api/users"),
        ]);
        if (deptRes.ok) {
          const data = await deptRes.json();
          setDepartments(data.map((d) => d.name));
        }
        if (userRes.ok) {
          const data = await userRes.json();
          setUsers(data);
        }
      } catch (err) {
        console.error("Failed to load departments/users:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    priority: "NORMAL",
    scopeType: "ALL_COMPANY",
    selectedDepartments: [],
    selectedUsers: [],
    expiresAt: "",
    sendNotifications: true,
    attachments: [],
  });

  const priorityMeta = useMemo(
    () => [
      { value: "NORMAL", label: "Normal", desc: "Regular update", border: "rgba(109,198,223,0.55)", bg: "rgba(109,198,223,0.10)" },
      { value: "IMPORTANT", label: "Important", desc: "Requires attention", border: "rgba(245,158,11,0.9)", bg: "rgba(245,158,11,0.10)" },
      { value: "URGENT", label: "Urgent", desc: "Immediate action needed", border: "rgba(239,68,68,0.9)", bg: "rgba(239,68,68,0.10)" },
    ],
    []
  );

  const scopeMeta = useMemo(
    () => [
      { value: "ALL_COMPANY", label: "All Company", desc: "All staff members" },
      { value: "DEPARTMENTS", label: "Departments", desc: "Selected departments" },
      { value: "HODS_ONLY", label: "HODs Only", desc: "Heads of Department" },
      { value: "USERS", label: "Specific Users", desc: "Selected individuals" },
    ],
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchWithAuth("/api/announcements", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to create announcement");
      }
      toast.success("Announcement created successfully!");
      router.push("/md-dashboard/announcements");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to create announcement");
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setFormData((p) => ({ ...p, attachments: [...p.attachments, ...files] }));
  };

  const removeAttachment = (index) => {
    setFormData((p) => ({ ...p, attachments: p.attachments.filter((_, i) => i !== index) }));
  };

  const handleScopeChange = (scope) => {
    setFormData((p) => ({ ...p, scopeType: scope, selectedDepartments: [], selectedUsers: [] }));
  };

  const toggleDepartment = (dept) => {
    setFormData((p) => {
      const exists = p.selectedDepartments.includes(dept);
      return { ...p, selectedDepartments: exists ? p.selectedDepartments.filter((d) => d !== dept) : [...p.selectedDepartments, dept] };
    });
  };

  const toggleUser = (userId) => {
    setFormData((p) => {
      const exists = p.selectedUsers.includes(userId);
      return { ...p, selectedUsers: exists ? p.selectedUsers.filter((id) => id !== userId) : [...p.selectedUsers, userId] };
    });
  };

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* HERO */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>{renderNodeWithIcons("📝 Create Announcement")}</Pill>
                  <Pill tone={formData.priority === "URGENT" ? "danger" : formData.priority === "IMPORTANT" ? "warn" : "success"}>
                    Priority: {formData.priority}
                  </Pill>
                  <Pill tone="purple">Audience: {formData.scopeType.replaceAll("_", " ")}</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Create Announcement
                </h1>
                <p className="text-gray-600 mt-2">Share important updates with the company or specific groups.</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push("/md-dashboard/announcements")}
                  className={btnOutline}
                  style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                  type="button"
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BASIC */}
          <Card className="p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
              Announcement Details
            </h2>
            <p className="text-sm text-gray-500 mt-1">Title and message content</p>

            <div className="mt-6 space-y-5">
              <div>
                <FieldLabel required>Announcement Title</FieldLabel>
                <input
                  required
                  className={inputBase}
                  placeholder="Enter announcement title"
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                />
              </div>

              <div>
                <FieldLabel required>Message</FieldLabel>
                <textarea
                  required
                  rows={8}
                  className={textareaBase}
                  placeholder="Type your announcement message here..."
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                />
              </div>
            </div>
          </Card>

          {/* PRIORITY */}
          <Card className="p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
              Priority Level
            </h2>
            <p className="text-sm text-gray-500 mt-1">Choose how important this announcement is.</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {priorityMeta.map((p) => {
                const active = formData.priority === p.value;
                return (
                  <button
                    type="button"
                    key={p.value}
                    onClick={() => setFormData((x) => ({ ...x, priority: p.value }))}
                    className="text-left p-5 rounded-2xl border active:scale-[0.99] transition"
                    style={{
                      borderColor: active ? p.border : "rgba(229,231,235,1)",
                      backgroundColor: active ? p.bg : "white",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-extrabold text-gray-900">{p.label}</p>
                      {active ? <Pill>Selected</Pill> : <Pill tone="muted">Pick</Pill>}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{p.desc}</p>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* AUDIENCE */}
          <Card className="p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
              Audience
            </h2>
            <p className="text-sm text-gray-500 mt-1">Select who should receive this announcement.</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {scopeMeta.map((s) => {
                const active = formData.scopeType === s.value;
                return (
                  <button
                    type="button"
                    key={s.value}
                    className="p-5 rounded-2xl border text-left active:scale-[0.99] transition"
                    style={{
                      borderColor: active ? "rgba(44,75,155,0.55)" : "rgba(229,231,235,1)",
                      backgroundColor: active ? "rgba(44,75,155,0.06)" : "white",
                    }}
                    onClick={() => handleScopeChange(s.value)}
                  >
                    <p className="font-extrabold text-gray-900">{s.label}</p>
                    <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
                  </button>
                );
              })}
            </div>

            {formData.scopeType === "DEPARTMENTS" && (
              <div className="mt-6">
                <FieldLabel>Select Departments</FieldLabel>
                <div className="flex flex-wrap gap-2">
                  {departments.map((dept) => {
                    const active = formData.selectedDepartments.includes(dept);
                    return (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => toggleDepartment(dept)}
                        className="px-4 py-2 rounded-2xl text-sm font-semibold border active:scale-[0.99] transition"
                        style={{
                          borderColor: active ? "rgba(44,75,155,0.55)" : "rgba(229,231,235,1)",
                          backgroundColor: active ? "rgba(44,75,155,0.08)" : "white",
                          color: active ? "var(--primary-blue)" : "rgb(55,65,81)",
                        }}
                      >
                        {dept}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {formData.scopeType === "USERS" && (
              <div className="mt-6">
                <FieldLabel>Select Users</FieldLabel>
                <div className="max-h-64 overflow-y-auto rounded-2xl border border-gray-200 bg-white p-2">
                  {users.map((u) => {
                    const active = formData.selectedUsers.includes(u.id);
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => toggleUser(u.id)}
                        className={`w-full text-left p-3 rounded-2xl border mb-2 last:mb-0 active:scale-[0.99] transition ${active ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:bg-gray-50"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-extrabold"
                            style={{ backgroundColor: "var(--secondary-blue)" }}
                          >
                            {u.name[0]}
                          </div>
                          <div className="min-w-0">
                            <p className="font-extrabold text-gray-900">{u.name}</p>
                            <p className="text-xs text-gray-500">{u.department}</p>
                          </div>
                          {active ? <span className="ml-auto font-extrabold text-blue-700">{renderNodeWithIcons("✓")}</span> : null}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>

          {/* EXPIRY */}
          <Card className="p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
              Expiry Date
            </h2>
            <p className="text-sm text-gray-500 mt-1">Optional. Announcement will be archived after this date.</p>

            <div className="mt-6 flex flex-col md:flex-row gap-2">
              <input
                type="date"
                className={inputBase}
                value={formData.expiresAt}
                onChange={(e) => setFormData((p) => ({ ...p, expiresAt: e.target.value }))}
              />

              <button
                type="button"
                className={btnOutline}
                style={{ borderColor: "rgba(229,231,235,1)" }}
                onClick={() => {
                  const d = new Date();
                  d.setDate(d.getDate() + 7);
                  setFormData((p) => ({ ...p, expiresAt: d.toISOString().split("T")[0] }));
                }}
              >
                Set 1 week
              </button>

              <button
                type="button"
                className={btnOutline}
                style={{ borderColor: "rgba(229,231,235,1)" }}
                onClick={() => {
                  const d = new Date();
                  d.setMonth(d.getMonth() + 1);
                  setFormData((p) => ({ ...p, expiresAt: d.toISOString().split("T")[0] }));
                }}
              >
                Set 1 month
              </button>
            </div>
          </Card>

          {/* ATTACHMENTS */}
          <Card className="p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
              Attachments
            </h2>
            <p className="text-sm text-gray-500 mt-1">Optional. Upload supporting documents.</p>

            <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center hover:border-blue-300 transition">
              <input type="file" multiple className="hidden" id="announcement-file-upload" onChange={handleFileUpload} />
              <label htmlFor="announcement-file-upload" className="cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(109,198,223,0.12)" }}>
                  <span className="text-3xl">{renderNodeWithIcons("📎")}</span>
                </div>
                <p className="text-gray-800 font-extrabold mb-1">Click to upload</p>
                <p className="text-sm text-gray-500">Supporting documents, images, or related files</p>
              </label>
            </div>

            {formData.attachments.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                  Attached files ({formData.attachments.length})
                </p>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="p-4 rounded-2xl border border-gray-200/70 bg-white flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">{renderNodeWithIcons("📄")}</div>
                        <div className="min-w-0">
                          <p className="font-extrabold text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="px-4 py-2 rounded-2xl font-semibold border hover:bg-red-50 active:scale-[0.99] transition"
                        style={{ borderColor: "rgba(237,50,55,0.45)", color: "var(--accent-red)" }}
                        onClick={() => removeAttachment(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* NOTIFICATIONS */}
          <Card className="p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
              Notifications
            </h2>
            <p className="text-sm text-gray-500 mt-1">Send email and in-app notifications.</p>

            <div className="mt-6 flex items-center justify-between p-4 rounded-2xl border border-gray-200 bg-white">
              <div>
                <p className="font-extrabold text-gray-900">Send Notifications</p>
                <p className="text-sm text-gray-600 mt-1">Notify selected audience after publishing.</p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.sendNotifications}
                  onChange={(e) => setFormData((p) => ({ ...p, sendNotifications: e.target.checked }))}
                />
                <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>
          </Card>

          {/* PREVIEW */}
          <Card className="p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
              Preview
            </h2>
            <p className="text-sm text-gray-500 mt-1">How it will appear to employees.</p>

            <div className="mt-6 p-5 rounded-2xl border border-gray-200/70 bg-gray-50">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-extrabold text-gray-900 text-lg">{formData.title || "Announcement Title"}</h3>
                <Pill tone={formData.priority === "URGENT" ? "danger" : formData.priority === "IMPORTANT" ? "warn" : "success"}>
                  {formData.priority}
                </Pill>
              </div>

              <div className="mt-4 whitespace-pre-line text-gray-700">
                {formData.message || "Announcement message will appear here..."}
              </div>

              {formData.expiresAt ? (
                <div className="mt-4 pt-4 border-t border-gray-200/70 text-sm text-gray-500">
                  Expires: {new Date(formData.expiresAt).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                </div>
              ) : null}
            </div>
          </Card>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <button
              type="button"
              onClick={() => router.push("/md-dashboard/announcements")}
              className={btnOutline}
              style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
            >
              Cancel
            </button>
            <button type="submit" className={btnSolid} style={{ backgroundColor: "var(--accent-red)" }}>
              Publish Announcement
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
