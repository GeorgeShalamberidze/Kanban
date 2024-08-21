import { BoardData } from "@/api/boards/index.types";
import { activeBoardAtom, allBoardsAtom } from "@/store/board";
import { useAtom } from "jotai";

export const useDeleteTask = ({
  closeModal,
  status,
  id,
}: {
  closeModal: () => void;
  status: string;
  id: string;
}) => {
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);
  const [allBoards, setAllBoards] = useAtom(allBoardsAtom);

  const handleDeleteTask = () => {
    if (activeBoard) {
      const activeBoardCopy = { ...activeBoard };

      const updatedColumns = activeBoardCopy.columns.map((column) =>
        column.name === status
          ? {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== id),
            }
          : column
      );

      const modifiedActiveBoard: BoardData = {
        ...activeBoard,
        columns: updatedColumns,
      };

      const updatedBoardDataArray = allBoards?.map((board: BoardData) =>
        board.id === modifiedActiveBoard.id ? modifiedActiveBoard : board
      );

      localStorage.setItem("activeBoard", JSON.stringify(modifiedActiveBoard));
      localStorage.setItem("boardData", JSON.stringify(updatedBoardDataArray));

      setAllBoards(updatedBoardDataArray);
      setActiveBoard(modifiedActiveBoard);
    }
    closeModal();
  };

  return { handleDeleteTask, activeBoard };
};
