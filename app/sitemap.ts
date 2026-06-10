import { STITCH_PAGES } from "@/lib/stitch/manifest";

function safeBaseUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://suphancasting.com";
  return url.replace(/\/+$/, "");
}

export default async function sitemap() {
  const baseUrl = safeBaseUrl();
  const now = new Date().toISOString();

  const staticRoutes = [
    "/",
    "/designs",
    "/services",
    "/rfq",
    "/products",
    "/promotions",
    "/about",
    "/contact",
    "/blog",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));

  const designRoutes = STITCH_PAGES.map((p) => ({
    url: `${baseUrl}/designs/${p.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...designRoutes];
}
