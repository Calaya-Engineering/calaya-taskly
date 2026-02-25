# Calaya Taskly — Scope & Implementation Documentation

**Oil & Gas Task Management System**  
*Calaya Engineering Services Ltd.*

This document defines the full implementation scope starting from authentication, access request flows, Prisma schemas, roles, and all system functionalities requiring backend implementation.

---

## Table of Contents

1. [Authentication System](#1-authentication-system)
2. [Access Request & Account Provisioning](#2-access-request--account-provisioning)
3. [Prisma Schema Definitions](#3-prisma-schema-definitions)
4. [Roles & Permissions Matrix](#4-roles--permissions-matrix)
5. [Implementation Scope by Module](#5-implementation-scope-by-module)
6. [Implementation Phases](#6-implementation-phases)

---

## 1. Authentication System

### 1.1 Current State
- Demo-based login with hardcoded credentials
- No real JWT/session management
- No route guards or protected routes
- No password hashing or password reset

### 1.2 Target Authentication Model

| Feature | Description | Priority |
|---------|-------------|----------|
| **Email + Password Login** | JWT-based auth with access/refresh tokens | P0 |
| **Role-Based Routing** | Redirect user to correct dashboard based on role | P0 |
| **Protected Routes** | Server-side/middleware route guards | P0 |
| **Session Persistence** | Remember me, token refresh | P0 |
| **Forgot Password** | Reset password via email link | P1 |
| **Password Change** | Logged-in users can change password (Profile) | P1 |
| **Account Lockout** | Lock after N failed attempts | P2 |
| **Audit Logging** | Log login attempts (success/failure) | P2 |

### 1.3 Auth Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Request Access │────▶│  Admin Approval │────▶│ Account Created │
│  (Pre-login)   │     │  (SuperAdmin)   │     │ + Email Sent     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                          │
                                                          ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Logout         │◀───│  Authenticated   │◀───│  Login          │
│                 │     │  Session/JWT    │     │  (Email+Pass)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 2. Access Request & Account Provisioning

### 2.1 Request Access Flow (Pre-Login)

**Who can request:** Unauthenticated external users (prospective employees or contractors)

**Requestable roles:** Staff, Personnel, Corp Member, Secretary/Admin Officer  
**Non-requestable roles:** HOD, MD, SuperAdmin (assigned by admin only)

**Form fields (from `RequestAccess.jsx`):**
- Full Name *
- Email *
- Phone *
- Department *
- Requested Role *
- Job Title (optional)
- Immediate Supervisor/HOD (optional)
- Reason for Access *
- Terms agreement checkbox *

### 2.2 Admin Approval Workflow

1. Access requests appear in SuperAdmin dashboard
2. Admin reviews request → Approve / Reject
3. On approval:
   - Create User account with provided email
   - Assign Department, Role (as requested or adjusted)
   - Generate temporary password (or password reset link)
   - Send welcome email with credentials
4. On rejection: Notify applicant via email (optional)

### 2.3 Status Values for Access Requests

- `PENDING` — Awaiting admin review
- `APPROVED` — Account created, email sent
- `REJECTED` — Request declined
- `ON_HOLD` — Admin postponed decision

---

## 3. Prisma Schema Definitions

The following schemas support the full Calaya Taskly system.

### 3.1 Enums

```prisma
enum Role {
  SUPER_ADMIN
  MD
  HOD
  STAFF
  PERSONNEL
  CORP_MEMBER
  SECRETARY
}

enum Department {
  TECHNICAL
  WORKSHOP
  LOGISTICS
  CONTRACT_AND_PROCUREMENT
  LEGAL_AND_COMPLIANCES
  HUMAN_RESOURCES
  HSE
  BUSINESS_DEVELOPMENT_BDD
  ACCOUNTS
  NCD
  QHSE
  ADMIN
}

enum AccessRequestStatus {
  PENDING
  APPROVED
  REJECTED
  ON_HOLD
}

enum TaskStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  OVERDUE
  CANCELLED
}

enum TaskPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum TaskType {
  TASK
  JOB
}

enum TaskVisibility {
  ASSIGNED_ONLY
  DEPARTMENT
  COMPANY_WIDE
}

enum TenderStatus {
  DRAFT
  OPEN
  CLOSED
  AWARDED
  CANCELLED
}

enum EventType {
  MEETING
  TRAINING
  EVENT
}

enum EventScopeType {
  ALL_COMPANY
  DEPARTMENTS
  USERS
}

enum RsvpStatus {
  INVITED
  ACCEPTED
  TENTATIVE
  DECLINED
}

enum AnnouncementPriority {
  NORMAL
  IMPORTANT
  URGENT
  HIGH
}

enum AnnouncementScopeType {
  ALL_COMPANY
  DEPARTMENTS
  HODS_ONLY
  USERS
}

enum ApprovalRequestStatus {
  PENDING
  APPROVED
  REJECTED
}

enum StaffRequestType {
  TASK_COMPLETION
  DOCUMENT
  REPORT
  LEAVE
  PURCHASE
  TRAINING
  OVERTIME
  OTHER
}

enum SecretaryRequestType {
  MEETING_MINUTES
  CORRESPONDENCE
  DOCUMENT
  REPORT
  ANNOUNCEMENT
  SCHEDULE
  PURCHASE
  OTHER
}

enum ReportStatus {
  PENDING
  APPROVED
  REJECTED
}
```

### 3.2 Core Models

#### User & Auth

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String    @map("password_hash")
  fullName      String    @map("full_name")
  phone         String?
  role          Role
  department    Department
  jobTitle      String?   @map("job_title")
  supervisorId  String?   @map("supervisor_id")
  supervisor    User?     @relation("SupervisorStaff", fields: [supervisorId], references: [id])
  staff         User[]    @relation("SupervisorStaff")
  isActive      Boolean   @default(true) @map("is_active")
  lastLoginAt   DateTime? @map("last_login_at")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  // Relations
  accessRequest     AccessRequest?
  assignedTasks    TaskAssignee[]
  createdTasks     Task[]         @relation("TaskCreator")
  createdDocuments Document[]
  createdEvents    Event[]
  createdTenders   Tender[]
  createdAnnouncements Announcement[]
  staffRequests    ApprovalRequest[] @relation("StaffRequestSubmitter")
  secretaryRequests ApprovalRequest[] @relation("SecretaryRequestSubmitter")
  notifications    Notification[]
  eventRsvps       EventRsvp[]
}

model RefreshToken {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String   @map("user_id")
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime @map("expires_at")
  createdAt DateTime @default(now()) @map("created_at")
}
```

#### Access Request

```prisma
model AccessRequest {
  id          String             @id @default(cuid())
  fullName    String             @map("full_name")
  email       String
  phone       String
  department  Department
  requestedRole String           @map("requested_role") // Staff, Personnel, etc.
  jobTitle    String?            @map("job_title")
  supervisor  String?            // Text field for supervisor name
  reason      String             @db.Text
  status      AccessRequestStatus @default(PENDING)
  reviewedBy  String?            @map("reviewed_by")
  reviewedAt  DateTime?          @map("reviewed_at")
  rejectionReason String?        @map("rejection_reason") @db.Text
  createdAt   DateTime          @default(now()) @map("created_at")
  updatedAt   DateTime          @updatedAt @map("updated_at")

  // If approved, link to created user
  userId      String?           @unique @map("user_id")
  user        User?             @relation(fields: [userId], references: [id])
}
```

#### Department & HOD Assignment

```prisma
model DepartmentHod {
  id           String   @id @default(cuid())
  department   Department
  hodId        String   @map("hod_id")
  hod          User     @relation(fields: [hodId], references: [id], onDelete: Cascade)
  assignedAt   DateTime @default(now()) @map("assigned_at")

  @@unique([department, hodId])
}
```

#### Tasks

```prisma
model Task {
  id              String       @id @default(cuid())
  taskId          String       @unique @map("task_id") // TSK-2024-001, JOB-2024-001
  type            TaskType     @default(TASK)
  title           String
  description     String       @db.Text
  department      Department
  priority        TaskPriority @default(MEDIUM)
  status          TaskStatus   @default(PENDING)
  visibility      TaskVisibility @default(ASSIGNED_ONLY)
  startDate       DateTime     @map("start_date")
  dueDate         DateTime     @map("due_date")
  estimatedHours  Float?       @map("estimated_hours")
  createdById     String       @map("created_by_id")
  createdBy       User         @relation("TaskCreator", fields: [createdById], references: [id])
  createdAt        DateTime     @default(now()) @map("created_at")
  updatedAt       DateTime     @updatedAt @map("updated_at")

  assignees       TaskAssignee[]
  attachments     TaskAttachment[]
  comments        TaskComment[]
}

model TaskAssignee {
  id        String   @id @default(cuid())
  taskId    String   @map("task_id")
  task      Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  userId    String   @map("user_id")
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  assignedAt DateTime @default(now()) @map("assigned_at")

  @@unique([taskId, userId])
}

model TaskAttachment {
  id        String   @id @default(cuid())
  taskId    String   @map("task_id")
  task      Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  fileName  String   @map("file_name")
  fileUrl   String   @map("file_url")
  fileSize  Int      @map("file_size")
  mimeType  String?  @map("mime_type")
  uploadedAt DateTime @default(now()) @map("uploaded_at")
}

model TaskComment {
  id        String   @id @default(cuid())
  taskId    String   @map("task_id")
  task      Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  userId    String   @map("user_id")
  user      User     @relation(fields: [userId], references: [id])
  content   String   @db.Text
  createdAt DateTime @default(now()) @map("created_at")
}
```

#### Documents

```prisma
model Document {
  id          String     @id @default(cuid())
  title       String
  description String?    @db.Text
  category    String?
  department  Department
  fileUrl     String     @map("file_url")
  fileName    String     @map("file_name")
  fileSize    Int        @map("file_size")
  mimeType    String?    @map("mime_type")
  uploadedById String    @map("uploaded_by_id")
  uploadedBy   User      @relation(fields: [uploadedById], references: [id])
  visibility  String     @default("DEPARTMENT") // DEPARTMENT, COMPANY_WIDE
  createdAt   DateTime   @default(now()) @map("created_at")
  updatedAt   DateTime   @updatedAt @map("updated_at")
}
```

#### Tenders

```prisma
model Tender {
  id           String       @id @default(cuid())
  referenceNo  String       @map("reference_no") @unique
  title        String
  description  String       @db.Text
  department   Department
  category     String?
  issuedDate   DateTime     @map("issued_date")
  closingDate  DateTime     @map("closing_date")
  budget       String?      // Stored as string for formatting (e.g. ₦15,800,000)
  contactPerson  String?    @map("contact_person")
  contactEmail  String?    @map("contact_email")
  contactPhone  String?    @map("contact_phone")
  status       TenderStatus @default(OPEN)
  createdById  String       @map("created_by_id")
  createdBy    User         @relation(fields: [createdById], references: [id])
  createdAt    DateTime     @default(now()) @map("created_at")
  updatedAt    DateTime     @updatedAt @map("updated_at")

  documents    TenderDocument[]
  requirements TenderRequirement[]
}

model TenderDocument {
  id         String  @id @default(cuid())
  tenderId   String  @map("tender_id")
  tender     Tender  @relation(fields: [tenderId], references: [id], onDelete: Cascade)
  fileName   String  @map("file_name")
  fileUrl    String  @map("file_url")
  fileSize   Int     @map("file_size")
  uploadedAt DateTime @default(now()) @map("uploaded_at")
}

model TenderRequirement {
  id       String @id @default(cuid())
  tenderId String @map("tender_id")
  tender   Tender  @relation(fields: [tenderId], references: [id], onDelete: Cascade)
  content  String  @db.Text
  order   Int     @default(0)
}
```

#### Events / Meetings

```prisma
model Event {
  id          String       @id @default(cuid())
  title       String
  description String?      @db.Text
  type        EventType
  location    String?
  meetingLink String?      @map("meeting_link")
  startAt     DateTime     @map("start_at")
  endAt       DateTime     @map("end_at")
  scopeType   EventScopeType @map("scope_type")
  department  Department?
  agenda      String?      @db.Text // JSON array of agenda items
  notes       String?      @db.Text
  createdById String       @map("created_by_id")
  createdBy   User         @relation(fields: [createdById], references: [id])
  createdAt   DateTime     @default(now()) @map("created_at")
  updatedAt   DateTime     @updatedAt @map("updated_at")

  rsvps       EventRsvp[]
  eventDepartments EventDepartment[]
}

model EventDepartment {
  id        String     @id @default(cuid())
  eventId   String     @map("event_id")
  event     Event      @relation(fields: [eventId], references: [id], onDelete: Cascade)
  department Department
  @@unique([eventId, department])
}

model EventRsvp {
  id        String     @id @default(cuid())
  eventId   String     @map("event_id")
  event     Event      @relation(fields: [eventId], references: [id], onDelete: Cascade)
  userId    String     @map("user_id")
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  status    RsvpStatus @default(INVITED)
  createdAt DateTime   @default(now()) @map("created_at")

  @@unique([eventId, userId])
}
```

#### Announcements

```prisma
model Announcement {
  id                    String               @id @default(cuid())
  title                 String
  message               String               @db.Text
  priority              AnnouncementPriority @default(NORMAL)
  scopeType             AnnouncementScopeType @map("scope_type")
  expiresAt             DateTime?            @map("expires_at")
  requireAcknowledgement Boolean              @default(false) @map("require_acknowledgement")
  createdById           String               @map("created_by_id")
  createdBy             User                 @relation(fields: [createdById], references: [id])
  department            Department?
  createdAt             DateTime             @default(now()) @map("created_at")
  updatedAt             DateTime             @updatedAt @map("updated_at")

  targetDepartments AnnouncementDepartment[]
  targetUsers      AnnouncementUser[]
}

model AnnouncementDepartment {
  id             String       @id @default(cuid())
  announcementId String       @map("announcement_id")
  announcement   Announcement @relation(fields: [announcementId], references: [id], onDelete: Cascade)
  department     Department
  @@unique([announcementId, department])
}

model AnnouncementUser {
  id             String       @id @default(cuid())
  announcementId String       @map("announcement_id")
  announcement   Announcement @relation(fields: [announcementId], references: [id], onDelete: Cascade)
  userId         String       @map("user_id")
  @@unique([announcementId, userId])
}
```

#### Approval Requests (Staff & Secretary)

```prisma
model ApprovalRequest {
  id              String                @id @default(cuid())
  type            String                // STAFF_REQUEST | SECRETARY_REQUEST
  requestType     String                @map("request_type") // TASK_COMPLETION, MEETING_MINUTES, etc.
  title           String
  description     String                @db.Text
  priority        TaskPriority          @default(MEDIUM)
  department      Department
  status          ApprovalRequestStatus @default(PENDING)
  approvalLevel   String                @map("approval_level") // HOD | MD
  dueDate         DateTime?             @map("due_date")
  taskReference   String?               @map("task_reference")
  amount          Decimal?              @db.Decimal(15, 2)  // For purchase requests
  projectName     String?               @map("project_name")
  additionalNotes String?               @map("additional_notes") @db.Text
  // Secretary-specific
  meetingDate     DateTime?             @map("meeting_date")
  meetingName     String?               @map("meeting_name")
  documentType    String?               @map("document_type")
  recipientName   String?              @map("recipient_name")
  recipientTitle  String?              @map("recipient_title")
  isConfidential  Boolean               @default(false) @map("is_confidential")
  requiresSignature Boolean             @default(false) @map("requires_signature")
  submittedById   String                @map("submitted_by_id")
  submittedBy     User                  @relation("StaffRequestSubmitter", fields: [submittedById], references: [id])
  approvedById    String?               @map("approved_by_id")
  approvedAt      DateTime?             @map("approved_at")
  rejectionReason String?               @map("rejection_reason") @db.Text
  createdAt       DateTime             @default(now()) @map("created_at")
  updatedAt       DateTime             @updatedAt @map("updated_at")

  attachments     ApprovalRequestAttachment[]
}

model ApprovalRequestAttachment {
  id        String           @id @default(cuid())
  requestId String          @map("request_id")
  request   ApprovalRequest  @relation(fields: [requestId], references: [id], onDelete: Cascade)
  fileName  String           @map("file_name")
  fileUrl   String           @map("file_url")
  fileSize  Int              @map("file_size")
  uploadedAt DateTime        @default(now()) @map("uploaded_at")
}
```

#### Daily Reports

```prisma
model DailyReport {
  id          String       @id @default(cuid())
  reportId    String       @unique @map("report_id") // DR-2024-12-15-001
  date        DateTime     @db.Date
  title       String
  department  Department
  submittedById String     @map("submitted_by_id")
  submittedAt DateTime     @map("submitted_at")
  status      ReportStatus @default(PENDING)
  fileUrl     String?      @map("file_url")
  fileSize    String?      @map("file_size")
  createdAt   DateTime     @default(now()) @map("created_at")
  updatedAt   DateTime     @updatedAt @map("updated_at")

  entries     DailyReportEntry[]
}

model DailyReportEntry {
  id          String      @id @default(cuid())
  reportId    String      @map("report_id")
  report      DailyReport @relation(fields: [reportId], references: [id], onDelete: Cascade)
  taskName    String      @map("task_name")
  objective   String      @db.Text
  target      String      @db.Text
  nextDayTask String      @map("next_day_task") @db.Text
  order       Int         @default(0)
}
```

#### Notifications

```prisma
model Notification {
  id        String   @id @default(cuid())
  userId    String   @map("user_id")
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title     String
  message   String   @db.Text
  type      String   // TASK_ASSIGNED, APPROVAL_PENDING, ANNOUNCEMENT, etc.
  linkUrl   String?  @map("link_url")
  read      Boolean  @default(false)
  createdAt DateTime @default(now()) @map("created_at")
}
```

---

## 4. Roles & Permissions Matrix

| Role | Can Request Access | Dashboard Route | Key Capabilities |
|------|-------------------|----------------|------------------|
| **SuperAdmin** | No (built-in) | `/admin-dashboard` | Manage access requests, create users, assign HOD/MD, system settings |
| **MD** | No | `/md-dashboard` | Full company view, approvals, bulk approvals, escalations, all modules |
| **HOD** | No | `/hod-dashboard` | Department tasks, assign tasks, create tenders, approvals, department scope |
| **Staff** | Yes | `/staff-dashboard` | My tasks, submit reports, view documents/tenders, create approval requests |
| **Personnel** | Yes | `/staff-dashboard` | Same as Staff |
| **Corp Member** | Yes | `/staff-dashboard` | Same as Staff |
| **Secretary** | Yes | `/secretary-dashboard` | Upload reports, manage reports archive, create approval submissions, documents, events |

### 4.1 Role Hierarchy

```
SuperAdmin (full system access)
    └── MD (company-wide, approvals)
        └── HOD (department-level, task assignment)
            └── Staff / Personnel / Corp Member (task execution)
            └── Secretary (admin support, report uploads)
```

### 4.2 Department Scoping

- **HOD** sees only their assigned department(s). One HOD can manage multiple departments (e.g., Technical + Workshop).
- **Staff/Personnel/Corp Member** see content scoped to their department + company-wide items.
- **Secretary** sees company-wide with focus on reports, documents, events.
- **MD** sees everything.

---

## 5. Implementation Scope by Module

### 5.1 Authentication Module

| Item | Description | Status |
|------|-------------|--------|
| User model with password hash | bcrypt/argon2 | To implement |
| JWT access + refresh tokens | 15min access, 7d refresh | To implement |
| Login API | POST /api/auth/login | To implement |
| Logout / token revocation | POST /api/auth/logout | To implement |
| Forgot password | POST /api/auth/forgot-password | To implement |
| Reset password | POST /api/auth/reset-password | To implement |
| Change password (authenticated) | POST /api/auth/change-password | To implement |
| Route guards / middleware | Protect dashboard routes | To implement |

### 5.2 Access Request Module

| Item | Description | Status |
|------|-------------|--------|
| Access request form → API | POST /api/access-requests | To implement |
| Admin list access requests | GET /api/admin/access-requests | To implement |
| Admin approve → create user + send email | PATCH /api/admin/access-requests/:id/approve | To implement |
| Admin reject | PATCH /api/admin/access-requests/:id/reject | To implement |
| SuperAdmin dashboard | UI for access request management | To implement |

### 5.3 Tasks Module

| Item | Description | Status |
|------|-------------|--------|
| Create task (MD/HOD) | POST /api/tasks | To implement |
| List tasks (filtered by role/department) | GET /api/tasks | To implement |
| Task detail | GET /api/tasks/:id | To implement |
| Update task status | PATCH /api/tasks/:id | To implement |
| Assign/remove assignees | PATCH /api/tasks/:id/assignees | To implement |
| Task attachments | Upload/list | To implement |
| Task comments | CRUD | To implement |
| Escalations (overdue tasks) | GET /api/escalations | To implement |

### 5.4 Documents Module

| Item | Description | Status |
|------|-------------|--------|
| Upload document | POST /api/documents | To implement |
| List documents (filtered) | GET /api/documents | To implement |
| Document detail | GET /api/documents/:id | To implement |
| Download document | GET /api/documents/:id/download | To implement |
| Role-based visibility | DEPARTMENT / COMPANY_WIDE | To implement |

### 5.5 Tenders Module

| Item | Description | Status |
|------|-------------|--------|
| Create tender (HOD/MD) | POST /api/tenders | To implement |
| List tenders | GET /api/tenders | To implement |
| Tender detail | GET /api/tenders/:id | To implement |
| Tender documents | Upload/list | To implement |
| Tender requirements | CRUD | To implement |
| Tender status transitions | DRAFT → OPEN → CLOSED → AWARDED | To implement |

### 5.6 Events Module

| Item | Description | Status |
|------|-------------|--------|
| Create event (MD/HOD/Secretary) | POST /api/events | To implement |
| List events | GET /api/events | To implement |
| Event detail | GET /api/events/:id | To implement |
| Edit event | PATCH /api/events/:id | To implement |
| RSVP (Staff) | POST /api/events/:id/rsvp | To implement |
| Scope: ALL_COMPANY, DEPARTMENTS, USERS | Filter attendees | To implement |

### 5.7 Announcements Module

| Item | Description | Status |
|------|-------------|--------|
| Create announcement (MD/HOD) | POST /api/announcements | To implement |
| List announcements (scoped) | GET /api/announcements | To implement |
| Announcement detail | GET /api/announcements/:id | To implement |
| Mark as read | PATCH /api/announcements/:id/read | To implement |
| Scope: ALL_COMPANY, DEPARTMENTS, HODS_ONLY, USERS | Target filtering | To implement |

### 5.8 Approval Requests Module

| Item | Description | Status |
|------|-------------|--------|
| Staff create request | POST /api/approvals/staff | To implement |
| Secretary create submission | POST /api/approvals/secretary | To implement |
| HOD/MD approval queue | GET /api/approvals/pending | To implement |
| Approve/Reject | PATCH /api/approvals/:id | To implement |
| Bulk approve (MD only) | POST /api/approvals/bulk | To implement |
| Approval history | GET /api/approvals/history | To implement |

### 5.9 Daily Reports Module

| Item | Description | Status |
|------|-------------|--------|
| Staff submit report | POST /api/reports | To implement |
| Secretary upload report | POST /api/reports/secretary | To implement |
| List reports (by date, department, role) | GET /api/reports | To implement |
| Report detail | GET /api/reports/:id | To implement |
| Approve/Reject report (HOD/MD) | PATCH /api/reports/:id | To implement |

### 5.10 Notifications Module

| Item | Description | Status |
|------|-------------|--------|
| List user notifications | GET /api/notifications | To implement |
| Mark as read | PATCH /api/notifications/:id/read | To implement |
| Mark all as read | POST /api/notifications/read-all | To implement |
| Real-time (optional) | WebSocket or polling | P2 |

### 5.11 Profile Module

| Item | Description | Status |
|------|-------------|--------|
| Get profile | GET /api/profile | To implement |
| Update profile | PATCH /api/profile | To implement |
| Change password | POST /api/auth/change-password | To implement |

---

## 6. Implementation Phases

### Phase 1: Foundation (Weeks 1–2)
1. Prisma schema (all models above)
2. Database migrations
3. User + Auth (login, JWT, protected routes)
4. Access Request flow (submit, admin approval, create user)
5. SuperAdmin dashboard (basic)

### Phase 2: Core Modules (Weeks 3–5)
1. Tasks (CRUD, assignees, status)
2. Documents (upload, list, visibility)
3. Departments + HOD assignment

### Phase 3: Workflows (Weeks 6–7)
1. Approval requests (Staff + Secretary)
2. Approval queue (HOD/MD)
3. Daily reports
4. Notifications (basic)

### Phase 4: Extended Modules (Weeks 8–9)
1. Tenders
2. Events + RSVP
3. Announcements
4. Escalations
5. Bulk approvals

### Phase 5: Polish (Week 10+)
1. Forgot / Reset password
2. Audit logging
3. Performance optimization
4. Email templates and delivery

---

*Document version: 1.0 — February 2025*
