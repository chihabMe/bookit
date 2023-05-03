import {
  BellIcon,
  ShoppingBagIcon,
  UserIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useWillChange } from "framer-motion";
import { useRouter } from "next/router";
import Button from "~/components/ui/Button";
import useAppDispatch from "~/hooks/useAppDispatch";
import useAppSelector from "~/hooks/useAppSelector";
import useCart from "~/hooks/useCart";
import useWindowSize from "~/hooks/useWindowSize";
import { uiActions } from "~/store/slices/ui.slice";
import { useSession } from "next-auth/react";
import { ChangeEvent } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
const HeaderAccount = () => {
  const { data: user, status } = useSession();
  const isLoading = status == "loading";
  const isAuth = status == "authenticated";

  return (
    <div className="flex  items-center gap-4 ">
      {isLoading && <AuthStelaton />}
      {!isLoading && isAuth && <AuthenticatedUserView />}
      {!isLoading && !isAuth && <UnAuthenticatedUserView />}
    </div>
  );
};

const AuthStelaton = () => {
  return (
    <div className="flex gap-4">
      <Skeleton width={80} height={40} />
      <Skeleton width={80} height={40} />
    </div>
  );
};

const AuthenticatedUserView = () => {
  return (
    <Button className=" flex  cursor-pointer items-center gap-3 !bg-transparent px-2 py-2 !capitalize   text-text  ">
      <UserIcon className=" h-6 w-6    text-text md:h-8  md:w-8  " />
      <div className="flex items-center gap-2 text-xs font-medium ">
        <ChevronDownIcon className="h-4 w-4 text-text" />
      </div>
    </Button>
  );
};

const UnAuthenticatedUserView = () => {
  return (
    <div className="flex gap-4">
      <Link href="/auth/login">
        <Button className="h-12 rounded-full !bg-transparent px-8  capitalize !text-text !text-title text-title hover:!text-primary hover:!text-primary hover:ring-2 hover:ring-primary dark:!text-title-dark ">
          sign in
        </Button>
      </Link>

      <Link href="/auth/register">
        <Button className="h-12 rounded-full px-8 capitalize hover:ring-2 hover:ring-primary active:ring-1  dark:text-text-dark">
          sign up
        </Button>
      </Link>
    </div>
  );
};
export default HeaderAccount;
