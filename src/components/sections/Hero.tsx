import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScallopEdge } from "@/components/decorative/ScallopEdge";
import { JubilaeumBadge } from "@/components/decorative/JubilaeumBadge";
import { IconArrowRight } from "@/components/icons";
import { site } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

export async function Hero() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <section
      id="top"
      aria-labelledby="hero-overskrift"
      className="relative isolate overflow-hidden bg-petroleum-900"
    >
      {/* Background photo + warm readability overlays */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero_dancing.jpg"
          alt={t.hero_alt.background}
          fill
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          className="object-cover object-[58%_20%]"
        />
        {/* Left-weighted warm scrim keeps the headline legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20" />
        {/* Vertical scrim darkens top + blends the bottom into the cream below */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/35" />
      </div>

      <Container className="relative grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-[1.5fr_1fr] lg:py-36">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-pink-200/40 bg-white/[0.08] px-4 py-1.5 text-sm font-semibold tracking-wide text-pink-200 backdrop-blur">
            {site.dates[locale]}
          </p>

          <h1
            id="hero-overskrift"
            className="mt-6 font-display text-5xl font-semibold leading-[1.04] tracking-tight text-cream-50 drop-shadow-sm sm:text-6xl lg:text-7xl"
          >
            {t.hero.headlineLine1}
            <br />
            {t.hero.headlineLine2}
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-cream-100/90 sm:text-xl">
            {site.intro[locale]}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              href={site.ticketUrl[locale]}
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.common.buyTicket}
            </Button>
            <Button href={site.programUrl} variant="outlineLight" size="lg">
              {t.hero.seeProgram}
              <IconArrowRight className="size-5" />
            </Button>
          </div>
        </div>

        {/* Anniversary stamp */}
        <div className="hidden justify-self-center lg:flex lg:justify-self-end">
          <JubilaeumBadge
            label={t.hero.badgeLabel}
            className="size-44 animate-float-slow drop-shadow-xl"
          />
        </div>
      </Container>

      <ScallopEdge
        colorClassName="text-cream"
        className="absolute bottom-0 left-0"
      />
    </section>
  );
}
