import Link from "next/link";
import { siteConfig } from "@/lib/seo/site";
import { getRequestLocale } from "@/lib/i18n";
import { t } from "@/lib/translations";
import { StitchFrame } from "@/components/stitch/StitchFrame";
import { STITCH_PAGES, STITCH_ROUTE_SLUGS } from "@/lib/stitch/manifest";
import type { Locale } from "@/lib/i18n-shared";

export const metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
};

function withLang(href: string, locale: string) {
  const [path, hash] = href.split("#");
  const q = path.includes("?") ? "&" : "?";
  const withQ = `${path}${q}lang=${locale}`;
  return hash ? `${withQ}#${hash}` : withQ;
}

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
    <div className="forge-surface flex min-h-full flex-col font-forge-body">
      <HomeStickyBar locale={locale} tr={tr} />
      <StitchFrame slug={STITCH_ROUTE_SLUGS.home} title="Suphancasting home" />
    </div>
  );
}

function HomeStickyBar({
  locale,
  tr,
}: {
  locale: Locale;
  tr: ReturnType<typeof t>;
}) {
  return (
    <div className="sticky top-14 z-40 border-b border-[#5d4038]/20 bg-[#131313]/95 px-3 py-2 shadow-md shadow-black/20 backdrop-blur-md sm:px-4">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={withLang("/designs", locale)}
            className="font-forge-headline rounded bg-[#ff5625] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#e04d20] sm:text-xs"
          >
            {tr.nav.allDesigns} ({STITCH_PAGES.length})
          </Link>
          <Link
            href={withLang("/rfq", locale)}
            className="font-forge-headline rounded border border-[#5d4038]/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#c4b5ab] hover:border-[#ff5625]/40 hover:text-[#ff5625] sm:text-xs"
          >
            {tr.nav.getQuote}
          </Link>
        </div>
        <p className="text-[10px] text-[#6b6560] sm:text-xs">
          {tr.designsIndex.sub}
        </p>
      </div>
    </div>
  );
}
