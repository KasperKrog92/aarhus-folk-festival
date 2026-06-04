"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FolkBorder } from "@/components/decorative/FolkBorder";
import { IconMenu, IconClose, IconHeart } from "@/components/icons";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function Header() {
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
          "bg-cream/90 backdrop-blur transition-shadow",
          scrolled && "shadow-[0_1px_0_rgba(42,34,29,0.08)]",
        )}
      >
        <Container className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="#top"
            className="flex shrink-0 items-center"
            aria-label={`${site.name} — til forsiden`}
          >
            <Image
              src="/logos/logo_text.png"
              alt={site.name}
              width={1203}
              height={626}
              priority
              className="h-11 w-auto sm:h-12"
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Hovedmenu"
            className="hidden items-center gap-7 lg:flex"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-ink/80 transition-colors hover:text-rust"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle />
            <button
              type="button"
              aria-label="Gem festivalen"
              className="grid size-10 place-items-center rounded-full text-ink/70 transition-colors hover:bg-ink/[0.05] hover:text-pink-600"
            >
              <IconHeart className="size-5" />
            </button>
            <Button href={site.ticketUrl}>Køb billet</Button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button href={site.ticketUrl} size="md" className="px-4">
              Køb billet
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobil-menu"
              aria-label={open ? "Luk menu" : "Åbn menu"}
              className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/[0.05]"
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
          aria-label="Menu"
        >
          <div className="border-b border-ink/10 bg-cream shadow-lg">
            <Container className="flex flex-col gap-1 py-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-lg font-semibold text-ink transition-colors hover:bg-ink/[0.05]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center justify-between px-1">
                <LanguageToggle />
                <Button
                  href={site.ticketUrl}
                  size="lg"
                  onClick={() => setOpen(false)}
                >
                  Køb billet
                </Button>
              </div>
            </Container>
          </div>
        </div>
      ) : null}
    </header>
  );
}

/** Static DA / EN toggle — visual only for this concept. */
function LanguageToggle() {
  return (
    <div
      className="flex items-center rounded-full border border-ink/15 p-0.5 text-xs font-semibold"
      role="group"
      aria-label="Vælg sprog"
    >
      <span className="rounded-full bg-petroleum px-2.5 py-1 text-cream-50">
        DA
      </span>
      <button
        type="button"
        className="px-2.5 py-1 text-ink/60 transition-colors hover:text-ink"
      >
        EN
      </button>
    </div>
  );
}
