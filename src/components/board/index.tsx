import { activeBoardAtom } from "@/store/board";
import { useAtom } from "jotai";
import NoColumns from "./noColumns";
import Calendar from "../calendar";

const Board: React.FC = () => {
  const [activeBoard] = useAtom(activeBoardAtom);
  return (
    <div className="w-full h-full flex flex-1 overflow-x-scroll no-scrollbar">
      {activeBoard && activeBoard.columns.length === 0 ? (
        <NoColumns />
      ) : (
        <div>
          <Calendar />
        </div>
      )}
    </div>
  );
};

export default Board;
