import Image from "next/image";
import { ICartItem } from "~/context/cart.context";

const CartItem = ({ item }: { item: ICartItem }) => {
  return (
    <li className="flex items-center justify-between py-2">
      <Image
        src={item.image ?? ""}
        alt={`${item.name} image`}
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="   flex w-full max-w-[220px] flex-col gap-2 ">
        <span className="   font-bold text-title">{item.name}</span>
        <span className="font-medium">
          <span className="   font-bold text-primary ">{"x"}</span>
          {item.quantity}
        </span>
      </div>
      <div>
        <span className="font-bold text-primary">$ </span>
        <span className="  font-bold text-title">{item.price.toString()}</span>
      </div>
    </li>
  );
};
export default CartItem;
