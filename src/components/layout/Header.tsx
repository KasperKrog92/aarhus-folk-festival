"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FavouriteButton } from "@/components/ui/FavouriteButton";
import { FolkBorder } from "@/components/decorative/FolkBorder";
import { IconMenu, IconClose } from "@/components/icons";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import { locales } from "@/i18n/config";
import { useLocale, useTranslations } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/cn";

export function Header() {
  const { locale } = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const ticketHref = site.ticketUrl[locale];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Subtle shadow / stronger background once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;
      if (menuRef.current?.contains(target)) return;
      if (menuButtonRef.current?.contains(target)) return;

      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  const isActiveNavItem = (href: string) => {
    const [path, anchor] = href.split("#");

    if (anchor) {
      return pathname === path && hash === `#${anchor}`;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "relative z-10 bg-surface/90 backdrop-blur transition-shadow",
          scrolled && "shadow-[0_1px_0_rgba(42,34,29,0.08)]",
        )}
      >
        <Container className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label={`${site.name}, ${t.header.home}`}
          >
            <Image
              src="/logos/logo_text_header.png"
              alt={site.name}
              width={240}
              height={125}
              className="h-11 w-auto sm:h-12 lg:h-14 dark:hidden"
            />
            <Image
              src="/logos/logo_text_header_light.png"
              alt={site.name}
              width={240}
              height={125}
              className="hidden h-11 w-auto sm:h-12 lg:h-14 dark:block"
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label={t.header.mainMenu}
            className="hidden items-center gap-7 lg:flex"
          >
            {mainNav.map((item) => {
              const active = isActiveNavItem(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-semibold text-content/80 transition-colors hover:bg-content/[0.05] hover:text-rust",
                    active && "bg-content/[0.06] text-pink-600",
                  )}
                >
                  {item.label[locale]}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle />
            <ThemeToggle />
            <FavouriteButton
              label={t.header.save}
              className="grid size-10 place-items-center rounded-full text-content/70 transition-colors hover:bg-content/[0.05] hover:text-pink-600"
            />
            <Button
              href={ticketHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.common.buyTicket}
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              href={ticketHref}
              size="md"
              className="px-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.common.buyTicket}
            </Button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobil-menu"
              aria-label={open ? t.header.closeMenu : t.header.openMenu}
              className="grid size-11 place-items-center rounded-full border border-line/15 text-content transition-colors hover:bg-content/[0.05]"
            >
              {open ? (
                <IconClose className="size-6" />
              ) : (
                <IconMenu className="size-6" />
              )}
            </button>
          </div>
        </Container>

        {/* Mobile menu */}
        {open ? (
          <div
            ref={menuRef}
            id="mobil-menu"
            className="absolute right-3 top-full z-20 w-max max-w-[calc(100vw-1.5rem)] lg:hidden"
            role="dialog"
            aria-label={t.header.menu}
          >
            <div className="overflow-hidden rounded-b-2xl border border-line/10 bg-surface shadow-xl shadow-ink/10">
              <div className="flex flex-col items-end px-5 py-5">
                {mainNav.map((item) => {
                  const active = isActiveNavItem(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "whitespace-nowrap rounded-xl px-2 py-2 text-right text-lg font-semibold text-content transition-colors hover:bg-content/[0.05]",
                        active && "bg-content/[0.06] text-pink-600",
                      )}
                    >
                      {item.label[locale]}
                    </Link>
                  );
                })}
                <div className="mt-3 flex w-full items-center justify-end gap-2 border-t border-line/10 px-1 pt-4">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Folk bunting band under the header */}
      <FolkBorder />
    </header>
  );
}

/** DA / EN toggle. Persists the choice in a cookie and refreshes the tree. */
function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const t = useTranslations();

  return (
    <div
      className="flex items-center rounded-full border border-line/15 p-0.5 text-xs font-semibold"
      role="group"
      aria-label={t.header.chooseLanguage}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              active
                ? "bg-petroleum text-cream-50"
                : "text-content/60 hover:text-content",
            )}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
