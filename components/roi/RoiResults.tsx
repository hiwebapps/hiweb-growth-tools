import { Badge, Card } from "@/components/shared";
import type { RoiCalculationResult } from "@/lib/roi/types";
import { RoiRecommendationCard } from "./RoiRecommendationCard";

type RoiResultsProps = {
  result: RoiCalculationResult;
};

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card padding="sm" elevated={false}>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground">
        {value}
      </dd>
    </Card>
  );
}

export function RoiResults({ result }: RoiResultsProps) {
  const roiColor =
    result.estimatedRoi >= 150
      ? "brand"
      : result.estimatedRoi >= 50
        ? "success"
        : result.estimatedRoi >= 0
          ? "warning"
          : "error";

  return (
    <div className="flex flex-col gap-6">
      <Card padding="md" elevated={false}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted">ROI estimado (mensual)</p>
            <p className="text-4xl font-bold tabular-nums text-brand-600">
              {result.estimatedRoi >= 0 ? "+" : ""}
              {result.estimatedRoi}%
            </p>
          </div>
          <Badge variant={roiColor}>{result.resultLevelLabel}</Badge>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {result.resultSummary}
        </p>
      </Card>

      <dl className="grid gap-3 sm:grid-cols-2">
        <MetricCard
          label="Leads estimados / mes"
          value={result.estimatedLeads.toLocaleString("es-MX")}
        />
        <MetricCard
          label="Costo por lead"
          value={`$${result.costPerLead.toLocaleString("es-MX")}`}
        />
        <MetricCard
          label="Ventas potenciales / mes"
          value={result.estimatedSales.toLocaleString("es-MX", {
            maximumFractionDigits: 1,
          })}
        />
        <MetricCard
          label="Ingresos estimados / mes"
          value={`$${result.estimatedRevenue.toLocaleString("es-MX")}`}
        />
      </dl>

      <RoiRecommendationCard recommendations={result.recommendations} />
    </div>
  );
}
