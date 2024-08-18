import { activeBoardAtom, allBoardsAtom } from "@/store/board";
import { useAtom } from "jotai";
import KanbanLogo from "@/assets/svg/kanban.svg";
import useModal from "@/hooks/useModal";
import Modal from "../modal";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useState } from "react";
import DropDown from "../dropdown";
import { twMerge } from "tailwind-merge";
import AllBoards from "../allBoards";
import Boards from "../boards";
import ThemeSwitcher from "../themeSwitcher";
import ThreeDots from "../threeDots";
import AddNewTask from "./addNewTask";
import UpArrow from "./upArrow";
import DownArrow from "./downArrow";
import BoardIconPurple from "@/assets/svg/icon-board-purple.svg";
import AddBoardModalView from "../addBoardModalView";

const Header: React.FC = () => {
  const [activeBoard] = useAtom(activeBoardAtom);
  const { openModal, closeModal, isModalOpen } = useModal();
  const { isLowerThan } = useMediaQuery(768);
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  const [allBoards] = useAtom(allBoardsAtom);

  const handleOnClick = () => {
    if (!isLowerThan) return;
    setIsDropDownOpen((prev) => !prev);
  };

  const handleCloseDropDown = () => {
    setIsDropDownOpen(false);
  };

  return (
    <div className="w-full min-h-fit h-[97px] flex items-center gap-2 justify-between border-b border-solid border-lines-light dark:border-lines-dark bg-white dark:bg-dark-gray px-4 md:px-8 relative">
      <div className="flex gap-4 items-center">
        <img src={KanbanLogo} className="flex md:hidden" alt="kanban logo" />
        <div
          className="flex items-center gap-2 cursor-pointer md:cursor-default"
          onClick={handleOnClick}
        >
          <p className="text-base sm:text-xl md:text-2xl font-bold truncate max-w-72 text-black dark:text-white">
            {activeBoard?.name}
          </p>
          {isDropDownOpen ? <UpArrow /> : <DownArrow />}
        </div>
      </div>
      {isDropDownOpen && (
        <DropDown
          hasBg
          hideDropDown={handleCloseDropDown}
          className={twMerge("w-[85%] max-w-[400px] top-20 py-4")}
        >
          {allBoards && allBoards.length > 0 ? (
            <>
              <AllBoards className="text-base" boardCount={allBoards.length} />
              <Boards boards={allBoards} />
            </>
          ) : null}
          <div className="w-[90%]" onClick={openModal}>
            <div className="flex items-center gap-4 py-4 w-[80%] mx-auto cursor-pointer text-center">
              <img src={BoardIconPurple} alt="board icon" />
              <p className="text-main-purple font-bold">+ Create New Board</p>
            </div>
          </div>
          <ThemeSwitcher />
        </DropDown>
      )}
      <div className="flex gap-6">
        <AddNewTask openModal={openModal} />
        <ThreeDots />
      </div>
      {isModalOpen && (
        <Modal hideModal={closeModal} className="w-full">
          <AddBoardModalView hideModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default Header;
