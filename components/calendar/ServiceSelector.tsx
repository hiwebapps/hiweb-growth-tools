"use client";

import { CALENDAR_SERVICES } from "@/lib/calendar/calendar-rules";
import { cn } from "@/lib/shared/utils";

type ServiceSelectorProps = {
  value: string;
  onChange: (serviceId: string) => void;
  className?: string;
};

export function ServiceSelector({
  value,
  onChange,
  className,
}: ServiceSelectorProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor="calendar-service" className="text-sm font-medium text-foreground">
        Servicio
      </label>
      <select
        id="calendar-service"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focus-ring h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm"
      >
        {CALENDAR_SERVICES.map((service) => (
          <option key={service.id} value={service.id}>
            {service.label}
          </option>
        ))}
      </select>
    </div>
  );
}
