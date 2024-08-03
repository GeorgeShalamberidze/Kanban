import BoardIcon from "@/assets/svg/icon-board.svg";
import BoardIconWhite from "@/assets/svg/icon-board-white.svg";
import BoardIconPurple from "@/assets/svg/icon-board-purple.svg";
import { twMerge } from "tailwind-merge";
import { activeBoardAtom } from "@/store/board";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { transformBoardNameToPath } from "@/helpers/transformBoardNameToPath";

const Boards: React.FC<{ boards: Array<{ board: string; id: number }> }> = ({
  boards,
}) => {
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);
  const navigate = useNavigate();

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
            navigate(transformBoardNameToPath(item.board));
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
              className={`${activeBoard?.id === i ? "text-white" : "text-medium-gray"} font-bold`}
            >
              {item.board}
            </p>
          </div>
        </div>
      ))}
      <div className="w-[90%]">
        <div className="flex items-center gap-4 py-4 w-[80%] mx-auto cursor-pointer text-center">
          <img src={BoardIconPurple} alt="board icon" />
          <p className="text-main-purple font-bold">+ Create New Board</p>
        </div>
      </div>
    </div>
  );
};

export default Boards;
