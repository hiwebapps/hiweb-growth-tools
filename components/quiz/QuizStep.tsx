"use client";

import type { QuizQuestion } from "@/lib/quiz/types";
import { cn } from "@/lib/shared/utils";

type QuizStepProps = {
  question: QuizQuestion;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
};

export function QuizStep({
  question,
  selectedOptionId,
  onSelect,
}: QuizStepProps) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="text-lg font-semibold leading-snug text-foreground">
        {question.question}
      </legend>
      <div className="flex flex-col gap-2" role="radiogroup">
        {question.options.map((option) => {
          const selected = selectedOptionId === option.id;
          return (
            <label
              key={option.id}
              className={cn(
                "focus-within:ring-brand-600 flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors focus-within:ring-2",
                selected
                  ? "border-brand-600 hw-bg-brand-softer"
                  : "border-border bg-background hover:border-muted",
              )}
            >
              <input
                type="radio"
                name={question.id}
                value={option.id}
                checked={selected}
                onChange={() => onSelect(option.id)}
                className="mt-1 size-4 shrink-0 accent-brand-600"
              />
              <span className="text-sm leading-relaxed">{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
