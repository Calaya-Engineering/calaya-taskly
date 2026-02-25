"use client";

// pages/dashboards/Staff/StaffNotifications.jsx
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
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
    id: 'NOT-001',
    type: 'TASK_ASSIGNED',
    title: 'New Task Assigned',
    message: 'You have been assigned a new task: Safety Inspection Report',
    time: '10 minutes ago',
    timestamp: '2024-12-10T09:30:00',
    read: false,
    link: '/staff-dashboard/task/TASK-2024-00123',
    priority: 'HIGH',
    sender: {
      name: 'HOD - Technical',
      avatar: 'HT',
      department: 'Technical'
    }
  },
  {
    id: 'NOT-002',
    type: 'TASK_UPDATE',
    title: 'Task Status Updated',
    message: 'Task "Equipment Maintenance" has been marked as In Progress',
    time: '45 minutes ago',
    timestamp: '2024-12-10T08:45:00',
    read: false,
    link: '/staff-dashboard/task/TASK-2024-00124',
    priority: 'MEDIUM',
    sender: {
      name: 'System',
      avatar: '⚙️',
      department: 'Auto'
    }
  },
  {
    id: 'NOT-003',
    type: 'DEADLINE_REMINDER',
    title: 'Task Due Soon',
    message: 'Task "Safety Inspection Report" is due tomorrow',
    time: '2 hours ago',
    timestamp: '2024-12-10T07:15:00',
    read: false,
    link: '/staff-dashboard/task/TASK-2024-00123',
    priority: 'URGENT',
    sender: {
      name: 'Reminder System',
      avatar: '⏰',
      department: 'Auto'
    }
  },
  {
    id: 'NOT-004',
    type: 'ANNOUNCEMENT',
    title: 'New Announcement',
    message: 'Safety Protocol Update has been posted by HSE Department',
    time: '1 day ago',
    timestamp: '2024-12-09T09:45:00',
    read: true,
    link: '/staff-dashboard/announcement/ANN-001',
    priority: 'IMPORTANT',
    sender: {
      name: 'HSE Department',
      avatar: 'HS',
      department: 'HSE'
    }
  },
  {
    id: 'NOT-005',
    type: 'REPORT_APPROVED',
    title: 'Report Approved',
    message: 'Your report "Monthly Activity Report - November" has been approved',
    time: '1 day ago',
    timestamp: '2024-12-09T14:20:00',
    read: true,
    link: '/staff-dashboard/submit-reports',
    priority: 'NORMAL',
    sender: {
      name: 'HOD - Technical',
      avatar: 'HT',
      department: 'Technical'
    }
  },
  {
    id: 'NOT-006',
    type: 'EVENT_REMINDER',
    title: 'Meeting Reminder',
    message: 'Monthly Safety Briefing starts in 30 minutes',
    time: '3 hours ago',
    timestamp: '2024-12-10T06:30:00',
    read: false,
    link: '/staff-dashboard/event/EVT-001',
    priority: 'HIGH',
    sender: {
      name: 'Calendar',
      avatar: '📅',
      department: 'Admin'
    }
  },
  {
    id: 'NOT-007',
    type: 'DOCUMENT_SHARED',
    title: 'Document Shared',
    message: 'New document "Safety Protocol v2.1" has been shared with you',
    time: '2 days ago',
    timestamp: '2024-12-08T10:15:00',
    read: true,
    link: '/staff-dashboard/document/DOC-001',
    priority: 'MEDIUM',
    sender: {
      name: 'HSE Department',
      avatar: 'HS',
      department: 'HSE'
    }
  },
  {
    id: 'NOT-008',
    type: 'TENDER_UPDATE',
    title: 'New Tender Posted',
    message: 'New tender "Safety Equipment Procurement" has been posted',
    time: '3 days ago',
    timestamp: '2024-12-07T15:30:00',
    read: true,
    link: '/staff-dashboard/tender/TEN-001',
    priority: 'NORMAL',
    sender: {
      name: 'Procurement',
      avatar: '💰',
      department: 'Procurement'
    }
  },
];

