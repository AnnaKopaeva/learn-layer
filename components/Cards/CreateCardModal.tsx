"use client";

import { useActionState } from "react";
import { ApolloError } from "@apollo/client";
import { Card } from "@/types/Card";

interface CreateCardProps {
  error?: ApolloError;
  loading: boolean;
  onSubmit: (
    previousState: CreateCardState,
    queryData: FormData
  ) => Promise<CreateCardState>;
}

type CreateCardState = Omit<Card, "id">;

export default function CreateCardModal({
  error,
  loading,
  onSubmit,
}: CreateCardProps) {
  const [, actionFn] = useActionState(onSubmit, {
    title: "",
    content: "",
  });

  return (
    <div className="p-4">
      <form action={actionFn} className="space-y-4">
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
            name="title"
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
            name="content"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && (
          <p className="text-red-500 text-xs italic mb-4">{error.message}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? "Creating..." : "Create Card"}
        </button>
      </form>
    </div>
  );
}
