"use client";

// pages/dashboards/HOD/HODApprovalBulk.tsx
import { useState, useCallback, useEffect } from 'react';
import { toast } from "@/lib/toast";
import Link from "next/link";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";
import { TASK_STATUS_PENDING_HOD_APPROVAL } from "@/lib/task-approval";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

const Card = ({ className = "", children }: any) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
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
    tone === "danger" ? "bg-red-50 text-red-700 ring-red-100" :
    tone === "success" ? "bg-emerald-50 text-emerald-700 ring-emerald-100" :
    tone === "warn" ? "bg-amber-50 text-amber-800 ring-amber-100" :
    tone === "info" ? "bg-blue-50 text-blue-700 ring-blue-100" :
    "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

export default function HODApprovalBulk() {
  const [approvalsData, setApprovalsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [bulkComment, setBulkComment] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const fetchApprovals = useCallback(async () => {
    try {
      const res = await fetchWithAuth(`/api/tasks?limit=100&status=${TASK_STATUS_PENDING_HOD_APPROVAL}`);
      if (res.ok) {
        const tasks = await res.json();
        const mapped = tasks.map((t: any) => ({
          id: `APR-${String(t.id).padStart(3, '0')}`,
          dbId: t.id,
          title: t.title,
          type: t.type === "JOB" ? "TASK_COMPLETION" : "DOCUMENT",
          department: t.department || "—",
          priority: t.priority || "MEDIUM",
          dueDate: t.dueDate || "Not set",
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

  useSSE("/api/tasks/events", (ev) => {
    if (ev.type?.startsWith("task:")) fetchApprovals();
  });

  const pendingApprovals = approvalsData;

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(pendingApprovals.map(item => item.dbId));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectItem = (id: any) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
      setSelectAll(false);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleBulkApprove = async () => {
    if (selectedItems.length === 0) return;
    toast.info(`Processing ${selectedItems.length} approvals...`);
    try {
      const promises = selectedItems.map(id =>
        fetchWithAuth(`/api/tasks/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "COMPLETED", comment: bulkComment }),
        })
      );
      await Promise.all(promises);
      toast.success(`Approved ${selectedItems.length} task(s) — marked complete`);
      setSelectedItems([]);
      fetchApprovals();
    } catch {
      toast.error("An error occurred during bulk approval");
    }
  };

  const handleBulkReject = async () => {
    if (selectedItems.length === 0) return;
    toast.info(`Processing ${selectedItems.length} rejections...`);
    try {
      const promises = selectedItems.map(id =>
        fetchWithAuth(`/api/tasks/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "ON_HOLD", comment: bulkComment || "Bulk rejection" }),
        })
      );
      await Promise.all(promises);
      toast.warning(`Successfully rejected ${selectedItems.length} items`);
      setSelectedItems([]);
      fetchApprovals();
    } catch {
      toast.error("An error occurred during bulk rejection");
    }
  };

  const getPriorityTone = (priority: string) => {
    switch(priority) {
      case 'CRITICAL': return 'danger';
      case 'HIGH': return 'warn';
      case 'MEDIUM': return 'info';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'TASK_COMPLETION': return '✅';
      case 'DOCUMENT': return '📄';
      case 'REPORT': return '📊';
      default: return '📋';
    }
  };

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
                <div className="flex items-center gap-2 mb-2">
                  <Pill>Bulk Actions</Pill>
                  <Pill tone="info">{selectedItems.length} Selected</Pill>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--primary-blue)' }}>
                  Departmental Bulk Approvals
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Select multiple departmental requests to process them together
                </p>
              </div>
              <Link href="/hod-dashboard/approvals">
                <button 
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: 'var(--secondary-blue)', color: 'var(--primary-blue)' }}
                >
                  ← Back to Approvals
                </button>
              </Link>
            </div>
          </div>
        </Card>

        {selectedItems.length > 0 && (
          <Card className="p-6 border-2" style={{ borderColor: 'var(--primary-blue)' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold" style={{ color: 'var(--primary-blue)' }}>
                  {selectedItems.length} Items Selected
                </h3>
                <p className="text-sm text-gray-500 mt-1">Add a comment for all selected approvals</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleBulkApprove}
                  className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                  style={{ backgroundColor: '#10B981' }}
                >{renderNodeWithIcons("\n                  ✓ Forward All\n                ")}</button>
                <button
                  onClick={handleBulkReject}
                  className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                  style={{ backgroundColor: 'var(--accent-red)' }}
                >{renderNodeWithIcons("\n                  ✗ Reject All\n                ")}</button>
              </div>
            </div>
            <div className="mt-4">
              <textarea
                rows={2}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Add a comment that will be applied to all selected approvals..."
                value={bulkComment}
                onChange={(e) => setBulkComment(e.target.value)}
              />
            </div>
          </Card>
        )}

        <Card className="overflow-hidden">
          <div className="p-6 border-b border-gray-200/70">
            <SectionTitle 
              title="Pending Approvals" 
              subtitle="Select approvals to process in bulk"
              action={
                <button
                  onClick={toggleSelectAll}
                  className="text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition"
                  style={{ color: 'var(--primary-blue)' }}
                >
                  {selectAll ? 'Deselect All' : 'Select All'}
                </button>
              }
            />
          </div>

          <div className="divide-y divide-gray-200/70">
            {loading ? (
              <div className="p-10 text-center text-gray-500">Loading approvals...</div>
            ) : pendingApprovals.length === 0 ? (
              <div className="p-10 text-center text-gray-500">No pending approvals found</div>
            ) : (
              pendingApprovals.map((item: any) => (
                <div key={item.dbId} className="p-4 hover:bg-gray-50/70 transition">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedItems.includes(item.dbId)}
                      onChange={() => toggleSelectItem(item.dbId)}
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-extrabold text-sm" style={{ color: 'var(--primary-blue)' }}>
                          {item.id}
                        </span>
                        <Pill tone={getPriorityTone(item.priority)}>{item.priority}</Pill>
                        <Pill tone="info">{renderNodeWithIcons(getTypeIcon(item.type))} {item.type.replace('_', ' ')}</Pill>
                        <Pill>{item.department}</Pill>
                      </div>
                      <h4 className="font-extrabold text-gray-900">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">Due: {item.dueDate}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
