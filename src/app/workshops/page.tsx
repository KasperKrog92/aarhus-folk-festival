import type { Metadata } from "next";
import { ActListing } from "@/components/sections/ActListing";
import { workshops, workshopsPage } from "@/data/workshops";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return pageMetadata(
    {
      title: workshopsPage.title,
      description: workshopsPage.intro,
      href: workshopsPage.href,
    },
    locale,
  );
}

export default async function WorkshopsPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <ActListing
      eyebrow={workshopsPage.eyebrow[locale]}
      title={workshopsPage.title[locale]}
      intro={workshopsPage.intro[locale]}
      cards={workshops.map((workshop) => ({
        href: `${workshopsPage.href}/${workshop.slug}`,
        eyebrow: workshop.category[locale],
        name: workshop.name[locale],
        tagline: workshop.tagline[locale],
        image: workshop.image,
        imageAlt: workshop.imageAlt[locale],
        tone: workshop.tone,
        cta: t.common.readMore,
      }))}
      backLabel={t.common.backToHome}
    />
  );
}
