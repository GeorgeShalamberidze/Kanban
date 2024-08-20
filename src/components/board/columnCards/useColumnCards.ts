import { BoardData, Column, Task } from "@/api/boards/index.types";
import { activeBoardAtom, allBoardsAtom } from "@/store/board";
import { useAtom } from "jotai";
import { useState } from "react";

export const useColumnCards = ({
  tasks,
  columnName,
}: {
  tasks: Task[];
  columnName: string;
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);
  const [allBoards, setAllBoards] = useAtom(allBoardsAtom);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    card: { id: string; title: number; status: string }
  ) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("cardStatus", card.status);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  /** TODO */
  /**
   * 1) Create edit task modal view
   */

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
    const statusOfCardToMove = e.dataTransfer.getData("cardStatus");

    const cardToMove = tasks.find((task) => task.id == cardId);

    if (!cardToMove) {
      if (!activeBoard) return;
      const sourceColumn = activeBoard.columns.find(
        (column) => column.name === statusOfCardToMove
      );
      const targetColumn = activeBoard.columns.find(
        (column) => column.name === columnName
      );

      if (!sourceColumn || !targetColumn) return;

      const updatedSourceColumn: Column = {
        ...sourceColumn,
        tasks: sourceColumn.tasks.filter((task) => task.id !== cardId),
      };

      const updatedTargetTask: Task = {
        ...(sourceColumn.tasks.find((task) => task.id === cardId) as Task),
        status: targetColumn.name,
      };

      const updatedTargetColumn: Column = {
        ...targetColumn,
        tasks: [...targetColumn.tasks, updatedTargetTask],
      };

      const updatedBoardData: BoardData = {
        ...activeBoard,
        columns: activeBoard.columns.map((column) => {
          if (column.name === statusOfCardToMove) {
            return updatedSourceColumn;
          } else if (column.name === columnName) {
            return updatedTargetColumn;
          } else {
            return column;
          }
        }),
      };
      const updatedBoardDataArray = allBoards?.map((board: BoardData) =>
        board.id === updatedBoardData.id ? updatedBoardData : board
      );

      setActiveBoard(updatedBoardData);
      setAllBoards(updatedBoardDataArray);
      localStorage.setItem("activeBoard", JSON.stringify(updatedBoardData));
      localStorage.setItem("boardData", JSON.stringify(updatedBoardDataArray));
    } else {
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
    }
  };

  return {
    active,
    handleDragEnd,
    handleDragLeave,
    handleDragOver,
    handleDragStart,
  };
};
