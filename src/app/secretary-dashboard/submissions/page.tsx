"use client";

import dynamic from "next/dynamic";

const SecretaryRequest = dynamic(() => import("../../../views/dashboards/Secretary/SecretaryRequest"), {
  ssr: false,
  loading: () => <div className="p-6">Loading...</div>,
});

export default function Page() {
  return <SecretaryRequest />;
}
