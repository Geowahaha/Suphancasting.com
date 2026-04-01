import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { prisma } from "@/lib/db/prisma";
import { Container } from "@/components/site/Container";
import { siteConfig } from "@/lib/seo/site";
import { getRequestLocale } from "@/lib/i18n";
import { getProductImageSrc } from "@/lib/media/productImages";

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
    <div className="forge-surface min-h-full">
      <Container className="py-12">
        <section className="mb-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="text-xs font-semibold tracking-[0.2em] text-muted-2 uppercase">
            {isThai ? "คอลเลกชันสินค้า" : isZh ? "产品系列" : "Product Collection"}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {isThai
              ? "เลือกชิ้นส่วนหล่อที่ตรงสเปกคุณ"
              : isZh
                ? "快速找到符合规格的铸件"
                : "Find the right casting parts for your specs"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">
            {isThai
              ? "หน้าแคตตาล็อกที่ออกแบบให้ตัดสินใจง่าย: ภาพชัดเจน รายละเอียดสั้น กระชับ และกดส่ง RFQ ได้ทันที"
              : isZh
                ? "为采购决策设计的目录：清晰图片、简洁说明，并可立即发起询价。"
                : "A cleaner catalog designed for buyers: clear visuals, concise product summaries, and fast RFQ action."}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/contact"
              className="rounded-xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06))] px-4 py-2 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              {isThai ? "ขอใบเสนอราคา" : isZh ? "获取报价" : "Request RFQ"}
            </Link>
            <Link
              href="/promotions"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              {isThai ? "ดูโปรโมชัน" : isZh ? "查看促销" : "View Promotions"}
            </Link>
          </div>
        </section>

        <section className="mb-7">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-2">
            {isThai ? "หมวดสินค้า" : isZh ? "产品分类" : "Categories"}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/products"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold hover:bg-white/10 transition-colors"
            >
              {isThai ? "ทั้งหมด" : isZh ? "全部" : "All"}
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${encodeURIComponent(c.slug)}`}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold hover:bg-white/10 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-muted-2">
              {products.length
                ? isThai
                  ? `พบ ${products.length} รายการ`
                  : isZh
                    ? `共 ${products.length} 项`
                    : `${products.length} items found`
                : isThai
                  ? "ยังไม่พบรายการสินค้า"
                  : isZh
                    ? "暂无商品"
                    : "No products found"}
            </div>
            {q ? (
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground">
                {isThai ? "คำค้นหา" : isZh ? "关键词" : "Query"}: {q}
              </span>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {await Promise.all(
              products.map(async (p) => {
                const imageSrc = await getProductImageSrc({
                  slug: p.slug,
                  name: p.name,
                });
                return (
                  <Link key={p.id} href={`/products/${p.slug}`}>
                    <Card className="h-full overflow-hidden border-white/10 bg-white/[0.03] transition-transform duration-200 hover:-translate-y-1 hover:bg-white/[0.05]">
                      <div className="aspect-[4/3] w-full overflow-hidden bg-black/20">
                        <img
                          src={imageSrc}
                          alt={p.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="line-clamp-1 text-base font-semibold">{p.name}</div>
                        <div className="text-xs text-muted-2">{p.category.name}</div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="line-clamp-2 text-sm text-muted">
                          {p.description ??
                            (isThai
                              ? "กดเพื่อดูสเปกและส่ง RFQ ได้ทันที"
                              : isZh
                                ? "点击查看规格并立即发起询价。"
                                : "Open to view specs and submit RFQ quickly.")}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              }),
            )}
          </div>

          {!products.length ? (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-muted-2">
              {isThai
                ? "เพิ่มสินค้าในฐานข้อมูลเพื่อแสดงในแคตตาล็อกทันที"
                : isZh
                  ? "添加产品数据后，这里会自动显示目录内容。"
                  : "Once products are added to the database, they will appear here automatically."}
            </div>
          ) : null}
        </section>
      </Container>
    </div>
  );
}

