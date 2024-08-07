import KanbanHeader from "@/components/kanbanHeader";
import ShowSideBar from "@/components/showSideBar";
import SideBar from "@/components/sideBar";
import { Outlet } from "react-router";
import { useRootLayout } from "@/layout/useRootLayout";
import Header from "@/components/header";

const RootLayout = () => {
  const { isSidebarOpen, isThemeDark } = useRootLayout();

  return (
    <div className={`${isThemeDark ? "dark" : ""}`}>
      <div
        className={
          "h-screen w-screen bg-light-secondary dark:bg-dark-secondary relative flex"
        }
      >
        <div className="flex flex-col w-full">
          <div className="flex ">
            <KanbanHeader />
            <Header />
          </div>
          <div className="flex h-full overflow-y-scroll no-scrollbar">
            {isSidebarOpen ? <SideBar /> : <ShowSideBar />}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
