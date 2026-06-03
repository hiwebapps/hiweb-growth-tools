"use client";

import { QuizNativeStyles } from "../QuizNativeStyles";
import { useQuizResultData } from "./useQuizResultData";

export type QuizPriorityCardProps = {
  priorityIndex: number;
  titleOverride?: string;
  descriptionOverride?: string;
};

export function QuizPriorityCard({
  priorityIndex,
  titleOverride,
  descriptionOverride,
}: QuizPriorityCardProps) {
  const { result, isPreview, isEmpty } = useQuizResultData();
  const index = Math.min(3, Math.max(1, Math.round(priorityIndex)));
  const opportunity = result?.opportunities[index - 1];
  const title = titleOverride?.trim() || `Prioridad ${index}`;
  const description =
    descriptionOverride?.trim() || opportunity || "Completa el quiz para ver esta prioridad.";

  return (
    <div className="quiz-stitch">
      <QuizNativeStyles />
      {isPreview ? (
        <p className="quiz-designer-badge">Vista previa — datos de ejemplo</p>
      ) : null}
      {isEmpty && !isPreview ? (
        <p className="quiz-empty-msg">Sin prioridad {index}.</p>
      ) : (
        <div className="quiz-priority-card quiz-priority-card-standalone">
          <span className="quiz-priority-num" aria-hidden>
            {index}
          </span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}
