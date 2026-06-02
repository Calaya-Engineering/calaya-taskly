"use client";
import React from "react";
import Layout from "@/components/Layout";
import { SecretaryMenuItems } from "@/utils/menus";

export default function SecretaryDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout menuItems={SecretaryMenuItems} userRole="Secretary">
      {children}
    </Layout>
  );
}
