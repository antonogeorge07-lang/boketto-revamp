type Props = { className?: string; tone?: "ivory" | "forest" };

/**
 * Boketto "BK" monogram — thin serif capitals, B stacked over K,
 * matched to bokettopastry.com brand mark.
 */
export function BKLogo({ className = "h-9 w-9", tone = "ivory" }: Props) {
  const stroke = tone === "ivory" ? "var(--ivory)" : "var(--forest)";
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Boketto"
      role="img"
    >
      <g
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        {/* B — upper left */}
        <text
          x="6"
          y="30"
          fill={stroke}
          stroke="none"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="34"
          fontWeight="400"
          letterSpacing="0"
        >
          B
        </text>
        {/* K — lower right, slightly overlapping */}
        <text
          x="28"
          y="56"
          fill={stroke}
          stroke="none"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="34"
          fontWeight="400"
        >
          K
        </text>
      </g>
    </svg>
  );
}
