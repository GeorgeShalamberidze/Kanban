import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>();

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return {
    isModalOpen,
    closeModal,
    openModal,
  };
};

export default useModal;
