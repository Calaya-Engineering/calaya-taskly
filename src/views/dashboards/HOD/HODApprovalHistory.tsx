"use client";

// pages/dashboards/HOD/HODApprovalHistory.tsx
import { useState, useCallback, useEffect } from 'react';
import Link from "next/link";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";
import { fetchWithAuth } from "@/lib/api";
import { useSSE } from "@/hooks/useSSE";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

const Card = ({ className = "", children, ...props }: any) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`} {...props}>{children}</div>
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

export default function HODApprovalHistory() {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDecision, setFilterDecision] = useState('all');

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetchWithAuth("/api/tasks?limit=500");
      if (res.ok) {
        const tasks = await res.json();
        const mapped = tasks
          .filter((t: any) => t.status !== "PENDING")
          .map((t: any) => ({
            id: `APR-${String(t.id).padStart(3, '0')}`,
            title: t.title,
            type: t.type === "JOB" ? "TASK_COMPLETION" : "DOCUMENT",
            submittedBy: t.createdBy?.name || t.createdBy?.email || "System",
            department: t.department || "—",
            status: t.status === "COMPLETED" ? "APPROVED" : "REJECTED",
            decisionDate: t.completedAt?.split("T")[0] || t.updatedAt?.split("T")[0] || "",
            decisionBy: "Department Head",
            comment: t.comment || "-",
            documents: 0,
          }));
        setHistoryData(mapped);
      }
    } catch (e) {
      console.error("Failed to fetch history:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useSSE("/api/tasks/events", (ev) => {
    if (ev.type?.startsWith("task:")) fetchHistory();
  });

  const filteredHistory = historyData.filter((item: any) => {
    const matchesSearch = searchTerm === '' || 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesDecision = filterDecision === 'all' || item.status === filterDecision;
    
    return matchesSearch && matchesType && matchesDecision;
  });

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
                  <Pill>Approval History</Pill>
                  <Pill tone="info">{historyData.length} Records</Pill>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--primary-blue)' }}>
                  Department Approval History
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Complete history of all approvals and rejections from your department
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

        <Card className="p-6">
          <SectionTitle title="Filters" subtitle="Search and filter approval history" />
          <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white"
                placeholder="Search by ID, title, requester..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="TASK_COMPLETION">Task Completion</option>
                <option value="DOCUMENT">Document</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Decision</label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white"
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

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200/70">
                <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3 text-left">ID</th>
                  <th className="px-5 py-3 text-left">Title</th>
                  <th className="px-5 py-3 text-left">Decision</th>
                  <th className="px-5 py-3 text-left">Date</th>
                  <th className="px-5 py-3 text-left">Comment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/70 text-[13px]">
                {loading ? (
                  <tr><td colSpan={5} className="px-5 py-10 text-center">Loading...</td></tr>
                ) : filteredHistory.map((item: any) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition">
                    <td className="px-5 py-3 whitespace-nowrap font-extrabold text-blue-900">{item.id}</td>
                    <td className="px-5 py-3 font-semibold">{item.title}</td>
                    <td className="px-5 py-3"><Pill tone={item.status === 'APPROVED' ? 'success' : 'danger'}>{item.status}</Pill></td>
                    <td className="px-5 py-3 text-xs">{item.decisionDate}<br/><span className="text-gray-400">by {item.decisionBy}</span></td>
                    <td className="px-5 py-3 text-gray-600 truncate max-w-xs">{item.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}