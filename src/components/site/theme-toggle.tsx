"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { themeStorageKey, type ResolvedTheme } from "../../lib/theme";
import { cn } from "../../lib/utils";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ResolvedTheme>("light");
  const isDark = theme === "dark";
  const label = `Switch to ${isDark ? "light" : "dark"} mode`;

  useEffect(() => {
    const initialTheme = getCurrentTheme();

    setTheme(initialTheme);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (getStoredTheme()) return;

      const nextTheme = media.matches ? "dark" : "light";
      applyTheme(nextTheme);
      setTheme(nextTheme);
    };

    media.addEventListener("change", handleSystemThemeChange);

    return () => media.removeEventListener("change", handleSystemThemeChange);
  }, []);

  return (
    <button
      type="button"
      className="relative inline-grid h-10 w-10 flex-none cursor-pointer place-items-center rounded-md border border-line bg-surface text-muted transition-[background-color,border-color,color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-raised hover:text-ink active:scale-[0.96]"
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      onClick={() => {
        const nextTheme = isDark ? "light" : "dark";

        storeTheme(nextTheme);
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }}
    >
      <Sun
        className={cn(
          "absolute transition-[opacity,rotate,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
          !isDark && "scale-50 rotate-45 opacity-0",
        )}
        size={17}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          "absolute transition-[opacity,rotate,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
          isDark && "scale-50 -rotate-45 opacity-0",
        )}
        size={17}
        aria-hidden="true"
      />
    </button>
  );
}

function getCurrentTheme(): ResolvedTheme {
  const appliedTheme = document.documentElement.dataset.theme;

  if (appliedTheme === "light" || appliedTheme === "dark") {
    return appliedTheme;
  }

  return getStoredTheme() ?? getSystemTheme();
}

function getStoredTheme(): ResolvedTheme | null {
  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey);

    return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
  } catch (_) {
    return null;
  }
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: ResolvedTheme) {
  document.documentElement.dataset.theme = theme;
}

function storeTheme(theme: ResolvedTheme) {
  try {
    window.localStorage.setItem(themeStorageKey, theme);
  } catch (_) {}
}
