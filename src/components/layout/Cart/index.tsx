import useCart from "~/hooks/useCart";
import CartItem from "./CartItem";

const Cart = () => {
  const { items } = useCart();
  return (
    <aside>
      <h1 className="capitalize">order menu</h1>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
    </aside>
  );
};
export default Cart;
