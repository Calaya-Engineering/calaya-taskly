"use client";

import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { fetchWithAuth } from "@/lib/api";

type UserOption = {
  id: number;
  name?: string | null;
  email: string;
  role?: string | null;
  department?: string | null;
};

const TRIGGER = "@";

type Props = {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  minRows?: number;
  className?: string;
  ariaLabel?: string;
};

/**
 * Textarea with @-mention auto-complete.
 *
 * Mentions are stored as `@[Display Name|userId]` tokens in the saved string so they can be
 * resolved server-side (see src/lib/mentions.ts).
 */
export default function MentionInput({
  value,
  onChange,
  placeholder,
  minRows = 3,
  className = "",
  ariaLabel,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [triggerStart, setTriggerStart] = useState<number | null>(null);
  const [options, setOptions] = useState<UserOption[]>([]);
  const [highlight, setHighlight] = useState(0);
  const [loading, setLoading] = useState(false);

  // Lazy-load + filter users when the menu is open.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ limit: "20" });
        if (query) params.set("search", query);
        const res = await fetchWithAuth(`/api/users?${params.toString()}`);
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        const arr: UserOption[] = Array.isArray(data) ? data : [];
        const q = query.toLowerCase().trim();
        const filtered = q
          ? arr
              .filter((u) => {
                const haystack = `${u.name || ""} ${u.email} ${u.role || ""} ${u.department || ""}`.toLowerCase();
                return haystack.includes(q);
              })
              .slice(0, 8)
          : arr.slice(0, 8);
        setOptions(filtered);
        setHighlight(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [open, query]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setQuery("");
    setTriggerStart(null);
  }, []);

  const updateMenuFromCursor = useCallback(
    (text: string, cursor: number) => {
      // Walk backwards from cursor to find a @ that starts the mention query.
      let i = cursor - 1;
      let chars: string[] = [];
      while (i >= 0) {
        const ch = text[i];
        if (ch === TRIGGER) {
          const before = text[i - 1];
          if (i === 0 || !before || /\s|[(\[{,;:!?]/.test(before)) {
            const q = chars.reverse().join("");
            // Cap query length / disallow newlines to keep the menu responsive.
            if (/\n/.test(q) || q.length > 30) {
              closeMenu();
              return;
            }
            setOpen(true);
            setQuery(q);
            setTriggerStart(i);
            return;
          }
          break;
        }
        if (/\s/.test(ch)) {
          closeMenu();
          return;
        }
        chars.push(ch);
        i -= 1;
      }
      closeMenu();
    },
    [closeMenu],
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    onChange(next);
    const cursor = e.target.selectionStart ?? next.length;
    updateMenuFromCursor(next, cursor);
  };

  const insertMention = useCallback(
    (user: UserOption) => {
      const el = textareaRef.current;
      if (!el || triggerStart === null) return;
      const name = (user.name || user.email.split("@")[0]).trim();
      const token = `@[${name}|${user.id}] `;
      const before = value.slice(0, triggerStart);
      const cursor = el.selectionStart ?? value.length;
      const after = value.slice(cursor);
      const next = `${before}${token}${after}`;
      onChange(next);
      closeMenu();
      requestAnimationFrame(() => {
        const pos = (before + token).length;
        el.focus();
        try {
          el.setSelectionRange(pos, pos);
        } catch {
          /* noop */
        }
      });
    },
    [closeMenu, onChange, triggerStart, value],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" || e.key === "Tab") {
      const chosen = options[highlight];
      if (chosen) {
        e.preventDefault();
        insertMention(chosen);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
    }
  };

  const showMenu = open && options.length > 0;
  const visibleHint = useMemo(() => {
    if (!open) return null;
    if (loading) return "Searching…";
    if (options.length === 0) return "No users found";
    return null;
  }, [loading, open, options.length]);

  return (
    <div className={`relative ${className}`}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          // Slight delay so option clicks can register.
          window.setTimeout(closeMenu, 120);
        }}
        rows={minRows}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm"
      />
      {showMenu && (
        <div className="absolute z-30 left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
          {options.map((u, idx) => {
            const name = u.name || u.email.split("@")[0];
            return (
              <button
                key={u.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  insertMention(u);
                }}
                onMouseEnter={() => setHighlight(idx)}
                className={`w-full text-left px-3 py-2 flex items-center gap-2 ${
                  idx === highlight ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: "var(--secondary-blue, #3b82f6)" }}
                >
                  {name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">
                    {name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {u.role || "—"}{u.department ? ` · ${u.department}` : ""}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
      {visibleHint && !showMenu && (
        <div className="absolute z-30 left-0 right-0 mt-1 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-500 shadow">
          {visibleHint}
        </div>
      )}
    </div>
  );
}
