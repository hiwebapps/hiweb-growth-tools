"use client";

import {
  QuizPriorityCard,
  type QuizPriorityCardProps,
} from "@/components/quiz/results/QuizPriorityCard";

export type QuizPriorityCardComponentProps = QuizPriorityCardProps;

export function QuizPriorityCardComponent(props: QuizPriorityCardComponentProps) {
  return (
    <QuizPriorityCard
      priorityIndex={props.priorityIndex ?? 1}
      titleOverride={props.titleOverride}
      descriptionOverride={props.descriptionOverride}
    />
  );
}

export default QuizPriorityCardComponent;
