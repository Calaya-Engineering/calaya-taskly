"use client";

// pages/dashboards/Secretary/SecretaryNotifications.jsx
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { SecretaryMenuItems } from "@/utils/menus";
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
      : tone === "purple"
      ? "bg-purple-50 text-purple-700 ring-purple-100"
      : "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

const notificationsData = [
  { 
    id: 1, 
    type: 'report',
    title: 'Daily Report Uploaded Successfully',
    message: 'Your daily operations report for December 12, 2024 has been uploaded and is now available for download.',
    time: '10 minutes ago',
    timestamp: '2024-12-12T09:30:00',
    read: false,
    important: true,
    link: '/secretary-dashboard/reports-archive',
    sender: {
      name: 'System',
      avatar: '🤖',
      department: 'Auto'
    }
  },
  { 
    id: 2, 
    type: 'tender',
    title: 'New Tender Published - Office Supplies',
    message: 'Admin department has published a new tender for office supplies procurement. Deadline: December 18, 2024.',
    time: '45 minutes ago',
    timestamp: '2024-12-12T08:45:00',
    read: false,
    important: true,
    link: '/secretary-dashboard/tenders',
    sender: {
      name: 'Procurement',
      avatar: '📝',
      department: 'Procurement'
    }
  },
  { 
    id: 3, 
    type: 'task',
    title: 'Task Report Submitted - TASK-2024-00123',
    message: 'John Doe from Technical department has submitted a task report for Pipeline Inspection.',
    time: '2 hours ago',
    timestamp: '2024-12-12T07:30:00',
    read: false,
    important: false,
    link: '/secretary-dashboard/task-reports',
    sender: {
      name: 'John Doe',
      avatar: '👤',
      department: 'Technical'
    }
  },
  { 
    id: 4, 
    type: 'event',
    title: 'Meeting Scheduled - Department Heads',
    message: 'Monthly department heads meeting scheduled for December 15, 2024 at 10:00 AM in Conference Room A.',
    time: '5 hours ago',
    timestamp: '2024-12-12T04:20:00',
    read: true,
    important: true,
    link: '/secretary-dashboard/events',
    sender: {
      name: 'Calendar',
      avatar: '📅',
      department: 'Admin'
    }
  },
  { 
    id: 5, 
    type: 'system',
    title: 'System Maintenance Notice',
    message: 'System maintenance is scheduled for December 14, 2024 from 2:00 AM to 4:00 AM. Some services may be temporarily unavailable.',
    time: '1 day ago',
    timestamp: '2024-12-11T14:30:00',
    read: true,
    important: true,
    link: null,
    sender: {
      name: 'System',
      avatar: '⚙️',
      department: 'Auto'
    }
  },
  { 
    id: 6, 
    type: 'document',
    title: 'New Document Uploaded - Company Policies',
    message: 'HR department has uploaded an updated version of the company policies handbook.',
    time: '2 days ago',
    timestamp: '2024-12-10T11:15:00',
    read: true,
    important: false,
    link: '/secretary-dashboard/documents',
    sender: {
      name: 'HR Department',
      avatar: '👥',
      department: 'HR'
    }
  },
  { 
    id: 7, 
    type: 'reminder',
    title: 'Reminder: Tender Closing Soon',
    message: 'Cleaning Services Contract tender is closing on December 30, 2024. Ensure all submissions are processed.',
    time: '3 days ago',
    timestamp: '2024-12-09T09:45:00',
    read: true,
    important: true,
    link: '/secretary-dashboard/tenders',
    sender: {
      name: 'Procurement',
      avatar: '💰',
      department: 'Procurement'
    }
  },
  { 
    id: 8, 
    type: 'report',
    title: 'Weekly Report Download Statistics',
    message: 'Your weekly operations report has been downloaded 24 times this week.',
    time: '4 days ago',
    timestamp: '2024-12-08T16:20:00',
    read: true,
    important: false,
    link: '/secretary-dashboard/reports-archive',
    sender: {
      name: 'System',
      avatar: '📊',
      department: 'Auto'
    }
  },
  { 
    id: 9, 
    type: 'announcement',
    title: 'Company Announcement: Holiday Schedule',
    message: 'Year-end holiday schedule has been published. Please check the announcements section for details.',
    time: '5 days ago',
    timestamp: '2024-12-07T10:30:00',
    read: true,
    important: true,
    link: '/secretary-dashboard/announcements',
    sender: {
      name: 'HR Department',
      avatar: '📢',
      department: 'HR'
    }
  },
  { 
    id: 10, 
    type: 'system',
    title: 'Password Expiry Reminder',
    message: 'Your password will expire in 7 days. Please update your password to maintain account security.',
    time: '6 days ago',
    timestamp: '2024-12-06T08:00:00',
    read: true,
    important: false,
    link: '/secretary-dashboard/profile',
    sender: {
      name: 'System',
      avatar: '🔒',
      department: 'Auto'
    }
  },
];

