import { Badge, Card } from "@/components/shared";
import type { QuizScoreResult } from "@/lib/quiz/types";

type QuizResultProps = {
  result: QuizScoreResult;
};

export function QuizResult({ result }: QuizResultProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card padding="md" elevated={false}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted">Tu puntuación</p>
            <p className="text-4xl font-bold tabular-nums text-brand-600">
              {result.scorePercentage}%
            </p>
          </div>
          <Badge variant="brand">{result.resultLevelLabel}</Badge>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {result.resultSummary}
        </p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {result.categoryScores.map((cat) => (
          <Card key={cat.category} padding="sm" elevated={false}>
            <p className="text-xs font-medium text-muted">{cat.label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">
              {cat.percentage}%
            </p>
          </Card>
        ))}
      </div>

      <Card padding="md" elevated={false}>
        <h4 className="mb-2 text-sm font-semibold text-foreground">
          Fortalezas
        </h4>
        <ul className="list-inside list-disc text-sm text-muted">
          {result.strengths.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>

      <Card padding="md" elevated={false}>
        <h4 className="mb-2 text-sm font-semibold text-foreground">
          Oportunidades
        </h4>
        <ul className="list-inside list-disc text-sm text-muted">
          {result.opportunities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>

      <Card padding="md" elevated={false}>
        <h4 className="mb-3 text-sm font-semibold text-foreground">
          Servicios recomendados
        </h4>
        <ul className="flex flex-col gap-2">
          {result.recommendedServices.map((service) => (
            <li
              key={service}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              {service}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
