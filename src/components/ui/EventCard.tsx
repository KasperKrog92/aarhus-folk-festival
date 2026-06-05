import Image from "next/image";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/decorative/ImagePlaceholder";
import { FavouriteButton } from "@/components/ui/FavouriteButton";
import {
  IconConcert,
  IconDance,
  IconSession,
  IconPin,
} from "@/components/icons";
import type { FestivalEvent } from "@/data/events";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Maps a programme category (canonical Danish key) to its watermark icon. */
const categoryIcon: Record<string, React.ReactNode> = {
  Koncert: <IconConcert />,
  Dans: <IconDance />,
  Session: <IconSession />,
};

export function EventCard({
  event,
  locale,
}: {
  event: FestivalEvent;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const title = event.title[locale];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/[0.07] bg-cream-50 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        {event.image ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={event.image}
              alt={`${t.eventCard.imageAlt} ${title}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <ImagePlaceholder
            alt={`${t.eventCard.imageAlt} ${title}`}
            tone={event.tone}
            icon={categoryIcon[event.category.da]}
            className="aspect-[4/3] w-full"
          />
        )}

        {/* time badge */}
        <span className="absolute left-3 top-3 rounded-full bg-pink px-3 py-1 text-sm font-bold text-white shadow-sm">
          {event.time}
        </span>

        {/* save / favourite, remembered in the aff_favourites cookie */}
        <FavouriteButton
          eventId={event.id}
          label={`${t.eventCard.save} ${title}`}
          className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-white/90 text-ink/70 shadow-sm backdrop-blur transition-colors hover:text-pink-600"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-pink-600">
          {event.category[locale]}
        </span>
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">
          <Link
            href="#program"
            className="after:absolute after:inset-0"
            aria-label={`${title}, ${t.eventCard.seeInProgram}`}
          >
            {title}
          </Link>
        </h3>
        <p className="mt-auto flex items-center gap-1.5 pt-1 text-sm text-ink-soft">
          <IconPin className="size-4 shrink-0 text-teal" aria-hidden />
          {event.venue[locale]}
        </p>
      </div>
    </article>
  );
}
