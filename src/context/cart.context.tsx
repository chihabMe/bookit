import { ReactNode, createContext, useEffect } from "react";
import { MenuItem, Prisma } from "@prisma/client";
import { useState } from "react";

export interface ICartItem extends MenuItem {
  quantity: number;
}

interface ICartContext {
  getTotal: () => number;
  items: ICartItem[];
  cleare: () => void;
  addItem: (item: ICartItem) => void;
  removeItem: (id: string) => void;
  increaseItem: (id: string) => void;
  getNumberOfItems: () => number;
  decreaseItem: (id: string) => void;
}

const initialState: ICartContext = {
  items: [],
  cleare: () => null,
  addItem: (item: ICartItem) => null,
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
    setItems(
      (prev) =>
        prev
          .map((item) =>
            item.id !== id ? item : { ...item, quantity: item.quantity - 1 }
          )
          .filter((item) => item.quantity != 0) // Remove null values from the array
    );
  };
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id != id));
  };
  const addItem = (item: ICartItem) => {
    console.log("trying to add => ", item);
    if (items.map((item) => item.id).includes(item.id)) {
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
