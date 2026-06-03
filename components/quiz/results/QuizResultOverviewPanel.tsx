"use client";

import { useQuizResultData } from "./useQuizResultData";
import { QuizResultShell } from "./QuizResultShell";
import { barFillClass, levelSegmentIndex, ScoreRing } from "./result-ui";

export function QuizResultOverviewPanel() {
  const { result, isPreview, isEmpty } = useQuizResultData();

  return (
    <QuizResultShell
      isPreview={isPreview}
      isEmpty={isEmpty}
      emptyMessage="Completa el quiz para ver tu score y desglose."
    >
      {result ? (
        <section className="quiz-bento" aria-label="Score y desglose por área">
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
                    className={`quiz-scale-seg${
                      levelSegmentIndex(result.resultLevel) === i
                        ? " is-active"
                        : ""
                    }`}
                  />
                ))}
              </div>
              <div className="quiz-scale-labels">
                <span>Inicial</span>
                <span>Avanzado</span>
              </div>
            </div>
          </div>

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
        </section>
      ) : null}
    </QuizResultShell>
  );
}
