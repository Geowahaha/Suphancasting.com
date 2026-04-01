import { Container } from "@/components/site/Container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/seo/site";
import { getRequestLocale } from "@/lib/i18n";
import { t } from "@/lib/translations";

export const metadata = {
  title: `About | ${siteConfig.fullName}`,
  description:
    "Suphancasting is a steel casting / manufacturing factory in Thailand providing OEM casting parts with reliable lead times.",
};

export default async function AboutPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = searchParams ? await searchParams : undefined;
  const locale = await getRequestLocale({ lang: resolved?.lang });
  const tr = t(locale);
  const isThai = locale === "th";
  const isZh = locale === "zh";

  const title = isThai
    ? "เกี่ยวกับ Suphancasting"
    : isZh
      ? "关于 Suphancasting"
      : "About Suphancasting";
  return (
    <div className="forge-surface min-h-full">
      <Container className="py-10">
        <div className="mb-8" id="company">
          <Badge variant="default">{isThai ? "อุตสาหกรรม B2B" : isZh ? "工业 B2B" : "Industrial B2B"}</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-muted max-w-3xl">
            {isThai
              ? "เราให้บริการงานหล่อเหล็กและชิ้นส่วนหล่อ OEM สำหรับลูกค้าอุตสาหกรรม โดยเน้น lead time ที่คาดการณ์ได้ คุณภาพคงที่ และการสื่อสารที่ชัดเจนตั้งแต่ RFQ ถึงการจัดส่ง"
              : isZh
                ? "我们为工业客户提供钢铸件与 OEM 铸造零件，强调可预测交期、稳定质量与从 RFQ 到交付的清晰沟通。"
                : "We provide steel casting and OEM casting parts for customers requiring predictable lead times, stable quality control, and clear communication from RFQ to shipment."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="text-lg font-semibold">Quality control</div>
              <div className="text-sm text-muted mt-1">
                Inspection-driven quoting and reporting.
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted">
              We align material readiness, inspection steps, and scheduling to
              reduce lead time uncertainty for OEM buyers.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="text-lg font-semibold">OEM casting parts</div>
              <div className="text-sm text-muted mt-1">
                Drawing-first manufacturing support.
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted">
              Share your drawings and tolerances. We generate structured RFQ
              details and coordinate manufacturing steps accordingly.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="text-lg font-semibold">AI-assisted lead pipeline</div>
              <div className="text-sm text-muted mt-1">
                Faster RFQ review for your team.
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted">
              Natural language search and instant quote estimates help
              buyers shortlist the right casting programs quickly.
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 space-y-6" id="services">
          <Card>
            <CardHeader>
              <div className="text-lg font-semibold">{tr.aboutPage.qcds.title}</div>
              <div className="mt-1 text-sm text-muted">{tr.aboutPage.qcds.subtitle}</div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-muted-2">
                  <div className="font-semibold text-foreground">{tr.aboutPage.qcds.quality}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-muted-2">
                  <div className="font-semibold text-foreground">{tr.aboutPage.qcds.cost}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-muted-2">
                  <div className="font-semibold text-foreground">{tr.aboutPage.qcds.delivery}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-muted-2">
                  <div className="font-semibold text-foreground">{tr.aboutPage.qcds.service}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-lg font-semibold">
                {tr.aboutPage.techJourney.title}
              </div>
              <div className="mt-1 text-sm text-muted">{tr.aboutPage.techJourney.subtitle}</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: tr.aboutPage.techJourney.step1Title, desc: tr.aboutPage.techJourney.step1Desc },
                  { title: tr.aboutPage.techJourney.step2Title, desc: tr.aboutPage.techJourney.step2Desc },
                  { title: tr.aboutPage.techJourney.step3Title, desc: tr.aboutPage.techJourney.step3Desc },
                  { title: tr.aboutPage.techJourney.step4Title, desc: tr.aboutPage.techJourney.step4Desc },
                  { title: tr.aboutPage.techJourney.step5Title, desc: tr.aboutPage.techJourney.step5Desc },
                ].map((s) => (
                  <div key={s.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold">{s.title}</div>
                    <div className="mt-1 text-sm text-muted-2">{s.desc}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-lg font-semibold">{tr.aboutPage.media.title}</div>
              <div className="mt-1 text-sm text-muted">{tr.aboutPage.media.videoTitle}</div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <img
                  src="https://commons.wikimedia.org/wiki/Special:FilePath/Electric_induction_furnace_Sheffield.jpg"
                  alt="Induction furnace"
                  className="h-40 w-full rounded-xl border border-white/10 bg-white/5 object-cover"
                  loading="lazy"
                />
                <img
                  src="https://commons.wikimedia.org/wiki/Special:FilePath/Castings_fresh_from_the_heat_treatment_furnace.jpg"
                  alt="Castings from heat treatment furnace"
                  className="h-40 w-full rounded-xl border border-white/10 bg-white/5 object-cover"
                  loading="lazy"
                />
                <img
                  src="https://commons.wikimedia.org/wiki/Special:FilePath/Corus_Steelworks,_Rotherham_-_geograph.org.uk_-_787011.jpg"
                  alt="Steelworks"
                  className="h-40 w-full rounded-xl border border-white/10 bg-white/5 object-cover"
                  loading="lazy"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full rounded-lg"
                    src="https://www.youtube.com/embed/KEXANt8lqLI"
                    title="Steel casting process reference video"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="text-xs text-muted-2">
                Images: Wikimedia Commons (โปรดตรวจสอบ license/การอ้างอิงจากหน้าไฟล์ต้นทาง) • Video: YouTube embed
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}

