"use client";
// components/Layout.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { MenuIcon, CloseMenuIcon } from "@/lib/icons";
import { LayoutSidebar } from "@/components/LayoutSidebar";
import { getRouteForRole, isManagementDepartment } from "@/lib/auth-config";

export interface MenuItem {
  path?: string;
  icon?: string | React.ReactNode;
  label: string;
  group?: string;
  children?: MenuItem[];
}

const LayoutContext = createContext<boolean>(false);

function getUserDashboardRoute(user: { role: string; route?: string; department?: string | null }) {
  const route = user.route || getRouteForRole(user.role);
  if (route === "/md-dashboard" && !isManagementDepartment(user.department)) {
    return "/staff-dashboard";
  }

  return route;
}

function canAccessDashboard(user: { role: string; route?: string; department?: string | null }, dashboardRole: string) {
  const dashboardRoute = getRouteForRole(dashboardRole);
  if (dashboardRoute === "/md-dashboard") {
    return getUserDashboardRoute(user) === dashboardRoute && isManagementDepartment(user.department);
  }

  return getUserDashboardRoute(user) === dashboardRoute;
}

export default function Layout({
  children,
  menuItems = [],
  userRole = "User",
}: {
  children: React.ReactNode;
  menuItems?: MenuItem[];
  userRole?: string;
}) {
  const isInsideLayout = useContext(LayoutContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, loading, logout } = useAuth();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        setShowLogoutModal(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace("/login");
      } else if (user && userRole && !canAccessDashboard(user, userRole)) {
        // Prevent accidental access to wrong dashboard segments
        const correctRoute = getUserDashboardRoute(user);
        router.replace(correctRoute);
      }
    }
  }, [loading, isAuthenticated, user, userRole, router]);

  const quickStats = useMemo(
    () => [
      { label: "Active Tasks", value: 0 },
      { label: "Overdue", value: 0 },
      { label: "Pending Approvals", value: 7 },
    ],
    []
  );

  if (isInsideLayout) {
    return <>{children}</>;
  }

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
  };
  const handleCancelLogout = () => setShowLogoutModal(false);

  return (
    <LayoutContext.Provider value={true}>
      <div
        className="min-h-screen bg-gray-50 text-gray-900"
        style={{
          "--primary-blue": "#2C4B9B",
          "--secondary-blue": "#6DC6DF",
          "--accent-red": "#ED3237",
        } as React.CSSProperties}
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
                >
                  <span style={{ color: "var(--primary-blue)" }} className="w-6 h-6 flex items-center justify-center">
                    {sidebarOpen ? <CloseMenuIcon size={24} /> : <MenuIcon size={24} />}
                  </span>
                </button>

                {/* Brand */}
                <Link href="/login" className="flex items-center gap-3 group">
                  <div className="relative h-9 w-auto min-w-[120px]">
                    <Image
                      src="/calaya-logo.png"
                      alt="Calaya Engineering Services"
                      height={36}
                      width={140}
                      className="h-9 w-auto object-contain object-left"
                    />
                  </div>

                  <span
                    className="ml-2 hidden sm:inline-flex items-center px-2.5 py-1 text-[11px] font-semibold rounded-full"
                    style={{ backgroundColor: "var(--accent-red)", color: "white" }}
                  >
                    {userRole}
                  </span>
                </Link>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={handleLogoutClick}
                  className="h-10 px-4 rounded-2xl text-sm font-semibold text-white active:scale-[0.99] transition"
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
          />
        )}

        <LayoutSidebar
          menuItems={menuItems}
          pathname={pathname}
          sidebarOpen={sidebarOpen}
          userRole={userRole}
          quickStats={quickStats}
        />

        {/* Content */}
        <main className="pt-16 md:pl-64">
          <div className="p-4 md:p-6">
            <div className="max-w-[1400px] mx-auto">{children}</div>
          </div>
        </main>

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={handleCancelLogout} />
            <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--primary-blue)" }}>System log out?</h2>
              <p className="text-sm text-gray-600 mb-4">Are you sure you want to log out of your session?</p>
              <div className="flex justify-end gap-3">
                <button onClick={handleCancelLogout} className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100">No</button>
                <button onClick={handleConfirmLogout} className="px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "var(--accent-red)" }}>Yes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutContext.Provider>
  );
}
