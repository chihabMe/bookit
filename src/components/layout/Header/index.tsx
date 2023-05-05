import {
  MagnifyingGlassIcon,
  Bars3Icon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import HeaderAccount from "./HeaderAccount";
import Button from "~/components/ui/Button";
import Link from "next/link";
import useCart from "~/hooks/useCart";
const Header = () => {
  return (
    <header className="  mx-auto   flex w-full max-w-[1200px] items-center justify-between bg-bg-light px-2 px-2  py-4 dark:bg-bg-dark md:px-0 ">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">
          Book<span className="text-primary">it</span>
        </h1>
      </div>
      <div className="md:blcok hidden">
        <form className="flex   ">
          <input
            className="ring-none  w-[300px] px-2 text-sm font-medium outline-none"
            placeholder="Search by food name"
          />
          <Button className=" !capitralize  flex cursor-pointer items-center gap-3 !bg-transparent px-2 py-2   text-text  ">
            <MagnifyingGlassIcon className="w-5 w-5 !text-text" />
          </Button>
        </form>
      </div>
      <HeaderAccount />
    </header>
  );
};

export default Header;
