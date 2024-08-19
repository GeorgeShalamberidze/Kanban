import { activeBoardAtom, allBoardsAtom } from "@/store/board";
import { ADD_BOARD_FORM_FIELDS } from "../boards/formFields";
import Input from "../input";
import Cross from "@/assets/svg/icon-cross.svg";
import { useAtom } from "jotai";
import Button from "../button";
import { FieldArray, Form, Formik } from "formik";
import { BoardData, Column } from "@/api/boards/index.types";
import { generateRandomColor } from "@/helpers/generateRandomColor";

const EditBoardModalView: React.FC<{
  hideModal: () => void;
  hideDropDown?: () => void;
  isDropDownOpen?: boolean;
  isColumnUpdate?: boolean;
}> = ({ hideModal, hideDropDown, isDropDownOpen, isColumnUpdate = false }) => {
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);
  const [allBoards, setAllBoards] = useAtom(allBoardsAtom);

  const handleSubmit = (values: {
    boardName: string | undefined;
    boardColumns: Column[];
  }) => {
    const updatedColumns = [
      ...(values?.boardColumns || []).map((column: Column) =>
        column.tasks
          ? column
          : { name: column.name, tasks: [], bgColor: generateRandomColor() }
      ),
    ];

    const updatedBoard = {
      ...activeBoard,
      name:
        values.boardName && values.boardName !== activeBoard?.name
          ? values.boardName
          : activeBoard?.name!,
      columns: updatedColumns,
    };

    const updatedBoardDataArray = allBoards?.map((board: BoardData) =>
      board.id === updatedBoard.id ? updatedBoard : board
    );
    setActiveBoard((prev) => {
      if (!prev) return prev;

      return { ...prev, ...updatedBoard };
    });

    localStorage.setItem("boardData", JSON.stringify(updatedBoardDataArray));
    localStorage.setItem("activeBoard", JSON.stringify(updatedBoard));

    if (isColumnUpdate) {
      const boardIndex = allBoards?.findIndex(
        (board) => board.name === activeBoard?.name
      );

      const updatedBoards = allBoards?.map((board, index) =>
        index === boardIndex
          ? {
              ...board,
              name: values.boardName ? values.boardName : board.name,
            }
          : board
      );

      setAllBoards((prev) => {
        if (!prev) return prev;
        return updatedBoards;
      });
      localStorage.setItem("activeBoard", JSON.stringify(updatedBoard));
    }

    hideModal();
    if (isDropDownOpen) {
      hideDropDown?.();
    }
  };

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
