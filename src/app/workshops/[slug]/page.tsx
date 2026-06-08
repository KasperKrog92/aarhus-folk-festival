import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActDetail } from "@/components/sections/ActDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { actDetailShows } from "@/data/program";
import { site } from "@/data/site";
import { getWorkshop, workshops, workshopsPage } from "@/data/workshops";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { actMetadata } from "@/lib/metadata";
import { actEventsSchema, breadcrumbSchema } from "@/lib/structured-data";

type WorkshopPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return workshops.map((workshop) => ({ slug: workshop.slug }));
}

export async function generateMetadata({
  params,
}: WorkshopPageProps): Promise<Metadata> {
  const { slug } = await params;
  const workshop = getWorkshop(slug);

  if (!workshop) {
    return {};
  }

  const locale = await getLocale();
  const name = workshop.name[locale];

  return actMetadata({
    name,
    tagline: workshop.tagline[locale],
    image: workshop.image,
    imageAlt: workshop.imageAlt[locale],
    href: `${workshopsPage.href}/${workshop.slug}`,
  });
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const { slug } = await params;
  const workshop = getWorkshop(slug);

  if (!workshop) {
    notFound();
  }

  const locale = await getLocale();
  const t = getDictionary(locale);
  const name = workshop.name[locale];
  const href = `${workshopsPage.href}/${workshop.slug}`;
  const shows = actDetailShows(workshop.shows, locale);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: t.breadcrumb.home, url: site.url },
            { name: t.breadcrumb.workshops, url: `${site.url}${workshopsPage.href}` },
            { name },
          ]),
          ...actEventsSchema({
            type: "Event",
            name,
            description: workshop.tagline[locale],
            image: workshop.image,
            href,
            shows,
            locale,
          }),
        ]}
      />
      <ActDetail
        locale={locale}
        eyebrow={workshop.category[locale]}
        name={name}
        tagline={workshop.tagline[locale]}
        bio={workshop.bio.map((paragraph) => paragraph[locale])}
        image={workshop.image}
        imageAlt={workshop.imageAlt[locale]}
        tone={workshop.tone}
        category={workshop.category[locale]}
        shows={shows}
        href={href}
        backHref={workshopsPage.href}
        breadcrumbParentLabel={t.breadcrumb.workshops}
      />
    </>
  );
}
