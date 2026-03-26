import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocalizedBlogPostBySlug, staticBlogPosts } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildFAQJsonLd } from "@/lib/seo/structuredData";
import { Container } from "@/components/site/Container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRequestLocale } from "@/lib/i18n";
import { t } from "@/lib/translations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = staticBlogPosts.find((p) => p.slug === slug);
  if (!post) return buildMetadata({ title: "Knowledge Hub" });
  return buildMetadata({
    title: post.title,
    description: post.description,
    canonicalPath: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
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
  const post = getLocalizedBlogPostBySlug(locale, slug);
  if (!post) notFound();

  const faqLd = buildFAQJsonLd({ mainEntity: post.faq });
  const pageUrl =
    `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://suphancasting.com"}` +
    `/blog/${post.slug}`;

  return (
    <div className="metal-bg">
      <Container className="py-10">
        <div className="mb-8">
          <Badge variant="default">{tr.blogDetail.hub}</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            {post.title}
          </h1>
          <p className="mt-3 text-muted max-w-3xl">{post.description}</p>
          <div className="mt-3 text-xs text-muted-2">
            {tr.blogDetail.published}: {post.publishedAt ?? "—"}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="text-lg font-semibold">{tr.blogDetail.articleTitle}</div>
              <div className="mt-1 text-sm text-muted">
                {tr.blogDetail.articleSub}
              </div>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-muted">
                {post.contentMd}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-lg font-semibold">{tr.blogDetail.faqTitle}</div>
              <div className="mt-1 text-sm text-muted">
                {tr.blogDetail.faqSub}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {post.faq.map((item) => (
                <div key={item.q}>
                  <div className="text-sm font-semibold">{item.q}</div>
                  <div className="mt-1 text-sm text-muted">{item.a}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <link rel="canonical" href={pageUrl} />
      </Container>
    </div>
  );
}

