import type { QuizResultLevelId } from "@/lib/quiz/types";

export function barFillClass(percentage: number): string {
  if (percentage < 45) {
    return "quiz-bar-fill is-error";
  }
  if (percentage < 70) {
    return "quiz-bar-fill is-gold";
  }
  return "quiz-bar-fill";
}

export function levelSegmentIndex(level: QuizResultLevelId): number {
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

export function ScoreRing({ percentage }: { percentage: number }) {
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
