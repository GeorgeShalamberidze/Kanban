import KanbanHeader from "@/components/kanbanHeader";
import ShowSideBar from "@/components/showSideBar";
import SideBar from "@/components/sideBar";
import { Outlet } from "react-router";
import { useRootLayout } from "@/layout/useRootLayout";

const RootLayout = () => {
  const { isSidebarOpen, isThemeDark } = useRootLayout();

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
