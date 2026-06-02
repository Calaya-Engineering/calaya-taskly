"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";
import ChatPanel from "@/components/ChatPanel";

/**
 * Chat trigger button — sits in the dashboard header.
 *
 * Owns the panel's open state and the unread badge. Unread counts are sourced
 * from `/api/chat/channels` whenever (a) the user logs in, (b) an SSE
 * `chat:message` event arrives, or (c) the panel closes.
 */
export default function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  const refreshUnread = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/chat/channels");
      if (!res.ok) return;
      const data = await res.json();
      const list = Array.isArray(data.channels) ? data.channels : [];
      const total = list.reduce(
        (sum: number, c: { unread?: number }) => sum + (Number(c.unread) || 0),
        0,
      );
      setUnread(total);
    } catch {
      /* keep prior value */
    }
  }, []);

  // Initial fetch on mount.
  useEffect(() => {
    refreshUnread();
  }, [refreshUnread]);

  // Live updates — but only when the panel is closed (the panel manages
  // its own refresh while open).
  useSSE(
    "/api/realtime/events",
    (ev) => {
      if (ev?.type === "chat:message" && !open) {
        refreshUnread();
      }
    },
    !open,
  );

  // After the panel closes, do one more refresh so the badge reflects any
  // mark-read activity that happened inside the panel.
  useEffect(() => {
    if (!open) refreshUnread();
  }, [open, refreshUnread]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={unread > 0 ? `Open chat — ${unread} unread` : "Open chat"}
        className="relative inline-flex items-center justify-center h-10 w-10 rounded-2xl hover:bg-gray-100 active:scale-[0.98] transition"
        style={{ color: "var(--primary-blue)" }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {unread > 0 ? (
          <span
            className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{ backgroundColor: "var(--accent-red, #ED3237)" }}
          >
            {unread > 99 ? "99+" : unread}
          </span>
        ) : null}
      </button>

      <ChatPanel
        open={open}
        onClose={() => setOpen(false)}
        onUnreadChange={(total) => setUnread(total)}
      />
    </>
  );
}
