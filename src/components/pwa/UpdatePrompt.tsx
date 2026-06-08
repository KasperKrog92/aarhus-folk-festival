"use client";

import { useEffect, useState } from "react";
import { IconClose } from "@/components/icons";
import { useTranslations } from "@/i18n/LocaleProvider";

/**
 * Layer 3 PWA polish: when the Serwist service worker finds a new build it now
 * *waits* (`skipWaiting: false` in `src/sw.ts`) instead of activating silently,
 * so the visitor keeps reading the version they loaded. This snackbar surfaces
 * the waiting worker and lets them opt in: clicking "reload" posts the
 * `SKIP_WAITING` message Serwist listens for, then reloads once the new worker
 * takes control (`controllerchange`).
 *
 * In dev the SW is disabled, so `navigator.serviceWorker.ready` never resolves
 * and this renders nothing.
 */
export function UpdatePrompt() {
  const t = useTranslations();
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.ready
      .then((registration) => {
        // A new worker may already be waiting from a prior tab/session. Only
        // treat it as an "update" when an old worker is already in control —
        // otherwise this is the very first install, not a new version.
        if (registration.waiting && navigator.serviceWorker.controller) {
          setWaitingWorker(registration.waiting);
        }

        registration.addEventListener("updatefound", () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            if (
              installing.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setWaitingWorker(installing);
            }
          });
        });
      })
      .catch(() => {
        // No service worker (e.g. dev build): nothing to prompt for.
      });
  }, []);

  if (!waitingWorker) return null;

  const reload = () => {
    // Reload once the freshly activated worker takes control of the page.
    navigator.serviceWorker.addEventListener(
      "controllerchange",
      () => window.location.reload(),
      { once: true },
    );
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-[80] mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-cream-50/15 bg-petroleum px-4 py-3 text-cream-50 shadow-lg shadow-ink/20 sm:px-5 sm:py-4"
    >
      <p className="text-sm font-medium">{t.update.available}</p>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={reload}
          className="rounded-full bg-cream-50 px-4 py-2 text-sm font-semibold text-petroleum-700 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream-50"
        >
          {t.update.reload}
        </button>
        <button
          type="button"
          onClick={() => setWaitingWorker(null)}
          aria-label={t.update.dismiss}
          title={t.update.dismiss}
          className="grid size-9 place-items-center rounded-full text-cream-50/80 transition-colors hover:bg-cream-50/10 hover:text-cream-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream-50"
        >
          <IconClose className="size-5" />
        </button>
      </div>
    </div>
  );
}
