import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonPropType extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  className?: string;
}

const Button: React.FC<ButtonPropType> = ({ title, className, ...rest }) => {
  return (
    <button {...rest} className={twMerge("flex w-full", `${className}`)}>
      <p>{title}</p>
    </button>
  );
};

export default Button;
