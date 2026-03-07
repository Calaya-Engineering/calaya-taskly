import { BadgeProvider } from "@/contexts/BadgeContext";

export default function MDDashboardLayout({ children }) {
  return <BadgeProvider>{children}</BadgeProvider>;
}
