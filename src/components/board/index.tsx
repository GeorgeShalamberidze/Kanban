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
      ) : (
        <Columns boardData={activeBoard} />
      )}
    </div>
  );
};

export default Board;
