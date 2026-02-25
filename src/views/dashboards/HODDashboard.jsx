"use client";

// pages/dashboards/HODDashboard.jsx
import Link from "next/link";
import Layout from '../../components/Layout';
import { HODMenuItems } from '@/utils/menus';
import { PlusIcon, FileUploadIconComponent, MegaphoneIcon, CalendarIcon, TaskIcon as TaskIconLib, AlertIcon as AlertIconLib, UserIcon as UserIconLib, ClockIcon as ClockIconLib, DocumentIcon as DocumentIconLib } from '@/lib/icons';
import { useState } from 'react';


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
    tone === "danger"
      ? "bg-red-50 text-red-700 ring-red-100"
      : tone === "success"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : tone === "warn"
      ? "bg-amber-50 text-amber-800 ring-amber-100"
      : tone === "purple"
      ? "bg-purple-50 text-purple-700 ring-purple-100"
      : "bg-blue-50 text-blue-700 ring-blue-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

const priorityTone = (p) => (p === "URGENT" ? "danger" : p === "IMPORTANT" || p === "HIGH" ? "warn" : "default");

export default function HODDashboard() {
  const [selectedDept, setSelectedDept] = useState('Both');
  
  // Sample data
  const departments = [
    { id: 1, name: 'Technical', tasks: 45, progress: 75, overdue: 3 },
    { id: 2, name: 'Workshop', tasks: 32, progress: 68, overdue: 2 },
  ];

  const stats = [
    { 
      title: selectedDept === 'Both' ? 'Total Department Tasks' : `${selectedDept} Tasks`, 
      value: selectedDept === 'Both' ? '77' : (selectedDept === 'Technical' ? '45' : '32'), 
      change: '+8%', 
      color: 'var(--primary-blue)', 
      link: '/hod-dashboard/tasks',
      bar: selectedDept === 'Both' ? '77%' : (selectedDept === 'Technical' ? '58%' : '41%')
    },
    { 
      title: 'In Progress', 
      value: selectedDept === 'Both' ? '18' : (selectedDept === 'Technical' ? '12' : '6'), 
      change: '+3%', 
      color: 'var(--secondary-blue)', 
      link: '/hod-dashboard/tasks?status=in_progress',
      bar: selectedDept === 'Both' ? '23%' : (selectedDept === 'Technical' ? '27%' : '19%')
    },
    { 
      title: 'Overdue Tasks', 
      value: selectedDept === 'Both' ? '5' : (selectedDept === 'Technical' ? '3' : '2'), 
      change: '-1%', 
      color: 'var(--accent-red)', 
      link: '/hod-dashboard/escalations',
      bar: selectedDept === 'Both' ? '6%' : (selectedDept === 'Technical' ? '7%' : '6%')
    },
    { 
      title: 'My Pending Tasks', 
      value: '5', 
      change: '0%', 
      color: '#8B5CF6', 
      link: '/hod-dashboard/my-tasks',
      bar: '5%'
    },
    { 
      title: 'Pending Approvals', 
      value: '7', 
      change: '+2', 
      color: '#F59E0B', 
      link: '/hod-dashboard/approvals',
      bar: '7%'
    },
    { 
      title: 'Active Tenders', 
      value: '3', 
      change: '+1', 
      color: '#10B981', 
      link: '/hod-dashboard/tenders',
      bar: '3%'
    },
  ];

  const actions = [
    { title: 'Assign Task', desc: 'Assign work to team members', icon: <PlusIcon />, link: '/hod-dashboard/create-task' },
    { title: 'Upload Document', desc: 'Add files to workspace', icon: <FileUploadIconComponent />, link: '/hod-dashboard/create-document' },
    { title: 'Schedule Meeting', desc: 'Create events quickly', icon: <CalendarIcon />, link: '/hod-dashboard/create-event' },
    { title: 'Post Announcement', desc: 'Update your department', icon: <MegaphoneIcon />, link: '/hod-dashboard/create-announcement' },
  ];

  const activity = [
    { user: 'Alex Johnson', action: 'submitted report for offshore maintenance', time: '10 min ago', link: '/hod-dashboard/task/TASK-001' },
    { user: 'Maria Garcia', action: 'updated safety equipment specs', time: '30 min ago', link: '/hod-dashboard/document/DOC-001' },
    { user: 'David Chen', action: 'requested tender clarification', time: '1 hour ago', link: '/hod-dashboard/tender/TEN-001' },
    { user: 'Emma Wilson', action: 'completed workshop tools evaluation', time: '2 hours ago', link: '/hod-dashboard/task/TASK-002' },
    { user: 'Michael Brown', action: 'needs approval for task completion', time: '3 hours ago', link: '/hod-dashboard/approvals' },
  ];

  const approvals = [
    { title: 'Pipeline Inspection Report', department: 'Technical', priority: 'URGENT', deadline: 'Today' },
    { title: 'Safety Equipment Purchase', department: 'HSE', priority: 'HIGH', deadline: 'Tomorrow' },
    { title: 'Workshop Tools Approval', department: 'Workshop', priority: 'MEDIUM', deadline: '2 days' },
  ];

  const tenders = [
    { title: 'Offshore Platform Maintenance', department: 'Technical', status: 'OPEN', deadline: 'Dec 31' },
    { title: 'Safety Equipment Procurement', department: 'HSE', status: 'OPEN', deadline: 'Dec 20' },
    { title: 'Workshop Tools Supply', department: 'Workshop', status: 'OPEN', deadline: 'Dec 25' },
  ];

  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
      <div className="space-y-6">
        {/* Hero */}
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
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Pill>Department Overview</Pill>
                  <Pill tone="success">System Healthy</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Welcome, Head of Department
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Manage your department tasks, monitor performance, and oversee operations at a glance.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Technical', 'Workshop', 'Both'].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-5 py-3 rounded-2xl font-semibold transition active:scale-[0.99] ${
                      selectedDept === dept 
                        ? 'text-white' 
                        : 'border bg-white hover:bg-gray-50'
                    }`}
                    style={{
                      backgroundColor: selectedDept === dept ? 'var(--primary-blue)' : 'transparent',
                      borderColor: selectedDept === dept ? 'transparent' : 'rgba(44,75,155,0.35)',
                      color: selectedDept === dept ? 'white' : 'var(--primary-blue)',
                    }}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <Link key={index} href={stat.link} className="group">
              <Card className="p-5 shadow-none hover:-translate-y-0.5 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-extrabold tracking-tight mt-1">{stat.value}</p>
                    <p className="text-sm mt-3" style={{ color: stat.color }}>
                      {stat.change} <span className="text-gray-500">from last week</span>
                    </p>
                  </div>

                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center "
                    style={{ backgroundColor: `${stat.color}18` }}
                    aria-hidden="true"
                  >
                    <span style={{ color: stat.color }}>
                      {index === 0 ? <TaskIconLib size={24} /> : index === 1 ? <AlertIconLib size={24} /> : index === 2 ? <AlertIconLib size={24} /> :
                       index === 3 ? <UserIconLib size={24} /> : index === 4 ? <ClockIconLib size={24} /> : <DocumentIconLib size={24} />}
                    </span>
                  </div>
                </div>

                <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: stat.bar,
                      background: stat.color,
                    }}
                  />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <SectionTitle title="Quick Actions" subtitle="Fast shortcuts for common department operations" />
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {actions.map((a) => (
              <Link key={a.title} href={a.link} className="group">
                <div className="p-5 rounded-2xl border border-gray-200/80 bg-white hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center "
                      style={{ backgroundColor: "rgba(109, 198, 223, 0.18)", color: "var(--primary-blue)" }}
                    >
                      {a.icon}
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-700 transition">Open →</span>
                  </div>
                  <div className="mt-4">
                    <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      {a.title}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{a.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Two Columns */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Department Performance */}
          <Card className="p-6">
            <SectionTitle
              title={selectedDept === 'Both' ? 'Departments Overview' : `${selectedDept} Department`}
              subtitle="Progress and task distribution"
              action={
                <Link href="/hod-dashboard/tasks">
                  <button
                    className="text-sm font-semibold px-3 py-2 rounded-xl text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    View All Tasks
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-3">
              {(selectedDept === 'Both' ? departments : departments.filter(d => d.name === selectedDept))
                .map((dept) => (
                  <Link key={dept.name} href={`/hod-dashboard/tasks?dept=${dept.name}`} className="block">
                    <div className="rounded-2xl border border-gray-200/70 p-4 hover:bg-gray-50 transition">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0"
                            style={{ backgroundColor: "var(--primary-blue)" }}
                          >
                            {dept.name.charAt(0)}
                          </div>
                          <div className="font-semibold">{dept.name} Department</div>
                        </div>
                        <Pill tone={dept.progress >= 70 ? "success" : dept.progress >= 40 ? "warn" : "danger"}>
                          {dept.progress}%
                        </Pill>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                        <span>{dept.tasks} total tasks</span>
                        <span className="text-red-600">{dept.overdue} overdue</span>
                      </div>

                      <div className="mt-3 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${dept.progress}%`,
                            backgroundColor: "var(--primary-blue)",
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <SectionTitle
              title="Recent Activity"
              subtitle="Live updates from your teams"
              action={
                <Link href="/hod-dashboard/notifications">
                  <button
                    className="text-sm font-semibold px-3 py-2 rounded-xl text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    See All
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-2">
              {activity.map((a, index) => (
                <Link key={index} href={a.link} className="block">
                  <div className="flex items-start gap-3 p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0 "
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    >
                      {a.user.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-800">
                        <span className="font-semibold">{a.user}</span>{" "}
                        <span className="text-gray-700">{a.action}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{a.time}</p>
                    </div>
                    <span className="text-xs text-gray-400 mt-1">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Urgent Approvals */}
          <Card className="p-6">
            <SectionTitle
              title="Urgent Approvals Needed"
              subtitle="Time-sensitive requests awaiting your decision"
              action={
                <Link href="/hod-dashboard/approvals">
                  <button
                    className="text-sm font-semibold px-3 py-2 rounded-xl text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    View All
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-2">
              {approvals.map((approval, index) => (
                <Link key={index} href="/hod-dashboard/approvals" className="block">
                  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{approval.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{approval.department}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-extrabold" style={{ 
                          color: approval.priority === 'URGENT' ? 'var(--accent-red)' : 
                                 approval.priority === 'HIGH' ? '#F59E0B' : 'var(--primary-blue)' 
                        }}>
                          {approval.deadline}
                        </p>
                        <Pill tone={priorityTone(approval.priority)}>{approval.priority}</Pill>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Recent Tenders */}
          <Card className="p-6">
            <SectionTitle
              title="Recent Tenders"
              subtitle="Open procurement opportunities"
              action={
                <Link href="/hod-dashboard/tenders">
                  <button
                    className="text-sm font-semibold px-3 py-2 rounded-xl text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    View All
                  </button>
                </Link>
              }
            />

            <div className="mt-5 space-y-2">
              {tenders.map((tender, index) => (
                <Link key={index} href={`/hod-dashboard/tender/${tender.title.replace(/\s+/g, '-')}`} className="block">
                  <div className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{tender.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{tender.department}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm text-gray-500">{tender.deadline}</p>
                        <Pill tone={tender.status === 'OPEN' ? 'success' : 'default'}>{tender.status}</Pill>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}