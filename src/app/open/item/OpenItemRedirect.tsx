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

  switch (normalizedType) {
    case "task":
      if (normalizedRole === "MD") return `/md-dashboard/task/${id}`;
      if (normalizedRole === "HOD") return `/hod-dashboard/task/${id}`;
      return `/staff-dashboard/task/${id}`;
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
