import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActDetail } from "@/components/sections/ActDetail";
import { actDetailShows } from "@/data/program";
import { getWorkshop, workshops, workshopsPage } from "@/data/workshops";
import { getLocale } from "@/i18n/server";
import { actMetadata } from "@/lib/metadata";

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

  return actMetadata(
    {
      name,
      tagline: workshop.tagline[locale],
      image: workshop.image,
      href: `${workshopsPage.href}/${workshop.slug}`,
    },
    locale,
  );
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const { slug } = await params;
  const workshop = getWorkshop(slug);

  if (!workshop) {
    notFound();
  }

  const locale = await getLocale();

  return (
    <ActDetail
      locale={locale}
      eyebrow={workshop.category[locale]}
      name={workshop.name[locale]}
      tagline={workshop.tagline[locale]}
      bio={workshop.bio.map((paragraph) => paragraph[locale])}
      image={workshop.image}
      imageAlt={workshop.imageAlt[locale]}
      tone={workshop.tone}
      category={workshop.category[locale]}
      shows={actDetailShows(workshop.shows, locale)}
      backHref={workshopsPage.href}
    />
  );
}
