import { BoardData, Column, Subtask, Task } from "@/api/boards/index.types";
import { activeBoardAtom, allBoardsAtom } from "@/store/board";
import { useAtom } from "jotai";

export const useViewTask = ({
  id,
  status,
  hideModal,
}: {
  id: string;
  status: string;
  hideModal: () => void;
}) => {
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);
  const [allBoards, setAllBoards] = useAtom(allBoardsAtom);

  const handleEditTask = (values: {
    currentStatus: string;
    subTasks: Subtask[];
  }) => {
    if (!activeBoard) return;

    const sourceColumn = activeBoard.columns.find(
      (column) => column.name === status
    );
    const targetColumn = activeBoard.columns.find(
      (column) => column.name === values.currentStatus
    );

    if (!sourceColumn || !targetColumn) return;

    const updatedSourceColumn: Column = {
      ...sourceColumn,
      tasks:
        sourceColumn.name === values.currentStatus
          ? sourceColumn.tasks.map((task) =>
              task.id === id
                ? {
                    ...task,
                    subtasks: values.subTasks,
                  }
                : task
            )
          : sourceColumn.tasks.filter((task) => task.id !== id),
    };

    const updatedTargetTask = {
      ...(sourceColumn.tasks.find((task) => task.id === id) as Task),
      subtasks: values.subTasks,
      status: values.currentStatus,
    };

    const updatedTargetColumn = {
      ...targetColumn,
      tasks: [...targetColumn.tasks, updatedTargetTask],
    };

    const updatedBoardData = {
      ...activeBoard,
      columns: activeBoard.columns.map((column) => {
        if (column.name === status) {
          return updatedSourceColumn;
        } else if (column.name === values.currentStatus) {
          return updatedTargetColumn;
        } else {
          return column;
        }
      }),
    };

    const updatedBoardDataArray = allBoards?.map((board: BoardData) =>
      board.id === updatedBoardData.id ? updatedBoardData : board
    );

    setAllBoards(updatedBoardDataArray);
    setActiveBoard(updatedBoardData);

    localStorage.setItem("boardData", JSON.stringify(updatedBoardDataArray));
    localStorage.setItem("activeBoard", JSON.stringify(updatedBoardData));
    hideModal();
  };

  return {
    activeBoard,
    handleEditTask,
  };
};
