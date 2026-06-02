"use client";

type SmokeTestComponentProps = {
  label?: string;
};

/** Componente minimo para validar import en Webflow Designer. */
export default function SmokeTestComponent({
  label = "Hiweb OK",
}: SmokeTestComponentProps) {
  return (
    <div
      style={{
        padding: "24px",
        borderRadius: "12px",
        background: "#15181d",
        color: "#e4e1e6",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>{label}</p>
      <p style={{ margin: "8px 0 0", fontSize: "13px", opacity: 0.7 }}>
        Si ves esto, la biblioteca carga bien.
      </p>
    </div>
  );
}
