"use client";

import {
  DashboardIcon,
  TaskIcon,
  DocumentIcon,
  ReportIcon,
  CalendarIcon,
  AnnouncementIcon,
  UserIcon,
  BellIcon,
  ApprovalIcon,
  AlertIcon,
  TenderIcon,
  BuildingIcon,
} from "@/lib/icons";

export const AdminMenuItems = [
  { label: "Dashboard", path: "/admin-dashboard", icon: <DashboardIcon />, group: "Overview" },
  { label: "Users", path: "/admin-dashboard/users", icon: <UserIcon />, group: "Management" },
  { label: "Roles", path: "/admin-dashboard/roles", icon: <UserIcon />, group: "Management" },
  { label: "Accounts", path: "/admin-dashboard/accounts", icon: <UserIcon />, group: "Management" },
  { label: "Departments", path: "/admin-dashboard/departments", icon: <BuildingIcon />, group: "Management" },
];

export const HODMenuItems = [
  { label: "Dashboard", path: "/hod-dashboard", icon: <DashboardIcon />, group: "Overview" },
  { label: "Department Users", path: "/hod-dashboard/department-users", icon: <UserIcon />, group: "Management" },
  { label: "Department Tasks", path: "/hod-dashboard/tasks", icon: <TaskIcon />, group: "Tasks" },
  { label: "My Tasks", path: "/hod-dashboard/my-tasks", icon: <TaskIcon />, group: "Tasks" },
  { label: "Documents", path: "/hod-dashboard/documents", icon: <DocumentIcon />, group: "Documents & Reports" },
  {
    label: "Reports",
    icon: <ReportIcon />,
    group: "Documents & Reports",
    children: [
      { label: "Daily reports", path: "/hod-dashboard/reports", icon: <ReportIcon /> },
      { label: "Task reports", path: "/hod-dashboard/task-reports", icon: <TaskIcon /> },
    ],
  },
  { label: "Meetings/Events", path: "/hod-dashboard/events", icon: <CalendarIcon />, group: "Calendar" },
  { label: "Tenders", path: "/hod-dashboard/tenders", icon: <TenderIcon />, group: "Tenders" },
  { label: "Tender Documents", path: "/hod-dashboard/tender-documents", icon: <DocumentIcon />, group: "Tenders" },
  { label: "Announcements", path: "/hod-dashboard/announcements", icon: <AnnouncementIcon />, group: "Communications" },
  { label: "Approvals", path: "/hod-dashboard/approvals", icon: <ApprovalIcon />, group: "Workflow" },
  { label: "Escalations/Overdue", path: "/hod-dashboard/escalations", icon: <AlertIcon />, group: "Workflow" },
  { label: "Notifications", path: "/hod-dashboard/notifications", icon: <BellIcon />, group: "Account" },
  { label: "Profile", path: "/hod-dashboard/profile", icon: <UserIcon />, group: "Account" },
];

export const MDMenuItems = [
  { label: "Dashboard", path: "/md-dashboard", icon: <DashboardIcon />, group: "Overview" },
  { label: "All Tasks", path: "/md-dashboard/tasks", icon: <TaskIcon />, group: "Tasks" },
  { label: "Active Jobs", path: "/md-dashboard/jobs", icon: <TaskIcon />, group: "Tasks" },
  { label: "Documents", path: "/md-dashboard/documents", icon: <DocumentIcon />, group: "Documents & Reports" },
  { label: "Daily Reports", path: "/md-dashboard/reports", icon: <ReportIcon />, group: "Documents & Reports" },
  { label: "Meetings/Events", path: "/md-dashboard/events", icon: <CalendarIcon />, group: "Calendar" },
  { label: "Tenders", path: "/md-dashboard/tenders", icon: <DocumentIcon />, group: "Tenders" },
  { label: "Tender Documents", path: "/md-dashboard/tender-documents", icon: <DocumentIcon />, group: "Tenders" },
  { label: "Announcements", path: "/md-dashboard/announcements", icon: <AnnouncementIcon />, group: "Communications" },
  { label: "Approvals", path: "/md-dashboard/approvals", icon: <ApprovalIcon />, group: "Workflow" },
  { label: "Escalations/Overdue", path: "/md-dashboard/escalations", icon: <AlertIcon />, group: "Workflow" },
  { label: "Notifications", path: "/md-dashboard/notifications", icon: <BellIcon />, group: "Account" },
  { label: "Profile", path: "/md-dashboard/profile", icon: <UserIcon />, group: "Account" },
];

export const StaffMenuItems = [
  { label: "Dashboard", path: "/staff-dashboard", icon: <DashboardIcon />, group: "Overview" },
  { label: "My Tasks", path: "/staff-dashboard/tasks", icon: <TaskIcon />, group: "Tasks" },
  { label: "Submit Reports", path: "/staff-dashboard/submit-reports", icon: <ReportIcon />, group: "Documents & Reports" },
  { label: "Documents", path: "/staff-dashboard/documents", icon: <DocumentIcon />, group: "Documents & Reports" },
  { label: "Daily Reports", path: "/staff-dashboard/daily-reports", icon: <ReportIcon />, group: "Documents & Reports" },
  { label: "Meetings/Events", path: "/staff-dashboard/events", icon: <CalendarIcon />, group: "Calendar" },
  { label: "Tenders", path: "/staff-dashboard/tenders", icon: <TenderIcon />, group: "Tenders" },
  { label: "Tender Documents", path: "/staff-dashboard/tender-documents", icon: <DocumentIcon />, group: "Tenders" },
  { label: "Announcements", path: "/staff-dashboard/announcements", icon: <AnnouncementIcon />, group: "Communications" },
  { label: "Notifications", path: "/staff-dashboard/notifications", icon: <BellIcon />, group: "Account" },
  { label: "Profile", path: "/staff-dashboard/profile", icon: <UserIcon />, group: "Account" },
];

export const SecretaryMenuItems = [
  { label: "Dashboard", path: "/secretary-dashboard", icon: <DashboardIcon />, group: "Overview" },
  { label: "Upload Daily Report", path: "/secretary-dashboard/upload-report", icon: <ReportIcon />, group: "Documents & Reports" },
  { label: "Daily Reports Archive", path: "/secretary-dashboard/reports-archive", icon: <ReportIcon />, group: "Documents & Reports" },
  { label: "Task Reports Archive", path: "/secretary-dashboard/task-reports", icon: <DocumentIcon />, group: "Documents & Reports" },
  { label: "Documents", path: "/secretary-dashboard/documents", icon: <DocumentIcon />, group: "Documents & Reports" },
  { label: "Meetings/Events", path: "/secretary-dashboard/events", icon: <CalendarIcon />, group: "Calendar" },
  { label: "Tenders", path: "/secretary-dashboard/tenders", icon: <TenderIcon />, group: "Tenders" },
  { label: "Announcements", path: "/secretary-dashboard/announcements", icon: <AnnouncementIcon />, group: "Communications" },
  { label: "Notifications", path: "/secretary-dashboard/notifications", icon: <BellIcon />, group: "Account" },
  { label: "Profile", path: "/secretary-dashboard/profile", icon: <UserIcon />, group: "Account" },
];
