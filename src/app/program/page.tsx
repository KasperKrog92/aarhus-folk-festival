import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProgramSchedule } from "@/components/sections/ProgramSchedule";
import { FolkStripe } from "@/components/decorative/FolkStripe";
import { getProgramByDay, programPage } from "@/data/program";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: programPage.title[locale],
    description: programPage.intro[locale],
    alternates: { canonical: programPage.href },
  };
}

export default async function ProgramPage() {
  const locale = await getLocale();
  const days = getProgramByDay();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-600">
            {programPage.eyebrow[locale]}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-content sm:text-5xl">
            {programPage.title[locale]}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-content-soft">
            {programPage.intro[locale]}
          </p>
        </div>

        <FolkStripe className="my-10" />

        <ProgramSchedule days={days} locale={locale} />

        <div className="mt-12">
          <Button href="/" variant="outline">
            {programPage.backLabel[locale]}
          </Button>
        </div>
      </Container>
    </section>
  );
}
