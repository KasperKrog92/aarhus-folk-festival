import type { Localized } from "@/i18n/config";

export const contactPage = {
  href: "/kontakt",
  eyebrow: {
    da: "Kontakt",
    en: "Contact",
  } as Localized,
  title: {
    da: "Kontakt os",
    en: "Get in touch",
  } as Localized,
  intro: {
    da: "Har du et spørgsmål om festivalen, eller vil du booke noget? Skriv til os på en af adresserne nedenfor, så vender vi tilbage.",
    en: "Got a question about the festival, or something to book? Write to us at one of the addresses below and we will get back to you.",
  } as Localized,
  channels: [
    {
      id: "general",
      label: {
        da: "Generelle henvendelser",
        en: "General enquiries",
      } as Localized,
      email: "aarhusfolkfestival@gmail.com",
      description: {
        da: "Spørgsmål om festivalen, medlemskab og alt det praktiske.",
        en: "Questions about the festival, membership and everything practical.",
      } as Localized,
    },
    {
      id: "booking",
      label: {
        da: "Booking",
        en: "Booking",
      } as Localized,
      email: "booking@aarhusfolkfestival.com",
      description: {
        da: "Er du musiker eller arrangør? Så er det her, du skal skrive.",
        en: "Are you a musician or organiser? This is where to write.",
      } as Localized,
    },
  ],
  noteHeading: {
    da: "Bemærk",
    en: "Please note",
  } as Localized,
  note: {
    da: "Direkte henvendelser til de enkelte bestyrelsesmedlemmer bliver ikke besvaret. Brug en af adresserne ovenfor, så ender din besked det rigtige sted.",
    en: "Messages sent directly to individual board members are not answered. Use one of the addresses above, and your message will reach the right place.",
  } as Localized,
} as const;
