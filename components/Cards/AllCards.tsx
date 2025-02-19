"use client";
import { useQuery } from "@apollo/client";
import CardsGrid from "@/components/Cards/CardsGrid";
import { GET_USER_CARDS } from "@/mutation/Card";

function AllCards() {
  const { data, loading, error } = useQuery(GET_USER_CARDS);

  if (loading)
    return (
      <div className="flex justify-center">
        <p>Loading cards...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center">
        <p>Error: {error.message}</p>
      </div>
    );

  return (
    <>
      <CardsGrid data={data.userCards} />
    </>
  );
}

export default AllCards;
