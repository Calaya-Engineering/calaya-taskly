# Calaya Taskly — Project Documentation

**Oil & Gas Task Management System**  
*Calaya Engineering Services Ltd.*

---

## 1. Project Scope & Purpose

**Calaya EMS** is a role-based task management and collaboration platform designed for **Calaya Engineering Services Ltd.**, an oil & gas company. The application streamlines:

- **Task assignment and tracking** across departments
- **Document management** and tender processing
- **Daily reporting** and performance monitoring
- **Approval workflows** (HOD and MD level)
- **Announcements** and company communications
- **Event and meeting management**

The system targets organizational efficiency by providing dedicated dashboards per role, with appropriate permissions and workflows.

---

## 2. Functionality & Features Covered

### 2.1 Core Modules

| Module | Description |
|--------|-------------|
| **Tasks** | Create, assign, track, and manage tasks. Staff execute; HOD assigns and approves; MD oversees all. |
| **Documents** | Upload, categorize, and share documents. Role-based access control. |
| **Daily Reports** | Submit, view, and archive daily operational reports. Secretary uploads; Staff submits task reports. |
| **Events/Meetings** | Create, edit, and manage company events and meetings. RSVP and calendar views. |
| **Tenders** | Manage procurement tenders. Create, track deadlines, attach documents. |
| **Announcements** | Company-wide and departmental announcements with priority levels. |
| **Approvals** | Request approval workflows for tasks, documents, reports, leave, purchase, etc. |
| **Escalations** | Track overdue tasks and items requiring urgent attention. |
| **Notifications** | Central notification hub per role. |
| **Profile** | User profile management, settings, password change. |

### 2.2 Request/Access Features

- **Request Access** (pre-login): New users request access by filling a form (full name, email, department, role, job title, supervisor, reason). Admin creates accounts upon approval.
- **Staff Approval Requests** (StaffRequest): Staff submit approval requests (task completion, document, report, leave, purchase, training, overtime) to HOD or MD.
- **Secretary Submissions** (SecretaryRequest): Secretary submits documents for approval (meeting minutes, correspondence, reports, announcements, meeting schedules, office supply requests).

---

## 3. Authentication & Roles

### 3.1 Current Authentication Model

- **Demo-based login** — no real backend auth. Credentials are hardcoded for demo purposes.
- **Route-based access** — each role is redirected to a specific dashboard after login.
- **No route guards** — any user can manually navigate to any dashboard URL. Suitable for prototyping; production would need protected routes and server-side auth.

### 3.2 Roles Defined

| Role | Route | Purpose |
|------|-------|---------|
| **MD** (Managing Director) | `/md-dashboard` | Executive oversight, approvals, escalations, company-wide view |
| **HOD** (Head of Department) | `/hod-dashboard` | Department management, task assignment, approvals, tender creation |
| **Staff** | `/staff-dashboard` | Execute tasks, submit reports, view documents, tenders, announcements |
| **Personnel** | `/staff-dashboard` | Same as Staff (uses Staff dashboard) |
| **Corp Member** | `/staff-dashboard` | Same as Staff (corporate member) |
| **Secretary** | `/secretary-dashboard` | Upload daily reports, manage reports archive, task reports, documents, events, tenders |

### 3.3 Roles That Cannot Be Requested

Per the Request Access form: **HOD**, **MD**, and **SuperAdmin** cannot be requested and must be assigned by the system administrator.

---

## 4. Role-Based Dashboards & Functionality

### 4.1 MD (Managing Director) Dashboard

**Path:** `/md-dashboard`

| Feature | Path | Description |
|---------|------|-------------|
| Dashboard | `/md-dashboard` | Executive overview: stats, department performance, recent activity, tenders closing soon |
| Tasks (All) | `/md-dashboard/tasks` | View all company tasks |
| Task Detail | `/md-dashboard/task/:taskId` | View task details |
| Create Task | `/md-dashboard/create-task` | Create new tasks |
| Active Jobs | `/md-dashboard/jobs` | View active jobs |
| Documents | `/md-dashboard/documents` | Browse documents |
| Document Detail | `/md-dashboard/document/:docId` | View document details |
| Create Document | `/md-dashboard/create-document` | Upload new documents |
| Daily Reports | `/md-dashboard/reports` | View daily reports |
| Events | `/md-dashboard/events` | View/create events |
| Event Detail | `/md-dashboard/event/:eventId` | View event details |
| Create Event | `/md-dashboard/create-event` | Schedule events |
| Edit Event | `/md-dashboard/edit-event/:eventId` | Edit events |
| Tenders | `/md-dashboard/tenders` | View tenders |
| Tender Detail | `/md-dashboard/tender/:tenderId` | View tender details |
| Create Tender | `/md-dashboard/tenders/create` | Create new tenders |
| Tender Documents | `/md-dashboard/tender-documents` | Manage tender attachments |
| Announcements | `/md-dashboard/announcements` | View announcements |
| Announcement Detail | `/md-dashboard/announcement/:announcementId` | View announcement |
| Create Announcement | `/md-dashboard/create-announcement` | Post announcements |
| Approvals | `/md-dashboard/approvals` | Approval queue |
| Approval History | `/md-dashboard/approvals/history` | Past approvals |
| Bulk Approval | `/md-dashboard/approvals/bulk` | Bulk approve items |
| Escalations | `/md-dashboard/escalations` | Overdue/escalated items |
| Notifications | `/md-dashboard/notifications` | Notifications |
| Profile | `/md-dashboard/profile` | Profile settings |

