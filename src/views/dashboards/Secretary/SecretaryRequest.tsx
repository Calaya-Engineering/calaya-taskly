"use client";

// pages/dashboards/Secretary/SecretaryRequest.jsx
import { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { SecretaryMenuItems } from "@/utils/menus";
import { fetchWithAuth } from "@/lib/api";
import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";
/* ---------- UI helpers ---------- */
const Card = ({ className = "", children, ...props }) => (
  <div
    className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}
    {...props}
  >
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle, action }) => (
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

export default function SecretaryRequest() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [departments, setDepartments] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(true);

  useEffect(() => {
    async function loadDepts() {
      try {
        const res = await fetchWithAuth("/api/departments");
        if (res.ok) {
          const data = await res.json();
          setDepartments(data.map(d => d.name));
        }
      } catch (err) {
        console.error("Failed to load departments:", err);
      } finally {
        setLoadingDepts(false);
      }
    }
    loadDepts();
  }, []);

  const [formData, setFormData] = useState({
    requestType: '',
    title: '',
    description: '',
    priority: 'MEDIUM',
    department: 'Admin',
    dueDate: '',
    meetingDate: '',
    meetingName: '',
    documentType: '',
    recipientName: '',
    recipientTitle: '',
    isConfidential: false,
    requiresSignature: false,
    taskReference: '',
    documents: [],
    additionalNotes: '',
    approvalLevel: 'HOD',
  });
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const requestTypes = [
    { value: 'MEETING_MINUTES', label: 'Meeting Minutes Approval', icon: '📝', dept: 'Admin' },
    { value: 'CORRESPONDENCE', label: 'Official Correspondence', icon: '✉️', dept: 'Admin' },
    { value: 'DOCUMENT', label: 'Document Approval', icon: '📄', dept: 'Admin' },
    { value: 'REPORT', label: 'Report Approval', icon: '📊', dept: 'Admin' },
    { value: 'ANNOUNCEMENT', label: 'Announcement Draft', icon: '📢', dept: 'Admin' },
    { value: 'SCHEDULE', label: 'Meeting Schedule', icon: '📅', dept: 'Admin' },
    { value: 'PURCHASE', label: 'Office Supply Request', icon: '🖨️', dept: 'Admin' },
    { value: 'OTHER', label: 'Other Request', icon: '📋', dept: 'Admin' },
  ];


  const documentTypes = ['Letter', 'Memo', 'Report', 'Minutes', 'Agenda', 'Notice', 'Form'];
  const priorities = [
    { value: 'LOW', label: 'Low', tone: 'success' },
    { value: 'MEDIUM', label: 'Medium', tone: 'info' },
    { value: 'HIGH', label: 'High', tone: 'warn' },
    { value: 'URGENT', label: 'Urgent', tone: 'danger' },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setShowSuccess(true);
    setIsSubmitting(false);

    // Redirect to My Submissions page after success
    setTimeout(() => {
      router.push('/secretary-dashboard/submissions');
    }, 3000);
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    switch (ext) {
      case 'pdf': return '📕';
      case 'doc':
      case 'docx': return '📘';
      case 'xls':
      case 'xlsx': return '📗';
      case 'ppt':
      case 'pptx': return '📙';
      default: return '📎';
    }
  };

  const steps = [
    { number: 1, label: 'Request Type' },
    { number: 2, label: 'Document Details' },
    { number: 3, label: 'Attachments' },
    { number: 4, label: 'Review & Submit' },
  ];

  return (
    <Layout menuItems={SecretaryMenuItems} userRole="Secretary">
      <div className="space-y-6">
        {/* Header */}
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
                  <Pill>New Submission</Pill>
                  <Pill tone="info">Secretary Portal</Pill>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Create Approval Submission
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Submit documents, correspondence, and meeting minutes for approval
                </p>
              </div>
              <Link href="/secretary-dashboard/submissions">
                <button
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "var(--secondary-blue)", color: "var(--primary-blue)" }}
                >
                  ← Back to My Submissions
                </button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Progress Steps */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center w-full md:w-auto">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white ${currentStep > step.number
                        ? 'bg-green-500'
                        : currentStep === step.number
                          ? ''
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    style={{
                      backgroundColor: currentStep === step.number ? 'var(--primary-blue)' : undefined,
                    }}
                  >
                    {currentStep > step.number ? '✓' : step.number}
                  </div>
                  <span
                    className={`ml-3 text-sm font-semibold ${currentStep === step.number
                        ? 'text-gray-900'
                        : currentStep > step.number
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }`}
                  >
                    {step.label}
                  </span>
                </div>
                {step.number < 4 && (
                  <div className="hidden md:block w-24 h-0.5 mx-4 bg-gray-200">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: currentStep > step.number ? '100%' : '0%',
                        backgroundColor: 'var(--primary-blue)',
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Success Message */}
        {showSuccess && (
          <Card className="p-8 text-center border-green-200 bg-green-50">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-green-100 flex items-center justify-center">
              <span className="text-4xl">✅</span>
            </div>
            <h2 className="text-2xl font-extrabold text-green-700 mb-2">Submission Successful!</h2>
            <p className="text-green-600 mb-4">
              Your document has been sent for approval to the appropriate authority.
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-700"></div>
              <span className="text-sm text-green-700">Redirecting to My Submissions...</span>
            </div>
          </Card>
        )}

        {/* Main Form */}
        {!showSuccess && (
          <Card className="p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Request Type */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <SectionTitle title="Select Document Type" subtitle="Choose the type of document you need approved" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {requestTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.requestType === type.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <input
                          type="radio"
                          name="requestType"
                          value={type.value}
                          checked={formData.requestType === type.value}
                          onChange={handleInputChange}
                          className="sr-only"
                          required
                        />
                        <div className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                            style={{
                              backgroundColor: formData.requestType === type.value
                                ? 'rgba(44, 75, 155, 0.1)'
                                : 'rgba(0, 0, 0, 0.05)',
                            }}
                          >
                            {type.icon}
                          </div>
                          <div>
                            <p className="font-extrabold text-gray-900">{type.label}</p>
                            <p className="text-xs text-gray-500 mt-1">Department: {type.dept}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      disabled={!formData.requestType}
                      className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: !formData.requestType ? '#ccc' : 'var(--secondary-blue)' }}
                    >
                      Next Step →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Document Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <SectionTitle title="Document Details" subtitle="Provide detailed information about your document" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Document Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter document title"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description/Purpose *</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Describe the purpose and content of this document"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Document Type *</label>
                      <select
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                        required
                      >
                        <option value="">Select type</option>
                        {documentTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Priority *</label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                        required
                      >
                        {priorities.map(p => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Department *</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                        required
                      >
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date (Optional)</label>
                      <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {/* Meeting-specific fields */}
                    {(formData.requestType === 'MEETING_MINUTES' || formData.requestType === 'SCHEDULE') && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Meeting Date *</label>
                          <input
                            type="date"
                            name="meetingDate"
                            value={formData.meetingDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                            required={formData.requestType === 'MEETING_MINUTES' || formData.requestType === 'SCHEDULE'}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Meeting Name *</label>
                          <input
                            type="text"
                            name="meetingName"
                            value={formData.meetingName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                            placeholder="e.g., Monthly Board Meeting"
                            required={formData.requestType === 'MEETING_MINUTES' || formData.requestType === 'SCHEDULE'}
                          />
                        </div>
                      </>
                    )}

                    {/* Correspondence-specific fields */}
                    {formData.requestType === 'CORRESPONDENCE' && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient Name *</label>
                          <input
                            type="text"
                            name="recipientName"
                            value={formData.recipientName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                            placeholder="Recipient name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient Title *</label>
                          <input
                            type="text"
                            name="recipientTitle"
                            value={formData.recipientTitle}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                            placeholder="e.g., Managing Director, HOD"
                            required
                          />
                        </div>
                      </>
                    )}

                    <div className="md:col-span-2">
                      <div className="flex gap-6">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="isConfidential"
                            checked={formData.isConfidential}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Confidential Document</span>
                          <Pill tone="danger">Confidential</Pill>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="requiresSignature"
                            checked={formData.requiresSignature}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Requires Signature</span>
                          <Pill tone="info">Signature Required</Pill>
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Approval Level *</label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="approvalLevel"
                            value="HOD"
                            checked={formData.approvalLevel === 'HOD'}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                            required
                          />
                          <span className="text-sm">HOD Approval</span>
                          <Pill tone="info">Department Level</Pill>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="approvalLevel"
                            value="MD"
                            checked={formData.approvalLevel === 'MD'}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                            required
                          />
                          <span className="text-sm">MD Approval</span>
                          <Pill tone="danger">Executive Level</Pill>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      disabled={!formData.title || !formData.description || !formData.documentType}
                      className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: (!formData.title || !formData.description || !formData.documentType) ? '#ccc' : 'var(--secondary-blue)' }}
                    >
                      Next: Attachments →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Attachments */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <SectionTitle title="Attachments" subtitle="Upload the document files" />

                  <div className="rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400 transition">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-flex flex-col items-center"
                    >
                      <span className="text-4xl mb-3">📎</span>
                      <span className="text-lg font-extrabold text-gray-700 mb-1">
                        Click to upload document files
                      </span>
                      <span className="text-sm text-gray-500">
                        PDF, DOC, XLS, TXT (Max 10MB each)
                      </span>
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-extrabold text-gray-700">Uploaded Files ({files.length})</h3>
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-2xl border border-gray-200/70 hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getFileIcon(file.name)}</span>
                            <div>
                              <p className="font-semibold">{file.name}</p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="p-2 hover:bg-red-50 rounded-xl transition"
                          >
                            <span className="text-red-500">🗑️</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Instructions (Optional)</label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Add any special instructions or notes..."
                    />
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition"
                      style={{ backgroundColor: 'var(--secondary-blue)' }}
                    >
                      Next: Review →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <SectionTitle title="Review Your Submission" subtitle="Please review all details before submitting" />

                  <div className="rounded-2xl border border-gray-200/70 p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                        style={{ backgroundColor: 'rgba(109, 198, 223, 0.18)' }}
                      >
                        {requestTypes.find(t => t.value === formData.requestType)?.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-gray-900">{formData.title || 'Untitled Document'}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <Pill tone={
                            formData.priority === 'URGENT' ? 'danger' :
                              formData.priority === 'HIGH' ? 'warn' :
                                formData.priority === 'MEDIUM' ? 'info' : 'success'
                          }>
                            {formData.priority}
                          </Pill>
                          <Pill>{formData.documentType}</Pill>
                          <Pill>{formData.department}</Pill>
                          <Pill tone={formData.approvalLevel === 'MD' ? 'danger' : 'info'}>
                            {formData.approvalLevel} Approval
                          </Pill>
                          {formData.isConfidential && <Pill tone="danger">🔒 Confidential</Pill>}
                          {formData.requiresSignature && <Pill tone="info">✍️ Signature Required</Pill>}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-extrabold text-gray-700">Document Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex">
                            <span className="w-32 text-gray-500">Type:</span>
                            <span className="font-semibold">
                              {requestTypes.find(t => t.value === formData.requestType)?.label}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-32 text-gray-500">Description:</span>
                            <span className="font-semibold flex-1">{formData.description}</span>
                          </div>
                          {formData.meetingName && (
                            <div className="flex">
                              <span className="w-32 text-gray-500">Meeting:</span>
                              <span className="font-semibold">{formData.meetingName}</span>
                            </div>
                          )}
                          {formData.meetingDate && (
                            <div className="flex">
                              <span className="w-32 text-gray-500">Meeting Date:</span>
                              <span className="font-semibold">
                                {new Date(formData.meetingDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                              </span>
                            </div>
                          )}
                          {formData.recipientName && (
                            <div className="flex">
                              <span className="w-32 text-gray-500">Recipient:</span>
                              <span className="font-semibold">{formData.recipientName}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-extrabold text-gray-700">Additional Info</h4>
                        <div className="space-y-2 text-sm">
                          {formData.dueDate && (
                            <div className="flex">
                              <span className="w-32 text-gray-500">Due Date:</span>
                              <span className="font-semibold">
                                {new Date(formData.dueDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                              </span>
                            </div>
                          )}
                          <div className="flex">
                            <span className="w-32 text-gray-500">Department:</span>
                            <span className="font-semibold">{formData.department}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200/70">
                      <h4 className="font-extrabold text-gray-700 mb-3">Attachments ({files.length})</h4>
                      {files.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {files.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl">
                              <span className="text-xl">{getFileIcon(file.name)}</span>
                              <span className="text-sm truncate flex-1">{file.name}</span>
                              <span className="text-xs text-gray-500">
                                {(file.size / 1024).toFixed(0)} KB
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No attachments uploaded</p>
                      )}
                    </div>

                    {formData.additionalNotes && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
                        <p className="text-sm font-semibold text-blue-800 mb-1">Additional Instructions:</p>
                        <p className="text-sm text-blue-700">{formData.additionalNotes}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      style={{ backgroundColor: isSubmitting ? '#ccc' : '#10B981' }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>✓ Submit for Approval</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </Card>
        )}

        {/* Tips Card */}
        <Card className="p-6 bg-blue-50/30">
          <SectionTitle title="💡 Document Submission Tips" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Ensure all documents are properly formatted",
              "Include meeting dates and names for minutes",
              "Mark confidential documents appropriately",
              "Attach all relevant files before submitting",
              "Select correct approval level (HOD vs MD)",
              "Review document details carefully",
            ].map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <span style={{ color: "var(--primary-blue)" }}>•</span>
                <span className="text-sm text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}