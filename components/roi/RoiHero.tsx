type RoiHeroProps = {
  title: string;
  description?: string;
};

export function RoiHero({ title, description }: RoiHeroProps) {
  return (
    <div className="relative mx-auto mb-12 max-w-3xl text-center">
      <div
        className="absolute top-1/2 left-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full opacity-5"
        style={{ backgroundColor: "var(--roi-gold)" }}
        aria-hidden
      />
      <h2 className="mb-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="roi-text-muted text-lg leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
