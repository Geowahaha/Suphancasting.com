import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildProductJsonLd, buildFAQJsonLd } from "@/lib/seo/structuredData";
import { siteConfig } from "@/lib/seo/site";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Container } from "@/components/site/Container";
import { Badge } from "@/components/ui/badge";
import { getRequestLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-shared";
import { t } from "@/lib/translations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const product = await prisma.products.findUnique({
      where: { slug },
      select: {
        name: true,
        slug: true,
        seoTitle: true,
        seoDescription: true,
        description: true,
        category: { select: { name: true } },
      },
    });

    if (!product) return buildMetadata({ title: siteConfig.defaultTitle });

    const title = product.seoTitle ?? product.name;
    const description =
      product.seoDescription ??
      product.description ??
      `${product.name} - steel casting and OEM casting parts from Thailand. Request an RFQ.`;

    return buildMetadata({
      title,
      description,
      canonicalPath: `/products/${product.slug}`,
    });
  } catch {
    return buildMetadata({
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
    });
  }
}

function getStaticFaq(locale: Locale, productName: string, categoryName: string) {
  if (locale === "th") {
    return [
      {
        q: "รองรับวัสดุอะไรบ้างสำหรับงานหล่อเหล็ก?",
        a: "รองรับวัสดุสำหรับ OEM เช่น เหล็กคาร์บอน เหล็กอัลลอย และเหล็กเหนียวตามเงื่อนไขงานจริง ส่งสเปกมาเพื่อยืนยันความเป็นไปได้ในการผลิต",
      },
      {
        q: "รองรับลูกค้าไทยและต่างประเทศหรือไม่?",
        a: "รองรับทั้งในประเทศไทยและต่างประเทศ พร้อมทีมวิศวกรรมช่วยตรวจแบบและค่าความคลาดเคลื่อน",
      },
      {
        q: "คำนวณ lead time อย่างไร?",
        a: "พิจารณาจากความพร้อมวัสดุ งานทำแม่พิมพ์ ข้อกำหนดตรวจสอบ และตารางการผลิต โดยจะยืนยันอีกครั้งหลังทีมวิศวกรรมทบทวน",
      },
      {
        q: "รองรับงานสั่งทำพิเศษและงานแมชชีนเพิ่มเติมไหม?",
        a: "รองรับงานหล่อสั่งทำและสามารถประสานขั้นตอนการผลิตเพิ่มเติมให้เหมาะกับการประกอบปลายทาง",
      },
      {
        q: `ใบเสนอราคาสำหรับ ${productName} มีอะไรบ้าง?`,
        a: `ประกอบด้วยราคาต่อหน่วยโดยประมาณ ระยะเวลา และสมมติฐานหลัก กรุณาแนบแบบ/สเปกเพื่อให้ประเมินได้ตรงความต้องการสำหรับหมวด ${categoryName}`,
      },
    ];
  }
  if (locale === "zh") {
    return [
      {
        q: "钢铸件常用材料有哪些？",
        a: "我们可支持 OEM 常见材料，如碳钢、合金钢和球墨铸铁。请提供规格以确认可制造性。",
      },
      {
        q: "是否服务泰国及海外客户？",
        a: "是的。我们在泰国制造，并可为国内外客户提供图纸与公差工程支持。",
      },
      {
        q: "交期如何估算？",
        a: "交期会依据材料准备、工装需求、检验要求和生产排程评估，最终以工程评审为准。",
      },
      {
        q: "是否支持定制铸造与机加工？",
        a: "支持。我们可承接定制钢铸件/OEM 零件，并协调后续制造工序满足总成需求。",
      },
      {
        q: `${productName} 的报价包含哪些内容？`,
        a: `报价包含预估单价、交期和关键假设。请提供图纸/规格，以便与 ${categoryName} 类目需求准确对齐。`,
      },
    ];
  }
  return [
    {
      q: "What materials do you cast for steel casting parts?",
      a: "We support OEM casting materials typically including carbon steels, alloy steels, and ductile iron depending on the program requirements. Share your specification and we will confirm feasibility.",
    },
    {
      q: "Do you provide OEM casting parts for customers in Thailand and overseas?",
      a: "Yes. We manufacture in Thailand and provide OEM casting components with engineering support for drawing and tolerance requirements.",
    },
    {
      q: "How do you estimate lead time for quotations?",
      a: "We estimate lead time based on material readiness, tooling needs, inspection requirements, and production scheduling. Final lead time is confirmed after engineering review.",
    },
    {
      q: "Can you handle custom casting and machining requirements?",
      a: "Yes. We can support custom steel casting / OEM casting parts and coordinate additional manufacturing steps if needed for your final assembly.",
    },
    {
      q: `What is included when quoting ${productName}?`,
      a: `Your quotation includes an estimated unit price, lead time, and assumptions. Provide your drawings/specs to ensure the estimate aligns with your requirements for ${categoryName}.`,
    },
  ];
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const locale = await getRequestLocale({ lang: resolvedSearchParams?.lang });
  const tr = t(locale);
  const { slug } = await params;
  let product:
    | (Awaited<ReturnType<typeof prisma.products.findUnique>> & {
        category: { name: string };
      })
    | null = null;

  try {
    product = await prisma.products.findUnique({
      where: { slug },
      include: { category: true },
    });
  } catch {
    product = null;
  }

  if (!product) notFound();

  const productUrl =
    `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://suphancasting.com"}` +
    `/products/${product.slug}`;
  const faq = getStaticFaq(locale, product.name, product.category.name);

  const productLd = buildProductJsonLd({
    name: product.name,
    description: product.seoDescription ?? product.description ?? undefined,
    sku: product.sku,
    url: productUrl,
    imageUrl: null,
  });

  const faqLd = buildFAQJsonLd({ mainEntity: faq.map((f) => ({ q: f.q, a: f.a })) });

  return (
    <div className="metal-bg">
      <Container className="py-10">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">{product.category.name}</Badge>
            {product.sku ? <Badge variant="warning">{tr.productDetail.sku}: {product.sku}</Badge> : null}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <p className="mt-3 text-muted max-w-3xl">
            {product.seoDescription ?? product.description ?? tr.productDetail.noDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="text-lg font-semibold">{tr.productDetail.overviewTitle}</div>
                <div className="mt-1 text-sm text-muted-2">
                  {tr.productDetail.overviewSub}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <p className="text-sm text-muted">
                    {product.seoDescription ??
                      product.description ??
                      tr.productDetail.overviewFallback}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-lg font-semibold">{tr.productDetail.specsTitle}</div>
                <div className="mt-1 text-sm text-muted-2">
                  {tr.productDetail.specsSub}
                </div>
              </CardHeader>
              <CardContent>
                {product.specs ? (
                  <pre className="overflow-auto rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-muted-2">
                    {JSON.stringify(product.specs, null, 2)}
                  </pre>
                ) : (
                  <div className="text-sm text-muted-2">
                    {tr.productDetail.noSpecs}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="text-lg font-semibold">{tr.productDetail.rfqTitle}</div>
                <div className="mt-1 text-sm text-muted">
                  {tr.productDetail.rfqSub}
                </div>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/contact?lang=${locale}`}
                  className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  {tr.productDetail.rfqButton}
                </Link>
                <div className="mt-3 text-xs text-muted-2">
                  {tr.productDetail.rfqTip}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-lg font-semibold">{tr.productDetail.faqTitle}</div>
              </CardHeader>
              <CardContent className="space-y-4">
                {faq.slice(0, 3).map((item) => (
                  <div key={item.q}>
                    <div className="text-sm font-semibold">{item.q}</div>
                    <div className="mt-1 text-sm text-muted-2">{item.a}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </Container>
    </div>
  );
}

