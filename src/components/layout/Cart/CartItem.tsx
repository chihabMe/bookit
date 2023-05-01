import Image from "next/image";
import { ICartItem } from "~/context/cart.context";
import {
  ChevronUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Button from "~/components/ui/Button";
import useAppDispatch from "~/hooks/useAppDispatch";
import useCart from "~/hooks/useCart";
import { toastSuccess } from "~/helpers/toasters";

const CartItem = ({ item }: { item: ICartItem }) => {
  const { increaseItem, decreaseItem, removeItem, getTotal } = useCart();
  const increaseCartItem = () => {
    increaseItem(item.id);
    toastSuccess({ message: "added to cart" });
  };
  const dcreaseCartItem = () => {
    decreaseItem(item.id);
    toastSuccess({ message: "removed from cart " });
  };
  const handleDeleteItemFromCart = () => {
    removeItem(item.id);
    toastSuccess({
      message: "cleared from cart ",
    });
  };

  return (
    <li className=" flex items-center  justify-between gap-2  overflow-x-hidden py-2">
      <Image
        src={"https://picsum.photos/100/100"}
        alt={`${item.name} image`}
        width={80}
        height={80}
        className=" h-[50px] w-[50px] rounded-full md:h-[60px] md:w-[60px]"
      />
      <div className="flex ">
        <div className="   flex w-full min-w-[170px] flex-col gap-2 md:min-w-[220px] ">
          <span className="    font-bold capitalize text-title dark:text-title-dark">
            {item.name}
          </span>

          <div className="flex gap-2 ">
            <Button
              onClick={increaseCartItem}
              className="!bg-primary !p-1 hover:!bg-primary  hover:ring-1  hover:ring-primary"
            >
              <ChevronUpIcon className="h-4  w-4 text-primary  text-white " />
            </Button>
            <span className="min-w-[20px]  text-sm font-bold text-title">
              {item.quantity}
            </span>
            <Button
              onClick={dcreaseCartItem}
              className="!bg-primary !p-1   hover:ring-1  hover:ring-primary"
            >
              <ChevronDownIcon className="h-4  w-4 text-primary  text-white " />
            </Button>
            <Button
              onClick={handleDeleteItemFromCart}
              className="mx-2 !bg-red-300 !p-1   hover:ring-1  hover:ring-red-300"
            >
              <TrashIcon className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex min-w-[80px] gap-1  ">
        <div>
          <span className="font-bold text-primary">$ </span>
          <span className="  font-bold text-title">
            {(parseFloat(item.price.toString()) * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </li>
  );
};
export default CartItem;
