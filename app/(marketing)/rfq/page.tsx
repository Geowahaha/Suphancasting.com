import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getQuoteById } from "@/lib/db/quotes";
import { siteConfig } from "@/lib/seo/site";
import { submitRFQAction, runAiQuoteGeneratorAction } from "../contact/actions";
import { Badge } from "@/components/ui/badge";
import { getRequestLocale } from "@/lib/i18n";
import { prisma } from "@/lib/db/prisma";
import { AutoQuoteEngineForm } from "../contact/AutoQuoteEngineForm";

export default async function RfqPage({
  searchParams,
}: {
  searchParams?: Promise<
    Record<string, string | string[] | undefined>
  >;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const locale = await getRequestLocale({ lang: resolvedSearchParams?.lang });
  const isThai = locale === "th";
  const isZh = locale === "zh";
  const quoteIdRaw = resolvedSearchParams?.quoteId;
  const quoteId = Array.isArray(quoteIdRaw) ? quoteIdRaw[0] : quoteIdRaw;

  let quote: Awaited<ReturnType<typeof getQuoteById>> | null = null;
  let materials: Array<{ id: string; name: string }> = [];
  if (quoteId) {
    try {
      quote = await getQuoteById(quoteId);
      if (!quote) quote = null;
    } catch {
      quote = null;
    }
  }
  try {
    materials = await prisma.materials.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
      take: 30,
    });
  } catch {
    materials = [];
  }

  return (
    <div className="forge-surface min-h-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-2">
            {isThai ? "ระบบสร้างลีดอุตสาหกรรม" : isZh ? "工业线索获取" : "Industrial Lead Generation"}
          </div>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight">
            {isThai
              ? "ขอใบเสนอราคา (RFQ) + ประเมินด้วย AI"
              : isZh
                ? "提交询价 (RFQ) + AI 估算"
                : "Request a quote (RFQ) + AI-assisted estimate"}
          </h1>
          <p className="text-muted max-w-2xl text-base leading-relaxed">
            Suphancasting.com helps you get accurate lead times for steel casting
            and OEM casting parts. Share your specs and drawings, then get an
            instant AI price estimate.
          </p>
        </div>

        {quote?.id ? (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">Quote submitted</div>
                  <div className="mt-1 text-xs text-muted-2">
                    Quote ID: <span className="font-mono">{quote.id}</span>
                  </div>
                </div>
                <Badge variant="success">
                  Status: {quote.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <div className="text-xs text-muted-2">Estimated price</div>
                  <div className="mt-1 text-lg font-semibold">
                    {quote.estimatedPriceUsd ? `$${quote.estimatedPriceUsd}` : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-2">Lead time</div>
                  <div className="mt-1 text-lg font-semibold">
                    {quote.leadTimeDays ? `${quote.leadTimeDays} days` : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-2">Company</div>
                  <div className="mt-1 text-lg font-semibold">
                    {quote.company?.name ?? "—"}
                  </div>
                </div>
              </div>
              {quote.quoteSummary ? (
                <div className="mt-4 text-sm text-muted">
                  {quote.quoteSummary}
                </div>
              ) : null}
            </CardContent>
          </Card>
        ) : null}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="text-lg font-semibold">Submit an RFQ</div>
              <p className="mt-1 text-sm text-muted">
                We will send a quotation request to your factory pipeline.
              </p>
            </CardHeader>
            <CardContent>
              <form action={submitRFQAction} className="flex flex-col gap-4">
                <Input name="companyName" placeholder="Company name" required />
                <Input name="contactName" placeholder="Contact name" required />
                <Input name="email" placeholder="Email" type="email" required />
                <Textarea
                  name="specsText"
                  placeholder="Specs / drawing notes (materials, casting process, tolerance, quantity, target delivery date)"
                  required
                />
                <Button type="submit">{isThai ? "ส่ง RFQ" : isZh ? "提交询价" : "Submit RFQ"}</Button>
                <div className="text-xs text-muted-2">
                  By submitting, you agree to receive a quotation follow-up from{" "}
                  {siteConfig.name}.
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-lg font-semibold">AI Quote Generator</div>
              <p className="mt-1 text-sm text-muted">
                Instant estimated price + lead time based on your specs.
              </p>
            </CardHeader>
            <CardContent>
              <form
                action={runAiQuoteGeneratorAction}
                className="flex flex-col gap-4"
              >
                <Input name="companyName" placeholder="Company name" required />
                <Input name="contactName" placeholder="Contact name" required />
                <Input name="email" placeholder="Email" type="email" required />
                <Input
                  name="productId"
                  placeholder="Optional product ID (from our catalog)"
                />
                <Textarea
                  name="specsText"
                  placeholder="Upload-ready specs / drawing notes (materials, casting process, tolerance, quantity, heat treatment, surface finish, target delivery date)"
                  required
                />
                <Button type="submit">{isThai ? "สร้างการประเมินด้วย AI" : isZh ? "生成 AI 估算" : "Generate AI Estimate"}</Button>
                <div className="text-xs text-muted-2">
                  Estimates are for lead-time planning and quoting. Final price
                  depends on engineering review and final drawings.
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8" id="quote-tool">
          <CardHeader>
            <div className="text-lg font-semibold">
              {isThai
                ? "Auto-Quotation Engine (Deterministic + AI)"
                : isZh
                  ? "自动报价引擎（确定性成本 + AI 解析）"
                  : "Auto-Quotation Engine (Deterministic + AI)"}
            </div>
            <p className="mt-1 text-sm text-muted">
              {isThai
                ? "AI ใช้แค่แยกสเปก แล้วให้ cost engine คำนวณต้นทุนจริงแบบตรวจสอบได้"
                : isZh
                  ? "AI 仅用于解析规格，价格由可审计的成本引擎计算"
                  : "AI only extracts specs; final price is calculated by a deterministic, auditable cost engine."}
            </p>
          </CardHeader>
          <CardContent>
            <AutoQuoteEngineForm locale={locale} materials={materials} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
