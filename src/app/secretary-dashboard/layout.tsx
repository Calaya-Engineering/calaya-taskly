"use client";
import React from "react";
import { BadgeProvider } from "@/contexts/BadgeContext";
import Layout from "@/components/Layout";

export default function SecretaryDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <BadgeProvider>
      <Layout menuItems={[]} userRole="Secretary">
        {children}
      </Layout>
    </BadgeProvider>
  );
}
