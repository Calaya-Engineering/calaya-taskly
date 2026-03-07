import { BadgeProvider } from "@/contexts/BadgeContext";

export default function AdminDashboardLayout({ children }) {
  return <BadgeProvider>{children}</BadgeProvider>;
}

