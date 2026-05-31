"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";

type RSVPState = {
  response: "YES" | "NO" | null;
  counts: { yes: number; no: number; total: number };
};

type Props = {
  eventId: number | string | null | undefined;
};

const optionClass = (active: boolean, tone: "yes" | "no") => {
  const activeClasses =
    tone === "yes"
      ? "bg-emerald-600 text-white border-emerald-600"
      : "bg-red-600 text-white border-red-600";
  return `px-4 py-2.5 rounded-2xl text-sm font-semibold border transition active:scale-[0.99] ${
    active ? activeClasses : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
  }`;
};

export default function EventRSVP({ eventId }: Props) {
  const numericId = typeof eventId === "string" ? Number.parseInt(eventId, 10) : eventId;
  const [state, setState] = useState<RSVPState | null>(null);
  const [saving, setSaving] = useState<"YES" | "NO" | null>(null);

  const fetchState = useCallback(async () => {
    if (!numericId || !Number.isFinite(numericId)) return;
    const res = await fetchWithAuth(`/api/tasks/${numericId}/rsvp`);
    if (res.ok) {
      const data = await res.json();
      setState({
        response: data.response || null,
        counts: data.counts || { yes: 0, no: 0, total: 0 },
      });
    }
  }, [numericId]);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  const submit = async (response: "YES" | "NO") => {
    if (!numericId || saving) return;
    setSaving(response);
    try {
      const res = await fetchWithAuth(`/api/tasks/${numericId}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to save RSVP");
        return;
      }
      toast.success(response === "YES" ? "RSVP saved: attending" : "RSVP saved: not attending");
      await fetchState();
    } finally {
      setSaving(null);
    }
  };

  if (!numericId || !Number.isFinite(numericId)) return null;

  const response = state?.response || null;
  const counts = state?.counts || { yes: 0, no: 0, total: 0 };

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-extrabold text-gray-900">Will you attend?</p>
        <p className="text-xs text-gray-500 mt-1">
          {counts.yes} yes, {counts.no} no
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => submit("YES")}
          disabled={Boolean(saving)}
          className={optionClass(response === "YES", "yes")}
        >
          {saving === "YES" ? "Saving..." : "Yes"}
        </button>
        <button
          type="button"
          onClick={() => submit("NO")}
          disabled={Boolean(saving)}
          className={optionClass(response === "NO", "no")}
        >
          {saving === "NO" ? "Saving..." : "No"}
        </button>
      </div>
    </div>
  );
}
