import Dots from "@/assets/svg/vertical-dots.svg";
import useDropDown from "@/hooks/useDropdown";
import DropDown from "../../dropdown";
import Button from "../../button";
import { activeBoardAtom } from "@/store/board";
import { useAtom } from "jotai";
import { twMerge } from "tailwind-merge";

const ViewTaskDropdownMenu: React.FC<{
  openDeleteTaskModal: () => void;
  openEditTaskModal: () => void;
  hideModal: () => void;
}> = ({ openDeleteTaskModal, openEditTaskModal, hideModal }) => {
  const { isDropDownOpen, closeDropDown, openDropDown } = useDropDown();

  const [activeBoard] = useAtom(activeBoardAtom);

  const handleOnEditTaskClick = () => {
    openEditTaskModal();
    closeDropDown();
    hideModal();
  };

  const handleOnDeleteTaskClick = () => {
    openDeleteTaskModal();
    closeDropDown();
    hideModal();
  };

  return (
    <div className="relative flex justify-center flex-shrink-0">
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
            title="Edit Task"
            className="text-medium-gray cursor-pointer hover:opacity-75"
            onClick={handleOnEditTaskClick}
          />
          <Button
            title="Delete Task"
            className="text-red cursor-pointer hover:opacity-75"
            onClick={handleOnDeleteTaskClick}
          />
        </DropDown>
      )}
    </div>
  );
};

export default ViewTaskDropdownMenu;
