import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: React.ReactNode;
  /** Optional supporting paragraph below the title. */
  intro?: React.ReactNode;
  align?: "left" | "center";
  /** Colour theme. `light` is for dark / petroleum backgrounds. */
  tone?: "dark" | "light";
  /**
   * Type scale. `"section"` (default) sizes for in-page `<h2>` sections;
   * `"page"` is the larger heading used at the top of a standalone page and
   * defaults `as` to `"h1"`.
   */
  size?: "section" | "page";
  className?: string;
  /** Heading level for correct document outline (defaults to h2, h1 at page size). */
  as?: "h1" | "h2" | "h3";
};

/**
 * Reusable header: pink eyebrow + display title + optional intro. Keeps every
 * heading's typographic rhythm consistent — the `"section"` size for in-page
 * `<h2>` sections, the `"page"` size for the eyebrow/title/intro block at the
 * top of a standalone page.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  size = "section",
  className,
  as,
}: SectionHeadingProps) {
  const isLight = tone === "light";
  const isPage = size === "page";
  const Tag = as ?? (isPage ? "h1" : "h2");
  return (
    <div
      className={cn(
        "flex flex-col",
        isPage ? "gap-0" : "gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "font-semibold uppercase",
            isPage ? "text-sm tracking-[0.18em]" : "text-xs tracking-[0.2em]",
            isLight ? "text-pink-200" : "text-pink-600",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <Tag
        className={cn(
          "font-display font-semibold",
          isPage
            ? "text-4xl leading-tight sm:text-5xl"
            : "text-3xl leading-[1.1] tracking-tight sm:text-4xl",
          isPage && eyebrow && "mt-4",
          isLight ? "text-cream-50" : "text-content",
        )}
      >
        {title}
      </Tag>
      {intro ? (
        <p
          className={cn(
            "leading-relaxed",
            isPage ? "mt-5 text-lg" : "max-w-2xl text-base sm:text-lg",
            align === "center" && "mx-auto",
            isLight ? "text-cream-100/85" : "text-content-soft",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
