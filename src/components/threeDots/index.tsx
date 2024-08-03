import Dots from "@/assets/svg/vertical-dots.svg";
import useDropDown from "@/hooks/useDropdown";
import DropDown from "../dropdown";
import Button from "../button";
import useModal from "@/hooks/useModal";
import Modal from "../modal";
import { activeBoardAtom } from "@/store/board";
import { useAtom } from "jotai";

const ThreeDots: React.FC = () => {
  const { isDropDownOpen, closeDropDown, openDropDown } = useDropDown();
  const { isModalOpen, closeModal, openModal } = useModal();
  const [activeBoard] = useAtom(activeBoardAtom);

  return (
    <div className="relative flex justify-center">
      <img
        src={Dots}
        alt="vertical dots"
        className="cursor-pointer"
        onClick={openDropDown}
      />
      {isDropDownOpen && (
        <DropDown
          hideDropDown={closeDropDown}
          className="bg-white top-20 right-0 flex flex-col w-48 p-4 gap-4"
        >
          <Button
            title="Edit Board"
            className="text-medium-gray cursor-pointer hover:opacity-75"
          />
          <Button
            title="Delete Board"
            className="text-red cursor-pointer hover:opacity-75"
            onClick={() => {
              closeDropDown();
              openModal();
            }}
          />
        </DropDown>
      )}
      {isModalOpen && (
        <Modal className="p-8" hideModal={closeModal}>
          <div className="flex flex-col gap-6">
            <p className="text-red text-2xl font-bold">Delete this board?</p>
            <p className="text-medium-gray">{`Are you sure you want to delete the '${activeBoard?.name}' board? This action will remove all columns and tasks and cannot be reversed.`}</p>
            <div className="flex w-full gap-4 mb-2">
              <Button
                title="Delete"
                onClick={() => console.log("Delete clicked!")}
                className="w-full flex items-center justify-center rounded-full text-white py-2 bg-red hover:bg-red-hover font-bold"
              />
              <Button
                title="Cancel"
                onClick={closeModal}
                className="w-full flex items-center justify-center rounded-full text-main-purple bg-light-gray-secondary font-bold"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ThreeDots;
