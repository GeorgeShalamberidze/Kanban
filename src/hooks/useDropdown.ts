import { useState } from "react";

const useDropDown = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  const closeDropDown = () => setIsDropDownOpen(false);
  const openDropDown = () => setIsDropDownOpen(true);
  return {
    isDropDownOpen,
    closeDropDown,
    openDropDown,
  };
};

export default useDropDown;
