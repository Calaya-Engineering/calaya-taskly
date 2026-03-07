import { BadgeProvider } from "@/contexts/BadgeContext";

export default function HODDashboardLayout({ children }) {
  return <BadgeProvider>{children}</BadgeProvider>;
}
