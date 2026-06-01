import type { Metadata } from "next";
import { RoiCalculatorComponent } from "@/components/code-components";

export const metadata: Metadata = {
  title: "Calculadora de ROI",
};

export default function CalculadoraRoiPage() {
  return <RoiCalculatorComponent />;
}
