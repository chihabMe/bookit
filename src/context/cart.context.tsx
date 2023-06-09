import { ReactNode, createContext, useEffect } from "react";
import { MenuItem, Prisma } from "@prisma/client";
import { useState } from "react";

export interface ICartItem extends MenuItem {
  quantity: number;
}

interface ICartContext {
  getTotal: () => number;
  items: ICartItem[];
  clear: () => void;
  addItem: (item: ICartItem, qt?: number) => void;
  removeItem: (id: string) => void;
  increaseItem: (id: string, qt?: number) => void;
  getNumberOfItems: () => number;
  decreaseItem: (id: string) => void;
}

const initialState: ICartContext = {
  items: [],
  clear: () => null,
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
  const increaseItem = (id: string, qt?: number) => {
    setItems((prev) =>
      prev.map((item) => {
        const total = +(qt ?? 1);
        return item.id != id
          ? item
          : { ...item, quantity: item.quantity + total };
      })
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
  const addItem = (item: ICartItem, qt?: number) => {
    if (items.map((item) => item.id).includes(item.id)) {
      increaseItem(item.id, qt);
    } else {
      setItems((prev) => [...prev, { ...item, quantity: qt ?? 1 }]);
    }
  };
  const clear = () => {
    setItems([]);
  };
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);
  useEffect(() => {
    if (localStorage) {
      const cartItems = JSON.parse(
        localStorage.getItem("cart") ?? "[]"
      ) as ICartItem[];
      setItems(cartItems);
    }
  }, []);
  const getTotal = () => {
    return items.reduce((current, item) => {
      return (
        current + (parseFloat(item.price.toString()) * 10 * item.quantity) / 10
      );
    }, 0);
  };

  const value = {
    getNumberOfItems,
    getTotal,
    items,
    clear,
    increaseItem,
    decreaseItem,
    removeItem,
    addItem,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
