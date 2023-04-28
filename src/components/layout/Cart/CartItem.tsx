import Image from "next/image";
import { ICartItem } from "~/context/cart.context";

const CartItem = (item: ICartItem) => {
  return (
    <li className="flex items-center justify-between py-2">
      <Image
        src={item.image ?? ""}
        alt={`${item.name} image`}
        width={50}
        height={50}
        className="rounded-md"
      />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-title">{item.name}</span>
        <span className="font-medium">
          <span className="text-primary">x</span>
          {item.quantity}
        </span>
      </div>
      <div>
        $<span className="text-sm font-medium">{item.price}</span>
      </div>
    </li>
  );
};
export default CartItem;
