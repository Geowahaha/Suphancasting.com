"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "suphancasting-theme";

export const THEME_CHANGE_EVENT = "suphancasting:themechange";

/** Applies the theme to <html>, remembers it, and notifies useIsDark subscribers. */
export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* private mode — the toggle still works for this page view */
  }
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: theme }));
}

/**
 * True when the dark theme is active. Starts `false` so server and first client
 * render agree; the effect corrects it immediately after mount.
 */
export function useIsDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const read = () => setIsDark(document.documentElement.classList.contains("dark"));
    read();
    window.addEventListener(THEME_CHANGE_EVENT, read);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, read);
  }, []);

  return isDark;
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.7 14.6A8.6 8.6 0 1 1 9.4 3.3a1 1 0 0 1 1.2 1.4 6.6 6.6 0 0 0 8.7 8.7 1 1 0 0 1 1.4 1.2Z"
      />
    </svg>
  );
}

/**
 * Light/dark switch. The actual theme is applied before paint by the inline
 * script in app/layout.tsx; this component only reflects and changes it, so it
 * renders a stable placeholder until mounted to avoid a hydration mismatch.
 */
export function ThemeToggle({
  lang = "th",
  className = "",
}: {
  lang?: "th" | "en";
  className?: string;
}) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";
  const label =
    lang === "th"
      ? next === "dark"
        ? "เปลี่ยนเป็นโหมดมืด"
        : "เปลี่ยนเป็นโหมดสว่าง"
      : next === "dark"
        ? "Switch to dark mode"
        : "Switch to light mode";

  return (
    <button
      type="button"
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
      aria-label={label}
      title={label}
      className={className}
    >
      {/* Before mount `theme` is null; render the sun so the box never resizes. */}
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

/**
 * Runs before first paint so the correct theme is on <html> for the very first
 * frame. Stringified deliberately — it must not wait for React to hydrate.
 */
export const THEME_INIT_SCRIPT = `(function(){try{
var k=${JSON.stringify(THEME_STORAGE_KEY)};
var s=localStorage.getItem(k);
var t=(s==="dark"||s==="light")?s:"light";
if(t==="dark")document.documentElement.classList.add("dark");
document.documentElement.style.colorScheme=t;
}catch(e){}})();`;
