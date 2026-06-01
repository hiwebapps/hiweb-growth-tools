"use client";

import { Input } from "@/components/shared";

export type RoiFormValues = {
  monthlyBudget: string;
  averageLeadValue: string;
  conversionRate: string;
  costPerLead: string;
};

type RoiInputFormProps = {
  values: RoiFormValues;
  onChange: (field: keyof RoiFormValues, value: string) => void;
  error?: string;
};

export function RoiInputForm({ values, onChange, error }: RoiInputFormProps) {
  return (
    <div className="flex flex-col gap-4">
      {error ? (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Presupuesto mensual (USD)"
          name="monthlyBudget"
          type="number"
          min={100}
          value={values.monthlyBudget}
          onChange={(e) => onChange("monthlyBudget", e.target.value)}
          hint="Inversión media en marketing digital al mes."
          required
        />
        <Input
          label="Valor por lead / venta (USD)"
          name="averageLeadValue"
          type="number"
          min={10}
          value={values.averageLeadValue}
          onChange={(e) => onChange("averageLeadValue", e.target.value)}
          hint="Ticket medio o valor de un lead cualificado."
          required
        />
        <Input
          label="Tasa de conversión lead → venta (%)"
          name="conversionRate"
          type="number"
          min={0.5}
          max={80}
          step={0.1}
          value={values.conversionRate}
          onChange={(e) => onChange("conversionRate", e.target.value)}
          hint="Porcentaje de leads que se convierten en clientes."
        />
        <Input
          label="Costo por lead (USD) — opcional"
          name="costPerLead"
          type="number"
          min={5}
          value={values.costPerLead}
          onChange={(e) => onChange("costPerLead", e.target.value)}
          hint="Si lo dejas vacío, estimamos un CPL de referencia."
        />
      </div>
    </div>
  );
}
