import Image from "next/image";
import { ImagePlaceholder } from "@/components/decorative/ImagePlaceholder";
import type { EventTone } from "@/data/program";

/**
 * The outer frame shared by listing cards (`ActCard`, `EventCard`): a raised,
 * rounded `<article>` that lifts on hover. Card-specific content goes inside as
 * children. `group` is set here so children can use `group-hover:` utilities.
 */
export function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line/[0.07] bg-surface-raised shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {children}
    </article>
  );
}

type CardImageProps = {
  /** When set, a real photo; otherwise an on-brand gradient placeholder. */
  image?: string;
  alt: string;
  tone: EventTone;
  /** Responsive `sizes` hint for the `<Image fill>` (grid columns differ per card). */
  sizes: string;
  /** Optional watermark icon for the placeholder (ignored when `image` is set). */
  icon?: React.ReactNode;
};

/**
 * The 4:3 media area at the top of a card: a cover `<Image>` when one is given,
 * otherwise an `ImagePlaceholder`. Both cards zoom the photo on hover via the
 * shell's `group`.
 */
export function CardImage({ image, alt, tone, sizes, icon }: CardImageProps) {
  if (image) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <ImagePlaceholder alt={alt} tone={tone} icon={icon} className="aspect-[4/3] w-full" />
  );
}
