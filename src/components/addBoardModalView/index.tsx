import { FieldArray, Form, Formik } from "formik";
import { ADD_BOARD_FORM_FIELDS } from "../boards/formFields";
import Button from "../button";
import Input from "../input";
import Cross from "@/assets/svg/icon-cross.svg";
import { useAtom } from "jotai";
import { activeBoardAtom, allBoardsAtom } from "@/store/board";

const AddBoardModalView: React.FC<{ hideModal: () => void }> = ({
  hideModal,
}) => {
  const [allBoards, setAllBoards] = useAtom(allBoardsAtom);
  const [_, setActiveBoard] = useAtom(activeBoardAtom);

  const handleSubmit = (values: {
    boardName: string;
    boardColumns: {
      name: string;
    }[];
  }) => {
    if (allBoards && allBoards.length > 0) {
      const lastBoard = allBoards[allBoards.length - 1];
      const id = typeof lastBoard.id === "number" ? lastBoard.id + 1 : 1;

      const newBoard = {
        id,
        name: values.boardName,
        columns: values.boardColumns.map((column) => ({
          name: column.name,
          tasks: [],
        })),
      };

      setAllBoards((prev) => (!prev ? prev : [...prev, newBoard]));
      setActiveBoard(newBoard);
      hideModal();
    }
  };
  return (
    <div className="bg-white dark:bg-dark-gray flex flex-col gap-6 w-full">
      <div className="text-black dark:text-white font-bold text-lg">
        Add New Board
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          boardName: "",
          boardColumns: [{ name: "" }],
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values }) => {
          return (
            <Form className="flex flex-col gap-6 w-full">
              <Input
                required
                className="w-full border-[#828FA3]/25 bg-white dark:bg-dark-gray dark:text-white"
                label={ADD_BOARD_FORM_FIELDS.board.label}
                name={ADD_BOARD_FORM_FIELDS.board.name}
                placeholder={ADD_BOARD_FORM_FIELDS.board.placeholder}
                id={ADD_BOARD_FORM_FIELDS.board.name}
              />
              <div className="flex flex-col gap-3">
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
              </div>
              <Button
                type="submit"
                title="Create New Board"
                className="w-full flex items-center justify-center py-2 rounded-full bg-main-purple hover:bg-main-purple-hover text-white font-bold text-base"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddBoardModalView;
