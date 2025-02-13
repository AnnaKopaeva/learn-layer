"use client";
import { useQuery } from "@apollo/client";
import CardsGrid from "@/components/Cards/CardsGrid";
import { GET_USER_CARDS } from "@/mutation/Card";

function AllCards() {
  const { data, loading, error } = useQuery(GET_USER_CARDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <CardsGrid data={data.userCards} />
    </>
  );
}

export default AllCards;
