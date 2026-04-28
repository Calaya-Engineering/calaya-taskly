"use client";

/**
 * Shared UI components used across dashboards (MD, HOD, Admin, etc.)
 * Matches the visual style of MDDashboard, MDAllTasks, etc.
 */

import { renderNodeWithIcons } from "@/components/ui/lucide-icon-text";

export const Card = ({ className = "", children }) => (
  <div className={`bg-white border border-gray-200/70 rounded-2xl shadow-none ${className}`}>{children}</div>
);

export const SectionTitle = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between gap-3">
    <div>
      <h2 className="text-lg md:text-xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
        {renderNodeWithIcons(title)}
      </h2>
      {subtitle ? <p className="text-sm text-gray-500 mt-1">{subtitle}</p> : null}
    </div>
    {action}
  </div>
);

export const Pill = ({ children, tone = "default" }) => {
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
      {renderNodeWithIcons(children, "h-[0.875em] w-[0.875em] shrink-0")}
    </span>
  );
};

export const SectionLoadingState = ({ rows = 3 }: { rows?: number }) => (
  <div className="space-y-3 animate-pulse" aria-hidden>
    {Array.from({ length: rows }).map((_, idx) => (
      <div key={idx} className="h-12 rounded-2xl border border-gray-100 bg-gray-100/80" />
    ))}
  </div>
);

export const SectionEmptyState = ({ message }: { message: string }) => (
  <div className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
    {message}
  </div>
);

export const SectionErrorState = ({ message }: { message: string }) => (
  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
    {message}
  </div>
);
