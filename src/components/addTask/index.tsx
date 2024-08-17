import { useAtom } from "jotai";
import Button from "../button";
import Input from "../input";
import { ADD_TASK_FORM_FIELDS } from "./formFields";
import Cross from "@/assets/svg/icon-cross.svg";
import DownCarrot from "@/assets/svg/icon-chevron-down.svg";
import { activeBoardAtom } from "@/store/board";
import { Field, FieldArray, Form, Formik } from "formik";

const initialValues = {
  title: "",
  description: "",
  subtasks: [
    {
      task: "",
    },
  ],
  status: "",
};

const AddTask: React.FC = () => {
  const [activeBoard] = useAtom(activeBoardAtom);

  const handleSubmitAddTask = async (values: any) => {
    console.log(values);
  };

  return (
    <div className="bg-white dark:bg-dark-gray flex flex-col gap-6 w-full">
      <div className="text-black dark:text-white font-bold text-lg">
        Add New Task
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmitAddTask}>
        {({ values }) => {
          return (
            <Form className="flex flex-col gap-6 w-full">
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
              <FieldArray name="subtasks">
                {({ insert, remove, push }) => {
                  return (
                    <div className="flex flex-col gap-3">
                      <label
                        className="text-lg text-medium-gray"
                        htmlFor={ADD_TASK_FORM_FIELDS.subtasks.label}
                      >
                        {ADD_TASK_FORM_FIELDS.subtasks.label}
                      </label>
                      {values.subtasks.length > 0 &&
                        values.subtasks.map((task, i) => (
                          <div
                            className="flex items-center justify-between gap-4 w-full"
                            key={i}
                          >
                            <Input
                              className="w-full border-[#828FA3]/25 bg-white dark:bg-dark-gray dark:text-white"
                              name={ADD_TASK_FORM_FIELDS.subtasks.name}
                              placeholder={
                                ADD_TASK_FORM_FIELDS.subtasks.placeholder
                              }
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
                        onClick={() => push({ task: "" })}
                      />
                    </div>
                  );
                }}
              </FieldArray>
              <div className="relative">
                <label
                  className="flex flex-col text-lg text-medium-gray gap-2"
                  htmlFor={ADD_TASK_FORM_FIELDS.status.name}
                >
                  {ADD_TASK_FORM_FIELDS.status.label}
                  <Field
                    required
                    as="select"
                    className="appearance-none border border-solid border-[#828fa35e] cursor-pointer outline-none rounded-md py-2 px-4 bg-white dark:bg-dark-gray text-black dark:text-white"
                    name={ADD_TASK_FORM_FIELDS.status.name}
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
                title="Create Task"
                className="w-full mb-4 flex items-center justify-center py-2 rounded-full bg-main-purple hover:bg-main-purple-hover text-white font-bold text-base"
                onClick={() => console.log("Create TASK ! Todo")}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddTask;
