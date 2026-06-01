"use client";

import { Spinner } from "@/components/shared";
import type { TimeSlot } from "@/lib/calendar/types";
import { cn } from "@/lib/shared/utils";

type TimeSlotSelectorProps = {
  slots: TimeSlot[];
  value?: string;
  onChange: (time: string) => void;
  isLoading?: boolean;
};

export function TimeSlotSelector({
  slots,
  value,
  onChange,
  isLoading,
}: TimeSlotSelectorProps) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-3 py-6">
        <Spinner size="sm" />
        <span className="text-sm text-muted">Cargando horarios…</span>
      </div>
    );
  }

  const available = slots.filter((s) => s.available);

  if (available.length === 0) {
    return (
      <p className="text-sm text-muted">
        No hay horarios disponibles este día. Elige otra fecha.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-foreground">Hora</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {available.map((slot) => {
          const selected = value === slot.time;
          return (
            <button
              key={slot.time}
              type="button"
              onClick={() => onChange(slot.time)}
              className={cn(
                "focus-ring rounded-lg border px-2 py-2 text-sm font-medium transition-colors",
                selected
                  ? "border-brand-600 bg-brand-600/10 text-brand-600"
                  : "border-border bg-background hover:border-brand-600",
              )}
            >
              {slot.time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
