import PlusIcon from "@/assets/svg/icon-add-task-mobile.svg";
import AddTaskModalView from "@/components/addTaskModalView";
import Modal from "@/components/modal";
import useModal from "@/hooks/useModal";
import { activeBoardAtom } from "@/store/board";
import { useAtom } from "jotai";
import { twMerge } from "tailwind-merge";

const AddNewTask: React.FC = () => {
  const [activeBoard] = useAtom(activeBoardAtom);
  const { openModal, closeModal, isModalOpen } = useModal();

  return (
    <>
      <button
        className={twMerge(
          "bg-main-purple hover:bg-main-purple-hover rounded-full text-white py-[10px] px-[18px] sm:py-3 sm:px-5 md:py-[15px] md:px-[25px] cursor-pointer",
          `${!activeBoard || activeBoard?.columns.length === 0 ? "opacity-25 pointer-events-none" : ""}`
        )}
        onClick={openModal}
        disabled={!activeBoard || activeBoard?.columns.length === 0}
      >
        <p className="hidden md:flex">+ Add New Task</p>
        <p className="flex md:hidden w-3 h-3">
          <img src={PlusIcon} alt="plus icon" />
        </p>
      </button>
      {isModalOpen && (
        <Modal hideModal={closeModal} className="w-full">
          <AddTaskModalView hideModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default AddNewTask;
