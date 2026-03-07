"use client";
import dynamic from "next/dynamic";

const MDAllTasks = dynamic(() => import("../../../views/dashboards/MD/MDAllTasks"), {
  loading: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2C4B9B] border-t-transparent" />
    </div>
  ),
});

export default function Page() {
  return <MDAllTasks />;
}
