type QuizOptionIconProps = {
  tierIndex: number;
  className?: string;
};

/** Iconos SVG inline (sin Material Symbols externos). */
export function QuizOptionIcon({ tierIndex, className }: QuizOptionIconProps) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };

  switch (tierIndex) {
    case 0:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M5 5l14 14" />
        </svg>
      );
    case 1:
      return (
        <svg {...common}>
          <path d="M4 18h16" />
          <path d="M7 14h4" />
        </svg>
      );
    case 2:
      return (
        <svg {...common}>
          <path d="M4 18h16" />
          <path d="M7 14h4" />
          <path d="M7 10h7" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 3v6" />
          <path d="M8 9h8l-2 10H10L8 9z" />
          <path d="M6 19h12" />
        </svg>
      );
  }
}

export const QUIZ_SCALE_TITLES = [
  "Inexistente",
  "Básica",
  "Intermedia",
  "Avanzada",
] as const;
