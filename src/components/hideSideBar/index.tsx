import EyeIcon from "@/assets/svg/icon-hide-sidebar.svg";
import EyeIconPurple from "@/assets/svg/icon-show-sidebar-purple.svg";
import { isSidebarOpenAtom } from "@/store/sidebar";
import { useAtom } from "jotai";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const HideSideBar: React.FC = () => {
  const [_, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
  const [isSidebarHovered, setIsSidebarHovered] = useState<boolean>(false);

  return (
    <div className="flex w-full mx-auto mt-2 mb-8">
      <div
        className="w-[90%] hover:bg-light-secondary py-[14px] rounded-r-full cursor-pointer"
        onClick={() => setIsSidebarOpen(false)}
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
      >
        <div className="w-[80%] flex items-center mx-auto gap-4">
          {!isSidebarHovered ? (
            <img src={EyeIcon} alt="eye" />
          ) : (
            <img src={EyeIconPurple} alt="eye purple" />
          )}
          <p
            className={twMerge(
              "text-[15px] font-bold  text-medium-gray transition-none",
              `${isSidebarHovered && "text-main-purple"}`
            )}
          >
            Hide Sidebar
          </p>
        </div>
      </div>
    </div>
  );
};

export default HideSideBar;
