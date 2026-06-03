"use client";

import { QuizNativeStyles } from "../QuizNativeStyles";
import { useQuizResultData } from "./useQuizResultData";
import { barFillClass } from "./result-ui";

export function QuizResultBreakdownPanel() {
  const { result, isPreview, isEmpty } = useQuizResultData();

  if (isEmpty) {
    return (
      <div className="quiz-stitch">
        <QuizNativeStyles />
        <p className="quiz-empty-msg">Sin datos de desglose.</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="quiz-stitch">
      <QuizNativeStyles />
      {isPreview ? (
        <p className="quiz-designer-badge">Vista previa — datos de ejemplo</p>
      ) : null}
      <div className="quiz-panel">
        <h3 className="quiz-bars-title">Desglose por área</h3>
        {result.categoryScores.map((cat) => (
          <div key={cat.category} className="quiz-bar-row">
            <div className="quiz-bar-head">
              <span>{cat.label}</span>
              <span className="quiz-bar-pct">{cat.percentage}%</span>
            </div>
            <div className="quiz-bar-track">
              <div
                className={barFillClass(cat.percentage)}
                style={{ width: `${cat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
