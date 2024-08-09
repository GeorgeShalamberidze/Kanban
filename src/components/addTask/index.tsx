import Input from "../input";
import { ADD_TASK_FORM_FIELDS } from "./formFields";

const AddTask: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark-gray flex flex-col gap-6 w-full">
      <div className="text-black dark:text-white font-bold text-lg">
        Add New Task
      </div>
      <Input
        className="w-full border-[#828FA3]/25"
        label={ADD_TASK_FORM_FIELDS.title.label}
        name={ADD_TASK_FORM_FIELDS.title.name}
        placeholder={ADD_TASK_FORM_FIELDS.title.placeholder}
      />
      <Input
        className="w-full border-[#828FA3]/25"
        label={ADD_TASK_FORM_FIELDS.description.label}
        name={ADD_TASK_FORM_FIELDS.description.name}
        placeholder={ADD_TASK_FORM_FIELDS.description.placeholder}
      />
    </div>
  );
};

export default AddTask;
