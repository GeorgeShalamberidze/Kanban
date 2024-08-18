import { Subtask } from "@/api/boards/index.types";

type EditTaskModalViewPropType = {
  title: string;
  description: string;
  status: string;
  subTasks: Subtask[];
};

const EditTaskModalView: React.FC<EditTaskModalViewPropType> = ({
  description,
  status,
  subTasks,
  title,
}) => {
  return (
    <div>
      <div className="text-3xl">{title}</div>
      current Status: {status}
    </div>
  );
};

export default EditTaskModalView;
