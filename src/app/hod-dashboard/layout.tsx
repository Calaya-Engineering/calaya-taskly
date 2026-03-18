"use client";
import React from "react";
import Layout from "@/components/Layout";
import { HODMenuItems } from "@/utils/menus";

export default function HODDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout menuItems={HODMenuItems} userRole="HOD">
      {children}
    </Layout>
  );
}
