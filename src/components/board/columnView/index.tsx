import { useEffect, useRef, useState } from "react";
import { BoardData } from "@/api/boards/index.types";
import Column from "../column";
import NewColumn from "../newColumn";

type ColumnsPropTypes = {
  boardData: BoardData | undefined;
};

const Columns: React.FC<ColumnsPropTypes> = ({ boardData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      const columns = containerRef.current.querySelectorAll(".column");
      let arr: number[] = [];
      columns.forEach((column) => {
        const height = column.scrollHeight;
        arr.push(height);
      });
      setMaxHeight(Math.max(...arr));
    }
  }, [boardData]);

  return (
    <div className="flex gap-6 px-4 py-6 pb-5 h-full" ref={containerRef}>
      {boardData?.columns.map((column, i) => (
        <Column
          name={column.name}
          taskLength={column.tasks.length}
          tasks={column.tasks}
          key={i}
          bgColor={column.bgColor}
        />
      ))}
      <NewColumn maxHeight={maxHeight} />
    </div>
  );
};

export default Columns;
