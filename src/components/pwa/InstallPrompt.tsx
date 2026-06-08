"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IconClose, IconShare } from "@/components/icons";
import { buttonClasses } from "@/components/ui/Button";
import { useTranslations } from "@/i18n/LocaleProvider";
import { cn } from "@/lib/cn";

/**
 * Mobile-only "add to home screen" banner with two modes:
 *
 * - **android** — Chromium fires `beforeinstallprompt`; we stash it and offer an
 *   "install" button that replays it via `prompt()`. Hidden from the `sm`
 *   breakpoint up (`sm:hidden`) so it never shows in desktop view, where the
 *   browser's address-bar install icon already covers it.
 * - **ios** — iOS Safari has no `beforeinstallprompt`, so install there is a
 *   manual Share → "Add to Home Screen". We detect iOS Safari and show a hint
 *   instead (no install button — the OS has no programmatic trigger). The
 *   detection already guarantees a touch device, so this one is not viewport-gated.
 *
 * A `localStorage` flag (`aff_install_dismissed`) stops either card nagging after
 * dismiss/install, and `appinstalled` clears it too. Already-installed visitors
 * (standalone display mode) never see it.
 */
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type Mode = "none" | "android" | "ios";

const DISMISS_KEY = "aff_install_dismissed";

function isStandalone(): boolean {
  // Treat any installed-app display mode as "running as a PWA", so the banner
  // stays hidden regardless of the manifest's `display` value.
  const installed = window.matchMedia(
    "(display-mode: standalone), (display-mode: minimal-ui), (display-mode: fullscreen), (display-mode: window-controls-overlay)",
  ).matches;
  // Safari (iOS) home-screen apps expose this legacy flag instead.
  const iosInstalled =
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  return installed || iosInstalled;
}

function isIosSafari(): boolean {
  const ua = navigator.userAgent;
  const iOS =
    /iphone|ipad|ipod/i.test(ua) ||
    // iPadOS 13+ reports as desktop Safari; disambiguate by touch points.
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  // Exclude in-app/third-party iOS browsers, which don't offer the Add flow.
  const safari = /safari/i.test(ua) && !/crios|fxios|edgios|opios/i.test(ua);
  return iOS && safari;
}

export function InstallPrompt() {
  const t = useTranslations();
  const [mode, setMode] = useState<Mode>("none");
  const [promptEvent, setPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;
    if (isStandalone()) return; // already installed

    if (isIosSafari()) {
      // Must run post-mount: this reads browser-only APIs (userAgent / display
      // mode) and intentionally differs from the SSR render ("none"), so it
      // cannot move into render/initializer without a hydration mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode("ios");
      return;
    }

    const onBeforeInstall = (event: Event) => {
      // Suppress the browser's own mini-infobar; we drive the prompt ourselves.
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
      setMode("android");
    };
    const onInstalled = () => {
      setMode("none");
      localStorage.setItem(DISMISS_KEY, "1");
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (mode === "none") return null;

  const dismiss = () => {
    setMode("none");
    localStorage.setItem(DISMISS_KEY, "1");
  };

  const install = async () => {
    if (!promptEvent) return;
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    // A given prompt event can only be used once; drop it either way.
    setMode("none");
    setPromptEvent(null);
    if (outcome === "accepted") localStorage.setItem(DISMISS_KEY, "1");
  };

  return (
    <section
      aria-labelledby="install-prompt-title"
      className={cn(
        "fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-md rounded-2xl border border-line/10 bg-surface-raised p-4 shadow-lg shadow-ink/10",
        mode === "android" && "sm:hidden",
      )}
    >
      <div className="flex items-start gap-3">
        <Image
          src="/icons/icon-192.png"
          alt=""
          width={44}
          height={44}
          className="shrink-0 rounded-xl"
        />
        <div className="min-w-0 flex-1">
          <p
            id="install-prompt-title"
            className="font-display text-base font-semibold tracking-tight text-content"
          >
            {t.install.title}
          </p>

          {mode === "android" ? (
            <>
              <p className="mt-1 text-sm leading-relaxed text-content-muted">
                {t.install.body}
              </p>
              <div className="mt-3 flex items-center gap-1">
                <button
                  type="button"
                  onClick={install}
                  className={buttonClasses("primary", "md")}
                >
                  {t.install.action}
                </button>
                <button
                  type="button"
                  onClick={dismiss}
                  className="rounded-full px-4 py-2.5 text-sm font-semibold text-content-muted transition-colors hover:text-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum"
                >
                  {t.install.dismiss}
                </button>
              </div>
            </>
          ) : (
            <p className="mt-1 flex items-start gap-2 text-sm leading-relaxed text-content-muted">
              <IconShare
                className="mt-0.5 size-4 shrink-0 text-petroleum"
                aria-hidden
              />
              <span>{t.install.iosBody}</span>
            </p>
          )}
        </div>

        {mode === "ios" && (
          <button
            type="button"
            onClick={dismiss}
            aria-label={t.install.dismiss}
            title={t.install.dismiss}
            className="grid size-8 shrink-0 place-items-center rounded-full text-content-muted transition-colors hover:bg-content/[0.05] hover:text-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum"
          >
            <IconClose className="size-5" />
          </button>
        )}
      </div>
    </section>
  );
}
