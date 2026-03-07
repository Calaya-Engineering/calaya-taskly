"use client";

import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { Card, SectionTitle, Pill } from "@/components/dashboard-ui";
import { UserIcon, BuildingIcon } from "@/lib/icons";

export default function AdminDashboard() {
  const quickLinks = [
    { label: "Users", desc: "Manage user accounts", icon: <UserIcon />, path: "/admin-dashboard/users" },
    { label: "Roles", desc: "Manage system roles", icon: <UserIcon />, path: "/admin-dashboard/roles" },
    { label: "Accounts", desc: "User account management", icon: <UserIcon />, path: "/admin-dashboard/accounts" },
    { label: "Departments", desc: "Manage departments", icon: <BuildingIcon />, path: "/admin-dashboard/departments" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Hero - matches MDDashboard */}
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
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--primary-blue)" }}>
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Manage users, roles, accounts, and departments across the system.
            </p>
          </div>
        </Card>

        {/* Quick Actions - matches MDDashboard Quick Actions grid */}
        <Card className="p-6">
          <SectionTitle title="Quick Actions" subtitle="Manage system configuration and users" />
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {quickLinks.map((item) => (
              <Link key={item.path} href={item.path} className="group">
                <div className="p-5 rounded-2xl border border-gray-200/80 bg-white hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(109, 198, 223, 0.18)", color: "var(--primary-blue)" }}
                    >
                      {item.icon}
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-700 transition">Open →</span>
                  </div>
                  <div className="mt-4">
                    <div className="font-extrabold" style={{ color: "var(--primary-blue)" }}>
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
