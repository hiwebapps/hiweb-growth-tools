"use client";

import type { QuizLeadInput } from "@/lib/quiz/types";

type LeadCaptureStepProps = {
  title: string;
  description?: string;
  value: QuizLeadInput;
  onChange: (field: keyof QuizLeadInput, value: string) => void;
};

export function LeadCaptureStep({
  title,
  description,
  value,
  onChange,
}: LeadCaptureStepProps) {
  return (
    <div className="quiz-lead-card">
      <h3 className="quiz-lead-title">{title}</h3>
      {description ? <p className="quiz-lead-desc">{description}</p> : null}
      <div className="quiz-lead-grid">
        <div className="quiz-field">
          <label htmlFor="quiz-name">Nombre</label>
          <input
            id="quiz-name"
            name="name"
            value={value.name}
            onChange={(e) => onChange("name", e.target.value)}
            autoComplete="name"
            required
          />
        </div>
        <div className="quiz-field">
          <label htmlFor="quiz-email">Email</label>
          <input
            id="quiz-email"
            name="email"
            type="email"
            value={value.email}
            onChange={(e) => onChange("email", e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className="quiz-field">
          <label htmlFor="quiz-company">Empresa</label>
          <input
            id="quiz-company"
            name="company"
            value={value.company ?? ""}
            onChange={(e) => onChange("company", e.target.value)}
            autoComplete="organization"
          />
        </div>
        <div className="quiz-field">
          <label htmlFor="quiz-phone">Teléfono</label>
          <input
            id="quiz-phone"
            name="phone"
            type="tel"
            value={value.phone ?? ""}
            onChange={(e) => onChange("phone", e.target.value)}
            autoComplete="tel"
          />
        </div>
        <div className="quiz-field quiz-field-span2">
          <label htmlFor="quiz-website">Sitio web</label>
          <input
            id="quiz-website"
            name="website"
            type="url"
            placeholder="https://"
            value={value.website ?? ""}
            onChange={(e) => onChange("website", e.target.value)}
          />
        </div>
        <div className="quiz-field quiz-field-span2">
          <label htmlFor="quiz-industry">Industria</label>
          <input
            id="quiz-industry"
            name="industry"
            value={value.industry ?? ""}
            onChange={(e) => onChange("industry", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
