// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import RequestAccess from "./pages/RequestAccess";
import MDDashboard from "./pages/dashboards/MDDashboard";
import HODDashboard from "./pages/dashboards/HODDashboard";
import StaffDashboard from "./pages/dashboards/StaffDashboard";
import SecretaryDashboard from "./pages/dashboards/SecretaryDashboard";

// MD Dashboard Pages 
import MDAllTasks from "./pages/dashboards/MD/MDAllTasks";
import MDActiveJobs from "./pages/dashboards/MD/MDActiveJobs";
import MDDocuments from "./pages/dashboards/MD/MDDocuments";
import MDDailyReports from "./pages/dashboards/MD/MDDailyReports";
import MDEvents from "./pages/dashboards/MD/MDEvents";
import MDTenders from "./pages/dashboards/MD/MDTenders";
import MDAnnouncements from "./pages/dashboards/MD/MDAnnouncements";
import MDApprovals from "./pages/dashboards/MD/MDApprovals";
import MDEscalations from "./pages/dashboards/MD/MDEscalations";
import MDNotifications from "./pages/dashboards/MD/MDNotifications";
import MDProfile from "./pages/dashboards/MD/MDProfile";

// MD Create Pages 
import MDCreateTask from "./pages/dashboards/MD/MDCreateTask";
import MDCreateTender from "./pages/dashboards/MD/MDCreateTender";
import MDCreateDocument from "./pages/dashboards/MD/MDCreateDocument";
import MDCreateEvent from "./pages/dashboards/MD/MDCreateEvent";
import MDCreateAnnouncement from "./pages/dashboards/MD/MDCreateAnnouncement";

// MD Detail Pages 
import MDTaskDetail from "./pages/dashboards/MD/MDTaskDetail";
import MDDocumentDetail from "./pages/dashboards/MD/MDDocumentDetail";
import MDEventDetail from "./pages/dashboards/MD/MDEventDetail";
import MDTenderDetail from "./pages/dashboards/MD/MDTenderDetail";
import MDAnnouncementDetail from "./pages/dashboards/MD/MDAnnouncementDetail";

// MD Tender Documents Pages 
import MDTenderDocuments from "./pages/dashboards/MD/MDTenderDocuments";

// MD Event Edit Page 
import MDEditEvent from './pages/dashboards/MD/MDEditEvent';

// ===== MD APPROVAL PAGES =====
import MDApprovalHistory from "./pages/dashboards/MD/MDApprovalHistory";
import MDApprovalBulk from "./pages/dashboards/MD/MDApprovalBulk";

// Staff Dashboard Pages
import StaffMyTasks from "./pages/dashboards/Staff/StaffMyTasks";
import StaffSubmitReport from "./pages/dashboards/Staff/StaffSubmitReport";
import StaffDocuments from "./pages/dashboards/Staff/StaffDocuments";
import StaffDailyReports from "./pages/dashboards/Staff/StaffDailyReports";
import StaffEvents from "./pages/dashboards/Staff/StaffEvents";
import StaffTenders from "./pages/dashboards/Staff/StaffTenders";
import StaffAnnouncements from "./pages/dashboards/Staff/StaffAnnouncements";
import StaffNotifications from "./pages/dashboards/Staff/StaffNotifications";
import StaffProfile from "./pages/dashboards/Staff/StaffProfile";
import StaffTaskDetail from "./pages/dashboards/Staff/StaffTaskDetail";
import StaffDocumentDetail from "./pages/dashboards/Staff/StaffDocumentDetail";
import StaffEventDetail from "./pages/dashboards/Staff/StaffEventDetail";
import StaffTenderDetail from "./pages/dashboards/Staff/StaffTenderDetail";
import StaffAnnouncementDetail from "./pages/dashboards/Staff/StaffAnnouncementDetail";

// Staff Tender Documents Pages 
import StaffTenderDocuments from "./pages/dashboards/Staff/StaffTenderDocuments";

