"use client";
import React from "react";
import { BadgeProvider } from "@/contexts/BadgeContext";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";

export default function HODDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <BadgeProvider>
      <Layout menuItems={HODMenuItems} userRole="HOD">
        {children}
      </Layout>
    </BadgeProvider>
  );
}
