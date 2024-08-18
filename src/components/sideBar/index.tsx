import AllBoards from "../allBoards";
import ThemeSwitcher from "../themeSwitcher";
import Boards from "../boards";
import HideSideBar from "../hideSideBar";
import { useAtom } from "jotai";
import { allBoardsAtom } from "@/store/board";
import BoardIconPurple from "@/assets/svg/icon-board-purple.svg";
import useModal from "@/hooks/useModal";
import Modal from "../modal";
import AddBoardModalView from "../addBoardModalView";

const SideBar: React.FC = () => {
  const [allBoards] = useAtom(allBoardsAtom);
  const { openModal, closeModal, isModalOpen } = useModal();

  return (
    <div className="w-full max-w-[300px] flex-shrink-0 bg-white h-full dark:bg-dark-gray flex flex-col border-r border-solid border-lines-light dark:border-lines-dark">
      {allBoards && allBoards.length > 0 ? (
        <>
          <AllBoards className="text-lg" boardCount={allBoards.length} />
          <Boards boards={allBoards} />
        </>
      ) : null}
      <div className="w-[90%]" onClick={openModal}>
        <div className="flex items-center gap-4 py-4 w-[80%] mx-auto cursor-pointer text-center">
          <img src={BoardIconPurple} alt="board icon" />
          <p className="text-main-purple font-bold">+ Create New Board</p>
        </div>
      </div>
      {isModalOpen && (
        <Modal hideModal={closeModal} className="w-full">
          <AddBoardModalView hideModal={closeModal} />
        </Modal>
      )}
      <ThemeSwitcher />
      <HideSideBar />
    </div>
  );
};

export default SideBar;
