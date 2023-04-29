import Image from "next/image";
import { ICartItem } from "~/context/cart.context";
import {
  ChevronUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import Button from "~/components/ui/Button";
import useAppDispatch from "~/hooks/useAppDispatch";
import useCart from "~/hooks/useCart";

const CartItem = ({ item }: { item: ICartItem }) => {
  const { increaseItem, decreaseItem, getTotal } = useCart();
  const increaseCartItem = () => increaseItem(item.id);
  const dcreaseCartItem = () => decreaseItem(item.id);

  return (
    <li className="flex items-center justify-between  py-2">
      <Image
        src={"https://picsum.photos/100/100"}
        alt={`${item.name} image`}
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="flex ">
        <div className="   flex w-full max-w-[220px] flex-col gap-2 ">
          <span className="   font-bold text-title">{item.name}</span>

          <div className="flex gap-1">
            <Button
              onClick={increaseCartItem}
              className="!bg-transparent !p-1 hover:!bg-primary"
            >
              <ChevronUpIcon className="h-4 w-4 text-primary hover:text-white " />
            </Button>
            <span>{item.quantity}</span>
            <Button
              onClick={dcreaseCartItem}
              className="group !bg-transparent !p-1 hover:!bg-primary"
            >
              <ChevronDownIcon className="h-4 w-4 text-primary hover:text-white " />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        <div>
          <span className="font-bold text-primary">$ </span>
          <span className="  font-bold text-title">
            {item.price.toString()}
          </span>
        </div>
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
