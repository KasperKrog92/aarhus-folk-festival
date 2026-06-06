/**
 * Workshops & sessions content.
 * Mirrors `artists.ts`: each workshop owns its page under `/workshops/[slug]`
 * and lists one or more `shows`, which the programme (`program.ts`) is derived
 * from. Currently one entry, the open folk session, which runs on two days.
 */
import type { Localized } from "@/i18n/config";
import type { EventTone, Show } from "@/data/program";

export type Workshop = {
  slug: string;
  /** Workshop names are descriptive, so they're translated. */
  name: Localized;
  /** Programme category + card eyebrow, e.g. "Session". */
  category: Localized;
  tagline: Localized;
  /** One paragraph per entry, rendered in order. */
  bio: Localized[];
  tone: EventTone;
  image?: string;
  imageAlt: Localized;
  /** When and where the workshop runs (one entry per appearance). */
  shows: Show[];
};

export const workshops: Workshop[] = [
  {
    slug: "aaben-folkesession",
    name: { da: "Åben folkesession", en: "Open folk session" },
    category: { da: "Session", en: "Session" },
    tagline: {
      da: "Tag instrumentet med og spil med i en åben rundkreds",
      en: "Bring your instrument and join an open circle",
    },
    bio: [
      {
        da: "Til en åben folkesession er der hverken publikum eller scene: bare en rundkreds af musikere, der spiller sammen. Melodierne går på omgang, og man hopper med, når man kan.",
        en: "At an open folk session there is no audience and no stage: just a circle of musicians playing together. The tunes are passed around, and you join in when you can.",
      },
      {
        da: "Alle er velkomne, uanset niveau. Tag dit instrument med, lyt med på de første runder, og spil med, når melodien sidder. Har du ikke et instrument med, er du velkommen til bare at lytte.",
        en: "Everyone is welcome, whatever your level. Bring your instrument, listen along for the first few rounds, and play once the tune sits. If you don't have an instrument with you, you are welcome to just listen.",
      },
    ],
    tone: "teal",
    image: "/events/jam.jpg",
    imageAlt: {
      da: "Musikere spiller sammen i en åben session",
      en: "Musicians playing together in an open session",
    },
    shows: [
      {
        dayId: "thu",
        time: "20.00",
        venue: { da: "Cafe Folkeven", en: "Cafe Folkeven" },
      },
      {
        dayId: "fri",
        time: "19.00",
        venue: { da: "Institut for (X)", en: "Institut for (X)" },
      },
    ],
  },
];

export function getWorkshop(slug: string): Workshop | undefined {
  return workshops.find((workshop) => workshop.slug === slug);
}

/** UI copy for the workshops listing page. */
export const workshopsPage = {
  href: "/workshops",
  eyebrow: { da: "Workshops", en: "Workshops" } as Localized,
  title: { da: "Workshops & sessions", en: "Workshops & sessions" } as Localized,
  intro: {
    da: "Kom tæt på musikken, dansene og håndværket. Vær med, uanset om du spiller selv eller bare vil lytte og lære.",
    en: "Get closer to the music, the dances and the craft. Join in whether you play yourself or just want to listen and learn.",
  } as Localized,
  backLabel: {
    da: "Tilbage til forsiden",
    en: "Back to the homepage",
  } as Localized,
  /** Subpage: link back to the listing. */
  allWorkshops: { da: "Alle workshops", en: "All workshops" } as Localized,
} as const;
