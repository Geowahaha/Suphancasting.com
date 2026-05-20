"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const lineUrl = "https://line.me/R/ti/p/@SCNW";
const pulleyLogo = "/successcasting-assets/logo/success-logo2-transparent.png";
const mapEmbedSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.3213722401542!2d100.17816574475148!3d14.350804150392461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e241004452e5a9%3A0xb32b522a55c34948!2sSuphan%20casting%20Co.%2Cltd.!5e0!3m2!1sen!2sus!4v1775020729048!5m2!1sen!2sus";

const socialLinks = [
  { label: "LINE", icon: "LINE", href: lineUrl },
  { label: "Facebook", icon: "f", href: "#contact" },
  { label: "Instagram", icon: "◎", href: "#contact" },
  { label: "LinkedIn", icon: "in", href: "#contact" },
];

const materials = [
  {
    code: "FC25",
    name: "เหล็กหล่อเทา / Gray Cast Iron",
    text: "งานหล่อ FC25 สำหรับ pulley, housing, base และชิ้นส่วนเครื่องจักรที่ต้องการลดแรงสั่นสะเทือนและควบคุมต้นทุน",
    img: "/successcasting-assets/shopee-new/pulley-product-fc25-no-price.png",
  },
  {
    code: "FCD",
    name: "เหล็กหล่อเหนียว / Ductile Cast Iron",
    text: "เหมาะกับงานที่ต้องการความเหนียว รับแรงกระแทก และความน่าเชื่อถือมากกว่าเหล็กหล่อเทาทั่วไป",
    img: "/successcasting-assets/shopee-new/large-gear-fcd.jpg",
  },
  {
    code: "SC46",
    name: "เหล็กกล้าหล่อ / Cast Steel",
    text: "สำหรับชิ้นส่วนรับแรง งานโครงสร้าง และงานอุตสาหกรรมที่ต้องควบคุมกระบวนการหล่ออย่างจริงจัง",
    img: "/successcasting-assets/shopee-new/molten-metal-sc46.jpg",
  },
  {
    code: "S45C",
    name: "Medium Carbon Steel",
    text: "เหมาะกับชิ้นงานที่ต้องการความแข็งแรงและมีขั้นตอนกลึง/ปรับแต่งต่อ เช่น hub, shaft และ custom machinery parts",
    img: "/successcasting-assets/shopee-new/grinding-machining-s45c.jpg",
  },
  {
    code: "Mo4140",
    name: "Chromium-Molybdenum Steel",
    text: "สำหรับงานหนักที่ต้องการความทนทานสูง ชิ้นส่วนเฉพาะทาง และงานซ่อมบำรุงที่ต้องลด downtime",
    img: "/successcasting-assets/shopee-new/mold-boxes-fc25.jpg",
  },
];

