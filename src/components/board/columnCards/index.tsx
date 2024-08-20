import { BoardData, Column, Task } from "@/api/boards/index.types";
import Card from "../card";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAtom } from "jotai";
import { activeBoardAtom, allBoardsAtom } from "@/store/board";
import { useColumnCards } from "./useColumnCards";

type ColumnCardPropType = {
  tasks: Task[];
  columnName: string;
};

const ColumnCards: React.FC<ColumnCardPropType> = ({ tasks, columnName }) => {
  const {
    handleDragEnd,
    handleDragLeave,
    handleDragOver,
    handleDragStart,
    active,
  } = useColumnCards({ columnName, tasks });

  return (
    <div
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      className={twMerge(
        "flex flex-col gap-1 h-full px-2 w-full",
        `${active ? "bg-gray-500/50 rounded-lg w-full" : ""}`
      )}
    >
      {tasks.map((task, i) => {
        const completedSubTaskCount = task?.subtasks?.filter(
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
            description={task.description}
            status={task.status}
            subTasks={task.subtasks}
          />
        );
      })}
    </div>
  );
};

export default ColumnCards;
