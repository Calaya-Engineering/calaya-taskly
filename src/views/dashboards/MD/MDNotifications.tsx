"use client";

// pages/dashboards/MD/MDNotifications.jsx
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { fetchWithAuth } from "@/lib/api";
import { MDMenuItems } from "@/utils/menus";
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

const notificationsData = [
  {
    id: 1,
    type: "TASK_ASSIGNED",
    title: "New Task Assigned",
    message: "You have been assigned to 'Safety Audit for Site A'",
    time: "10 minutes ago",
    timestamp: "2024-12-10T09:30:00",
    read: false,
    link: "/md-dashboard/task/TASK-2024-00123",
    priority: "HIGH",
    sender: {
      name: "System",
      avatar: "🤖",
    },
  },
  {
    id: 2,
    type: "DOCUMENT_UPLOADED",
    title: "Document Uploaded",
    message: "Sarah Smith uploaded 'Quarterly Safety Report'",
    time: "45 minutes ago",
    timestamp: "2024-12-10T08:55:00",
    read: false,
    link: "/md-dashboard/document/DOC-002",
    priority: "MEDIUM",
    sender: {
      name: "Sarah Smith",
      avatar: "👤",
    },
  },
  {
    id: 3,
    type: "TASK_COMPLETED",
    title: "Task Completed",
    message: "Mike Johnson completed 'Pipeline Inspection Report'",
    time: "2 hours ago",
    timestamp: "2024-12-10T07:30:00",
    read: true,
    link: "/md-dashboard/task/TASK-2024-00124",
    priority: "NORMAL",
    sender: {
      name: "Mike Johnson",
      avatar: "👤",
    },
  },
  {
    id: 4,
    type: "APPROVAL_REQUESTED",
    title: "Approval Required",
    message: "James Wilson requests approval for 'Financial Report'",
    time: "3 hours ago",
    timestamp: "2024-12-10T06:45:00",
    read: false,
    link: "/md-dashboard/approvals",
    priority: "CRITICAL",
    sender: {
      name: "James Wilson",
      avatar: "👤",
    },
  },
  {
    id: 5,
    type: "MEETING_REMINDER",
    title: "Meeting Reminder",
    message: "Quarterly Review Meeting starts in 30 minutes",
    time: "4 hours ago",
    timestamp: "2024-12-10T05:30:00",
    read: true,
    link: "/md-dashboard/event/EVT-001",
    priority: "HIGH",
    sender: {
      name: "Calendar",
      avatar: "📅",
    },
  },
  {
    id: 6,
    type: "TENDER_UPDATE",
    title: "Tender Closing Soon",
    message: "Pipeline Equipment Supply tender closes in 2 days",
    time: "6 hours ago",
    timestamp: "2024-12-10T03:20:00",
    read: false,
    link: "/md-dashboard/tender/TEN-001",
    priority: "MEDIUM",
    sender: {
      name: "Procurement",
      avatar: "📝",
    },
  },
  {
    id: 7,
    type: "SYSTEM_ALERT",
    title: "System Maintenance",
    message: "Scheduled maintenance tonight from 10 PM to 2 AM",
    time: "1 day ago",
    timestamp: "2024-12-09T14:30:00",
    read: true,
    link: "#",
    priority: "NORMAL",
    sender: {
      name: "System",
      avatar: "⚙️",
    },
  },
  {
    id: 8,
    type: "ANNOUNCEMENT",
    title: "New Announcement",
    message: "HR Department posted 'Year-End Holiday Schedule'",
    time: "1 day ago",
    timestamp: "2024-12-09T10:15:00",
    read: true,
    link: "/md-dashboard/announcement/year-end-holiday-schedule",
    priority: "IMPORTANT",
    sender: {
      name: "HR Department",
      avatar: "📢",
    },
  },
];

