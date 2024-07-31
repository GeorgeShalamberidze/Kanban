import { useEffect, useState } from "react";

const useMediaQuery = (query: number) => {
  const [isLowerThan, setIsLowerThan] = useState<boolean>(false);
  const [windowW, setWindowW] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowW(window.innerWidth);
      if (windowW < query) {
        setIsLowerThan(true);
      } else {
        setIsLowerThan(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowW]);

  return {
    isLowerThan,
  };
};

export default useMediaQuery;
