import DownCarrot from "@/assets/svg/icon-chevron-down.svg";

const DownArrow: React.FC = () => {
  return (
    <img
      src={DownCarrot}
      className="w-fit h-full flex md:hidden"
      alt="down carrot arrow"
    />
  );
};

export default DownArrow;
