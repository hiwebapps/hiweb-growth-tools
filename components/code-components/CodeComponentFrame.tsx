"use client";

import type { ReactNode } from "react";
import { Alert, Card, SectionHeader, Spinner } from "@/components/shared";
import type { CodeComponentBaseProps, ToolViewState } from "@/lib/shared/code-component";
import { themeRootClass } from "@/lib/shared/theme";
import { cn } from "@/lib/shared/utils";

type CodeComponentFrameProps = CodeComponentBaseProps & {
  children: ReactNode;
  viewState: ToolViewState;
  errorMessage?: string;
  successTitle?: string;
  successMessage?: string;
  footer?: ReactNode;
};

export function CodeComponentFrame({
  eyebrow,
  title,
  description,
  themeVariant = "light",
  className,
  children,
  viewState,
  errorMessage = "No pudimos completar la acción. Inténtalo de nuevo.",
  successTitle = "¡Listo!",
  successMessage = "Tu solicitud se registró correctamente.",
  footer,
}: CodeComponentFrameProps) {
  const isDark = themeVariant === "dark" || themeVariant === "brand";

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10",
        className,
      )}
    >
      <div className={cn(themeRootClass(themeVariant), "p-6 sm:p-8")}>
        <SectionHeader
          eyebrow={eyebrow}
          title={title ?? ""}
          description={description}
          themeVariant={themeVariant}
        />

        <div className="relative mt-8 flex flex-col gap-6">
          {viewState === "loading" ? (
            <div
              className="flex flex-col items-center justify-center gap-4 py-12"
              aria-live="polite"
            >
              <Spinner size="lg" />
              <p
                className={cn(
                  "text-sm font-medium",
                  isDark ? "hw-text-white-muted" : "text-muted",
                )}
              >
                Procesando…
              </p>
            </div>
          ) : null}

          {viewState === "error" ? (
            <Alert variant="error" title="Algo salió mal">
              {errorMessage}
            </Alert>
          ) : null}

          {viewState === "success" ? (
            <Alert variant="success" title={successTitle}>
              {successMessage}
            </Alert>
          ) : null}

          {viewState === "intro" || viewState === "active" ? children : null}

          {viewState === "loading" ? (
            <div className="pointer-events-none opacity-40">{children}</div>
          ) : null}
        </div>

        {footer && viewState !== "loading" ? (
          <div className="mt-6 border-t border-border pt-6">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}

export function PlaceholderPanel({
  title,
  children,
  themeVariant = "light",
}: {
  title: string;
  children: ReactNode;
  themeVariant?: CodeComponentBaseProps["themeVariant"];
}) {
  const isDark = themeVariant === "dark" || themeVariant === "brand";

  return (
    <Card padding="md" themeVariant="light" elevated={false} className="border-dashed">
      <p
        className={cn(
          "mb-3 text-xs font-semibold tracking-wide uppercase",
          isDark ? "text-muted" : "text-muted",
        )}
      >
        {title}
      </p>
      {children}
    </Card>
  );
}
