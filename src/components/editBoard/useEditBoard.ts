import { BoardData, Column } from "@/api/boards/index.types";
import { generateRandomColor } from "@/helpers/generateRandomColor";
import { activeBoardAtom, allBoardsAtom } from "@/store/board";
import { useAtom } from "jotai";

export const useEditBoard = ({
  isColumnUpdate,
  hideModal,
}: {
  isColumnUpdate: boolean;
  hideModal: () => void;
}) => {
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);
  const [allBoards, setAllBoards] = useAtom(allBoardsAtom);

  const handleSubmit = (values: {
    boardName: string | undefined;
    boardColumns: Column[];
  }) => {
    const updatedColumns = [
      ...(values?.boardColumns || []).map((column: Column) =>
        column.tasks
          ? column
          : { name: column.name, tasks: [], bgColor: generateRandomColor() }
      ),
    ];

    const updatedBoard = {
      ...activeBoard,
      name:
        values.boardName && values.boardName !== activeBoard?.name
          ? values.boardName
          : activeBoard?.name!,
      columns: updatedColumns,
    };

    const updatedBoardDataArray = allBoards?.map((board: BoardData) =>
      board.id === updatedBoard.id ? updatedBoard : board
    );
    setAllBoards(updatedBoardDataArray as BoardData[]);
    setActiveBoard((prev) => {
      if (!prev) return prev;

      return { ...prev, ...updatedBoard };
    });

    localStorage.setItem("boardData", JSON.stringify(updatedBoardDataArray));
    localStorage.setItem("activeBoard", JSON.stringify(updatedBoard));

    if (isColumnUpdate) {
      const boardIndex = allBoards?.findIndex(
        (board) => board.name === activeBoard?.name
      );

      const updatedBoards = allBoards?.map((board, index) =>
        index === boardIndex
          ? {
              ...board,
              name: values.boardName ? values.boardName : board.name,
            }
          : board
      );

      setAllBoards((prev) => {
        if (!prev) return prev;
        return updatedBoards;
      });
      localStorage.setItem("activeBoard", JSON.stringify(updatedBoard));
    }

    hideModal();
  };

  return {
    handleSubmit,
    activeBoard,
  };
};