---

### 4.2 HOD (Head of Department) Dashboard

**Path:** `/hod-dashboard`

| Feature | Path | Description |
|---------|------|-------------|
| Dashboard | `/hod-dashboard` | Department overview with department switcher (Technical, Workshop, Both) |
| Department Tasks | `/hod-dashboard/tasks` | All department tasks |
| My Tasks | `/hod-dashboard/my-tasks` | HOD’s personal tasks |
| Task Detail | `/hod-dashboard/task/:taskId` | Task details |
| Create Task | `/hod-dashboard/create-task` | Assign tasks to staff |
| Documents | `/hod-dashboard/documents` | Department documents |
| Create Document | `/hod-dashboard/create-document` | Upload documents |
| Document Detail | `/hod-dashboard/document/:docId` | Document details |
| Daily Reports | `/hod-dashboard/reports` | View reports |
| Events | `/hod-dashboard/events` | Events |
| Create Event | `/hod-dashboard/create-event` | Schedule events |
| Event Detail | `/hod-dashboard/event/:eventId` | Event details |
| Edit Event | `/hod-dashboard/edit-event/:eventId` | Edit events |
| Tenders | `/hod-dashboard/tenders` | Tenders |
| Tender Detail | `/hod-dashboard/tender/:tenderId` | Tender details |
| Create Tender | `/hod-dashboard/tenders/create` | Create tenders |
| Tender Documents | `/hod-dashboard/tender-documents` | Tender attachments |
| Announcements | `/hod-dashboard/announcements` | View announcements |
| Create Announcement | `/hod-dashboard/create-announcement` | Post announcements |
| Approvals | `/hod-dashboard/approvals` | Approval queue |
| Approval History | `/hod-dashboard/approvals/history` | Past approvals |
| Escalations | `/hod-dashboard/escalations` | Overdue items |
| Notifications | `/hod-dashboard/notifications` | Notifications |
| Profile | `/hod-dashboard/profile` | Profile settings |

---

### 4.3 Staff Dashboard

**Path:** `/staff-dashboard`

| Feature | Path | Description |
|---------|------|-------------|
| Dashboard | `/staff-dashboard` | Personal overview: assigned tasks, documents, tenders, announcements |
| My Tasks | `/staff-dashboard/tasks` | Assigned tasks |
| Task Detail | `/staff-dashboard/task/:taskId` | Task details |
| Submit Reports | `/staff-dashboard/submit-reports` | Submit task reports |
| Daily Reports | `/staff-dashboard/daily-reports` | View daily reports |
| Documents | `/staff-dashboard/documents` | Browse documents |
| Document Detail | `/staff-dashboard/document/:docId` | Document details |
| Events | `/staff-dashboard/events` | Events |
| Event Detail | `/staff-dashboard/event/:eventId` | Event details |
| Tenders | `/staff-dashboard/tenders` | View tenders |
| Tender Detail | `/staff-dashboard/tender/:tenderId` | Tender details |
| Tender Documents | `/staff-dashboard/tender-documents` | Tender attachments |
| Announcements | `/staff-dashboard/announcements` | Announcements |
| Announcement Detail | `/staff-dashboard/announcement/:announcementId` | Announcement details |
| Notifications | `/staff-dashboard/notifications` | Notifications |
| Profile | `/staff-dashboard/profile` | Profile settings |

---

### 4.4 Secretary Dashboard

**Path:** `/secretary-dashboard`

