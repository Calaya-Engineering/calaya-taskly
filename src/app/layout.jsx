import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { BadgeProvider } from "@/contexts/BadgeContext";
import { Toaster } from "sonner";

export const metadata = {
  title: "Calaya",
  description: "Oil & Gas Task Management System",
  icons: {
    icon: "/image.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <BadgeProvider>{children}</BadgeProvider>
        </AuthProvider>
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
