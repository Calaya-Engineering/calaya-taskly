"use client";

/**
 * BadgeContext – real-time sidebar badge counts.
 *
 * • Fetches live counts from APIs on mount.
 * • Listens to SSE events (tasks + announcements) to bump counts.
 * • Clears badge for a page when the user visits it.
 * • Persists "last seen" timestamps per path in sessionStorage so
 *   badges only show for NEW items since the user last visited.
 */

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { usePathname } from "next/navigation";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";
import { useAuth } from "@/contexts/AuthContext";

// ─── Storage helpers ──────────────────────────────────────────────
const STORAGE_KEY = "calaya_badge_seen";

function getSeenMap() {
    try {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
        return {};
    }
}

function markPathSeen(path) {
    const map = getSeenMap();
    map[path] = Date.now();
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

// ─── Context ──────────────────────────────────────────────────────
const BadgeContext = createContext(undefined);

/**
 * Detects the current dashboard prefix from the pathname,
 * e.g. "/hod-dashboard/tasks" -> "/hod-dashboard"
 */
function getDashboardPrefix(pathname) {
    const prefixes = [
        "/hod-dashboard",
        "/md-dashboard",
        "/staff-dashboard",
        "/secretary-dashboard",
        "/admin-dashboard",
    ];
    return prefixes.find((p) => pathname.startsWith(p)) || "";
}

export function BadgeProvider({ children }) {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const pathname = usePathname();
    const prefix = getDashboardPrefix(pathname);

    // { "/hod-dashboard/notifications": 5, "/hod-dashboard/tasks": 3, ... }
    const [badges, setBadges] = useState({});
    const hasFetchedRef = useRef(false);

    // ── Mark current page as seen (clear its badge) ───────────────
    useEffect(() => {
        if (!pathname) return;
        markPathSeen(pathname);
        setBadges((prev) => {
            if (prev[pathname] === undefined || prev[pathname] === 0) return prev;
            return { ...prev, [pathname]: 0 };
        });
    }, [pathname]);

    // ── Fetch initial counts from APIs ────────────────────────────
    const fetchCounts = useCallback(async () => {
        if (!prefix || !isAuthenticated) return;

        try {
            const results = await Promise.allSettled([
                // Unread notifications
                fetchWithAuth("/api/notifications?unread=true&limit=200").then((r) =>
                    r.ok ? r.json() : []
                ),
                // Pending approvals (tasks with status PENDING for HOD/MD)
                fetchWithAuth("/api/tasks?status=PENDING&limit=200").then((r) =>
                    r.ok ? r.json() : []
                ),
                // Escalated tasks
                fetchWithAuth("/api/tasks?limit=200").then((r) =>
                    r.ok ? r.json() : []
                ),
                // Announcements
                fetchWithAuth("/api/announcements?limit=200").then((r) =>
                    r.ok ? r.json() : []
                ),
                // Tenders
                fetchWithAuth("/api/tenders?limit=200").then((r) =>
                    r.ok ? r.json() : []
                ),
            ]);

            const notifications =
                results[0].status === "fulfilled" ? results[0].value : [];
            const pendingTasks =
                results[1].status === "fulfilled" ? results[1].value : [];
            const allTasks =
                results[2].status === "fulfilled" ? results[2].value : [];
            const announcements =
                results[3].status === "fulfilled" ? results[3].value : [];
            const tenders =
                results[4].status === "fulfilled" ? results[4].value : [];

            const seen = getSeenMap();

            // Count items that are NEWER than the user's last visit to that page
            const countNewSince = (items, path, dateField = "createdAt") => {
                const lastSeen = seen[path] || 0;
                if (!lastSeen) return items.length; // never visited -> show all
                return items.filter(
                    (i) => new Date(i[dateField]).getTime() > lastSeen
                ).length;
            };

            const notifPath = `${prefix}/notifications`;
            const tasksPath = `${prefix}/tasks`;
            const myTasksPath = `${prefix}/my-tasks`;
            const approvalsPath = `${prefix}/approvals`;
            const escalationsPath = `${prefix}/escalations`;
            const announcementsPath = `${prefix}/announcements`;
            const tendersPath = `${prefix}/tenders`;
            const documentsPath = `${prefix}/documents`;
            const tenderDocsPath = `${prefix}/tender-documents`;

            // Unread notifications count (use read field, not time-based)
            const unreadNotifCount = Array.isArray(notifications)
                ? notifications.length
                : 0;

            // Escalated tasks
            const escalatedTasks = Array.isArray(allTasks)
                ? allTasks.filter((t) => t.escalated)
                : [];

            // Pending approval tasks
            const pendingApprovalCount = Array.isArray(pendingTasks)
                ? pendingTasks.length
                : 0;

            // Unread announcements
            const unreadAnnouncements = Array.isArray(announcements)
                ? announcements.filter((a) => !a.read)
                : [];

            const newBadges = {};

            // Notifications: use unread count (already filtered server-side)
            if (pathname !== notifPath) {
                newBadges[notifPath] = unreadNotifCount;
            }

            // Tasks: new tasks since last visit
            if (pathname !== tasksPath && Array.isArray(allTasks)) {
                newBadges[tasksPath] = countNewSince(allTasks, tasksPath);
            }

            // My Tasks: new assignments since last visit
            if (pathname !== myTasksPath && Array.isArray(allTasks)) {
                newBadges[myTasksPath] = countNewSince(allTasks, myTasksPath);
            }

            // Approvals: pending count
            if (pathname !== approvalsPath) {
                newBadges[approvalsPath] = pendingApprovalCount;
            }

            // Escalations: escalated count
            if (pathname !== escalationsPath) {
                newBadges[escalationsPath] = escalatedTasks.length;
            }

            // Announcements: unread count
            if (pathname !== announcementsPath) {
                newBadges[announcementsPath] = unreadAnnouncements.length;
            }

            // Tenders: new since last visit
            if (pathname !== tendersPath && Array.isArray(tenders)) {
                newBadges[tendersPath] = countNewSince(tenders, tendersPath);
            }

            setBadges(newBadges);
        } catch (err) {
            console.error("Badge fetch error:", err);
        }
    }, [prefix, isAuthenticated, pathname]);

    useEffect(() => {
        if (authLoading || !isAuthenticated || hasFetchedRef.current) return;
        hasFetchedRef.current = true;
        fetchCounts();
    }, [authLoading, isAuthenticated, fetchCounts]);

    // ── SSE: bump badge counts in real-time ───────────────────────
    const handleTaskEvent = useCallback(
        (ev) => {
            if (!prefix) return;

            const tasksPath = `${prefix}/tasks`;
            const myTasksPath = `${prefix}/my-tasks`;
            const approvalsPath = `${prefix}/approvals`;
            const escalationsPath = `${prefix}/escalations`;
            const notifPath = `${prefix}/notifications`;

            setBadges((prev) => {
                const next = { ...prev };

                // Any task event -> bump tasks badge (if user is NOT on that page)
                if (pathname !== tasksPath) {
                    if (
                        ev.type === "task:created" ||
                        ev.type === "task:assigned" ||
                        ev.type === "task:updated"
                    ) {
                        next[tasksPath] = (next[tasksPath] || 0) + 1;
                    }
                }

                // Task assigned to current user -> bump my-tasks
                if (pathname !== myTasksPath && ev.type === "task:assigned") {
                    next[myTasksPath] = (next[myTasksPath] || 0) + 1;
                }

                // Task escalated -> bump escalations
                if (pathname !== escalationsPath && ev.type === "task:escalated") {
                    next[escalationsPath] = (next[escalationsPath] || 0) + 1;
                }

                // Most task events also generate notifications
                if (
                    pathname !== notifPath &&
                    ["task:created", "task:assigned", "task:escalated"].includes(ev.type)
                ) {
                    next[notifPath] = (next[notifPath] || 0) + 1;
                }

                return next;
            });
        },
        [prefix, pathname]
    );

    const handleAnnouncementEvent = useCallback(
        (ev) => {
            if (!prefix) return;

            const announcementsPath = `${prefix}/announcements`;
            const notifPath = `${prefix}/notifications`;

            setBadges((prev) => {
                const next = { ...prev };

                if (
                    pathname !== announcementsPath &&
                    ev.type === "announcement:created"
                ) {
                    next[announcementsPath] = (next[announcementsPath] || 0) + 1;
                }

                if (pathname !== notifPath && ev.type === "announcement:created") {
                    next[notifPath] = (next[notifPath] || 0) + 1;
                }

                return next;
            });
        },
        [prefix, pathname]
    );

    useSSE("/api/tasks/events", handleTaskEvent, isAuthenticated && !authLoading);
    useSSE(
        "/api/announcements/events",
        handleAnnouncementEvent,
        isAuthenticated && !authLoading
    );

    // ── Exposed API ───────────────────────────────────────────────
    const getBadge = useCallback(
        (path) => {
            const count = badges[path];
            if (!count || count <= 0) return null;
            return count > 99 ? "99+" : String(count);
        },
        [badges]
    );

    const clearBadge = useCallback((path) => {
        markPathSeen(path);
        setBadges((prev) => {
            if (!prev[path]) return prev;
            return { ...prev, [path]: 0 };
        });
    }, []);

    const value = useMemo(
        () => ({ badges, getBadge, clearBadge }),
        [badges, getBadge, clearBadge]
    );

    return (
        <BadgeContext.Provider value={value}>{children}</BadgeContext.Provider>
    );
}

export function useBadges() {
    const ctx = useContext(BadgeContext);
    if (!ctx) {
        throw new Error("useBadges must be used within a BadgeProvider");
    }
    return ctx;
}
