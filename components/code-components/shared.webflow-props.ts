import { props } from "@webflow/data-types";

export const themeVariantProp = props.Variant({
  name: "Tema",
  options: ["light", "dark", "brand"],
  defaultValue: "light",
});

export function contentProps(defaults: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return {
    eyebrow: props.Text({
      name: "Eyebrow",
      defaultValue: defaults.eyebrow,
    }),
    title: props.Text({
      name: "Título",
      defaultValue: defaults.title,
    }),
    description: props.Text({
      name: "Descripción",
      defaultValue: defaults.description,
    }),
    themeVariant: themeVariantProp,
  };
}
