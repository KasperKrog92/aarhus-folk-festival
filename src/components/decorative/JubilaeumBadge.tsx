import { cn } from "@/lib/cn";

type JubilaeumBadgeProps = {
  className?: string;
  /** Accessible label; localised by the caller. */
  label?: string;
  number?: string;
  numberSuffix?: string;
  qualifier?: string;
  caption?: string;
};

/**
 * Round anniversary stamp with circular lettering, a nod to the
 * festival's anniversary, styled like a hand-stamped seal.
 */
export function JubilaeumBadge({
  className,
  label = "10 års jubilæum, Aarhus Folk Festival",
  number = "10",
  numberSuffix = "",
  qualifier = "ÅRS",
  caption = "JUBILÆUM",
}: JubilaeumBadgeProps) {
  const hasQualifier = qualifier.length > 0;
  const hasNumberSuffix = numberSuffix.length > 0;
  const captionIsLong = caption.length > 8;
  const numberY = hasQualifier ? 96 : 106;
  const captionY = hasQualifier ? 140 : 132;

  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("size-32 text-cream-50", className)}
      role="img"
      aria-label={label}
    >
      <defs>
        <path
          id="badge-arc-top"
          d="M 38,100 A 62,62 0 0 1 162,100"
        />
        <path
          id="badge-arc-bottom"
          d="M 34,100 A 66,66 0 0 0 166,100"
        />
      </defs>

      {/* seal body */}
      <circle cx="100" cy="100" r="90" fill="#0e3b43" />
      <circle cx="100" cy="100" r="84" fill="#134e57" />
      <circle
        cx="100"
        cy="100"
        r="76"
        fill="none"
        stroke="#7bb4bb"
        strokeWidth="1.25"
        strokeDasharray="1.5 5"
        strokeLinecap="round"
      />
      <circle
        cx="100"
        cy="100"
        r="53"
        fill="none"
        stroke="#7bb4bb"
        strokeWidth="1"
        strokeOpacity="0.35"
      />

      {/* circular lettering */}
      <text
        fill="currentColor"
        fontSize="11.5"
        fontWeight="700"
        letterSpacing="2.2"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        <textPath href="#badge-arc-top" startOffset="50%" textAnchor="middle">
          AARHUS FOLK FESTIVAL
        </textPath>
      </text>
      <text
        fill="#7bb4bb"
        fontSize="9.5"
        fontWeight="600"
        letterSpacing="2.6"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        <textPath
          href="#badge-arc-bottom"
          startOffset="50%"
          textAnchor="middle"
        >
          EST · 2016 · 2026
        </textPath>
      </text>

      {/* centre mark */}
      <text
        x="100"
        y={numberY}
        textAnchor="middle"
        fill="#f0bccb"
        fontSize="43"
        fontWeight="700"
        style={{ fontFamily: "var(--font-fraunces)" }}
      >
        {number}
        {hasNumberSuffix ? (
          <tspan baselineShift="super" fontSize="17">
            {numberSuffix}
          </tspan>
        ) : null}
      </text>
      {hasQualifier ? (
        <text
          x="100"
          y="122"
          textAnchor="middle"
          fill="currentColor"
          fontSize="13"
          fontWeight="600"
          letterSpacing="5.5"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {qualifier}
        </text>
      ) : null}
      <text
        x="100"
        y={captionY}
        textAnchor="middle"
        fill="#7bb4bb"
        fontSize={captionIsLong ? "7.3" : "8.5"}
        fontWeight="600"
        letterSpacing={captionIsLong ? "1.2" : "2.4"}
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        {caption}
      </text>
    </svg>
  );
}
