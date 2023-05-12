import { MenuCategory, MenuItem } from "@prisma/client";
import { api } from "~/utils/api";
import Image from "next/image";
import { useEffect } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Skeleton from "react-loading-skeleton";
interface Props {
  handleChangeCategory: (category: MenuCategory) => void;
  setCategoryIfNull: (category: MenuCategory) => void;
  currentCategory: MenuCategory | null;
}
const HomePageMenuCategories = ({
  handleChangeCategory,
  currentCategory,
  setCategoryIfNull,
}: Props) => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = api.menu.getAllCategories.useQuery();

  useEffect(() => {
    if (!isLoading && categories) {
      const first = categories.find((_, idx) => idx == 0);
      if (!isLoading && first) {
        setCategoryIfNull(first);
      }
    }
  }, [isLoading, categories]);
  if (isLoading) return <MenuCategoriesSkelton />;
  if (isError || !categories) return <h1>{error.message}</h1>;
  return (
    <ul className=" scrollbar-hide flex w-full  flex-nowrap gap-2 overflow-x-scroll py-4">
      {categories.map((category) => (
        <HomePageMenuCategoryItem
          active={category.id == currentCategory?.id}
          changeCategory={handleChangeCategory}
          key={category.id}
          item={category}
        />
      ))}
    </ul>
  );
};

const HomePageMenuCategoryItem = ({
  item,
  active,
  changeCategory,
}: {
  item: MenuCategory;
  changeCategory: (category: MenuCategory) => void;
  active: boolean;
}) => {
  const category = item;
  return (
    <li
      onClick={(e) => changeCategory(item)}
      className={`group inline-flex h-[170px] w-[110px] flex-shrink-0 cursor-pointer flex-col items-center gap-2 rounded-[20px] ${
        active ? "bg-primary" : ""
      } p-2 text-sm transition-all duration-200 hover:scale-105 hover:bg-primary hover:opacity-90`}
    >
      <Image
        width={80}
        height={80}
        src={category.image}
        alt={`${category.name} image`}
        className="rounded-full p-2 transition-all duration-[1s] group-hover:rotate-[360deg]"
      />
      <span className="text-sm font-medium capitalize  text-white">
        {item.name}
      </span>
      <div
        className={`group-hover rounded-full group-hover:bg-white ${
          active ? "bg-white" : "bg-primary"
        } p-1 transition-all duration-300 group-hover:rotate-90 `}
      >
        <ChevronRightIcon
          className={`h-4 w-4 group-hover:text-primary ${
            active ? "text-primary" : "text-white"
          }   `}
        />
      </div>
    </li>
  );
};

const MenuCategoryItemSkelton = () => {
  return (
    <li
      className={`group inline-flex h-[170px] w-[110px] flex-shrink-0 cursor-pointer flex-col items-center gap-2 rounded-[20px] 
       p-2 text-sm transition-all duration-200 hover:scale-105 hover:bg-primary hover:opacity-90`}
    >
      <Skeleton circle width={80} height={80} />
      <span className="text-sm font-medium capitalize  text-white">
        <Skeleton count={3} width={70} />
      </span>
    </li>
  );
};
const MenuCategoriesSkelton = () => {
  return (
    <ul className=" scrollbar-hide flex w-full  flex-nowrap gap-2 overflow-x-scroll py-4">
      <MenuCategoryItemSkelton />
      <MenuCategoryItemSkelton />
      <MenuCategoryItemSkelton />
      <MenuCategoryItemSkelton />
      <MenuCategoryItemSkelton />
      <MenuCategoryItemSkelton />
      <MenuCategoryItemSkelton />
      <MenuCategoryItemSkelton />
    </ul>
  );
};
export default HomePageMenuCategories;
