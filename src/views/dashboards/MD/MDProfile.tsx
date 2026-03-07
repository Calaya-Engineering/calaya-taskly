"use client";

// pages/dashboards/MD/MDProfile.jsx
import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import { CancelIcon, EditIcon } from "@/lib/icons";
import { MDMenuItems } from "@/utils/menus";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";

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

const InfoRow = ({ label, value }) => (
  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="font-semibold text-gray-900 break-words">{value || "—"}</p>
  </div>
);

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" }) : "—";

const fmtDateTime = (iso) =>
  iso
    ? new Date(iso).toLocaleString('en-US', {
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      day: "numeric",
      hour12: true,
    })
    : "—";

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  return fmtDate(dateString);
};

const getActivityIcon = (type) => {
  switch (type) {
    case "TASK": return "📋";
    case "DOCUMENT": return "📄";
    case "ANNOUNCEMENT": return "📢";
    case "APPROVAL": return "✅";
    case "EVENT": return "📅";
    default: return "📌";
  }
};

const getActivityBg = (type) => {
  switch (type) {
    case "TASK": return "rgba(59, 130, 246, 0.1)";
    case "DOCUMENT": return "rgba(139, 92, 246, 0.1)";
    case "ANNOUNCEMENT": return "rgba(245, 158, 11, 0.1)";
    case "APPROVAL": return "rgba(16, 185, 129, 0.1)";
    case "EVENT": return "rgba(245, 158, 11, 0.1)";
    default: return "rgba(107, 114, 128, 0.1)";
  }
};

// ── Skeleton loader ───────────────────────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-100 rounded-xl ${className}`} />
);

