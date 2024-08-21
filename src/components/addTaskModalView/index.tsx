import Button from "../button";
import Input from "../input";
import Cross from "@/assets/svg/icon-cross.svg";
import DownCarrot from "@/assets/svg/icon-chevron-down.svg";
import { ADD_TASK_FORM_FIELDS } from "./formFields";
import { Field, FieldArray, Form, Formik } from "formik";
import { useEditAddTask } from "./useEditAddTask";
import { v4 as uuidv4 } from "uuid";

const initialValues: any = {
  title: "",
  description: "",
  subtasks: [
    {
      title: "",
      isCompleted: false,
      id: "",
    },
  ],
  status: "",
};

type EditAddTaskModalViewPropType = {
  hideModal: () => void;
  isEdit?: boolean;
  status?: string;
  id?: string;
};

const EditAddTaskModalView: React.FC<EditAddTaskModalViewPropType> = ({
  hideModal,
  isEdit = false,
  status,
  id,
}) => {
  const { activeBoard, handleSubmitAddTask } = useEditAddTask({
    hideModal,
    isEdit,
    status,
    id,
  });

  let initialTaskValue = activeBoard?.columns
    .find((r) => r.name === status)
    ?.tasks.find((task) => task.id === id);

  return (
    <div className="bg-white dark:bg-dark-gray flex flex-col gap-6 w-full">
      <div className="text-black dark:text-white font-bold text-lg">
        {isEdit ? "Edit Task" : "Add New Task"}
      </div>
      <Formik
        initialValues={isEdit ? initialTaskValue : initialValues}
        onSubmit={handleSubmitAddTask}
      >
        {({ values }) => {
          return (
            <Form className="flex flex-col gap-6 w-full">
              <Input
                required
                className="w-full border-[#828FA3]/25 bg-white dark:bg-dark-gray dark:text-white"
                label={ADD_TASK_FORM_FIELDS.title.label}
                name={ADD_TASK_FORM_FIELDS.title.name}
                placeholder={ADD_TASK_FORM_FIELDS.title.placeholder}
                id={ADD_TASK_FORM_FIELDS.title.name}
              />
              <Input
                className="w-full border-[#828FA3]/25 bg-white dark:bg-dark-gray dark:text-white"
                label={ADD_TASK_FORM_FIELDS.description.label}
                name={ADD_TASK_FORM_FIELDS.description.name}
                placeholder={ADD_TASK_FORM_FIELDS.description.placeholder}
                id={ADD_TASK_FORM_FIELDS.description.name}
              />
              <FieldArray name="subtasks">
                {({ remove, push }) => {
                  return (
                    <div className="flex flex-col gap-3">
                      <label
                        className="text-lg text-medium-gray dark:text-white"
                        htmlFor={ADD_TASK_FORM_FIELDS.subtasks.label}
                      >
                        {ADD_TASK_FORM_FIELDS.subtasks.label}
                      </label>
                      {values.subtasks.length > 0 &&
                        values.subtasks.map((_, i) => (
                          <div
                            className="flex items-center justify-between gap-4 w-full"
                            key={i}
                          >
                            <Input
                              required
                              className="w-full border-[#828FA3]/25 bg-white dark:bg-dark-gray dark:text-white"
                              name={`subtasks.${i}.title`}
                              placeholder={
                                ADD_TASK_FORM_FIELDS.subtasks.placeholder
                              }
                              id={`subtasks.${i}.title`}
                            />
                            <img
                              src={Cross}
                              alt="x button"
                              className="cursor-pointer"
                              onClick={() => remove(i)}
                            />
                          </div>
                        ))}
                      <Button
                        title="+ Add New Subtask"
                        className="w-full flex items-center justify-center py-2 rounded-full bg-[#635FC7]/10 dark:bg-white hover:opacity-75 text-main-purple font-bold text-base"
                        onClick={() =>
                          push({ title: "", isCompleted: false, id: uuidv4() })
                        }
                      />
                    </div>
                  );
                }}
              </FieldArray>
              <div className="relative">
                <label
                  className="flex flex-col text-lg text-medium-gray dark:text-white gap-2"
                  htmlFor={ADD_TASK_FORM_FIELDS.status.name}
                >
                  {ADD_TASK_FORM_FIELDS.status.label}
                  <Field
                    required
                    as="select"
                    className="appearance-none border border-solid border-[#828fa35e] cursor-pointer outline-none rounded-md py-2 px-4 bg-white dark:bg-dark-gray text-black dark:text-white"
                    name={ADD_TASK_FORM_FIELDS.status.name}
                    id={ADD_TASK_FORM_FIELDS.status.name}
                  >
                    <option value="" disabled>
                      Select status
                    </option>{" "}
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
                title={isEdit ? "Save Task" : "Create Task"}
                className="w-full mb-8 flex items-center justify-center py-2 rounded-full bg-main-purple hover:bg-main-purple-hover text-white font-bold text-base"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditAddTaskModalView;
