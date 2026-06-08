"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { EventCard } from "@/components/ui/EventCard";
import { IconHeart } from "@/components/icons";
import { readFavourites, subscribeFavourites } from "@/lib/favourites";
import { cn } from "@/lib/cn";
import { programPage, type ProgramDayGroup } from "@/data/program";
import type { Locale } from "@/i18n/config";

/**
 * The day-grouped programme plus a "Vis hjerte-events" toggle that narrows it to
 * the events the visitor has favourited. Client-side because the favourites live
 * in browser storage (see `src/lib/favourites.ts`): we read them as an external
 * store so the list re-filters the moment a heart is toggled anywhere.
 *
 * The schedule data is computed on the server and passed in as plain props, so
 * this stays a thin interactive shell over `getProgramByDay()`.
 */
export function ProgramSchedule({
  days,
  locale,
}: {
  days: ProgramDayGroup[];
  locale: Locale;
}) {
  const [onlyFavourites, setOnlyFavourites] = useState(false);

  // A stable string snapshot of storage, so useSyncExternalStore doesn't see a fresh
  // array reference every render. Server (and first client) snapshot is empty, so
  // the full programme renders identically on both sides — no hydration mismatch.
  const favouritesKey = useSyncExternalStore(
    subscribeFavourites,
    () => readFavourites().join(","),
    () => "",
  );
  const favourites = useMemo(
    () => new Set(favouritesKey ? favouritesKey.split(",") : []),
    [favouritesKey],
  );

  const visibleDays = onlyFavourites
    ? days
        .map((group) => ({
          ...group,
          events: group.events.filter((event) => favourites.has(event.id)),
        }))
        .filter((group) => group.events.length > 0)
    : days;

  const { filter } = programPage;

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setOnlyFavourites((value) => !value)}
          aria-pressed={onlyFavourites}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2",
            onlyFavourites
              ? "border-pink-200 bg-pink-100 text-pink-600"
              : "border-line/15 text-content hover:border-line/30 hover:bg-content/[0.04]",
          )}
        >
          <IconHeart
            fill={onlyFavourites ? "currentColor" : "none"}
            className="size-5"
          />
          {onlyFavourites ? filter.showAll[locale] : filter.showFavourites[locale]}
          {favourites.size > 0 ? (
            <span
              className={cn(
                "ml-0.5 grid min-w-5 place-items-center rounded-full px-1.5 text-xs font-bold",
                onlyFavourites ? "bg-pink-600 text-white" : "bg-pink-100 text-pink-600",
              )}
            >
              {favourites.size}
            </span>
          ) : null}
        </button>
      </div>

      {visibleDays.length > 0 ? (
        <div className="space-y-14">
          {visibleDays.map(({ day, events }) => (
            <div key={day.id}>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-content sm:text-3xl">
                {day.weekday[locale]}{" "}
                <span className="text-petroleum">{day.date[locale]}</span>
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {events.map((event) => (
                  <li key={event.id}>
                    <EventCard event={event} locale={locale} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-line/[0.07] bg-surface-raised px-6 py-14 text-center">
          <IconHeart className="mx-auto size-8 text-pink-600" aria-hidden />
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-content-soft">
            {filter.empty[locale]}
          </p>
        </div>
      )}
    </>
  );
}
