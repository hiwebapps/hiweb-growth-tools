"use client";

import type { ReactNode } from "react";
import { QuizNativeStyles } from "../QuizNativeStyles";

type QuizResultShellProps = {
  isPreview: boolean;
  isEmpty: boolean;
  emptyMessage?: string;
  children: ReactNode;
};

export function QuizResultShell({
  isPreview,
  isEmpty,
  emptyMessage = "Completa el quiz para ver tus resultados aquí.",
  children,
}: QuizResultShellProps) {
  if (isEmpty) {
    return (
      <div className="quiz-stitch quiz-result-block">
        <QuizNativeStyles />
        <p className="quiz-empty-msg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="quiz-stitch quiz-result-block">
      <QuizNativeStyles />
      {isPreview ? (
        <p className="quiz-designer-badge">Vista previa — datos de ejemplo</p>
      ) : null}
      {children}
    </div>
  );
}
