import { Task } from "@/api/boards/index.types";
import ColumnCards from "../columnCards";
import { twMerge } from "tailwind-merge";

type ColumnPropType = {
  name: string;
  taskLength: number;
  tasks: Task[];
  bgColor: string;
};

const Column: React.FC<ColumnPropType> = ({
  name,
  taskLength,
  tasks,
  bgColor,
}) => {
  return (
    <div
      className={twMerge("w-[280px] column flex flex-col gap-[14px] h-full")}
    >
      <div className="flex gap-3 items-center text-medium-gray">
        <div className="flex gap-3 items-center text-medium-gray">
          <div
            className={twMerge(
              "w-[15px] h-[15px] rounded-full",
              `bg-[${bgColor}]`
            )}
            style={{
              backgroundColor: bgColor,
            }}
          ></div>
        </div>
        <p>{name}</p>
        <span>{`(${taskLength ?? 0})`}</span>
      </div>
      <ColumnCards tasks={tasks} columnName={name} />
    </div>
  );
};

export default Column;
