"use client";

import { QuizNativeStyles } from "../QuizNativeStyles";
import { useQuizResultData } from "./useQuizResultData";
import { levelSegmentIndex, ScoreRing } from "./result-ui";

export function QuizResultScorePanel() {
  const { result, isPreview, isEmpty } = useQuizResultData();

  if (isEmpty) {
    return (
      <div className="quiz-stitch">
        <QuizNativeStyles />
        <p className="quiz-empty-msg">
          Completa el quiz para ver tu score aquí.
        </p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const activeSeg = levelSegmentIndex(result.resultLevel);

  return (
    <div className="quiz-stitch">
      <QuizNativeStyles />
      {isPreview ? (
        <p className="quiz-designer-badge">Vista previa — datos de ejemplo</p>
      ) : null}
      <div className="quiz-panel">
        <div className="quiz-panel-glow" aria-hidden />
        <h3 className="quiz-panel-title">Score digital general</h3>
        <ScoreRing percentage={result.scorePercentage} />
        <h4 className="quiz-level-label">{result.resultLevelLabel}</h4>
        <p className="quiz-level-summary">{result.resultSummary}</p>
        <div className="quiz-scale">
          <div className="quiz-scale-track">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`quiz-scale-seg${activeSeg === i ? " is-active" : ""}`}
              />
            ))}
          </div>
          <div className="quiz-scale-labels">
            <span>Inicial</span>
            <span>Avanzado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
