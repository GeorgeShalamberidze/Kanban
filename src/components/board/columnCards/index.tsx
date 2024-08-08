import { Task } from "@/api/boards/index.types";
import Card from "../card";

type ColumnCardPropType = {
  tasks: Task[];
};

const ColumnCards: React.FC<ColumnCardPropType> = ({ tasks }) => {
  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task, i) => {
        const completedSubTaskCount = task.subtasks.filter(
          (task) => task.isCompleted
        ).length;
        const subTaskCount = task.subtasks.length;

        return (
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
