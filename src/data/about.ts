/**
 * "Om festivalen", the dedicated about page (/om-festivalen).
 * Atmospheric, copy-led page about the festival's idea and community.
 * `image.icon` is a key resolved to an SVG component in the rendering layer,
 * so this stays a plain data file. When an image has a `src` (a photo in
 * `public/images/`) the page renders that photo; otherwise it falls back to an
 * ImagePlaceholder stand-in tinted by `tone`, with `icon` as a watermark.
 */
import type { Localized } from "@/i18n/config";

export type AboutImageIcon = "dance" | "concert" | "session" | "pin";
export type AboutImageTone = "petroleum" | "teal" | "pink" | "aubergine" | "evening";

export type AboutImage = {
  /** Path to a real photo under `public/`; omit to use the gradient placeholder. */
  src?: string;
  alt: Localized;
  caption: Localized;
  tone: AboutImageTone;
  icon: AboutImageIcon;
};

type AboutSection = {
  id: string;
  heading: Localized;
  paragraphs: Localized[];
  image: AboutImage;
};

export const aboutPage = {
  href: "/om-festivalen",
  metaTitle: {
    da: "Om festivalen",
    en: "About the festival",
  } as Localized,
  metaDescription: {
    da: "Aarhus Folk Festival samler musikere, dansere og nysgerrige mennesker om levende folkemusik, dans, koncerter, jams og workshops i hjertet af Aarhus.",
    en: "Aarhus Folk Festival gathers musicians, dancers and curious people around live folk music, dance, concerts, jams and workshops in the heart of Aarhus.",
  } as Localized,
  eyebrow: {
    da: "Om festivalen",
    en: "About",
  } as Localized,
  title: {
    da: "Om Aarhus Folk Festival",
    en: "About Aarhus Folk Festival",
  } as Localized,
  lead: {
    da: "Musik, dans og fællesskab i hjertet af Aarhus",
    en: "Music, dance and community in the heart of Aarhus",
  } as Localized,
  intro: [
    {
      da: "Aarhus Folk Festival samler musikere, dansere og nysgerrige mennesker fra Aarhus og resten af verden omkring levende folkemusik, fælles danse, koncerter, jams og workshops.",
      en: "Aarhus Folk Festival gathers musicians, dancers and curious people from Aarhus and the rest of the world around live folk music, shared dances, concerts, jams and workshops.",
    },
    {
      da: "Festivalen er forankret i Aarhus' lokale kulturmiljø og bliver til gennem samarbejde mellem frivillige kræfter, kulturaktører, spillesteder og kunstnere. I nogle dage forvandles byen til et levende mødepunkt for musik, bevægelse og fællesskab.",
      en: "The festival is rooted in the local cultural life of Aarhus and grows out of collaboration between volunteers, cultural organisers, venues and artists. For a few days, the city turns into a living meeting place for music, movement and community.",
    },
    {
      da: "Her er der plads til både erfarne folkemusikelskere og dem, der oplever genren for første gang.",
      en: "There is room here both for seasoned folk music lovers and for those meeting the genre for the very first time.",
    },
  ] as Localized[],
  introImage: {
    src: "/images/faellesdans.jpg",
    alt: {
      da: "Dansere holder hinanden i hænderne på et gulv, mens musikere spiller op til fælles dans.",
      en: "Dancers holding hands on the floor while musicians play for a shared dance.",
    },
    caption: {
      da: "Fælles dans",
      en: "Shared dance",
    },
    tone: "petroleum",
    icon: "dance",
  } as AboutImage,
  banner: {
    src: "/images/aarhus_dark.jpg",
    alt: {
      da: "Et stemningsfuldt spillested i varmt lys, hvor publikum og musikere er samlet om aftenens musik.",
      en: "An atmospheric venue in warm light where audience and musicians gather around the music of the evening.",
    },
    caption: {
      da: "Aarhus efter mørkets frembrud",
      en: "Aarhus after dark",
    },
    tone: "evening",
    icon: "concert",
  } as AboutImage,
  sections: [
    {
      id: "levende-tradition",
      heading: {
        da: "En levende tradition",
        en: "A living tradition",
      },
      paragraphs: [
        {
          da: "For os er folkemusik ikke noget, der står stille.",
          en: "To us, folk music is not something that stands still.",
        },
        {
          da: "Traditioner bæres videre, ændrer sig og får nyt liv, når mennesker mødes omkring dem. Derfor rummer festivalen både nordiske rødder, internationale impulser, intime akustiske koncerter, moderne folkfusioner, dans, fællessang og spontane jams langt ud på aftenen.",
          en: "Traditions are carried on, they change and they come to life again when people gather around them. That is why the festival holds Nordic roots, international voices, intimate acoustic concerts, modern folk fusions, dancing, communal singing and spontaneous jams far into the evening.",
        },
        {
          da: "Aarhus Folk Festival handler lige så meget om deltagelse som om at opleve. Publikum er ikke kun tilskuere, men en del af stemningen, musikken og mødet mellem mennesker.",
          en: "Aarhus Folk Festival is as much about taking part as it is about watching. The audience is not only spectators, but part of the atmosphere, the music and the meeting between people.",
        },
      ],
      image: {
        src: "/images/spontan_jam.jpg",
        alt: {
          da: "Musikere sidder tæt sammen i en åben jam med violin, guitar og fløjte.",
          en: "Musicians sitting close together in an open jam with fiddle, guitar and flute.",
        },
        caption: {
          da: "Spontane jams",
          en: "Spontaneous jams",
        },
        tone: "teal",
        icon: "session",
      },
    },
    {
      id: "paa-tvaers-af-byen",
      heading: {
        da: "En festival på tværs af byen",
        en: "A festival across the city",
      },
      paragraphs: [
        {
          da: "Festivalen finder sted på forskellige venues og kultursteder rundt omkring i Aarhus. Hver lokation bidrager med sin egen stemning og atmosfære, fra intime koncertoplevelser til dansegulve, kirkerum og åbne fællesskaber.",
          en: "The festival takes place at different venues and cultural spaces around Aarhus. Each location brings its own mood and atmosphere, from intimate concerts to dance floors, church rooms and open gatherings.",
        },
        {
          da: "Det skaber en festival, der føles tæt på byen og tæt på menneskerne i den.",
          en: "It makes for a festival that feels close to the city and close to the people in it.",
        },
      ],
      image: {
        src: "/images/rundt_byen.jpg",
        alt: {
          da: "Et intimt kirkerum oplyst af stearinlys, klar til en akustisk koncert.",
          en: "An intimate church room lit by candles, ready for an acoustic concert.",
        },
        caption: {
          da: "Rundt i byen",
          en: "Around the city",
        },
        tone: "aubergine",
        icon: "pin",
      },
    },
  ] as AboutSection[],
  community: {
    id: "skabt-gennem-faellesskab",
    heading: {
      da: "Skabt gennem fællesskab",
      en: "Created through community",
    } as Localized,
    paragraphs: [
      {
        da: "Aarhus Folk Festival er båret af mennesker med kærlighed til musik, dans og kulturfællesskaber.",
        en: "Aarhus Folk Festival is carried by people with a love of music, dance and cultural communities.",
      },
      {
        da: "Festivalen bliver til gennem frivilligt engagement, lokale samarbejder og ønsket om at skabe rum, hvor mennesker kan mødes på tværs af alder, baggrund og erfaring.",
        en: "The festival comes to life through volunteer energy, local partnerships and a wish to create spaces where people can meet across age, background and experience.",
      },
      {
        da: "Det handler ikke kun om koncerter. Det handler om nærvær, deltagelse og levende kultur.",
        en: "It is not only about concerts. It is about presence, taking part and living culture.",
      },
    ] as Localized[],
  },
  ctaPrimary: {
    href: "/program",
    label: {
      da: "Se programmet",
      en: "See the programme",
    } as Localized,
  },
  ctaSecondary: {
    href: "/foreningen",
    label: {
      da: "Vær med i foreningen",
      en: "Join the association",
    } as Localized,
  },
} as const;
