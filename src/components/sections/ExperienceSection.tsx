import { Container } from "@/components/ui/Container";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { FolkStripe } from "@/components/decorative/FolkStripe";
import { IconHeart } from "@/components/icons";
import { experiences } from "@/data/experiences";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

export async function ExperienceSection() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <section
      id="oplev"
      aria-labelledby="oplev-overskrift"
      className="scroll-mt-24 bg-cream-100 py-16 sm:py-20"
    >
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-600">
            {t.experiences.eyebrow}
          </span>
          <h2
            id="oplev-overskrift"
            className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            {t.experiences.title}
          </h2>

          {/* little folk heart divider */}
          <div
            aria-hidden
            className="flex items-center gap-2 text-pink"
          >
            <span className="h-px w-10 bg-pink/40" />
            <IconHeart className="size-4 fill-current" />
            <span className="h-px w-10 bg-pink/40" />
          </div>

          <p className="mt-1 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {t.experiences.intro}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <li key={experience.id}>
              <ExperienceCard experience={experience} locale={locale} />
            </li>
          ))}
        </ul>

        <FolkStripe className="mt-12" />
      </Container>
    </section>
  );
}
