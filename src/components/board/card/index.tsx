import DropIndicator from "@/components/dropIndicator";
import ViewTaskModalView from "@/components/viewTaskModalView";
import Modal from "@/components/modal";
import useModal from "@/hooks/useModal";
import { Subtask } from "@/api/boards/index.types";
import { AnimatePresence, motion } from "framer-motion";

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
      <AnimatePresence mode="popLayout">
        <motion.div
          key={id}
          layout
          draggable
          layoutId={id}
          onDragStart={(e: any) => handleDragStart(e, { id, title, status })}
          className="bg-white dark:bg-dark-gray rounded-lg shadow-md px-4 py-[23px] cursor-pointer flex flex-col gap-2 active:cursor-grabbing"
          onClick={openModal}
        >
          <p className="font-bold text-[15px] text-black dark:text-white">
            {title}
          </p>
          <p className="text-medium-gray dark:text-medium-gray hover:text-medium-gray">{`${completedSubTaskCount} of ${subTaskCount} subtasks`}</p>
        </motion.div>
      </AnimatePresence>
      {isModalOpen && (
        <Modal hideModal={closeModal}>
          <ViewTaskModalView
            id={id}
            title={title}
            description={description}
            status={status}
            subTasks={subTasks}
            completedSubTaskCount={completedSubTaskCount}
            hideModal={closeModal}
          />
        </Modal>
      )}
    </>
  );
};

export default Card;
