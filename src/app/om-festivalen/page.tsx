import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FolkStripe } from "@/components/decorative/FolkStripe";
import { HeartDivider } from "@/components/decorative/HeartDivider";
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
import { aboutPage, type AboutImage, type AboutImageIcon } from "@/data/about";
import type { Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";

/** Icon keys in the data map to inline SVG components here (data stays plain). */
const aboutIcons: Record<AboutImageIcon, React.ComponentType<{ className?: string }>> = {
  dance: IconDance,
  concert: IconConcert,
  session: IconSession,
  pin: IconPin,
};

/** Shared caption chip, matching the placeholder + homepage about photo. */
const captionClass =
  "absolute bottom-3 left-3 rounded-full bg-black/25 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm";

/**
 * Renders a real photo when the image has a `src`, otherwise the gradient
 * placeholder. `className` carries the shared sizing/rounding/shadow so both
 * branches look identical in layout.
 */
function AboutMedia({
  image,
  locale,
  className,
  sizes,
}: {
  image: AboutImage;
  locale: Locale;
  className: string;
  sizes: string;
}) {
  if (!image.src) {
    const Icon = aboutIcons[image.icon];
    return (
      <ImagePlaceholder
        alt={image.alt[locale]}
        tone={image.tone}
        caption={image.caption[locale]}
        icon={<Icon />}
        className={className}
      />
    );
  }

  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <Image
        src={image.src}
        alt={image.alt[locale]}
        fill
        sizes={sizes}
        className="object-cover"
      />
      <span className={captionClass}>{image.caption[locale]}</span>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return pageMetadata(
    {
      title: aboutPage.metaTitle,
      description: aboutPage.metaDescription,
      href: aboutPage.href,
    },
    locale,
  );
}

export default async function AboutPage() {
  const locale = await getLocale();
  const intro = aboutPage.introImage;
  const banner = aboutPage.banner;

  return (
    <>
      {/* Header: eyebrow + title + lead, alongside an atmospheric stand-in. */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-2xl">
            <SectionHeading
              size="page"
              as="h1"
              eyebrow={aboutPage.eyebrow[locale]}
              title={aboutPage.title[locale]}
            />
            <p className="mt-5 font-display text-2xl font-medium leading-snug text-petroleum sm:text-3xl">
              {aboutPage.lead[locale]}
            </p>

            <div className="mt-7 space-y-4 text-base leading-relaxed text-content-soft sm:text-lg">
              {aboutPage.intro.map((paragraph, i) => (
                <p key={i}>{paragraph[locale]}</p>
              ))}
            </div>
          </div>

          <div className="relative">
            <AboutMedia
              image={intro}
              locale={locale}
              sizes="(min-width: 1024px) 40vw, 100vw"
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
          <AboutMedia
            image={banner}
            locale={locale}
            sizes="(min-width: 1200px) 1152px, 100vw"
            className="h-64 w-full rounded-3xl shadow-lg sm:h-80 lg:h-[26rem]"
          />
        </Container>
      </section>

      {/* Themed sections, alternating text / image rhythm. */}
      <section className="py-12 sm:py-16">
        <Container className="flex flex-col gap-16 sm:gap-24">
          {aboutPage.sections.map((block, index) => {
            const reversed = index % 2 === 1;

            return (
              <div
                key={block.id}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={reversed ? "lg:order-2" : undefined}>
                  <h2 className="font-display text-3xl font-semibold leading-tight text-content sm:text-4xl">
                    {block.heading[locale]}
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-content-soft sm:text-lg">
                    {block.paragraphs.map((paragraph, i) => (
                      <p key={i}>{paragraph[locale]}</p>
                    ))}
                  </div>
                </div>

                <div className={reversed ? "lg:order-1" : undefined}>
                  <AboutMedia
                    image={block.image}
                    locale={locale}
                    sizes="(min-width: 1024px) 50vw, 100vw"
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
          colorClassName="text-surface"
          className="absolute left-0 top-0 rotate-180"
        />
        <Container>
            <div className="mx-auto max-w-2xl text-center">
              <HeartDivider tone="light" className="mx-auto justify-center" />

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
