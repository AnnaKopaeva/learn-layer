"use client";

import { updateCacheAfterChangeCard } from "@/utils/updateCache";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState, use } from "react";
import { UPDATE_CARD } from "@/mutation/Card";
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

  const handleSubmit = () => {
    updateCard();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (errorUpdate) return <p>Error: {errorUpdate.message}</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
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
          className="block text-gray-700 text-sm font-bold mb-2"
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
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update Card
      </button>
    </form>
  );
}

export default EditCard;
