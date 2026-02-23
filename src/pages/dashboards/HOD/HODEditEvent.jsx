// pages/dashboards/HOD/HODEditEvent.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout, { 
  DashboardIcon, 
  TaskIcon, 
  DocumentIcon, 
  ReportIcon, 
  CalendarIcon, 
  AnnouncementIcon, 
  ApprovalIcon, 
  AlertIcon, 
  BellIcon, 
  UserIcon,
  TenderIcon 
} from '../../../components/Layout';

const HODMenuItems = [
  { label: 'Dashboard', path: '/hod-dashboard', icon: <DashboardIcon /> },
  { label: 'Department Tasks', path: '/hod-dashboard/tasks', icon: <TaskIcon />, badge: '18' },
  { label: 'My Tasks', path: '/hod-dashboard/my-tasks', icon: <TaskIcon />, badge: '5' },
  { label: 'Documents', path: '/hod-dashboard/documents', icon: <DocumentIcon />, badge: '3' },
  { label: 'Daily Reports', path: '/hod-dashboard/reports', icon: <ReportIcon /> },
  { label: 'Meetings/Events', path: '/hod-dashboard/events', icon: <CalendarIcon />, badge: '2' },
  { label: 'Tenders', path: '/hod-dashboard/tenders', icon: <TenderIcon />, badge: '3' },
  { label: 'Tender Documents', path: '/hod-dashboard/tender-documents', icon: <TenderIcon /> },
  { label: 'Announcements', path: '/hod-dashboard/announcements', icon: <AnnouncementIcon /> },
  { label: 'Approvals', path: '/hod-dashboard/approvals', icon: <ApprovalIcon />, badge: '4' },
  { label: 'Escalations/Overdue', path: '/hod-dashboard/escalations', icon: <AlertIcon />, badge: '2' },
  { label: 'Notifications', path: '/hod-dashboard/notifications', icon: <BellIcon />, badge: '8' },
  { label: 'Profile', path: '/hod-dashboard/profile', icon: <UserIcon /> },
];

