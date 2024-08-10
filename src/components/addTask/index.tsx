import { useAtom } from "jotai";
import Button from "../button";
import Input from "../input";
import { ADD_TASK_FORM_FIELDS } from "./formFields";
import Cross from "@/assets/svg/icon-cross.svg";
import DownCarrot from "@/assets/svg/icon-chevron-down.svg";
import { activeBoardAtom } from "@/store/board";

const AddTask: React.FC = () => {
  const [activeBoard] = useAtom(activeBoardAtom);
  return (
    <div className="bg-white dark:bg-dark-gray flex flex-col gap-6 w-full">
      <div className="text-black dark:text-white font-bold text-lg">
        Add New Task
      </div>
      <Input
        className="w-full border-[#828FA3]/25 bg-white dark:bg-dark-gray dark:text-white"
        label={ADD_TASK_FORM_FIELDS.title.label}
        name={ADD_TASK_FORM_FIELDS.title.name}
        placeholder={ADD_TASK_FORM_FIELDS.title.placeholder}
      />
      <Input
        className="w-full border-[#828FA3]/25 bg-white dark:bg-dark-gray dark:text-white"
        label={ADD_TASK_FORM_FIELDS.description.label}
        name={ADD_TASK_FORM_FIELDS.description.name}
        placeholder={ADD_TASK_FORM_FIELDS.description.placeholder}
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4 w-full">
          <Input
            className="w-full border-[#828FA3]/25 bg-white dark:bg-dark-gray dark:text-white"
            label={ADD_TASK_FORM_FIELDS.subtasks.label}
            name={ADD_TASK_FORM_FIELDS.subtasks.name}
            placeholder={ADD_TASK_FORM_FIELDS.subtasks.placeholder}
          />
          <img
            src={Cross}
            alt="x button"
            className="mt-8 cursor-pointer"
            onClick={() => console.log("delete subtask todo")}
          />
        </div>
        <div className="flex items-center justify-between gap-4 w-full">
          <Input
            required
            className="w-full border-[#828FA3]/25 bg-white dark:bg-dark-gray dark:text-white"
            name={ADD_TASK_FORM_FIELDS.subtasks.name}
            placeholder={ADD_TASK_FORM_FIELDS.subtasks.placeholder}
          />
          <img
            src={Cross}
            alt="x button"
            className="cursor-pointer"
            onClick={() => console.log("delete subtask todo")}
          />
        </div>
        <Button
          title="+ Add New Subtask"
          className="w-full flex items-center justify-center py-2 rounded-full bg-[#635FC7]/10 dark:bg-white hover:opacity-75 text-main-purple font-bold text-base"
          onClick={() => console.log("Add new SubTask ! Todo")}
        />
      </div>
      <div className="relative">
        <label
          className="flex flex-col text-lg text-medium-gray gap-2"
          htmlFor={ADD_TASK_FORM_FIELDS.status.name}
        >
          {ADD_TASK_FORM_FIELDS.status.label}
          <select
            className="appearance-none border border-solid border-[#828fa35e] cursor-pointer outline-none rounded-md py-2 px-4 bg-white dark:bg-dark-gray text-black dark:text-white"
            name={ADD_TASK_FORM_FIELDS.status.name}
          >
            {activeBoard?.columns.map((column, i) => (
              <option key={i} value={column.name}>
                {column.name}
              </option>
            ))}
          </select>
          <img
            src={DownCarrot}
            alt="down arrow"
            className="w-7 h-fit pointer-events-none absolute right-2 bottom-4 flex items-center px-2 text-gray-500"
          />
        </label>
      </div>
      <div>
        <Button
          title="Create Task"
          className="w-full flex items-center justify-center py-2 rounded-full bg-main-purple hover:bg-main-purple-hover text-white font-bold text-base"
          onClick={() => console.log("Create TASK ! Todo")}
        />
      </div>
    </div>
  );
};

export default AddTask;
