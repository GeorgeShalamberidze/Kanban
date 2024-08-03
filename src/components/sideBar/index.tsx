import AllBoards from "../allBoards";
import ThemeSwitcher from "../themeSwitcher";
import Boards from "../boards";
import HideSideBar from "../hideSideBar";
import { useAtom } from "jotai";
import { allBoardsAtom } from "@/store/board";

const SideBar: React.FC = () => {
  const [allBoards] = useAtom(allBoardsAtom);

  return (
    <div className="w-full max-w-[300px] flex-shrink-0 bg-white h-full dark:bg-dark-gray flex flex-col border-r border-solid border-lines-light dark:border-lines-dark">
      {allBoards && allBoards.length > 0 ? (
        <>
          <AllBoards className="text-lg" boardCount={allBoards.length} />
          <Boards boards={allBoards} />
        </>
      ) : null}
      <ThemeSwitcher />
      <HideSideBar />
    </div>
  );
};

export default SideBar;
