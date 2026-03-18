"use client";

import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, SectionTitle } from "@/components/dashboard-ui";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";

type AccessRequest = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  requestedRole: string;
  jobTitle: string | null;
  hodId: number | null;
  hodName: string | null;
  hodEmail: string | null;
  reason: string;
  status: string;
  reviewNote: string | null;
  reviewedAt: string | null;
  reviewedByEmail: string | null;
  createdAt: string;
  existingUserId: number | null;
};

function getStatusClasses(status: string) {
  if (status === "APPROVED") return "border border-emerald-200 bg-emerald-100 text-emerald-800";
  if (status === "DENIED") return "border border-rose-200 bg-rose-100 text-rose-700";
  return "border border-amber-200 bg-amber-100 text-amber-800";
}

function formatDateTime(value: string | null) {
  if (!value) return "Not reviewed yet";
  return new Date(value).toLocaleString("en-GB");
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
      <p className="text-[18px] font-medium leading-[1.35] text-slate-800 break-words">{value}</p>
    </div>
  );
}

function StatCard({
  label,
  count,
  tone,
}: {
  label: string;
  count: number;
  tone: "pending" | "approved" | "denied";
}) {
  const toneClasses =
    tone === "approved"
      ? "bg-emerald-50 text-emerald-800"
      : tone === "denied"
        ? "bg-rose-50 text-rose-800"
        : "bg-amber-50 text-amber-800";

  return (
    <div className={`rounded-2xl px-6 py-5 ${toneClasses}`}>
      <p className="text-sm font-semibold">{label}</p>
      <p className="mt-2 text-4xl font-bold tracking-tight" style={{ fontFamily: "Sora, sans-serif" }}>
        {count}
      </p>
    </div>
  );
}

