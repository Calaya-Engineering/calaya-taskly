"use client";

// pages/dashboards/Staff/StaffProfile.jsx
import { useState } from 'react';
import Layout from "@/components/Layout";
import { CancelIcon, EditIcon, BadgeIcon, CalendarTodayIcon, ClockIcon } from "@/lib/icons";
import { StaffMenuItems } from "@/utils/menus";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "@/lib/toast";
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

const userProfile = {
  fullName: 'John Doe',
  email: 'john.doe@calaya.com',
  phone: '+1 (234) 567-8900',
  employeeId: 'EMP-2023-0456',
  role: 'Staff',
  department: 'Technical Department',
  subDepartment: 'Workshop Team',
  jobTitle: 'Senior Technician',
  supervisor: 'Mr. Johnson (HOD)',
  startDate: '2023-03-15',
  lastLogin: '2024-12-10T09:30:00',
  emergencyContact: '+1 (234) 567-8911',
  emergencyContactName: 'Jane Doe',
  address: '123 Main Street, Houston, TX 77001',
  skills: ['Equipment Maintenance', 'Safety Compliance', 'Technical Reporting', 'Team Collaboration'],
  notifications: 5,
  tasksAssigned: 42,
  tasksCompleted: 38,
  reportsSubmitted: 15,
  avgTaskHours: 4.2,
  recentActivity: [
    { action: 'Submitted report for TASK-2024-00128', time: '2 hours ago', type: 'TASK', status: 'completed' },
    { action: 'Updated progress on Safety Inspection Report', time: '1 day ago', type: 'TASK', status: 'pending' },
    { action: 'Downloaded safety protocol document', time: '2 days ago', type: 'DOCUMENT', status: 'completed' },
    { action: 'Accepted meeting invitation for Safety Briefing', time: '3 days ago', type: 'EVENT', status: 'upcoming' },
    { action: 'Completed Equipment Maintenance task', time: '1 week ago', type: 'TASK', status: 'completed' },
  ]
};

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not set";

const fmtDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString(undefined, { 
    hour: '2-digit', 
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    hour12: true 
  }) : "Not set";

export default function StaffProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(userProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [formData, setFormData] = useState({
    phone: userProfile.phone,
    emergencyContact: userProfile.emergencyContact,
    emergencyContactName: userProfile.emergencyContactName,
    address: userProfile.address,
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData({
      ...profileData,
      ...formData
    });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setShowPasswordForm(false);
    toast.success('Password changed successfully!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
      case 'TASK': return '📋';
      case 'DOCUMENT': return '📄';
      case 'EVENT': return '📅';
      default: return '📌';
    }
  };

  const getActivityBg = (type) => {
    switch(type) {
      case 'TASK': return 'rgba(59, 130, 246, 0.1)';
      case 'DOCUMENT': return 'rgba(139, 92, 246, 0.1)';
      case 'EVENT': return 'rgba(245, 158, 11, 0.1)';
      default: return 'rgba(107, 114, 128, 0.1)';
    }
  };

  return (
    <Layout menuItems={StaffMenuItems} userRole="Staff">
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
              { label: "Tasks Assigned", value: profileData.tasksAssigned, icon: "📋", color: "var(--primary-blue)" },
              { label: "Completed", value: profileData.tasksCompleted, icon: "✅", color: "#10B981" },
              { label: "Reports Submitted", value: profileData.reportsSubmitted, icon: "📄", color: "#8B5CF6" },
              { label: "Avg Task Hours", value: `${profileData.avgTaskHours}h`, icon: "⏱️", color: "#F59E0B" },
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
                      width: `${Math.min(100, (parseInt(stat.value) / 50) * 100)}%`,
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
                  {profileData.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute -bottom-2 -right-2">
                  <Pill tone="info">Staff</Pill>
                </div>
              </div>

              {/* Name and Role */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{profileData.fullName}</h2>
                <p className="text-lg font-semibold mt-1" style={{ color: "var(--primary-blue)" }}>
                  {profileData.jobTitle}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {profileData.department} • {profileData.subDepartment}
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
                  <span>ID: {profileData.employeeId}</span>
                </p>
                <p className="flex items-center gap-1 justify-end mt-1">
                  <CalendarTodayIcon className="w-4 h-4" />
                  <span>Joined: {fmtDate(profileData.startDate)}</span>
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
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50"
                          value={profileData.fullName}
                          disabled
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50"
                          value={profileData.jobTitle}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Employee ID</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50"
                          value={profileData.employeeId}
                          disabled
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Supervisor</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50"
                          value={profileData.supervisor}
                          disabled
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact Name</label>
                        <input
                          type="text"
                          name="emergencyContactName"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                          value={formData.emergencyContactName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact Phone</label>
                        <input
                          type="tel"
                          name="emergencyContact"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                          value={formData.emergencyContact}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                        <textarea
                          name="address"
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Skills & Expertise</label>
                        <div className="flex flex-wrap gap-2">
                          {profileData.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-sm ring-1 ring-blue-100">
                              {skill}
                            </span>
                          ))}
                        </div>
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
                    <InfoRow label="Job Title" value={profileData.jobTitle} />
                    <InfoRow label="Department" value={profileData.department} />
                    <InfoRow label="Employee ID" value={profileData.employeeId} />
                    <InfoRow label="Supervisor" value={profileData.supervisor} />
                    <InfoRow label="Start Date" value={fmtDate(profileData.startDate)} />
                    <InfoRow label="Emergency Contact" value={`${profileData.emergencyContactName} - ${profileData.emergencyContact}`} />
                    <InfoRow label="Address" value={profileData.address} />
                    <div className="md:col-span-2 p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                      <p className="text-xs text-gray-500 mb-2">Skills & Expertise</p>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-sm ring-1 ring-blue-100">
                            {skill}
                          </span>
                        ))}
                      </div>
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
                            <p className="font-semibold text-sm">Previous Session</p>
                            <p className="text-xs text-gray-500 mt-1">Safari on iPhone • 1 day ago</p>
                          </div>
                          <span className="text-xs text-gray-500">Ended</span>
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

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <SectionTitle title="Notification Preferences" />

                <div className="space-y-3">
                  {[
                    { category: 'Task Assignments', description: 'Get notified when new tasks are assigned', enabled: true },
                    { category: 'Deadline Reminders', description: 'Receive reminders before task deadlines', enabled: true },
                    { category: 'Report Approvals', description: 'Notifications about report status changes', enabled: true },
                    { category: 'Meeting Notifications', description: 'Meeting invites and reminders', enabled: false },
                    { category: 'Announcement Updates', description: 'Company announcements and news', enabled: true },
                    { category: 'Document Updates', description: 'When documents are shared or updated', enabled: true },
                    { category: 'Email Digest', description: 'Receive daily summary of activities', enabled: false },
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
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Time Zone</label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100">
                        <option>UTC-06:00 (Central Time)</option>
                        <option>UTC-05:00 (Eastern Time)</option>
                        <option>UTC-08:00 (Pacific Time)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date Format</label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
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

        {/* Skills Summary Card */}
        <Card className="p-6">
          <SectionTitle title="Skills & Expertise" subtitle="Your professional skills" />
          <div className="mt-4 flex flex-wrap gap-2">
            {profileData.skills.map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-2xl text-sm ring-1 ring-blue-100">
                {skill}
              </span>
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