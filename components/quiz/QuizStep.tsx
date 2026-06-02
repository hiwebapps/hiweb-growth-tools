"use client";

import type { QuizQuestion } from "@/lib/quiz/types";
import { QUIZ_SCALE_TITLES, QuizOptionIcon } from "./QuizOptionIcon";

type QuizStepProps = {
  question: QuizQuestion;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
};

export function QuizStep({
  question,
  selectedOptionId,
  onSelect,
}: QuizStepProps) {
  return (
    <div className="quiz-question-wrap">
      <h2 className="quiz-question-title">{question.question}</h2>
      {question.helpText ? (
        <p className="quiz-question-help">{question.helpText}</p>
      ) : (
        <p className="quiz-question-help">
          Selecciona la opción que mejor describa la madurez de tu operación en esta área.
        </p>
      )}
      <div className="quiz-options" role="radiogroup" aria-label={question.question}>
        {question.options.map((option, index) => {
          const selected = selectedOptionId === option.id;
          const tierTitle = QUIZ_SCALE_TITLES[index] ?? `Opción ${index + 1}`;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              className={`quiz-option${selected ? " is-selected" : ""}`}
              onClick={() => onSelect(option.id)}
            >
              <div className="quiz-option-icon-wrap">
                <QuizOptionIcon tierIndex={index} />
              </div>
              <h3 className="quiz-option-title">{tierTitle}</h3>
              <p className="quiz-option-desc">{option.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
