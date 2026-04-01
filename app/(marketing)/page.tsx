import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/seo/site";
import { getRequestLocale } from "@/lib/i18n";
import { t } from "@/lib/translations";
import { SITE_IMAGES } from "@/lib/home/siteImages";
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

function CtaHeading({ locale, hm }: { locale: Locale; hm: ReturnType<typeof t>["homeMaster"] }) {
  if (locale === "zh") {
    return (
      <h2 className="editorial-title relative z-10 mb-6 text-4xl uppercase text-white md:text-6xl">
        <span className="text-[#ff5625]">{hm.ctaTitleAccent}</span>
        {hm.ctaTitleEnd ? <span className="text-white">{hm.ctaTitleEnd}</span> : null}
      </h2>
    );
  }
  return (
    <h2 className="editorial-title relative z-10 mb-6 text-4xl uppercase text-white md:text-6xl">
      {hm.ctaTitle}{" "}
      <span className="text-[#ff5625] italic">{hm.ctaTitleAccent}</span> {hm.ctaTitleEnd}
    </h2>
  );
}

const PORTFOLIO_GRID = [
  SITE_IMAGES.gallery1,
  SITE_IMAGES.gallery2,
  SITE_IMAGES.gallery3,
  SITE_IMAGES.gallery4,
  SITE_IMAGES.sandCasting,
  SITE_IMAGES.dieCasting,
] as const;

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
  const hm = tr.homeMaster;

  return (
    <div className="forge-surface overflow-x-hidden font-forge-body selection:bg-[#ff5625] selection:text-white">
      {/* Hero */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />
        <Image
          src={SITE_IMAGES.heroMolten}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="relative z-20 max-w-5xl px-6 text-center">
          <h1 className="editorial-title mb-8 text-4xl uppercase leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {hm.heroLine1}{" "}
            <span className="text-[#ff5625] not-italic">{hm.heroLine1b}</span>
            <br />
            {hm.heroLine2}
            <br />
            {hm.heroLine3}
          </h1>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={withLang("/contact#quote-tool", locale)}
              className="font-forge-headline w-full max-w-sm bg-[#ff5625] px-8 py-4 text-center text-sm font-black uppercase tracking-widest text-white shadow-[0_8px_32px_rgba(255,86,37,0.35)] transition-all hover:bg-[#e04d20] sm:w-auto"
            >
              {hm.heroCta1}
            </Link>
            <Link
              href={withLang("/about#services", locale)}
              className="font-forge-headline w-full max-w-sm border border-white/25 bg-black/20 px-8 py-4 text-center text-sm font-black uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/10 sm:w-auto"
            >
              {hm.heroCta2}
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative overflow-hidden bg-[#131313] py-20 md:py-28">
        <div className="mb-12 flex max-w-screen-2xl flex-col gap-6 px-6 sm:px-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            {hm.servicesKicker ? (
              <p className="mb-2 text-xs font-bold uppercase italic tracking-widest text-[#ff5625]/90">
                {hm.servicesKicker}
              </p>
            ) : null}
            <h2 className="editorial-title max-w-4xl text-3xl text-[#e5e2e1] md:text-4xl lg:text-5xl">
              {hm.servicesLead}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#a8a29e] md:text-base">{hm.servicesTitle}</p>
          </div>
          <div className="hidden gap-3 md:flex">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#5d4038]/50 text-[#e7bdb2]">
              ΓåÉ
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#5d4038]/50 text-[#e7bdb2]">
              ΓåÆ
            </span>
          </div>
        </div>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-10 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ServiceCard
            image={SITE_IMAGES.sandCasting}
            badge={hm.svcSandBadge}
            step={hm.svcSandStep}
            title={hm.svcSandTitle}
            desc={hm.svcSandDesc}
            readMore={hm.readMore}
            href={withLang("/about#services", locale)}
            featured
          />
          <ServiceCard
            image={SITE_IMAGES.vacuumCasting}
            step={hm.svcInvStep}
            title={hm.svcInvTitle}
            desc={hm.svcInvDesc}
            readMore={hm.readMore}
            href={withLang("/about#services", locale)}
          />
          <ServiceCard
            image={SITE_IMAGES.dieCasting}
            step={hm.svcDieStep}
            title={hm.svcDieTitle}
            desc={hm.svcDieDesc}
            readMore={hm.readMore}
            href={withLang("/about#services", locale)}
          />
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#0e0e0e] py-20 md:py-28" id="process-section">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-36 w-36 bg-[#ff5625]/15 blur-[70px] md:-left-10 md:-top-10 md:h-40 md:w-40" />
            <div className="relative aspect-square overflow-hidden border-l-4 border-[#ff5625] bg-[#1a1a1a] p-3 md:p-4">
              <Image
                src={SITE_IMAGES.cadStation}
                alt=""
                width={800}
                height={800}
                className="h-full w-full object-cover brightness-90 grayscale"
              />
              <p className="absolute bottom-4 left-4 right-4 rounded bg-black/55 px-3 py-2 text-center text-xs font-medium text-white backdrop-blur-sm">
                {hm.cadCaption}
              </p>
            </div>
            <div className="absolute bottom-2 right-2 max-w-[280px] border border-[#5d4038]/25 bg-[#252524]/95 p-5 shadow-xl backdrop-blur-sm md:bottom-4 md:right-4">
              <p className="font-forge-headline mb-1 text-lg font-bold uppercase text-[#ff5625]">
                {hm.policyTitle}
              </p>
              <p className="text-xs leading-relaxed text-[#d6ccc7]">{hm.policyDesc}</p>
            </div>
          </div>
          <div className="space-y-10">
            <div>
              <p className="mb-2 text-xs font-bold uppercase italic tracking-widest text-[#ff5625]">
                {hm.processKicker}
              </p>
              <h2 className="editorial-title text-4xl uppercase text-white md:text-5xl lg:text-6xl">
                {hm.processTitle1} <br />
                <span className="text-[#8a7a72]">{hm.processTitle2}</span>
              </h2>
            </div>
            <div className="space-y-8">
              {[
                { n: "01", t: hm.step1Title, d: hm.step1Desc, active: false },
                { n: "02", t: hm.step2Title, d: hm.step2Desc, active: false },
                { n: "03", t: hm.step3Title, d: hm.step3Desc, active: true },
                { n: "04", t: hm.step4Title, d: hm.step4Desc, active: false },
              ].map((s) => (
                <div key={s.n} className="flex gap-5 border-b border-white/5 pb-8 last:border-0 md:gap-8">
                  <span
                    className={`font-forge-headline min-w-[2.5rem] text-3xl font-black md:text-4xl ${
                      s.active ? "text-[#ff5625]" : "text-[#5d4038]/40"
                    }`}
                  >
                    {s.n}
                  </span>
                  <div>
                    <h4 className="font-forge-headline mb-2 text-lg font-bold uppercase tracking-tight text-white md:text-xl">
                      {s.t}
                    </h4>
                    <p className="text-sm leading-relaxed text-[#b8aea8]">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="border-y border-[#5d4038]/10 bg-[#131313] py-20 md:py-28">
        <div className="mb-10 flex max-w-screen-2xl flex-col justify-between gap-6 px-6 sm:px-8 md:mb-14 md:flex-row md:items-end">
          <h2 className="editorial-title text-4xl uppercase text-white md:text-5xl">
            {hm.galleryTitle}{" "}
            <span className="text-[#ff5625] not-italic">{hm.galleryTitleAccent}</span>
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#ff5625] bg-[#ff5625]/10 px-4 py-1.5 font-forge-headline text-[10px] font-black uppercase tracking-widest text-[#ff5625]">
              {hm.portfolioFilterAll}
            </span>
            <span className="rounded-full border border-[#5d4038]/60 px-4 py-1.5 font-forge-headline text-[10px] font-black uppercase tracking-widest text-[#a8a29e]">
              {hm.portfolioFilterParts}
            </span>
            <span className="rounded-full border border-[#5d4038]/60 px-4 py-1.5 font-forge-headline text-[10px] font-black uppercase tracking-widest text-[#a8a29e]">
              {hm.galleryTag1}
            </span>
          </div>
        </div>
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-3 px-6 sm:grid-cols-2 sm:px-8 md:gap-4 lg:grid-cols-3">
          {PORTFOLIO_GRID.map((src) => (
            <div
              key={src}
              className="group relative aspect-square overflow-hidden bg-[#1c1b1b]"
            >
              <Image
                src={src}
                alt=""
                width={600}
                height={600}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0a0a0a] py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="forge-glass-panel relative overflow-hidden rounded-lg border border-white/[0.06] p-10 text-center md:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#ff5625]/25 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#2e4e4e]/20 blur-[90px]" />
            <CtaHeading locale={locale} hm={hm} />
            <p className="relative z-10 mx-auto mb-10 max-w-xl text-base text-[#b8aea8] md:text-lg">
              {hm.ctaSub}
            </p>
            <div className="relative z-10 flex flex-col items-center justify-center gap-6 md:flex-row md:flex-wrap">
              <Link
                href={withLang("/contact#quote-tool", locale)}
                className="font-forge-headline w-full bg-[#ff5625] px-10 py-4 text-center text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-[#ff5625]/25 transition hover:bg-[#e04d20] md:w-auto"
              >
                {hm.ctaButtonNow}
              </Link>
              <a
                href="tel:0986362356"
                className="font-forge-headline flex items-center gap-2 text-lg font-bold text-white"
              >
                <span className="text-[#ff5625]" aria-hidden>
                  ΓÿÄ
                </span>
                098 636 2356
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({
  image,
  badge,
  step,
  title,
  desc,
  readMore,
  href,
  featured,
}: {
  image: string;
  badge?: string;
  step: string;
  title: string;
  desc: string;
  readMore: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative aspect-[4/5] min-w-[82vw] snap-start overflow-hidden sm:min-w-[380px] md:min-w-[420px] ${
        featured ? "ring-2 ring-[#ff5625]/40" : ""
      } group`}
    >
      <Image
        src={image}
        alt=""
        fill
        className="object-cover grayscale transition duration-700 group-hover:grayscale-0"
        sizes="(max-width: 768px) 82vw, 420px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      {badge ? (
        <div className="absolute left-4 top-4 bg-[#ff5625] px-2 py-1 font-forge-headline text-[10px] font-black uppercase tracking-widest text-white">
          {badge}
        </div>
      ) : null}
      <div className="absolute bottom-0 w-full p-6 md:p-8">
        <span className="mb-3 block text-[11px] font-bold tracking-widest text-[#ffb5a0]">{step}</span>
        <h3 className="font-forge-headline mb-3 text-2xl font-bold uppercase leading-tight text-white md:text-3xl">
          {title}
        </h3>
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-[#d6ccc7] opacity-90 transition group-hover:opacity-100">
          {desc}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-1 font-forge-headline text-xs font-bold uppercase tracking-widest text-[#ff5625]"
        >
          {readMore} ΓåÆ
        </Link>
      </div>
    </div>
  );
}
