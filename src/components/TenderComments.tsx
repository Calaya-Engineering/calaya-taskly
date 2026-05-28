"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";
import MentionInput from "@/components/MentionInput";
import MentionText from "@/components/MentionText";

type Comment = {
  id: number;
  userId: number;
  name: string;
  email?: string | null;
  role?: string | null;
  department?: string | null;
  content: string;
  contentDisplay?: string;
  createdAt: string;
};

const formatDateTime = (iso: string) => {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const initials = (name: string) =>
  (name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || "")
    .join("") || "?";

type Props = {
  tenderId: string | number | null | undefined;
  /** Visible to all authenticated users — pass current role for nicer UX (e.g. label) */
  currentRole?: string;
};

export default function TenderComments({ tenderId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    if (!tenderId) return;
    setLoading(true);
    try {
      const res = await fetchWithAuth(`/api/tenders/${tenderId}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(Array.isArray(data.comments) ? data.comments : []);
      }
    } catch (err) {
      console.error("Failed to load comments:", err);
    } finally {
      setLoading(false);
    }
  }, [tenderId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async () => {
    const value = draft.trim();
    if (!value) {
      toast.warning("Please write a comment first");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetchWithAuth(`/api/tenders/${tenderId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: value }),
      });
      if (res.ok) {
        const created = await res.json();
        setComments((prev) => [...prev, created]);
        setDraft("");
        toast.success("Comment posted");
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to post comment");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="text-sm text-gray-500 mb-2">
          Comments are visible to all authenticated users. Type <code>@</code> to mention someone.
        </div>
        <MentionInput
          value={draft}
          onChange={setDraft}
          placeholder="Share an update or ask a question…"
          minRows={3}
        />
        <div className="mt-3 flex items-center justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || !draft.trim()}
            className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white transition active:scale-[0.99] disabled:opacity-60"
            style={{ backgroundColor: "var(--primary-blue)" }}
          >
            {submitting ? "Posting…" : "Post comment"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {loading && comments.length === 0 ? (
          <div className="text-sm text-gray-400 text-center py-6">Loading comments…</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <div className="text-3xl mb-2">💬</div>
            <div className="text-sm">No comments yet. Be the first to start the conversation.</div>
          </div>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl border border-gray-200/70 bg-white"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-extrabold shrink-0"
                  style={{ backgroundColor: "var(--secondary-blue)" }}
                  title={c.email || undefined}
                >
                  {initials(c.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-extrabold text-gray-900">{c.name}</span>
                    {c.role && (
                      <span className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">
                        {c.role}
                      </span>
                    )}
                    {c.department && (
                      <span className="text-[10px] text-gray-400">• {c.department}</span>
                    )}
                    <span className="text-xs text-gray-400 ml-auto">
                      {formatDateTime(c.createdAt)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                    <MentionText text={c.content} />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
