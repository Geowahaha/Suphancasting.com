import Link from "next/link";

import { getRequestLocale } from "@/lib/i18n";
import { t } from "@/lib/translations";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";

export async function SiteHeader() {
  const locale = await getRequestLocale();
  const tr = t(locale);
  const nav = [
    { href: "/", label: tr.nav.home },
    { href: "/products", label: tr.nav.products },
    { href: "/about", label: tr.nav.about },
    { href: "/contact", label: tr.nav.contact },
    { href: "/blog", label: tr.nav.blog },
    { href: "/dashboard", label: tr.nav.portal },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 font-mono text-sm font-semibold tracking-wide text-foreground"
          aria-label="Suphancasting.com"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.20),rgba(255,255,255,0.06))]">
            SC
          </span>
          <span className="hidden sm:inline">Suphancasting.com</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher current={locale} />
          <Link
            href="/contact"
            className="hidden sm:inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            {tr.nav.getQuote}
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex rounded-xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06))] px-4 py-2 text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            {tr.nav.dashboard}
          </Link>
        </div>
      </Container>
    </header>
  );
}

