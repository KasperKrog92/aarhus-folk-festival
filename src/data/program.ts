/**
 * The festival schedule — the single source of truth for "what plays when".
 *
 * Acts (artists in `artists.ts`, workshops in `workshops.ts`) own their content
 * and list one or more `shows` (a day + time + venue). The programme, the
 * homepage preview and each act's "På festivalen" panel are all *derived* from
 * those shows here, so an act that plays twice only needs editing in one place.
 */
import type { Locale, Localized } from "@/i18n/config";
import { artists } from "@/data/artists";
import { workshops } from "@/data/workshops";

export type EventTone = "petroleum" | "pink" | "teal" | "aubergine";

export type FestivalDay = {
  id: string;
  /** Local festival date in ISO format, used for calendar links. */
  dateIso: `${number}-${number}-${number}`;
  weekday: Localized;
  date: Localized;
};

/** The four festival days. Days without events simply don't render. */
export const festivalDays: FestivalDay[] = [
  {
    id: "thu",
    dateIso: "2026-09-24",
    weekday: { da: "Torsdag", en: "Thursday" },
    date: { da: "24. september", en: "24 September" },
  },
  {
    id: "fri",
    dateIso: "2026-09-25",
    weekday: { da: "Fredag", en: "Friday" },
    date: { da: "25. september", en: "25 September" },
  },
  {
    id: "sat",
    dateIso: "2026-09-26",
    weekday: { da: "Lørdag", en: "Saturday" },
    date: { da: "26. september", en: "26 September" },
  },
  {
    id: "sun",
    dateIso: "2026-09-27",
    weekday: { da: "Søndag", en: "Sunday" },
    date: { da: "27. september", en: "27 September" },
  },
];

/** One appearance of an act: which day, at what time, where. */
export type Show = {
  dayId: string;
  /** 24-hour "HH.MM" — sortable as a string. */
  time: string;
  /** Calendar event length. Defaults to 90 minutes when omitted. */
  durationMinutes?: number;
  venue: Localized;
};

export type ActDetailShow = {
  /** Resolved "Weekday Date" label. */
  day: string;
  /** Local ISO date for machine-readable calendar links. */
  dateIso: string;
  time: string;
  durationMinutes: number;
  venue: string;
};

/** A single performance/session in the schedule (one act on one day + time). */
export type ProgramEvent = {
  id: string;
  dayId: string;
  /** Link to the act's detail page. */
  href: string;
  title: Localized;
  category: Localized;
  venue: Localized;
  time: string;
  durationMinutes: number;
  tone: EventTone;
  image?: string;
  imageAlt: Localized;
};

const defaultShowDurationMinutes = 90;

export type ProgramDayGroup = {
  day: FestivalDay;
  events: ProgramEvent[];
};

/** Flattens every act's shows into a single list of schedule events. */
function allEvents(): ProgramEvent[] {
  const fromArtists = artists.flatMap((artist) =>
    artist.shows.map(
      (show): ProgramEvent => ({
        id: `${artist.slug}-${show.dayId}`,
        dayId: show.dayId,
        href: `/kunstnere/${artist.slug}`,
        title: { da: artist.name, en: artist.name },
        category: artist.category,
        venue: show.venue,
        time: show.time,
        durationMinutes: show.durationMinutes ?? defaultShowDurationMinutes,
        tone: artist.tone,
        image: artist.image,
        imageAlt: artist.imageAlt,
      }),
    ),
  );

  const fromWorkshops = workshops.flatMap((workshop) =>
    workshop.shows.map(
      (show): ProgramEvent => ({
        id: `${workshop.slug}-${show.dayId}`,
        dayId: show.dayId,
        href: `/workshops/${workshop.slug}`,
        title: workshop.name,
        category: workshop.category,
        venue: show.venue,
        time: show.time,
        durationMinutes: show.durationMinutes ?? defaultShowDurationMinutes,
        tone: workshop.tone,
        image: workshop.image,
        imageAlt: workshop.imageAlt,
      }),
    ),
  );

  return [...fromArtists, ...fromWorkshops];
}

/** The full programme, grouped by day (time-sorted, empty days dropped). */
export function getProgramByDay(): ProgramDayGroup[] {
  const events = allEvents();

  return festivalDays
    .map((day) => ({
      day,
      events: events
        .filter((event) => event.dayId === day.id)
        .sort((a, b) => a.time.localeCompare(b.time)),
    }))
    .filter((group) => group.events.length > 0);
}

/** Resolves a day id to a readable "Weekday Date" label. */
export function formatDay(dayId: string, locale: Locale): string {
  const day = festivalDays.find((d) => d.id === dayId);
  return day ? `${day.weekday[locale]} ${day.date[locale]}` : "";
}

function dateIsoForDay(dayId: string): string {
  return festivalDays.find((day) => day.id === dayId)?.dateIso ?? "";
}

/** Resolves an act's show list for the shared detail page panel. */
export function actDetailShows(shows: Show[], locale: Locale): ActDetailShow[] {
  return shows.map((show) => ({
    day: formatDay(show.dayId, locale),
    dateIso: dateIsoForDay(show.dayId),
    time: show.time,
    durationMinutes: show.durationMinutes ?? defaultShowDurationMinutes,
    venue: show.venue[locale],
  }));
}

/** Shared UI copy for any "schedule" surface (act panels, programme). */
export const scheduleCopy = {
  onProgramme: { da: "På festivalen", en: "At the festival" } as Localized,
  when: { da: "Hvornår", en: "When" } as Localized,
  where: { da: "Spillested", en: "Venue" } as Localized,
  seeInProgramme: { da: "Se i programmet", en: "See in the programme" } as Localized,
  addToCalendar: { da: "Føj til kalender", en: "Add to calendar" } as Localized,
  googleCalendar: { da: "Google Kalender", en: "Google Calendar" } as Localized,
  icsCalendar: { da: "Apple / Outlook (.ics)", en: "Apple / Outlook (.ics)" } as Localized,
};

export const programPage = {
  href: "/program",
  eyebrow: { da: "Program", en: "Programme" } as Localized,
  title: { da: "Hele programmet", en: "The full programme" } as Localized,
  intro: {
    da: "Fire dage med koncerter, bal, sessioner og workshops. Programmet opdateres løbende, efterhånden som flere navne falder på plads.",
    en: "Four days of concerts, balls, sessions and workshops. The programme is updated as more names are confirmed.",
  } as Localized,
  filter: {
    /** Turns the favourites-only view on (shown while it is off). */
    showFavourites: { da: "Vis hjerte-events", en: "Show hearted events" } as Localized,
    /** Turns the favourites-only view off again (shown while it is on). */
    showAll: { da: "Vis hele programmet", en: "Show the full programme" } as Localized,
    /** Empty state when favourites-only is on but nothing is saved yet. */
    empty: {
      da: "Du har ikke gemt nogen events endnu. Tryk på hjertet ved et program, så samler vi dine favoritter her.",
      en: "You haven't saved anything yet. Tap the heart on a programme item and we'll gather your favourites here.",
    } as Localized,
  },
} as const;
