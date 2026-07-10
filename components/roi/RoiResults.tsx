"use client";

import {
  formatMxn,
  formatMultiplier,
  formatUsd,
} from "@/lib/roi/currency";
import type { RoiCalculationResult } from "@/lib/roi/types";
import { RoiProgressRing } from "./RoiProgressRing";

type RoiResultsProps = {
  result: RoiCalculationResult;
  ctaLabel: string;
  retryLabel: string;
  disclaimer: string;
  onCtaClick: () => void;
  onRetry: () => void;
  isLoading?: boolean;
};

type MetricRow = {
  label: string;
  value: string;
  accent?: boolean;
};

function formatCount(value: number): string {
  const rounded =
    Math.abs(value - Math.round(value)) < 0.01
      ? Math.round(value)
      : Math.round(value * 10) / 10;
  return rounded.toLocaleString("es-MX");
}

function metricsForResult(result: RoiCalculationResult): MetricRow[] {
  const m = result.metrics;

  switch (m.industry) {
    case "ecommerce":
      return [
        { label: "Visitas generadas", value: formatCount(m.visitasGeneradas) },
        { label: "Ventas estimadas", value: formatCount(m.ventasEstimadas) },
        { label: "CAC", value: formatMxn(m.cac) },
        {
          label: "Ingresos proyectados",
          value: formatMxn(m.ingresosProyectados),
          accent: true,
        },
        { label: "ROAS", value: formatMultiplier(m.roas) },
      ];
    case "real-estate":
      return [
        {
          label: "Inversión acumulada",
          value: formatMxn(m.inversionAcumulada),
        },
        { label: "Leads totales", value: formatCount(m.leadsTotales) },
        { label: "Citas generadas", value: formatCount(m.citasGeneradas) },
        { label: "Cierres totales", value: formatCount(m.cierresTotales) },
        {
          label: "Ingresos generados",
          value: formatMxn(m.ingresosGenerados),
          accent: true,
        },
      ];
    case "saas":
      return [
        {
          label: "Clientes nuevos de pago",
          value: formatCount(m.clientesNuevos),
        },
        { label: "CAC", value: formatMxn(m.cac) },
        { label: "LTV por cliente", value: formatUsd(m.ltv) },
        {
          label: "Ingreso total proyectado",
          value: formatUsd(m.ingresoTotalProyectado),
          accent: true,
        },
        {
          label: "Relación LTV:CAC",
          value: formatMultiplier(m.relacionLtvCac),
        },
      ];
    case "b2b-services":
      return [
        { label: "CPL estimado", value: formatMxn(m.costPerLead) },
        { label: "Leads totales", value: formatCount(m.estimatedLeads) },
        { label: "Ventas estimadas", value: formatCount(m.estimatedSales) },
        {
          label: "Ingresos estimados",
          value: formatMxn(m.estimatedRevenue),
          accent: true,
        },
        { label: "ROAS", value: formatMultiplier(m.estimatedRoas) },
      ];
    default:
      return [];
  }
}

export function RoiResults({
  result,
  ctaLabel,
  retryLabel,
  disclaimer,
  onCtaClick,
  onRetry,
  isLoading,
}: RoiResultsProps) {
  const roiDisplay = Math.round(result.estimatedRoi);
  const roiPositive = roiDisplay >= 0;
  const metrics = metricsForResult(result);

  return (
    <div className="roi-step roi-step-results">
      <div className="roi-panel">
        <div className="roi-panel-glow" aria-hidden />
        <div className="roi-panel-body">
          <RoiProgressRing roi={result.estimatedRoi}>
            <p className="roi-ring-kicker">ROI proyectado</p>
            <p className="roi-ring-value">
              {roiPositive ? "" : "-"}
              {Math.abs(roiDisplay)}
              <span
                className={`roi-ring-pct ${roiPositive ? "roi-text-gold" : "roi-text-cyan"}`}
              >
                %
              </span>
            </p>
          </RoiProgressRing>

          <div className="roi-metrics roi-metrics-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="roi-metric">
                <span className="roi-metric-kicker">{metric.label}</span>
                <span
                  className={`roi-metric-val${metric.accent ? " roi-text-cyan" : ""}`}
                >
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          <p className="roi-disclaimer">{disclaimer}</p>
        </div>
      </div>

      <div className="roi-step-actions">
        <button
          type="button"
          className="roi-btn-secondary"
          disabled={isLoading}
          onClick={onRetry}
        >
          {retryLabel}
        </button>
        <button
          type="button"
          className="roi-btn-cta"
          disabled={isLoading}
          onClick={onCtaClick}
        >
          <span>{ctaLabel}</span>
          <span aria-hidden> →</span>
        </button>
      </div>
    </div>
  );
}
