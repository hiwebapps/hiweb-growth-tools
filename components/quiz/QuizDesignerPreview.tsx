"use client";

import { QUIZ_QUESTIONS } from "@/lib/quiz/questions";
import { QuizNativeStyles } from "./QuizNativeStyles";
import { QuizProgressHeader } from "./QuizProgressHeader";
import { QuizStep } from "./QuizStep";

/** Vista estática para Webflow Designer. */
export function QuizDesignerPreview() {
  const question = QUIZ_QUESTIONS[1] ?? QUIZ_QUESTIONS[0];

  return (
    <div className="quiz-root">
      <QuizNativeStyles />
      <p className="quiz-designer-badge">
        Vista previa en Designer — en el sitio publicado el quiz es interactivo.
      </p>
      <div className="quiz-inner">
        <QuizProgressHeader
          stepLabel="Paso 2"
          stepCounter="2 de 9"
          progressPercent={22}
        />
        <QuizStep
          question={question}
          selectedOptionId={question.options[2]?.id}
          onSelect={() => undefined}
        />
        <div className="quiz-nav">
          <button type="button" className="quiz-btn-back" disabled>
            <span aria-hidden>←</span> Anterior
          </button>
          <button type="button" className="quiz-btn-primary" disabled>
            Siguiente <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
