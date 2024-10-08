import KanbanIcon from "@/assets/svg/kanban.svg";
import { isSidebarOpenAtom } from "@/store/sidebar";
import { useAtom } from "jotai";
import { twMerge } from "tailwind-merge";

const KanbanHeader: React.FC = () => {
  const [isSidebarOpen] = useAtom(isSidebarOpenAtom);

  return (
    <div
      className={twMerge(
        "pl-[34px] py-8 pb-10 bg-white dark:bg-dark-gray w-full max-w-[300px] h-[97px] items-center hidden md:flex border-r border-solid border-lines-light dark:border-lines-dark",
        `${!isSidebarOpen ? "border-b border-solid border-lines-light dark:border-lines-dark" : ""}`
      )}
    >
      <div className="flex items-center gap-4 cursor-pointer w-fit text-center">
        <img src={KanbanIcon} alt="kanban logo" />
        <p className="text-dark-gray text-2xl font-bold dark:text-white">
          kanban
        </p>
      </div>
    </div>
  );
};

export default KanbanHeader;
