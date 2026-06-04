import { cn } from "@/lib/cn";

type ScallopEdgeProps = {
  className?: string;
  /** Tailwind text-color utility — sets the scallop colour via currentColor. */
  colorClassName?: string;
};

/**
 * Scalloped divider — a row of half-circles, like a hand-cut paper edge.
 * Place it at the bottom of a section (absolutely positioned) so the colour
 * of the *next* section appears to bite into the current one.
 */
export function ScallopEdge({
  className,
  colorClassName = "text-cream",
}: ScallopEdgeProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none w-full leading-[0]", colorClassName, className)}
    >
      <svg
        className="block h-4 w-full sm:h-5"
        viewBox="0 0 48 8"
        preserveAspectRatio="none"
        role="presentation"
      >
        <defs>
          <pattern
            id="scallop"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <path d="M0 8 A4 4 0 0 1 8 8 Z" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="48" height="8" fill="url(#scallop)" />
      </svg>
    </div>
  );
}
