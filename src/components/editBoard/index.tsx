import Input from "../input";

const EditBoard: React.FC = () => {
  return (
    <div className="flex-1">
      <p className="font-bold text-xl mb-6">Edit Board</p>
      <div>
        <Input label="Board Name" />
      </div>
    </div>
  );
};

export default EditBoard;
