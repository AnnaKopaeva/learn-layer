import { useMutation } from "@apollo/client";
import { Card } from "@/types/Card";
import { DELETE_CARD } from "@/mutation/Card";
import { updateCacheAfterDeleteCard } from "@/utils/updateCache";
import { useRouter } from "next/navigation";

interface CardItemProps {
  card: Card;
}

function DeleteCard({ card }: CardItemProps) {
  const router = useRouter();

  const [deleteCard] = useMutation(DELETE_CARD, {
    variables: { id: card.id },
    update(cache) {
      updateCacheAfterDeleteCard(cache, card);
    },
  });

  const handleDelete = async () => {
    try {
      await deleteCard();
      router.push("/");
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Delete Card
    </button>
  );
}

export default DeleteCard;
