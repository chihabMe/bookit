import useCart from "~/hooks/useCart";
import CartItem from "./CartItem";
import Title from "~/components/ui/Title";
import Button from "~/components/ui/Button";

const Cart = () => {
  const { items, getNumberOfItems, getTotal } = useCart();
  return (
    <aside className="w-full">
      <Title text="order menu" />
      <ul className="flex  max-h-[250px] min-h-[245px] flex-col gap-2  overflow-y-scroll   py-4  md:max-h-[350px]   md:min-h-[345px]">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="flex w-full justify-end justify-between gap-2 px-2">
        <span className="dark:text-title:dark font-bold text-title md:text-xl">
          {getNumberOfItems()} items
        </span>
        <span className="dark:text-title:dark font-bold text-title md:text-xl">
          Total ${getTotal().toFixed(2)}
        </span>
      </div>
      <Button className="my-8 h-14 w-full rounded-full py-2 text-[15px] font-bold capitalize text-white transition-all  duration-200 hover:ring-2 hover:ring-primary">
        checkout
      </Button>
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
