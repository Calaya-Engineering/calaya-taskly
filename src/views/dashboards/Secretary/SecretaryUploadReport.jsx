"use client";

// pages/dashboards/Secretary/SecretaryUploadReport.jsx
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { SecretaryMenuItems } from "@/utils/menus";
/* ---------- UI helpers ---------- */
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
      : tone === "info"
      ? "bg-blue-50 text-blue-700 ring-blue-100"
      : tone === "purple"
      ? "bg-purple-50 text-purple-700 ring-purple-100"
      : "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

const btnBase = "px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white`;

const inputBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";
const textareaBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none";

// Secretary details
const SECRETARY_DEPARTMENT = 'Admin';
const SECRETARY_NAME = 'Ms. Chen';

// Storage keys
const STORAGE_KEYS = {
  REPORT_ENTRIES: 'secretaryPersonalReport_entries',
  IS_MODAL_OPEN: 'secretaryPersonalReport_modalOpen',
  REPORT_TITLE: 'secretaryPersonalReport_title',
  REPORT_DESCRIPTION: 'secretaryPersonalReport_description'
};

const getStatusTone = (status) => {
  switch (status) {
    case 'Approved': return 'success';
    case 'Pending': return 'warn';
    case 'Rejected': return 'danger';
    default: return 'default';
  }
};

const getFileIcon = (fileName) => {
  const ext = fileName?.split('.').pop().toLowerCase();
  switch(ext) {
    case 'pdf': return '📕';
    case 'doc':
    case 'docx': return '📘';
    case 'xls':
    case 'xlsx': return '📗';
    case 'jpg':
    case 'jpeg':
    case 'png': return '🖼️';
    case 'txt': return '📝';
    default: return '📎';
  }
};

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Not set";

