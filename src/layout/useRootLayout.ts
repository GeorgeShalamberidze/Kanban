import { isSidebarOpenAtom } from "@/store/sidebar";
import { themeAtom } from "@/store/theme";
import { useAtom } from "jotai";
import { useEffect } from "react";

const MOBILE_BREAKPOINT = 640;

export const useRootLayout = () => {
  const [isThemeDark] = useAtom(themeAtom);
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);

  useEffect(() => {
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
  }, [isSidebarOpen]);

  return {
    isThemeDark,
    isSidebarOpen,
  };
};
