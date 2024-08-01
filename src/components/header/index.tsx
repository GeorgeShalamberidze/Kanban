import { activeBoardAtom } from "@/store/board";
import { useAtom } from "jotai";
import Dots from "@/assets/svg/vertical-dots.svg";

const Header: React.FC = () => {
  const [activeBoard] = useAtom(activeBoardAtom);
  return (
    <div className="w-full min-h-fit h-[97px] flex items-center justify-between border-b border-solid border-lines-light dark:border-lines-dark bg-white dark:bg-dark-gray  px-8">
      <p className="text-2xl font-bold text-black dark:text-white">
        {activeBoard?.board}
      </p>
      <div className="flex gap-6">
        <div className="bg-main-purple hover:bg-main-purple-hover rounded-full text-white py-[15px] px-[25px] cursor-pointer">
          <p>+ Add New Task</p>
        </div>
        <img src={Dots} alt="vertical dots" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
