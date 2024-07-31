import BoardIcon from "@/assets/svg/icon-board.svg";
import BoardIconWhite from "@/assets/svg/icon-board-white.svg";
import BoardIconPurple from "@/assets/svg/icon-board-purple.svg";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const Boards: React.FC<{ boards: Array<string> }> = ({ boards }) => {
  const [active, setActive] = useState<number | undefined>(0);

  return (
    <div className="flex flex-col w-full mx-auto flex-1">
      {boards.map((item, i) => (
        <div
          className={twMerge(
            "w-[90%] rounded-r-full",
            `${active === i ? "bg-main-purple" : "hover:bg-light-secondary"}`
          )}
        >
          <div
            key={i}
            className={twMerge(
              "flex items-center gap-4 py-4 w-[80%] mx-auto cursor-pointer"
            )}
            onClick={() => setActive(i)}
          >
            {active === i ? (
              <img src={BoardIconWhite} alt="board icon" />
            ) : (
              <img src={BoardIcon} alt="board icon" />
            )}
            <p
              className={`${active === i ? "text-white" : "text-medium-gray"} font-bold`}
            >
              {item}
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
