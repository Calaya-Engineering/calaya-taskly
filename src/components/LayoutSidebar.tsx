"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useBadges } from "@/contexts/BadgeContext";
import { LucideGlyph } from "@/components/ui/lucide-icon-text";

export interface LayoutMenuItem {
  path?: string;
  icon?: string | React.ReactNode;
  label: string;
  group?: string;
  /** Nested links (e.g. Reports → Daily reports, Task reports). Parent row expands; sub-items navigate. */
  children?: LayoutMenuItem[];
}

type QuickStat = { label: string; value: number };

function pathMatches(pathname: string, path?: string) {
  if (!path || !path.startsWith("/")) return false;
  return pathname === path || pathname.startsWith(`${path}/`);
}

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
  const [branchOpen, setBranchOpen] = useState<Record<number, boolean>>({});

  const isActive = (path?: string) => pathname === path;

  const branchExpanded = (idx: number, childActive: boolean) => {
    if (Object.prototype.hasOwnProperty.call(branchOpen, idx)) {
      return branchOpen[idx];
    }
    return childActive;
  };

  const toggleBranch = (idx: number, childActive: boolean) => {
    setBranchOpen((s) => {
      const cur = Object.prototype.hasOwnProperty.call(s, idx) ? s[idx] : childActive;
      return { ...s, [idx]: !cur };
    });
  };

  const renderNavRow = (
    item: LayoutMenuItem & { _idx: number },
    opts?: { nested?: boolean }
  ) => {
    const nested = opts?.nested ?? false;
    const active = isActive(item.path);
    const path = item.path ?? "#";
    const isLink = path.startsWith("/") && path !== "#";

    const linkClass = [
      "group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl",
      "text-sm font-medium transition",
      nested ? "pl-4 ml-2 border-l border-gray-200/90 rounded-l-lg" : "",
      active ? "text-white" : "text-gray-700 hover:bg-gray-100",
    ].join(" ");
    const linkStyle = {
      backgroundColor: active ? "var(--primary-blue)" : "transparent",
    };

    const iconWrap = (
      <span
        className={[
          "inline-flex items-center justify-center w-9 h-9 rounded-2xl shrink-0",
          active ? "bg-white/15" : "bg-gray-100 group-hover:bg-gray-200",
        ].join(" ")}
      >
        {typeof item.icon === "string" ? <LucideGlyph icon={item.icon} className="text-lg" /> : item.icon}
      </span>
    );

    if (!isLink) {
      return (
        <span key={item._idx} className={linkClass} style={linkStyle}>
          {iconWrap}
          <span className="truncate">{item.label}</span>
        </span>
      );
    }

    return (
      <Link key={item._idx} href={path} prefetch={false} className={linkClass} style={linkStyle}>
        <span
          className={[
            "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full",
            active ? "opacity-100" : "opacity-0 group-hover:opacity-60",
          ].join(" ")}
          style={{ backgroundColor: "var(--secondary-blue)" }}
        />
        {iconWrap}
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
    );
  };

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
                        if (item.children && item.children.length > 0) {
                          const childActive = item.children.some((c) => pathMatches(pathname, c.path));
                          const expanded = branchExpanded(item._idx, childActive);
                          const headerActive = childActive;

                          return (
                            <div key={item._idx} className="space-y-1">
                              <button
                                type="button"
                                onClick={() => toggleBranch(item._idx, childActive)}
                                className={[
                                  "w-full group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl",
                                  "text-sm font-medium transition text-left",
                                  headerActive ? "text-white" : "text-gray-700 hover:bg-gray-100",
                                ].join(" ")}
                                style={{
                                  backgroundColor: headerActive ? "var(--primary-blue)" : "transparent",
                                }}
                              >
                                <span
                                  className={[
                                    "inline-flex items-center justify-center w-9 h-9 rounded-2xl shrink-0",
                                    headerActive ? "bg-white/15" : "bg-gray-100 group-hover:bg-gray-200",
                                  ].join(" ")}
                                >
                                  {typeof item.icon === "string" ? (
                                    <LucideGlyph icon={item.icon} className="text-lg" />
                                  ) : (
                                    item.icon
                                  )}
                                </span>
                                <span className="truncate flex-1">{item.label}</span>
                                <ChevronRight
                                  className={[
                                    "h-4 w-4 shrink-0 transition-transform opacity-70",
                                    expanded ? "rotate-90" : "",
                                  ].join(" ")}
                                />
                              </button>
                              {expanded ? (
                                <div className="space-y-1 pt-0.5">
                                  {item.children.map((child, ci) =>
                                    renderNavRow(
                                      { ...child, _idx: item._idx * 1000 + ci } as LayoutMenuItem & { _idx: number },
                                      { nested: true }
                                    )
                                  )}
                                </div>
                              ) : null}
                            </div>
                          );
                        }

                        return renderNavRow(item);
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            );
          })()}

          {/* Quick stats sidebar card intentionally hidden for now.
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
          */}
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
