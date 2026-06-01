import { cn } from "@/lib/shared/utils";
import type { ThemeVariant } from "@/lib/shared/theme";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  themeVariant?: ThemeVariant;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  themeVariant = "light",
  className,
}: SectionHeaderProps) {
  const isBrand = themeVariant === "brand";
  const isDark = themeVariant === "dark";

  return (
    <header
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-sm font-medium tracking-wide uppercase",
            isBrand || isDark ? "text-white/80" : "text-brand-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-2xl font-semibold tracking-tight sm:text-3xl",
          isBrand || isDark ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            isBrand || isDark ? "text-white/80" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