export default function SecretaryNotifications() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const notificationTypes = [
    'report',
    'tender',
    'task',
    'event',
    'document',
    'system',
    'reminder',
    'announcement'
  ];

  const filteredNotifications = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return notifications.filter((notification) => {
      const matchesRead = filter === "all" || 
        (filter === "unread" && !notification.read) ||
        (filter === "read" && notification.read) ||
        (filter === "important" && notification.important);
      
      const matchesType = selectedType === "all" || notification.type === selectedType;
      const matchesSearch =
        !query ||
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query) ||
        notification.sender.name.toLowerCase().includes(query);
      
      return matchesRead && matchesType && matchesSearch;
    });
  }, [notifications, filter, selectedType, searchTerm]);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);
  const importantCount = useMemo(() => notifications.filter((n) => n.important).length, [notifications]);

  const markAsRead = (id) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    if (window.confirm("Delete this notification?")) {
      setNotifications(notifications.filter((notif) => notif.id !== id));
    }
  };

  const clearAll = () => {
    if (window.confirm("Clear all notifications?")) {
      setNotifications([]);
    }
  };

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'report':
        return { bg: "bg-blue-50", icon: "📊", color: "text-blue-700" };
      case 'tender':
        return { bg: "bg-purple-50", icon: "📋", color: "text-purple-700" };
      case 'task':
        return { bg: "bg-green-50", icon: "📝", color: "text-green-700" };
      case 'event':
        return { bg: "bg-yellow-50", icon: "📅", color: "text-yellow-800" };
      case 'document':
        return { bg: "bg-indigo-50", icon: "📄", color: "text-indigo-700" };
      case 'system':
        return { bg: "bg-gray-50", icon: "⚙️", color: "text-gray-700" };
      case 'reminder':
        return { bg: "bg-red-50", icon: "⏰", color: "text-red-700" };
      case 'announcement':
        return { bg: "bg-orange-50", icon: "📢", color: "text-orange-700" };
      default:
        return { bg: "bg-gray-50", icon: "🔔", color: "text-gray-700" };
    }
  };

  const getPriorityTone = (important) => {
    return important ? "danger" : "default";
  };

  const clearFilters = () => {
    setFilter("all");
    setSelectedType("all");
    setSearchTerm("");
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleNotificationClick = (notification) => {
    if (notification.link) {
      markAsRead(notification.id);
      router.push(notification.link);
    }
  };

  return (
    <Layout menuItems={SecretaryMenuItems} userRole="Secretary">
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
                  <Pill>Notifications Center</Pill>
                  <Pill tone={unreadCount > 0 ? "warn" : "success"}>{unreadCount} Unread</Pill>
                  {importantCount > 0 && <Pill tone="danger">{importantCount} Important</Pill>}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Secretary Notifications
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Stay updated with reports, tenders, meetings, and important announcements
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={markAllAsRead}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                  style={{ backgroundColor: "var(--secondary-blue)" }}
                >
                  Mark All Read
                </button>
                <button
                  onClick={clearFilters}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 md:p-5 bg-white border-t border-gray-200/70">
            {[
              { label: "Total Notifications", value: notifications.length, tone: "default" },
              { label: "Unread", value: unreadCount, tone: unreadCount > 0 ? "warn" : "success" },
              { label: "Important", value: importantCount, tone: importantCount > 0 ? "danger" : "success" },
              { label: "Today", value: notifications.filter((n) => {
                  const notifDate = new Date(n.timestamp);
                  const today = new Date();
                  return notifDate.toDateString() === today.toDateString();
                }).length, tone: "info" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-gray-200/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{s.label}</p>
                  <Pill tone={s.tone}>Live</Pill>
                </div>
                <p className="text-2xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Important Alert */}
        {importantCount > 0 && filter !== "important" && (
          <Card className="border-red-200 bg-red-50/30 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h3 className="font-extrabold text-red-800">Important Notifications!</h3>
                  <p className="text-red-600 text-sm">{importantCount} important notification(s) require your attention</p>
                </div>
              </div>
              <button
                onClick={() => setFilter("important")}
                className="px-4 py-2 rounded-xl font-semibold text-sm bg-red-500 text-white hover:bg-red-600 transition"
              >
                View Important
              </button>
            </div>
          </Card>
        )}

        {/* Filters */}
        <Card className="p-6">
          <SectionTitle
            title="Filters"
            subtitle="Filter notifications by status, type, and search"
            action={
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filteredNotifications.length}</span> of{" "}
                <span className="font-semibold text-gray-800">{notifications.length}</span>
              </div>
            }
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
                <option value="important">Important Only</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                {notificationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
              </div>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("unread")}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-amber-50 text-amber-800 hover:bg-amber-100 transition"
            >
              🔔 Unread Only
            </button>
            <button
              onClick={() => setFilter("important")}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-red-50 text-red-700 hover:bg-red-100 transition"
            >
              ⚠️ Important Only
            </button>
            <button
              onClick={clearFilters}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-white hover:bg-gray-50 transition"
            >
              🔄 Clear All
            </button>
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications List - 2 columns */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="p-6 border-b border-gray-200/70">
                <SectionTitle
                  title={filter === "unread" ? "Unread Notifications" : filter === "important" ? "Important Notifications" : "All Notifications"}
                  subtitle={`${filteredNotifications.length} items`}
                />
              </div>

              <div className="divide-y divide-gray-200/70 max-h-[600px] overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="p-10 text-center">
                    <div className="text-4xl mb-3">🔔</div>
                    <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      No notifications found
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Try adjusting your filters or search criteria</div>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => {
                    const style = getNotificationStyle(notification.type);
                    const isUnread = !notification.read;

                    return (
                      <div
                        key={notification.id}
                        className={`relative group transition-all hover:bg-gray-50 ${isUnread ? "bg-blue-50/30" : ""} ${notification.important ? "border-l-4" : ""}`}
                        style={notification.important ? { borderLeftColor: "var(--accent-red)" } : {}}
                      >
                        <div
                          onClick={() => handleNotificationClick(notification)}
                          className="cursor-pointer"
                        >
                          <div className="p-6">
                            <div className="flex items-start gap-4">
                              {/* Icon */}
                              <div
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center  shrink-0 ${style.bg}`}
                              >
                                <span className="text-2xl">{style.icon}</span>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-4">
                                  <div className="flex items-center gap-2">
                                    <h3
                                      className={`font-extrabold ${isUnread ? "text-gray-900" : "text-gray-700"}`}
                                      style={isUnread ? { color: "var(--primary-blue)" } : {}}
                                    >
                                      {notification.title}
                                    </h3>
                                    {isUnread && (
                                      <span
                                        className="inline-flex w-2 h-2 rounded-full"
                                        style={{ backgroundColor: "var(--primary-blue)" }}
                                      />
                                    )}
                                    {notification.important && (
                                      <Pill tone="danger">Important</Pill>
                                    )}
                                  </div>
                                  <span className="text-xs text-gray-500 whitespace-nowrap">
                                    {formatTimeAgo(notification.timestamp)}
                                  </span>
                                </div>

                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                  <Pill tone={getPriorityTone(notification.important)}>
                                    {notification.important ? "IMPORTANT" : "NORMAL"}
                                  </Pill>
                                  <Pill tone="info">{notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}</Pill>
                                  <span className="text-xs text-gray-500">
                                    From: <span className="font-semibold">{notification.sender.name}</span>
                                    {notification.sender.department !== "Auto" && (
                                      <span className="text-gray-400"> ({notification.sender.department})</span>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="absolute top-4 right-4 p-2 bg-white rounded-xl border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                        >
                          <span className="text-red-500 text-sm">🗑️</span>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="px-6 py-4 border-t border-gray-200/70 bg-white">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Showing {filteredNotifications.length} of {notifications.length} notifications
                  </span>
                  <button className="font-semibold" style={{ color: "var(--primary-blue)" }}>
                    Load More →
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Category Summary */}
            <Card className="p-6">
              <SectionTitle title="Category Summary" subtitle="Distribution by type" />

              <div className="mt-4 space-y-3">
                {notificationTypes.map((type) => {
                  const count = notifications.filter((n) => n.type === type).length;
                  const unread = notifications.filter((n) => n.type === type && !n.read).length;
                  const percentage = ((count / notifications.length) * 100).toFixed(1);

                  return (
                    <div key={type} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold capitalize">{type}</span>
                        <span>
                          {count} ({percentage}%)
                          {unread > 0 && <span className="ml-1 text-red-600">({unread} unread)</span>}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: "var(--primary-blue)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <SectionTitle title="Quick Actions" subtitle="Common notification tasks" />

              <div className="mt-4 space-y-3">
                <Link href="/secretary-dashboard/upload-report">
                  <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                      >
                        <span className="text-xl">📊</span>
                      </div>
                      <div>
                        <p className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          Upload Daily Report
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Submit today's operations report</p>
                      </div>
                    </div>
                  </button>
                </Link>

                <Link href="/secretary-dashboard/tenders">
                  <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                      >
                        <span className="text-xl">📋</span>
                      </div>
                      <div>
                        <p className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          View Active Tenders
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Check tender deadlines and submissions</p>
                      </div>
                    </div>
                  </button>
                </Link>

                <Link href="/secretary-dashboard/events">
                  <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                      >
                        <span className="text-xl">📅</span>
                      </div>
                      <div>
                        <p className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          Schedule Meeting
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Create new meeting or event</p>
                      </div>
                    </div>
                  </button>
                </Link>
              </div>
            </Card>

            {/* Today's Activity */}
            <Card className="p-6">
              <SectionTitle title="Today's Activity" subtitle="Recent activity summary" />

              <div className="mt-4 space-y-4">
                {[
                  { icon: "📊", label: "Reports Uploaded", value: "2 today", color: "var(--primary-blue)" },
                  { icon: "📋", label: "Tenders Closing", value: "3 this week", color: "#10B981" },
                  { icon: "📅", label: "Upcoming Meetings", value: "2 scheduled", color: "#F59E0B" },
                  { icon: "📄", label: "New Documents", value: "+5 this week", color: "#8B5CF6" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}18` }}
                      >
                        <span className="text-sm" style={{ color: item.color }}>
                          {item.icon}
                        </span>
                      </div>
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </div>
                    <span className="font-extrabold" style={{ color: item.color }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Settings */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Quick Settings
                </h2>
                <Link href="/secretary-dashboard/settings" className="text-sm font-semibold" style={{ color: "var(--primary-blue)" }}>
                  Edit All
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Email Notifications", enabled: true },
                  { label: "Push Notifications", enabled: true },
                  { label: "SMS for Important", enabled: false },
                  { label: "Report Upload Alerts", enabled: true },
                  { label: "Tender Deadline Alerts", enabled: true },
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{setting.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={setting.enabled} />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}