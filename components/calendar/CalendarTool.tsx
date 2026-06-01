"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getBookableDates,
  resolveServiceId,
} from "@/lib/calendar/calendar-rules";
import { bookAppointment, fetchAvailability } from "@/lib/calendar/client";
import type { BookingInput, BookingRecord, TimeSlot } from "@/lib/calendar/types";
import { BookingForm } from "./BookingForm";
import { DateSelector } from "./DateSelector";
import { ServiceSelector } from "./ServiceSelector";
import { TimeSlotSelector } from "./TimeSlotSelector";

type CalendarToolProps = {
  defaultService: string;
  onLoading?: (loading: boolean) => void;
  onError?: (message: string) => void;
  onBooked?: (booking: BookingRecord) => void;
  onRegisterSubmit?: (submit: () => Promise<void>) => void;
};

export function CalendarTool({
  defaultService,
  onLoading,
  onError,
  onBooked,
  onRegisterSubmit,
}: CalendarToolProps) {
  const bookableDates = getBookableDates();
  const initialService = resolveServiceId(defaultService);

  const [service, setService] = useState(initialService);
  const [selectedDate, setSelectedDate] = useState(bookableDates[0]?.iso);
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const loadSlots = useCallback(
    async (date: string, serviceId: string) => {
      setSlotsLoading(true);
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
      } catch (error) {
        onError?.(
          error instanceof Error
            ? error.message
            : "No pudimos cargar disponibilidad.",
        );
      } finally {
        setSlotsLoading(false);
      }
    },
    [onError],
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
      return;
    }

    if (!form.name.trim() || !form.email.trim()) {
      setFormError("Nombre y email son obligatorios.");
      return;
    }

    onLoading?.(true);
    setFormError(null);

    const payload: BookingInput = {
      name: form.name,
      email: form.email,
      company: form.company || undefined,
      phone: form.phone || undefined,
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

  useEffect(() => {
    onRegisterSubmit?.(handleSubmit);
  }, [handleSubmit, onRegisterSubmit]);

  return (
    <div className="flex flex-col gap-6">
      <ServiceSelector value={service} onChange={setService} />
      <DateSelector
        value={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setSelectedTime(undefined);
        }}
      />
      <TimeSlotSelector
        slots={slots}
        value={selectedTime}
        onChange={setSelectedTime}
        isLoading={slotsLoading}
      />
      <BookingForm
        value={form}
        error={formError ?? undefined}
        onChange={(field, value) => {
          setForm((prev) => ({ ...prev, [field]: value }));
          setFormError(null);
        }}
      />
    </div>
  );
}
