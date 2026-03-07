import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://calayaengineering.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/request-access"],
        disallow: [
          "/api/",
          "/admin-dashboard",
          "/md-dashboard",
          "/hod-dashboard",
          "/staff-dashboard",
          "/secretary-dashboard",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
