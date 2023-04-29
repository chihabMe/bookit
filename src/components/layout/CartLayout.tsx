import { ReactNode } from "react";
import Cart from "./Cart";
import useAppSelector from "~/hooks/useAppSelector";
import { selectUI } from "~/store";
import { AnimatePresence, motion } from "framer-motion";

const CartLayout = ({ children }: { children: ReactNode }) => {
  const { showCart } = useAppSelector(selectUI);
  return (
    <div className="flex justify-between gap-2  ">
      <div className="scrollbar-hide max-h-screen w-full overflow-y-scroll px-4 transition-all  duration-200">
        {children}
      </div>

      <AnimatePresence>
        {showCart && (
          <motion.div
            key="modal"
            initial={{ translateX: 300 }}
            animate={{ translateX: 0 }}
            exit={{ translateX: 300 }}
            transition={{ duration: 0.2, ease: "linear" }}
            className={`w-[470px]    `}
          >
            <Cart />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default CartLayout;
