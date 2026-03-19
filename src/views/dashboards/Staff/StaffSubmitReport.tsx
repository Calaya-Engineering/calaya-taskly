"use client";

// pages/dashboards/Staff/StaffSubmitReport.jsx
import { useState, useMemo, useEffect, type ReactNode } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
import { fetchWithAuth } from "@/lib/api";
import { toast } from "@/lib/toast";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";
/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

const SectionTitle = ({
  title,
  subtitle = null,
  action = null,
}: {
  title: string;
  subtitle?: ReactNode;
  action?: ReactNode;
}) => (
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

const Pill = ({ children, tone = "default" }) => {
  const styles =
    tone === "danger"
      ? "bg-red-50 text-red-700 ring-red-100"
      : tone === "success"
        ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
        : tone === "warn"
          ? "bg-amber-50 text-amber-800 ring-amber-100"
          : tone === "info"
            ? "bg-blue-50 text-blue-700 ring-blue-100"
            : "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

const DEFAULT_STAFF_PROFILE = {
  name: "Staff Member",
  department: "Unassigned",
};

type SubmittedReport = {
  id: string;
  title: string;
  taskId: string;
  submittedDate: string;
  status: string;
  file: string;
  fileSize: string;
  fileUrl: string | null;
};

type SubmittedReportFallback = {
  taskId?: string;
  fileName?: string;
  fileSize?: string;
  fileUrl?: string | null;
};

type TaskSummary = {
  id: number | string;
  title: string;
  dueDate?: string | null;
};

const normalizeSubmittedReport = (report: any, fallback: SubmittedReportFallback = {}): SubmittedReport => ({
  id: String(report?.id ?? ""),
  title: String(report?.title ?? "Untitled Report"),
  taskId: String(fallback.taskId ?? report?.taskId ?? "N/A"),
  submittedDate: String(report?.submittedAt ?? report?.date ?? new Date().toISOString()),
  status: String(report?.status ?? "PENDING"),
  file: String(fallback.fileName ?? report?.attachmentName ?? report?.title ?? "Report attachment"),
  fileSize: String(fallback.fileSize ?? report?.fileSize ?? "—"),
  fileUrl: fallback.fileUrl ?? report?.attachmentUrl ?? report?.fileUrl ?? report?.entriesUrl ?? null,
});

const getStatusTone = (status) => {
  switch (status) {
    case 'APPROVED': return 'success';
    case 'PENDING': return 'warn';
    case 'UNDER_REVIEW': return 'warn';
    case 'SUBMITTED': return 'info';
    default: return 'default';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'APPROVED': return 'Approved';
    case 'PENDING': return 'Pending Review';
    case 'UNDER_REVIEW': return 'Under Review';
    case 'SUBMITTED': return 'Submitted';
    default: return status;
  }
};

const getFileIcon = (fileName) => {
  const ext = String(fileName ?? "").split('.').pop()?.toLowerCase() || "";
  switch (ext) {
    case 'pdf': return '📕';
    case 'doc':
    case 'docx': return '📘';
    case 'xls':
    case 'xlsx': return '📗';
    case 'ppt':
    case 'pptx': return '📙';
    case 'jpg':
    case 'jpeg':
    case 'png': return '🖼️';
    default: return '📎';
  }
};

const fmtDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    hour12: true
  }) : "Not set";

