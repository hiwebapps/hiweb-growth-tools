"use client";

import type { QuizResultLevelId, QuizScoreResult } from "@/lib/quiz/types";

type QuizResultProps = {
  result: QuizScoreResult;
  ctaLabel: string;
  onCtaClick: () => void;
};

function barFillClass(percentage: number): string {
  if (percentage < 45) {
    return "quiz-bar-fill is-error";
  }
  if (percentage < 70) {
    return "quiz-bar-fill is-gold";
  }
  return "quiz-bar-fill";
}

function levelSegmentIndex(level: QuizResultLevelId): number {
  switch (level) {
    case "developing":
      return 1;
    case "advanced":
      return 2;
    case "optimized":
      return 3;
    default:
      return 0;
  }
}

function ScoreRing({ percentage }: { percentage: number }) {
  const ratio = Math.min(100, Math.max(0, percentage)) / 100;
  const background = `conic-gradient(var(--qz-cyan) ${ratio * 100}%, var(--qz-surface-highest) 0)`;

  return (
    <div className="quiz-ring-wrap" style={{ background }}>
      <div className="quiz-ring-inner">
        <span className="quiz-ring-score">{percentage}</span>
        <span className="quiz-ring-kicker">De 100</span>
      </div>
    </div>
  );
}

export function QuizResult({ result, ctaLabel, onCtaClick }: QuizResultProps) {
  const activeSeg = levelSegmentIndex(result.resultLevel);
  const priorities = result.opportunities.slice(0, 3);

  return (
    <div className="quiz-inner">
      <section className="quiz-results-hero">
        <span className="quiz-eyebrow">Diagnóstico de marketing digital</span>
        <h2 className="quiz-results-display">Tu diagnóstico digital está listo</h2>
        <p className="quiz-section-desc">
          {result.resultSummary}
        </p>
        <div className="quiz-score-pill">
          <span aria-hidden>★</span>
          <span className="quiz-score-pill-val">
            {result.scorePercentage}
            <span style={{ fontSize: "1rem", color: "var(--qz-muted)" }}>/100</span>
          </span>
          <span style={{ color: "var(--qz-muted)", fontSize: "0.875rem" }}>
            {result.resultLevelLabel}
          </span>
        </div>
      </section>

      <section className="quiz-bento">
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

      <section>
        <h2 className="quiz-section-title">¿Qué significa este resultado?</h2>
        <p className="quiz-section-desc">
          Revisa tus fortalezas y las áreas donde una intervención estratégica puede
          acelerar el crecimiento.
        </p>
        <div className="quiz-two-col">
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
        </div>
      </section>

      {priorities.length > 0 ? (
        <section className="quiz-priorities">
          <h2>Tus prioridades digitales</h2>
          <div className="quiz-priority-grid">
            {priorities.map((text, index) => (
              <div key={text} className="quiz-priority-card">
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

      {result.recommendedServices.length > 0 ? (
        <section>
          <h2 className="quiz-section-title" style={{ textAlign: "left" }}>
            Cómo te ayudamos a escalar
          </h2>
          <div className="quiz-services">
            {result.recommendedServices.map((service) => (
              <div key={service} className="quiz-service-card">
                {service}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="quiz-cta-box">
        <div className="quiz-cta-glow" aria-hidden />
        <h2>¿Quieres mejorar tu score digital?</h2>
        <p>
          Agenda una sesión estratégica gratuita con nuestro equipo. Revisaremos este
          reporte contigo y definiremos un plan de acción claro.
        </p>
        <div className="quiz-cta-actions">
          <button type="button" className="quiz-btn-primary" onClick={onCtaClick}>
            {ctaLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
