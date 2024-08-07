type CardPropType = {
  title: string;
  completedSubTaskCount: number;
  subTaskCount: number;
};

const Card: React.FC<CardPropType> = ({
  completedSubTaskCount,
  subTaskCount,
  title,
}) => {
  return (
    <div className="bg-white dark:bg-dark-gray rounded-lg shadow-md px-4 py-[23px] cursor-pointer flex flex-col gap-2">
      <p className="font-bold text-lg text-black dark:text-white">{title}</p>
      <p className="text-medium-gray dark:text-medium-gray hover:text-medium-gray">{`${completedSubTaskCount} of ${subTaskCount} subtasks`}</p>
    </div>
  );
};

export default Card;
