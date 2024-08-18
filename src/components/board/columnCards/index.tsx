import { Column, Task } from "@/api/boards/index.types";
import Card from "../card";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAtom } from "jotai";
import { activeBoardAtom } from "@/store/board";

type ColumnCardPropType = {
  tasks: Task[];
  columnName: string;
};

const ColumnCards: React.FC<ColumnCardPropType> = ({ tasks, columnName }) => {
  const [active, setActive] = useState<boolean>(false);
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    card: { id: string; title: number }
  ) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(`[data-column="${columnName}"]`)
    );
  };

  const getNearestIndicator = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: Element[]
  ) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setActive(false);

    const cardId = e.dataTransfer.getData("cardId");

    const cardToMove = tasks.find((task) => task.id == cardId);
    if (!cardToMove) return;

    const columnToUpdate = activeBoard?.columns.filter(
      (val) => val.name == cardToMove.status
    );

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = (element as HTMLElement).dataset.before || "-1";

    if (!columnToUpdate) return;
    const idx = columnToUpdate[0].tasks.findIndex((v) => v.id == before);

    if (idx === -1) return;
    else {
      let updatedTasks = [...columnToUpdate[0].tasks];
      updatedTasks = updatedTasks.filter((c) => c.id !== cardId);

      updatedTasks.splice(idx, 0, cardToMove);

      const updatedColumn = {
        ...columnToUpdate[0],
        tasks: updatedTasks,
      };

      const updatedColumns = activeBoard?.columns.map((column) =>
        column.name === updatedColumn.name ? updatedColumn : column
      ) as Column[];

      setActiveBoard((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          columns: updatedColumns,
        };
      });
    }
  };

  return (
    <div
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      className={twMerge(
        "flex flex-col gap-1 h-full",
        `${active ? "bg-neutral-500/50" : ""}`
      )}
    >
      {tasks.map((task, i) => {
        const completedSubTaskCount = task.subtasks.filter(
          (task) => task.isCompleted
        ).length;
        const subTaskCount = task.subtasks.length;
        console.log(task);
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
