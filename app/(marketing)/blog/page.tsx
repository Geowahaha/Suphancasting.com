import Link from "next/link";
import { Container } from "@/components/site/Container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getLocalizedBlogPosts } from "@/lib/content/blog";
import { siteConfig } from "@/lib/seo/site";
import { Badge } from "@/components/ui/badge";
import { getRequestLocale } from "@/lib/i18n";

export const metadata = {
  title: `Knowledge Hub | ${siteConfig.fullName}`,
  description:
    "Long-tail industrial SEO articles for steel casting Thailand and OEM casting parts. Learn about quotation inputs, lead-time planning, and quality control.",
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = searchParams ? await searchParams : undefined;
  const locale = await getRequestLocale({ lang: resolved?.lang });
  const isThai = locale === "th";
  const isZh = locale === "zh";
  const posts = getLocalizedBlogPosts(locale);
  return (
    <div className="forge-surface min-h-full">
      <Container className="py-10">
        <div className="mb-8">
          <Badge variant="default">{isThai ? "คลังความรู้" : isZh ? "知识中心" : "Knowledge Hub"}</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            {isThai ? "คู่มืออุตสาหกรรมเพื่อ RFQ ที่แม่นยำขึ้น" : isZh ? "更高效 RFQ 的工业指南" : "Industrial guides for smarter RFQs"}
          </h1>
          <p className="mt-3 text-muted max-w-3xl">
            SEO-dominant knowledge articles targeting `steel casting Thailand`,
            `metal casting factory`, and `OEM casting parts`.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.slug} className="h-full">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm font-semibold">{post.title}</div>
                  {post.publishedAt ? (
                    <Badge variant="warning">{post.publishedAt}</Badge>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted">{post.description}</p>
                <div className="mt-5">
                  <Link
                    href={`/blog/${post.slug}?lang=${locale}`}
                    className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 transition-colors"
                  >
                    Read article
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

