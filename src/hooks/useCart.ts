import { useContext } from "react";
import { cartContext } from "~/context/cart.context";

const useCart = () => useContext(cartContext);

export default useCart;
