import useClickInside from "@/hooks/useClickInside";
import { PropsWithChildren, ReactNode, useRef } from "react";

export type ModalProps = {
  children: ReactNode | JSX.Element | React.ReactElement;
  hideModal: () => void;
};

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  children,
  hideModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useClickInside(containerRef, hideModal);

  return (
    <div className=" fixed top-0 left-0 h-screen w-full bg-black/60 flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-[90%] h-1/2 max-w-[480px] rounded-md flex p-8 bg-white dark:bg-dark-gray"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
