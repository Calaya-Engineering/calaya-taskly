"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { AdminMenuItems } from "@/utils/menus";
import { getRouteForRole } from "@/lib/auth-config";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (user?.role !== "Admin") {
      router.replace(getRouteForRole(user?.role || "Staff"));
    }
  }, [loading, isAuthenticated, user?.role, router]);

  if (loading || !user || user.role !== "Admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <Layout menuItems={AdminMenuItems} userRole="Admin">
      {children}
    </Layout>
  );
}
