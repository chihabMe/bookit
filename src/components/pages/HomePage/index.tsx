import Title from "~/components/ui/Title";
import HomePageHero from "./HomePageHero";
import HomePageMenuCategories from "./HomePageMenuCategories";
import { useState } from "react";
import { MenuCategory } from "@prisma/client";
import HomeMenuItems from "./HomeMenuItems";
import Cart from "~/components/layout/Cart";
import Button from "~/components/ui/Button";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/24/solid";

const HomePage = () => {
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
      <div className="my-2 w-full px-2">
        <form className="flex w-full max-w-[800px] justify-between rounded-full bg-orange-50 hover:outline    hover:outline-2 ">
          <input className="  h-12 w-full bg-transparent px-4 px-4  font-medium   capitalize text-title text-title outline-none" />
          <Button className="w-18  m-0 flex items-center justify-center rounded-full md:w-24">
            <SearchIcon className="h-5 w-5 text-white md:h-6 md:w-6  " />
          </Button>
        </form>
      </div>
      <Title text="menu categories" />
      <HomePageMenuCategories
        currentCategory={currentCategory}
        setCategoryIfNull={setCategoryIfNull}
        handleChangeCategory={handleChangeCategory}
      />
      {currentCategory && <Title text={`${currentCategory.name} menu`} />}
      {currentCategory && <HomeMenuItems category={currentCategory} />}
    </section>
  );
};
export default HomePage;
