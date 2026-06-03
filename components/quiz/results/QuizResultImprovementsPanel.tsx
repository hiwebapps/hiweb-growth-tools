"use client";

import { QuizNativeStyles } from "../QuizNativeStyles";
import { useQuizResultData } from "./useQuizResultData";

export function QuizResultImprovementsPanel() {
  const { result, isPreview, isEmpty } = useQuizResultData();

  if (isEmpty || !result) {
    return (
      <div className="quiz-stitch">
        <QuizNativeStyles />
        <p className="quiz-empty-msg">Sin oportunidades para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="quiz-stitch">
      <QuizNativeStyles />
      {isPreview ? (
        <p className="quiz-designer-badge">Vista previa — datos de ejemplo</p>
      ) : null}
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
    </div>
  );
}
