import { BoardData, Column, Task } from "@/api/boards/index.types";
import { activeBoardAtom, allBoardsAtom } from "@/store/board";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";

export const useEditAddTask = ({
  isEdit,
  status,
  id,
  hideModal,
}: {
  hideModal: () => void;
  isEdit?: boolean;
  status?: string;
  id?: string;
}) => {
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);
  const [allBoards, setAllBoards] = useAtom(allBoardsAtom);

  const handleSubmitAddTask = async (values: {
    title: string;
    description: string;
    subtasks: {
      title: string;
      id: string;
      isCompleted: false;
    }[];
    status: string;
  }) => {
    if (!activeBoard || !values.title.trim().length) return;

    let modifiedActiveBoard;

    if (isEdit && id) {
      // Handle editing an existing task
      const sourceColumn = activeBoard.columns.find(
        (column) => column.name === status
      );
      const targetColumn = activeBoard.columns.find(
        (column) => column.name === values.status
      );

      if (!sourceColumn || !targetColumn) return;

      const updatedSourceColumn: Column = {
        ...sourceColumn,
        tasks:
          sourceColumn.name === values.status
            ? sourceColumn.tasks.map((task) =>
                task.id === id ? { ...task, ...values } : task
              )
            : sourceColumn.tasks.filter((task) => task.id !== id),
      };

      const updatedTargetTask = {
        ...(sourceColumn.tasks.find((task) => task.id === id) as Task),
        subtasks: values.subtasks,
        status: values.status,
        title: values.title,
        description: values.description,
      };

      const updatedTargetColumn = {
        ...targetColumn,
        tasks: [...targetColumn.tasks, updatedTargetTask],
      };

      modifiedActiveBoard = {
        ...activeBoard,
        columns: activeBoard.columns.map((column) => {
          if (column.name === status) {
            return updatedSourceColumn;
          } else if (column.name === values.status) {
            return updatedTargetColumn;
          } else {
            return column;
          }
        }),
      };
    } else {
      // Handle adding a new task
      const modifiedTask = {
        ...values,
        id: uuidv4(),
        subtasks: values.subtasks,
      };

      modifiedActiveBoard = {
        ...activeBoard,
        columns: activeBoard?.columns.map((column) =>
          column.name === values.status
            ? { ...column, tasks: [...column.tasks, modifiedTask] }
            : column
        ),
      };
    }
    const updatedBoardDataArray = allBoards?.map((board: BoardData) =>
      board.id === modifiedActiveBoard.id ? modifiedActiveBoard : board
    );

    localStorage.setItem("activeBoard", JSON.stringify(modifiedActiveBoard));
    localStorage.setItem("boardData", JSON.stringify(updatedBoardDataArray));

    setAllBoards(updatedBoardDataArray);
    setActiveBoard(modifiedActiveBoard);

    hideModal();
  };

  return {
    activeBoard,
    handleSubmitAddTask,
  };
};
