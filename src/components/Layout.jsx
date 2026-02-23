// components/Layout.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Layout({ children, menuItems, userRole }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => navigate("/login");

 
  useEffect(() => {
    setSidebarOpen(false);
    
  }, [location.pathname]);


  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (path) => location.pathname === path;

  const quickStats = useMemo(
    () => [
      { label: "Active Tasks", value: 24 },
      { label: "Overdue", value: 3 },
      { label: "Pending Approvals", value: 7 },
    ],
    []
  );

  return (
    <div
      className="min-h-screen bg-gray-50 text-gray-900"
      style={{
        "--primary-blue": "#2C4B9B",
        "--secondary-blue": "#6DC6DF",
        "--accent-red": "#ED3237",
      }}
    >
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="h-16 bg-white/80 backdrop-blur border-b border-gray-200">
          <div className="h-full px-4 md:px-6 flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen((s) => !s)}
                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 active:scale-[0.98] transition"
                aria-label="Toggle sidebar"
                aria-expanded={sidebarOpen}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: "var(--primary-blue)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      sidebarOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>

              {/* Brand */}
              <Link to="/" className="flex items-center gap-3 group">
                <div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-sm ring-1 ring-black/5"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)",
                  }}
                >
                  <span className="text-white font-extrabold text-sm">C</span>
                </div>

                <div className="leading-tight">
                  <div
                    className="font-extrabold tracking-tight text-lg md:text-xl"
                    style={{ color: "var(--primary-blue)" }}
                  >
                    CALAYA TASKLY
                  </div>
                  <div className="text-xs text-gray-500 -mt-0.5 hidden sm:block">
                    Oil &amp; Gas Task Management System
                  </div>
                </div>

                <span
                  className="ml-2 hidden sm:inline-flex items-center px-2.5 py-1 text-[11px] font-semibold rounded-full shadow-sm ring-1 ring-black/5"
                  style={{ backgroundColor: "var(--accent-red)", color: "white" }}
                >
                  {userRole}
                </span>
              </Link>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="h-10 px-4 rounded-2xl text-sm font-semibold text-white shadow-sm active:scale-[0.99] transition"
                style={{ backgroundColor: "var(--accent-red)" }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed z-50 md:z-30 top-16 left-0 bottom-0 w-72 md:w-64",
          "bg-white border-r border-gray-200",
          "transition-transform duration-300 ease-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <div className="h-full flex flex-col">
          {/* Nav */}
          <div className="px-3 py-4 overflow-y-auto">
            <div className="px-2 mb-3">
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Menu
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item, index) => {
                const active = isActive(item.path);

                return (
                  <Link
                    key={index}
                    to={item.path}
                    className={[
                      "group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl",
                      "text-sm font-medium transition",
                      active
                        ? "text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-100",
                    ].join(" ")}
                    style={{
                      backgroundColor: active ? "var(--primary-blue)" : "transparent",
                    }}
                  >
                    {/* Active indicator bar */}
                    <span
                      className={[
                        "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full",
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-60",
                      ].join(" ")}
                      style={{ backgroundColor: "var(--secondary-blue)" }}
                    />

                    <span
                      className={[
                        "inline-flex items-center justify-center w-9 h-9 rounded-2xl",
                        active ? "bg-white/15" : "bg-gray-100 group-hover:bg-gray-200",
                      ].join(" ")}
                    >
                      {typeof item.icon === "string" ? (
                        <span className="text-lg">{item.icon}</span>
                      ) : (
                        item.icon
                      )}
                    </span>

                    <span className="truncate">{item.label}</span>

                    {item.badge && (
                      <span
                        className={[
                          "ml-auto text-xs font-semibold px-2 py-1 rounded-full",
                          active ? "bg-white/15 text-white" : "bg-red-500 text-white",
                        ].join(" ")}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Quick Stats */}
            <div className="mt-6 px-1">
              <div
                className="rounded-2xl p-4 border border-gray-200 shadow-sm"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(109,198,223,0.14) 0%, rgba(44,75,155,0.06) 100%)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>
                    Quick Stats
                  </div>
                  <span className="text-[11px] text-gray-500">Today</span>
                </div>

                <div className="mt-3 space-y-2.5">
                  {quickStats.map((s) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="text-xs text-gray-700">{s.label}</span>
                      <span
                        className="text-xs font-extrabold"
                        style={{ color: "var(--accent-red)" }}
                      >
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="h-2 rounded-full bg-white/60 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "62%",
                        background:
                          "linear-gradient(90deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)",
                      }}
                    />
                  </div>
                  <div className="mt-2 text-[11px] text-gray-600">
                    Progress overview
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer (sidebar) */}
          <div className="mt-auto p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shadow-sm"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)",
                }}
              >
                C
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">Calaya Taskly</div>
                <div className="text-xs text-gray-500 truncate">{userRole}</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="pt-16 md:pl-64">
        <div className="p-4 md:p-6">
          <div className="max-w-[1400px] mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}