// Secretary Dashboard Pages
import SecretaryUploadReport from "./pages/dashboards/Secretary/SecretaryUploadReport";
import SecretaryReportsArchive from "./pages/dashboards/Secretary/SecretaryReportsArchive";
import SecretaryTaskReports from "./pages/dashboards/Secretary/SecretaryTaskReports";
import SecretaryDocuments from "./pages/dashboards/Secretary/SecretaryDocuments";
import SecretaryDocumentDetail from "./pages/dashboards/Secretary/SecretaryDocumentDetail";
import SecretaryEvents from "./pages/dashboards/Secretary/SecretaryEvents";
import SecretaryTenders from "./pages/dashboards/Secretary/SecretaryTenders";
import SecretaryNotifications from "./pages/dashboards/Secretary/SecretaryNotifications";
import SecretaryProfile from "./pages/dashboards/Secretary/SecretaryProfile";
import SecretaryEventDetail from "./pages/dashboards/Secretary/SecretaryEventDetail";
import SecretaryTenderDetail from "./pages/dashboards/Secretary/SecretaryTenderDetail";
import SecretaryAnnouncements from "./pages/dashboards/Secretary/SecretaryAnnouncements";
import SecretaryAnnouncementDetail from "./pages/dashboards/Secretary/SecretaryAnnouncementDetail";

// HOD Dashboard Pages
import HODAllTasks from "./pages/dashboards/HOD/HODAllTasks";
import HODMyTasks from "./pages/dashboards/HOD/HODMyTasks";
import HODCreateTask from "./pages/dashboards/HOD/HODCreateTask";
import HODTaskDetail from "./pages/dashboards/HOD/HODTaskDetail";
import HODDocuments from "./pages/dashboards/HOD/HODDocuments";
import HODCreateDocument from "./pages/dashboards/HOD/HODCreateDocument";
import HODDocumentDetail from "./pages/dashboards/HOD/HODDocumentDetail";
import HODDailyReports from "./pages/dashboards/HOD/HODDailyReports";
import HODEvents from "./pages/dashboards/HOD/HODEvents";
import HODCreateEvent from "./pages/dashboards/HOD/HODCreateEvent";
import HODEventDetail from "./pages/dashboards/HOD/HODEventDetail";
import HODTenders from "./pages/dashboards/HOD/HODTenders";
import HODTenderDetail from "./pages/dashboards/HOD/HODTenderDetail";
import HODCreateTender from "./pages/dashboards/HOD/HODCreateTender";
import HODEditTender from "./pages/dashboards/HOD/HODCreateTender"; 
import HODAnnouncements from "./pages/dashboards/HOD/HODAnnouncements";
import HODCreateAnnouncement from "./pages/dashboards/HOD/HODCreateAnnouncement";
import HODAnnouncementDetail from "./pages/dashboards/HOD/HODAnnouncementDetail";
import HODApprovals from "./pages/dashboards/HOD/HODApprovals";
import HODEscalations from "./pages/dashboards/HOD/HODEscalations";
import HODNotifications from "./pages/dashboards/HOD/HODNotifications";
import HODProfile from "./pages/dashboards/HOD/HODProfile";

// HOD Tender Documents Pages 
import HODTenderDocuments from "./pages/dashboards/HOD/HODTenderDocuments";

// HOD Event Edit Page 
import HODEditEvent from './pages/dashboards/HOD/HODEditEvent';

import HODApprovalHistory from "./pages/dashboards/HOD/HODApprovalHistory";


