"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const ticketHref = site.ticketUrl[locale];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Subtle shadow / stronger background once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "bg-surface/90 backdrop-blur transition-shadow",
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
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-content/80 transition-colors hover:text-rust"
              >
                {item.label[locale]}
              </Link>
            ))}
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
      </div>

      {/* Folk bunting band under the header */}
      <FolkBorder />

      {/* Mobile menu */}
      {open ? (
        <div
          id="mobil-menu"
          className="lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t.header.menu}
        >
          <div className="border-b border-line/10 bg-surface shadow-lg">
            <Container className="flex flex-col gap-1 py-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-lg font-semibold text-content transition-colors hover:bg-content/[0.05]"
                >
                  {item.label[locale]}
                </Link>
              ))}
              <div className="mt-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
                <Button
                  href={ticketHref}
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  {t.common.buyTicket}
                </Button>
              </div>
            </Container>
          </div>
        </div>
      ) : null}
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