export default function AdminAccessRequests() {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [notes, setNotes] = useState<Record<number, string>>({});

  const loadRequests = async () => {
    setLoading(true);
    try {
      const query = statusFilter && statusFilter !== "ALL" ? `?status=${statusFilter}` : "";
      const response = await fetchWithAuth(`/api/access-requests${query}`);
      const data = await response.json().catch(() => []);
      if (!response.ok) {
        throw new Error(data?.error || "Failed to load access requests");
      }
      setRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load access requests:", error);
      toast.error(error instanceof Error ? error.message : "Failed to load access requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, [statusFilter]);

  const stats = useMemo(
    () => ({
      pending: requests.filter((request) => request.status === "PENDING").length,
      approved: requests.filter((request) => request.status === "APPROVED").length,
      denied: requests.filter((request) => request.status === "DENIED").length,
    }),
    [requests],
  );

  const handleDecision = async (request: AccessRequest, decision: "APPROVED" | "DENIED") => {
    if (!confirm(`${decision === "APPROVED" ? "Approve" : "Deny"} ${request.fullName}'s access request?`)) {
      return;
    }

    setActiveId(request.id);
    try {
      const response = await fetchWithAuth(`/api/access-requests/${request.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decision,
          reviewNote: notes[request.id] || "",
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || `Failed to ${decision === "APPROVED" ? "approve" : "deny"} request`);
      }

      toast.success(decision === "APPROVED" ? "Access request approved" : "Access request denied");
      setNotes((prev) => ({ ...prev, [request.id]: "" }));
      await loadRequests();
    } catch (error) {
      console.error("Failed to review access request:", error);
      toast.error(error instanceof Error ? error.message : "Failed to review access request");
    } finally {
      setActiveId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-7 bg-[#f0f2f7] p-4 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <SectionTitle
            title="Access Requests"
            subtitle="Review incoming request-access submissions, approve valid accounts, or deny them with a note."
          />

          <label className="inline-flex w-fit items-center gap-2 rounded-xl border-[1.5px] border-[#1a2f8a] bg-white px-4 py-2 text-sm font-semibold text-[#1a2f8a]">
            <span>Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="cursor-pointer appearance-none bg-transparent pr-4 outline-none"
            >
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="DENIED">Denied</option>
              <option value="ALL">All</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard label="Pending" count={stats.pending} tone="pending" />
          <StatCard label="Approved" count={stats.approved} tone="approved" />
          <StatCard label="Denied" count={stats.denied} tone="denied" />
        </div>

        <div className="space-y-5">
          {loading ? (
            <Card className="rounded-[28px] border border-slate-200 p-10 text-center text-slate-500">
              Loading access requests...
            </Card>
          ) : requests.length === 0 ? (
            <Card className="rounded-[28px] border border-slate-200 p-10 text-center text-slate-500">
              No requests at the moment.
            </Card>
          ) : (
            requests.map((request) => {
              const reviewNote = notes[request.id] ?? request.reviewNote ?? "";
              const isPending = request.status === "PENDING";
              const isBusy = activeId === request.id;

              return (
                <div
                  key={request.id}
                  className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 px-7 py-6 md:px-8">
                    <h3
                      className="mr-2 text-4xl font-bold tracking-tight text-[#20243b]"
                      style={{ fontFamily: "Sora, sans-serif" }}
                    >
                      {request.fullName}
                    </h3>

                    <span className={`inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold ${getStatusClasses(request.status)}`}>
                      {request.status}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-600">
                      {request.requestedRole}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700">
                      {request.department}
                    </span>
                    {request.existingUserId ? (
                      <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-sm font-semibold text-orange-700">
                        Existing User
                      </span>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.95fr]">
                    <div className="border-b border-slate-100 px-7 py-8 lg:border-b-0 lg:border-r lg:border-slate-100 md:px-8">
                      <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
                        <InfoField label="Email" value={request.email} />
                        <InfoField label="Phone" value={request.phone} />
                        <InfoField label="Job Title" value={request.jobTitle || "Not provided"} />
                        <InfoField label="HOD" value={request.hodName || "Not selected"} />
                        <InfoField label="Submitted" value={formatDateTime(request.createdAt)} />
                        <InfoField label="Reviewed By" value={request.reviewedByEmail || "Not reviewed yet"} />
                      </div>

                      <div className="mt-10 rounded-3xl border border-slate-200 bg-[#f8f9fc] px-6 py-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Reason</p>
                        <p className="mt-3 text-[18px] leading-[1.45] text-slate-700">{request.reason}</p>
                      </div>
                    </div>

                    <div className="px-7 py-8 md:px-8">
                      <p
                        className="mb-4 text-[20px] font-bold text-[#20243b]"
                        style={{ fontFamily: "Sora, sans-serif" }}
                      >
                        Admin Review Note
                      </p>

                      <textarea
                        value={reviewNote}
                        onChange={(e) =>
                          setNotes((prev) => ({
                            ...prev,
                            [request.id]: e.target.value,
                          }))
                        }
                        rows={5}
                        disabled={!isPending || isBusy}
                        placeholder="Optional note sent back with the approval or denial email."
                        className="min-h-[180px] w-full rounded-[22px] border-[1.5px] border-slate-200 bg-[#fafafa] px-6 py-5 text-[17px] leading-[1.35] text-slate-500 outline-none transition focus:border-[#1a2f8a] focus:bg-white disabled:cursor-not-allowed disabled:opacity-80"
                      />

                      <p className="mt-5 text-[15px] text-slate-400">
                        Reviewed on {formatDateTime(request.reviewedAt)}
                      </p>

                      {isPending ? (
                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => handleDecision(request, "APPROVED")}
                            disabled={isBusy || Boolean(request.existingUserId)}
                            className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isBusy ? "Processing..." : "Approve and Create Account"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDecision(request, "DENIED")}
                            disabled={isBusy}
                            className="rounded-2xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isBusy ? "Processing..." : "Deny Request"}
                          </button>
                        </div>
                      ) : (
                        <div className="mt-5 rounded-[22px] border border-slate-200 bg-[#f8f9fc] px-6 py-5 text-[17px] text-slate-500">
                          This request has already been reviewed.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
