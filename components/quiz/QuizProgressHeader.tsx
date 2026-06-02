type QuizProgressHeaderProps = {
  stepLabel: string;
  stepCounter: string;
  progressPercent: number;
};

export function QuizProgressHeader({
  stepLabel,
  stepCounter,
  progressPercent,
}: QuizProgressHeaderProps) {
  return (
    <header className="quiz-progress">
      <div className="quiz-progress-head">
        <span className="quiz-progress-label">{stepLabel}</span>
        <span className="quiz-progress-label">{stepCounter}</span>
      </div>
      <div className="quiz-progress-track">
        <div
          className="quiz-progress-fill"
          style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
        />
      </div>
    </header>
  );
}
