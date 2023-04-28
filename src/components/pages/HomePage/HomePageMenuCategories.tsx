import { MenuCategory, MenuItem } from "@prisma/client";
import { api } from "~/utils/api";
import Image from "next/image";
import { useEffect } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
interface Props {
  handleChangeCategory: (category: MenuCategory) => void;
  setCategoryIfNull: (category: MenuCategory) => void;
}
const HomePageMenuCategories = ({
  handleChangeCategory,
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
  if (isLoading) return <h1>loading</h1>;
  if (isError || !categories) return <h1>{error.message}</h1>;
  return (
    <ul className="hide-scroll-bar flex w-full max-w-[900px] flex-nowrap gap-2 overflow-x-scroll py-4">
      {categories.map((category) => (
        <HomePageMenuCategoryItem
          changeCategory={handleChangeCategory}
          key={category.id}
          item={category}
        />
      ))}

      {categories.map((category) => (
        <HomePageMenuCategoryItem
          changeCategory={handleChangeCategory}
          key={category.id}
          item={category}
        />
      ))}

      {categories.map((category) => (
        <HomePageMenuCategoryItem
          changeCategory={handleChangeCategory}
          key={category.id}
          item={category}
        />
      ))}

      {categories.map((category) => (
        <HomePageMenuCategoryItem
          changeCategory={handleChangeCategory}
          key={category.id}
          item={category}
        />
      ))}

      {categories.map((category) => (
        <HomePageMenuCategoryItem
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
  changeCategory,
}: {
  item: MenuCategory;
  changeCategory: (category: MenuCategory) => void;
}) => {
  const category = item;
  return (
    <li
      onClick={(e) => changeCategory(item)}
      className="group inline-flex h-[170px] w-[110px] flex-shrink-0 cursor-pointer flex-col items-center gap-2 rounded-[20px] bg-primary p-2 text-sm transition-all duration-200 hover:scale-105 hover:opacity-90"
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
      <div className="rounded-full bg-white p-1 transition-all duration-300 group-hover:rotate-90 ">
        <ChevronRightIcon className="h-4 w-4 text-primary   " />
      </div>
    </li>
  );
};
export default HomePageMenuCategories;
