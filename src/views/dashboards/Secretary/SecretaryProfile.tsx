"use client";

// pages/dashboards/Secretary/SecretaryProfile.jsx
import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { CancelIcon, EditIcon, BadgeIcon, CalendarTodayIcon, ClockIcon } from "@/lib/icons";
import { SecretaryMenuItems } from "@/utils/menus";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "@/lib/toast";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";
/* ---------- UI helpers ---------- */
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
      : tone === "purple"
      ? "bg-purple-50 text-purple-700 ring-purple-100"
      : "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white`;

const inputBase =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100";

const textareaBase =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none";

const userProfile = {
  fullName: 'Sarah Johnson',
  email: 'sarah.johnson@calaya-oil.com',
  phone: '+234 801 234 5678',
  department: 'Secretary/Admin Department',
  role: 'Secretary',
  employeeId: 'CAL-SEC-001',
  joinDate: '2023-05-15',
  lastLogin: '2024-12-14T09:45:00',
  location: 'Lagos Headquarters',
  bio: 'Responsible for managing daily reports, tender tracking, and document coordination across departments.',
  reportsUploaded: 156,
  documentsManaged: 245,
  tendersTracked: 45,
  meetingsScheduled: 32,
  averageDailyDownloads: 24,
  tasksCompleted: 189,
  recentActivity: [
    { action: 'Uploaded Daily Report', time: 'Today, 10:30 AM', type: 'REPORT', status: 'completed', details: 'Daily Operations Report - December 12, 2024' },
    { action: 'Downloaded Tender Documents', time: 'Yesterday, 2:45 PM', type: 'DOCUMENT', status: 'completed', details: 'Office Supplies Procurement - CAL-TEN-2024-006' },
    { action: 'Viewed Task Reports', time: 'Dec 10, 2024', type: 'TASK', status: 'pending', details: 'Accessed task reports archive' },
    { action: 'Updated Profile Information', time: 'Dec 8, 2024', type: 'PROFILE', status: 'completed', details: 'Updated contact information' },
    { action: 'Scheduled Meeting Reminder', time: 'Dec 5, 2024', type: 'EVENT', status: 'upcoming', details: 'Set reminder for Department Heads Meeting' },
  ]
};

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" }) : "Not set";

const fmtDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    hour12: true 
  }) : "Not set";

const getActivityTone = (status) => {
  switch(status) {
    case 'completed': return 'success';
    case 'pending': return 'warn';
    case 'upcoming': return 'info';
    default: return 'default';
  }
};

const getActivityIcon = (type) => {
  switch(type) {
    case 'REPORT': return '📊';
    case 'DOCUMENT': return '📄';
    case 'TASK': return '📋';
    case 'EVENT': return '📅';
    case 'PROFILE': return '👤';
    default: return '📌';
  }
};

const getActivityBg = (type) => {
  switch(type) {
    case 'REPORT': return 'rgba(59, 130, 246, 0.1)';
    case 'DOCUMENT': return 'rgba(139, 92, 246, 0.1)';
    case 'TASK': return 'rgba(16, 185, 129, 0.1)';
    case 'EVENT': return 'rgba(245, 158, 11, 0.1)';
    case 'PROFILE': return 'rgba(99, 102, 241, 0.1)';
    default: return 'rgba(107, 114, 128, 0.1)';
  }
};

