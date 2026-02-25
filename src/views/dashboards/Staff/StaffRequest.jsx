"use client";

// pages/dashboards/Staff/StaffRequest.jsx
import { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";
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
      : "bg-gray-50 text-gray-700 ring-gray-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles}`}>
      {children}
    </span>
  );
};

export default function StaffRequest() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    requestType: '',
    title: '',
    description: '',
    priority: 'MEDIUM',
    department: 'Technical',
    dueDate: '',
    amount: '',
    projectName: '',
    taskReference: '',
    documents: [],
    additionalNotes: '',
    approvalLevel: 'HOD', // HOD or MD
  });
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const requestTypes = [
    { value: 'TASK_COMPLETION', label: 'Task Completion Approval', icon: '✅' },
    { value: 'DOCUMENT', label: 'Document Approval', icon: '📄' },
    { value: 'REPORT', label: 'Report Approval', icon: '📊' },
    { value: 'LEAVE', label: 'Leave Request', icon: '🏖️' },
    { value: 'PURCHASE', label: 'Purchase Request', icon: '💰' },
    { value: 'TRAINING', label: 'Training Request', icon: '📚' },
    { value: 'OVERTIME', label: 'Overtime Request', icon: '⏰' },
    { value: 'OTHER', label: 'Other Request', icon: '📋' },
  ];

  const departments = ['Technical', 'Workshop', 'HSE', 'HR', 'Finance', 'Logistics', 'Admin'];
  const priorities = [
    { value: 'LOW', label: 'Low', tone: 'success' },
    { value: 'MEDIUM', label: 'Medium', tone: 'info' },
    { value: 'HIGH', label: 'High', tone: 'warn' },
    { value: 'URGENT', label: 'Urgent', tone: 'danger' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

    // Redirect to My Requests page after success
    setTimeout(() => {
      router.push('/staff-dashboard/requests');
    }, 3000);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-500';
      case 'HIGH': return 'bg-orange-500';
      case 'MEDIUM': return 'bg-blue-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
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
      case 'jpg':
      case 'jpeg':
      case 'png': return '🖼️';
      case 'zip':
      case 'rar': return '🗜️';
      default: return '📎';
    }
  };

  const steps = [
    { number: 1, label: 'Request Type' },
    { number: 2, label: 'Request Details' },
    { number: 3, label: 'Documents' },
    { number: 4, label: 'Review & Submit' },
  ];

  return (
    <Layout menuItems={StaffMenuItems} userRole="Staff">
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
                  <Pill>New Request</Pill>
                  <Pill tone="info">Staff Portal</Pill>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Create Approval Request
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Submit a request for approval from your HOD or Managing Director
                </p>
              </div>
              <Link href="/staff-dashboard/requests">
                <button
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                  style={{ borderColor: "var(--secondary-blue)", color: "var(--primary-blue)" }}
                >
                  ← Back to My Requests
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
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white ${
                      currentStep > step.number
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
                    className={`ml-3 text-sm font-semibold ${
                      currentStep === step.number
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
            <h2 className="text-2xl font-extrabold text-green-700 mb-2">Request Submitted Successfully!</h2>
            <p className="text-green-600 mb-4">
              Your request has been sent to {formData.approvalLevel === 'HOD' ? 'your HOD' : 'the Managing Director'} for approval.
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-700"></div>
              <span className="text-sm text-green-700">Redirecting to My Requests...</span>
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
                  <SectionTitle title="Select Request Type" subtitle="Choose the type of approval you need" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {requestTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                          formData.requestType === type.value
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
                            <p className="text-xs text-gray-500 mt-1">
                              {type.value === 'TASK_COMPLETION' && 'Request approval for completed task'}
                              {type.value === 'DOCUMENT' && 'Submit document for review and approval'}
                              {type.value === 'REPORT' && 'Request report approval'}
                              {type.value === 'LEAVE' && 'Apply for leave approval'}
                              {type.value === 'PURCHASE' && 'Request purchase approval'}
                              {type.value === 'TRAINING' && 'Request training program approval'}
                              {type.value === 'OVERTIME' && 'Request overtime approval'}
                              {type.value === 'OTHER' && 'Other type of request'}
                            </p>
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

              {/* Step 2: Request Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <SectionTitle title="Request Details" subtitle="Provide detailed information about your request" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Request Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter a clear title for your request"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Provide detailed description of your request"
                        required
                      />
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

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Task Reference (Optional)</label>
                      <input
                        type="text"
                        name="taskReference"
                        value={formData.taskReference}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="e.g., TASK-2024-00123"
                      />
                    </div>

                    {formData.requestType === 'PURCHASE' && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (₦) *</label>
                          <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                            placeholder="Enter amount"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name (Optional)</label>
                          <input
                            type="text"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                            placeholder="Enter project name"
                          />
                        </div>
                      </>
                    )}

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
                      disabled={!formData.title || !formData.description || !formData.approvalLevel}
                      className="px-6 py-3 rounded-2xl font-semibold text-white active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: (!formData.title || !formData.description || !formData.approvalLevel) ? '#ccc' : 'var(--secondary-blue)' }}
                    >
                      Next: Documents →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <SectionTitle title="Supporting Documents" subtitle="Upload relevant documents (optional)" />

                  <div className="rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400 transition">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.zip"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-flex flex-col items-center"
                    >
                      <span className="text-4xl mb-3">📎</span>
                      <span className="text-lg font-extrabold text-gray-700 mb-1">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-sm text-gray-500">
                        PDF, DOC, XLS, PPT, Images, ZIP (Max 10MB each)
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes (Optional)</label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Add any additional notes or comments for the approver..."
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
                  <SectionTitle title="Review Your Request" subtitle="Please review all details before submitting" />

                  <div className="rounded-2xl border border-gray-200/70 p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                        style={{ backgroundColor: 'rgba(109, 198, 223, 0.18)' }}
                      >
                        {requestTypes.find(t => t.value === formData.requestType)?.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-gray-900">{formData.title || 'Untitled Request'}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <Pill tone={
                            formData.priority === 'URGENT' ? 'danger' :
                            formData.priority === 'HIGH' ? 'warn' :
                            formData.priority === 'MEDIUM' ? 'info' : 'success'
                          }>
                            {formData.priority}
                          </Pill>
                          <Pill>{formData.department}</Pill>
                          <Pill tone={formData.approvalLevel === 'MD' ? 'danger' : 'info'}>
                            {formData.approvalLevel} Approval
                          </Pill>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-extrabold text-gray-700">Request Details</h4>
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
                          {formData.dueDate && (
                            <div className="flex">
                              <span className="w-32 text-gray-500">Due Date:</span>
                              <span className="font-semibold">
                                {new Date(formData.dueDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {formData.taskReference && (
                            <div className="flex">
                              <span className="w-32 text-gray-500">Task Ref:</span>
                              <code className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">
                                {formData.taskReference}
                              </code>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-extrabold text-gray-700">Financial Details</h4>
                        {formData.amount ? (
                          <div className="space-y-2 text-sm">
                            <div className="flex">
                              <span className="w-32 text-gray-500">Amount:</span>
                              <span className="font-extrabold text-green-600">
                                ₦{Number(formData.amount).toLocaleString()}
                              </span>
                            </div>
                            {formData.projectName && (
                              <div className="flex">
                                <span className="w-32 text-gray-500">Project:</span>
                                <span className="font-semibold">{formData.projectName}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No financial details provided</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200/70">
                      <h4 className="font-extrabold text-gray-700 mb-3">Documents ({files.length})</h4>
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
                        <p className="text-sm text-gray-500">No documents attached</p>
                      )}
                    </div>

                    {formData.additionalNotes && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
                        <p className="text-sm font-semibold text-blue-800 mb-1">Additional Notes:</p>
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
                          <span>✓ Submit Request</span>
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
          <SectionTitle title="💡 Tips for a Successful Request" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Provide clear and detailed descriptions",
              "Attach all relevant supporting documents",
              "Set realistic due dates",
              "Select the correct approval level (HOD vs MD)",
              "Include task references when applicable",
              "Review all details before submitting",
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