"use client";

// pages/dashboards/HOD/HODNotifications.jsx
import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { fetchWithAuth } from "@/lib/api";
import { HODMenuItems } from "@/utils/menus";
import { useSSE } from "@/hooks/useSSE";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import { toast } from "@/lib/toast";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";
/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const SectionTitle = ({ title, subtitle, action = null }: { title: string; subtitle?: string; action?: React.ReactNode }) => (
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

const safeText = (value, fallback = "") => (typeof value === "string" && value.trim() ? value : fallback);
const safeLower = (value) => safeText(value).toLowerCase();
const safeLink = (value) => {
  const link = safeText(value, "#");
  return link.startsWith("/") ? link : "#";
};

export default function HODNotifications() {
  const [me, setMe] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const lastRealtimeRefetchRef = useRef(0);

  const notificationTypes = [
    "CREATE_TASK",
    "UPDATE_TASK",
    "VIEW_TASK",
    "ASSIGN_TASK",
    "UNASSIGN_TASK",
    "ESCALATE_TASK",
    "DEESCALATE_TASK",
    "UPLOAD_DOCUMENT",
    "UPDATE_DOCUMENT",
    "VIEW_DOCUMENT",
    "DOWNLOAD_DOCUMENT",
    "CREATE_ANNOUNCEMENT",
    "UPDATE_ANNOUNCEMENT",
    "VIEW_ANNOUNCEMENT",
    "READ_ANNOUNCEMENT",
    "CREATE_TENDER",
    "UPDATE_TENDER",
    "VIEW_TENDER",
    "DELETE_TENDER",
    "CREATE_USER",
    "UPDATE_USER",
    "DELETE_USER",
    "CREATE_DEPARTMENT",
    "UPDATE_DEPARTMENT",
    "DELETE_DEPARTMENT",
  ];

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const [meRes, res] = await Promise.all([
        fetchWithAuth("/api/me"),
        fetchWithAuth("/api/notifications?limit=100")
      ]);
      
      const meData = meRes.ok ? await meRes.json() : null;
      const data = res.ok ? await res.json() : [];
      
      setMe(meData);

      const mapped = data.map(n => ({
        id: n.id,
        type: safeText(n.actionType, "SYSTEM_ALERT"),
        title: safeText(n.actionType, "System Alert").replace(/_/g, " "),
        message: safeText(n.message, "No notification details available."),
        time: (() => {
          const date = new Date(n.createdAt);
          return Number.isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString("en-US", { timeZone: "UTC" });
        })(),
        timestamp: n.createdAt,
        read: Boolean(n.read),
        link: safeLink(n.linkPath),
        priority: "NORMAL",
        sender: {
          name: n.actor?.id === meData?.id ? "You" : safeText(n.actor?.name, safeText(n.actorRole, "System")),
          avatar: "👤",
          department: safeText(n.actor?.department, "General"),
        }
      }));
      setNotifications(mapped);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  useSSE("/api/realtime/events", (ev) => {
    if (!ev?.type || ev.type === "ping") return;
    if (
      ev.type.startsWith("notification:") ||
      ev.type.startsWith("task:") ||
      ev.type.startsWith("announcement:")
    ) {
      const now = Date.now();
      if (now - lastRealtimeRefetchRef.current < 1500) return;
      lastRealtimeRefetchRef.current = now;
      fetchNotifications();
    }
  });

  const filteredNotifications = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return notifications.filter((notification) => {
      const matchesRead = filter === "all" || (filter === "unread" && !notification.read);
      const matchesPriority = selectedPriority === "all" || notification.priority === selectedPriority;
      const matchesType = selectedType === "all" || notification.type === selectedType;
      const matchesSearch =
        !query ||
        safeLower(notification.title).includes(query) ||
        safeLower(notification.message).includes(query) ||
        safeLower(notification.sender?.name).includes(query);
      return matchesRead && matchesPriority && matchesType && matchesSearch;
    });
  }, [notifications, filter, selectedPriority, selectedType, searchTerm]);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);
  const urgentCount = useMemo(() => notifications.filter((n) => n.priority === "URGENT").length, [notifications]);

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

  const deleteNotification = async (id) => {
    if (window.confirm("Delete this notification?")) {
      const original = [...notifications];
      setNotifications(notifications.filter((notif) => notif.id !== id));
      try {
        const res = await fetchWithAuth(`/api/notifications?id=${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete");
      } catch (e) {
        console.error(e);
        setNotifications(original);
        toast.error("Failed to delete notification");
      }
    }
  };

  const getNotificationStyle = (type) => {
    switch (type) {
      case "TASK_ASSIGNED":
        return { bg: "bg-blue-50", icon: "✅", color: "text-blue-700" };
      case "APPROVAL_REQUESTED":
        return { bg: "bg-purple-50", icon: "📋", color: "text-purple-700" };
      case "DOCUMENT_UPLOADED":
        return { bg: "bg-green-50", icon: "📄", color: "text-green-700" };
      case "TASK_OVERDUE":
        return { bg: "bg-red-50", icon: "⚠️", color: "text-red-700" };
      case "MEETING_INVITE":
        return { bg: "bg-orange-50", icon: "📅", color: "text-orange-700" };
      case "ANNOUNCEMENT":
        return { bg: "bg-yellow-50", icon: "📢", color: "text-yellow-800" };
      case "TENDER_DEADLINE":
        return { bg: "bg-teal-50", icon: "💰", color: "text-teal-700" };
      case "REPORT_SUBMITTED":
        return { bg: "bg-indigo-50", icon: "📊", color: "text-indigo-700" };
      case "ESCALATION":
        return { bg: "bg-red-50", icon: "⬆️", color: "text-red-700" };
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
      case "IMPORTANT":
        return "warn";
      case "NORMAL":
        return "info";
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

  if (loading && notifications.length === 0) {
    return <DashboardSkeleton />;
  }

  return (
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
                  Notifications Center
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Stay updated with department activities, approvals, and important alerts
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
              {
                label: "Today",
                value: notifications.filter((n) => {
                  if (!n.timestamp) return false;
                  const d = new Date(n.timestamp);
                  const now = new Date();
                  return d.getFullYear() === now.getFullYear() &&
                    d.getMonth() === now.getMonth() &&
                    d.getDate() === now.getDate();
                }).length,
                tone: "info",
              },
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
                <option value="URGENT">Urgent</option>
                <option value="HIGH">High</option>
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
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{renderNodeWithIcons("🔎")}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Urgent Alert Banner - Only show if urgent notifications exist */}
        {urgentCount > 0 && (
          <Card className="border-red-200 bg-red-50/30 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{renderNodeWithIcons("🚨")}</span>
                <div>
                  <h3 className="font-extrabold text-red-800">Urgent Attention Required!</h3>
                  <p className="text-red-600 text-sm">{urgentCount} urgent notification(s) require immediate attention</p>
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
                    <div className="text-4xl mb-3">{renderNodeWithIcons("🔔")}</div>
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
                                <span className="text-2xl">{renderNodeWithIcons(style.icon)}</span>
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
                                    {notification.sender.department !== "Auto" && (
                                      <span className="text-gray-400"> ({notification.sender.department})</span>
                                    )}
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
                          <span className="text-red-500 text-sm">{renderNodeWithIcons("🗑️")}</span>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="px-6 py-4 border-t border-gray-200/70 bg-white">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Showing <span className="font-semibold text-gray-800">{filteredNotifications.length}</span> of{" "}
                    <span className="font-semibold text-gray-800">{notifications.length}</span> notifications
                  </span>
                  <span className="text-xs text-gray-400">Scroll above to see all</span>
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
                {["URGENT", "HIGH", "IMPORTANT", "NORMAL"].map((priority) => {
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
                                  : priority === "IMPORTANT"
                                    ? "#EAB308"
                                    : "#3B82F6",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Department Activity */}
            <Card className="p-6">
              <SectionTitle title="Department Activity" subtitle="Recent activity by department" />

              <div className="mt-4 space-y-4">
                {[
                  { name: "Technical Dept", icon: "📋", count: 8, change: "+4", color: "var(--primary-blue)" },
                  { name: "Workshop", icon: "📄", count: 5, change: "+2", color: "#10B981" },
                  { name: "HSE", icon: "📊", count: 3, change: "+1", color: "#F59E0B" },
                  { name: "Procurement", icon: "💰", count: 2, change: "+1", color: "#8B5CF6" },
                ].map((dept, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${dept.color}18` }}
                      >
                        <span className="text-sm" style={{ color: dept.color }}>
                          {renderNodeWithIcons(dept.icon)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-700">{dept.name}</span>
                        <p className="text-xs text-gray-500">{dept.count} notifications</p>
                      </div>
                    </div>
                    <span className="font-extrabold" style={{ color: dept.color }}>
                      {dept.change}
                    </span>
                  </div>
                ))}
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
                      <span className="text-xl">{renderNodeWithIcons("⚙️")}</span>
                    </div>
                    <div>
                      <p className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Notification Settings
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
                      <span className="text-xl">{renderNodeWithIcons("📧")}</span>
                    </div>
                    <div>
                      <p className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Email Preferences
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Manage email notification settings</p>
                    </div>
                  </div>
                </button>

                <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                    >
                      <span className="text-xl">{renderNodeWithIcons("📊")}</span>
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

            {/* Response Time Stats */}
            <Card className="p-6">
              <SectionTitle title="Response Time" subtitle="Average response metrics" />

              <div className="mt-4 space-y-3">
                {[
                  { label: "Within 1 hour", value: 65, color: "#10B981" },
                  { label: "1-4 hours", value: 20, color: "#3B82F6" },
                  { label: "4-24 hours", value: 10, color: "#F59E0B" },
                  { label: "Over 24 hours", value: 5, color: "#EF4444" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>


          </div>
        </div>
      </div>
  );
}
