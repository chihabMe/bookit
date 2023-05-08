import { Restaurant } from "@prisma/client";
import { api } from "~/utils/api";

const RestaurantsSearch = () => {
  const restaurants = api.restaurants.getResturants.useQuery();
  if (restaurants.isLoading) return <h1>loading</h1>;
  if (!restaurants.data || restaurants.isError)
    return <h1 className="text-red-400">{restaurants.error.message}</h1>;

  return (
    <div className="w-full">
      <ul>
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
  restaurant: Restaurant;
}) => {
  return <li>{restaurant.name}</li>;
};

export default RestaurantsSearch;
