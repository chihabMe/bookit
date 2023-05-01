import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const ToasterWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster position="bottom-right" />
      {children}
    </>
  );
};
export default ToasterWrapper;
