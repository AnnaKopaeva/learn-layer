import { Card } from "@/types/Card";
import DeleteCard from "@/components/Cards/CardActions/DeleteCard";
import EditCard from "@/components/Cards/CardActions/EditCard";

interface CardItemProps {
  card: Card;
}

function CardItem({ card }: CardItemProps) {
  const { title, content } = card;

  return (
    <li className="p-4 bg-white rounded shadow-md flex justify-between items-center">
      <div>
        <h2 className="text-black text-xl font-semibold">{title}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
      <div className="flex space-x-2">
        <EditCard card={card} />
        <DeleteCard card={card} />
      </div>
    </li>
  );
}

export default CardItem;
