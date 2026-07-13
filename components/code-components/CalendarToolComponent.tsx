"use client";

import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { CalendarDesignerPreview } from "@/components/calendar/CalendarDesignerPreview";
import { CalendarNativeStyles } from "@/components/calendar/CalendarNativeStyles";
import { BookingConfirmation } from "@/components/calendar/BookingConfirmation";
import type { BookingRecord } from "@/lib/calendar/types";
import type { CodeComponentBaseProps, ToolViewState } from "@/lib/shared/code-component";
import { mergeProps } from "@/lib/shared/code-component";
import { isWebflowDesignerCanvas } from "@/lib/shared/is-webflow-designer";

const CalendarToolLazy = lazy(() =>
  import("@/components/calendar/CalendarTool").then((m) => ({
    default: m.CalendarTool,
  })),
);

export type CalendarToolComponentProps = CodeComponentBaseProps & {
  defaultService?: string;
  startButtonLabel?: string;
  submitButtonLabel?: string;
  successTitle?: string;
  successMessage?: string;
};

const DEFAULTS: CalendarToolComponentProps = {
  eyebrow: "Agenda",
  title: "Reserva una llamada con Hiweb",
  description:
    "Elige servicio, fecha y horario disponible. Te confirmaremos por correo.",
  defaultService: "consulting",
  startButtonLabel: "Ver disponibilidad",
  submitButtonLabel: "Confirmar cita",
  successTitle: "Cita confirmada",
  successMessage:
    "Hemos registrado tu solicitud. Recibirás un correo con los detalles.",
};

export function CalendarToolComponent(
  rawProps: CalendarToolComponentProps = {},
) {
  const props = mergeProps(DEFAULTS, rawProps);
  const {
    previewState,
    className,
    eyebrow,
    title,
    description,
    defaultService,
    startButtonLabel,
    submitButtonLabel,
    successTitle,
    successMessage,
  } = props;

  const [viewState, setViewState] = useState<ToolViewState>("intro");
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const resolvedView = previewState ?? viewState;
  const service = defaultService ?? DEFAULTS.defaultService!;

  useEffect(() => {
    if (previewState) {
      setViewState(previewState);
    }
  }, [previewState]);

  const handleStart = useCallback(() => {
    if (previewState) {
      return;
    }
    setViewState("active");
    setErrorMessage(undefined);
  }, [previewState]);

  const handleBooked = useCallback(
    (record: BookingRecord) => {
      if (previewState) {
        return;
      }
      setBooking(record);
      setViewState("success");
    },
    [previewState],
  );

  const shellClass = `cal-stitch cal-root ${className ?? ""}`.trim();

  if (isWebflowDesignerCanvas() && !previewState) {
    return (
      <div className={shellClass}>
        <CalendarDesignerPreview defaultService={service} />
      </div>
    );
  }

  return (
    <div className={shellClass}>
      <CalendarNativeStyles />
      <div className="cal-ambient cal-ambient-violet" aria-hidden />
      <div className="cal-ambient cal-ambient-cyan" aria-hidden />

      {resolvedView === "loading" ? (
        <p className="cal-loading-page">Confirmando tu cita…</p>
      ) : null}

      {resolvedView === "error" ? (
        <div className="cal-inner">
          <p className="cal-error" role="alert" style={{ marginBottom: "1rem" }}>
            {errorMessage ??
              "No pudimos confirmar la cita. Revisa los datos e inténtalo de nuevo."}
          </p>
          <button
            type="button"
            className="cal-btn-primary"
            onClick={() => {
              setViewState("active");
              setErrorMessage(undefined);
            }}
          >
            Reintentar
          </button>
        </div>
      ) : null}

      {resolvedView === "intro" ? (
        <div className="cal-inner">
          <section className="cal-intro">
            {eyebrow ? <span className="cal-eyebrow">{eyebrow}</span> : null}
            {title ? <h1 className="cal-intro-title">{title}</h1> : null}
            {description ? (
              <p className="cal-intro-desc">{description}</p>
            ) : null}
            <div className="cal-badges">
              <span className="cal-badge">Lun–vie</span>
              <span className="cal-badge">9:00 – 17:00</span>
              <span className="cal-badge">Confirmación por email</span>
            </div>
            <button
              type="button"
              className="cal-btn-primary"
              onClick={handleStart}
            >
              {startButtonLabel}
              <span aria-hidden> →</span>
            </button>
          </section>
        </div>
      ) : null}

      {resolvedView === "active" ? (
        <div className="cal-inner">
          <div className="cal-card">
            <div className="cal-glow-dot" aria-hidden />
            <div className="cal-card-pad">
              <Suspense
                fallback={
                  <CalendarDesignerPreview defaultService={service} />
                }
              >
                <CalendarToolLazy
                  defaultService={service}
                  submitButtonLabel={submitButtonLabel}
                  onLoading={(loading) => {
                    if (loading) {
                      setViewState("loading");
                    }
                  }}
                  onError={(message) => {
                    setErrorMessage(message);
                    setViewState("error");
                  }}
                  onBooked={handleBooked}
                />
              </Suspense>
            </div>
          </div>
        </div>
      ) : null}

      {resolvedView === "success" && booking ? (
        <div className="cal-inner">
          <BookingConfirmation
            booking={booking}
            title={successTitle}
            message={successMessage}
          />
        </div>
      ) : null}

      {resolvedView === "success" && previewState && !booking ? (
        <div className="cal-inner">
          <p className="cal-intro-desc">Vista previa: cita confirmada.</p>
        </div>
      ) : null}
    </div>
  );
}

export default CalendarToolComponent;
