"use client";
import React from "react";
import { BadgeProvider } from "@/contexts/BadgeContext";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";

export default function MDDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <BadgeProvider>
      <Layout menuItems={MDMenuItems} userRole="MD">
        {children}
      </Layout>
    </BadgeProvider>
  );
}
