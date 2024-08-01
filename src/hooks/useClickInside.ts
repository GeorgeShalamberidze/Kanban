import { MutableRefObject, useEffect, useRef } from "react";

const useClickInside = (
  elementRef: MutableRefObject<HTMLElement | null>,
  callback: () => void
): void => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    const handleClickInside = (event: MouseEvent) => {
      if (
        elementRef.current &&
        event.target instanceof Node &&
        !elementRef.current.contains(event.target)
      ) {
        callbackRef.current();
      }
    };

    document.addEventListener("click", handleClickInside, true);
    return () => {
      document.removeEventListener("click", handleClickInside, true);
    };
  }, [elementRef, callbackRef]);
};

export default useClickInside;
