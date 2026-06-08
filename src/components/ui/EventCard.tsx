import Link from "next/link";
import { CardImage, CardShell } from "@/components/ui/CardShell";
import { FavouriteButton } from "@/components/ui/FavouriteButton";
import {
  IconConcert,
  IconDance,
  IconSession,
  IconPin,
} from "@/components/icons";
import type { ProgramEvent } from "@/data/program";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Maps a programme category (canonical Danish key) to its watermark icon. */
const categoryIcon: Record<string, React.ReactNode> = {
  Koncert: <IconConcert />,
  Bal: <IconDance />,
  Dans: <IconDance />,
  Session: <IconSession />,
};

export function EventCard({
  event,
  locale,
}: {
  event: ProgramEvent;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const title = event.title[locale];

  return (
    <CardShell>
      <div className="relative">
        <CardImage
          image={event.image}
          alt={event.imageAlt[locale]}
          tone={event.tone}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          icon={categoryIcon[event.category.da]}
        />

        {/* time badge */}
        <span className="absolute left-3 top-3 rounded-full bg-pink-600 px-3 py-1 text-sm font-bold text-white shadow-sm">
          {event.time}
        </span>

        {/* save / favourite, remembered locally in the browser */}
        <FavouriteButton
          eventId={event.id}
          label={`${t.eventCard.save} ${title}`}
          className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-surface-raised/90 text-content/70 shadow-sm backdrop-blur transition-colors hover:text-pink-600"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-pink-600">
          {event.category[locale]}
        </span>
        <h3 className="font-display text-lg font-semibold leading-snug text-content">
          <Link href={event.href} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className="mt-auto flex items-center gap-1.5 pt-1 text-sm text-content-soft">
          <IconPin className="size-4 shrink-0 text-teal" aria-hidden />
          {event.venue[locale]}
        </p>
      </div>
    </CardShell>
  );
}
