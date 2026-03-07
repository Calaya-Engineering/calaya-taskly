import { BadgeProvider } from "@/contexts/BadgeContext";

export default function StaffDashboardLayout({ children }) {
  return <BadgeProvider>{children}</BadgeProvider>;
}
