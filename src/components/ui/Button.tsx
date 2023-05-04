import React, { ReactNode } from "react";
import { Button as MTButton, type ButtonProps } from "@material-tailwind/react";

interface Props extends ButtonProps {
  className?: string;
}

const Button = ({
  children,
  type,
  size,
  variant,
  className,
  onClick,
}: Props) => {
  return (
    <MTButton
      size={size}
      variant={variant}
      className={`  !bg-primary   !text-white !shadow-none  !shadow-primary ${className!} `}
      type={type}
      onClick={onClick}
    >
      {children}
    </MTButton>
  );
};
export default Button;
