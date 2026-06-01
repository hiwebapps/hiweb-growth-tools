import Link from "next/link";

const tools = [
  {
    href: "/diagnostico-marketing-digital",
    title: "Diagnóstico de marketing digital",
    description:
      "Quiz multistep para evaluar tu presencia digital y recibir recomendaciones.",
  },
  {
    href: "/calendario",
    title: "Calendario de agendamiento",
    description: "Agenda una llamada o reunión con el equipo de Hiweb Marketing.",
  },
  {
    href: "/calculadora-roi",
    title: "Calculadora de ROI",
    description:
      "Estima leads, ventas e ingresos potenciales de tu inversión en marketing.",
  },
] as const;

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-16 sm:px-8">
      <div className="flex max-w-2xl flex-col gap-4">
        <p className="text-sm font-medium tracking-wide text-brand-600 uppercase">
          Hiweb Marketing
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Growth Tools
        </h1>
        <p className="text-lg leading-relaxed text-muted">
          Una sola app modular con herramientas interactivas de diagnóstico,
          agendamiento y conversión. Desplegable en Webflow Cloud con Code
          Components.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-foreground group-hover:text-brand-600">
                {tool.title}
              </h2>
              <p className="flex-1 text-sm leading-relaxed text-muted">
                {tool.description}
              </p>
              <span className="text-sm font-medium text-brand-600">
                Abrir herramienta →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
