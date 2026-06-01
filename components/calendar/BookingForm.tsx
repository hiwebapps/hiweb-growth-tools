"use client";

import { Input } from "@/components/shared";
import type { BookingInput } from "@/lib/calendar/types";

type BookingFormProps = {
  value: Pick<BookingInput, "name" | "email" | "company" | "phone">;
  error?: string;
  onChange: (field: keyof BookingFormProps["value"], value: string) => void;
};

export function BookingForm({ value, error, onChange }: BookingFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium text-foreground">Tus datos</p>
      {error ? (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Nombre"
          name="name"
          value={value.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
          autoComplete="name"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={value.email}
          onChange={(e) => onChange("email", e.target.value)}
          required
          autoComplete="email"
        />
        <Input
          label="Empresa"
          name="company"
          value={value.company ?? ""}
          onChange={(e) => onChange("company", e.target.value)}
          autoComplete="organization"
        />
        <Input
          label="Teléfono"
          name="phone"
          type="tel"
          value={value.phone ?? ""}
          onChange={(e) => onChange("phone", e.target.value)}
          autoComplete="tel"
        />
      </div>
    </div>
  );
}
