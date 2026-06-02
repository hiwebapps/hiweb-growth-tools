"use client";

import { Input } from "@/components/shared";
import type { RoiLeadInput } from "@/lib/roi/types";

type RoiLeadPanelProps = {
  lead: Required<Pick<RoiLeadInput, "name" | "email">> &
    Pick<RoiLeadInput, "company" | "phone">;
  onChange: (field: keyof RoiLeadInput, value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  isLoading?: boolean;
};

export function RoiLeadPanel({
  lead,
  onChange,
  onSubmit,
  onClose,
  isLoading,
}: RoiLeadPanelProps) {
  return (
    <div className="mt-8 rounded-xl border border-[var(--roi-border)] bg-[var(--roi-surface-low)] p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">
          Recibe tu escenario por email
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-[var(--roi-muted)] hover:text-white"
        >
          Cerrar
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 [&_label]:text-[var(--roi-on-surface)] [&_input]:border-[var(--roi-border)] [&_input]:bg-[var(--roi-surface-lowest)] [&_input]:text-white">
        <Input
          label="Nombre"
          name="leadName"
          value={lead.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
        <Input
          label="Email"
          name="leadEmail"
          type="email"
          value={lead.email}
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        <Input
          label="Empresa"
          name="leadCompany"
          value={lead.company ?? ""}
          onChange={(e) => onChange("company", e.target.value)}
        />
        <Input
          label="Teléfono"
          name="leadPhone"
          type="tel"
          value={lead.phone ?? ""}
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </div>
      <button
        type="button"
        disabled={isLoading}
        onClick={onSubmit}
        className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[var(--roi-cyan)] font-semibold text-[#0e0e11] hover:opacity-90 disabled:opacity-60"
      >
        Enviar escenario
      </button>
    </div>
  );
}
