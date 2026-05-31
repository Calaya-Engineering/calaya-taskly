"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchWithAuth } from "@/lib/api";

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

const actionTone = (action: string) => {
  if (action.includes("DELETED")) return "bg-red-50 text-red-700 ring-red-100";
  if (action.includes("PRIVACY")) return "bg-amber-50 text-amber-700 ring-amber-100";
  if (action.includes("DOWNLOADED")) return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  if (action.includes("LOGIN")) return "bg-sky-50 text-sky-700 ring-sky-100";
  if (action.includes("CREATED") || action.includes("UPLOADED") || action.includes("POSTED"))
    return "bg-blue-50 text-blue-700 ring-blue-100";
  return "bg-gray-50 text-gray-700 ring-gray-200";
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
    <div className="max-w-7xl mx-auto space-y-6 p-1">
      <div className="rounded-2xl border border-gray-200/70 bg-white p-6">
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
          Audit Log
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Every key action across the system. Filter to investigate a user, target type, or time window.
        </p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-5 gap-3">
          <input
            value={filters.action}
            onChange={(e) => {
              setOffset(0);
              setFilters((f) => ({ ...f, action: e.target.value }));
            }}
            placeholder="Action (e.g. DOCUMENT_UPLOADED)"
            className="px-3 py-2 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <input
            value={filters.userEmail}
            onChange={(e) => {
              setOffset(0);
              setFilters((f) => ({ ...f, userEmail: e.target.value }));
            }}
            placeholder="User email contains…"
            className="px-3 py-2 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <select
            value={filters.targetType}
            onChange={(e) => {
              setOffset(0);
              setFilters((f) => ({ ...f, targetType: e.target.value }));
            }}
            className="px-3 py-2 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
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
            className="px-3 py-2 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <input
            type="date"
            value={filters.to}
            onChange={(e) => {
              setOffset(0);
              setFilters((f) => ({ ...f, to: e.target.value }));
            }}
            className="px-3 py-2 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200/70 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">When</th>
                <th className="px-4 py-3 text-left">Who</th>
                <th className="px-4 py-3 text-left">Action</th>
                <th className="px-4 py-3 text-left">Summary</th>
                <th className="px-4 py-3 text-left">Target</th>
                <th className="px-4 py-3 text-left">IP</th>
              </tr>
            </thead>
            <tbody>
              {loading && entries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : entries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                    No audit entries match the current filters.
                  </td>
                </tr>
              ) : (
                entries.map((e) => (
                  <tr key={e.id} className="border-t border-gray-200/70 align-top">
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">{fmt(e.createdAt)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">
                        {e.user.name || e.user.email?.split("@")[0] || "—"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {e.user.email}
                        {e.user.role ? ` · ${e.user.role}` : ""}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold ring-1 ${actionTone(e.action)}`}
                      >
                        {e.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{e.summary || "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      {e.targetType ? (
                        <>
                          {e.targetType}
                          {e.targetId ? ` #${e.targetId}` : ""}
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                      {e.ipAddress || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-gray-200/70 text-sm text-gray-500">
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
              className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-xs text-gray-500">
              Page {page} / {Math.max(1, totalPages)}
            </span>
            <button
              type="button"
              disabled={offset + PAGE_SIZE >= total}
              onClick={() => setOffset((o) => o + PAGE_SIZE)}
              className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
