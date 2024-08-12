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
  const [t, setT] = useState(tasks);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    card: { id: number; title: number }
  ) => {
    e.dataTransfer.setData("cardId", card.id.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => setActive(false);

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
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: -Infinity,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setActive(false);

    const cardId = e.dataTransfer.getData("cardId");

    const indicators = getIndicators();

    const { element, offset } = getNearestIndicator(e, indicators);

    const before = (element as HTMLElement)?.dataset?.before || "-1";
    if (before !== cardId) {
      let copy = [...t];

      let cardToMove = copy.find((card) => card.id === cardId);

      if (!cardToMove) return;
      cardToMove = { ...cardToMove };
      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack && cardToMove) {
        copy.push(cardToMove);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        if (cardToMove) {
          copy.splice(insertAtIndex, 0, cardToMove);
        }
      }

      setT(copy);
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
      {t.map((task, i) => {
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
