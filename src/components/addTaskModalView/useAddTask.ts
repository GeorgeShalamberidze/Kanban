import { BoardData } from "@/api/boards/index.types";
import { activeBoardAtom, allBoardsAtom } from "@/store/board";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";

export const useAddTask = ({ hideModal }: { hideModal: () => void }) => {
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);
  const [allBoards, setAllBoards] = useAtom(allBoardsAtom);

  const handleSubmitAddTask = async (values: {
    title: string;
    description: string;
    subtasks: {
      task: string;
    }[];
    status: string;
  }) => {
    if (!activeBoard || !values.title.trim().length) return;
    /** Create the new task with unique IDs */
    const modifiedTask = {
      ...values,
      id: uuidv4(),
      subtasks: values.subtasks.map((task) => ({
        id: uuidv4(),
        title: task.task,
        isCompleted: false,
      })),
    };

    /** Update the activeBoard with the new task added to the appropriate column */
    const modifiedActiveBoard = {
      ...activeBoard,
      columns: activeBoard?.columns.map((column) =>
        column.name === values.status
          ? { ...column, tasks: [...column.tasks, modifiedTask] }
          : column
      ),
    };

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
