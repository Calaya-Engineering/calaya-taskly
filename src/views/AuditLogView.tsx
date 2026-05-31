"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchWithAuth } from "@/lib/api";
import { Card, PageHero, Pill, SectionHeading } from "@/components/ui/design";

type AuditEntry = {
  id: number;
  action: string;
  summary: string | null;
  targetType: string | null;
  targetId: number | null;
  ipAddress: string | null;
  createdAt: string;
  metadata: Record<string, unknown> | null;
  user: {
    id: number | null;
    name: string | null;
    email: string | null;
    role: string | null;
  };
};

type ApiResponse = {
  total: number;
  limit: number;
  offset: number;
  entries: AuditEntry[];
};

const PAGE_SIZE = 50;

const fmt = (iso: string) => {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return iso;
  }
};

type Tone = "default" | "blue" | "green" | "orange" | "red" | "purple" | "cyan" | "pink";

const actionTone = (action: string): Tone => {
  if (action.includes("DELETED")) return "red";
  if (action.includes("PRIVACY")) return "orange";
  if (action.includes("DOWNLOADED")) return "green";
  if (action.includes("LOGIN")) return "cyan";
  if (action.includes("ACKNOWLEDGED")) return "green";
  if (action.includes("CREATED") || action.includes("UPLOADED") || action.includes("POSTED"))
    return "blue";
  if (action.includes("UPDATED")) return "purple";
  return "default";
};

export default function AuditLogView() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    action: "",
    userEmail: "",
    targetType: "",
    from: "",
    to: "",
  });

  const queryString = useMemo(() => {
    const p = new URLSearchParams();
    p.set("limit", String(PAGE_SIZE));
    p.set("offset", String(offset));
    if (filters.action) p.set("action", filters.action);
    if (filters.userEmail) p.set("userEmail", filters.userEmail);
    if (filters.targetType) p.set("targetType", filters.targetType);
    if (filters.from) p.set("from", new Date(filters.from).toISOString());
    if (filters.to) p.set("to", new Date(filters.to + "T23:59:59").toISOString());
    return p.toString();
  }, [filters, offset]);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`/api/audit-logs?${queryString}`);
      if (res.ok) {
        const data = (await res.json()) as ApiResponse;
        setEntries(data.entries || []);
        setTotal(data.total || 0);
      }
    } finally {
      setLoading(false);
    }
  }, [queryString]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const page = Math.floor(offset / PAGE_SIZE) + 1;

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow={<Pill tone="cyan">Compliance</Pill>}
        title="Audit Log"
        subtitle="Every key action across the system. Filter to investigate a user, target type, or time window."
        meta={
          <div className="ct-pill" style={{ background: "var(--surface-page)" }}>
            {total} entries
          </div>
        }
      />

      <Card padding="md">
        <SectionHeading
          title="Filters"
          subtitle="Narrow the log to a specific period, user, or target."
        />

        <div className="mt-5 grid grid-cols-1 md:grid-cols-5 gap-3">
          <input
            value={filters.action}
            onChange={(e) => {
              setOffset(0);
              setFilters((f) => ({ ...f, action: e.target.value }));
            }}
            placeholder="Action (e.g. DOCUMENT_UPLOADED)"
            className="ct-input"
          />
          <input
            value={filters.userEmail}
            onChange={(e) => {
              setOffset(0);
              setFilters((f) => ({ ...f, userEmail: e.target.value }));
            }}
            placeholder="User email contains…"
            className="ct-input"
          />
          <select
            value={filters.targetType}
            onChange={(e) => {
              setOffset(0);
              setFilters((f) => ({ ...f, targetType: e.target.value }));
            }}
            className="ct-input"
          >
            <option value="">All target types</option>
            <option value="DOCUMENT">Document</option>
            <option value="TENDER">Tender</option>
            <option value="TASK">Task</option>
            <option value="EVENT">Event</option>
            <option value="USER">User</option>
          </select>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => {
              setOffset(0);
              setFilters((f) => ({ ...f, from: e.target.value }));
            }}
            className="ct-input"
          />
          <input
            type="date"
            value={filters.to}
            onChange={(e) => {
              setOffset(0);
              setFilters((f) => ({ ...f, to: e.target.value }));
            }}
            className="ct-input"
          />
        </div>
      </Card>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="min-w-full text-[13px]">
            <thead
              style={{
                background: "var(--surface-muted)",
                color: "var(--text-tertiary)",
              }}
            >
              <tr>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-[0.08em] font-semibold">
                  When
                </th>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-[0.08em] font-semibold">
                  Who
                </th>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-[0.08em] font-semibold">
                  Action
                </th>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-[0.08em] font-semibold">
                  Summary
                </th>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-[0.08em] font-semibold">
                  Target
                </th>
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-[0.08em] font-semibold">
                  IP
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && entries.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Loading…
                  </td>
                </tr>
              ) : entries.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    No audit entries match the current filters.
                  </td>
                </tr>
              ) : (
                entries.map((e) => (
                  <tr
                    key={e.id}
                    className="align-top"
                    style={{ borderTop: "1px solid var(--separator)" }}
                  >
                    <td
                      className="px-5 py-3 whitespace-nowrap"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {fmt(e.createdAt)}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div
                        className="font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {e.user.name || e.user.email?.split("@")[0] || "—"}
                      </div>
                      <div
                        className="text-[11px]"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {e.user.email}
                        {e.user.role ? ` · ${e.user.role}` : ""}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Pill tone={actionTone(e.action)}>{e.action}</Pill>
                    </td>
                    <td
                      className="px-5 py-3"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {e.summary || "—"}
                    </td>
                    <td
                      className="px-5 py-3 whitespace-nowrap"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {e.targetType ? (
                        <>
                          {e.targetType}
                          {e.targetId ? ` #${e.targetId}` : ""}
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td
                      className="px-5 py-3 whitespace-nowrap text-[11px]"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {e.ipAddress || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div
          className="flex items-center justify-between px-5 py-4 text-[12px]"
          style={{
            borderTop: "1px solid var(--separator)",
            color: "var(--text-tertiary)",
          }}
        >
          <div>
            {total === 0
              ? "0 entries"
              : `Showing ${offset + 1}–${Math.min(offset + entries.length, total)} of ${total}`}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={offset === 0}
              onClick={() => setOffset((o) => Math.max(0, o - PAGE_SIZE))}
              className="ct-btn ct-btn-secondary"
              style={{ padding: "6px 14px", fontSize: 12 }}
            >
              Prev
            </button>
            <span className="text-[11px]">
              Page {page} / {Math.max(1, totalPages)}
            </span>
            <button
              type="button"
              disabled={offset + PAGE_SIZE >= total}
              onClick={() => setOffset((o) => o + PAGE_SIZE)}
              className="ct-btn ct-btn-secondary"
              style={{ padding: "6px 14px", fontSize: 12 }}
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
