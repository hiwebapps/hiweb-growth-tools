"use client";

import { QuizNativeStyles } from "../QuizNativeStyles";
import { useQuizResultData } from "./useQuizResultData";

export function QuizResultStrengthsPanel() {
  const { result, isPreview, isEmpty } = useQuizResultData();

  if (isEmpty || !result) {
    return (
      <div className="quiz-stitch">
        <QuizNativeStyles />
        <p className="quiz-empty-msg">Sin fortalezas para mostrar.</p>
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
    </div>
  );
}
