import Link from "next/link";
import { getRequestLocale } from "@/lib/i18n";
import { t } from "@/lib/translations";

export async function SiteFooter() {
  const locale = await getRequestLocale();
  const tr = t(locale);
  const links = [
    { href: "/products", label: tr.nav.products },
    { href: "/about", label: tr.nav.about },
    { href: "/contact", label: tr.nav.contact },
    { href: "/blog", label: tr.nav.blog },
    { href: "/dashboard", label: tr.nav.portal },
  ];
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3 font-mono">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                SC
              </span>
              <div>
                <div className="text-sm font-semibold">Suphancasting.com</div>
                <div className="text-xs text-muted-2">
                  {tr.footer.tagline}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-2">
            © {year} Suphancasting. {tr.footer.rights}
          </div>
          <div className="text-xs text-muted-2">
            {tr.footer.built}
          </div>
        </div>
      </div>
    </footer>
  );
}

