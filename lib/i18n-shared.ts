export const SUPPORTED_LOCALES = ["th", "en", "zh"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "th";

export function normalizeLocale(value?: string | null): Locale {
  if (!value) return DEFAULT_LOCALE;
  const lower = value.toLowerCase();
  if (lower === "th") return "th";
  if (lower === "en") return "en";
  if (lower === "zh" || lower === "cn" || lower === "ch") return "zh";
  return DEFAULT_LOCALE;
}

