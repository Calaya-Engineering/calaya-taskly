import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
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
        <AuthProvider>{children}</AuthProvider>
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
