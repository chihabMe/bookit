import { useSession } from "next-auth/react";
import Button from "~/components/ui/Button";
import Spinner from "~/components/ui/Spinner";
interface Reservation {
  id: string;
  restaurant: string;
  date: string;
  status: "reserved" | "waiting";
}

const reservations: Reservation[] = [
  {
    id: "1",
    restaurant: "La Trattoria",
    date: "2023-05-10",
    status: "reserved",
  },
  {
    id: "2",
    restaurant: "The Steakhouse",
    date: "2023-05-12",
    status: "reserved",
  },
  {
    id: "3",
    restaurant: "Le Bistro",
    date: "2023-05-15",
    status: "waiting",
  },
  {
    id: "4",
    restaurant: "Sushi Bar",
    date: "2023-05-18",
    status: "waiting",
  },
];
const RestaurantReservations = () => {
  const { status, data } = useSession();

  if (status == "loading")
    return (
      <div className="h-700px flex w-[300px] items-center justify-center rounded-full bg-bg-light dark:bg-bg-dark">
        <Spinner />
      </div>
    );

  return (
    <div className="flex w-full max-w-[450px] flex-col gap-2">
      <h2 className="   font-bold text-title dark:text-title-dark ">
        Reservations
      </h2>
      <ReservationsTable reservations={reservations} />
    </div>
  );
};

const ReservationsTable = ({
  reservations,
}: {
  reservations: Reservation[];
}) => {
  return (
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
            date={reservation.date}
            status={reservation.status}
          />
        ))}
      </tbody>
    </table>
  );
};

const ReservationItem = ({ restaurant, date, status }: Reservation) => {
  return (
    <tr>
      <td className="px-4 py-2 text-xs font-medium text-text dark:text-text-dark ">
        {restaurant}
      </td>
      <td className="px-4 py-2 text-xs font-medium text-text dark:text-text-dark ">
        {date}
      </td>
      <td className="px-4 py-2 text-xs  text-text dark:text-text-dark ">
        <Button
          className={`rounded-full !py-1 ${
            status == "reserved" ? "!bg-green-500" : ""
          }   rounded-full !px-4 !text-[10px] `}
        >
          {status}
        </Button>
      </td>
    </tr>
  );
};

export default RestaurantReservations;
