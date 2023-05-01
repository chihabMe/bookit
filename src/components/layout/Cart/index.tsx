import useCart from "~/hooks/useCart";
import CartItem from "./CartItem";
import Title from "~/components/ui/Title";
import Button from "~/components/ui/Button";

const Cart = () => {
  const { items, getNumberOfItems, getTotal } = useCart();
  return (
    <aside className="w-full">
      <Title text="order menu" />
      <ul className="flex  max-h-[230px] min-h-[235px] flex-col gap-2  overflow-y-scroll   py-4  md:max-h-[310px]   md:min-h-[305px]">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <hr className=" my-2 h-px border-0 bg-gray-400 dark:bg-gray-700" />
      <div className="flex w-full  justify-end justify-between gap-2 py-2 ">
        <span className=" dark:text-title:dark font-bold capitalize text-title md:text-xl">
          total
        </span>
        <span className="dark:text-title:dark font-bold text-title md:text-xl">
          ${getTotal().toFixed(2)}
        </span>
      </div>

      <div className="flex w-full justify-end justify-between gap-2 py-2  capitalize">
        <span className="dark:text-title:dark font-bold text-title md:text-xl">
          items
        </span>
        <span className="dark:text-title:dark font-bold text-title md:text-xl">
          {getNumberOfItems()}
        </span>
      </div>
      <div className="flex w-full items-center">
        <Button className="mx-auto my-8 h-[50px] w-full max-w-[350px] rounded-full py-2 text-[15px] font-bold capitalize text-white transition-all  duration-200 hover:ring-2 hover:ring-primary">
          confirm order
        </Button>
      </div>
    </aside>
  );
};
const EmptyCardView = () => {
  return (
    <div className="flex h-[300px] w-full items-center justify-center bg-primary">
      <h1 className="font-meidum text-white">
        please add some items to your card
      </h1>
    </div>
  );
};
export default Cart;
