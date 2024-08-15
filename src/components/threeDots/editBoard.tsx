import useModal from "@/hooks/useModal";
import Button from "../button";
import Modal from "../modal";
import EditBoardModalView from "../editBoard";

const EditBoardThreeDots: React.FC<{
  closeDropDown: () => void;
  isDropDownOpen: boolean;
}> = ({ closeDropDown, isDropDownOpen }) => {
  const { isModalOpen, closeModal, openModal } = useModal();

  const handleClick = () => {
    if (isDropDownOpen) {
      closeDropDown();
    }
    openModal();
  };

  return (
    <>
      <Button
        title="Edit Board"
        className="text-medium-gray cursor-pointer hover:opacity-75"
        onClick={handleClick}
      />
      {isModalOpen ? (
        <Modal hideModal={closeModal}>
          <EditBoardModalView />
        </Modal>
      ) : null}
    </>
  );
};

export default EditBoardThreeDots;
