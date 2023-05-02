import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Button from "~/components/ui/Button";
export const MenuSearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div className="my-2 w-full px-2">
      <form className={`   flex w-full  rounded-full   `}>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="search..."
          className={`  h-12  ${
            isFocused ? "w-full" : "  w-[400px]  "
          }    bg-transparent px-4 px-4 font-medium capitalize text-title   text-title outline-none transition-all duration-300 dark:text-title-dark`}
        />
        <Button className="w-18  m-0 flex items-center justify-center rounded-full transition-all duration-300 md:w-24">
          <SearchIcon className="h-5 w-5 text-white md:h-6 md:w-6  " />
        </Button>
      </form>
    </div>
  );
};
export default MenuSearchBar;
