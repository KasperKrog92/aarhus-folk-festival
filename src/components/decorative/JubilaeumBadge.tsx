import { cn } from "@/lib/cn";

type JubilaeumBadgeProps = {
  className?: string;
};

/**
 * Round "10 års jubilæum" stamp with circular lettering — a nod to the
 * festival's anniversary, styled like a hand-stamped seal.
 */
export function JubilaeumBadge({ className }: JubilaeumBadgeProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("size-32 text-cream-50", className)}
      role="img"
      aria-label="10 års jubilæum — Aarhus Folk Festival"
    >
      <defs>
        <path
          id="badge-arc-top"
          d="M 100,100 m -74,0 a 74,74 0 1 1 148,0"
        />
        <path
          id="badge-arc-bottom"
          d="M 100,100 m -68,0 a 68,68 0 1 0 136,0"
        />
      </defs>

      {/* seal body */}
      <circle cx="100" cy="100" r="88" fill="#134e57" />
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#7bb4bb"
        strokeWidth="1.5"
        strokeDasharray="2 5"
        strokeLinecap="round"
      />

      {/* circular lettering */}
      <text
        fill="currentColor"
        fontSize="14"
        fontWeight="700"
        letterSpacing="3"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        <textPath href="#badge-arc-top" startOffset="50%" textAnchor="middle">
          AARHUS · FOLK · FESTIVAL
        </textPath>
      </text>
      <text
        fill="#7bb4bb"
        fontSize="11"
        fontWeight="600"
        letterSpacing="4"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        <textPath
          href="#badge-arc-bottom"
          startOffset="50%"
          textAnchor="middle"
        >
          EST · 2016 — 2026
        </textPath>
      </text>

      {/* centre mark */}
      <text
        x="100"
        y="98"
        textAnchor="middle"
        fill="#f0bccb"
        fontSize="44"
        fontWeight="700"
        style={{ fontFamily: "var(--font-fraunces)" }}
      >
        10
      </text>
      <text
        x="100"
        y="122"
        textAnchor="middle"
        fill="currentColor"
        fontSize="14"
        fontWeight="600"
        letterSpacing="6"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        ÅRS
      </text>
      <text
        x="100"
        y="138"
        textAnchor="middle"
        fill="#7bb4bb"
        fontSize="9"
        fontWeight="600"
        letterSpacing="3"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        JUBILÆUM
      </text>
    </svg>
  );
}
