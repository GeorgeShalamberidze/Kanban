import { twMerge } from "tailwind-merge";

const AllBoards: React.FC<{ boardCount?: number; className?: string }> = ({
  boardCount,
  className,
}) => {
  return (
    <div className="pl-8 mb-5">
      <p className={twMerge("uppercase text-medium-gray", `${className}`)}>
        all boards ({boardCount})
      </p>
    </div>
  );
};

export default AllBoards;
