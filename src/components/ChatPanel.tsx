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

type MessageStatus = "sending" | "sent" | "failed";

type Message = {
  id: number;
  content: string;
  createdAt: string;
  editedAt: string | null;
  sender: { id: number; name: string; role: string | null };
  mine: boolean;
  /** Client-side delivery state for optimistic UI. Server messages are always "sent". */
  status?: MessageStatus;
  /** Stable client key — survives the optimistic→server id swap. */
  clientId?: string;
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
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
};

const fmtListTime = (iso: string) => {
  try {
    const d = new Date(iso);
    const now = new Date();
    const sameDay =
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate();
    if (sameDay) {
      return d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    const oneDay = 86400000;
    if (now.getTime() - d.getTime() < 7 * oneDay) {
      return d.toLocaleDateString("en-US", { weekday: "short" });
    }
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
};

const dayKey = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

const formatDayHeader = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  const yesterday = new Date(now.getTime() - 86400000);
  const isYesterday =
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate();

  if (sameDay) {
    return `Today, ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  }
  if (isYesterday) {
    return `Yesterday, ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  }
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
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
  const [listFilter, setListFilter] = useState("");
  const [error, setError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesScrollRef = useRef<HTMLDivElement | null>(null);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  /**
   * True when the user is within ~80px of the bottom. When false, incoming
   * messages don't auto-scroll — they get a "new messages" pill instead.
   */
  const stickToBottomRef = useRef(true);
  const [hasUnreadBelow, setHasUnreadBelow] = useState(false);

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

  useEffect(() => {
    if (!open) return;
    fetchChannels();
  }, [open, fetchChannels]);

  useEffect(() => {
    if (activeChannelId == null) return;
    fetchMessages(activeChannelId);
    markRead(activeChannelId).then(() => fetchChannels());
  }, [activeChannelId, fetchMessages, markRead, fetchChannels]);

  // Auto-scroll only when the user is already pinned to the bottom; otherwise
  // surface a "new messages" pill so we don't yank them away from history.
  useEffect(() => {
    if (stickToBottomRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      setHasUnreadBelow(false);
    } else if (messages.length > 0) {
      const last = messages[messages.length - 1];
      if (!last.mine) setHasUnreadBelow(true);
    }
  }, [messages]);

  const handleMessagesScroll = useCallback(() => {
    const el = messagesScrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    stickToBottomRef.current = distanceFromBottom < 80;
    if (stickToBottomRef.current) setHasUnreadBelow(false);
  }, []);

  const jumpToBottom = useCallback(() => {
    stickToBottomRef.current = true;
    setHasUnreadBelow(false);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  // Auto-grow the composer as the user types.
  useEffect(() => {
    const el = composerRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [draft]);

  // Reset scroll anchor when switching channels.
  useEffect(() => {
    stickToBottomRef.current = true;
    setHasUnreadBelow(false);
  }, [activeChannelId]);

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
      /* noop */
    }
  };

  /* ── Compose ──────────────────────────────── */

  const sendMessage = async () => {
    const content = draft.trim();
    if (!content || activeChannelId == null) return;

    // Optimistic UI: render the message instantly with status="sending".
    const clientId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const optimistic: Message = {
      id: -Date.now(), // negative so it can't collide with a server id
      clientId,
      content,
      createdAt: new Date().toISOString(),
      editedAt: null,
      sender: { id: -1, name: "You", role: null },
      mine: true,
      status: "sending",
    };
    setMessages((prev) => [...prev, optimistic]);
    setDraft("");
    stickToBottomRef.current = true; // always glue to bottom on send
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
        // Reconcile: replace the optimistic row in place so the bubble
        // doesn't jump or duplicate.
        setMessages((prev) =>
          prev.map((m) =>
            m.clientId === clientId
              ? { ...message, mine: true, status: "sent", clientId }
              : m,
          ),
        );
        fetchChannels();
      } else {
        setMessages((prev) =>
          prev.map((m) => (m.clientId === clientId ? { ...m, status: "failed" } : m)),
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) => (m.clientId === clientId ? { ...m, status: "failed" } : m)),
      );
    } finally {
      setSending(false);
    }
  };

  const retryMessage = async (clientId: string) => {
    const target = messages.find((m) => m.clientId === clientId);
    if (!target || activeChannelId == null) return;
    setMessages((prev) =>
      prev.map((m) => (m.clientId === clientId ? { ...m, status: "sending" } : m)),
    );
    try {
      const res = await fetchWithAuth(
        `/api/chat/channels/${activeChannelId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: target.content }),
        },
      );
      if (res.ok) {
        const message: Message = await res.json();
        setMessages((prev) =>
          prev.map((m) =>
            m.clientId === clientId
              ? { ...message, mine: true, status: "sent", clientId }
              : m,
          ),
        );
        fetchChannels();
      } else {
        setMessages((prev) =>
          prev.map((m) => (m.clientId === clientId ? { ...m, status: "failed" } : m)),
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) => (m.clientId === clientId ? { ...m, status: "failed" } : m)),
      );
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

  const filteredChannels = useMemo(() => {
    const q = listFilter.trim().toLowerCase();
    if (!q) return channels;
    return channels.filter((c) =>
      [c.name, c.lastMessage?.content, c.counterpart?.role, c.counterpart?.department]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q)),
    );
  }, [channels, listFilter]);

  /* ── Render ───────────────────────────────── */

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] transition-all duration-300 ease-out ${
          open
            ? "opacity-100 pointer-events-auto bg-slate-900/40 backdrop-blur-md"
            : "opacity-0 pointer-events-none bg-transparent backdrop-blur-0"
        }`}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Chat"
        className={`fixed inset-y-0 right-0 z-[61] bg-white shadow-2xl flex flex-col overflow-hidden
          w-full sm:w-[440px] sm:border-l sm:border-gray-200
          ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{
          height: "100dvh",
          maxHeight: "100dvh",
          transition: "transform 320ms cubic-bezier(0.32, 0.72, 0, 1)",
          willChange: "transform",
        }}
      >
        {activeChannelId != null ? (
          <ConversationView
            channel={activeChannel}
            messages={messages}
            messagesLoading={messagesLoading}
            messagesEndRef={messagesEndRef}
            messagesScrollRef={messagesScrollRef}
            composerRef={composerRef}
            hasUnreadBelow={hasUnreadBelow}
            draft={draft}
            sending={sending}
            onDraftChange={setDraft}
            onSend={sendMessage}
            onRetry={retryMessage}
            onComposerKey={onComposerKey}
            onMessagesScroll={handleMessagesScroll}
            onJumpToBottom={jumpToBottom}
            onBack={() => setActiveChannelId(null)}
            onClose={onClose}
          />
        ) : (
          <ListView
            view={view}
            setView={setView}
            error={error}
            channels={filteredChannels}
            allChannelsCount={channels.length}
            listFilter={listFilter}
            onListFilterChange={setListFilter}
            onSelectChannel={setActiveChannelId}
            onClose={onClose}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            searchResults={searchResults}
            searchLoading={searchLoading}
            onPickPerson={startDirect}
          />
        )}
      </aside>
    </>
  );
}

/* ─── List View ─────────────────────────────────────────────────── */

function ListView({
  view,
  setView,
  error,
  channels,
  allChannelsCount,
  listFilter,
  onListFilterChange,
  onSelectChannel,
  onClose,
  searchQuery,
  onSearchQueryChange,
  searchResults,
  searchLoading,
  onPickPerson,
}: {
  view: "channels" | "search";
  setView: (v: "channels" | "search") => void;
  error: string;
  channels: Channel[];
  allChannelsCount: number;
  listFilter: string;
  onListFilterChange: (v: string) => void;
  onSelectChannel: (id: number) => void;
  onClose: () => void;
  searchQuery: string;
  onSearchQueryChange: (v: string) => void;
  searchResults: PersonHit[];
  searchLoading: boolean;
  onPickPerson: (userId: number) => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="shrink-0 px-4 pt-4 pb-3 flex items-center justify-between border-b border-gray-100">
        <h2
          className="text-xl font-extrabold tracking-tight"
          style={{ color: "var(--primary-blue, #2C4B9B)" }}
        >
          Messages
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setView("search")}
            aria-label="New message"
            className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-[0.97] transition flex items-center justify-center text-gray-500"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setView(view === "search" ? "channels" : "search")}
            aria-label="Search"
            className={`h-9 w-9 rounded-full active:scale-[0.97] transition flex items-center justify-center ${
              view === "search"
                ? "bg-blue-50 text-[color:var(--primary-blue)]"
                : "bg-gray-100 hover:bg-gray-200 text-gray-500"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-[0.97] transition flex items-center justify-center text-gray-500"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter pill row */}
      {view === "channels" ? (
        <div className="shrink-0 px-4 pt-3 pb-2">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              value={listFilter}
              onChange={(e) => onListFilterChange(e.target.value)}
              placeholder="Search your chats"
              className="w-full h-10 pl-9 pr-3 rounded-2xl bg-gray-100 border-0 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="shrink-0 mx-4 mb-3 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          {error}
        </div>
      ) : null}

      {view === "channels" ? (
        <div className="flex-1 min-h-0 flex flex-col">
          {allChannelsCount > 0 ? (
            <div className="shrink-0 px-4 pb-1 pt-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-gray-400 font-semibold">
              <span>All conversations</span>
              <span className="text-gray-300">·</span>
              <span>{allChannelsCount}</span>
            </div>
          ) : null}
          <ChannelList
            channels={channels}
            onSelect={onSelectChannel}
            emptyMessage={
              allChannelsCount === 0
                ? "No chats yet."
                : "No chats match your search."
            }
            emptyHint={
              allChannelsCount === 0
                ? "Tap the search icon above to find a colleague to message."
                : undefined
            }
          />
        </div>
      ) : (
        <SearchPanel
          query={searchQuery}
          onQueryChange={onSearchQueryChange}
          results={searchResults}
          loading={searchLoading}
          onPick={onPickPerson}
        />
      )}
    </>
  );
}

/* ─── Channel rows ──────────────────────────────────────────────── */

function ChannelList({
  channels,
  onSelect,
  emptyMessage,
  emptyHint,
}: {
  channels: Channel[];
  onSelect: (id: number) => void;
  emptyMessage?: string;
  emptyHint?: string;
}) {
  if (channels.length === 0) {
    return (
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-center px-6 py-10">
        <div
          className="h-14 w-14 rounded-2xl flex items-center justify-center mb-3"
          style={{ backgroundColor: "rgba(44, 75, 155, 0.10)", color: "var(--primary-blue, #2C4B9B)" }}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div className="text-sm font-extrabold text-gray-900">
          {emptyMessage || "No chats"}
        </div>
        {emptyHint ? (
          <p className="text-xs text-gray-500 mt-1 max-w-[240px]">{emptyHint}</p>
        ) : null}
      </div>
    );
  }

  return (
    <ul className="flex-1 min-h-0 overflow-y-auto px-2 pb-3">
      {channels.map((c) => (
        <li key={c.id}>
          <button
            type="button"
            onClick={() => onSelect(c.id)}
            className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition text-left"
          >
            <ChannelAvatar channel={c} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[15px] font-extrabold text-gray-900 truncate">
                  {c.name}
                </span>
                <span className="text-[11px] text-gray-400 shrink-0 font-semibold">
                  {c.lastMessage ? fmtListTime(c.lastMessage.createdAt) : ""}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <span
                  className={`text-[13px] truncate ${
                    c.unread > 0 ? "text-gray-800 font-semibold" : "text-gray-500"
                  }`}
                >
                  {c.lastMessage
                    ? c.type === "DEPARTMENT"
                      ? `${c.lastMessage.sender.name}: ${c.lastMessage.content}`
                      : c.lastMessage.content
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

function ChannelAvatar({ channel }: { channel: Channel }) {
  const isDept = channel.type === "DEPARTMENT";
  const label = isDept
    ? "#"
    : initials(channel.counterpart?.name || channel.name);

  const bg = isDept ? "var(--primary-blue)" : "var(--secondary-blue, #6DC6DF)";

  return (
    <div className="relative shrink-0">
      <div
        className="h-12 w-12 rounded-full flex items-center justify-center text-white text-sm font-extrabold"
        style={{ backgroundColor: bg }}
      >
        {label}
      </div>
      {!isDept ? (
        <span
          className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full ring-2 ring-white"
          style={{ backgroundColor: "#22c55e" }}
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}

/* ─── People Search ─────────────────────────────────────────────── */

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
      <div className="shrink-0 px-4 pt-3 pb-2">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </span>
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Name, role, or department"
            className="w-full h-10 pl-9 pr-3 rounded-2xl bg-gray-100 border-0 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            autoFocus
          />
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto px-2 pb-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-7 w-7 rounded-full border-2 border-gray-200 border-t-[color:var(--primary-blue,#2C4B9B)] animate-spin mb-3" />
            <div className="text-sm font-semibold text-gray-700">Searching…</div>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center px-6 py-12">
            <div
              className="h-14 w-14 rounded-2xl flex items-center justify-center mb-3"
              style={{
                backgroundColor: "rgba(44, 75, 155, 0.10)",
                color: "var(--primary-blue, #2C4B9B)",
              }}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <div className="text-sm font-extrabold text-gray-900">
              {query ? "No matches" : "Find someone to chat with"}
            </div>
            <p className="text-xs text-gray-500 mt-1 max-w-[240px]">
              {query
                ? "Try a different name, role, or department."
                : "Search by name, role, or department to start a direct message."}
            </p>
          </div>
        ) : (
          <ul>
            {results.map((u) => (
            <li key={u.id}>
              <button
                type="button"
                onClick={() => onPick(u.id)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition text-left"
              >
                <div className="relative shrink-0">
                  <div
                    className="h-11 w-11 rounded-full flex items-center justify-center text-white text-sm font-extrabold"
                    style={{ backgroundColor: "var(--secondary-blue, #6DC6DF)" }}
                  >
                    {initials(u.name)}
                  </div>
                  <span
                    className="absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white"
                    style={{ backgroundColor: "#22c55e" }}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-extrabold text-gray-900 truncate">
                    {u.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {[u.role, u.department].filter(Boolean).join(" · ") || u.email}
                  </div>
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "var(--primary-blue)" }}
                >
                  Chat
                </span>
              </button>
            </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ─── Conversation View ──────────────────────────────────────────── */

function ConversationView({
  channel,
  messages,
  messagesLoading,
  messagesEndRef,
  messagesScrollRef,
  composerRef,
  hasUnreadBelow,
  draft,
  sending,
  onDraftChange,
  onSend,
  onRetry,
  onComposerKey,
  onMessagesScroll,
  onJumpToBottom,
  onBack,
  onClose,
}: {
  channel: Channel | null;
  messages: Message[];
  messagesLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  messagesScrollRef: React.RefObject<HTMLDivElement | null>;
  composerRef: React.RefObject<HTMLTextAreaElement | null>;
  hasUnreadBelow: boolean;
  draft: string;
  sending: boolean;
  onDraftChange: (v: string) => void;
  onSend: () => void;
  onRetry: (clientId: string) => void;
  onComposerKey: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onMessagesScroll: () => void;
  onJumpToBottom: () => void;
  onBack: () => void;
  onClose: () => void;
}) {
  const isDept = channel?.type === "DEPARTMENT";
  const headerAvatar = isDept ? "#" : initials(channel?.counterpart?.name || channel?.name || "?");

  return (
    <>
      {/* Conversation header */}
      <div className="px-3 py-3 flex items-center gap-2 border-b border-gray-100 bg-white">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to messages"
          className="h-9 w-9 rounded-full hover:bg-gray-100 active:scale-[0.97] transition flex items-center justify-center text-gray-500"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="relative shrink-0">
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center text-white text-xs font-extrabold"
            style={{
              backgroundColor: isDept
                ? "var(--primary-blue)"
                : "var(--secondary-blue, #6DC6DF)",
            }}
          >
            {headerAvatar}
          </div>
          {!isDept ? (
            <span
              className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white"
              style={{ backgroundColor: "#22c55e" }}
              aria-hidden="true"
            />
          ) : null}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-extrabold text-gray-900 truncate">
            {channel?.name || "Chat"}
          </div>
          <div className="text-[11px] text-gray-500 truncate">
            {isDept
              ? `${channel?.memberCount ?? 0} member${(channel?.memberCount ?? 0) === 1 ? "" : "s"} • Department channel`
              : (
                <>
                  <span
                    className="inline-flex items-center gap-1"
                    style={{ color: "#22c55e" }}
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                    Active now
                  </span>
                  {channel?.counterpart?.role ? (
                    <span className="text-gray-400"> · {channel.counterpart.role}</span>
                  ) : null}
                </>
              )}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-[0.97] transition flex items-center justify-center text-gray-500"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="relative flex-1 min-h-0 flex flex-col">
        <MessageList
          loading={messagesLoading}
          messages={messages}
          channelType={channel?.type}
          messagesEndRef={messagesEndRef}
          messagesScrollRef={messagesScrollRef}
          onScroll={onMessagesScroll}
          onRetry={onRetry}
        />
        {hasUnreadBelow ? (
          <button
            type="button"
            onClick={onJumpToBottom}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg active:scale-[0.97] transition"
            style={{ backgroundColor: "var(--primary-blue, #2C4B9B)" }}
          >
            New messages ↓
          </button>
        ) : null}
      </div>

      {/* Composer */}
      <div className="shrink-0 bg-white border-t border-gray-100 p-3">
        <div
          className={`flex items-end gap-2 rounded-3xl bg-gray-100 p-2 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100`}
        >
          <textarea
            ref={composerRef}
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            onKeyDown={onComposerKey}
            rows={1}
            placeholder="Type a message"
            className="flex-1 max-h-40 min-h-[36px] resize-none bg-transparent border-0 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none"
            style={{ overflowY: "auto" }}
          />
          <button
            type="button"
            onClick={onSend}
            disabled={!draft.trim() || sending}
            aria-label="Send message"
            className="shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-white transition-all duration-150 active:scale-[0.92] disabled:opacity-40 hover:brightness-110"
            style={{ backgroundColor: "var(--primary-blue, #2C4B9B)" }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[10px] text-gray-400 px-2">
          <span>Enter to send · Shift+Enter for newline</span>
          <span>{draft.length}/4000</span>
        </div>
      </div>
    </>
  );
}

/* ─── Message bubbles ───────────────────────────────────────────── */

function MessageList({
  loading,
  messages,
  channelType,
  messagesEndRef,
  messagesScrollRef,
  onScroll,
  onRetry,
}: {
  loading: boolean;
  messages: Message[];
  channelType?: "DEPARTMENT" | "DIRECT";
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  messagesScrollRef: React.RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  onRetry: (clientId: string) => void;
}) {
  if (loading && messages.length === 0) {
    return (
      <div
        className="flex-1 flex items-center justify-center text-sm text-gray-400"
        style={{ backgroundColor: "#f5f7fa" }}
      >
        Loading messages…
      </div>
    );
  }
  if (messages.length === 0) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center text-center p-8"
        style={{ backgroundColor: "#f5f7fa" }}
      >
        <div className="text-4xl mb-2">👋</div>
        <div className="text-sm font-extrabold text-gray-900">No messages yet</div>
        <div className="text-xs text-gray-500 mt-1">
          Start the conversation — say hi.
        </div>
      </div>
    );
  }

  return (
    <div
      ref={messagesScrollRef}
      onScroll={onScroll}
      className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-1"
      style={{ backgroundColor: "#f5f7fa" }}
    >
      {messages.map((m, idx) => {
        const prev = messages[idx - 1];
        const sameSender = prev && prev.sender.id === m.sender.id && prev.mine === m.mine;
        const isDayBoundary = !prev || dayKey(prev.createdAt) !== dayKey(m.createdAt);
        const showHeader = !sameSender && !m.mine && channelType === "DEPARTMENT";
        const showAvatar = !sameSender && !m.mine;

        return (
          <div key={m.id}>
            {isDayBoundary ? (
              <div className="flex justify-center my-3">
                <span className="text-[11px] font-semibold text-gray-500 bg-white rounded-full px-3 py-1 shadow-sm">
                  {formatDayHeader(m.createdAt)}
                </span>
              </div>
            ) : null}

            {showHeader ? (
              <div className="text-[11px] text-gray-500 mb-1 ml-12">
                {m.sender.name}
                {m.sender.role ? (
                  <span className="text-gray-400"> · {m.sender.role}</span>
                ) : null}
              </div>
            ) : null}

            <div
              className={`flex items-end gap-2 ${m.mine ? "justify-end" : "justify-start"} ${
                sameSender ? "mt-0.5" : "mt-2"
              }`}
            >
              {!m.mine ? (
                <div className="w-8 shrink-0">
                  {showAvatar ? (
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center text-white text-[10px] font-extrabold"
                      style={{ backgroundColor: "var(--secondary-blue, #6DC6DF)" }}
                    >
                      {initials(m.sender.name)}
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className={`max-w-[78%] ${m.mine ? "items-end" : "items-start"} ct-msg-in`}>
                <div
                  className={`px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words shadow-sm transition-opacity ${
                    m.mine
                      ? "rounded-2xl rounded-br-md text-white"
                      : "rounded-2xl rounded-bl-md bg-white text-gray-900"
                  } ${m.status === "sending" ? "opacity-75" : ""} ${
                    m.status === "failed" ? "ring-2 ring-red-300" : ""
                  }`}
                  style={m.mine ? { backgroundColor: "var(--primary-blue, #2C4B9B)" } : undefined}
                >
                  {m.content}
                </div>
                <div
                  className={`text-[10px] mt-0.5 flex items-center gap-1 ${
                    m.mine ? "justify-end pr-1" : "pl-1"
                  } ${m.status === "failed" ? "text-red-500" : "text-gray-400"}`}
                >
                  <span>{fmtTime(m.createdAt)}</span>
                  {m.mine ? (
                    <>
                      <span className="text-gray-300">·</span>
                      {m.status === "sending" ? (
                        <span className="inline-flex items-center gap-1">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-400 animate-pulse" />
                          Sending
                        </span>
                      ) : m.status === "failed" ? (
                        <button
                          type="button"
                          onClick={() => m.clientId && onRetry(m.clientId)}
                          className="font-bold underline hover:no-underline"
                        >
                          Failed — retry
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-gray-400">
                          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          Sent
                        </span>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
