import Link from "next/link";
import { siteConfig } from "@/lib/seo/site";
import { getRequestLocale } from "@/lib/i18n";
import { t } from "@/lib/translations";
import { STITCH_PAGES } from "@/lib/stitch/manifest";

export const metadata = {
  title: `Design library | ${siteConfig.fullName}`,
  description: "All Stitch UI exports for Suphan Casting.",
};

function withLang(href: string, locale: string) {
  const [path, hash] = href.split("#");
  const q = path.includes("?") ? "&" : "?";
  const withQ = `${path}${q}lang=${locale}`;
  return hash ? `${withQ}#${hash}` : withQ;
}

export default async function DesignsIndexPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = searchParams ? await searchParams : undefined;
  const locale = await getRequestLocale({ lang: resolved?.lang });
  const tr = t(locale);

  return (
    <div className="forge-surface min-h-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#ff5625]/90">
          {tr.nav.allDesigns}
        </p>
        <h1 className="mt-2 font-forge-headline text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
          {tr.designsIndex.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[#a8a29e]">{tr.designsIndex.sub}</p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STITCH_PAGES.map((p) => (
            <li key={p.slug}>
              <Link
                href={withLang(`/designs/${p.slug}`, locale)}
                className="block rounded-lg border border-[#5d4038]/20 bg-[#1a1919] px-4 py-3 text-sm text-[#e5e2e1] transition hover:border-[#ff5625]/40 hover:bg-[#222]"
              >
                <span className="font-forge-headline text-xs font-bold uppercase tracking-wide text-[#ff5625]">
                  {p.slug}
                </span>
                <span className="mt-1 block text-[#b8aea8]">{p.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
