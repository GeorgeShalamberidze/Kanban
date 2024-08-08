import { activeBoardAtom } from "@/store/board";
import { useAtom } from "jotai";
import NoColumns from "./noColumns";
import Columns from "./columns";

const Board: React.FC = () => {
  const [activeBoard] = useAtom(activeBoardAtom);

  return (
    <div className="w-full h-full flex flex-1 overflow-scroll no-scrollbar">
      {activeBoard && activeBoard.columns.length === 0 ? (
        <NoColumns />
      ) : activeBoard && activeBoard.columns.length > 0 ? (
        <Columns boardData={activeBoard} />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-black dark:text-white font-bold text-3xl">
            No Project Selected
          </p>
        </div>
      )}
    </div>
  );
};

export default Board;
