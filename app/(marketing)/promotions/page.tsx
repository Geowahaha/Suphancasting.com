import Link from "next/link";

import { Container } from "@/components/site/Container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { prisma } from "@/lib/db/prisma";
import { getRequestLocale } from "@/lib/i18n";
import { getProductImageSrc } from "@/lib/media/productImages";

const PROMO_FALLBACK = [
  { id: "promo-1", tag: "HOT", discount: "-15%", title: "New Buyer Trial Lot", code: "NEWCAST15" },
  { id: "promo-2", tag: "BUNDLE", discount: "-10%", title: "RFQ + Machining Package", code: "BUNDLE10" },
  { id: "promo-3", tag: "FAST", discount: "PRIORITY", title: "Expedite Queue Option", code: "FASTLANE" },
];

export default async function PromotionsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = searchParams ? await searchParams : undefined;
  const locale = await getRequestLocale({ lang: resolved?.lang });
  const isThai = locale === "th";
  const isZh = locale === "zh";

  let featuredProducts: Array<{ id: string; name: string; slug: string; description: string | null }> = [];
  try {
    featuredProducts = await prisma.products.findMany({
      take: 6,
      orderBy: { updatedAt: "desc" },
      select: { id: true, name: true, slug: true, description: true },
    });
  } catch {
    featuredProducts = [];
  }

  return (
    <div className="forge-surface min-h-full">
      <Container className="py-12">
        <section className="mb-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="text-xs font-semibold tracking-[0.2em] text-muted-2 uppercase">
            {isThai ? "โปรโมชันพิเศษ" : isZh ? "限时优惠" : "Special Promotions"}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {isThai
              ? "โปรโมชันสำหรับลูกค้าอุตสาหกรรม"
              : isZh
                ? "面向工业客户的促销方案"
                : "Promotions designed for industrial buyers"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">
            {isThai
              ? "ดีลเรียบง่าย ชัดเจน ใช้ได้จริงกับงาน RFQ เพื่อช่วยลดต้นทุนและเร่งการตัดสินใจ"
              : isZh
                ? "简单透明、可落地的 RFQ 优惠，帮助你降低试单成本并加快决策。"
                : "Simple and clear offers to reduce trial-order cost and speed up RFQ decisions."}
          </p>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PROMO_FALLBACK.map((promo) => (
            <Card key={promo.id} className="border-white/10 bg-white/[0.03]">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase text-muted-2">
                    {promo.tag}
                  </span>
                  <span className="text-sm font-semibold">{promo.discount}</span>
                </div>
                <div className="pt-2 text-base font-semibold">{promo.title}</div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xs text-muted-2">
                  {isThai ? "โค้ดใช้งาน" : isZh ? "优惠码" : "Code"}: {promo.code}
                </div>
                <Link
                  href={`/contact?promo=${promo.code}&lang=${locale}`}
                  className="mt-3 inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  {isThai ? "ใช้โปรโมชันนี้" : isZh ? "使用此优惠" : "Use this offer"}
                </Link>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">
              {isThai ? "สินค้าแนะนำในช่วงโปรโมชัน" : isZh ? "促销期推荐产品" : "Featured products in this promo period"}
            </h2>
            <Link href="/products" className="text-sm text-muted hover:text-foreground transition-colors">
              {isThai ? "ดูทั้งหมด" : isZh ? "查看全部" : "View all"}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {await Promise.all(
              featuredProducts.map(async (p) => {
                const imageSrc = await getProductImageSrc({ slug: p.slug, name: p.name });
                return (
                  <Link key={p.id} href={`/products/${p.slug}`}>
                    <Card className="h-full overflow-hidden border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
                      <div className="aspect-[4/3] w-full overflow-hidden bg-black/20">
                        <img src={imageSrc} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="line-clamp-1 text-base font-semibold">{p.name}</div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="line-clamp-2 text-sm text-muted">
                          {p.description ??
                            (isThai
                              ? "ดูสเปกและส่ง RFQ พร้อมโปรโมชัน"
                              : isZh
                                ? "查看规格并结合优惠发起询价。"
                                : "Open specs and submit RFQ with promotion support.")}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              }),
            )}
          </div>
        </section>
      </Container>
    </div>
  );
}

