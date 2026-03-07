"use client";

// pages/dashboards/MD/MDApprovalBulk.jsx
import { useState } from 'react';
import { toast } from "@/lib/toast";
import Link from "next/link";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const SectionTitle = ({ title, subtitle, action }) => (
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

const Pill = ({ children, tone = "default" }) => {
  const styles =
    tone === "danger" ? "bg-red-50 text-red-700 ring-red-100" :
    tone === "success" ? "bg-emerald-50 text-emerald-700 ring-emerald-100" :
    tone === "warn" ? "bg-amber-50 text-amber-800 ring-amber-100" :
    tone === "info" ? "bg-blue-50 text-blue-700 ring-blue-100" :
    "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

export default function MDApprovalBulk() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkComment, setBulkComment] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const pendingApprovals = [
    { id: 'APP-001', title: 'Safety Audit for Site A', type: 'TASK_COMPLETION', department: 'HSE', priority: 'HIGH', dueDate: '2024-12-18' },
    { id: 'APP-002', title: 'Quarterly Financial Report', type: 'DOCUMENT', department: 'Accounts', priority: 'CRITICAL', dueDate: '2024-12-17' },
    { id: 'APP-003', title: 'Pipeline Inspection Report', type: 'TASK_COMPLETION', department: 'Technical', priority: 'HIGH', dueDate: '2024-12-16' },
    { id: 'APP-004', title: 'Safety Protocol Updates', type: 'DOCUMENT', department: 'HSE', priority: 'HIGH', dueDate: '2024-12-19' },
    { id: 'APP-005', title: 'Daily Operations Report', type: 'REPORT', department: 'Logistics', priority: 'MEDIUM', dueDate: '2024-12-15' },
  ];

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(pendingApprovals.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
      setSelectAll(false);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleBulkApprove = () => {
    toast.success(`Approving ${selectedItems.length} items${bulkComment ? ` with comment: ${bulkComment}` : ''}`);
  };

  const handleBulkReject = () => {
    toast.error(`Rejecting ${selectedItems.length} items${bulkComment ? ` with comment: ${bulkComment}` : ''}`);
  };

  const getPriorityTone = (priority) => {
    switch(priority) {
      case 'CRITICAL': return 'danger';
      case 'HIGH': return 'warn';
      case 'MEDIUM': return 'info';
      default: return 'default';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'TASK_COMPLETION': return '✅';
      case 'DOCUMENT': return '📄';
      case 'REPORT': return '📊';
      default: return '📋';
    }
  };

  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      <div className="space-y-6">
        {/* Header */}
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
                  Bulk Approval Actions
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Select multiple approvals to process them together
                </p>
              </div>
              <Link href="/md-dashboard/approvals">
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

        {/* Bulk Actions Panel */}
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
                >
                  ✓ Approve All
                </button>
                <button
                  onClick={handleBulkReject}
                  className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                  style={{ backgroundColor: 'var(--accent-red)' }}
                >
                  ✗ Reject All
                </button>
              </div>
            </div>
            <div className="mt-4">
              <textarea
                rows="2"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Add a comment that will be applied to all selected approvals..."
                value={bulkComment}
                onChange={(e) => setBulkComment(e.target.value)}
              />
            </div>
          </Card>
        )}

        {/* Approvals List */}
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
            {pendingApprovals.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50/70 transition">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-extrabold text-sm" style={{ color: 'var(--primary-blue)' }}>
                        {item.id}
                      </span>
                      <Pill tone={getPriorityTone(item.priority)}>{item.priority}</Pill>
                      <Pill tone="info">{getTypeIcon(item.type)} {item.type.replace('_', ' ')}</Pill>
                      <Pill>{item.department}</Pill>
                    </div>
                    <h4 className="font-extrabold text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">Due: {item.dueDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Instructions */}
        <Card className="p-6 bg-blue-50/30">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
              ℹ️
            </div>
            <div>
              <h3 className="font-extrabold text-blue-800">About Bulk Actions</h3>
              <p className="text-sm text-blue-600 mt-1">
                Select multiple approvals to approve or reject them simultaneously. 
                Any comment you add will be applied to all selected items.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}