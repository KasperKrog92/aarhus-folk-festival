import { cn } from "@/lib/cn";

type FolkBorderProps = {
  className?: string;
  /** Flip the triangles to point upward. */
  flip?: boolean;
};

/**
 * Folk "bunting" band — a row of little triangles on a petroleum strip,
 * echoing the embroidered borders on the festival's poster. Purely
 * decorative; rendered as a tiled SVG so it scales to any width.
 */
export function FolkBorder({ className, flip = false }: FolkBorderProps) {
  return (
    <div
      aria-hidden
      className={cn("h-7 w-full bg-petroleum text-teal-300", className)}
    >
      <svg
        className={cn("h-full w-full", flip && "rotate-180")}
        viewBox="0 0 48 28"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <pattern
            id="folk-bunting"
            width="16"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            {/* hanging triangle */}
            <path d="M2 6 L14 6 L8 20 Z" fill="currentColor" opacity="0.9" />
            {/* small dot between flags */}
            <circle cx="8" cy="3" r="1.4" fill="#f0bccb" />
            <circle cx="0" cy="3" r="1.4" fill="#f0bccb" />
          </pattern>
        </defs>
        <rect width="48" height="28" fill="url(#folk-bunting)" />
      </svg>
    </div>
  );
}
