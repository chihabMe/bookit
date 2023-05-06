import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Spinner from "~/components/ui/Spinner";
import Button from "~/components/ui/Button";

interface Order {
  id: string;
  restaurant: string;
  date: string;
  status: "placed" | "processing" | "delivered";
}

const orders: Order[] = [
  {
    id: "1",
    restaurant: "la trattoria",
    date: "2023-05-10",
    status: "placed",
  },
  {
    id: "2",
    restaurant: "the steakhouse",
    date: "2023-05-12",
    status: "processing",
  },
  {
    id: "3",
    restaurant: "le bistro",
    date: "2023-05-15",
    status: "processing",
  },
  {
    id: "4",
    restaurant: "sushi bar",
    date: "2023-05-18",
    status: "delivered",
  },
];

const ProfileOrders = () => {
  const { status, data } = useSession();

  if (status == "loading")
    return (
      <div className="h-700px flex w-full items-center justify-center rounded-full bg-bg-light dark:bg-bg-dark">
        <Spinner />
      </div>
    );

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-2">
      <h2 className="font-bold text-title dark:text-title-dark">Orders</h2>
      <OrderTable orders={orders} />
    </div>
  );
};

const OrderTable = ({ orders }: { orders: Order[] }) => {
  return (
    <table className="borde w-full  table-auto border-collapse rounded-xl  border-gray-200 bg-gray-200 px-2 py-1 text-left text-sm dark:bg-gray-900">
      <thead>
        <tr>
          <th className="px-2 py-1 text-title dark:text-title-dark">
            Restaurant
          </th>
          <th className="px-2 py-1 text-title dark:text-title-dark">
            Order Date
          </th>
          <th className="px-2 py-1 text-title dark:text-title-dark">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {orders.map((order) => (
          <OrderItem
            key={order.id}
            id={order.id}
            restaurant={order.restaurant}
            date={order.date}
            status={order.status}
          />
        ))}
      </tbody>
    </table>
  );
};

interface Order {
  id: string;
  restaurant: string;
  date: string;
  status: "placed" | "processing" | "delivered";
}

const OrderItem = ({ restaurant, date, status }: Order) => {
  return (
    <tr>
      <td className="px-2 py-1 text-sm font-medium text-text dark:text-text-dark">
        {restaurant}
      </td>
      <td className="px-2 py-1 text-sm font-medium text-text dark:text-text-dark">
        {date}
      </td>
      <td className="px-2 py-1">
        <Button
          className={`rounded-full px-4 py-1 text-[10px] ${
            status === "delivered" ? "bg-green-500" : ""
          }`}
        >
          {status}
        </Button>
      </td>
    </tr>
  );
};

export default ProfileOrders;
