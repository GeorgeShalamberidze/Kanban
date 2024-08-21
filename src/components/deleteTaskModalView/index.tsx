import Button from "../button";
import { useDeleteTask } from "./useDeleteTask";

const DeleteTaskModalView: React.FC<{
  closeModal: () => void;
  id: string;
  status: string;
  title: string;
}> = ({ closeModal, status, id, title }) => {
  const { handleDeleteTask } = useDeleteTask({
    closeModal,
    status,
    id,
  });

  return (
    <div className="flex flex-col gap-6">
      <p className="text-red text-2xl font-bold">Delete this task?</p>
      <p className="text-medium-gray">{`Are you sure you want to delete the '${title}' task and its subtasks? This action cannot be reversed.`}</p>
      <div className="flex w-full gap-4 mb-8">
        <Button
          title="Delete"
          className="w-full flex items-center justify-center rounded-full text-white py-2 bg-red hover:bg-red-hover font-bold"
          onClick={handleDeleteTask}
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

export default DeleteTaskModalView;
