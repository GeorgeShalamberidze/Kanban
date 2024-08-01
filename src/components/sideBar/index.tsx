import AllBoards from "../allBoards";
import ThemeSwitcher from "../themeSwitcher";
import Boards from "../boards";
import HideSideBar from "../hideSideBar";
import KanbanHeader from "../kanbanHeader";

const testData = [
  {
    board: "Platform Launch",
    id: 0,
  },
  {
    board: "Marketing Plan",
    id: 1,
  },
  {
    board: "Roadmap",
    id: 2,
  },
];

const SideBar: React.FC = () => {
  return (
    <div className="w-full max-w-[300px] flex-shrink-0 bg-white h-full dark:bg-dark-gray flex flex-col border-r border-solid border-lines-light dark:border-lines-dark">
      <KanbanHeader />
      <AllBoards boardCount={3} />
      <Boards boards={testData} />
      <ThemeSwitcher />
      <HideSideBar />
    </div>
  );
};

export default SideBar;
