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
    <div
      className="w-full bg-light-secondary dark:bg-very-dark-gray p-3 rounded-lg cursor-pointer flex items-center gap-4 font-bold"
      onChange={handleChange}
      id={id}
    >
      <Field
        type="checkbox"
        className={twMerge(
          "appearance-none w-4 h-4 border border-solid border-[#828FA3]/25 rounded-sm",
          className
        )}
        id={id}
        name={name}
        {...rest}
      />
      {isCompleted && <img className="absolute" src={CheckboxIcon} />}
      {label && (
        <label
          className={twMerge(
            "text-sm text-medium-gray cursor-pointer dark:text-white",
            `${isCompleted ? "line-through" : "text-dark"}`
          )}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
