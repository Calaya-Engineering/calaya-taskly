import { useState } from 'react';
import Layout, { 
  DashboardIcon, DocumentIcon, ReportIcon, 
  CalendarIcon, BellIcon, UserIcon 
} from '../../../components/Layout';

const SecretaryMenuItems = [
  { label: 'Dashboard', path: '/secretary-dashboard', icon: <DashboardIcon /> },
  { label: 'Upload Daily Report', path: '/secretary-dashboard/upload-report', icon: <ReportIcon /> },
  { label: 'Daily Reports Archive', path: '/secretary-dashboard/reports-archive', icon: <ReportIcon />, badge: '24' },
  { label: 'Task Reports Archive', path: '/secretary-dashboard/task-reports', icon: <DocumentIcon />, badge: '45' },
  { label: 'Documents', path: '/secretary-dashboard/documents', icon: <DocumentIcon /> },
  { label: 'Meetings/Events', path: '/secretary-dashboard/events', icon: <CalendarIcon />, badge: '3' },
  { label: 'Tenders', path: '/secretary-dashboard/tenders', icon: <TenderIcon />, badge: '5' },
  { label: 'Announcements', path: '/secretary-dashboard/announcements', icon: <AnnouncementIcon />, badge: '3' },
  { label: 'Notifications', path: '/secretary-dashboard/notifications', icon: <BellIcon />, badge: '12' },
  { label: 'Profile', path: '/secretary-dashboard/profile', icon: <UserIcon /> },
];
