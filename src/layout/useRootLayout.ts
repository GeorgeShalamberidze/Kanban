import { getBoardData } from "@/api/boards/api";
import { activeBoardAtom, allBoardsAtom } from "@/store/board";
import { isSidebarOpenAtom } from "@/store/sidebar";
import { themeAtom } from "@/store/theme";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const MOBILE_BREAKPOINT = 768;

export const useRootLayout = () => {
  const [isThemeDark] = useAtom(themeAtom);
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
  const [_, setAllBoards] = useAtom(allBoardsAtom);
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);

  const { boardName } = useParams();

  useEffect(() => {
    getBoardData().then((res) => {
      setAllBoards(res);
      localStorage.setItem("boardData", JSON.stringify(res));

      if (boardName && boardName !== "") {
        const activeProject = res.find(
          (project) =>
            project.name.toLowerCase() ===
            boardName.split("-").join(" ").toLowerCase()
        );

        if (activeProject && activeProject !== undefined) {
          setActiveBoard(activeProject);
          localStorage.setItem("activeBoard", JSON.stringify(activeProject));
        }
      }
    });

    const handleResize = () => {
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    isThemeDark,
    isSidebarOpen,
  };
};
