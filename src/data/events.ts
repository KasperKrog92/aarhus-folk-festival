/**
 * "I dag på festivalen" — today's programme preview.
 * Placeholder line-up; swap for real data when the programme is set.
 */
export type EventTone = "petroleum" | "pink" | "teal" | "aubergine";

export type FestivalEvent = {
  id: string;
  time: string;
  category: string;
  title: string;
  venue: string;
  /** Placeholder-image tone, also used to colour the category label. */
  tone: EventTone;
};

export const programDay = {
  weekday: "Torsdag",
  date: "24. september",
};

export const todaysEvents: FestivalEvent[] = [
  {
    id: "dreamers-circus",
    time: "18.00",
    category: "Koncert",
    title: "Dreamers' Circus",
    venue: "Sankt Lukas Kirke",
    tone: "petroleum",
  },
  {
    id: "folkedans",
    time: "16.00",
    category: "Dans",
    title: "Folkedans for alle",
    venue: "Atlas, Musikhuset Aarhus",
    tone: "pink",
  },
  {
    id: "aaben-session",
    time: "17.30",
    category: "Session",
    title: "Åben folkesession",
    venue: "Folkecaféen, Godsbanen",
    tone: "teal",
  },
  {
    id: "hedegaard-broedsgaard",
    time: "21.00",
    category: "Koncert",
    title: "Hedegaard & Brødsgaard",
    venue: "Godsbanen",
    tone: "aubergine",
  },
];
