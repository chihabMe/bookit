import { Reservation } from "@prisma/client";
import { useSession } from "next-auth/react";
import Button from "~/components/ui/Button";
import Spinner from "~/components/ui/Spinner";
import { api } from "~/utils/api";

const RestaurantReservations = () => {
  const {
    data: reservations,
    isLoading,
    isError,
    error,
  } = api.reservation.getUserLast4Rervations.useQuery();

  if (isLoading)
    return (
      <div className="h-700px flex w-[300px] items-center justify-center rounded-full bg-bg-light dark:bg-bg-dark">
        <Spinner />
      </div>
    );
  if (isError || !reservations)
    return (
      <div className="h-700px flex w-[300px] items-center justify-center rounded-full bg-bg-light dark:bg-bg-dark">
        <h1>{error?.message}</h1>
      </div>
    );

  return (
    <div className="flex w-full max-w-[450px] flex-col gap-2">
      <h2 className="   font-bold text-title dark:text-title-dark ">
        Reservations
      </h2>
      <table className="borde w-full table-auto border-collapse rounded-xl  border-gray-200 bg-gray-200 px-2 py-1 text-left text-sm dark:bg-gray-900">
        <thead>
          <tr>
            <th className="px-4 py-2 text-title dark:text-title-dark ">
              Restaurant
            </th>
            <th className="px-4 py-2 text-title dark:text-title-dark  ">
              Reservation Date
            </th>
            <th className="px-4 py-2 text-title dark:text-title-dark  ">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reservations.map((reservation) => (
            <ReservationItem
              key={reservation.id}
              id={reservation.id}
              restaurant={reservation.restaurant}
              checkIn={reservation.checkIn}
              status={reservation.status}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface ReservationsItemProps extends Reservation {
  restaurant: {
    name: string;
  };
}
const ReservationItem = ({
  reservation,
}: {
  reservation: ReservationsItemProps;
}) => {
  return (
    <tr>
      <td className="px-4 py-2 text-xs font-medium text-text dark:text-text-dark ">
        {reservation.restaurant.name}
      </td>
      <td className="px-4 py-2 text-xs font-medium text-text dark:text-text-dark ">
        {reservation.checkIn.toISOString()}
      </td>
      <td className="px-4 py-2 text-xs  text-text dark:text-text-dark ">
        <Button
          className={`rounded-full !py-1 ${
            reservation.status == "completed" ? "!bg-green-500" : ""
          }   rounded-full !px-4 !text-[10px] `}
        >
          {reservation.status}
        </Button>
      </td>
    </tr>
  );
};

export default RestaurantReservations;
