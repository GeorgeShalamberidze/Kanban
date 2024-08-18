import { Field } from "formik";
import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface CheckboxPropType extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  id?: string;
}

const Checkbox: React.FC<CheckboxPropType> = ({
  className,
  label,
  id,
  ...rest
}) => {
  return (
    <div className="w-full bg-light-secondary dark:bg-very-dark-gray p-3 rounded-lg cursor-pointer flex gap-4 font-bold">
      <Field type="checkbox" className={twMerge("", className)} {...rest} />
      {label && (
        <label
          className="text-sm text-medium-gray cursor-pointer dark:text-white"
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
