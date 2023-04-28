import { MenuCategory } from "@prisma/client";
import MenuItemCart from "~/components/ui/MenuItemCart";
import { api } from "~/utils/api";

interface Props {
  category: MenuCategory;
}
const HomeMenuItems = ({ category }: Props) => {
  const {
    isLoading,
    isError,
    data: menuItems,
    error,
  } = api.menu.getMenuItemsByCategory.useQuery({ id: category.id });
  if (isLoading) return <h1>loading</h1>;
  if (isError || !menuItems) return <h1>{error?.message}</h1>;

  return (
    <div className=" grid w-full   grid-cols-3 flex-wrap gap-2   py-2">
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
