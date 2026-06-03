import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { contentProps } from "./shared.webflow-props";
import QuizToolComponent from "./QuizToolComponent";

export default declareComponent(QuizToolComponent, {
  name: "Quiz Diagnostico marketing",
  description:
    "Quiz multistep con captura de lead. Al enviar, redirige a tu página de resultados.",
  group: "Hiweb Growth Tools",
  props: {
    ...contentProps({
      eyebrow: "Diagnóstico",
      title: "¿Qué tan maduro es tu marketing digital?",
      description:
        "Responde unas preguntas y recibe un score con recomendaciones personalizadas de Hiweb Marketing.",
    }),
    startButtonLabel: props.Text({
      name: "Texto botón inicio",
      defaultValue: "Comenzar diagnóstico",
    }),
    leadCaptureTitle: props.Text({
      name: "Título captura de lead",
      defaultValue: "Recibe tu resultado",
    }),
    leadCaptureDescription: props.Text({
      name: "Descripción captura de lead",
      defaultValue:
        "Déjanos tus datos para enviarte el informe y las recomendaciones.",
    }),
    resultsRedirectUrl: props.Text({
      name: "URL página de resultados",
      defaultValue: "/resultados-diagnostico",
    }),
  },
  options: {
    ssr: false,
    applyTagSelectors: false,
  },
});
