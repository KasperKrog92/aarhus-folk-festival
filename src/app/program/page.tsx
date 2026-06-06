import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EventCard } from "@/components/ui/EventCard";
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
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {programPage.title[locale]}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {programPage.intro[locale]}
          </p>
        </div>

        <FolkStripe className="my-10" />

        <div className="space-y-14">
          {days.map(({ day, events }) => (
            <div key={day.id}>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {day.weekday[locale]}{" "}
                <span className="text-petroleum">{day.date[locale]}</span>
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {events.map((event) => (
                  <li key={event.id}>
                    <EventCard event={event} locale={locale} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Button href="/" variant="outline">
            {programPage.backLabel[locale]}
          </Button>
        </div>
      </Container>
    </section>
  );
}