export default function SecretaryProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(userProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    darkMode: false,
    language: 'en',
    timezone: 'Africa/Lagos'
  });

  const stats = useMemo(() => {
    const totalActivity = profileData.reportsUploaded + profileData.documentsManaged + 
                         profileData.tendersTracked + profileData.meetingsScheduled;
    return { totalActivity };
  }, [profileData]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setShowPasswordForm(false);
    toast.success('Password changed successfully!');
  };

  const handleSavePreferences = () => {
    toast.success('Preferences saved successfully!');
  };

  return (
    <Layout menuItems={SecretaryMenuItems} userRole="Secretary">
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
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>{renderNodeWithIcons("👤 My Profile")}</Pill>
                  <Pill tone="info">{profileData.role}</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Profile Settings
                </h1>
                <p className="text-gray-600 mt-2">Manage your account settings and preferences.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Reports Uploaded</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {profileData.reportsUploaded}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(44,75,155,0.1)" }}>
                <span style={{ color: "var(--primary-blue)" }} className="text-xl">{renderNodeWithIcons("📊")}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Documents Managed</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#8B5CF6" }}>
                  {profileData.documentsManaged}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(139,92,246,0.1)" }}>
                <span style={{ color: "#8B5CF6" }} className="text-xl">{renderNodeWithIcons("📄")}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Tenders Tracked</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#10B981" }}>
                  {profileData.tendersTracked}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(16,185,129,0.1)" }}>
                <span style={{ color: "#10B981" }} className="text-xl">{renderNodeWithIcons("📋")}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Tasks Completed</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#F59E0B" }}>
                  {profileData.tasksCompleted}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(245,158,11,0.1)" }}>
                <span style={{ color: "#F59E0B" }} className="text-xl">{renderNodeWithIcons("✅")}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* MAIN PROFILE CARD */}
        <Card className="overflow-hidden">
          {/* Tabs */}
          <div className="bg-white border-b border-gray-200/70">
            <div className="flex flex-wrap">
              {[
                { id: 'profile', label: 'Profile Information', icon: '👤' },
                { id: 'security', label: 'Security', icon: '🔒' },
                { id: 'preferences', label: 'Preferences', icon: '⚙️' },
              ].map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-semibold transition border-b-2 ${
                      active ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                    }`}
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

          {/* Profile Header */}
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
                  <Pill tone="info">Secretary</Pill>
                </div>
              </div>

              {/* Name and Role */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{profileData.fullName}</h2>
                <p className="text-lg font-semibold mt-1" style={{ color: "var(--primary-blue)" }}>
                  {profileData.role}
                </p>
                <p className="text-sm text-gray-500 mt-2">{profileData.department}</p>
                
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
                  <span>ID: {profileData.employeeId}</span>
                </p>
                <p className="flex items-center gap-1 justify-end mt-1">
                  <CalendarTodayIcon className="w-4 h-4" />
                  <span>Joined: {fmtDate(profileData.joinDate)}</span>
                </p>
                <p className="flex items-center gap-1 justify-end mt-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>Last login: {fmtDateTime(profileData.lastLogin)}</span>
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
                          className={inputBase}
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          className={inputBase}
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          className={inputBase}
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                        <input
                          type="text"
                          className={inputBase}
                          value={profileData.department}
                          onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          className={inputBase}
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Employee ID</label>
                        <input
                          type="text"
                          className={`${inputBase} bg-gray-50`}
                          value={profileData.employeeId}
                          disabled
                          readOnly
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                        <textarea
                          rows="4"
                          className={textareaBase}
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
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
                        className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow label="Full Name" value={profileData.fullName} />
                    <InfoRow label="Email Address" value={profileData.email} />
                    <InfoRow label="Phone Number" value={profileData.phone} />
                    <InfoRow label="Department" value={profileData.department} />
                    <InfoRow label="Role" value={profileData.role} />
                    <InfoRow label="Employee ID" value={profileData.employeeId} />
                    <InfoRow label="Location" value={profileData.location} />
                    <InfoRow label="Join Date" value={fmtDate(profileData.joinDate)} />
                    <InfoRow label="Last Login" value={fmtDateTime(profileData.lastLogin)} />
                    <div className="md:col-span-2 p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                      <p className="text-xs text-gray-500 mb-2">Bio</p>
                      <p className="text-sm text-gray-800">{profileData.bio}</p>
                    </div>
                  </div>
                )}
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
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="font-extrabold text-gray-900">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
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
                  </div>
                ) : (
                  <form onSubmit={handlePasswordChange} className="space-y-6 max-w-2xl">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                      <PasswordInput
                        required
                        className={inputBase}
                        placeholder="Enter current password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                      <PasswordInput
                        required
                        className={inputBase}
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
                        className={inputBase}
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
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <SectionTitle title="Notification Preferences" />

                <div className="space-y-3">
                  {[
                    { category: 'Email Notifications', description: 'Receive notifications via email', enabled: settings.emailNotifications },
                    { category: 'Push Notifications', description: 'Receive browser push notifications', enabled: settings.pushNotifications },
                    { category: 'Report Upload Alerts', description: 'Get notified when reports are uploaded', enabled: true },
                    { category: 'Tender Deadline Alerts', description: 'Get reminders for tender deadlines', enabled: true },
                    { category: 'Meeting Reminders', description: 'Remind 15 minutes before meetings', enabled: true },
                    { category: 'Document Updates', description: 'When documents are shared or updated', enabled: true },
                    { category: 'Daily Digest', description: 'Receive daily summary email', enabled: false },
                  ].map((pref, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                      <div>
                        <p className="font-semibold text-gray-900">{pref.category}</p>
                        <p className="text-sm text-gray-500 mt-1">{pref.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          defaultChecked={pref.enabled}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}

                  <SectionTitle title="Display Preferences" subtitle="Customize your interface" className="mt-6" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                      <select 
                        className={inputBase}
                        value={settings.language}
                        onChange={(e) => setSettings({...settings, language: e.target.value})}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Timezone</label>
                      <select 
                        className={inputBase}
                        value={settings.timezone}
                        onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                      >
                        <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
                        <option value="UTC">UTC (GMT+0)</option>
                        <option value="America/New_York">America/New York (GMT-5)</option>
                      </select>
                    </div>
                  </div>

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
          </div>
        </Card>

        {/* RECENT ACTIVITY */}
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
                  {renderNodeWithIcons(getActivityIcon(activity.type))}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
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

        {/* ACTIVITY SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Reports Uploaded</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {profileData.reportsUploaded}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(44,75,155,0.1)" }}>
                <span style={{ color: "var(--primary-blue)" }} className="text-xl">{renderNodeWithIcons("📊")}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Documents Managed</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#8B5CF6" }}>
                  {profileData.documentsManaged}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(139,92,246,0.1)" }}>
                <span style={{ color: "#8B5CF6" }} className="text-xl">{renderNodeWithIcons("📄")}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Tenders Tracked</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#10B981" }}>
                  {profileData.tendersTracked}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(16,185,129,0.1)" }}>
                <span style={{ color: "#10B981" }} className="text-xl">{renderNodeWithIcons("📋")}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Meetings Scheduled</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#F59E0B" }}>
                  {profileData.meetingsScheduled}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(245,158,11,0.1)" }}>
                <span style={{ color: "#F59E0B" }} className="text-xl">{renderNodeWithIcons("📅")}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}


const InfoRow = ({ label, value }) => (
  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="font-semibold text-gray-900 break-words">{value}</p>
  </div>
);