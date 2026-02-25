# Calaya Taskly — Implementation Checklist

Progress tracker for backend and full-stack implementation. Check off items as they are completed.

**Source of truth:** [SCOPE_AND_IMPLEMENTATION.md](SCOPE_AND_IMPLEMENTATION.md)

- **Last updated:** (update as you progress)
- **Overall progress:** 0 / 61 items complete

---

## Phase Overview

| Phase | Description | Progress |
|-------|-------------|----------|
| Phase 1 | Foundation (Weeks 1–2) | 0 / 5 |
| Phase 2 | Core Modules (Weeks 3–5) | 0 / 3 |
| Phase 3 | Workflows (Weeks 6–7) | 0 / 4 |
| Phase 4 | Extended Modules (Weeks 8–9) | 0 / 5 |
| Phase 5 | Polish (Week 10+) | 0 / 4 |

---

## Phase-by-Phase Checklist

### Phase 1: Foundation (Weeks 1–2)

- [ ] Prisma schema (all models from scope doc)
- [ ] Run database migrations
- [ ] User + Auth (login, JWT, protected routes)
- [ ] Access Request flow (submit, admin approval, create user)
- [ ] SuperAdmin dashboard (basic)

### Phase 2: Core Modules (Weeks 3–5)

- [ ] Tasks (CRUD, assignees, status)
- [ ] Documents (upload, list, visibility)
- [ ] Departments + HOD assignment

### Phase 3: Workflows (Weeks 6–7)

- [ ] Approval requests (Staff + Secretary)
- [ ] Approval queue (HOD/MD)
- [ ] Daily reports
- [ ] Notifications (basic)

### Phase 4: Extended Modules (Weeks 8–9)

- [ ] Tenders
- [ ] Events + RSVP
- [ ] Announcements
- [ ] Escalations
- [ ] Bulk approvals

### Phase 5: Polish (Week 10+)

- [ ] Forgot / Reset password
- [ ] Audit logging
- [ ] Performance optimization
- [ ] Email templates and delivery

---

## Detailed Module Checklists

### 5.1 Authentication Module

- [ ] User model with password hash (bcrypt/argon2)
- [ ] JWT access + refresh tokens (15min access, 7d refresh)
- [ ] POST /api/auth/login
- [ ] POST /api/auth/logout (token revocation)
- [ ] POST /api/auth/forgot-password
- [ ] POST /api/auth/reset-password
- [ ] POST /api/auth/change-password (authenticated)
- [ ] Route guards / middleware (protect dashboard routes)

### 5.2 Access Request Module

- [ ] POST /api/access-requests (form submission)
- [ ] GET /api/admin/access-requests (admin list)
- [ ] PATCH /api/admin/access-requests/:id/approve (create user + send email)
- [ ] PATCH /api/admin/access-requests/:id/reject
- [ ] SuperAdmin dashboard UI (access request management)

### 5.3 Tasks Module

- [ ] POST /api/tasks (create task, MD/HOD)
- [ ] GET /api/tasks (list, filtered by role/department)
- [ ] GET /api/tasks/:id (task detail)
- [ ] PATCH /api/tasks/:id (update task status)
- [ ] PATCH /api/tasks/:id/assignees (assign/remove assignees)
- [ ] Task attachments (upload/list)
- [ ] Task comments (CRUD)
- [ ] GET /api/escalations (overdue tasks)

### 5.4 Documents Module

- [ ] POST /api/documents (upload)
- [ ] GET /api/documents (list, filtered)
- [ ] GET /api/documents/:id (detail)
- [ ] GET /api/documents/:id/download
- [ ] Role-based visibility (DEPARTMENT / COMPANY_WIDE)

### 5.5 Tenders Module

- [ ] POST /api/tenders (create, HOD/MD)
- [ ] GET /api/tenders (list)
- [ ] GET /api/tenders/:id (detail)
- [ ] Tender documents (upload/list)
- [ ] Tender requirements (CRUD)
- [ ] Tender status transitions (DRAFT → OPEN → CLOSED → AWARDED)

### 5.6 Events Module

- [ ] POST /api/events (create, MD/HOD/Secretary)
- [ ] GET /api/events (list)
- [ ] GET /api/events/:id (detail)
- [ ] PATCH /api/events/:id (edit event)
- [ ] POST /api/events/:id/rsvp (Staff RSVP)
- [ ] Scope: ALL_COMPANY, DEPARTMENTS, USERS (filter attendees)

### 5.7 Announcements Module

- [ ] POST /api/announcements (create, MD/HOD)
- [ ] GET /api/announcements (list, scoped)
- [ ] GET /api/announcements/:id (detail)
- [ ] PATCH /api/announcements/:id/read (mark as read)
- [ ] Scope: ALL_COMPANY, DEPARTMENTS, HODS_ONLY, USERS (target filtering)

### 5.8 Approval Requests Module

- [ ] POST /api/approvals/staff (Staff create request)
- [ ] POST /api/approvals/secretary (Secretary create submission)
- [ ] GET /api/approvals/pending (HOD/MD approval queue)
- [ ] PATCH /api/approvals/:id (approve/reject)
- [ ] POST /api/approvals/bulk (MD only)
- [ ] GET /api/approvals/history

### 5.9 Daily Reports Module

- [ ] POST /api/reports (Staff submit report)
- [ ] POST /api/reports/secretary (Secretary upload report)
- [ ] GET /api/reports (list by date, department, role)
- [ ] GET /api/reports/:id (report detail)
- [ ] PATCH /api/reports/:id (approve/reject, HOD/MD)

### 5.10 Notifications Module

- [ ] GET /api/notifications (list user notifications)
- [ ] PATCH /api/notifications/:id/read (mark as read)
- [ ] POST /api/notifications/read-all (mark all as read)
- [ ] Real-time (optional): WebSocket or polling — P2

### 5.11 Profile Module

- [ ] GET /api/profile (get profile)
- [ ] PATCH /api/profile (update profile)
- [ ] Change password — POST /api/auth/change-password

---

## Prisma Schema Checklist

Use this to track which model groups have been added to `prisma/schema.prisma`.

- [ ] Enums (Role, Department, AccessRequestStatus, TaskStatus, TaskPriority, TaskType, TaskVisibility, TenderStatus, EventType, EventScopeType, RsvpStatus, AnnouncementPriority, AnnouncementScopeType, ApprovalRequestStatus, StaffRequestType, SecretaryRequestType, ReportStatus)
- [ ] User + RefreshToken
- [ ] AccessRequest
- [ ] DepartmentHod
- [ ] Task, TaskAssignee, TaskAttachment, TaskComment
- [ ] Document
- [ ] Tender, TenderDocument, TenderRequirement
- [ ] Event, EventDepartment, EventRsvp
- [ ] Announcement, AnnouncementDepartment, AnnouncementUser
- [ ] ApprovalRequest, ApprovalRequestAttachment
- [ ] DailyReport, DailyReportEntry
- [ ] Notification

---

## Notes and Blockers

Use this section to record decisions, blockers, or context for the team.

- (Add notes here as implementation progresses.)