/* =========================
   ICONS (DEDUPED)
   - One factory to generate icons
   - Aliases for duplicates (no repeated SVG code)
   ========================= */

const createIcon = (children) => {
  const Icon = ({ className = "w-5 h-5", ...props }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      {children}
    </svg>
  );
  return Icon;
};

/** ===== Base icons (single source of truth) ===== **/

// Home / Dashboard (used by: DashboardIcon, HomeIcon, AddressIcon, DisasterIcon, etc.)
const IconHome = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
  />
);

// Task Icon (unique)
const IconTask = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
  />
);

// File / Document (used by: DocumentIcon, TenderIcon, FileIcon)
const IconFileText = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  />
);

// Chart / Analytics (used by: ChartIcon, AnalyticsIcon)
const IconChart = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  />
);

// Bar/Report (used by: ReportIcon, BarChartIcon)
const IconBarsInFile = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  />
);

// Calendar (used by: CalendarIcon, CalendarTodayIcon)
const IconCalendar = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
  />
);

// Bell/Notifications (used by: BellIcon, NotificationPreferencesIcon, SirenIcon base)
const IconBell = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
  />
);

// Settings/Gear (used by: SettingsIcon, PreferencesIcon, GearIcon)
const IconCog = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </>
);

// Shield check (used by: SecurityIcon, ShieldIcon, TeamSuccessIcon base, SafetyEmergencyIcon base)
const IconShieldCheck = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  />
);

// Warning triangle (used by: AlertIcon, AlertTriangleIcon, WarningIcon, EmergencyIcon, HazardIcon)
const IconWarningTriangle = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
  />
);

// Check circle (used by: ApprovalIcon, CheckCircleIcon)
const IconCheckCircle = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  />
);

// User (used by: UserIcon)
const IconUser = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  />
);

// Users (used by: UsersIcon, TeamIcon)
const IconUsers = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
  />
);

// Trending up (used by: TrendingUpIcon, SparklineIcon)
const IconTrendingUp = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
  />
);

// Megaphone (used by: AnnouncementIcon, MegaphoneIcon)
const IconMegaphone = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
  />
);

// Clock (used by: ClockIcon)
const IconClock = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  />
);

// Mail (used by: EmailIcon)
const IconMail = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  />
);

// Phone (used by: PhoneIcon, EmergencyCallIcon base)
const IconPhone = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
  />
);

// Pencil/Edit (used by: EditIcon)
const IconPencil = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
  />
);

// Save Icon (unique)
const IconSave = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
  />
);

// Cancel/X Icon (used by: CancelIcon)
const IconCancel = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M6 18L18 6M6 6l12 12"
  />
);

// Download (used by: DownloadIcon)
const IconDownload = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
  />
);

// Upload (used by: UploadIcon)
const IconUpload = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
  />
);

// Search (used by: SearchIcon)
const IconSearch = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  />
);

// Filter (used by: FilterIcon)
const IconFilter = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
  />
);

// Plus (used by: PlusIcon)
const IconPlus = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 4v16m8-8H4"
  />
);

// Chevron right (used by: ChevronRightIcon)
const IconChevronRight = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 5l7 7-7 7"
  />
);

// Briefcase (used by: BriefcaseIcon)
const IconBriefcase = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  />
);

// Department/Building (used by: DepartmentIcon, BuildingIcon, HierarchyIcon)
const IconBuilding = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
  />
);

// Location Pin icon (unique)
const IconLocationPin = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
    />
    <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none" />
  </>
);

