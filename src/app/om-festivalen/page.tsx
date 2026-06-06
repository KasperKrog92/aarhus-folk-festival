import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FolkStripe } from "@/components/decorative/FolkStripe";
import { ScallopEdge } from "@/components/decorative/ScallopEdge";
import { ImagePlaceholder } from "@/components/decorative/ImagePlaceholder";
import {
  IconConcert,
  IconDance,
  IconSession,
  IconPin,
  IconHeart,
  IconArrowRight,
} from "@/components/icons";
import { aboutPage, type AboutImageIcon } from "@/data/about";
import { getLocale } from "@/i18n/server";

/** Icon keys in the data map to inline SVG components here (data stays plain). */
const aboutIcons: Record<AboutImageIcon, React.ComponentType<{ className?: string }>> = {
  dance: IconDance,
  concert: IconConcert,
  session: IconSession,
  pin: IconPin,
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: aboutPage.metaTitle[locale],
    description: aboutPage.metaDescription[locale],
    alternates: { canonical: aboutPage.href },
  };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const intro = aboutPage.introImage;
  const IntroIcon = aboutIcons[intro.icon];
  const banner = aboutPage.banner;

  return (
    <>
      {/* Header: eyebrow + title + lead, alongside an atmospheric stand-in. */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-600">
              {aboutPage.eyebrow[locale]}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
              {aboutPage.title[locale]}
            </h1>
            <p className="mt-5 font-display text-2xl font-medium leading-snug text-petroleum sm:text-3xl">
              {aboutPage.lead[locale]}
            </p>

            <div className="mt-7 space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg">
              {aboutPage.intro.map((paragraph, i) => (
                <p key={i}>{paragraph[locale]}</p>
              ))}
            </div>
          </div>

          <div className="relative">
            <ImagePlaceholder
              alt={intro.alt[locale]}
              tone={intro.tone}
              caption={intro.caption[locale]}
              icon={<IntroIcon />}
              className="aspect-[4/5] w-full rounded-3xl shadow-xl"
            />
            {/* decorative hearts, echoing the homepage about section */}
            <div
              aria-hidden
              className="absolute -left-3 -top-3 flex gap-1 text-pink"
            >
              <IconHeart className="size-6 fill-current" />
              <IconHeart className="size-4 fill-current opacity-70" />
            </div>
          </div>
        </Container>
      </section>

      {/* Full-width atmospheric band, a quiet "step inside" moment. */}
      <section className="pb-4">
        <Container>
          <ImagePlaceholder
            alt={banner.alt[locale]}
            tone={banner.tone}
            caption={banner.caption[locale]}
            className="h-64 w-full rounded-3xl shadow-lg sm:h-80 lg:h-[26rem]"
          />
        </Container>
      </section>

      {/* Themed sections, alternating text / image rhythm. */}
      <section className="py-12 sm:py-16">
        <Container className="flex flex-col gap-16 sm:gap-24">
          {aboutPage.sections.map((block, index) => {
            const Icon = aboutIcons[block.image.icon];
            const reversed = index % 2 === 1;

            return (
              <div
                key={block.id}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={reversed ? "lg:order-2" : undefined}>
                  <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                    {block.heading[locale]}
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg">
                    {block.paragraphs.map((paragraph, i) => (
                      <p key={i}>{paragraph[locale]}</p>
                    ))}
                  </div>
                </div>

                <div className={reversed ? "lg:order-1" : undefined}>
                  <ImagePlaceholder
                    alt={block.image.alt[locale]}
                    tone={block.image.tone}
                    caption={block.image.caption[locale]}
                    icon={<Icon />}
                    className="aspect-[5/4] w-full rounded-3xl shadow-lg"
                  />
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      {/* Closing community section, warm petroleum with a scalloped lead-in. */}
      <section
        id={aboutPage.community.id}
        aria-labelledby="faellesskab-overskrift"
        className="relative isolate overflow-hidden bg-petroleum py-16 text-cream-100 sm:py-24"
      >
        {/* Cream scallops bite down into the petroleum from the section above. */}
        <ScallopEdge
          colorClassName="text-cream"
          className="absolute left-0 top-0 rotate-180"
        />
        <Container>
            <div className="mx-auto max-w-2xl text-center">
              <div
                aria-hidden
                className="mx-auto flex items-center justify-center gap-2 text-pink-200"
              >
                <span className="h-px w-10 bg-pink-200/40" />
                <IconHeart className="size-4 fill-current" />
                <span className="h-px w-10 bg-pink-200/40" />
              </div>

              <h2
                id="faellesskab-overskrift"
                className="mt-5 font-display text-3xl font-semibold leading-tight text-cream-50 sm:text-4xl"
              >
                {aboutPage.community.heading[locale]}
              </h2>

              <div className="mt-5 space-y-4 text-base leading-relaxed text-cream-100/85 sm:text-lg">
                {aboutPage.community.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph[locale]}</p>
                ))}
              </div>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href={aboutPage.ctaPrimary.href} variant="solidLight" size="lg">
                  {aboutPage.ctaPrimary.label[locale]}
                  <IconArrowRight className="size-5" />
                </Button>
                <Button
                  href={aboutPage.ctaSecondary.href}
                  variant="outlineLight"
                  size="lg"
                >
                  {aboutPage.ctaSecondary.label[locale]}
                </Button>
              </div>
          </div>
        </Container>
      </section>

      <Container>
        <FolkStripe className="my-12" />
      </Container>
    </>
  );
}
