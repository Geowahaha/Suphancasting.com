"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type Locale, SUPPORTED_LOCALES } from "@/lib/i18n-shared";

const labels: Record<Locale, string> = {
  th: "ไทย",
  en: "EN",
  zh: "中文",
};

const forgeSelectClass =
  "h-9 rounded-md border border-white/[0.06] bg-[#161616] px-3.5 text-xs uppercase tracking-tight text-[#a8a29e] transition-colors hover:border-white/[0.12] hover:text-white";

export function LanguageSwitcher({
  current,
  variant = "default",
}: {
  current: Locale;
  variant?: "default" | "forge";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onChange(nextLocale: Locale) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLocale);

    void fetch("/api/lang", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: nextLocale }),
    });

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      value={current}
      onChange={(e) => onChange(e.target.value as Locale)}
      className={variant === "forge" ? forgeSelectClass : "h-9 rounded-lg border border-white/10 bg-white/5 px-2 text-xs"}
      aria-label="Language switcher"
    >
      {SUPPORTED_LOCALES.map((lc) => (
        <option key={lc} value={lc}>
          {labels[lc]}
        </option>
      ))}
    </select>
  );
}

