import { api } from "~/utils/api";
import { type User, type Restaurant } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Rating,
  Input,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Button from "~/components/ui/Button";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import BookATableModal from "~/components/modals/BookATableModal";

export type IRestarantSearch = User & {
  restaurant: Restaurant | null;
};

const RestaurantsSearch = () => {
  const restaurants = api.restaurants.getResturants.useQuery();
  if (restaurants.isLoading) return <h1>loading</h1>;
  if (!restaurants.data || restaurants.isError)
    return <h1 className="text-red-400">{restaurants.error.message}</h1>;

  return (
    <div className="w-full">
      <ul className="flex flex-col gap-4">
        {restaurants.data.map((restaurant) => (
          <RestaurantSearchItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </ul>
    </div>
  );
};
export const RestaurantSearchItem = ({
  restaurant,
}: {
  restaurant: IRestarantSearch;
}) => {
  return (
    <Card className="bg-bg w-full max-w-[500px]  flex-row py-2  dark:bg-bg-dark">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 h-[120px] w-[120px] shrink-0 rounded-r-none"
      >
        <Image
          src={restaurant.image ?? ""}
          alt="restaurant image"
          width={120}
          height={120}
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className=" !py-0">
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-2 text-lg capitalize text-title dark:text-title-dark "
        >
          {restaurant.name}
        </Typography>
        <div className="flex  ">
          <StarIcon className="h-5 w-5 text-primary " />
          <StarIcon className="h-5 w-5 text-primary " />
          <StarIcon className="h-5 w-5 text-primary " />
          <StarIcon className="h-5 w-5 text-primary " />
        </div>
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-2 text-base text-text dark:text-text-dark "
        >
          Unforgettable flavors, impeccable service.
        </Typography>
        <BookATableModal restaurant={restaurant} />
      </CardBody>
    </Card>
  );
};

export default RestaurantsSearch;
