"use client";

import { Input } from "@/components/shared";
import type { QuizLeadInput } from "@/lib/quiz/types";

type LeadCaptureStepProps = {
  title: string;
  description?: string;
  value: QuizLeadInput;
  errors?: Partial<Record<keyof QuizLeadInput, string>>;
  onChange: (field: keyof QuizLeadInput, value: string) => void;
};

export function LeadCaptureStep({
  title,
  description,
  value,
  errors,
  onChange,
}: LeadCaptureStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description ? (
          <p className="text-sm text-muted leading-relaxed">{description}</p>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Nombre"
          name="name"
          value={value.name}
          onChange={(e) => onChange("name", e.target.value)}
          error={errors?.name}
          required
          autoComplete="name"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={value.email}
          onChange={(e) => onChange("email", e.target.value)}
          error={errors?.email}
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
          error={errors?.phone}
          autoComplete="tel"
        />
        <Input
          label="Sitio web"
          name="website"
          type="url"
          placeholder="https://"
          value={value.website ?? ""}
          onChange={(e) => onChange("website", e.target.value)}
          className="sm:col-span-2"
        />
        <Input
          label="Industria"
          name="industry"
          value={value.industry ?? ""}
          onChange={(e) => onChange("industry", e.target.value)}
          className="sm:col-span-2"
        />
      </div>
    </div>
  );
}
