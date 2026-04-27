"use client";

import Link from "next/link";
import { useBadges } from "@/contexts/BadgeContext";
import { LucideGlyph } from "@/components/ui/lucide-icon-text";

export interface LayoutMenuItem {
  path?: string;
  icon?: string | React.ReactNode;
  label: string;
  group?: string;
}

type QuickStat = { label: string; value: number };

export function LayoutSidebar({
  menuItems,
  pathname,
  sidebarOpen,
  userRole,
  quickStats,
}: {
  menuItems: LayoutMenuItem[];
  pathname: string;
  sidebarOpen: boolean;
  userRole: string;
  quickStats: QuickStat[];
}) {
  const { getBadge } = useBadges();

  const isActive = (path?: string) => pathname === path;

  return (
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
            const groups: Record<string, (LayoutMenuItem & { _idx: number })[]> = {};
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
                              {typeof item.icon === "string" ? (
                                <LucideGlyph icon={item.icon} className="text-lg" />
                              ) : (
                                item.icon
                              )}
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
                              {typeof item.icon === "string" ? (
                                <LucideGlyph icon={item.icon} className="text-lg" />
                              ) : (
                                item.icon
                              )}
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

          <div className="mt-6 px-1">
            <div
              className="rounded-2xl p-4 border border-gray-200"
              style={{ backgroundColor: "rgba(109,198,223,0.12)" }}
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
                    <span className="text-xs font-extrabold" style={{ color: "var(--accent-red)" }}>
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="h-2 rounded-full bg-white/60 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: "62%", background: "var(--primary-blue)" }}
                  />
                </div>
                <div className="mt-2 text-[11px] text-gray-600">Progress overview</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: "var(--primary-blue)" }}
            >
              C
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">Calaya</div>
              <div className="text-xs text-gray-500 truncate">{userRole}</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
