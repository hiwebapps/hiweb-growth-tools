import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/shared/utils";

type ToolPageShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  status?: "coming-soon" | "preview" | "none";
  children?: ReactNode;
  className?: string;
};

export function ToolPageShell({
  eyebrow,
  title,
  description,
  status = "coming-soon",
  children,
  className,
}: ToolPageShellProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16 sm:px-8",
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        {eyebrow ? (
          <p className="text-sm font-medium tracking-wide text-brand-600 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
        {status === "coming-soon" ? (
          <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            En preparación
          </span>
        ) : null}
        {status === "preview" ? (
          <span className="inline-flex w-fit items-center rounded-full border border-brand-600/30 bg-brand-600/10 px-3 py-1 text-xs font-medium text-brand-600">
            Vista previa
          </span>
        ) : null}
      </div>
      {children}
      <p className="text-sm text-muted">
        <Link href="/" className="font-medium text-brand-600 hover:underline">
          ← Volver al inicio
        </Link>
      </p>
    </div>
  );
}
