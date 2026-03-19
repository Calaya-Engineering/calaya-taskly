// @ts-nocheck
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { BadgeIcon, CalendarTodayIcon, CancelIcon, ClockIcon, EditIcon } from "@/lib/icons";
import { StaffMenuItems } from "@/utils/menus";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "@/lib/toast";
import { fetchWithAuth } from "@/lib/api";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

const PROFILE_REFRESH_MS = 30000;

const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const SectionTitle = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between gap-3">
    <div>
      <h2 className="text-lg md:text-xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
        {renderNodeWithIcons(title)}
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
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="font-semibold text-gray-900 break-words">{value || "—"}</p>
  </div>
);

const Skeleton = ({ className = "" }) => <div className={`animate-pulse bg-gray-100 rounded-xl ${className}`} />;

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—";

const fmtDateTime = (iso) =>
  iso
    ? new Date(iso).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
        day: "numeric",
        hour12: true,
      })
    : "—";

const formatTimeAgo = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  return fmtDate(dateString);
};

const getActivityIcon = (type) => {
  switch (type) {
    case "TASK":
      return "📋";
    case "DOCUMENT":
      return "📄";
    case "ANNOUNCEMENT":
      return "📢";
    case "EVENT":
      return "📅";
    default:
      return "📌";
  }
};

const getActivityBg = (type) => {
  switch (type) {
    case "TASK":
      return "rgba(59, 130, 246, 0.1)";
    case "DOCUMENT":
      return "rgba(139, 92, 246, 0.1)";
    case "ANNOUNCEMENT":
      return "rgba(245, 158, 11, 0.1)";
    case "EVENT":
      return "rgba(16, 185, 129, 0.1)";
    default:
      return "rgba(107, 114, 128, 0.1)";
  }
};

