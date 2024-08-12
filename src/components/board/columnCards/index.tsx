import { Task } from "@/api/boards/index.types";
import Card from "../card";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type ColumnCardPropType = {
  tasks: Task[];
  columnName: string;
};

const ColumnCards: React.FC<ColumnCardPropType> = ({ tasks, columnName }) => {
  const [active, setActive] = useState<boolean>(false);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    card: { id: number; title: number }
  ) => {
    e.dataTransfer.setData("cardId", card.id.toString());
    console.log(card);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => setActive(false);

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setActive(false);

    const cardId = e.dataTransfer.getData("cardId");
  };

  return (
    <div
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      className={twMerge(
        "flex flex-col gap-4 h-full",
        `${active ? "bg-neutral-500/50" : ""}`
      )}
    >
      {tasks.map((task, i) => {
        const completedSubTaskCount = task.subtasks.filter(
          (task) => task.isCompleted
        ).length;
        const subTaskCount = task.subtasks.length;

        return (
          <Card
            columnName={columnName}
            id={task.id}
            key={i}
            handleDragStart={handleDragStart}
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
