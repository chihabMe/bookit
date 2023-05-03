import { Input as MTInput, InputProps } from "@material-tailwind/react";
import { ReactNode } from "react";
interface Props {
  className?: string;
  placeholder?: string;
  type?: string;
  icon?: ReactNode;
}
const Input = ({ className, placeholder, icon, type }: Props) => {
  return (
    <div className="">
      <MTInput
        placeholder={placeholder}
        type={type}
        icon={icon}
        color="orange"
        className={` text-title focus:!ring-primary dark:text-title-dark  ${className!} `}
      />
    </div>
  );
};
export default Input;
