import { Task } from "@/api/boards/index.types";
import ColumnCards from "../columnCards";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type ColumnPropType = {
  name: string;
  taskLength: number;
  tasks: Task[];
};

const Column: React.FC<ColumnPropType> = ({ name, taskLength, tasks }) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className={twMerge("w-[280px] column flex flex-col gap-6")}>
      <div className="flex gap-3 items-center text-medium-gray">
        <div
          className={`w-[15px] h-[15px] rounded-full ${
            name === "Todo"
              ? "bg-[#49C4E5]"
              : name === "Doing"
                ? "bg-[#8471F2]"
                : name === "Done"
                  ? "bg-[#67E2AE]"
                  : ""
          }`}
        ></div>
        <p>{name}</p>
        <span>{`(${taskLength ?? 0})`}</span>
      </div>
      <ColumnCards tasks={tasks} />
    </div>
  );
};

export default Column;
