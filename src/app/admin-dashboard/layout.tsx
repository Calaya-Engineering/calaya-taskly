"use client";
import React from "react";
import { BadgeProvider } from "@/contexts/BadgeContext";
import Layout from "@/components/Layout";
import { AdminMenuItems } from "@/utils/menus";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <BadgeProvider>
      <Layout menuItems={AdminMenuItems} userRole="Admin">
        {children}
      </Layout>
    </BadgeProvider>
  );
}

