import UpCarrot from "@/assets/svg/icon-chevron-up.svg";

const UpArrow: React.FC = () => {
  return (
    <img
      src={UpCarrot}
      className="w-fit h-full flex md:hidden"
      alt="down carrot arrow"
    />
  );
};

export default UpArrow;
