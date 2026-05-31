"use client";

import { Fragment } from "react";

const MENTION_RE = /@\[([^|\]]+)\|(\d+)\]/g;

type Props = {
  text: string | null | undefined;
  className?: string;
};

/**
 * Renders text containing @[Name|userId] mention tokens as styled inline chips.
 */
export default function MentionText({ text, className = "" }: Props) {
  if (!text) return null;

  const parts: Array<{ type: "text" | "mention"; content: string; userId?: number }> = [];
  let cursor = 0;

  for (const match of text.matchAll(MENTION_RE)) {
    const start = match.index ?? 0;
    if (start > cursor) {
      parts.push({ type: "text", content: text.slice(cursor, start) });
    }
    const userId = Number.parseInt(match[2] || "", 10);
    parts.push({
      type: "mention",
      content: (match[1] || "").trim(),
      userId: Number.isFinite(userId) ? userId : undefined,
    });
    cursor = start + match[0].length;
  }
  if (cursor < text.length) {
    parts.push({ type: "text", content: text.slice(cursor) });
  }

  return (
    <span className={className}>
      {parts.map((part, idx) =>
        part.type === "mention" ? (
          <span
            key={idx}
            className="inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded-md font-semibold text-[12px]"
            style={{
              backgroundColor: "var(--primary-blue-100)",
              color: "var(--primary-blue)",
            }}
            title={part.userId ? `User #${part.userId}` : undefined}
          >
            @{part.content}
          </span>
        ) : (
          <Fragment key={idx}>{part.content}</Fragment>
        ),
      )}
    </span>
  );
}
