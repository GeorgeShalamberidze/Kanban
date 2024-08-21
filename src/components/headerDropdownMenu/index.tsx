import Dots from "@/assets/svg/vertical-dots.svg";
import useDropDown from "@/hooks/useDropdown";
import DropDown from "../dropdown";
import Button from "../button";
import useModal from "@/hooks/useModal";
import Modal from "../modal";
import DeleteBoardModalView from "../deleteBoardModalView";
import { activeBoardAtom, allBoardsAtom } from "@/store/board";
import { useAtom } from "jotai";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PATHS } from "@/routes/route.enum";
import EditBoardModalView from "../editBoard";

const HeaderDropdownMenu: React.FC = () => {
  const { isDropDownOpen, closeDropDown, openDropDown } = useDropDown();

  const {
    isModalOpen: isDeleteBoardModalOpen,
    closeModal: closeDeleteBoardModal,
    openModal: openDeleteBoardModal,
  } = useModal();

  const {
    isModalOpen: isEditBoardModalOpen,
    closeModal: closeEditBoardModal,
    openModal: openEditBoardModal,
  } = useModal();

  const [activeBoard] = useAtom(activeBoardAtom);
  const [allBoards] = useAtom(allBoardsAtom);
  const navigate = useNavigate();

  const handleOnEditBoardClick = () => {
    closeDropDown();
    openEditBoardModal();
  };

  const handleOnDeleteClick = () => {
    closeDropDown();
    openDeleteBoardModal();
    if (allBoards?.length === 1) {
      navigate(DASHBOARD_PATHS.ROOT);
    }
  };

  return (
    <div className="relative flex justify-center">
      <img
        src={Dots}
        alt="vertical dots"
        className={twMerge(
          "cursor-pointer",
          `${!activeBoard && "pointer-events-none opacity-35"}`
        )}
        onClick={openDropDown}
      />
      {isDropDownOpen && (
        <DropDown
          hideDropDown={closeDropDown}
          className="bg-white top-20 right-0 flex flex-col w-48 p-4 gap-4 shadow-md"
        >
          <Button
            title="Edit Board"
            className="text-medium-gray cursor-pointer hover:opacity-75"
            onClick={handleOnEditBoardClick}
          />
          <Button
            title="Delete Board"
            className="text-red cursor-pointer hover:opacity-75"
            onClick={handleOnDeleteClick}
          />
        </DropDown>
      )}
      {isDeleteBoardModalOpen && (
        <Modal hideModal={closeDeleteBoardModal}>
          <DeleteBoardModalView closeModal={closeDeleteBoardModal} />
        </Modal>
      )}
      {isEditBoardModalOpen && (
        <Modal hideModal={closeEditBoardModal}>
          <EditBoardModalView hideModal={closeEditBoardModal} />
        </Modal>
      )}
    </div>
  );
};

export default HeaderDropdownMenu;
