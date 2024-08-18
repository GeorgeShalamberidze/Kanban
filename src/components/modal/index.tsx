import useClickInside from "@/hooks/useClickInside";
import { PropsWithChildren, ReactNode, useRef } from "react";
import { twMerge } from "tailwind-merge";

export type ModalProps = {
  children: ReactNode | JSX.Element | React.ReactElement;
  hideModal: () => void;
  className?: string;
};

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  children,
  className,
  hideModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useClickInside(containerRef, hideModal);

  return (
    <div className=" fixed top-0 left-0 h-screen w-full bg-black/60 flex items-center z-50 justify-center">
      <div
        ref={containerRef}
        className={twMerge(
          "w-[90%] h-fit max-w-[480px] rounded-md flex px-8 pt-8 bg-white dark:bg-dark-gray max-h-[95vh] overflow-y-scroll no-scrollbar",
          `${className}`
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
