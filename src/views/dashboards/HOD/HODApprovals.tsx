"use client";

// pages/dashboards/HOD/HODApprovals.jsx
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { toast } from "@/lib/toast";
import Link from "next/link";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
import { getIconByKey } from "@/lib/icons";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";
import {
  TASK_STATUS_PENDING_HOD_APPROVAL,
  TASK_STATUS_PENDING_MD_APPROVAL,
  getTaskApprovalNextStep,
  getTaskStatusLabel,
} from "@/lib/task-approval";
import { taskDepartmentLabel } from "@/lib/task-display";
import { LoadingButton } from "@/components/ui/loading-button";

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
        {renderNodeWithIcons(title)}
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
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

export default function HODApprovals() {
  const [approvalsData, setApprovalsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvalType, setApprovalType] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState(TASK_STATUS_PENDING_HOD_APPROVAL);
  const [selectedApproval, setSelectedApproval] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDocTab, setActiveDocTab] = useState("details");
  const [reviewedDocs, setReviewedDocs] = useState<any>({});
  const [decisionAction, setDecisionAction] = useState<"approve" | "reject" | null>(null);

  const fetchApprovals = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/tasks?limit=100");
      if (res.ok) {
        const tasks = await res.json();
        // Map tasks to the approval shape the UI expects
        const mapped = tasks.map((t: any) => ({
          id: `TSK-${t.id}`,
          dbId: t.id,
          title: t.title,
          type: t.type === "JOB" ? "TASK_COMPLETION" : "DOCUMENT",
          submittedBy: t.assignments?.[0]?.user?.name || t.assignments?.[0]?.user?.email || "Unassigned",
          department: taskDepartmentLabel(t),
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

  useEffect(() => { fetchApprovals(); }, [fetchApprovals]);

  // Real-time: re-fetch on task events
  useSSE("/api/tasks/events", (ev) => {
    if (ev.type?.startsWith("task:")) fetchApprovals();
  });

  const approvals = approvalsData as any[];
  const approvalHistory = useMemo(
    () =>
      approvals.filter(
        (a) =>
          a.status === "COMPLETED" ||
          a.status === "APPROVED" ||
          a.status === "REJECTED" ||
          a.status === "ON_HOLD" ||
          a.status === TASK_STATUS_PENDING_MD_APPROVAL,
      ),
    [approvals],
  );

  const filteredApprovals = useMemo(() => approvals.filter((approval) => {
    if (approvalType !== "All" && approval.type !== approvalType) return false;
    if (priorityFilter !== "All" && approval.priority !== priorityFilter) return false;
    if (statusFilter !== "All" && approval.status !== statusFilter) return false;
    return true;
  }), [approvals, approvalType, priorityFilter, statusFilter]);

  const getPriorityTone = (priority: string) => {
    switch (priority) {
      case "URGENT":
      case "CRITICAL":
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
        return "warn";
      case TASK_STATUS_PENDING_MD_APPROVAL:
        return "info";
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
      case "TASK_COMPLETION":
        return "check";
      case "DOCUMENT":
        return "document";
      case "REPORT":
        return "summary";
      default:
        return "other";
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
    if (!selectedApproval || decisionAction) return;
    const sel = selectedApproval as any;
    setDecisionAction("approve");
    try {
      const res = await fetchWithAuth(`/api/tasks/${sel.dbId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "COMPLETED" }),
      });
      if (res.ok) {
        toast.success(`Task ${sel.id} approved and marked complete`);
        fetchApprovals();
      } else {
        toast.error("Failed to approve task");
      }
    } catch {
      toast.error("An error occurred");
    }
    setDecisionAction(null);
    closeModal();
  };

  const handleReject = async () => {
    if (!selectedApproval || decisionAction) return;
    const sel = selectedApproval as any;
    const reason = comment.trim() || "No reason provided";
    setDecisionAction("reject");
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
    setDecisionAction(null);
    closeModal();
  };

  const pendingCount = useMemo(
    () => approvals.filter((a) => a.status === TASK_STATUS_PENDING_HOD_APPROVAL).length,
    [approvals],
  );
  const urgentPendingCount = useMemo(
    () =>
      approvals.filter(
        (a) =>
          (a.priority === "URGENT" || a.priority === "CRITICAL") &&
          a.status === TASK_STATUS_PENDING_HOD_APPROVAL,
      ).length,
    [approvals],
  );

  const reviewedCount = selectedApproval?.documents
    ? selectedApproval.documents.filter((d: any) => reviewedDocs[d.name]).length
    : 0;

  if (loading) return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
      </div>
    </Layout>
  );

  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>Approvals Inbox</Pill>
                  <Pill tone="warn">{pendingCount} Pending</Pill>
                  <Pill tone="danger">{urgentPendingCount} Urgent</Pill>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  HOD Approvals Dashboard
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">Review work submitted by your staff and approve it to mark tasks complete.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/hod-dashboard/approvals/bulk">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "var(--secondary-blue)", color: "var(--primary-blue)" }}
                  >
                    Bulk Actions
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <Card className="p-6">
          <SectionTitle title="Quick Filters" subtitle="Manage your approval queue" />
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Approval Type</label>
              <select
                value={approvalType}
                onChange={(e) => setApprovalType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Types</option>
                <option value="TASK_COMPLETION">Task Completion</option>
                <option value="DOCUMENT">Document</option>
                <option value="REPORT">Report</option>
                <option value="OTHER">Other</option>
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
                <option value="URGENT">Urgent</option>
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
                <option value={TASK_STATUS_PENDING_HOD_APPROVAL}>Pending HOD Approval</option>
                <option value={TASK_STATUS_PENDING_MD_APPROVAL}>Forwarded to MD</option>
                <option value="COMPLETED">Approved</option>
                <option value="ON_HOLD">On Hold</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Approvals List */}
        <div className="space-y-4">
          <SectionTitle
            title="Approvals Queue"
            subtitle="Staff submissions waiting for your approval"
            action={<span className="text-sm text-gray-500">{filteredApprovals.length} results found</span>}
          />

          {filteredApprovals.length === 0 ? (
            <Card className="p-10 text-center">
              <div className="flex justify-center">{getIconByKey("check", "w-16 h-16 text-green-600")}</div>
              <div className="mt-3 font-extrabold" style={{ color: "var(--primary-blue)" }}>
                No approvals match filters
              </div>
              <div className="text-sm text-gray-500 mt-1">Try adjusting your filters to see more results</div>
            </Card>
          ) : (
            filteredApprovals.map((approval: any) => (
                <Card
                  key={approval.id}
                  className="p-6 hover:-translate-y-0.5 transition-all cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => openModal(approval)}
                  onKeyDown={(e: any) => {
                    if (e.key === "Enter" || e.key === " ") openModal(approval);
                  }}
                >
                  <div className="flex flex-col xl:flex-row xl:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Pill tone={getPriorityTone(approval.priority)}>{approval.priority}</Pill>
                        <Pill tone={getStatusTone(approval.status)}>{approval.statusLabel}</Pill>
                        <Pill>{approval.department}</Pill>
                        <Pill tone="info">
                          {getIconByKey(getTypeIcon(approval.type), "w-4 h-4 inline-block mr-1 align-middle")} {approval.type.replace("_", " ")}
                        </Pill>
                        {approval.daysPending > 3 && <Pill tone="danger">{renderNodeWithIcons("⚠️ ")}{approval.daysPending} days pending</Pill>}
                      </div>

                      <h3 className="text-lg font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                        {approval.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">{approval.description}</p>
                      <p className="text-xs font-semibold mt-2" style={{ color: "var(--secondary-blue)" }}>
                        {approval.nextStep}
                      </p>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-gray-200/70 p-3">
                          <div className="flex items-center text-sm">
                            <span className="text-gray-500 w-20">Submitted:</span>
                            <span className="font-semibold">{approval.submittedBy}</span>
                          </div>
                        </div>
                        <div className="rounded-xl border border-gray-200/70 p-3">
                          <div className="flex items-center text-sm">
                            <span className="text-gray-500 w-20">Reference:</span>
                            <code className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">{approval.reference}</code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
          )}
        </div>

        {/* Recent History Shortcut */}
        {approvalHistory.length > 0 && (
          <Card className="overflow-hidden">
            <div className="p-5 border-b border-gray-200/70 bg-gray-50/50">
              <SectionTitle title="Recent History" subtitle="Last few decisions made in your department" />
            </div>
            <div className="divide-y divide-gray-200/70">
              {approvalHistory.slice(0, 3).map((item: any) => (
                <div key={item.id} className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-xs font-mono text-gray-400">{item.id}</code>
                      <Pill tone={item.status === "COMPLETED" || item.status === "APPROVED" ? "success" : item.status === TASK_STATUS_PENDING_MD_APPROVAL ? "info" : "danger"}>
                        {item.statusLabel}
                      </Pill>
                    </div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">By {item.submittedBy} • {item.department}</p>
                  </div>
                  <Link href="/hod-dashboard/approvals/history">
                    <button className="text-xs font-bold hover:underline" style={{ color: "var(--primary-blue)" }}>Details</button>
                  </Link>
                </div>
              ))}
            </div>
            <div className="p-4 text-center border-t border-gray-200/70">
              <Link href="/hod-dashboard/approvals/history" className="text-sm font-semibold hover:underline" style={{ color: "var(--primary-blue)" }}>
                View Full History →
              </Link>
            </div>
          </Card>
        )}
      </div>

      {/* ---------- MODAL ---------- */}
      {isModalOpen && selectedApproval && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60" onClick={closeModal} />
          <Card className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200/70 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>Review Approval Request</h3>
                <div className="flex items-center gap-2 mt-2">
                  <code className="font-mono bg-gray-100 px-3 py-1 rounded text-sm">{(selectedApproval as any).id}</code>
                  <Pill tone={getPriorityTone((selectedApproval as any).priority)}>{(selectedApproval as any).priority}</Pill>
                </div>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-900 text-2xl">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <h4 className="text-sm font-bold uppercase text-gray-500 mb-3 tracking-wider">Information</h4>
                   <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">Title</p>
                        <p className="font-bold text-lg">{(selectedApproval as any).title}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">Requester</p>
                        <p className="font-semibold">{(selectedApproval as any).submittedBy}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">Description</p>
                        <p className="text-sm text-gray-600">{(selectedApproval as any).description}</p>
                      </div>
                   </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase text-gray-500 mb-3 tracking-wider">Decision</h4>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 mb-4"
                    placeholder="Add your comments or reasons for decision..."
                  />
                  <div className="flex gap-3">
                    <LoadingButton
                      type="button"
                      onClick={handleApprove}
                      isLoading={decisionAction === "approve"}
                      loadingText="Approving..."
                      disabled={decisionAction !== null}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-600 transition whitespace-nowrap"
                    >
                      <span aria-hidden>✓</span>
                      <span>Approve &amp; complete</span>
                    </LoadingButton>
                    <LoadingButton
                      type="button"
                      onClick={handleReject}
                      isLoading={decisionAction === "reject"}
                      loadingText="Rejecting..."
                      disabled={decisionAction !== null}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-red-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-red-600 transition whitespace-nowrap"
                    >
                      <span aria-hidden>✗</span>
                      <span>Reject</span>
                    </LoadingButton>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Layout>
  );
}
