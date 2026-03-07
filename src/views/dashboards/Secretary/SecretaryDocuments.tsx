"use client";

// pages/dashboards/Secretary/SecretaryDocuments.jsx
import { useState, useEffect } from 'react';
import Link from "next/link";
import Layout from "@/components/Layout";
import { SecretaryMenuItems } from "@/utils/menus";
import { toast } from "@/lib/toast";
import { getAuthToken } from "@/lib/api";
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




// Secretary details
const SECRETARY_NAME = 'Ms. Chen';
const SECRETARY_DEPARTMENT = 'Admin';

// Storage keys for draft
const STORAGE_KEYS = {
  DOCUMENT_UPLOAD: 'secretaryDocumentUpload_draft',
  IS_MODAL_OPEN: 'secretaryDocumentUpload_modalOpen'
};

export default function SecretaryDocuments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [scopeFilter, setScopeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Upload form state
  const [uploadFormData, setUploadFormData] = useState({
    title: '',
    description: '',
    category: '',
    scope: 'Public',
    department: SECRETARY_DEPARTMENT,
    uploadedBy: SECRETARY_NAME,
    file: null,
    expiryDate: '',
    tags: []
  });

  const [tagInput, setTagInput] = useState('');
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Company Policies Handbook',
      category: 'HR',
      scope: 'Public',
      uploadedBy: 'HR Department',
      uploadDate: '2024-12-01',
      fileSize: '4.8 MB',
      fileType: 'PDF',
      downloads: 156,
      description: 'Updated company policies and procedures handbook',
      status: 'active',
      tags: ['policies', 'handbook', 'hr']
    },
    {
      id: 2,
      title: 'Safety Procedures Manual',
      category: 'HSE',
      scope: 'Public',
      uploadedBy: 'HSE Department',
      uploadDate: '2024-11-28',
      fileSize: '6.2 MB',
      fileType: 'PDF',
      downloads: 234,
      description: 'Comprehensive safety procedures and guidelines',
      status: 'active',
      tags: ['safety', 'hse', 'manual']
    },
    {
      id: 3,
      title: 'Quarterly Financial Report Q4',
      category: 'Accounts',
      scope: 'All HODs',
      uploadedBy: 'Accounts Department',
      uploadDate: '2024-11-25',
      fileSize: '8.7 MB',
      fileType: 'XLSX',
      downloads: 89,
      description: 'Quarterly financial performance report',
      status: 'active',
      tags: ['financial', 'quarterly', 'report']
    },
    {
      id: 4,
      title: 'Technical Specifications - Project Alpha',
      category: 'Technical',
      scope: 'Specific Departments',
      uploadedBy: 'Technical Department',
      uploadDate: '2024-11-20',
      fileSize: '12.4 MB',
      fileType: 'PDF',
      downloads: 67,
      description: 'Technical specifications for Project Alpha',
      status: 'active',
      tags: ['technical', 'specifications', 'project']
    },
    {
      id: 5,
      title: 'Training Materials - New Employees',
      category: 'HR',
      scope: 'Specific Departments',
      uploadedBy: 'HR Department',
      uploadDate: '2024-11-15',
      fileSize: '15.2 MB',
      fileType: 'ZIP',
      downloads: 123,
      description: 'Complete training materials for new employees',
      status: 'active',
      tags: ['training', 'onboarding', 'materials']
    },
    {
      id: 6,
      title: 'Equipment Maintenance Schedule',
      category: 'Workshop',
      scope: 'All HODs',
      uploadedBy: 'Workshop Department',
      uploadDate: '2024-11-10',
      fileSize: '3.6 MB',
      fileType: 'XLSX',
      downloads: 78,
      description: 'Annual equipment maintenance schedule',
      status: 'active',
      tags: ['maintenance', 'equipment', 'schedule']
    },
    {
      id: 7,
      title: 'Confidential Board Meeting Minutes',
      category: 'Management',
      scope: 'Private',
      uploadedBy: 'MD Office',
      uploadDate: '2024-11-05',
      fileSize: '2.1 MB',
      fileType: 'DOCX',
      downloads: 12,
      description: 'Confidential board meeting minutes',
      status: 'active',
      tags: ['confidential', 'board', 'minutes']
    },
    {
      id: 8,
      title: 'Vendor Contracts Database',
      category: 'Procurement',
      scope: 'Specific HODs',
      uploadedBy: 'Procurement Department',
      uploadDate: '2024-11-01',
      fileSize: '18.9 MB',
      fileType: 'MDB',
      downloads: 45,
      description: 'Complete database of vendor contracts',
      status: 'active',
      tags: ['vendors', 'contracts', 'procurement']
    },
    {
      id: 9,
      title: 'Quality Control Procedures',
      category: 'QHSE',
      scope: 'Public',
      uploadedBy: 'QHSE Department',
      uploadDate: '2024-10-28',
      fileSize: '5.4 MB',
      fileType: 'PDF',
      downloads: 167,
      description: 'Quality control procedures and checklists',
      status: 'active',
      tags: ['quality', 'control', 'procedures']
    },
    {
      id: 10,
      title: 'Annual Business Plan 2025',
      category: 'Management',
      scope: 'All HODs',
      uploadedBy: 'Managing Director',
      uploadDate: '2024-10-25',
      fileSize: '9.8 MB',
      fileType: 'PDF',
      downloads: 56,
      description: 'Annual business plan and strategy for 2025',
      status: 'active',
      tags: ['business', 'plan', 'strategy']
    },
  ]);

  // Load saved form data from sessionStorage on mount
  useEffect(() => {
    const savedFormData = sessionStorage.getItem(STORAGE_KEYS.DOCUMENT_UPLOAD);
    const savedModalState = sessionStorage.getItem(STORAGE_KEYS.IS_MODAL_OPEN);

    if (savedFormData) {
      setUploadFormData(JSON.parse(savedFormData));
    }
    if (savedModalState) {
      setIsModalOpen(JSON.parse(savedModalState));
    }
  }, []);

  // Save form data to sessionStorage whenever it changes and modal is open
  useEffect(() => {
    if (isModalOpen) {
      sessionStorage.setItem(STORAGE_KEYS.DOCUMENT_UPLOAD, JSON.stringify(uploadFormData));
      sessionStorage.setItem(STORAGE_KEYS.IS_MODAL_OPEN, JSON.stringify(isModalOpen));
    }
  }, [uploadFormData, isModalOpen]);

  const categories = [...new Set(documents.map(d => d.category))];
  const scopes = [...new Set(documents.map(d => d.scope))];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    const matchesScope = scopeFilter === 'all' || doc.scope === scopeFilter;

    return matchesSearch && matchesCategory && matchesScope;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      case 'oldest':
        return new Date(a.uploadDate) - new Date(b.uploadDate);
      case 'downloads':
        return b.downloads - a.downloads;
      case 'size':
        return parseFloat(b.fileSize) - parseFloat(a.fileSize);
      default:
        return 0;
    }
  });

  const handleDownload = (doc) => {
    if (!doc.id) {
      toast.info("No file available for download");
      return;
    }
    const token = getAuthToken();
    const url = `/api/documents/${doc.id}/download${token ? `?token=${token}` : ""}`;
    window.open(url, "_blank");
  };

  const getScopeTone = (scope) => {
    switch (scope) {
      case 'Public': return 'success';
      case 'All HODs': return 'info';
      case 'Specific Departments': return 'purple';
      case 'Specific HODs': return 'warn';
      case 'Private': return 'danger';
      default: return 'default';
    }
  };

  const getFileTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf': return '📕';
      case 'xlsx':
      case 'xls': return '📊';
      case 'docx':
      case 'doc': return '📄';
      case 'zip': return '📦';
      case 'mdb':
      case 'sqlite': return '🗄️';
      case 'pptx':
      case 'ppt': return '📽️';
      default: return '📎';
    }
  };

  // Document Upload Handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        toast.error('File size exceeds 100MB limit. Please choose a smaller file.');
        return;
      }

      const fileType = file.name.split('.').pop().toUpperCase();
      setUploadFormData({
        ...uploadFormData,
        file,
        fileType: fileType,
        fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB'
      });
    }
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !uploadFormData.tags.includes(tagInput.trim())) {
      setUploadFormData({
        ...uploadFormData,
        tags: [...uploadFormData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setUploadFormData({
      ...uploadFormData,
      tags: uploadFormData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadFormData({
      ...uploadFormData,
      [name]: value
    });
  };

  // Reset form and clear storage
  const resetForm = () => {
    setUploadFormData({
      title: '',
      description: '',
      category: '',
      scope: 'Public',
      department: SECRETARY_DEPARTMENT,
      uploadedBy: SECRETARY_NAME,
      file: null,
      expiryDate: '',
      tags: []
    });
    setTagInput('');

    // Clear from sessionStorage
    sessionStorage.removeItem(STORAGE_KEYS.DOCUMENT_UPLOAD);
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

  // Handle submit from modal
  const handleSubmitDocument = (e) => {
    e.preventDefault();

    if (!uploadFormData.title.trim()) {
      toast.warning('Please enter document title');
      return;
    }
    if (!uploadFormData.category) {
      toast.warning('Please select a category');
      return;
    }
    if (!uploadFormData.file) {
      toast.warning('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          // Create new document
          const newDocument = {
            id: documents.length + 1,
            title: uploadFormData.title,
            description: uploadFormData.description || 'No description provided',
            category: uploadFormData.category,
            scope: uploadFormData.scope,
            uploadedBy: uploadFormData.uploadedBy,
            uploadDate: new Date().toISOString().split('T')[0],
            fileSize: uploadFormData.fileSize,
            fileType: uploadFormData.fileType,
            downloads: 0,
            status: 'active',
            tags: uploadFormData.tags,
            expiryDate: uploadFormData.expiryDate || null
          };

          setDocuments([newDocument, ...documents]);
          setIsUploading(false);
          toast.success('Document uploaded successfully!');
          setIsModalOpen(false);
          sessionStorage.setItem(STORAGE_KEYS.IS_MODAL_OPEN, JSON.stringify(false));
          resetForm();
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const categoryOptions = [
    'HR', 'HSE', 'Accounts', 'Technical', 'Workshop',
    'Management', 'Procurement', 'QHSE', 'Legal', 'IT', 'Admin'
  ];

  const scopeOptions = ['Public', 'All HODs', 'Specific Departments', 'Specific HODs', 'Private'];

  // Stats for the header
  const stats = [
    { title: "Total Documents", value: documents.length.toString(), color: "var(--primary-blue)", icon: "📄" },
    { title: "Public Documents", value: documents.filter(d => d.scope === 'Public').length.toString(), color: "var(--secondary-blue)", icon: "🌐" },
    { title: "Total Downloads", value: documents.reduce((sum, doc) => sum + doc.downloads, 0).toString(), color: "#10B981", icon: "📥" },
    { title: "Categories", value: categories.length.toString(), color: "#8B5CF6", icon: "📁" },
  ];

  return (
    <Layout menuItems={SecretaryMenuItems} userRole="Secretary">
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
                  <Pill tone="info">Document Library</Pill>
                  <Pill tone="success">Admin Access</Pill>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Document Library
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Access and manage company documents and files
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const savedFormData = sessionStorage.getItem(STORAGE_KEYS.DOCUMENT_UPLOAD);
                    if (savedFormData) {
                      setIsModalOpen(true);
                    } else {
                      resetForm();
                      setIsModalOpen(true);
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold active:scale-[0.99] transition flex items-center justify-center gap-2"
                  style={{ backgroundColor: "var(--accent-red)", color: "white" }}
                >
                  <span className="text-lg">+</span>
                  Upload Document
                </button>
                <Link href="/secretary-dashboard">
                  <button
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold border bg-white hover:bg-gray-50 active:scale-[0.99] transition"
                    style={{ borderColor: "rgba(109, 198, 223, 0.7)", color: "var(--primary-blue)" }}
                  >
                    Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-5 hover:-translate-y-0.5 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-extrabold tracking-tight mt-1">{stat.value}</p>
                </div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center "
                  style={{ backgroundColor: `${stat.color}18` }}
                  aria-hidden="true"
                >
                  <span className="text-lg" style={{ color: stat.color }}>
                    {stat.icon}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Draft Alert */}
        {sessionStorage.getItem(STORAGE_KEYS.DOCUMENT_UPLOAD) && (
          <Card className="p-4 border-yellow-200 bg-yellow-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📝</span>
                <div>
                  <h3 className="font-semibold text-yellow-800">You have an unsaved document draft</h3>
                  <p className="text-yellow-600 text-sm">
                    Your previously started document upload is available. Click "Upload Document" to continue.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  sessionStorage.removeItem(STORAGE_KEYS.DOCUMENT_UPLOAD);
                  toast.success('Draft cleared');
                }}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-yellow-500 text-yellow-700 hover:bg-yellow-100 transition"
              >
                Clear Draft
              </button>
            </div>
          </Card>
        )}

        {/* Filters Section */}
        <Card className="p-6">
          <SectionTitle
            title="Filter Documents"
            subtitle="Search and filter through the document library"
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">SEARCH DOCUMENTS</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, description, tags..."
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-500 transition"
                style={{ borderColor: "rgba(109, 198, 223, 0.3)" }}
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">CATEGORY</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-500 transition"
                style={{ borderColor: "rgba(109, 198, 223, 0.3)" }}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Scope Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">ACCESS SCOPE</label>
              <select
                value={scopeFilter}
                onChange={(e) => setScopeFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-500 transition"
                style={{ borderColor: "rgba(109, 198, 223, 0.3)" }}
              >
                <option value="all">All Scopes</option>
                {scopes.map(scope => (
                  <option key={scope} value={scope}>{scope}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">SORT BY</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-500 transition"
                style={{ borderColor: "rgba(109, 198, 223, 0.3)" }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="downloads">Most Downloads</option>
                <option value="size">File Size</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {sortedDocuments.length > 0 ? (
            sortedDocuments.map(doc => (
              <Card key={doc.id} className="p-6 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 "
                    style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                  >
                    {getFileTypeIcon(doc.fileType)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-extrabold truncate" style={{ color: "var(--primary-blue)" }}>
                        {doc.title}
                      </h3>
                      <Pill tone={getScopeTone(doc.scope)}>{doc.scope}</Pill>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Pill>{doc.category}</Pill>
                      {doc.tags?.slice(0, 2).map(tag => (
                        <Pill key={tag} tone="default">#{tag}</Pill>
                      ))}
                      {doc.tags?.length > 2 && (
                        <span className="text-xs text-gray-500">+{doc.tags.length - 2}</span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{doc.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {doc.uploadedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {doc.uploadDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">📥 {doc.downloads}</span>
                    <span className="text-xs text-gray-400">{doc.fileSize}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href={`/secretary-dashboard/document/${doc.id}`} className="flex-1">
                    <button
                      className="w-full px-4 py-2.5 rounded-xl font-semibold border hover:bg-gray-50 transition active:scale-[0.99]"
                      style={{ borderColor: "var(--primary-blue)", color: "var(--primary-blue)" }}
                    >
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-white transition active:scale-[0.99] flex items-center justify-center gap-2"
                    style={{ backgroundColor: "var(--secondary-blue)" }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download
                  </button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="col-span-2 p-12 text-center">
              <div className="text-5xl mb-4" style={{ color: "var(--secondary-blue)" }}>
                📁
              </div>
              <h3 className="text-xl font-extrabold mb-2" style={{ color: "var(--primary-blue)" }}>
                No Documents Found
              </h3>
              <p className="text-gray-600">
                No documents match your current filters. Try adjusting your search criteria.
              </p>
            </Card>
          )}
        </div>

        {/* Document Categories */}
        <Card className="p-6">
          <SectionTitle
            title="Document Categories"
            subtitle="Browse documents by department category"
          />

          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map(category => {
              const catDocs = documents.filter(d => d.category === category);
              const totalSize = catDocs.reduce((sum, doc) => sum + parseFloat(doc.fileSize), 0).toFixed(1);
              const totalDownloads = catDocs.reduce((sum, doc) => sum + doc.downloads, 0);

              return (
                <div
                  key={category}
                  className="p-5 rounded-2xl border border-gray-200/70 hover:bg-gray-50 cursor-pointer transition"
                  onClick={() => setCategoryFilter(category)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center "
                      style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}
                    >
                      <span className="text-lg">📁</span>
                    </div>
                    <div>
                      <h3 className="font-extrabold" style={{ color: "var(--primary-blue)" }}>{category}</h3>
                      <p className="text-xs text-gray-500">{catDocs.length} documents</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Downloads:</span>
                      <span className="font-semibold">{totalDownloads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Size:</span>
                      <span className="font-semibold">{totalSize} MB</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Document Statistics */}
        <Card className="p-6">
          <SectionTitle
            title="Document Statistics"
            subtitle="Usage and access metrics"
          />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Downloads by Category */}
            <div className="p-5 rounded-2xl border border-gray-200/70">
              <h3 className="font-extrabold mb-4" style={{ color: "var(--primary-blue)" }}>📊 Downloads by Category</h3>
              <div className="space-y-3">
                {categories.slice(0, 5).map(category => {
                  const catDownloads = documents
                    .filter(d => d.category === category)
                    .reduce((sum, doc) => sum + doc.downloads, 0);
                  const totalDownloads = documents.reduce((sum, doc) => sum + doc.downloads, 0);
                  const percentage = totalDownloads ? (catDownloads / totalDownloads) * 100 : 0;

                  return (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{category}</span>
                        <span className="font-semibold">{catDownloads} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: "var(--primary-blue)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Upload Activity */}
            <div className="p-5 rounded-2xl border border-gray-200/70">
              <h3 className="font-extrabold mb-4" style={{ color: "var(--primary-blue)" }}>📈 Upload Activity</h3>
              <div className="space-y-3">
                {['December 2024', 'November 2024', 'October 2024'].map(month => {
                  const monthUploads = documents.filter(d => {
                    const date = new Date(d.uploadDate);
                    return date.getMonth() === ['Oct', 'Nov', 'Dec'].indexOf(month.split(' ')[0]) &&
                      date.getFullYear() === 2024;
                  }).length;
                  const maxUploads = 8;
                  const percentage = (monthUploads / maxUploads) * 100;

                  return (
                    <div key={month} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{month}</span>
                        <span className="font-semibold">{monthUploads} uploads</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: "var(--secondary-blue)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Access Scope Distribution */}
            <div className="p-5 rounded-2xl border border-gray-200/70">
              <h3 className="font-extrabold mb-4" style={{ color: "var(--primary-blue)" }}>🔒 Access Distribution</h3>
              <div className="space-y-3">
                {scopes.map(scope => {
                  const scopeDocs = documents.filter(d => d.scope === scope).length;
                  const percentage = (scopeDocs / documents.length) * 100;

                  return (
                    <div key={scope} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Pill tone={getScopeTone(scope)}>{scope}</Pill>
                      </div>
                      <div className="text-sm font-semibold">
                        {scopeDocs} ({percentage.toFixed(1)}%)
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Upload Document Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleModalClose}></div>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden border border-gray-200 transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-extrabold" style={{ color: 'var(--primary-blue)' }}>
                      Upload New Document
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Add a new document to the company document library
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Pill>{SECRETARY_DEPARTMENT} Department</Pill>
                      <span className="text-sm text-gray-500">• {SECRETARY_NAME}</span>
                    </div>
                    {sessionStorage.getItem(STORAGE_KEYS.DOCUMENT_UPLOAD) && (
                      <div className="mt-3">
                        <Pill tone="warn">⚡ Draft saved - continue where you left off</Pill>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleModalClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmitDocument} className="space-y-6">
                  {/* Basic Information */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-extrabold mb-4" style={{ color: 'var(--primary-blue)' }}>
                      Document Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 mb-2">
                          DOCUMENT TITLE <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={uploadFormData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-500 transition"
                          style={{ borderColor: "rgba(109, 198, 223, 0.3)" }}
                          placeholder="e.g., Annual Report 2024"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">
                          CATEGORY <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="category"
                          value={uploadFormData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-500 transition"
                          style={{ borderColor: "rgba(109, 198, 223, 0.3)" }}
                        >
                          <option value="">Select category</option>
                          {categoryOptions.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">
                          ACCESS SCOPE <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="scope"
                          value={uploadFormData.scope}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-500 transition"
                          style={{ borderColor: "rgba(109, 198, 223, 0.3)" }}
                        >
                          {scopeOptions.map(scope => (
                            <option key={scope} value={scope}>{scope}</option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 mb-2">
                          DESCRIPTION
                        </label>
                        <textarea
                          name="description"
                          value={uploadFormData.description}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-500 transition"
                          style={{ borderColor: "rgba(109, 198, 223, 0.3)" }}
                          placeholder="Brief description of the document..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-extrabold mb-4" style={{ color: 'var(--primary-blue)' }}>
                      Document File
                    </h4>
                    <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-blue-500 transition-colors"
                      style={{ borderColor: "rgba(109, 198, 223, 0.3)" }}>
                      <input
                        type="file"
                        id="document-file-upload"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="document-file-upload" className="cursor-pointer">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center "
                          style={{ backgroundColor: "rgba(109, 198, 223, 0.18)" }}>
                          <span className="text-3xl">📎</span>
                        </div>
                        {uploadFormData.file ? (
                          <div>
                            <p className="font-semibold text-gray-900">{uploadFormData.file.name}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {uploadFormData.fileSize} • {uploadFormData.fileType}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-700 font-semibold mb-2">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-gray-500">
                              PDF, DOC, XLSX, PPT, ZIP up to 100MB
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Tags & Metadata */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-extrabold mb-4" style={{ color: 'var(--primary-blue)' }}>
                      Tags & Metadata
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">
                          TAGS
                        </label>
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                            placeholder="Add tags..."
                            className="flex-1 px-4 py-2 rounded-xl border-2 focus:outline-none focus:border-blue-500 transition"
                            style={{ borderColor: "rgba(109, 198, 223, 0.3)" }}
                          />
                          <button
                            type="button"
                            onClick={handleTagAdd}
                            className="px-4 py-2 rounded-xl font-semibold text-white transition active:scale-[0.99]"
                            style={{ backgroundColor: 'var(--secondary-blue)' }}
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {uploadFormData.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                              #{tag}
                              <button
                                type="button"
                                onClick={() => handleTagRemove(tag)}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">
                          EXPIRY DATE (OPTIONAL)
                        </label>
                        <input
                          type="date"
                          name="expiryDate"
                          value={uploadFormData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-blue-500 transition"
                          style={{ borderColor: "rgba(109, 198, 223, 0.3)" }}
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Documents will be automatically archived after expiry date
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold">Uploading document...</span>
                          <span className="font-semibold">{uploadProgress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${uploadProgress}%`,
                              backgroundColor: "var(--primary-blue)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form Actions */}
                  <div className="flex justify-end gap-4 pt-6 border-t">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 rounded-xl font-semibold border hover:bg-gray-50 transition active:scale-[0.99]"
                      style={{ borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUploading}
                      className={`px-6 py-3 rounded-xl font-semibold text-white transition active:scale-[0.99] ${isUploading ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      style={{ backgroundColor: 'var(--accent-red)' }}
                    >
                      {isUploading ? 'Uploading...' : 'Upload Document'}
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