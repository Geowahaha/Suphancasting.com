"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type HomeLocale = "th" | "en";

const lineUrl = "https://line.me/R/ti/p/@213bzijc";
const logoSrc = "/stitch/suphancasting-ai-home/uploads/logo-suphan.png";
const heroPoster = "/suphancasting-assets/video/suphancasting-foundry-hero-poster.jpg";
const mapUrl = "https://maps.google.com/?q=Suphan%20casting%20Co.%2Cltd.";

const copy = {
  th: {
    email: "อีเมล: SCNWMax@gmail.com",
    tel: "โทร: 098-636-2356",
    tel2: "โทร: 084-317 7788",
    search: "ค้นหา",
    brand: "Suphancasting",
    nav: ["หน้าแรก", "ทำไมต้องงานหล่อ?", "ทำไมต้องเรา?", "ความสามารถ", "ผลงาน", "ติดต่อ"],
    heroTitle: "โรงหล่อรับงานตามแบบ ผลิตงานหล่อโลหะและอะไหล่เครื่องจักร",
    heroSub: "รับปรึกษางานหล่อทราย เหล็กหล่อ เหล็กหล่อเหนียว เหล็กกล้าหล่อ และชิ้นส่วนเครื่องจักรสำหรับงานซ่อมบำรุงหรืองานผลิตจำนวนน้อยถึงกลาง",
    ctaPrimary: "ส่ง RFQ / ขอประเมินราคา",
    ctaSecondary: "ดูผลงาน",
    lowVolumeTitle: "งานจำนวนน้อยถึงกลางคือจุดแข็ง",
    lowVolumeText: "เหมาะกับโรงงานที่ต้องการอะไหล่ทดแทน pulley, gear, pump part, housing หรือชิ้นงานตามตัวอย่างจริง",
    fullServiceTitle: "บริการตั้งแต่ดูแบบจนถึงส่งมอบ",
    fullServiceText: "ช่วยไล่ข้อมูลวัสดุ ขนาด น้ำหนัก จำนวน machining และ deadline เพื่อให้ทีมขายประเมินงานได้เร็วขึ้น",
    welcomeTitle: "ยินดีต้อนรับ",
    welcomeText1: "Suphancasting เชื่อมต่อประสบการณ์โรงหล่อไทยกับระบบ RFQ สมัยใหม่ ลูกค้าสามารถส่งรูป แบบ หรือชิ้นงานตัวอย่าง เพื่อให้ทีมงานช่วยประเมินวัสดุและขั้นตอนผลิตที่เหมาะสม",
    welcomeText2: "เราทำงานกับงานหล่อโลหะตามแบบ งานอะไหล่เครื่องจักร งาน pulley และงานซ่อมบำรุงที่ต้องการสื่อสารชัดเจนก่อนเสนอราคา",
    capabilitiesTitle: "ความสามารถหลัก",
    capabilitiesSub: "โครงสร้างหน้าแบบโรงหล่อคลาสสิก แต่จัดข้อมูลให้ลูกค้าไทยอ่านง่ายและติดต่อได้ทันที",
    capabilities: [
      ["Sand casting", "งานหล่อทรายสำหรับชิ้นงานอุตสาหกรรมตามแบบหรือตัวอย่าง"],
      ["Gray & ductile iron", "FC25, FCD และงานเหล็กหล่อที่ต้องคุมความแข็งแรง/การใช้งาน"],
      ["Cast steel & alloy", "SC46, S45C, Mo4140 สำหรับชิ้นส่วนรับแรงและงานเครื่องจักร"],
      ["Machining-ready parts", "เตรียมข้อมูลรูเพลา ร่องลิ่ม tolerance และผิวงานก่อนกลึงต่อ"],
    ],
    portfolioTitle: "ตัวอย่างผลงาน",
    portfolioCta: "ดูเพิ่มเติม",
    portfolio: [
      ["SUC Pulley / พูลเล่ย์", "งาน pulley ตามแบบสำหรับระบบส่งกำลัง", "/suphancasting-assets/shopee-new/pulley-product-fc25-no-price.png"],
      ["Gear & drive parts", "เฟืองและชิ้นส่วนส่งกำลังสำหรับโรงงาน", "/suphancasting-assets/shopee-new/gear-fcd.jpg"],
      ["Pump / machine parts", "pump casing, housing และอะไหล่เครื่องจักร", "/suphancasting-assets/pump-casing-close.jpg"],
    ],
    contactTitle: "ติดต่อเรา",
    contactText: "ส่งรูป/แบบ ขนาด วัสดุ และจำนวนที่ต้องการ ทีมงานจะประเมินและติดต่อกลับ หรือติดต่อทันที โทรคุณกอล์ฟ ศศิธร",
    address: "Suphan casting Co., Ltd. จังหวัดสุพรรณบุรี ประเทศไทย",
    mapCta: "เปิด Google Maps",
    footer: "โรงหล่อรับงานตามแบบ / Industrial casting and machinery parts",
  },
  en: {
    email: "Email: SCNWMax@gmail.com",
    tel: "Tel: 098-636-2356",
    tel2: "Tel: 084-317 7788",
    contactName: "Golf Sasithorn",
    search: "Search",
    brand: "Suphancasting",
    nav: ["Home", "Why castings?", "Why Suphancasting?", "Capabilities", "Portfolio", "Contact"],
    heroTitle: "Jobbing foundry for custom metal castings and machinery spare parts",
    heroSub: "Sand casting consultation for gray iron, ductile iron, cast steel, alloy parts, pulley work, and low-to-medium volume industrial maintenance jobs.",
    ctaPrimary: "Send RFQ / request review",
    ctaSecondary: "View portfolio",
    lowVolumeTitle: "Low-to-medium volume is our fit",
    lowVolumeText: "Built for maintenance teams that need pulley, gear, pump, housing, or replacement parts from drawings, photos, or samples.",
    fullServiceTitle: "Support from drawing review to delivery",
    fullServiceText: "We help clarify material, dimensions, weight, quantity, machining needs, and timeline before quotation.",
    welcomeTitle: "Welcome",
    welcomeText1: "Suphancasting connects Thai foundry experience with a modern RFQ workflow. Customers can send photos, drawings, or sample parts so the team can review material and production feasibility.",
    welcomeText2: "We focus on custom castings, machinery spare parts, pulley work, and maintenance jobs where clear technical communication matters before pricing.",
    capabilitiesTitle: "Capabilities",
    capabilitiesSub: "A classic foundry information structure, rebuilt for Thai buyers and international RFQ review.",
    capabilities: [
      ["Sand casting", "Industrial sand castings from drawings, photos, or sample parts"],
      ["Gray & ductile iron", "FC25, FCD, and iron casting work matched to real service conditions"],
      ["Cast steel & alloy", "SC46, S45C, Mo4140 for loaded machinery and industrial parts"],
      ["Machining-ready parts", "Bore, keyway, tolerance, and finish details prepared for machining"],
    ],
    portfolioTitle: "Portfolio",
    portfolioCta: "See more",
    portfolio: [
      ["SUC Pulley", "Pulley casting work for power transmission systems", "/suphancasting-assets/shopee-new/pulley-product-fc25-no-price.png"],
      ["Gear & drive parts", "Gear and transmission parts for factories", "/suphancasting-assets/shopee-new/gear-fcd.jpg"],
      ["Pump / machine parts", "Pump casings, housings, and machinery spare parts", "/suphancasting-assets/pump-casing-close.jpg"],
    ],
    contactTitle: "Contact us",
    contactText: "Send photo/drawing, dimensions, material, and quantity. Our team will review and follow up, or call Golf directly.",
    address: "Suphan casting Co., Ltd. Suphan Buri, Thailand",
    mapCta: "Open Google Maps",
    footer: "Custom foundry work / Industrial casting and machinery parts",
  },
} as const;

