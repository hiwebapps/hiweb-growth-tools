import type { ReactNode } from "react";
import { cn } from "@/lib/shared/utils";

type AlertVariant = "info" | "success" | "warning" | "error";

export type AlertProps = {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
};

const variantClasses: Record<AlertVariant, string> = {
  info: "border-info/30 bg-info-bg text-foreground [&_strong]:text-info",
  success: "border-success/30 bg-success-bg text-foreground [&_strong]:text-success",
  warning: "border-warning/30 bg-warning-bg text-foreground [&_strong]:text-warning",
  error: "border-error/30 bg-error-bg text-foreground [&_strong]:text-error",
};

const icons: Record<AlertVariant, string> = {
  info: "ℹ",
  success: "✓",
  warning: "⚠",
  error: "✕",
};

export function Alert({
  variant = "info",
  title,
  children,
  className,
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-lg border p-4 text-sm leading-relaxed",
        variantClasses[variant],
        className,
      )}
    >
      <span
        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-surface/80 text-xs font-bold"
        aria-hidden="true"
      >
        {icons[variant]}
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className="text-muted [&_strong]:font-semibold">{children}</div>
      </div>
    </div>
  );
}
