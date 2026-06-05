/**
 * UI-chrome strings (everything that isn't content data in `src/data/`).
 * Plain JS object → safe to import from both server and client components.
 *
 * `da` is the source of truth for the shape; `Dictionary` is derived from it,
 * so a missing key in `en` is a type error. Interpolated values (titles, dates,
 * names) are composed at the call site rather than baked into templates.
 */
import type { Locale } from "./config";

const da = {
  skipLink: "Spring til indhold",
  common: {
    buyTicket: "Køb billet",
    readMore: "Læs mere",
  },
  header: {
    home: "til forsiden", // composed as "{name} — {home}"
    mainMenu: "Hovedmenu",
    save: "Gem festivalen",
    openMenu: "Åbn menu",
    closeMenu: "Luk menu",
    menu: "Menu",
    chooseLanguage: "Vælg sprog",
  },
  hero: {
    headlineLine1: "Folkemusikken",
    headlineLine2: "indtager Aarhus",
    seeProgram: "Se program",
    badgeLabel: "10 års jubilæum — Aarhus Folk Festival",
  },
  program: {
    eyebrow: "I dag på festivalen",
    seeFullProgram: "Se hele programmet",
  },
  experiences: {
    eyebrow: "Oplev festivalen",
    title: "Musik. Mennesker. Minder.",
    intro:
      "Fra stille kirkekoncerter til svedige sessioner — der er en plads til dig, uanset om du lytter, danser eller spiller med.",
  },
  about: {
    eyebrow: "Om festivalen",
    title: "Festivalen er vi sammen om",
    paragraph1:
      "Aarhus Folk Festival er et mødested for alle, der holder af levende musik. Her klinger spillemandens violin op ad kirkemuren, fødderne finder rytmen i dansen, og fremmede bliver til venner over en fælles melodi.",
    paragraph2:
      "Vi dyrker nysgerrigheden og traditionen på én gang — den gamle folkemelodi og det nye, vi skaber sammen. Kom som du er, lyt med, syng med, eller tag instrumentet under armen. Der er plads til både den garvede musiker og den, der hører folkemusik for første gang.",
    cta: "Læs mere om festivalen",
    tags: "Musik · dans · nysgerrighed · fællesskab",
    photoCaption: "Sammen om musikken",
    photoAlt: "Festivalgæster danser sammen i en fyldt sal",
  },
  practical: {
    eyebrow: "Praktisk info",
    title: "Planlæg din festival",
    intro:
      "Alt det praktiske, så du kan bruge kræfterne på musikken. Her er det vigtigste at have styr på, før du tager til Aarhus.",
  },
  newsletter: {
    eyebrow: "Nyhedsbrev 2026",
    title: "Vær først med det hele",
    body: "Få besked, når programmet løftes, billetterne åbner, og de første kunstnere offentliggøres. Ingen spam — kun folkemusik.",
    success: "Tak! Vi skriver til dig, så snart der er nyt. 🎶",
    emailLabel: "Din e-mailadresse",
    placeholder: "din@email.dk",
    submit: "Tilmeld",
    demoNote: "Demo — formularen sender ikke noget endnu.",
  },
  footer: {
    blurb:
      "Fire dage med folkemusik, dans og fællesskab midt i Aarhus — for nysgerrige sjæle i alle aldre.", // composed as "{dates}. {blurb}"
    exploreHeading: "Udforsk",
    exploreAria: "Sektioner",
    festivalHeading: "Festival",
    festivalAria: "Festival",
    copyright: "Et frivilligdrevet kulturmøde i Aarhus.", // composed as "© {year} {name}. {copyright}"
  },
  eventCard: {
    imageAlt: "Stemningsbillede fra", // composed as "{imageAlt} {title}"
    save: "Gem", // composed as "{save} {title}"
    seeInProgram: "se i programmet", // composed as "{title} — {seeInProgram}"
  },
  hero_alt: {
    background:
      "Festivalgæster danser til levende folkemusik i en stemningsfyldt lade med lyskæder, mens en violinist og en harmonikaspiller spiller",
  },
};

/** Shape derived from the Danish source — `en` must match it exactly. */
export type Dictionary = typeof da;

const en: Dictionary = {
  skipLink: "Skip to content",
  common: {
    buyTicket: "Buy ticket",
    readMore: "Read more",
  },
  header: {
    home: "to the homepage",
    mainMenu: "Main menu",
    save: "Save the festival",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    chooseLanguage: "Choose language",
  },
  hero: {
    headlineLine1: "Folk music",
    headlineLine2: "takes over Aarhus",
    seeProgram: "See programme",
    badgeLabel: "10th anniversary — Aarhus Folk Festival",
  },
  program: {
    eyebrow: "Today at the festival",
    seeFullProgram: "See the full programme",
  },
  experiences: {
    eyebrow: "Experience the festival",
    title: "Music. People. Memories.",
    intro:
      "From quiet church concerts to sweaty late-night sessions — there's a place for you, whether you listen, dance or play along.",
  },
  about: {
    eyebrow: "About the festival",
    title: "A festival we share",
    paragraph1:
      "Aarhus Folk Festival is a meeting place for everyone who loves live music. Here the fiddler's strings ring out against the church wall, feet find the rhythm of the dance, and strangers become friends over a shared tune.",
    paragraph2:
      "We nurture curiosity and tradition at once — the old folk melody and the new thing we create together. Come as you are, listen in, sing along, or bring your instrument. There's room for the seasoned musician and the first-time listener alike.",
    cta: "Read more about the festival",
    tags: "Music · dance · curiosity · community",
    photoCaption: "Together around the music",
    photoAlt: "Festival guests dancing together in a packed hall",
  },
  practical: {
    eyebrow: "Practical info",
    title: "Plan your festival",
    intro:
      "All the practicalities, so you can spend your energy on the music. Here's the essentials to have sorted before you head to Aarhus.",
  },
  newsletter: {
    eyebrow: "Newsletter 2026",
    title: "Be the first to know",
    body: "Get word when the programme drops, tickets open and the first artists are announced. No spam — just folk music.",
    success: "Thanks! We'll write as soon as there's news. 🎶",
    emailLabel: "Your email address",
    placeholder: "you@email.com",
    submit: "Sign up",
    demoNote: "Demo — the form doesn't send anything yet.",
  },
  footer: {
    blurb:
      "Four days of folk music, dance and community in the heart of Aarhus — for curious souls of all ages.",
    exploreHeading: "Explore",
    exploreAria: "Sections",
    festivalHeading: "Festival",
    festivalAria: "Festival",
    copyright: "A volunteer-run cultural gathering in Aarhus.",
  },
  eventCard: {
    imageAlt: "Atmosphere photo from",
    save: "Save",
    seeInProgram: "see in the programme",
  },
  hero_alt: {
    background:
      "Festival guests dancing to live folk music in an atmospheric barn strung with fairy lights, while a fiddler and an accordion player perform",
  },
};

const dictionaries: Record<Locale, Dictionary> = { da, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