export default function SecretaryUploadReport() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportTitle, setReportTitle] = useState('');
  const [reportFile, setReportFile] = useState(null);
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Report entries with dynamic rows for personal daily report
  const [reportEntries, setReportEntries] = useState([
    {
      id: 1,
      taskName: '',
      objective: '',
      target: '',
      nextDayTask: ''
    }
  ]);

  // Secretary's personal submitted reports
  const [personalReports, setPersonalReports] = useState([
    {
      id: 'REP-2024-12-15-001',
      date: '2024-12-15',
      title: 'Secretary Daily Report - December 15',
      submittedBy: SECRETARY_NAME,
      submittedAt: '2024-12-15T16:30:00',
      entries: [
        {
          taskName: 'Daily Report Compilation',
          objective: 'Compile all department daily reports',
          target: 'Collect reports from 8 departments',
          nextDayTask: 'Follow up with pending departments'
        },
        {
          taskName: 'Meeting Minutes',
          objective: 'Document HOD meeting minutes',
          target: 'Complete minutes by 3:00 PM',
          nextDayTask: 'Distribute minutes to attendees'
        }
      ],
      status: 'Approved'
    },
    {
      id: 'REP-2024-12-14-001',
      date: '2024-12-14',
      title: 'Secretary Daily Report - December 14',
      submittedBy: SECRETARY_NAME,
      submittedAt: '2024-12-14T17:00:00',
      entries: [
        {
          taskName: 'Document Organization',
          objective: 'Organize monthly document archive',
          target: 'File 50+ documents',
          nextDayTask: 'Continue digitization project'
        }
      ],
      status: 'Approved'
    },
    {
      id: 'REP-2024-12-13-001',
      date: '2024-12-13',
      title: 'Secretary Daily Report - December 13',
      submittedBy: SECRETARY_NAME,
      submittedAt: '2024-12-13T16:45:00',
      entries: [
        {
          taskName: 'Calendar Management',
          objective: 'Schedule MD meetings',
          target: 'Confirm all December meetings',
          nextDayTask: 'Prepare meeting materials'
        },
        {
          taskName: 'Travel Arrangements',
          objective: 'Arrange site visit logistics',
          target: 'Confirm transportation and accommodation',
          nextDayTask: 'Finalize itinerary'
        }
      ],
      status: 'Pending'
    }
  ]);

  const pendingReports = [
    { date: '2024-12-09', title: 'Equipment Status Report' },
    { date: '2024-12-16', title: 'Weekly Summary Report' },
    { date: '2024-12-23', title: 'Monthly Operations Report' },
  ];

  const stats = useMemo(() => {
    const total = personalReports.length;
    const approved = personalReports.filter(r => r.status === 'Approved').length;
    const pending = personalReports.filter(r => r.status === 'Pending').length;
    const thisWeek = personalReports.filter(r => {
      const reportDate = new Date(r.date);
      const now = new Date();
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      return reportDate >= weekAgo;
    }).length;
    return { total, approved, pending, thisWeek };
  }, [personalReports]);

  // Load saved form data from sessionStorage on mount
  useEffect(() => {
    const savedEntries = sessionStorage.getItem(STORAGE_KEYS.REPORT_ENTRIES);
    const savedTitle = sessionStorage.getItem(STORAGE_KEYS.REPORT_TITLE);
    const savedDescription = sessionStorage.getItem(STORAGE_KEYS.REPORT_DESCRIPTION);
    const savedModalState = sessionStorage.getItem(STORAGE_KEYS.IS_MODAL_OPEN);

    if (savedEntries) {
      setReportEntries(JSON.parse(savedEntries));
    }
    if (savedTitle) {
      setReportTitle(savedTitle);
    }
    if (savedDescription) {
      setNotes(savedDescription);
    }
    if (savedModalState) {
      setIsModalOpen(JSON.parse(savedModalState));
    }
  }, []);

  // Save form data to sessionStorage whenever it changes and modal is open
  useEffect(() => {
    if (isModalOpen) {
      sessionStorage.setItem(STORAGE_KEYS.REPORT_ENTRIES, JSON.stringify(reportEntries));
      sessionStorage.setItem(STORAGE_KEYS.REPORT_TITLE, reportTitle);
      sessionStorage.setItem(STORAGE_KEYS.REPORT_DESCRIPTION, notes);
      sessionStorage.setItem(STORAGE_KEYS.IS_MODAL_OPEN, JSON.stringify(isModalOpen));
    }
  }, [reportEntries, reportTitle, notes, isModalOpen]);

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        toast.error('File size exceeds 100MB limit. Please choose a smaller file.');
        return;
      }
      
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
        'image/jpeg',
        'image/png'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast.warning('Please upload a valid file type (PDF, DOC, DOCX, XLS, XLSX, TXT, JPG, PNG)');
        return;
      }
      
      setReportFile(file);
    }
  };

  // Add new row to report entries
  const addNewRow = () => {
    const newEntry = {
      id: Date.now(),
      taskName: '',
      objective: '',
      target: '',
      nextDayTask: ''
    };
    setReportEntries([...reportEntries, newEntry]);
  };

  // Remove row from report entries
  const removeRow = (id) => {
    if (reportEntries.length > 1) {
      setReportEntries(reportEntries.filter(entry => entry.id !== id));
    }
  };

  // Update report entry field
  const updateEntry = (id, field, value) => {
    setReportEntries(reportEntries.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  // Reset form and clear storage
  const resetForm = () => {
    const defaultEntries = [{
      id: Date.now(),
      taskName: '',
      objective: '',
      target: '',
      nextDayTask: ''
    }];
    
    setReportEntries(defaultEntries);
    setReportTitle('');
    setNotes('');
    setReportFile(null);
    
    sessionStorage.removeItem(STORAGE_KEYS.REPORT_ENTRIES);
    sessionStorage.removeItem(STORAGE_KEYS.REPORT_TITLE);
    sessionStorage.removeItem(STORAGE_KEYS.REPORT_DESCRIPTION);
  };

  // Handle modal close (X button) - DON'T clear data
  const handleModalClose = () => {
    setIsModalOpen(false);
    sessionStorage.setItem(STORAGE_KEYS.IS_MODAL_OPEN, JSON.stringify(false));
  };

  // Handle cancel button - Clear data
  const handleCancel = () => {
    setIsModalOpen(false);
    sessionStorage.setItem(STORAGE_KEYS.IS_MODAL_OPEN, JSON.stringify(false));
    resetForm();
  };

  // Handle submit from modal (personal daily report)
  const handleModalSubmit = (e) => {
    e.preventDefault();
    
    if (!reportTitle.trim()) {
      toast.warning('Please enter a report title');
      return;
    }

    const hasValidEntry = reportEntries.some(entry => entry.taskName.trim() !== '');
    if (!hasValidEntry) {
      toast.warning('Please add at least one task entry');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate API call
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Create new personal report
          const newReport = {
            id: `REP-${new Date().toISOString().split('T')[0]}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            date: selectedDate,
            title: reportTitle || `Secretary Daily Report - ${new Date().toLocaleDateString()}`,
            submittedBy: SECRETARY_NAME,
            submittedAt: new Date().toISOString(),
            entries: reportEntries.filter(entry => entry.taskName.trim() !== ''),
            status: 'Pending'
          };
          
          setPersonalReports([newReport, ...personalReports]);
          setIsUploading(false);
          toast.success('Personal daily report submitted successfully!');
          setIsModalOpen(false);
          sessionStorage.setItem(STORAGE_KEYS.IS_MODAL_OPEN, JSON.stringify(false));
          resetForm();
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast.success('Company report uploaded successfully!');
          setReportTitle('');
          setReportFile(null);
          setNotes('');
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!reportTitle.trim()) {
      toast.warning('Please enter a report title');
      return;
    }
    
    if (!reportFile) {
      toast.warning('Please select a file to upload');
      return;
    }
    
    simulateUpload();
  };

  // Auto-resize textarea
  const handleTextareaResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  // Initialize textarea heights when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        });
      }, 0);
    }
  }, [isModalOpen, reportEntries]);

  return (
    <Layout menuItems={SecretaryMenuItems} userRole="Secretary">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HERO */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>📄 Secretary Reports</Pill>
                  <Pill tone="info">Personal: {stats.total}</Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Secretary Reports
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Upload company-wide reports or submit your personal daily reports
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm text-gray-500">Secretary:</span>
                  <Pill tone="default">{SECRETARY_NAME}</Pill>
                  <Pill tone="info">{SECRETARY_DEPARTMENT}</Pill>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    const savedEntries = sessionStorage.getItem(STORAGE_KEYS.REPORT_ENTRIES);
                    if (savedEntries) {
                      setIsModalOpen(true);
                    } else {
                      resetForm();
                      setIsModalOpen(true);
                    }
                  }}
                  className={btnSolid}
                  style={{ backgroundColor: "var(--accent-red)" }}
                >
                  + Submit Personal Report
                </button>
                <Link href="/secretary-dashboard/reports-archive">
                  <button className={btnOutline} style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}>
                    View Archive
                  </button>
                </Link>
                <Link href="/secretary-dashboard">
                  <button className={btnSolid} style={{ backgroundColor: "var(--secondary-blue)" }}>
                    Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Draft Alert */}
        {sessionStorage.getItem(STORAGE_KEYS.REPORT_ENTRIES) && (
          <Card className="border-amber-200 bg-amber-50/30 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📝</span>
                <div>
                  <h3 className="font-extrabold text-amber-800">You have an unsaved personal report draft</h3>
                  <p className="text-amber-600 text-sm">
                    Your previously created daily report draft is available. Click "Submit Personal Report" to continue.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  sessionStorage.removeItem(STORAGE_KEYS.REPORT_ENTRIES);
                  toast.success('Draft cleared');
                }}
                className="px-4 py-2 rounded-xl font-semibold text-sm border bg-white hover:bg-amber-50 active:scale-[0.99] transition"
                style={{ borderColor: "rgba(245,158,11,0.35)", color: "#F59E0B" }}
              >
                Clear Draft
              </button>
            </div>
          </Card>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Company Report Upload */}
          <Card className="p-6">
            <SectionTitle 
              title="🏢 Company Report Upload" 
              subtitle="Upload company-wide daily reports for distribution"
              action={
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(44,75,155,0.1)" }}>
                  <span className="text-lg">🏢</span>
                </div>
              }
            />

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Report Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={inputBase}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Report Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  placeholder="e.g., Daily Operations Report - December 12, 2024"
                  className={inputBase}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload File <span className="text-red-500">*</span>
                </label>
                <div className={`rounded-2xl border-2 ${reportFile ? 'border-emerald-300 bg-emerald-50/30' : 'border-dashed border-gray-300'} p-6 text-center hover:border-blue-400 transition`}>
                  {reportFile ? (
                    <div className="text-center">
                      <div className="text-3xl mb-2 text-emerald-500">✓</div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-2xl">{getFileIcon(reportFile.name)}</span>
                        <p className="font-extrabold text-gray-900 text-sm">{reportFile.name}</p>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">
                        {(reportFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <button
                        type="button"
                        onClick={() => setReportFile(null)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold border bg-white hover:bg-red-50 active:scale-[0.99] transition"
                        style={{ borderColor: "rgba(237,50,55,0.45)", color: "var(--accent-red)" }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div
                        className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "rgba(109, 198, 223, 0.12)" }}
                      >
                        <span className="text-3xl" style={{ color: "var(--secondary-blue)" }}>📎</span>
                      </div>
                      <p className="text-gray-800 font-extrabold mb-1">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PDF, DOC, XLS, JPG up to 100MB</p>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                      />
                    </label>
                  )}
                </div>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%`, backgroundColor: "var(--primary-blue)" }}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isUploading}
                className={`w-full ${btnSolid} disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ backgroundColor: "var(--primary-blue)" }}
              >
                Upload Company Report
              </button>
            </form>
          </Card>

          {/* Right Column - Personal Reports */}
          <Card className="p-6">
            <SectionTitle 
              title="📋 My Personal Daily Reports" 
              subtitle="Track your daily tasks, objectives, and next day plans"
              action={
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(237,50,55,0.1)" }}>
                  <span className="text-lg">👤</span>
                </div>
              }
            />

            <div className="mt-6 space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {personalReports.map((report) => (
                <div key={report.id} className="p-4 rounded-2xl border border-gray-200/70 transition">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-extrabold text-sm text-gray-900">{report.title}</h3>
                        <Pill tone={getStatusTone(report.status)}>{report.status}</Pill>
                      </div>
                      <p className="text-xs text-gray-500">
                        {fmtDate(report.date)} • {new Date(report.submittedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <Link href={`/secretary-dashboard/report/${report.id}`}>
                      <button className="px-3 py-1.5 rounded-xl text-[11px] font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                        style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}>
                        View
                      </button>
                    </Link>
                  </div>

                  <div className="mt-3 pl-2">
                    <p className="text-xs font-extrabold text-gray-700 mb-2">
                      {report.entries.length} task(s):
                    </p>
                    <div className="space-y-2">
                      {report.entries.slice(0, 2).map((entry, idx) => (
                        <div key={idx} className="text-xs text-gray-600 flex items-start">
                          <span className="text-gray-400 mr-2">•</span>
                          <div>
                            <span className="font-semibold">{entry.taskName}</span>
                            {entry.target && (
                              <span className="text-gray-500 ml-1">- {entry.target}</span>
                            )}
                          </div>
                        </div>
                      ))}
                      {report.entries.length > 2 && (
                        <p className="text-xs text-gray-400 ml-3">
                          +{report.entries.length - 2} more tasks
                        </p>
                      )}
                    </div>
                    {report.entries[0]?.nextDayTask && (
                      <div className="mt-3 text-xs text-gray-600 bg-gray-50 p-2 rounded-xl">
                        <span className="font-extrabold text-gray-700">Next:</span> {report.entries[0].nextDayTask}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Pending Reports & Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Company Reports */}
          <Card className="p-6">
            <SectionTitle title="Pending Company Reports" subtitle="Reports awaiting upload" />

            <div className="mt-5 space-y-3">
              {pendingReports.map((report, index) => (
                <div key={index} className="p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50 transition flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-sm text-gray-900">{report.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{fmtDate(report.date)}</p>
                  </div>
                  <button
                    className="px-4 py-2 rounded-2xl text-xs font-semibold text-white active:scale-[0.99] transition"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    Upload
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <SectionTitle title="📊 My Statistics" subtitle="Personal report metrics" />

            <div className="mt-5 space-y-4">
              <div className="flex justify-between items-center p-3 rounded-2xl bg-gray-50">
                <span className="text-sm text-gray-600 font-semibold">Total Reports</span>
                <span className="font-extrabold text-2xl" style={{ color: "var(--primary-blue)" }}>
                  {stats.total}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-2xl bg-gray-50">
                <span className="text-sm text-gray-600 font-semibold">Approved</span>
                <span className="font-extrabold text-2xl text-emerald-600">{stats.approved}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-2xl bg-gray-50">
                <span className="text-sm text-gray-600 font-semibold">Pending</span>
                <span className="font-extrabold text-2xl text-amber-600">{stats.pending}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-2xl bg-gray-50">
                <span className="text-sm text-gray-600 font-semibold">This Week</span>
                <span className="font-extrabold text-2xl text-purple-600">{stats.thisWeek}</span>
              </div>
            </div>
          </Card>

          {/* Quick Tips */}
          <Card className="p-6">
            <SectionTitle title="📝 Daily Report Tips" subtitle="Best practices" />

            <ul className="mt-5 space-y-3">
              {[
                'Log your completed tasks daily',
                'Be specific with objectives and targets',
                'Plan next day tasks for better productivity',
                'Submit before end of workday',
              ].map((tip, index) => (
                <li key={index} className="flex items-start gap-2 p-2 rounded-xl hover:bg-gray-50 transition">
                  <span className="text-emerald-500 text-lg">✓</span>
                  <span className="text-sm text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* Personal Daily Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleModalClose}></div>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden border border-gray-200 transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        My Personal Daily Report
                      </h3>
                      <Pill tone="info">Secretary</Pill>
                    </div>
                    <p className="text-gray-600 mt-2">
                      Record your daily tasks, objectives, and plan for tomorrow
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Pill tone="default">{SECRETARY_DEPARTMENT}</Pill>
                      <span className="text-sm text-gray-500">• {SECRETARY_NAME}</span>
                    </div>
                    {sessionStorage.getItem(STORAGE_KEYS.REPORT_ENTRIES) && (
                      <div className="mt-2 inline-flex items-center px-3 py-1.5 bg-amber-50 text-amber-800 rounded-xl text-xs ring-1 ring-amber-200">
                        ⚡ Draft saved - continue where you left off
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleModalClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>

                <form onSubmit={handleModalSubmit} className="space-y-6">
                  {/* Report Date and Title */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Report Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className={inputBase}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Report Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={reportTitle}
                          onChange={(e) => setReportTitle(e.target.value)}
                          placeholder="e.g., Secretary Daily Report"
                          className={inputBase}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tasks Table */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-extrabold" style={{ color: "var(--primary-blue)" }}>
                        Today's Tasks
                      </h4>
                      <button
                        type="button"
                        onClick={addNewRow}
                        className="px-4 py-2.5 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
                        style={{ backgroundColor: "var(--secondary-blue)" }}
                      >
                        + Add Task
                      </button>
                    </div>

                    <div className="overflow-x-auto border border-gray-200/70 rounded-2xl">
                      <table className="w-full">
                        <thead className="bg-gray-100 border-b border-gray-200/70">
                          <tr className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            <th className="px-4 py-3 text-left w-16">#</th>
                            <th className="px-4 py-3 text-left">Task Name</th>
                            <th className="px-4 py-3 text-left">Objective/Mission</th>
                            <th className="px-4 py-3 text-left">Target</th>
                            <th className="px-4 py-3 text-left">Next Day Task</th>
                            <th className="px-4 py-3 text-center w-20">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/70">
                          {reportEntries.map((entry, index) => (
                            <tr key={entry.id} className="hover:bg-gray-50/70">
                              <td className="px-4 py-3 text-sm text-gray-600 align-top font-semibold">{index + 1}</td>
                              <td className="px-4 py-3">
                                <textarea
                                  value={entry.taskName}
                                  onChange={(e) => {
                                    updateEntry(entry.id, 'taskName', e.target.value);
                                    handleTextareaResize(e);
                                  }}
                                  onInput={handleTextareaResize}
                                  placeholder="e.g., Compile daily reports"
                                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm resize-none overflow-hidden"
                                  rows="1"
                                  style={{ minHeight: '38px' }}
                                  required={index === 0}
                                />
                              </td>
                              <td className="px-4 py-3">
                                <textarea
                                  value={entry.objective}
                                  onChange={(e) => {
                                    updateEntry(entry.id, 'objective', e.target.value);
                                    handleTextareaResize(e);
                                  }}
                                  onInput={handleTextareaResize}
                                  placeholder="What to achieve"
                                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm resize-none overflow-hidden"
                                  rows="1"
                                  style={{ minHeight: '38px' }}
                                />
                              </td>
                              <td className="px-4 py-3">
                                <textarea
                                  value={entry.target}
                                  onChange={(e) => {
                                    updateEntry(entry.id, 'target', e.target.value);
                                    handleTextareaResize(e);
                                  }}
                                  onInput={handleTextareaResize}
                                  placeholder="Specific target"
                                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm resize-none overflow-hidden"
                                  rows="1"
                                  style={{ minHeight: '38px' }}
                                />
                              </td>
                              <td className="px-4 py-3">
                                <textarea
                                  value={entry.nextDayTask}
                                  onChange={(e) => {
                                    updateEntry(entry.id, 'nextDayTask', e.target.value);
                                    handleTextareaResize(e);
                                  }}
                                  onInput={handleTextareaResize}
                                  placeholder="Plan for tomorrow"
                                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm resize-none overflow-hidden"
                                  rows="1"
                                  style={{ minHeight: '38px' }}
                                />
                              </td>
                              <td className="px-4 py-3 text-center align-top">
                                <button
                                  type="button"
                                  onClick={() => removeRow(entry.id)}
                                  disabled={reportEntries.length === 1}
                                  className={`text-sm font-semibold px-3 py-1.5 rounded-xl transition ${
                                    reportEntries.length === 1
                                      ? 'text-gray-400 cursor-not-allowed'
                                      : 'text-red-600 hover:bg-red-50'
                                  }`}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      * Add at least one task. Text areas expand as you type.
                    </p>
                  </div>

                  {/* Notes */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any additional notes or comments..."
                      rows="2"
                      className={textareaBase}
                    />
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Submitting personal report...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%`, backgroundColor: "var(--primary-blue)" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form Actions */}
                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-200/70">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                      style={{ borderColor: "rgba(44,75,155,0.35)", color: "var(--primary-blue)" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUploading}
                      className={`px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition ${
                        isUploading ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                      style={{ backgroundColor: "var(--accent-red)" }}
                    >
                      {isUploading ? 'Submitting...' : 'Submit My Daily Report'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}