import { BoardData } from "@/api/boards/index.types";
import ColumnCards from "../columnCards";

type ColumnsPropTypes = {
  boardData: BoardData | undefined;
};

const Columns: React.FC<ColumnsPropTypes> = ({ boardData }) => {
  return (
    <div className="flex gap-6 px-4 py-6 pb-20">
      {boardData?.columns.map((column, i) => {
        return (
          <div key={i} className="w-[280px]">
            {column.name === "Todo" ? (
              <div className="flex flex-col gap-6">
                <div className="flex gap-3 items-center text-medium-gray">
                  <div className="w-[15px] h-[15px] bg-[#49C4E5] rounded-full"></div>
                  <p>{column.name}</p>
                  <span>{`(${column?.tasks?.length ?? 0})`}</span>
                </div>
                <ColumnCards title={column.name} tasks={column.tasks} />
              </div>
            ) : column.name === "Doing" ? (
              <div className="flex flex-col gap-6">
                <div className="flex gap-3 items-center text-medium-gray">
                  <div className="w-[15px] h-[15px] bg-[#8471F2] rounded-full"></div>
                  <p>{column.name}</p>
                  <span>{`(${column?.tasks?.length ?? 0})`}</span>
                </div>
                <ColumnCards title={column.name} tasks={column.tasks} />
              </div>
            ) : column.name === "Done" ? (
              <div className="flex flex-col gap-6">
                <div className="flex gap-3 items-center text-medium-gray">
                  <div className="w-[15px] h-[15px] bg-[#67E2AE] rounded-full"></div>
                  <p>{column.name}</p>
                  <span>{`(${column?.tasks?.length ?? 0})`}</span>
                </div>
                <ColumnCards title={column.name} tasks={column.tasks} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Columns;
