// pages/dashboards/HOD/HODApprovalHistory.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout, { 
  DashboardIcon, 
  TaskIcon, 
  DocumentIcon, 
  ReportIcon, 
  CalendarIcon, 
  AnnouncementIcon, 
  ApprovalIcon, 
  AlertIcon, 
  BellIcon, 
  UserIcon,
  TenderIcon 
} from '../../../components/Layout';

const HODMenuItems = [
  { label: 'Dashboard', path: '/hod-dashboard', icon: <DashboardIcon /> },
  { label: 'Department Tasks', path: '/hod-dashboard/tasks', icon: <TaskIcon />, badge: '18' },
  { label: 'My Tasks', path: '/hod-dashboard/my-tasks', icon: <TaskIcon />, badge: '5' },
  { label: 'Documents', path: '/hod-dashboard/documents', icon: <DocumentIcon /> },
  { label: 'Daily Reports', path: '/hod-dashboard/reports', icon: <ReportIcon /> },
  { label: 'Meetings/Events', path: '/hod-dashboard/events', icon: <CalendarIcon /> },
  { label: 'Tenders', path: '/hod-dashboard/tenders', icon: <TenderIcon />, badge: '3' },
  { label: 'Tender Documents', path: '/hod-dashboard/tender-documents', icon: <TenderIcon /> },
  { label: 'Announcements', path: '/hod-dashboard/announcements', icon: <AnnouncementIcon /> },
  { label: 'Approvals', path: '/hod-dashboard/approvals', icon: <ApprovalIcon />, badge: '4' },
  { label: 'Escalations/Overdue', path: '/hod-dashboard/escalations', icon: <AlertIcon />, badge: '2' },
  { label: 'Notifications', path: '/hod-dashboard/notifications', icon: <BellIcon />, badge: '8' },
  { label: 'Profile', path: '/hod-dashboard/profile', icon: <UserIcon /> },
];

const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-sm ${className}`}>{children}</div>
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

export default function HODApprovalHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDecision, setFilterDecision] = useState('all');


  const historyData = [
    {
      id: 'APR-005',
      title: 'Leave Request - Team Lead',
      type: 'OTHER',
      submittedBy: 'Michael Brown',
      department: 'Technical',
      status: 'APPROVED',
      decisionDate: '2024-12-12',
      decisionBy: 'HOD - Technical',
      comment: 'Approved. Ensure handover plan is documented.',
      documents: 0,
    },
    {
      id: 'APR-006',
      title: 'Expense Report Approval',
      type: 'REPORT',
      submittedBy: 'Sarah Taylor',
      department: 'Workshop',
      status: 'REJECTED',
      decisionDate: '2024-12-11',
      decisionBy: 'HOD - Workshop',
      comment: 'Missing receipts for several items. Please resubmit with complete documentation.',
      documents: 5,
    },
    {
      id: 'APR-008',
      title: 'Weekly Operations Report',
      type: 'REPORT',
      submittedBy: 'James Miller',
      department: 'Workshop',
      status: 'APPROVED',
      decisionDate: '2024-12-09',
      decisionBy: 'HOD - Workshop',
      comment: 'Good work. Keep it up.',
      documents: 2,
    },
    {
      id: 'APR-009',
      title: 'Safety Training Request',
      type: 'DOCUMENT',
      submittedBy: 'Emma Wilson',
      department: 'Technical',
      status: 'APPROVED',
      decisionDate: '2024-12-08',
      decisionBy: 'HOD - Technical',
      comment: 'Approved. Coordinate with HR for scheduling.',
      documents: 3,
    },
    {
      id: 'APR-010',
      title: 'Tool Purchase Request',
      type: 'DOCUMENT',
      submittedBy: 'David Chen',
      department: 'Workshop',
      status: 'REJECTED',
      decisionDate: '2024-12-07',
      decisionBy: 'HOD - Workshop',
      comment: 'Budget constraints. Will reconsider next quarter.',
      documents: 2,
    },
    {
      id: 'APR-011',
      title: 'Monthly Safety Report',
      type: 'REPORT',
      submittedBy: 'Maria Garcia',
      department: 'HSE',
      status: 'APPROVED',
      decisionDate: '2024-12-06',
      decisionBy: 'HOD - HSE',
      comment: 'All safety metrics look good. Approved.',
      documents: 1,
    },
    {
      id: 'APR-012',
      title: 'Overtime Request',
      type: 'OTHER',
      submittedBy: 'Alex Johnson',
      department: 'Technical',
      status: 'APPROVED',
      decisionDate: '2024-12-05',
      decisionBy: 'HOD - Technical',
      comment: 'Approved for project deadline.',
      documents: 0,
    },
    {
      id: 'APR-013',
      title: 'Equipment Calibration Report',
      type: 'REPORT',
      submittedBy: 'Robert Lee',
      department: 'Technical',
      status: 'REJECTED',
      decisionDate: '2024-12-04',
      decisionBy: 'HOD - Technical',
      comment: 'Missing calibration certificates. Please resubmit.',
      documents: 3,
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
    <Layout menuItems={HODMenuItems} userRole="HOD">
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
                  Department Approval History
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Complete history of all approvals and rejections from your department
                </p>
              </div>
              <Link to="/hod-dashboard/approvals">
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
                <option value="OTHER">Other</option>
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