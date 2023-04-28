import React, { ReactNode } from "react";
import { Button as MTButton, type ButtonProps } from "@material-tailwind/react";

interface Props extends ButtonProps {
  className?: string;
}

const Button = ({ children, size, variant, className, onClick }: Props) => {
  return (
    <MTButton
      size={size}
      variant={variant}
      className={`  !bg-primary !text-text !shadow-none  !shadow-primary ${className!} `}
      onClick={onClick}
    >
      {children}
    </MTButton>
  );
};
export default Button;
