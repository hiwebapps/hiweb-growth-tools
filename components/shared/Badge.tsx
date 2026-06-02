import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/shared/utils";

type BadgeVariant = "neutral" | "brand" | "success" | "warning" | "error" | "info";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-background text-foreground border-border",
  brand: "hw-bg-brand-soft text-brand-600 hw-border-brand-badge",
  success: "bg-success-bg text-success hw-border-success-badge",
  warning: "bg-warning-bg text-warning hw-border-warning-badge",
  error: "bg-error-bg text-error hw-border-error-badge",
  info: "bg-info-bg text-info hw-border-info-badge",
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