export default function MDProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ fullName: "", department: "" });
  const [saving, setSaving] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // ── Fetch profile ─────────────────────────────────────────────────────────
  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/profile/me");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load profile");
      setProfileData(data);
      setEditForm({ fullName: data.fullName, department: data.department ?? "" });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    // refresh when tab regains focus
    const onFocus = () => fetchProfile();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [fetchProfile]);

  // ── Save profile edit ─────────────────────────────────────────────────────
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetchWithAuth("/api/profile/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editForm.fullName, department: editForm.department }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      toast.success("Profile updated successfully!");
      setProfileData((prev) => ({
        ...prev,
        fullName: data.name || prev.fullName,
        department: data.department || prev.department,
      }));
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setShowPasswordForm(false);
    toast.success("Password changed successfully!");
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Layout menuItems={MDMenuItems} userRole="MD">
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="p-6 md:p-8" style={{ background: "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)" }}>
              <Skeleton className="h-8 w-48 mb-3" />
              <Skeleton className="h-5 w-64" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 md:p-5 bg-white border-t border-gray-200/70">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
            </div>
          </Card>
          <Card className="p-8">
            <Skeleton className="h-6 w-40 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-16 rounded-2xl" />)}
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <Layout menuItems={MDMenuItems} userRole="MD">
        <Card className="p-12 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">Unable to load profile</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => { setLoading(true); fetchProfile(); }}
            className="px-6 py-3 rounded-2xl font-semibold text-white"
            style={{ backgroundColor: "var(--primary-blue)" }}
          >
            Try Again
          </button>
        </Card>
      </Layout>
    );
  }

  const initials = (profileData.fullName || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
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
                  <Pill>My Profile</Pill>
                  <Pill tone="info">{profileData.role}</Pill>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Profile Settings
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Manage your account settings and preferences
                </p>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 md:p-5 bg-white border-t border-gray-200/70">
            {[
              { label: "Active Tasks", value: profileData.activeTasks, icon: "📋", color: "var(--primary-blue)" },
              { label: "Pending Approvals", value: profileData.pendingApprovals, icon: "⏳", color: "#F59E0B" },
              { label: "Completed", value: profileData.completedTasks, icon: "✅", color: "#10B981" },
              { label: "Documents", value: profileData.documentsReviewed, icon: "📄", color: "#8B5CF6" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-gray-200/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <span style={{ color: stat.color }}>{stat.icon}</span>
                </div>
                <p className="text-2xl font-extrabold mt-2" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <div className="mt-3 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, Math.max(2, (stat.value / 200) * 100))}%`,
                      backgroundColor: stat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Main Profile Card */}
        <Card className="overflow-hidden">
          {/* Tabs */}
          <div className="bg-white border-b border-gray-200/70">
            <div className="flex flex-wrap">
              {[
                { id: "profile", label: "Profile Information", icon: "👤" },
                { id: "security", label: "Security", icon: "🔒" },
                { id: "preferences", label: "Preferences", icon: "⚙️" },
              ].map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-semibold transition border-b-2 ${active ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                      }`}
                    style={{ borderBottomColor: active ? "var(--primary-blue)" : "transparent" }}
                  >
                    <span className="flex items-center gap-2">
                      <span>{tab.icon}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Profile Header with Avatar */}
          <div className="p-6 md:p-8 border-b border-gray-200/70 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center text-4xl md:text-5xl text-white font-extrabold"
                  style={{ background: "linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)" }}
                >
                  {initials}
                </div>
                <div className="absolute -bottom-2 -right-2">
                  <Pill tone="info">{profileData.role}</Pill>
                </div>
              </div>

              {/* Name and Role */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{profileData.fullName}</h2>
                <p className="text-lg font-semibold mt-1" style={{ color: "var(--primary-blue)" }}>
                  {profileData.role}
                </p>
                <p className="text-sm text-gray-500 mt-2">{profileData.department}</p>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-4 px-5 py-2.5 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition inline-flex items-center gap-2"
                  style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                >
                  {isEditing ? (
                    <>
                      <span>✕</span>
                      <span>Cancel</span>
                    </>
                  ) : (
                    <>
                      <span>✏️</span>
                      <span>Edit Profile</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <SectionTitle title="Personal Information" />

                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                          value={editForm.fullName}
                          onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50"
                          value={profileData.email}
                          disabled
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                          value={editForm.department}
                          onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50"
                          value={profileData.role}
                          disabled
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Join Date</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50"
                          value={fmtDate(profileData.joinDate)}
                          disabled
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200/70">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                        style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition disabled:opacity-60"
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        {saving ? "Saving…" : "Save Changes"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow label="Full Name" value={profileData.fullName} />
                    <InfoRow label="Email Address" value={profileData.email} />
                    <InfoRow label="Department" value={profileData.department} />
                    <InfoRow label="Role" value={profileData.role} />
                    <InfoRow label="Member Since" value={fmtDate(profileData.joinDate)} />
                  </div>
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <SectionTitle title="Security Settings" />

                {!showPasswordForm ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-gray-200/70 p-5">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="font-extrabold text-gray-900">Password</h3>
                          <p className="text-sm text-gray-500 mt-1">Keep your account secure</p>
                        </div>
                        <button
                          onClick={() => setShowPasswordForm(true)}
                          className="px-5 py-2.5 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                          style={{ backgroundColor: "var(--secondary-blue)" }}
                        >
                          Change Password
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200/70 p-5">
                      <h3 className="font-extrabold text-gray-900 mb-4">Active Sessions</h3>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-semibold text-sm">Current Session</p>
                          <p className="text-xs text-gray-500 mt-1">Authenticated via JWT • Now</p>
                        </div>
                        <Pill tone="success">Active</Pill>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handlePasswordChange} className="space-y-6 max-w-2xl">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                      <PasswordInput
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                      <PasswordInput
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter new password"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Must be at least 8 characters with 1 number and 1 special character
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                      <PasswordInput
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowPasswordForm(false)}
                        className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                        style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <SectionTitle title="Notification Preferences" />
                <div className="space-y-3">
                  {[
                    { category: "Email Notifications", description: "Receive notifications via email", enabled: true },
                    { category: "Push Notifications", description: "Receive in-app notifications", enabled: true },
                    { category: "Task Assignment Alerts", description: "Alert when assigned new tasks", enabled: true },
                    { category: "Approval Requests", description: "Notify when approvals are needed", enabled: true },
                    { category: "Daily Digest", description: "Receive daily summary email", enabled: false },
                    { category: "Meeting Reminders", description: "Remind 15 minutes before meetings", enabled: true },
                    { category: "Report Updates", description: "Get notified when reports are generated", enabled: true },
                    { category: "System Announcements", description: "Important system updates", enabled: true },
                  ].map((pref, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{pref.category}</p>
                        <p className="text-sm text-gray-500 mt-1">{pref.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={pref.enabled} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                  <div className="pt-6 flex justify-end">
                    <button
                      onClick={() => toast.success("Preferences saved!")}
                      className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Recent Activity Section */}
        <Card className="p-6">
          <SectionTitle
            title="Recent Activity"
            subtitle="Your latest actions in the system"
            action={
              <button
                onClick={fetchProfile}
                className="text-sm font-semibold"
                style={{ color: "var(--primary-blue)" }}
              >
                Refresh ↺
              </button>
            }
          />

          <div className="mt-6 space-y-3">
            {profileData.recentActivity.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-gray-200/70">
                <div className="text-3xl mb-2">📭</div>
                <p className="text-gray-500 font-semibold">No recent activity yet</p>
                <p className="text-sm text-gray-400 mt-1">Actions you perform will appear here.</p>
              </div>
            ) : (
              profileData.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition"
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shrink-0"
                    style={{ backgroundColor: getActivityBg(activity.type) }}
                  >
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.time)}</p>
                      </div>
                      <Pill tone="success">completed</Pill>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
}