"use client";

import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { UserIcon, BuildingIcon, AlertIcon } from "@/lib/icons";

export default function AdminDashboard() {
  const quickLinks = [
    {
      label: "Users",
      desc: "Manage user accounts",
      icon: <UserIcon />,
      path: "/admin-dashboard/users",
      tone: { bg: "var(--tile-blue-bg)", fg: "var(--tile-blue-fg)" },
    },
    {
      label: "Roles",
      desc: "Manage system roles",
      icon: <UserIcon />,
      path: "/admin-dashboard/roles",
      tone: { bg: "var(--tile-orange-bg)", fg: "var(--tile-orange-fg)" },
    },
    {
      label: "Accounts",
      desc: "User account management",
      icon: <UserIcon />,
      path: "/admin-dashboard/accounts",
      tone: { bg: "var(--tile-green-bg)", fg: "var(--tile-green-fg)" },
    },
    {
      label: "Departments",
      desc: "Manage departments",
      icon: <BuildingIcon />,
      path: "/admin-dashboard/departments",
      tone: { bg: "var(--tile-purple-bg)", fg: "var(--tile-purple-fg)" },
    },
    {
      label: "Audit Log",
      desc: "Compliance & system activity",
      icon: <AlertIcon />,
      path: "/admin-dashboard/audit-log",
      tone: { bg: "var(--tile-pink-bg)", fg: "var(--tile-pink-fg)" },
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HERO */}
        <section className="ct-card p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="ct-pill" style={{ background: "var(--tile-blue-bg)", color: "var(--tile-blue-fg)" }}>
                  Admin
                </span>
                <span className="ct-pill" style={{ background: "var(--tile-green-bg)", color: "var(--tile-green-fg)" }}>
                  System Management
                </span>
              </div>
              <h1
                className="text-[28px] md:text-[34px] font-bold tracking-tight leading-[1.1]"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
              >
                Admin Dashboard <span aria-hidden="true">👋</span>
              </h1>
              <p
                className="mt-2 text-[15px]"
                style={{ color: "var(--text-secondary)", maxWidth: "62ch" }}
              >
                Manage users, roles, accounts, and departments across the system.
              </p>
            </div>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="ct-card p-6">
          <div>
            <h2 className="ct-section-title">Quick Actions</h2>
            <p className="ct-section-subtitle">Manage system configuration and users</p>
          </div>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {quickLinks.map((item) => (
              <Link key={item.path} href={item.path} className="block">
                <div className="ct-card ct-card-hover p-5">
                  <div className="flex items-center justify-between">
                    <span
                      className="ct-stat-icon"
                      style={{ backgroundColor: item.tone.bg, color: item.tone.fg }}
                    >
                      {item.icon}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      Open →
                    </span>
                  </div>
                  <div className="mt-4">
                    <div
                      className="text-[16px] font-bold tracking-tight"
                      style={{ color: "var(--text-primary)", letterSpacing: "-0.015em" }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-[13px] mt-1"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
