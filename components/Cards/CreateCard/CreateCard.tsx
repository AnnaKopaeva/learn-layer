"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import CreateCardModal from "@/components/Cards/CreateCardModal";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
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
      <Button onClick={toggleModal}>Create card</Button>
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
