"use client";

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
    <div className="roi-lead-box">
      <div className="roi-field-head" style={{ marginBottom: "1rem" }}>
        <h3 style={{ margin: 0, fontSize: "1.125rem", color: "#fff" }}>
          Recibe tu escenario por email
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="roi-text-muted"
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem" }}
        >
          Cerrar
        </button>
      </div>
      <div className="roi-lead-grid">
        <div>
          <label htmlFor="leadName">Nombre</label>
          <input
            id="leadName"
            name="leadName"
            value={lead.name}
            onChange={(e) => onChange("name", e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="leadEmail">Email</label>
          <input
            id="leadEmail"
            name="leadEmail"
            type="email"
            value={lead.email}
            onChange={(e) => onChange("email", e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="leadCompany">Empresa</label>
          <input
            id="leadCompany"
            name="leadCompany"
            value={lead.company ?? ""}
            onChange={(e) => onChange("company", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="leadPhone">Telefono</label>
          <input
            id="leadPhone"
            name="leadPhone"
            type="tel"
            value={lead.phone ?? ""}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>
      </div>
      <button
        type="button"
        disabled={isLoading}
        onClick={onSubmit}
        className="roi-btn-submit"
      >
        Enviar escenario
      </button>
    </div>
  );
}
