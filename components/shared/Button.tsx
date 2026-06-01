import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/shared/utils";
import { Spinner } from "./Spinner";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 disabled:bg-brand-600/50",
  secondary:
    "bg-surface text-foreground border border-border hover:bg-background disabled:opacity-50",
  outline:
    "border border-brand-600 text-brand-600 bg-transparent hover:bg-brand-600/10 disabled:opacity-50",
  ghost:
    "text-foreground bg-transparent hover:bg-background disabled:opacity-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={cn(
        "focus-ring inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        isDisabled && "cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <Spinner
          size="sm"
          className={variant === "primary" ? "border-white/30 border-t-white" : undefined}
        />
      ) : null}
      {children}
    </button>
  );
}
