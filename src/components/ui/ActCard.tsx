import Link from "next/link";
import { CardImage, CardShell } from "@/components/ui/CardShell";
import { IconArrowRight } from "@/components/icons";
import type { EventTone } from "@/data/program";

export type ActCardProps = {
  href: string;
  eyebrow: string;
  name: string;
  tagline: string;
  image?: string;
  imageAlt: string;
  tone: EventTone;
  cta: string;
};

/**
 * Listing card for an "act" — an artist or a workshop. Strings are passed in
 * already resolved for the active locale, so the card stays content-agnostic
 * and is shared by both `/kunstnere` and `/workshops`.
 */
export function ActCard({
  href,
  eyebrow,
  name,
  tagline,
  image,
  imageAlt,
  tone,
  cta,
}: ActCardProps) {
  return (
    <CardShell>
      <CardImage
        image={image}
        alt={imageAlt}
        tone={tone}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />

      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-pink-600">
          {eyebrow}
        </span>
        <h3 className="font-display text-xl font-semibold leading-snug text-content">
          <Link href={href} className="after:absolute after:inset-0">
            {name}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-content-soft">{tagline}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-petroleum transition-colors group-hover:text-rust">
          {cta}
          <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </CardShell>
  );
}
