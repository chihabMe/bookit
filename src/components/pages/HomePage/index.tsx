import Title from "~/components/ui/Title";
import HomePageHero from "./HomePageHero";
import HomePageMenuCategories from "./HomePageMenuCategories";
import { useState } from "react";
import { MenuCategory } from "@prisma/client";
import HomeMenuItems from "./HomeMenuItems";
import Cart from "~/components/layout/Cart";

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
      <HomePageHero />
      <Title text="menu categories" />
      <HomePageMenuCategories
        setCategoryIfNull={setCategoryIfNull}
        handleChangeCategory={handleChangeCategory}
      />
      {currentCategory && <Title text={`${currentCategory.name} menu`} />}
      {currentCategory && <HomeMenuItems category={currentCategory} />}
    </section>
  );
};
export default HomePage;
