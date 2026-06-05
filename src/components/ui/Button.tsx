import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "outlineLight" | "solidLight";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Dusty coral pink, the festival's primary call to action.
  primary:
    "bg-pink text-white shadow-sm shadow-pink/30 hover:bg-pink-600 hover:-translate-y-0.5 active:translate-y-0",
  // Subtle outline for use on cream surfaces.
  outline:
    "border border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/[0.04]",
  // Outline tuned for dark / photographic backgrounds.
  outlineLight:
    "border border-white/50 text-white hover:bg-white/10 hover:border-white",
  // Light pill for dark backgrounds.
  solidLight:
    "bg-cream-50 text-petroleum-700 hover:bg-white hover:-translate-y-0.5 active:translate-y-0",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

type ButtonProps = ButtonAsLink | ButtonAsButton;

/**
 * Polymorphic button. Renders a Next.js `<Link>` when `href` is provided,
 * otherwise a native `<button>`, so the same styling covers navigation and
 * actions alike.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
