import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/site/Container";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SITE_IMAGES } from "@/lib/home/siteImages";
import { getRequestLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/seo/site";
import { t } from "@/lib/translations";

import styles from "./home-redesign.module.css";

export const metadata: Metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
};

function withLang(href: string, locale: string) {
  const [path, hash] = href.split("#");
  const q = path.includes("?") ? "&" : "?";
  const withQ = `${path}${q}lang=${locale}`;
  return hash ? `${withQ}#${hash}` : withQ;
}

const aiPipeline = [
  { step: "01", title: "Coordinator", detail: "Plans campaign goals and production tasks" },
  { step: "02", title: "Researcher", detail: "Collects market and manufacturing insights" },
  { step: "03", title: "Writer", detail: "Builds bilingual content for SEO and RFQ clarity" },
  { step: "04", title: "Visual", detail: "Prepares image concepts and social-ready assets" },
  { step: "05", title: "SEO Optimizer", detail: "Checks metadata, keywords, and structure" },
  { step: "06", title: "Publisher", detail: "Sends approved content live to web channels" },
];

const productShowcase = [
  { src: "/products/generated/original-s-113557520-0.webp", name: "Pump Housing" },
  { src: "/products/generated/original-s-113557522.webp", name: "Valve Body" },
  { src: "/products/generated/original-s-113565721.webp", name: "Machine Bracket" },
  { src: "/products/generated/original-s-113565711.webp", name: "Gear Casing" },
  { src: "/products/generated/original-a2c10246-205d-4858-a322-8c2355f4f7db.webp", name: "Industrial Flange" },
  { src: "/products/generated/original-f16b2b59-1331-4826-a071-f0542dc95b98.webp", name: "Custom Part Set" },
];

