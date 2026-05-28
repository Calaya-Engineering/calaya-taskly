"use client";

import { useCallback, useEffect, useState } from "react";
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
};

export default function EventAcknowledgement({ taskId, showList = false, isManager = false }: Props) {
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
      const res = await fetchWithAuth(`/api/tasks/${numericId}/acknowledge`, { method: "POST" });
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
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-extrabold text-gray-900">
            {count} acknowledged
          </div>
          <div className="text-xs text-gray-500">
            {me
              ? "You've acknowledged this event."
              : "Confirm you've seen this event."}
          </div>
        </div>
        <button
          type="button"
          onClick={handleAcknowledge}
          disabled={submitting || me}
          className="px-4 py-2 rounded-2xl text-sm font-semibold text-white transition active:scale-[0.99] disabled:opacity-60"
          style={{ backgroundColor: me ? "#10B981" : "var(--primary-blue)" }}
        >
          {me ? "Acknowledged ✓" : submitting ? "Saving…" : "Acknowledge"}
        </button>
      </div>

      {(showList || isManager) && state && state.acknowledgements.length > 0 && (
        <div className="mt-2 pt-3 border-t border-gray-200/70">
          <div className="text-xs font-semibold text-gray-500 mb-2">
            Acknowledged by
          </div>
          <ul className="space-y-1 max-h-64 overflow-y-auto">
            {state.acknowledgements.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between text-sm py-1"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                    {(a.name || "?").slice(0, 1).toUpperCase()}
                  </span>
                  <span className="font-medium text-gray-900">{a.name}</span>
                  {a.role && (
                    <span className="text-[10px] uppercase tracking-wide text-gray-400">
                      {a.role}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(a.acknowledgedAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && !state && (
        <div className="text-xs text-gray-400">Loading…</div>
      )}
    </div>
  );
}
