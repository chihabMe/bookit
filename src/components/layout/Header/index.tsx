import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
const Header = () => {
  return (
    <header>
      <div></div>
      <div>
        <form className="flex ">
          <input placeholder="Search by food name" />
          <button className="cursor-pointer">
            <MagnifyingGlassIcon className="w-4 w-4 text-text" />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
