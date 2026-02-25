"use client";

// pages/dashboards/MD/MDApprovalHistory.jsx
import { useState } from 'react';
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

export default function MDApprovalHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDecision, setFilterDecision] = useState('all');

  // Sample history data - in real app, this would come from API
  const historyData = [
    {
      id: 'APP-007',
      title: 'Workshop Maintenance Report',
      type: 'REPORT',
      submittedBy: 'Robert Chen',
      department: 'Workshop',
      status: 'APPROVED',
      decisionDate: '2024-12-14',
      decisionBy: 'Managing Director',
      comment: 'All maintenance tasks completed satisfactorily. Approved.',
      documents: 2,
    },
    {
      id: 'APP-008',
      title: 'HR Policy Update - Remote Work',
      type: 'DOCUMENT',
      submittedBy: 'Patricia Davis',
      department: 'HR',
      status: 'REJECTED',
      decisionDate: '2024-12-13',
      decisionBy: 'Managing Director',
      comment: 'Policy needs legal review and compliance team input before approval',
      documents: 1,
    },
    {
      id: 'APP-010',
      title: 'Q4 Safety Report',
      type: 'REPORT',
      submittedBy: 'Sarah Smith',
      department: 'HSE',
      status: 'APPROVED',
      decisionDate: '2024-12-12',
      decisionBy: 'Managing Director',
      comment: 'Good work on safety metrics. Approved.',
      documents: 3,
    },
    {
      id: 'APP-011',
      title: 'Equipment Purchase Request',
      type: 'DOCUMENT',
      submittedBy: 'Mike Johnson',
      department: 'Technical',
      status: 'APPROVED',
      decisionDate: '2024-12-11',
      decisionBy: 'Managing Director',
      comment: 'Approved within budget limits.',
      documents: 4,
    },
    {
      id: 'APP-012',
      title: 'Training Budget Proposal',
      type: 'DOCUMENT',
      submittedBy: 'Maria Garcia',
      department: 'Finance',
      status: 'REJECTED',
      decisionDate: '2024-12-10',
      decisionBy: 'Managing Director',
      comment: 'Need to revise based on Q1 projections.',
      documents: 2,
    },
  ];

  const filteredHistory = historyData.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesDecision = filterDecision === 'all' || item.status === filterDecision;
    
    return matchesSearch && matchesType && matchesDecision;
  });

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
                  <Pill>Approval History</Pill>
                  <Pill tone="info">{historyData.length} Records</Pill>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--primary-blue)' }}>
                  Approval History
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Complete history of all approvals and rejections
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

        {/* Filters */}
        <Card className="p-6">
          <SectionTitle title="Filters" subtitle="Search and filter approval history" />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Search by ID, title, requester..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="TASK_COMPLETION">Task Completion</option>
                <option value="DOCUMENT">Document</option>
                <option value="REPORT">Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Decision</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={filterDecision}
                onChange={(e) => setFilterDecision(e.target.value)}
              >
                <option value="all">All Decisions</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>
        </Card>

        {/* History Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200/70">
                <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3 text-left">ID</th>
                  <th className="px-5 py-3 text-left">Title</th>
                  <th className="px-5 py-3 text-left">Type</th>
                  <th className="px-5 py-3 text-left">Requester</th>
                  <th className="px-5 py-3 text-left">Department</th>
                  <th className="px-5 py-3 text-left">Decision</th>
                  <th className="px-5 py-3 text-left">Date</th>
                  <th className="px-5 py-3 text-left">Comment</th>
                  <th className="px-5 py-3 text-left">Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/70 text-[13px]">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition">
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className="font-extrabold" style={{ color: 'var(--primary-blue)' }}>
                        {item.id}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-semibold">{item.title}</div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span>{getTypeIcon(item.type)}</span>
                        <Pill>{item.type.replace('_', ' ')}</Pill>
                      </div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="text-sm">{item.submittedBy}</div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <Pill>{item.department}</Pill>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <Pill tone={item.status === 'APPROVED' ? 'success' : 'danger'}>{item.status}</Pill>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="text-sm">{item.decisionDate}</div>
                      <div className="text-xs text-gray-500">by {item.decisionBy}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-sm text-gray-600 max-w-xs truncate" title={item.comment}>
                        {item.comment}
                      </div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <Pill tone="info">{item.documents}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredHistory.length === 0 && (
            <div className="p-10 text-center">
              <div className="text-4xl mb-3">📋</div>
              <div className="font-extrabold" style={{ color: 'var(--primary-blue)' }}>
                No history records found
              </div>
              <div className="text-sm text-gray-500 mt-1">Try adjusting your filters</div>
            </div>
          )}

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200/70 bg-white">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {filteredHistory.length} of {historyData.length} records
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-xl border text-sm hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1.5 rounded-xl text-white text-sm" style={{ backgroundColor: 'var(--primary-blue)' }}>1</button>
                <button className="px-3 py-1.5 rounded-xl border text-sm hover:bg-gray-50">2</button>
                <button className="px-3 py-1.5 rounded-xl border text-sm hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </Card>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Approved</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: '#10B981' }}>
                  {historyData.filter(i => i.status === 'APPROVED').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-800 text-lg">✅</span>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Rejected</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: 'var(--accent-red)' }}>
                  {historyData.filter(i => i.status === 'REJECTED').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-800 text-lg">❌</span>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approval Rate</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: 'var(--primary-blue)' }}>
                  {Math.round((historyData.filter(i => i.status === 'APPROVED').length / historyData.length) * 100)}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-800 text-lg">📊</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}