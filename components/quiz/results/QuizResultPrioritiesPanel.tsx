"use client";

import { useQuizResultData } from "./useQuizResultData";
import { QuizResultShell } from "./QuizResultShell";

export function QuizResultPrioritiesPanel() {
  const { result, isPreview, isEmpty } = useQuizResultData();

  const priorities = result?.opportunities.slice(0, 3) ?? [];

  return (
    <QuizResultShell
      isPreview={isPreview}
      isEmpty={isEmpty || priorities.length === 0}
      emptyMessage="Completa el quiz para ver tus prioridades digitales."
    >
      {priorities.length > 0 ? (
        <section className="quiz-priorities" aria-label="Prioridades digitales">
          <div className="quiz-priority-grid">
            {priorities.map((text, index) => (
              <div key={`${index}-${text}`} className="quiz-priority-card">
                <span className="quiz-priority-num" aria-hidden>
                  {index + 1}
                </span>
                <h3>Prioridad {index + 1}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </QuizResultShell>
  );
}
