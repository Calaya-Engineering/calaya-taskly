# MD Dashboard — API & Functionality Implementation

**Calaya Taskly — Managing Director Dashboard**  
*Detailed specification for backend APIs and frontend integration*

---

## Table of Contents

1. [Overview](#1-overview)
2. [Authentication & Authorization](#2-authentication--authorization)
3. [Dashboard Overview APIs](#3-dashboard-overview-apis)
4. [Tasks Module APIs](#4-tasks-module-apis)
5. [Documents Module APIs](#5-documents-module-apis)
6. [Daily Reports APIs](#6-daily-reports-apis)
7. [Events/Meetings APIs](#7-eventsmeetings-apis)
8. [Tenders APIs](#8-tenders-apis)
9. [Announcements APIs](#9-announcements-apis)
10. [Approvals APIs](#10-approvals-apis)
11. [Escalations APIs](#11-escalations-apis)
12. [Notifications APIs](#12-notifications-apis)
13. [Profile APIs](#13-profile-apis)
14. [Data Models & Schemas](#14-data-models--schemas)
15. [Error Handling & Conventions](#15-error-handling--conventions)
16. [Implementation Phases](#16-implementation-phases)

---

## 1. Overview

### 1.1 MD Role Scope

The **Managing Director (MD)** has company-wide visibility and authority:

- **View**: All tasks, documents, reports, events, tenders, announcements across all departments
- **Create**: Tasks, documents, events, tenders, announcements
- **Approve**: Staff and Secretary approval requests (single and bulk)
- **Monitor**: Escalations, overdue items, department performance
- **Access**: No department filter — sees entire organization

### 1.2 MD Dashboard Routes

| Route | Page | Primary Data |
|-------|------|--------------|
| `/md-dashboard` | MDDashboard | Stats, department performance, activity, tenders, announcements |
| `/md-dashboard/tasks` | MDAllTasks | All company tasks |
| `/md-dashboard/task/:id` | MDTaskDetail | Task detail, comments, attachments |
| `/md-dashboard/create-task` | MDCreateTask | Create task form |
| `/md-dashboard/jobs` | MDActiveJobs | Active jobs (type=JOB) |
| `/md-dashboard/documents` | MDDocuments | All documents |
| `/md-dashboard/document/:id` | MDDocumentDetail | Document detail |
| `/md-dashboard/create-document` | MDCreateDocument | Upload document |
| `/md-dashboard/reports` | MDDailyReports | Daily reports |
| `/md-dashboard/events` | MDEvents | Events calendar/list |
| `/md-dashboard/event/:id` | MDEventDetail | Event detail |
| `/md-dashboard/create-event` | MDCreateEvent | Create event |
| `/md-dashboard/edit-event/:id` | MDEditEvent | Edit event |
| `/md-dashboard/tenders` | MDTenders | Tenders list |
| `/md-dashboard/tender/:id` | MDTenderDetail | Tender detail |
| `/md-dashboard/tenders/create` | MDCreateTender | Create tender |
| `/md-dashboard/tender-documents` | MDTenderDocuments | Tender documents by tender |
| `/md-dashboard/announcements` | MDAnnouncements | Announcements |
| `/md-dashboard/announcement/:id` | MDAnnouncementDetail | Announcement detail |
| `/md-dashboard/create-announcement` | MDCreateAnnouncement | Create announcement |
| `/md-dashboard/approvals` | MDApprovals | Pending approvals |
| `/md-dashboard/approvals/history` | MDApprovalHistory | Approval history |
| `/md-dashboard/approvals/bulk` | MDApprovalBulk | Bulk approval |
| `/md-dashboard/escalations` | MDEscalations | Overdue/escalated items |
| `/md-dashboard/notifications` | MDNotifications | Notifications |
| `/md-dashboard/profile` | MDProfile | Profile settings |

---

## 2. Authentication & Authorization

### 2.1 Requirements

- **JWT**: Access token in `Authorization: Bearer <token>` header
- **Role check**: All MD dashboard endpoints must verify `user.role === MD`
- **401**: Unauthorized (missing/invalid token)
- **403**: Forbidden (valid token but role !== MD)

### 2.2 Auth Middleware

```typescript
// Pseudocode for route protection
const requireMD = (req, res, next) => {
  const user = req.user; // from JWT decode
  if (!user || user.role !== 'MD') {
    return res.status(403).json({ error: 'MD access required' });
  }
  next();
};
```

---

## 3. Dashboard Overview APIs

### 3.1 GET /api/md/dashboard/stats

**Purpose**: Aggregate stats for dashboard hero cards.

**Response**:
```json
{
  "totalTasks": 156,
  "totalTasksChange": 12,
  "activeJobs": 24,
  "activeJobsChange": 3,
  "overdueTasks": 8,
  "overdueTasksChange": -2,
  "completionRate": 87,
  "completionRateChange": 5
}
```

**Logic**:
- `totalTasks`: Count of all tasks (status != CANCELLED)
- `totalTasksChange`: % change vs previous month
- `activeJobs`: Count of tasks where type=JOB and status=IN_PROGRESS
- `overdueTasks`: Count where dueDate < today & status != COMPLETED
- `completionRate`: (COMPLETED / total) * 100
- `completionRateChange`: % change vs previous month

---

### 3.2 GET /api/md/dashboard/department-performance

**Purpose**: Department completion percentages for progress bars.

**Response**:
```json
{
  "departments": [
    {
      "department": "Technical",
      "completionRate": 70,
      "totalTasks": 45,
      "completedTasks": 32,
      "link": "/md-dashboard/tasks?dept=Technical"
    },
    {
      "department": "Workshop",
      "completionRate": 80,
      "totalTasks": 32,
      "completedTasks": 26,
      "link": "/md-dashboard/tasks?dept=Workshop"
    }
  ]
}
```

**Logic**: Aggregated by department; completion rate = (completed / total) * 100.

---

### 3.3 GET /api/md/dashboard/recent-activity

**Purpose**: Recent activity feed (last 24–48 hours).

**Query params**:
- `limit` (optional, default 10)

**Response**:
```json
{
  "activities": [
    {
      "id": "act-001",
      "user": "John Doe",
      "userRole": "Staff",
      "action": "completed",
      "entityType": "TASK",
      "entityId": "TASK-2024-00123",
      "entityTitle": "Safety Audit for Site A",
      "time": "2024-12-15T10:30:00Z",
      "link": "/md-dashboard/task/TASK-2024-00123"
    }
  ]
}
```

**Logic**: Union of task completions, document uploads, tender creation, event creation, etc. Sorted by timestamp.

---

### 3.4 GET /api/md/dashboard/tenders-closing-soon

**Purpose**: Tenders with closing date in next 7 days.

**Response**:
```json
{
  "tenders": [
    {
      "id": "TEN-001",
      "referenceNo": "TEN-2024-001",
      "title": "Pipeline Equipment Supply",
      "closingDate": "2024-12-20",
      "department": "Procurement",
      "status": "OPEN"
    }
  ]
}
```

---

### 3.5 GET /api/md/dashboard/recent-announcements

**Purpose**: Latest announcements (company-wide or MD-visible).

**Query params**:
- `limit` (optional, default 5)

**Response**:
```json
{
  "announcements": [
    {
      "id": "ANN-001",
      "title": "Year-End Holiday Schedule",
      "author": "HR Department",
      "priority": "IMPORTANT",
      "createdAt": "2024-12-15T08:00:00Z"
    }
  ]
}
```

---

## 4. Tasks Module APIs

### 4.1 GET /api/tasks

**Purpose**: List all company tasks (MD sees all).

**Query params**:
- `department` (optional): filter by department
- `status` (optional): PENDING, IN_PROGRESS, COMPLETED, OVERDUE, CANCELLED
- `priority` (optional): LOW, MEDIUM, HIGH, URGENT
- `type` (optional): TASK, JOB
- `search` (optional): search by title or taskId
- `page` (optional, default 1)
- `limit` (optional, default 20)

**Response**:
```json
{
  "tasks": [
    {
      "id": "clx...",
      "taskId": "TASK-2024-00123",
      "title": "Safety Audit for Site A",
      "department": "HSE",
      "assignee": "John Doe",
      "priority": "HIGH",
      "status": "IN_PROGRESS",
      "type": "TASK",
      "dueDate": "2024-12-20",
      "createdBy": "Sarah Smith",
      "progress": 75
    }
  ],
  "total": 156,
  "page": 1,
  "limit": 20
}
```

---

### 4.2 GET /api/tasks/:id

**Purpose**: Task detail with assignees, attachments, comments.

**Response**:
```json
{
  "id": "clx...",
  "taskId": "TASK-2024-00123",
  "title": "Safety Audit for Site A",
  "description": "...",
  "department": "HSE",
  "priority": "HIGH",
  "status": "IN_PROGRESS",
  "type": "TASK",
  "visibility": "DEPARTMENT",
  "startDate": "2024-12-01",
  "dueDate": "2024-12-20",
  "estimatedHours": 40,
  "actualHours": 30,
  "progress": 75,
  "createdBy": { "id": "...", "fullName": "Sarah Smith", "role": "HOD" },
  "assignees": [
    { "id": "...", "fullName": "John Doe", "department": "HSE" }
  ],
  "attachments": [],
  "comments": [],
  "commentsList": [],
  "documentsList": [],
  "history": [],
  "dependencies": [],
  "watchers": []
}
```

---

### 4.3 POST /api/tasks

**Purpose**: Create new task (MD or HOD).

**Request body**:
```json
{
  "title": "Safety Audit for Site A",
  "description": "Conduct audit...",
  "department": "HSE",
  "priority": "HIGH",
  "type": "TASK",
  "visibility": "DEPARTMENT",
  "startDate": "2024-12-01",
  "dueDate": "2024-12-20",
  "estimatedHours": 40,
  "assigneeIds": ["user-id-1", "user-id-2"]
}
```

**Response**: 201 + created task object.

---

### 4.4 PATCH /api/tasks/:id

**Purpose**: Update task (status, progress, assignees, etc.).

**Request body** (partial):
```json
{
  "status": "IN_PROGRESS",
  "progress": 60,
  "assigneeIds": ["user-id-1"]
}
```

---

### 4.5 GET /api/tasks?type=JOB

**Purpose**: Active jobs (MD jobs page). Same as tasks but filter `type=JOB`.

---

### 4.6 POST /api/tasks/:id/attachments

**Purpose**: Upload attachments to task.

**Request**: `multipart/form-data` with `file` field.

---

### 4.7 POST /api/tasks/:id/comments

**Purpose**: Add comment.

**Request body**:
```json
{
  "content": "Comment text"
}
```

---

## 5. Documents Module APIs

### 5.1 GET /api/documents

**Purpose**: List all documents (MD sees company-wide).

**Query params**:
- `department` (optional)
- `category` (optional)
- `scope` (optional): DEPARTMENT, COMPANY_WIDE
- `search` (optional)
- `page`, `limit`

**Response**:
```json
{
  "documents": [
    {
      "id": "clx...",
      "title": "Pipeline Inspection Report",
      "category": "Report",
      "department": "Technical",
      "scope": "DEPARTMENT",
      "fileSize": "2.4 MB",
      "downloads": 45,
      "uploadedBy": "Mike Johnson",
      "date": "2024-12-15",
      "fileUrl": "/api/documents/:id/download"
    }
  ],
  "total": 120,
  "page": 1,
  "limit": 20
}
```

---

### 5.2 GET /api/documents/:id

**Purpose**: Document detail.

**Response**:
```json
{
  "id": "clx...",
  "title": "Pipeline Inspection Report",
  "description": "...",
  "category": "Report",
  "department": "Technical",
  "scope": "DEPARTMENT",
  "fileName": "report.pdf",
  "fileSize": 2500000,
  "mimeType": "application/pdf",
  "downloads": 45,
  "uploadedBy": { "fullName": "Mike Johnson", "department": "Technical" },
  "createdAt": "2024-12-15T10:00:00Z",
  "tags": ["inspection", "pipeline"],
  "linkedTasks": ["TASK-2024-00123"]
}
```

---

### 5.3 GET /api/documents/:id/download

**Purpose**: Download file. Returns file stream with appropriate headers.

---

### 5.4 POST /api/documents

**Purpose**: Upload document.

**Request**: `multipart/form-data` with `file`, `title`, `description`, `department`, `category`, `scope`.

**Response**: 201 + document object.

---

### 5.5 GET /api/md/documents/stats

**Purpose**: Document stats for dashboard (public count, total downloads, etc.).

**Response**:
```json
{
  "total": 120,
  "publicCount": 45,
  "departmentCount": 75,
  "totalDownloads": 1250
}
```

---

## 6. Daily Reports APIs

### 6.1 GET /api/reports

**Purpose**: List daily reports (MD sees all).

**Query params**:
- `date` (optional): filter by date
- `department` (optional)
- `status` (optional): PENDING, APPROVED, REJECTED
- `page`, `limit`

**Response**:
```json
{
  "reports": [
    {
      "id": "clx...",
      "reportId": "DR-2024-12-15-001",
      "title": "Technical Department Daily Report",
      "date": "2024-12-15",
      "department": "Technical",
      "submittedBy": "Alex Johnson",
      "status": "PENDING",
      "entriesCount": 5
    }
  ],
  "total": 45,
  "page": 1,
  "limit": 20
}
```

---

### 6.2 GET /api/reports/:id

**Purpose**: Report detail with entries.

**Response**:
```json
{
  "id": "clx...",
  "reportId": "DR-2024-12-15-001",
  "title": "Technical Department Daily Report",
  "date": "2024-12-15",
  "department": "Technical",
  "submittedBy": "Alex Johnson",
  "status": "PENDING",
  "fileUrl": "/api/reports/:id/file",
  "entries": [
    {
      "taskName": "Pipeline Inspection",
      "objective": "...",
      "target": "...",
      "nextDayTask": "..."
    }
  ]
}
```

---

### 6.3 PATCH /api/reports/:id

**Purpose**: Approve or reject report (MD/HOD).

**Request body**:
```json
{
  "status": "APPROVED"
}
```
or
```json
{
  "status": "REJECTED",
  "rejectionReason": "Incomplete entries"
}
```

---

### 6.4 GET /api/reports/by-date

**Purpose**: Reports grouped by date (for calendar view).

**Query params**:
- `month` (1-12)
- `year`

**Response**:
```json
{
  "reportsByDate": {
    "2024-12-15": [
      { "id": "...", "reportId": "DR-2024-12-15-001", "department": "Technical", "status": "PENDING" }
    ]
  }
}
```

---

## 7. Events/Meetings APIs

### 7.1 GET /api/events

**Purpose**: List events (MD sees all).

**Query params**:
- `startDate` (optional)
- `endDate` (optional)
- `type` (optional): MEETING, TRAINING, EVENT
- `department` (optional)
- `page`, `limit`

**Response**:
```json
{
  "events": [
    {
      "id": "clx...",
      "title": "Q4 Review Meeting",
      "type": "MEETING",
      "location": "Board Room",
      "startAt": "2024-12-20T10:00:00Z",
      "endAt": "2024-12-20T12:00:00Z",
      "scopeType": "ALL_COMPANY",
      "department": null,
      "createdBy": "Sarah Smith"
    }
  ],
  "total": 24,
  "page": 1,
  "limit": 20
}
```

---

### 7.2 GET /api/events/:id

**Purpose**: Event detail with agenda, attendees, RSVPs.

**Response**:
```json
{
  "id": "clx...",
  "title": "Q4 Review Meeting",
  "description": "...",
  "type": "MEETING",
  "location": "Board Room",
  "meetingLink": "https://meet.example.com/...",
  "startAt": "2024-12-20T10:00:00Z",
  "endAt": "2024-12-20T12:00:00Z",
  "scopeType": "ALL_COMPANY",
  "department": null,
  "agenda": ["Item 1", "Item 2"],
  "notes": "...",
  "createdBy": { "fullName": "Sarah Smith" },
  "documents": [],
  "rsvps": [
    { "user": "John Doe", "status": "ACCEPTED" }
  ]
}
```

---

### 7.3 POST /api/events

**Purpose**: Create event.

**Request body**:
```json
{
  "title": "Q4 Review Meeting",
  "description": "...",
  "type": "MEETING",
  "location": "Board Room",
  "meetingLink": "https://...",
  "startAt": "2024-12-20T10:00:00Z",
  "endAt": "2024-12-20T12:00:00Z",
  "scopeType": "ALL_COMPANY",
  "departmentIds": [],
  "userIds": [],
  "agenda": ["Item 1", "Item 2"],
  "notes": "..."
}
```

---

### 7.4 PATCH /api/events/:id

**Purpose**: Update event.

---

### 7.5 GET /api/events/calendar

**Purpose**: Events for calendar view (by month).

**Query params**:
- `month`, `year`

**Response**:
```json
{
  "events": [
    {
      "id": "clx...",
      "title": "Q4 Review",
      "startAt": "2024-12-20T10:00:00Z",
      "endAt": "2024-12-20T12:00:00Z",
      "type": "MEETING"
    }
  ]
}
```

---

## 8. Tenders APIs

### 8.1 GET /api/tenders

**Purpose**: List tenders (MD sees all).

**Query params**:
- `status` (optional): DRAFT, OPEN, CLOSED, AWARDED, CANCELLED
- `department` (optional)
- `search` (optional)
- `page`, `limit`

**Response**:
```json
{
  "tenders": [
    {
      "id": "clx...",
      "referenceNo": "TEN-2024-001",
      "title": "Pipeline Equipment Supply",
      "department": "Procurement",
      "status": "OPEN",
      "issuedDate": "2024-12-01",
      "closingDate": "2024-12-20",
      "documentsCount": 5
    }
  ],
  "total": 12,
  "page": 1,
  "limit": 20
}
```

---

### 8.2 GET /api/tenders/:id

**Purpose**: Tender detail with documents and requirements.

---

### 8.3 POST /api/tenders

**Purpose**: Create tender.

**Request body**:
```json
{
  "referenceNo": "TEN-2024-001",
  "title": "Pipeline Equipment Supply",
  "description": "...",
  "department": "Procurement",
  "category": "Equipment",
  "issuedDate": "2024-12-01",
  "closingDate": "2024-12-20",
  "budget": "₦15,800,000",
  "contactPerson": "...",
  "contactEmail": "...",
  "contactPhone": "...",
  "requirements": ["Req 1", "Req 2"]
}
```

---

### 8.4 POST /api/tenders/:id/documents

**Purpose**: Upload tender document.

**Request**: `multipart/form-data` with `file`, `category` (e.g. Bid Submission, Specification).

---

### 8.5 GET /api/md/tender-documents

**Purpose**: Tender documents grouped by tender (for MD Tender Documents page).

**Query params**:
- `tenderId` (optional)
- `department` (optional)

**Response**:
```json
{
  "tenders": [
    {
      "id": "clx...",
      "title": "Pipeline Equipment Supply",
      "referenceNo": "TEN-2024-001",
      "department": "Procurement",
      "status": "OPEN",
      "documents": [
        { "id": "...", "fileName": "spec.pdf", "category": "Specification" }
      ],
      "submissions": [
        { "id": "...", "fileName": "bid.pdf", "category": "Bid Submission" }
      ]
    }
  ]
}
```

---

## 9. Announcements APIs

### 9.1 GET /api/announcements

**Purpose**: List announcements (MD sees all company-wide + department-specific).

**Query params**:
- `priority` (optional): NORMAL, IMPORTANT, URGENT, HIGH
- `department` (optional)
- `page`, `limit`

**Response**:
```json
{
  "announcements": [
    {
      "id": "clx...",
      "title": "Year-End Holiday Schedule",
      "message": "...",
      "priority": "IMPORTANT",
      "scopeType": "ALL_COMPANY",
      "author": "HR Department",
      "createdAt": "2024-12-15T08:00:00Z",
      "expiresAt": "2024-12-31T23:59:59Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 20
}
```

---

### 9.2 GET /api/announcements/:id

**Purpose**: Announcement detail.

---

### 9.3 POST /api/announcements

**Purpose**: Create announcement.

**Request body**:
```json
{
  "title": "Year-End Holiday Schedule",
  "message": "...",
  "priority": "IMPORTANT",
  "scopeType": "ALL_COMPANY",
  "departmentIds": [],
  "userIds": [],
  "expiresAt": "2024-12-31T23:59:59Z",
  "requireAcknowledgement": false
}
```

---

### 9.4 PATCH /api/announcements/:id/read

**Purpose**: Mark as read (for user tracking).

---

## 10. Approvals APIs

### 10.1 GET /api/approvals/pending

**Purpose**: Pending approval requests (MD sees HOD-level + MD-level).

**Query params**:
- `type` (optional): STAFF_REQUEST, SECRETARY_REQUEST
- `requestType` (optional): TASK_COMPLETION, MEETING_MINUTES, etc.
- `department` (optional)
- `priority` (optional)
- `page`, `limit`

**Response**:
```json
{
  "approvals": [
    {
      "id": "clx...",
      "type": "STAFF_REQUEST",
      "requestType": "TASK_COMPLETION",
      "title": "Task Completion - Safety Audit",
      "description": "...",
      "priority": "HIGH",
      "department": "HSE",
      "status": "PENDING",
      "approvalLevel": "MD",
      "submittedBy": { "fullName": "John Doe", "department": "HSE" },
      "submittedAt": "2024-12-15T10:00:00Z",
      "taskReference": "TASK-2024-00123",
      "attachments": []
    }
  ],
  "total": 7,
  "page": 1,
  "limit": 20
}
```

---

### 10.2 PATCH /api/approvals/:id

**Purpose**: Approve or reject.

**Request body**:
```json
{
  "status": "APPROVED"
}
```
or
```json
{
  "status": "REJECTED",
  "rejectionReason": "..."
}
```

---

### 10.3 POST /api/approvals/bulk

**Purpose**: Bulk approve (MD only).

**Request body**:
```json
{
  "approvalIds": ["id1", "id2", "id3"],
  "action": "APPROVE"
}
```
or
```json
{
  "approvalIds": ["id1", "id2"],
  "action": "REJECT",
  "rejectionReason": "Incomplete documentation"
}
```

---

### 10.4 GET /api/approvals/history

**Purpose**: Past approvals (approved/rejected).

**Query params**:
- `status` (optional): APPROVED, REJECTED
- `type` (optional)
- `dateFrom`, `dateTo` (optional)
- `page`, `limit`

---

## 11. Escalations APIs

### 11.1 GET /api/escalations

**Purpose**: Overdue tasks and escalated items.

**Query params**:
- `type` (optional): OVERDUE_TASKS, ESCALATED_APPROVALS
- `department` (optional)
- `page`, `limit`

**Response**:
```json
{
  "escalations": [
    {
      "id": "clx...",
      "type": "OVERDUE_TASK",
      "taskId": "TASK-2024-00123",
      "title": "Safety Audit for Site A",
      "department": "HSE",
      "assignee": "John Doe",
      "dueDate": "2024-12-10",
      "daysOverdue": 5,
      "priority": "HIGH"
    }
  ],
  "total": 8,
  "page": 1,
  "limit": 20
}
```

---

### 11.2 GET /api/md/escalations/summary

**Purpose**: Count of overdue items for badge.

**Response**:
```json
{
  "overdueTasks": 8,
  "escalatedApprovals": 2
}
```

---

## 12. Notifications APIs

### 12.1 GET /api/notifications

**Purpose**: User notifications (MD).

**Query params**:
- `unreadOnly` (optional, default false)
- `page`, `limit`

**Response**:
```json
{
  "notifications": [
    {
      "id": "clx...",
      "title": "New approval request",
      "message": "John Doe submitted for approval",
      "type": "APPROVAL_PENDING",
      "linkUrl": "/md-dashboard/approvals",
      "read": false,
      "createdAt": "2024-12-15T10:30:00Z"
    }
  ],
  "total": 12,
  "unreadCount": 5
}
```

---

### 12.2 PATCH /api/notifications/:id/read

**Purpose**: Mark as read.

---

### 12.3 POST /api/notifications/read-all

**Purpose**: Mark all as read.

---

## 13. Profile APIs

### 13.1 GET /api/profile

**Purpose**: Current user profile (MD).

**Response**:
```json
{
  "id": "clx...",
  "email": "md@calaya.com",
  "fullName": "Managing Director",
  "phone": "",
  "role": "MD",
  "department": "ADMIN",
  "jobTitle": "Managing Director",
  "avatarUrl": null,
  "lastLoginAt": "2024-12-15T08:00:00Z",
  "preferences": {}
}
```

---

### 13.2 PATCH /api/profile

**Purpose**: Update profile (name, phone, preferences).

**Request body**:
```json
{
  "fullName": "Managing Director",
  "phone": "+234...",
  "preferences": { "language": "en", "timezone": "Africa/Lagos" }
}
```

---

### 13.3 POST /api/auth/change-password

**Purpose**: Change password (authenticated).

**Request body**:
```json
{
  "currentPassword": "...",
  "newPassword": "..."
}
```

---

## 14. Data Models & Schemas

Refer to [SCOPE_AND_IMPLEMENTATION.md](./SCOPE_AND_IMPLEMENTATION.md) for full Prisma schema. Key models:

- **User** (role, department, etc.)
- **Task**, **TaskAssignee**, **TaskAttachment**, **TaskComment**
- **Document**
- **Tender**, **TenderDocument**, **TenderRequirement**
- **Event**, **EventDepartment**, **EventRsvp**
- **Announcement**, **AnnouncementDepartment**, **AnnouncementUser**
- **ApprovalRequest**, **ApprovalRequestAttachment**
- **DailyReport**, **DailyReportEntry**
- **Notification**

---

## 15. Error Handling & Conventions

### 15.1 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success | 
| 201 | Created |
| 400 | Bad request (validation) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (insufficient role) |
| 404 | Not found |
| 500 | Server error |

### 15.2 Error Response Format

```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": [
    { "field": "department", "message": "Department is required" }
  ]
}
```

### 15.3 Pagination

All list endpoints:

- `page` (optional, default 1)
- `limit` (optional, default 20, max 100)

Response includes:

```json
{
  "items": [...],
  "total": 156,
  "page": 1,
  "limit": 20,
  "totalPages": 8
}
```

---

## 16. Implementation Phases

### Phase 1: Foundation (Weeks 1–2)

- [ ] Auth: JWT, role check, MD route guard
- [ ] GET /api/md/dashboard/stats
- [ ] GET /api/md/dashboard/department-performance
- [ ] GET /api/md/dashboard/recent-activity
- [ ] GET /api/md/dashboard/tenders-closing-soon
- [ ] GET /api/md/dashboard/recent-announcements

### Phase 2: Core Modules (Weeks 3–5)

- [ ] Tasks: GET /api/tasks, GET /api/tasks/:id, POST, PATCH
- [ ] Documents: GET /api/documents, GET /api/documents/:id, POST, download
- [ ] Daily Reports: GET /api/reports, GET /api/reports/:id, PATCH

### Phase 3: Extended Modules (Weeks 6–7)

- [ ] Events: GET, POST, PATCH, calendar
- [ ] Tenders: GET, POST, tender documents
- [ ] Announcements: GET, POST

### Phase 4: Workflows (Weeks 8–9)

- [ ] Approvals: GET pending, PATCH, bulk
- [ ] Escalations: GET
- [ ] Notifications: GET, mark read

### Phase 5: Polish (Week 10+)

- [ ] Profile: GET, PATCH
- [ ] Change password
- [ ] Audit logging for MD actions
- [ ] Performance optimization (caching, indexes)

---

*Document version: 1.0  
Last updated: February 2025*
