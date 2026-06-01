"use client";

import { getBookableDates } from "@/lib/calendar/calendar-rules";
import { cn } from "@/lib/shared/utils";

type DateSelectorProps = {
  value?: string;
  onChange: (dateIso: string) => void;
};

export function DateSelector({ value, onChange }: DateSelectorProps) {
  const dates = getBookableDates();

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-foreground">Fecha</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {dates.map((date) => {
          const selected = value === date.iso;
          return (
            <button
              key={date.iso}
              type="button"
              onClick={() => onChange(date.iso)}
              className={cn(
                "focus-ring shrink-0 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                selected
                  ? "border-brand-600 bg-brand-600/10 text-brand-600"
                  : "border-border bg-background hover:border-muted",
              )}
            >
              <span className="block font-medium capitalize">{date.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
