"use client";
import React from "react";

const SkeletonItem = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200/60 rounded-2xl ${className}`} />
);

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Hero Skeleton */}
      <div className="bg-white border border-gray-200/70 rounded-2xl overflow-hidden shadow-none">
        <div className="p-6 md:p-8 space-y-4">
          <div className="flex gap-2">
            <SkeletonItem className="h-6 w-24" />
            <SkeletonItem className="h-6 w-20" />
          </div>
          <SkeletonItem className="h-10 w-2/3 md:w-1/3" />
          <SkeletonItem className="h-4 w-full md:w-1/2" />
          
          <div className="flex flex-wrap gap-3 pt-2">
            <SkeletonItem className="h-12 w-32" />
            <SkeletonItem className="h-12 w-32" />
          </div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-gray-200/70 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <SkeletonItem className="h-4 w-20" />
                <SkeletonItem className="h-8 w-12" />
              </div>
              <SkeletonItem className="h-12 w-12" />
            </div>
            <SkeletonItem className="h-2 w-full" />
            <SkeletonItem className="h-4 w-24" />
          </div>
        ))}
      </div>

      {/* Two Column Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white border border-gray-200/70 rounded-2xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <SkeletonItem className="h-6 w-32" />
                <SkeletonItem className="h-4 w-48" />
              </div>
              <SkeletonItem className="h-10 w-24" />
            </div>
            
            <div className="space-y-3">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="flex gap-4 p-4 rounded-xl border border-gray-100">
                  <SkeletonItem className="h-10 w-10 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <SkeletonItem className="h-4 w-3/4" />
                    <SkeletonItem className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
