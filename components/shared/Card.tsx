import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/shared/utils";
import type { ThemeVariant } from "@/lib/shared/theme";
import { themeRootClass } from "@/lib/shared/theme";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  themeVariant?: ThemeVariant;
  elevated?: boolean;
};

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

export function Card({
  children,
  padding = "md",
  themeVariant = "light",
  elevated = true,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        themeRootClass(themeVariant),
        paddingClasses[padding],
        elevated && themeVariant === "light" && "shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function CardHeader({
  title,
  description,
  action,
  className,
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "mb-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        {description ? (
          <p className="text-sm text-muted leading-relaxed">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0 pt-1">{action}</div> : null}
    </div>
  );
}

export function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-end",
        className,
      )}
    >
      {children}
    </div>
  );
}
