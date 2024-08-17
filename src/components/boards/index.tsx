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

const Boards: React.FC<{ boards: Array<BoardData> }> = ({ boards }) => {
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);
  const navigate = useNavigate();
  const { closeModal, isModalOpen, openModal } = useModal();

  return (
    <div className="flex flex-col w-full mx-auto flex-1">
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
          <div className="bg-white dark:bg-dark-gray flex flex-col gap-6 w-full">
            <div className="text-black dark:text-white font-bold text-lg">
              Add New Board
            </div>
            <Input
              className="w-full border-[#828FA3]/25 bg-white dark:bg-dark-gray dark:text-white"
              label={ADD_BOARD_FORM_FIELDS.board.label}
              name={ADD_BOARD_FORM_FIELDS.board.name}
              placeholder={ADD_BOARD_FORM_FIELDS.board.placeholder}
            />
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4 w-full">
                <Input
                  className="w-full border-[#828FA3]/25 bg-white dark:bg-dark-gray dark:text-white"
                  label={ADD_BOARD_FORM_FIELDS.board_columns.label}
                  name={ADD_BOARD_FORM_FIELDS.board_columns.name}
                  placeholder={ADD_BOARD_FORM_FIELDS.board_columns.placeholder}
                />
                <img
                  src={Cross}
                  alt="x button"
                  className="mt-8 cursor-pointer"
                  onClick={() => console.log("delete board todo")}
                />
              </div>
              <div className="flex items-center justify-between gap-4 w-full">
                <Input
                  required
                  className="w-full border-[#828FA3]/25 bg-white dark:bg-dark-gray dark:text-white"
                  name={ADD_BOARD_FORM_FIELDS.board_columns.name}
                  placeholder={ADD_BOARD_FORM_FIELDS.board_columns.placeholder}
                />
                <img
                  src={Cross}
                  alt="x button"
                  className="cursor-pointer"
                  onClick={() => console.log("delete subtask todo")}
                />
              </div>
              <Button
                title="+ Add New Column"
                className="w-full flex items-center justify-center py-2 rounded-full bg-[#635FC7]/10 dark:bg-white hover:opacity-75 text-main-purple font-bold text-base"
                onClick={() => console.log("Add new Column ! Todo")}
              />
            </div>
            <Button
              title="Create New Board"
              className="w-full flex items-center justify-center py-2 rounded-full bg-main-purple hover:bg-main-purple-hover text-white font-bold text-base"
              onClick={() => console.log("Add new Column ! Todo")}
            />
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Boards;
