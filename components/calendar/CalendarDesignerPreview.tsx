"use client";

import { CALENDAR_SERVICES } from "@/lib/calendar/calendar-rules";
import { CalendarNativeStyles } from "./CalendarNativeStyles";

export type CalendarDesignerPreviewProps = {
  defaultService: string;
};

const PREVIEW_DAYS = [
  { day: 27, outside: true },
  { day: 28, outside: true },
  { day: 29, outside: true },
  { day: 30, outside: true },
  { day: 31, outside: true },
  { day: 1, outside: false },
  { day: 2, outside: false },
  { day: 3, outside: false },
  { day: 4, outside: false, dot: true },
  { day: 5, outside: false },
  { day: 6, outside: false },
  { day: 7, outside: false },
  { day: 8, outside: false, dot: true },
  { day: 9, outside: false },
  { day: 10, outside: false },
  { day: 11, outside: false },
  { day: 12, outside: false },
  { day: 13, outside: false },
  { day: 14, outside: false, dot: true },
  { day: 15, outside: false },
  { day: 16, outside: false },
  { day: 17, outside: false },
  { day: 18, outside: false },
  { day: 19, outside: false },
  { day: 20, outside: false },
  { day: 21, outside: false, selected: true },
];

const PREVIEW_TIMES = [
  "8:00 a. m.",
  "8:30 a. m.",
  "9:00 a. m.",
  "9:30 a. m.",
  "10:00 a. m.",
  "10:30 a. m.",
  "11:00 a. m.",
];

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

            <div className="cal-picker">
              <div className="cal-picker-main">
                <div className="cal-picker-calendar">
                  <div className="cal-month-header">
                    <div className="cal-month-nav" aria-hidden>
                      ‹
                    </div>
                    <span className="cal-month-title">Septiembre 2025</span>
                    <div className="cal-month-nav" aria-hidden>
                      ›
                    </div>
                  </div>
                  <div className="cal-weekdays" aria-hidden>
                    {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map(
                      (d) => (
                        <span key={d} className="cal-weekday">
                          {d}
                        </span>
                      ),
                    )}
                  </div>
                  <div className="cal-month-grid">
                    {PREVIEW_DAYS.map((cell) => (
                      <div
                        key={cell.day}
                        className={[
                          "cal-day",
                          cell.outside ? " is-outside" : "",
                          cell.selected ? " is-selected" : " is-bookable",
                        ].join("")}
                      >
                        <span className="cal-day-num">{cell.day}</span>
                        {cell.dot ? (
                          <span className="cal-day-dot" aria-hidden />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="cal-picker-divider" aria-hidden />
                <div className="cal-picker-times">
                  <div className="cal-time-list">
                    {PREVIEW_TIMES.map((time) => (
                      <div
                        key={time}
                        className={`cal-time-item${time === "10:00 a. m." ? " is-selected" : ""}`}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="cal-picker-footer">
                <span className="cal-btn-text">Cancelar</span>
                <div className="cal-picker-summary">
                  21 sept 2025 10:00 a. m.
                </div>
                <span className="cal-btn-schedule">Continuar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
