import { themeAtom } from "@/store/theme";
import { useAtom } from "jotai";
import LightThemeIcon from "@/assets/svg/icon-light-theme.svg";
import DarkThemeIcon from "@/assets/svg/icon-dark-theme.svg";

const ThemeSwitcher: React.FC = () => {
  const [isThemeDark, setIsThemeDark] = useAtom(themeAtom);
  return (
    <div
      className={`${isThemeDark && "dark"} flex w-[80%] items-center mx-auto py-3 justify-center gap-6 bg-light-secondary dark:bg-very-dark-gray rounded-md`}
    >
      <img src={LightThemeIcon} alt="light theme icon" />
      <label className="inline-flex items-center cursor-pointer">
        <input
          name="theme-switch"
          type="checkbox"
          className="sr-only peer"
          checked={isThemeDark}
          onChange={() => setIsThemeDark((val) => !val)}
        />
        <div className="relative w-10 h-6 bg-gray-200 rounded-full peer dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:start-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-main-purple hover:bg-main-purple-hover peer-checked:hover:bg-main-purple-hover"></div>
      </label>
      <img src={DarkThemeIcon} alt="dark theme icon" />
    </div>
  );
};

export default ThemeSwitcher;
