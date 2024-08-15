import { activeBoardAtom } from "@/store/board";
import { ADD_BOARD_FORM_FIELDS } from "../boards/formFields";
import Input from "../input";
import Cross from "@/assets/svg/icon-cross.svg";
import { useAtom } from "jotai";
import Button from "../button";

const EditBoardModalView: React.FC = () => {
  const [activeBoard] = useAtom(activeBoardAtom);

  return (
    <div className="flex-1 flex flex-col gap-6">
      <p className="font-bold text-xl">Edit Board</p>
      <div>
        <Input label="Board Name" defaultValue={activeBoard?.name} />
      </div>
      <div className="flex flex-col gap-3">
        {activeBoard?.columns.map((column, i) => {
          return (
            <div
              key={i}
              className="flex items-center justify-between gap-4 w-full"
            >
              <Input
                required
                className="w-full border-[#828FA3]/25 bg-white dark:bg-dark-gray dark:text-white h-10"
                name={column.name}
                defaultValue={column.name}
                placeholder={ADD_BOARD_FORM_FIELDS.board_columns.placeholder}
              />
              <img
                src={Cross}
                alt="x button"
                className="cursor-pointer"
                onClick={() => console.log("delete subtask todo")}
              />
            </div>
          );
        })}
        <Button
          title="+ Add New Column"
          className="w-full flex items-center justify-center py-2 rounded-full bg-[#635FC7]/10 dark:bg-white hover:opacity-75 text-main-purple font-bold text-base"
          onClick={() => console.log("Add new Column ! Todo")}
        />
      </div>
      <Button
        title="Save Changes"
        className="w-full flex items-center justify-center py-2 rounded-full bg-main-purple hover:bg-main-purple-hover text-white text-base font-bold"
        onClick={() => console.log("Add new Column ! Todo")}
      />
    </div>
  );
};

export default EditBoardModalView;
