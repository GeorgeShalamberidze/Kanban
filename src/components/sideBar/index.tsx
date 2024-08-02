import AllBoards from "../allBoards";
import ThemeSwitcher from "../themeSwitcher";
import Boards from "../boards";
import HideSideBar from "../hideSideBar";
import KanbanHeader from "../kanbanHeader";
import { boardData } from "@/constants/boardData";

const SideBar: React.FC = () => {
  return (
    <div className="w-full max-w-[300px] flex-shrink-0 bg-white h-full dark:bg-dark-gray flex flex-col border-r border-solid border-lines-light dark:border-lines-dark">
      <KanbanHeader />
      <AllBoards className="text-lg" boardCount={boardData.length} />
      <Boards boards={boardData} />
      <ThemeSwitcher />
      <HideSideBar />
    </div>
  );
};

export default SideBar;
