"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { useBadges } from "@/contexts/BadgeContext";
import { LucideGlyph } from "@/components/ui/lucide-icon-text";
import { useAuth } from "@/contexts/AuthContext";
import { getRouteForRole } from "@/lib/auth-config";

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
  const { user } = useAuth();
  const [branchOpen, setBranchOpen] = useState<Record<number, boolean>>({});
  const [search, setSearch] = useState("");

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

  // Search filter — matches against label (case-insensitive). Groups with no
  // matching children are hidden when a query is present.
  const visibleMenu = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return menuItems;
    return menuItems
      .map((item) => {
        const matchedSelf = item.label.toLowerCase().includes(q);
        const matchedChildren = (item.children || []).filter((c) =>
          c.label.toLowerCase().includes(q),
        );
        if (matchedSelf) return item;
        if (matchedChildren.length > 0) return { ...item, children: matchedChildren };
        return null;
      })
      .filter(Boolean) as LayoutMenuItem[];
  }, [menuItems, search]);

  const renderNavRow = (
    item: LayoutMenuItem & { _idx: number },
    opts?: { nested?: boolean },
  ) => {
    const nested = opts?.nested ?? false;
    const active = isActive(item.path);
    const path = item.path ?? "#";
    const isLink = path.startsWith("/") && path !== "#";

    const linkClass = [
      "ct-nav-row group relative flex items-center gap-3 px-3 py-2 rounded-2xl",
      "text-[13.5px] font-medium",
      nested ? "pl-7 ml-3" : "",
      active
        ? "text-white shadow-[var(--shadow-sm)]"
        : "text-[color:var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--text-primary)]",
    ].join(" ");
    const linkStyle: React.CSSProperties = {
      backgroundColor: active ? "var(--primary-blue)" : "transparent",
    };

    const iconWrap = (
      <span
        className={[
          "inline-flex items-center justify-center w-8 h-8 rounded-xl shrink-0 transition",
          active
            ? "bg-white/15 text-white"
            : "bg-[var(--surface-page)] text-[color:var(--text-secondary)] group-hover:bg-[var(--tile-blue-bg)] group-hover:text-[color:var(--primary-blue)]",
        ].join(" ")}
      >
        {typeof item.icon === "string" ? (
          <LucideGlyph icon={item.icon} className="text-base" />
        ) : (
          item.icon
        )}
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

    const liveBadge = typeof getBadge === "function" ? getBadge(path) : null;

    return (
      <Link
        key={item._idx}
        href={path}
        prefetch={false}
        className={linkClass}
        style={linkStyle}
      >
        {iconWrap}
        <span className="truncate flex-1">{item.label}</span>
        {liveBadge ? (
          <span
            className={[
              "text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-tight",
              active ? "bg-white/20 text-white" : "bg-[var(--accent-red)] text-white",
            ].join(" ")}
          >
            {liveBadge}
          </span>
        ) : null}
      </Link>
    );
  };

  const displayName =
    (user as any)?.name || (user as any)?.email?.split("@")[0] || "Calaya";
  const initials =
    (displayName as string)
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((p: string) => p[0]?.toUpperCase())
      .join("") || "C";

  return (
    <aside
      className={[
        "fixed z-50 md:z-30 top-0 left-0 bottom-0 w-72 md:w-64",
        "border-r border-[color:var(--separator)]",
        "transition-transform duration-300 ease-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      ].join(" ")}
      style={{ backgroundColor: "var(--surface-card)" }}
    >
      <div className="h-full flex flex-col">
        {/* Brand block — replaces the duplicated top-bar brand */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between">
          <Link
            href={getRouteForRole(userRole)}
            className="flex items-center gap-2 group"
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
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
            style={{
              backgroundColor: "var(--accent-red-100)",
              color: "var(--accent-red)",
            }}
          >
            {userRole}
          </span>
        </div>

        {/* Search bar — like the HiveQ ⌘K input */}
        <div className="px-3 pb-3">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-2xl border"
            style={{
              borderColor: "var(--separator-strong)",
              backgroundColor: "var(--surface-page)",
            }}
          >
            <Search className="h-4 w-4 text-[color:var(--text-tertiary)] shrink-0" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="flex-1 bg-transparent border-0 outline-none text-[13px] placeholder:text-[color:var(--text-tertiary)]"
              aria-label="Search menu"
            />
            <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-semibold text-[color:var(--text-tertiary)] bg-white border border-[color:var(--separator-strong)]">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 px-3 pb-4 overflow-y-auto scrollbar-hide">
          {(() => {
            const groups: Record<string, (LayoutMenuItem & { _idx: number })[]> = {};
            visibleMenu.forEach((item, index) => {
              const key = item.group ?? "Main Menu";
              if (!groups[key]) groups[key] = [];
              groups[key].push({ ...item, _idx: index });
            });

            const entries = Object.entries(groups);

            return (
              <nav className="space-y-5">
                {entries.length === 0 ? (
                  <div className="px-3 py-6 text-center text-xs text-[color:var(--text-tertiary)]">
                    No matches for "{search}"
                  </div>
                ) : (
                  entries.map(([label, items]) => (
                    <div key={label}>
                      <div className="px-3 mb-1.5">
                        <div className="text-[10px] font-semibold text-[color:var(--text-tertiary)] uppercase tracking-[0.08em]">
                          {label}
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        {items.map((item) => {
                          if (item.children && item.children.length > 0) {
                            const childActive = item.children.some((c) =>
                              pathMatches(pathname, c.path),
                            );
                            const expanded = branchExpanded(item._idx, childActive);
                            const headerActive = childActive;

                            return (
                              <div key={item._idx} className="space-y-0.5">
                                <button
                                  type="button"
                                  onClick={() => toggleBranch(item._idx, childActive)}
                                  className={[
                                    "ct-nav-row w-full group relative flex items-center gap-3 px-3 py-2 rounded-2xl",
                                    "text-[13.5px] font-medium text-left",
                                    headerActive
                                      ? "text-white"
                                      : "text-[color:var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[color:var(--text-primary)]",
                                  ].join(" ")}
                                  style={{
                                    backgroundColor: headerActive
                                      ? "var(--primary-blue)"
                                      : "transparent",
                                  }}
                                >
                                  <span
                                    className={[
                                      "inline-flex items-center justify-center w-8 h-8 rounded-xl shrink-0 transition",
                                      headerActive
                                        ? "bg-white/15 text-white"
                                        : "bg-[var(--surface-page)] text-[color:var(--text-secondary)] group-hover:bg-[var(--tile-blue-bg)] group-hover:text-[color:var(--primary-blue)]",
                                    ].join(" ")}
                                  >
                                    {typeof item.icon === "string" ? (
                                      <LucideGlyph icon={item.icon} className="text-base" />
                                    ) : (
                                      item.icon
                                    )}
                                  </span>
                                  <span className="truncate flex-1">{item.label}</span>
                                  <ChevronRight
                                    className={[
                                      "h-3.5 w-3.5 shrink-0 transition-transform opacity-70",
                                      expanded ? "rotate-90" : "",
                                    ].join(" ")}
                                  />
                                </button>
                                {expanded ? (
                                  <div className="space-y-0.5 pt-0.5">
                                    {item.children.map((child, ci) =>
                                      renderNavRow(
                                        {
                                          ...child,
                                          _idx: item._idx * 1000 + ci,
                                        } as LayoutMenuItem & { _idx: number },
                                        { nested: true },
                                      ),
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
                  ))
                )}
              </nav>
            );
          })()}
        </div>

        {/* Workspace footer — like HiveQ "Wolf Pixel / Workspace" card */}
        <div className="m-3 mt-0">
          <div
            className="flex items-center gap-3 p-2.5 rounded-2xl border"
            style={{
              borderColor: "var(--separator-strong)",
              backgroundColor: "var(--surface-page)",
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ backgroundColor: "var(--primary-blue)" }}
            >
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div
                className="text-[13px] font-semibold truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {displayName}
              </div>
              <div className="text-[11px] text-[color:var(--text-tertiary)] truncate">
                {userRole} workspace
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