function App() {
  return (
    <Routes>
      {/* Default route → Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Request Access page */}
      <Route path="/request-access" element={<RequestAccess />} />

      {/* ========== MD DASHBOARD ROUTES ========== */}
      <Route path="/md-dashboard" element={<MDDashboard />} />
      
      {/* MD Tasks */}
      <Route path="/md-dashboard/tasks" element={<MDAllTasks />} />
      <Route path="/md-dashboard/task/:taskId" element={<MDTaskDetail />} />
      <Route path="/md-dashboard/create-task" element={<MDCreateTask />} />
      
      {/* MD Jobs */}
      <Route path="/md-dashboard/jobs" element={<MDActiveJobs />} />
      
      {/* MD Documents */}
      <Route path="/md-dashboard/documents" element={<MDDocuments />} />
      <Route path="/md-dashboard/document/:docId" element={<MDDocumentDetail />} />
      <Route path="/md-dashboard/create-document" element={<MDCreateDocument />} />
      
      {/* MD Reports */}
      <Route path="/md-dashboard/reports" element={<MDDailyReports />} />
      
      {/* MD Events */}
      <Route path="/md-dashboard/events" element={<MDEvents />} />
      <Route path="/md-dashboard/event/:eventId" element={<MDEventDetail />} />
      <Route path="/md-dashboard/create-event" element={<MDCreateEvent />} />
      <Route path="/md-dashboard/edit-event/:eventId" element={<MDEditEvent />} />
      
      {/* MD Tenders */}
      <Route path="/md-dashboard/tenders" element={<MDTenders />} />
      <Route path="/md-dashboard/tender/:tenderId" element={<MDTenderDetail />} />
      <Route path="/md-dashboard/tenders/create" element={<MDCreateTender />} />
      
      {/* MD Tender Documents */}
      <Route path="/md-dashboard/tender-documents" element={<MDTenderDocuments />} />
      <Route path="/md-dashboard/tender-documents/:tenderId" element={<MDTenderDocuments />} />
      
      {/* MD Announcements */}
      <Route path="/md-dashboard/announcements" element={<MDAnnouncements />} />
      <Route path="/md-dashboard/announcement/:announcementId" element={<MDAnnouncementDetail />} />
      <Route path="/md-dashboard/create-announcement" element={<MDCreateAnnouncement />} />
      
      {/* MD Approvals - Main Routes */}
      <Route path="/md-dashboard/approvals" element={<MDApprovals />} />
      <Route path="/md-dashboard/approvals/history" element={<MDApprovalHistory />} />
      <Route path="/md-dashboard/approvals/bulk" element={<MDApprovalBulk />} />
      
      {/* MD Escalations */}
      <Route path="/md-dashboard/escalations" element={<MDEscalations />} />
      
      {/* MD Notifications & Profile */}
      <Route path="/md-dashboard/notifications" element={<MDNotifications />} />
      <Route path="/md-dashboard/profile" element={<MDProfile />} />

      {/* ========== STAFF DASHBOARD ROUTES ========== */}
      <Route path="/staff-dashboard" element={<StaffDashboard />} />
      
      {/* Staff Tasks */}
      <Route path="/staff-dashboard/tasks" element={<StaffMyTasks />} />
      <Route path="/staff-dashboard/task/:taskId" element={<StaffTaskDetail />} />
      
      {/* Staff Reports */}
      <Route path="/staff-dashboard/submit-reports" element={<StaffSubmitReport />} />
      <Route path="/staff-dashboard/daily-reports" element={<StaffDailyReports />} />
      
      {/* Staff Documents */}
      <Route path="/staff-dashboard/documents" element={<StaffDocuments />} />
      <Route path="/staff-dashboard/document/:docId" element={<StaffDocumentDetail />} />
      
      {/* Staff Events */}
      <Route path="/staff-dashboard/events" element={<StaffEvents />} />
      <Route path="/staff-dashboard/event/:eventId" element={<StaffEventDetail />} />
      
      {/* Staff Tenders */}
      <Route path="/staff-dashboard/tenders" element={<StaffTenders />} />
      <Route path="/staff-dashboard/tender/:tenderId" element={<StaffTenderDetail />} />
      
      {/* Staff Tender Documents */}
      <Route path="/staff-dashboard/tender-documents" element={<StaffTenderDocuments />} />
      <Route path="/staff-dashboard/tender-documents/:tenderId" element={<StaffTenderDocuments />} />
      
      {/* Staff Announcements */}
      <Route path="/staff-dashboard/announcements" element={<StaffAnnouncements />} />
      <Route path="/staff-dashboard/announcement/:announcementId" element={<StaffAnnouncementDetail />} />
      
      {/* Staff Notifications & Profile */}
      <Route path="/staff-dashboard/notifications" element={<StaffNotifications />} />
      <Route path="/staff-dashboard/profile" element={<StaffProfile />} />

      {/* ========== SECRETARY DASHBOARD ROUTES ========== */}
      <Route path="/secretary-dashboard" element={<SecretaryDashboard />} />
      
      {/* Secretary Reports */}
      <Route path="/secretary-dashboard/upload-report" element={<SecretaryUploadReport />} />
      <Route path="/secretary-dashboard/reports-archive" element={<SecretaryReportsArchive />} />
      <Route path="/secretary-dashboard/task-reports" element={<SecretaryTaskReports />} />
      
      {/* Secretary Documents */}
      <Route path="/secretary-dashboard/documents" element={<SecretaryDocuments />} />
      <Route path="/secretary-dashboard/document/:docId" element={<SecretaryDocumentDetail />} />

      {/* Secretary Events */}
      <Route path="/secretary-dashboard/events" element={<SecretaryEvents />} />
      <Route path="/secretary-dashboard/event/:eventId" element={<SecretaryEventDetail />} />
      
      {/* Secretary Tenders */}
      <Route path="/secretary-dashboard/tenders" element={<SecretaryTenders />} />
      <Route path="/secretary-dashboard/tender/:tenderId" element={<SecretaryTenderDetail />} />
      
      {/* Secretary Announcements */}
      <Route path="/secretary-dashboard/announcements" element={<SecretaryAnnouncements />} />
      <Route path="/secretary-dashboard/announcement/:announcementId" element={<SecretaryAnnouncementDetail />} />
      
      {/* Secretary Notifications & Profile */}
      <Route path="/secretary-dashboard/notifications" element={<SecretaryNotifications />} />
      <Route path="/secretary-dashboard/profile" element={<SecretaryProfile />} />
      
      {/* ========== HOD DASHBOARD ROUTES ========== */}
      <Route path="/hod-dashboard" element={<HODDashboard />} />
      
      {/* HOD Tasks */}
      <Route path="/hod-dashboard/tasks" element={<HODAllTasks />} />
      <Route path="/hod-dashboard/my-tasks" element={<HODMyTasks />} />
      <Route path="/hod-dashboard/create-task" element={<HODCreateTask />} />
      <Route path="/hod-dashboard/task/:taskId" element={<HODTaskDetail />} />
      
      {/* HOD Documents */}
      <Route path="/hod-dashboard/documents" element={<HODDocuments />} />
      <Route path="/hod-dashboard/create-document" element={<HODCreateDocument />} />
      <Route path="/hod-dashboard/document/:docId" element={<HODDocumentDetail />} />
      
      {/* HOD Reports */}
      <Route path="/hod-dashboard/reports" element={<HODDailyReports />} />
      
      {/* HOD Events */}
      <Route path="/hod-dashboard/events" element={<HODEvents />} />
      <Route path="/hod-dashboard/create-event" element={<HODCreateEvent />} />
      <Route path="/hod-dashboard/event/:eventId" element={<HODEventDetail />} />
      <Route path="/hod-dashboard/edit-event/:eventId" element={<HODEditEvent />} />

      {/* HOD Tenders */}
      <Route path="/hod-dashboard/tenders" element={<HODTenders />} />
      <Route path="/hod-dashboard/tender/:tenderId" element={<HODTenderDetail />} />
      <Route path="/hod-dashboard/tenders/create" element={<HODCreateTender />} />
      <Route path="/hod-dashboard/tender/edit/:tenderId" element={<HODEditTender />} />
      
      {/* HOD Tender Documents */}
      <Route path="/hod-dashboard/tender-documents" element={<HODTenderDocuments />} />
      <Route path="/hod-dashboard/tender-documents/:tenderId" element={<HODTenderDocuments />} />
      
      {/* HOD Announcements */}
      <Route path="/hod-dashboard/announcements" element={<HODAnnouncements />} />
      <Route path="/hod-dashboard/create-announcement" element={<HODCreateAnnouncement />} />
      <Route path="/hod-dashboard/announcement/:announcementId" element={<HODAnnouncementDetail />} />
      
      {/* HOD Approvals & Escalations */}
      <Route path="/hod-dashboard/approvals" element={<HODApprovals />} />
      <Route path="/hod-dashboard/approvals/history" element={<HODApprovalHistory />} />
      <Route path="/hod-dashboard/escalations" element={<HODEscalations />} />
      
      {/* HOD Notifications & Profile */}
      <Route path="/hod-dashboard/notifications" element={<HODNotifications />} />
      <Route path="/hod-dashboard/profile" element={<HODProfile />} />
    
    </Routes>
  );
}

export default App;