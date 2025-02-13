import { useMutation } from "@apollo/client";
import { Card } from "@/types/Card";
import Image from "next/image";
import { DELETE_CARD } from "@/mutation/Card";
import { updateCacheAfterDeleteCard } from "@/utils/updateCache";

interface CardItemProps {
  card: Card;
}

function DeleteCard({ card }: CardItemProps) {
  const [deleteCard] = useMutation(DELETE_CARD, {
    variables: { id: card.id },
    update(cache) {
      updateCacheAfterDeleteCard(cache, card);
    },
  });

  const handleDelete = async () => {
    try {
      await deleteCard();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
      <Image src="/images/delete.svg" alt="Delete" width={24} height={24} />
    </button>
  );
}

export default DeleteCard;
