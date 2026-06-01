"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Badge, Button } from "@/components/shared";
import {
  BookingConfirmation,
  CalendarTool,
} from "@/components/calendar";
import type { BookingRecord } from "@/lib/calendar/types";
import {
  CodeComponentFrame,
  PlaceholderPanel,
} from "./CodeComponentFrame";
import type { CodeComponentBaseProps, ToolViewState } from "@/lib/shared/code-component";
import { mergeProps } from "@/lib/shared/code-component";

export type CalendarToolComponentProps = CodeComponentBaseProps & {
  defaultService?: string;
  submitButtonLabel?: string;
  successTitle?: string;
  successMessage?: string;
};

const DEFAULTS: CalendarToolComponentProps = {
  eyebrow: "Agenda",
  title: "Reserva una llamada con Hiweb",
  description:
    "Elige servicio, fecha y horario disponible. Te confirmaremos por correo.",
  themeVariant: "light",
  defaultService: "consulting",
  submitButtonLabel: "Confirmar cita",
  successTitle: "Cita confirmada",
  successMessage:
    "Hemos registrado tu solicitud. Recibirás un correo con los detalles.",
};

function CalendarPreviewMock({
  props,
  resolvedView,
  themeVariant,
  submitButtonLabel,
  onMockError,
  onMockSubmit,
}: {
  props: CalendarToolComponentProps;
  resolvedView: ToolViewState;
  themeVariant: CalendarToolComponentProps["themeVariant"];
  submitButtonLabel?: string;
  onMockError: () => void;
  onMockSubmit: () => void;
}) {
  return (
    <CodeComponentFrame
      {...props}
      viewState={resolvedView}
      footer={
        resolvedView === "intro" ? (
          <Button type="button" onClick={onMockSubmit} fullWidth>
            Ver disponibilidad
          </Button>
        ) : resolvedView === "active" ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" variant="secondary" onClick={onMockError}>
              Simular error
            </Button>
            <Button type="button" onClick={onMockSubmit} fullWidth>
              {submitButtonLabel}
            </Button>
          </div>
        ) : null
      }
    >
      {resolvedView === "intro" ? (
        <Badge variant="info">Preview</Badge>
      ) : null}
      {resolvedView === "active" ? (
        <PlaceholderPanel title="Calendario" themeVariant={themeVariant}>
          <p className="text-sm text-muted">Vista previa del design system.</p>
        </PlaceholderPanel>
      ) : null}
    </CodeComponentFrame>
  );
}

export function CalendarToolComponent(rawProps: CalendarToolComponentProps = {}) {
  const props = mergeProps(DEFAULTS, rawProps);
  const {
    previewState,
    className,
    defaultService,
    submitButtonLabel,
    successTitle,
    successMessage,
  } = props;

  const [viewState, setViewState] = useState<ToolViewState>("intro");
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const submitRef = useRef<(() => Promise<void>) | null>(null);

  const resolvedView = previewState ?? viewState;

  useEffect(() => {
    if (previewState) {
      setViewState(previewState);
    }
  }, [previewState]);

  const handleLoading = useCallback(
    (loading: boolean) => {
      if (!previewState && loading) {
        setViewState("loading");
      }
    },
    [previewState],
  );

  const handleError = useCallback((message: string) => {
    setErrorMessage(message);
    setViewState("error");
  }, []);

  const handleBooked = useCallback((record: BookingRecord) => {
    setBooking(record);
    setViewState("success");
  }, []);

  if (previewState) {
    return (
      <CalendarPreviewMock
        props={props}
        resolvedView={previewState}
        themeVariant={props.themeVariant}
        submitButtonLabel={submitButtonLabel}
        onMockError={() => setViewState("error")}
        onMockSubmit={() =>
          setViewState(previewState === "intro" ? "active" : "success")
        }
      />
    );
  }

  return (
    <CodeComponentFrame
      {...props}
      viewState={resolvedView}
      successTitle={successTitle}
      successMessage={successMessage}
      errorMessage={
        errorMessage ??
        "No pudimos confirmar la cita. Revisa los datos e inténtalo de nuevo."
      }
      className={className}
      footer={
        resolvedView === "intro" ? (
          <Button type="button" onClick={() => setViewState("active")} fullWidth>
            Ver disponibilidad
          </Button>
        ) : resolvedView === "active" ? (
          <Button
            type="button"
            fullWidth
            onClick={() => void submitRef.current?.()}
          >
            {submitButtonLabel}
          </Button>
        ) : resolvedView === "error" ? (
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={() => {
              setViewState("active");
              setErrorMessage(undefined);
            }}
          >
            Reintentar
          </Button>
        ) : null
      }
    >
      {resolvedView === "intro" ? (
        <div className="flex flex-wrap gap-2">
          <Badge variant="brand">Lun–vie</Badge>
          <Badge variant="neutral">9:00 – 17:00</Badge>
          <Badge variant="neutral">Confirmación por email</Badge>
        </div>
      ) : null}

      {resolvedView === "active" ? (
        <CalendarTool
          defaultService={defaultService ?? DEFAULTS.defaultService!}
          onLoading={handleLoading}
          onError={handleError}
          onBooked={handleBooked}
          onRegisterSubmit={(fn) => {
            submitRef.current = fn;
          }}
        />
      ) : null}

      {resolvedView === "success" && booking ? (
        <BookingConfirmation booking={booking} />
      ) : null}
    </CodeComponentFrame>
  );
}

export default CalendarToolComponent;
