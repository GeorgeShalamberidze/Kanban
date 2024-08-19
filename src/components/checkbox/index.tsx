import { Field } from "formik";
import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import CheckboxIcon from "@/assets/svg/checkbox.svg";

interface CheckboxPropType extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  id?: string;
  isCompleted?: boolean;
  name?: string;
  handleChange: any;
}

const Checkbox: React.FC<CheckboxPropType> = ({
  handleChange,
  isCompleted,
  className,
  label,
  name,
  id,
  ...rest
}) => {
  return (
    label && (
      <label
        className={twMerge(
          "text-sm cursor-pointer text-medium-gray w-full bg-light-secondary dark:bg-very-dark-gray p-3 rounded-lg flex items-center gap-4 font-bold",
          `${isCompleted ? "line-through text-medium-gray" : "text-dark dark:text-white"}`
        )}
        htmlFor={id}
      >
        <Field
          type="checkbox"
          className={twMerge(
            "appearance-none min-w-4 min-h-4 w-4 h-4 border border-solid border-[#828FA3]/25 rounded-sm",
            className
          )}
          id={id}
          name={name}
          {...rest}
        />
        {isCompleted && (
          <img className="absolute flex-1 flex" src={CheckboxIcon} />
        )}

        {label}
      </label>
    )
  );
};

export default Checkbox;
