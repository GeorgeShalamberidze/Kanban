import { Field } from "formik";
import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputTypeProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input: React.FC<InputTypeProps> = ({ label, className, ...rest }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-lg text-medium-gray" htmlFor={label}>
          {label}
        </label>
      )}
      <Field
        {...rest}
        className={twMerge(
          "w-full border border-solid border-[#828fa35e] outline-none rounded-md py-2 px-4",
          `${className}`
        )}
      />
    </div>
  );
};

export default Input;