// Map icon (unique)
const IconMap = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
  />
);

// GPS icon (unique)
const IconGPS = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V16a1 1 0 001 1h6a1 1 0 001-1v-1.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 11a2 2 0 100-4 2 2 0 000 4z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17v4" />
  </>
);

// Compass icon (unique)
const IconCompass = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v8M8 12h8"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15l3-3-3-3"
    />
  </>
);

// Alert circle (unique)
const IconAlertCircle = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  />
);

// Team Building icon (unique)
const IconTeamBuilding = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
  />
);

// Collaboration icon (unique)
const IconCollaboration = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
  />
);

// Team Lead icon (unique)
const IconTeamLead = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 9l3 3-3 3M6 15l-3-3 3-3"
    />
  </>
);

// People icon (unique)
const IconPeople = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  />
);

// Team Performance icon (unique)
const IconTeamPerformance = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
    <circle cx="18" cy="8" r="2" fill="currentColor" stroke="none" />
    <circle cx="6" cy="8" r="2" fill="currentColor" stroke="none" />
    <circle cx="12" cy="5" r="2" fill="currentColor" stroke="none" />
  </>
);

// Team Meeting icon (unique)
const IconTeamMeeting = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </>
);

// Team Roles icon (unique)
const IconTeamRoles = createIcon(
  <>
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth={2} />
    <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth={2} />
    <circle cx="12" cy="16" r="3" stroke="currentColor" strokeWidth={2} />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 11v2a4 4 0 008 0v-2M11 16l1 1 1-1"
    />
  </>
);

// Team Collaboration icon (unique)
const IconTeamCollaboration = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
    <circle cx="8.5" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="14.5" r="1.5" fill="currentColor" stroke="none" />
  </>
);

// Sliders icon (unique)
const IconSliders = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
  />
);

// Toggle icon (unique)
const IconToggle = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  />
);

// Checkbox Settings icon (unique)
const IconCheckboxSettings = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  />
);

// Adjustments icon (unique)
const IconAdjustments = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
  />
);

// User Preferences icon (unique)
const IconUserPreferences = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
    <circle cx="18" cy="15" r="2" stroke="currentColor" strokeWidth={2} />
    <circle cx="6" cy="15" r="2" stroke="currentColor" strokeWidth={2} />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 10v2M6 10v2"
    />
  </>
);

// Display Preferences icon (unique)
const IconDisplayPreferences = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </>
);

// Language icon (unique)
const IconLanguage = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
  />
);

// Theme icon (unique)
const IconTheme = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  />
);

// Privacy icon (unique)
const IconPrivacy = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
  />
);

// Siren icon (unique - extends Bell)
const IconSiren = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
    <circle cx="12" cy="5" r="2" fill="currentColor" stroke="none" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 8l2-2M6 8L4 6"
    />
  </>
);

// First Aid icon (unique)
const IconFirstAid = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v8m-4-4h8"
    />
  </>
);

// Fire icon (unique)
const IconFire = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
    />
  </>
);

// Emergency Exit icon (unique)
const IconEmergencyExit = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V7l-4 4 4 4v-3"
    />
  </>
);

// Panic Button icon (unique)
const IconPanicButton = createIcon(
  <>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4M12 16h.01"
    />
  </>
);

// Emergency Call icon (unique)
const IconEmergencyCall = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
    <circle cx="15" cy="9" r="2" fill="currentColor" stroke="none" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 5l-4 4"
    />
  </>
);

// Storm icon (unique)
const IconStorm = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10l-3 5h4l-3 5"
    />
  </>
);

// Skills icon (unique)
const IconSkills = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
    <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth={2} />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12v2M16 12v2"
    />
  </>
);

// SOS Icon (unique with text)
export const SOSIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
    <text x="8" y="16" fontSize="6" fontWeight="bold" fill="currentColor">
      SOS
    </text>
  </svg>
);

/** ===== Exports (keep your original names) ===== **/

