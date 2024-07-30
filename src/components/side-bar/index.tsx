import KanbanIcon from "@/assets/svg/kanban.svg";
import { themeAtom } from "@/store/theme";
import { useAtom } from "jotai";
import { twMerge } from "tailwind-merge";

const SideBar: React.FC = () => {
  const [theme] = useAtom(themeAtom);
  return (
    <div className="w-full max-w-[300px] flex-shrink-0">
      <div className="flex items-center gap-4 pl-[34px] pt-8 pb-14">
        <img src={KanbanIcon} alt="kanban logo" />
        <p className={twMerge(`headingXL-${theme}`)}>kanban</p>
      </div>
    </div>
  );
};

export default SideBar;