export default function StaffNotifications() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const notificationTypes = [
    'TASK_ASSIGNED',
    'TASK_UPDATE',
    'DEADLINE_REMINDER',
    'ANNOUNCEMENT',
    'REPORT_APPROVED',
    'EVENT_REMINDER',
    'DOCUMENT_SHARED',
    'TENDER_UPDATE'
  ];

  const filteredNotifications = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return notifications.filter((notification) => {
      const matchesRead = filter === "all" || (filter === "unread" && !notification.read) || (filter === "read" && notification.read);
      const matchesPriority = selectedPriority === "all" || notification.priority === selectedPriority;
      const matchesType = selectedType === "all" || notification.type === selectedType;
      const matchesSearch =
        !query ||
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query) ||
        notification.sender.name.toLowerCase().includes(query);
      return matchesRead && matchesPriority && matchesType && matchesSearch;
    });
  }, [notifications, filter, selectedPriority, selectedType, searchTerm]);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);
  const urgentCount = useMemo(() => notifications.filter((n) => n.priority === "URGENT").length, [notifications]);

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
      case 'TASK_ASSIGNED':
        return { bg: "bg-blue-50", icon: "📋", color: "text-blue-700" };
      case 'TASK_UPDATE':
        return { bg: "bg-yellow-50", icon: "⚡", color: "text-yellow-800" };
      case 'DEADLINE_REMINDER':
        return { bg: "bg-red-50", icon: "⏰", color: "text-red-700" };
      case 'ANNOUNCEMENT':
        return { bg: "bg-purple-50", icon: "📢", color: "text-purple-700" };
      case 'REPORT_APPROVED':
        return { bg: "bg-emerald-50", icon: "✅", color: "text-emerald-700" };
      case 'EVENT_REMINDER':
        return { bg: "bg-orange-50", icon: "📅", color: "text-orange-700" };
      case 'DOCUMENT_SHARED':
        return { bg: "bg-teal-50", icon: "📄", color: "text-teal-700" };
      case 'TENDER_UPDATE':
        return { bg: "bg-indigo-50", icon: "💰", color: "text-indigo-700" };
      default:
        return { bg: "bg-gray-50", icon: "🔔", color: "text-gray-700" };
    }
  };

  const getPriorityTone = (priority) => {
    switch (priority) {
      case "URGENT":
        return "danger";
      case "HIGH":
        return "warn";
      case "MEDIUM":
        return "info";
      case "IMPORTANT":
        return "warn";
      default:
        return "default";
    }
  };

  const clearFilters = () => {
    setFilter("all");
    setSelectedPriority("all");
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
                  <Pill>Notifications Center</Pill>
                  <Pill tone={unreadCount > 0 ? "warn" : "success"}>{unreadCount} Unread</Pill>
                  {urgentCount > 0 && <Pill tone="danger">{urgentCount} Urgent</Pill>}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Staff Notifications
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Stay updated with your tasks, deadlines, and important announcements
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
              { label: "Urgent", value: urgentCount, tone: urgentCount > 0 ? "danger" : "success" },
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

        {/* Urgent Alert */}
        {urgentCount > 0 && (
          <Card className="border-red-200 bg-red-50/30 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚨</span>
                <div>
                  <h3 className="font-extrabold text-red-800">Urgent Attention Required!</h3>
                  <p className="text-red-600 text-sm">{urgentCount} urgent notification(s) require your immediate attention</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPriority("URGENT")}
                className="px-4 py-2 rounded-xl font-semibold text-sm bg-red-500 text-white hover:bg-red-600 transition"
              >
                View Urgent
              </button>
            </div>
          </Card>
        )}

        {/* Filters */}
        <Card className="p-6">
          <SectionTitle
            title="Filters"
            subtitle="Filter notifications by read status, priority, type, and search"
            action={
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filteredNotifications.length}</span> of{" "}
                <span className="font-semibold text-gray-800">{notifications.length}</span>
              </div>
            }
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="URGENT">Urgent</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="IMPORTANT">Important</option>
                <option value="NORMAL">Normal</option>
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
                    {type.replace("_", " ")}
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
              onClick={() => setSelectedPriority("URGENT")}
              className="px-3.5 py-2 rounded-2xl text-sm font-semibold border bg-red-50 text-red-700 hover:bg-red-100 transition"
            >
              ⚠️ Urgent Only
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
                  title={filter === "unread" ? "Unread Notifications" : "All Notifications"}
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
                        className={`relative group transition-all hover:bg-gray-50 ${isUnread ? "bg-blue-50/30" : ""}`}
                      >
                        <div
                          onClick={() => {
                            markAsRead(notification.id);
                            router.push(notification.link);
                          }}
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
                                  </div>
                                  <span className="text-xs text-gray-500 whitespace-nowrap">
                                    {formatTimeAgo(notification.timestamp)}
                                  </span>
                                </div>

                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                  <Pill tone={getPriorityTone(notification.priority)}>{notification.priority}</Pill>
                                  <Pill tone="info">{notification.type.replace("_", " ")}</Pill>
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
            {/* Priority Summary */}
            <Card className="p-6">
              <SectionTitle title="Priority Summary" subtitle="Distribution by priority" />

              <div className="mt-4 space-y-3">
                {["URGENT", "HIGH", "MEDIUM", "IMPORTANT", "NORMAL"].map((priority) => {
                  const count = notifications.filter((n) => n.priority === priority).length;
                  const percentage = ((count / notifications.length) * 100).toFixed(1);

                  return (
                    <div key={priority} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">{priority}</span>
                        <span>
                          {count} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor:
                              priority === "URGENT"
                                ? "var(--accent-red)"
                                : priority === "HIGH"
                                ? "#F97316"
                                : priority === "MEDIUM"
                                ? "#3B82F6"
                                : priority === "IMPORTANT"
                                ? "#EAB308"
                                : "#6B7280",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Category Activity */}
            <Card className="p-6">
              <SectionTitle title="Activity by Category" subtitle="Recent activity summary" />

              <div className="mt-4 space-y-4">
                {[
                  { icon: "📋", label: "Tasks", value: notifications.filter(n => n.type.includes('TASK')).length, unread: notifications.filter(n => n.type.includes('TASK') && !n.read).length, color: "var(--primary-blue)" },
                  { icon: "📢", label: "Announcements", value: notifications.filter(n => n.type === 'ANNOUNCEMENT').length, unread: notifications.filter(n => n.type === 'ANNOUNCEMENT' && !n.read).length, color: "#8B5CF6" },
                  { icon: "✅", label: "Reports", value: notifications.filter(n => n.type === 'REPORT_APPROVED').length, unread: notifications.filter(n => n.type === 'REPORT_APPROVED' && !n.read).length, color: "#10B981" },
                  { icon: "📅", label: "Events", value: notifications.filter(n => n.type === 'EVENT_REMINDER').length, unread: notifications.filter(n => n.type === 'EVENT_REMINDER' && !n.read).length, color: "#F59E0B" },
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
                    <div className="text-right">
                      <span className="font-extrabold" style={{ color: item.color }}>
                        {item.value}
                      </span>
                      {item.unread > 0 && (
                        <span className="ml-2 text-xs text-red-600">({item.unread} new)</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <SectionTitle title="Quick Actions" subtitle="Common tasks" />

              <div className="mt-4 space-y-3">
                <Link href="/staff-dashboard/tasks">
                  <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                      >
                        <span className="text-xl">📋</span>
                      </div>
                      <div>
                        <p className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          View My Tasks
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Check your pending assignments</p>
                      </div>
                    </div>
                  </button>
                </Link>

                <Link href="/staff-dashboard/submit-reports">
                  <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                      >
                        <span className="text-xl">📊</span>
                      </div>
                      <div>
                        <p className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                          Submit Report
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Upload your monthly report</p>
                      </div>
                    </div>
                  </button>
                </Link>

                <Link href="/staff-dashboard/events">
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
                          View Calendar
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Check upcoming events</p>
                      </div>
                    </div>
                  </button>
                </Link>
              </div>
            </Card>

            {/* Today's Summary */}
            <Card className="p-6">
              <SectionTitle title="Today's Summary" subtitle="Quick overview" />

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tasks Due Today</span>
                  <span className="font-extrabold text-orange-600">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Meetings Today</span>
                  <span className="font-extrabold text-blue-600">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New Announcements</span>
                  <span className="font-extrabold text-purple-600">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending Approvals</span>
                  <span className="font-extrabold text-green-600">0</span>
                </div>
              </div>
            </Card>

            {/* Quick Settings */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Quick Settings
                </h2>
                <Link href="/staff-dashboard/settings" className="text-sm font-semibold" style={{ color: "var(--primary-blue)" }}>
                  Edit All
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Push Notifications", enabled: true },
                  { label: "Email Alerts", enabled: true },
                  { label: "SMS for Urgent", enabled: false },
                  { label: "Task Reminders", enabled: true },
                  { label: "Meeting Alerts", enabled: true },
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