function HeroSlider() {
  const [activeBg, setActiveBg] = useState(0);
  const [focusImage, setFocusImage] = useState(false);
  const [paused, setPaused] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const currentBg = materials[activeBg];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActiveBg((v) => (v + 1) % materials.length), 5600);
    return () => window.clearInterval(id);
  }, [paused]);

  const goBg = (direction: number) => {
    setActiveBg((v) => (v + direction + materials.length) % materials.length);
    setPaused(true);
    setFocusImage(true);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if ((event.target as Element).closest("a,button")) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if ((event.target as Element).closest("a,button")) return;
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy)) {
      goBg(dx < 0 ? 1 : -1);
      return;
    }
    setFocusImage((value) => !value);
    setPaused(true);
  };

  return (
    <section
      className="relative min-h-[calc(100vh-92px)] overflow-hidden bg-[#17110f] text-white sm:min-h-[760px]"
      aria-label="Suphan Casting industrial casting hero slideshow"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <img
        key={currentBg.code}
        className="absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-700"
        src={currentBg.img}
        alt={`${currentBg.code} ${currentBg.name} background`}
        decoding="async"
        draggable={false}
      />
      <div className={`absolute inset-0 transition-opacity duration-500 ${focusImage ? "opacity-0" : "opacity-100"} bg-[linear-gradient(90deg,rgba(0,0,0,.86)_0%,rgba(0,0,0,.50)_48%,rgba(0,0,0,.18)_100%)]`} />
      <div className={`absolute inset-0 transition-opacity duration-500 ${focusImage ? "opacity-0" : "opacity-100"} bg-[radial-gradient(circle_at_72%_24%,rgba(217,157,45,.20),transparent_34%),linear-gradient(180deg,rgba(0,0,0,.62)_0%,rgba(0,0,0,.08)_45%,rgba(0,0,0,.68)_100%)]`} />
      <div className={`absolute inset-0 transition-opacity duration-500 ${focusImage ? "opacity-0" : "opacity-30"} [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:80px_80px]`} />

      <button type="button" aria-label="Previous background product" onClick={(event) => { event.stopPropagation(); goBg(-1); }} className="absolute left-4 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-[#120f0d]/45 text-3xl font-black text-white backdrop-blur transition hover:bg-[#ff5625] hover:text-zinc-950 sm:left-6">
        ‹
      </button>
      <button type="button" aria-label="Next background product" onClick={(event) => { event.stopPropagation(); goBg(1); }} className="absolute right-4 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-[#120f0d]/45 text-3xl font-black text-white backdrop-blur transition hover:bg-[#ff5625] hover:text-zinc-950 sm:right-6 lg:right-24">
        ›
      </button>

      <div className={`absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 overflow-hidden rounded-3xl bg-[#ff5625] p-2 shadow-2xl transition-opacity duration-500 lg:block ${focusImage ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {socialLinks.map((item) => (
          <a key={item.label} href={item.href} aria-label={item.label} className="mb-2 grid h-14 w-14 place-items-center rounded-full bg-[#17110f] text-xs font-black text-white last:mb-0 hover:bg-white hover:text-zinc-950">
            {item.icon}
          </a>
        ))}
      </div>

      <Link href="/contact" onClick={(event) => event.stopPropagation()} className={`absolute right-4 top-6 z-30 hidden rounded-full bg-[#ff5625] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.08em] text-zinc-950 shadow-2xl shadow-black/30 transition hover:scale-105 hover:bg-white sm:inline-flex lg:right-8 ${focusImage ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        Request a Quote
      </Link>

      <button type="button" onClick={(event) => { event.stopPropagation(); setFocusImage((value) => !value); setPaused(true); }} className="absolute bottom-5 right-5 z-30 rounded-full border border-white/20 bg-[#120f0d]/45 px-4 py-2 text-xs font-bold text-white/90 backdrop-blur transition hover:bg-white hover:text-zinc-950">
        {focusImage ? "แสดงข้อความ" : "คลิกที่รูปเพื่อดูเต็มภาพ"}
      </button>

      <div className="pointer-events-none absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {materials.map((item, index) => (
          <button
            key={item.code}
            type="button"
            aria-label={`Show ${item.code}`}
            onClick={(event) => { event.stopPropagation(); setActiveBg(index); setPaused(true); }}
            className={`pointer-events-auto h-2.5 rounded-full transition-all ${index === activeBg ? "w-8 bg-[#ff5625]" : "w-2.5 bg-white/50 hover:bg-white"}`}
          />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-92px)] max-w-7xl flex-col justify-center px-5 py-20 sm:min-h-[760px] sm:px-6 lg:px-8">
        <div className={`max-w-3xl transition-all duration-500 ${focusImage ? "pointer-events-none translate-y-4 opacity-0" : "translate-y-0 opacity-100"}`}>
          <div className="inline-flex rounded-full bg-[#120f0d]/45 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-zinc-100 backdrop-blur sm:text-xs">
            Professional Sand Casting
          </div>
          <p className="mt-5 inline-flex rounded-full bg-[#ff5625] px-4 py-2 text-[11px] font-black uppercase tracking-[0.20em] text-zinc-950 shadow-xl shadow-black/30 sm:px-5 sm:py-3 sm:text-xs">FC25 · FCD · SC46 · S45C · Mo4140</p>
          <h1 className="mt-7 max-w-2xl text-[2rem] font-black uppercase leading-[1.04] tracking-[-0.035em] text-white drop-shadow-2xl sm:text-5xl lg:text-6xl">
            Global Metal Castings<br />Machined Components
          </h1>
          <p className="mt-6 max-w-2xl border-l-4 border-[#ff5625] pl-5 text-base leading-8 text-zinc-100 drop-shadow-lg sm:text-lg">
            งานหล่อโลหะและชิ้นส่วนเครื่องจักรสำหรับลูกค้าอุตสาหกรรม โดยยึดข้อมูลติดต่อและที่ตั้งเดิมของ Suphancasting.com
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" onClick={(event) => event.stopPropagation()} className="inline-flex justify-center rounded-2xl bg-[#ff5625] px-8 py-4 text-sm font-black uppercase tracking-wide text-zinc-950 shadow-xl shadow-black/30 hover:bg-white sm:text-base">
              Request a Quote
            </Link>
            <Link href="/products" onClick={(event) => event.stopPropagation()} className="inline-flex justify-center rounded-2xl border border-white/35 bg-[#120f0d]/25 px-8 py-4 text-sm font-black text-white backdrop-blur hover:bg-white/10 sm:text-base">
              ดูผลงานสินค้า
            </Link>
          </div>
          <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
            <a href={lineUrl} onClick={(event) => event.stopPropagation()} className="rounded-2xl bg-white p-3 text-center text-zinc-950 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
              <img src="/successcasting-assets/line-official-qr.png" alt="QR code สำหรับเพิ่ม LINE @SCNW" className="mx-auto h-28 w-28 object-contain sm:h-32 sm:w-32" decoding="async" />
              <div className="mt-2 text-xs font-black">LINE @SCNW</div>
            </a>
            <div className="rounded-2xl bg-[#120f0d]/45 px-5 py-4 text-sm font-bold text-zinc-100 backdrop-blur">
              <span className="text-[#ff5625]">{currentBg.code}</span> · {currentBg.name}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TopBar() {
  return (
    <>
      <div className="bg-[#120f0d] px-4 py-2.5 text-xs text-white sm:text-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-center sm:gap-10">
          <a href="mailto:SCNWMax@gmail.com" className="hover:text-[#ff5625]">✉ Email: SCNWMax@gmail.com</a>
          <a href="tel:0986362356" className="hover:text-[#ff5625]">☎ โทร: 098-636-2356</a>
          <a href={lineUrl} className="hover:text-[#ff5625]">ผู้ติดต่อ: Golf Sasithon</a>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#15110f]/92 text-white shadow-lg backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src={pulleyLogo} alt="Suphan Casting industrial mark" className="h-20 w-20 object-contain sm:h-24 sm:w-24" decoding="async" />
            <span>
              <span className="block text-2xl font-semibold leading-none tracking-tight sm:text-3xl">Suphan Casting</span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-300 sm:text-sm">Sand Casting & Machined Components</span>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-2 text-sm font-semibold md:justify-end">
            <Link className="rounded px-3 py-2 hover:bg-[#ff5625] hover:text-zinc-950" href="/">หน้าแรก</Link>
            <Link className="rounded px-3 py-2 hover:bg-[#ff5625] hover:text-zinc-950" href="/products">สินค้า</Link>
            <a className="rounded px-3 py-2 hover:bg-[#ff5625] hover:text-zinc-950" href="#materials">วัสดุที่รับผลิต</a>
            <a className="rounded px-3 py-2 hover:bg-[#ff5625] hover:text-zinc-950" href="#why">ทำไมต้องเรา</a>
            <a className="rounded px-3 py-2 hover:bg-[#ff5625] hover:text-zinc-950" href="#contact">ติดต่อเรา</a>
            <Link className="rounded-2xl bg-[#ff5625] px-4 py-2 font-black text-zinc-950 hover:bg-white" href="/contact">ขอใบเสนอราคา</Link>
          </nav>
        </div>
      </header>
    </>
  );
}

function MaterialSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % materials.length), 4300);
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (direction: number) => {
    setActive((v) => (v + direction + materials.length) % materials.length);
    setPaused(true);
  };

  const current = materials[active];

  return (
    <section id="materials" className="bg-[#fff4ec] px-4 py-16 text-zinc-800 sm:px-6 lg:px-8" onPointerDown={() => setPaused(true)} onTouchStart={() => setPaused(true)}>
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
        <div>
          <p className="inline-flex rounded-full bg-[#ff5625] px-4 py-2 text-xs font-black uppercase tracking-[0.20em] text-zinc-950">วัสดุหลักที่รับผลิต</p>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-zinc-950 sm:text-5xl">FC25, FCD, SC46, S45C, Mo4140</h2>
          <p className="mt-5 text-base leading-8 text-zinc-600 sm:text-lg">
            Suphan Casting โฟกัสงานหล่อทรายและชิ้นส่วนเครื่องจักรตามแบบลูกค้า พร้อมให้คำแนะนำวัสดุตามลักษณะการใช้งานจริง
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {materials.map((item, index) => (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setActive(index);
                  setPaused(true);
                }}
                className={`rounded border px-4 py-2 text-sm font-bold transition ${index === active ? "border-[#ff5625] bg-[#ff5625] text-zinc-950" : "border-zinc-300 bg-white text-zinc-700 hover:border-[#ff5625]"}`}
              >
                {item.code}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white shadow-2xl shadow-black/15">
          <div className="relative min-h-[420px]">
            <img src={current.img} alt={`${current.code} casting product`} className="absolute inset-0 h-full w-full object-cover" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="mb-4 inline-flex rounded bg-[#ff5625] px-4 py-2 text-2xl font-black text-zinc-950">{current.code}</div>
              <h3 className="text-2xl font-black text-white sm:text-3xl">{current.name}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-100 sm:text-base">{current.text}</p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="text-xs uppercase tracking-[0.20em] text-zinc-300">{paused ? "Manual mode" : "สไลด์อัตโนมัติ"} · {active + 1}/5</div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-2xl text-white ring-1 ring-white/30 hover:bg-[#ff5625] hover:text-zinc-950" aria-label="Previous material">‹</button>
                  <button type="button" onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-2xl text-white ring-1 ring-white/30 hover:bg-[#ff5625] hover:text-zinc-950" aria-label="Next material">›</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeContactSection() {
  return (
    <section id="contact" className="bg-[#222] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.9fr_.78fr_1.05fr] lg:items-stretch">
        <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ff5625]">ติดต่อเรา</p>
          <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">ส่งรูปชิ้นงานหรือแบบเพื่อประเมินราคา</h2>
          <div className="mt-5 space-y-2 text-sm leading-7 text-zinc-200 sm:text-base">
            <p><span className="font-bold text-white">บริษัท:</span> Suphan casting Co., ltd.</p>
            <p><span className="font-bold text-white">ที่อยู่:</span> จังหวัดสุพรรณบุรี, ประเทศไทย</p>
            <p><span className="font-bold text-white">โทร:</span> <a href="tel:0986362356" className="text-[#ff5625] hover:text-white">098-636-2356</a></p>
            <p><span className="font-bold text-white">Email:</span> <a href="mailto:SCNWMax@gmail.com" className="text-[#ff5625] hover:text-white">SCNWMax@gmail.com</a></p>
            <p><span className="font-bold text-white">LINE:</span> <a href={lineUrl} className="text-[#ff5625] hover:text-white">@SCNW</a></p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={lineUrl} className="rounded-2xl bg-[#ff5625] px-6 py-3 text-center font-black text-zinc-950 hover:bg-white">ส่งรูปผ่าน LINE</a>
            <Link href="/contact" className="rounded-2xl border border-white/20 px-6 py-3 text-center font-black text-white hover:bg-white hover:text-zinc-950">หน้า Contact เต็ม</Link>
          </div>
        </div>

        <a href={lineUrl} className="flex items-center justify-center gap-5 rounded-3xl bg-white p-5 text-zinc-950 shadow-2xl shadow-black/30 lg:flex-col">
          <img src="/successcasting-assets/line-official-qr.png" alt="LINE QR @SCNW" className="h-32 w-32 object-contain sm:h-40 sm:w-40" decoding="async" />
          <div className="text-left lg:text-center">
            <div className="text-lg font-black">ผู้ติดต่อ: Golf Sasithon</div>
            <div className="mt-1 text-sm text-zinc-600">กดหรือสแกนเพื่อส่งรูปชิ้นงาน</div>
          </div>
        </a>

        <div className="min-h-[280px] overflow-hidden rounded-3xl bg-zinc-800 ring-1 ring-white/10">
          <iframe
            src={mapEmbedSrc}
            width="600"
            height="320"
            style={{ border: 0, width: "100%", height: "100%", minHeight: 280 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Suphan casting Co., Ltd. Google Map"
          />
        </div>
      </div>
    </section>
  );
}

export function SuccessCastingHome() {
  return (
    <main className="bg-white text-zinc-800">
      <TopBar />
      <HeroSlider />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.75fr_1fr] lg:items-center">
          <div>
          <p className="mb-4 inline-flex rounded-full bg-[#ff5625] px-4 py-2 text-xs font-black text-zinc-950">About Us</p>
          <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.05em] text-zinc-950 sm:text-5xl">Casting and Machining Metal Components</h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-zinc-600 sm:text-lg">
            <p>
              Suphan Casting ให้บริการผลิตชิ้นงานหล่อทราย ชิ้นส่วนเครื่องจักร และงานตามแบบลูกค้า โดยเน้นความถูกต้องของวัสดุ ความแข็งแรง และการส่งมอบที่ใช้งานได้จริงในโรงงานอุตสาหกรรม
            </p>
            <p>
              เรารับงานตั้งแต่งานจำนวนน้อย งานซ่อมบำรุง ไปจนถึงงานกึ่ง production พร้อมรองรับวัสดุ FC25, FCD, SC46, S45C และ Mo4140 รวมถึงงาน SUC Pulley และอะไหล่เครื่องจักรเฉพาะทาง
            </p>
          </div>
          </div>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[#ff5625] p-3 shadow-2xl shadow-black/15">
            <img src="/successcasting-assets/shopee-new/mold-boxes-fc25.jpg" alt="Suphan Casting mold boxes and casting portfolio" className="h-[420px] w-full rounded-[1.1rem] object-cover" decoding="async" />
            <Link href="/products" aria-label="ดูผลงานสินค้า 20+ รูป" className="group absolute bottom-7 left-7 rounded-2xl bg-[#120f0d]/80 px-5 py-4 text-white backdrop-blur transition hover:-translate-y-1 hover:bg-[#ff5625] hover:text-zinc-950 focus:outline-none focus:ring-4 focus:ring-[#ff5625]/60">
              <div className="text-3xl font-black">20+</div>
              <div className="text-sm text-zinc-300 transition group-hover:text-zinc-950">real product images</div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="inline-block border-b-4 border-[#ff5625] pb-2 text-4xl font-black uppercase tracking-[-0.04em] text-zinc-950 sm:text-5xl">ผลงานสินค้า</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["SUC Pulley / พูลเล่ย์", "/successcasting-assets/shopee-new/pulley-product-fc25-no-price.png", "งาน pulley จาก FC25/FCD ตามตัวอย่างหรือ drawing"],
              ["เฟืองและชิ้นส่วนส่งกำลัง", "/successcasting-assets/shopee-new/gear-fcd.jpg", "เหมาะกับ FCD / FC25 สำหรับงานรับแรงและระบบส่งกำลัง"],
              ["ชิ้นงานหล่อและงาน machining", "/successcasting-assets/shopee-new/grinding-machining-s45c.jpg", "งาน S45C / Mo4140 ที่ต้องการกลึง เจียร์ หรือปรับแต่งต่อ"],
            ].map(([title, img, body]) => (
              <article key={title} className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <img src={img} alt={title} className="h-64 w-full object-cover" decoding="async" />
                <div className="p-5">
                  <h3 className="text-xl font-black text-zinc-950">{title}</h3>
                  <p className="mt-2 leading-7 text-zinc-600">{body}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/products" className="mt-7 inline-flex rounded-2xl bg-[#ff5625] px-7 py-3 font-black text-zinc-950 hover:bg-[#17110f] hover:text-white">ดูสินค้าทั้งหมด</Link>
        </div>
      </section>

      <MaterialSlider />

      <section id="why" className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            ["รับงานตามแบบ", "ส่ง drawing, รูปตัวอย่าง หรือชิ้นงานเดิม เพื่อประเมินวัสดุและกระบวนการผลิต"],
            ["ติดต่อผู้รับผิดชอบ", "ติดต่อ Golf Sasithon หรือส่งรายละเอียดงานผ่านช่องทางติดต่อเดิมของ Suphancasting.com"],
            ["โฟกัสงานอุตสาหกรรม", "วัสดุหลัก FC25, FCD, SC46, S45C, Mo4140 สำหรับงานเครื่องจักรและอะไหล่เฉพาะทาง"],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-zinc-200 bg-[#fff8f3] p-6">
              <h3 className="text-xl font-semibold text-[#b8322a]">{title}</h3>
              <p className="mt-3 leading-7 text-zinc-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <HomeContactSection />
    </main>
  );
}
