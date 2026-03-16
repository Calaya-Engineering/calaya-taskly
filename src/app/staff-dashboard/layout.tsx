"use client";
import React from "react";
import { BadgeProvider } from "@/contexts/BadgeContext";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";

export default function StaffDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <BadgeProvider>
      <Layout menuItems={StaffMenuItems} userRole="Staff">
        {children}
      </Layout>
    </BadgeProvider>
  );
}
