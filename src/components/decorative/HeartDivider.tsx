import { IconHeart } from "@/components/icons";
import { cn } from "@/lib/cn";

type HeartDividerProps = {
  /** `light` (pink-200) is for dark / petroleum backgrounds; defaults to `dark` (pink). */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * A small folk heart flanked by two thin rules — the decorative divider used
 * under centred section headings. The `light` tone is for dark backgrounds.
 */
export function HeartDivider({ tone = "dark", className }: HeartDividerProps) {
  const isLight = tone === "light";
  const line = cn("h-px w-10", isLight ? "bg-pink-200/40" : "bg-pink/40");

  return (
    <div
      aria-hidden
      className={cn(
        "flex items-center gap-2",
        isLight ? "text-pink-200" : "text-pink",
        className,
      )}
    >
      <span className={line} />
      <IconHeart className="size-4 fill-current" />
      <span className={line} />
    </div>
  );
}
