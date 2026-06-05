import { cn } from "@/lib/cn";

type FolkStripeProps = {
  className?: string;
};

/**
 * Woven textile stripe, a repeating folk pattern of diamonds and crosses in
 * the festival palette, reminiscent of embroidered ribbon. Decorative divider
 * used between content blocks.
 */
export function FolkStripe({ className }: FolkStripeProps) {
  return (
    <div
      aria-hidden
      className={cn("h-6 w-full overflow-hidden rounded-full", className)}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 40 16"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <pattern
            id="folk-weave"
            width="40"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <rect width="40" height="16" fill="#134e57" />
            {/* diamonds */}
            <path d="M10 2 L14 8 L10 14 L6 8 Z" fill="#d76d8a" />
            <path d="M30 2 L34 8 L30 14 L26 8 Z" fill="#f0bccb" />
            {/* crosses */}
            <path
              d="M19 5 h2 v2 h2 v2 h-2 v2 h-2 v-2 h-2 v-2 h2 z"
              fill="#e1cbac"
            />
            <path
              d="M-1 5 h2 v2 h2 v2 h-2 v2 h-2 v-2 h-2 v-2 h2 z"
              fill="#e1cbac"
            />
          </pattern>
        </defs>
        <rect width="40" height="16" fill="url(#folk-weave)" />
      </svg>
    </div>
  );
}
