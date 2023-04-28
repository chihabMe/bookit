import { ReactNode } from "react";
import { Button as MTButton, ButtonProps } from "@material-tailwind/react";

const Button = (props: ButtonProps) => {
  return (
    <MTButton
      {...props}
      className={`  !bg-primary !text-text !shadow-none  !shadow-primary ${props.className} `}
    >
      {props.children}
    </MTButton>
  );
};
export default Button;
