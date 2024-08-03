import PlusIcon from "@/assets/svg/icon-add-task-mobile.svg";
import { activeBoardAtom } from "@/store/board";
import { useAtom } from "jotai";
import { twMerge } from "tailwind-merge";

type AddNewTaskPropType = {
  openModal: () => void;
};
const AddNewTask: React.FC<AddNewTaskPropType> = ({ openModal }) => {
  const [activeBoard] = useAtom(activeBoardAtom);

  return (
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
  );
};

export default AddNewTask;
