"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth, getAuthToken } from "@/lib/api";
import { getRouteForRole } from "@/lib/auth-config";

type OpenItemRedirectProps = {
  id: string;
  type: string;
};

function resolveTargetPath(role: string, type: string, id: string) {
  const dashboardRoute = getRouteForRole(role);
  const isAdmin = dashboardRoute === "/admin-dashboard";
  const isMD = dashboardRoute === "/md-dashboard";
  const isHOD = dashboardRoute === "/hod-dashboard";
  const isSecretary = dashboardRoute === "/secretary-dashboard";
  const normalizedType = String(type || "").toLowerCase();
  const hasId = Boolean(String(id || "").trim());

  switch (normalizedType) {
    case "task":
      if (!hasId) {
        if (isMD) return `/md-dashboard/tasks`;
        if (isHOD) return `/hod-dashboard/tasks`;
        return `/staff-dashboard/tasks`;
      }
      if (isMD) return `/md-dashboard/task/${id}`;
      if (isHOD) return `/hod-dashboard/task/${id}`;
      return `/staff-dashboard/task/${id}`;
    case "event":
    case "meeting":
      if (!hasId) {
        if (isMD) return `/md-dashboard/events`;
        if (isHOD) return `/hod-dashboard/events`;
        if (isSecretary) return `/secretary-dashboard/events`;
        return `/staff-dashboard/events`;
      }
      if (isMD) return `/md-dashboard/event/${id}`;
      if (isHOD) return `/hod-dashboard/event/${id}`;
      if (isSecretary) return `/secretary-dashboard/event/${id}`;
      return `/staff-dashboard/event/${id}`;
    case "announcement":
      if (!hasId) {
        if (isMD) return `/md-dashboard/announcements`;
        if (isHOD) return `/hod-dashboard/announcements`;
        if (isSecretary) return `/secretary-dashboard/announcements`;
        return `/staff-dashboard/announcements`;
      }
      if (isMD) return `/md-dashboard/announcement/${id}`;
      if (isHOD) return `/hod-dashboard/announcement/${id}`;
      if (isSecretary) return `/secretary-dashboard/announcement/${id}`;
      return `/staff-dashboard/announcement/${id}`;
    case "tender":
      if (!hasId) {
        if (isMD) return `/md-dashboard/tenders`;
        if (isHOD) return `/hod-dashboard/tenders`;
        if (isSecretary) return `/secretary-dashboard/tenders`;
        return `/staff-dashboard/tenders`;
      }
      if (isMD) return `/md-dashboard/tender/${id}`;
      if (isHOD) return `/hod-dashboard/tender/${id}`;
      if (isSecretary) return `/secretary-dashboard/tender/${id}`;
      return `/staff-dashboard/tender/${id}`;
    case "report":
      if (isMD) return `/md-dashboard/reports`;
      if (isHOD) return `/hod-dashboard/reports`;
      if (isSecretary) return `/secretary-dashboard/reports-archive`;
      return `/staff-dashboard/daily-reports`;
    case "document":
      if (isMD) return `/md-dashboard/documents`;
      if (isHOD) return `/hod-dashboard/documents`;
      if (isSecretary) return `/secretary-dashboard/documents`;
      return `/staff-dashboard/documents`;
    case "user":
      if (isAdmin) return `/admin-dashboard/users`;
      if (isHOD) return `/hod-dashboard/department-users`;
      if (isMD) return `/md-dashboard/notifications`;
      if (isSecretary) return `/secretary-dashboard/profile`;
      return `/staff-dashboard/profile`;
    default:
      if (isMD) return `/md-dashboard/notifications`;
      if (isHOD) return `/hod-dashboard/notifications`;
      if (isSecretary) return `/secretary-dashboard/notifications`;
      return `/staff-dashboard/notifications`;
  }
}

export default function OpenItemRedirect({ id, type }: OpenItemRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    const redirect = async () => {
      try {
        const response = await fetchWithAuth("/api/me");
        if (!response.ok) {
          router.replace("/login");
          return;
        }

        const me = await response.json();
        router.replace(resolveTargetPath(me.role, type, id));
      } catch {
        router.replace("/login");
      }
    };

    void redirect();
  }, [id, router, type]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-600">
      Opening item...
    </div>
  );
}