/* ---------- UI helpers ---------- */
const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-sm ${className}`}>{children}</div>
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

const FieldLabel = ({ children, required }) => (
  <label className="block text-sm font-extrabold text-gray-700 mb-2">
    {children} {required ? <span className="text-red-500">*</span> : null}
  </label>
);

const btnBase = "px-6 py-3 rounded-2xl font-semibold active:scale-[0.99] transition";
const btnOutline = `${btnBase} border bg-white hover:bg-gray-50`;
const btnSolid = `${btnBase} text-white shadow-sm`;

const inputBase =
  "w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100";

// Sample event data (in real app, this would come from an API)
const eventsData = [
  {
    id: 'EVT-001',
    title: 'Technical Department Quarterly Review',
    type: 'MEETING',
    description: 'Quarterly performance review and planning for next quarter',
    location: 'Conference Room A',
    meetingLink: '',
    startAt: '2024-12-20T10:00:00',
    endAt: '2024-12-20T12:00:00',
    createdBy: 'HOD - Technical',
    scope: 'DEPARTMENTS',
    attendees: 12,
    color: 'blue',
    agenda: [
      '10:00 - Welcome and Introduction',
      '10:15 - Q4 Performance Review',
      '10:45 - Team Presentations',
      '11:30 - Q1 Planning Discussion',
      '12:00 - Closing Remarks'
    ]
  },
  {
    id: 'EVT-002',
    title: 'Safety Training Workshop',
    type: 'TRAINING',
    description: 'Mandatory safety training for all field staff',
    location: 'Training Hall B',
    meetingLink: '',
    startAt: '2024-12-22T09:00:00',
    endAt: '2024-12-22T17:00:00',
    createdBy: 'HSE Manager',
    scope: 'DEPARTMENTS',
    attendees: 25,
    color: 'green',
    agenda: ['']
  },
];

const departments = [
  { id: 'TECH', name: 'Technical' },
  { id: 'HSE', name: 'HSE' },
  { id: 'WORKSHOP', name: 'Workshop' },
  { id: 'LOGISTICS', name: 'Logistics' },
  { id: 'HR', name: 'Human Resources' },
  { id: 'FIN', name: 'Finance' }
];

const users = [
  { id: 1, name: 'Alex Johnson', department: 'Technical' },
  { id: 2, name: 'Emma Wilson', department: 'Technical' },
  { id: 3, name: 'Michael Brown', department: 'Technical' },
  { id: 4, name: 'Sarah Taylor', department: 'HSE' },
  { id: 5, name: 'James Anderson', department: 'Workshop' },
  { id: 6, name: 'Lisa Chen', department: 'Logistics' }
];

const getColorOptions = () => {
  return [
    { value: 'blue', label: 'Blue', bg: 'bg-blue-100', text: 'text-blue-800' },
    { value: 'green', label: 'Green', bg: 'bg-green-100', text: 'text-green-800' },
    { value: 'purple', label: 'Purple', bg: 'bg-purple-100', text: 'text-purple-800' },
    { value: 'red', label: 'Red', bg: 'bg-red-100', text: 'text-red-800' }
  ];
};

export default function HODEditEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'MEETING',
    description: '',
    location: '',
    meetingLink: '',
    startDate: '',
    startTime: '09:00',
    endDate: '',
    endTime: '17:00',
    scope: 'DEPARTMENTS',
    selectedDepartments: [],
    selectedUsers: [],
    agenda: [''],
    color: 'blue'
  });

  useEffect(() => {
    // Load event data
    const event = eventsData.find(e => e.id === eventId);
    if (event) {
      const startDateTime = new Date(event.startAt);
      const endDateTime = new Date(event.endAt);
      
      setFormData({
        ...formData,
        title: event.title,
        type: event.type,
        description: event.description,
        location: event.location,
        meetingLink: event.meetingLink || '',
        startDate: startDateTime.toISOString().split('T')[0],
        startTime: startDateTime.toTimeString().slice(0, 5),
        endDate: endDateTime.toISOString().split('T')[0],
        endTime: endDateTime.toTimeString().slice(0, 5),
        scope: event.scope,
        color: event.color || 'blue',
        agenda: event.agenda || ['']
      });
    }
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScopeChange = (e) => {
    setFormData(prev => ({
      ...prev,
      scope: e.target.value,
      selectedDepartments: [],
      selectedUsers: []
    }));
  };

  const handleDepartmentToggle = (deptId) => {
    setFormData(prev => ({
      ...prev,
      selectedDepartments: prev.selectedDepartments.includes(deptId)
        ? prev.selectedDepartments.filter(id => id !== deptId)
        : [...prev.selectedDepartments, deptId]
    }));
  };

  const handleUserToggle = (userId) => {
    setFormData(prev => ({
      ...prev,
      selectedUsers: prev.selectedUsers.includes(userId)
        ? prev.selectedUsers.filter(id => id !== userId)
        : [...prev.selectedUsers, userId]
    }));
  };

  const handleAgendaChange = (index, value) => {
    const newAgenda = [...formData.agenda];
    newAgenda[index] = value;
    setFormData(prev => ({ ...prev, agenda: newAgenda }));
  };

  const addAgendaItem = () => {
    setFormData(prev => ({ ...prev, agenda: [...prev.agenda, ''] }));
  };

  const removeAgendaItem = (index) => {
    if (formData.agenda.length > 1) {
      setFormData(prev => ({
        ...prev,
        agenda: prev.agenda.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const startAt = `${formData.startDate}T${formData.startTime}:00`;
      const endAt = `${formData.endDate}T${formData.endTime}:00`;
      
      if (new Date(endAt) <= new Date(startAt)) {
        alert('End time must be after start time');
        setLoading(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Event updated successfully!');
      navigate(`/hod-dashboard/event/${eventId}`);
    } catch (error) {
      alert('Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Event deleted successfully!');
      navigate('/hod-dashboard/events');
    } catch (error) {
      alert('Failed to delete event');
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hero header */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div>
                <button
                  onClick={() => navigate(`/hod-dashboard/event/${eventId}`)}
                  className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                >
                  ← Back to Event Details
                </button>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill>Edit Event</Pill>
                  <Pill tone="info">{eventId}</Pill>
                  <Pill tone={formData.type === 'MEETING' ? 'info' : formData.type === 'TRAINING' ? 'success' : 'warn'}>
                    {formData.type}
                  </Pill>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
                  Edit Event
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Update event details, schedule, or attendees.
                </p>
              </div>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className={btnOutline}
                style={{ borderColor: "#DC2626", color: "#DC2626" }}
              >
                Delete Event
              </button>
            </div>
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <SectionTitle title="Basic Information" subtitle="Event title, type, and description" />
            
            <div className="mt-5 space-y-4">
              <div>
                <FieldLabel required>Event Title</FieldLabel>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className={inputBase}
                  placeholder="Enter event title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Event Type</FieldLabel>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className={inputBase}
                  >
                    <option value="MEETING">Meeting</option>
                    <option value="TRAINING">Training</option>
                    <option value="EVENT">Event</option>
                  </select>
                </div>

                <div>
                  <FieldLabel>Color Tag</FieldLabel>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className={inputBase}
                  >
                    {getColorOptions().map(color => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <FieldLabel>Description</FieldLabel>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className={inputBase}
                  placeholder="Enter event description"
                />
              </div>
            </div>
          </Card>

          {/* Date & Time */}
          <Card className="p-6">
            <SectionTitle title="Date & Time" subtitle="Start and end schedule" />
            
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <FieldLabel required>Start Date</FieldLabel>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className={inputBase}
                />
              </div>
              <div>
                <FieldLabel required>Start Time</FieldLabel>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                  className={inputBase}
                />
              </div>

              <div>
                <FieldLabel required>End Date</FieldLabel>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  min={formData.startDate}
                  className={inputBase}
                />
              </div>
              <div>
                <FieldLabel required>End Time</FieldLabel>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                  className={inputBase}
                />
              </div>
            </div>
          </Card>

          {/* Location */}
          <Card className="p-6">
            <SectionTitle title="Location" subtitle="Physical or virtual meeting details" />
            
            <div className="mt-5 space-y-4">
              <div>
                <FieldLabel>Physical Location</FieldLabel>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={inputBase}
                  placeholder="Enter physical location or 'Virtual'"
                />
              </div>

              <div>
                <FieldLabel>Meeting Link (Optional)</FieldLabel>
                <input
                  type="url"
                  name="meetingLink"
                  value={formData.meetingLink}
                  onChange={handleInputChange}
                  className={inputBase}
                  placeholder="https://meet.google.com/..."
                />
              </div>
            </div>
          </Card>

          {/* Agenda */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <SectionTitle title="Agenda" subtitle="Event schedule items" />
              <button
                type="button"
                onClick={addAgendaItem}
                className={btnSolid}
                style={{ backgroundColor: "var(--secondary-blue)" }}
              >
                + Add Item
              </button>
            </div>
            
            <div className="mt-5 space-y-3">
              {formData.agenda.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-500 w-6">{index + 1}.</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleAgendaChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder={`Agenda item ${index + 1}`}
                  />
                  {formData.agenda.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAgendaItem(index)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Visibility & Attendees */}
          <Card className="p-6">
            <SectionTitle title="Visibility & Attendees" subtitle="Who can see and attend this event" />
            
            <div className="mt-5 space-y-4">
              <div>
                <FieldLabel required>Who can see this event?</FieldLabel>
                <select
                  name="scope"
                  value={formData.scope}
                  onChange={handleScopeChange}
                  required
                  className={inputBase}
                >
                  <option value="DEPARTMENTS">My Department Only</option>
                  <option value="ALL_COMPANY">All Company</option>
                  <option value="HODS_ONLY">HODs Only</option>
                  <option value="USERS">Specific Users</option>
                </select>
              </div>

              {formData.scope === 'DEPARTMENTS' && (
                <div>
                  <FieldLabel required>Select Departments</FieldLabel>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {departments.map(dept => (
                      <label key={dept.id} className="flex items-center gap-2 p-3 rounded-2xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.selectedDepartments.includes(dept.id)}
                          onChange={() => handleDepartmentToggle(dept.id)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm font-medium">{dept.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {formData.scope === 'USERS' && (
                <div>
                  <FieldLabel required>Select Users</FieldLabel>
                  <div className="mt-2 max-h-60 overflow-y-auto rounded-2xl border border-gray-200 divide-y divide-gray-200/70">
                    {users.map(user => (
                      <label key={user.id} className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.selectedUsers.includes(user.id)}
                          onChange={() => handleUserToggle(user.id)}
                          className="rounded border-gray-300"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.department}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(`/hod-dashboard/event/${eventId}`)}
              className={btnOutline}
              style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={btnSolid}
              style={{ backgroundColor: "var(--primary-blue)" }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-gray-200/70">
            <div className="p-6">
              <h3 className="text-lg font-extrabold" style={{ color: "var(--accent-red)" }}>
                Delete Event
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Are you sure you want to delete this event? This action cannot be undone and will remove all associated data.
              </p>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded-2xl font-semibold border bg-white hover:bg-gray-50 transition"
                  style={{ borderColor: "rgba(44, 75, 155, 0.35)", color: "var(--primary-blue)" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-4 py-2 rounded-2xl font-semibold text-white transition active:scale-[0.99] disabled:opacity-50"
                  style={{ backgroundColor: "var(--accent-red)" }}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}