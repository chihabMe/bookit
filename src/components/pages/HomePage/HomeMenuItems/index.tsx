import { MenuCategory } from "@prisma/client";
import MenuItemCart from "~/components/ui/MenuItemCart";
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
  if (isLoading) return <h1>loading</h1>;
  if (isError || !menuItems) return <h1>{error?.message}</h1>;

  return (
    <div className={`flex flex-wrap justify-center gap-4 sm:justify-start`}>
      {menuItems.items.map((item) => (
        <MenuItemCart key={item.id} item={item} />
      ))}
      {menuItems.items.map((item) => (
        <MenuItemCart key={item.id} item={item} />
      ))}
      {menuItems.items.map((item) => (
        <MenuItemCart key={item.id} item={item} />
      ))}
    </div>
  );
};
export default HomeMenuItems;
