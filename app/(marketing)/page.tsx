import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/site/Container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { siteConfig } from "@/lib/seo/site";
import { Badge } from "@/components/ui/badge";
import { getRequestLocale } from "@/lib/i18n";
import { t } from "@/lib/translations";

export const metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
};

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = searchParams ? await searchParams : undefined;
  const locale = await getRequestLocale({
    lang: resolved?.lang,
  });
  const tr = t(locale);
  return (
    <div className="metal-bg">
      <Container className="py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="success">{tr.home.badge1}</Badge>
              <Badge variant="default">{tr.home.badge2}</Badge>
              <Badge variant="warning">{tr.home.badge3}</Badge>
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {tr.home.title}
            </h1>
            <p className="mt-4 text-muted max-w-xl text-base leading-relaxed">
              {tr.home.desc}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06))] px-5 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                {tr.home.cta1}
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                {tr.home.cta2}
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Card className="bg-white/5">
                <CardHeader className="p-4 pb-2">
                  <div className="text-xs font-semibold text-muted-2 uppercase">
                    AI Smart Search
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-sm font-semibold">
                    Natural language to product matching
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/5">
                <CardHeader className="p-4 pb-2">
                  <div className="text-xs font-semibold text-muted-2 uppercase">
                    AI Quote Generator
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-sm font-semibold">
                    Estimated price + lead time
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/5">
                <CardHeader className="p-4 pb-2">
                  <div className="text-xs font-semibold text-muted-2 uppercase">
                    Defect Analyzer
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-sm font-semibold">
                    Defect type, causes, solutions
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.12),transparent_40%),radial-gradient(circle_at_90%_30%,rgba(255,255,255,0.08),transparent_50%)] blur-[2px]" />
            <Card className="relative overflow-hidden bg-white/5">
              <CardHeader>
                <div className="text-lg font-semibold">Built for industrial RFQ</div>
                <div className="mt-1 text-sm text-muted">
                  SEO-first pages + production-ready AI lead pipeline
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-muted-2 uppercase">
                      Catalog SEO
                    </div>
                    <div className="mt-2 text-sm font-semibold">
                      Dynamic product pages with JSON-LD
                    </div>
                    <div className="mt-2 text-xs text-muted-2">
                      Rank for `steel casting Thailand`, `metal casting factory`
                      and `OEM casting parts`.
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-muted-2 uppercase">
                      Portal-ready
                    </div>
                    <div className="mt-2 text-sm font-semibold">
                      Quotes and AI usage logs (ERP-lite)
                    </div>
                    <div className="mt-2 text-xs text-muted-2">
                      Internal dashboard for inventory, orders and approval flow.
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-xs font-semibold text-muted-2 uppercase">
                    Industrial visuals
                  </div>
                  <div className="mt-3 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <div className="flex h-full items-center justify-center text-muted-2">
                      Add your factory gallery images here.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

