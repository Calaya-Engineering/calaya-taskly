"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";

type AckState = {
  count: number;
  acknowledgedByMe: boolean;
};

type Props = {
  tenderId: number | string | null | undefined;
};

export default function TenderAcknowledgement({ tenderId }: Props) {
  const [state, setState] = useState<AckState | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchState = useCallback(async () => {
    if (!tenderId) return;
    const res = await fetchWithAuth(`/api/tenders/${tenderId}/acknowledge`);
    if (res.ok) {
      const data = await res.json();
      setState({
        count: data.count || 0,
        acknowledgedByMe: Boolean(data.acknowledgedByMe),
      });
    }
  }, [tenderId]);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  const acknowledge = async () => {
    if (!tenderId || saving || state?.acknowledgedByMe) return;
    setSaving(true);
    try {
      const res = await fetchWithAuth(`/api/tenders/${tenderId}/acknowledge`, { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to acknowledge tender");
        return;
      }
      const data = await res.json();
      toast.success(data.isNew ? "Tender marked as seen" : "Already marked as seen");
      await fetchState();
    } finally {
      setSaving(false);
    }
  };

  if (!tenderId) return null;

  const count = state?.count ?? 0;
  const acknowledged = state?.acknowledgedByMe ?? false;

  return (
    <div className="rounded-2xl border border-gray-200/70 bg-gray-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-extrabold text-gray-900">{count} seen</p>
          <p className="text-xs text-gray-500 mt-1">
            {acknowledged ? "You've marked this tender as seen." : "Confirm you've seen this tender."}
          </p>
        </div>
        <button
          type="button"
          onClick={acknowledge}
          disabled={saving || acknowledged}
          className="px-4 py-2 rounded-2xl text-sm font-semibold text-white transition active:scale-[0.99] disabled:opacity-60"
          style={{ backgroundColor: acknowledged ? "#10B981" : "var(--primary-blue)" }}
        >
          {acknowledged ? "Seen" : saving ? "Saving..." : "Mark seen"}
        </button>
      </div>
    </div>
  );
}
