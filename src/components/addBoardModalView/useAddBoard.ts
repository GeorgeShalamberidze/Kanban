import { generateRandomColor } from "@/helpers/generateRandomColor";
import { transformBoardNameToPath } from "@/helpers/transformBoardNameToPath";
import { activeBoardAtom, allBoardsAtom } from "@/store/board";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export const useAddBoard = ({ hideModal }: { hideModal: () => void }) => {
  const [allBoards, setAllBoards] = useAtom(allBoardsAtom);
  const [_, setActiveBoard] = useAtom(activeBoardAtom);
  const navigate = useNavigate();

  const handleSubmit = (values: {
    boardName: string;
    boardColumns: {
      name: string;
    }[];
  }) => {
    const lastBoard = allBoards?.[allBoards.length - 1];
    const id = typeof lastBoard?.id === "number" ? lastBoard.id + 1 : 0;

    const newBoard = {
      id,
      name: values.boardName,
      columns: values.boardColumns.map((column) => ({
        name: column.name,
        tasks: [],
        bgColor: generateRandomColor(),
      })),
    };

    setAllBoards((prev) => (!prev ? prev : [...prev, newBoard]));
    setActiveBoard(newBoard);
    if (allBoards && allBoards.length > 0) {
      localStorage.setItem(
        "boardData",
        JSON.stringify([...allBoards, newBoard])
      );
    } else {
      localStorage.setItem("boardData", JSON.stringify([newBoard]));
    }
    localStorage.setItem("activeBoard", JSON.stringify(newBoard));
    navigate(transformBoardNameToPath(newBoard.name));
    hideModal();
  };

  return {
    handleSubmit,
  };
};
