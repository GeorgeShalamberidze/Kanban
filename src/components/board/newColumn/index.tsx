const NewColumn: React.FC<{ maxHeight: number }> = ({ maxHeight }) => {
  return (
    <div
      className="w-[280px] flex flex-col gap-6 cursor-pointer mt-[47.5px] pb-5"
      style={{ height: maxHeight - 27 }}
    >
      <div className="h-full flex justify-center items-center rounded-lg bg-[#E9EFFA] dark:bg-[#2B2C37]/25">
        <button className="text-medium-gray text-xl font-bold">
          + New Column
        </button>
      </div>
    </div>
  );
};

export default NewColumn;