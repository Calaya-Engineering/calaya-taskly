"use client";

import React from "react";

const SkeletonPulse = () => (
  <div className="animate-pulse bg-gray-200 rounded-2xl w-full h-full" />
);

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Hero Skeleton */}
      <div className="h-48 rounded-2xl bg-white border border-gray-200/70 p-8 space-y-4">
        <div className="w-1/4 h-8 bg-gray-100 rounded-lg animate-pulse" />
        <div className="w-1/2 h-4 bg-gray-50 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="w-24 h-10 bg-gray-100 rounded-xl animate-pulse" />
          <div className="w-24 h-10 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 rounded-2xl bg-white border border-gray-200/70 p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl animate-pulse" />
              <div className="w-16 h-4 bg-gray-50 rounded animate-pulse" />
            </div>
            <div className="w-full h-6 bg-gray-100 rounded animate-pulse" />
            <div className="w-3/4 h-4 bg-gray-50 rounded animate-pulse" />
            <div className="pt-4 border-t border-gray-100 flex justify-between">
              <div className="w-20 h-4 bg-gray-50 rounded animate-pulse" />
              <div className="w-20 h-4 bg-gray-50 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Skeleton */}
      <div className="h-32 rounded-2xl bg-white border border-gray-200/70 p-6 flex items-center justify-between">
        <div className="space-y-3 w-1/3">
          <div className="w-full h-5 bg-gray-100 rounded animate-pulse" />
          <div className="w-1/2 h-4 bg-gray-50 rounded animate-pulse" />
        </div>
        <div className="w-12 h-12 bg-gray-100 rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}
