import { MutableRefObject, useState, useEffect } from "react";

const useHover = (
  elementRef: MutableRefObject<HTMLElement | null>
): boolean => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [elementRef]);

  return isHovered;
};

export default useHover;
