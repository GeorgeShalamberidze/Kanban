type DropIndicatorPropTypes = {
  beforeId: string;
  column: string;
};

const DropIndicator: React.FC<DropIndicatorPropTypes> = ({
  beforeId,
  column,
}) => {
  return (
    <div
      style={{ border: "1px solid red" }}
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-gray-400 opacity-0"
    />
  );
};

export default DropIndicator;
