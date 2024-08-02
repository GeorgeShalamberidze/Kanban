import useClickInside from "@/hooks/useClickInside";
import { PropsWithChildren, ReactNode, useRef } from "react";
import { twMerge } from "tailwind-merge";

type DropDownPropTypes = {
  children: ReactNode | React.ReactElement | JSX.Element;
  hideDropDown: () => void;
  className?: string;
};

const DropDown: React.FC<PropsWithChildren<DropDownPropTypes>> = ({
  children,
  className,
  hideDropDown,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useClickInside(containerRef, hideDropDown);

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-black/60 flex items-center justify-center">
      <div
        ref={containerRef}
        {...rest}
        className={twMerge(
          "h-fit bg-white absolute z-50 dark:bg-dark-gray rounded-md",
          `${className && className}`
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDown;
