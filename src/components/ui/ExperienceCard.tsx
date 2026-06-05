import Link from "next/link";
import {
  IconConcert,
  IconDance,
  IconSession,
  IconWorkshop,
  IconFamily,
  IconInfo,
  IconArrowRight,
} from "@/components/icons";
import type { Experience, ExperienceIcon } from "@/data/experiences";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const icons: Record<ExperienceIcon, React.ComponentType<{ className?: string }>> = {
  concert: IconConcert,
  dance: IconDance,
  session: IconSession,
  workshop: IconWorkshop,
  family: IconFamily,
  info: IconInfo,
};

const accents: Record<Experience["accent"], string> = {
  petroleum: "bg-petroleum/10 text-petroleum",
  pink: "bg-pink/15 text-pink-600",
  teal: "bg-teal/15 text-teal",
  aubergine: "bg-aubergine/10 text-aubergine",
  rust: "bg-rust/10 text-rust",
};

export function ExperienceCard({
  experience,
  locale,
}: {
  experience: Experience;
  locale: Locale;
}) {
  const Icon = icons[experience.icon];
  const t = getDictionary(locale);

  return (
    <Link
      href={experience.href}
      className="group relative flex h-full flex-col gap-5 rounded-2xl border border-ink/[0.07] bg-cream-50 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ink/15 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <span
          className={`grid size-14 shrink-0 place-items-center rounded-2xl ${accents[experience.accent]}`}
        >
          <Icon className="size-7" />
        </span>

        <h3 className="min-w-0 font-display text-xl font-semibold leading-snug text-ink">
          {experience.title[locale]}
        </h3>
      </div>

      <p className="text-sm leading-relaxed text-ink-soft">
        {experience.description[locale]}
      </p>

      <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-petroleum transition-colors group-hover:text-rust">
        {t.common.readMore}
        <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
