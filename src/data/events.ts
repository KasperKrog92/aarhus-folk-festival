/**
 * Programme preview.
 * Mostly placeholder line-up; "Det Lyse Bal" is a real event. Swap the rest for
 * real data when the programme is set.
 */
import type { Localized } from "@/i18n/config";

export type EventTone = "petroleum" | "pink" | "teal" | "aubergine";

export type FestivalEvent = {
  id: string;
  time: string;
  category: Localized;
  title: Localized;
  venue: Localized;
  /** Placeholder-image tone, also used to colour the category label. */
  tone: EventTone;
  /** Real photo under `public/`; falls back to a tonal placeholder when unset. */
  image?: string;
};

export const programDay = {
  weekday: { da: "Torsdag", en: "Thursday" } as Localized,
  date: { da: "24. september", en: "24 September" } as Localized,
};

export const todaysEvents: FestivalEvent[] = [
  {
    id: "dreamers-circus",
    time: "18.00",
    category: { da: "Koncert", en: "Concert" },
    title: { da: "Dreamers' Circus", en: "Dreamers' Circus" },
    venue: { da: "Sankt Lukas Kirke", en: "Sankt Lukas Kirke" },
    tone: "petroleum",
  },
  {
    id: "det-lyse-bal",
    time: "18.30",
    category: { da: "Bal", en: "Folk dance" },
    title: {
      da: "Det Lyse Bal + Nordisk Dans",
      en: "Det Lyse Bal + Nordisk Dans",
    },
    venue: {
      da: "Vester Allé 15, Aarhus C",
      en: "Vester Allé 15, Aarhus C",
    },
    tone: "pink",
    image: "/events/detlysebal.jpg",
  },
  {
    id: "aaben-session",
    time: "17.30",
    category: { da: "Session", en: "Session" },
    title: { da: "Åben folkesession", en: "Open folk session" },
    venue: {
      da: "Folkecaféen, Godsbanen",
      en: "Folkecaféen, Godsbanen",
    },
    tone: "teal",
  },
  {
    id: "hedegaard-broedsgaard",
    time: "21.00",
    category: { da: "Koncert", en: "Concert" },
    title: { da: "Hedegaard & Brødsgaard", en: "Hedegaard & Brødsgaard" },
    venue: { da: "Godsbanen", en: "Godsbanen" },
    tone: "aubergine",
  },
];
