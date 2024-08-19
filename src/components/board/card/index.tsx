import DropIndicator from "@/components/dropIndicator";
import EditTaskModalView from "@/components/editTaskModalView";
import Modal from "@/components/modal";
import useModal from "@/hooks/useModal";
import { Subtask } from "@/api/boards/index.types";
import { motion } from "framer-motion";

type CardPropType = {
  id: string;
  title: string;
  completedSubTaskCount: number;
  subTaskCount: number;
  columnName: string;
  description: string;
  status: string;
  subTasks: Subtask[];
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: any) => void;
};

const Card: React.FC<CardPropType> = ({
  id,
  completedSubTaskCount,
  subTaskCount,
  columnName,
  title,
  description,
  status,
  subTasks,
  handleDragStart,
}) => {
  const { closeModal, isModalOpen, openModal } = useModal();
  return (
    <>
      <DropIndicator beforeId={id} column={columnName} />
      <motion.div
        layout
        layoutId={id}
        draggable
        onDragStart={(e: any) => handleDragStart(e, { id, title })}
        className="bg-white dark:bg-dark-gray rounded-lg shadow-md px-4 py-[23px] cursor-pointer flex flex-col gap-2 active:cursor-grabbing"
        onClick={openModal}
      >
        <p className="font-bold text-[15px] text-black dark:text-white">
          {title}
        </p>
        <p className="text-medium-gray dark:text-medium-gray hover:text-medium-gray">{`${completedSubTaskCount} of ${subTaskCount} subtasks`}</p>
      </motion.div>
      {isModalOpen && (
        <Modal hideModal={closeModal}>
          <EditTaskModalView
            id={id}
            title={title}
            description={description}
            status={status}
            subTasks={subTasks}
            completedSubTaskCount={completedSubTaskCount}
          />
        </Modal>
      )}
    </>
  );
};

export default Card;
