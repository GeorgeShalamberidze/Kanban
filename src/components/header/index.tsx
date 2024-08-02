import { activeBoardAtom } from "@/store/board";
import { useAtom } from "jotai";
import PlusIcon from "@/assets/svg/icon-add-task-mobile.svg";
import Dots from "@/assets/svg/vertical-dots.svg";
import KanbanLogo from "@/assets/svg/kanban.svg";
import DownCarrot from "@/assets/svg/icon-chevron-down.svg";
import useModal from "@/hooks/useModal";
import Modal from "../modal";
import AddTask from "../addTask";

const Header: React.FC = () => {
  const [activeBoard] = useAtom(activeBoardAtom);
  const { openModal, closeModal, isModalOpen } = useModal();

  return (
    <div className="w-full min-h-fit h-[97px] flex items-center gap-2 justify-between border-b border-solid border-lines-light dark:border-lines-dark bg-white dark:bg-dark-gray px-4 md:px-8">
      <div className="flex gap-4 items-center">
        <img src={KanbanLogo} className="flex md:hidden" alt="kanban logo" />
        <div className="flex items-center gap-2 cursor-pointer md:cursor-default">
          <p className="text-base sm:text-xl md:text-2xl font-bold text-black dark:text-white">
            {activeBoard?.board}
          </p>
          <img
            src={DownCarrot}
            className="w-fit h-full flex md:hidden"
            alt="down carrot arrow"
          />
        </div>
      </div>
      <div className="flex gap-6">
        <div
          className="bg-main-purple hover:bg-main-purple-hover rounded-full text-white py-[10px] px-[18px] sm:py-3 sm:px-5 md:py-[15px] md:px-[25px] cursor-pointer"
          onClick={openModal}
        >
          <p className="hidden md:flex">+ Add New Task</p>
          <p className="flex md:hidden w-3 h-3">
            <img src={PlusIcon} alt="plus icon" />
          </p>
        </div>
        <img src={Dots} alt="vertical dots" className="cursor-pointer" />
      </div>
      {isModalOpen && (
        <Modal hideModal={closeModal}>
          <AddTask />
        </Modal>
      )}
    </div>
  );
};

export default Header;
