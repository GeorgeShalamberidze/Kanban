import { getBoardData } from "@/api/boards/api";
import { allBoardsAtom } from "@/store/board";
import { isSidebarOpenAtom } from "@/store/sidebar";
import { themeAtom } from "@/store/theme";
import { useAtom } from "jotai";
import { useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export const useRootLayout = () => {
  const [isThemeDark] = useAtom(themeAtom);
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
  const [_, setAllBoards] = useAtom(allBoardsAtom);

  useEffect(() => {
    getBoardData().then((res) => {
      setAllBoards(res);
      localStorage.setItem("boardData", JSON.stringify(res));
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
