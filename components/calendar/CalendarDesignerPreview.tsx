"use client";

import { CALENDAR_SERVICES } from "@/lib/calendar/calendar-rules";
import { CalendarNativeStyles } from "./CalendarNativeStyles";

export type CalendarDesignerPreviewProps = {
  defaultService: string;
};

export function CalendarDesignerPreview({
  defaultService,
}: CalendarDesignerPreviewProps) {
  const serviceLabel =
    CALENDAR_SERVICES.find((s) => s.id === defaultService)?.label ??
    CALENDAR_SERVICES[0].label;

  return (
    <div className="cal-root">
      <CalendarNativeStyles />
      <p className="cal-designer-badge">
        Vista previa en Designer — en el sitio publicado el calendario es interactivo.
      </p>
      <div className="cal-card">
        <div className="cal-glow-dot" aria-hidden />
        <div className="cal-card-pad">
          <div className="cal-step">
            <div className="cal-field">
              <div className="cal-field-head">
                <span>Servicio</span>
              </div>
              <div className="cal-select" aria-hidden>
                {serviceLabel}
              </div>
            </div>
            <div className="cal-field">
              <div className="cal-field-head">
                <span>Fecha</span>
              </div>
              <div className="cal-date-row">
                <div className="cal-date-chip is-selected">Lun 9 jun</div>
                <div className="cal-date-chip">Mar 10 jun</div>
                <div className="cal-date-chip">Mié 11 jun</div>
              </div>
            </div>
            <div className="cal-field">
              <div className="cal-field-head">
                <span>Hora</span>
              </div>
              <div className="cal-slot-grid">
                {["09:00", "09:30", "10:00", "10:30"].map((t) => (
                  <div
                    key={t}
                    className={`cal-slot${t === "10:00" ? " is-selected" : ""}`}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <button type="button" className="cal-btn-primary" disabled>
              Continuar →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
