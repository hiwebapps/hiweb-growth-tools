import { Card } from "@/components/shared";

type RoiRecommendationCardProps = {
  recommendations: string[];
};

export function RoiRecommendationCard({
  recommendations,
}: RoiRecommendationCardProps) {
  return (
    <Card padding="md" elevated={false}>
      <h4 className="mb-3 text-sm font-semibold text-foreground">
        Servicios recomendados
      </h4>
      <ul className="flex flex-col gap-2">
        {recommendations.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
