import { Card } from "@/types/Card";
// import DeleteCard from "@/components/Cards/CardActions/DeleteCard";
import { useRouter } from "next/navigation";

interface CardItemProps {
  card: Card;
}

function CardItem({ card }: CardItemProps) {
  const { title, content } = card;
  const router = useRouter();

  const handleSubmit = async () => {
    router.push(`/cards/${card.id}`);
  };

  return (
    <li className="flex flex-col justify-between p-4 bg-white rounded shadow-md min-h-48 lg:min-h-64">
      <div>
        <h4 className="text-black text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-700">{content}</p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white font-bold p-2 mt-4 rounded hover:bg-blue-700"
        >
          Show more
        </button>
      </div>
    </li>
  );
}

export default CardItem;
