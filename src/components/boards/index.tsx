import BoardIcon from "@/assets/svg/icon-board.svg";
import BoardIconWhite from "@/assets/svg/icon-board-white.svg";
import BoardIconPurple from "@/assets/svg/icon-board-purple.svg";
import { twMerge } from "tailwind-merge";
import { activeBoardAtom } from "@/store/board";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { transformBoardNameToPath } from "@/helpers/transformBoardNameToPath";
import { BoardData } from "@/api/boards/index.types";
import useModal from "@/hooks/useModal";
import Modal from "../modal";
import Input from "../input";
import { ADD_BOARD_FORM_FIELDS } from "./formFields";
import Cross from "@/assets/svg/icon-cross.svg";
import Button from "../button";
import AddBoardModalView from "../addBoardModalView";

const Boards: React.FC<{ boards: Array<BoardData> }> = ({ boards }) => {
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);
  const navigate = useNavigate();
  const { closeModal, isModalOpen, openModal } = useModal();

  return (
    <div className="flex flex-col w-full mx-auto flex-1 overflow-y-auto no-scrollbar">
      {boards.map((item, i) => (
        <div
          key={i}
          className={twMerge(
            "w-[90%] rounded-r-full cursor-pointer",
            `${activeBoard?.id === i ? "bg-main-purple" : "hover:bg-light-secondary"}`
          )}
          onClick={() => {
            setActiveBoard(item);
            localStorage.setItem("activeBoard", JSON.stringify(item));
            navigate(transformBoardNameToPath(item.name));
          }}
        >
          <div
            className={twMerge("flex items-center gap-4 py-4 w-[80%] mx-auto")}
          >
            {activeBoard?.id === i ? (
              <img src={BoardIconWhite} alt="board icon" />
            ) : (
              <img src={BoardIcon} alt="board icon" />
            )}
            <p
              className={`${activeBoard?.id === i ? "text-white" : "text-medium-gray"} font-bold truncate`}
            >
              {item.name}
            </p>
          </div>
        </div>
      ))}
      <div className="w-[90%]" onClick={openModal}>
        <div className="flex items-center gap-4 py-4 w-[80%] mx-auto cursor-pointer text-center">
          <img src={BoardIconPurple} alt="board icon" />
          <p className="text-main-purple font-bold">+ Create New Board</p>
        </div>
      </div>
      {isModalOpen ? (
        <Modal hideModal={closeModal}>
          <AddBoardModalView hideModal={closeModal} />
        </Modal>
      ) : null}
    </div>
  );
};

export default Boards;
