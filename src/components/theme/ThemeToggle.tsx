"use client";

import { IconSun, IconMoon } from "@/components/icons";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useTranslations } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/cn";

/**
 * Sun / moon toggle. Placed in the Header next to the language toggle.
 * Uses the same pill styling; keyboard-operable with aria-pressed.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-pressed={isDark}
      aria-label={isDark ? t.header.lightMode : t.header.darkMode}
      title={isDark ? t.header.lightMode : t.header.darkMode}
      className={cn(
        "grid size-9 place-items-center rounded-full border border-line/15 text-content/70 transition-colors hover:bg-content/[0.05] hover:text-content",
        className,
      )}
    >
      {isDark ? <IconSun className="size-5" /> : <IconMoon className="size-5" />}
    </button>
  );
}
