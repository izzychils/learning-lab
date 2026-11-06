import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/signup", "/onboarding", "/forgot-password", "/dashboard"],
    },
    sitemap: "https://simulith.online/sitemap.xml",
    host: "https://simulith.online",
  };
}
