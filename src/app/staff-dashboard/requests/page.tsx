"use client";

import dynamic from "next/dynamic";

const StaffRequest = dynamic(() => import("../../../views/dashboards/Staff/StaffRequest"), {
  ssr: false,
  loading: () => <div className="p-6">Loading...</div>,
});

export default function Page() {
  return <StaffRequest />;
}
