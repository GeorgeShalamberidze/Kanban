import SideBar from "@/components/side-bar";
import { themeAtom } from "@/store/theme";
import { useAtom } from "jotai";
import { Outlet } from "react-router";
import { twMerge } from "tailwind-merge";

const RootLayout = () => {
  const [theme] = useAtom(themeAtom);

  return (
    <div
      className={twMerge(
        "min-h-screen w-screen bg-dark-secondary",
        `bg-${theme}-secondary`
      )}
    >
      <SideBar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
