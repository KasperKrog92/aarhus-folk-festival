import type { Localized } from "@/i18n/config";

export const associationPage = {
  href: "/foreningen",
  eyebrow: {
    da: "Foreningen",
    en: "The association",
  } as Localized,
  title: {
    da: "Vil du være med i foreningen?",
    en: "Want to join the association?",
  } as Localized,
  intro: {
    da: "Som medlem støtter du Aarhus Folk Festival og det fællesskab, festivalen vokser ud af.",
    en: "As a member, you support Aarhus Folk Festival and the community the festival grows from.",
  } as Localized,
  teaser: {
    da: "Så se her. Du kan blive medlem ved at skrive til foreningen og betale årets kontingent.",
    en: "Start here. You can join by writing to the association and paying the annual fee.",
  } as Localized,
  teaserCta: {
    da: "Se foreningen",
    en: "See the association",
  } as Localized,
  body: {
    da: "Det er nemt at blive medlem af Aarhus Folk Festival og støtte sagen. Kontingentet er 100 kr om året. Når du er medlem, får du adgang til forskellige fordele og kommer på vores emailliste.",
    en: "It is easy to become a member of Aarhus Folk Festival and support the cause. Membership is 100 DKK per year. As a member, you get access to different benefits and join our email list.",
  } as Localized,
  detailsHeading: {
    da: "Sådan bliver du medlem",
    en: "How to become a member",
  } as Localized,
  details: [
    {
      id: "email",
      label: {
        da: "Skriv til os",
        en: "Write to us",
      } as Localized,
      value: "aarhusfolkfestival@gmail.com",
      description: {
        da: 'Send en mail og skriv "medlemskab" i emnefeltet.',
        en: 'Send us an email and write "membership" in the subject line.',
      } as Localized,
    },
    {
      id: "fee",
      label: {
        da: "Kontingent",
        en: "Membership fee",
      } as Localized,
      value: {
        da: "100 kr om året",
        en: "100 DKK per year",
      } as Localized,
      description: {
        da: "Kontingentet betales en gang om året.",
        en: "The membership fee is paid once a year.",
      } as Localized,
    },
    {
      id: "mobilepay",
      label: {
        da: "MobilePay",
        en: "MobilePay",
      } as Localized,
      value: "93176",
      description: {
        da: "Husk at angive navn ved overførslen.",
        en: "Remember to include your name with the transfer.",
      } as Localized,
    },
  ],
  contactHref: "mailto:aarhusfolkfestival@gmail.com?subject=medlemskab",
  contactCta: {
    da: "Skriv om medlemskab",
    en: "Write about membership",
  } as Localized,
  backLabel: {
    da: "Tilbage til forsiden",
    en: "Back to the homepage",
  } as Localized,
} as const;
