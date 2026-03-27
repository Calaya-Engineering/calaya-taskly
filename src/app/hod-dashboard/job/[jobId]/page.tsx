"use client";
import dynamic from "next/dynamic";

const HODJobDetail = dynamic(() => import("../../../../views/dashboards/HOD/HODJobDetail"), {
  loading: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2C4B9B] border-t-transparent" />
    </div>
  ),
});

export default function Page() {
  return <HODJobDetail />;
}