export default async function HomePage() {
  const locale = await getRequestLocale();
  const tr = t(locale);
  const hm = tr.homeMaster;

  const services = [
    {
      step: hm.svcSandStep,
      title: hm.svcSandTitle,
      desc: hm.svcSandDesc,
      image: SITE_IMAGES.sandCasting,
    },
    {
      step: hm.svcInvStep,
      title: hm.svcInvTitle,
      desc: hm.svcInvDesc,
      image: SITE_IMAGES.vacuumCasting,
    },
    {
      step: hm.svcDieStep,
      title: hm.svcDieTitle,
      desc: hm.svcDieDesc,
      image: SITE_IMAGES.dieCasting,
    },
  ];

  const productionSteps = [
    { title: hm.step1Title, desc: hm.step1Desc },
    { title: hm.step2Title, desc: hm.step2Desc },
    { title: hm.step3Title, desc: hm.step3Desc },
    { title: hm.step4Title, desc: hm.step4Desc },
  ];

  return (
    <div className={styles.page}>
      <SiteHeader />

      <section className={`${styles.heroSection} pt-28 pb-20 sm:pb-24`}>
        <div className={styles.heroGlow} aria-hidden />
        <Container className="relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#ffd6c4]">
                <span>{hm.heroEyebrow}</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-forge-headline text-4xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-white sm:text-5xl lg:text-7xl">
                  {hm.heroLine1} <span className="text-[#ff6a2c]">{hm.heroLine1b}</span>
                  <br />
                  {hm.heroLine2} {hm.heroLine3}
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-[#dbc9c2] sm:text-lg">
                  {tr.home.heroSpotlightDesc}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={withLang("/rfq#quote-tool", locale)}
                  className={`${styles.primaryBtn} font-forge-headline`}
                >
                  {hm.ctaButtonNow}
                </Link>
                <Link
                  href={withLang("/services", locale)}
                  className={`${styles.secondaryBtn} font-forge-headline`}
                >
                  {hm.heroCta2}
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className={styles.metricCard}>
                  <div className="font-forge-headline text-2xl font-bold text-[#ffb392]">11</div>
                  <div className="text-xs uppercase tracking-[0.15em] text-[#d4b9af]">Languages Live</div>
                </div>
                <div className={styles.metricCard}>
                  <div className="font-forge-headline text-2xl font-bold text-[#ffb392]">6</div>
                  <div className="text-xs uppercase tracking-[0.15em] text-[#d4b9af]">AI Agents</div>
                </div>
                <div className={styles.metricCard}>
                  <div className="font-forge-headline text-2xl font-bold text-[#ffb392]">24h</div>
                  <div className="text-xs uppercase tracking-[0.15em] text-[#d4b9af]">RFQ Turnaround</div>
                </div>
              </div>
            </div>

            <div className={styles.heroVisualCard}>
              <div className={styles.logoChip}>
                <Image src="/logo.png" alt="Suphancasting logo" width={72} height={72} />
                <div className="font-forge-headline text-sm uppercase tracking-[0.18em] text-[#ffd6c4]">
                  Suphan Casting Industrial
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={SITE_IMAGES.heroMolten}
                  alt="Molten steel pouring at foundry"
                  width={1200}
                  height={800}
                  className="h-[360px] w-full object-cover sm:h-[420px]"
                  priority
                />
                <div className={styles.heroImageOverlay} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container className="space-y-8">
          <div className="space-y-3">
            <p className="font-forge-headline text-xs uppercase tracking-[0.22em] text-[#ffc4ab]">
              {hm.servicesLead}
            </p>
            <h2 className="font-forge-headline text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              {hm.servicesTitle}
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className={styles.serviceCard}>
                <Image
                  src={service.image}
                  alt={service.title}
                  width={900}
                  height={600}
                  className="h-44 w-full object-cover"
                />
                <div className="space-y-3 p-5">
                  <p className="font-forge-headline text-[11px] uppercase tracking-[0.2em] text-[#f4bba2]">
                    {service.step}
                  </p>
                  <h3 className="font-forge-headline text-xl font-semibold text-white">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-[#d8c2b7]">{service.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <div className={styles.processPanel}>
            <div className="space-y-3">
              <p className="font-forge-headline text-xs uppercase tracking-[0.2em] text-[#ffc3a7]">
                {hm.processKicker}
              </p>
              <h2 className="font-forge-headline text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                {hm.processTitle1} {hm.processTitle2}
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-[#dcc7bc]">{hm.policyDesc}</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {productionSteps.map((step, index) => (
                <article key={step.title} className={styles.stepCard}>
                  <div className="font-forge-headline text-sm font-bold uppercase tracking-[0.2em] text-[#ff9866]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-forge-headline text-lg font-semibold text-white">{step.title}</h3>
                  <p className="text-sm text-[#d6beb2]">{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container className="space-y-8">
          <div className="space-y-3">
            <p className="font-forge-headline text-xs uppercase tracking-[0.2em] text-[#ffc3a7]">
              AI Operations
            </p>
            <h2 className="font-forge-headline text-3xl font-bold uppercase text-white sm:text-4xl">
              Autonomous Content Pipeline
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-[#d9c4b8]">
              Based on your repository workflow: each agent contributes a specific production stage so your
              factory site can continuously ship catalog, SEO, and campaign updates.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiPipeline.map((agent) => (
              <article key={agent.step} className={styles.pipelineCard}>
                <p className="font-forge-headline text-xs uppercase tracking-[0.2em] text-[#ff9a6a]">
                  Agent {agent.step}
                </p>
                <h3 className="font-forge-headline mt-2 text-lg font-semibold text-white">{agent.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#d5beb2]">{agent.detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container className="space-y-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="space-y-3">
              <p className="font-forge-headline text-xs uppercase tracking-[0.2em] text-[#ffc4ab]">
                {hm.galleryTitle} {hm.galleryTitleAccent}
              </p>
              <h2 className="font-forge-headline text-3xl font-bold uppercase text-white sm:text-4xl">
                Product Showcase
              </h2>
            </div>
            <Link href={withLang("/products", locale)} className={`${styles.secondaryBtn} font-forge-headline`}>
              {tr.home.catalogViewAll}
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productShowcase.map((item) => (
              <article key={item.src} className={styles.productCard}>
                <Image
                  src={item.src}
                  alt={item.name}
                  width={1200}
                  height={1200}
                  className="h-56 w-full object-cover"
                />
                <div className="space-y-2 p-4">
                  <h3 className="font-forge-headline text-lg font-semibold text-white">{item.name}</h3>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#ffb392]">OEM Steel Casting</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <SiteFooter />
    </div>
  );
}