const productImages = [
  "/suphancasting-assets/casting-work.jpg",
  "/suphancasting-assets/drive-gear.jpg",
  "/suphancasting-assets/cast-rollers.jpg",
  "/suphancasting-assets/shopee-new/mold-boxes-fc25.jpg",
];

function getInitialLocale(): HomeLocale {
  if (typeof window === "undefined") return "th";
  const param = new URLSearchParams(window.location.search).get("lang");
  if (param === "en") return "en";
  if (param === "th") return "th";
  return document.cookie.includes("NEXT_LOCALE=en") ? "en" : "th";
}

function withLang(href: string, locale: HomeLocale) {
  if (href.startsWith("#")) return href;
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}lang=${locale}`;
}

function TopFrame({
  locale,
  setLocale,
}: {
  locale: HomeLocale;
  setLocale: (locale: HomeLocale) => void;
}) {
  const tr = copy[locale];

  const switchLocale = (next: HomeLocale) => {
    setLocale(next);
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url.toString());
  };

  return (
    <>
      <div className="bg-[#f5f1ec] text-[13px] text-[#47382f]">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <a href="mailto:SCNWMax@gmail.com" className="hover:text-[#b6451f]">
              {tr.email}
            </a>
            <a href="tel:0986362356" className="hover:text-[#b6451f]">
              {tr.tel}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span>{tr.search}</span>
            <div className="flex rounded border border-[#cbbcaf] bg-white p-0.5">
              {(["th", "en"] as HomeLocale[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => switchLocale(item)}
                  className={`px-3 py-1 text-xs font-bold uppercase transition ${
                    locale === item ? "bg-[#1d1a17] text-white" : "text-[#5b4b40] hover:bg-[#efe6dc]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#ded2c5] bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href={withLang("/", locale)} className="flex items-center gap-3">
            <img src={logoSrc} alt="Suphancasting logo" className="h-16 w-16 object-contain" />
            <span>
              <span className="block font-forge-headline text-3xl font-black uppercase leading-none text-[#211913]">
                {tr.brand}
              </span>
              <span className="block text-sm font-semibold text-[#8a5a34]">
                Foundry & machinery parts
              </span>
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-1 text-sm font-bold text-[#2c241f]">
            {[
              ["#home", tr.nav[0]],
              ["#why-castings", tr.nav[1]],
              ["#why-suphan", tr.nav[2]],
              ["#capabilities", tr.nav[3]],
              ["#portfolio", tr.nav[4]],
              ["#contact", tr.nav[5]],
            ].map(([href, label]) => (
              <a key={href} href={href} className="rounded px-3 py-2 hover:bg-[#f15a24] hover:text-white">
                {label}
              </a>
            ))}
            <Link
              href={withLang("/rfq#quote-tool", locale)}
              className="ml-1 rounded bg-[#f15a24] px-4 py-2 text-white hover:bg-[#211913]"
            >
              RFQ
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

function Hero({ locale }: { locale: HomeLocale }) {
  const tr = copy[locale];

  return (
    <section id="home" className="relative overflow-hidden bg-[#15100c] text-white">
      <div className="absolute inset-0">
        <img src={heroPoster} alt="" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,10,6,.93)_0%,rgba(16,10,6,.72)_46%,rgba(16,10,6,.16)_100%)]" />
      </div>
      <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center px-4 py-20 lg:grid-cols-[1fr_360px]">
        <div className="max-w-3xl">
          <h1 className="font-forge-headline text-5xl font-black leading-[1.04] tracking-normal sm:text-6xl lg:text-7xl">
            {tr.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl border-l-4 border-[#f15a24] pl-5 text-lg leading-8 text-[#f6ede5]">
            {tr.heroSub}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={withLang("/rfq#quote-tool", locale)}
              className="inline-flex justify-center rounded bg-[#f15a24] px-7 py-4 text-sm font-black uppercase text-white shadow-lg shadow-black/25 hover:bg-white hover:text-[#211913]"
            >
              {tr.ctaPrimary}
            </Link>
            <a
              href="#portfolio"
              className="inline-flex justify-center rounded border border-white/35 bg-white/10 px-7 py-4 text-sm font-black uppercase text-white backdrop-blur hover:bg-white hover:text-[#211913]"
            >
              {tr.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:mt-0">
          <article className="bg-white p-6 text-[#2d241d] shadow-xl">
            <h2 className="font-forge-headline text-2xl font-black">{tr.lowVolumeTitle}</h2>
            <p className="mt-3 leading-7 text-[#67564a]">{tr.lowVolumeText}</p>
          </article>
          <article className="bg-[#f15a24] p-6 text-white shadow-xl">
            <h2 className="font-forge-headline text-2xl font-black">{tr.fullServiceTitle}</h2>
            <p className="mt-3 leading-7 text-white/90">{tr.fullServiceText}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Welcome({ locale }: { locale: HomeLocale }) {
  const tr = copy[locale];

  return (
    <section id="why-castings" className="bg-white px-4 py-16 text-[#241d18] sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1fr] lg:items-center">
        <div>
          <h2 className="font-forge-headline text-4xl font-black tracking-normal sm:text-5xl">
            {tr.welcomeTitle}
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-8 text-[#5d5048]">
            <p>{tr.welcomeText1}</p>
            <p>{tr.welcomeText2}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {productImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`Suphancasting foundry work ${index + 1}`}
              className={`h-48 w-full object-cover shadow-sm ${index === 0 ? "col-span-2 h-72" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities({ locale }: { locale: HomeLocale }) {
  const tr = copy[locale];

  return (
    <section id="capabilities" className="bg-[#f5f1ec] px-4 py-16 text-[#241d18] sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1fr] lg:items-end">
          <div>
            <h2 className="font-forge-headline text-4xl font-black tracking-normal sm:text-5xl">
              {tr.capabilitiesTitle}
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#67564a]">{tr.capabilitiesSub}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {tr.capabilities.map(([title, body]) => (
              <article key={title} className="border-l-4 border-[#f15a24] bg-white p-5 shadow-sm">
                <h3 className="font-forge-headline text-2xl font-black">{title}</h3>
                <p className="mt-2 leading-7 text-[#67564a]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio({ locale }: { locale: HomeLocale }) {
  const tr = copy[locale];

  return (
    <section id="portfolio" className="bg-white px-4 py-16 text-[#241d18] sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-forge-headline text-4xl font-black tracking-normal sm:text-5xl">
            {tr.portfolioTitle}
          </h2>
          <Link href={withLang("/products", locale)} className="font-bold text-[#c74720] hover:text-[#211913]">
            {tr.portfolioCta} →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {tr.portfolio.map(([title, body, image]) => (
            <article key={title} className="group bg-[#f5f1ec] shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <img src={image} alt={title} className="h-64 w-full object-cover" />
              <div className="p-5">
                <h3 className="font-forge-headline text-2xl font-black">{title}</h3>
                <p className="mt-2 leading-7 text-[#67564a]">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactAndMap({ locale }: { locale: HomeLocale }) {
  const tr = copy[locale];

  return (
    <>
      <section id="contact" className="bg-[#f5f1ec] px-4 py-16 text-[#241d18] sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_0.42fr_0.9fr]">
          <div className="bg-white p-7 shadow-sm">
            <h2 className="font-forge-headline text-4xl font-black tracking-normal">{tr.contactTitle}</h2>
            <p className="mt-4 leading-8 text-[#67564a]">{tr.contactText}</p>
            <div className="mt-6 space-y-2 font-semibold">
              <a className="block text-[#c74720] hover:text-[#211913]" href="tel:0986362356">
                098-636-2356
                084-317 7788
              </a>
              <a className="block text-[#c74720] hover:text-[#211913]" href="mailto:SCNWMax@gmail.com">
                SCNWMax@gmail.com
              </a>
              <a className="block text-[#c74720] hover:text-[#211913]" href="tel:0843177788">
                084-317 7788
              </a>
              <a className="block text-[#c74720] hover:text-[#211913]" href={lineUrl}>
                LINE @213bzijc
              </a>
            </div>
            <p className="mt-5 text-sm leading-7 text-[#67564a]">{tr.address}</p>
          </div>

          <a href={lineUrl} className="flex flex-col items-center justify-center bg-white p-6 text-center shadow-sm">
            <img src="/suphancasting-assets/line-213bzijc-qr.png" alt="LINE @213bzijc QR" className="h-40 w-40 object-contain" />
            <div className="mt-4 font-forge-headline text-2xl font-black">LINE @213bzijc</div>
            <div className="mt-1 text-sm text-[#67564a]">Golf Sasithon</div>
          </a>

          <a
            href={mapUrl}
            className="relative min-h-[320px] overflow-hidden bg-[#d8cec3] p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(#8f7f70_1px,transparent_1px),linear-gradient(90deg,#8f7f70_1px,transparent_1px)] [background-size:38px_38px]" />
            <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-[#f15a24] bg-white shadow-xl" />
            <div className="relative flex h-full min-h-[260px] flex-col justify-between">
              <div>
                <div className="font-forge-headline text-4xl font-black text-[#211913]">Suphan Buri</div>
                <p className="mt-3 max-w-xs leading-7 text-[#5d5048]">{tr.address}</p>
              </div>
              <span className="inline-flex w-fit rounded bg-[#211913] px-5 py-3 font-black text-white">
                {tr.mapCta} →
              </span>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}

export function SuphancastingHome() {
  const [locale, setLocale] = useState<HomeLocale>("th");

  useEffect(() => {
    setLocale(getInitialLocale());
  }, []);

  const tr = useMemo(() => copy[locale], [locale]);

  return (
    <main className="bg-white text-[#241d18]">
      <TopFrame locale={locale} setLocale={setLocale} />
      <Hero locale={locale} />
      <Welcome locale={locale} />
      <Capabilities locale={locale} />
      <Portfolio locale={locale} />
      <AiAndContact locale={locale} />
      <footer className="bg-[#17120f] px-4 py-8 text-center text-sm text-[#d9cec3]">
        <img src={logoSrc} alt="" className="mx-auto mb-3 h-14 w-14 object-contain" />
        <p className="font-semibold">{tr.footer}</p>
        <p className="mt-2 text-[#a99688]">© {new Date().getFullYear()} Suphancasting. All rights reserved.</p>
      </footer>
    </main>
  );
}
