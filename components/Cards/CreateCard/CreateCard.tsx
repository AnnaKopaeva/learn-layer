"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import CreateCardModal from "@/components/Cards/CreateCardModal";
import Modal from "@/components/Modal";
import { Card } from "@/types/Card";
import { CREATE_CARD } from "@/mutation/Card";
import { updateCacheAfterCreate } from "@/utils/updateCache";

type CreateCardState = Omit<Card, "id">;

export default function CreateCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createCard, { loading, error }] = useMutation(CREATE_CARD, {
    update(cache, { data: { createCard } }) {
      updateCacheAfterCreate(cache, createCard);
    },
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (
    previousState: CreateCardState,
    queryData: FormData
  ): Promise<CreateCardState> => {
    const title = queryData.get("title");
    const content = queryData.get("content");

    await createCard({ variables: { title, content } });
    toggleModal();

    return previousState;
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Create
      </button>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <CreateCardModal
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </Modal>
    </>
  );
}
