"use client";
import React from "react";
import Layout from "@/components/Layout";

export default function SecretaryDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout menuItems={[]} userRole="Secretary">
      {children}
    </Layout>
  );
}
