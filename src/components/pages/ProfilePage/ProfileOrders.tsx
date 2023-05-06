import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Spinner from "~/components/ui/Spinner";
import Button from "~/components/ui/Button";
import { api } from "~/utils/api";
import { Order, OrderStatus, Restaurant } from "@prisma/client";
import RestaurantReservations from "./ProfileReservations";
import Skeleton from "react-loading-skeleton";

interface OrderWithRestarutn extends Order {
  restaurnat: Restaurant;
}

const ProfileOrders = () => {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = api.ordres.getLast4orders.useQuery();

  if ((!isLoading && isError) || (!isLoading && !orders)) {
    return (
      <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-2">
        <h1 className="text-red-500">{error?.message}</h1>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-2">
      <h2 className="font-bold text-title dark:text-title-dark">Orders</h2>

      <table className="borde w-full  table-auto border-collapse rounded-xl  border-gray-200 bg-gray-200 px-2 py-1 text-left text-sm dark:bg-gray-900">
        <thead>
          <tr>
            <th className="px-2 py-1 text-title dark:text-title-dark">
              Restaurant
            </th>
            <th className="px-2 py-1 text-title dark:text-title-dark">
              Order Date
            </th>
            <th className="px-2 py-1 text-title dark:text-title-dark">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {!isLoading &&
            orders.map((order) => <OrderItem key={order.id} order={order} />)}
          {isLoading && <OrdersSkelaton />}
        </tbody>
      </table>
    </div>
  );
};

type OrderItemProps = Order & {
  restaurant: Pick<Restaurant, "name">;
};
const OrderItem = ({ order }: { order: OrderItemProps }) => {
  return (
    <tr>
      <td className="px-2 py-1 text-sm font-medium text-text dark:text-text-dark">
        {order.restaurant.name}
      </td>
      <td className="px-2 py-1 text-sm font-medium text-text dark:text-text-dark">
        {order.createdAt.toISOString()}
      </td>
      <td className="px-2 py-1">
        <Button
          className={`rounded-full px-4 py-1 text-[10px] ${
            order.status === "delivered" ? "bg-green-500" : ""
          }`}
        >
          {status}
        </Button>
      </td>
    </tr>
  );
};

const OrdersSkelaton = () => {
  return (
    <>
      <OrderItemSkelaton />
      <OrderItemSkelaton />
      <OrderItemSkelaton />
      <OrderItemSkelaton />
    </>
  );
};
const OrderItemSkelaton = () => {
  return (
    <tr>
      <td className="px-2 py-1 text-sm font-medium text-text dark:text-text-dark">
        <Skeleton width={70} />
      </td>
      <td className="px-2 py-1 text-sm font-medium text-text dark:text-text-dark">
        <Skeleton width={70} />
      </td>
      <td className="px-2 py-1">
        <Skeleton width={70} />
      </td>
    </tr>
  );
};
export default ProfileOrders;
