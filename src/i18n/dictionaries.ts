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
    back: "Tilbage",
    backToHome: "Tilbage til forsiden",
    offlineTitle: "Du er offline",
    offlineBody:
      "Forbindelsen er væk lige nu. Prøv igen, når du har netværk — eller gå til programmet, hvis du allerede har besøgt det.",
  },
  header: {
    home: "til forsiden", // composed as "{name}, {home}"
    mainMenu: "Hovedmenu",
    save: "Gem festivaldatoen",
    openMenu: "Åbn menu",
    closeMenu: "Luk menu",
    menu: "Menu",
    chooseLanguage: "Vælg sprog",
    chooseTheme: "Vælg tema",
    lightMode: "Lyst tema",
    darkMode: "Mørkt tema",
  },
  hero: {
    headlineLine1: "Folkemusikken",
    headlineLine2: "samler Aarhus",
    seeProgram: "Se program",
    badgeLabel: "10 års jubilæum, Aarhus Folk Festival",
  },
  program: {
    eyebrow: "Torsdag på festivalen",
    seeFullProgram: "Se hele programmet",
  },
  experiences: {
    eyebrow: "Oplev festivalen",
    title: "Lyt, dans og vær med",
    intro:
      "Fra stille koncerter til åbne sessioner. Du er velkommen, uanset om du kommer for at lytte, danse eller spille med.",
  },
  about: {
    eyebrow: "Om festivalen",
    title: "Et sted at mødes om musikken",
    paragraph1:
      "Aarhus Folk Festival samler mennesker om levende musik midt i byen. Violinen kan klinge i et kirkerum, dansen kan fylde et gulv, og en enkel melodi kan blive noget, vi deler.",
    paragraph2:
      "Festivalen bygger på tradition, nysgerrighed og lysten til at være sammen. Kom som du er. Lyt med, syng med, dans med, eller tag instrumentet under armen. Du behøver ikke kende folkemusikken på forhånd for at finde en plads her.",
    cta: "Læs om festivalen",
    photoCaption: "Sammen om musikken",
    photoAlt: "Festivalgæster danser sammen i en sal",
  },
  practical: {
    eyebrow: "Praktisk info",
    title: "Planlæg dit besøg",
    intro:
      "Her finder du de praktiske ting, der gør besøget lettere: steder, billetter, mad, overnatning og adgangsforhold.",
  },
  newsletter: {
    eyebrow: "Nyt fra festivalen",
    title: "Få nyt, når der er noget at fortælle",
    body: "Vi skriver, når programmet tager form, billetsalget åbner, og de første navne er klar.",
    success: "Tak, vi skriver, når der er nyt.",
    emailLabel: "Din e-mailadresse",
    placeholder: "din@email.dk",
    submit: "Tilmeld",
    demoNote: "Demo: formularen sender ikke noget endnu.",
  },
  footer: {
    blurb:
      "Fire dage med folkemusik, dans og fællesskab midt i Aarhus. For alle, der har lyst til at lytte, lære og være med.", // composed as "{dates}. {blurb}"
    exploreHeading: "Udforsk",
    exploreAria: "Sektioner",
    festivalHeading: "Festival",
    festivalAria: "Festival",
    copyright: "Kulturfestival i Aarhus.", // composed as "© {year} {name}. {copyright}"
  },
  eventCard: {
    save: "Gem", // composed as "{save} {title}"
  },
  update: {
    available: "Ny version tilgængelig",
    reload: "Genindlæs",
    dismiss: "Luk",
  },
  hero_alt: {
    background:
      "Festivalgæster danser til levende folkemusik i varmt lys, mens en violinist og en harmonikaspiller spiller",
  },
};

/** Shape derived from the Danish source. `en` must match it exactly. */
export type Dictionary = typeof da;

const en: Dictionary = {
  skipLink: "Skip to content",
  common: {
    buyTicket: "Buy ticket",
    readMore: "Read more",
    back: "Back",
    backToHome: "Back to the homepage",
    offlineTitle: "You are offline",
    offlineBody:
      "The connection is down right now. Try again when you are back online — or open the programme if you have visited it before.",
  },
  header: {
    home: "to the homepage",
    mainMenu: "Main menu",
    save: "Save the festival date",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    chooseLanguage: "Choose language",
    chooseTheme: "Choose theme",
    lightMode: "Light mode",
    darkMode: "Dark mode",
  },
  hero: {
    headlineLine1: "Folk music",
    headlineLine2: "brings Aarhus together",
    seeProgram: "See programme",
    badgeLabel: "10th anniversary, Aarhus Folk Festival",
  },
  program: {
    eyebrow: "Thursday at the festival",
    seeFullProgram: "See the full programme",
  },
  experiences: {
    eyebrow: "Experience the festival",
    title: "Listen, dance and join in",
    intro:
      "From quiet concerts to open sessions. You are welcome whether you come to listen, dance or play along.",
  },
  about: {
    eyebrow: "About the festival",
    title: "A place to meet through music",
    paragraph1:
      "Aarhus Folk Festival brings people together around live music in the heart of the city. A fiddle can fill a church room, a dance can fill the floor, and a simple tune can become something we share.",
    paragraph2:
      "The festival is built on tradition, curiosity and the pleasure of being together. Come as you are. Listen, sing, dance, or bring your instrument. You do not need to know folk music already to feel at home here.",
    cta: "Read about the festival",
    photoCaption: "Together around the music",
    photoAlt: "Festival guests dancing together in a hall",
  },
  practical: {
    eyebrow: "Practical info",
    title: "Plan your visit",
    intro:
      "Here are the practical details that make the visit easier: venues, tickets, food, places to stay and access information.",
  },
  newsletter: {
    eyebrow: "Festival news",
    title: "Hear from us when there is news to share",
    body: "We will write when the programme takes shape, tickets open and the first names are ready.",
    success: "Thanks, we will write when there is news.",
    emailLabel: "Your email address",
    placeholder: "you@email.com",
    submit: "Sign up",
    demoNote: "Demo: this form does not send anything yet.",
  },
  footer: {
    blurb:
      "Four days of folk music, dance and community in the heart of Aarhus. For everyone who wants to listen, learn and join in.",
    exploreHeading: "Explore",
    exploreAria: "Sections",
    festivalHeading: "Festival",
    festivalAria: "Festival",
    copyright: "Cultural festival in Aarhus.",
  },
  eventCard: {
    save: "Save",
  },
  update: {
    available: "A new version is available",
    reload: "Reload",
    dismiss: "Dismiss",
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
