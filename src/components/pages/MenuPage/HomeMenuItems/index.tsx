import { MenuCategory } from "@prisma/client";
import MenuItemCart, {
  MenuItemCartSkelton,
} from "~/components/ui/MenuItemCart";
import useAppSelector from "~/hooks/useAppSelector";
import { selectUI } from "~/store";
import { api } from "~/utils/api";

interface Props {
  category: MenuCategory;
}
const HomeMenuItems = ({ category }: Props) => {
  const { showCart } = useAppSelector(selectUI);
  const {
    isLoading,
    isError,
    data: menuItems,
    error,
  } = api.menu.getMenuItemsByCategory.useQuery({ id: category.id });
  if (isLoading) return <MenuSkelaton />;

  if (isError || !menuItems) return <h1>{error?.message}</h1>;

  return (
    <div
      className={`grid w-full  grid-cols-1  sm:grid-cols-2 md:grid-cols-4      lg:grid-cols-5  `}
    >
      {menuItems.items.map((item) => (
        <MenuItemCart key={item.id} item={item} />
      ))}
    </div>
  );
};
const MenuSkelaton = () => {
  return (
    <div className="grid w-full  grid-cols-1  sm:grid-cols-2 md:grid-cols-4      lg:grid-cols-5  ">
      <MenuItemCartSkelton />
      <MenuItemCartSkelton />
      <MenuItemCartSkelton />
      <MenuItemCartSkelton />
      <MenuItemCartSkelton />
      <MenuItemCartSkelton />
      <MenuItemCartSkelton />
    </div>
  );
};
export default HomeMenuItems;
