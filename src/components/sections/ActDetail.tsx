import Image from "next/image";
import { Button, buttonClasses } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { Container } from "@/components/ui/Container";
import { ImagePlaceholder } from "@/components/decorative/ImagePlaceholder";
import { FolkStripe } from "@/components/decorative/FolkStripe";
import { IconArrowRight, IconClock, IconPin } from "@/components/icons";
import { scheduleCopy, type EventTone } from "@/data/program";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export type ActDetailShow = {
  /** Resolved "Weekday Date" label. */
  day: string;
  time: string;
  venue: string;
};

/**
 * Detail page body shared by an artist and a workshop. The page resolves all
 * strings for the active locale and passes them in; this component only lays
 * them out, so `/kunstnere/[slug]` and `/workshops/[slug]` stay in sync.
 */
export function ActDetail({
  locale,
  eyebrow,
  name,
  tagline,
  bio,
  image,
  imageAlt,
  tone,
  category,
  shows,
  backHref,
}: {
  locale: Locale;
  eyebrow: string;
  name: string;
  tagline: string;
  bio: string[];
  image?: string;
  imageAlt: string;
  tone: EventTone;
  category: string;
  shows: ActDetailShow[];
  /** Where "Tilbage" / "Back" lands when there's no browser history to step back to. */
  backHref: string;
}) {
  const t = getDictionary(locale);

  return (
    <article className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-4xl">
          <BackButton
            fallbackHref={backHref}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-petroleum transition-colors hover:text-rust"
          >
            <IconArrowRight className="size-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            {t.common.back}
          </BackButton>

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-3xl border border-ink/[0.07] shadow-sm">
              {image ? (
                <Image
                  src={image}
                  alt={imageAlt}
                  width={800}
                  height={600}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                  priority
                />
              ) : (
                <ImagePlaceholder alt={imageAlt} tone={tone} className="aspect-[4/3] w-full" />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-600">
                {eyebrow}
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                {name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{tagline}</p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={site.ticketUrl[locale]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.common.buyTicket}
                </Button>
                <Button href="/program" variant="outline">
                  {scheduleCopy.seeInProgramme[locale]}
                </Button>
              </div>
            </div>
          </div>

          <FolkStripe className="my-12" />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
            <div className="space-y-5">
              {bio.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-ink-soft sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <aside className="rounded-2xl border border-petroleum/15 bg-cream-50 p-6 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-pink-600">
                {scheduleCopy.onProgramme[locale]}
              </h2>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {category}
              </p>
              <ul className="mt-4 space-y-5">
                {shows.map((show, index) => (
                  <li
                    key={index}
                    className="space-y-3 [&+li]:border-t [&+li]:border-petroleum/10 [&+li]:pt-5"
                  >
                    <div className="flex items-start gap-3">
                      <IconClock className="size-5 shrink-0 text-teal" aria-hidden />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                          {scheduleCopy.when[locale]}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-ink">
                          {show.day} · {show.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <IconPin className="size-5 shrink-0 text-teal" aria-hidden />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                          {scheduleCopy.where[locale]}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-ink">{show.venue}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="mt-12">
            <BackButton fallbackHref={backHref} className={buttonClasses("outline")}>
              {t.common.back}
            </BackButton>
          </div>
        </div>
      </Container>
    </article>
  );
}
