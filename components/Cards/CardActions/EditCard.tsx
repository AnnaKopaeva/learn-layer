import { Card } from "@/types/Card";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardItemProps {
  card: Card;
}

function EditCard({ card }: CardItemProps) {
  const router = useRouter();

  const handleSubmit = async () => {
    router.push(`/cards/${card.id}`);
  };

  return (
    <button
      onClick={handleSubmit}
      className="text-blue-500 hover:text-blue-700"
    >
      <Image src="/images/edit.svg" alt="Edit" width={24} height={24} />
    </button>
  );
}

export default EditCard;
