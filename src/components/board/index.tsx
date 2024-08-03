import { activeBoardAtom } from "@/store/board";
import { useAtom } from "jotai";
import NoColumns from "./noColumns";

const Board: React.FC = () => {
  const [activeBoard] = useAtom(activeBoardAtom);
  return (
    <div className="w-full h-full flex flex-1 overflow-x-scroll no-scrollbar">
      {activeBoard && activeBoard.columns.length === 0 ? (
        <div>Board</div>
      ) : (
        <NoColumns />
      )}
    </div>
  );
};

export default Board;
