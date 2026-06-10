import type { Metadata } from "next";
import Link from "next/link";

const lineUrl = "https://line.me/R/ti/p/@213bzijc";
const pulleyLogo = "/stitch/suphancasting-ai-home/uploads/logo-suphan.png";

const productRows = [
  {
    material: "FC25",
    title: "SUC Pulley — FC25 Gray Cast Iron",
    img: "/suphancasting-assets/shopee-products/LINE_NOTE_260502_2.jpg",
    description:
      "Pulley / drive gear casting สำหรับระบบส่งกำลังโรงสีและเครื่องจักรอุตสาหกรรม วัสดุ FC25 เหมาะกับงานหล่อเทา ลดแรงสั่นสะเทือน กลึงต่อได้ดี และคุมต้นทุนได้จริง.",
    specs: ["SUC Pulley / wheel / drive gear", "FC25 gray cast iron", "Machining-ready casting allowance"],
  },
  {
    material: "FCD",
    title: "SUC Pulley — Ductile Iron",
    img: "/suphancasting-assets/shopee-products/LINE_NOTE_260502_5.jpg",
    description:
      "FCD สำหรับพูลเล่ย์และชิ้นส่วนเครื่องจักรที่ต้องการความเหนียวและรับแรงกระแทกสูงกว่าเหล็กหล่อเทาทั่วไป.",
    specs: ["เหล็กหล่อเหนียว", "Suitable for load-bearing parts", "OEM casting by drawing/sample"],
  },
  {
    material: "SC46",
    title: "Cast Steel Machinery Parts",
    img: "/suphancasting-assets/shopee-products/LINE_NOTE_260502_10.jpg",
    description:
      "SC46 สำหรับงานเหล็กกล้าหล่อ ชิ้นส่วนรับแรง งานโครงสร้าง และงานโรงงานที่ต้องควบคุมกระบวนการผลิตอย่างจริงจัง.",
    specs: ["เหล็กกล้าหล่อ", "Sand casting process", "Inspection before delivery"],
  },
  {
    material: "S45C",
    title: "Machinery Shafts / Hubs / Custom Parts",
    img: "/suphancasting-assets/shopee-products/LINE_NOTE_260502_15.jpg",
    description:
      "S45C สำหรับชิ้นงานที่ต้องการความแข็งแรง งานกลึงต่อ งาน hub, shaft และอะไหล่เครื่องจักรตามแบบเฉพาะ.",
    specs: ["Medium-carbon steel", "Custom geometry", "Replacement and OEM support"],
  },
  {
    material: "Mo4140",
    title: "High Strength Heavy-Duty Components",
    img: "/suphancasting-assets/shopee-products/LINE_NOTE_260502_20.jpg",
    description:
      "Mo4140 / chromium-molybdenum steel สำหรับงานหนัก งานแข็งแรงสูง ชิ้นส่วนเฉพาะทาง และงานซ่อมบำรุงที่ต้องลด downtime.",
    specs: ["Heavy-duty application", "High strength material family", "Controlled production planning"],
  },
];

const galleryImages = Array.from({ length: 20 }, (_, index) => `/suphancasting-assets/shopee-products/LINE_NOTE_260502_${index + 1}.jpg`);

const newGalleryImages = [
  ["Pulley product FC25", "/suphancasting-assets/shopee-new/pulley-product-fc25-no-price.png?v=3"],
  ["FCD gear", "/suphancasting-assets/shopee-new/gear-fcd.jpg?v=2"],
  ["FCD large gear", "/suphancasting-assets/shopee-new/large-gear-fcd.jpg?v=2"],
  ["SC46 molten metal", "/suphancasting-assets/shopee-new/molten-metal-sc46.jpg?v=2"],
  ["S45C / Mo4140 machining", "/suphancasting-assets/shopee-new/grinding-machining-s45c.jpg?v=2"],
  ["FC25 mold boxes", "/suphancasting-assets/shopee-new/mold-boxes-fc25.jpg?v=2"],
];

const processVideos = [
  ["Pattern & mold components", "/suphancasting-assets/shopee-video/pattern-and-mold-components.mp4", "FC25 / FCD"],
  ["Cylindrical castings", "/suphancasting-assets/shopee-video/cylindrical-castings-fc-fcd.mp4", "FC25 / FCD"],
  ["Mold box production", "/suphancasting-assets/shopee-video/mold-box-production.mp4", "FC25 / SC46"],
];

export const metadata: Metadata = {
  title: "สินค้า | Suphan Casting",
  description:
    "สินค้าของ Suphan Casting แยกตามวัสดุ FC25, FCD, SC46, S45C, Mo4140 รวม SUC Pulley และชิ้นส่วนเครื่องจักรอุตสาหกรรม.",
};

