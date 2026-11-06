import type { MetadataRoute } from "next";

const publicPaths = [
  "/",
  "/about",
  "/contact",
  "/demo",
  "/for-educators",
  "/glossary",
  "/legal/privacy",
  "/legal/terms",
  "/pricing",
  "/products",
  "/simulations",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: `https://simulith.online${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
