"use client";

import React from "react";

/**
 * Skeleton placeholder shown while a dashboard's data is loading.
 *
 * Mirrors the visual rhythm used by every populated dashboard in this app:
 *   1. Hero card with title + chips + actions
 *   2. Row of 4 stat cards
 *   3. Two-column content (main column + side rail)
 *
 * Keeping the skeleton's geometry in sync with real content prevents a
 * layout jump when the data resolves.
 */

const pulse = "animate-pulse bg-gray-100 rounded-xl";

function HeroSkeleton() {
  return (
    <div
      className="rounded-2xl border border-gray-200/70 bg-white overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="p-6 md:p-8"
        style={{
          background:
            "linear-gradient(135deg, rgba(44,75,155,0.06) 0%, rgba(109,198,223,0.10) 50%, rgba(237,50,55,0.04) 100%)",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex-1 space-y-3">
            <div className="flex gap-2">
              <div className={`${pulse} h-6 w-24`} />
              <div className={`${pulse} h-6 w-20`} />
            </div>
            <div className={`${pulse} h-8 w-72 max-w-full`} />
            <div className={`${pulse} h-4 w-96 max-w-full`} />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className={`${pulse} h-12 w-40`} />
            <div className={`${pulse} h-12 w-40`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      aria-hidden="true"
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-200/70 bg-white p-5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className={`${pulse} h-10 w-10 rounded-2xl`} />
            <div className={`${pulse} h-4 w-12`} />
          </div>
          <div className={`${pulse} h-8 w-16`} />
          <div className={`${pulse} h-3 w-24`} />
        </div>
      ))}
    </div>
  );
}

function ListBlockSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div
      className="rounded-2xl border border-gray-200/70 bg-white p-6 space-y-4"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <div className={`${pulse} h-5 w-40`} />
          <div className={`${pulse} h-3 w-56 max-w-full`} />
        </div>
        <div className={`${pulse} h-8 w-20 shrink-0`} />
      </div>
      <div className="space-y-3 pt-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 border-t border-gray-100 pt-3 first:border-t-0 first:pt-0"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`${pulse} h-10 w-10 rounded-xl shrink-0`} />
              <div className="flex-1 space-y-2 min-w-0">
                <div className={`${pulse} h-4 w-3/4`} />
                <div className={`${pulse} h-3 w-1/2`} />
              </div>
            </div>
            <div className={`${pulse} h-6 w-16 shrink-0`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading dashboard">
      <HeroSkeleton />
      <StatGridSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ListBlockSkeleton rows={4} />
        </div>
        <div className="lg:col-span-1">
          <ListBlockSkeleton rows={3} />
        </div>
      </div>
      <span className="sr-only">Loading dashboard…</span>
    </div>
  );
}
