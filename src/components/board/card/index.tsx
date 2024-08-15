import DropIndicator from "@/components/dropIndicator";
import { motion } from "framer-motion";

type CardPropType = {
  id: string;
  title: string;
  completedSubTaskCount: number;
  subTaskCount: number;
  columnName: string;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: any) => void;
};

const Card: React.FC<CardPropType> = ({
  id,
  completedSubTaskCount,
  subTaskCount,
  columnName,
  title,
  handleDragStart,
}) => {
  return (
    <>
      <DropIndicator beforeId={id} column={columnName} />
      <motion.div
        layout
        layoutId={id}
        draggable
        onDragStart={(e: any) => handleDragStart(e, { id, title })}
        className="bg-white dark:bg-dark-gray rounded-lg shadow-md px-4 py-[23px] cursor-pointer flex flex-col gap-2 active:cursor-grabbing"
      >
        <p className="font-bold text-[15px] text-black dark:text-white">
          {title}
        </p>
        <p className="text-medium-gray dark:text-medium-gray hover:text-medium-gray">{`${completedSubTaskCount} of ${subTaskCount} subtasks`}</p>
      </motion.div>
    </>
  );
};

export default Card;
