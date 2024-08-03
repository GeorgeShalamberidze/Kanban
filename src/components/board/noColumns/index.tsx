import Button from "@/components/button";
import Modal from "@/components/modal";
import useModal from "@/hooks/useModal";

const NoColumns: React.FC = () => {
  const { closeModal, isModalOpen, openModal } = useModal();
  return (
    <div className="flex w-full h-full items-center justify-center flex-col gap-8 px-2">
      <p className="text-medium-gray text-center">
        This board is empty. Create a new column to get started.
      </p>
      <Button
        title="+ Add New Column"
        className="w-fit bg-main-purple hover:bg-main-purple-hover rounded-full text-white py-3 px-4 cursor-pointer"
        onClick={openModal}
      />
      {isModalOpen ? (
        <Modal hideModal={closeModal}>
          <div>
            <h1 className="text-white dark:text-dark">edit board</h1>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default NoColumns;
