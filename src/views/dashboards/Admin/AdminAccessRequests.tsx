"use client";

import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, Pill, SectionTitle } from "@/components/dashboard-ui";
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

function statusTone(status: string) {
  if (status === "APPROVED") return "success";
  if (status === "DENIED") return "danger";
  return "warn";
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

  const stats = useMemo(() => ({
    pending: requests.filter((request) => request.status === "PENDING").length,
    approved: requests.filter((request) => request.status === "APPROVED").length,
    denied: requests.filter((request) => request.status === "DENIED").length,
  }), [requests]);

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
      <div className="space-y-6 p-4 md:p-6">
        <Card className="p-6">
          <SectionTitle
            title="Access Requests"
            subtitle="Review incoming request-access submissions, approve valid accounts, or deny them with a note."
            action={
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700"
              >
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="DENIED">Denied</option>
                <option value="ALL">All</option>
              </select>
            }
          />

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
              <p className="text-sm text-amber-700">Pending</p>
              <p className="mt-2 text-2xl font-bold text-amber-900">{stats.pending}</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-sm text-emerald-700">Approved</p>
              <p className="mt-2 text-2xl font-bold text-emerald-900">{stats.approved}</p>
            </div>
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
              <p className="text-sm text-red-700">Denied</p>
              <p className="mt-2 text-2xl font-bold text-red-900">{stats.denied}</p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {loading ? (
            <Card className="p-8 text-center text-gray-500">Loading access requests...</Card>
          ) : requests.length === 0 ? (
            <Card className="p-8 text-center text-gray-500">No access requests found for this filter.</Card>
          ) : (
            requests.map((request) => {
              const reviewNote = notes[request.id] ?? request.reviewNote ?? "";
              const isPending = request.status === "PENDING";
              const isBusy = activeId === request.id;

              return (
                <Card key={request.id} className="p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900">{request.fullName}</h3>
                        <Pill tone={statusTone(request.status)}>{request.status}</Pill>
                        <Pill>{request.requestedRole}</Pill>
                        <Pill tone="info">{request.department}</Pill>
                        {request.existingUserId ? <Pill tone="danger">Existing User</Pill> : null}
                      </div>

                      <div className="grid grid-cols-1 gap-3 text-sm text-gray-600 md:grid-cols-2">
                        <p><span className="font-semibold text-gray-900">Email:</span> {request.email}</p>
                        <p><span className="font-semibold text-gray-900">Phone:</span> {request.phone}</p>
                        <p><span className="font-semibold text-gray-900">Job Title:</span> {request.jobTitle || "Not provided"}</p>
                        <p><span className="font-semibold text-gray-900">HOD:</span> {request.hodName || "Not selected"}</p>
                        <p><span className="font-semibold text-gray-900">Submitted:</span> {new Date(request.createdAt).toLocaleString("en-GB")}</p>
                        <p><span className="font-semibold text-gray-900">Reviewed By:</span> {request.reviewedByEmail || "Not reviewed yet"}</p>
                      </div>

                      <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Reason</p>
                        <p className="mt-2 text-sm leading-6 text-gray-700">{request.reason}</p>
                      </div>
                    </div>

                    <div className="w-full max-w-xl space-y-3 lg:min-w-[360px]">
                      <label className="block text-sm font-semibold text-gray-900">
                        Admin Review Note
                      </label>
                      <textarea
                        value={reviewNote}
                        onChange={(e) =>
                          setNotes((prev) => ({
                            ...prev,
                            [request.id]: e.target.value,
                          }))
                        }
                        rows={4}
                        disabled={!isPending || isBusy}
                        placeholder="Optional note sent back with the approval or denial email."
                        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#2C4B9B]"
                      />

                      {request.reviewedAt ? (
                        <p className="text-xs text-gray-500">
                          Reviewed on {new Date(request.reviewedAt).toLocaleString("en-GB")}
                        </p>
                      ) : null}

                      {isPending ? (
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => handleDecision(request, "APPROVED")}
                            disabled={isBusy || Boolean(request.existingUserId)}
                            className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isBusy ? "Processing..." : "Approve and Create Account"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDecision(request, "DENIED")}
                            disabled={isBusy}
                            className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isBusy ? "Processing..." : "Deny Request"}
                          </button>
                        </div>
                      ) : (
                        <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
                          This request has already been reviewed.
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
