import { cn } from "@/lib/cn";

type Tone = "petroleum" | "teal" | "pink" | "aubergine" | "evening";

const toneGradients: Record<Tone, string> = {
  petroleum: "from-petroleum-700 via-petroleum to-teal",
  teal: "from-teal via-petroleum to-petroleum-700",
  pink: "from-pink-600 via-pink to-pink-200",
  aubergine: "from-aubergine via-aubergine to-petroleum-700",
  // Warm "stage at dusk" tone for the hero.
  evening: "from-petroleum-900 via-aubergine to-ink",
};

type ImagePlaceholderProps = {
  /** Describes the imagined photo and is used as the accessible label. */
  alt: string;
  tone?: Tone;
  /** Optional watermark icon shown faintly in the centre. */
  icon?: React.ReactNode;
  /** Optional small caption rendered on the placeholder. */
  caption?: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Stand-in for a photograph until real festival imagery is available.
 * Renders a warm gradient overlaid with a subtle folk dot pattern, so empty
 * media areas still feel designed and on-brand.
 */
export function ImagePlaceholder({
  alt,
  tone = "petroleum",
  icon,
  caption,
  className,
  children,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative isolate overflow-hidden bg-gradient-to-br",
        toneGradients[tone],
        className,
      )}
    >
      {/* folk dot pattern overlay */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full text-white/[0.12]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={`dots-${tone}`}
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <circle cx="2" cy="2" r="1.4" fill="currentColor" />
            <path
              d="M11 9 h2 v2 h2 v2 h-2 v2 h-2 v-2 h-2 v-2 h2 z"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${tone})`} />
      </svg>

      {/* soft warm light, suggests stage glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-200/20 blur-2xl" />
      <div className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-teal-300/20 blur-2xl" />

      {icon ? (
        <div className="absolute inset-0 flex items-center justify-center text-white/25 [&>svg]:size-16">
          {icon}
        </div>
      ) : null}

      {caption ? (
        <span className="absolute bottom-3 left-3 rounded-full bg-black/25 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm">
          {caption}
        </span>
      ) : null}

      {children}
    </div>
  );
}
