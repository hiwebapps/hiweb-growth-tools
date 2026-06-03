"use client";

import { useQuizResultData } from "./useQuizResultData";
import { QuizResultShell } from "./QuizResultShell";

export function QuizResultInsightsPanel() {
  const { result, isPreview, isEmpty } = useQuizResultData();

  return (
    <QuizResultShell
      isPreview={isPreview}
      isEmpty={isEmpty}
      emptyMessage="Completa el quiz para ver fortalezas y áreas de mejora."
    >
      {result ? (
        <section
          className="quiz-two-col"
          aria-label="Fortalezas y oportunidades de mejora"
        >
          <div className="quiz-insight">
            <div className="quiz-insight-head">
              <div className="quiz-insight-icon is-good">
                <span aria-hidden>✓</span>
              </div>
              <h3>Lo que estás haciendo bien</h3>
            </div>
            <ul>
              {result.strengths.map((item) => (
                <li key={item}>
                  <span aria-hidden style={{ color: "var(--qz-cyan)" }}>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="quiz-insight">
            <div className="quiz-insight-head">
              <div className="quiz-insight-icon is-warn">
                <span aria-hidden>!</span>
              </div>
              <h3>Lo que puedes mejorar</h3>
            </div>
            <ul>
              {result.opportunities.map((item) => (
                <li key={item}>
                  <span aria-hidden style={{ color: "var(--qz-error)" }}>
                    ×
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </QuizResultShell>
  );
}
