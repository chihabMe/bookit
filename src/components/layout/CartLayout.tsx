import { ReactNode } from "react";
import Cart from "./Cart";

const CartLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between gap-2 ">
      <div className="scrollbar-hide max-h-screen overflow-y-scroll px-4">
        {children}
      </div>

      <div className="w-[400px] ">
        <Cart />
      </div>
    </div>
  );
};
export default CartLayout;
