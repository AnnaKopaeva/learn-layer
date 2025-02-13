import { Card } from "@/types/Card";

import CardItem from "@/components/Cards/CardItem";

interface CardsGridProps {
  data: Card[];
}

function CardsGrid({ data }: CardsGridProps) {
  return (
    <ul className="space-y-4">
      {data.map((item: Card) => (
        <CardItem key={item.id} card={item} />
      ))}
    </ul>
  );
}

export default CardsGrid;
