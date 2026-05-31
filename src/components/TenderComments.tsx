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
    <div className="space-y-6">
      {/* Composer */}
      <div>
        <div
          className="text-[12px] mb-2"
          style={{ color: "var(--text-tertiary)" }}
        >
          Comments are visible to all authenticated users. Type{" "}
          <kbd
            className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold"
            style={{
              background: "var(--surface-page)",
              border: "1px solid var(--separator-strong)",
              color: "var(--text-secondary)",
            }}
          >
            @
          </kbd>{" "}
          to mention someone.
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
            className="ct-btn ct-btn-primary"
          >
            {submitting ? "Posting…" : "Post comment"}
          </button>
        </div>
      </div>

      {/* Thread */}
      <div className="space-y-3">
        {loading && comments.length === 0 ? (
          <div
            className="text-[13px] text-center py-8"
            style={{ color: "var(--text-tertiary)" }}
          >
            Loading comments…
          </div>
        ) : comments.length === 0 ? (
          <div
            className="text-center py-12"
            style={{ color: "var(--text-tertiary)" }}
          >
            <div className="text-3xl mb-2">💬</div>
            <div className="text-[14px]">
              No comments yet. Start the conversation.
            </div>
          </div>
        ) : (
          comments.map((c) => (
            <article
              key={c.id}
              className="ct-card-flat p-4"
              style={{ animation: "ct-fade-up 320ms var(--ease-apple) both" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                  style={{ backgroundColor: "var(--primary-blue)" }}
                  title={c.email || undefined}
                >
                  {initials(c.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className="text-[13px] font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {c.name}
                    </span>
                    {c.role && (
                      <span
                        className="text-[10px] uppercase tracking-[0.08em] font-semibold"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {c.role}
                      </span>
                    )}
                    {c.department && (
                      <span
                        className="text-[10px]"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        · {c.department}
                      </span>
                    )}
                    <span
                      className="text-[11px] ml-auto"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {formatDateTime(c.createdAt)}
                    </span>
                  </div>
                  <div
                    className="text-[14px] whitespace-pre-wrap break-words"
                    style={{ color: "var(--text-primary)", lineHeight: 1.55 }}
                  >
                    <MentionText text={c.content} />
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