export default function StaffSubmitReport() {
  const [reportType, setReportType] = useState('task');
  const [selectedTask, setSelectedTask] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReports, setSubmittedReports] = useState<SubmittedReport[]>([]);
  const [tasks, setTasks] = useState<TaskSummary[]>([]);
  const [staffProfile, setStaffProfile] = useState(DEFAULT_STAFF_PROFILE);
  const [loading, setLoading] = useState(true);

  const staffName = staffProfile.name || DEFAULT_STAFF_PROFILE.name;
  const staffDepartment = staffProfile.department || DEFAULT_STAFF_PROFILE.department;

  useEffect(() => {
    async function loadPageData() {
      setLoading(true);
      try {
        const [meRes, tasksRes] = await Promise.all([
          fetchWithAuth("/api/me"),
          fetchWithAuth("/api/tasks/my-tasks"),
        ]);

        let nextProfile = DEFAULT_STAFF_PROFILE;
        if (meRes.ok) {
          const me = await meRes.json();
          nextProfile = {
            name: String(me?.name ?? me?.email?.split("@")[0] ?? DEFAULT_STAFF_PROFILE.name),
            department: String(me?.department ?? DEFAULT_STAFF_PROFILE.department),
          };
          setStaffProfile(nextProfile);
        }

        if (tasksRes.ok) {
          const data = await tasksRes.json();
          setTasks(Array.isArray(data) ? data : []);
        }

        if (nextProfile.department && nextProfile.department !== DEFAULT_STAFF_PROFILE.department) {
          const reportsRes = await fetchWithAuth(
            `/api/daily-reports?department=${encodeURIComponent(nextProfile.department)}&limit=200`
          );
          if (reportsRes.ok) {
            const data = await reportsRes.json();
            const ownReports = Array.isArray(data)
              ? data
                  .filter((report) => String(report?.submittedBy ?? "") === nextProfile.name)
                  .map((report) => normalizeSubmittedReport(report))
              : [];
            setSubmittedReports(ownReports);
          }
        }
      } catch (err) {
        console.error("Failed to load report page data:", err);
        toast.error("Failed to load reports");
      } finally {
        setLoading(false);
      }
    }

    loadPageData();
  }, []);

  const stats = useMemo(() => {
    const total = submittedReports.length;
    const approved = submittedReports.filter(r => r.status === 'APPROVED').length;
    const underReview = submittedReports.filter(r => r.status === 'UNDER_REVIEW' || r.status === 'PENDING').length;
    const thisMonth = submittedReports.filter(r => {
      const reportDate = new Date(r.submittedDate);
      const now = new Date();
      return reportDate.getMonth() === now.getMonth() &&
        reportDate.getFullYear() === now.getFullYear();
    }).length;

    return { total, approved, underReview, thisMonth };
  }, [submittedReports]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 50 * 1024 * 1024) {
        toast.error('File size exceeds 50MB limit');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.warning('Please enter a report title');
      return;
    }
    if (reportType === 'task' && !selectedTask) {
      toast.warning('Please select the related task');
      return;
    }
    if (!file) {
      toast.warning('Please select a file to upload');
      return;
    }
    if (!staffDepartment || staffDepartment === DEFAULT_STAFF_PROFILE.department) {
      toast.error('Your account has no department assigned. Contact admin.');
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const taskDetails = tasks.find((task) => String(task.id) === String(selectedTask));

      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const uploadRes = await fetchWithAuth("/api/upload/cloudinary", {
        method: "POST",
        body: uploadFormData,
      });
      const uploadData = await uploadRes.json().catch(() => null);
      if (!uploadRes.ok || !uploadData?.url) {
        toast.error(uploadData?.error || "Failed to upload attachment");
        return;
      }

      const reportRes = await fetchWithAuth("/api/daily-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          department: staffDepartment,
          date: new Date().toISOString().split("T")[0],
          attachmentUrl: uploadData.url,
          attachmentName: file.name,
          entries: [
            {
              taskName: reportType === "task" ? taskDetails?.title || title.trim() : title.trim(),
              objective: description.trim() || (reportType === "task" ? "Task report submission" : "General report submission"),
              target: reportType === "task" ? `Task ID: ${taskDetails?.id ?? selectedTask}` : "General report",
              nextDayTask: "",
            },
          ],
        }),
      });
      const reportData = await reportRes.json().catch(() => null);
      if (!reportRes.ok) {
        toast.error(reportData?.error || "Failed to save report");
        return;
      }

      setSubmittedReports((prev) => [
        normalizeSubmittedReport(reportData, {
          taskId: reportType === "task" ? selectedTask || "N/A" : "N/A",
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          fileUrl: uploadData.url,
        }),
        ...prev,
      ]);
      setTitle('');
      setDescription('');
      setFile(null);
      setSelectedTask('');
      setReportType('task');
      toast.success('Report submitted successfully!');
    } catch (err) {
      console.error("Failed to submit report:", err);
      toast.error("Failed to submit report");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = (report) => {
    if (!report.fileUrl) {
      toast.info(`No attachment available for ${report.file}`);
      return;
    }
    window.open(report.fileUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout menuItems={StaffMenuItems} userRole="Staff">
      <div className="space-y-6">
        {/* Hero Section */}
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
                  <Pill>Submit Report</Pill>
                  <Pill tone="info">{stats.total} Total</Pill>
                  <Pill tone="success">{stats.approved} Approved</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Submit Report
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Upload reports for tasks or general submissions in any format
                </p>
                <p className="text-sm text-gray-500 mt-3">
                  Department: <span className="font-semibold text-gray-800">{staffDepartment}</span> • {staffName}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/staff-dashboard">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                  >
                    Back to Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submit Form */}
          <Card className="p-6">
            <SectionTitle title="Submit New Report" />

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* Report Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Report Type</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setReportType('task')}
                    className={`flex-1 px-4 py-3 rounded-2xl font-semibold text-sm border transition active:scale-[0.99] ${reportType === 'task' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    style={{
                      borderColor: reportType === 'task' ? "var(--primary-blue)" : "#e5e7eb",
                      color: reportType === 'task' ? "var(--primary-blue)" : "#374151",
                    }}
                  >
                    Task Report
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportType('general')}
                    className={`flex-1 px-4 py-3 rounded-2xl font-semibold text-sm border transition active:scale-[0.99] ${reportType === 'general' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    style={{
                      borderColor: reportType === 'general' ? "var(--secondary-blue)" : "#e5e7eb",
                      color: reportType === 'general' ? "var(--secondary-blue)" : "#374151",
                    }}
                  >
                    General Report
                  </button>
                </div>
              </div>

              {/* Task Selection */}
              {reportType === 'task' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Task</label>
                  <select
                    value={selectedTask}
                    onChange={(e) => setSelectedTask(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select a task...</option>
                    {tasks.map((task) => (
                      <option key={task.id} value={task.id}>
                        {task.title} ({task.id}) - Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { timeZone: 'UTC' }) : 'N/A'}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Report Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Report Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter report title"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter report description or notes..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload File <span className="text-red-500">*</span>
                </label>
                <div className="rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400 transition">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}
                    >
                      <span className="text-3xl">{renderNodeWithIcons("📎")}</span>
                    </div>
                    <p className="text-gray-800 font-extrabold mb-1">
                      {file ? file.name : 'Click to upload file'}
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF, DOC, XLS, PPT, JPG, PNG (Max 50MB)
                    </p>
                  </label>
                </div>

                {file && (
                  <div className="mt-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600">{renderNodeWithIcons("✅")}</span>
                        <span className="text-sm font-semibold text-emerald-700">{file.name}</span>
                      </div>
                      <span className="text-xs text-emerald-600">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 rounded-2xl font-semibold text-white transition ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'active:scale-[0.99]'
                    }`}
                  style={{ backgroundColor: "var(--accent-red)" }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : 'Submit Report'}
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Report will be submitted to your HOD for review
                </p>
              </div>
            </form>
          </Card>

          {/* Submitted Reports */}
          <Card className="p-6">
            <SectionTitle
              title="Previously Submitted Reports"
              subtitle={`${submittedReports.length} total`}
            />

            <div className="mt-6 space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {submittedReports.length === 0 && (
                <div className="rounded-2xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500">
                  No saved reports yet. Your submitted reports will appear here after they are stored.
                </div>
              )}
              {submittedReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0"
                      style={{ backgroundColor: "rgba(109, 198, 223, 0.1)" }}
                    >
                      {renderNodeWithIcons(getFileIcon(report.file))}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-extrabold text-sm text-gray-900">{report.title}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            ID: {report.id} • Task: {report.taskId}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {fmtDateTime(report.submittedDate)} • {report.fileSize}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Pill tone={getStatusTone(report.status)}>
                            {renderNodeWithIcons(getStatusLabel(report.status))}
                          </Pill>
                          <button
                            onClick={() => handleDownload(report)}
                            className="px-3 py-1.5 rounded-xl text-[11px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                            style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Report Guidelines */}
            <div className="mt-6 p-5 rounded-2xl" style={{ backgroundColor: "rgba(109, 198, 223, 0.08)" }}>
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ backgroundColor: "rgba(44,75,155,0.1)" }}
                >
                  ℹ️
                </div>
                <div>
                  <p className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                    Report Submission Guidelines
                  </p>
                  <ul className="text-xs text-gray-600 mt-2 space-y-1.5">
                    <li>• Submit reports in any format (PDF, DOC, XLS, etc.)</li>
                    <li>• Maximum file size: 50MB</li>
                    <li>• Include clear titles for easy identification</li>
                    <li>• Task reports are linked to specific tasks</li>
                    <li>• All reports are reviewed by your HOD</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Total Submitted</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--primary-blue)" }}>
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(44,75,155,0.1)" }}>
                <span style={{ color: "var(--primary-blue)" }} className="text-xl">{renderNodeWithIcons("📤")}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Approved</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#10B981" }}>
                  {stats.approved}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(16,185,129,0.1)" }}>
                <span style={{ color: "#10B981" }} className="text-xl">{renderNodeWithIcons("✅")}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">Under Review</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "#F59E0B" }}>
                  {stats.underReview}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(245,158,11,0.1)" }}>
                <span style={{ color: "#F59E0B" }} className="text-xl">⏳</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold">This Month</p>
                <p className="text-3xl font-extrabold mt-2" style={{ color: "var(--secondary-blue)" }}>
                  {stats.thisMonth}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(109,198,223,0.1)" }}>
                <span style={{ color: "var(--secondary-blue)" }} className="text-xl">{renderNodeWithIcons("📅")}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <SectionTitle title="Quick Actions" subtitle="Common operations" />

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/staff-dashboard/tasks">
              <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                  >
                    <span className="text-xl">{renderNodeWithIcons("📋")}</span>
                  </div>
                  <div>
                    <p className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      View My Tasks
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Check pending tasks</p>
                  </div>
                </div>
              </button>
            </Link>

            <Link href="/staff-dashboard/documents">
              <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                  >
                    <span className="text-xl">{renderNodeWithIcons("📄")}</span>
                  </div>
                  <div>
                    <p className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      My Documents
                    </p>
                    <p className="text-xs text-gray-500 mt-1">View uploaded files</p>
                  </div>
                </div>
              </button>
            </Link>

            <Link href="/staff-dashboard/notifications">
              <button className="w-full p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition text-left">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                  >
                    <span className="text-xl">{renderNodeWithIcons("🔔")}</span>
                  </div>
                  <div>
                    <p className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
                      Notifications
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Check report updates</p>
                  </div>
                </div>
              </button>
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
