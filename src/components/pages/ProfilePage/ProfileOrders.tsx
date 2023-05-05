import { useSession } from "next-auth/react";
import Image from "next/image";
import Button from "~/components/ui/Button";
import Spinner from "~/components/ui/Spinner";

const ProfileOrders = () => {
  const { status, data } = useSession();

  if (status == "loading")
    return (
      <div className="h-700px flex w-[300px] items-center justify-center rounded-full bg-bg-light dark:bg-bg-dark">
        <Spinner />
      </div>
    );
  return (
    <div className="w-[450px]">
      <OrdersTable />
    </div>
  );
};

const OrdersTable = () => {
  return (
    <table className=" w-full table-auto border-collapse border border-gray-200 text-left">
      <thead>
        <tr>
          <th className="px-4 py-2">Amount</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        <OrderItem date="2023-4-5" status="in progress" total={142} />
        <OrderItem date="2023-4-5" status="in progress" total={142} />
        <OrderItem date="2023-4-5" status="in progress" total={142} />
        <OrderItem date="2023-4-5" status="in progress" total={142} />
      </tbody>
    </table>
  );
};

const OrderItem = ({
  status,
  total,
  date,
}: {
  status: string;
  total: number;
  date: string;
}) => {
  return (
    <tr className="">
      <td className="px-4 py-2 text-sm font-bold">${total}</td>
      <td className="px-4 py-2 text-sm font-bold text-text dark:text-text-dark">
        {date}
      </td>
      <td className="px-4 py-2">
        <Button
          className={`rounded-full ${
            status == "completed" ? "!bg-green-500" : ""
          } rounded-full !py-2 px-4 !text-[10px] `}
        >
          {status}
        </Button>
      </td>
    </tr>
  );
};

export default ProfileOrders;
