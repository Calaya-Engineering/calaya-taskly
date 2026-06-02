"use client";

import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";

/* ─── Types ──────────────────────────────────────────────────────── */

type Channel = {
  id: number;
  type: "DEPARTMENT" | "DIRECT";
  name: string;
  departmentName: string | null;
  counterpart: {
    id: number;
    name: string;
    role: string | null;
    department: string | null;
  } | null;
  memberCount: number;
  lastMessage:
    | {
        id: number;
        content: string;
        createdAt: string;
        sender: { id: number; name: string };
      }
    | null;
  unread: number;
  updatedAt: string;
};

type Message = {
  id: number;
  content: string;
  createdAt: string;
  editedAt: string | null;
  sender: { id: number; name: string; role: string | null };
  mine: boolean;
};

type PersonHit = {
  id: number;
  name: string;
  email: string;
  role: string | null;
  department: string | null;
};

/* ─── Helpers ────────────────────────────────────────────────────── */

const initials = (name: string) =>
  (name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || "")
    .join("") || "?";

const fmtTime = (iso: string) => {
  try {
    return new Date(iso).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

const fmtRelative = (iso: string) => {
  try {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "now";
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d`;
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
};

/* ─── Component ──────────────────────────────────────────────────── */

type Props = {
  open: boolean;
  onClose: () => void;
  /** Called whenever the channel list refreshes so parents can refresh badges */
  onUnreadChange?: (totalUnread: number) => void;
};

export default function ChatPanel({ open, onClose, onUnreadChange }: Props) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannelId, setActiveChannelId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [view, setView] = useState<"channels" | "search">("channels");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PersonHit[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  /* ── Fetchers ─────────────────────────────── */

  const fetchChannels = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/chat/channels");
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to load chats");
      }
      const data = await res.json();
      const list: Channel[] = Array.isArray(data.channels) ? data.channels : [];
      setChannels(list);
      const totalUnread = list.reduce((sum, c) => sum + (c.unread || 0), 0);
      onUnreadChange?.(totalUnread);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load chats");
    }
  }, [onUnreadChange]);

  const fetchMessages = useCallback(async (channelId: number) => {
    setMessagesLoading(true);
    try {
      const res = await fetchWithAuth(`/api/chat/channels/${channelId}/messages?limit=50`);
      if (res.ok) {
        const data = await res.json();
        // API returns newest-first; reverse for chronological display.
        const list: Message[] = Array.isArray(data.messages) ? [...data.messages].reverse() : [];
        setMessages(list);
      }
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  const markRead = useCallback(async (channelId: number) => {
    await fetchWithAuth(`/api/chat/channels/${channelId}/read`, { method: "POST" });
  }, []);

  /* ── Lifecycle ────────────────────────────── */

  // Load channels when panel opens.
  useEffect(() => {
    if (!open) return;
    fetchChannels();
  }, [open, fetchChannels]);

  // Load messages whenever the active channel changes.
  useEffect(() => {
    if (activeChannelId == null) return;
    fetchMessages(activeChannelId);
    markRead(activeChannelId).then(() => fetchChannels());
  }, [activeChannelId, fetchMessages, markRead, fetchChannels]);

  // Auto-scroll to the bottom on new messages.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  // Listen for new chat messages anywhere — refetch channels (+ messages if active).
  useSSE(
    "/api/realtime/events",
    (ev) => {
      if (!ev?.type) return;
      if (ev.type === "chat:message") {
        fetchChannels();
        if (activeChannelId && Number(ev.entityId) === activeChannelId) {
          fetchMessages(activeChannelId);
          markRead(activeChannelId);
        }
      }
    },
    open,
  );

  /* ── Search ───────────────────────────────── */

  useEffect(() => {
    if (view !== "search") return;
    let cancelled = false;
    setSearchLoading(true);
    const handle = window.setTimeout(async () => {
      try {
        const res = await fetchWithAuth(
          `/api/chat/users/search?q=${encodeURIComponent(searchQuery)}&limit=20`,
        );
        if (!cancelled && res.ok) {
          const data = await res.json();
          setSearchResults(Array.isArray(data.users) ? data.users : []);
        }
      } finally {
        if (!cancelled) setSearchLoading(false);
      }
    }, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [view, searchQuery]);

  const startDirect = async (userId: number) => {
    try {
      const res = await fetchWithAuth("/api/chat/channels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (res.ok) {
        const { channelId } = await res.json();
        await fetchChannels();
        setActiveChannelId(channelId);
        setView("channels");
      }
    } catch {
      // toast?
    }
  };

  /* ── Compose ──────────────────────────────── */

  const sendMessage = async () => {
    const content = draft.trim();
    if (!content || activeChannelId == null || sending) return;
    setSending(true);
    try {
      const res = await fetchWithAuth(
        `/api/chat/channels/${activeChannelId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        },
      );
      if (res.ok) {
        const message: Message = await res.json();
        setMessages((prev) => [...prev, { ...message, mine: true }]);
        setDraft("");
        // Channel list re-sorts on next refetch (SSE will trigger).
        fetchChannels();
      }
    } finally {
      setSending(false);
    }
  };

  const onComposerKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ── Derived ──────────────────────────────── */

  const activeChannel = useMemo(
    () => channels.find((c) => c.id === activeChannelId) || null,
    [channels, activeChannelId],
  );

  /* ── Render ───────────────────────────────── */

  // Backdrop + slide-in panel. Hidden via translate when closed so the
  // unmount doesn't lose state mid-conversation.
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Chat"
        className={`fixed top-0 right-0 z-[61] h-full bg-white border-l border-gray-200 shadow-2xl flex flex-col transition-transform duration-200 ease-out
          w-full sm:w-[420px]
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2">
            {activeChannelId != null ? (
              <button
                type="button"
                onClick={() => setActiveChannelId(null)}
                className="inline-flex items-center justify-center h-8 w-8 rounded-xl hover:bg-gray-100"
                aria-label="Back to channels"
              >
                ←
              </button>
            ) : null}
            <div>
              <div className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                {activeChannel
                  ? activeChannel.name
                  : view === "search"
                    ? "Find people"
                    : "Chats"}
              </div>
              <div className="text-[11px] text-gray-500">
                {activeChannel
                  ? activeChannel.type === "DEPARTMENT"
                    ? `${activeChannel.memberCount} member${activeChannel.memberCount === 1 ? "" : "s"}`
                    : activeChannel.counterpart?.role || ""
                  : view === "search"
                    ? "Search by name, role, or department"
                    : "Department & direct messages"}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 text-gray-500"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        {/* Tab strip (when no active channel) */}
        {activeChannelId == null ? (
          <div className="flex items-center gap-1 p-2 border-b border-gray-100">
            <button
              type="button"
              onClick={() => setView("channels")}
              className={`flex-1 h-9 rounded-xl text-sm font-semibold transition ${
                view === "channels"
                  ? "bg-blue-50 text-[color:var(--primary-blue)]"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              My chats
            </button>
            <button
              type="button"
              onClick={() => setView("search")}
              className={`flex-1 h-9 rounded-xl text-sm font-semibold transition ${
                view === "search"
                  ? "bg-blue-50 text-[color:var(--primary-blue)]"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Find people
            </button>
          </div>
        ) : null}

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {error ? (
            <div className="m-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {activeChannelId == null && view === "channels" ? (
            <ChannelList
              channels={channels}
              onSelect={setActiveChannelId}
              emptyMessage={
                channels.length === 0
                  ? "No chats yet. Find someone to message."
                  : ""
              }
            />
          ) : null}

          {activeChannelId == null && view === "search" ? (
            <SearchPanel
              query={searchQuery}
              onQueryChange={setSearchQuery}
              results={searchResults}
              loading={searchLoading}
              onPick={startDirect}
            />
          ) : null}

          {activeChannelId != null ? (
            <>
              <MessageList
                loading={messagesLoading}
                messages={messages}
                channelType={activeChannel?.type}
              />
              <div ref={messagesEndRef} />
              <div className="border-t border-gray-200 bg-white p-3">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={onComposerKey}
                  rows={2}
                  placeholder="Write a message…  (Enter to send · Shift+Enter for newline)"
                  disabled={sending}
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">
                    {draft.length}/4000
                  </span>
                  <button
                    type="button"
                    onClick={sendMessage}
                    disabled={!draft.trim() || sending}
                    className="px-4 py-2 rounded-2xl text-sm font-semibold text-white transition active:scale-[0.99] disabled:opacity-60"
                    style={{ backgroundColor: "var(--primary-blue)" }}
                  >
                    {sending ? "Sending…" : "Send"}
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </aside>
    </>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────── */

function ChannelList({
  channels,
  onSelect,
  emptyMessage,
}: {
  channels: Channel[];
  onSelect: (id: number) => void;
  emptyMessage?: string;
}) {
  if (channels.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-gray-500 p-8 text-center">
        {emptyMessage || "Loading chats…"}
      </div>
    );
  }

  return (
    <ul className="flex-1 overflow-y-auto divide-y divide-gray-100">
      {channels.map((c) => (
        <li key={c.id}>
          <button
            type="button"
            onClick={() => onSelect(c.id)}
            className="w-full flex items-start gap-3 p-3 hover:bg-gray-50 transition text-left"
          >
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center text-white text-xs font-extrabold shrink-0"
              style={{
                backgroundColor:
                  c.type === "DEPARTMENT"
                    ? "var(--primary-blue)"
                    : "var(--secondary-blue, #6DC6DF)",
              }}
            >
              {c.type === "DEPARTMENT" ? "#" : initials(c.counterpart?.name || c.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-extrabold text-gray-900 truncate">
                  {c.name}
                </span>
                <span className="text-[11px] text-gray-400 shrink-0">
                  {c.lastMessage ? fmtRelative(c.lastMessage.createdAt) : ""}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <span className="text-xs text-gray-500 truncate">
                  {c.lastMessage
                    ? `${c.lastMessage.sender.name}: ${c.lastMessage.content}`
                    : c.type === "DEPARTMENT"
                      ? "Department channel"
                      : c.counterpart?.role || "Direct message"}
                </span>
                {c.unread > 0 ? (
                  <span
                    className="shrink-0 h-5 min-w-[20px] px-1.5 rounded-full inline-flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: "var(--accent-red, #ED3237)" }}
                  >
                    {c.unread > 99 ? "99+" : c.unread}
                  </span>
                ) : null}
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

function SearchPanel({
  query,
  onQueryChange,
  results,
  loading,
  onPick,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  results: PersonHit[];
  loading: boolean;
  onPick: (userId: number) => void;
}) {
  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="p-3 border-b border-gray-100">
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Name, role, or department…"
          className="w-full h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          autoFocus
        />
      </div>
      <ul className="flex-1 overflow-y-auto divide-y divide-gray-100">
        {loading ? (
          <li className="p-6 text-center text-sm text-gray-500">Searching…</li>
        ) : results.length === 0 ? (
          <li className="p-6 text-center text-sm text-gray-500">
            {query ? "No matches" : "Start typing to find someone"}
          </li>
        ) : (
          results.map((u) => (
            <li key={u.id}>
              <button
                type="button"
                onClick={() => onPick(u.id)}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition text-left"
              >
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-extrabold shrink-0"
                  style={{ backgroundColor: "var(--secondary-blue, #6DC6DF)" }}
                >
                  {initials(u.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-extrabold text-gray-900 truncate">
                    {u.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {[u.role, u.department].filter(Boolean).join(" · ") || u.email}
                  </div>
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--primary-blue)" }}
                >
                  Chat
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function MessageList({
  loading,
  messages,
  channelType,
}: {
  loading: boolean;
  messages: Message[];
  channelType?: "DEPARTMENT" | "DIRECT";
}) {
  if (loading && messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
        Loading messages…
      </div>
    );
  }
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-gray-500 p-6 text-center">
        No messages yet. Say hi 👋
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
      {messages.map((m, idx) => {
        const prev = messages[idx - 1];
        const sameSender = prev && prev.sender.id === m.sender.id;
        const showHeader = !sameSender && !m.mine;

        return (
          <div
            key={m.id}
            className={`flex ${m.mine ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-[78%]">
              {showHeader && channelType === "DEPARTMENT" ? (
                <div className="text-[11px] text-gray-500 mb-0.5 ml-2">
                  {m.sender.name}
                  {m.sender.role ? ` · ${m.sender.role}` : ""}
                </div>
              ) : null}
              <div
                className={`rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                  m.mine
                    ? "rounded-br-md text-white"
                    : "rounded-bl-md bg-gray-100 text-gray-900"
                }`}
                style={m.mine ? { backgroundColor: "var(--primary-blue)" } : undefined}
              >
                {m.content}
              </div>
              <div
                className={`text-[10px] text-gray-400 mt-0.5 ${m.mine ? "text-right mr-2" : "ml-2"}`}
              >
                {fmtTime(m.createdAt)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
