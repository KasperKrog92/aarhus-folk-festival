import type { Localized } from "@/i18n/config";

export type StorageItem = {
  id: string;
  name: string;
  type: Localized;
  purpose: Localized;
  setWhen: Localized;
  duration: Localized;
};

export const cookiesPage = {
  href: "/cookies",
  eyebrow: {
    da: "Cookies og privatliv",
    en: "Cookies and privacy",
  } as Localized,
  title: {
    da: "Et lille overblik over det, vi gemmer",
    en: "A small overview of what we store",
  } as Localized,
  intro: {
    da: "Aarhus Folk Festival bruger ikke statistikcookies, annoncering, pixels eller tredjepartssporing. Vi gemmer kun valg, der får hjemmesiden til at huske det, du selv har bedt den om.",
    en: "Aarhus Folk Festival does not use analytics cookies, advertising, pixels or third-party tracking. We only store choices that help the website remember what you have asked it to do.",
  } as Localized,
  whyNoBanner: {
    heading: {
      da: "Derfor viser vi ikke et samtykkebanner",
      en: "Why we do not show a consent banner",
    } as Localized,
    body: {
      da: "De teknologier, der er i brug her, er førsteparter og knyttet til funktioner som sprog, tema, hjerte-events og offline adgang. Hvis vi senere tilføjer statistik, marketing eller indlejrede tjenester, skal løsningen vurderes igen, før de bliver slået til.",
      en: "The technologies in use here are first-party and tied to functions such as language, theme, hearted events and offline access. If we later add analytics, marketing or embedded services, the setup must be reviewed again before they are enabled.",
    } as Localized,
  },
  storageHeading: {
    da: "Det gemmes i din browser",
    en: "Stored in your browser",
  } as Localized,
  storageIntro: {
    da: "Listen her dækker de cookies og lignende browserlagring, som festivalhjemmesiden bruger i dag.",
    en: "This list covers the cookies and similar browser storage currently used by the festival website.",
  } as Localized,
  labels: {
    setWhen: { da: "Sættes når", en: "Set when" } as Localized,
    duration: { da: "Varighed", en: "Duration" } as Localized,
  },
  storage: [
    {
      id: "locale",
      name: "aff_locale",
      type: { da: "Cookie", en: "Cookie" } as Localized,
      purpose: {
        da: "Husker om du har valgt dansk eller engelsk.",
        en: "Remembers whether you chose Danish or English.",
      } as Localized,
      setWhen: {
        da: "Du bruger sprogknappen i headeren.",
        en: "You use the language switcher in the header.",
      } as Localized,
      duration: { da: "1 år", en: "1 year" } as Localized,
    },
    {
      id: "theme",
      name: "aff_theme",
      type: { da: "Cookie", en: "Cookie" } as Localized,
      purpose: {
        da: "Husker om du har valgt lyst eller mørkt tema.",
        en: "Remembers whether you chose light or dark mode.",
      } as Localized,
      setWhen: {
        da: "Du bruger temaknappen i headeren.",
        en: "You use the theme switcher in the header.",
      } as Localized,
      duration: { da: "1 år", en: "1 year" } as Localized,
    },
    {
      id: "favourites",
      name: "aff_favourites",
      type: { da: "localStorage", en: "localStorage" } as Localized,
      purpose: {
        da: "Husker de programpunkter, du har markeret med et hjerte.",
        en: "Remembers the programme items you have marked with a heart.",
      } as Localized,
      setWhen: {
        da: "Du trykker på hjertet på et programpunkt.",
        en: "You press the heart on a programme item.",
      } as Localized,
      duration: {
        da: "Indtil du rydder browserdata.",
        en: "Until you clear browser data.",
      } as Localized,
    },
    {
      id: "install-dismissed",
      name: "aff_install_dismissed",
      type: { da: "localStorage", en: "localStorage" } as Localized,
      purpose: {
        da: "Husker at du har lukket installér-prompten, så den ikke bliver ved med at dukke op.",
        en: "Remembers that you dismissed the install prompt, so it does not keep appearing.",
      } as Localized,
      setWhen: {
        da: "Du lukker prompten eller installerer festivalen som app.",
        en: "You close the prompt or install the festival as an app.",
      } as Localized,
      duration: {
        da: "Indtil du rydder browserdata.",
        en: "Until you clear browser data.",
      } as Localized,
    },
    {
      id: "offline-cache",
      name: "Serwist / browsercache",
      type: {
        da: "Cache Storage og IndexedDB",
        en: "Cache Storage and IndexedDB",
      } as Localized,
      purpose: {
        da: "Gemmer sider og festivalens egne billeder, logoer og ikoner, så programmet kan læses hurtigere og delvist offline.",
        en: "Stores pages and the festival's own images, logos and icons, so the programme loads faster and partly works offline.",
      } as Localized,
      setWhen: {
        da: "Du besøger siden i en produktionsversion med service worker.",
        en: "You visit the site in a production version with the service worker.",
      } as Localized,
      duration: {
        da: "Styres af browseren. Festivalens billedaktiver udløber efter højst 30 dage uden brug.",
        en: "Managed by the browser. Festival image assets expire after at most 30 days without use.",
      } as Localized,
    },
  ] satisfies StorageItem[],
  control: {
    heading: {
      da: "Sådan kan du fjerne det",
      en: "How to remove it",
    } as Localized,
    body: {
      da: "Du kan altid rydde cookies og webstedsdata i din browser. Hvis du skifter sprog, tema eller hjerte-events igen bagefter, gemmer siden det nye valg lokalt.",
      en: "You can always clear cookies and site data in your browser. If you then change language, theme or hearted events again, the site stores the new choice locally.",
    } as Localized,
  },
} as const;
