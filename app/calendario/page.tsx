import type { Metadata } from "next";
import { CalendarToolComponent } from "@/components/code-components";

export const metadata: Metadata = {
  title: "Calendario",
};

export default function CalendarioPage() {
  return <CalendarToolComponent />;
}
