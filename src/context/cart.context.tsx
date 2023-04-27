import { ReactNode, createContext, useEffect } from "react";
import { MenuItem, Prisma } from "@prisma/client";
import { useState } from "react";
interface ICartContext {
  getTotal: () => number;
  items: CartItem[];
  cleare: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseItem: (id: string) => void;
  getNumberOfItems: () => number;
  decreaseItem: (id: string) => void;
}
interface CartItem extends MenuItem {
  quantity: number;
}

const initialState: ICartContext = {
  items: [],
  cleare: () => null,
  addItem: (item: CartItem) => null,
  removeItem: (id: string) => null,
  increaseItem: (id: string) => null,
  getNumberOfItems: () => 0,
  decreaseItem: (id: string) => null,
  getTotal: () => 0,
};
export const cartContext = createContext(initialState);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState(initialState.items);
  const getNumberOfItems = () => items.length;
  const increaseItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id != id ? item : { ...item, quantity: item.quantity + 1 }
      )
    );
  };
  const decreaseItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id != id
          ? item
          : item.quantity != 1
          ? { ...item, quantity: item.quantity - 1 }
          : null
      )
    );
  };
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id != id));
  };
  const addItem = (item: CartItem) => {
    if (item.id in items.map((item) => item.id)) {
      increaseItem(item.id);
    } else {
      setItems((prev) => [...prev, item]);
    }
  };
  const cleare = () => {
    setItems([]);
  };
  const getTotal = () => {
    return items.reduce((current, item) => {
      return current + (item.price.toNumber() * 10 * item.quantity) / 10;
    }, 0);
  };

  const value = {
    getNumberOfItems,
    getTotal,
    items,
    cleare,
    increaseItem,
    decreaseItem,
    removeItem,
    addItem,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
