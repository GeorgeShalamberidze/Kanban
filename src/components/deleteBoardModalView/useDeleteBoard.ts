import { activeBoardAtom, allBoardsAtom } from "@/store/board";
import { useAtom } from "jotai";

export const useDeleteBoard = ({ closeModal }: { closeModal: () => void }) => {
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);
  const [allBoards, setAllBoards] = useAtom(allBoardsAtom);

  const handleDeleteBoard = () => {
    if (allBoards && activeBoard) {
      const updatedBoards = allBoards
        .filter((board) => board.id !== activeBoard.id)
        .map((board, id) => ({
          ...board,
          id,
        }));

      setAllBoards(updatedBoards);

      if (updatedBoards.length > 0) {
        setActiveBoard(updatedBoards[0] ?? []);
        localStorage.setItem("activeBoard", JSON.stringify(updatedBoards[0]));
      } else {
        setActiveBoard(undefined);
        localStorage.removeItem("activeBoard");
      }
      localStorage.setItem("boardData", JSON.stringify(updatedBoards));
    }
    closeModal();
  };

  return { handleDeleteBoard, activeBoard };
};
