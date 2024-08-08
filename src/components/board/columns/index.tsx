import { useEffect, useRef, useState } from "react";
import { BoardData } from "@/api/boards/index.types";
import ColumnCards from "../columnCards";

type ColumnsPropTypes = {
  boardData: BoardData | undefined;
};

const Columns: React.FC<ColumnsPropTypes> = ({ boardData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      const columns = containerRef.current.querySelectorAll(".column");
      let maxHeight = 0;
      columns.forEach((column) => {
        const height = column.scrollHeight;
        if (height > maxHeight) {
          maxHeight = height;
        }
      });
      setMaxHeight(maxHeight);
    }
  }, [boardData]);

  return (
    <div className="flex gap-6 px-4 py-6 pb-20 h-full" ref={containerRef}>
      {boardData?.columns.map((column, i) => (
        <div key={i} className="w-[280px] column flex flex-col gap-6">
          <div className="flex gap-3 items-center text-medium-gray">
            <div
              className={`w-[15px] h-[15px] rounded-full ${
                column.name === "Todo"
                  ? "bg-[#49C4E5]"
                  : column.name === "Doing"
                    ? "bg-[#8471F2]"
                    : column.name === "Done"
                      ? "bg-[#67E2AE]"
                      : ""
              }`}
            ></div>
            <p>{column.name}</p>
            <span>{`(${column?.tasks?.length ?? 0})`}</span>
          </div>
          <ColumnCards tasks={column.tasks} />
        </div>
      ))}
      <div
        className="w-[280px] flex flex-col gap-6 cursor-pointer mt-[47.5px]"
        style={{ height: maxHeight }}
      >
        <div className="h-full flex justify-center items-center rounded-lg bg-[#E9EFFA] dark:bg-[#2B2C37]/25">
          <button className="text-medium-gray text-xl font-bold">
            + New Column
          </button>
        </div>
      </div>
    </div>
  );
};

export default Columns;
