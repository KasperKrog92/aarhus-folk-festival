/**
 * Artists / line-up content.
 * The three confirmed names for the 2026 edition. Each artist has its own
 * subpage under `/kunstnere/[slug]` and lists one or more `shows`; the
 * programme (`program.ts`) is derived from those shows. Add more names as the
 * line-up is confirmed.
 */
import type { Localized } from "@/i18n/config";
import type { EventTone, Show } from "@/data/program";

export type Artist = {
  slug: string;
  /** Band name — stays the same across locales. */
  name: string;
  genre: Localized;
  tagline: Localized;
  /** One paragraph per entry, rendered in order. */
  bio: Localized[];
  /** Programme category, e.g. "Koncert" / "Bal". */
  category: Localized;
  /** Placeholder-image tone when no photo is set. */
  tone: EventTone;
  /** Real photo under `public/`; falls back to a tonal placeholder when unset. */
  image?: string;
  imageAlt: Localized;
  /** When and where the artist plays (one entry per appearance). */
  shows: Show[];
};

export const artists: Artist[] = [
  {
    slug: "dreamers-circus",
    name: "Dreamers' Circus",
    genre: { da: "Nordisk folk", en: "Nordic folk" },
    tagline: {
      da: "Nordisk folkemusik i kammermusikalsk format",
      en: "Nordic folk in a chamber-music format",
    },
    bio: [
      {
        da: "Dreamers' Circus er en af Nordens mest anerkendte folkemusiktrioer. Rune Tonsgaard Sørensen (violin), Ale Carr (nordisk citar) og Nikolaj Busk (klaver og harmonika) væver traditionel nordisk folkemusik sammen med nutidig kammermusik til et lydunivers, der er helt deres eget.",
        en: "Dreamers' Circus is one of the Nordic region's most acclaimed folk trios. Rune Tonsgaard Sørensen (violin), Ale Carr (Nordic cittern) and Nikolaj Busk (piano and accordion) weave traditional Nordic folk together with contemporary chamber music into a sound entirely their own.",
      },
      {
        da: "Trioen har spillet på scener over hele verden, fra intime kirkerum til store koncertsale, og er kendt for koncerter, der er både virtuose og varme. På Aarhus Folk Festival åbner de festivalen i Sankt Lukas Kirkes smukke akustik.",
        en: "The trio has played stages all over the world, from intimate church rooms to grand concert halls, and is known for concerts that are at once virtuosic and warm. At Aarhus Folk Festival they open the festival in the beautiful acoustics of Sankt Lukas Kirke.",
      },
    ],
    category: { da: "Koncert", en: "Concert" },
    tone: "petroleum",
    image: "/events/dreamers.jpg",
    imageAlt: {
      da: "Dreamers' Circus spiller sammen på scenen",
      en: "Dreamers' Circus performing together on stage",
    },
    shows: [
      {
        dayId: "thu",
        time: "17.00",
        venue: { da: "Sankt Lukas Kirke", en: "Sankt Lukas Kirke" },
      },
    ],
  },
  {
    slug: "det-lyse-bal",
    name: "Det Lyse Bal",
    genre: { da: "Bal & dans", en: "Folk ball & dance" },
    tagline: {
      da: "En aften med levende musik og nordiske balfolk-danse",
      en: "An evening of live music and Nordic folk dancing",
    },
    bio: [
      {
        da: "Det Lyse Bal er festivalens åbne danseaften, hvor gulvet er for alle. Levende musik sætter takten, og enkle danse bliver vist trin for trin, så du kan være med, uanset om du har danset hele livet eller aldrig har prøvet før.",
        en: "Det Lyse Bal is the festival's open dance evening, where the floor is for everyone. Live music sets the pace, and simple dances are shown step by step, so you can join in, whether you have danced all your life or never tried before.",
      },
      {
        da: "Sammen med Nordisk Dans byder aftenen på en stemning, hvor begyndere og garvede dansere mødes i de samme runddanse, valse og polskaer. Tag en partner under armen, eller find en på gulvet.",
        en: "Together with Nordisk Dans, the evening offers an atmosphere where beginners and seasoned dancers meet in the same circle dances, waltzes and polskas. Bring a partner, or find one on the floor.",
      },
    ],
    category: { da: "Bal", en: "Folk dance" },
    tone: "pink",
    image: "/events/detlysebal.jpg",
    imageAlt: {
      da: "Dansere på gulvet til Det Lyse Bal",
      en: "Dancers on the floor at Det Lyse Bal",
    },
    shows: [
      {
        dayId: "thu",
        time: "18.30",
        venue: { da: "Vester Allé 15, Aarhus C", en: "Vester Allé 15, Aarhus C" },
      },
    ],
  },
  {
    slug: "tumult",
    name: "Tumult",
    genre: { da: "Folk", en: "Folk" },
    tagline: {
      da: "Drivende dansk folkemusik med et nutidigt drag",
      en: "Driving Danish folk with a contemporary pulse",
    },
    bio: [
      {
        da: "Tumult spiller dansk folkemusik med energi og nerve. Med rødder i den traditionelle dansemusik og blikket rettet fremad skaber bandet et udtryk, der er lige dele melankoli og fest.",
        en: "Tumult plays Danish folk music with energy and edge. Rooted in traditional dance tunes yet looking forward, the band creates a sound that is equal parts melancholy and celebration.",
      },
      {
        da: "På Godsbanen lukker Tumult festivalens første dag med en koncert, hvor melodierne bygger sig op fra det stille til det stortromme-drivende. Kom og mærk, hvordan folkemusikken stadig lever og rykker.",
        en: "At Godsbanen, Tumult closes the festival's first day with a concert where the tunes build from the quiet to the thunderously driving. Come and feel how folk music still lives and moves.",
      },
    ],
    category: { da: "Koncert", en: "Concert" },
    tone: "aubergine",
    image: "/events/tumult.jpg",
    imageAlt: {
      da: "Tumult spiller koncert",
      en: "Tumult playing a concert",
    },
    shows: [
      {
        dayId: "thu",
        time: "21.00",
        venue: { da: "Godsbanen", en: "Godsbanen" },
      },
    ],
  },
];

export function getArtist(slug: string): Artist | undefined {
  return artists.find((artist) => artist.slug === slug);
}

/** UI copy for the artists listing page. */
export const artistsPage = {
  href: "/kunstnere",
  eyebrow: { da: "Kunstnere", en: "Artists" } as Localized,
  title: { da: "Årets kunstnere", en: "This year's artists" } as Localized,
  intro: {
    da: "Mød de første navne på årets festival. Flere kunstnere følger, når programmet tager form.",
    en: "Meet the first names on this year's festival. More artists will follow as the programme takes shape.",
  } as Localized,
} as const;
