"use client";
import React from "react";
import Layout from "@/components/Layout";
import { AdminMenuItems } from "@/utils/menus";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout menuItems={AdminMenuItems} userRole="Admin">
      {children}
    </Layout>
  );
}
