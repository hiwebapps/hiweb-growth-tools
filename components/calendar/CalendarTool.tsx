"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getBookableDates,
  getServiceLabel,
  resolveServiceId,
  serviceRequiresWebsite,
} from "@/lib/calendar/calendar-rules";
import { bookAppointment, fetchAvailability } from "@/lib/calendar/client";
import type { BookingInput, BookingRecord, TimeSlot } from "@/lib/calendar/types";
import { BookingForm } from "./BookingForm";
import { SchedulePicker } from "./SchedulePicker";
import { ServiceSelector } from "./ServiceSelector";

export type CalendarStep = "schedule" | "details";

type CalendarToolProps = {
  defaultService: string;
  submitButtonLabel?: string;
  onLoading?: (loading: boolean) => void;
  onError?: (message: string) => void;
  onBooked?: (booking: BookingRecord) => void;
};

export function CalendarTool({
  defaultService,
  submitButtonLabel = "Confirmar cita",
  onLoading,
  onError,
  onBooked,
}: CalendarToolProps) {
  const bookableDates = getBookableDates();
  const initialService = resolveServiceId(defaultService);

  const [step, setStep] = useState<CalendarStep>("schedule");
  const [service, setService] = useState(initialService);
  const [selectedDate, setSelectedDate] = useState(bookableDates[0]?.iso);
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    website: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const progressPct = step === "schedule" ? 50 : 100;

  const loadSlots = useCallback(
    async (date: string, serviceId: string) => {
      setSlotsLoading(true);
      setSlotsError(null);
      setFormError(null);
      try {
        const data = await fetchAvailability(date, serviceId);
        setSlots(data.slots);
        setSelectedTime((current) => {
          if (
            current &&
            data.slots.some((s) => s.time === current && s.available)
          ) {
            return current;
          }
          return undefined;
        });
      } catch {
        setSlotsError(
          "No pudimos cargar los horarios disponibles. Inténtalo de nuevo.",
        );
      } finally {
        setSlotsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    setService(resolveServiceId(defaultService));
  }, [defaultService]);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }
    void loadSlots(selectedDate, service);
  }, [selectedDate, service, loadSlots]);

  const handleSubmit = useCallback(async () => {
    if (!selectedDate || !selectedTime) {
      setFormError("Selecciona fecha y hora disponibles.");
      setStep("schedule");
      return;
    }

    if (!form.name.trim() || !form.email.trim()) {
      setFormError("Nombre y email son obligatorios.");
      return;
    }

    const phone = form.phone.trim();
    if (!phone || phone.length < 7) {
      setFormError("El teléfono es obligatorio.");
      return;
    }

    if (serviceRequiresWebsite(service)) {
      const website = form.website.trim();
      if (!website) {
        setFormError("Introduce la URL de tu sitio web actual.");
        return;
      }
    }

    onLoading?.(true);
    setIsSubmitting(true);
    setFormError(null);

    const payload: BookingInput = {
      name: form.name,
      email: form.email,
      company: form.company || undefined,
      phone: phone,
      website: serviceRequiresWebsite(service)
        ? form.website.trim() || undefined
        : undefined,
      service,
      selectedDate,
      selectedTime,
    };

    try {
      const { booking } = await bookAppointment(payload);
      onBooked?.(booking);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No pudimos confirmar la cita.";
      setFormError(message);
      onError?.(message);
      onLoading?.(false);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    selectedDate,
    selectedTime,
    form,
    service,
    onLoading,
    onError,
    onBooked,
  ]);

  return (
    <div className={`cal-step cal-step-${step}`}>
      <div className="cal-progress">
        <div className="cal-progress-head">
          <span className="cal-progress-label">
            {step === "schedule" ? "Paso 1 de 2" : "Paso 2 de 2"}
          </span>
          <span className="cal-progress-label">
            {step === "schedule" ? "Horario" : "Datos"}
          </span>
        </div>
        <div className="cal-progress-track">
          <div
            className="cal-progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {step === "schedule" ? (
        <>
          <ServiceSelector
            value={service}
            hint="Elige el tipo de sesión que quieres agendar."
            onChange={(nextService) => {
              setService(nextService);
              if (!serviceRequiresWebsite(nextService)) {
                setForm((prev) => ({ ...prev, website: "" }));
              }
            }}
          />
          <SchedulePicker
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            slots={slots}
            isLoading={slotsLoading}
            onDateChange={(date) => {
              setSelectedDate(date);
              setSelectedTime(undefined);
              setFormError(null);
              setSlotsError(null);
            }}
            onTimeChange={(time) => {
              setSelectedTime(time);
              setFormError(null);
              if (selectedDate) {
                setStep("details");
              }
            }}
            onCancel={() => {
              setSelectedTime(undefined);
              setFormError(null);
            }}
          />
          {slotsError ? (
            <p className="cal-error" role="alert">
              {slotsError}
            </p>
          ) : null}
          {formError ? (
            <p className="cal-error" role="alert">
              {formError}
            </p>
          ) : null}
        </>
      ) : (
        <>
          <p className="cal-field-hint" style={{ margin: 0 }}>
            {getServiceLabel(service)} · {selectedDate} · {selectedTime}
          </p>
          <BookingForm
            service={service}
            value={form}
            error={formError ?? undefined}
            onChange={(field, value) => {
              setForm((prev) => ({ ...prev, [field]: value }));
              setFormError(null);
            }}
          />
          <div className="cal-nav">
            <button
              type="button"
              className="cal-btn-back"
              disabled={isSubmitting}
              onClick={() => {
                setStep("schedule");
                setFormError(null);
              }}
            >
              ← Volver
            </button>
            <button
              type="button"
              className="cal-btn-primary"
              disabled={isSubmitting}
              onClick={() => void handleSubmit()}
            >
              {isSubmitting ? "Confirmando…" : submitButtonLabel}
              <span aria-hidden> →</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
