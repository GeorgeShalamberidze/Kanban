import { Subtask } from "@/api/boards/index.types";
import { Field, Form, Formik } from "formik";
import { EDIT_TASK_FORM_FIELDS } from "./formFields";
import { useViewTask } from "./useViewTask";
import Button from "../button";
import DownCarrot from "@/assets/svg/icon-chevron-down.svg";
import Checkbox from "../checkbox";
import ViewTaskDropdownMenu from "./viewTaskDropDownmenu";

type ViewTaskModalViewPropType = {
  id: string;
  title: string;
  description: string;
  status: string;
  subTasks: Subtask[];
  completedSubTaskCount: number;
  hideModal: () => void;
  openDeleteTaskModal: () => void;
  openEditTaskModal: () => void;
};

const ViewTaskModalView: React.FC<ViewTaskModalViewPropType> = ({
  id,
  description,
  title,
  status,
  subTasks,
  completedSubTaskCount,
  openDeleteTaskModal,
  openEditTaskModal,
  hideModal,
}) => {
  const { activeBoard, handleEditTask } = useViewTask({
    id,
    status,
    hideModal,
  });

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        <div className="flex w-full justify-between gap-6">
          <p className="text-[18px] text-black dark:text-white font-bold">
            {title}
          </p>
          <ViewTaskDropdownMenu
            hideModal={hideModal}
            openEditTaskModal={openEditTaskModal}
            openDeleteTaskModal={openDeleteTaskModal}
          />
        </div>
        <p className="text-[13px] text-medium-gray break-words">
          {description && description !== "" ? description : "NO Description"}
        </p>
        <div className="flex text-[13px] text-medium-gray font-bold">
          Subtasks {`(${completedSubTaskCount} of ${subTasks.length})`}
        </div>
        <Formik
          initialValues={{
            currentStatus: status,
            subTasks,
          }}
          onSubmit={handleEditTask}
        >
          {({ values, handleChange }) => {
            return (
              <Form className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-2">
                  {values.subTasks &&
                    values.subTasks.length > 0 &&
                    values.subTasks.map((task, i) => {
                      return (
                        <Checkbox
                          handleChange={handleChange}
                          key={i}
                          isCompleted={task.isCompleted}
                          label={task.title}
                          className="cursor-pointer"
                          name={`subTasks.${i}.isCompleted`}
                          id={`subTasks.${i}.isCompleted`}
                        />
                      );
                    })}
                </div>
                <div className="relative">
                  <label
                    className="flex flex-col text-base text-medium-gray dark:text-white gap-2"
                    htmlFor={EDIT_TASK_FORM_FIELDS.status.name}
                  >
                    {EDIT_TASK_FORM_FIELDS.status.label}
                    <Field
                      required
                      as="select"
                      className="appearance-none border border-solid border-[#828fa35e] cursor-pointer outline-none rounded-md py-2 px-4 bg-white dark:bg-dark-gray text-black dark:text-white"
                      name={EDIT_TASK_FORM_FIELDS.status.name}
                      id={EDIT_TASK_FORM_FIELDS.status.name}
                    >
                      {activeBoard?.columns.map((column, i) => (
                        <option key={i} value={column.name}>
                          {column.name}
                        </option>
                      ))}
                    </Field>
                    <img
                      src={DownCarrot}
                      alt="down arrow"
                      className="w-7 h-fit pointer-events-none absolute right-2 bottom-4 flex items-center px-2 text-gray-500"
                    />
                  </label>
                </div>
                <Button
                  type="submit"
                  title="Save"
                  className="w-full mb-8 flex items-center justify-center py-2 rounded-full bg-main-purple hover:bg-main-purple-hover text-white font-bold text-base"
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ViewTaskModalView;
