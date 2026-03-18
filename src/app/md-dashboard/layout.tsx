"use client";
import React from "react";
import Layout from "@/components/Layout";
import { MDMenuItems } from "@/utils/menus";

export default function MDDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout menuItems={MDMenuItems} userRole="MD">
      {children}
    </Layout>
  );
}
