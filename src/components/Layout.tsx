"use client";
// components/Layout.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useBadges } from "@/contexts/BadgeContext";
import { MenuIcon, CloseMenuIcon } from "@/lib/icons";
import { LucideGlyph } from "@/components/ui/lucide-icon-text";
import { getRouteForRole } from "@/lib/auth-config";

interface MenuItem {
  path?: string;
  icon?: string | React.ReactNode;
  label: string;
  group?: string;
}

const LayoutContext = createContext<boolean>(false);

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
  const { getBadge } = useBadges();
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
        // Prevent accidental access to wrong dashboard segments
        const correctRoute = getRouteForRole(user.role);
        router.replace(correctRoute);
      }
    }
  }, [loading, isAuthenticated, user, userRole, router]);

  const isActive = (path?: string) => pathname === path;

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
            <div className="px-3 py-4 overflow-y-auto scrollbar-hide">
              {(() => {
                const groups: Record<string, (MenuItem & { _idx: number })[]> = {};
                menuItems.forEach((item, index) => {
                  const key = item.group ?? "General";
                  if (!groups[key]) groups[key] = [];
                  groups[key].push({ ...item, _idx: index });
                });

                return (
                  <nav className="space-y-6">
                    {Object.entries(groups).map(([label, items]) => (
                      <div key={label}>
                        <div className="px-2 mb-2">
                          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            {label}
                          </div>
                        </div>
                        <div className="space-y-1">
                          {items.map((item) => {
                            const active = isActive(item.path);
                            const path = item.path ?? "#";
                            const isLink = path.startsWith("/") && path !== "#";

                            const linkClass = [
                              "group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl",
                              "text-sm font-medium transition",
                              active ? "text-white" : "text-gray-700 hover:bg-gray-100",
                            ].join(" ");
                            const linkStyle = {
                              backgroundColor: active ? "var(--primary-blue)" : "transparent",
                            };

                            return isLink ? (
                              <Link
                                key={item._idx}
                                href={path}
                                prefetch={false}
                                className={linkClass}
                                style={linkStyle}
                              >
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
                                  {typeof item.icon === "string" ? <LucideGlyph icon={item.icon} className="text-lg" /> : item.icon}
                                </span>
                                <span className="truncate">{item.label}</span>
                                {(() => {
                                  const liveBadge = typeof getBadge === "function" ? getBadge(path) : null;
                                  if (!liveBadge) return null;
                                  return (
                                    <span
                                      className={[
                                        "ml-auto text-xs font-semibold px-2 py-1 rounded-full",
                                        active ? "bg-white/15 text-white" : "bg-red-500 text-white",
                                      ].join(" ")}
                                    >
                                      {liveBadge}
                                    </span>
                                  );
                                })()}
                              </Link>
                            ) : (
                              <span key={item._idx} className={linkClass} style={linkStyle}>
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
                                  {typeof item.icon === "string" ? <LucideGlyph icon={item.icon} className="text-lg" /> : item.icon}
                                </span>
                                <span className="truncate">{item.label}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </nav>
                );
              })()}

              {/* Quick Stats */}
              <div className="mt-6 px-1">
                <div
                  className="rounded-2xl p-4 border border-gray-200"
                  style={{ backgroundColor: "rgba(109,198,223,0.12)" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-extrabold" style={{ color: "var(--primary-blue)" }}>Quick Stats</div>
                    <span className="text-[11px] text-gray-500">Today</span>
                  </div>
                  <div className="mt-3 space-y-2.5">
                    {quickStats.map((s) => (
                      <div key={s.label} className="flex items-center justify-between">
                        <span className="text-xs text-gray-700">{s.label}</span>
                        <span className="text-xs font-extrabold" style={{ color: "var(--accent-red)" }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <div className="h-2 rounded-full bg-white/60 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: "62%", background: "var(--primary-blue)" }} />
                    </div>
                    <div className="mt-2 text-[11px] text-gray-600">Progress overview</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto p-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: "var(--primary-blue)" }}>C</div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">Calaya</div>
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
