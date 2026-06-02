import type { Metadata } from "next";
import { QuizToolComponent } from "@/components/code-components";

export const metadata: Metadata = {
  title: "Diagnóstico de marketing digital",
};

export default function DiagnosticoMarketingDigitalPage() {
  return (
    <div className="quiz-stitch" style={{ background: "#131316", minHeight: "100vh" }}>
      <QuizToolComponent />
    </div>
  );
}
