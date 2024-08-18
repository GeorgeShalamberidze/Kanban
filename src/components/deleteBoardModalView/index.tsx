import { useAtom } from "jotai";
import Button from "../button";
import { activeBoardAtom, allBoardsAtom } from "@/store/board";

const DeleteBoardModalView: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);
  const [allBoards, setAllBoards] = useAtom(allBoardsAtom);

  const handleDeleteBoard = () => {
    if (allBoards && activeBoard) {
      const updatedBoards = allBoards.filter(
        (board) => board.name !== activeBoard.name
      );

      setAllBoards(updatedBoards);

      if (updatedBoards.length > 0) {
        setActiveBoard(updatedBoards[0]);
        localStorage.setItem("activeBoard", JSON.stringify(updatedBoards[0]));
      } else {
        setActiveBoard(undefined);
        localStorage.removeItem("activeBoard");
      }
      localStorage.setItem("boardData", JSON.stringify(updatedBoards));
    }
    closeModal();
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-red text-2xl font-bold">Delete this board?</p>
      <p className="text-medium-gray">{`Are you sure you want to delete the '${activeBoard?.name}' board? This action will remove all columns and tasks and cannot be reversed.`}</p>
      <div className="flex w-full gap-4 mb-2">
        <Button
          title="Delete"
          className="w-full flex items-center justify-center rounded-full text-white py-2 bg-red hover:bg-red-hover font-bold"
          onClick={handleDeleteBoard}
        />
        <Button
          title="Cancel"
          onClick={closeModal}
          className="w-full flex items-center justify-center rounded-full text-main-purple bg-light-gray-secondary font-bold"
        />
      </div>
    </div>
  );
};

export default DeleteBoardModalView;