// Core
export const DashboardIcon = IconHome;
export const HomeIcon = IconHome;
export const TaskIcon = IconTask;
export const DocumentIcon = IconFileText;
export const TenderIcon = IconFileText;
export const FileIcon = IconFileText;
export const ReportIcon = IconBarsInFile;
export const BarChartIcon = IconBarsInFile;
export const CalendarIcon = IconCalendar;
export const CalendarTodayIcon = IconCalendar;
export const AnnouncementIcon = IconMegaphone;
export const MegaphoneIcon = IconMegaphone;
export const ApprovalIcon = IconCheckCircle;
export const CheckCircleIcon = IconCheckCircle;
export const AlertIcon = IconWarningTriangle;
export const AlertTriangleIcon = IconWarningTriangle;
export const WarningIcon = IconWarningTriangle;
export const EmergencyIcon = IconWarningTriangle;
export const HazardIcon = IconWarningTriangle;
export const BellIcon = IconBell;
export const NotificationPreferencesIcon = IconBell;
export const UserIcon = IconUser;
export const UsersIcon = IconUsers;
export const TeamIcon = IconUsers;
export const TrendingUpIcon = IconTrendingUp;
export const SparklineIcon = IconTrendingUp;
export const SettingsIcon = IconCog;
export const PreferencesIcon = IconCog;
export const GearIcon = IconCog;
export const SecurityIcon = IconShieldCheck;
export const ShieldIcon = IconShieldCheck;

// Utilities
export const PlusIcon = IconPlus;
export const SearchIcon = IconSearch;
export const FilterIcon = IconFilter;
export const DownloadIcon = IconDownload;
export const UploadIcon = IconUpload;
export const ChevronRightIcon = IconChevronRight;
export const ClockIcon = IconClock;
export const EmailIcon = IconMail;
export const PhoneIcon = IconPhone;
export const BriefcaseIcon = IconBriefcase;

// Building-style duplicates
export const DepartmentIcon = IconBuilding;
export const BuildingIcon = IconBuilding;
export const HierarchyIcon = IconBuilding;

// Chart-style duplicates
export const ChartIcon = IconChart;
export const AnalyticsIcon = IconChart;

// Same-home duplicates
export const AddressIcon = IconHome;
export const DisasterIcon = IconHome;

// Unique icons
export const EditIcon = IconPencil;
export const SaveIcon = IconSave;
export const CancelIcon = IconCancel;
export const LocationIcon = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </>
);
export const LocationPinIcon = IconLocationPin;
export const MapIcon = IconMap;
export const GPSIcon = IconGPS;
export const CompassIcon = IconCompass;
export const AlertCircleIcon = IconAlertCircle;
export const TeamBuildingIcon = IconTeamBuilding;
export const CollaborationIcon = IconCollaboration;
export const TeamLeadIcon = IconTeamLead;
export const PeopleIcon = IconPeople;
export const TeamPerformanceIcon = IconTeamPerformance;
export const TeamMeetingIcon = IconTeamMeeting;
export const TeamRolesIcon = IconTeamRoles;
export const TeamCollaborationIcon = IconTeamCollaboration;
export const SlidersIcon = IconSliders;
export const ToggleIcon = IconToggle;
export const CheckboxSettingsIcon = IconCheckboxSettings;
export const AdjustmentsIcon = IconAdjustments;
export const UserPreferencesIcon = IconUserPreferences;
export const DisplayPreferencesIcon = IconDisplayPreferences;
export const LanguageIcon = IconLanguage;
export const ThemeIcon = IconTheme;
export const PrivacyIcon = IconPrivacy;
export const SirenIcon = IconSiren;
export const FirstAidIcon = IconFirstAid;
export const FireIcon = IconFire;
export const EmergencyExitIcon = IconEmergencyExit;
export const PanicButtonIcon = IconPanicButton;
export const EmergencyCallIcon = IconEmergencyCall;
export const StormIcon = IconStorm;
export const SkillsIcon = IconSkills;

// Line Chart, Pie Chart, Donut Chart variants
export const LineChartIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
  />
);

export const PieChartIcon = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
    />
  </>
);

export const DonutChartIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V2m0 0a10 10 0 00-9.93 8.99M12 2a10 10 0 0110 10h-2m-8 8a10 10 0 01-8-8H2m16 0a8 8 0 11-16 0 8 8 0 0116 0z"
  />
);

// Badge icon
export const BadgeIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
  />
);

// Activity icon
export const ActivityIcon = IconBarsInFile;