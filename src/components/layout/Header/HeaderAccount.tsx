import {
  BellIcon,
  UserIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Button from "~/components/ui/Button";
const HeaderAccount = () => {
  return (
    <div className="flex items-center gap-4">
      <Button className="cursor-pointer !bg-transparent px-2 py-2">
        <BellIcon className="h-6 w-6 text-primary " />
      </Button>
      <Button className=" flex  cursor-pointer items-center gap-3 !bg-transparent px-2 py-2 !capitalize   text-text  ">
        <UserIcon className="h-6 w-6  text-text  " />
        <div className="flex items-center gap-2 text-xs font-medium ">
          <span>Chiahb</span>
          <ChevronDownIcon className="h-4 w-4 text-text" />
        </div>
      </Button>
    </div>
  );
};
export default HeaderAccount;
