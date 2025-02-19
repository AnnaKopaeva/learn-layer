import { Card } from "@/types/Card";

import CardItem from "@/components/Cards/CardItem";

interface CardsGridProps {
  data: Card[];
}

function CardsGrid({ data }: CardsGridProps) {
  return (
    <div className="p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item: Card) => (
          <CardItem key={item.id} card={item} />
        ))}
      </ul>
    </div>
  );
}

export default CardsGrid;
