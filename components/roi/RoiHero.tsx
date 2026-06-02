type RoiHeroProps = {
  title: string;
  description?: string;
};

export function RoiHero({ title, description }: RoiHeroProps) {
  return (
    <header className="roi-hero">
      <div className="roi-hero-glow" aria-hidden />
      <h2 className="roi-hero-title">{title}</h2>
      {description ? <p className="roi-hero-desc">{description}</p> : null}
    </header>
  );
}
