"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import CreateCardModal from "@/components/Cards/CreateCard/CreateCardModal";
import Modal from "@/components/Modal";
import { GradientButton } from "@/components/Button";
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
      <GradientButton onClick={toggleModal}>Create card</GradientButton>
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
