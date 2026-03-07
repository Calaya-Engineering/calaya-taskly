"use client";

// pages/dashboards/HOD/HODProfile.jsx
import { useState, useEffect, useCallback } from 'react';
import Layout from "@/components/Layout";
import { CancelIcon, EditIcon, BadgeIcon, CalendarTodayIcon, ClockIcon } from "@/lib/icons";
import { HODMenuItems } from "@/utils/menus";
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

// Removed static mock data

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-100 rounded-xl ${className}`} />
);

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

export default function HODProfile() {
  const [activeTab, setActiveTab] = useState('profile');
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

  const [notificationPreferences, setNotificationPreferences] = useState([
    { category: 'Email Notifications', description: 'Receive notifications via email', enabled: true },
    { category: 'Push Notifications', description: 'Receive in-app notifications', enabled: true },
    { category: 'Task Assignment Alerts', description: 'Alert when assigned new tasks', enabled: true },
    { category: 'Department Updates', description: 'Notify about department changes', enabled: true },
    { category: 'Approval Requests', description: 'Notify when approvals are needed', enabled: true },
    { category: 'Daily Digest', description: 'Receive daily summary email', enabled: false },
    { category: 'Meeting Reminders', description: 'Remind 15 minutes before meetings', enabled: true },
    { category: 'Report Updates', description: 'Get notified when reports are generated', enabled: true },
    { category: 'Team Activity', description: 'Updates on team member activities', enabled: true },
    { category: 'System Announcements', description: 'Important system updates', enabled: true },
  ]);

  const [displayPreferences, setDisplayPreferences] = useState([
    { category: 'Dark Mode', description: 'Use dark theme throughout the app', enabled: false },
    { category: 'Compact View', description: 'Show more content with compact layout', enabled: false },
    { category: 'Show Dashboard Widgets', description: 'Display widgets on dashboard', enabled: true },
    { category: 'Show Task Progress', description: 'Display task completion bars', enabled: true },
    { category: 'Auto-refresh Dashboard', description: 'Automatically refresh data every 5 minutes', enabled: true },
  ]);

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
    toast.success('Password changed successfully!');
  };

  const handlePreferenceToggle = (index, type) => {
    if (type === 'notification') {
      const updated = [...notificationPreferences];
      updated[index].enabled = !updated[index].enabled;
      setNotificationPreferences(updated);
    } else {
      const updated = [...displayPreferences];
      updated[index].enabled = !updated[index].enabled;
      setDisplayPreferences(updated);
    }
  };

  const handleSavePreferences = () => {
    toast.success('Preferences saved successfully!');
  };

  const getActivityTone = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warn';
      case 'upcoming': return 'info';
      default: return 'default';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'APPROVAL': return '✅';
      case 'TASK': return '📋';
      case 'DOCUMENT': return '📄';
      case 'ANNOUNCEMENT': return '📢';
      default: return '📌';
    }
  };

  const getActivityBg = (type) => {
    switch (type) {
      case 'APPROVAL': return 'rgba(16, 185, 129, 0.1)';
      case 'TASK': return 'rgba(59, 130, 246, 0.1)';
      case 'DOCUMENT': return 'rgba(139, 92, 246, 0.1)';
      case 'ANNOUNCEMENT': return 'rgba(245, 158, 11, 0.1)';
      default: return 'rgba(107, 114, 128, 0.1)';
    }
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Layout menuItems={HODMenuItems} userRole="HOD">
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
      <Layout menuItems={HODMenuItems} userRole="HOD">
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

  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
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
                  Manage your account settings and department information
                </p>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 md:p-5 bg-white border-t border-gray-200/70">
            {[
              { label: "My Tasks", value: profileData.activeTasks, icon: "📋", color: "var(--primary-blue)" },
              { label: "Dept. Tasks", value: profileData.departmentTasks, icon: "👥", color: "#8B5CF6" },
              { label: "Pending Approvals", value: profileData.pendingApprovals, icon: "⏳", color: "#F59E0B" },
              { label: "Team Members", value: profileData.teamSize, icon: "👤", color: "#10B981" },
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
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, (stat.value / 50) * 100)}%`,
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
                { id: 'profile', label: 'Profile Information', icon: '👤' },
                { id: 'team', label: 'My Team', icon: '👥' },
                { id: 'performance', label: 'Performance', icon: '📊' },
                { id: 'preferences', label: 'Preferences', icon: '⚙️' },
                { id: 'security', label: 'Security', icon: '🔒' },
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
                  {profileData.fullName.charAt(0)}
                </div>
                <div className="absolute -bottom-2 -right-2">
                  <Pill tone="info">HOD</Pill>
                </div>
              </div>

              {/* Name and Role */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{profileData.fullName}</h2>
                <p className="text-lg font-semibold mt-1" style={{ color: "var(--primary-blue)" }}>
                  {profileData.role}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {profileData.department}
                </p>

                {/* Edit Button */}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-4 px-5 py-2.5 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition inline-flex items-center gap-2"
                  style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                >
                  {isEditing ? (
                    <>
                      <CancelIcon className="w-4 h-4" />
                      <span>Cancel</span>
                    </>
                  ) : (
                    <>
                      <EditIcon className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </>
                  )}
                </button>
              </div>

              {/* Employee Info */}
              <div className="text-sm text-gray-500 text-right">
                <p className="flex items-center gap-1 justify-end">
                  <BadgeIcon className="w-4 h-4" />
                  <span>ID: EMP-{profileData.id}</span>
                </p>
                <p className="flex items-center gap-1 justify-end mt-1">
                  <CalendarTodayIcon className="w-4 h-4" />
                  <span>Joined: {fmtDate(profileData.joinDate)}</span>
                </p>
                <p className="flex items-center gap-1 justify-end mt-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>Last login: {fmtDateTime(new Date().toISOString())}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Employee ID</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50"
                          value={`EMP-${profileData.id}`}
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
                    <InfoRow label="Role" value={profileData.role} />
                    <InfoRow label="Department" value={profileData.department} />
                    <InfoRow label="Employee ID" value={`EMP-${profileData.id}`} />
                    <InfoRow label="Join Date" value={fmtDate(profileData.joinDate)} />
                  </div>
                )}
              </div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <div className="space-y-6">
                <SectionTitle
                  title="Team Members"
                  subtitle={`${profileData.teamSize} members in your department`}
                />

                <div className="space-y-3">
                  {(profileData.team || []).map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold"
                          style={{ background: "linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)" }}
                        >
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.role}</p>
                          <p className="text-xs text-gray-400 mt-1">{member.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Pill tone={member.status === 'Active' ? 'success' : 'warn'}>
                          {member.status}
                        </Pill>
                        <p className="text-sm font-semibold mt-2" style={{ color: "var(--primary-blue)" }}>
                          {member.tasks} tasks
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                <SectionTitle title="Performance Overview" />

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Tasks Assigned', value: profileData.performanceStats?.tasksAssigned || 0, color: 'var(--primary-blue)' },
                    { label: 'Tasks Completed', value: profileData.performanceStats?.tasksCompleted || 0, color: '#10B981' },
                    { label: 'Approval Rate', value: profileData.performanceStats?.approvalRate || 'N/A', color: '#8B5CF6' },
                    { label: 'Avg Response', value: profileData.performanceStats?.avgResponseTime || 'N/A', color: '#F59E0B' },
                  ].map((stat, index) => (
                    <div key={index} className="p-5 rounded-2xl border border-gray-200/70">
                      <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
                      <p className="text-2xl font-extrabold" style={{ color: stat.color }}>{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mt-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Department Progress</span>
                      <span className="text-sm font-semibold" style={{ color: "var(--primary-blue)" }}>
                        {profileData.performanceStats?.departmentProgress || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${profileData.performanceStats?.departmentProgress || 0}%`,
                          backgroundColor: "var(--primary-blue)",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Overdue Tasks</span>
                      <span className="text-sm font-semibold text-red-600">{profileData.performanceStats?.overdueTasks || 0}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-red-500"
                        style={{ width: `${((profileData.performanceStats?.overdueTasks || 0) / Math.max(1, profileData.performanceStats?.tasksAssigned || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <SectionTitle title="Notification Preferences" />

                <div className="space-y-3">
                  {notificationPreferences.map((pref, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                      <div>
                        <p className="font-semibold text-gray-900">{pref.category}</p>
                        <p className="text-sm text-gray-500 mt-1">{pref.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={pref.enabled}
                          onChange={() => handlePreferenceToggle(index, 'notification')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}

                  <SectionTitle title="Display Preferences" subtitle="Customize your interface" className="mt-6" />

                  {displayPreferences.map((pref, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                      <div>
                        <p className="font-semibold text-gray-900">{pref.category}</p>
                        <p className="text-sm text-gray-500 mt-1">{pref.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={pref.enabled}
                          onChange={() => handlePreferenceToggle(index, 'display')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}

                  <div className="pt-6 flex justify-end">
                    <button
                      onClick={handleSavePreferences}
                      className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <SectionTitle title="Security Settings" />

                {!showPasswordForm ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-gray-200/70 p-5">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="font-extrabold text-gray-900">Password</h3>
                          <p className="text-sm text-gray-500 mt-1">Last changed 30 days ago</p>
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
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-semibold text-sm">Current Session</p>
                            <p className="text-xs text-gray-500 mt-1">Chrome on Windows • Now</p>
                          </div>
                          <Pill tone="success">Active</Pill>
                        </div>
                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition">
                          <div>
                            <p className="font-semibold text-sm">Mobile App</p>
                            <p className="text-xs text-gray-500 mt-1">iPhone 13 • 2 days ago</p>
                          </div>
                          <button className="text-sm font-semibold text-red-600 hover:text-red-700">
                            Revoke
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200/70 p-5">
                      <h3 className="font-extrabold text-gray-900 mb-2">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
                      <button
                        className="px-5 py-2.5 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                        style={{ borderColor: "var(--primary-blue)", color: "var(--primary-blue)" }}
                      >
                        Enable 2FA
                      </button>
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
                        Password must be at least 8 characters with 1 number and 1 special character
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
          </div>
        </Card>

        {/* Recent Activity Section */}
        <Card className="p-6">
          <SectionTitle
            title="Recent Activity"
            subtitle="Your latest actions and updates"
            action={
              <button className="text-sm font-semibold" style={{ color: "var(--primary-blue)" }}>
                View All →
              </button>
            }
          />

          <div className="mt-6 space-y-3">
            {profileData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shrink-0"
                  style={{ backgroundColor: getActivityBg(activity.type) }}
                >
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                    </div>
                    <Pill tone={getActivityTone(activity.status)}>
                      {activity.status}
                    </Pill>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}

// Helper component for info rows
const InfoRow = ({ label, value }) => (
  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="font-semibold text-gray-900 break-words">{value}</p>
  </div>
);