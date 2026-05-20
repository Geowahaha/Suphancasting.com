import type { Metadata } from "next";
import Link from "next/link";

const lineUrl = "https://line.me/R/ti/p/@SCNW";
const pulleyLogo = "/successcasting-assets/logo/success-logo2-transparent.png";
const mapEmbedSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.3213722401542!2d100.17816574475148!3d14.350804150392461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e241004452e5a9%3A0xb32b522a55c34948!2sSuphan%20casting%20Co.%2Cltd.!5e0!3m2!1sen!2sus!4v1775020729048!5m2!1sen!2sus";

export const metadata: Metadata = {
  title: "Contact Us | Suphancasting.com",
  description:
    "ติดต่อ Suphan casting Co., ltd. สำหรับงานหล่อทราย FC25, FCD, SC46, S45C, Mo4140 โทร 098-636-2356 อีเมล SCNWMax@gmail.com ที่ตั้งจังหวัดสุพรรณบุรี ประเทศไทย.",
};

function TopBar() {
  return (
    <>
      <div className="bg-[#120f0d] px-4 py-3 text-sm text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-10">
          <a href="mailto:SCNWMax@gmail.com" className="hover:text-[#ff5625]">✉ Email: SCNWMax@gmail.com</a>
          <a href="tel:0986362356" className="hover:text-[#ff5625]">☎ โทร: 098-636-2356</a>
          <a href={lineUrl} className="hover:text-[#ff5625]">ผู้ติดต่อ: Golf Sasithon</a>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#15110f]/92 text-white shadow-lg backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-4">
            <img src={pulleyLogo} alt="Suphan Casting industrial mark" className="h-32 w-32 object-contain" decoding="async" />
            <span>
              <span className="block text-2xl font-semibold leading-none tracking-tight sm:text-3xl">Suphan Casting</span>
              <span className="mt-2 block text-xs font-black uppercase tracking-[0.22em] text-[#ff5625]">SAND CASTING & MACHINED COMPONENTS</span>
            </span>
          </Link>
          <nav className="flex flex-wrap items-center gap-5 text-sm font-bold uppercase tracking-[0.16em] text-zinc-200">
            <Link href="/" className="hover:text-[#ff5625]">หน้าแรก</Link>
            <Link href="/products" className="hover:text-[#ff5625]">สินค้า</Link>
            <Link href="/#materials" className="hover:text-[#ff5625]">วัสดุที่รับผลิต</Link>
            <Link href="/#why-us" className="hover:text-[#ff5625]">ทำไมต้องเรา</Link>
            <a href={lineUrl} className="rounded-full bg-[#ff5625] px-5 py-3 text-zinc-950 hover:bg-white">ขอใบเสนอราคา</a>
          </nav>
        </div>
      </header>
    </>
  );
}

export default function ContactPage() {
  return (
    <main className="bg-white text-zinc-800">
      <TopBar />

      <section className="border-b border-zinc-200 bg-zinc-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-700">Contact Us</h1>
          <div className="text-lg text-zinc-500">
            <Link href="/" className="font-semibold text-[#b8322a] hover:text-[#ff5625]">Home</Link>
            <span className="px-3 text-zinc-300">/</span>
            <span>Contact Us</span>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.48fr]">
          <form action="mailto:SCNWMax@gmail.com" method="post" encType="text/plain" className="space-y-6">
            <div>
              <h2 className="inline-block border-b border-[#b8322a] pb-3 text-4xl font-light tracking-wide text-[#b8322a]">Contact Us</h2>
              <p className="mt-12 text-xl leading-9 text-zinc-600">
                We welcome your comments and questions. Please use the form below to contact us or send your drawing / product photos by LINE Official.
              </p>
            </div>

            <label className="block">
              <span className="text-lg font-bold text-zinc-600">Your email address</span>
              <input name="email" type="email" placeholder="E-mail" className="mt-3 w-full rounded border border-zinc-300 bg-white px-5 py-4 text-xl text-zinc-800 outline-none transition focus:border-[#b8322a] focus:ring-2 focus:ring-[#b8322a]/20" />
            </label>

            <label className="block">
              <span className="text-lg font-bold text-zinc-600">Your name</span>
              <input name="name" placeholder="Full Name" className="mt-3 w-full rounded border border-zinc-300 bg-white px-5 py-4 text-xl text-zinc-800 outline-none transition focus:border-[#b8322a] focus:ring-2 focus:ring-[#b8322a]/20" />
            </label>

            <label className="block">
              <span className="text-lg font-bold text-zinc-600">Phone / LINE ID</span>
              <input name="contact" placeholder="098-xxx-xxxx / @LINE" className="mt-3 w-full rounded border border-zinc-300 bg-white px-5 py-4 text-xl text-zinc-800 outline-none transition focus:border-[#b8322a] focus:ring-2 focus:ring-[#b8322a]/20" />
            </label>

            <label className="block">
              <span className="text-lg font-bold text-zinc-600">Your message</span>
              <textarea name="message" rows={5} placeholder="Message" className="mt-3 w-full rounded border border-zinc-300 bg-white px-5 py-4 text-xl text-zinc-800 outline-none transition focus:border-[#b8322a] focus:ring-2 focus:ring-[#b8322a]/20" />
            </label>

            <button type="submit" className="rounded bg-[#b8322a] px-8 py-4 text-2xl font-medium text-white transition hover:bg-[#ff5625] hover:text-zinc-950">
              Contact Us
            </button>
          </form>

          <aside className="space-y-12">
            <section>
              <h2 className="inline-block border-b border-[#b8322a] pb-3 text-4xl font-light tracking-wide text-[#b8322a]">Our Address</h2>
              <div className="mt-12 space-y-3 text-xl leading-8 text-zinc-600">
                <p>
                  <span className="font-semibold text-zinc-800">บริษัท:</span> Suphan casting Co., ltd.
                </p>
                <p>
                  <span className="font-semibold text-zinc-800">ที่อยู่:</span><br />
                  จังหวัดสุพรรณบุรี<br />
                  ประเทศไทย
                </p>
                <p>
                  Phone: <a href="tel:0986362356" className="text-[#b8322a] hover:text-[#ff5625]">098-636-2356</a>
                </p>
                <p>
                  Email: <a href="mailto:SCNWMax@gmail.com" className="text-[#b8322a] hover:text-[#ff5625]">SCNWMax@gmail.com</a>
                </p>
                <p>
                  ผู้ติดต่อ: <span className="text-zinc-800">Golf Sasithon</span>
                </p>
              </div>
              <a href={lineUrl} className="mt-8 inline-flex items-center gap-4 rounded border border-zinc-200 bg-zinc-50 p-4 transition hover:border-[#b8322a] hover:bg-white">
                <img src="/successcasting-assets/line-official-qr.png" alt="Suphan Casting LINE official QR code @SCNW" className="h-28 w-28 bg-white object-contain" decoding="async" />
                <span>
                  <span className="block text-lg font-bold text-zinc-800">LINE Official</span>
                  <span className="block text-[#b8322a]">ช่องทางเสริม LINE @SCNW</span>
                </span>
              </a>
            </section>

            <section>
              <h2 className="inline-block border-b border-[#b8322a] pb-3 text-4xl font-light tracking-wide text-[#b8322a]">Google Map</h2>
              <div className="mt-10 overflow-hidden border border-zinc-200 bg-zinc-100 shadow-sm">
                <iframe
                  src={mapEmbedSrc}
                  width="600"
                  height="450"
                  style={{ border: 0, width: "100%" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Suphan casting Co., Ltd. Google Map"
                />
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
