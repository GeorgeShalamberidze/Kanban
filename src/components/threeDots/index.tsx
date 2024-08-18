import Dots from "@/assets/svg/vertical-dots.svg";
import useDropDown from "@/hooks/useDropdown";
import DropDown from "../dropdown";
import Button from "../button";
import useModal from "@/hooks/useModal";
import Modal from "../modal";
import { activeBoardAtom, allBoardsAtom } from "@/store/board";
import { useAtom } from "jotai";
import EditBoardThreeDots from "./editBoard";
import { twMerge } from "tailwind-merge";
import DeleteBoardModalView from "../deleteBoardModalView";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PATHS } from "@/routes/route.enum";

const ThreeDots: React.FC = () => {
  const { isDropDownOpen, closeDropDown, openDropDown } = useDropDown();
  const { isModalOpen, closeModal, openModal } = useModal();
  const [activeBoard] = useAtom(activeBoardAtom);
  const [allBoards] = useAtom(allBoardsAtom);
  const navigate = useNavigate();

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
          className="bg-white top-20 right-0 flex flex-col w-48 p-4 gap-4"
        >
          <EditBoardThreeDots
            closeDropDown={closeDropDown}
            isDropDownOpen={isDropDownOpen}
          />
          <Button
            title="Delete Board"
            className="text-red cursor-pointer hover:opacity-75"
            onClick={() => {
              closeDropDown();
              openModal();
              if (allBoards?.length === 1) {
                navigate(DASHBOARD_PATHS.ROOT);
              }
            }}
          />
        </DropDown>
      )}
      {isModalOpen && (
        <Modal className="p-8" hideModal={closeModal}>
          <DeleteBoardModalView closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default ThreeDots;
