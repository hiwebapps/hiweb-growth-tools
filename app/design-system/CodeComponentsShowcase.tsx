"use client";

import {
  CalendarToolComponent,
  QuizToolComponent,
  RoiCalculatorComponent,
} from "@/components/code-components";
import type { ToolViewState } from "@/lib/shared/code-component";
import { useState } from "react";
import { cn } from "@/lib/shared/utils";

const states: ToolViewState[] = [
  "intro",
  "active",
  "loading",
  "error",
  "success",
];

function StateTabs({
  value,
  onChange,
}: {
  value: ToolViewState;
  onChange: (s: ToolViewState) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {states.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={cn(
            "focus-ring rounded-lg border px-3 py-1.5 text-xs font-medium capitalize",
            value === s
              ? "border-brand-600 bg-brand-600/10 text-brand-600"
              : "border-border text-muted hover:text-foreground",
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

export function CodeComponentsShowcase() {
  const [quizState, setQuizState] = useState<ToolViewState>("intro");
  const [calendarState, setCalendarState] = useState<ToolViewState>("intro");
  const [roiState, setRoiState] = useState<ToolViewState>("intro");

  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
          QuizToolComponent
        </h3>
        <StateTabs value={quizState} onChange={setQuizState} />
        <QuizToolComponent previewState={quizState} />
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
          CalendarToolComponent
        </h3>
        <StateTabs value={calendarState} onChange={setCalendarState} />
        <CalendarToolComponent previewState={calendarState} />
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
          RoiCalculatorComponent
        </h3>
        <StateTabs value={roiState} onChange={setRoiState} />
        <RoiCalculatorComponent previewState={roiState} />
      </section>
    </div>
  );
}