export default function StaffProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [editForm, setEditForm] = useState({ fullName: "", department: "" });
  const [notificationPreferences] = useState([
    { category: "Task Assignments", description: "Get notified when new tasks are assigned", enabled: true },
    { category: "Deadline Reminders", description: "Receive reminders before task deadlines", enabled: true },
    { category: "Report Approvals", description: "Notifications about report status changes", enabled: true },
    { category: "Meeting Notifications", description: "Meeting invites and reminders", enabled: false },
    { category: "Announcement Updates", description: "Company announcements and news", enabled: true },
    { category: "Document Updates", description: "When documents are shared or updated", enabled: true },
    { category: "Email Digest", description: "Receive daily summary of activities", enabled: false },
  ]);

  const fetchProfile = useCallback(async ({ silent = false } = {}) => {
    try {
      const res = await fetchWithAuth("/api/profile/me");
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to load profile");
      }

      setProfileData(data);
      if (!isEditing) {
        setEditForm({
          fullName: data.fullName || "",
          department: data.department || "",
        });
      }
      setLastSyncedAt(new Date().toISOString());
      setError(null);
    } catch (err) {
      if (!silent) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, [isEditing]);

  const fetchDepartments = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/departments");
      const data = await res.json().catch(() => []);
      if (!res.ok) {
        throw new Error(data?.error || "Failed to load departments");
      }
      setDepartments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch departments:", err);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      await Promise.all([fetchProfile(), fetchDepartments()]);
    }

    bootstrap();

    const refresh = () => {
      if (mounted) {
        fetchProfile({ silent: true });
      }
    };

    const onFocus = () => refresh();
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refresh();
      }
    };

    const intervalId = window.setInterval(refresh, PROFILE_REFRESH_MS);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      mounted = false;
      window.clearInterval(intervalId);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [fetchDepartments, fetchProfile]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetchWithAuth("/api/profile/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editForm.fullName, department: editForm.department }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Save failed");
      }

      toast.success("Profile updated successfully!");
      await fetchProfile({ silent: true });
      setIsEditing(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setShowPasswordForm(false);
    toast.success("Password change flow is ready for backend integration.");
  };

  const initials = useMemo(() => {
    const baseName = profileData?.fullName || profileData?.email || "?";
    return baseName
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [profileData]);

  const departmentNames = useMemo(
    () => departments.map((department) => department?.name).filter(Boolean),
    [departments]
  );

  const currentDepartmentLabel = profileData?.primaryDepartment || profileData?.department || "Not assigned";
  const managedDepartments = profileData?.managedDepartments || [];
  const activityItems = profileData?.recentActivity || [];
  const systemUserId = profileData?.id ? `USR-${String(profileData.id).padStart(4, "0")}` : "—";

  if (loading) {
    return (
      <Layout menuItems={StaffMenuItems} userRole="Staff">
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="p-6 md:p-8" style={{ background: "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)" }}>
              <Skeleton className="h-8 w-48 mb-3" />
              <Skeleton className="h-5 w-64" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 md:p-5 bg-white border-t border-gray-200/70">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-24 rounded-2xl" />
              ))}
            </div>
          </Card>
          <Card className="p-8">
            <Skeleton className="h-6 w-40 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-16 rounded-2xl" />
              ))}
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  if (error || !profileData) {
    return (
      <Layout menuItems={StaffMenuItems} userRole="Staff">
        <Card className="p-12 text-center">
          <div className="text-4xl mb-4">{renderNodeWithIcons("⚠️")}</div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">Unable to load profile</h2>
          <p className="text-gray-500 mb-6">{error || "Profile data is unavailable right now."}</p>
          <button
            onClick={() => {
              setLoading(true);
              fetchProfile();
              fetchDepartments();
            }}
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
    <Layout menuItems={StaffMenuItems} userRole="Staff">
      <div className="space-y-6">
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
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>My Profile</Pill>
                  <Pill tone="info">{profileData.role}</Pill>
                  <Pill tone="success">Live</Pill>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Profile Settings
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Live account data for your staff profile, current department, and recent activity.
                </p>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-semibold">Last synced</p>
                <p>{fmtDateTime(lastSyncedAt)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 md:p-5 bg-white border-t border-gray-200/70">
            {[
              { label: "Active Tasks", value: profileData.activeTasks ?? 0, icon: "📋", color: "var(--primary-blue)" },
              { label: "Completed", value: profileData.completedTasks ?? 0, icon: "✅", color: "#10B981" },
              { label: "Documents", value: profileData.documentsReviewed ?? 0, icon: "📄", color: "#8B5CF6" },
              { label: "Recent Actions", value: activityItems.length, icon: "⚡", color: "#F59E0B" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-gray-200/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <span style={{ color: stat.color }}>{renderNodeWithIcons(stat.icon)}</span>
                </div>
                <p className="text-2xl font-extrabold mt-2" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <div className="mt-3 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, Math.max(2, ((stat.value || 0) / 100) * 100))}%`,
                      backgroundColor: stat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden">
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
                    className={`px-6 py-4 text-sm font-semibold transition border-b-2 ${active ? "text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
                    style={{ borderBottomColor: active ? "var(--primary-blue)" : "transparent" }}
                  >
                    <span className="flex items-center gap-2">
                      <span>{renderNodeWithIcons(tab.icon)}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 md:p-8 border-b border-gray-200/70 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
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

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{profileData.fullName}</h2>
                <p className="text-lg font-semibold mt-1" style={{ color: "var(--primary-blue)" }}>
                  {currentDepartmentLabel}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {departmentNames.length} department record{departmentNames.length === 1 ? "" : "s"} available in the system
                </p>

                <button
                  onClick={() => setIsEditing((current) => !current)}
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

              <div className="text-sm text-gray-500 text-right">
                <p className="flex items-center gap-1 justify-end">
                  <BadgeIcon className="w-4 h-4" />
                  <span>ID: {systemUserId}</span>
                </p>
                <p className="flex items-center gap-1 justify-end mt-1">
                  <CalendarTodayIcon className="w-4 h-4" />
                  <span>Joined: {fmtDate(profileData.joinDate)}</span>
                </p>
                <p className="flex items-center gap-1 justify-end mt-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>Last sync: {fmtDateTime(lastSyncedAt)}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <SectionTitle
                  title="Personal Information"
                  subtitle="Live account data pulled from your current user record"
                />

                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                          value={editForm.fullName}
                          onChange={(e) => setEditForm((current) => ({ ...current, fullName: e.target.value }))}
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
                        <select
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                          value={editForm.department}
                          onChange={(e) => setEditForm((current) => ({ ...current, department: e.target.value }))}
                        >
                          <option value="">Select department</option>
                          {departmentNames.map((departmentName) => (
                            <option key={departmentName} value={departmentName}>
                              {departmentName}
                            </option>
                          ))}
                        </select>
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2">User ID</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50"
                          value={systemUserId}
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

                    <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                      <p className="text-sm font-semibold text-amber-900">Stored fields available today</p>
                      <p className="text-sm text-amber-800 mt-1">
                        The current user table stores name, email, role, department, and timestamps. Contact details and emergency fields are not persisted yet.
                      </p>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200/70">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setEditForm({
                            fullName: profileData.fullName || "",
                            department: profileData.department || "",
                          });
                        }}
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
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InfoRow label="Full Name" value={profileData.fullName} />
                      <InfoRow label="Email Address" value={profileData.email} />
                      <InfoRow label="Role" value={profileData.role} />
                      <InfoRow label="Primary Department" value={currentDepartmentLabel} />
                      <InfoRow label="Join Date" value={fmtDate(profileData.joinDate)} />
                      <InfoRow label="User ID" value={systemUserId} />
                      <InfoRow label="Managed Departments" value={managedDepartments.length ? managedDepartments.join(", ") : "No managed departments"} />
                      <InfoRow label="Profile Refresh Interval" value={`${PROFILE_REFRESH_MS / 1000} seconds`} />
                    </div>

                    <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                      <p className="text-xs text-gray-500 mb-2">Available Departments</p>
                      <div className="flex flex-wrap gap-2">
                        {departmentNames.length === 0 ? (
                          <span className="text-sm text-gray-500">No departments loaded</span>
                        ) : (
                          departmentNames.map((departmentName) => (
                            <span
                              key={departmentName}
                              className={`px-3 py-1.5 rounded-xl text-sm ring-1 ${
                                departmentName === currentDepartmentLabel
                                  ? "bg-blue-50 text-blue-700 ring-blue-100"
                                  : "bg-gray-50 text-gray-700 ring-gray-100"
                              }`}
                            >
                              {departmentName}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <SectionTitle title="Security Settings" subtitle="Account access and password controls" />

                {!showPasswordForm ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-gray-200/70 p-5">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="font-extrabold text-gray-900">Password</h3>
                          <p className="text-sm text-gray-500 mt-1">Keep your account credentials secure</p>
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
                      <h3 className="font-extrabold text-gray-900 mb-4">Live Session</h3>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-semibold text-sm">Current Session</p>
                          <p className="text-xs text-gray-500 mt-1">Authenticated via token • synced live</p>
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
                      <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters with 1 number and 1 special character</p>
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

            {activeTab === "preferences" && (
              <div className="space-y-6">
                <SectionTitle title="Notification Preferences" subtitle="Local UI preferences for your profile view" />

                <div className="space-y-3">
                  {notificationPreferences.map((preference) => (
                    <div
                      key={preference.category}
                      className="flex items-center justify-between p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{preference.category}</p>
                        <p className="text-sm text-gray-500 mt-1">{preference.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={preference.enabled} />
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

        <Card className="p-6">
          <SectionTitle
            title="Recent Activity"
            subtitle="Latest actions from your live profile feed"
            action={
              <button onClick={() => fetchProfile({ silent: true })} className="text-sm font-semibold" style={{ color: "var(--primary-blue)" }}>
                Refresh ↺
              </button>
            }
          />

          <div className="mt-6 space-y-3">
            {activityItems.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-gray-200/70">
                <div className="text-3xl mb-2">{renderNodeWithIcons("📭")}</div>
                <p className="text-gray-500 font-semibold">No recent activity yet</p>
                <p className="text-sm text-gray-400 mt-1">Actions you perform will appear here once notifications are recorded.</p>
              </div>
            ) : (
              activityItems.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition"
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shrink-0"
                    style={{ backgroundColor: getActivityBg(activity.type) }}
                  >
                    {renderNodeWithIcons(getActivityIcon(activity.type))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.time)}</p>
                      </div>
                      <Pill tone="success">{activity.status || "completed"}</Pill>
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
