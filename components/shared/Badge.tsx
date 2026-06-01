import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/shared/utils";

type BadgeVariant = "neutral" | "brand" | "success" | "warning" | "error" | "info";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-background text-foreground border-border",
  brand: "bg-brand-600/10 text-brand-600 border-brand-600/20",
  success: "bg-success-bg text-success border-success/20",
  warning: "bg-warning-bg text-warning border-warning/20",
  error: "bg-error-bg text-error border-error/20",
  info: "bg-info-bg text-info border-info/20",
};

export function Badge({
  children,
  variant = "neutral",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
