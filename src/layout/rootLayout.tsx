import KanbanHeader from "@/components/kanbanHeader";
import ShowSideBar from "@/components/showSideBar";
import SideBar from "@/components/sideBar";
import { isSidebarOpenAtom } from "@/store/sidebar";
import { themeAtom } from "@/store/theme";
import { useAtom } from "jotai";
import { Outlet } from "react-router";

const RootLayout = () => {
  const [isThemeDark] = useAtom(themeAtom);
  const [isSidebarOpen] = useAtom(isSidebarOpenAtom);

  return (
    <div className={`${isThemeDark ? "dark" : ""}`}>
      <div
        className={
          "h-screen w-screen bg-light-secondary dark:bg-dark-secondary relative"
        }
      >
        {isSidebarOpen ? (
          <SideBar />
        ) : (
          <>
            <KanbanHeader />
            <ShowSideBar />
          </>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