export default function MDNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const notificationTypes = [
    "CREATE_TASK",
    "UPDATE_TASK",
    "VIEW_TASK",
    "ASSIGN_TASK",
    "UPLOAD_DOCUMENT",
    "CREATE_ANNOUNCEMENT",
  ];

  // removed inline import

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetchWithAuth("/api/notifications");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch");

        const mapped = data.map(n => ({
          id: n.id,
          type: n.actionType || "SYSTEM_ALERT",
          title: (n.actionType || "System Alert").replace(/_/g, " "),
          message: n.message,
          time: new Date(n.createdAt).toLocaleString('en-US', { timeZone: 'UTC' }),
          timestamp: n.createdAt,
          read: n.read,
          link: "#",
          priority: "NORMAL",
          sender: {
            name: n.actor?.name || n.actorRole || "System",
            avatar: "👤",
            department: n.actor?.department || "General",
          }
        }));
        setNotifications(mapped);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredNotifications = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return notifications.filter((notification) => {
      const matchesRead = filter === "all" || (filter === "unread" && !notification.read);
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
  const criticalCount = useMemo(() => notifications.filter((n) => n.priority === "CRITICAL").length, [notifications]);

  const markAsRead = async (id) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)));
    try {
      await fetchWithAuth("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const markAllAsRead = async () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
    try {
      await fetchWithAuth("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllRead: true }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteNotification = (id) => {
    if (window.confirm("Delete this notification?")) {
      setNotifications(notifications.filter((notif) => notif.id !== id));
      // Optionally add delete API route here later
    }
  };

  const getNotificationStyle = (type) => {
    switch (type) {
      case "TASK_ASSIGNED":
        return { bg: "bg-blue-50", icon: "📋", color: "text-blue-700" };
      case "DOCUMENT_UPLOADED":
        return { bg: "bg-green-50", icon: "📄", color: "text-green-700" };
      case "TASK_COMPLETED":
        return { bg: "bg-emerald-50", icon: "✅", color: "text-emerald-700" };
      case "APPROVAL_REQUESTED":
        return { bg: "bg-purple-50", icon: "🔄", color: "text-purple-700" };
      case "MEETING_REMINDER":
        return { bg: "bg-orange-50", icon: "📅", color: "text-orange-700" };
      case "TENDER_UPDATE":
        return { bg: "bg-teal-50", icon: "📝", color: "text-teal-700" };
      case "SYSTEM_ALERT":
        return { bg: "bg-red-50", icon: "⚠️", color: "text-red-700" };
      case "ANNOUNCEMENT":
        return { bg: "bg-yellow-50", icon: "📢", color: "text-yellow-800" };
      default:
        return { bg: "bg-gray-50", icon: "🔔", color: "text-gray-700" };
    }
  };

  const getPriorityTone = (priority) => {
    switch (priority) {
      case "CRITICAL":
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
                  <Pill>Notifications Center</Pill>
                  <Pill tone={unreadCount > 0 ? "warn" : "success"}>{unreadCount} Unread</Pill>
                  {criticalCount > 0 && <Pill tone="danger">{criticalCount} Critical</Pill>}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Notifications Center
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Stay updated with all system activities, alerts, and important updates
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
              { label: "Critical", value: criticalCount, tone: criticalCount > 0 ? "danger" : "success" },
              { label: "Today", value: notifications.filter((n) => n.time.includes("minutes") || n.time.includes("hours")).length, tone: "info" },
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
                <option value="CRITICAL">Critical</option>
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
                        <Link href={notification.link ?? "#"} onClick={() => markAsRead(notification.id)}>
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
                                  <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
                                </div>

                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                  <Pill tone={getPriorityTone(notification.priority)}>{notification.priority}</Pill>
                                  <Pill tone="info">{notification.type.replace("_", " ")}</Pill>
                                  <span className="text-xs text-gray-500">
                                    From: <span className="font-semibold">{notification.sender.name}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>

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
                {["CRITICAL", "HIGH", "MEDIUM", "IMPORTANT", "NORMAL"].map((priority) => {
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
                              priority === "CRITICAL"
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

            {/* Quick Actions */}
            <Card className="p-6">
              <SectionTitle title="Quick Actions" subtitle="Common notification tasks" />

              <div className="mt-4 space-y-3">
                <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                    >
                      <span className="text-xl">🔔</span>
                    </div>
                    <div>
                      <p className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Configure Notifications
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Customize your alert preferences</p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                    >
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <p className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Email Digest
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Receive daily notification summary</p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                    >
                      <span className="text-xl">📊</span>
                    </div>
                    <div>
                      <p className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Activity Report
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Export notification analytics</p>
                    </div>
                  </div>
                </button>
              </div>
            </Card>

            {/* Today's Activity */}
            <Card className="p-6">
              <SectionTitle title="Today's Activity" subtitle="Recent activity summary" />

              <div className="mt-4 space-y-4">
                {[
                  { icon: "📋", label: "Task Assignments", value: "3 new", color: "var(--primary-blue)" },
                  { icon: "📄", label: "Documents", value: "2 uploaded", color: "#10B981" },
                  { icon: "🔄", label: "Approvals", value: "4 pending", color: "#F59E0B" },
                  { icon: "📅", label: "Meetings", value: "2 upcoming", color: "#8B5CF6" },
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


          </div>
        </div>
      </div>
    </Layout>
  );
}