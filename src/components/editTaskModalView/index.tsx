import { Column, Subtask, Task } from "@/api/boards/index.types";
import { Field, Form, Formik } from "formik";
import { twMerge } from "tailwind-merge";
import { EDIT_TASK_FORM_FIELDS } from "./formFields";
import { useAtom } from "jotai";
import { activeBoardAtom } from "@/store/board";
import Button from "../button";
import DownCarrot from "@/assets/svg/icon-chevron-down.svg";
import Dots from "@/assets/svg/vertical-dots.svg";
import Checkbox from "../checkbox";

type EditTaskModalViewPropType = {
  id: string;
  title: string;
  description: string;
  status: string;
  subTasks: Subtask[];
  completedSubTaskCount: number;
  hideModal: () => void;
};

const EditTaskModalView: React.FC<EditTaskModalViewPropType> = ({
  id,
  description,
  status,
  subTasks,
  completedSubTaskCount,
  title,
  hideModal,
}) => {
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);

  const handleEditTask = (values: {
    currentStatus: string;
    subTasks: Subtask[];
  }) => {
    if (!activeBoard) return;

    const sourceColumn = activeBoard.columns.find(
      (column) => column.name === status
    );
    const targetColumn = activeBoard.columns.find(
      (column) => column.name === values.currentStatus
    );

    if (!sourceColumn || !targetColumn) return;

    const updatedSourceColumn: Column = {
      ...sourceColumn,
      tasks:
        sourceColumn.name === values.currentStatus
          ? sourceColumn.tasks.map((task) =>
              task.id === id
                ? {
                    ...task,
                    subtasks: values.subTasks,
                  }
                : task
            )
          : sourceColumn.tasks.filter((task) => task.id !== id),
    };

    const updatedTargetTask = {
      ...(sourceColumn.tasks.find((task) => task.id === id) as Task),
      subtasks: values.subTasks,
      status: values.currentStatus,
    };

    const updatedTargetColumn = {
      ...targetColumn,
      tasks: [...targetColumn.tasks, updatedTargetTask],
    };

    const updatedBoardData = {
      ...activeBoard,
      columns: activeBoard.columns.map((column) => {
        if (column.name === status) {
          return updatedSourceColumn;
        } else if (column.name === values.currentStatus) {
          return updatedTargetColumn;
        } else {
          return column;
        }
      }),
    };

    hideModal();
    setActiveBoard(updatedBoardData);
    localStorage.setItem("activeBoard", JSON.stringify(updatedBoardData));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        <div className="flex w-full justify-between gap-6">
          <p className="text-[18px] text-black dark:text-white font-bold">
            {title}
          </p>
          <img
            src={Dots}
            alt="vertical dots"
            className={twMerge("cursor-pointer")}
          />
        </div>
        <p className="text-[13px] text-medium-gray">
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

export default EditTaskModalView;
