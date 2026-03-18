"use client";

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
import { resolveBadgeSectionPath } from "@/lib/badge-paths";

type BadgeContextType = {
  badges: Record<string, number>;
  getBadge: (path: string) => string | null;
  clearBadge: (path: string) => void;
};

const BadgeContext = createContext<BadgeContextType | undefined>(undefined);

const BADGE_EVENT_TYPES = new Set([
  "task:created",
  "task:assigned",
  "task:updated",
  "task:escalated",
  "announcement:created",
  "announcement:updated",
  "tender:created",
  "notification:created",
  "notification:read",
  "notification:all-read",
]);

export function BadgeProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const pathname = usePathname();
  const [badges, setBadges] = useState<Record<string, number>>({});
  const lastMarkedSectionRef = useRef<string | null>(null);

  const fetchCounts = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const response = await fetchWithAuth("/api/badges");
      if (!response.ok) {
        throw new Error(`Badge request failed with ${response.status}`);
      }

      const nextBadges = (await response.json()) as Record<string, number>;
      setBadges(nextBadges || {});
    } catch (error) {
      console.error("Badge fetch error:", error);
    }
  }, [isAuthenticated]);

  const markSectionSeen = useCallback(
    async (path: string) => {
      const section = resolveBadgeSectionPath(path);
      if (!section || !isAuthenticated) return;

      setBadges((prev) => {
        if (!prev[section]) return prev;
        return { ...prev, [section]: 0 };
      });

      try {
        const response = await fetchWithAuth("/api/badges", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: section }),
        });

        if (!response.ok) {
          throw new Error(`Badge update failed with ${response.status}`);
        }

        await fetchCounts();
      } catch (error) {
        console.error("Badge update error:", error);
      }
    },
    [fetchCounts, isAuthenticated]
  );

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      lastMarkedSectionRef.current = null;
      setBadges({});
      return;
    }

    fetchCounts();
  }, [authLoading, isAuthenticated, fetchCounts]);

  useEffect(() => {
    if (authLoading || !isAuthenticated || !pathname) return;

    const section = resolveBadgeSectionPath(pathname);
    if (!section) {
      lastMarkedSectionRef.current = null;
      return;
    }

    if (lastMarkedSectionRef.current === section) return;
    lastMarkedSectionRef.current = section;
    void markSectionSeen(section);
  }, [authLoading, isAuthenticated, pathname, markSectionSeen]);

  useSSE(
    "/api/realtime/events",
    (event) => {
      if (!event?.type || event.type === "ping") return;
      if (!BADGE_EVENT_TYPES.has(String(event.type))) return;
      void fetchCounts();
    },
    isAuthenticated && !authLoading
  );

  const getBadge = useCallback(
    (path: string) => {
      const count = badges[path];
      if (!count || count <= 0) return null;
      return count > 99 ? "99+" : String(count);
    },
    [badges]
  );

  const clearBadge = useCallback(
    (path: string) => {
      void markSectionSeen(path);
    },
    [markSectionSeen]
  );

  const value = useMemo(
    () => ({ badges, getBadge, clearBadge }),
    [badges, getBadge, clearBadge]
  );

  return (
    <BadgeContext.Provider value={value}>{children}</BadgeContext.Provider>
  );
}

export function useBadges() {
  const context = useContext(BadgeContext);
  if (!context) {
    throw new Error("useBadges must be used within a BadgeProvider");
  }
  return context;
}
