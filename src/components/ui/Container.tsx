import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** Render as a different element (e.g. "section", "header"). */
  as?: React.ElementType;
};

/**
 * Centered, max-width content wrapper with responsive horizontal padding.
 * Used to keep every section aligned to the same page gutter.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </Tag>
  );
}