function TopBar() {
  return (
    <>
      <div className="bg-[#120f0d] px-4 py-3 text-sm text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-10">
          <a href="mailto:SCNWMax@gmail.com" className="hover:text-[#ff5625]">✉ Email: SCNWMax@gmail.com</a>
          <a href="tel:0986362356" className="hover:text-[#ff5625]">☎ โทร: 098-636-2356</a>
          <a href="tel:0843177788" className="hover:text-[#ff5625]">☎ โทร: 084-317 7788</a>
          <a href={lineUrl} className="hover:text-[#ff5625]">ผู้ติดต่อ: กอล์ฟ ศศิธร</a>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#15110f]/92 text-white shadow-lg backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-4">
            <img src={pulleyLogo} alt="Suphan Casting industrial mark" className="h-32 w-32 object-contain" decoding="async" />
            <span>
              <span className="block text-2xl font-semibold leading-none tracking-tight sm:text-3xl">Suphan Casting</span>
              <span className="text-xs uppercase tracking-[0.18em] text-zinc-300 sm:text-sm">Sand Casting & Machined Components</span>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-2 text-sm font-semibold md:justify-end">
            <Link className="rounded px-4 py-3 hover:bg-[#ff5625] hover:text-zinc-950" href="/">หน้าแรก</Link>
            <Link className="rounded px-4 py-3 hover:bg-[#ff5625] hover:text-zinc-950" href="/products">สินค้า</Link>
            <Link className="rounded px-4 py-3 hover:bg-[#ff5625] hover:text-zinc-950" href="/#materials">วัสดุที่รับผลิต</Link>
            <Link className="rounded px-4 py-3 hover:bg-[#ff5625] hover:text-zinc-950" href="/#why">ทำไมต้องเรา</Link>
            <Link className="rounded-2xl bg-[#ff5625] px-5 py-3 font-black text-zinc-950 hover:bg-white" href="/contact">ขอใบเสนอราคา</Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export default function ProductsPage() {
  return (
    <main className="bg-[#07090b] text-white">
      <TopBar />
      <section className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-35">
          <img src="/suphancasting-assets/shopee-products/LINE_NOTE_260502_1.jpg" alt="Suphan Casting product background" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/45" />
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="relative">
          <p className="mb-4 inline-flex rounded-full bg-[#ff5625] px-5 py-3 text-xs font-black uppercase tracking-[0.32em] text-zinc-950">ผลงานสินค้า</p>
          <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div>
              <h1 className="font-forge-headline text-5xl font-black uppercase leading-none tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
                Metal Castings and Machined Components
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-9 text-zinc-300">
                สินค้างานหล่อแยกตามวัสดุหลักที่ Suphan Casting เชี่ยวชาญ พร้อมภาพชิ้นงานจริงจากโฟลเดอร์ Shopee/product เพื่อให้ลูกค้าเห็น portfolio จริงและเชื่อมั่นก่อนขอใบเสนอราคา.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
              <h2 className="text-xl font-black">สินค้าหลักที่รับผลิต</h2>
              <p className="mt-3 text-zinc-300">SUC Pulley จาก FC25 / FCD และงานหล่อตามแบบจาก FC25, FCD, SC46, S45C, Mo4140</p>
              <Link href="/contact" className="mt-5 inline-flex rounded-3xl bg-[#ff5625] px-6 py-3 font-black text-zinc-950 hover:bg-white">
                ขอใบเสนอราคา
              </Link>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {productRows.map((item) => (
            <article key={item.material} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-xl shadow-black/30">
              <div className="relative h-72 overflow-hidden bg-zinc-900">
                <img src={item.img} alt={item.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute left-5 top-5 rounded-xl bg-[#ff5625] px-4 py-2 font-forge-headline text-2xl font-black text-zinc-950">
                  {item.material}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-black text-white">{item.title}</h2>
                <p className="mt-4 leading-8 text-zinc-300">{item.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-zinc-300">
                  {item.specs.map((spec) => (
                    <li key={spec} className="flex gap-2">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ff5625]" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-20 text-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 inline-flex rounded-full bg-[#ff5625] px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-zinc-950">Real product gallery</p>
          <h2 className="text-4xl font-black uppercase tracking-[-0.04em] sm:text-6xl">รูปภาพผลงานสินค้า</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">ใช้รูปผลงานจริงจากคลังสินค้าของ Suphan Casting เป็นหลัก และเพิ่มรูปใหม่เฉพาะที่เป็นงานหล่อ/ชิ้นส่วนเครื่องจักรเท่านั้น ไม่ใช้รูปเอกสาร กระดาษตัวเลข หรือวิดีโอที่ไม่เกี่ยวกับกระบวนการหล่อ.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((img, index) => (
              <figure key={img} className="group overflow-hidden rounded-3xl bg-zinc-100 shadow-sm ring-1 ring-zinc-200">
                <img src={img} alt={`Suphan Casting product photo ${index + 1}`} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                <figcaption className="flex items-center justify-between px-4 py-3 text-sm font-bold text-zinc-700">
                  <span>Product #{index + 1}</span>
                  <span className="text-[#a66f12]">Suphan Casting</span>
                </figcaption>
              </figure>
            ))}
            {newGalleryImages.map(([label, img]) => (
              <figure key={img} className="group overflow-hidden rounded-3xl bg-zinc-100 shadow-sm ring-1 ring-zinc-200">
                <img src={img} alt={`Suphan Casting ${label}`} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                <figcaption className="flex items-center justify-between px-4 py-3 text-sm font-bold text-zinc-700">
                  <span>{label}</span>
                  <span className="text-[#a66f12]">new casting</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {processVideos.map(([title, src, material]) => (
              <article key={src} className="overflow-hidden rounded-[2rem] bg-[#17110f] text-white shadow-xl shadow-black/20">
                <video src={src} className="h-80 w-full bg-[#120f0d] object-cover" muted loop playsInline preload="metadata" controls />
                <div className="p-5">
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-2 text-sm text-zinc-300">เหมาะกับ: {material}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
