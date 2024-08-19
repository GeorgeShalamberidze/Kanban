import { getBoardData } from "@/api/boards/api";
import { BoardData } from "@/api/boards/index.types";
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
  const [__, setActiveBoard] = useAtom(activeBoardAtom);

  const { boardName } = useParams();

  const updateActiveBoard = (boardData: BoardData[], boardName: string) => {
    const activeProject = boardData?.find(
      (project: BoardData) =>
        project.name.toLowerCase() ===
        boardName.split("-").join(" ").toLowerCase()
    );

    if (activeProject) {
      setActiveBoard(activeProject);
      localStorage.setItem("activeBoard", JSON.stringify(activeProject));
    }
  };

  useEffect(() => {
    const storedBoardData = localStorage.getItem("boardData");
    const storedActiveBoard = localStorage.getItem("activeBoard");

    if (storedBoardData) {
      const parsedBoardData: BoardData[] = JSON.parse(storedBoardData);
      setAllBoards(parsedBoardData);

      if (storedActiveBoard) {
        setActiveBoard(JSON.parse(storedActiveBoard));
      } else if (boardName && boardName !== "") {
        updateActiveBoard(parsedBoardData, boardName);
      }
    } else {
      getBoardData().then((res) => {
        setAllBoards(res);
        localStorage.setItem("boardData", JSON.stringify(res));

        if (boardName && boardName !== "") {
          updateActiveBoard(res, boardName);
        }
      });
    }

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
