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
  className?: string;
  /** Heading level for correct document outline (defaults to h2). */
  as?: "h1" | "h2" | "h3";
};

/**
 * Reusable section header: pink eyebrow + display title + optional intro.
 * Keeps every section's typographic rhythm consistent.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.2em]",
            isLight ? "text-pink-200" : "text-pink-600",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <Tag
        className={cn(
          "font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl",
          isLight ? "text-cream-50" : "text-content",
        )}
      >
        {title}
      </Tag>
      {intro ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
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
