"use client";

import { useEffect, useState } from "react";
import { QUIZ_RESULT_PREVIEW } from "@/lib/quiz/result-preview";
import { loadQuizResult } from "@/lib/quiz/result-storage";
import type { QuizScoreResult } from "@/lib/quiz/types";
import { isWebflowDesignerCanvas } from "@/lib/shared/is-webflow-designer";

export function useQuizResultData(): {
  result: QuizScoreResult | null;
  isPreview: boolean;
  isEmpty: boolean;
} {
  const [result, setResult] = useState<QuizScoreResult | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const stored = loadQuizResult();
    if (stored?.result) {
      setResult(stored.result);
      setIsPreview(false);
      return;
    }

    if (isWebflowDesignerCanvas()) {
      setResult(QUIZ_RESULT_PREVIEW);
      setIsPreview(true);
      return;
    }

    setResult(null);
    setIsPreview(false);
  }, []);

  return {
    result,
    isPreview,
    isEmpty: !result,
  };
}
