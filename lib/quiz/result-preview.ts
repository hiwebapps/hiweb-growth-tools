import type { QuizScoreResult } from "./types";

/** Datos de ejemplo para Webflow Designer y páginas sin sesión. */
export const QUIZ_RESULT_PREVIEW: QuizScoreResult = {
  scoreTotal: 8,
  scoreMax: 24,
  scorePercentage: 33,
  resultLevel: "initial",
  resultLevelLabel: "Nivel inicial",
  resultSummary:
    "Tu marketing digital está en una etapa temprana. Hay una gran oportunidad de construir bases sólidas.",
  categoryScores: [
    {
      category: "seo",
      label: "SEO y visibilidad",
      score: 2,
      maxScore: 6,
      percentage: 33,
    },
    {
      category: "advertising",
      label: "Publicidad digital",
      score: 2,
      maxScore: 6,
      percentage: 33,
    },
    {
      category: "content",
      label: "Contenido y marca",
      score: 2,
      maxScore: 6,
      percentage: 33,
    },
    {
      category: "analytics",
      label: "Datos y medición",
      score: 2,
      maxScore: 6,
      percentage: 33,
    },
  ],
  strengths: ["Base lista para escalar con un plan integral."],
  opportunities: [
    "SEO y visibilidad: margen de mejora (33%).",
    "Publicidad digital: margen de mejora (33%).",
    "Contenido y marca: margen de mejora (33%).",
    "Datos y medición: margen de mejora (33%).",
  ],
  recommendedServices: [
    "Rediseño web estratégico",
    "SEO y contenido",
    "Automatización con n8n",
    "Dashboards y analítica",
  ],
};
