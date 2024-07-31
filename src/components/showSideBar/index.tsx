import EyeShow from "@/assets/svg/icon-show-sidebar.svg";
import { isSidebarOpenAtom } from "@/store/sidebar";
import { useAtom } from "jotai";

const ShowSideBar: React.FC = () => {
  const [_, isSidebarOpen] = useAtom(isSidebarOpenAtom);
  return (
    <div
      className="w-14 h-12 absolute left-0 bottom-8 bg-main-purple hover:bg-main-purple-hover rounded-r-full flex items-center justify-center cursor-pointer"
      onClick={() => isSidebarOpen(true)}
    >
      <img src={EyeShow} alt="open eye" className="mr-2" />
    </div>
  );
};

export default ShowSideBar;
