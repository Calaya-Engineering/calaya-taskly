"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth, getAuthToken } from "@/lib/api";

type OpenItemRedirectProps = {
  id: string;
  type: string;
};

function resolveTargetPath(role: string, type: string, id: string) {
  const normalizedRole = String(role || "").toUpperCase();
  const normalizedType = String(type || "").toLowerCase();
  const hasId = Boolean(String(id || "").trim());

  switch (normalizedType) {
    case "task":
      if (!hasId) {
        if (normalizedRole === "MD") return `/md-dashboard/tasks`;
        if (normalizedRole === "HOD") return `/hod-dashboard/tasks`;
        return `/staff-dashboard/tasks`;
      }
      if (normalizedRole === "MD") return `/md-dashboard/task/${id}`;
      if (normalizedRole === "HOD") return `/hod-dashboard/task/${id}`;
      return `/staff-dashboard/task/${id}`;
    case "event":
    case "meeting":
      if (!hasId) {
        if (normalizedRole === "MD") return `/md-dashboard/events`;
        if (normalizedRole === "HOD") return `/hod-dashboard/events`;
        if (normalizedRole === "SECRETARY") return `/secretary-dashboard/events`;
        return `/staff-dashboard/events`;
      }
      if (normalizedRole === "MD") return `/md-dashboard/event/${id}`;
      if (normalizedRole === "HOD") return `/hod-dashboard/event/${id}`;
      if (normalizedRole === "SECRETARY") return `/secretary-dashboard/event/${id}`;
      return `/staff-dashboard/event/${id}`;
    case "announcement":
      if (!hasId) {
        if (normalizedRole === "MD") return `/md-dashboard/announcements`;
        if (normalizedRole === "HOD") return `/hod-dashboard/announcements`;
        if (normalizedRole === "SECRETARY") return `/secretary-dashboard/announcements`;
        return `/staff-dashboard/announcements`;
      }
      if (normalizedRole === "MD") return `/md-dashboard/announcement/${id}`;
      if (normalizedRole === "HOD") return `/hod-dashboard/announcement/${id}`;
      if (normalizedRole === "SECRETARY") return `/secretary-dashboard/announcement/${id}`;
      return `/staff-dashboard/announcement/${id}`;
    case "tender":
      if (!hasId) {
        if (normalizedRole === "MD") return `/md-dashboard/tenders`;
        if (normalizedRole === "HOD") return `/hod-dashboard/tenders`;
        if (normalizedRole === "SECRETARY") return `/secretary-dashboard/tenders`;
        return `/staff-dashboard/tenders`;
      }
      if (normalizedRole === "MD") return `/md-dashboard/tender/${id}`;
      if (normalizedRole === "HOD") return `/hod-dashboard/tender/${id}`;
      if (normalizedRole === "SECRETARY") return `/secretary-dashboard/tender/${id}`;
      return `/staff-dashboard/tender/${id}`;
    case "report":
      if (normalizedRole === "MD") return `/md-dashboard/reports`;
      if (normalizedRole === "HOD") return `/hod-dashboard/reports`;
      if (normalizedRole === "SECRETARY") return `/secretary-dashboard/reports-archive`;
      return `/staff-dashboard/daily-reports`;
    case "document":
      if (normalizedRole === "MD") return `/md-dashboard/documents`;
      if (normalizedRole === "HOD") return `/hod-dashboard/documents`;
      if (normalizedRole === "SECRETARY") return `/secretary-dashboard/documents`;
      return `/staff-dashboard/documents`;
    case "user":
      if (normalizedRole === "ADMIN") return `/admin-dashboard/users`;
      if (normalizedRole === "HOD") return `/hod-dashboard/department-users`;
      if (normalizedRole === "MD") return `/md-dashboard/notifications`;
      if (normalizedRole === "SECRETARY") return `/secretary-dashboard/profile`;
      return `/staff-dashboard/profile`;
    default:
      if (normalizedRole === "MD") return `/md-dashboard/notifications`;
      if (normalizedRole === "HOD") return `/hod-dashboard/notifications`;
      if (normalizedRole === "SECRETARY") return `/secretary-dashboard/notifications`;
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
