"use client";

import { updateCacheAfterChangeCard } from "@/utils/updateCache";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { UPDATE_CARD } from "@/mutation/Card";
import DeleteCard from "@/components/Cards/CardActions/DeleteCard";
import { GET_USER_CARD_BY_ID } from "@/queries/getCards";

interface EditCardProps {
  params: Promise<{ id: string }>;
}

function EditCard({ params }: EditCardProps) {
  const { id } = use(params);
  const { data, loading, error } = useQuery(GET_USER_CARD_BY_ID, {
    variables: { id },
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.userCardById.title);
      setContent(data.userCardById.content);
    }
  }, [data]);

  const [updateCard, { error: errorUpdate }] = useMutation(UPDATE_CARD, {
    variables: { id, title, content },
    update(cache, { data: { updateCard } }) {
      updateCacheAfterChangeCard(cache, updateCard);
    },
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    updateCard();
  };

  if (loading) return <p>Loading card...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (errorUpdate) return <p>Error: {errorUpdate.message}</p>;

  return (
    <div className="space-y-4 w-full max-w-screen-md mt-8">
      <Link href="/" className="text-blue-500 hover:underline">
        Back to Cards
      </Link>
      <div className="flex items-center justify-center mb-4">
        <h1 className="text-2xl font-bold">Edit Card</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex space-x-4 justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Card
          </button>
          <DeleteCard card={data.userCardById} />
        </div>
      </form>
    </div>
  );
}

export default EditCard;
