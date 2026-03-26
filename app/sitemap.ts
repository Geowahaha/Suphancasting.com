import { prisma } from "@/lib/db/prisma";
import { staticBlogPosts } from "@/lib/content/blog";

function safeBaseUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://suphancasting.com";
  return url.replace(/\/+$/, "");
}

export default async function sitemap() {
  const baseUrl = safeBaseUrl();

  const staticRoutes = [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/products`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/contact`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/blog`, lastModified: new Date().toISOString() },
  ];

  const blogRoutes = staticBlogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt).toISOString() : new Date().toISOString(),
  }));

  let productRoutes: Array<{ url: string; lastModified: string }> = [];
  try {
    const products = await prisma.products.findMany({
      select: { slug: true, updatedAt: true, createdAt: true },
      take: 500,
    });
    productRoutes = products.map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: (p.updatedAt ?? p.createdAt).toISOString(),
    }));
  } catch {
    productRoutes = [];
  }

  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}

