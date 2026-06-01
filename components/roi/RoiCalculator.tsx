"use client";

import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/shared";
import { calculateRoiApi, submitRoiApi } from "@/lib/roi/client";
import type { RoiCalculationResult } from "@/lib/roi/types";
import { RoiInputForm, type RoiFormValues } from "./RoiInputForm";
import { RoiResults } from "./RoiResults";

type RoiCalculatorProps = {
  defaultMonthlyBudget: number;
  defaultLeadValue: number;
  onLoading?: (loading: boolean) => void;
  onError?: (message: string) => void;
  onCalculated?: (result: RoiCalculationResult) => void;
  onSubmitted?: () => void;
  onRegisterCalculate?: (fn: () => Promise<void>) => void;
  onRegisterSubmit?: (fn: () => Promise<void>) => void;
};

function toFormValues(
  budget: number,
  leadValue: number,
): RoiFormValues {
  return {
    monthlyBudget: String(budget),
    averageLeadValue: String(leadValue),
    conversionRate: "12",
    costPerLead: "",
  };
}

function toPayload(values: RoiFormValues) {
  return {
    monthlyBudget: Number(values.monthlyBudget),
    averageLeadValue: Number(values.averageLeadValue),
    conversionRate: Number(values.conversionRate || 12),
    costPerLead: values.costPerLead ? Number(values.costPerLead) : undefined,
  };
}

export function RoiCalculator({
  defaultMonthlyBudget,
  defaultLeadValue,
  onLoading,
  onError,
  onCalculated,
  onSubmitted,
  onRegisterCalculate,
  onRegisterSubmit,
}: RoiCalculatorProps) {
  const [values, setValues] = useState(() =>
    toFormValues(defaultMonthlyBudget, defaultLeadValue),
  );
  const [result, setResult] = useState<RoiCalculationResult | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [lead, setLead] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof RoiFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleCalculate = useCallback(async () => {
    onLoading?.(true);
    setError(null);

    try {
      const { result: calculated } = await calculateRoiApi(toPayload(values));
      setResult(calculated);
      setShowLeadForm(true);
      onCalculated?.(calculated);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No pudimos calcular el ROI.";
      setError(message);
      onError?.(message);
      onLoading?.(false);
    }
  }, [values, onLoading, onError, onCalculated]);

  const handleSubmitLead = useCallback(async () => {
    if (!result) {
      return;
    }

    onLoading?.(true);
    setError(null);

    try {
      await submitRoiApi({
        inputs: toPayload(values),
        lead: {
          name: lead.name,
          email: lead.email,
          company: lead.company || undefined,
          phone: lead.phone || undefined,
        },
      });
      onSubmitted?.();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No pudimos guardar el escenario.";
      setError(message);
      onError?.(message);
      onLoading?.(false);
    }
  }, [result, values, lead, onLoading, onError, onSubmitted]);

  useEffect(() => {
    onRegisterCalculate?.(handleCalculate);
  }, [handleCalculate, onRegisterCalculate]);

  useEffect(() => {
    onRegisterSubmit?.(handleSubmitLead);
  }, [handleSubmitLead, onRegisterSubmit]);

  return (
    <div className="flex flex-col gap-6">
      <RoiInputForm values={values} onChange={handleChange} error={error ?? undefined} />

      {result ? <RoiResults result={result} /> : null}

      {showLeadForm && result ? (
        <div className="flex flex-col gap-4 border-t border-border pt-6">
          <p className="text-sm font-medium text-foreground">
            ¿Quieres que te enviemos este escenario?
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Nombre"
              name="leadName"
              value={lead.name}
              onChange={(e) => setLead((p) => ({ ...p, name: e.target.value }))}
              required
            />
            <Input
              label="Email"
              name="leadEmail"
              type="email"
              value={lead.email}
              onChange={(e) => setLead((p) => ({ ...p, email: e.target.value }))}
              required
            />
            <Input
              label="Empresa"
              name="leadCompany"
              value={lead.company}
              onChange={(e) =>
                setLead((p) => ({ ...p, company: e.target.value }))
              }
            />
            <Input
              label="Teléfono"
              name="leadPhone"
              type="tel"
              value={lead.phone}
              onChange={(e) => setLead((p) => ({ ...p, phone: e.target.value }))}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
