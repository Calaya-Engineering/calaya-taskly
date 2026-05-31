"use client";
// components/Layout.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { MenuIcon, CloseMenuIcon, BellIcon } from "@/lib/icons";
import { LayoutSidebar } from "@/components/LayoutSidebar";
import { getRouteForRole } from "@/lib/auth-config";

export interface MenuItem {
  path?: string;
  icon?: string | React.ReactNode;
  label: string;
  group?: string;
  children?: MenuItem[];
}

const LayoutContext = createContext<boolean>(false);

/**
 * Derive a humane page title from the URL path.
 * "/staff-dashboard/documents" -> "Documents"
 * "/md-dashboard"              -> "Dashboard"
 */
function deriveTitle(pathname: string): string {
  if (!pathname) return "Dashboard";
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length <= 1) return "Dashboard";
  const last = segments[segments.length - 1] || "";
  return last
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bId\b/g, "Detail");
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
      } else if (user && userRole && user.role !== userRole) {
        const correctRoute = getRouteForRole(user.role);
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

  const pageTitle = useMemo(() => deriveTitle(pathname || ""), [pathname]);
  const displayName = (user as any)?.name || (user as any)?.email?.split("@")[0] || userRole;
  const initials =
    (displayName as string)
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((p: string) => p[0]?.toUpperCase())
      .join("") || "C";

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
        className="min-h-screen text-[color:var(--text-primary)]"
        style={{
          backgroundColor: "var(--surface-page)",
        }}
      >
        {/* ---------- Top Bar ---------- */}
        <header className="fixed top-0 left-0 right-0 z-50">
          <div className="ct-glass h-16">
            <div className="h-full pl-4 pr-4 md:pl-6 md:pr-6 flex items-center justify-between gap-4">
              {/* Left: hamburger (mobile) + logo + page title */}
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setSidebarOpen((s) => !s)}
                  className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-2xl hover:bg-[var(--surface-hover)] active:scale-[0.97] transition"
                  aria-label="Toggle sidebar"
                >
                  <span
                    style={{ color: "var(--primary-blue)" }}
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    {sidebarOpen ? <CloseMenuIcon size={24} /> : <MenuIcon size={24} />}
                  </span>
                </button>

                {/* Brand on mobile, hide on desktop — sidebar handles the brand */}
                <Link
                  href={getRouteForRole(userRole)}
                  className="flex items-center gap-2 md:hidden"
                  aria-label="Calaya home"
                >
                  <div className="relative h-8 w-auto">
                    <Image
                      src="/calaya-logo.png"
                      alt="Calaya Engineering Services"
                      height={32}
                      width={120}
                      className="h-8 w-auto object-contain object-left"
                      priority
                    />
                  </div>
                </Link>

                {/* Page title (desktop only) — sits inline with the chrome */}
                <div className="hidden md:flex md:items-center md:gap-2 md:pl-[16rem]">
                  <h1
                    className="text-[20px] font-semibold tracking-tight truncate"
                    style={{
                      color: "var(--text-primary)",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {pageTitle}
                  </h1>
                </div>
              </div>

              {/* Right: profile cluster + notifications + logout */}
              <div className="flex items-center gap-1.5 md:gap-2">
                <button
                  type="button"
                  className="hidden md:inline-flex w-10 h-10 items-center justify-center rounded-2xl hover:bg-[var(--surface-hover)] active:scale-[0.97] transition"
                  aria-label="Notifications"
                  onClick={() => router.push(getRouteForRole(userRole) + "/notifications")}
                >
                  <BellIcon size={20} />
                </button>

                <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded-2xl border border-[color:var(--separator-strong)] bg-white/70">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: "var(--primary-blue)" }}
                  >
                    {initials}
                  </div>
                  <div className="hidden lg:flex flex-col leading-tight pr-1">
                    <span className="text-[12px] font-semibold text-[color:var(--text-primary)] truncate max-w-[10rem]">
                      {displayName}
                    </span>
                    <span className="text-[10px] text-[color:var(--text-tertiary)] uppercase tracking-wider">
                      {userRole}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogoutClick}
                  className="ct-btn"
                  style={{
                    backgroundColor: "var(--accent-red)",
                    color: "#fff",
                  }}
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
          <div className="px-4 py-6 md:px-8 md:py-8">
            <div className="max-w-[1400px] mx-auto">{children}</div>
          </div>
        </main>

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ animation: "ct-fade-in 200ms var(--ease-apple) both" }}
          >
            <div className="absolute inset-0 bg-black/40" onClick={handleCancelLogout} />
            <div
              className="relative z-10 w-full max-w-sm mx-4 p-7"
              style={{
                background: "var(--surface-card)",
                borderRadius: "var(--radius-2xl)",
                boxShadow: "var(--shadow-xl)",
                animation: "ct-scale-in 220ms var(--ease-spring) both",
              }}
            >
              <h2
                className="text-[20px] font-bold tracking-tight mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                Sign out?
              </h2>
              <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                You'll need to sign back in to access your dashboard.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCancelLogout}
                  className="ct-btn ct-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="ct-btn"
                  style={{ backgroundColor: "var(--accent-red)", color: "#fff" }}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutContext.Provider>
  );
}
