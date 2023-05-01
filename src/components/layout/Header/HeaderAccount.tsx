import {
  BellIcon,
  ShoppingBagIcon,
  UserIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useWillChange } from "framer-motion";
import { useRouter } from "next/router";
import Button from "~/components/ui/Button";
import useAppDispatch from "~/hooks/useAppDispatch";
import useAppSelector from "~/hooks/useAppSelector";
import useCart from "~/hooks/useCart";
import useWindowSize from "~/hooks/useWindowSize";
import { uiActions } from "~/store/slices/ui.slice";
const HeaderAccount = () => {
  const dispatch = useAppDispatch();
  const { getNumberOfItems } = useCart();
  const windowSize = useWindowSize();
  const router = useRouter();
  const toggleCart = () => {
    if (windowSize.width && windowSize.width < 500) {
      try {
        router.push("/cart");
      } catch (err) {
        console.error(err);
      }
    } else {
      dispatch(uiActions.toggleCart());
    }
  };
  return (
    <div className="flex  items-center gap-4 ">
      <Button
        onClick={toggleCart}
        className=" relative cursor-pointer !bg-transparent px-2 py-2 text-text"
      >
        <ShoppingBagIcon className="h-6 w-6 md:h-8 md:w-8 " />
        <span className="absolute right-[5px] top-[10px] flex h-5 w-5 items-center justify-center rounded-full bg-primary   text-[9px] font-bold text-white  ">
          {getNumberOfItems()}
        </span>
      </Button>

      <Button className=" flex  cursor-pointer items-center gap-3 !bg-transparent px-2 py-2 !capitalize   text-text  ">
        <UserIcon className=" h-6 w-6    text-text md:h-8  md:w-8  " />
        <div className="flex items-center gap-2 text-xs font-medium ">
          <ChevronDownIcon className="h-4 w-4 text-text" />
        </div>
      </Button>
    </div>
  );
};
export default HeaderAccount;
