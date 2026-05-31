"use client";

import { useCallback, useEffect, useState } from "react";
import { Check } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";

type Ack = {
  id: number;
  userId: number;
  name: string;
  email?: string | null;
  role?: string | null;
  department?: string | null;
  acknowledgedAt: string;
};

type State = {
  count: number;
  acknowledgedByMe: boolean;
  acknowledgements: Ack[];
};

const formatDate = (iso: string) => {
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

type Props = {
  taskId: number | string | null | undefined;
  showList?: boolean;
  /** If true, current user is treated as the creator/manager (sees the full list) */
  isManager?: boolean;
  itemLabel?: string;
};

export default function EventAcknowledgement({
  taskId,
  showList = false,
  isManager = false,
  itemLabel = "event",
}: Props) {
  const [state, setState] = useState<State | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const numericId = typeof taskId === "string" ? Number.parseInt(taskId, 10) : taskId;

  const fetchState = useCallback(async () => {
    if (!numericId || !Number.isFinite(numericId)) return;
    setLoading(true);
    try {
      const res = await fetchWithAuth(`/api/tasks/${numericId}/acknowledge`);
      if (res.ok) {
        const data = (await res.json()) as State;
        setState(data);
      }
    } catch (err) {
      console.error("Failed to fetch acknowledgements:", err);
    } finally {
      setLoading(false);
    }
  }, [numericId]);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  const handleAcknowledge = async () => {
    if (!numericId) return;
    setSubmitting(true);
    try {
      const res = await fetchWithAuth(`/api/tasks/${numericId}/acknowledge`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.isNew ? "Acknowledged" : "Already acknowledged");
        await fetchState();
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to acknowledge");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!numericId || !Number.isFinite(numericId)) return null;

  const count = state?.count ?? 0;
  const me = state?.acknowledgedByMe ?? false;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div
            className="text-[22px] font-bold tracking-tight leading-none"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {count}
            <span
              className="text-[13px] font-medium ml-1.5"
              style={{ color: "var(--text-tertiary)" }}
            >
              acknowledged
            </span>
          </div>
          <div
            className="text-[12px] mt-1.5"
            style={{ color: "var(--text-tertiary)" }}
          >
            {me
              ? `You've acknowledged this ${itemLabel}.`
              : `Confirm you've seen this ${itemLabel}.`}
          </div>
        </div>
        <button
          type="button"
          onClick={handleAcknowledge}
          disabled={submitting || me}
          className="ct-btn"
          style={{
            backgroundColor: me ? "var(--tile-green-fg)" : "var(--primary-blue)",
            color: "#fff",
            paddingLeft: 18,
            paddingRight: 18,
          }}
        >
          {me ? (
            <>
              <Check className="h-4 w-4" /> Acknowledged
            </>
          ) : submitting ? (
            "Saving…"
          ) : (
            "Acknowledge"
          )}
        </button>
      </div>

      {(showList || isManager) && state && state.acknowledgements.length > 0 && (
        <div
          className="pt-4"
          style={{ borderTop: "1px solid var(--separator)" }}
        >
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.08em] mb-3"
            style={{ color: "var(--text-tertiary)" }}
          >
            Acknowledged by
          </div>
          <ul className="space-y-2 max-h-72 overflow-y-auto scrollbar-hide">
            {state.acknowledgements.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between gap-2 py-1.5"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{
                      backgroundColor: "var(--tile-blue-bg)",
                      color: "var(--tile-blue-fg)",
                    }}
                  >
                    {(a.name || "?").slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <div
                      className="text-[13px] font-semibold truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {a.name}
                    </div>
                    {a.role && (
                      <div
                        className="text-[10px] uppercase tracking-wider"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {a.role}
                        {a.department ? ` · ${a.department}` : ""}
                      </div>
                    )}
                  </div>
                </div>
                <span
                  className="text-[11px] shrink-0"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {formatDate(a.acknowledgedAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && !state && (
        <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>
          Loading…
        </div>
      )}
    </div>
  );
}
