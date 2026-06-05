/**
 * Inline SVG icon set for Aarhus Folk Festival.
 *
 * Every icon is a 24×24, stroke-based glyph that inherits `currentColor`,
 * so colour and size are controlled with Tailwind utilities on the element
 * (e.g. `className="size-6 text-pink"`). Decorative by default — pass a
 * `title` to expose an accessible label when an icon stands on its own.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

function Svg({ title, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className="size-6"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/* ---- Experience categories ---------------------------------------- */

export function IconConcert(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </Svg>
  );
}

export function IconDance(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="4.5" r="1.8" />
      <path d="M12 6.5 9 12l-2.5 6" />
      <path d="M12 6.5l3 4.5 3 5.5" />
      <path d="M6.5 9.5 12 8l5.5 1.5" />
    </Svg>
  );
}

export function IconSession(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M16.5 3.5 9 11l-3.5 1L4 16.5 7.5 20l4-1.5 1-3.5 7.5-7.5z" />
      <path d="M16.5 3.5 20.5 7.5" />
      <path d="M9 11l4 4" />
    </Svg>
  );
}

export function IconWorkshop(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 21h18" />
      <path d="M5 21v-7l7-4 7 4v7" />
      <path d="M9 21v-4h6v4" />
      <path d="M12 10V4l3 1.5" />
    </Svg>
  );
}

export function IconFamily(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="8" cy="6" r="2.2" />
      <circle cx="16" cy="6.5" r="1.8" />
      <path d="M5 21v-5a3 3 0 0 1 6 0v5" />
      <path d="M14 21v-4a2.5 2.5 0 0 1 5 0v4" />
    </Svg>
  );
}

export function IconInfo(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </Svg>
  );
}

/* ---- Practical info ------------------------------------------------ */

export function IconPin(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

export function IconBed(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 19V7" />
      <path d="M3 11h13a4 4 0 0 1 4 4v4" />
      <path d="M3 15h17" />
      <circle cx="7.5" cy="11" r="0.01" />
      <path d="M6.5 11h2" />
    </Svg>
  );
}

export function IconBus(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="16" height="13" rx="2" />
      <path d="M4 11h16" />
      <path d="M7 17v2M17 17v2" />
      <path d="M8 14h.01M16 14h.01" />
    </Svg>
  );
}

export function IconCup(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 8h12v5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z" />
      <path d="M17 9h2a2 2 0 0 1 0 4h-2" />
      <path d="M8 3v2M11 2.5V5M14 3v2" />
    </Svg>
  );
}

export function IconAccessibility(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="4.5" r="1.6" />
      <path d="M5 8.5c2.5 1 4.5 1.3 7 1.3s4.5-.3 7-1.3" />
      <path d="M12 8v5M12 13l-3 6M12 13l3 6" />
    </Svg>
  );
}

/* ---- UI glyphs ----------------------------------------------------- */

export function IconHeart(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 20s-7-4.5-7-9.5A4 4 0 0 1 12 8a4 4 0 0 1 7 2.5C19 15.5 12 20 12 20z" />
    </Svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Svg>
  );
}

/* ---- Social (placeholders) ---------------------------------------- */

export function IconFacebook(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5l.5-3.5H14V8.8c0-.2.1-.3.3-.3z" />
    </Svg>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M16.5 7.5h.01" />
    </Svg>
  );
}
