import useCart from "~/hooks/useCart";
import CartItem from "./CartItem";
import Title from "~/components/ui/Title";
import Button from "~/components/ui/Button";

const Cart = () => {
  const { items, getNumberOfItems } = useCart();
  if (getNumberOfItems() == 0) return <EmptyCardView />;
  return (
    <aside className="w-full">
      <div className="h-[150px] w-full bg-primary"></div>
      <Title text="order menu" />
      <ul className="flex max-h-[400px] flex-col gap-2 overflow-y-scroll">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <Button className="my-8 h-14 w-full rounded-full py-2 text-[15px]  font-bold capitalize text-white">
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
