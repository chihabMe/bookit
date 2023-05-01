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
        <form className="jusitfy-between flex w-full max-w-[800px] rounded-full bg-orange-50  px-2 outline-1   outline-primary group-focus:outline  group-focus:outline-2">
          <input className="group h-12 w-full bg-transparent px-4  font-medium   capitalize text-title text-title outline-none" />
          <Button className="m-0 flex w-24 items-center justify-center rounded-full">
            <SearchIcon className="h-6 w-6 text-white " />
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
