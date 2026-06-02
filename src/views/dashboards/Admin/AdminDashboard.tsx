"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import { Card, SectionTitle, Pill } from "@/components/dashboard-ui";
import { UserIcon, BuildingIcon } from "@/lib/icons";
import { fetchWithAuth } from "@/lib/api";

type AdminStats = {
  users: number | null;
  roles: number | null;
  departments: number | null;
  pendingAccessRequests: number | null;
};

const INITIAL_STATS: AdminStats = {
  users: null,
  roles: null,
  departments: null,
  pendingAccessRequests: null,
};

function formatCount(value: number | null): string {
  if (value === null) return "—";
  return value.toLocaleString();
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>(INITIAL_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [usersRes, rolesRes, departmentsRes, accessRes] = await Promise.allSettled([
        fetchWithAuth("/api/users?limit=300").then((r) => (r.ok ? r.json() : [])),
        fetchWithAuth("/api/roles").then((r) => (r.ok ? r.json() : [])),
        fetchWithAuth("/api/departments").then((r) => (r.ok ? r.json() : [])),
        fetchWithAuth("/api/access-requests?status=PENDING").then((r) => (r.ok ? r.json() : [])),
      ]);

      const usersCount =
        usersRes.status === "fulfilled" && Array.isArray(usersRes.value) ? usersRes.value.length : null;
      const rolesCount =
        rolesRes.status === "fulfilled" && Array.isArray(rolesRes.value) ? rolesRes.value.length : null;
      const departmentsCount =
        departmentsRes.status === "fulfilled" && Array.isArray(departmentsRes.value)
          ? departmentsRes.value.length
          : null;
      const pendingRequestsCount =
        accessRes.status === "fulfilled" && Array.isArray(accessRes.value) ? accessRes.value.length : null;

      setStats({
        users: usersCount,
        roles: rolesCount,
        departments: departmentsCount,
        pendingAccessRequests: pendingRequestsCount,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const quickLinks = [
    {
      label: "Users",
      desc: "Manage user accounts",
      icon: <UserIcon />,
      path: "/admin-dashboard/users",
      count: stats.users,
      tone: "default" as const,
    },
    {
      label: "Roles",
      desc: "Manage system roles",
      icon: <UserIcon />,
      path: "/admin-dashboard/roles",
      count: stats.roles,
      tone: "default" as const,
    },
    {
      label: "Departments",
      desc: "Manage departments",
      icon: <BuildingIcon />,
      path: "/admin-dashboard/departments",
      count: stats.departments,
      tone: "default" as const,
    },
    {
      label: "Access Requests",
      desc: "Review pending sign-ups",
      icon: <UserIcon />,
      path: "/admin-dashboard/access-requests",
      count: stats.pendingAccessRequests,
      tone:
        (stats.pendingAccessRequests ?? 0) > 0
          ? ("warn" as const)
          : ("success" as const),
    },
  ];

  if (loading && stats.users === null) {
    return (
      <AdminLayout>
        <DashboardSkeleton />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
            <button
              type="button"
              onClick={fetchStats}
              className="ml-3 font-semibold underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Hero */}
        <Card className="overflow-hidden">
          <div
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(44,75,155,0.10) 0%, rgba(109,198,223,0.18) 50%, rgba(237,50,55,0.06) 100%)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Pill>Admin</Pill>
              <Pill tone="success">System Management</Pill>
              {(stats.pendingAccessRequests ?? 0) > 0 ? (
                <Pill tone="warn">
                  {stats.pendingAccessRequests} pending request
                  {stats.pendingAccessRequests === 1 ? "" : "s"}
                </Pill>
              ) : null}
            </div>
            <h1
              className="text-2xl md:text-3xl font-extrabold tracking-tight"
              style={{ color: "var(--primary-blue)" }}
            >
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Manage users, roles, accounts, and departments across the system.
            </p>
          </div>
        </Card>

        {/* Quick Actions with live counts */}
        <Card className="p-6">
          <SectionTitle
            title="Quick Actions"
            subtitle="Manage system configuration and users"
          />
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {quickLinks.map((item) => (
              <Link key={item.path} href={item.path} className="group">
                <div className="p-5 rounded-2xl border border-gray-200/80 bg-white hover:bg-gray-50 transition h-full">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: "rgba(109, 198, 223, 0.18)",
                        color: "var(--primary-blue)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-700 transition">
                      Open →
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-3xl font-extrabold"
                        style={{ color: "var(--primary-blue)" }}
                      >
                        {formatCount(item.count)}
                      </span>
                      {item.tone === "warn" && (item.count ?? 0) > 0 ? (
                        <Pill tone="warn">Action needed</Pill>
                      ) : null}
                    </div>
                    <div
                      className="font-extrabold mt-1"
                      style={{ color: "var(--primary-blue)" }}
                    >
                      {item.label}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{item.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
