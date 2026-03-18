"use client";

// pages/dashboards/MD/MDApprovals.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "@/lib/toast";
import Link from "next/link";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";
import { getIconByKey } from "@/lib/icons";
import {
  TASK_STATUS_PENDING_HOD_APPROVAL,
  TASK_STATUS_PENDING_MD_APPROVAL,
  getTaskApprovalNextStep,
  getTaskStatusLabel,
} from "@/lib/task-approval";

/* ---------- UI helpers ---------- */
const Card = ({ className = "", children, ...props }: any) => (
  <div
    className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}
    {...props}
  >
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle, action = null }: any) => (
  <div className="flex items-start justify-between gap-3">
    <div>
      <h2 className="text-lg md:text-xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
        {title}
      </h2>
      {subtitle ? <p className="text-sm text-gray-500 mt-1">{subtitle}</p> : null}
    </div>
    {action}
  </div>
);

const Pill = ({ children, tone = "default" }: any) => {
  const styles =
    tone === "danger"
      ? "bg-red-50 text-red-700 ring-red-100"
      : tone === "success"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : tone === "warn"
      ? "bg-amber-50 text-amber-800 ring-amber-100"
      : tone === "info"
      ? "bg-blue-50 text-blue-700 ring-blue-100"
      : "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

export default function MDApprovals() {
  const [approvalsData, setApprovalsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvalType, setApprovalType] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState(TASK_STATUS_PENDING_MD_APPROVAL);
  const [selectedApproval, setSelectedApproval] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDocTab, setActiveDocTab] = useState("details");
  const [reviewedDocs, setReviewedDocs] = useState<any>({});

  const fetchApprovals = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/tasks?limit=100");
      if (res.ok) {
        const tasks = await res.json();
        // Map tasks to the approval shape the UI expects
        const mapped = tasks.map((t: any) => ({
          id: `APP-${String(t.id).padStart(3, '0')}`,
          dbId: t.id,
          title: t.title,
          type: t.type === "JOB" ? "TASK_COMPLETION" : "DOCUMENT",
          submittedBy: t.createdBy?.name || t.createdBy?.email || "System",
          department: t.department || "—",
          submittedDate: t.createdAt?.split("T")[0] || "",
          dueDate: t.dueDate || "",
          priority: t.priority || "MEDIUM",
          status: t.status || "PENDING",
          statusLabel: getTaskStatusLabel(t.status || "PENDING"),
          nextStep: getTaskApprovalNextStep(t.status || "PENDING"),
          description: t.description || "",
          reference: t.type === "JOB" ? `JOB-${t.id}` : `TSK-${t.id}`,
          attachments: 0,
          daysPending: t.createdAt ? Math.max(0, Math.ceil((Date.now() - new Date(t.createdAt).getTime()) / 86400000)) : 0,
          documents: [],
          approvedDate: t.completedAt?.split("T")[0] || null,
          rejectedDate: null,
          approvalComment: null,
          rejectionReason: null,
        }));
        setApprovalsData(mapped);
      }
    } catch (e) {
      console.error("Failed to fetch approvals:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApprovals();
  }, [fetchApprovals]);

  // Real-time: re-fetch on task events
  useSSE("/api/tasks/events", (ev) => {
    if (ev.type?.startsWith("task:")) fetchApprovals();
  });

  const approvals = approvalsData as any[];
  const filteredApprovals = useMemo(() => approvals.filter((approval) => {
    if (approvalType !== "All" && approval.type !== approvalType) return false;
    if (priorityFilter !== "All" && approval.priority !== priorityFilter) return false;
    if (statusFilter !== "All" && approval.status !== statusFilter) return false;
    return true;
  }), [approvals, approvalType, priorityFilter, statusFilter]);

  const getPriorityTone = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
      case "URGENT":
        return "danger";
      case "HIGH":
        return "warn";
      case "MEDIUM":
        return "info";
      case "LOW":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusTone = (status: string) => {
    switch (status) {
      case "PENDING":
      case TASK_STATUS_PENDING_HOD_APPROVAL:
        return "info";
      case TASK_STATUS_PENDING_MD_APPROVAL:
        return "warn";
      case "COMPLETED":
      case "APPROVED":
        return "success";
      case "ON_HOLD":
      case "REJECTED":
        return "danger";
      default:
        return "default";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "TASK_COMPLETION": return "check";
      case "DOCUMENT": return "document";
      case "REPORT": return "summary";
      default: return "other";
    }
  };

  const openModal = (approval: any) => {
    setSelectedApproval(approval);
    setComment("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApproval(null);
  };

  const handleApprove = async () => {
    if (!selectedApproval) return;
    const sel = selectedApproval as any;
    try {
      const res = await fetchWithAuth(`/api/tasks/${sel.dbId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "COMPLETED" }),
      });
      if (res.ok) {
        toast.success(`Task ${sel.id} approved`);
        fetchApprovals();
      } else {
        toast.error("Failed to approve task");
      }
    } catch {
      toast.error("An error occurred");
    }
    closeModal();
  };

  const handleReject = async () => {
    if (!selectedApproval) return;
    const sel = selectedApproval as any;
    const reason = comment.trim() || "No reason provided";
    try {
      const res = await fetchWithAuth(`/api/tasks/${sel.dbId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "ON_HOLD", comment: reason }),
      });
      if (res.ok) {
        toast.warning(`Task ${sel.id} placed on hold: ${reason}`);
        fetchApprovals();
      } else {
        toast.error("Failed to reject task");
      }
    } catch {
      toast.error("An error occurred");
    }
    closeModal();
  };

  const pendingCount = useMemo(
    () => approvals.filter((a) => a.status === TASK_STATUS_PENDING_MD_APPROVAL).length,
    [approvals],
  );
  const criticalPendingCount = useMemo(
    () =>
      approvals.filter(
        (a) =>
          (a.priority === "CRITICAL" || a.priority === "URGENT") &&
          a.status === TASK_STATUS_PENDING_MD_APPROVAL,
      ).length,
    [approvals],
  );

  if (loading) return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
      </div>
    </Layout>
  );

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background: "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>Executive Approvals</Pill>
                  <Pill tone="warn">{pendingCount} Pending</Pill>
                  <Pill tone="danger">{criticalPendingCount} Critical</Pill>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Managing Director Approvals
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">Review and authorize key company operations and documents</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/md-dashboard/approvals/bulk">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "var(--secondary-blue)", color: "var(--primary-blue)" }}
                  >
                    Bulk Actions
                  </button>
                </Link>
                <Link href="/md-dashboard/approvals/history">
                  <button className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition text-gray-700">
                    History
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <Card className="p-6">
          <SectionTitle title="Queue Filters" subtitle="Manage your authorization workflow" />
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
             <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
              <select
                value={approvalType}
                onChange={(e) => setApprovalType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Types</option>
                <option value="TASK_COMPLETION">Task Completion</option>
                <option value="DOCUMENT">Document</option>
                <option value="REPORT">Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Priorities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Status</option>
                <option value={TASK_STATUS_PENDING_MD_APPROVAL}>Pending MD Approval</option>
                <option value={TASK_STATUS_PENDING_HOD_APPROVAL}>Awaiting HOD Review</option>
                <option value="COMPLETED">Approved</option>
                <option value="ON_HOLD">On Hold</option>
              </select>
            </div>
          </div>
        </Card>

        {/* List */}
        <div className="space-y-4">
          {filteredApprovals.length === 0 ? (
            <Card className="p-10 text-center">
               <div className="mt-3 font-extrabold" style={{ color: "var(--primary-blue)" }}>No requests found</div>
            </Card>
          ) : (
            filteredApprovals.map((item: any) => (
              <Card 
                key={item.id} 
                className="p-6 hover:-translate-y-0.5 transition-all cursor-pointer"
                onClick={() => openModal(item)}
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Pill tone={getPriorityTone(item.priority)}>{item.priority}</Pill>
                        <Pill tone={getStatusTone(item.status)}>{item.statusLabel}</Pill>
                  <Pill>{item.department}</Pill>
                  <Pill tone="info">{getIconByKey(getTypeIcon(item.type), "w-4 h-4 mr-1")} {item.type.replace('_', ' ')}</Pill>
                </div>
                <h3 className="text-lg font-extrabold" style={{ color: "var(--primary-blue)" }}>{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                      <p className="text-xs font-semibold mt-2" style={{ color: "var(--secondary-blue)" }}>
                        {item.nextStep}
                      </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
                  <span>Submitted by <b>{item.submittedBy}</b></span>
                  <span>Ref: <code className="bg-gray-100 px-1 rounded">{item.reference}</code></span>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedApproval && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-gray-900/60" onClick={closeModal} />
           <Card className="relative z-10 w-full max-w-3xl overflow-hidden flex flex-col">
              <div className="p-6 border-b flex justify-between">
                <h3 className="text-xl font-extrabold text-blue-900">Authorize Request</h3>
                <button onClick={closeModal} className="text-2xl">&times;</button>
              </div>
              <div className="p-6 space-y-4">
                 <p className="font-bold text-lg">{(selectedApproval as any).title}</p>
                 <p className="text-sm text-gray-600">{(selectedApproval as any).description}</p>
                 <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 border rounded-xl"
                    placeholder="Decision comments..."
                 />
                 <div className="flex gap-4">
                   <button onClick={handleApprove} className="flex-1 bg-green-600 text-white font-bold py-3 rounded-xl">Approve</button>
                   <button onClick={handleReject} className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl">Reject</button>
                 </div>
              </div>
           </Card>
        </div>
      )}
    </Layout>
  );
}