| Feature | Path | Description |
|---------|------|-------------|
| Dashboard | `/secretary-dashboard` | Reports stats, recent reports/announcements, task reports, activity |
| Upload Daily Report | `/secretary-dashboard/upload-report` | Upload daily reports (with sessionStorage draft) |
| Daily Reports Archive | `/secretary-dashboard/reports-archive` | Archived daily reports |
| Task Reports Archive | `/secretary-dashboard/task-reports` | Task reports from staff |
| Documents | `/secretary-dashboard/documents` | Documents |
| Document Detail | `/secretary-dashboard/document/:docId` | Document details |
| Events | `/secretary-dashboard/events` | Events |
| Event Detail | `/secretary-dashboard/event/:eventId` | Event details |
| Tenders | `/secretary-dashboard/tenders` | Tenders |
| Tender Detail | `/secretary-dashboard/tender/:tenderId` | Tender details |
| Announcements | `/secretary-dashboard/announcements` | Announcements |
| Announcement Detail | `/secretary-dashboard/announcement/:announcementId` | Announcement details |
| Notifications | `/secretary-dashboard/notifications` | Notifications |
| Profile | `/secretary-dashboard/profile` | Profile settings |

---

## 5. Departments (from Request Access & Forms)

- Technical  
- Workshop  
- Logistics  
- Contract and Procurement  
- Legal and Compliances  
- Human Resources  
- HSE  
- Business Development (BDD)  
- Accounts  
- NCD  
- QHSE  
- Admin  

---

## 6. Systems Implemented in the Frontend

### 6.1 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **Vite 7** | Build tool and dev server |
| **React Router DOM 7** | Client-side routing |
| **Tailwind CSS** | Styling |
| **Axios** | HTTP client (listed in dependencies; not heavily used yet) |
| **jwt-decode** | JWT decoding (listed; not used in current demo flow) |

### 6.2 Routing

- **BrowserRouter** wraps the app.
- Routes split by role: `/md-dashboard/*`, `/hod-dashboard/*`, `/staff-dashboard/*`, `/secretary-dashboard/*`.
- Public routes: `/`, `/login`, `/request-access`.
- Default `/` redirects to `/login`.

### 6.3 Layout System

- **Layout** component: shared sidebar, top bar, Quick Stats, role badge.
- **menuItems** passed per dashboard (MD, HOD, Staff, Secretary).
- Sidebar is responsive with mobile overlay.

### 6.4 State Management

- **Local component state** via `useState`.
- **sessionStorage** for draft persistence:
  - Secretary upload report form (report entries, title, modal state).
  - Staff daily reports form (report entries, modal state).
  - HOD tender documents (comment draft).
- No global state (Redux, Zustand, etc.) or context.

### 6.5 Data Layer

- **Mock/sample data** in components.
- No real API integration; all data is in-memory.
- Placeholders for API calls (e.g., `await new Promise(resolve => setTimeout(resolve, 1500))`).

### 6.6 UI Patterns

- **Card**, **SectionTitle**, **Pill** (status badges).
- **Quick Stats** in sidebar.
- **Badges** on menu items for counts.
- **Tabs** on detail pages (overview, documents, comments, etc.).
- **Filters & search** on list views.
- **Upload** with drag-and-drop and progress.
- **Multi-step forms** (StaffRequest, SecretaryRequest, tender creation).



## 7. Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| MD | md@calaya.com | demo123 |
| HOD | hod@calaya.com | demo123 |
| Staff | staff@calaya.com | demo123 |
| Personnel | personnel@calaya.com | demo123 |
| Corp Member | corp@calaya.com | demo123 |
| Secretary | secretary@calaya.com | demo123 |

---

## 8. Notable Implementation Notes

1. **StaffRequest** and **SecretaryRequest** exist but their routes (`/staff-dashboard/requests`, `/secretary-dashboard/submissions`) are not present in `App.jsx`. They need to be added for full integration.
2. **Secretary upload report** uses sessionStorage to persist form drafts when the modal is open.
3. **HOD dashboard** supports department filtering (Technical, Workshop, Both).
4. **MD** has **Bulk Approval**; HOD does not.
5. **Forgot password** link is shown but no corresponding route exists.

---

## 9. File Structure (Summary)

```
src/
├── App.jsx              # Routes
├── main.jsx             # Entry
├── index.css            # Global styles
├── components/
│   └── Layout.jsx       # Shared layout + icons
├── pages/
│   ├── Login.jsx
│   ├── RequestAccess.jsx
│   └── dashboards/
│       ├── MDDashboard.jsx
│       ├── HODDashboard.jsx
│       ├── StaffDashboard.jsx
│       ├── SecretaryDashboard.jsx
│       ├── MD/           # MD-specific pages
│       ├── HOD/          # HOD-specific pages
│       ├── Staff/        # Staff-specific pages
│       └── Secretary/    # Secretary-specific pages
└── utils/
    └── menu.jsx         # Secretary menu (partial; used in SecretaryDashboard)
```

---

*Document last updated: February 2025*
