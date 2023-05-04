import { Input as MTInput, type InputProps } from "@material-tailwind/react";
import { ChangeEvent, ReactNode } from "react";
interface Props extends InputProps {
  errors?: string[];
}
const Input = ({
  errors,
  className,
  placeholder,
  icon,
  type,
  onChange,
  name,
}: Props) => {
  const errs = errors as string[];
  return (
    <div className=" flex flex-col  gap-2  ">
      <MTInput
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        name={name}
        icon={icon}
        color="orange"
        error={errors != undefined}
        className={` text-title focus:!ring-primary dark:text-title-dark  ${className!} `}
      />
      {errors && (
        <div className="flex gap-2 py-2 text-sm font-medium text-red-400">
          {errors.map((error, idx) => (
            <span key={idx}>{error}</span>
          ))}
        </div>
      )}
    </div>
  );
};
export default Input;
