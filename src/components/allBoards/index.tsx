const AllBoards: React.FC<{ boardCount: number }> = ({ boardCount }) => {
  return (
    <div className="pl-8 mb-5">
      <p className="uppercase text-medium-gray text-lg">
        all boards ({boardCount})
      </p>
    </div>
  );
};

export default AllBoards;
