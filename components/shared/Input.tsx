import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/shared/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  inputClassName?: string;
};

export function Input({
  label,
  hint,
  error,
  id,
  className,
  inputClassName,
  disabled,
  required,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;
  const hintId = hint && inputId ? `${inputId}-hint` : undefined;
  const errorId = error && inputId ? `${inputId}-error` : undefined;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label ? (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
          {required ? (
            <span className="text-error" aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <input
        id={inputId}
        disabled={disabled}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [errorId, hintId].filter(Boolean).join(" ") || undefined
        }
        className={cn(
          "focus-ring h-11 w-full rounded-lg border bg-surface px-3 text-sm text-foreground placeholder:text-muted",
          error
            ? "border-error focus-visible:ring-error"
            : "border-border hover:border-muted",
          disabled && "cursor-not-allowed opacity-60",
          inputClassName,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
