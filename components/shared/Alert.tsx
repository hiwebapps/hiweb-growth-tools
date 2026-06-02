import type { ReactNode } from "react";
import { cn } from "@/lib/shared/utils";

type AlertVariant = "info" | "success" | "warning" | "error";

export type AlertProps = {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
};

/** Clases sin selectores arbitrarios Tailwind (compatibles con Webflow Designer). */
const variantClasses: Record<AlertVariant, string> = {
  info: "border border-info bg-info-bg text-foreground",
  success: "border border-success bg-success-bg text-foreground",
  warning: "border border-warning bg-warning-bg text-foreground",
  error: "border border-error bg-error-bg text-foreground",
};

const icons: Record<AlertVariant, string> = {
  info: "i",
  success: "+",
  warning: "!",
  error: "x",
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
        "flex gap-3 rounded-lg p-4 text-sm leading-relaxed",
        variantClasses[variant],
        className,
      )}
    >
      <span
        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-bold"
        aria-hidden="true"
      >
        {icons[variant]}
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className="text-muted">{children}</div>
      </div>
    </div>
  );
}
