import { Task } from "@/api/boards/index.types";
import Card from "../card";

type ColumnCardPropType = {
  title: string;
  tasks: Task[];
};

const ColumnCards: React.FC<ColumnCardPropType> = ({ tasks, title }) => {
  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task, i) => {
        const completedSubTaskCount = task.subtasks.filter(
          (task) => task.isCompleted
        ).length;
        const subTaskCount = task.subtasks.length;

        return (
          // <div
          //   key={i}
          //   className="bg-white dark:bg-dark-gray rounded-lg shadow-md px-4 py-[23px] cursor-pointer flex flex-col gap-2"
          // >
          //   <p className="font-bold text-lg text-black dark:text-white">
          //     {task.title}
          //   </p>
          //   <p className="text-medium-gray dark:text-medium-gray hover:text-medium-gray">{`${completedSubTaskCount} of ${subTaskCount} subtasks`}</p>
          // </div>
          <Card
            key={i}
            completedSubTaskCount={completedSubTaskCount}
            subTaskCount={subTaskCount}
            title={task.title}
          />
        );
      })}
    </div>
  );
};

export default ColumnCards;
