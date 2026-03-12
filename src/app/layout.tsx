import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { BadgeProvider } from "@/contexts/BadgeContext";
import { Toaster } from "sonner";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://calayaengineering.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Calaya Taskly",
    template: "%s | Calaya Taskly",
  },
  description: "Calaya Taskly is an oil and gas task management platform for daily operations, documents, reports, approvals, and team collaboration.",
  applicationName: "Calaya Taskly",
  keywords: [
    "oil and gas task management",
    "operations dashboard",
    "daily reports",
    "workflow approvals",
    "department collaboration",
  ],
  authors: [{ name: "Calaya Engineering Services" }],
  creator: "Calaya Engineering Services",
  publisher: "Calaya Engineering Services",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Calaya Taskly",
    title: "Calaya Taskly",
    description: "Oil and gas operations platform for task execution, reporting, and approvals.",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Calaya Taskly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calaya Taskly",
    description: "Oil and gas operations platform for task execution, reporting, and approvals.",
    images: ["/image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/image.png",
    apple: "/image.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <BadgeProvider>
            {children}
          </BadgeProvider>
        </AuthProvider>
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
