import Title from "~/components/ui/Title";
import HomePageHero from "./HomePageHero";
import HomePageMenuCategories from "./HomePageMenuCategories";
import { useState } from "react";
import { MenuCategory } from "@prisma/client";
import HomeMenuItems from "./HomeMenuItems";
import Cart from "~/components/layout/Cart";
import Button from "~/components/ui/Button";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/24/solid";
import Skeleton from "react-loading-skeleton";
import MenuSearchBar from "./MenuSearchBar";

const MenuPage = () => {
  const [currentCategory, setCurrentCategory] = useState<MenuCategory | null>(
    null
  );
  const handleChangeCategory = (category: MenuCategory) => {
    setCurrentCategory(category);
  };
  const setCategoryIfNull = (category: MenuCategory) => {
    setCurrentCategory((prev) => (prev == null ? category : prev));
  };
  return (
    <section className="w-full">
      <MenuSearchBar />
      <Title text="menu categories" />
      <HomePageMenuCategories
        currentCategory={currentCategory}
        setCategoryIfNull={setCategoryIfNull}
        handleChangeCategory={handleChangeCategory}
      />
      {currentCategory ? (
        <Title text={`${currentCategory.name} menu`} />
      ) : (
        <Skeleton width={100} />
      )}
      {currentCategory && <HomeMenuItems category={currentCategory} />}
    </section>
  );
};
export default MenuPage;
