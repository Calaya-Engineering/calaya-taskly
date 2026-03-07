import { BadgeProvider } from "@/contexts/BadgeContext";

export default function SecretaryDashboardLayout({ children }) {
  return <BadgeProvider>{children}</BadgeProvider>;
}
