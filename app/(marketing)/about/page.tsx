import { Container } from "@/components/site/Container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/seo/site";
import { getRequestLocale } from "@/lib/i18n";

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
  const isThai = locale === "th";
  const isZh = locale === "zh";

  const title = isThai
    ? "เกี่ยวกับ Suphancasting"
    : isZh
      ? "关于 Suphancasting"
      : "About Suphancasting";
  return (
    <div className="metal-bg">
      <Container className="py-10">
        <div className="mb-8">
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
      </Container>
    </div>
  );
}

