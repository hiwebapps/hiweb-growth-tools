import { cn } from "@/lib/shared/utils";

type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
  size?: "sm" | "md";
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  className,
  size = "md",
}: ProgressBarProps) {
  const clamped = Math.min(max, Math.max(0, value));
  const percentage = max > 0 ? Math.round((clamped / max) * 100) : 0;

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-2 text-sm">
          {label ? (
            <span className="font-medium text-foreground">{label}</span>
          ) : (
            <span />
          )}
          {showValue ? (
            <span className="tabular-nums text-muted">{percentage}%</span>
          ) : null}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? "Progreso"}
        className={cn(
          "w-full overflow-hidden rounded-full bg-border",
          size === "sm" ? "h-1.5" : "h-2.5",
        )}
      >
        <div
          className="h-full rounded-full bg-brand-600 transition-[width] duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
