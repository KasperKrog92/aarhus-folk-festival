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
      style={{
        backgroundColor: "#134e57",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='16' viewBox='0 0 80 16'%3E%3Crect width='80' height='16' fill='%23134e57'/%3E%3Crect width='8' height='16' fill='%23e1cbac'/%3E%3Crect x='72' width='8' height='16' fill='%23e1cbac'/%3E%3Cpath d='M20 2 L28 8 L20 14 L12 8 Z' fill='%23d76d8a'/%3E%3Cpath d='M60 2 L68 8 L60 14 L52 8 Z' fill='%23f0bccb'/%3E%3Cpath d='M38 5 h4 v2 h2 v2 h-2 v2 h-4 v-2 h-2 v-2 h2 z' fill='%23e1cbac'/%3E%3C/svg%3E\")",
        backgroundPosition: "center",
        backgroundRepeat: "repeat-x",
        backgroundSize: "80px 16px",
      }}
    />
  );
}
