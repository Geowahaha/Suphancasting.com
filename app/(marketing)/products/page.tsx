import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { prisma } from "@/lib/db/prisma";
import { Container } from "@/components/site/Container";
import { siteConfig } from "@/lib/seo/site";
import { getRequestLocale } from "@/lib/i18n";

export const metadata = {
  title: siteConfig.defaultTitle,
  description:
    "Explore steel casting and OEM casting parts manufactured in Thailand. Request an RFQ for quotations and fast lead times.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<
    Record<string, string | string[] | undefined>
  >;
}) {
  const resolvedSearchParams = searchParams
    ? await searchParams
    : undefined;
  const categorySlugRaw = resolvedSearchParams?.category;
  const categorySlug = Array.isArray(categorySlugRaw)
    ? categorySlugRaw[0]
    : categorySlugRaw;
  const qRaw = resolvedSearchParams?.q;
  const q = Array.isArray(qRaw) ? qRaw[0] : qRaw;
  const locale = await getRequestLocale({ lang: resolvedSearchParams?.lang });
  const isThai = locale === "th";
  const isZh = locale === "zh";

  let categories: Array<{ id: string; name: string; slug: string }> = [];
  let products:
    | Array<{
        id: string;
        name: string;
        slug: string;
        description: string | null;
        category: { name: string };
      }>
    | [] = [];

  try {
    categories = await prisma.categories.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true },
      take: 20,
    });

    const where = categorySlug
      ? {
          category: {
            slug: { equals: categorySlug },
          },
        }
      : {};

    const whereQ = q
      ? {
          searchText: {
            contains: q,
            mode: "insensitive",
          },
        }
      : {};

    products = await prisma.products.findMany({
      where: {
        ...(where as object),
        ...(whereQ as object),
      },
      take: 24,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        category: { select: { name: true } },
      },
    });
  } catch {
    categories = [];
    products = [];
  }

  return (
    <div className="metal-bg">
      <Container className="py-10">
        <div className="mb-8">
          <div className="text-xs font-semibold tracking-widest text-muted-2 uppercase">
            {isThai ? "แคตตาล็อกงานหล่อเหล็ก" : isZh ? "钢铸件目录" : "Steel Casting Catalog"}
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {isThai ? "สินค้าและชิ้นส่วนหล่อ OEM" : isZh ? "产品与 OEM 铸造零件" : "Products & OEM Casting Parts"}
          </h1>
          <p className="mt-3 text-muted max-w-2xl">
            Search our manufacturing catalog for steel casting parts and
            OEM casting components. Each product detail page includes SEO-ready metadata and structured data.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <div className="text-sm font-semibold">Filter by category</div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link
                href="/products"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                All categories
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/products?category=${encodeURIComponent(c.slug)}`}
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm font-semibold">Browse products</div>
                <div className="text-xs text-muted-2">
                  {products.length ? `${products.length} results` : "No results"}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-5 flex flex-wrap gap-2">
                {q ? (
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground">
                    Query: {q}
                  </span>
                ) : null}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {products.map((p) => (
                  <Link key={p.id} href={`/products/${p.slug}`}>
                    <Card className="h-full hover:bg-white/5 transition-colors">
                      <CardHeader className="pb-3">
                        <div className="text-sm font-semibold">{p.name}</div>
                        <div className="mt-1 text-xs text-muted-2">
                          {p.category.name}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-sm text-muted line-clamp-3">
                          {p.description ?? "Request an RFQ for specifications."}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {!products.length ? (
                <div className="mt-8 text-sm text-muted-2">
                  Products catalog will appear here once you populate the database (Prisma + Supabase).
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}

