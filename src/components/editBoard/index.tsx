import Input from "../input";
import Cross from "@/assets/svg/icon-cross.svg";
import Button from "../button";
import { ADD_BOARD_FORM_FIELDS } from "../boards/formFields";
import { FieldArray, Form, Formik } from "formik";
import { useEditBoard } from "./useEditBoard";

const EditBoardModalView: React.FC<{
  hideModal: () => void;
  isColumnUpdate?: boolean;
}> = ({ hideModal, isColumnUpdate = false }) => {
  const { activeBoard, handleSubmit } = useEditBoard({
    hideModal,
    isColumnUpdate,
  });

  return (
    <div className="flex-1 flex flex-col gap-6">
      <p className="font-bold text-xl text-black dark:text-white">
        {isColumnUpdate ? "Edit Columns" : "Edit Board"}
      </p>
      <Formik
        enableReinitialize
        initialValues={{
          boardName: activeBoard?.name,
          boardColumns: activeBoard?.columns || [],
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values }) => {
          return (
            <Form className="flex flex-col gap-6 w-full">
              {!isColumnUpdate ? (
                <Input
                  className="w-full border-[#828FA3]/25 bg-white dark:bg-dark-gray dark:text-white"
                  name={ADD_BOARD_FORM_FIELDS.board.name}
                  label="Board Name"
                  id={ADD_BOARD_FORM_FIELDS.board.name}
                />
              ) : null}

              <FieldArray name="boardColumns">
                {({ remove, push }) => {
                  return (
                    <div className="flex flex-col gap-3">
                      <label
                        className="text-lg text-medium-gray dark:text-white"
                        htmlFor={ADD_BOARD_FORM_FIELDS.board_columns.label}
                      >
                        {ADD_BOARD_FORM_FIELDS.board_columns.label}
                      </label>
                      {values?.boardColumns.length > 0 &&
                        values?.boardColumns.map((column, i) => {
                          return (
                            <div
                              key={i}
                              className="flex items-center justify-between gap-4 w-full"
                            >
                              <Input
                                required
                                className="w-full border-[#828FA3]/25 bg-white dark:bg-dark-gray dark:text-white h-10"
                                name={`boardColumns.${i}.name`}
                                value={column.name}
                                placeholder={
                                  ADD_BOARD_FORM_FIELDS.board_columns
                                    .placeholder
                                }
                              />
                              <img
                                src={Cross}
                                alt="x button"
                                className="cursor-pointer"
                                onClick={() => remove(i)}
                              />
                            </div>
                          );
                        })}
                      <Button
                        title="+ Add New Column"
                        className="w-full flex items-center justify-center py-2 rounded-full bg-[#635FC7]/10 dark:bg-white hover:opacity-75 text-main-purple font-bold text-base"
                        onClick={() => push({ name: "" })}
                      />
                    </div>
                  );
                }}
              </FieldArray>
              <Button
                type="submit"
                title="Save Changes"
                className="w-full flex mb-8 items-center justify-center py-2 rounded-full bg-main-purple hover:bg-main-purple-hover text-white text-base font-bold"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditBoardModalView;
