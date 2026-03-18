"use client";
import React from "react";
import Layout from "@/components/Layout";
import { StaffMenuItems } from "@/utils/menus";

export default function StaffDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout menuItems={StaffMenuItems} userRole="Staff">
      {children}
    </Layout>
  );
}
